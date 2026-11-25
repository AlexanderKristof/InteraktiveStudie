/* Nyelvtanulás – Angol (A1–B1). Kiegészíti a data/tantargyak/angol.js tantárgyat: itt rövid, játékos gyakorlókörök vannak. */
STUDIE.addLangCourse({
  id: 'angol', title: 'Angol', flag: '🇬🇧', tts: 'en-GB', badge: 'A1–B1',
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
    },
    {
      id: 'perfect', title: 'Már megtörtént? Present perfect', icon: '✅',
      tip: '**Present perfect vagy past simple?**\n\nA magyarban egyetlen múlt idő van („láttam”), az angolban kettő, és nem mindegy, melyiket választod.\n\n- **Past simple** (`I saw`, `I visited`): a múlt egy **lezárt, megnevezett időpontjában** történt: `yesterday`, `last year`, `in 2019`, `two days ago`.\n- **Present perfect** (`have / has` + az ige 3. alakja): a múltbeli eseménynek **a jelenhez van köze**, és az időpont nem fontos: `I have lost my key.` (Elvesztettem, most sincs meg.)\n\nA 3. alak szabályos igéknél `-ed` végű (`finish → finished`), sok gyakori ige rendhagyó: `see → seen`, `be → been`, `lose → lost`, `find → found`.\n\nJellemző szavai: `ever` (valaha), `never` (soha), `already` (már), `yet` (tagadásban: még nem; kérdésben: már), `just` (épp most).\n\nNagy különbség a magyarhoz képest: „2015 óta itt lakunk” – a magyar jelen időt használ, az angol present perfectet: `We have lived here since 2015.` A `since` időpont előtt áll (`since Monday`), a `for` időtartam előtt (`for five years`).\n\nTipp: ha a mondatban ott a `yesterday`, a `last week` vagy az `ago`, akkor sosem jöhet present perfect!',
      words: [['already', 'már'], ['yet', 'még (tagadásban)'], ['just', 'épp most'], ['ever', 'valaha'], ['since', 'óta'], ['recently', 'mostanában'],
        ['once', 'egyszer'], ['twice', 'kétszer'], ['experience', 'tapasztalat'], ['country', 'ország'], ['world', 'világ'], ['famous', 'híres'],
        ['key', 'kulcs'], ['lose', 'elveszít'], ['find', 'megtalál'], ['finish', 'befejez'], ['forget', 'elfelejt'], ['climb', 'mászik']],
      sentences: [
        ['Have you ever been to London?', 'Voltál már valaha Londonban?', [], ['Voltál valaha Londonban?', 'Jártál már Londonban?', 'Jártál valaha Londonban?', 'Voltál már Londonban?', 'Volt már Londonban?', 'Voltatok már Londonban?']],
        ['I have never climbed a mountain.', 'Még soha nem másztam meg hegyet.', ['I\'ve never climbed a mountain.'], ['Soha nem másztam még hegyet.', 'Még sosem másztam meg hegyet.', 'Soha nem másztam meg hegyet.', 'Még soha nem másztam hegyet.']],
        ['I have lost my key.', 'Elvesztettem a kulcsomat.', ['I\'ve lost my key.'], ['Elvesztettem a kulcsom.', 'Elhagytam a kulcsomat.']],
        ['She has just finished her homework.', 'Épp most fejezte be a házi feladatát.', ['She\'s just finished her homework.'], ['Most fejezte be a házi feladatát.', 'Éppen most fejezte be a házi feladatát.', 'Épp most fejezte be a leckéjét.']],
        ['Have you finished yet?', 'Befejezted már?', [], ['Kész vagy már?', 'Befejezte már?', 'Befejeztétek már?']],
        ['I haven\'t found it yet.', 'Még nem találtam meg.', ['I have not found it yet.']],
        ['We have lived here since 2015.', 'Itt lakunk 2015 óta.', ['We\'ve lived here since 2015.'], ['2015 óta itt lakunk.', '2015 óta lakunk itt.', 'Itt élünk 2015 óta.', '2015 óta élünk itt.']],
        ['I have known her for five years.', 'Öt éve ismerem őt.', ['I\'ve known her for five years.'], ['Öt éve ismerem.', 'Őt öt éve ismerem.']],
        ['I visited Paris last year.', 'Tavaly meglátogattam Párizst.', ['Last year I visited Paris.'], ['Tavaly Párizsban voltam.', 'Tavaly jártam Párizsban.', 'Párizsban voltam tavaly.', 'Meglátogattam Párizst tavaly.']],
        ['Have you seen this famous film?', 'Láttad már ezt a híres filmet?', [], ['Láttad ezt a híres filmet?', 'Látta már ezt a híres filmet?', 'Láttátok már ezt a híres filmet?']],
        ['He has been to many countries.', 'Sok országban járt már.', ['He\'s been to many countries.'], ['Már sok országban járt.', 'Sok országban volt már.', 'Ő már sok országban járt.', 'Már sok országban volt.']],
        ['I have read this book twice.', 'Kétszer olvastam ezt a könyvet.', ['I\'ve read this book twice.'], ['Ezt a könyvet kétszer olvastam.', 'Kétszer olvastam már ezt a könyvet.', 'Ezt a könyvet már kétszer olvastam.']]
      ]
    },
    {
      id: 'jovo', title: 'Jövő idő: will, going to', icon: '🔮',
      tip: '**Háromféle jövő: will, going to, present continuous**\n\nA magyarban a jövőt sokszor egyszerű jelen idővel mondjuk („Pénteken fogorvoshoz megyek”), a „fog” segédige ritkább. Az angol viszont pontosan megkülönbözteti, **mennyire biztos és mikor dőlt el** a dolog.\n\n- **will** + ige: jóslás, vélemény (`I think it will rain.`), hirtelen döntés (`I will help you.`), ígéret (`I promise I will call you.`). Rövid alakja `I\'ll`, tagadva `won\'t`.\n- **going to** + ige: előre eltervezett szándék (`I am going to learn Spanish.`), vagy látható jelekből következő jóslás (`Look at the clouds. It is going to rain.`).\n- **present continuous** (`am / is / are` + `-ing`): naptárba beírt, másokkal megbeszélt program: `We are having a party on Saturday.`, `I am seeing the dentist on Friday.`\n\nTipp: ha a magyar mondatba beleillik, hogy „már meg van beszélve”, akkor jó a present continuous. Ha a „szerintem”, a „talán” vagy a „valószínűleg” illik bele, akkor a `will` a nyerő.\n\nVigyázz: időhatározói mellékmondatban (`when`, `if` után) az angol is jelen időt használ: `I will call you when I arrive.`',
      words: [['probably', 'valószínűleg'], ['maybe', 'talán'], ['definitely', 'biztosan'], ['weather', 'időjárás'], ['forecast', 'időjárás-előrejelzés'], ['sunny', 'napos'],
        ['cloudy', 'felhős'], ['snow', 'hó'], ['rain', 'eső'], ['wind', 'szél'], ['future', 'jövő'], ['robot', 'robot'], ['dentist', 'fogorvos'],
        ['appointment', 'megbeszélt időpont'], ['promise', 'megígér'], ['hope', 'remél'], ['the day after tomorrow', 'holnapután'], ['party', 'buli']],
      sentences: [
        ['I think it will rain tomorrow.', 'Szerintem holnap esni fog.', ['I think it\'ll rain tomorrow.'], ['Szerintem holnap esik.', 'Azt hiszem, holnap esni fog.', 'Szerintem holnap esni fog az eső.', 'Szerintem holnap eső lesz.']],
        ['In the future robots will drive cars.', 'A jövőben robotok fognak autót vezetni.', ['Robots will drive cars in the future.'], ['A jövőben a robotok vezetnek majd autót.', 'A jövőben robotok vezetik majd az autókat.', 'A jövőben a robotok fognak autót vezetni.']],
        ['I will help you with your bag.', 'Segítek neked a táskáddal.', ['I\'ll help you with your bag.'], ['Segítek a táskáddal.', 'Segítek önnek a táskájával.', 'Segíteni fogok a táskáddal.']],
        ['I promise I will call you.', 'Megígérem, hogy felhívlak.', ['I promise I\'ll call you.', 'I promise to call you.'], ['Ígérem, hogy felhívlak.', 'Megígérem, hogy fel foglak hívni.', 'Ígérem, felhívlak.']],
        ['I am seeing the dentist on Friday.', 'Pénteken megyek fogorvoshoz.', ['I\'m seeing the dentist on Friday.', 'On Friday I am seeing the dentist.'], ['Pénteken fogorvoshoz megyek.', 'Pénteken megyek a fogorvoshoz.', 'Pénteken a fogorvoshoz megyek.']],
        ['We are having a party on Saturday.', 'Szombaton bulit tartunk.', ['We\'re having a party on Saturday.'], ['Szombaton buli lesz nálunk.', 'Szombaton bulizunk.', 'Szombaton bulit rendezünk.']],
        ['Maybe it will snow the day after tomorrow.', 'Talán holnapután havazni fog.', ['Maybe it\'ll snow the day after tomorrow.'], ['Holnapután talán havazni fog.', 'Talán holnapután havazik.', 'Holnapután talán havazik.', 'Talán holnapután esik a hó.']],
        ['The forecast says it will be sunny.', 'Az előrejelzés szerint napos idő lesz.', ['The forecast says it\'ll be sunny.'], ['Az előrejelzés szerint napos lesz az idő.', 'Az időjárás-előrejelzés szerint napos idő lesz.', 'Az előrejelzés szerint napos lesz.']],
        ['I hope the weather will be nice.', 'Remélem, szép idő lesz.', [], ['Remélem, jó idő lesz.', 'Remélem, szép lesz az idő.', 'Remélem, jó lesz az idő.']],
        ['Will you be at home tonight?', 'Otthon leszel ma este?', [], ['Ma este otthon leszel?', 'Itthon leszel ma este?', 'Otthon lesztek ma este?', 'Ma este itthon leszel?', 'Otthon lesz ma este?']],
        ['I will definitely come to your party.', 'Biztosan eljövök a bulidra.', ['I\'ll definitely come to your party.'], ['Biztosan elmegyek a bulidra.', 'Biztosan ott leszek a bulidon.', 'Biztosan eljövök a bulijára.']],
        ['The wind will be very strong.', 'Nagyon erős lesz a szél.', [], ['A szél nagyon erős lesz.', 'Nagyon erős szél lesz.']]
      ]
    },
    {
      id: 'osszehasonlitas', title: 'Összehasonlítás', icon: '📏',
      tip: '**Összehasonlítás: -er, more, the most**\n\nA magyarban minden melléknév ugyanúgy fokozódik: gyors → gyors**abb** → **leg**gyors**abb**. Az angolban a szó hossza dönt.\n\n- **Rövid (egyszótagú) szavak**: `-er` és `the -est`: `fast → faster → the fastest`, `old → older → the oldest`. Rövid magánhangzó + mássalhangzó végén a betű megduplázódik: `big → bigger`.\n- **-y végű kétszótagúak**: `easy → easier → the easiest`.\n- **Hosszabb szavak**: `more` és `the most`: `interesting → more interesting → the most interesting`.\n- **Rendhagyók**: `good → better → the best`, `bad → worse → the worst`.\n\nA magyar „-nál, -nél” és a „mint” angolul egyaránt **than**: `taller than me` (magasabb nálam, magasabb, mint én).\n\nEgyenlőség: `as … as`, tagadva `not as … as`: `My bike is not as fast as yours.` (nem olyan gyors, mint a tiéd).\n\nVigyázz: a felsőfok elé szinte mindig kell a `the`, és sosem mondjuk `more better` – ahogy a magyarban sem mondjuk, hogy „jobbabb”. A `more` és az `-er` soha nem áll együtt!',
      words: [['fast', 'gyors'], ['slow', 'lassú'], ['strong', 'erős'], ['weak', 'gyenge'], ['easy', 'könnyű (egyszerű)'], ['difficult', 'nehéz (bonyolult)'],
        ['dangerous', 'veszélyes'], ['safe', 'biztonságos'], ['comfortable', 'kényelmes'], ['popular', 'népszerű'], ['interesting', 'érdekes'], ['boring', 'unalmas'],
        ['better', 'jobb'], ['worse', 'rosszabb'], ['the best', 'a legjobb'], ['the worst', 'a legrosszabb'], ['than', 'mint (összehasonlításban)'], ['clever', 'okos']],
      sentences: [
        ['My sister is older than me.', 'A nővérem idősebb nálam.', ['My sister is older than I am.'], ['A nővérem idősebb, mint én.', 'A testvérem idősebb nálam.', 'A nővérem öregebb nálam.']],
        ['A plane is faster than a train.', 'A repülő gyorsabb, mint a vonat.', [], ['A repülő gyorsabb a vonatnál.', 'A repülőgép gyorsabb, mint a vonat.', 'A repülőgép gyorsabb a vonatnál.']],
        ['English is easier than German.', 'Az angol könnyebb, mint a német.', [], ['Az angol könnyebb a németnél.', 'Az angol nyelv könnyebb, mint a német.']],
        ['This is the best film of the year.', 'Ez az év legjobb filmje.', [], ['Ez az idei év legjobb filmje.']],
        ['Who is the cleverest student in your class?', 'Ki a legokosabb diák az osztályodban?', [], ['Ki a legokosabb tanuló az osztályodban?', 'Ki a legokosabb az osztályodban?', 'Ki a legokosabb diák az osztályotokban?']],
        ['Football is more popular than tennis.', 'A foci népszerűbb, mint a tenisz.', [], ['A foci népszerűbb a tenisznél.', 'A futball népszerűbb, mint a tenisz.']],
        ['Today was the worst day of my life.', 'Ma volt életem legrosszabb napja.', [], ['A mai nap volt életem legrosszabb napja.']],
        ['Is your sofa more comfortable than this chair?', 'Kényelmesebb a kanapéd, mint ez a szék?', [], ['A kanapéd kényelmesebb, mint ez a szék?', 'Kényelmesebb a kanapéd ennél a széknél?']],
        ['The city is more dangerous at night.', 'A város éjjel veszélyesebb.', [], ['Éjjel veszélyesebb a város.', 'A város éjszaka veszélyesebb.', 'Éjszaka veszélyesebb a város.']],
        ['My bike is not as fast as yours.', 'Az én biciklim nem olyan gyors, mint a tiéd.', ['My bike isn\'t as fast as yours.'], ['A biciklim nem olyan gyors, mint a tiéd.', 'A biciklim nem olyan gyors, mint az öné.', 'Az én biciklim nem olyan gyors, mint a tiétek.']],
        ['This book is more interesting than the film.', 'Ez a könyv érdekesebb, mint a film.', [], ['Ez a könyv érdekesebb a filmnél.']],
        ['Maths is the most difficult subject for me.', 'Számomra a matek a legnehezebb tantárgy.', ['Maths is the hardest subject for me.', 'For me maths is the most difficult subject.'], ['Nekem a matek a legnehezebb tantárgy.', 'A matek a legnehezebb tantárgy számomra.', 'A matek nekem a legnehezebb tantárgy.', 'Számomra a matematika a legnehezebb tantárgy.']]
      ]
    },
    {
      id: 'tanacs', title: 'Egészség: should, must, have to', icon: '🩺',
      tip: '**Tanács és kötelesség: should, must, have to**\n\nA magyar „kell” és „kellene” mögött az angolban több ige áll.\n\n- **should** – tanács, javaslat (magyarul: „kellene”): `You should go to the doctor.` Tagadva: `You shouldn\'t eat so much cake.`\n- **must** – erős kötelesség, gyakran a beszélő véleménye vagy egy szigorú szabály: `You must take this medicine.`\n- **have to** – külső kötelesség, szabály, körülmény: `We have to wear a uniform.` Harmadik személyben `she has to`, kérdésben `Do I have to…?`\n\nA legnagyobb csapda a tagadás:\n\n- `You mustn\'t eat here.` = **Tilos** itt enni (nem szabad).\n- `You don\'t have to come.` = **Nem kell** eljönnöd (de jöhetsz, ha akarsz).\n\nA magyarban is két külön dolog a „nem kell” és a „nem szabad” – pont így kell az angolban is szétválasztani őket.\n\nA `should` és a `must` után **sosem** jön `to`, és harmadik személyben sem kapnak `-s` végződést: `she should go` (nem `she shoulds to go`). A `have to` viszont rendes igeként viselkedik: `he has to`, `did you have to`.\n\nBetegségek: `I have a headache` (fáj a fejem), `I have a cold` (megfáztam) – az angol azt mondja, hogy „van” fejfájásom.',
      words: [['headache', 'fejfájás'], ['stomach ache', 'hasfájás'], ['cough', 'köhögés'], ['a cold', 'megfázás'], ['fever', 'láz'], ['medicine', 'gyógyszer'],
        ['doctor', 'orvos'], ['nurse', 'ápoló'], ['rest', 'pihen'], ['healthy', 'egészséges'], ['ill', 'beteg'], ['tired', 'fáradt'],
        ['exercise', 'testmozgás'], ['vegetables', 'zöldség'], ['rule', 'szabály'], ['helmet', 'bukósisak'], ['uniform', 'egyenruha'], ['advice', 'tanács']],
      sentences: [
        ['You should go to the doctor.', 'Orvoshoz kellene menned.', [], ['El kellene menned orvoshoz.', 'Orvoshoz kéne menned.', 'El kéne menned orvoshoz.', 'Orvoshoz kellene mennie.', 'Orvoshoz kellene mennetek.']],
        ['I have a terrible headache.', 'Borzasztóan fáj a fejem.', ['I\'ve got a terrible headache.'], ['Szörnyen fáj a fejem.', 'Nagyon fáj a fejem.', 'Szörnyű fejfájásom van.', 'Borzasztó fejfájásom van.']],
        ['You shouldn\'t eat so much cake.', 'Nem kellene ennyi tortát enned.', ['You should not eat so much cake.'], ['Nem kéne ennyi tortát enned.', 'Nem kellene annyi tortát enned.', 'Nem kellene ennyi süteményt enned.']],
        ['You must take this medicine twice a day.', 'Ezt a gyógyszert naponta kétszer kell bevenned.', [], ['Naponta kétszer kell bevenned ezt a gyógyszert.', 'Naponta kétszer be kell venned ezt a gyógyszert.', 'Ezt a gyógyszert naponta kétszer kell bevennie.']],
        ['We have to wear a uniform at school.', 'Az iskolában egyenruhát kell viselnünk.', [], ['Egyenruhát kell viselnünk az iskolában.', 'Az iskolában egyenruhát kell hordanunk.', 'Az iskolában egyenruhában kell járnunk.']],
        ['You must wear a helmet on a bike.', 'Biciklin bukósisakot kell viselned.', [], ['Biciklin bukósisakot kell viselni.', 'Biciklin bukósisakot kell hordanod.', 'Biciklin sisakot kell viselned.', 'Biciklizéskor bukósisakot kell viselni.']],
        ['Do I have to stay in bed?', 'Ágyban kell maradnom?', [], ['Az ágyban kell maradnom?', 'Ágyban kell feküdnöm?']],
        ['You don\'t have to come tomorrow.', 'Holnap nem kell jönnöd.', ['You do not have to come tomorrow.'], ['Nem kell holnap jönnöd.', 'Holnap nem kell eljönnöd.', 'Holnap nem kell jönnie.', 'Holnap nem kell jönnötök.']],
        ['You mustn\'t eat in the library.', 'A könyvtárban tilos enni.', ['You must not eat in the library.'], ['A könyvtárban nem szabad enni.', 'Nem szabad enni a könyvtárban.', 'Tilos enni a könyvtárban.', 'A könyvtárban nem ehetsz.']],
        ['You should eat more vegetables.', 'Több zöldséget kellene enned.', [], ['Több zöldséget kéne enned.', 'Több zöldséget kellene ennie.', 'Több zöldséget kellene ennetek.']],
        ['I am tired, I should rest.', 'Fáradt vagyok, pihennem kellene.', ['I\'m tired, I should rest.'], ['Fáradt vagyok, pihennem kéne.', 'Fáradt vagyok, kellene pihennem.']],
        ['She has a cough and a fever.', 'Köhög és lázas.', ['She\'s got a cough and a fever.'], ['Köhög, és lázas.', 'Ő köhög és lázas.', 'Köhög és láza van.']]
      ]
    },
    {
      id: 'feltetel', title: 'Környezet: ha… (conditionals)', icon: '🌍',
      tip: '**Feltételes mondatok: first és second conditional**\n\nA magyarban a „ha” után jöhet jelen idő, jövő idő vagy feltételes mód is. Az angol szigorúbb: **az `if` utáni részben nem áll `will` vagy `would`.**\n\n- **First conditional** – valós, könnyen megvalósuló helyzet: `if` + jelen idő, a másik részben `will` + ige. `If it rains, we will stay at home.` (Ha esik, itthon maradunk.) Hiba lenne: `If it will rain…`\n- **Second conditional** – elképzelt, valószínűtlen helyzet: `if` + past simple, a másik részben `would` + ige. `If I were rich, I would buy a forest.` (Ha gazdag lennék, vennék egy erdőt.)\n\nA second conditional a magyar **feltételes mód** (-na, -ne, -nék) megfelelője: „vennék, segítenék, csinálnál”. Az angol ezt kétfelé osztja: az `if` mellett múlt idő áll (`had`, `were`), a másik oldalon `would` (röviden `\'d`).\n\nA `be` igénél minden személyben használhatod a `were` alakot: `If I were you…` (A helyedben…) – ez választékosabb, mint az `If I was`.\n\nA két tagmondat sorrendje felcserélhető. Ha az `if` áll elöl, vesszőt teszünk közéjük, ha hátul, akkor általában nem.',
      words: [['environment', 'környezet'], ['pollution', 'szennyezés'], ['plastic', 'műanyag'], ['rubbish', 'szemét'], ['recycle', 'újrahasznosít'], ['save', 'megtakarít'],
        ['energy', 'energia'], ['planet', 'bolygó'], ['nature', 'természet'], ['forest', 'erdő'], ['river', 'folyó'], ['tree', 'fa (növény)'],
        ['air', 'levegő'], ['climate', 'éghajlat'], ['rich', 'gazdag'], ['if', 'ha'], ['bottle', 'palack'], ['turn off', 'lekapcsol']],
      sentences: [
        ['If we recycle plastic, we will save energy.', 'Ha újrahasznosítjuk a műanyagot, energiát takarítunk meg.', ['If we recycle plastic, we\'ll save energy.', 'We will save energy if we recycle plastic.'], ['Ha újrahasznosítjuk a műanyagot, energiát spórolunk.', 'Ha újrahasznosítjuk a műanyagot, energiát fogunk megtakarítani.']],
        ['If it rains, we will stay at home.', 'Ha esik, itthon maradunk.', ['If it rains, we\'ll stay at home.', 'We will stay at home if it rains.'], ['Ha esik az eső, otthon maradunk.', 'Ha esik, otthon maradunk.', 'Ha esik az eső, itthon maradunk.', 'Ha esni fog, otthon maradunk.']],
        ['Please turn off the light.', 'Kérlek, kapcsold le a villanyt.', ['Turn off the light, please.', 'Please turn the light off.'], ['Kérlek, kapcsold le a lámpát.', 'Kapcsold le a villanyt, kérlek.', 'Kérem, kapcsolja le a villanyt.', 'Kapcsold le a lámpát, kérlek.']],
        ['If I were rich, I would buy a forest.', 'Ha gazdag lennék, vennék egy erdőt.', ['If I was rich, I would buy a forest.', 'If I were rich, I\'d buy a forest.'], ['Ha gazdag lennék, egy erdőt vennék.', 'Ha gazdag volnék, vennék egy erdőt.']],
        ['What would you do if you were rich?', 'Mit csinálnál, ha gazdag lennél?', [], ['Mit tennél, ha gazdag lennél?', 'Ha gazdag lennél, mit csinálnál?', 'Mit csinálnál, ha gazdag volnál?', 'Mit tenne, ha gazdag lenne?']],
        ['The air in big cities is dirty.', 'A nagyvárosokban piszkos a levegő.', [], ['A nagyvárosok levegője piszkos.', 'A levegő a nagyvárosokban piszkos.', 'A nagyvárosokban szennyezett a levegő.']],
        ['If we cut down the trees, animals will die.', 'Ha kivágjuk a fákat, az állatok elpusztulnak.', ['If we cut the trees down, animals will die.', 'Animals will die if we cut down the trees.'], ['Ha kivágjuk a fákat, elpusztulnak az állatok.', 'Ha kivágjuk a fákat, meghalnak az állatok.', 'Ha kivágjuk a fákat, az állatok el fognak pusztulni.']],
        ['Don\'t throw your rubbish in the river.', 'Ne dobd a szemetet a folyóba.', ['Do not throw your rubbish in the river.', 'Don\'t throw your rubbish into the river.'], ['Ne dobd a szemeted a folyóba.', 'Ne dobd a folyóba a szemetet.', 'Ne dobja a szemetét a folyóba.', 'Ne dobjátok a szemetet a folyóba.']],
        ['If I had more time, I would help.', 'Ha több időm lenne, segítenék.', ['If I had more time, I\'d help.'], ['Ha több időm volna, segítenék.', 'Segítenék, ha több időm lenne.']],
        ['Pollution is bad for our planet.', 'A szennyezés árt a bolygónknak.', [], ['A szennyezés rossz a bolygónknak.', 'A környezetszennyezés árt a bolygónknak.', 'A szennyezés káros a bolygónkra.', 'A környezetszennyezés rossz a bolygónknak.']],
        ['We should protect nature.', 'Védenünk kellene a természetet.', [], ['Óvnunk kellene a természetet.', 'A természetet védenünk kellene.', 'Meg kellene védenünk a természetet.']],
        ['I use the same bottle every day.', 'Minden nap ugyanazt a palackot használom.', ['I use the same bottle every single day.'], ['Ugyanazt a palackot használom minden nap.', 'Mindennap ugyanazt a palackot használom.', 'Minden nap ugyanazt az üveget használom.']]
      ]
    },
    {
      id: 'szenvedo', title: 'Technika: szenvedő szerkezet', icon: '💻',
      tip: '**Szenvedő szerkezet (passive): be + 3. alak**\n\nAkkor használjuk, ha nem az a fontos, **ki** csinálta, hanem az, **mi történt** valamivel. A magyar ilyenkor többnyire általános alanyú, többes szám 3. személyű igét mond: „Ellopták a biciklimet.”, „Kínában gyártják.” Az angolban ilyenkor kell a passzív:\n\n- `My bike was stolen.` – Ellopták a biciklimet.\n- `These phones are made in China.` – Ezeket a telefonokat Kínában gyártják.\n\nKépzése: a **`be` megfelelő alakja + az ige 3. alakja** (past participle). Az idő a `be` igén látszik:\n\n- jelen: `is / are made`\n- múlt: `was / were built`\n- present perfect: `has / have been translated`\n\nHa mégis meg akarjuk mondani, ki végezte a cselekvést, a `by` szót használjuk: `The website is visited by millions of people.`\n\nGyakori rendhagyó 3. alakok: `make → made`, `build → built`, `steal → stolen`, `speak → spoken`, `send → sent`.\n\nA magyar „-va, -ve van” szerkezet (például „be van zárva”) inkább állapotot jelent, és ritkán ad természetes fordítást – a passzív mondatot általában az általános alannyal („bezárták”) érdemes visszaadni.',
      words: [['invent', 'feltalál'], ['build', 'épít'], ['produce', 'gyárt'], ['discover', 'felfedez'], ['steal', 'ellop'], ['translate', 'lefordít'],
        ['invention', 'találmány'], ['factory', 'gyár'], ['computer', 'számítógép'], ['smartphone', 'okostelefon'], ['screen', 'képernyő'], ['app', 'alkalmazás (app)'],
        ['website', 'weboldal'], ['password', 'jelszó'], ['message', 'üzenet'], ['battery', 'akkumulátor'], ['century', 'évszázad'], ['language', 'nyelv']],
      sentences: [
        ['The telephone was invented in 1876.', 'A telefont 1876-ban találták fel.', [], ['1876-ban találták fel a telefont.']],
        ['This bridge was built a hundred years ago.', 'Ezt a hidat száz éve építették.', [], ['Ezt a hidat száz évvel ezelőtt építették.', 'Ez a híd száz éve épült.', 'Ez a híd száz évvel ezelőtt épült.']],
        ['These phones are made in China.', 'Ezeket a telefonokat Kínában gyártják.', ['These phones are produced in China.'], ['Ezek a telefonok Kínában készülnek.', 'Ezeket a telefonokat Kínában készítik.']],
        ['My bike was stolen yesterday.', 'Tegnap ellopták a biciklimet.', ['Yesterday my bike was stolen.'], ['A biciklimet tegnap ellopták.', 'Tegnap ellopták a biciklim.', 'Ellopták tegnap a biciklimet.']],
        ['Harry Potter has been translated into many languages.', 'A Harry Pottert sok nyelvre lefordították.', [], ['Harry Pottert sok nyelvre lefordították.', 'A Harry Pottert már sok nyelvre lefordították.', 'Sok nyelvre lefordították a Harry Pottert.']],
        ['English is spoken all over the world.', 'Az angolt az egész világon beszélik.', [], ['Angolul az egész világon beszélnek.', 'Az egész világon beszélik az angolt.', 'Az angolt világszerte beszélik.']],
        ['The message was sent at ten o\'clock.', 'Az üzenetet tíz órakor küldték el.', ['The message was sent at ten.'], ['Az üzenetet tízkor küldték el.', 'Az üzenetet tíz órakor küldték.', 'Az üzenet tíz órakor ment el.']],
        ['The website is visited by millions of people.', 'A weboldalt emberek milliói látogatják.', [], ['Emberek milliói látogatják a weboldalt.', 'A weboldalt milliók látogatják.', 'A weboldalt több millió ember látogatja.']],
        ['Is this app used by teenagers?', 'Használják ezt az alkalmazást a tinédzserek?', [], ['A tinédzserek használják ezt az alkalmazást?', 'Használják a tinik ezt az appot?', 'A tinik használják ezt az appot?', 'Használják a tinik ezt az alkalmazást?']],
        ['The factory was closed last year.', 'A gyárat tavaly bezárták.', ['Last year the factory was closed.'], ['Tavaly bezárták a gyárat.', 'A gyár tavaly bezárt.']],
        ['Who was penicillin discovered by?', 'Ki fedezte fel a penicillint?', ['Who discovered penicillin?', 'By whom was penicillin discovered?']],
        ['My phone screen is broken.', 'Betört a telefonom képernyője.', ['My phone\'s screen is broken.'], ['A telefonom képernyője betört.', 'Eltört a telefonom képernyője.', 'Összetört a telefonom képernyője.', 'A telefonom képernyője összetört.', 'A telefonom kijelzője betört.']]
      ]
    },
    {
      id: 'vonatkozo', title: 'Munka: who, which, that', icon: '💼',
      tip: '**Vonatkozó mellékmondat: who, which, that, where**\n\nA magyarban a vonatkozó névmás ragot kap: aki, akit, akinek, amit, amelyben, ahol… Az angol névmás **nem ragozódik**, csak azt kell eldönteni, emberről vagy dologról van-e szó.\n\n- **who** – emberekre: `the man who lives next door` (a férfi, aki a szomszédban lakik)\n- **which** – dolgokra, állatokra: `a job which I really like` (egy állás, amit nagyon szeretek)\n- **that** – mindkettőre, a hétköznapi beszédben nagyon gyakori: `the colleague that helped you`\n- **where** – helyre: `the office where my mother works` (az iroda, ahol anyukám dolgozik)\n\nHa a névmás a mellékmondat **tárgya** (nem ő végzi a cselekvést), el is hagyható: `a job I really like`. A magyarban ezt nem lehet elhagyni!\n\nFigyelj a vesszőkre: a magyarban a mellékmondat előtt mindig van vessző, az angolban az ilyen meghatározó mellékmondatok előtt **nincs**.\n\nAz elöljáró gyakran a mondat végére kerül: `the company I work for` – szó szerint „a cég, amelynek dolgozom”.\n\nFoglalkozás előtt az angolban kell az `a / an`: `She is a scientist.` (Tudós.) – a magyar ilyenkor nem tesz névelőt.',
      words: [['job', 'állás'], ['work', 'dolgozik'], ['salary', 'fizetés'], ['boss', 'főnök'], ['office', 'iroda'], ['company', 'cég'],
        ['colleague', 'kolléga'], ['interview', 'állásinterjú'], ['engineer', 'mérnök'], ['lawyer', 'ügyvéd'], ['firefighter', 'tűzoltó'], ['police officer', 'rendőr'],
        ['mechanic', 'autószerelő'], ['journalist', 'újságíró'], ['chef', 'séf'], ['farmer', 'gazda (földműves)'], ['scientist', 'tudós'], ['pilot', 'pilóta']],
      sentences: [
        ['A pilot is a person who flies planes.', 'A pilóta olyan ember, aki repülőgépet vezet.', ['A pilot is a person that flies planes.', 'A pilot is someone who flies planes.'], ['A pilóta olyan ember, aki repülőt vezet.', 'A pilóta az az ember, aki repülőt vezet.', 'A pilóta az, aki repülőgépet vezet.']],
        ['This is the office where my mother works.', 'Ez az az iroda, ahol anyukám dolgozik.', [], ['Ez az az iroda, ahol az anyám dolgozik.', 'Ez az iroda, ahol anyukám dolgozik.', 'Ez az iroda, ahol az anyám dolgozik.']],
        ['The man who lives next door is a firefighter.', 'A férfi, aki a szomszédban lakik, tűzoltó.', ['The man that lives next door is a firefighter.'], ['Az a férfi, aki a szomszédban lakik, tűzoltó.', 'A szomszédban lakó férfi tűzoltó.']],
        ['I have a job which I really like.', 'Van egy állásom, amit nagyon szeretek.', ['I have a job that I really like.', 'I have a job I really like.'], ['Van egy állásom, amelyet nagyon szeretek.', 'Olyan állásom van, amit nagyon szeretek.', 'Van egy munkám, amit nagyon szeretek.']],
        ['The company I work for is big.', 'A cég, ahol dolgozom, nagy.', ['The company that I work for is big.', 'The company which I work for is big.'], ['Nagy a cég, ahol dolgozom.', 'A cég, amelynél dolgozom, nagy.', 'A cég, aminél dolgozom, nagy.']],
        ['My boss is a woman who speaks four languages.', 'A főnököm egy nő, aki négy nyelven beszél.', ['My boss is a woman that speaks four languages.'], ['A főnököm egy nő, aki négy nyelvet beszél.', 'A főnököm egy négy nyelven beszélő nő.']],
        ['Is that the colleague who helped you?', 'Ő az a kolléga, aki segített neked?', ['Is that the colleague that helped you?'], ['Az az a kolléga, aki segített neked?', 'Ő az a kolléga, aki segített?', 'Ő az a kolléga, aki segített önnek?']],
        ['She wants to be a scientist.', 'Tudós szeretne lenni.', [], ['Ő tudós szeretne lenni.', 'Tudós akar lenni.', 'Ő tudós akar lenni.']],
        ['I have a job interview tomorrow.', 'Holnap állásinterjúm van.', ['Tomorrow I have a job interview.', 'I\'ve got a job interview tomorrow.'], ['Holnap állásinterjúra megyek.', 'Holnap lesz az állásinterjúm.', 'Holnap állásinterjún leszek.']],
        ['The salary is good, but the work is hard.', 'A fizetés jó, de a munka nehéz.', [], ['Jó a fizetés, de nehéz a munka.', 'A fizetés jó, de nehéz a munka.', 'Jó a fizetés, de a munka nehéz.', 'A fizetés jó, de a munka kemény.']],
        ['The mechanic who repaired our car was very nice.', 'Az autószerelő, aki megjavította az autónkat, nagyon kedves volt.', ['The mechanic that repaired our car was very nice.'], ['Nagyon kedves volt az autószerelő, aki megjavította az autónkat.', 'Az autószerelő, aki megjavította a kocsinkat, nagyon kedves volt.']],
        ['A chef is someone who cooks in a restaurant.', 'A séf az, aki étteremben főz.', ['A chef is someone that cooks in a restaurant.', 'A chef is a person who cooks in a restaurant.'], ['A séf olyan ember, aki étteremben főz.', 'A séf valaki, aki étteremben főz.', 'A séf az, aki egy étteremben főz.', 'A séf olyan valaki, aki étteremben főz.']]
      ]
    },
    {
      id: 'phrasal', title: 'Úton: phrasal verbs és vélemény', icon: '🧳',
      tip: '**Phrasal verbs: ige + kis szó**\n\nAz angol rengeteg igét egy kis szóval (`on`, `off`, `up`, `out`, `after`…) együtt használ, és a kettő együtt **új jelentést** kap. Pont úgy működik, mint a magyar igekötő: „ad” – „felad”, „vesz” – „felvesz”.\n\n- `get on / get off` – felszáll / leszáll (járműre, járműről)\n- `look for` – keres, `look after` – vigyáz valakire\n- `give up` – felad, abbahagy: `Don\'t give up!`\n- `break down` – lerobban (autó, busz)\n- `run out of` – kifogy valamiből\n\nAz igekötőhöz hasonlóan a kis szó **el is válhat** az igétől: `Put on your jacket.` = `Put your jacket on.` Ha a tárgy névmás (`it`, `me`, `him`), akkor kötelező középre tenni: `Pick me up!` (nem `Pick up me`).\n\nA jelentést gyakran nem lehet kitalálni a részekből – ahogy egy külföldi sem találja ki, miért jelent mást a „kiad” és a „felad”. Ezért **egyben** tanuld meg őket, egy-egy példamondattal!\n\nVéleménynyilvánítás: `In my opinion…` (Véleményem szerint…), `I agree with you.` (Egyetértek veled.) Vigyázz: az `agree` ige, ezért nem mondjuk `I am agree` – a tagadás `I don\'t agree` vagy `I disagree`.',
      words: [['get on', 'felszáll (járműre)'], ['get off', 'leszáll (járműről)'], ['check in', 'bejelentkezik (szállodában, reptéren)'], ['look for', 'keres'], ['look after', 'vigyáz (valakire)'], ['give up', 'felad (abbahagy)'],
        ['find out', 'kiderít'], ['set off', 'útnak indul'], ['break down', 'lerobban'], ['pick up', 'érte megy'], ['put on', 'felvesz (ruhát)'], ['run out of', 'kifogy (valamiből)'],
        ['delay', 'késés'], ['cancelled', 'törölt (járat)'], ['luggage', 'poggyász'], ['opinion', 'vélemény'], ['agree', 'egyetért'], ['disagree', 'nem ért egyet']],
      sentences: [
        ['Our flight was cancelled.', 'Törölték a járatunkat.', [], ['A járatunkat törölték.', 'Törölték a gépünket.']],
        ['The bus broke down on the motorway.', 'A busz lerobbant az autópályán.', [], ['Lerobbant a busz az autópályán.', 'Az autópályán lerobbant a busz.']],
        ['I am looking for my luggage.', 'A poggyászomat keresem.', ['I\'m looking for my luggage.'], ['Keresem a poggyászomat.', 'A csomagomat keresem.', 'Keresem a csomagomat.', 'A csomagjaimat keresem.']],
        ['Can you pick me up at the station?', 'Értem tudsz jönni az állomásra?', ['Could you pick me up at the station?'], ['Tudsz értem jönni az állomásra?', 'El tudsz jönni értem az állomásra?', 'Eljössz értem az állomásra?', 'Értem tud jönni az állomásra?']],
        ['We get off at the next stop.', 'A következő megállóban leszállunk.', [], ['Leszállunk a következő megállóban.', 'A következő megállónál leszállunk.']],
        ['Put on your jacket, it is cold.', 'Vedd fel a dzsekidet, hideg van.', ['Put on your jacket, it\'s cold.', 'Put your jacket on, it is cold.', 'Put your jacket on, it\'s cold.'], ['Vedd fel a dzsekid, hideg van.', 'Hideg van, vedd fel a dzsekidet.', 'Vegye fel a dzsekijét, hideg van.']],
        ['We have run out of milk.', 'Kifogytunk a tejből.', ['We\'ve run out of milk.'], ['Elfogyott a tej.', 'Kifogyott a tej.', 'Nincs több tejünk.']],
        ['Could you look after my dog?', 'Vigyáznál a kutyámra?', [], ['Tudnál vigyázni a kutyámra?', 'Vigyázna a kutyámra?', 'Tudna vigyázni a kutyámra?', 'Vigyáznátok a kutyámra?']],
        ['Don\'t give up!', 'Ne add fel!', ['Do not give up!'], ['Ne adja fel!', 'Ne adjátok fel!']],
        ['In my opinion, the train is better.', 'Véleményem szerint a vonat jobb.', ['I think the train is better.'], ['Szerintem a vonat jobb.', 'Szerintem jobb a vonat.', 'Véleményem szerint jobb a vonat.']],
        ['I don\'t agree with you.', 'Nem értek egyet veled.', ['I do not agree with you.', 'I disagree with you.'], ['Nem értek veled egyet.', 'Nem értek egyet önnel.', 'Nem értek egyet veletek.']],
        ['We set off at six in the morning.', 'Reggel hatkor indultunk útnak.', [], ['Reggel hatkor indultunk el.', 'Reggel hat órakor indultunk útnak.', 'Reggel hatkor útnak indultunk.', 'Hajnali hatkor indultunk útnak.']]
      ]
    }
  ]
});
