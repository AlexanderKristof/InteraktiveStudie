/* Koreai nyelvtanfolyam (A1–A2) – 10 egység. A szavak hangul betűsek, a 3. elem a hivatalos átírás (Revised Romanization). */
STUDIE.addLangCourse({
  id: 'koreai', title: 'Koreai', flag: '🇰🇷', tts: 'ko-KR', badge: 'A1–A2',
  noSpaces: false, script: true,
  intro: 'A koreai ábécét, a hangult egy király találta ki 1443-ban, és olyan logikus, hogy egy délután alatt meg lehet tanulni – a mondatok pedig a magyarhoz hasonlóan „ragokkal” épülnek, és az ige a végére kerül!',
  units: [
    {
      id: 'koszones', title: 'Hangul és köszönés', icon: '👋',
      tip: 'A **hangult** Szedzsong király (Sejong) és tudósai alkották meg 1443-ban, hogy az egyszerű emberek is megtanulhassanak írni. Az alapábécé **14 mássalhangzóból és 10 magánhangzóból** áll.\n\n' +
        '- A mássalhangzók a **szájformát** rajzolják le: ㄱ (g/k) a nyelv hátulját, ㄴ (n) a nyelv hegyét, ㅁ (m) a csukott szájat, ㅅ (s/sz) a fogat, ㅇ a torkot.\n' +
        '- A magánhangzók három elemből épülnek: pont/rövid vonás (ég), ㅡ (föld), ㅣ (ember): ㅏ a, ㅓ eo (nyílt o), ㅗ o, ㅜ u, ㅡ eu (ajakkerekítés nélküli u), ㅣ i.\n\n' +
        'A betűket **szótagblokkokba** rendezik: 한 = ㅎ + ㅏ + ㄴ (han), 국 = ㄱ + ㅜ + ㄱ (guk) → 한국 = Korea. Ha a szótag magánhangzóval kezdődik, néma ㅇ áll elöl: 안 = an, 아 = a.\n\n' +
        'Az átírásban **j** = dzs, **ch** = erős cs, **s** ≈ sz, **eo** ≈ nyílt o, **eu** ≈ ü és u között. Válaszként az átírást is beírhatod (pl. annyeonghaseyo).\n\n' +
        'A `안녕하세요` mindenkinek jó, a `안녕` csak barátnak. Búcsúzáskor a távozónak `안녕히 가세요` (menj békével), a maradónak `안녕히 계세요` (maradj békével) jár.',
      words: [
        ['안녕하세요', 'jó napot / szia (udvarias)', 'annyeonghaseyo'], ['안녕', 'szia (barátnak)', 'annyeong'], ['안녕히 가세요', 'viszontlátásra (a távozónak)', 'annyeonghi gaseyo'],
        ['안녕히 계세요', 'viszontlátásra (a maradónak)', 'annyeonghi gyeseyo'], ['감사합니다', 'köszönöm', 'gamsahamnida'], ['고마워요', 'köszi', 'gomawoyo'],
        ['네', 'igen', 'ne'], ['아니요', 'nem', 'aniyo'], ['죄송합니다', 'elnézést kérek', 'joesonghamnida'], ['미안해요', 'bocsánat, sajnálom', 'mianhaeyo'],
        ['괜찮아요', 'semmi baj, rendben van', 'gwaenchanayo'], ['반갑습니다', 'örülök a találkozásnak', 'bangapseumnida'], ['잘 자요', 'jó éjszakát', 'jal jayo'],
        ['또 만나요', 'majd találkozunk', 'tto mannayo'], ['천만에요', 'szívesen (köszönetre)', 'cheonmaneyo'], ['여보세요', 'halló (telefonon)', 'yeoboseyo'], ['좋아요', 'jó; tetszik', 'joayo']
      ],
      sentences: [
        ['안녕하세요!', 'Jó napot!', [], ['Szia!', 'Jó napot kívánok!', 'Üdvözlöm!']],
        ['안녕하세요, 선생님!', 'Jó napot, tanár úr!', [], ['Jó napot, tanárnő!', 'Jó napot kívánok, tanár úr!', 'Jó napot kívánok, tanárnő!']],
        ['감사합니다.', 'Köszönöm.', ['고맙습니다.'], ['Köszönöm szépen.']],
        ['네, 감사합니다.', 'Igen, köszönöm.', ['네, 고맙습니다.'], ['Igen, köszönöm szépen.']],
        ['아니요, 괜찮아요.', 'Nem, köszönöm.', [], ['Nem, semmi baj.', 'Nem, rendben van.', 'Nem kell, köszönöm.']],
        ['죄송합니다.', 'Elnézést kérek.', ['죄송해요.'], ['Bocsánat.', 'Elnézést.', 'Bocsánatot kérek.']],
        ['괜찮아요.', 'Semmi baj.', [], ['Rendben van.', 'Nem baj.', 'Minden rendben.']],
        ['반갑습니다!', 'Örülök a találkozásnak!', ['반가워요!'], ['Örvendek!', 'Örülök, hogy találkoztunk!', 'Örülök, hogy megismerhetem!']],
        ['안녕히 가세요!', 'Viszontlátásra!', ['안녕히 계세요!'], ['Viszlát!']],
        ['안녕히 계세요!', 'Viszontlátásra!', ['안녕히 가세요!'], ['Viszlát!']],
        ['잘 자요!', 'Jó éjszakát!', [], ['Jó éjt!', 'Aludj jól!']],
        ['또 만나요!', 'Majd találkozunk!', [], ['Viszlát!', 'Még találkozunk!']],
        ['천만에요.', 'Szívesen.', [], ['Nincs mit.']],
        ['여보세요?', 'Halló?', [], []]
      ]
    },
    {
      id: 'bemutatkozas', title: 'Bemutatkozás', icon: '🙋',
      tip: '**Udvariassági szintek:** a koreai igevégződés mutatja, mennyire vagy udvarias. Kezdőként a **-요 végű** alakot tanuld (`해요`, `있어요`): ez kedves és udvarias, szinte mindenkivel jó. A `-습니다` (`감사합니다`) még hivatalosabb, a -요 nélküli alak (`안녕`) bizalmas.\n\n' +
        '**„Vagyok, van” = -이에요 / -예요.** Mássalhangzóra végződő szó után `이에요`, magánhangzó után `예요`: `학생이에요` (diák vagyok), `가수예요` (énekes). Tagadva: `가수가 아니에요` (nem énekes).\n\n' +
        '**Témajelölő 은/는:** azt jelöli, akiről/amiről szól a mondat – kb. „ami engem illet”. Mássalhangzó után `은`, magánhangzó után `는`: `선생님은`, `저는`.\n\n' +
        '**Batchim** a szótag alján álló mássalhangzó (학 alján ㄱ). Ha utána magánhangzó jön, átköltözik: `학생이에요` ≈ hak-szeng-i-e-jo, `이름이` ≈ i-reu-mi.\n\n' +
        'Az alanyt gyakran elhagyják, mint nálunk. **저** = én (udvarias), **나** = én (bizalmas), **제** = az én …-m.',
      words: [
        ['저', 'én (udvarias)', 'jeo'], ['나', 'én (bizalmas)', 'na'], ['제', 'az én …-m (udvarias)', 'je'], ['이름', 'név', 'ireum'], ['학생', 'diák', 'haksaeng'],
        ['선생님', 'tanár', 'seonsaengnim'], ['친구', 'barát', 'chingu'], ['사람', 'ember', 'saram'], ['한국', 'Korea', 'Hanguk'], ['헝가리', 'Magyarország', 'Heonggari'],
        ['한국 사람', 'koreai (ember)', 'Hanguk saram'], ['헝가리 사람', 'magyar (ember)', 'Heonggari saram'], ['누구', 'ki?', 'nugu'], ['뭐', 'mi?', 'mwo'],
        ['이거', 'ez (a dolog)', 'igeo'], ['가수', 'énekes', 'gasu'], ['배우', 'színész', 'baeu'], ['의사', 'orvos', 'uisa']
      ],
      sentences: [
        ['저는 안나예요.', 'Anna vagyok.', ['제 이름은 안나예요.'], ['Én Anna vagyok.', 'Annának hívnak.', 'A nevem Anna.']],
        ['이름이 뭐예요?', 'Mi a neved?', [], ['Hogy hívnak?', 'Mi a neve?', 'Hogy hívják?']],
        ['저는 학생이에요.', 'Diák vagyok.', ['학생이에요.'], ['Én diák vagyok.']],
        ['저는 헝가리 사람이에요.', 'Magyar vagyok.', ['헝가리 사람이에요.'], ['Én magyar vagyok.']],
        ['민수는 한국 사람이에요.', 'Minszu koreai.', [], ['Minszu koreai ember.']],
        ['누구예요?', 'Ki az?', [], ['Ki ez?', 'Kicsoda?']],
        ['제 친구예요.', 'Ő a barátom.', [], ['A barátom.', 'Ez a barátom.']],
        ['선생님은 한국 사람이에요?', 'A tanár koreai?', [], ['A tanár úr koreai?', 'A tanárnő koreai?']],
        ['네, 한국 사람이에요.', 'Igen, koreai.', [], ['Igen, ő koreai.']],
        ['이거 뭐예요?', 'Mi ez?', ['이게 뭐예요?'], ['Ez mi?']],
        ['지민은 가수예요.', 'Dzsimin énekes.', [], []],
        ['저는 배우가 아니에요.', 'Nem vagyok színész.', ['배우가 아니에요.'], ['Én nem vagyok színész.']],
        ['만나서 반갑습니다.', 'Örülök, hogy megismerhetem.', ['만나서 반가워요.'], ['Örvendek.', 'Örülök, hogy megismerhetlek.', 'Örülök a találkozásnak.']]
      ]
    },
    {
      id: 'szamok', title: 'Számok', icon: '🔢',
      tip: 'A koreaiban **két számsor** van!\n\n' +
        '- **Koreai (natív) számok:** 하나, 둘, 셋, 넷, 다섯, 여섯, 일곱, 여덟, 아홉, 열 – ezekkel **darabot, embert, életkort és órát** mondunk. 11 = 열하나, 15 = 열다섯.\n' +
        '- **Kínai eredetű (sino-koreai) számok:** 일, 이, 삼, 사, 오, 육, 칠, 팔, 구, 십, 백 (100), 천 (1000) – ezekkel **pénzt, dátumot, percet, telefonszámot** mondunk. 30 = 삼십 (három-tíz), 3000 = 삼천.\n\n' +
        '**Számlálószók:** a szám után egy kis szó áll, ami megmondja, mit számolunk: `개` (darab), `명` (fő), `살` (év – életkor), `원` (von, a koreai pénz), `잔` (pohár, csésze).\n\n' +
        'Számlálószó előtt az 1–4 és a 20 rövidül: 하나 → `한`, 둘 → `두`, 셋 → `세`, 넷 → `네`: `한 개`, `두 잔`, `열네 살` (14 éves).\n\n' +
        'Érdekes: a szám a főnév **után** jön: `사과 두 개` = szó szerint „alma két darab”. Kérés: `… 주세요` = … kérek (adja, kérem).',
      words: [
        ['하나', 'egy', 'hana'], ['둘', 'kettő', 'dul'], ['셋', 'három', 'set'], ['넷', 'négy', 'net'], ['다섯', 'öt', 'daseot'], ['여섯', 'hat', 'yeoseot'], ['일곱', 'hét (szám)', 'ilgop'],
        ['여덟', 'nyolc', 'yeodeol'], ['아홉', 'kilenc', 'ahop'], ['열', 'tíz', 'yeol'], ['일', 'egy (kínai eredetű)', 'il'], ['삼', 'három (kínai eredetű)', 'sam'], ['십', 'tíz (kínai eredetű)', 'sip'],
        ['백', 'száz', 'baek'], ['천', 'ezer', 'cheon'], ['살', 'év (életkor)', 'sal'], ['원', 'von (koreai pénz)', 'won'], ['몇', 'hány?', 'myeot'], ['얼마', 'mennyi? (ár)', 'eolma'], ['주세요', 'kérek (adja, kérem)', 'juseyo']
      ],
      sentences: [
        ['하나, 둘, 셋!', 'Egy, kettő, három!', [], ['Egy, két, három!']],
        ['몇 살이에요?', 'Hány éves vagy?', [], ['Hány éves?', 'Te hány éves vagy?']],
        ['저는 열다섯 살이에요.', 'Tizenöt éves vagyok.', ['열다섯 살이에요.'], ['Én tizenöt éves vagyok.']],
        ['저는 열네 살이에요.', 'Tizennégy éves vagyok.', ['열네 살이에요.'], ['Én tizennégy éves vagyok.']],
        ['민수는 열세 살이에요.', 'Minszu tizenhárom éves.', [], []],
        ['지민은 몇 살이에요?', 'Hány éves Dzsimin?', [], ['Dzsimin hány éves?']],
        ['사과 하나 주세요.', 'Egy almát kérek.', ['사과 한 개 주세요.'], ['Kérek egy almát.']],
        ['사과 두 개 주세요.', 'Két almát kérek.', [], ['Kérek két almát.']],
        ['커피 두 잔 주세요.', 'Két kávét kérek.', [], ['Kérek két kávét.']],
        ['이거 얼마예요?', 'Mennyibe kerül ez?', ['이게 얼마예요?'], ['Ez mennyibe kerül?', 'Mennyi ez?']],
        ['삼천 원이에요.', 'Háromezer von.', [], ['Háromezer vonba kerül.', 'Ez háromezer von.']],
        ['일, 이, 삼, 사, 오.', 'Egy, kettő, három, négy, öt.', [], []]
      ]
    },
    {
      id: 'csalad', title: 'Család', icon: '👨‍👩‍👧',
      tip: '**Alanyjelölő 이/가:** az alanyt jelöli, főleg új információnál és a `있어요` (van) / `없어요` (nincs) előtt. Mássalhangzó után `이`, magánhangzó után `가`: `동생이 있어요` (van kistestvérem), `언니가 없어요` (nincs nővérem). Figyeld meg: a koreai nem mondja, hogy „-m”, a birtokost érteni kell!\n\n' +
        '**은/는 vagy 이/가?** A 은/는 a témát (és szembeállítást) jelöli: `고양이는 없어요` = macskám (az) nincs – de másom talán van.\n\n' +
        '**Testvérek:** a koreaiban a szó attól is függ, ki beszél!\n\n' +
        '- fiú mondja: báty = `형`, nővér = `누나`\n' +
        '- lány mondja: báty = `오빠`, nővér = `언니`\n' +
        '- öcs vagy húg egyaránt: `동생`\n\n' +
        'A K-drámákban a lányok az idősebb fiúbarátjukat is `오빠`-nak hívják!\n\n' +
        '**우리** = mi, de a saját családra is ezt mondják: `우리 엄마` = szó szerint „a mi anyukánk” – az anyukám.\n\n' +
        'Embereket a `명` számlálószóval számolunk: `두 명` = két fő.',
      words: [
        ['가족', 'család', 'gajok'], ['엄마', 'anya (anyu)', 'eomma'], ['아빠', 'apa (apu)', 'appa'], ['어머니', 'édesanya (udvariasabb)', 'eomeoni'], ['아버지', 'édesapa (udvariasabb)', 'abeoji'],
        ['형', 'báty (fiú mondja)', 'hyeong'], ['오빠', 'báty (lány mondja)', 'oppa'], ['누나', 'nővér (fiú mondja)', 'nuna'], ['언니', 'nővér (lány mondja)', 'eonni'], ['동생', 'öcs vagy húg (kistestvér)', 'dongsaeng'],
        ['할머니', 'nagymama', 'halmeoni'], ['할아버지', 'nagypapa', 'harabeoji'], ['강아지', 'kutyus (kiskutya)', 'gangaji'], ['고양이', 'macska', 'goyangi'],
        ['있어요', 'van (valakinek, valahol)', 'isseoyo'], ['없어요', 'nincs', 'eopseoyo'], ['명', 'fő (embereket számlál)', 'myeong'], ['우리', 'mi; a mi …-nk', 'uri']
      ],
      sentences: [
        ['우리 가족이에요.', 'Ez a családom.', [], ['Ez a mi családunk.', 'Ez a családunk.']],
        ['언니가 있어요.', 'Van egy nővérem.', [], ['Van nővérem.']],
        ['동생이 없어요.', 'Nincs kistestvérem.', [], ['Nincs testvérem.', 'Nincs öcsém vagy húgom.']],
        ['우리 엄마는 의사예요.', 'Az anyukám orvos.', ['엄마는 의사예요.'], ['Anyukám orvos.', 'Anyám orvos.', 'Az anyám orvos.', 'Anya orvos.']],
        ['강아지가 있어요?', 'Van kutyád?', [], ['Van kiskutyád?', 'Van kutyája?', 'Van kutyátok?']],
        ['네, 강아지가 있어요.', 'Igen, van kutyám.', [], ['Igen, van kiskutyám.', 'Igen, van kutyánk.']],
        ['고양이는 없어요.', 'Macskám nincs.', [], ['Macskánk nincs.', 'Nincs macskám.']],
        ['형이 두 명 있어요.', 'Két bátyám van.', [], ['Van két bátyám.']],
        ['우리 할아버지는 선생님이에요.', 'A nagypapám tanár.', ['할아버지는 선생님이에요.'], ['Nagypapám tanár.', 'A nagyapám tanár.']],
        ['오빠는 가수예요.', 'A bátyám énekes.', [], ['Bátyám énekes.']],
        ['가족이 몇 명이에요?', 'Hányan vagytok a családban?', [], ['Hány tagú a családod?', 'Hányan vannak a családjában?']],
        ['네 명이에요.', 'Négyen vagyunk.', [], ['Négy főből áll.', 'Négyen.']]
      ]
    },
    {
      id: 'iskola', title: 'Iskola és tárgyak', icon: '🏫',
      tip: '**Szórend: alany – tárgy – ige (SOV)**, akárcsak a magyarban gyakran! Az ige mindig a mondat végén áll: `저는 한국어를 공부해요.` = Én koreait tanulok.\n\n' +
        '**A partikulák olyanok, mint a magyar ragok** – a szó után állnak, és megmondják a szerepét:\n\n' +
        '- `은/는` – téma (… pedig, ami … illeti)\n' +
        '- `이/가` – alany\n' +
        '- `을/를` – tárgy, mint a **-t**: `한국어를` (koreait), `책을` (könyvet). Mássalhangzó után `을`, magánhangzó után `를`.\n' +
        '- `에` – hely, mint a **-ban/-ben, -n**: `가방에` (a táskában), `교실에` (a teremben)\n\n' +
        '**Hol van?** = `어디 있어요?` (vagy `어디예요?`). Válasz: `여기 있어요.` = Itt van (tessék).\n\n' +
        'A `-해요` végű igék a „csinál” igéből jönnek: `공부` (tanulás) + `해요` = tanulok. Beszélt nyelvben a partikulát néha elhagyják: `이거 뭐예요?`',
      words: [
        ['학교', 'iskola', 'hakgyo'], ['교실', 'osztályterem', 'gyosil'], ['책', 'könyv', 'chaek'], ['공책', 'füzet', 'gongchaek'], ['연필', 'ceruza', 'yeonpil'], ['가방', 'táska', 'gabang'],
        ['책상', 'íróasztal (pad)', 'chaeksang'], ['의자', 'szék', 'uija'], ['컴퓨터', 'számítógép', 'keompyuteo'], ['핸드폰', 'mobiltelefon', 'haendeupon'], ['숙제', 'házi feladat', 'sukje'],
        ['시험', 'dolgozat (vizsga)', 'siheom'], ['한국어', 'koreai nyelv', 'hangugeo'], ['영어', 'angol nyelv', 'yeongeo'], ['수학', 'matematika', 'suhak'], ['공부해요', 'tanul (tanulok)', 'gongbuhaeyo'],
        ['어려워요', 'nehéz', 'eoryeowoyo'], ['쉬워요', 'könnyű', 'swiwoyo'], ['어디', 'hol?', 'eodi'], ['여기', 'itt', 'yeogi']
      ],
      sentences: [
        ['책이 어디 있어요?', 'Hol van a könyv?', ['책은 어디 있어요?', '책이 어디에 있어요?'], ['Hol a könyv?', 'Hol van a könyvem?']],
        ['여기 있어요.', 'Itt van.', [], ['Tessék.', 'Itt.']],
        ['가방에 공책이 있어요.', 'A táskában van egy füzet.', [], ['A táskában van füzet.', 'Van egy füzet a táskában.']],
        ['저는 한국어를 공부해요.', 'Koreaiul tanulok.', ['한국어를 공부해요.'], ['Koreait tanulok.', 'Én koreaiul tanulok.', 'Én koreait tanulok.', 'Koreai nyelvet tanulok.']],
        ['수학은 어려워요.', 'A matek nehéz.', [], ['A matematika nehéz.']],
        ['영어는 쉬워요.', 'Az angol könnyű.', [], ['Az angol nyelv könnyű.']],
        ['숙제가 있어요?', 'Van házi feladat?', [], ['Van házid?', 'Van leckéd?', 'Van házi feladatod?']],
        ['시험이 어려워요.', 'A dolgozat nehéz.', [], ['Nehéz a dolgozat.', 'A vizsga nehéz.']],
        ['연필이 없어요.', 'Nincs ceruzám.', [], ['Nincs ceruza.']],
        ['이거 제 핸드폰이에요.', 'Ez az én telefonom.', ['이건 제 핸드폰이에요.'], ['Ez a telefonom.', 'Ez az én mobilom.', 'Ez a mobilom.']],
        ['교실에 컴퓨터가 있어요.', 'Az osztályteremben van számítógép.', [], ['Van számítógép az osztályteremben.', 'A teremben van számítógép.', 'Az osztályteremben van egy számítógép.']],
        ['학교가 어디 있어요?', 'Hol van az iskola?', ['학교가 어디예요?', '학교는 어디 있어요?'], ['Hol az iskola?']]
      ]
    },
    {
      id: 'etel', title: 'Étel és ital', icon: '🍜',
      tip: '**Igék -아요/-어요 alakja.** A szótári alak `-다` végű: 먹다 (enni), 가다 (menni). A -다 helyére tesszük a végződést:\n\n' +
        '- ha a tő utolsó magánhangzója **ㅏ vagy ㅗ** → `-아요`: 좋다 → `좋아요`, 가다 → `가요` (가 + 아요 összeolvad)\n' +
        '- minden más esetben → `-어요`: 먹다 → `먹어요`, 마시다 → `마셔요` (시 + 어 = 셔)\n' +
        '- a `하다` (csinál) mindig → `해요`: 좋아하다 → `좋아해요`\n\n' +
        'Ugyanaz az alak jelent „eszem, eszel, eszik, eszünk…” – a személyt a helyzetből (vagy az alanyból) értjük. Kérdéshez csak emeld a hangod: `먹어요?` = Eszel?\n\n' +
        '**좋아요 vagy 좋아해요?** `좋아요` = jó/tetszik, `좋아해요` = szeretek valamit: `김치를 좋아해요.` = Szeretem a kimcsit.\n\n' +
        'Evés előtt a koreaiak ezt mondják: `잘 먹겠습니다!` (jó étvágyat magamnak, kb. „köszönöm az ételt”), a vendéglátó pedig: `맛있게 드세요!` = Jó étvágyat!',
      words: [
        ['밥', 'főtt rizs; étel', 'bap'], ['물', 'víz', 'mul'], ['우유', 'tej', 'uyu'], ['커피', 'kávé', 'keopi'], ['차', 'tea', 'cha'], ['주스', 'gyümölcslé', 'juseu'], ['빵', 'kenyér', 'ppang'],
        ['사과', 'alma', 'sagwa'], ['김치', 'kimcsi (savanyított, csípős káposzta)', 'gimchi'], ['라면', 'ramen (instant tészta)', 'ramyeon'], ['떡볶이', 'tteokbokki (csípős rizsrudacska)', 'tteokbokki'],
        ['고기', 'hús', 'gogi'], ['먹어요', 'eszik (eszem)', 'meogeoyo'], ['마셔요', 'iszik (iszom)', 'masyeoyo'], ['좋아해요', 'szeret (kedvel)', 'joahaeyo'], ['맛있어요', 'finom', 'masisseoyo'],
        ['매워요', 'csípős', 'maewoyo'], ['배고파요', 'éhes vagyok', 'baegopayo']
      ],
      sentences: [
        ['저는 김치를 좋아해요.', 'Szeretem a kimcsit.', ['김치를 좋아해요.'], ['Én szeretem a kimcsit.']],
        ['물을 마셔요.', 'Vizet iszom.', ['저는 물을 마셔요.'], ['Vizet iszik.', 'Vizet iszol.', 'Én vizet iszom.']],
        ['빵을 먹어요.', 'Kenyeret eszem.', ['저는 빵을 먹어요.'], ['Kenyeret eszik.', 'Kenyeret eszel.', 'Én kenyeret eszem.']],
        ['라면이 맛있어요.', 'A ramen finom.', ['라면은 맛있어요.'], ['Finom a ramen.']],
        ['떡볶이는 매워요.', 'A tteokbokki csípős.', ['떡볶이가 매워요.'], ['Csípős a tteokbokki.']],
        ['배고파요.', 'Éhes vagyok.', [], []],
        ['우유를 마셔요?', 'Tejet iszol?', [], ['Iszol tejet?', 'Tejet iszik?']],
        ['네, 우유를 좋아해요.', 'Igen, szeretem a tejet.', [], []],
        ['사과 주스 주세요.', 'Almalét kérek.', [], ['Almalevet kérek.', 'Kérek almalét.', 'Kérek almalevet.']],
        ['고기를 먹어요?', 'Eszel húst?', [], ['Húst eszel?', 'Eszik húst?']],
        ['정말 맛있어요!', 'Nagyon finom!', [], ['Tényleg finom!', 'Igazán finom!']],
        ['맛있게 드세요!', 'Jó étvágyat!', [], []]
      ]
    },
    {
      id: 'ido', title: 'Idő és napok', icon: '📅',
      tip: '**A hét napjai** mind `-요일` végűek, és a régi kínai „öt elemből” plusz a Napból és a Holdból jönnek:\n\n' +
        '- 월 (Hold) – hétfő, 화 (tűz) – kedd, 수 (víz) – szerda, 목 (fa) – csütörtök, 금 (arany) – péntek, 토 (föld) – szombat, 일 (Nap) – vasárnap\n\n' +
        '**Időpont + 에** – mint a magyar **-kor, -n**: `월요일에` (hétfőn), `아침에` (reggel), `주말에` (hétvégén). Az `오늘, 내일, 어제, 지금` mellé nem kell 에.\n\n' +
        '**Hány óra?** `몇 시예요?` Az órát **koreai** számmal, a percet **kínai eredetű** számmal mondjuk:\n\n' +
        '- `세 시` = 3 óra, `일곱 시 삼십 분` = 7 óra 30 perc\n' +
        '- `반` = fél, de vigyázz: `일곱 시 반` = „hét és fél” = **fél nyolc**!\n\n' +
        'Az `아침, 점심, 저녁` napszakot és étkezést is jelent: `점심` = dél és ebéd is.',
      words: [
        ['오늘', 'ma', 'oneul'], ['내일', 'holnap', 'naeil'], ['어제', 'tegnap', 'eoje'], ['지금', 'most', 'jigeum'], ['아침', 'reggel; reggeli', 'achim'], ['점심', 'dél; ebéd', 'jeomsim'],
        ['저녁', 'este; vacsora', 'jeonyeok'], ['주말', 'hétvége', 'jumal'], ['월요일', 'hétfő', 'woryoil'], ['화요일', 'kedd', 'hwayoil'], ['수요일', 'szerda', 'suyoil'], ['목요일', 'csütörtök', 'mogyoil'],
        ['금요일', 'péntek', 'geumyoil'], ['토요일', 'szombat', 'toyoil'], ['일요일', 'vasárnap', 'iryoil'], ['시', 'óra (időpont)', 'si'], ['분', 'perc', 'bun'], ['반', 'fél (fél óra)', 'ban'], ['시간', 'idő', 'sigan']
      ],
      sentences: [
        ['오늘은 월요일이에요.', 'Ma hétfő van.', [], ['Ma hétfő.']],
        ['내일은 금요일이에요.', 'Holnap péntek lesz.', [], ['Holnap péntek van.', 'Holnap péntek.']],
        ['지금 몇 시예요?', 'Hány óra van most?', ['몇 시예요?'], ['Most hány óra van?', 'Mennyi az idő?', 'Hány óra van?']],
        ['세 시예요.', 'Három óra van.', [], ['Három óra.']],
        ['일곱 시 삼십 분이에요.', 'Hét óra harminc perc van.', ['일곱 시 반이에요.'], ['Fél nyolc van.', 'Hét óra harminc van.', 'Hét harminc van.']],
        ['주말에 시간 있어요?', 'Ráérsz hétvégén?', ['주말에 시간이 있어요?'], ['Van időd hétvégén?', 'Ráér hétvégén?', 'Van ideje hétvégén?']],
        ['토요일에 친구를 만나요.', 'Szombaton találkozom a barátommal.', [], ['Szombaton találkozom egy barátommal.', 'Szombaton a barátommal találkozom.']],
        ['아침에 우유를 마셔요.', 'Reggel tejet iszom.', [], ['Reggelente tejet iszom.']],
        ['저녁에 숙제를 해요.', 'Este megcsinálom a házit.', [], ['Este írom a házit.', 'Este megcsinálom a házi feladatot.', 'Este leckét írok.', 'Este írom a leckét.']],
        ['일요일에 뭐 해요?', 'Mit csinálsz vasárnap?', [], ['Vasárnap mit csinálsz?', 'Mit csinál vasárnap?']],
        ['수요일에 시험이 있어요.', 'Szerdán dolgozat lesz.', [], ['Szerdán dolgozatot írunk.', 'Szerdán lesz dolgozat.', 'Szerdán vizsgám van.']],
        ['오늘 점심은 라면이에요.', 'Ma ramen az ebéd.', [], ['Ma ramen lesz ebédre.', 'Ma ramen van ebédre.']]
      ]
    },
    {
      id: 'varos', title: 'Város és közlekedés', icon: '🚇',
      tip: '**에 = -ba/-be és -ban/-ben is!** A koreai `에` irányt és helyet is jelöl:\n\n' +
        '- `학교에 가요.` = Iskolába megyek.\n' +
        '- `학교에 있어요.` = Az iskolában van.\n\n' +
        '**에서 = ahol a cselekvés történik** (-ban/-ben, ha valamit csinálunk ott): `식당에서 먹어요.` = Az étteremben eszem.\n\n' +
        '**Közlekedés:** a koreai „felszáll a buszra” – tárgyraggal: `버스를 타요` = busszal megyek. Eszközzel: `(으)로` = -val/-vel: `택시로 가요.` = Taxival megyek.\n\n' +
        '**Merre?** `왼쪽` = bal oldal, `오른쪽` = jobb oldal: `오른쪽에 있어요.` = Jobbra van.\n\n' +
        'Tipp Szöulhoz: a metró (`지하철`) szuper, minden állomás (`역`) neve ki van írva hangullal és latin betűvel, és a `편의점` (éjjel-nappali kisbolt) szinte minden sarkon ott van – a K-drámák kedvenc helyszíne!',
      words: [
        ['집', 'ház; otthon', 'jip'], ['방', 'szoba', 'bang'], ['화장실', 'mosdó (WC)', 'hwajangsil'], ['식당', 'étterem', 'sikdang'], ['카페', 'kávézó', 'kape'], ['편의점', 'éjjel-nappali kisbolt', 'pyeonuijeom'],
        ['병원', 'kórház', 'byeongwon'], ['역', 'állomás', 'yeok'], ['지하철', 'metró', 'jihacheol'], ['버스', 'busz', 'beoseu'], ['택시', 'taxi', 'taeksi'], ['가요', 'megy (megyek)', 'gayo'],
        ['와요', 'jön (jövök)', 'wayo'], ['타요', 'felszáll, utazik (járművel)', 'tayo'], ['멀어요', 'messze van', 'meoreoyo'], ['가까워요', 'közel van', 'gakkawoyo'], ['왼쪽', 'bal oldal', 'oenjjok'], ['오른쪽', 'jobb oldal', 'oreunjjok']
      ],
      sentences: [
        ['화장실이 어디예요?', 'Hol van a mosdó?', ['화장실이 어디 있어요?', '화장실은 어디예요?'], ['Hol a mosdó?', 'Hol van a WC?']],
        ['저는 학교에 가요.', 'Iskolába megyek.', ['학교에 가요.'], ['Megyek az iskolába.', 'Én iskolába megyek.', 'Az iskolába megyek.']],
        ['지하철을 타요.', 'Metróval megyek.', ['저는 지하철을 타요.'], ['Metróval utazom.', 'Felszállok a metróra.', 'Metrózok.']],
        ['버스를 타요?', 'Busszal mész?', [], ['Busszal utazol?', 'Busszal megy?', 'Busszal mentek?']],
        ['택시로 가요.', 'Taxival megyek.', [], ['Taxival megyünk.', 'Taxival megy.']],
        ['집이 멀어요.', 'Messze van az otthonom.', [], ['Messze lakom.', 'Az otthonom messze van.', 'Messze van a házunk.']],
        ['역은 가까워요.', 'Az állomás közel van.', ['역이 가까워요.'], ['Közel van az állomás.']],
        ['편의점은 오른쪽에 있어요.', 'A kisbolt jobbra van.', ['편의점이 오른쪽에 있어요.'], ['A kisbolt jobb oldalon van.', 'Jobbra van a kisbolt.', 'Az éjjel-nappali jobbra van.']],
        ['병원은 왼쪽에 있어요.', 'A kórház balra van.', ['병원이 왼쪽에 있어요.'], ['A kórház bal oldalon van.', 'Balra van a kórház.']],
        ['친구가 우리 집에 와요.', 'A barátom hozzánk jön.', [], ['A barátom eljön hozzánk.', 'Egy barátom hozzánk jön.']],
        ['식당에서 밥을 먹어요.', 'Az étteremben eszem.', [], ['Étteremben eszem.', 'Az étteremben eszünk.', 'Étteremben eszünk.']],
        ['제 방이에요.', 'Ez az én szobám.', [], ['Ez a szobám.']]
      ]
    },
    {
      id: 'hobbi', title: 'Hobbi és K-pop', icon: '🎤',
      tip: '**Tagadás: 안 + ige.** Egyszerűen tedd az ige elé: `마셔요` (iszom) → `안 마셔요` (nem iszom), `가요` → `안 가요` (nem megyek).\n\n' +
        'A `-하다` igéknél a 안 a főnév és a `해요` közé kerül: `운동해요` → `운동 안 해요` (nem sportolok), `축구를 해요` → `축구를 안 해요` (nem focizom).\n\n' +
        'Ne keverd: a `아니요` válaszszó (nem), az `아니에요` = nem az (főnév után), a `안` pedig az igét tagadja – mint a magyar „nem”, csak három szóval!\n\n' +
        '**이 / 그 / 저** a főnév előtt: `이 영화` = ez a film, `그 노래` = az a dal (amiről beszélünk), `저 가수` = az az énekes (ott).\n\n' +
        '**Együtt csináljuk!** A -요 alak felszólításként is működik: `같이 봐요!` = Nézzük együtt!\n\n' +
        'K-pop szótár: a rajongó `팬`, a „Fighting!” biztatás koreaiul `화이팅!`, a „szívecske” kézjel pedig `손하트`.',
      words: [
        ['케이팝', 'K-pop', 'keipap'], ['음악', 'zene', 'eumak'], ['노래', 'dal; ének', 'norae'], ['춤', 'tánc', 'chum'], ['춤춰요', 'táncol', 'chumchwoyo'], ['영화', 'film', 'yeonghwa'],
        ['드라마', 'sorozat (dráma)', 'deurama'], ['봐요', 'néz', 'bwayo'], ['들어요', 'hallgat (zenét)', 'deureoyo'], ['게임', 'videojáték', 'geim'], ['축구', 'foci', 'chukgu'],
        ['운동해요', 'sportol', 'undonghaeyo'], ['읽어요', 'olvas', 'ilgeoyo'], ['그림', 'rajz; kép', 'geurim'], ['그려요', 'rajzol', 'geuryeoyo'], ['재미있어요', 'érdekes, szórakoztató', 'jaemiisseoyo'],
        ['싫어해요', 'nem szeret (utál)', 'sireohaeyo'], ['같이', 'együtt', 'gachi'], ['안', 'nem (az ige előtt)', 'an'], ['잘해요', 'jól csinál, ügyes benne', 'jalhaeyo']
      ],
      sentences: [
        ['저는 케이팝을 좋아해요.', 'Szeretem a K-popot.', ['케이팝을 좋아해요.'], ['Én szeretem a K-popot.']],
        ['한국 드라마를 봐요.', 'Koreai sorozatokat nézek.', ['저는 한국 드라마를 봐요.'], ['Koreai sorozatot nézek.', 'Koreai drámát nézek.', 'Koreai drámákat nézek.']],
        ['음악을 들어요.', 'Zenét hallgatok.', ['저는 음악을 들어요.'], ['Zenét hallgat.', 'Zenét hallgatsz.']],
        ['저는 축구를 안 해요.', 'Nem focizom.', ['축구를 안 해요.', '저는 축구 안 해요.'], ['Én nem focizom.']],
        ['커피를 안 마셔요.', 'Nem iszom kávét.', ['저는 커피를 안 마셔요.'], ['Kávét nem iszom.']],
        ['이 영화는 재미있어요.', 'Ez a film érdekes.', ['이 영화 재미있어요.'], ['Ez a film szórakoztató.', 'Ez a film jó.']],
        ['같이 춤춰요!', 'Táncoljunk együtt!', [], ['Táncoljunk!']],
        ['게임 좋아해요?', 'Szereted a videojátékokat?', ['게임을 좋아해요?'], ['Szereted a játékokat?', 'Szereti a videojátékokat?']],
        ['아니요, 게임은 싫어해요.', 'Nem, nem szeretem a videojátékokat.', [], ['Nem, utálom a videojátékokat.', 'Nem, a videojátékokat nem szeretem.']],
        ['지민은 노래를 잘해요.', 'Dzsimin jól énekel.', [], ['Dzsimin ügyesen énekel.']],
        ['주말에 같이 영화 봐요!', 'Nézzünk együtt filmet hétvégén!', ['주말에 같이 영화를 봐요!'], ['Hétvégén nézzünk együtt filmet!', 'Hétvégén nézzünk meg együtt egy filmet!']],
        ['저는 책을 읽어요.', 'Könyvet olvasok.', ['책을 읽어요.'], ['Olvasok egy könyvet.', 'Én könyvet olvasok.']],
        ['그림을 그려요.', 'Rajzolok.', [], ['Képet rajzolok.', 'Rajzot készítek.']]
      ]
    },
    {
      id: 'mult', title: 'Múlt idő és tervek', icon: '✈️',
      tip: '**Múlt idő: -았어요 / -었어요.** Ugyanaz a szabály, mint a jelen időnél (-아요/-어요), csak egy `ㅆ` kerül bele:\n\n' +
        '- ㅏ, ㅗ után `-았어요`: 가다 → `갔어요` (mentem), 오다 → `왔어요` (jöttem), 보다 → `봤어요` (láttam)\n' +
        '- máskor `-었어요`: 먹다 → `먹었어요` (ettem), 마시다 → `마셨어요` (ittam)\n' +
        '- 하다 → `했어요` (csináltam)\n\n' +
        'Tagadva: `안` + múlt idő: `안 갔어요` = nem mentem, `숙제를 안 했어요` = nem csináltam meg a házit.\n\n' +
        'Múlt idejű időszavak: `어제` (tegnap), `지난주` (múlt héten), `작년` (tavaly). A `-에` itt is kell: `지난주에`, `작년에`.\n\n' +
        '**Tervek, vágyak: -고 싶어요** = szeretnék …-ni. Az ige tövéhez tesszük: 가다 → `가고 싶어요` (menni szeretnék), 먹다 → `먹고 싶어요` (enni szeretnék), 보다 → `보고 싶어요` – ez azt is jelenti: **hiányzol** (látni szeretnélek), a K-drámák egyik leggyakoribb mondata!',
      words: [
        ['지난주', 'múlt hét', 'jinanju'], ['작년', 'tavaly', 'jangnyeon'], ['다음 주', 'jövő hét', 'daeum ju'], ['갔어요', 'ment (mentem)', 'gasseoyo'], ['왔어요', 'jött (jöttem)', 'wasseoyo'],
        ['먹었어요', 'evett (ettem)', 'meogeosseoyo'], ['마셨어요', 'ivott (ittam)', 'masyeosseoyo'], ['봤어요', 'látott, nézett (láttam)', 'bwasseoyo'], ['했어요', 'csinált (csináltam)', 'haesseoyo'],
        ['만났어요', 'találkozott (találkoztam)', 'mannasseoyo'], ['재미있었어요', 'jó volt (érdekes volt)', 'jaemiisseosseoyo'], ['여행', 'utazás', 'yeohaeng'], ['서울', 'Szöul', 'Seoul'],
        ['바다', 'tenger', 'bada'], ['콘서트', 'koncert', 'konseoteu'], ['사진', 'fénykép', 'sajin'], ['찍었어요', 'lefényképezett (fotóztam)', 'jjigeosseoyo'], ['가고 싶어요', 'menni szeretnék', 'gago sipeoyo'], ['많이', 'sok, sokat', 'mani']
      ],
      sentences: [
        ['어제 친구를 만났어요.', 'Tegnap találkoztam a barátommal.', ['저는 어제 친구를 만났어요.'], ['Tegnap találkoztam egy barátommal.', 'Tegnap a barátommal találkoztam.']],
        ['주말에 영화를 봤어요.', 'Hétvégén megnéztem egy filmet.', ['주말에 영화 봤어요.'], ['Hétvégén filmet néztem.', 'A hétvégén filmet néztem.', 'Hétvégén láttam egy filmet.']],
        ['지난주에 서울에 갔어요.', 'Múlt héten Szöulba mentem.', [], ['Múlt héten elmentem Szöulba.', 'A múlt héten Szöulba mentem.']],
        ['아침에 빵을 먹었어요.', 'Reggel kenyeret ettem.', [], []],
        ['커피를 마셨어요.', 'Kávét ittam.', [], ['Ittam kávét.', 'Ittam egy kávét.']],
        ['콘서트가 정말 재미있었어요!', 'A koncert nagyon jó volt!', ['콘서트 정말 재미있었어요!'], ['Nagyon jó volt a koncert!', 'A koncert tényleg jó volt!']],
        ['사진을 많이 찍었어요.', 'Sok fényképet készítettem.', [], ['Sok fotót csináltam.', 'Sokat fényképeztem.', 'Sok képet csináltam.']],
        ['숙제를 했어요?', 'Megcsináltad a házit?', [], ['Megírtad a házit?', 'Megcsináltad a házi feladatot?', 'Megírtad a leckét?']],
        ['아니요, 숙제를 안 했어요.', 'Nem, nem csináltam meg a házit.', ['아니요, 숙제 안 했어요.'], ['Nem, nem írtam meg a házit.', 'Nem, nem csináltam meg a házi feladatot.', 'Nem, nem írtam meg a leckét.']],
        ['작년에 한국에 왔어요.', 'Tavaly jöttem Koreába.', [], ['Tavaly érkeztem Koreába.', 'Tavaly Koreába jöttem.']],
        ['여행이 재미있었어요.', 'Jó volt az utazás.', ['여행 재미있었어요.'], ['Az utazás jó volt.', 'Az utazás érdekes volt.']],
        ['다음 주에 바다에 가고 싶어요.', 'Jövő héten a tengerhez szeretnék menni.', [], ['Jövő héten tengerpartra szeretnék menni.', 'Jövő héten el akarok menni a tengerhez.', 'Jövő héten a tengerhez akarok menni.']],
        ['저는 한국에 가고 싶어요.', 'Koreába szeretnék menni.', ['한국에 가고 싶어요.'], ['Szeretnék Koreába menni.', 'Koreába akarok menni.', 'El akarok menni Koreába.', 'Én Koreába szeretnék menni.']]
      ]
    }
  ]
});
