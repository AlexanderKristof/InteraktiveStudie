/* Svéd nyelvtanfolyam (A1–A2) – a js/nyelvek.js motor adatai. */
STUDIE.addLangCourse({
  id: 'sved', title: 'Svéd', flag: '🇸🇪', tts: 'sv-SE', badge: 'A1–A2',
  noSpaces: false, script: false,
  intro: 'A svédet kb. 10 millióan beszélik, és a norvégokkal, dánokkal nagyjából meg is értik egymást. Kedvenc szavuk a fika: kávé (vagy tea) egy kis sütivel, jó társaságban – ez náluk szinte szent hagyomány.',
  units: [
    {
      id: 'koszones', title: 'Köszönés és bemutatkozás', icon: '👋',
      tip: '**Kiejtés – å, ä, ö és a sziszegő hangok**\n\n' +
        '- `å` = kb. **ó/o**: **två** (tvó – kettő), **förlåt** (förlót).\n' +
        '- `ä` = **e**: **välkommen**. Az `ö` ugyanaz, mint a magyar ö: **förlåt**.\n' +
        '- Az `o` sokszor **u**-nak hangzik: **god** (gúd), **bo** (bú – lakni).\n' +
        '- **sj-hang**: fújós, „hs”-szerű hang, a magyarban nincs ilyen. Így írják: `sj`, `skj`, `stj`, és `sk` lágy magánhangzó (e, i, y, ä, ö) előtt: **sju** (hét), **skjorta** (ing).\n' +
        '- **tj-hang**: lágy, sziszegő hang, kb. egy nagyon puha s: `tj`, `kj`, és `k` lágy magánhangzó előtt: **tjugo** (húsz), **kyrka** (templom).\n' +
        '- `g` lágy magánhangzó előtt **j**: **göra** (jöra – csinálni), **ge** (jé – adni).\n\n' +
        'Kemény magánhangzók (a, o, u, å) előtt a k és g sima k és g marad: **kaffe**, **god**.\n\n' +
        'A **jag** (én) szót élőbeszédben legtöbbször csak „já”-nak ejtik.',
      words: [
        ['hej', 'szia'], ['hej då', 'viszlát'], ['god morgon', 'jó reggelt'], ['god dag', 'jó napot'], ['god kväll', 'jó estét'],
        ['god natt', 'jó éjszakát'], ['tack', 'köszönöm'], ['tack så mycket', 'köszönöm szépen'], ['ja', 'igen'], ['nej', 'nem'],
        ['förlåt', 'bocsánat'], ['ursäkta', 'elnézést'], ['Hur mår du?', 'hogy vagy?'], ['bra', 'jól'], ['ett namn', 'név'],
        ['en vän', 'barát'], ['Sverige', 'Svédország'], ['Ungern', 'Magyarország'], ['svenska', 'svéd (nyelv)'], ['välkommen', 'isten hozott']
      ],
      sentences: [
        ['Hej, jag heter Anna.', 'Szia, Annának hívnak.', ['Hej, jag är Anna.'], ['Szia, Anna vagyok.', 'Szia, a nevem Anna.']],
        ['Vad heter du?', 'Hogy hívnak?', [], ['Mi a neved?', 'Téged hogy hívnak?']],
        ['Hur mår du?', 'Hogy vagy?'],
        ['Jag mår bra, tack.', 'Jól vagyok, köszönöm.', [], ['Köszönöm, jól vagyok.', 'Jól, köszönöm.']],
        ['God morgon, Erik!', 'Jó reggelt, Erik!'],
        ['Jag kommer från Ungern.', 'Magyarországról jövök.', [], ['Magyarországról származom.', 'Magyarországról jöttem.']],
        ['Jag bor i Sverige.', 'Svédországban lakom.', [], ['Svédországban élek.']],
        ['Det här är min vän Ella.', 'Ő a barátom, Ella.', [], ['Ez a barátom, Ella.', 'Ő a barátnőm, Ella.']],
        ['Talar du svenska?', 'Beszélsz svédül?', ['Pratar du svenska?'], ['Beszél svédül?']],
        ['Ja, lite.', 'Igen, egy kicsit.', [], ['Igen, kicsit.']],
        ['Tack så mycket!', 'Köszönöm szépen!'],
        ['Hej då, Anna!', 'Viszlát, Anna!']
      ]
    },
    {
      id: 'szamok', title: 'Számok', icon: '🔢',
      tip: '**Számok**\n\n' +
        '- 1–10: **ett, två, tre, fyra, fem, sex, sju, åtta, nio, tio**. (Az **en** is „egy”: ez az en-szavak névelője, pl. en bok.)\n' +
        '- 11–19: **elva, tolv, tretton, fjorton, femton, sexton, sjutton, arton, nitton**.\n' +
        '- Tízesek: **tjugo, trettio, fyrtio, femtio, sextio, sjuttio, åttio, nittio**, aztán **hundra** (100), **tusen** (1000).\n\n' +
        'Jó hír: a svéd sorrend olyan, mint a magyar: **tjugoett** = húsz-egy (21), **trettiofem** = 35 – egybeírva.\n\n' +
        'Kiejtés: a **sju** (7) a jellegzetes sj-hanggal kezdődik, a **tjugo** (20) a lágy tj-hanggal. Élőbeszédben a **nio** és **tio** végén gyakran e hangzik: „níe”, „tíe”.\n\n' +
        'Pénz: Svédországban a **krona** (korona) a fizetőeszköz, többes számban **kronor**.',
      words: [
        ['ett', 'egy'], ['två', 'kettő'], ['tre', 'három'], ['fyra', 'négy'], ['fem', 'öt'], ['sex', 'hat'], ['sju', 'hét'],
        ['åtta', 'nyolc'], ['nio', 'kilenc'], ['tio', 'tíz'], ['elva', 'tizenegy'], ['tolv', 'tizenkettő'], ['tretton', 'tizenhárom'],
        ['tjugo', 'húsz'], ['tjugoett', 'huszonegy'], ['trettio', 'harminc'], ['hundra', 'száz']
      ],
      sentences: [
        ['Jag är tolv år.', 'Tizenkét éves vagyok.', ['Jag är tolv år gammal.']],
        ['Hur gammal är du?', 'Hány éves vagy?'],
        ['Två plus tre är fem.', 'Kettő meg három az öt.', [], ['Kettő plusz három az öt.', 'Kettő meg három öt.']],
        ['Tio minus fyra är sex.', 'Tízből négy az hat.', [], ['Tíz mínusz négy az hat.']],
        ['Det kostar tjugo kronor.', 'Húsz koronába kerül.', [], ['Ez húsz koronába kerül.', 'Húsz korona.']],
        ['Vad kostar det?', 'Mennyibe kerül?', [], ['Ez mennyibe kerül?']],
        ['Jag har fem kronor.', 'Öt koronám van.', [], ['Van öt koronám.']],
        ['Hon är tretton år.', 'Ő tizenhárom éves.', ['Hon är tretton år gammal.'], ['Tizenhárom éves.']],
        ['Tjugo plus ett är tjugoett.', 'Húsz meg egy az huszonegy.', [], ['Húsz plusz egy az huszonegy.']],
        ['Jag räknar till tio.', 'Tízig számolok.', [], ['Elszámolok tízig.']]
      ]
    },
    {
      id: 'csalad', title: 'Család', icon: '👨‍👩‍👧',
      tip: '**En vagy ett? – a svéd két neme**\n\n' +
        'A svédben két nyelvtani nem van:\n\n' +
        '- **en**-szavak (a főnevek kb. háromnegyede): **en pojke**, **en hund**, **en familj**.\n' +
        '- **ett**-szavak: **ett barn**, **ett hus**, **ett namn**.\n\n' +
        'Mindkettő jelentése „egy”, de hogy melyik illik egy szóhoz, azt nem lehet kitalálni – **mindig névelővel tanuld a főnevet!**\n\n' +
        'A melléknév és a birtokos szó is igazodik: **en stor hund**, de **ett stort hus**; **min bror**, de **mitt barn**; többes számban **mina föräldrar**.\n\n' +
        'Érdekesség: a svéd nagyszülők nevéből kiderül, melyik ágról valók! **mor** = anya, **far** = apa:\n\n' +
        '- **mormor** = anya anyja, **morfar** = anya apja\n' +
        '- **farmor** = apa anyja, **farfar** = apa apja',
      words: [
        ['en mamma', 'anya'], ['en pappa', 'apa'], ['föräldrar', 'szülők'], ['en bror', 'fiútestvér'], ['en syster', 'lánytestvér'],
        ['ett barn', 'gyerek'], ['en mormor', 'anyai nagymama'], ['en farmor', 'apai nagymama'], ['en morfar', 'anyai nagypapa'],
        ['en farfar', 'apai nagypapa'], ['en familj', 'család'], ['en pojke', 'fiú'], ['en flicka', 'lány'], ['en hund', 'kutya'],
        ['en katt', 'macska'], ['stor', 'nagy'], ['liten', 'kicsi'], ['snäll', 'kedves']
      ],
      sentences: [
        ['Det här är min mamma.', 'Ő az anyukám.', [], ['Ez az anyukám.', 'Ő az anyám.']],
        ['Min bror heter Oskar.', 'A bátyámat Oskarnak hívják.', [], ['Az öcsémet Oskarnak hívják.', 'A fiútestvéremet Oskarnak hívják.']],
        ['Jag har en syster.', 'Van egy lánytestvérem.', [], ['Van egy nővérem.', 'Van egy húgom.', 'Egy lánytestvérem van.']],
        ['Vi har en hund.', 'Van egy kutyánk.', [], ['Egy kutyánk van.']],
        ['Vår katt är liten.', 'A macskánk kicsi.'],
        ['Min farmor är snäll.', 'Az apai nagymamám kedves.', [], ['A nagymamám kedves.']],
        ['Mina föräldrar bor i Stockholm.', 'A szüleim Stockholmban laknak.', [], ['A szüleim Stockholmban élnek.']],
        ['Hon har ett barn.', 'Egy gyereke van.', [], ['Van egy gyereke.', 'Neki egy gyereke van.']],
        ['Har du syskon?', 'Vannak testvéreid?', [], ['Van testvéred?']],
        ['Vi är en stor familj.', 'Nagy család vagyunk.'],
        ['Vad heter din pappa?', 'Hogy hívják az apukádat?', [], ['Mi az apukád neve?', 'Hogy hívják az apádat?']]
      ]
    },
    {
      id: 'iskola', title: 'Iskola és tárgyak', icon: '🎒',
      tip: '**A határozott névelő a szó végén van!**\n\n' +
        'Magyarul azt mondjuk: **a** könyv. Svédül a névelő a szó **végére** ragad:\n\n' +
        '- en-szavak: **-en**: en bok → **boken** (a könyv), en stol → **stolen** (a szék)\n' +
        '- ett-szavak: **-et**: ett bord → **bordet** (az asztal)\n' +
        '- magánhangzóra végződő szavak csak **-n**-t vagy **-t**-t kapnak: en skola → **skolan**, ett häfte → **häftet**\n' +
        '- néhány -r végű szó is csak -n-t kap: en dator → **datorn**\n\n' +
        'Többes számban a végződés **-na** vagy **-en**: elever → **eleverna** (a diákok), barn → **barnen** (a gyerekek).\n\n' +
        'Ha melléknév is áll előtte, a svéd „duplán” jelöl: **den stora boken** (a nagy könyv), **det stora bordet** (a nagy asztal).',
      words: [
        ['en skola', 'iskola'], ['en klass', 'osztály'], ['en lärare', 'tanár'], ['en elev', 'diák'], ['en bok', 'könyv'],
        ['en penna', 'toll'], ['en blyertspenna', 'ceruza'], ['ett suddgummi', 'radír'], ['ett häfte', 'füzet'], ['en väska', 'táska'],
        ['ett bord', 'asztal'], ['en stol', 'szék'], ['en dator', 'számítógép'], ['en lektion', 'tanóra'], ['en läxa', 'házi feladat'],
        ['ett klassrum', 'tanterem'], ['läsa', 'olvasni'], ['skriva', 'írni'], ['plugga', 'tanulni']
      ],
      sentences: [
        ['Boken är på bordet.', 'A könyv az asztalon van.'],
        ['Läraren heter Karin.', 'A tanárt Karinnak hívják.', [], ['A tanár neve Karin.', 'A tanárnőt Karinnak hívják.']],
        ['Var är min penna?', 'Hol van a tollam?'],
        ['Väskan är stor.', 'A táska nagy.'],
        ['Eleverna läser en bok.', 'A diákok egy könyvet olvasnak.', [], ['A diákok könyvet olvasnak.']],
        ['Jag skriver i häftet.', 'A füzetbe írok.', [], ['Írok a füzetbe.']],
        ['Vi har många läxor.', 'Sok házi feladatunk van.', ['Vi har mycket läxor.'], ['Sok a házi feladatunk.', 'Sok leckénk van.']],
        ['Klassrummet är litet.', 'A tanterem kicsi.'],
        ['Jag pluggar svenska.', 'Svédül tanulok.', ['Jag lär mig svenska.'], ['Svédet tanulok.', 'Svéd nyelvet tanulok.']],
        ['Datorn är ny.', 'A számítógép új.'],
        ['Lektionen börjar klockan nio.', 'Az óra kilenckor kezdődik.', [], ['Az óra kilenc órakor kezdődik.', 'A tanóra kilenckor kezdődik.']],
        ['Jag har två böcker.', 'Két könyvem van.', [], ['Van két könyvem.']]
      ]
    },
    {
      id: 'etel', title: 'Étel és ital – fika!', icon: '☕',
      tip: '**Igeragozás? Szinte nincs!**\n\n' +
        'A svéd ige **nem változik a személy szerint** – minden személyben ugyanaz:\n\n' +
        '- **jag** äter, **du** äter, **han/hon** äter\n' +
        '- **vi** äter, **ni** äter, **de** äter\n\n' +
        'A magyarban hat alakot kell megtanulni (eszem, eszel, eszik…), a svédben egyet! A jelen idő legtöbbször **-r**-re végződik: dricka → **dricker**, tala → **talar**. A „lenni” minden személyben **är**. A **de** (ők) szót „dom”-nak ejtik.\n\n' +
        'Az anyagneveket (mjölk, vatten, kaffe) általában névelő nélkül használjuk.\n\n' +
        '**Fika** – a svéd élet egyik kulcsszava: kávé (vagy tea) egy kis sütivel, barátokkal vagy munkatársakkal. Főnév és ige is: **Ska vi fika?** A klasszikus fikasüti a **kanelbulle** (fahéjas csiga), amelynek saját napja is van: október 4.\n\n' +
        'Étkezés előtt: **Smaklig måltid!** – Jó étvágyat!',
      words: [
        ['ett bröd', 'kenyér'], ['en smörgås', 'szendvics'], ['ost', 'sajt'], ['mjölk', 'tej'], ['vatten', 'víz'], ['kaffe', 'kávé'],
        ['te', 'tea'], ['ett ägg', 'tojás'], ['ett äpple', 'alma'], ['en banan', 'banán'], ['soppa', 'leves'], ['en kanelbulle', 'fahéjas csiga'],
        ['smör', 'vaj'], ['socker', 'cukor'], ['frukost', 'reggeli'], ['äta', 'enni'], ['dricka', 'inni'], ['god', 'finom'],
        ['fika', 'kávézás sütivel']
      ],
      sentences: [
        ['Jag äter en smörgås.', 'Egy szendvicset eszem.', [], ['Szendvicset eszem.']],
        ['Vill du ha kaffe?', 'Kérsz kávét?', [], ['Kér kávét?', 'Kérsz egy kávét?']],
        ['Vi dricker mjölk.', 'Tejet iszunk.', [], ['Mi tejet iszunk.']],
        ['Soppan är god.', 'A leves finom.'],
        ['Jag är hungrig.', 'Éhes vagyok.'],
        ['Han äter ett äpple.', 'Egy almát eszik.', [], ['Ő egy almát eszik.', 'Almát eszik.']],
        ['Ett glas vatten, tack.', 'Egy pohár vizet kérek.', [], ['Egy pohár vizet, köszönöm.', 'Egy pohár vizet kérek szépen.']],
        ['Ska vi fika?', 'Kávézzunk egyet?', [], ['Fikázzunk?', 'Tartsunk egy kávészünetet?']],
        ['Kaffe med mjölk och socker.', 'Kávé tejjel és cukorral.'],
        ['Frukosten är klockan sju.', 'A reggeli hétkor van.', [], ['A reggeli hét órakor van.', 'Hétkor van reggeli.']],
        ['De äter bröd med smör.', 'Vajas kenyeret esznek.', [], ['Kenyeret esznek vajjal.']]
      ]
    },
    {
      id: 'szinek', title: 'Színek és ruhák', icon: '👕',
      tip: '**Többes szám – öt csoport**\n\n' +
        'A magyarban szinte mindig -k a többes jel, a svédnek öt fő mintája van:\n\n' +
        '- **-or**: a legtöbb -a végű en-szó: en tröja → **tröjor**, en flicka → **flickor**\n' +
        '- **-ar**: sok en-szó: en pojke → **pojkar**, en hund → **hundar**\n' +
        '- **-er** (vagy csak -r): en färg → **färger**, en sko → **skor**\n' +
        '- **-n**: magánhangzóra végződő ett-szavak: ett äpple → **äpplen**\n' +
        '- **nincs végződés**: mássalhangzóra végződő ett-szavak: ett barn → **barn**, ett hus → **hus**\n\n' +
        'Rendhagyók is vannak: en bok → **böcker**, en man → **män**.\n\n' +
        'A melléknév többes számban **-a**-t kap: **röda skor**, **gula tröjor**. A **rosa** és az **orange** nem változik.\n\n' +
        'Figyelj: a **byxor** (nadrág) a svédben többes számú – akárcsak az angol trousers.',
      words: [
        ['röd', 'piros'], ['blå', 'kék'], ['gul', 'sárga'], ['grön', 'zöld'], ['svart', 'fekete'], ['vit', 'fehér'], ['grå', 'szürke'],
        ['brun', 'barna'], ['orange', 'narancssárga'], ['rosa', 'rózsaszín'], ['en färg', 'szín'], ['en tröja', 'pulóver'], ['en jacka', 'kabát'],
        ['byxor', 'nadrág'], ['en klänning', 'ruha (női)'], ['en sko', 'cipő'], ['en kjol', 'szoknya'], ['en mössa', 'sapka'], ['en t-shirt', 'póló']
      ],
      sentences: [
        ['Jag har en blå tröja.', 'Van egy kék pulóverem.', [], ['Kék pulóverem van.']],
        ['Hon har en röd klänning på sig.', 'Piros ruha van rajta.', [], ['Piros ruhát visel.', 'Ő piros ruhát visel.']],
        ['Min jacka är svart.', 'A kabátom fekete.'],
        ['Vilken är din favoritfärg?', 'Mi a kedvenc színed?', ['Vad är din favoritfärg?']],
        ['Min favoritfärg är grön.', 'A kedvenc színem a zöld.', [], ['A kedvenc színem zöld.']],
        ['Skorna är bruna.', 'A cipők barnák.'],
        ['Han har en grå mössa.', 'Szürke sapkája van.', [], ['Neki szürke sapkája van.']],
        ['Byxorna är vita.', 'A nadrág fehér.'],
        ['Kjolen är rosa.', 'A szoknya rózsaszín.'],
        ['Jag gillar gula skor.', 'Szeretem a sárga cipőket.', [], ['Tetszenek a sárga cipők.']],
        ['Tröjorna är orange.', 'A pulóverek narancssárgák.']
      ]
    },
    {
      id: 'ido', title: 'Idő, napok, évszakok', icon: '📅',
      tip: '**Szórend: az ige mindig a második**\n\n' +
        'A magyarban elég szabad a szórend, a svédben nem! Kijelentő mondatban a ragozott ige **mindig a második helyen** áll (V2-szabály):\n\n' +
        '- **Jag går** till skolan i morgon.\n' +
        '- **I morgon går jag** till skolan. – ha az időhatározó kerül előre, az alany az ige mögé csúszik!\n' +
        '- **På lördag spelar jag** fotboll.\n\n' +
        'A „második hely” nem a második szót jelenti, hanem a második mondatrészt: az **I morgon** egy egység.\n\n' +
        'Eldöntendő kérdésben az ige áll elöl: **Går du** till skolan?\n\n' +
        'A napok és hónapok nevét kisbetűvel írjuk: **måndag**, **maj**. Az **i dag**, **i morgon**, **i går** egybe is írható: idag, imorgon, igår.\n\n' +
        'Óra: **Vad är klockan?** – Hány óra van? **Klockan är tre.** A **halv fyra** pedig fél négy (3:30) – pont, mint magyarul!',
      words: [
        ['måndag', 'hétfő'], ['tisdag', 'kedd'], ['onsdag', 'szerda'], ['torsdag', 'csütörtök'], ['fredag', 'péntek'], ['lördag', 'szombat'],
        ['söndag', 'vasárnap'], ['i dag', 'ma'], ['i morgon', 'holnap'], ['i går', 'tegnap'], ['en vecka', 'hét (7 nap)'], ['en dag', 'nap'],
        ['en månad', 'hónap'], ['ett år', 'év'], ['en helg', 'hétvége'], ['sommar', 'nyár'], ['vinter', 'tél'], ['en timme', 'óra (60 perc)']
      ],
      sentences: [
        ['I dag är det måndag.', 'Ma hétfő van.', ['Idag är det måndag.', 'Det är måndag i dag.']],
        ['I morgon går jag till skolan.', 'Holnap iskolába megyek.', ['Jag går till skolan i morgon.', 'Imorgon går jag till skolan.'], ['Holnap megyek iskolába.']],
        ['På lördag spelar jag fotboll.', 'Szombaton focizom.', ['Jag spelar fotboll på lördag.'], ['Szombaton futballozom.']],
        ['På sommaren är det varmt.', 'Nyáron meleg van.', ['Det är varmt på sommaren.']],
        ['På vintern är det kallt.', 'Télen hideg van.', ['Det är kallt på vintern.']],
        ['En vecka har sju dagar.', 'Egy héten hét nap van.', [], ['Egy hét hét napból áll.', 'A hét hét napból áll.']],
        ['Vad är klockan?', 'Hány óra van?', ['Hur mycket är klockan?'], ['Mennyi az idő?']],
        ['Klockan är tre.', 'Három óra van.'],
        ['I går var det söndag.', 'Tegnap vasárnap volt.', ['Igår var det söndag.']],
        ['Min födelsedag är i maj.', 'A születésnapom májusban van.'],
        ['På onsdag är jag ledig.', 'Szerdán szabad vagyok.', ['Jag är ledig på onsdag.'], ['Szerdán szabadnapos vagyok.']],
        ['Helgen börjar på fredag.', 'A hétvége pénteken kezdődik.']
      ]
    },
    {
      id: 'otthon', title: 'Otthon', icon: '🏠',
      tip: '**Tagadás: inte**\n\n' +
        'A svéd „nem” = **inte**. A magyarban az ige elé tesszük, a svéd főmondatban viszont az **ige után** jön:\n\n' +
        '- Jag bor **inte** i Stockholm. – Nem Stockholmban lakom.\n' +
        '- Huset är **inte** stort. – A ház nem nagy.\n' +
        '- Kérdésben is: Bor du **inte** här? – Nem itt laksz?\n' +
        '- Fordított szórendben (V2!) az alany mögé kerül: I dag äter jag **inte** frukost.\n\n' +
        'Mellékmondatban viszont az ige elé: …att jag **inte** bor här (…hogy nem itt lakom).\n\n' +
        '„Nincs / egy sem” = **ingen** (en-szavak), **inget** (ett-szavak), **inga** (többes szám): Jag har **ingen** trädgård. Det finns **inget** kök.\n\n' +
        '**Det finns** = van, létezik (valahol): Det finns en lampa i badrummet.',
      words: [
        ['ett hus', 'ház'], ['en lägenhet', 'lakás'], ['ett rum', 'szoba'], ['ett sovrum', 'hálószoba'], ['ett kök', 'konyha'],
        ['ett badrum', 'fürdőszoba'], ['ett vardagsrum', 'nappali'], ['en trädgård', 'kert'], ['en dörr', 'ajtó'], ['ett fönster', 'ablak'],
        ['en säng', 'ágy'], ['en soffa', 'kanapé'], ['en garderob', 'ruhásszekrény'], ['en lampa', 'lámpa'], ['en trappa', 'lépcső'],
        ['fin', 'szép'], ['gammal', 'régi'], ['ny', 'új'], ['bo', 'lakni']
      ],
      sentences: [
        ['Vi bor i ett litet hus.', 'Egy kis házban lakunk.', [], ['Kis házban lakunk.']],
        ['Jag har ingen trädgård.', 'Nincs kertem.'],
        ['Huset är inte stort.', 'A ház nem nagy.'],
        ['Mitt rum är fint.', 'A szobám szép.'],
        ['Köket är inte nytt.', 'A konyha nem új.'],
        ['Det finns ingen lampa i badrummet.', 'A fürdőszobában nincs lámpa.', [], ['Nincs lámpa a fürdőszobában.']],
        ['Katten sover i soffan.', 'A macska a kanapén alszik.', ['Katten sover på soffan.']],
        ['Fönstret är öppet.', 'Az ablak nyitva van.'],
        ['Min säng står i sovrummet.', 'Az ágyam a hálószobában van.', [], ['Az ágyam a hálószobában áll.']],
        ['Vi äter inte i köket.', 'Nem a konyhában eszünk.', [], ['Nem eszünk a konyhában.']],
        ['Jag bor inte i Stockholm.', 'Nem Stockholmban lakom.', [], ['Nem lakom Stockholmban.']],
        ['Dörren är stängd.', 'Az ajtó zárva van.', [], ['Az ajtó csukva van.']]
      ]
    },
    {
      id: 'varos', title: 'Város és közlekedés', icon: '🚌',
      tip: '**A svéd „dallam”: a szótónus**\n\n' +
        'A svéd beszéd szinte énekel. Ennek oka a két **szótónus**:\n\n' +
        '- **1. tónus**: egyetlen, egyszerű dallamcsúcs: **anden** (a kacsa)\n' +
        '- **2. tónus**: két csúcs, „hullámzó” dallam: **anden** (a szellem)\n\n' +
        'Ugyanaz az írásmód, más dallam – más jelentés! A legtöbb kétszótagú szó (pl. **gata**, **flicka**, **pojke**) a 2. tónussal hangzik. Ne ijedj meg: a szövegkörnyezetből mindig kiderül a jelentés, de hallgasd meg a felolvasást, és próbáld utánozni a dallamot!\n\n' +
        '**Tegeződés**: Svédországban szinte mindenkit tegeznek (**du**) – az 1960–70-es évek úgynevezett du-reformja óta a tanárokat és az idegeneket is. A magázó **ni** ma ritka.\n\n' +
        'Útbaigazítás: **till vänster** (balra), **till höger** (jobbra), **rakt fram** (egyenesen).',
      words: [
        ['en stad', 'város'], ['en gata', 'utca'], ['en cykel', 'bicikli'], ['en buss', 'busz'], ['ett tåg', 'vonat'], ['en bil', 'autó'],
        ['en station', 'állomás'], ['en affär', 'bolt'], ['ett torg', 'tér'], ['ett museum', 'múzeum'], ['ett bibliotek', 'könyvtár'],
        ['ett sjukhus', 'kórház'], ['en bro', 'híd'], ['till vänster', 'balra'], ['till höger', 'jobbra'], ['rakt fram', 'egyenesen'],
        ['långt', 'messze'], ['nära', 'közel'], ['en biljett', 'jegy']
      ],
      sentences: [
        ['Var ligger stationen?', 'Hol van az állomás?', ['Var är stationen?'], ['Hol van a pályaudvar?']],
        ['Ursäkta, var är museet?', 'Elnézést, hol van a múzeum?', ['Ursäkta, var ligger museet?'], ['Bocsánat, hol van a múzeum?']],
        ['Gå rakt fram och sedan till vänster.', 'Menj egyenesen, aztán balra.', ['Gå rakt fram och sen till vänster.'], ['Menjen egyenesen, aztán balra.', 'Menj egyenesen, majd balra.']],
        ['Är det långt?', 'Messze van?', [], ['Ez messze van?']],
        ['Nej, det är nära.', 'Nem, közel van.'],
        ['Jag cyklar till skolan.', 'Biciklivel megyek iskolába.', [], ['Biciklivel járok iskolába.']],
        ['Tåget går klockan tio.', 'A vonat tízkor indul.', [], ['A vonat tíz órakor indul.']],
        ['En biljett till Göteborg, tack.', 'Egy jegyet kérek Göteborgba.', [], ['Egy jegyet Göteborgba, legyen szíves.']],
        ['Kan du hjälpa mig?', 'Tudsz segíteni?', [], ['Tudna segíteni?', 'Segítenél?']],
        ['Bussen är sen.', 'Késik a busz.', [], ['A busz késik.']],
        ['Affären är öppen.', 'A bolt nyitva van.'],
        ['Biblioteket ligger nära torget.', 'A könyvtár a tér közelében van.', [], ['A könyvtár közel van a térhez.']]
      ]
    },
    {
      id: 'hobbi', title: 'Hobbi és múlt idő', icon: '⛺',
      tip: '**Múlt idő: egy alak minden személyre**\n\n' +
        'A svéd múlt idő (preteritum) sem változik a személy szerint: jag/du/hon/vi **spelade**.\n\n' +
        '- **-ade**: a legtöbb -a végű ige: spela → **spelade**, dansa → **dansade**, simma → **simmade**, tälta → **tältade**\n' +
        '- **-de / -te**: bo → **bodde**, köpa → **köpte**, åka → **åkte**\n' +
        '- erős (rendhagyó) igék: sjunga → **sjöng**, se → **såg**, äta → **åt**, gå → **gick**, vara → **var**, ha → **hade**\n\n' +
        'Tervek: **ska** + főnévi igenév: I morgon **ska** jag cykla.\n\n' +
        '**Allemansrätten** – „mindenki joga”: Svédországban bárki szabadon járhat a természetben, még magánterületen is, szedhet áfonyát és gombát, és egy-két éjszakára sátrat verhet – ha nem zavar senkit, és nem tesz kárt semmiben. A jelmondata: **inte störa, inte förstöra** (ne zavarj, ne rongálj).',
      words: [
        ['spela fotboll', 'focizni'], ['simma', 'úszni'], ['cykla', 'biciklizni'], ['rita', 'rajzolni'], ['dansa', 'táncolni'],
        ['sjunga', 'énekelni'], ['spela', 'játszani'], ['musik', 'zene'], ['en film', 'film'], ['ett sommarlov', 'nyári szünet'],
        ['en strand', 'strand'], ['ett hav', 'tenger'], ['en skog', 'erdő'], ['en sjö', 'tó'], ['tälta', 'sátrazni'], ['kul', 'klassz'],
        ['förra veckan', 'múlt héten'], ['en hobby', 'hobbi']
      ],
      sentences: [
        ['Jag spelade fotboll i går.', 'Tegnap fociztam.', ['I går spelade jag fotboll.'], ['Tegnap futballoztam.']],
        ['Vi simmade i sjön.', 'A tóban úsztunk.', [], ['Úsztunk a tóban.']],
        ['Hon såg en film.', 'Látott egy filmet.', [], ['Megnézett egy filmet.', 'Ő látott egy filmet.']],
        ['Jag gillar att dansa.', 'Szeretek táncolni.'],
        ['Min hobby är att rita.', 'A hobbim a rajzolás.', [], ['Rajzolás a hobbim.']],
        ['Gillar du musik?', 'Szereted a zenét?', [], ['Szereti a zenét?']],
        ['Förra veckan åkte vi till stranden.', 'Múlt héten a strandra mentünk.', ['Vi åkte till stranden förra veckan.'], ['Múlt héten elmentünk a strandra.']],
        ['Sommarlovet var kul.', 'A nyári szünet klassz volt.', [], ['Klassz volt a nyári szünet.', 'Jó volt a nyári szünet.']],
        ['Vi sjöng tillsammans.', 'Együtt énekeltünk.'],
        ['Vi tältade i skogen.', 'Az erdőben sátraztunk.', [], ['Sátraztunk az erdőben.']],
        ['I morgon ska jag cykla.', 'Holnap biciklizni fogok.', ['Jag ska cykla i morgon.'], ['Holnap biciklizni megyek.']]
      ]
    }
  ]
});
