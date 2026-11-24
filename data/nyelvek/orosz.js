/* Orosz nyelvtanfolyam (A1) – 10 egység. A szavak cirill betűsek, a 3. elem a magyaros (MTA-féle) latin betűs átírás. */
STUDIE.addLangCourse({
  id: 'orosz', title: 'Orosz', flag: '🇷🇺', tts: 'ru-RU', badge: 'A1',
  noSpaces: false, script: true,
  intro: 'Az oroszt több mint 250 millióan beszélik, ez a legnagyobb szláv nyelv – a cirill betűket pedig néhány nap alatt meg lehet tanulni, és sok közülük ismerős lesz!',
  units: [
    {
      id: 'koszones', title: 'Köszönés', icon: '👋',
      tip: 'Az orosz **cirill betűkkel** íródik (33 betű). Jó hír: sok betű ismerős!\n\n' +
        '- **ugyanaz, mint nálunk:** А (a), К (k), М (m), О (o), Т (t)\n' +
        '- **hamis barátok:** **В = v**, **Н = n**, **Р = r**, **С = sz**, **У = u**, **Х = h**, **Е = je**\n' +
        '- **új betűk:** Б (b), Г (g), Д (d), Ж (zs), З (z), И (i), Й (j), Л (l), П (p), Ф (f), Ц (c), Ч (cs), Ш (s), Щ (scs), Ы (hátul ejtett i), Э (e), Ю (ju), Я (ja), Ё (jo)\n' +
        '- **Ь** (lágyságjel) és **Ъ** (keményjel): önálló hangjuk nincs, a szomszéd hangot módosítják.\n\n' +
        'Tehát a РЕСТОРАН felirat nem „pectopah”, hanem **resztoran** (étterem)!\n\n' +
        'A szavak mellett **magyaros átírás** áll (pl. привет = privet, спасибо = szpaszibo, хорошо = horoso). Válaszként ezt is beírhatod.\n\n' +
        'A `здравствуйте` udvarias, a `привет` baráti köszönés – mint a „jó napot kívánok” és a „szia”.',
      words: [
        ['привет', 'szia (köszönéskor)', 'privet'], ['пока', 'szia (búcsúzáskor)', 'poka'], ['здравствуйте', 'jó napot kívánok', 'zdravsztvujte'], ['до свидания', 'viszontlátásra', 'do szvidanija'],
        ['доброе утро', 'jó reggelt', 'dobroje utro'], ['добрый вечер', 'jó estét', 'dobrij vecser'], ['спокойной ночи', 'jó éjszakát', 'szpokojnoj nocsi'], ['спасибо', 'köszönöm', 'szpaszibo'],
        ['пожалуйста', 'kérem; szívesen', 'pozsalujszta'], ['да', 'igen', 'da'], ['нет', 'nem', 'net'], ['извините', 'elnézést', 'izvinite'], ['как дела', 'hogy vagy? (hogy megy?)', 'kak dela'],
        ['хорошо', 'jól', 'horoso'], ['отлично', 'kitűnően', 'otlicsno'], ['плохо', 'rosszul', 'ploho']
      ],
      sentences: [
        ['Привет, Анна!', 'Szia, Anna!', [], []],
        ['Здравствуйте, Анна Ивановна!', 'Jó napot kívánok, Anna Ivanovna!', ['Добрый день, Анна Ивановна!'], ['Jó napot, Anna Ivanovna!']],
        ['Как дела?', 'Hogy vagy?', [], ['Hogy vagytok?', 'Mi újság?', 'Hogy megy?']],
        ['Спасибо, хорошо.', 'Köszönöm, jól.', [], ['Köszönöm, jól vagyok.']],
        ['Спасибо, отлично!', 'Köszönöm, kitűnően!', [], ['Köszönöm, nagyon jól!']],
        ['Доброе утро, мама!', 'Jó reggelt, anya!', [], ['Jó reggelt, anyu!']],
        ['Пока, до завтра!', 'Szia, holnap találkozunk!', [], ['Szia, holnapig!', 'Szia, viszlát holnap!']],
        ['Нет, спасибо.', 'Nem, köszönöm.', [], []],
        ['Да, пожалуйста.', 'Igen, kérem.', [], ['Igen, kérek.', 'Igen, legyen szíves.']],
        ['Извините, пожалуйста!', 'Elnézést kérek!', [], ['Bocsánat!', 'Elnézést!']],
        ['Спокойной ночи, папа!', 'Jó éjszakát, apa!', [], ['Jó éjt, apa!']],
        ['До свидания, Анна Ивановна!', 'Viszontlátásra, Anna Ivanovna!', [], []]
      ]
    },
    {
      id: 'bemutatkozas', title: 'Bemutatkozás', icon: '🙋',
      tip: '**Jelen időben nincs „van”!** Az orosz egyszerűen elhagyja: `Я школьник.` = (Én) iskolás vagyok. `Он русский.` = Ő orosz. Az alanyt (я, ты, он…) viszont általában kiteszik.\n\n' +
        '**Ты vagy вы?** A `ты` (te) barátnak, családtagnak, gyereknek jár; a `вы` (ön, ti) felnőttnek, tanárnak, idegennek – és több embernek. `Как тебя зовут?` = Hogy hívnak? `Как вас зовут?` = Hogy hívják önt?\n\n' +
        'A `Меня зовут Анна.` szó szerint: engem Annának hívnak.\n\n' +
        '**Hangsúly:** az orosz szóhangsúly szabad – bármelyik szótagra eshet, ezért szavanként kell megtanulni (hallgasd meg a 🔊 gombbal!). A hangsúlytalan **о** a-nak hangzik: `хорошо` ≈ haraso, `Россия` ≈ Rasszija. A tankönyvek ékezettel jelölik a hangsúlyt: приве́т, спаси́бо.\n\n' +
        'A nemzetiségnek férfi és női alakja van: `венгр` / `венгерка` (magyar), `русский` / `русская` (orosz).',
      words: [
        ['я', 'én', 'ja'], ['ты', 'te', 'ti'], ['вы', 'ön; ti', 'vi'], ['он', 'ő (férfi)', 'on'], ['она', 'ő (nő)', 'ona'], ['кто', 'ki?', 'kto'], ['что', 'mi?', 'csto'], ['это', 'ez; az', 'eto'],
        ['меня зовут', 'a nevem (engem … hívnak)', 'menja zovut'], ['очень приятно', 'nagyon örvendek', 'ocsen prijatno'], ['школьник', 'iskolás fiú', 'skolnik'], ['школьница', 'iskolás lány', 'skolnica'],
        ['Венгрия', 'Magyarország', 'Vengrija'], ['Россия', 'Oroszország', 'Rosszija'], ['венгр', 'magyar (férfi)', 'vengr'], ['венгерка', 'magyar (nő)', 'vengerka'],
        ['русский', 'orosz (férfi)', 'russzkij'], ['русская', 'orosz (nő)', 'russzkaja'], ['друг', 'barát', 'drug'], ['подруга', 'barátnő', 'podruga']
      ],
      sentences: [
        ['Меня зовут Анна.', 'Annának hívnak.', ['Я Анна.'], ['A nevem Anna.', 'Anna vagyok.', 'Engem Annának hívnak.']],
        ['Как тебя зовут?', 'Hogy hívnak?', [], ['Mi a neved?', 'Téged hogy hívnak?']],
        ['Как вас зовут?', 'Hogy hívják önt?', [], ['Mi a neve?', 'Önt hogy hívják?', 'Hogy hívják?']],
        ['Я школьник.', 'Iskolás vagyok.', [], ['Én iskolás vagyok.', 'Diák vagyok.']],
        ['Она школьница.', 'Ő iskolás.', [], ['Ő iskolás lány.', 'Ő diák.']],
        ['Я из Венгрии.', 'Magyarországról jöttem.', [], ['Magyarországról vagyok.', 'Magyarországi vagyok.', 'Magyarországról származom.']],
        ['Я венгерка.', 'Magyar vagyok.', [], ['Én magyar vagyok.']],
        ['Кто это?', 'Ki ez?', [], ['Ki az?', 'Ő kicsoda?']],
        ['Это мой друг Иван.', 'Ő a barátom, Iván.', [], ['Ez a barátom, Iván.', 'Ő Iván, a barátom.']],
        ['Очень приятно!', 'Nagyon örvendek!', [], ['Örvendek!', 'Örülök, hogy megismerhetlek!']],
        ['Ты русский?', 'Orosz vagy?', [], ['Te orosz vagy?']],
        ['Нет, я венгр.', 'Nem, magyar vagyok.', [], ['Nem, én magyar vagyok.']]
      ]
    },
    {
      id: 'szamok', title: 'Számok', icon: '🔢',
      tip: 'Számok 1–10: один, два, три, четыре, пять, шесть, семь, восемь, девять, десять.\n\n' +
        '- 11–19 végződése **-надцать** (kb. „tizen-”): пятнадцать = 15\n' +
        '- 20 = двадцать, 30 = тридцать, 40 = сорок, 100 = сто\n\n' +
        '**Hány éves vagy?** Oroszul részes esettel mondjuk: `Мне пятнадцать лет.` = szó szerint „nekem tizenöt év”. Kérdés: `Сколько тебе лет?`\n\n' +
        '**A számnév után** változik a főnév alakja – ez az orosz egyik csavarja:\n\n' +
        '- 1 után alanyeset: один рубль\n' +
        '- 2, 3, 4 után egyes számú birtokos eset: два рубля\n' +
        '- 5-től többes számú birtokos eset: пять рублей, сто рублей\n\n' +
        'Eleinte elég, ha felismered! Az ár kérdezése: `Сколько это стоит?` = Mennyibe kerül ez?\n\n' +
        'Számolás: `Два плюс три будет пять.` = Kettő meg három az öt (szó szerint: … lesz öt).',
      words: [
        ['один', 'egy', 'odin'], ['два', 'kettő', 'dva'], ['три', 'három', 'tri'], ['четыре', 'négy', 'csetire'], ['пять', 'öt', 'pjat'], ['шесть', 'hat', 'seszt'], ['семь', 'hét', 'szem'],
        ['восемь', 'nyolc', 'voszem'], ['девять', 'kilenc', 'devjat'], ['десять', 'tíz', 'deszjat'], ['пятнадцать', 'tizenöt', 'pjatnadcat'], ['двадцать', 'húsz', 'dvadcat'], ['сто', 'száz', 'szto'],
        ['ноль', 'nulla', 'nol'], ['сколько', 'mennyi?', 'szkolko'], ['стоит', 'kerül (valamennyibe)', 'sztoit'], ['рубль', 'rubel', 'rubl'], ['плюс', 'plusz', 'pljusz'], ['минус', 'mínusz', 'minusz'], ['будет', 'lesz', 'budet']
      ],
      sentences: [
        ['Один, два, три!', 'Egy, kettő, három!', [], ['Egy, két, három!']],
        ['Сколько это стоит?', 'Mennyibe kerül ez?', [], ['Ez mennyibe kerül?', 'Mennyibe kerül?']],
        ['Это стоит сто рублей.', 'Ez száz rubelbe kerül.', [], ['Ez száz rubel.', 'Ez 100 rubelbe kerül.']],
        ['Это стоит двадцать рублей.', 'Ez húsz rubelbe kerül.', [], ['Ez húsz rubel.', 'Ez 20 rubelbe kerül.']],
        ['Мне пятнадцать лет.', 'Tizenöt éves vagyok.', [], ['15 éves vagyok.']],
        ['Сколько тебе лет?', 'Hány éves vagy?', [], []],
        ['Два плюс три будет пять.', 'Kettő meg három az öt.', [], ['Kettő plusz három az öt.', 'Kettő plusz három egyenlő öt.']],
        ['Десять минус четыре будет шесть.', 'Tíz mínusz négy az hat.', [], ['Tízből négy az hat.', 'Tíz mínusz négy egyenlő hat.']],
        ['Пять плюс пять будет десять.', 'Öt meg öt az tíz.', [], ['Öt plusz öt az tíz.', 'Öt plusz öt egyenlő tíz.']],
        ['Семь, восемь, девять, десять!', 'Hét, nyolc, kilenc, tíz!', [], []]
      ]
    },
    {
      id: 'csalad', title: 'Család', icon: '👨‍👩‍👧',
      tip: 'Az orosz főneveknek **nemük** van – a szó végéről általában látszik:\n\n' +
        '- **hímnem:** mássalhangzóra végződik: брат, кот, дом\n' +
        '- **nőnem:** -а / -я a vége: мама, сестра, семья\n' +
        '- **semlegesnem:** -о / -е a vége: молоко, платье\n\n' +
        'Kivétel: a папа és a дедушка -a végű, mégis hímnem (hiszen férfiak!). A -ь végű szavak lehetnek hím- vagy nőneműek is (a дочь nőnemű).\n\n' +
        'A birtokos névmás igazodik a főnév neméhez: **мой** брат, **моя** сестра, **моё** платье; ugyanígy **твой / твоя / твоё**.\n\n' +
        '**Nekem van:** `У меня есть брат.` – szó szerint „nálam van fivér”. Kérdés: `У тебя есть собака?` = Van kutyád? A birtoklást itt sem ige fejezi ki – mint a magyar „nekem van”.\n\n' +
        '`старший брат` = idősebb fiútestvér (báty), `младший брат` = öcs.',
      words: [
        ['семья', 'család', 'szemja'], ['мама', 'anya', 'mama'], ['папа', 'apa', 'papa'], ['брат', 'fiútestvér', 'brat'], ['сестра', 'lánytestvér', 'szesztra'], ['бабушка', 'nagymama', 'babuska'],
        ['дедушка', 'nagyapa', 'deduska'], ['сын', 'fiú (gyermek)', 'szin'], ['дочь', 'lány (gyermek)', 'docs'], ['родители', 'szülők', 'roditeli'], ['мой', 'az én … (hímnem)', 'moj'],
        ['моя', 'az én … (nőnem)', 'moja'], ['твой', 'a te … (hímnem)', 'tvoj'], ['твоя', 'a te … (nőnem)', 'tvoja'], ['у меня есть', 'nekem van', 'u menja jeszt'], ['кот', 'macska', 'kot'],
        ['собака', 'kutya', 'szobaka'], ['старший', 'idősebb', 'sztarsij'], ['младший', 'fiatalabb', 'mladsij']
      ],
      sentences: [
        ['Это моя мама.', 'Ez az anyukám.', [], ['Ő az anyukám.', 'Ez az anyám.', 'Ő az anyám.', 'Ez az én anyukám.']],
        ['Мой папа учитель.', 'Az apukám tanár.', [], ['Apukám tanár.', 'Az apám tanár.', 'Apám tanár.']],
        ['У меня есть брат.', 'Van egy fiútestvérem.', [], ['Van egy bátyám.', 'Van egy öcsém.', 'Van egy testvérem.']],
        ['У меня есть старшая сестра.', 'Van egy nővérem.', [], []],
        ['Мой младший брат школьник.', 'Az öcsém iskolás.', [], ['Az öcsém diák.']],
        ['У тебя есть собака?', 'Van kutyád?', [], ['Neked van kutyád?']],
        ['Да, у меня есть собака.', 'Igen, van egy kutyám.', [], ['Igen, van kutyám.']],
        ['Это твой кот?', 'Ez a te macskád?', [], ['Ez a macskád?']],
        ['Моя бабушка очень добрая.', 'A nagymamám nagyon kedves.', [], ['Nagymamám nagyon kedves.']],
        ['Это моя семья.', 'Ez a családom.', [], ['Ez az én családom.']],
        ['Мои родители дома.', 'A szüleim otthon vannak.', [], ['Szüleim otthon vannak.']]
      ]
    },
    {
      id: 'iskola', title: 'Iskola', icon: '🏫',
      tip: '**Esetek:** az orosz főnévnek 6 esete van – a magyarban ennél jóval több rag van, úgyhogy nem kell megijedni! A szó vége változik, mint a magyar ragoknál.\n\n' +
        'Az első a **tárgyeset** (magyarul -t): a nőnemű -а → **-у**, -я → **-ю**: `книга` → `Я читаю книгу.` (Könyvet olvasok.) A hímnemű élettelen és a semlegesnemű főnevek **nem változnak**: `Я пишу домашнее задание.`\n\n' +
        '**Igeragozás** (читать = olvasni):\n\n' +
        '- я чита**ю**, ты чита**ешь**, он/она чита**ет**\n' +
        '- мы чита**ем**, вы чита**ете**, они чита**ют**\n\n' +
        'Ugyanígy megy a понимать (érteni) is. A писать és a говорить kicsit másképp: я пишу, ты пишешь; я говорю, ты говоришь.\n\n' +
        '**Tagadás:** `не` az ige előtt: `Я не понимаю.` = Nem értem.\n\n' +
        'Az `а` (pedig) szembeállít: `Это стол, а это стул.` = Ez egy asztal, ez pedig egy szék.',
      words: [
        ['школа', 'iskola', 'skola'], ['класс', 'osztály', 'klassz'], ['учитель', 'tanár', 'ucsitel'], ['учительница', 'tanárnő', 'ucsitelnica'], ['книга', 'könyv', 'kniga'], ['тетрадь', 'füzet', 'tetrad'],
        ['ручка', 'toll', 'rucska'], ['карандаш', 'ceruza', 'karandas'], ['рюкзак', 'hátizsák', 'rjukzak'], ['стол', 'asztal', 'sztol'], ['стул', 'szék', 'sztul'], ['доска', 'tábla', 'doszka'],
        ['урок', 'tanóra', 'urok'], ['домашнее задание', 'házi feladat', 'domasneje zadanije'], ['читать', 'olvasni', 'csitat'], ['писать', 'írni', 'piszat'], ['понимать', 'érteni', 'ponimat'],
        ['говорить', 'beszélni', 'govorit'], ['по-русски', 'oroszul', 'po-russzki'], ['вот', 'íme, itt van', 'vot']
      ],
      sentences: [
        ['Это книга.', 'Ez egy könyv.', [], ['Ez könyv.']],
        ['Вот моя ручка.', 'Itt a tollam.', [], ['Itt van a tollam.', 'Íme, a tollam.']],
        ['Это мой рюкзак.', 'Ez az én hátizsákom.', [], ['Ez a hátizsákom.']],
        ['Я читаю книгу.', 'Olvasok egy könyvet.', [], ['Könyvet olvasok.', 'Egy könyvet olvasok.', 'Olvasom a könyvet.']],
        ['Я пишу домашнее задание.', 'Írom a házi feladatot.', [], ['A házi feladatot írom.', 'Házi feladatot írok.']],
        ['Я не понимаю.', 'Nem értem.', [], []],
        ['Ты понимаешь?', 'Érted?', [], ['Te érted?']],
        ['Учительница говорит по-русски.', 'A tanárnő oroszul beszél.', [], []],
        ['Где моя тетрадь?', 'Hol van a füzetem?', [], ['Hol a füzetem?']],
        ['Это стол, а это стул.', 'Ez egy asztal, ez pedig egy szék.', [], ['Ez asztal, ez pedig szék.', 'Ez egy asztal, az pedig egy szék.']],
        ['Мы говорим по-русски.', 'Oroszul beszélünk.', [], ['Mi oroszul beszélünk.']],
        ['Учитель пишет на доске.', 'A tanár a táblára ír.', [], ['A tanár ír a táblára.']]
      ]
    },
    {
      id: 'etel', title: 'Étel és ital', icon: '🍎',
      tip: 'Rendhagyó, de nagyon fontos igék:\n\n' +
        '- **есть** (enni): я ем, ты ешь, он ест, мы едим, вы едите, они едят\n' +
        '- **пить** (inni): я пью, ты пьёшь, он пьёт, мы пьём, вы пьёте, они пьют\n' +
        '- **любить** (szeretni): я люблю, ты любишь, он любит\n\n' +
        'Vigyázz: az `есть` azt is jelenti, hogy „van” (`у меня есть` = nekem van)!\n\n' +
        'A tárgyeset itt is működik: `Я люблю рыбу.` (рыба → рыбу), de `Я пью чай.` (hímnem, nem változik).\n\n' +
        'A `любить` + főnévi igenév = szeret csinálni valamit: `Я люблю читать.` = Szeretek olvasni.\n\n' +
        'Étkezések: **завтрак** (reggeli), **обед** (ebéd), **ужин** (vacsora). Reggelire = `на завтрак`.\n\n' +
        '`Это очень вкусно!` – ezt minden vendéglátó örömmel hallja. A `Можно…?` (lehet…?) udvarias kérés: `Можно сок?` = Kaphatok gyümölcslevet?',
      words: [
        ['хлеб', 'kenyér', 'hleb'], ['вода', 'víz', 'voda'], ['молоко', 'tej', 'moloko'], ['чай', 'tea', 'csaj'], ['кофе', 'kávé', 'kofe'], ['сок', 'gyümölcslé', 'szok'], ['суп', 'leves', 'szup'],
        ['мясо', 'hús', 'mjaszo'], ['рыба', 'hal', 'riba'], ['сыр', 'sajt', 'szir'], ['яблоко', 'alma', 'jabloko'], ['торт', 'torta', 'tort'], ['есть', 'enni', 'jeszt'], ['пить', 'inni', 'pit'],
        ['любить', 'szeretni', 'ljubit'], ['вкусно', 'finom', 'vkuszno'], ['завтрак', 'reggeli', 'zavtrak'], ['обед', 'ebéd', 'obed'], ['ужин', 'vacsora', 'uzsin']
      ],
      sentences: [
        ['Я пью чай.', 'Teát iszom.', [], ['Én teát iszom.', 'Teát iszok.']],
        ['Я ем хлеб и сыр.', 'Kenyeret és sajtot eszem.', [], ['Kenyeret és sajtot eszek.']],
        ['Ты пьёшь кофе?', 'Iszol kávét?', [], ['Kávét iszol?']],
        ['Я люблю рыбу.', 'Szeretem a halat.', [], ['Én szeretem a halat.']],
        ['Я не люблю мясо.', 'Nem szeretem a húst.', [], ['A húst nem szeretem.']],
        ['Это очень вкусно!', 'Ez nagyon finom!', [], ['Nagyon finom!']],
        ['На завтрак я ем яблоко.', 'Reggelire almát eszem.', ['Я ем яблоко на завтрак.'], ['Reggelire egy almát eszem.', 'Reggelire almát eszek.']],
        ['Можно сок?', 'Kaphatok gyümölcslevet?', [], ['Kérhetek gyümölcslevet?', 'Kaphatok egy gyümölcslevet?']],
        ['На обед у нас суп.', 'Ebédre leves van.', [], ['Ebédre levest eszünk.', 'Ebédre levesünk van.']],
        ['Мама любит торт.', 'Anya szereti a tortát.', [], ['Anyukám szereti a tortát.', 'Az anyukám szereti a tortát.']],
        ['Мы пьём молоко.', 'Tejet iszunk.', [], ['Mi tejet iszunk.']],
        ['На ужин мы едим рыбу.', 'Vacsorára halat eszünk.', [], []]
      ]
    },
    {
      id: 'szinek', title: 'Színek és ruhák', icon: '👕',
      tip: 'A melléknév **igazodik** a főnév neméhez és számához – a magyarban ilyen nincs:\n\n' +
        '- hímnem: **-ый / -ий / -ой**: красный кот, синий рюкзак, большой дом\n' +
        '- nőnem: **-ая / -яя**: красная куртка, синяя шапка\n' +
        '- semlegesnem: **-ое / -ее**: красное платье, синее платье\n' +
        '- többes szám: **-ые / -ие**: красные брюки, синие брюки\n\n' +
        'A szótárban mindig a hímnemű alak szerepel.\n\n' +
        'A `брюки` (nadrág) csak többes számban létezik – mint az angol trousers.\n\n' +
        '**Синий vagy голубой?** Az orosz két külön alapszínnek tartja a sötétkéket (синий) és a világoskéket (голубой) – ahogy a magyar is megkülönbözteti a pirosat és a vöröset.\n\n' +
        'Kérdés: `Какой?` (milyen? – hímnem), `Какая?` (nőnem): `Какая красивая шапка!` = Milyen szép sapka!\n\n' +
        'Az `ё` mindig hangsúlyos: зелёный, жёлтый, чёрный.',
      words: [
        ['красный', 'piros', 'krasznij'], ['синий', 'kék (sötétkék)', 'szinij'], ['голубой', 'világoskék', 'goluboj'], ['зелёный', 'zöld', 'zeljonij'], ['жёлтый', 'sárga', 'zsoltij'], ['белый', 'fehér', 'belij'],
        ['чёрный', 'fekete', 'csornij'], ['большой', 'nagy', 'bolsoj'], ['маленький', 'kicsi', 'malenkij'], ['новый', 'új', 'novij'], ['старый', 'régi; öreg', 'sztarij'], ['красивый', 'szép', 'kraszivij'],
        ['платье', 'ruha (női)', 'platje'], ['футболка', 'póló', 'futbolka'], ['куртка', 'dzseki', 'kurtka'], ['брюки', 'nadrág', 'brjuki'], ['шапка', 'sapka', 'sapka'], ['какой', 'milyen?', 'kakoj'],
        ['цвет', 'szín', 'cvet'], ['любимый', 'kedvenc', 'ljubimij']
      ],
      sentences: [
        ['Моя куртка чёрная.', 'A dzsekim fekete.', [], ['Az én dzsekim fekete.']],
        ['Это красное платье.', 'Ez egy piros ruha.', [], ['Ez piros ruha.']],
        ['У меня новая футболка.', 'Új pólóm van.', [], ['Van egy új pólóm.']],
        ['Какой твой любимый цвет?', 'Mi a kedvenc színed?', [], ['Melyik a kedvenc színed?']],
        ['Мой любимый цвет зелёный.', 'A kedvenc színem a zöld.', [], ['Az én kedvenc színem a zöld.']],
        ['Мои брюки синие.', 'A nadrágom kék.', [], ['A nadrágom sötétkék.']],
        ['Какая красивая шапка!', 'Milyen szép sapka!', [], []],
        ['Кот маленький и белый.', 'A macska kicsi és fehér.', [], ['A cica kicsi és fehér.']],
        ['Небо голубое.', 'Az ég világoskék.', [], ['Kék az ég.', 'Az ég kék.']],
        ['Это старая куртка.', 'Ez egy régi dzseki.', [], ['Ez régi dzseki.']],
        ['Жёлтая футболка очень красивая.', 'A sárga póló nagyon szép.', [], []],
        ['Это большая шапка.', 'Ez egy nagy sapka.', [], ['Ez nagy sapka.']]
      ]
    },
    {
      id: 'ido', title: 'Napok és idő', icon: '📅',
      tip: 'A hét napjait **kisbetűvel** írjuk: понедельник, вторник, среда, четверг, пятница, суббота, воскресенье. Néhány név számból ered: вторник ← второй (második), четверг ← четыре (négy), пятница ← пять (öt).\n\n' +
        '**Melyik napon?** `в` + tárgyeset: `в понедельник` (hétfőn), `в среду` (szerdán), `в пятницу` (pénteken).\n\n' +
        '**Napszakok** határozóként: `утром` (reggel), `днём` (napközben), `вечером` (este), `ночью` (éjjel).\n\n' +
        '**Múlt idejű „volt”:** a jelen időben elhagyott létige múlt időben megjelenik, és igazodik a nemhez: `был` (hímnem), `была` (nőnem), `было` (semlegesnem), `были` (többes szám): `Вчера было воскресенье.`\n\n' +
        'Jövő: `будет` = lesz: `Завтра будет суббота.` (Gyakran el is hagyják: `Завтра суббота.`)\n\n' +
        'Az idő: `Который час?` = Hány óra van? `Сейчас три часа.` 2–4 után `часа`, 5-től `часов`: `десять часов`.',
      words: [
        ['понедельник', 'hétfő', 'ponedelnik'], ['вторник', 'kedd', 'vtornik'], ['среда', 'szerda', 'szreda'], ['четверг', 'csütörtök', 'csetverg'], ['пятница', 'péntek', 'pjatnica'], ['суббота', 'szombat', 'szubbota'],
        ['воскресенье', 'vasárnap', 'voszkreszenje'], ['сегодня', 'ma', 'szegodnja'], ['завтра', 'holnap', 'zavtra'], ['вчера', 'tegnap', 'vcsera'], ['сейчас', 'most', 'szejcsasz'], ['утром', 'reggel', 'utrom'],
        ['вечером', 'este', 'vecserom'], ['день', 'nap', 'den'], ['неделя', 'hét (7 nap)', 'nedelja'], ['час', 'óra (időegység)', 'csasz'], ['который час', 'hány óra van?', 'kotorij csasz']
      ],
      sentences: [
        ['Сегодня понедельник.', 'Ma hétfő van.', [], ['Ma hétfő.']],
        ['Завтра суббота.', 'Holnap szombat lesz.', ['Завтра будет суббота.'], ['Holnap szombat van.', 'Holnap szombat.']],
        ['Вчера было воскресенье.', 'Tegnap vasárnap volt.', [], []],
        ['Который час?', 'Hány óra van?', ['Сколько времени?'], ['Hány óra?']],
        ['Сейчас три часа.', 'Most három óra van.', [], ['Három óra van.']],
        ['В пятницу у меня урок.', 'Pénteken órám van.', [], ['Pénteken van órám.']],
        ['Утром я пью чай.', 'Reggel teát iszom.', [], ['Reggelente teát iszom.', 'Reggel teát iszok.']],
        ['Вечером я читаю.', 'Este olvasok.', [], ['Esténként olvasok.']],
        ['В неделе семь дней.', 'Egy hétben hét nap van.', [], ['Egy hét hét napból áll.']],
        ['Сегодня среда или четверг?', 'Ma szerda vagy csütörtök van?', [], ['Ma szerda van vagy csütörtök?']],
        ['Сейчас десять часов.', 'Most tíz óra van.', [], ['Tíz óra van.']]
      ]
    },
    {
      id: 'varos', title: 'Város és közlekedés', icon: '🚌',
      tip: '**Hol? – Hova?**\n\n' +
        '- Hol? `где` + `в` / `на` + **elöljárós eset** (gyakran -е végű): `в парке` (a parkban), `в городе` (a városban), `на улице` (az utcán)\n' +
        '- Hova? `куда` + `в` / `на` + **tárgyeset**: `в школу` (iskolába), `в парк` (a parkba)\n\n' +
        'A `на` nyílt helyekhez és eseményekhez kell: `на улице`, `на вокзале`, `на уроке`.\n\n' +
        '**Két „menni”:** az orosz megkülönbözteti, hogy valaki **gyalog** vagy **járművel** megy:\n\n' +
        '- `идти`: я иду, ты идёшь, он идёт (gyalog)\n' +
        '- `ехать`: я еду, ты едешь, он едет (járművel)\n\n' +
        'A jármű: `на` + elöljárós eset: `на автобусе`, `на машине`, `на метро` (a метро nem ragozható).\n\n' +
        'Útbaigazítás: `направо` (jobbra), `налево` (balra), `прямо` (egyenesen). Udvarias felszólítás: `Идите прямо!` = Menjen egyenesen!',
      words: [
        ['город', 'város', 'gorod'], ['улица', 'utca', 'ulica'], ['дом', 'ház', 'dom'], ['магазин', 'bolt', 'magazin'], ['парк', 'park', 'park'], ['вокзал', 'pályaudvar', 'vokzal'],
        ['больница', 'kórház', 'bolnica'], ['аптека', 'gyógyszertár', 'apteka'], ['автобус', 'busz', 'avtobusz'], ['метро', 'metró', 'metro'], ['машина', 'autó', 'masina'], ['где', 'hol?', 'gde'],
        ['здесь', 'itt', 'zdesz'], ['там', 'ott', 'tam'], ['направо', 'jobbra', 'napravo'], ['налево', 'balra', 'nalevo'], ['прямо', 'egyenesen', 'prjamo'], ['идти', 'menni (gyalog)', 'idti'],
        ['ехать', 'menni (járművel)', 'jehat'], ['куда', 'hova?', 'kuda']
      ],
      sentences: [
        ['Где аптека?', 'Hol van a gyógyszertár?', [], ['Hol a gyógyszertár?', 'Hol van a patika?']],
        ['Аптека там.', 'A gyógyszertár ott van.', [], ['Ott van a gyógyszertár.']],
        ['Магазин направо.', 'A bolt jobbra van.', [], ['Jobbra van a bolt.']],
        ['Идите прямо, потом налево.', 'Menjen egyenesen, aztán balra.', [], ['Menj egyenesen, aztán balra.', 'Menjen egyenesen, utána balra.']],
        ['Я иду в школу.', 'Iskolába megyek.', [], ['Megyek az iskolába.', 'Az iskolába megyek.']],
        ['Мы едем на автобусе.', 'Busszal megyünk.', [], ['Busszal utazunk.']],
        ['Куда ты идёшь?', 'Hova mész?', [], ['Hová mész?']],
        ['Я живу в городе.', 'A városban lakom.', [], ['Városban lakom.', 'A városban élek.', 'Városban élek.']],
        ['Мой дом здесь.', 'Itt van a házam.', [], ['A házam itt van.']],
        ['Папа едет на машине.', 'Apa autóval megy.', [], ['Apa kocsival megy.', 'Apa autóval jön.']],
        ['Вокзал далеко?', 'Messze van a pályaudvar?', [], ['A pályaudvar messze van?']],
        ['Больница на этой улице.', 'A kórház ebben az utcában van.', [], ['A kórház ezen az utcán van.']]
      ]
    },
    {
      id: 'hobbi', title: 'Hobbi és múlt idő', icon: '⚽',
      tip: '**Múlt idő** – könnyebb, mint hinnéd! Az igető után **-л** jön, és csak a nem számít, a személy nem:\n\n' +
        '- он смотрел, она смотрела, они смотрели\n' +
        '- я играл (fiú mondja) / я играла (lány mondja)\n\n' +
        'Egy lány tehát így mondja: `Вчера я смотрела фильм.`\n\n' +
        '**Igeszemlélet:** az orosz igéknek általában párjuk van:\n\n' +
        '- **folyamatos** (befejezetlen): смотреть = nézni\n' +
        '- **befejezett**: посмотреть = megnézni\n\n' +
        'A magyar igekötő hasonló szerepet tölt be! `Я смотрел фильм.` = Filmet néztem. `Я посмотрел фильм.` = Megnéztem a filmet.\n\n' +
        '**Sport és hangszer:** `играть в футбол` (focizni), de `играть на гитаре` (gitározni).\n\n' +
        '**Jövő idő:** `буду` + főnévi igenév: `Завтра мы будем танцевать.` = Holnap táncolni fogunk.',
      words: [
        ['хобби', 'hobbi', 'hobbi'], ['играть', 'játszani', 'igrat'], ['футбол', 'foci', 'futbol'], ['гитара', 'gitár', 'gitara'], ['музыка', 'zene', 'muzika'], ['фильм', 'film', 'film'],
        ['кино', 'mozi', 'kino'], ['петь', 'énekelni', 'pet'], ['танцевать', 'táncolni', 'tancevat'], ['рисовать', 'rajzolni', 'riszovat'], ['плавать', 'úszni', 'plavat'], ['слушать', 'hallgatni', 'szlusat'],
        ['смотреть', 'nézni', 'szmotret'], ['посмотреть', 'megnézni', 'poszmotret'], ['был', 'volt (hímnem)', 'bil'], ['была', 'volt (nőnem)', 'bila']
      ],
      sentences: [
        ['Я играю в футбол.', 'Focizom.', [], ['Focizok.', 'Futballozom.', 'Én focizom.']],
        ['Ты играешь на гитаре?', 'Gitározol?', [], ['Játszol gitáron?', 'Te gitározol?']],
        ['Я люблю слушать музыку.', 'Szeretek zenét hallgatni.', [], ['Szeretem hallgatni a zenét.']],
        ['Вчера я смотрел фильм.', 'Tegnap filmet néztem.', ['Вчера я смотрела фильм.'], []],
        ['Вчера я посмотрел фильм.', 'Tegnap megnéztem egy filmet.', ['Вчера я посмотрела фильм.'], ['Tegnap megnéztem a filmet.']],
        ['Мы были в кино.', 'Moziban voltunk.', [], ['Mi moziban voltunk.']],
        ['Она хорошо поёт.', 'Ő jól énekel.', [], ['Jól énekel.']],
        ['Анна была в парке.', 'Anna a parkban volt.', [], []],
        ['Мой брат любит рисовать.', 'A bátyám szeret rajzolni.', [], ['Az öcsém szeret rajzolni.', 'A fiútestvérem szeret rajzolni.', 'A testvérem szeret rajzolni.']],
        ['Я плаваю каждый день.', 'Minden nap úszom.', [], ['Mindennap úszom.', 'Minden nap úszok.', 'Mindennap úszok.']],
        ['Завтра мы будем танцевать.', 'Holnap táncolni fogunk.', [], ['Holnap táncolunk.']],
        ['Какое у тебя хобби?', 'Mi a hobbid?', [], ['Neked mi a hobbid?']]
      ]
    }
  ]
});
