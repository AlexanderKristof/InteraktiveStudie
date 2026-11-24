/* Nyelvtanulás – Angol (A1–A2). Kiegészíti a data/tantargyak/angol.js tantárgyat: itt rövid, játékos gyakorlókörök vannak. */
STUDIE.addLangCourse({
  id: 'angol', title: 'Angol', flag: '🇬🇧', tts: 'en-GB', badge: 'A1–A2',
  noSpaces: false, script: false,
  intro: 'Az angol a világ legtöbbet tanult nyelve: kb. 1,5 milliárd ember beszéli, de közülük csak minden negyedik anyanyelvi – vagyis ha angolul tanulsz, a világ nagy részével szóba állhatsz.',
  units: [
    {
      id: 'koszones', title: 'Köszönés és bemutatkozás', icon: '👋',
      tip: '**Kiejtés: th és w**\n\nAz angolban sok hang nincs meg a magyarban, és az írás nem mindig árulja el a kiejtést.\n\n- **th**: a nyelved hegyét tedd a felső fogaid alá, és fújj ki levegőt. Zöngétlenül: `thank you`, `three`; zöngésen: `this`, `the`, `mother`. Ne mondd sz-nek, t-nek vagy d-nek!\n- **w**: kerekítsd a szádat, mintha u-t mondanál, és onnan nyisd ki: `what`, `welcome`. Nem magyar v!\n- **h**: mindig kiejtjük (`hello`, `how`), kivéve néhány szót, pl. `hour`.\n\nKöszönésnél a napszak számít: `Good morning` délig, `Good afternoon` délután, `Good evening` este. A `Good night` csak elköszönés, lefekvés előtt.',
      words: [['Hello', 'szia'], ['Good morning', 'jó reggelt'], ['Good afternoon', 'jó napot (délután)'], ['Good evening', 'jó estét'], ['Good night', 'jó éjszakát'],
        ['Goodbye', 'viszontlátásra'], ['Bye', 'viszlát'], ['please', 'kérlek'], ['thank you', 'köszönöm'], ['sorry', 'bocsánat'], ['yes', 'igen'], ['no', 'nem'],
        ['name', 'név'], ['friend', 'barát'], ['How are you?', 'Hogy vagy?'], ['fine', 'jól'], ['Nice to meet you', 'örülök, hogy megismerlek'], ['boy', 'fiú'], ['girl', 'lány']],
      sentences: [
        ['Hello, I am Anna.', 'Szia, Anna vagyok.', ['Hello, I\'m Anna.', 'Hello, my name is Anna.'], ['Szia, Annának hívnak.', 'Szia, a nevem Anna.']],
        ['My name is Tom.', 'Tomnak hívnak.', ['I am Tom.', 'I\'m Tom.'], ['A nevem Tom.', 'Az én nevem Tom.', 'Tom vagyok.']],
        ['What is your name?', 'Hogy hívnak?', ['What\'s your name?'], ['Mi a neved?', 'Téged hogy hívnak?', 'Mi a neve?', 'Önt hogy hívják?']],
        ['How are you?', 'Hogy vagy?', [], ['Hogy vagytok?', 'Hogy van?']],
        ['I am fine, thank you.', 'Jól vagyok, köszönöm.', ['I\'m fine, thank you.', 'Fine, thank you.'], ['Köszönöm, jól vagyok.', 'Jól, köszönöm.']],
        ['Nice to meet you.', 'Örülök, hogy megismerlek.', [], ['Örülök, hogy megismerhetem.', 'Örvendek.']],
        ['Good morning, Tom!', 'Jó reggelt, Tom!'],
        ['Thank you, my friend.', 'Köszönöm, barátom.', [], ['Köszi, barátom.']],
        ['Yes, please.', 'Igen, kérem.', [], ['Igen, kérek.', 'Igen, kérlek.']],
        ['No, thank you.', 'Nem, köszönöm.', [], ['Köszönöm, nem.']],
        ['This is my friend Ben.', 'Ő a barátom, Ben.', ['This is Ben, my friend.'], ['Ez a barátom, Ben.', 'Ő Ben, a barátom.']],
        ['Sorry, I am late.', 'Bocsánat, elkéstem.', ['Sorry, I\'m late.'], ['Bocsánat a késésért.', 'Elnézést, elkéstem.']]
      ]
    },
    {
      id: 'szamok', title: 'Számok és életkor', icon: '🔢',
      tip: '**A „to be” ige: am, is, are**\n\nA magyarban azt mondjuk: „Tizenkét éves vagyok”, „Ő tanár” – az utóbbiban nincs ige. Az angolban **mindig kell ige**, ez a `to be` (lenni):\n\n- `I am` (I\'m) – én vagyok\n- `you are` (you\'re) – te vagy / ti vagytok / Ön\n- `he is`, `she is`, `it is` (he\'s, she\'s, it\'s)\n- `we are`, `they are`\n\nÉletkornál is ezt használjuk: `I am twelve.` vagy `I am twelve years old.` – sosem `I have twelve years`!\n\nTagadás: `not` az ige után (`I am not ten.`), kérdés: az ige az alany elé kerül (`Are you fifteen?`).\n\nSzámok: a 13–19 végén `-teen` (hosszú, hangsúlyos), a 20, 30… végén `-ty`. Figyelj: `thirteen` és `thirty` könnyen összekeverhető!',
      words: [['one', 'egy'], ['two', 'kettő'], ['three', 'három'], ['four', 'négy'], ['five', 'öt'], ['six', 'hat'], ['seven', 'hét'], ['eight', 'nyolc'],
        ['nine', 'kilenc'], ['ten', 'tíz'], ['eleven', 'tizenegy'], ['twelve', 'tizenkettő'], ['thirteen', 'tizenhárom'], ['fifteen', 'tizenöt'], ['twenty', 'húsz'],
        ['fifty', 'ötven'], ['a hundred', 'száz'], ['year', 'év'], ['number', 'szám']],
      sentences: [
        ['I am twelve years old.', 'Tizenkét éves vagyok.', ['I\'m twelve years old.', 'I am twelve.', 'I\'m twelve.'], ['Tizenkétéves vagyok.', 'Én tizenkét éves vagyok.']],
        ['How old are you?', 'Hány éves vagy?', [], ['Hány éves vagytok?', 'Hány éves?', 'Te hány éves vagy?']],
        ['Are you fifteen?', 'Tizenöt éves vagy?', ['Are you fifteen years old?'], ['Tizenötéves vagy?', 'Te tizenöt éves vagy?']],
        ['You are thirteen.', 'Tizenhárom éves vagy.', ['You\'re thirteen.'], ['Tizenhárom évesek vagytok.', 'Te tizenhárom éves vagy.']],
        ['I am not eleven.', 'Nem vagyok tizenegy éves.', ['I\'m not eleven.'], ['Én nem vagyok tizenegy éves.']],
        ['Is he twenty?', 'Ő húszéves?', ['Is he twenty years old?'], ['Húszéves?', 'Ő húsz éves?', 'Húsz éves?']],
        ['She is ten years old.', 'Ő tízéves.', ['She\'s ten years old.', 'She is ten.', 'She\'s ten.'], ['Tízéves.', 'Ő tíz éves.', 'Tíz éves.']],
        ['Two and two is four.', 'Kettő meg kettő az négy.', ['Two plus two is four.', 'Two and two are four.'], ['Kettő meg kettő négy.', 'Kettő plusz kettő az négy.', 'Kettő plusz kettő négy.']],
        ['Ten and ten is twenty.', 'Tíz meg tíz az húsz.', ['Ten plus ten is twenty.'], ['Tíz meg tíz húsz.', 'Tíz plusz tíz az húsz.', 'Tíz plusz tíz húsz.']],
        ['My number is seven.', 'Az én számom a hetes.', [], ['A számom a hetes.', 'A számom a hét.']],
        ['We are friends.', 'Barátok vagyunk.', ['We\'re friends.'], ['Mi barátok vagyunk.']],
        ['My grandfather is a hundred years old!', 'A nagypapám százéves!', [], ['A nagypapám száz éves!', 'Nagypapám százéves!']]
      ]
    },
    {
      id: 'csalad', title: 'A család', icon: '👨‍👩‍👧',
      tip: '**Kié? my, your, his, her és a \'s**\n\nA magyarban a birtokot ragokkal jelöljük (anyá**m**, anyá**d**). Az angolban a főnév elé teszünk egy szót:\n\n- `my` – az én …-m (my mother = anyám)\n- `your` – a te …-d / a ti …-tok\n- `his` – az ő …-ja (fiúé), `her` – az ő …-ja (lányé)\n- `our` – a mi …-nk, `their` – az ő …-juk\n\nFigyelj: a magyarban az „ő” nem árulja el, fiú-e vagy lány; az angolban igen! `his dog` = a fiú kutyája, `her dog` = a lány kutyája.\n\nHa a birtokos egy név: **\'s** kerül a végére: `Tom\'s dog` (Tom kutyája), `my sister\'s cat` (a lánytestvérem macskája).\n\nA `brother` és `sister` nem mondja meg, hogy idősebb vagy fiatalabb: báty, öcs = `brother`; nővér, húg = `sister`.',
      words: [['mother', 'anya'], ['father', 'apa'], ['parents', 'szülők'], ['brother', 'fiútestvér'], ['sister', 'lánytestvér'], ['grandmother', 'nagymama'],
        ['grandfather', 'nagypapa'], ['baby', 'kisbaba'], ['family', 'család'], ['uncle', 'nagybácsi'], ['aunt', 'nagynéni'], ['cousin', 'unokatestvér'],
        ['dog', 'kutya'], ['cat', 'macska'], ['tall', 'magas'], ['short', 'alacsony'], ['young', 'fiatal'], ['old', 'idős']],
      sentences: [
        ['This is my mother.', 'Ő az anyám.', [], ['Ez az anyám.', 'Ő az anyukám.', 'Ez az anyukám.']],
        ['My father is tall.', 'Az apám magas.', [], ['Apám magas.', 'Az apukám magas.', 'Apukám magas.']],
        ['I have a sister.', 'Van egy lánytestvérem.', ['I\'ve got a sister.', 'I have got a sister.'], ['Van egy húgom.', 'Van egy nővérem.', 'Nekem van egy lánytestvérem.']],
        ['Her brother is young.', 'A fiútestvére fiatal.', [], ['Az öccse fiatal.', 'A bátyja fiatal.']],
        ['His grandmother is old.', 'A nagymamája idős.', [], ['A nagymamája öreg.']],
        ['Tom\'s dog is old.', 'Tom kutyája öreg.', [], ['Tom kutyája idős.']],
        ['We are a big family.', 'Nagy család vagyunk.', ['We\'re a big family.'], ['Mi nagy család vagyunk.']],
        ['My parents are at home.', 'A szüleim otthon vannak.', [], ['Szüleim otthon vannak.']],
        ['Is your aunt young?', 'Fiatal a nagynénéd?', [], ['A nagynénéd fiatal?', 'Fiatal a nagynénje?', 'A nagynénje fiatal?']],
        ['Their baby is small.', 'A kisbabájuk kicsi.', [], ['A babájuk kicsi.', 'Kicsi a babájuk.', 'Kicsi a kisbabájuk.']],
        ['My uncle has a cat.', 'A nagybácsimnak van egy macskája.', ['My uncle has got a cat.'], ['Nagybácsimnak van egy macskája.', 'A nagybátyámnak van egy macskája.']],
        ['Anna is my cousin.', 'Anna az unokatestvérem.', [], ['Anna az én unokatestvérem.']],
        ['My grandfather is short.', 'A nagypapám alacsony.', [], ['Nagypapám alacsony.']]
      ]
    },
    {
      id: 'iskola', title: 'Iskola és tárgyak', icon: '🎒',
      tip: '**Névelők: a, an, the**\n\n- **a / an** = egy (határozatlan): valami, amiről most hallunk először, vagy egy a sok közül.\n- **the** = a, az (határozott): amiről már tudjuk, melyik.\n\nAz `a` és `an` közül a **kiejtés** dönt, nem a betű:\n\n- mássalhangzó hang előtt `a`: `a pen`, `a desk`, `a university` (ju- a hangja!)\n- magánhangzó hang előtt `an`: `an eraser`, `an umbrella`, `an hour` (a h néma)\n\nPont úgy, mint a magyar „a” és „az”, csak itt a határozatlan névelőnél van két alak. A `the` kiejtése is változik: mássalhangzó előtt „dö”, magánhangzó előtt „di” (`the apple`).\n\nFoglalkozás előtt is kell névelő: `She is a student.` (Ő diák.) – a magyarban ilyenkor nincs „egy”.',
      words: [['school', 'iskola'], ['classroom', 'osztályterem'], ['teacher', 'tanár'], ['student', 'diák'], ['book', 'könyv'], ['pen', 'toll'], ['pencil', 'ceruza'],
        ['bag', 'táska'], ['desk', 'pad'], ['chair', 'szék'], ['window', 'ablak'], ['door', 'ajtó'], ['board', 'tábla'], ['eraser', 'radír'], ['ruler', 'vonalzó'],
        ['map', 'térkép'], ['umbrella', 'esernyő'], ['lesson', 'tanóra'], ['homework', 'házi feladat']],
      sentences: [
        ['This is a pen.', 'Ez egy toll.'],
        ['It is an eraser.', 'Ez egy radír.', ['It\'s an eraser.', 'This is an eraser.'], []],
        ['The book is on the desk.', 'A könyv a padon van.', [], ['A padon van a könyv.']],
        ['Open the door, please.', 'Nyisd ki az ajtót, kérlek!', ['Please open the door.'], ['Kérlek, nyisd ki az ajtót!', 'Nyissátok ki az ajtót, kérlek!', 'Nyissa ki az ajtót, kérem!']],
        ['Close the window, please.', 'Csukd be az ablakot, kérlek!', ['Please close the window.'], ['Kérlek, csukd be az ablakot!', 'Csukjátok be az ablakot, kérlek!', 'Csukja be az ablakot, kérem!']],
        ['I have an umbrella.', 'Van egy esernyőm.', ['I\'ve got an umbrella.', 'I have got an umbrella.'], ['Nekem van egy esernyőm.']],
        ['The teacher is in the classroom.', 'A tanár az osztályteremben van.', [], ['A tanár a tanteremben van.', 'A tanárnő az osztályteremben van.']],
        ['My bag is under the chair.', 'A táskám a szék alatt van.', [], ['A szék alatt van a táskám.']],
        ['Where is the map?', 'Hol van a térkép?', ['Where\'s the map?'], ['Hol a térkép?']],
        ['She is a good student.', 'Ő jó diák.', ['She\'s a good student.'], ['Jó diák.']],
        ['Look at the board.', 'Nézd a táblát!', [], ['Nézzétek a táblát!', 'Nézd meg a táblát!', 'Nézze a táblát!']],
        ['We have a lot of homework.', 'Sok házi feladatunk van.', ['We have lots of homework.'], ['Sok a házi feladatunk.', 'Sok leckénk van.']]
      ]
    },
    {
      id: 'etel', title: 'Étel és ital', icon: '🍎',
      tip: '**Többes szám: -s, -es és a kivételek**\n\nA legtöbb főnév többes száma **-s**: `apple` → `apples`, `egg` → `eggs`.\n\n- -s, -sh, -ch, -x és sok -o végű szó után **-es**: `sandwiches`, `boxes`, `tomatoes`, `potatoes`\n- mássalhangzó + y → **-ies**: `baby` → `babies`\n- rendhagyók: `child` → `children`, `man` → `men`, `woman` → `women`, `foot` → `feet`\n\n**Számnév után is többes szám kell!** Magyarul „két tojás”, angolul `two eggs`. Ez a leggyakoribb magyar hiba.\n\nVannak **megszámlálhatatlan** főnevek, ezeknek nincs többes számuk és nem kapnak `a`-t: `water`, `milk`, `bread`, `cheese`. Ilyenkor `some` (egy kis, néhány) segít: `some water`, `some bread`.\n\nHa valamit általában szeretsz, többes számot vagy névelő nélküli alakot használsz: `I like apples.` (Szeretem az almát.)',
      words: [['apple', 'alma'], ['banana', 'banán'], ['bread', 'kenyér'], ['cheese', 'sajt'], ['egg', 'tojás'], ['milk', 'tej'], ['water', 'víz'], ['juice', 'gyümölcslé'],
        ['tea', 'tea'], ['coffee', 'kávé'], ['sandwich', 'szendvics'], ['tomato', 'paradicsom'], ['potato', 'krumpli'], ['chicken', 'csirke'], ['fish', 'hal'],
        ['cake', 'torta'], ['breakfast', 'reggeli'], ['lunch', 'ebéd'], ['dinner', 'vacsora'], ['hungry', 'éhes']],
      sentences: [
        ['I like apples.', 'Szeretem az almát.', [], ['Szeretem az almákat.', 'Én szeretem az almát.']],
        ['She doesn\'t like fish.', 'Ő nem szereti a halat.', ['She does not like fish.'], ['Nem szereti a halat.']],
        ['Two eggs, please.', 'Két tojást kérek.', [], ['Kérek két tojást.', 'Két tojást kérek szépen.']],
        ['Five tomatoes, please.', 'Öt paradicsomot kérek.', [], ['Kérek öt paradicsomot.']],
        ['We have bread and cheese.', 'Van kenyerünk és sajtunk.', ['We\'ve got bread and cheese.'], ['Van kenyér és sajt.']],
        ['Some water, please.', 'Kérek egy kis vizet.', [], ['Egy kis vizet kérek.', 'Vizet kérek.', 'Kérek vizet.']],
        ['I am hungry.', 'Éhes vagyok.', ['I\'m hungry.'], ['Én éhes vagyok.']],
        ['We eat chicken for lunch.', 'Ebédre csirkét eszünk.', [], ['Csirkét eszünk ebédre.']],
        ['The children like cake.', 'A gyerekek szeretik a tortát.', [], ['A gyerekek szeretik a süteményt.']],
        ['Tea or coffee?', 'Teát vagy kávét?', [], ['Tea vagy kávé?']],
        ['A sandwich and a juice, please.', 'Egy szendvicset és egy gyümölcslevet kérek.', [], ['Kérek egy szendvicset és egy gyümölcslevet.']],
        ['Milk is good for breakfast.', 'A tej jó reggelire.', [], ['Reggelire jó a tej.']]
      ]
    },
    {
      id: 'nap', title: 'Napok és napirend', icon: '⏰',
      tip: '**Present Simple – amit rendszeresen csinálsz**\n\nSzokásokra, ismétlődő dolgokra a Present Simple igeidőt használjuk: `I get up at seven.` (Hétkor kelek.)\n\nAz ige alapalak, **kivéve egyes szám 3. személyben** (he, she, it), ahol **-s** kerül a végére:\n\n- `I sleep`, `you sleep`, `we sleep`, `they sleep`\n- `he sleeps`, `she gets up`, `it eats`\n- -es: `go` → `goes`, `watch` → `watches`; `have` → `has`\n\nGyakorisági szavak – **a főige elé** kerülnek: `always` (mindig), `usually` (általában), `sometimes` (néha), `never` (soha): `He always eats breakfast.`\n\nFigyelj: a `never` már tagadó, nem kell mellé `not`! Magyarul „soha **nem** alszom”, angolul `I never sleep`.\n\nA napok neve **nagybetűvel** írandó: `Monday`, előttük `on`: `on Friday` (pénteken).',
      words: [['Monday', 'hétfő'], ['Tuesday', 'kedd'], ['Wednesday', 'szerda'], ['Thursday', 'csütörtök'], ['Friday', 'péntek'], ['Saturday', 'szombat'], ['Sunday', 'vasárnap'],
        ['morning', 'reggel'], ['evening', 'este'], ['today', 'ma'], ['tomorrow', 'holnap'], ['weekend', 'hétvége'], ['get up', 'felkel'], ['go to school', 'iskolába megy'],
        ['eat', 'eszik'], ['sleep', 'alszik'], ['always', 'mindig'], ['never', 'soha']],
      sentences: [
        ['I get up at seven.', 'Hétkor kelek fel.', ['I get up at seven o\'clock.'], ['Hét órakor kelek fel.', 'Hétkor kelek.', 'Én hétkor kelek fel.']],
        ['She gets up at six.', 'Ő hatkor kel fel.', ['She gets up at six o\'clock.'], ['Hatkor kel fel.', 'Hat órakor kel fel.']],
        ['We go to school on Monday.', 'Hétfőn iskolába megyünk.', ['On Monday we go to school.'], ['Hétfőn megyünk iskolába.', 'Iskolába megyünk hétfőn.']],
        ['He always eats breakfast.', 'Ő mindig reggelizik.', [], ['Mindig reggelizik.', 'Mindig eszik reggelit.']],
        ['I never sleep in the afternoon.', 'Délután soha nem alszom.', [], ['Soha nem alszom délután.', 'Délután sosem alszom.', 'Sosem alszom délután.']],
        ['My dad works on Saturday.', 'Apukám szombaton dolgozik.', [], ['Az apukám szombaton dolgozik.', 'Apám szombaton dolgozik.', 'Az apám szombaton dolgozik.']],
        ['Today is Friday.', 'Ma péntek van.', ['It is Friday today.', 'It\'s Friday today.'], []],
        ['Tomorrow is Sunday.', 'Holnap vasárnap lesz.', [], ['Holnap vasárnap van.']],
        ['She reads in the evening.', 'Ő este olvas.', [], ['Este olvas.']],
        ['Anna goes to school at eight.', 'Anna nyolckor megy iskolába.', [], ['Anna nyolc órakor megy iskolába.', 'Anna nyolckor iskolába megy.']],
        ['I sleep a lot at the weekend.', 'Hétvégén sokat alszom.', ['At the weekend I sleep a lot.', 'I sleep a lot on the weekend.'], ['A hétvégén sokat alszom.']],
        ['Does he get up early in the morning?', 'Korán kel reggel?', [], ['Ő korán kel reggel?', 'Reggel korán kel?']]
      ]
    },
    {
      id: 'ruhak', title: 'Színek és ruhák', icon: '👕',
      tip: '**Most vagy mindig? Present Continuous vs. Present Simple**\n\nA magyarban egy jelen idő van, az angolban kettő:\n\n- **Present Simple** – szokás, általános igazság: `I usually wear jeans.` (Általában farmert hordok.)\n- **Present Continuous** – ami **most, éppen** történik: `I am wearing a red T-shirt.` (Most piros póló van rajtam.)\n\nA Present Continuous képzése: `am / is / are` + ige**-ing**:\n\n- `I am wearing`, `she is reading`, `they are playing`\n- néma -e kiesik: `dance` → `dancing`; rövid szó végén kettőzés: `run` → `running`\n\nJelzőszavak: `now`, `today`, `Look!` → Continuous; `always`, `usually`, `every day` → Simple.\n\nA színek a főnév **elé** kerülnek és nem kapnak többes számot: `black shoes` (fekete cipő). A `trousers`, `jeans` és `shoes` angolul mindig többes számú!',
      words: [['red', 'piros'], ['blue', 'kék'], ['green', 'zöld'], ['yellow', 'sárga'], ['black', 'fekete'], ['white', 'fehér'], ['brown', 'barna'], ['pink', 'rózsaszín'],
        ['grey', 'szürke'], ['shirt', 'ing'], ['T-shirt', 'póló'], ['trousers', 'nadrág'], ['jeans', 'farmer'], ['dress', 'ruha'], ['skirt', 'szoknya'], ['shoes', 'cipő'],
        ['jacket', 'dzseki'], ['hat', 'kalap'], ['wear', 'visel (ruhát)']],
      sentences: [
        ['I am wearing a red T-shirt.', 'Piros póló van rajtam.', ['I\'m wearing a red T-shirt.'], ['Egy piros póló van rajtam.', 'Piros pólót viselek.', 'Piros pólóban vagyok.']],
        ['She is wearing a blue dress.', 'Kék ruha van rajta.', ['She\'s wearing a blue dress.'], ['Kék ruhát visel.', 'Kék ruhában van.', 'Egy kék ruha van rajta.']],
        ['I usually wear jeans.', 'Általában farmert hordok.', [], ['Általában farmert viselek.', 'Általában farmerben járok.']],
        ['My shoes are black.', 'A cipőm fekete.', [], ['Fekete a cipőm.']],
        ['Your jacket is green.', 'A dzsekid zöld.', [], ['Zöld a dzsekid.', 'A dzsekije zöld.']],
        ['He is not wearing a hat.', 'Nincs rajta kalap.', ['He isn\'t wearing a hat.', 'He\'s not wearing a hat.'], ['Nem visel kalapot.', 'Nincs kalap rajta.']],
        ['What are you wearing?', 'Mi van rajtad?', [], ['Mit viselsz?', 'Mi van rajtatok?', 'Mit viseltek?']],
        ['The sky is blue.', 'Az ég kék.', [], ['Kék az ég.']],
        ['Her skirt is pink and white.', 'A szoknyája rózsaszín és fehér.', [], ['A szoknyája rózsaszín-fehér.']],
        ['I like the yellow shirt.', 'Tetszik a sárga ing.', [], ['Nekem tetszik a sárga ing.']],
        ['Tom is wearing grey trousers today.', 'Tomon ma szürke nadrág van.', ['Today Tom is wearing grey trousers.'], ['Tom ma szürke nadrágot visel.', 'Ma szürke nadrág van Tomon.']],
        ['Look! It is raining.', 'Nézd! Esik az eső.', ['Look! It\'s raining.'], ['Nézd, esik az eső!', 'Nézd! Esik.']]
      ]
    },
    {
      id: 'otthon', title: 'Otthon', icon: '🏠',
      tip: '**Van valahol valami: there is / there are**\n\nHa azt mondod, hogy valami **van, létezik** valahol, az angolban nem a `have` és nem a sima `is` kell, hanem:\n\n- egyes szám: `There is a lamp on the table.` (Van egy lámpa az asztalon.) – röviden `There\'s`\n- többes szám: `There are two bedrooms.` (Két hálószoba van.)\n- tagadás: `There isn\'t a TV.` / `There is no TV.` (Nincs tévé.); `There aren\'t any chairs.`\n- kérdés: `Is there a garden?` – `Yes, there is.` / `No, there isn\'t.`\n\nCsapda: a magyar „Van egy kert” szó szerint nem `Is a garden`! És ha azt akarod mondani, hogy **valakinek** van valamije, az a `have`: `We have a garden.` (Nekünk van kertünk.)\n\nHelyhatározók: `in` (benne), `on` (rajta), `under` (alatta), `next to` (mellette).',
      words: [['house', 'ház'], ['flat', 'lakás'], ['room', 'szoba'], ['kitchen', 'konyha'], ['bathroom', 'fürdőszoba'], ['bedroom', 'hálószoba'], ['living room', 'nappali'],
        ['garden', 'kert'], ['bed', 'ágy'], ['table', 'asztal'], ['sofa', 'kanapé'], ['lamp', 'lámpa'], ['fridge', 'hűtő'], ['TV', 'tévé'], ['picture', 'kép'],
        ['floor', 'padló'], ['wall', 'fal'], ['upstairs', 'fent (az emeleten)']],
      sentences: [
        ['There is a lamp on the table.', 'Van egy lámpa az asztalon.', ['There\'s a lamp on the table.'], ['Az asztalon van egy lámpa.', 'Egy lámpa van az asztalon.']],
        ['There are two bedrooms.', 'Két hálószoba van.', [], ['Van két hálószoba.']],
        ['Is there a garden?', 'Van kert?', [], ['Van egy kert?', 'Van kertje?', 'Van kertjük?']],
        ['There is no TV in my room.', 'Nincs tévé a szobámban.', ['There isn\'t a TV in my room.'], ['A szobámban nincs tévé.']],
        ['Are there pictures on the wall?', 'Vannak képek a falon?', [], ['Van kép a falon?', 'Vannak a falon képek?']],
        ['The fridge is in the kitchen.', 'A hűtő a konyhában van.', [], ['A hűtőszekrény a konyhában van.', 'A konyhában van a hűtő.']],
        ['We live in a flat.', 'Lakásban lakunk.', [], ['Egy lakásban lakunk.', 'Mi lakásban lakunk.', 'Mi egy lakásban lakunk.']],
        ['My bed is next to the window.', 'Az ágyam az ablak mellett van.', [], ['Az ablak mellett van az ágyam.']],
        ['The cat is on the sofa.', 'A macska a kanapén van.', [], ['A kanapén van a macska.']],
        ['Our house has a big garden.', 'A házunknak nagy kertje van.', [], ['Nagy kertje van a házunknak.']],
        ['The bathroom is upstairs.', 'A fürdőszoba fent van.', [], ['Fent van a fürdőszoba.', 'A fürdőszoba az emeleten van.']],
        ['Mum is in the living room.', 'Anya a nappaliban van.', [], ['Anyu a nappaliban van.', 'Anyukám a nappaliban van.']]
      ]
    },
    {
      id: 'varos', title: 'Város és közlekedés', icon: '🚌',
      tip: '**Kérdés do és does segítségével**\n\nPresent Simple-ben a kérdéshez (és a tagadáshoz) **segédige** kell, mert az angol nem a hanglejtéssel kérdez, mint a magyar:\n\n- `Do you live here?` – Itt laksz? (I, you, we, they)\n- `Does she live here?` – Ő itt lakik? (he, she, it)\n\nFontos: ha `does` van a mondatban, a főige **elveszíti az -s-t**: `Does he go by bus?` (nem `goes`!)\n\nKérdőszóval: kérdőszó + do/does + alany + ige: `Where do you live?`, `How does he go to work?`\n\nRövid válasz: `Yes, I do.` / `No, she doesn\'t.`\n\nTagadás ugyanígy: `I don\'t go by car.`, `He doesn\'t take the tram.`\n\nKözlekedési eszköz: `by bus`, `by car`, `by train` (névelő nélkül!), de gyalog: `on foot`.',
      words: [['town', 'város'], ['street', 'utca'], ['shop', 'bolt'], ['park', 'park'], ['cinema', 'mozi'], ['station', 'állomás'], ['hospital', 'kórház'],
        ['library', 'könyvtár'], ['bus', 'busz'], ['car', 'autó'], ['train', 'vonat'], ['bike', 'bicikli'], ['tram', 'villamos'], ['on foot', 'gyalog'], ['left', 'balra'],
        ['right', 'jobbra'], ['near', 'közel'], ['far', 'messze'], ['ticket', 'jegy']],
      sentences: [
        ['Do you go to school by bus?', 'Busszal mész iskolába?', [], ['Busszal jársz iskolába?', 'Busszal mentek iskolába?', 'Busszal jártok iskolába?']],
        ['Does she live near the park?', 'Ő a park közelében lakik?', [], ['A park közelében lakik?', 'Közel lakik a parkhoz?']],
        ['Where do you live?', 'Hol laksz?', [], ['Hol laktok?', 'Hol lakik?', 'Te hol laksz?']],
        ['I go to school on foot.', 'Gyalog megyek iskolába.', ['I walk to school.'], ['Gyalog járok iskolába.', 'Iskolába gyalog megyek.']],
        ['How does he go to work?', 'Ő hogyan jár dolgozni?', [], ['Hogyan jár dolgozni?', 'Hogyan megy dolgozni?', 'Hogyan jár munkába?']],
        ['He goes by car.', 'Autóval jár.', [], ['Ő autóval jár.', 'Autóval megy.']],
        ['Where is the station?', 'Hol van az állomás?', ['Where\'s the station?'], ['Hol az állomás?']],
        ['Turn left at the cinema.', 'A mozinál fordulj balra.', [], ['Fordulj balra a mozinál.', 'A mozinál forduljon balra.', 'Forduljon balra a mozinál.']],
        ['The library is not far.', 'A könyvtár nincs messze.', ['The library isn\'t far.'], ['Nincs messze a könyvtár.']],
        ['They don\'t take the tram.', 'Nem villamossal mennek.', ['They do not take the tram.'], ['Ők nem villamossal mennek.', 'Nem villamosoznak.']],
        ['A ticket for the train, please.', 'Egy jegyet kérek a vonatra.', [], ['Kérek egy jegyet a vonatra.', 'Egy vonatjegyet kérek.']],
        ['Does your town have a hospital?', 'Van kórház a városodban?', [], ['Van a városodban kórház?', 'Van kórház a városotokban?', 'Van a városotokban kórház?']],
        ['The shop is on the right.', 'A bolt jobbra van.', [], ['A bolt a jobb oldalon van.', 'Jobbra van a bolt.']]
      ]
    },
    {
      id: 'hobbi', title: 'Hobbi és sport', icon: '⚽',
      tip: '**Tudok, tudsz: can**\n\nA `can` jelentése: tud (képes valamire), szabad, lehet. Nagyon egyszerű ige:\n\n- **minden személyben ugyanaz**, nincs -s: `I can`, `she can`, `they can`\n- utána az ige **alapalakban**, `to` nélkül: `I can swim.` (nem `can to swim`!)\n- tagadás: `cannot` vagy röviden `can\'t`: `She can\'t sing.`\n- kérdés: a `can` az alany elé kerül: `Can you dance?` – `Yes, I can.` / `No, I can\'t.`\n- engedélykérés: `Can I watch a film?` (Nézhetek egy filmet?)\n\nSportok és hangszerek: `play football`, `play tennis` (névelő nélkül), de `play the guitar`, `play the piano` (névelővel).\n\nHa azt mondod, mit szeretsz csinálni: `like` + **-ing**: `He likes reading.`',
      words: [['play football', 'focizik'], ['play the guitar', 'gitározik'], ['swim', 'úszik'], ['run', 'fut'], ['dance', 'táncol'], ['sing', 'énekel'], ['draw', 'rajzol'],
        ['read', 'olvas'], ['ride a bike', 'biciklizik'], ['cook', 'főz'], ['music', 'zene'], ['game', 'játék'], ['film', 'film'], ['basketball', 'kosárlabda'],
        ['tennis', 'tenisz'], ['hobby', 'hobbi'], ['favourite', 'kedvenc'], ['can', 'tud (valamit csinálni)']],
      sentences: [
        ['I can swim.', 'Tudok úszni.', [], ['Én tudok úszni.']],
        ['She can\'t sing.', 'Ő nem tud énekelni.', ['She cannot sing.'], ['Nem tud énekelni.']],
        ['Can you play the guitar?', 'Tudsz gitározni?', [], ['Tudtok gitározni?', 'Tud gitározni?', 'Te tudsz gitározni?']],
        ['Yes, I can.', 'Igen, tudok.', [], ['Igen, tudok!']],
        ['My hobby is drawing.', 'A hobbim a rajzolás.', [], ['Az én hobbim a rajzolás.', 'A rajzolás a hobbim.']],
        ['We play football after school.', 'Iskola után focizunk.', [], ['Suli után focizunk.', 'Focizunk iskola után.']],
        ['He likes reading.', 'Szeret olvasni.', ['He likes to read.'], ['Ő szeret olvasni.']],
        ['My favourite sport is tennis.', 'A kedvenc sportom a tenisz.', [], ['Kedvenc sportom a tenisz.']],
        ['Can I watch a film?', 'Nézhetek egy filmet?', [], ['Megnézhetek egy filmet?', 'Nézhetek filmet?']],
        ['They can dance very well.', 'Nagyon jól tudnak táncolni.', [], ['Ők nagyon jól tudnak táncolni.', 'Nagyon jól táncolnak.']],
        ['I cook with my dad.', 'Apukámmal főzök.', [], ['Az apukámmal főzök.', 'Apámmal főzök.', 'Az apámmal főzök.']],
        ['Do you like music?', 'Szereted a zenét?', [], ['Szeretitek a zenét?', 'Szereti a zenét?']],
        ['Can your sister ride a bike?', 'Tud biciklizni a húgod?', [], ['Tud biciklizni a nővéred?', 'Tud biciklizni a lánytestvéred?', 'A húgod tud biciklizni?']]
      ]
    },
    {
      id: 'mult', title: 'Tegnap történt: múlt idő', icon: '🛍️',
      tip: '**Past Simple – befejezett múlt**\n\nAmi a múltban történt és lezárult (tegnap, múlt héten, két napja), arra a Past Simple a jó.\n\n**Szabályos igék: -ed** – minden személyben ugyanaz!\n\n- `play` → `played`, `watch` → `watched`, `visit` → `visited`\n- kiejtés: `played` (d), `watched` (t), `visited` (id – csak t és d után)\n\n**Rendhagyó igék** – ezeket meg kell tanulni:\n\n- `go` → `went`, `see` → `saw`, `buy` → `bought`, `eat` → `ate`, `have` → `had`\n- `be` → `was` (I, he, she, it) / `were` (you, we, they)\n\n**Kérdés és tagadás: did** + az ige **alapalakja**:\n\n- `Did you go to school?` (nem `Did you went`!)\n- `I didn\'t buy anything.`\n\nIdőhatározók: `yesterday`, `last week`, `two days ago` (két napja – az `ago` a végére kerül, mint a magyar „ezelőtt”).',
      words: [['yesterday', 'tegnap'], ['last week', 'múlt héten'], ['ago', 'ezelőtt'], ['was', 'volt'], ['went', 'ment'], ['saw', 'látott'], ['bought', 'vett (vásárolt)'],
        ['ate', 'evett'], ['played', 'játszott'], ['watched', 'nézett'], ['visited', 'meglátogatott'], ['money', 'pénz'], ['market', 'piac'], ['present', 'ajándék'],
        ['cheap', 'olcsó'], ['expensive', 'drága'], ['holiday', 'nyaralás'], ['sea', 'tenger']],
      sentences: [
        ['I played tennis yesterday.', 'Tegnap teniszeztem.', ['Yesterday I played tennis.'], ['Tegnap teniszt játszottam.', 'Teniszeztem tegnap.']],
        ['We visited my grandmother.', 'Meglátogattuk a nagymamámat.', [], ['Meglátogattuk nagymamámat.']],
        ['She watched a film last week.', 'Múlt héten megnézett egy filmet.', ['Last week she watched a film.'], ['Múlt héten nézett egy filmet.', 'Ő múlt héten megnézett egy filmet.']],
        ['I went to the market.', 'Elmentem a piacra.', [], ['A piacra mentem.', 'Piacra mentem.']],
        ['He bought a present for Anna.', 'Vett egy ajándékot Annának.', ['He bought Anna a present.'], ['Ő vett egy ajándékot Annának.', 'Annának vett egy ajándékot.']],
        ['It was very expensive.', 'Nagyon drága volt.', [], ['Ez nagyon drága volt.']],
        ['The shoes were cheap.', 'A cipő olcsó volt.', [], ['Olcsó volt a cipő.']],
        ['We saw the sea on holiday.', 'A nyaraláson láttuk a tengert.', [], ['Nyaraláskor láttuk a tengert.', 'Láttuk a tengert a nyaraláson.']],
        ['I ate pizza two days ago.', 'Két napja pizzát ettem.', ['Two days ago I ate pizza.'], ['Két nappal ezelőtt pizzát ettem.', 'Két napja ettem pizzát.']],
        ['Did you go to school yesterday?', 'Voltál tegnap iskolában?', [], ['Tegnap iskolában voltál?', 'Elmentél tegnap iskolába?', 'Voltatok tegnap iskolában?']],
        ['I didn\'t buy anything.', 'Nem vettem semmit.', ['I did not buy anything.'], ['Semmit sem vettem.', 'Én nem vettem semmit.']],
        ['Where was your money?', 'Hol volt a pénzed?', [], ['Hol volt a pénze?', 'Hol volt a pénzetek?']]
      ]
    },
    {
      id: 'tervek', title: 'Tervek és utazás', icon: '🚀',
      tip: '**Mit fogsz csinálni? be going to**\n\nA jövőbeli **terveket, szándékokat** így mondjuk: `am / is / are` + `going to` + ige alapalakja.\n\n- `I am going to travel abroad.` – Külföldre fogok utazni.\n- `She is going to learn Italian.` – Olaszul fog tanulni.\n- tagadás: `They are not going to stay at home.`\n- kérdés: `Are you going to come?`, `What are you going to do tonight?`\n\nAkkor is ezt használjuk, ha **látjuk a jeleket**, hogy valami meg fog történni: `Look at the clouds! It is going to rain.`\n\nA `will`-t inkább hirtelen döntésre és jóslásra használjuk: `I will help you.` (Segítek.) – ezt később tanulod részletesen.\n\nA magyarban gyakran jelen időt mondunk a jövőre is („Holnap utazom”); az angolban ilyenkor is kell a jövő idő vagy a `going to`.',
      words: [['next week', 'jövő héten'], ['next year', 'jövőre'], ['summer', 'nyár'], ['winter', 'tél'], ['plan', 'terv'], ['travel', 'utazik'], ['meet', 'találkozik'],
        ['learn', 'tanul'], ['stay', 'marad'], ['beach', 'strand'], ['mountains', 'hegyek'], ['abroad', 'külföldre'], ['suitcase', 'bőrönd'], ['passport', 'útlevél'],
        ['airport', 'repülőtér'], ['plane', 'repülő'], ['hotel', 'szálloda'], ['tonight', 'ma este']],
      sentences: [
        ['I am going to travel abroad.', 'Külföldre fogok utazni.', ['I\'m going to travel abroad.'], ['Külföldre utazom.', 'Külföldre fogok menni.']],
        ['We are going to stay in a hotel.', 'Szállodában fogunk megszállni.', ['We\'re going to stay in a hotel.'], ['Egy szállodában fogunk megszállni.', 'Szállodában szállunk meg.', 'Szállodában fogunk lakni.']],
        ['She is going to learn Italian.', 'Olaszul fog tanulni.', ['She\'s going to learn Italian.'], ['Ő olaszul fog tanulni.', 'Olaszt fog tanulni.']],
        ['What are you going to do tonight?', 'Mit fogsz csinálni ma este?', [], ['Mit csinálsz ma este?', 'Mit fogtok csinálni ma este?', 'Mit csináltok ma este?', 'Ma este mit csinálsz?']],
        ['I am going to meet my friends.', 'Találkozni fogok a barátaimmal.', ['I\'m going to meet my friends.'], ['Találkozom a barátaimmal.', 'A barátaimmal fogok találkozni.']],
        ['Next summer we are going to the mountains.', 'Jövő nyáron a hegyekbe megyünk.', ['We are going to the mountains next summer.'], ['Jövő nyáron hegyekbe megyünk.', 'Jövő nyáron a hegyekbe fogunk menni.']],
        ['Where is my passport?', 'Hol van az útlevelem?', ['Where\'s my passport?'], ['Hol az útlevelem?']],
        ['The plane leaves at nine.', 'A repülő kilenckor indul.', [], ['A repülőgép kilenckor indul.', 'A repülő kilenc órakor indul.']],
        ['Is he going to come with us?', 'Ő velünk fog jönni?', [], ['Velünk jön?', 'Velünk fog jönni?', 'Ő velünk jön?']],
        ['My suitcase is very heavy.', 'A bőröndöm nagyon nehéz.', [], ['Nagyon nehéz a bőröndöm.']],
        ['They are not going to stay at home.', 'Nem fognak otthon maradni.', ['They aren\'t going to stay at home.', 'They\'re not going to stay at home.'], ['Ők nem fognak otthon maradni.', 'Nem maradnak otthon.']],
        ['It is going to rain.', 'Esni fog az eső.', ['It\'s going to rain.'], ['Esni fog.', 'Eső lesz.']]
      ]
    }
  ]
});
