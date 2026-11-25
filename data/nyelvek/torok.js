/* Nyelvtanulás – Török (A1–A2) – 10 egység. A török toldalékoló nyelv magánhangzó-illeszkedéssel, ezért sok mindent a magyarhoz hasonlítunk. */
STUDIE.addLangCourse({
  id: 'torok', title: 'Török', flag: '🇹🇷', tts: 'tr-TR', badge: 'A1–A2',
  noSpaces: false, script: false,
  intro: 'A törökkel a magyar régi ismerős: honfoglalás előtti ótörök jövevényszavunk például az alma, a kecske, a bor és a búza (törökül ma is elma és keçi!), a hódoltság korában pedig az oszmán-törökből került hozzánk a papucs, a dívány és a kávé.',
  units: [
    {
      id: 'koszones', title: 'Köszönés és bemutatkozás', icon: '👋',
      tip: '**A török ábécé – sok ismerős hang!**\n\nA török 1928 óta latin betűkkel íródik, és szinte úgy ejtjük, ahogy írjuk – akárcsak a magyart. Sok magyar hang megvan benne, csak más betűvel:\n\n- **ş = s** (`şeker` cukor), a sima **s = sz** (`su` víz)\n- **ç = cs** (`çay` tea), a **c = dzs** (`cami` dzsámi)\n- **ö, ü** ugyanaz, mint nálunk: `gün` nap, `göz` szem\n- **ı** (pont nélküli i): hátul ejtett hang, mintha u-t mondanál, de széthúzott szájjal: `hayır` nem. A pontos **i** rendes i: `iki` kettő. Nagybetűvel is külön betűk: **I – ı** és **İ – i**!\n- **ğ** (lágy g): nem ejtjük ki, csak megnyújtja az előtte álló magánhangzót: `dağ` (hegy) kb. „dá”\n- **y = j**: `iyi` jó\n\nA `hoşça kal` (maradj jól) azt mondja, aki elmegy, a `güle güle` (mosolyogva) pedig az, aki marad.',
      words: [['merhaba', 'szia'], ['günaydın', 'jó reggelt'], ['iyi günler', 'jó napot'], ['iyi akşamlar', 'jó estét'], ['iyi geceler', 'jó éjszakát'],
        ['hoşça kal', 'viszlát (aki elmegy, mondja)'], ['güle güle', 'viszlát (aki marad, mondja)'], ['teşekkür ederim', 'köszönöm'], ['lütfen', 'kérem'], ['evet', 'igen'], ['hayır', 'nem'],
        ['nasılsın', 'hogy vagy'], ['iyiyim', 'jól vagyok'], ['adın ne', 'mi a neved'], ['adım', 'a nevem'], ['ben', 'én'], ['sen', 'te'], ['memnun oldum', 'örvendek'], ['arkadaş', 'barát'], ['özür dilerim', 'bocsánat']],
      sentences: [
        ['Merhaba, ben Ayşe.', 'Szia, Ayşe vagyok.', ['Merhaba, adım Ayşe.'], ['Szia, Ayşének hívnak.', 'Szia, a nevem Ayşe.']],
        ['Adın ne?', 'Mi a neved?', ['Senin adın ne?'], ['Hogy hívnak?']],
        ['Adım Mehmet.', 'A nevem Mehmet.', ['Benim adım Mehmet.'], ['Mehmetnek hívnak.', 'Az én nevem Mehmet.']],
        ['Nasılsın, Ali?', 'Hogy vagy, Ali?'],
        ['İyiyim, teşekkür ederim.', 'Jól vagyok, köszönöm.', ['Teşekkür ederim, iyiyim.'], ['Köszönöm, jól vagyok.']],
        ['Günaydın, Ali!', 'Jó reggelt, Ali!'],
        ['Memnun oldum.', 'Örvendek.', [], ['Örülök, hogy megismertelek.', 'Örülök, hogy megismerhettem.']],
        ['Evet, lütfen.', 'Igen, kérem.', [], ['Igen, kérek.', 'Igen, kérlek.']],
        ['Hayır, teşekkür ederim.', 'Nem, köszönöm.'],
        ['Sen benim arkadaşımsın.', 'Te a barátom vagy.', [], ['Te vagy a barátom.']],
        ['İyi geceler, arkadaşım!', 'Jó éjszakát, barátom!'],
        ['Özür dilerim, adın ne?', 'Bocsánat, mi a neved?', [], ['Elnézést, mi a neved?', 'Bocsánat, hogy hívnak?']]
      ]
    },
    {
      id: 'szamok', title: 'Számok', icon: '🔢',
      tip: '**Számok – pont, mint a magyarban**\n\nA török számok ugyanúgy épülnek fel, mint a magyarok: előbb a nagyobb, utána a kisebb rész.\n\n- `on` (10) + `bir` (1) = `on bir` – tizenegy\n- `yirmi beş` – huszonöt\n- `yüz kırk iki` – száznegyvenkettő\n- `bin dokuz yüz` – ezerkilencszáz\n\n**Szám után egyes szám!** Ahogy mi is azt mondjuk, hogy „két macska” (és nem „két macskák”), a török is: `iki kedi`, nem „iki kediler”. A számnév után sosem kell többes jel.\n\nÉletkor: `Kaç yaşındasın?` – Hány éves vagy? Válasz: `On iki yaşındayım.` – Tizenkét éves vagyok. A `yaş` (életkor) szóra sorban jönnek a toldalékok: `yaş-ın-da-yım`, szó szerint kb. „korom-ban vagyok”.\n\nA `kaç` (hány) mindig a főnév előtt áll: `Kaç elma?` – Hány alma?',
      words: [['sıfır', 'nulla'], ['bir', 'egy'], ['iki', 'kettő'], ['üç', 'három'], ['dört', 'négy'], ['beş', 'öt'], ['altı', 'hat'], ['yedi', 'hét'], ['sekiz', 'nyolc'], ['dokuz', 'kilenc'],
        ['on', 'tíz'], ['yirmi', 'húsz'], ['otuz', 'harminc'], ['kırk', 'negyven'], ['elli', 'ötven'], ['yüz', 'száz'], ['bin', 'ezer'], ['kaç', 'hány']],
      sentences: [
        ['Bir, iki, üç.', 'Egy, kettő, három.', [], ['Egy, két, három.']],
        ['Kaç yaşındasın?', 'Hány éves vagy?'],
        ['On iki yaşındayım.', 'Tizenkét éves vagyok.', ['Ben on iki yaşındayım.'], ['Én tizenkét éves vagyok.']],
        ['İki elma, lütfen.', 'Két almát kérek.', [], ['Két almát, kérem.', 'Két almát kérek szépen.']],
        ['Beş artı beş on eder.', 'Öt meg öt az tíz.', [], ['Öt plusz öt az tíz.', 'Öt meg öt tíz.']],
        ['Sekiz artı iki on eder.', 'Nyolc meg kettő az tíz.', [], ['Nyolc plusz kettő az tíz.', 'Nyolc meg kettő tíz.']],
        ['Kaç elma var?', 'Hány alma van?'],
        ['Otuz iki öğrenci var.', 'Harminckét diák van.'],
        ['Annem kırk yaşında.', 'Anyám negyven éves.', [], ['Az anyám negyven éves.', 'Anyukám negyven éves.']],
        ['Dokuz kedi var.', 'Kilenc macska van.'],
        ['Bir hafta yedi gündür.', 'Egy hét hét napból áll.', [], ['Egy hét hét nap.']]
      ]
    },
    {
      id: 'csalad', title: 'Család', icon: '👨‍👩‍👧',
      tip: '**Magánhangzó-illeszkedés – ezt már tudod!**\n\nA magyarban is mondjuk: ház-**ban**, de kert-**ben**. A török ugyanígy működik, csak még következetesebben. A többes szám jele:\n\n- mély magánhangzó (**a, ı, o, u**) után **-lar**: `baba` → `babalar`, `çocuk` → `çocuklar`\n- magas magánhangzó (**e, i, ö, ü**) után **-ler**: `anne` → `anneler`, `kedi` → `kediler`\n\nEz a **kétalakú** illeszkedés (-lar/-ler, -da/-de). Később jön a **négyalakú** is (-ı/-i/-u/-ü).\n\nTovábbi jó hírek:\n\n- **Nincs nyelvtani nem**: `o` = ő (fiú és lány is), mint a magyarban!\n- **Nincs határozott névelő**: `kedi` = macska vagy a macska. A `bir` (egy) határozatlan névelőként is működik: `bir kedi` – egy macska.\n- Birtokos személyjel, mint nálunk: `annem` – anyám, `kardeşim` – testvérem, `ailemiz` – családunk.',
      words: [['anne', 'anya'], ['baba', 'apa'], ['kardeş', 'testvér'], ['abla', 'nővér'], ['ağabey', 'báty'], ['kız kardeş', 'lánytestvér'], ['erkek kardeş', 'fiútestvér'],
        ['büyükanne', 'nagymama'], ['büyükbaba', 'nagypapa'], ['aile', 'család'], ['çocuk', 'gyerek'], ['kız', 'lány'], ['o', 'ő'], ['köpek', 'kutya'], ['kedi', 'macska'], ['büyük', 'nagy'], ['küçük', 'kicsi']],
      sentences: [
        ['Bu benim ailem.', 'Ez az én családom.', ['Bu ailem.'], ['Ez a családom.']],
        ['O benim annem.', 'Ő az anyám.', ['O annem.'], ['Ő az én anyám.', 'Ő az anyukám.']],
        ['Babamın adı Ahmet.', 'Apám neve Ahmet.', [], ['Az apám neve Ahmet.', 'Az apukámat Ahmetnek hívják.', 'Apámat Ahmetnek hívják.']],
        ['Bir ablam var.', 'Van egy nővérem.', [], ['Egy nővérem van.']],
        ['Kardeşin var mı?', 'Van testvéred?'],
        ['Evet, iki kardeşim var.', 'Igen, két testvérem van.'],
        ['Kedimiz küçük.', 'A macskánk kicsi.', [], ['Kicsi a macskánk.']],
        ['Köpekler büyük.', 'A kutyák nagyok.', [], ['Nagyok a kutyák.']],
        ['Ağabeyim on sekiz yaşında.', 'A bátyám tizennyolc éves.', [], ['Bátyám tizennyolc éves.']],
        ['O bir kız.', 'Ő egy lány.', [], ['Ő lány.']],
        ['Biz büyük bir aileyiz.', 'Mi nagy család vagyunk.', ['Büyük bir aileyiz.'], ['Nagy család vagyunk.']],
        ['Büyükbabamın bir köpeği var.', 'A nagypapámnak van egy kutyája.', [], ['Nagypapámnak van egy kutyája.']]
      ]
    },
    {
      id: 'iskola', title: 'Iskola és tárgyak', icon: '🎒',
      tip: '**Van – nincs: var és yok**\n\nA török két külön szót használ arra, hogy valami van vagy nincs:\n\n- `Kalem var.` – Van toll.\n- `Silgi yok.` – Nincs radír.\n- Birtoklás: `Kalemim var.` – Van tollam (szó szerint: tollam van). `Silgim yok.` – Nincs radírom. Pont mint a magyar „van tollam”!\n\n**Kérdés: mı / mi / mu / mü** – ez olyan, mint a magyar **-e** („Van-e tollad?”). Külön szóként írjuk, de illeszkedik az előtte álló szóhoz. Ez a **négyalakú** illeszkedés:\n\n- a, ı után **mı**: `var mı?`\n- e, i után **mi**: `defter mi?`\n- o, u után **mu**: `yok mu?`\n- ö, ü után **mü**: `büyük mü?`\n\nA „vagyok” is toldalék: `öğrenci` + `-yim` = `öğrenciyim` (diák vagyok). Ilyenkor a `ben` (én) elhagyható, mint a magyarban.',
      words: [['okul', 'iskola'], ['sınıf', 'osztály'], ['öğretmen', 'tanár'], ['öğrenci', 'diák'], ['kitap', 'könyv'], ['defter', 'füzet'], ['kalem', 'toll'], ['kurşun kalem', 'ceruza'],
        ['silgi', 'radír'], ['çanta', 'táska'], ['masa', 'asztal'], ['sandalye', 'szék'], ['tahta', 'tábla'], ['ders', 'tanóra'], ['ödev', 'házi feladat'], ['var', 'van (létezik)'], ['yok', 'nincs'], ['bu', 'ez']],
      sentences: [
        ['Bu bir kitap.', 'Ez egy könyv.', [], ['Ez könyv.']],
        ['Bu ne?', 'Ez mi?', [], ['Mi ez?']],
        ['Kalemin var mı?', 'Van tollad?', [], ['Van egy tollad?']],
        ['Evet, kalemim var.', 'Igen, van tollam.'],
        ['Hayır, silgim yok.', 'Nem, nincs radírom.'],
        ['Sınıfta yirmi öğrenci var.', 'Az osztályban húsz diák van.', [], ['Húsz diák van az osztályban.']],
        ['Öğretmen çok iyi.', 'A tanár nagyon jó.', [], ['A tanárnő nagyon jó.']],
        ['Bugün ödev yok.', 'Ma nincs házi feladat.', [], ['Ma nincs házi.']],
        ['Bu defter mi?', 'Ez füzet?', [], ['Ez egy füzet?']],
        ['Ben öğrenciyim.', 'Én diák vagyok.', ['Öğrenciyim.'], ['Diák vagyok.']],
        ['Masada bir kitap var.', 'Az asztalon van egy könyv.', [], ['Van egy könyv az asztalon.', 'Egy könyv van az asztalon.']],
        ['Okul büyük mü?', 'Nagy az iskola?', [], ['Az iskola nagy?']]
      ]
    },
    {
      id: 'etel', title: 'Étel és ital', icon: '🍎',
      tip: '**A tárgy: -ı / -i / -u / -ü**\n\nA magyar tárgyrag a **-t** (almát, kenyeret). A törökben a tárgyrag csak akkor kell, ha **határozott** dologról van szó – ez kicsit olyan, mint a magyar határozott ragozás:\n\n- `Ekmek yiyorum.` – Kenyeret eszem. (valamilyen kenyeret, rag nélkül)\n- `Ekmeği yiyorum.` – Eszem a kenyeret. (azt a bizonyosat → **-i**)\n\nA rag négyalakú: `peynir` → `peyniri`, `ekmek` → `ekmeği` (a k-ból ğ lesz!), `süt` → `sütü`, `pilav` → `pilavı`. Magánhangzó után **y** kerül közé: `elma` → `elmayı`, `su` → `suyu`.\n\nFigyeld a szavakat: `elma` = alma, `kahve` = kávé, `şeker` = cukor. A magyar **alma** ótörök jövevényszó, a **kávé** pedig az oszmán `kahve` szóból jött a hódoltság idején.\n\nAz `istiyorum` = kérek, szeretnék; az `istemiyorum` = nem kérek.',
      words: [['ekmek', 'kenyér'], ['su', 'víz'], ['süt', 'tej'], ['çay', 'tea'], ['kahve', 'kávé'], ['elma', 'alma'], ['peynir', 'sajt'], ['yumurta', 'tojás'], ['et', 'hús'], ['tavuk', 'csirke'],
        ['pilav', 'piláf'], ['çorba', 'leves'], ['şeker', 'cukor'], ['meyve', 'gyümölcs'], ['kahvaltı', 'reggeli'], ['istiyorum', 'kérek, szeretnék'], ['seviyorum', 'szeretem'], ['yemek', 'enni'], ['içmek', 'inni']],
      sentences: [
        ['Su istiyorum.', 'Vizet kérek.', [], ['Vizet szeretnék.']],
        ['Bir çay, lütfen.', 'Egy teát kérek.', [], ['Egy teát, kérem.', 'Egy teát kérek szépen.']],
        ['Peyniri çok seviyorum.', 'Nagyon szeretem a sajtot.', [], ['A sajtot nagyon szeretem.']],
        ['Ekmek yiyorum.', 'Kenyeret eszem.'],
        ['Ekmeği yiyorum.', 'Eszem a kenyeret.', [], ['A kenyeret eszem.']],
        ['Kahve ister misin?', 'Kérsz kávét?', [], ['Szeretnél kávét?', 'Kérsz egy kávét?']],
        ['Hayır, çay istiyorum.', 'Nem, teát kérek.', [], ['Nem, teát szeretnék.']],
        ['Kahvaltıda yumurta yiyorum.', 'Reggelire tojást eszem.'],
        ['Süt içiyorum.', 'Tejet iszom.'],
        ['Tavuk ve pilav istiyorum.', 'Csirkét és piláfot kérek.', [], ['Csirkét és piláfot szeretnék.']],
        ['Şeker istemiyorum.', 'Nem kérek cukrot.', [], ['Cukrot nem kérek.']]
      ]
    },
    {
      id: 'szinek', title: 'Színek és ruhák', icon: '🎨',
      tip: '**Toldalékolás – mint a magyarban**\n\nA török, akárcsak a magyar, **toldalékoló** nyelv: a szó végére sorban egymás után ragasztjuk a toldalékokat, és mindegyiknek egy feladata van.\n\n- `ayakkabı` – cipő\n- `ayakkabı-lar` – cipők\n- `ayakkabı-lar-ım` – cipőim\n- `ayakkabı-lar-ım-da` – cipőimben\n\nVesd össze: `ev-ler-imiz-de` = ház-a-ink-ban. A sorrend is hasonló: többes jel, birtokos jel, rag.\n\n**A melléknév a főnév előtt áll és nem változik**, mint nálunk: `kırmızı elma` – piros alma, `kırmızı elmalar` – piros almák.\n\nA határozatlan `bir` a melléknév **után** jön: `siyah bir ceket` – egy fekete dzseki.\n\nKérdés: `Ne renk?` – Milyen színű? A `çok` jelentése: nagyon, sok.',
      words: [['renk', 'szín'], ['kırmızı', 'piros'], ['mavi', 'kék'], ['yeşil', 'zöld'], ['sarı', 'sárga'], ['siyah', 'fekete'], ['beyaz', 'fehér'], ['turuncu', 'narancssárga'], ['mor', 'lila'],
        ['pembe', 'rózsaszín'], ['gri', 'szürke'], ['kahverengi', 'barna'], ['elbise', 'ruha (női)'], ['gömlek', 'ing'], ['pantolon', 'nadrág'], ['etek', 'szoknya'], ['ayakkabı', 'cipő'], ['şapka', 'sapka'], ['ceket', 'dzseki']],
      sentences: [
        ['Elma kırmızı.', 'Az alma piros.'],
        ['Gökyüzü mavi.', 'Az ég kék.'],
        ['En sevdiğim renk mavi.', 'A kedvenc színem a kék.', [], ['Kedvenc színem a kék.']],
        ['Siyah bir ceketim var.', 'Van egy fekete dzsekim.', [], ['Egy fekete dzsekim van.']],
        ['Bu gömlek beyaz.', 'Ez az ing fehér.'],
        ['Kırmızı elbise çok güzel.', 'A piros ruha nagyon szép.'],
        ['Ayakkabılarım yeşil.', 'A cipőim zöldek.', [], ['A cipőm zöld.']],
        ['Sarı şapkayı istiyorum.', 'A sárga sapkát kérem.', [], ['A sárga sapkát szeretném.']],
        ['Pantolonun ne renk?', 'Milyen színű a nadrágod?'],
        ['Ablamın eteği pembe.', 'A nővérem szoknyája rózsaszín.'],
        ['Kedi gri.', 'A macska szürke.']
      ]
    },
    {
      id: 'ido', title: 'Idő és napok', icon: '📅',
      tip: '**Szórend: az ige a végére!**\n\nA török alapszórend: **alany – tárgy/határozó – ige** (SOV). Az ige szinte mindig a mondat végére kerül:\n\n- `Ben sabah okula gidiyorum.` – szó szerint: Én reggel iskolába megyek.\n- `Akşam kitap okuyorum.` – Este könyvet olvasok.\n\nA magyar szórend szabadabb, de az „Én reggel iskolába megyek” nálunk is teljesen helyes!\n\n**Folyamatos jelen: -iyor**\n\nAz igető + **-iyor** (illeszkedik: -ıyor, -iyor, -uyor, -üyor) + személyrag:\n\n- `gel-iyor-um` – jövök\n- `gel-iyor-sun` – jössz\n- `gel-iyor` – jön\n- `gel-iyor-uz` – jövünk\n- `gel-iyor-sunuz` – jöttök\n- `gel-iyor-lar` – jönnek\n\nA `gitmek` (menni) töve `git-`, de magánhangzó előtt `gid-` lesz: `gidiyorum` – megyek.',
      words: [['gün', 'nap'], ['hafta', 'hét (naptári)'], ['pazartesi', 'hétfő'], ['salı', 'kedd'], ['çarşamba', 'szerda'], ['perşembe', 'csütörtök'], ['cuma', 'péntek'], ['cumartesi', 'szombat'], ['pazar', 'vasárnap'],
        ['bugün', 'ma'], ['yarın', 'holnap'], ['dün', 'tegnap'], ['sabah', 'reggel'], ['akşam', 'este'], ['saat', 'óra'], ['ay', 'hónap'], ['yıl', 'év'], ['şimdi', 'most']],
      sentences: [
        ['Bugün pazartesi.', 'Ma hétfő van.', [], ['Ma hétfő.']],
        ['Yarın salı.', 'Holnap kedd lesz.', [], ['Holnap kedd.', 'Holnap kedd van.']],
        ['Dün pazardı.', 'Tegnap vasárnap volt.'],
        ['Saat kaç?', 'Hány óra van?', [], ['Mennyi az idő?', 'Hány óra?']],
        ['Saat üç.', 'Három óra van.', [], ['Három óra.']],
        ['Sabah okula gidiyorum.', 'Reggel iskolába megyek.', ['Ben sabah okula gidiyorum.'], ['Reggel megyek iskolába.', 'Én reggel iskolába megyek.']],
        ['Cuma günü sinemaya gidiyoruz.', 'Pénteken moziba megyünk.'],
        ['Şimdi ne yapıyorsun?', 'Mit csinálsz most?', [], ['Most mit csinálsz?']],
        ['Akşam kitap okuyorum.', 'Este könyvet olvasok.'],
        ['Bir yılda on iki ay var.', 'Egy évben tizenkét hónap van.', [], ['Egy év tizenkét hónapból áll.']],
        ['Cumartesi ve pazar okul yok.', 'Szombaton és vasárnap nincs iskola.']
      ]
    },
    {
      id: 'otthon', title: 'Otthon', icon: '🏠',
      tip: '**Hol? – a -de / -da rag**\n\nA magyarban sok helyhatározó rag van: -ban/-ben, -on/-en/-ön, -nál/-nél. A török ezeket egyetlen raggal oldja meg: **-de / -da**.\n\n- `ev` → `evde` – a házban, otthon\n- `masa` → `masada` – az asztalon\n- `bahçe` → `bahçede` – a kertben\n\nZöngétlen mássalhangzó (p, ç, t, k, f, h, s, ş) után **-te / -ta**: `mutfak` → `mutfakta` (a konyhában), `dolap` → `dolapta` (a szekrényben). Ez olyan, mint amikor nálunk a hangok egymáshoz igazodnak.\n\nA „vagyok” itt is toldalék: `evdeyim` – otthon vagyok, `okuldayım` – az iskolában vagyok.\n\nKérdés: `Nerede?` – Hol? `Kedi nerede?` – Hol van a macska?\n\nÉrdekesség: a török `kapı` (ajtó) és a magyar **kapu** rokon szavak – a kapu is ótörök jövevényszó.',
      words: [['ev', 'ház'], ['oda', 'szoba'], ['mutfak', 'konyha'], ['banyo', 'fürdőszoba'], ['yatak odası', 'hálószoba'], ['salon', 'nappali'], ['kapı', 'ajtó'], ['pencere', 'ablak'], ['yatak', 'ágy'],
        ['dolap', 'szekrény'], ['koltuk', 'fotel'], ['bahçe', 'kert'], ['lamba', 'lámpa'], ['televizyon', 'televízió'], ['buzdolabı', 'hűtőszekrény'], ['burada', 'itt'], ['orada', 'ott'], ['nerede', 'hol']],
      sentences: [
        ['Annem mutfakta.', 'Anyám a konyhában van.', [], ['Az anyukám a konyhában van.', 'Anyukám a konyhában van.']],
        ['Kedi nerede?', 'Hol van a macska?', [], ['Hol a macska?']],
        ['Kedi yatakta.', 'A macska az ágyon van.', [], ['A macska az ágyban van.']],
        ['Ben evdeyim.', 'Otthon vagyok.', ['Evdeyim.'], ['Én otthon vagyok.']],
        ['Evimizde dört oda var.', 'A házunkban négy szoba van.', [], ['Négy szoba van a házunkban.']],
        ['Bahçede bir köpek var.', 'A kertben van egy kutya.', [], ['Van egy kutya a kertben.', 'Egy kutya van a kertben.']],
        ['Buzdolabında süt var mı?', 'Van tej a hűtőben?', [], ['Van tej a hűtőszekrényben?']],
        ['Televizyon salonda.', 'A tévé a nappaliban van.', [], ['A televízió a nappaliban van.']],
        ['Kitaplarım dolapta.', 'A könyveim a szekrényben vannak.'],
        ['Pencere büyük.', 'Az ablak nagy.'],
        ['Babam banyoda.', 'Apám a fürdőszobában van.', [], ['Az apukám a fürdőszobában van.', 'Apukám a fürdőszobában van.']]
      ]
    },
    {
      id: 'varos', title: 'Város és közlekedés', icon: '🚌',
      tip: '**Hová? és mivel?**\n\n**Irány: -e / -a** – ez felel a magyar -ba/-be, -ra/-re, -hoz/-hez ragoknak:\n\n- `okul` → `okula` – iskolába\n- `ev` → `eve` – haza\n- magánhangzó után **y** jön közé: `müze` → `müzeye` (múzeumba), `araba` → `arabaya`\n- tulajdonnév után aposztróf: `İstanbul\'a` – Isztambulba, `Ankara\'ya` – Ankarába\n\n**Eszköz: -le / -la** (= ile, „-val/-vel”): `otobüsle` – busszal, `trenle` – vonattal, `arabayla` – autóval. Pont, mint a magyar -val/-vel, ez is illeszkedik!\n\n**Honnan? -den / -dan**: `okuldan` – az iskolából, `evden` – otthonról.\n\nÚtbaigazítás:\n\n- `Sağa dön.` – Fordulj jobbra.\n- `Sola dön.` – Fordulj balra.\n- `Düz git.` – Menj egyenesen.\n\nA `cami` (dzsámi, mecset) szóban a c betű **dzs**!',
      words: [['şehir', 'város'], ['sokak', 'utca'], ['otobüs', 'busz'], ['araba', 'autó'], ['tren', 'vonat'], ['uçak', 'repülőgép'], ['bisiklet', 'bicikli'], ['istasyon', 'állomás'], ['havaalanı', 'repülőtér'],
        ['market', 'bolt'], ['hastane', 'kórház'], ['park', 'park'], ['cami', 'mecset'], ['müze', 'múzeum'], ['sağ', 'jobb (oldal)'], ['sol', 'bal (oldal)'], ['düz', 'egyenesen'], ['uzak', 'messze'], ['yakın', 'közel']],
      sentences: [
        ['Okula otobüsle gidiyorum.', 'Busszal megyek iskolába.', [], ['Iskolába busszal megyek.']],
        ['Müze nerede?', 'Hol van a múzeum?', [], ['Hol a múzeum?']],
        ['Müze çok yakın.', 'A múzeum nagyon közel van.', [], ['Nagyon közel van a múzeum.']],
        ['Sağa dön.', 'Fordulj jobbra.', [], ['Jobbra fordulj.']],
        ['Düz git.', 'Menj egyenesen.', [], ['Egyenesen menj.']],
        ['Havaalanı uzak mı?', 'Messze van a repülőtér?', [], ['A repülőtér messze van?']],
        ['Babam arabayla işe gidiyor.', 'Apám autóval megy dolgozni.', [], ['Apám autóval megy munkába.', 'Az apukám autóval megy dolgozni.']],
        ['Trenle İstanbul\'a gidiyoruz.', 'Vonattal megyünk Isztambulba.', [], ['Isztambulba vonattal megyünk.']],
        ['Markete gidiyorum.', 'A boltba megyek.', [], ['Boltba megyek.']],
        ['Parkta bisiklete biniyorum.', 'A parkban biciklizek.', [], ['Biciklizek a parkban.']],
        ['İstasyon solda.', 'Az állomás balra van.', [], ['Az állomás bal oldalon van.', 'Az állomás a bal oldalon van.']],
        ['Bu şehir çok güzel.', 'Ez a város nagyon szép.']
      ]
    },
    {
      id: 'mult', title: 'Hobbi és múlt idő', icon: '📸',
      tip: '**Múlt idő: -di**\n\nA magyar múlt idő jele a **-t / -tt** (jött, ment). A törökben a **-di** – és persze illeszkedik (négyalakú): **-dı, -di, -du, -dü**. Zöngétlen mássalhangzó után **-tı, -ti, -tu, -tü**.\n\nUtána jön a személyrag:\n\n- `gel-di-m` – jöttem\n- `gel-di-n` – jöttél\n- `gel-di` – jött\n- `gel-di-k` – jöttünk\n- `gel-di-niz` – jöttetek\n- `gel-di-ler` – jöttek\n\nTovábbi példák: `oynadım` (játszottam), `izledik` (néztük), `gittim` (mentem – a t után -ti!), `yüzdük` (úsztunk).\n\n**Tagadás: -me / -ma** közvetlenül a tő után: `git-me-di-m` – nem mentem, `gör-me-di-m` – nem láttam.\n\nA szótári alak (főnévi igenév) végződése **-mek / -mak**: `yüzmek` – úszni, `okumak` – olvasni. Ez is illeszkedik, mint a magyar -ni… csak nálunk az nem változik!',
      words: [['futbol', 'foci'], ['müzik', 'zene'], ['film', 'film'], ['oyun', 'játék'], ['yüzmek', 'úszni'], ['okumak', 'olvasni'], ['oynamak', 'játszani'], ['gitmek', 'menni'], ['gelmek', 'jönni'],
        ['yapmak', 'csinálni'], ['görmek', 'látni'], ['izlemek', 'nézni'], ['dinlemek', 'hallgatni'], ['geçen hafta', 'múlt héten'], ['tatil', 'nyaralás'], ['deniz', 'tenger'], ['güzel', 'szép'], ['sevmek', 'szeretni']],
      sentences: [
        ['Dün futbol oynadım.', 'Tegnap fociztam.', [], ['Tegnap futballoztam.']],
        ['Dün akşam film izledik.', 'Tegnap este filmet néztünk.'],
        ['Geçen hafta denize gittim.', 'Múlt héten a tengerhez mentem.', [], ['A múlt héten a tengerhez mentem.']],
        ['Tatil çok güzeldi.', 'A nyaralás nagyon szép volt.', [], ['Nagyon szép volt a nyaralás.']],
        ['Ne yaptın?', 'Mit csináltál?'],
        ['Kitap okudum ve müzik dinledim.', 'Könyvet olvastam és zenét hallgattam.'],
        ['Arkadaşım bize geldi.', 'A barátom eljött hozzánk.', [], ['A barátom átjött hozzánk.', 'A barátom hozzánk jött.']],
        ['Denizde yüzdük.', 'Úsztunk a tengerben.', [], ['A tengerben úsztunk.']],
        ['Filmi gördün mü?', 'Láttad a filmet?'],
        ['Hayır, görmedim.', 'Nem, nem láttam.'],
        ['Müzik dinlemeyi seviyorum.', 'Szeretek zenét hallgatni.'],
        ['Okula gitmedim.', 'Nem mentem iskolába.', [], ['Nem mentem el az iskolába.']]
      ]
    }
  ]
});
