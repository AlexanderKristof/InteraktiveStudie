/* Tantárgy: Biológia (7–8. osztály) */
STUDIE.addSubject({
  id: 'bio-alap',
  stage: 'altalanos',
  title: 'Biológia (7–8. osztály)',
  icon: '🦋',
  color: '#2f9e6a',
  description: 'Rendszerezés, növények és állatok, életközösségek és természetvédelem, az emberi test működése és az egészséges életmód.',
  intro: 'A biológia az **élőlények** tudománya: a pitypangtól a bálnáig, a baktériumoktól a saját testedig. Ebben a tárgyban megtanulod, hogyan rendszerezik a tudósok az élővilágot, hogyan „eszik” a növény napfényt, hogyan alkalmazkodnak az állatok, és hogyan működik a szíved, a tüdőd és az agyad. A felfedezőben a **sejtet**, a **szívet** és a **szemet** körbe is forgathatod. Ha ez már megy, a középiskolai **Biológia** tárgyban folytathatod.',
  lessons: [
    {
      id: 'rendszerezes',
      title: 'Az élővilág rendszerezése',
      level: 1, minutes: 13,
      summary: 'Az élőlények országai, a faj fogalma, a rendszertani kategóriák és Linné kettős nevezéktana.',
      tags: ['rendszerezés', 'rendszertan', 'ország', 'törzs', 'osztály', 'rend', 'család', 'nemzetség', 'faj', 'Linné', 'kettős nevezéktan', 'latin név', 'baktérium', 'gomba', 'növény', 'állat', 'határozókulcs'],
      models: ['sejt', 'dns'],
      sections: [
        {
          title: 'Miért kell rendet rakni?',
          text: 'A Földön eddig nagyjából **kétmillió** élőlényfajt írtak le a tudósok, és évente több ezer újat fedeznek fel. Ekkora sokaságban csak akkor lehet eligazodni, ha **csoportokba** soroljuk őket, ahogy egy könyvtárban is témák szerint rendezik a könyveket. Ezt a tudományt **rendszertannak** hívjuk.\n\nRégen a külső hasonlóság alapján csoportosítottak. Ma a tudósok azt vizsgálják, mennyire **közeli rokonok** az élőlények: ehhez a testfelépítésüket, a fejlődésüket és az örökítő anyagukat, a [[dns|DNS-t]] is összehasonlítják.'
        },
        {
          title: 'Az élőlények nagy csoportjai',
          text: 'Az élővilágot a tankönyvek általában öt nagy csoportra, **országra** osztják:\n\n- **Baktériumok**: apró, egysejtű élőlények, sejtjükben **nincs valódi sejtmag**. Vannak köztük kórokozók, de a legtöbbjük hasznos, például a joghurtkészítő baktériumok vagy a beledben élők.\n- **Egysejtű eukarióták** (például a papucsállatka, az amőba, sok alga): egyetlen sejtből állnak, de van sejtmagjuk.\n- **Gombák**: nem végeznek fotoszintézist, a környezetükből veszik fel a tápanyagot. Ide tartozik a csiperke, a penész és az élesztő is.\n- **Növények**: többsejtűek, **zöld színtestükkel** fotoszintetizálnak, sejtjeiket sejtfal veszi körül.\n- **Állatok**: többsejtűek, más élőlényekkel táplálkoznak, és többségük aktívan mozog.\n\nHogy mi a különbség a sejtmag nélküli és a sejtmagvas sejt között, azt a [[sejt|sejt modellben]] is megnézheted.',
          tip: 'A **vírusok** egyik országba sem tartoznak: nem sejtekből állnak, és csak egy élő sejt belsejében tudnak szaporodni.'
        },
        {
          title: 'A faj és a rendszertani kategóriák',
          text: 'A rendszertan alapegysége a **faj**. Egy fajba azok az egyedek tartoznak, amelyek egymással **szaporodni** tudnak, és **termékeny** (szintén szaporodóképes) utódokat hoznak létre. A ló és a szamár utóda, az öszvér például általában nem tud utódot létrehozni, ezért a ló és a szamár két külön faj.\n\nA hasonló fajokat egyre tágabb csoportokba soroljuk, mint egy fiókos szekrény egyre nagyobb fiókjaiba. Nézd meg a szürke farkas példáján:\n\n- **Ország**: állatok\n- **Törzs**: gerinchúrosok\n- **Osztály**: emlősök\n- **Rend**: ragadozók\n- **Család**: kutyafélék\n- **Nemzetség**: Canis (kutya)\n- **Faj**: szürke farkas (Canis lupus)\n\nMinél lejjebb haladsz, annál kevesebb, de annál közelebbi rokon élőlény tartozik egy csoportba.',
          tip: 'Egy kis emlékeztető mondat a sorrendhez: **O**lga **T**ortát **O**sztott, **R**endes **C**saládja **N**agyon **F**alta. (Ország, törzs, osztály, rend, család, nemzetség, faj.)'
        },
        {
          title: 'Linné és a kettős nevezéktan',
          text: 'Ugyanazt az élőlényt minden nyelven másképp hívják, sőt egy nyelven belül is több neve lehet: a pipacsot egyes vidékeken „vadmáknak” is mondják. Ezért kell egy **mindenhol érthető tudományos név**.\n\nA svéd **Carl von Linné** (1707–1778) a 18. században bevezette a **kettős nevezéktant**. Eszerint minden faj tudományos neve **két latin szóból** áll:\n\n1. Az első a **nemzetség** neve, nagy kezdőbetűvel.\n2. A második a **faji jelző**, kisbetűvel.\n\nPéldául: az ember **Homo sapiens** („bölcs ember”), a barna medve **Ursus arctos**, a háziméh **Apis mellifera** („mézhordó méh”), a kocsányos tölgy **Quercus robur**. Ugyanabba a nemzetségbe tartozó fajok első neve közös: a farkas **Canis lupus**, az aranysakál **Canis aureus**.\n\nIsmeretlen élőlények megnevezéséhez **határozókulcsot** használunk: kérdéspárok segítségével („van-e szárnya?”, „hány lába van?”) lépésről lépésre jutunk el a faj nevéig.',
          widget: { type: 'parositas', options: { title: 'Tudományos és magyar nevek', count: 6, pairs: [
            ['Homo sapiens', 'ember'],
            ['Canis lupus', 'szürke farkas'],
            ['Ursus arctos', 'barna medve'],
            ['Apis mellifera', 'háziméh'],
            ['Quercus robur', 'kocsányos tölgy'],
            ['Passer domesticus', 'házi veréb'],
            ['Esox lucius', 'csuka'],
            ['Bellis perennis', 'százszorszép']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik a legkisebb rendszertani kategória a felsoroltak közül?', options: ['Család', 'Faj', 'Ország', 'Rend'], answer: 1, explain: 'A sorrend: ország, törzs, osztály, rend, család, nemzetség, faj. A faj a legszűkebb.' },
        { q: 'Ki vezette be a kettős nevezéktant?', options: ['Charles Darwin', 'Gregor Mendel', 'Carl von Linné', 'Louis Pasteur'], answer: 2, explain: 'A svéd Linné a 18. században vezette be a kétszavas latin fajneveket.' },
        { q: 'Mit jelöl a Canis lupus névben a „Canis”?', options: ['A nemzetséget', 'Az országot', 'A családot', 'Az osztályt'], answer: 0, explain: 'Az első, nagybetűs szó a nemzetség neve, a második a faji jelző.' },
        { q: 'Melyik élőlénycsoport sejtjeiben nincs valódi sejtmag?', options: ['Gombák', 'Növények', 'Állatok', 'Baktériumok'], answer: 3, explain: 'A baktériumok örökítő anyaga szabadon van a sejtplazmában, nincs maghártyával körülvéve.' }
      ]
    },
    {
      id: 'novenyek',
      title: 'A növények felépítése és működése',
      level: 1, minutes: 15,
      summary: 'Gyökér, szár, levél és virág: hogyan vesz fel vizet a növény, hogyan készít táplálékot fényből, és hogyan lesz a virágból termés.',
      tags: ['növény', 'gyökér', 'gyökérszőr', 'szár', 'farész', 'háncsrész', 'évgyűrű', 'levél', 'gázcserenyílás', 'klorofill', 'zöld színtest', 'fotoszintézis', 'sejtlégzés', 'párologtatás', 'virág', 'porzó', 'termő', 'megporzás', 'megtermékenyítés', 'mag', 'termés'],
      models: ['sejt'],
      sections: [
        {
          title: 'A gyökér: horgony és szívószál',
          text: 'Egy virágos növény testét **gyökér**, **szár** és **levelek** alkotják, a szaporodást pedig a **virág** szolgálja.\n\nA gyökér két fő feladata:\n\n- **rögzíti** a növényt a talajban, hogy a szél ki ne tépje,\n- **felveszi** a vizet és a benne oldott **ásványi sókat**.\n\nA felszívást a gyökér végén található, nagyon vékony **gyökérszőrök** végzik: rengeteg van belőlük, így óriási felületen érintkeznek a talajjal. A kétszikű növényeknek (például a pitypangnak) erős **főgyökere** van, oldalgyökerekkel; az egyszikűeknek (például a búzának, a fűnek) sok egyforma, vékony gyökérből álló **bojtos gyökérzete**. Egyes gyökerek tápanyagot is **raktároznak**: ilyen a sárgarépa vagy a cékla.'
        },
        {
          title: 'A szár: a növény „lift”-je',
          text: 'A **szár** tartja a leveleket és a virágokat a fény felé, és **szállítja** az anyagokat. Belsejében kétféle szállítócsőrendszer fut:\n\n- a **farész** a gyökérből felfelé szállítja a vizet és az ásványi sókat,\n- a **háncsrész** a levélben készült cukros oldatot viszi el a növény minden részébe.\n\nA **lágy szárú** növények (például a pipacs) szára zöld és puha. A fák és cserjék **fás szárát** kéreg védi. A fatörzsben minden évben új faréteg képződik, ezek az **évgyűrűk**: megszámolva őket megtudhatod, hány éves volt a kivágott fa.',
          tip: 'Kísérlet: tegyél egy fehér szegfűt vagy egy zellerszárat ételfestékes vízbe! Egy nap múlva látni fogod, hol halad felfelé a festék: ez a farész útja.'
        },
        {
          title: 'A levél: napelemes konyha',
          text: 'A **levél** a növény „konyhája”. Lapos, széles **levéllemeze** sok fényt fog fel, a **levélnyél** a szárhoz kapcsolja, az **erek** pedig a szállítócsöveket vezetik bele.\n\nA levél sejtjeiben **zöld színtestek** vannak, bennük a zöld színű **klorofill**. A levél fonákján (alsó oldalán) apró, nyitható-zárható **gázcserenyílások** vannak: ezeken lép be a szén-dioxid, és távozik az oxigén és a vízgőz. A levélen keresztül elpárolgó víz „húzza” felfelé a vizet a gyökértől: ez a **párologtatás**.\n\nA zöld növények saját maguk készítik el a táplálékukat. Ez a **fotoszintézis**:\n\n`szén-dioxid + víz  →(fényenergia, klorofill)→  szőlőcukor + oxigén`\n\nA szőlőcukorból a növény keményítőt raktároz, cellulózt épít a sejtfalaiba, és energiát nyer. Az **oxigén**, amit belélegzünk, a növények fotoszintéziséből származik!'
        },
        {
          title: 'A növény is lélegzik: a sejtlégzés',
          text: 'A növénynek is energia kell az élethez. Ezt ugyanúgy nyeri, mint mi: a **sejtlégzés** során a szőlőcukrot oxigén segítségével lebontja:\n\n`szőlőcukor + oxigén  →  szén-dioxid + víz + energia`\n\nFontos különbség:\n\n- **fotoszintézis** csak a zöld részekben és csak **fényben** zajlik,\n- **sejtlégzés** minden élő sejtben, **éjjel-nappal** folyik.\n\nNappal a növény sokkal több oxigént termel, mint amennyit elhasznál, ezért összességében oxigént ad a levegőnek. A sejtlégzés a sejtek „erőművében”, a mitokondriumban zajlik, a fotoszintézis a zöld színtestben: mindkettőt megtalálod a [[sejt|sejt modellben]].'
        },
        {
          title: 'A virág, a megporzás és a termés',
          text: 'A **virág** a növény szaporítószerve. Kívülről befelé haladva:\n\n- a **csészelevelek** bimbóként védik a virágot,\n- a színes **sziromlevelek** odacsalogatják a rovarokat,\n- a **porzók** (porzószál és portok) termelik a **virágport**,\n- középen a **termő** áll: felül a ragacsos **bibe**, alatta a **bibeszál**, legalul a **magház**, benne a magkezdeményekkel.\n\n**Megporzás**: a virágpor rájut a bibére. Ezt végezheti a **szél** (fűfélék, mogyoró, nyír: ezek virágpora okozza a legtöbb allergiát), vagy a **rovarok** (méhek, poszméhek, lepkék), amelyeket a színes szirom, az illat és az édes **nektár** vonz. Megporzás után következik a **megtermékenyítés**: a magkezdeményből **mag**, a magházból **termés** fejlődik. Így lesz a cseresznyevirágból cseresznye.\n\nA magoknak messzire kell jutniuk: a pitypang ernyős termését a szél viszi, a bogáncs termése az állatok szőrébe akad, a madarak pedig megeszik a bogyókat, és máshol ürítik ki a magokat.',
          widget: { type: 'parositas', options: { title: 'Növényi részek és feladataik', count: 6, pairs: [
            ['Gyökérszőr', 'Vizet és ásványi sókat szív fel'],
            ['Farész', 'Felfelé szállítja a vizet'],
            ['Háncsrész', 'A cukros oldatot szállítja'],
            ['Gázcserenyílás', 'Itt lép be a szén-dioxid a levélbe'],
            ['Zöld színtest', 'Itt zajlik a fotoszintézis'],
            ['Portok', 'A virágport termeli'],
            ['Bibe', 'Ide kell jutnia a virágpornak'],
            ['Magház', 'Belőle fejlődik a termés']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mi keletkezik a fotoszintézis során?', options: ['Szén-dioxid és víz', 'Szőlőcukor és oxigén', 'Csak víz', 'Ásványi sók'], answer: 1, explain: 'A növény szén-dioxidból és vízből fényenergia segítségével szőlőcukrot és oxigént állít elő.' },
        { q: 'Mikor végez a növény sejtlégzést?', options: ['Csak nappal', 'Csak éjjel', 'Éjjel-nappal', 'Csak tavasszal'], answer: 2, explain: 'A sejtlégzés minden élő sejtben folyamatos, a fotoszintézis viszont csak fényben megy végbe.' },
        { q: 'Melyik rész szállítja a vizet a gyökértől a levelekig?', options: ['A farész', 'A háncsrész', 'A bibe', 'A szirom'], answer: 0, explain: 'A farész felfelé viszi a vizet és az ásványi sókat, a háncsrész a cukros oldatot szállítja.' },
        { q: 'Mi a megporzás?', options: ['A termés lehullása', 'A levelek lehullása ősszel', 'A mag kicsírázása', 'A virágpor rájutása a bibére'], answer: 3, explain: 'A virágport a szél vagy állatok (főleg rovarok) juttatják a bibére.' }
      ]
    },
    {
      id: 'allatok',
      title: 'Az állatok csoportjai',
      level: 1, minutes: 15,
      summary: 'Gerinctelenek és gerincesek: a medúzától a madarakig. Mitől lesz valami hal, kétéltű, hüllő, madár vagy emlős, és hogyan alkalmazkodnak az állatok.',
      tags: ['állatok', 'gerinctelenek', 'csalánozók', 'gyűrűsférgek', 'puhatestűek', 'ízeltlábúak', 'rovarok', 'pókok', 'rákok', 'átalakulás', 'gerincesek', 'halak', 'kétéltűek', 'hüllők', 'madarak', 'emlősök', 'testhőmérséklet', 'alkalmazkodás', 'téli álom', 'madárvonulás', 'rejtőszín'],
      sections: [
        {
          title: 'A gerinctelenek: a csendes többség',
          text: 'Az állatfajok kb. **95%-ának nincs gerince**: ők a **gerinctelenek**. A legfontosabb csoportjaik:\n\n- **Csalánozók**: a medúzák, a korallok és a hidra. Csalánsejtjeikkel bénítják meg zsákmányukat. (Ezért csíp a medúza!)\n- **Gyűrűsférgek**: például a **földigiliszta**, amely járataival lazítja és trágyázza a talajt, vagy a pióca.\n- **Puhatestűek**: puha testüket gyakran mészhéj védi. Ide tartoznak a **csigák**, a **kagylók** és a **fejlábúak** (a polip és a tintahal), amelyek nagyon okos állatok.\n- **Ízeltlábúak**: a legnépesebb csoport! Testüket kemény külső váz borítja, lábaik ízekből állnak. A páncél nem nő együtt az állattal, ezért időnként **vedlenek**.\n\nAz ízeltlábúak fő csoportjai: a **rovarok** (6 láb, testük fej, tor és potroh), a **pókszabásúak** (8 láb, pl. pókok, kullancsok), a **rákok** (pl. folyami rák, ászkarák) és a **soklábúak** (pl. százlábú).',
          tip: 'Hány lába van? Ezzel a kérdéssel gyorsan eldöntheted: a 6 lábú rovar, a 8 lábú pókszabású. A pók tehát nem rovar!'
        },
        {
          title: 'Átalakulás a rovaroknál',
          text: 'Sok rovar életében látványos változás zajlik le, ez az **átalakulás**.\n\n- **Teljes átalakulás**: pete → **lárva** → **báb** → kifejlett rovar. A lepke lárvája a hernyó, amely sokat eszik, majd bebábozódik, és a bábból kel ki a lepke. Így fejlődik a katicabogár, a méh és a légy is.\n- **Kifejlés** (átalakulás bábállapot nélkül): pete → **lárva** → kifejlett rovar. A szöcske lárvája hasonlít a kifejlett állathoz, csak kisebb és szárnyatlan; vedlésről vedlésre nő. Így fejlődik a szitakötő is, amelynek lárvája a vízben él.'
        },
        {
          title: 'A gerincesek öt osztálya',
          text: 'A **gerinceseknek** belső csontvázuk és gerincoszlopuk van. Öt nagy osztályba soroljuk őket:\n\n- **Halak**: vízben élnek, **kopoltyúval** lélegeznek, testüket pikkely borítja, úszóikkal mozognak. Oldalvonal-szervükkel érzékelik a víz rezgéseit. Ikrát raknak.\n- **Kétéltűek**: „két életet” élnek. A béka lárvája, az **ebihal**, vízben él és kopoltyúval lélegzik, a kifejlett béka **tüdővel** és nedves, csupasz **bőrével** lélegzik. Petéiket vízbe rakják. Ide tartozik a gőte és a szalamandra is.\n- **Hüllők**: bőrüket száraz **szarupikkely** védi, tüdővel lélegeznek, és héjas tojásaikat a szárazföldre rakják. Ilyen a gyík, a kígyó, a teknős és a krokodil.\n- **Madarak**: testüket **toll** borítja, mellső végtagjuk **szárny**, fogatlan **csőrük** van. Csontjaik üregesek, ezért könnyűek. Meszes héjú tojásaikat kikeltik.\n- **Emlősök**: testüket **szőr** borítja, kicsinyeiket **tejjel** táplálják (innen a nevük). A legtöbbjük elevenszülő.\n\nA halak, a kétéltűek és a hüllők **változó testhőmérsékletűek**: a testük olyan meleg, mint a környezetük, ezért hidegben lelassulnak. A madarak és az emlősök **állandó testhőmérsékletűek**: télen-nyáron melegek, de ehhez sok táplálék kell.'
        },
        {
          title: 'Alkalmazkodás: túlélni ügyesen',
          text: 'Minden élőlény testfelépítése és viselkedése a környezetéhez **alkalmazkodott**. Néhány példa:\n\n- A **sivatagi róka** (fennek) nagy fülei hűtik a testét, a **jegesmedvét** vastag zsírréteg és sűrű bunda védi a hidegtől.\n- A **sün** és a **mogyorós pele** **téli álmot** alszik: testhőmérséklete lecsökken, és a nyáron felhalmozott zsírtartalékából él.\n- A **fecske** és a **gólya** ősszel délre, Afrikába **vonul**, mert télen nálunk nem találna rovarokat, békákat.\n- A **rejtőszín** elrejt: a botsáska ágnak látszik, a hermelin bundája télen fehérre vált.\n- A **vakond** lapátszerű mellső lábával kiválóan ás a föld alatt.',
          widget: { type: 'parositas', options: { title: 'Melyik állatcsoport jellemzője?', count: 6, pairs: [
            ['Kopoltyú, pikkely, úszók', 'Halak'],
            ['Ebihal lárva, csupasz bőr', 'Kétéltűek'],
            ['Száraz szarupikkely, héjas tojás', 'Hüllők'],
            ['Toll, csőr, üreges csontok', 'Madarak'],
            ['Szőr, tejjel táplálja kicsinyeit', 'Emlősök'],
            ['6 láb, fej, tor, potroh', 'Rovarok'],
            ['8 láb', 'Pókszabásúak'],
            ['Csalánsejtek', 'Csalánozók']
          ] } }
        }
      ],
      quiz: [
        { q: 'Hány lába van egy rovarnak?', options: ['4', '8', '10', '6'], answer: 3, explain: 'A rovaroknak 6 lábuk van, a pókszabásúaknak 8.' },
        { q: 'Melyik gerinces osztályba tartozik a béka?', options: ['Hüllők', 'Kétéltűek', 'Halak', 'Emlősök'], answer: 1, explain: 'A béka lárvája, az ebihal vízben él és kopoltyúval lélegzik, a kifejlett béka tüdővel és bőrével.' },
        { q: 'Melyik állatcsoport állandó testhőmérsékletű?', options: ['A madarak', 'A hüllők', 'A halak', 'A kétéltűek'], answer: 0, explain: 'A madarak és az emlősök állandó testhőmérsékletűek.' },
        { q: 'Mi a teljes átalakulás helyes sorrendje?', options: ['Pete → báb → lárva → kifejlett rovar', 'Lárva → pete → báb → kifejlett rovar', 'Pete → lárva → báb → kifejlett rovar', 'Báb → pete → lárva → kifejlett rovar'], answer: 2, explain: 'A lepke petéjéből hernyó (lárva) kel, abból báb lesz, a bábból kel ki a lepke.' }
      ]
    },
    {
      id: 'okologia',
      title: 'Életközösségek és természetvédelem',
      level: 2, minutes: 15,
      summary: 'Termelők, fogyasztók és lebontók; táplálékláncok; hazai életközösségek az erdőben, a mezőn és a vízparton; védett fajok és nemzeti parkok.',
      tags: ['ökológia', 'életközösség', 'élőhely', 'populáció', 'termelő', 'fogyasztó', 'lebontó', 'tápláléklánc', 'táplálékhálózat', 'erdő', 'tölgyes', 'mező', 'gyep', 'vízpart', 'nádas', 'védett faj', 'fokozottan védett', 'nemzeti park', 'Hortobágy', 'invazív faj'],
      sections: [
        {
          title: 'Mindenki mindenkivel összefügg',
          text: 'Az **ökológia** azt vizsgálja, hogyan kapcsolódnak az élőlények egymáshoz és a környezetükhöz. Néhány alapfogalom:\n\n- **Élőhely**: az a hely, ahol egy élőlény él (pl. a nádas).\n- **Populáció**: egy faj egy területen együtt élő egyedei (pl. egy tó összes tavi békája).\n- **Életközösség** (társulás): egy területen együtt élő, egymással kapcsolatban álló különböző fajok populációi (pl. egy tölgyes erdő összes növénye, állata, gombája).\n\nAz életközösség tagjait szerepük szerint három csoportba soroljuk:\n\n- **Termelők**: a zöld növények (és algák), amelyek fotoszintézissel maguk állítják elő a táplálékot.\n- **Fogyasztók**: a növényevők (pl. őz, nyúl, hernyó) és a ragadozók (pl. róka, cinege, sas).\n- **Lebontók**: a gombák, a baktériumok és sok talajlakó állat (pl. a földigiliszta), amelyek az elhalt maradványokat lebontják, így az ásványi anyagok visszakerülnek a talajba.'
        },
        {
          title: 'Ki kit eszik? A tápláléklánc',
          text: 'A **tápláléklánc** megmutatja, hogyan jut el a táplálék, és vele az energia, egyik élőlénytől a másikig. Mindig egy termelővel kezdődik:\n\n- tölgylevél → tölgyfa-hernyó → széncinege → karvaly\n- fű → mezei nyúl → vörös róka\n- moszat → vízibolha → keszeg → csuka\n\nA valóságban a láncok összekapcsolódnak, mert egy állat többfélét is eszik, és többen is vadásznak rá: így alakul ki a **táplálékhálózat**.\n\nMinden lépésnél az energia nagy része (kb. **90%-a**) elvész, főleg hő formájában és a mozgásra. Ezért sokkal több fű kell, mint nyúl, és sokkal több nyúl, mint róka. A csúcsragadozókból mindig kevés van, és ezért ők a legsérülékenyebbek is.',
          tip: 'Ha egy láncszem eltűnik, az egész hálózat megérzi. Ha például kipusztítják a ragadozókat, elszaporodnak a növényevők, és letarolják a növényzetet.'
        },
        {
          title: 'Hazai életközösségek',
          text: '**Az erdő.** Egy hazai **tölgyes** szinteződik, mint egy többemeletes ház:\n\n- **lombkoronaszint**: tölgy, gyertyán, bükk,\n- **cserjeszint**: som, galagonya, mogyoró,\n- **gyepszint**: tavasszal hóvirág, salátaboglárka, gyöngyvirág,\n- **mohaszint** és **avar**: itt dolgoznak a lebontók.\n\nAz erdő lakói között van gímszarvas, vaddisznó, borz, nagy fakopáncs és a védett **szarvasbogár**.\n\n**A mező és a gyep.** A füves területeken nő a pipacs, a búzavirág és a zsálya. Itt él az **ürge**, a mezei pocok, a mezei nyúl, az égen pedig ragadozó madarak köröznek. A nagy alföldi pusztákon él a fokozottan védett **túzok**, Európa egyik legnehezebb repülni képes madara.\n\n**A vízpart.** A tavak, folyók partján **nádas** és gyékényes, fűzfák és nyárfák alkotják a növényzetet. Itt vadászik a **szürke gém**, a halakra a **vidra** és a jégmadár, a nádasban fészkel a nádirigó, a víz fölött szitakötők cikáznak, és békák kuruttyolnak.'
        },
        {
          title: 'Természetvédelem és nemzeti parkok',
          text: 'Az élőhelyek pusztulása (beépítés, lecsapolás, szennyezés), a túlzott vadászat és az **invazív**, azaz behurcolt és gyorsan terjedő fajok (pl. a parlagfű vagy a selyemkóró) sok őshonos fajt veszélyeztetnek.\n\nMagyarországon a ritka és veszélyeztetett fajok **védettek** vagy **fokozottan védettek**: tilos őket elpusztítani, befogni, zavarni vagy a növényeket leszedni. Fokozottan védett például a **rétisas**, a **túzok** és a **parlagi sas**; védett a **gyurgyalag**, a **szarvasbogár** és sok orchideafaj.\n\nA legértékesebb tájakat **nemzeti parkok** őrzik. Magyarországon **10 nemzeti park** van. Az első a **Hortobágyi Nemzeti Park** (1973), amely a világörökség része. A többi: Kiskunsági, Bükki, Aggteleki (cseppkőbarlangjairól híres), Fertő–Hansági, Duna–Drávai, Körös–Maros, Balaton-felvidéki, Duna–Ipoly és Őrségi Nemzeti Park.',
          warn: 'Kiránduláskor maradj a jelzett úton, ne szedj védett virágot, és vidd haza a szemetedet! A fészkelő madarakat és a fiatal állatokat ne zavard: a „magányos” őzgida mellől sem hagyta el igazán az anyja.',
          widget: { type: 'parositas', options: { title: 'Ökológiai szerepek', count: 6, pairs: [
            ['Tölgyfa', 'Termelő'],
            ['Mezei nyúl', 'Növényevő fogyasztó'],
            ['Vörös róka', 'Ragadozó fogyasztó'],
            ['Csiperkegomba', 'Lebontó'],
            ['Lombkoronaszint', 'Az erdő legfelső szintje'],
            ['Hortobágy', 'Az első magyar nemzeti park'],
            ['Parlagfű', 'Behurcolt, invazív faj'],
            ['Túzok', 'Fokozottan védett pusztai madár']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mivel kezdődik minden tápláléklánc?', options: ['Egy ragadozóval', 'Egy lebontóval', 'Egy termelővel (zöld növénnyel)', 'Egy növényevővel'], answer: 2, explain: 'A zöld növények állítják elő fotoszintézissel azt a táplálékot, amely aztán a láncon továbbjut.' },
        { q: 'Mi a lebontók szerepe?', options: ['Elhalt maradványokat bontanak le, így az anyagok visszakerülnek a talajba', 'Oxigént termelnek', 'Ragadozókra vadásznak', 'Beporozzák a virágokat'], answer: 0, explain: 'A gombák, baktériumok és talajlakó állatok nélkül az elhalt anyagok felhalmozódnának.' },
        { q: 'Hány nemzeti park van Magyarországon?', options: ['3', '5', '20', '10'], answer: 3, explain: 'Tíz nemzeti parkunk van; a legelső a Hortobágyi Nemzeti Park (1973).' },
        { q: 'Mi az invazív faj?', options: ['Egy fokozottan védett őshonos faj', 'Behurcolt, gyorsan terjedő faj, amely kiszorítja az őshonosakat', 'A tápláléklánc csúcsán álló ragadozó', 'Egy kihalt faj'], answer: 1, explain: 'Ilyen például a parlagfű és a selyemkóró.' }
      ]
    },
    {
      id: 'emberi-test-1',
      title: 'Az emberi test I.: mozgás, keringés, légzés, emésztés',
      level: 1, minutes: 16,
      summary: 'Csontok és izmok, a szív és a vérkeringés, a légzés útja, az emésztés lépései, és mit tehetsz az egészségedért.',
      tags: ['csontváz', 'csont', 'ízület', 'izom', 'gerinc', 'szív', 'vérkeringés', 'artéria', 'véna', 'hajszálér', 'vér', 'vörösvérsejt', 'fehérvérsejt', 'pulzus', 'légzés', 'tüdő', 'léghólyagocska', 'rekeszizom', 'emésztés', 'gyomor', 'vékonybél', 'máj', 'egészséges életmód', 'táplálkozás', 'alvás'],
      models: ['sziv'],
      sections: [
        {
          title: 'A mozgás: csontok, ízületek, izmok',
          text: 'Egy felnőtt ember csontváza kb. **206 csontból** áll. (Egy újszülöttnek ennél jóval több csontja van, ezek egy része később összenő.) A csontváz **tart**, **véd** (a koponya az agyat, a bordák a szívet és a tüdőt), és a csontok vörös **csontvelőjében** képződnek a vérsejtek. A csont kemény anyaga főleg **kalciumot** tartalmaz: ehhez tej, tejtermékek, mák, zöldségek kellenek.\n\nA csontok az **ízületekben** kapcsolódnak mozgathatóan, például a térdben, a vállban vagy az ujjakban. A **gerincoszlop** kettős S alakú: rugózik, ahogy jársz. A helyes testtartás és a nem túl nehéz iskolatáska sokat segít a gerinc egészségének megőrzésében.\n\nA csontokat a **vázizmok** mozgatják. Az izom csak **húzni** tud, tolni nem, ezért az izmok **párban** dolgoznak: amikor behajlítod a karod, a **bicepsz** összehúzódik, a **tricepsz** elernyed; kinyújtáskor fordítva. A szív saját, fáradhatatlan **szívizomból** áll, a belső szervek falában pedig **simaizom** dolgozik, akaratunktól függetlenül.'
        },
        {
          title: 'A szív és a vérkeringés',
          text: 'A **szív** ökölnyi, izmos pumpa a mellkasod közepén, kissé balra. Egy perc alatt nyugalomban kb. 60–100-at ver felnőttben (gyerekekben kicsit többet), és egy élet alatt több mint kétmilliárdot. Négy üregből áll: két **pitvarból** és két **kamrából**. A **billentyűk** szelepként biztosítják, hogy a vér csak egy irányba áramoljon. Nézd meg a [[sziv|szív modelljében]], hogyan!\n\nA vér két körben kering:\n\n- **Kis vérkör**: a jobb kamra a tüdőbe pumpálja a vért, ahol a vér oxigént vesz fel és szén-dioxidot ad le.\n- **Nagy vérkör**: a bal kamra az oxigéndús vért az egész testbe juttatja.\n\nA szívből kifelé vezető erek az **artériák** (verőerek), a szívbe visszavezetők a **vénák** (gyűjtőerek). A kettő között a vékony **hajszálerek** hálózata fut, itt történik az anyagcsere a sejtekkel. A csuklódon vagy a nyakadon tapintható lüktetés a **pulzus**.\n\nA felnőtt emberben kb. **5 liter vér** van. Alkotórészei:\n\n- **vörösvérsejtek**: az oxigént szállítják (a vörös színű hemoglobin segítségével),\n- **fehérvérsejtek**: a kórokozók ellen védekeznek,\n- **vérlemezkék**: sérüléskor a véralvadást segítik,\n- **vérplazma**: a folyékony rész, amely tápanyagokat és más anyagokat szállít.'
        },
        {
          title: 'A légzés',
          text: 'A levegő útja: **orr** (itt megszűrődik, felmelegszik és párásodik) → **garat** → **gége** (itt vannak a hangszalagok) → **légcső** → **hörgők** → **tüdő**.\n\nA tüdőben a hörgők egyre vékonyabb ágakra oszlanak, és apró **léghólyagocskákban** végződnek. Ezek falán át az **oxigén** a vérbe jut, a **szén-dioxid** pedig a vérből a levegőbe: ez a **gázcsere**. A léghólyagocskák összfelülete akkora, mint egy kisebb lakás alapterülete!\n\nBelégzéskor a **rekeszizom** összehúzódik és lesüllyed, a bordaközi izmok megemelik a bordákat: a mellkas kitágul, és beáramlik a levegő. Kilégzéskor az izmok elernyednek, a mellkas összeszűkül.',
          warn: 'A dohányfüst (és az e-cigaretta gőze is) károsítja a légutakat és a tüdőt. A dohányzás a tüdőrák legfőbb oka, és a passzív dohányzás, vagyis a más füstjének belélegzése is ártalmas.'
        },
        {
          title: 'Az emésztés',
          text: 'A táplálék hosszú utat jár be, amíg a sejtjeid fel tudják használni:\n\n1. **Száj**: a **fogak** felaprítják az ételt, a **nyál** megnedvesíti, és megkezdi a keményítő bontását.\n2. **Nyelőcső**: izmos cső, amely a gyomorba juttatja a falatot.\n3. **Gyomor**: a gyomornedv **sósavat** és fehérjebontó enzimet tartalmaz; a sav a kórokozók nagy részét is elpusztítja.\n4. **Vékonybél**: kb. 5–6 méter hosszú. Ide ömlik a **máj** által termelt **epe** (a zsírok emésztését segíti) és a **hasnyálmirigy** emésztőnedve. A bél falán lévő apró **bolyhok** szívják fel a tápanyagokat a vérbe.\n5. **Vastagbél**: visszaszívja a vizet; a benne élő hasznos baktériumok is segítik az emésztést. A maradék salakanyag a végbélen át távozik.\n\nA gyerekeknek 20 **tejfoga** van, ezeket a felnőttkori 32 **maradó fog** váltja fel. Naponta kétszer moss fogat!'
        },
        {
          title: 'Egészséges életmód',
          text: 'Néhány egyszerű szokással sokat tehetsz a testedért:\n\n- **Változatos étrend**: sok zöldség és gyümölcs, teljes kiőrlésű gabona, tej és tejtermékek, hal, hüvelyesek; kevesebb cukor, só és zsíros, olajban sült étel.\n- **Víz**: a cukros üdítők helyett igyál vizet, napi kb. 1,5–2 litert.\n- **Mozgás**: a gyerekeknek és a kamaszoknak naponta **legalább 60 perc** közepes vagy élénk mozgás ajánlott: futás, kerékpár, úszás, labdajáték, tánc.\n- **Alvás**: a 6–12 éveseknek 9–12, a 13–18 éveseknek 8–10 óra alvás kell. Lefekvés előtt jobb letenni a telefont.\n- **Higiénia**: kézmosás étkezés előtt és mosdó után, fogmosás.',
          widget: { type: 'parositas', options: { title: 'Szerv és feladat', count: 6, pairs: [
            ['Szív', 'Keringeti a vért'],
            ['Vörösvérsejt', 'Oxigént szállít'],
            ['Fehérvérsejt', 'A kórokozók ellen véd'],
            ['Léghólyagocska', 'Itt zajlik a gázcsere'],
            ['Rekeszizom', 'A belégzés fő izma'],
            ['Vékonybél', 'Itt szívódnak fel a tápanyagok'],
            ['Máj', 'Epét termel'],
            ['Ízület', 'Mozgathatóan kapcsolja össze a csontokat']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik ér szállítja a vért a szívből kifelé?', options: ['A véna', 'Az artéria', 'A nyirokér', 'A légcső'], answer: 1, explain: 'Az artériák (verőerek) a szívtől elvezető erek, a vénák (gyűjtőerek) a szívbe vezetnek.' },
        { q: 'Hol történik a gázcsere a tüdőben?', options: ['A gégében', 'A légcsőben', 'A léghólyagocskákban', 'Az orrban'], answer: 2, explain: 'A léghólyagocskák vékony falán át jut az oxigén a vérbe, és a szén-dioxid a vérből a levegőbe.' },
        { q: 'Hol szívódik fel a tápanyagok nagy része?', options: ['A vékonybélben', 'A gyomorban', 'A nyelőcsőben', 'A szájban'], answer: 0, explain: 'A vékonybél bolyhai hatalmas felületen veszik fel a tápanyagokat.' },
        { q: 'Miért dolgoznak párban az izmok?', options: ['Mert egyedül túl gyengék', 'Mert így kevesebb energiát fogyasztanak', 'Mert a csontok így könnyebbek', 'Mert az izom csak húzni tud, tolni nem'], answer: 3, explain: 'Hajlításkor az egyik, nyújtáskor a másik izom húzódik össze, például a bicepsz és a tricepsz.' }
      ]
    },
    {
      id: 'emberi-test-2',
      title: 'Az emberi test II.: idegrendszer, érzékszervek, egészség',
      level: 2, minutes: 16,
      summary: 'Az agy és az idegek, a látás és a hallás, a kamaszkor változásai, a függőségek veszélyei és az elsősegély alapjai.',
      tags: ['idegrendszer', 'agy', 'gerincvelő', 'idegsejt', 'reflex', 'nagyagy', 'kisagy', 'agytörzs', 'érzékszervek', 'szem', 'fül', 'hallócsontok', 'kamaszkor', 'pubertás', 'hormonok', 'függőség', 'nikotin', 'alkohol', 'elsősegély', '112', 'stabil oldalfekvés', 'újraélesztés'],
      models: ['agy', 'szem'],
      sections: [
        {
          title: 'Az idegrendszer: a test irányítóközpontja',
          text: 'Az idegrendszer gyűjti az információt a környezetből és a testedből, feldolgozza, és utasításokat küld az izmoknak, szerveknek.\n\n- A **központi idegrendszer** az **agy** és a gerinccsatornában futó **gerincvelő**.\n- A **környéki idegrendszer** az idegek hálózata, amely az egész testet behálózza.\n\nAz idegrendszer alapegysége az **idegsejt** (neuron). Hosszú nyúlványain elektromos jelek, **ingerületek** futnak végig, akár 100 méter/másodperces sebességgel. Az agyban kb. 86 milliárd idegsejt van!\n\nAz agy fő részei:\n\n- **nagyagy**: gondolkodás, tanulás, emlékezés, beszéd, az akaratlagos mozgások és az érzékelés,\n- **kisagy**: az egyensúly és a mozgások összehangolása (ezért tudsz biciklizni),\n- **agytörzs**: a légzés és a szívműködés automatikus szabályozása.\n\nAz agy lebenyeit és azt, hogyan fut végig egy jel az idegsejteken, az [[agy|agy modelljében]] fedezheted fel.\n\nA **reflex** gyors, akaratunktól független válasz egy ingerre. Ha forró tárgyhoz érsz, a kezed már azelőtt visszarántod, hogy a fájdalmat tudatosan éreznéd: a jelet a gerincvelő azonnal „visszafordítja” az izmok felé.',
          tip: 'Alvás közben az agy rendezi a nap során tanultakat. Ezért a dolgozat előtti éjszakai magolásnál többet ér a kipihent fej.'
        },
        {
          title: 'Az érzékszervek',
          text: '**A szem.** A fény a **szaruhártyán** és a **pupillán** át jut be. A pupilla méretét a színes **szivárványhártya** szabályozza: erős fényben szűkül, sötétben tágul. A **lencse** élesre állítja a képet az **ideghártyán** (retinán). Az ideghártyán kétféle fényérzékelő sejt van: a **csapok** a színlátásért, a **pálcikák** a gyenge fényben való látásért felelnek. A jelet a **látóideg** viszi az agyba. A szem részeit a [[szem|szem modelljében]] szét is szedheted.\n\nHa valaki **rövidlátó**, a távoli tárgyakat látja homályosan, és szóró lencsés szemüveg segít neki; a **távollátó** a közelieket látja rosszul, neki gyűjtőlencse kell.\n\n**A fül.** A hang a **hallójáraton** át a **dobhártyát** rezgeti meg. A rezgést a test legkisebb csontjai, a **hallócsontok** (kalapács, üllő, kengyel) adják tovább a belső fülbe, a folyadékkal telt **csigába**, ahol érzékelő sejtek idegi jellé alakítják. A belső fülben vannak az **ívjáratok** is: ezek az **egyensúlyérzékelés** szervei.\n\nA **bőrrel** tapintást, nyomást, hőt és fájdalmat érzékelünk, az **orrunkkal** szagolunk, a **nyelvünkkel** ízlelünk (édes, sós, savanyú, keserű és umami).',
          warn: 'A túl hangos zene maradandóan károsíthatja a hallást. Fülhallgatóval tartsd a hangerőt legfeljebb 60%-on, és tarts szünetet!'
        },
        {
          title: 'A kamaszkor változásai',
          text: 'A **kamaszkor** (serdülőkor, pubertás) a gyermekből felnőtté válás időszaka. A változásokat **hormonok** indítják el: ezek a vérrel szállított „vegyi üzenetek”, amelyeket mirigyek termelnek. Az agyalapi mirigy jelzésére a nemi mirigyek több nemi hormont kezdenek termelni.\n\nA változások lányoknál általában 8–13, fiúknál 9–14 éves kor között kezdődnek. Mindenkinél más időben és más ütemben zajlanak, és ez teljesen **normális**.\n\n- **Mindenkinél**: gyors növekedés („megnyúlás”), szőrnövekedés a hónaljban és a nemi szervek környékén, erősebb izzadás, pattanások.\n- **Lányoknál**: a mell fejlődése, a csípő kiszélesedése, megindul a **menstruáció** (havi vérzés).\n- **Fiúknál**: a hang mélyebb lesz (**mutálás**), szélesedik a váll, erősödik az izomzat, megjelenik az arcszőrzet, és megkezdődik az ondósejtek termelése.\n\nAz érzelmek is hullámozhatnak: egyszer nagyon vidám vagy, máskor ok nélkül szomorú vagy ingerült. Ez is a hormonok és a fejlődő agy természetes velejárója. Ebben a korban még fontosabb a rendszeres tisztálkodás, a sok alvás és az, hogy legyen kivel beszélgetni: szülővel, tanárral, iskolapszichológussal vagy védőnővel.'
        },
        {
          title: 'A függőségek veszélyei',
          text: '**Függőségről** akkor beszélünk, ha valaki nem tud lemondani egy szerről vagy tevékenységről, akkor sem, ha az árt neki. A szer egyre nagyobb mennyiségben kell, és nélküle rosszul érzi magát.\n\n- A **nikotin** (cigaretta, e-cigaretta, hevített dohány) nagyon gyorsan függőséget okoz. A dohányzás károsítja a tüdőt, a szívet és az ereket.\n- Az **alkohol** a fejlődő agyat különösen károsítja; 18 év alatt tilos kiszolgálni. Nagy mennyiségben mérgezést, akár eszméletvesztést is okoz.\n- A **drogok** kiszámíthatatlanok: egyetlen alkalom is súlyos, akár halálos következménnyel járhat.\n- **Viselkedési függőség** is létezik: például a videojátékok vagy a közösségi média túlzott, kontrollálhatatlan használata.\n\nNemet mondani nem ciki, hanem bátorság. Ha nehéz helyzetbe kerülsz, kérj segítséget egy felnőttől. Gyerekként és kamaszként a **Kék Vonal** ingyenes telefonszámát, a **116-111**-et is hívhatod.'
        },
        {
          title: 'Az elsősegély alapjai',
          text: 'Elsősegélyt **bárki** nyújthat, és a legfontosabb lépés, hogy ne hagyd magára a bajba jutottat.\n\n1. **Biztonság**: először nézz körül! Ne kerülj te is veszélybe (pl. forgalom, áram).\n2. **Szólítsd meg**, rázd meg finoman a vállát: reagál-e? Lélegzik-e normálisan?\n3. **Kérj segítséget**: hívd az egységes segélyhívó számot, a **112**-t, vagy kérd meg erre a körülötted állókat. Mondd el, hol vagy és mi történt.\n4. Ha **eszméletlen, de lélegzik**: fektesd **stabil oldalfekvésbe**, hogy a nyelve vagy a hányadék ne zárja el a légutat.\n5. Ha **nem lélegzik normálisan**: kezdd el az **újraélesztést**: erős, gyors (percenként 100–120) nyomásokat a mellkas közepére. Ha van a közelben **AED** (automata defibrillátor), hozasd ide: hangosan elmondja, mit kell tenni.\n\nKisebb sérüléseknél:\n\n- **Vérző seb**: tiszta kötszerrel nyomd le erősen a sebet.\n- **Égés**: hűtsd az égett bőrt langyos-hűvös **folyó csapvízzel** 10–20 percig. Jeget ne tegyél rá!\n- **Orrvérzés**: döntsd **előre** a fejet, és nyomd össze az orrszárnyakat kb. 10 percig. (Hátra nem szabad hajtani, mert a vér lefolyik a torokba.)',
          tip: 'Az elsősegélyt legjobb gyakorolni: sok iskolában és a Vöröskeresztnél is van elsősegély-tanfolyam, ahol babán próbálhatod ki az újraélesztést.',
          widget: { type: 'parositas', options: { title: 'Idegrendszer, érzékszervek, elsősegély', count: 6, pairs: [
            ['Kisagy', 'Egyensúly és mozgáskoordináció'],
            ['Agytörzs', 'Légzés és szívműködés szabályozása'],
            ['Reflex', 'Gyors, akaratlan válasz egy ingerre'],
            ['Pupilla', 'A szembe jutó fény nyílása'],
            ['Csapok', 'A színlátás sejtjei'],
            ['Ívjáratok', 'Egyensúlyérzékelés'],
            ['112', 'Egységes segélyhívó szám'],
            ['Stabil oldalfekvés', 'Eszméletlen, de lélegző sérültnek']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik agyrész felel elsősorban az egyensúlyért és a mozgások összehangolásáért?', options: ['A nagyagy', 'Az agytörzs', 'A gerincvelő', 'A kisagy'], answer: 3, explain: 'A kisagy hangolja össze a mozgásokat; a légzést és a szívműködést az agytörzs szabályozza.' },
        { q: 'Mit tegyél, ha valaki eszméletlen, de normálisan lélegzik?', options: ['Itass vele vizet', 'Fektesd stabil oldalfekvésbe, és hívd a 112-t', 'Kezdj azonnal mellkasnyomásba', 'Hagyd pihenni egyedül'], answer: 1, explain: 'A stabil oldalfekvés szabadon tartja a légutakat. Újraélesztés akkor kell, ha nem lélegzik normálisan.' },
        { q: 'Mi a helyes teendő orrvérzéskor?', options: ['Fejet előre dönteni, orrszárnyakat összenyomni', 'Fejet hátrahajtani', 'Lefeküdni a hátára', 'Erősen kifújni az orrot'], answer: 0, explain: 'Hátrahajtott fejjel a vér a torokba folyik, ami hányingert okozhat.' },
        { q: 'Mi indítja el a kamaszkor testi változásait?', options: ['A vitaminok', 'A sok mozgás', 'A hormonok', 'A hallócsontok'], answer: 2, explain: 'Az agyalapi mirigy jelzésére a nemi mirigyek hormonjai indítják el a változásokat.' }
      ]
    }
  ]
});
