/* Kínai (mandarin) nyelvtanfolyam (HSK 1–2) – 10 egység. A szavak egyszerűsített írásjegyekkel, a 3. elem a hangjelekkel ellátott pinjin.
 * A mondatok szavai szóközzel elválasztva szerepelnek, hogy a szócsempés feladat működjön (a megjelenítés szóköz nélkül fűzi össze őket).
 * Gépelésnél az ékezet (hangjel) nélküli pinjint is elfogadja a motor, figyelmeztetéssel. */
STUDIE.addLangCourse({
  id: 'kinai', title: 'Kínai', flag: '🇨🇳', tts: 'zh-CN', badge: 'HSK 1–2',
  noSpaces: true, script: true,
  intro: 'A mandarin kínait több mint 900 millióan beszélik anyanyelvként – többen, mint bármely más nyelvet. Írásjegyekkel írják, de a nyelvtana meglepően egyszerű: nincs igeragozás, nincs többes szám, nincsenek esetragok – cserébe a hangmagasságra (a tónusokra) kell figyelni.',
  units: [
    {
      id: 'wenhou', title: 'Köszönés', icon: '👋',
      tip: 'A kínai **tonális nyelv**: ugyanaz a szótag más hangmagassággal mást jelent. Négy hang és egy semleges hang van, a **pinjin** (latin betűs átírás) ékezetekkel jelöli őket:\n\n' +
        '- **1. hang** `mā` – magas és egyenletes, mintha kitartott hangot énekelnél: „láá”.\n' +
        '- **2. hang** `má` – emelkedő, mint a meglepett kérdés: „Mi?”\n' +
        '- **3. hang** `mǎ` – mélyre ereszkedik, majd kicsit visszaemelkedik, mint a kételkedő „hááát…”.\n' +
        '- **4. hang** `mà` – éles, eső, mint egy határozott „Ne!”\n' +
        '- **semleges hang** `ma` – rövid, könnyű, hangsúlytalan, nincs rajta jel: `xièxie`, `māma`.\n\n' +
        'Például: `mā` (anya), `má` (kender), `mǎ` (ló), `mà` (szid). A feladatokban a hangjel nélküli pinjint (pl. `ni hao`) is elfogadjuk, de szólunk érte.\n\n' +
        '**Hangváltozás:** két 3. hang egymás után → az első 2. hangra vált: `nǐ hǎo` ejtése „ní hǎo”. A `不` (bù) 4. hang előtt `bú` lesz: `bù kèqi` → „bú kèqi”.\n\n' +
        'A `您` (nín) a `你` (nǐ) udvarias párja, mint a magyar **ön** – tanárnak, idősebbnek.',
      words: [
        ['你好', 'szia', 'nǐ hǎo'], ['您好', 'jó napot (udvariasan)', 'nín hǎo'], ['早上好', 'jó reggelt', 'zǎoshang hǎo'],
        ['晚上好', 'jó estét', 'wǎnshang hǎo'], ['晚安', 'jó éjszakát', 'wǎn\'ān'], ['再见', 'viszontlátásra', 'zàijiàn'],
        ['谢谢', 'köszönöm', 'xièxie'], ['不客气', 'szívesen', 'bù kèqi'], ['对不起', 'bocsánat', 'duìbuqǐ'],
        ['没关系', 'semmi baj', 'méi guānxi'], ['请', 'kérlek, kérem', 'qǐng'], ['坐', 'ül, leül', 'zuò'],
        ['老师', 'tanár', 'lǎoshī'], ['同学', 'osztálytárs', 'tóngxué'], ['大家', 'mindenki', 'dàjiā'],
        ['明天', 'holnap', 'míngtiān'], ['好', 'jó', 'hǎo']
      ],
      sentences: [
        ['老师 好！', 'Jó napot, tanár úr!', [], ['Jó napot, tanárnő!', 'Jó napot kívánok, tanár úr!', 'Jó napot kívánok, tanárnő!']],
        ['大家 好！', 'Sziasztok!', [], ['Szia mindenki!', 'Jó napot mindenkinek!', 'Helló mindenki!']],
        ['您 好！', 'Jó napot kívánok!', [], ['Jó napot!']],
        ['谢谢 老师！', 'Köszönöm, tanár úr!', [], ['Köszönöm, tanárnő!']],
        ['谢谢 大家！', 'Köszönöm mindenkinek!', [], ['Köszönöm, mindenki!']],
        ['对不起 老师！', 'Bocsánat, tanár úr!', [], ['Elnézést, tanár úr!', 'Bocsánat, tanárnő!', 'Elnézést, tanárnő!']],
        ['老师 再见！', 'Viszontlátásra, tanár úr!', [], ['Viszontlátásra, tanárnő!']],
        ['明天 见！', 'Holnap találkozunk!', [], ['Viszlát holnap!']],
        ['大家 早上好！', 'Jó reggelt mindenkinek!', [], ['Jó reggelt, mindenki!', 'Jó reggelt mindenki!']],
        ['老师 晚上好！', 'Jó estét, tanár úr!', [], ['Jó estét, tanárnő!']],
        ['请 坐！', 'Ülj le, kérlek!', [], ['Kérlek, ülj le!', 'Üljön le, kérem!', 'Kérem, üljön le!', 'Foglaljon helyet!']]
      ]
    },
    {
      id: 'jieshao', title: 'Bemutatkozás', icon: '🙋',
      tip: 'A **pinjin** betűit nem szabad magyarosan olvasni! A legfontosabb csapdák:\n\n' +
        '- `x` ≈ az **sz** és az **s** közötti hang, mosolygó szájjal: `xièxie` („szie-szie”), `Xiōngyálì` (Magyarország)\n' +
        '- `q` ≈ lágy, mosolygós **cs**: `qǐng` (kérem)\n' +
        '- `j` ≈ lágy **dzs**: `jiào` (hívják)\n' +
        '- `zh` ≈ kemény **dzs**, felkunkorított nyelvheggyel: `Zhōngguó` (Kína); `ch` ≈ kemény **cs**; `sh` ≈ **s**: `shì`\n' +
        '- `c` = **c**, erős lehelettel; `z` = **dz**: `zài`\n' +
        '- `r` ≈ a **zs** és az angol r keveréke: `rén` (ember)\n' +
        '- `e` ≈ tompa, **ö**-szerű hang: `hěn`, `de`\n' +
        '- `zhi, chi, shi, ri, zi, ci, si` végén az `i` nem i, hanem tompa, zümmögő hang.\n\n' +
        '**A 是 (shì) létige** főnevet köt főnévhez, és **nem ragozzuk**: `我是学生` = diák vagyok, `他是老师` = ő tanár.\n\n' +
        '**Kérdőszavak** (`什么` = mi?, `谁` = ki?) oda kerülnek, ahol a válasz lesz: `他是谁？` = Ki ő? (szó szerint: ő van ki?)\n\n' +
        'Az „ő” írásban kétféle: `他` (férfi) és `她` (nő), de mindkettőt **tā**-nak ejtjük.',
      words: [
        ['我', 'én', 'wǒ'], ['你', 'te', 'nǐ'], ['他', 'ő (férfi)', 'tā'], ['我们', 'mi (én és mások)', 'wǒmen'],
        ['是', 'van (létige)', 'shì'], ['叫', 'hívják (valahogy)', 'jiào'], ['名字', 'név', 'míngzi'], ['什么', 'mi? milyen?', 'shénme'],
        ['学生', 'diák', 'xuésheng'], ['中国', 'Kína', 'Zhōngguó'], ['中国人', 'kínai (ember)', 'Zhōngguórén'],
        ['匈牙利', 'Magyarország', 'Xiōngyálì'], ['匈牙利人', 'magyar (ember)', 'Xiōngyálìrén'], ['朋友', 'barát', 'péngyou'],
        ['认识', 'megismer, ismer', 'rènshi'], ['很', 'nagyon', 'hěn'], ['高兴', 'örül, boldog', 'gāoxìng'], ['也', 'is', 'yě'],
        ['谁', 'ki?', 'shéi'], ['的', '-é, -nak a (birtok)', 'de']
      ],
      sentences: [
        ['我 是 学生。', 'Diák vagyok.', ['是学生。'], ['Én diák vagyok.']],
        ['我 叫 安娜。', 'Annának hívnak.', [], ['Anna vagyok.', 'A nevem Anna.', 'Az én nevem Anna.', 'Engem Annának hívnak.']],
        ['你 叫 什么 名字？', 'Hogy hívnak?', [], ['Mi a neved?', 'Téged hogy hívnak?']],
        ['我 是 匈牙利人。', 'Magyar vagyok.', [], ['Én magyar vagyok.']],
        ['他 是 中国人。', 'Ő kínai.', [], ['Kínai.']],
        ['他 是 我 的 朋友。', 'Ő a barátom.', [], ['Ő az én barátom.']],
        ['认识 你 很 高兴。', 'Örülök, hogy megismertelek.', [], ['Örvendek.', 'Örülök a találkozásnak.', 'Örülök, hogy megismerhettelek.']],
        ['我 也 是 学生。', 'Én is diák vagyok.', [], []],
        ['他 是 谁？', 'Ki ő?', [], ['Ő kicsoda?', 'Ki az?']],
        ['我们 是 朋友。', 'Barátok vagyunk.', [], ['Mi barátok vagyunk.']],
        ['她 是 老师。', 'Ő tanár.', [], ['Ő tanárnő.', 'Tanárnő.']]
      ]
    },
    {
      id: 'shuzi', title: 'Számok', icon: '🔢',
      tip: 'A kínai számok szuper logikusak – ha az 1–10-et tudod, 99-ig mindent tudsz:\n\n' +
        '- `十一` (shíyī) = 10 + 1 = 11, `十五` = 15\n' +
        '- `二十` (èrshí) = 2 × 10 = 20, `三十五` = 3 × 10 + 5 = 35\n' +
        '- `九十九` = 99, `一百` (yībǎi) = 100\n\n' +
        '**Kettő kétféle:** számoláskor `二` (èr), darabszám előtt `两` (liǎng): `两个` = két darab. Hasonló a magyar **kettő** / **két** párhoz!\n\n' +
        '**Kérdés számra:** `几` (jǐ) kis számokra (kb. 10-ig, életkor gyerekeknél, óra), `多少` (duōshao) bármekkora számra, például árra: `多少钱？` = Mennyibe kerül?\n\n' +
        'Az életkornál **nem kell „van”**: `我十四岁` = tizennégy éves vagyok (szó szerint: én tizennégy év).\n\n' +
        'A kínai pénz a jüan: írásban `元` (yuán), a beszélt nyelvben `块` (kuài). A `这个` (zhège) = ez (a darab), a `加` (jiā) = meg, plusz.\n\n' +
        'Érdekesség: a **4** (`四`, sì) hasonlít a „halál” szóra (`死`, sǐ), ezért balszerencsésnek tartják – a **8** (`八`, bā) viszont szerencseszám!',
      words: [
        ['零', 'nulla', 'líng'], ['一', 'egy', 'yī'], ['二', 'kettő', 'èr'], ['三', 'három', 'sān'], ['四', 'négy', 'sì'],
        ['五', 'öt', 'wǔ'], ['六', 'hat', 'liù'], ['七', 'hét (szám)', 'qī'], ['八', 'nyolc', 'bā'], ['九', 'kilenc', 'jiǔ'],
        ['十', 'tíz', 'shí'], ['一百', 'száz', 'yībǎi'], ['两', 'két (darab előtt)', 'liǎng'], ['几', 'hány? (kis számra)', 'jǐ'],
        ['多少', 'mennyi?', 'duōshao'], ['岁', 'éves (életkor)', 'suì'], ['这个', 'ez (a darab)', 'zhège'], ['块', 'jüan (beszélt nyelvben)', 'kuài'],
        ['钱', 'pénz', 'qián']
      ],
      sentences: [
        ['一 二 三。', 'Egy, kettő, három.', [], ['Egy, két, három.']],
        ['六 七 八 九 十。', 'Hat, hét, nyolc, kilenc, tíz.', [], []],
        ['你 几 岁？', 'Hány éves vagy?', [], []],
        ['我 十四 岁。', 'Tizennégy éves vagyok.', [], ['14 éves vagyok.']],
        ['他 二十 岁。', 'Ő húszéves.', [], ['Húszéves.', 'Ő húsz éves.', 'Ő 20 éves.']],
        ['这个 多少 钱？', 'Mennyibe kerül ez?', [], ['Ez mennyibe kerül?', 'Ez mennyi?']],
        ['十 块 钱。', 'Tíz jüan.', [], ['10 jüan.']],
        ['一百 块。', 'Száz jüan.', [], ['100 jüan.']],
        ['三十五 块 钱。', 'Harmincöt jüan.', [], ['35 jüan.']],
        ['五 加 五 是 十。', 'Öt meg öt az tíz.', [], ['Öt plusz öt az tíz.', 'Öt meg öt tíz.', 'Öt plusz öt egyenlő tíz.']]
      ]
    },
    {
      id: 'jiating', title: 'Család', icon: '👨‍👩‍👧',
      tip: 'Jó hír: a kínaiban **nincs igeragozás** és **nincs többes szám**! Az ige minden személyben ugyanaz: `我有`, `你有`, `他有` = nekem / neked / neki van. A `猫` lehet macska vagy macskák is – a szövegkörnyezet vagy a szám dönt.\n\n' +
        '**Birtoklás – 有:** `我有哥哥` = van bátyám (szó szerint: én bír báty). Tagadva **mindig** `没有`: `我没有姐姐` = nincs nővérem.\n\n' +
        '**Eldöntendő kérdés – 吗:** tedd a kijelentő mondat végére a `吗`-t, a szórend nem változik: `你有姐姐。` → `你有姐姐吗？` Olyan, mint a magyar **-e** kérdőszócska: „Van-e nővéred?”\n\n' +
        '**Mértékszó:** szám és főnév közé mindig kell egy „darab”-szó. Az általános a `个` (gè): `一个哥哥`. Állatokra gyakran `只` (zhī): `一只猫`. A családtagokat a `口` (kǒu, „száj”) számolja: `我家有四口人` = négytagú a családom.\n\n' +
        'Közeli családtagnál a `的` (-é) elmaradhat: `我妈妈` = az anyukám.',
      words: [
        ['爸爸', 'apa', 'bàba'], ['妈妈', 'anya', 'māma'], ['哥哥', 'báty', 'gēge'], ['姐姐', 'nővér', 'jiějie'],
        ['弟弟', 'öcs', 'dìdi'], ['妹妹', 'húg', 'mèimei'], ['爷爷', 'nagyapa (apai)', 'yéye'], ['奶奶', 'nagymama (apai)', 'nǎinai'],
        ['家', 'család, otthon', 'jiā'], ['有', 'van (valakinek)', 'yǒu'], ['没有', 'nincs (valakinek)', 'méiyǒu'],
        ['个', 'darab (általános mértékszó)', 'gè'], ['只', 'darab (állatokra)', 'zhī'], ['口', 'fő (családtagok számolásakor)', 'kǒu'],
        ['狗', 'kutya', 'gǒu'], ['猫', 'macska', 'māo'], ['吗', 'kérdőszócska (-e?)', 'ma'], ['和', 'és', 'hé'], ['人', 'ember', 'rén']
      ],
      sentences: [
        ['我 家 有 四 口 人。', 'Négytagú a családom.', [], ['Négyen vagyunk a családban.', 'A családom négytagú.', 'A családunk négytagú.']],
        ['你 家 有 几 口 人？', 'Hányan vagytok a családban?', [], ['Hány tagú a családod?', 'Hány tagú a családotok?']],
        ['我 有 一 个 哥哥。', 'Van egy bátyám.', [], ['Egy bátyám van.']],
        ['我 有 两 个 妹妹。', 'Két húgom van.', [], ['Van két húgom.']],
        ['你 有 姐姐 吗？', 'Van nővéred?', [], []],
        ['我 没有 姐姐。', 'Nincs nővérem.', [], []],
        ['这 是 我 妈妈。', 'Ő az anyukám.', [], ['Ez az anyukám.', 'Ő az anyám.', 'Ez az anyám.', 'Ő az édesanyám.']],
        ['你 爸爸 是 老师 吗？', 'Az apukád tanár?', [], ['Apukád tanár?', 'Az apád tanár?', 'Apád tanár?', 'Az édesapád tanár?']],
        ['他 是 我 弟弟。', 'Ő az öcsém.', [], ['Ő az én öcsém.']],
        ['我 爷爷 有 一 只 猫。', 'A nagyapámnak van egy macskája.', [], ['Nagyapámnak van egy macskája.']],
        ['我 有 一 只 狗 和 一 只 猫。', 'Van egy kutyám és egy macskám.', [], ['Egy kutyám és egy macskám van.']]
      ]
    },
    {
      id: 'xuexiao', title: 'Iskola', icon: '🏫',
      tip: 'A kínai írásjegyek (`汉字`, Hànzì) nem betűk: mindegyik **egy szótag és egy jelentés**. Kb. 2500 gyakori jeggyel egy átlagos újságszöveg 97–98%-át el lehet olvasni.\n\n' +
        'A legtöbb jegy két részből áll: a **gyök** (jelentésrész) súgja, miről szól, a másik rész gyakran a kiejtésre utal:\n\n' +
        '- `女` (nő): `妈` (anya), `姐` (nővér), `妹` (húg), `她` (ő, nő)\n' +
        '- `亻` (ember): `你` (te), `他` (ő), `们` (többes jel névmásoknál)\n' +
        '- `口` (száj): `吃` (eszik), `喝` (iszik), `叫` (hívják), `吗`\n' +
        '- `木` (fa): `桌` (asztal), `椅` (szék)\n' +
        '- `氵` (víz): `汉` (kínai), `没` (nincs)\n\n' +
        'A `妈` (mā) jobb oldala a `马` (mǎ, ló) – innen a hasonló kiejtés!\n\n' +
        '**Mértékszavak:** könyvre, füzetre `本` (běn): `一本书`; tollra, ceruzára `支` (zhī): `两支铅笔`. Ha bizonytalan vagy, a `个` sokszor elmegy.\n\n' +
        '`这` = ez, `那` = az: `这本书` = ez a könyv. A `我的` önállóan is állhat: `这本书是我的` = ez a könyv az enyém.',
      words: [
        ['学校', 'iskola', 'xuéxiào'], ['教室', 'osztályterem', 'jiàoshì'], ['书', 'könyv', 'shū'], ['本子', 'füzet', 'běnzi'],
        ['笔', 'toll', 'bǐ'], ['铅笔', 'ceruza', 'qiānbǐ'], ['书包', 'iskolatáska', 'shūbāo'], ['桌子', 'asztal', 'zhuōzi'],
        ['椅子', 'szék', 'yǐzi'], ['中文', 'kínai nyelv', 'Zhōngwén'], ['汉字', 'kínai írásjegy', 'Hànzì'], ['学习', 'tanul', 'xuéxí'],
        ['看', 'néz, olvas', 'kàn'], ['写', 'ír', 'xiě'], ['这', 'ez', 'zhè'], ['那', 'az', 'nà'], ['本', 'darab (könyvre)', 'běn']
      ],
      sentences: [
        ['我 有 一 本 书。', 'Van egy könyvem.', [], ['Egy könyvem van.']],
        ['这 是 我 的 书包。', 'Ez az én iskolatáskám.', [], ['Ez az iskolatáskám.']],
        ['那 是 什么？', 'Az mi?', [], ['Mi az?']],
        ['那 是 中文 书。', 'Az egy kínai könyv.', [], ['Az kínai könyv.', 'Az egy kínai nyelvű könyv.']],
        ['我 学习 中文。', 'Kínaiul tanulok.', [], ['Kínait tanulok.', 'Kínai nyelvet tanulok.', 'Én kínaiul tanulok.']],
        ['你 有 笔 吗？', 'Van tollad?', [], []],
        ['我 有 两 支 铅笔。', 'Két ceruzám van.', [], ['Van két ceruzám.']],
        ['老师 写 汉字。', 'A tanár kínai írásjegyeket ír.', [], ['A tanárnő kínai írásjegyeket ír.', 'A tanár írásjegyeket ír.']],
        ['这 是 我们 的 教室。', 'Ez a mi osztálytermünk.', [], ['Ez az osztálytermünk.', 'Ez a mi tantermünk.', 'Ez a tantermünk.']],
        ['我 看 书。', 'Könyvet olvasok.', [], ['Olvasok.']],
        ['这 本 书 是 我 的。', 'Ez a könyv az enyém.', [], []]
      ]
    },
    {
      id: 'chifan', title: 'Étel és ital', icon: '🍜',
      tip: '**Tagadás: 不 vagy 没?**\n\n' +
        '- `不` (bù): jelen, jövő, szokás, akarat: `我不喝咖啡` = nem iszom kávét (nem szoktam / nem fogok).\n' +
        '- `没` (méi): ami **nem történt meg**: `我没喝牛奶` = nem ittam tejet.\n' +
        '- A `有` tagadása mindig `没有`, sosem „不有”.\n\n' +
        'A tagadószó az **ige elé** kerül, mint a magyar **nem**.\n\n' +
        '**Akarás és kérés:**\n\n' +
        '- `想` (xiǎng) + ige = szeretnék: `我想喝茶` = teát szeretnék inni.\n' +
        '- `要` (yào) = kérek, akarok – határozottabb, rendeléskor jó: `我要一杯水` = kérek egy pohár vizet.\n\n' +
        '`喜欢` (xǐhuan) = szeret, kedvel: `我喜欢吃面条` = szeretem a tésztát. A `杯` (bēi, pohár) is mértékszó: `一杯茶` = egy csésze tea.\n\n' +
        'Kínában délen inkább a `米饭` (főtt rizs), északon a `面条` (tészta) és a `饺子` (töltött tésztabatyu) a fő étel. A `好吃` szó szerint „jó enni” = finom.',
      words: [
        ['吃', 'eszik', 'chī'], ['喝', 'iszik', 'hē'], ['米饭', 'főtt rizs', 'mǐfàn'], ['面条', 'tészta (metélt)', 'miàntiáo'],
        ['饺子', 'töltött tésztabatyu', 'jiǎozi'], ['苹果', 'alma', 'píngguǒ'], ['水', 'víz', 'shuǐ'], ['茶', 'tea', 'chá'],
        ['牛奶', 'tej', 'niúnǎi'], ['咖啡', 'kávé', 'kāfēi'], ['鸡蛋', 'tojás', 'jīdàn'], ['杯', 'pohár, csésze (mértékszó)', 'bēi'],
        ['想', 'szeretne (valamit tenni)', 'xiǎng'], ['要', 'kér, akar', 'yào'], ['不', 'nem (tagadószó)', 'bù'],
        ['没', 'nem (ami nem történt meg)', 'méi'], ['喜欢', 'szeret, kedvel', 'xǐhuan'], ['好吃', 'finom', 'hǎochī'],
        ['饿', 'éhes', 'è'], ['渴', 'szomjas', 'kě']
      ],
      sentences: [
        ['我 喜欢 吃 面条。', 'Szeretem a tésztát.', [], ['Szeretek tésztát enni.']],
        ['你 想 喝 什么？', 'Mit szeretnél inni?', [], ['Mit innál?', 'Mit kérsz inni?']],
        ['我 想 喝 茶。', 'Teát szeretnék inni.', [], ['Teát innék.', 'Szeretnék teát inni.', 'Teát kérek.']],
        ['我 要 一 杯 水。', 'Kérek egy pohár vizet.', [], ['Egy pohár vizet kérek.']],
        ['我 不 喝 咖啡。', 'Nem iszom kávét.', [], ['Én nem iszom kávét.', 'Kávét nem iszom.']],
        ['我 不 喜欢 牛奶。', 'Nem szeretem a tejet.', [], ['Én nem szeretem a tejet.']],
        ['我 没 喝 牛奶。', 'Nem ittam tejet.', [], ['Nem ittam meg a tejet.']],
        ['你 饿 吗？', 'Éhes vagy?', [], []],
        ['我 很 渴。', 'Szomjas vagyok.', [], ['Nagyon szomjas vagyok.']],
        ['面条 很 好吃。', 'A tészta finom.', [], ['A tészta nagyon finom.', 'Finom a tészta.']],
        ['我 吃 两 个 鸡蛋。', 'Két tojást eszem.', [], ['Eszem két tojást.', 'Megeszek két tojást.']],
        ['你 喜欢 吃 苹果 吗？', 'Szereted az almát?', [], ['Szeretsz almát enni?']]
      ]
    },
    {
      id: 'yanse', title: 'Színek és ruhák', icon: '👕',
      tip: 'Nagy csapda: melléknév előtt **nem** használjuk a `是` létigét!\n\n' +
        '- ❌ `衣服是漂亮` → ✅ `衣服很漂亮` = a ruha szép\n' +
        '- `我很渴` = szomjas vagyok\n\n' +
        'A `很` (nagyon) itt többnyire csak „összekötő”: alig erősít, a magyarba gyakran le sem fordítjuk. Kérdésben és tagadásban elmarad: `贵吗？` = drága?, `不大` = nem nagy. Tehát:\n\n' +
        '- főnév + `是` + főnév: `他是老师` (ő tanár)\n' +
        '- főnév + `很` + melléknév: `他很高` (ő magas)\n\n' +
        '**Színek:** a `色` (sè) jelentése szín: `红色` = piros. Ha a szín valaminek a tulajdonsága, gyakori a `是…的` keret: `我的鞋是黑色的` = a cipőm fekete.\n\n' +
        'Ruhára a mértékszó `件` (jiàn): `一件衣服`; párokra `双` (shuāng): `一双鞋` = egy pár cipő.\n\n' +
        'A **piros** Kínában a szerencse és az ünnep színe – az újévi pénzes borítékok (`红包`) is pirosak.',
      words: [
        ['颜色', 'szín', 'yánsè'], ['红色', 'piros', 'hóngsè'], ['蓝色', 'kék', 'lánsè'], ['绿色', 'zöld', 'lǜsè'],
        ['黄色', 'sárga', 'huángsè'], ['白色', 'fehér', 'báisè'], ['黑色', 'fekete', 'hēisè'], ['衣服', 'ruha', 'yīfu'],
        ['裤子', 'nadrág', 'kùzi'], ['鞋', 'cipő', 'xié'], ['件', 'darab (ruhára)', 'jiàn'], ['双', 'pár', 'shuāng'],
        ['大', 'nagy', 'dà'], ['小', 'kicsi', 'xiǎo'], ['漂亮', 'szép', 'piàoliang'], ['新', 'új', 'xīn'],
        ['贵', 'drága', 'guì'], ['便宜', 'olcsó', 'piányi']
      ],
      sentences: [
        ['我 喜欢 红色。', 'Szeretem a pirosat.', [], ['A pirosat szeretem.', 'Szeretem a piros színt.']],
        ['你 喜欢 什么 颜色？', 'Milyen színt szeretsz?', [], ['Melyik színt szereted?', 'Milyen színeket szeretsz?']],
        ['这 件 衣服 很 漂亮。', 'Ez a ruha szép.', [], ['Ez a ruha nagyon szép.']],
        ['我 的 鞋 是 黑色 的。', 'A cipőm fekete.', [], ['Az én cipőm fekete.', 'Fekete a cipőm.']],
        ['他 的 衣服 是 蓝色 的。', 'A ruhája kék.', [], ['Az ő ruhája kék.', 'Kék a ruhája.']],
        ['这 双 鞋 很 贵。', 'Ez a cipő drága.', [], ['Ez a cipő nagyon drága.', 'Ez a pár cipő drága.']],
        ['裤子 很 便宜。', 'A nadrág olcsó.', [], ['A nadrág nagyon olcsó.', 'Olcsó a nadrág.']],
        ['这个 贵 吗？', 'Ez drága?', [], ['Drága ez?']],
        ['我 的 书包 不 大。', 'Az iskolatáskám nem nagy.', [], ['Az én iskolatáskám nem nagy.']],
        ['我 的 猫 很 小。', 'A macskám kicsi.', [], ['A macskám nagyon kicsi.', 'Az én macskám kicsi.']],
        ['我 有 一 件 新 衣服。', 'Van egy új ruhám.', [], ['Egy új ruhám van.']]
      ]
    },
    {
      id: 'shijian', title: 'Idő és napok', icon: '📅',
      tip: '**Az időhatározó az ige ELÉ kerül** – sosem a mondat végére, mint az angolban:\n\n' +
        '- `我七点起床。` = Hét órakor kelek fel. (én – hét óra – felkel)\n' +
        '- `我晚上十点睡觉。` vagy `晚上十点我睡觉。` = Este tízkor megyek aludni.\n\n' +
        'Állhat az alany előtt vagy után, de mindig az ige előtt. Sorrend: **ki – mikor – (hol) – mit csinál**.\n\n' +
        '**Óra:** `点` (diǎn) = óra, `半` (bàn) = fél. Figyelj: `七点半` = 7:30 = magyarul **fél nyolc**!\n\n' +
        '**Dátum** a nagytól a kicsi felé – pont, mint a magyarban: `2026年11月25号` = 2026. november 25. A hónapok számok: `五月` = 5. hónap = május.\n\n' +
        '**Napok:** `星期` (hét) + szám: `星期一` = hétfő, `星期二` = kedd … `星期六` = szombat, a vasárnap viszont `星期天`.\n\n' +
        'Múlt vagy jövő? Az ige nem változik, az időszó mondja meg: `昨天是星期天` = tegnap vasárnap volt.',
      words: [
        ['今天', 'ma', 'jīntiān'], ['昨天', 'tegnap', 'zuótiān'], ['现在', 'most', 'xiànzài'], ['点', 'óra (időpont)', 'diǎn'],
        ['半', 'fél', 'bàn'], ['星期', 'hét (7 nap)', 'xīngqī'], ['星期一', 'hétfő', 'xīngqīyī'], ['星期六', 'szombat', 'xīngqīliù'],
        ['星期天', 'vasárnap', 'xīngqītiān'], ['月', 'hónap', 'yuè'], ['号', 'nap (dátumban)', 'hào'], ['年', 'év', 'nián'],
        ['早上', 'reggel', 'zǎoshang'], ['上午', 'délelőtt', 'shàngwǔ'], ['下午', 'délután', 'xiàwǔ'], ['晚上', 'este', 'wǎnshang'],
        ['起床', 'felkel', 'qǐchuáng'], ['睡觉', 'alszik, aludni megy', 'shuìjiào'], ['上课', 'órája van (iskolában)', 'shàngkè']
      ],
      sentences: [
        ['现在 几 点？', 'Hány óra van?', [], ['Most hány óra van?', 'Mennyi az idő?']],
        ['现在 七 点 半。', 'Fél nyolc van.', [], ['Most fél nyolc van.']],
        ['我 七 点 起床。', 'Hét órakor kelek fel.', [], ['Hétkor kelek fel.', 'Hét órakor kelek.', 'Hétkor kelek.']],
        ['你 早上 几 点 起床？', 'Reggel hány órakor kelsz fel?', [], ['Reggel hánykor kelsz fel?', 'Hánykor kelsz fel reggel?', 'Reggel hány órakor kelsz?', 'Reggel hánykor kelsz?']],
        ['我 晚上 十 点 睡觉。', 'Este tízkor megyek aludni.', [], ['Este tíz órakor megyek aludni.', 'Este tízkor fekszem le.', 'Este tíz órakor fekszem le.']],
        ['今天 星期一。', 'Ma hétfő van.', [], ['Ma hétfő.']],
        ['明天 星期六。', 'Holnap szombat lesz.', [], ['Holnap szombat van.', 'Holnap szombat.']],
        ['昨天 是 星期天。', 'Tegnap vasárnap volt.', [], []],
        ['今天 几 月 几 号？', 'Hányadika van ma?', [], ['Ma hányadika van?']],
        ['今天 五 月 一 号。', 'Ma május elseje van.', [], ['Ma május elseje.']],
        ['我们 下午 两 点 上课。', 'Délután kettőkor van óránk.', [], ['Délután két órakor van óránk.', 'Délután kettőkor kezdődik az óránk.']],
        ['我 星期天 不 上课。', 'Vasárnap nincs órám.', [], ['Vasárnap nincs tanítás.']]
      ]
    },
    {
      id: 'chengshi', title: 'Város és közlekedés', icon: '🚇',
      tip: '**Hol van? – 在:** a `在` (zài) jelentése „valahol van”, és elvégzi a magyar **-ban/-ben, -on/-en** ragok munkáját: `我在北京` = Pekingben vagyok, `公园在那儿` = a park ott van.\n\n' +
        '**Hová megy? – 去:** a cél rag nélkül, közvetlenül az ige után jön: `我去商店` = a boltba megyek.\n\n' +
        '**Mivel?** A `坐` (ül) járművel = utazik vele. A sorrend: ki – mivel – megy – hová:\n\n' +
        '- `我坐地铁去学校。` = Metróval megyek iskolába. (én ül metró megy iskola)\n\n' +
        '**Kérdőszó a helyén:** `你去哪儿？` → `我去商店。` A válasz pontosan a kérdőszó helyére kerül – mint a magyarban: Hová mész? – A boltba megyek. `怎么` (zěnme) = hogyan: `你怎么去？` = hogyan mész?\n\n' +
        'A szóvégi `儿` (r) a **pekingi** kiejtés jellegzetessége: `哪儿` (nǎr), `这儿` (zhèr), `那儿` (nàr). Délen inkább `哪里`, `这里`, `那里` alakot hallasz.\n\n' +
        'Figyelj a hangokra: `哪儿` (nǎr = hol?) 3. hang, `那儿` (nàr = ott) 4. hang!',
      words: [
        ['去', 'megy (valahová)', 'qù'], ['在', 'van (valahol)', 'zài'], ['哪儿', 'hol? hová?', 'nǎr'], ['这儿', 'itt', 'zhèr'],
        ['那儿', 'ott', 'nàr'], ['商店', 'bolt', 'shāngdiàn'], ['医院', 'kórház', 'yīyuàn'], ['饭馆', 'étterem', 'fànguǎn'],
        ['火车站', 'vasútállomás', 'huǒchēzhàn'], ['公园', 'park', 'gōngyuán'], ['公共汽车', 'busz', 'gōnggòng qìchē'],
        ['出租车', 'taxi', 'chūzūchē'], ['地铁', 'metró', 'dìtiě'], ['飞机', 'repülőgép', 'fēijī'], ['北京', 'Peking', 'Běijīng'],
        ['远', 'messze', 'yuǎn'], ['近', 'közel', 'jìn'], ['怎么', 'hogyan?', 'zěnme']
      ],
      sentences: [
        ['你 去 哪儿？', 'Hová mész?', [], ['Hova mész?']],
        ['我 去 商店。', 'A boltba megyek.', [], ['Boltba megyek.', 'Megyek a boltba.']],
        ['火车站 在 哪儿？', 'Hol van a vasútállomás?', [], ['Hol van a pályaudvar?', 'Merre van a vasútállomás?']],
        ['公园 在 那儿。', 'A park ott van.', [], ['Ott van a park.']],
        ['商店 在 这儿。', 'A bolt itt van.', [], ['Itt van a bolt.']],
        ['我 坐 地铁 去 学校。', 'Metróval megyek iskolába.', [], ['Metróval megyek az iskolába.', 'Metróval járok iskolába.']],
        ['他 坐 出租车 去 医院。', 'Taxival megy a kórházba.', [], ['Ő taxival megy a kórházba.', 'Taxival megy kórházba.']],
        ['你 怎么 去 公园？', 'Hogyan mész a parkba?', [], ['Hogy mész a parkba?', 'Mivel mész a parkba?']],
        ['我 坐 公共汽车 去。', 'Busszal megyek.', [], []],
        ['医院 远 吗？', 'Messze van a kórház?', [], ['A kórház messze van?']],
        ['饭馆 很 近。', 'Az étterem közel van.', [], ['Közel van az étterem.', 'Az étterem nagyon közel van.']],
        ['我们 坐 飞机 去 北京。', 'Repülővel megyünk Pekingbe.', [], ['Repülőgéppel megyünk Pekingbe.']]
      ]
    },
    {
      id: 'aihao', title: 'Hobbi és múlt', icon: '⚽',
      tip: '**A 了 (le) – megtörtént!** A kínai ige nem kap múlt idő ragot. Helyette a `了` jelzi, hogy egy cselekvés **megtörtént, befejeződött**, vagy új helyzet állt elő:\n\n' +
        '- az ige után, ha a tárgynak száma van: `我吃了两个苹果。` = Megettem két almát.\n' +
        '- a mondat végén: `我昨天看电影了。` = Tegnap filmet néztem. `周末我去公园了。` = Hétvégén elmentem a parkba.\n\n' +
        '**Tagadva nincs 了!** Helyette `没` (méi) áll: `我没去学校` = nem mentem iskolába. (❌ `我没去了`)\n\n' +
        'A `了` nem pontosan „múlt idő”: múltbeli állapotra nem kell (`昨天是星期天`). Gondolj rá úgy, mint a magyar **meg-** igekötőre: `吃` = eszik, `吃了` = megette.\n\n' +
        '**Tudás – 会 (huì):** megtanult képességre: `我会游泳` = tudok úszni.\n\n' +
        'Sok sport ige + tárgy: `踢足球` (rúgja a labdát = focizik), `打篮球` (üti a kosárlabdát = kosarazik), `唱歌` (dalt énekel = énekel).',
      words: [
        ['爱好', 'hobbi', 'àihào'], ['踢足球', 'focizik', 'tī zúqiú'], ['打篮球', 'kosarazik', 'dǎ lánqiú'], ['游泳', 'úszik', 'yóuyǒng'],
        ['唱歌', 'énekel', 'chànggē'], ['跳舞', 'táncol', 'tiàowǔ'], ['画画', 'rajzol', 'huàhuà'], ['听', 'hallgat', 'tīng'],
        ['音乐', 'zene', 'yīnyuè'], ['电影', 'film', 'diànyǐng'], ['玩', 'játszik', 'wán'], ['游戏', 'játék', 'yóuxì'],
        ['电脑', 'számítógép', 'diànnǎo'], ['周末', 'hétvége', 'zhōumò'], ['一起', 'együtt', 'yīqǐ'],
        ['会', 'tud (valamit csinálni)', 'huì'], ['了', 'a megtörtént cselekvés szócskája', 'le']
      ],
      sentences: [
        ['我 的 爱好 是 踢足球。', 'A hobbim a focizás.', [], ['Az én hobbim a focizás.', 'A hobbim a foci.']],
        ['周末 我 打篮球。', 'Hétvégén kosarazom.', [], ['Hétvégén kosarazok.', 'Hétvégén kosárlabdázom.', 'Hétvégén kosárlabdázok.']],
        ['我 喜欢 听 音乐。', 'Szeretek zenét hallgatni.', [], ['Szeretem hallgatni a zenét.']],
        ['你 会 游泳 吗？', 'Tudsz úszni?', [], []],
        ['我 会 唱歌。', 'Tudok énekelni.', [], []],
        ['妹妹 喜欢 画画。', 'A húgom szeret rajzolni.', [], ['Húgom szeret rajzolni.']],
        ['我们 一起 跳舞。', 'Együtt táncolunk.', [], ['Mi együtt táncolunk.']],
        ['弟弟 玩 电脑 游戏。', 'Az öcsém számítógépes játékot játszik.', [], ['Az öcsém számítógépezik.', 'Az öcsém számítógépes játékokkal játszik.']],
        ['我 昨天 看 电影 了。', 'Tegnap filmet néztem.', [], ['Tegnap néztem egy filmet.', 'Tegnap megnéztem egy filmet.']],
        ['我 吃 了 两 个 苹果。', 'Megettem két almát.', [], ['Két almát ettem.', 'Ettem két almát.']],
        ['昨天 我 没 去 学校。', 'Tegnap nem mentem iskolába.', [], ['Tegnap nem mentem el az iskolába.', 'Tegnap nem voltam iskolában.']],
        ['周末 我 去 公园 了。', 'Hétvégén elmentem a parkba.', [], ['Hétvégén a parkba mentem.', 'Hétvégén a parkban voltam.']]
      ]
    }
  ]
});
