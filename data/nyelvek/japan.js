/* Japán nyelvtanfolyam (A1) – 10 egység. A szavak kanával (hiraganával/katakanával), a 3. elem a Hepburn-féle rómadzsi átírás.
 * A mondatok szavai (és a szócskák) szóközzel elválasztva szerepelnek, hogy a szócsempés feladat működjön. */
STUDIE.addLangCourse({
  id: 'japan', title: 'Japán', flag: '🇯🇵', tts: 'ja-JP', badge: 'A1',
  noSpaces: true, script: true,
  intro: 'A japán egyszerre három írást használ, mégis sok mindenben ismerős lesz: a szócskák a szó után állnak, mint a magyar ragok, az ige pedig a mondat végére kerül.',
  units: [
    {
      id: 'aisatsu', title: 'Köszönés', icon: '👋',
      tip: 'A japán **három írást** használ egyszerre:\n\n' +
        '- **hiragana** (ひらがな): 46 alapjel, mindegyik egy szótag (pl. か = ka). Ezzel írják a japán szavakat és a nyelvtani szócskákat.\n' +
        '- **katakana** (カタカナ): ugyanazok a hangok szögletesebb jelekkel, főleg idegen szavakhoz: `コーヒー` (kōhī = kávé).\n' +
        '- **kandzsi** (漢字): kínai eredetű jelek, mindegyik egy jelentést hordoz: `日本` = にほん = Japán.\n\n' +
        'Minden szó mellett ott a **rómadzsi**, a latin betűs (Hepburn-féle) átírás – válaszként be is írhatod. Olvasd magyarosan, de: **sh** = s, **ch** = cs, **j** = dzs, **y** = j, **s** = sz, **ts** = c, **w** = mint az angol w. A vonás (ō, ū) **hosszú** magánhangzót jelöl.\n\n' +
        'A japán írás **nem tesz szóközt** a szavak közé – a feladatokban a szócsempék segítenek.\n\n' +
        '**Udvariasság:** `ありがとう` (köszi) barátnak, `ありがとう ございます` tanárnak, idegennek. Figyelj: a `こんにちは` és a `こんばんは` végén a は-t **wa**-nak ejtjük!',
      words: [
        ['こんにちは', 'jó napot', 'konnichiwa'], ['おはようございます', 'jó reggelt', 'ohayō gozaimasu'], ['こんばんは', 'jó estét', 'konbanwa'],
        ['さようなら', 'viszontlátásra', 'sayōnara'], ['おやすみなさい', 'jó éjszakát', 'oyasuminasai'], ['ありがとう', 'köszi', 'arigatō'],
        ['ありがとうございます', 'köszönöm', 'arigatō gozaimasu'], ['すみません', 'elnézést', 'sumimasen'], ['ごめんなさい', 'bocsánat', 'gomen nasai'],
        ['はい', 'igen', 'hai'], ['いいえ', 'nem', 'iie'], ['おねがいします', 'kérem szépen', 'onegaishimasu'], ['どうぞ', 'tessék', 'dōzo'],
        ['じゃあね', 'szia (búcsúzáskor)', 'jā ne'], ['げんき', 'egészséges, jól van', 'genki'], ['だいじょうぶ', 'rendben, semmi baj', 'daijōbu'],
        ['せんせい', 'tanár', 'sensei'], ['さん', 'úr, asszony (név után)', 'san']
      ],
      sentences: [
        ['せんせい おはよう ございます。', 'Jó reggelt, tanár úr!', [], ['Jó reggelt, tanárnő!', 'Jó reggelt kívánok, tanár úr!']],
        ['たなか さん こんにちは。', 'Jó napot, Tanaka úr!', [], ['Jó napot, Tanaka asszony!']],
        ['おげんき です か。', 'Hogy van?', [], ['Hogy vagy?', 'Jól van?', 'Jól vagy?']],
        ['はい げんき です。', 'Igen, jól vagyok.', [], ['Jól vagyok.']],
        ['ありがとう ございます。', 'Köszönöm.', [], ['Köszönöm szépen.']],
        ['いいえ だいじょうぶ です。', 'Nem, semmi baj.', [], ['Semmi baj.', 'Nem, minden rendben.']],
        ['はい どうぞ。', 'Igen, tessék.', [], ['Tessék.']],
        ['せんせい さようなら。', 'Viszontlátásra, tanár úr!', [], ['Viszontlátásra, tanárnő!']],
        ['じゃあ また あした。', 'Akkor holnap találkozunk.', [], ['Viszlát holnap!', 'Holnap találkozunk.']],
        ['すみません せんせい。', 'Elnézést, tanár úr!', [], ['Elnézést, tanárnő!']],
        ['たなか さん おやすみなさい。', 'Jó éjszakát, Tanaka úr!', [], ['Jó éjszakát, Tanaka asszony!']]
      ]
    },
    {
      id: 'jikoshokai', title: 'Bemutatkozás', icon: '🙋',
      tip: 'A japán mondat váza: **téma は … です**. A `は` szócska jelöli, miről szól a mondat, és ilyenkor **wa**-nak ejtjük:\n\n' +
        '- `わたし は がくせい です。` = Diák vagyok. (szó szerint: én – ami engem illet – diák vagyok)\n\n' +
        'A `です` az udvarias „van”, és **nem változik** személy szerint: vagyok, vagy, van – mind `です`. A mondat végére tett `か` kérdéssé alakítja a mondatot, a szórend nem változik: `がくせい です か。` = Diák vagy?\n\n' +
        'Az alanyt gyakran **elhagyják**, ha egyértelmű – mint a magyarban („Diák vagyok”).\n\n' +
        'A `の` a birtokos szerkezet szócskája, mint a magyar **-é** / **-nak a**: `わたし の なまえ` = az én nevem, `えいご の せんせい` = az angol tanára, vagyis angoltanár.\n\n' +
        'A japán szócskák a szó **után** állnak, akárcsak a magyar ragok, az ige pedig a **mondat végére** kerül: alany – tárgy – ige.\n\n' +
        'Bemutatkozáskor: `はじめまして`, a végén pedig `よろしく おねがいします` (kb. „örülök, és remélem, jóban leszünk”).',
      words: [
        ['わたし', 'én', 'watashi'], ['あなた', 'te, ön', 'anata'], ['なまえ', 'név', 'namae'], ['がくせい', 'diák', 'gakusei'],
        ['にほん', 'Japán', 'Nihon'], ['にほんじん', 'japán (ember)', 'nihonjin'], ['ハンガリー', 'Magyarország', 'Hangarī'],
        ['ハンガリーじん', 'magyar (ember)', 'Hangarījin'], ['はじめまして', 'örvendek (első találkozáskor)', 'hajimemashite'],
        ['です', 'van, vagyok (udvarias létige)', 'desu'], ['なに', 'mi?', 'nani'], ['だれ', 'ki?', 'dare'], ['ともだち', 'barát', 'tomodachi'],
        ['にほんご', 'japán nyelv', 'nihongo'], ['えいご', 'angol nyelv', 'eigo'], ['ハンガリーご', 'magyar nyelv', 'Hangarīgo']
      ],
      sentences: [
        ['わたし は がくせい です。', 'Diák vagyok.', ['がくせい です。'], ['Én diák vagyok.']],
        ['わたし は ハンガリーじん です。', 'Magyar vagyok.', ['ハンガリーじん です。'], ['Én magyar vagyok.']],
        ['わたし の なまえ は アンナ です。', 'A nevem Anna.', ['わたし は アンナ です。'], ['Az én nevem Anna.', 'Anna vagyok.', 'Annának hívnak.']],
        ['おなまえ は なん です か。', 'Mi a neve?', [], ['Mi a neved?', 'Hogy hívnak?', 'Hogy hívják?']],
        ['はじめまして ケン です。', 'Örvendek, Ken vagyok.', [], ['Örvendek, Ken vagyok!']],
        ['たなか さん は にほんじん です。', 'Tanaka úr japán.', [], ['Tanaka asszony japán.']],
        ['あなた は がくせい です か。', 'Diák vagy?', ['がくせい です か。'], ['Te diák vagy?', 'Ön diák?']],
        ['はい がくせい です。', 'Igen, diák vagyok.', [], ['Igen, én diák vagyok.']],
        ['いいえ せんせい です。', 'Nem, tanár vagyok.', [], ['Nem, én tanár vagyok.']],
        ['ケン は わたし の ともだち です。', 'Ken a barátom.', [], ['Ken az én barátom.']],
        ['せんせい は だれ です か。', 'Ki a tanár?', [], []],
        ['わたし は えいご の せんせい です。', 'Angoltanár vagyok.', ['えいご の せんせい です。'], ['Én angoltanár vagyok.']]
      ]
    },
    {
      id: 'kazu', title: 'Számok', icon: '🔢',
      tip: 'Számok 1–10: いち, に, さん, よん, ご, ろく, なな, はち, きゅう, じゅう.\n\n' +
        'Innen a számok úgy épülnek, mint a kocka:\n\n' +
        '- 11 = じゅういち (10 + 1), 14 = じゅうよん\n' +
        '- 20 = にじゅう (2 × 10), 35 = さんじゅうご\n' +
        '- 100 = ひゃく, 500 = ごひゃく, 1000 = せん\n\n' +
        'A 4-nek és a 7-nek két alakja van: し / よん és しち / なな. A **し** ugyanúgy hangzik, mint a „halál” szó, ezért sokszor a よん alakot használják.\n\n' +
        '**Darabszámlálás:** tárgyakhoz külön számszavak vannak: ひとつ, ふたつ, みっつ (1, 2, 3 darab). Az életkor: szám + `さい` (`じゅうよん さい` = 14 éves).\n\n' +
        '`これ` = ez. `ください` = kérek, adjon: `これ を ひとつ ください。` = Ebből kérek egyet. Az `を` szócska a **tárgyat** jelöli (ejtsd: o) – mint a magyar **-t** rag!\n\n' +
        'Az ár kérdezése: `これ は いくら です か。` = Mennyibe kerül ez?',
      words: [
        ['いち', 'egy', 'ichi'], ['に', 'kettő', 'ni'], ['さん', 'három', 'san'], ['よん', 'négy', 'yon'], ['ご', 'öt', 'go'],
        ['ろく', 'hat', 'roku'], ['なな', 'hét', 'nana'], ['はち', 'nyolc', 'hachi'], ['きゅう', 'kilenc', 'kyū'], ['じゅう', 'tíz', 'jū'],
        ['ひゃく', 'száz', 'hyaku'], ['せん', 'ezer', 'sen'], ['これ', 'ez', 'kore'], ['いくら', 'mennyi? (ár)', 'ikura'], ['えん', 'jen (pénz)', 'en'],
        ['ひとつ', 'egy darab', 'hitotsu'], ['ふたつ', 'két darab', 'futatsu'], ['みっつ', 'három darab', 'mittsu'], ['ください', 'kérek, adjon', 'kudasai'],
        ['なんさい', 'hány éves?', 'nansai']
      ],
      sentences: [
        ['いち に さん。', 'Egy, kettő, három.', [], ['Egy, két, három.']],
        ['これ は いくら です か。', 'Mennyibe kerül ez?', [], ['Ez mennyibe kerül?', 'Ez mennyi?']],
        ['ひゃく えん です。', 'Száz jen.', [], ['100 jen.', 'Száz jenbe kerül.']],
        ['せん えん です。', 'Ezer jen.', [], ['1000 jen.', 'Ezer jenbe kerül.']],
        ['これ を ひとつ ください。', 'Ebből kérek egyet.', [], ['Ebből egyet kérek.', 'Kérek egyet ebből.']],
        ['これ を みっつ ください。', 'Ebből kérek hármat.', [], ['Ebből hármat kérek.', 'Kérek hármat ebből.']],
        ['なんさい です か。', 'Hány éves vagy?', [], ['Hány éves?', 'Ön hány éves?']],
        ['じゅうよん さい です。', 'Tizennégy éves vagyok.', [], ['14 éves vagyok.']],
        ['ふたつ で ごひゃく えん です。', 'Kettő együtt ötszáz jen.', [], ['Kettő ötszáz jen.', 'Két darab ötszáz jen.']],
        ['はち きゅう じゅう。', 'Nyolc, kilenc, tíz.', [], []]
      ]
    },
    {
      id: 'kazoku', title: 'Család', icon: '👨‍👩‍👧',
      tip: 'A családtagokra **kétféle szó** van: a sajátodra szerényebbet, a másokéra udvariasabbat használsz.\n\n' +
        '- saját: ちち (apám), はは (anyám), あに (bátyám), あね (nővérem)\n' +
        '- másé vagy megszólítás: おとうさん, おかあさん, おにいさん, おねえさん\n\n' +
        'Otthon a gyerek is így szólítja a szüleit: `おかあさん！` (Anya!)\n\n' +
        '**Van / létezik:** élőlényre `います`, élettelen dologra `あります`. Ami van, azt a `が` szócska jelöli: `ねこ が います。` = Van egy macskám. Tagadva: `いません` (nincs).\n\n' +
        'Emberek számlálása: ひとり (1 fő), ふたり (2 fő), utána szabályosan: さんにん, よにん…\n\n' +
        'A japánban **nincs névelő**, és a főneveknek általában **nincs többes száma**: `いぬ` lehet kutya, a kutya vagy kutyák – a szövegkörnyezet dönt.',
      words: [
        ['かぞく', 'család', 'kazoku'], ['ちち', 'apám', 'chichi'], ['はは', 'anyám', 'haha'], ['おとうさん', 'édesapa (udvariasan)', 'otōsan'],
        ['おかあさん', 'édesanya (udvariasan)', 'okāsan'], ['あに', 'bátyám', 'ani'], ['あね', 'nővérem', 'ane'], ['おとうと', 'öcsém', 'otōto'],
        ['いもうと', 'húgom', 'imōto'], ['きょうだい', 'testvérek', 'kyōdai'], ['おじいさん', 'nagyapa', 'ojīsan'], ['おばあさん', 'nagymama', 'obāsan'],
        ['いぬ', 'kutya', 'inu'], ['ねこ', 'macska', 'neko'], ['ひとり', 'egy fő', 'hitori'], ['ふたり', 'két fő', 'futari'], ['よにん', 'négy fő', 'yonin'],
        ['います', 'van (élőlény)', 'imasu']
      ],
      sentences: [
        ['わたし の かぞく は よにん です。', 'A családom négytagú.', [], ['Négyen vagyunk a családban.', 'Az én családom négytagú.']],
        ['あに が ひとり います。', 'Van egy bátyám.', [], ['Egy bátyám van.']],
        ['いもうと が ふたり います。', 'Két húgom van.', [], ['Van két húgom.']],
        ['ねこ が います。', 'Van egy macskám.', [], ['Van macskám.', 'Van egy macska.']],
        ['いぬ は いません。', 'Kutyám nincs.', [], ['Nincs kutyám.', 'Kutyánk nincs.']],
        ['はは は せんせい です。', 'Anyám tanár.', [], ['Az anyám tanár.', 'Édesanyám tanár.']],
        ['ちち は にほんじん です。', 'Apám japán.', [], ['Az apám japán.', 'Édesapám japán.']],
        ['おかあさん は げんき です か。', 'Jól van az édesanyád?', [], ['Édesanyád jól van?', 'Hogy van az édesanyád?', 'Jól van az édesanyja?']],
        ['きょうだい は います か。', 'Van testvéred?', [], ['Vannak testvéreid?', 'Van testvére?']],
        ['おじいさん は はちじゅう さい です。', 'A nagyapa nyolcvanéves.', [], ['A nagyapa 80 éves.', 'Nagyapa nyolcvanéves.', 'A nagypapa nyolcvanéves.']],
        ['これ は わたし の いぬ です。', 'Ez az én kutyám.', [], ['Ez a kutyám.']]
      ]
    },
    {
      id: 'gakko', title: 'Iskola', icon: '🏫',
      tip: '**Ko-so-a-do** – a japán mutató névmások rendszere:\n\n' +
        '- `これ` = ez (közel hozzám)\n' +
        '- `それ` = az (közel hozzád)\n' +
        '- `あれ` = az ott (mindkettőnktől távol)\n' +
        '- `どれ` = melyik?\n\n' +
        '**Igék:** az udvarias jelen idejű ige `～ます`-ra végződik, és **mindig a mondat végén** áll: `ほん を よみます。` = Könyvet olvasok. Tagadva `～ません`: `わかりません` = nem értem. Az ige személy szerint sem változik: olvasok, olvasol, olvas – mind `よみます`.\n\n' +
        'A `を` (ejtsd: o) a tárgy jele, a `に` itt helyet, célt jelöl (-ba, -be): `ノート に かきます` = a füzetbe írok.\n\n' +
        'Sok ige egy főnévből + `します` (csinál) áll: `べんきょう します` = tanul (szó szerint: tanulást csinál). Ugyanígy: `しゅくだい を します` = házit csinál.\n\n' +
        'Az `と` két főnevet köt össze: `つくえ と いす` = pad és szék.',
      words: [
        ['がっこう', 'iskola', 'gakkō'], ['きょうしつ', 'osztályterem', 'kyōshitsu'], ['ほん', 'könyv', 'hon'], ['ノート', 'füzet', 'nōto'],
        ['えんぴつ', 'ceruza', 'enpitsu'], ['ペン', 'toll', 'pen'], ['けしゴム', 'radír', 'keshigomu'], ['かばん', 'táska', 'kaban'],
        ['つくえ', 'pad, íróasztal', 'tsukue'], ['いす', 'szék', 'isu'], ['それ', 'az (nálad lévő)', 'sore'], ['あれ', 'az (ott, távol)', 'are'],
        ['しゅくだい', 'házi feladat', 'shukudai'], ['べんきょう', 'tanulás', 'benkyō'], ['します', 'csinál', 'shimasu'], ['よみます', 'olvas', 'yomimasu'],
        ['かきます', 'ír', 'kakimasu'], ['わかります', 'ért', 'wakarimasu'], ['と', 'és (főnevek között)', 'to']
      ],
      sentences: [
        ['これ は ほん です。', 'Ez egy könyv.', [], ['Ez könyv.']],
        ['それ は わたし の ペン です。', 'Az az én tollam.', [], ['Az a tollam.']],
        ['あれ は がっこう です。', 'Az ott az iskola.', [], ['Az ott egy iskola.', 'Az az iskola.']],
        ['ほん を よみます。', 'Könyvet olvasok.', [], ['Olvasok egy könyvet.']],
        ['にほんご を べんきょう します。', 'Japánul tanulok.', [], ['Japánt tanulok.', 'Japán nyelvet tanulok.']],
        ['しゅくだい を します。', 'Házi feladatot csinálok.', [], ['Megcsinálom a házi feladatot.', 'Megírom a házi feladatot.']],
        ['ノート に かきます。', 'A füzetbe írok.', [], ['Füzetbe írok.']],
        ['えいご が わかります。', 'Értek angolul.', [], ['Tudok angolul.']],
        ['すみません わかりません。', 'Elnézést, nem értem.', [], ['Bocsánat, nem értem.']],
        ['きょうしつ に つくえ と いす が あります。', 'Az osztályteremben padok és székek vannak.', [], ['Az osztályteremben van pad és szék.', 'A teremben padok és székek vannak.']],
        ['かばん に ノート と えんぴつ が あります。', 'A táskában füzet és ceruza van.', [], ['A táskámban füzet és ceruza van.']]
      ]
    },
    {
      id: 'tabemono', title: 'Étel és ital', icon: '🍣',
      tip: 'Evés előtt a japánok összeteszik a kezüket, és azt mondják: `いただきます` (kb. „hálásan elfogadom”). Utána: `ごちそうさまでした` (köszönöm az ételt). Ezek minden étkezéshez hozzátartoznak!\n\n' +
        '**Tárgy és ige:** `すし を たべます` = szusit eszem. Kérdés: `コーヒー を のみます か。` Tagadás: `のみません`.\n\n' +
        '**Szeretni:** a `すき` (kedvelt) nem ige, hanem melléknévszerű szó, ezért a szeretett dolgot `が` jelöli: `さかな が すき です` = szeretem a halat (szó szerint: a hal kedvelt). Tagadva: `すき では ありません`.\n\n' +
        '**これ vagy この?** A `これ` önállóan áll (ez), a `この` csak főnév előtt (ez a…): `この りんご は おいしい です` = ez az alma finom.\n\n' +
        'A `ごはん` főtt rizst jelent, de általában „ételt, étkezést” is: `あさごはん` = reggeli (szó szerint: reggeli rizs).',
      words: [
        ['たべます', 'eszik', 'tabemasu'], ['のみます', 'iszik', 'nomimasu'], ['みず', 'víz', 'mizu'], ['おちゃ', 'tea', 'ocha'],
        ['ごはん', 'főtt rizs, étel', 'gohan'], ['パン', 'kenyér', 'pan'], ['さかな', 'hal', 'sakana'], ['にく', 'hús', 'niku'],
        ['たまご', 'tojás', 'tamago'], ['りんご', 'alma', 'ringo'], ['すし', 'szusi', 'sushi'], ['ぎゅうにゅう', 'tej', 'gyūnyū'],
        ['コーヒー', 'kávé', 'kōhī'], ['おいしい', 'finom', 'oishii'], ['すき', 'kedvelt (szeret)', 'suki'], ['この', 'ez a … (főnév előtt)', 'kono'],
        ['あさごはん', 'reggeli', 'asagohan'], ['いただきます', 'jó étvágyat (evés előtt)', 'itadakimasu'], ['ごちそうさまでした', 'köszönöm az ételt (evés után)', 'gochisōsama deshita']
      ],
      sentences: [
        ['みず を のみます。', 'Vizet iszom.', [], ['Vizet iszok.']],
        ['すし を たべます。', 'Szusit eszem.', [], ['Szusit eszek.']],
        ['おちゃ を ください。', 'Teát kérek.', [], ['Kérek egy teát.', 'Egy teát kérek.']],
        ['この りんご は おいしい です。', 'Ez az alma finom.', [], []],
        ['わたし は さかな が すき です。', 'Szeretem a halat.', ['さかな が すき です。'], ['Én szeretem a halat.']],
        ['にく は すき では ありません。', 'A húst nem szeretem.', [], ['Nem szeretem a húst.']],
        ['あさごはん に パン を たべます。', 'Reggelire kenyeret eszem.', [], ['Reggelire kenyeret eszek.']],
        ['コーヒー を のみます か。', 'Iszol kávét?', [], ['Kávét iszol?', 'Iszik kávét?']],
        ['ぎゅうにゅう を のみません。', 'Nem iszom tejet.', [], ['Tejet nem iszom.', 'Nem iszok tejet.']],
        ['たまご と ごはん を たべます。', 'Tojást és rizst eszem.', [], ['Tojást és rizst eszek.']],
        ['ごちそうさま でした。', 'Köszönöm az ételt.', [], ['Köszönöm, finom volt.']]
      ]
    },
    {
      id: 'iro', title: 'Színek és ruhák', icon: '👕',
      tip: 'A japán melléknevek nagy része **-i**-re végződik: あかい (piros), おおきい (nagy), あたらしい (új). Ezek az **i-melléknevek**.\n\n' +
        'Ugyanott állnak, mint a magyarban:\n\n' +
        '- jelzőként a főnév **előtt**: `あかい くつ` = piros cipő\n' +
        '- állítmányként `です` előtt: `くつ は あかい です` = a cipő piros\n\n' +
        'Nem kell egyeztetni semmivel – nincs nem, nincs többes szám!\n\n' +
        'Néhány szín főnév, például a `みどり` (zöld): jelzőként `の` kell utána: `みどり の シャツ` (zöld ing).\n\n' +
        'Múlt idő: az -i helyére **-katta** kerül: `たのしい` → `たのしかった です` (szórakoztató volt).\n\n' +
        'A `とても` (nagyon) a melléknév elé kerül: `とても かわいい` = nagyon aranyos. A `かわいい` (aranyos, cuki) a japán popkultúra egyik legismertebb szava!\n\n' +
        'Figyelj: a `たかい` jelentése drága, de magas is lehet.',
      words: [
        ['あかい', 'piros', 'akai'], ['あおい', 'kék', 'aoi'], ['しろい', 'fehér', 'shiroi'], ['くろい', 'fekete', 'kuroi'], ['きいろい', 'sárga', 'kiiroi'],
        ['みどり', 'zöld', 'midori'], ['おおきい', 'nagy', 'ōkii'], ['ちいさい', 'kicsi', 'chiisai'], ['あたらしい', 'új', 'atarashii'], ['ふるい', 'régi', 'furui'],
        ['たかい', 'drága; magas', 'takai'], ['やすい', 'olcsó', 'yasui'], ['ふく', 'ruha', 'fuku'], ['くつ', 'cipő', 'kutsu'], ['ぼうし', 'sapka, kalap', 'bōshi'],
        ['シャツ', 'ing', 'shatsu'], ['かわいい', 'aranyos', 'kawaii'], ['かいます', 'vesz (vásárol)', 'kaimasu'], ['とても', 'nagyon', 'totemo'],
        ['なにいろ', 'milyen színű?', 'naniiro']
      ],
      sentences: [
        ['わたし の かばん は あかい です。', 'A táskám piros.', [], ['Az én táskám piros.']],
        ['あおい シャツ を かいます。', 'Veszek egy kék inget.', [], ['Kék inget veszek.']],
        ['この くつ は たかい です。', 'Ez a cipő drága.', [], []],
        ['この ぼうし は とても かわいい です。', 'Ez a sapka nagyon aranyos.', [], ['Ez a kalap nagyon aranyos.']],
        ['くろい ねこ が います。', 'Van egy fekete macska.', [], ['Ott van egy fekete macska.']],
        ['しろい いぬ は おおきい です。', 'A fehér kutya nagy.', [], []],
        ['わたし の ふく は あたらしい です。', 'A ruhám új.', [], ['Az én ruhám új.']],
        ['なにいろ が すき です か。', 'Milyen színt szeretsz?', [], ['Melyik színt szereted?', 'Mi a kedvenc színed?', 'Milyen színt szeret?']],
        ['みどり が すき です。', 'A zöldet szeretem.', [], ['Szeretem a zöldet.', 'A zöld színt szeretem.']],
        ['この シャツ は やすい です。', 'Ez az ing olcsó.', [], []],
        ['きいろい ぼうし は ふるい です。', 'A sárga sapka régi.', [], ['A sárga kalap régi.']],
        ['ちいさい いぬ が すき です。', 'Szeretem a kis kutyákat.', [], ['A kis kutyákat szeretem.']]
      ]
    },
    {
      id: 'jikan', title: 'Idő és napok', icon: '📅',
      tip: '**Időpont:** szám + `じ` (óra): いちじ (1 óra), にじ (2 óra)… Kivételek: よじ (4 óra), しちじ (7 óra), くじ (9 óra). A fél: `はん` – de vigyázz: a japán `じゅうじ はん` (szó szerint: tíz óra és fél) **10:30**, vagyis magyarul **fél tizenegy**!\n\n' +
        'Az időpont után `に` áll (-kor): `しちじ に おきます` = hétkor kelek. A `きょう`, `あした`, `まいにち` után nem kell `に`.\n\n' +
        '**A hét napjai** a természet elemeiről kapták a nevüket: hold (げつ), tűz (か), víz (すい), fa (もく), fém, arany (きん), föld (ど), nap (にち) + `ようび` (a hét napja).\n\n' +
        '**Múlt idő:** `です` → `でした`: `きのう は にちようび でした` = tegnap vasárnap volt. Az igéknél `～ます` → `～ました`.\n\n' +
        'Külön jövő idő nincs: a `～ます` alak jövőt is jelent (`あした いきます` = holnap megyek). Eseményekre: `テスト が あります` = dolgozat lesz.',
      words: [
        ['いま', 'most', 'ima'], ['なんじ', 'hány óra?', 'nanji'], ['じ', 'óra (időpont)', 'ji'], ['はん', 'fél (óra)', 'han'], ['あさ', 'reggel', 'asa'],
        ['よる', 'este, éjjel', 'yoru'], ['きょう', 'ma', 'kyō'], ['あした', 'holnap', 'ashita'], ['きのう', 'tegnap', 'kinō'], ['まいにち', 'minden nap', 'mainichi'],
        ['げつようび', 'hétfő', 'getsuyōbi'], ['かようび', 'kedd', 'kayōbi'], ['すいようび', 'szerda', 'suiyōbi'], ['もくようび', 'csütörtök', 'mokuyōbi'],
        ['きんようび', 'péntek', 'kinyōbi'], ['どようび', 'szombat', 'doyōbi'], ['にちようび', 'vasárnap', 'nichiyōbi'], ['おきます', 'felkel', 'okimasu'],
        ['ねます', 'lefekszik, alszik', 'nemasu']
      ],
      sentences: [
        ['いま なんじ です か。', 'Hány óra van most?', [], ['Most hány óra van?', 'Hány óra van?']],
        ['いま さんじ です。', 'Most három óra van.', [], ['Három óra van.']],
        ['しちじ に おきます。', 'Hétkor kelek.', [], ['Hétkor kelek fel.', 'Hét órakor kelek fel.', 'Hét órakor kelek.']],
        ['じゅうじ はん に ねます。', 'Fél tizenegykor fekszem le.', [], ['Fél tizenegykor lefekszem.', 'Tíz harminckor fekszem le.']],
        ['きょう は げつようび です。', 'Ma hétfő van.', [], ['Ma hétfő.']],
        ['あした は どようび です。', 'Holnap szombat lesz.', [], ['Holnap szombat van.', 'Holnap szombat.']],
        ['きのう は にちようび でした。', 'Tegnap vasárnap volt.', [], []],
        ['まいにち にほんご を べんきょう します。', 'Minden nap japánul tanulok.', [], ['Mindennap japánul tanulok.', 'Minden nap japánt tanulok.']],
        ['きんようび に テスト が あります。', 'Pénteken dolgozat lesz.', [], ['Pénteken dolgozatot írunk.', 'Pénteken van dolgozat.']],
        ['よる じゅういちじ に ねます。', 'Este tizenegykor fekszem le.', [], ['Este tizenegykor lefekszem.', 'Este 11-kor fekszem le.']],
        ['あさ ろくじ に おきます。', 'Reggel hatkor kelek.', [], ['Reggel hatkor kelek fel.', 'Reggel 6-kor kelek.']]
      ]
    },
    {
      id: 'machi', title: 'Város és közlekedés', icon: '🚃',
      tip: 'A japán szócskák úgy működnek, mint a magyar **ragok** – csak külön írjuk őket a szó után:\n\n' +
        '- `に` vagy `へ` = **-ba, -be, -ra** (irány): `がっこう に いきます` = iskolába megyek. (A `へ` szócskát **e**-nek ejtjük.)\n' +
        '- `で` = **-val, -vel** (eszköz): `バス で` = busszal\n' +
        '- `から` = **-ból, -ből**, `まで` = **-ig**\n\n' +
        'A szórend: idő – eszköz – cél – ige: `あした でんしゃ で とうきょう に いきます。` Pont mint a magyarban: holnap vonattal Tokióba megyek!\n\n' +
        '`いきます` (megy), `きます` (jön), `かえります` (hazamegy, visszatér) – a hazamenésre külön ige van.\n\n' +
        '**Útbaigazítás:** `えき は どこ です か` (hol van az állomás?), `みぎ` (jobb), `ひだり` (bal), `まっすぐ` (egyenesen). Udvarias kérés: az ige `-te` alakja + `ください`: `まっすぐ いって ください` = menjen egyenesen.',
      words: [
        ['まち', 'város', 'machi'], ['えき', 'állomás', 'eki'], ['みせ', 'bolt', 'mise'], ['びょういん', 'kórház', 'byōin'], ['こうえん', 'park', 'kōen'],
        ['いえ', 'ház, otthon', 'ie'], ['でんしゃ', 'vonat', 'densha'], ['バス', 'busz', 'basu'], ['くるま', 'autó', 'kuruma'], ['じてんしゃ', 'bicikli', 'jitensha'],
        ['ひこうき', 'repülőgép', 'hikōki'], ['いきます', 'megy', 'ikimasu'], ['きます', 'jön', 'kimasu'], ['かえります', 'hazamegy', 'kaerimasu'],
        ['みぎ', 'jobb (oldal)', 'migi'], ['ひだり', 'bal (oldal)', 'hidari'], ['まっすぐ', 'egyenesen', 'massugu'], ['どこ', 'hol?', 'doko']
      ],
      sentences: [
        ['えき は どこ です か。', 'Hol van az állomás?', [], ['Hol az állomás?']],
        ['がっこう に いきます。', 'Iskolába megyek.', ['がっこう へ いきます。'], ['Megyek az iskolába.', 'Az iskolába megyek.']],
        ['バス で いきます。', 'Busszal megyek.', [], ['Busszal megyünk.']],
        ['じてんしゃ で がっこう に いきます。', 'Biciklivel megyek iskolába.', [], ['Biciklivel megyek az iskolába.', 'Biciklivel járok iskolába.']],
        ['まっすぐ いって ください。', 'Menjen egyenesen!', [], ['Menj egyenesen!', 'Menjen egyenesen előre!']],
        ['みせ は みぎ です。', 'A bolt jobbra van.', [], ['A bolt jobb oldalt van.', 'Jobbra van a bolt.']],
        ['こうえん は ひだり です。', 'A park balra van.', [], ['A park bal oldalt van.', 'Balra van a park.']],
        ['でんしゃ で とうきょう に いきます。', 'Vonattal megyek Tokióba.', [], ['Vonattal megyünk Tokióba.']],
        ['ごじ に いえ に かえります。', 'Ötkor hazamegyek.', [], ['Öt órakor hazamegyek.', 'Ötkor megyek haza.']],
        ['ともだち が いえ に きます。', 'A barátom hozzánk jön.', [], ['A barátom eljön hozzánk.', 'Egy barátom jön hozzánk.']],
        ['ひこうき で ハンガリー に かえります。', 'Repülővel megyek haza Magyarországra.', [], ['Repülővel térek haza Magyarországra.']],
        ['びょういん は どこ です か。', 'Hol van a kórház?', [], ['Hol a kórház?']]
      ]
    },
    {
      id: 'shumi', title: 'Hobbi és múlt idő', icon: '🎮',
      tip: '**Múlt idő:** `～ます` → `～ました`, tagadva `～ませんでした`:\n\n' +
        '- `みます` (nézek) → `みました` (néztem)\n' +
        '- `たべます` (eszem) → `たべました` (ettem)\n' +
        '- `しません` (nem csinálom) → `しませんでした` (nem csináltam)\n\n' +
        '**Meghívás:** `～ませんか` (nem …-nánk?) – ez a legudvariasabb javaslat: `いっしょに サッカー を しません か。` = Nem fociznánk együtt?\n\n' +
        '**Kedvelés és ügyesség:** a `すき` (kedvelt), `だいすき` (imádott) és `じょうず` (ügyes) mellett a dolgot `が` jelöli: `うた が じょうず です` = jól énekel (szó szerint: a dalban ügyes).\n\n' +
        'Sportokhoz `します` kell: `テニス を します` = teniszezik.\n\n' +
        'A japán sok angol szót vett át katakanával, japános kiejtéssel: サッカー (sakkā = soccer), ゲーム (gēmu = game). Ha egy katakanás szót hangosan kiolvasol, gyakran rájössz, mit jelent!',
      words: [
        ['しゅみ', 'hobbi', 'shumi'], ['サッカー', 'foci', 'sakkā'], ['テニス', 'tenisz', 'tenisu'], ['すいえい', 'úszás', 'suiei'], ['おんがく', 'zene', 'ongaku'],
        ['えいが', 'film', 'eiga'], ['ゲーム', 'videojáték', 'gēmu'], ['まんが', 'manga (képregény)', 'manga'], ['アニメ', 'anime (rajzfilm)', 'anime'],
        ['うた', 'dal', 'uta'], ['ききます', 'hallgat', 'kikimasu'], ['みます', 'néz', 'mimasu'], ['じょうず', 'ügyes (valamiben)', 'jōzu'],
        ['たのしい', 'szórakoztató', 'tanoshii'], ['しゅうまつ', 'hétvége', 'shūmatsu'], ['だいすき', 'imád (nagyon szeret)', 'daisuki'], ['いっしょに', 'együtt', 'issho ni']
      ],
      sentences: [
        ['わたし の しゅみ は サッカー です。', 'A hobbim a foci.', [], ['Az én hobbim a foci.', 'A hobbim a futball.']],
        ['しゅうまつ に テニス を します。', 'Hétvégén teniszezem.', [], ['Hétvégén teniszezek.']],
        ['まいにち おんがく を ききます。', 'Minden nap zenét hallgatok.', [], ['Mindennap zenét hallgatok.']],
        ['きのう えいが を みました。', 'Tegnap filmet néztem.', [], ['Tegnap megnéztem egy filmet.']],
        ['まんが を よみました。', 'Mangát olvastam.', [], ['Olvastam egy mangát.']],
        ['アニメ が だいすき です。', 'Imádom az animéket.', [], ['Nagyon szeretem az animéket.', 'Imádom az animét.']],
        ['ゲーム は たのしい です。', 'A videojáték szórakoztató.', [], ['A videojátékok szórakoztatók.', 'A játék szórakoztató.']],
        ['ケン さん は うた が じょうず です。', 'Ken jól énekel.', [], ['Ken ügyesen énekel.']],
        ['きのう すし を たべました。', 'Tegnap szusit ettem.', [], []],
        ['えいが は たのしかった です。', 'Jó volt a film.', [], ['A film jó volt.', 'Szórakoztató volt a film.']],
        ['いっしょに サッカー を しません か。', 'Nem fociznánk együtt?', [], ['Focizzunk együtt!', 'Fociznál velem?']],
        ['きのう すいえい を しました。', 'Tegnap úsztam.', [], ['Tegnap úszni voltam.']]
      ]
    }
  ]
});
