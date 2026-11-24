/* Tantárgy: Angol nyelv (alapok, A1–A2 szint, 10–15 éveseknek) */
STUDIE.addSubject({
  id: 'angol',
  stage: 'altalanos',
  title: 'Angol nyelv (alapok)',
  icon: '🇬🇧',
  color: '#e5484d',
  description: 'Köszönés és bemutatkozás, számok és idő, a „to be”, jelen és múlt idők, névelők, többes szám, kérdések, tagadás és hasznos szókincs.',
  intro: 'Az angol a világ egyik legtöbbet használt nyelve: játékokban, videókban, dalokban és az interneten mindenhol találkozol vele. Ebben a tárgyban lépésről lépésre megtanulod az **alapokat**: hogyan köszönj és mutatkozz be, hogyan használd a **„to be”** igét, mikor kell **Present Simple** és mikor **Present Continuous**, hogyan beszélj a **múltról**, és hogyan tegyél fel **kérdéseket**. A példamondatokban az angol szöveg **félkövér**, utána jön a magyar fordítás. Minden leckében van párosító játék is: gyakorolj, amíg hibátlan nem lesz!',
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'koszones',
      title: 'Köszönés, bemutatkozás, számok, idő',
      level: 1, minutes: 15,
      summary: 'Hogyan köszönj, mutatkozz be és kérdezz rá valaki nevére; számok 0-tól 1000-ig; az óra, a napok és a hónapok.',
      tags: ['köszönés', 'hello', 'bemutatkozás', 'számok', 'numbers', 'idő', 'time', 'óra', 'napok', 'hónapok', 'days', 'months', 'what time is it'],
      sections: [
        {
          title: 'Köszönés és elköszönés',
          text: 'Az angolban nincs külön tegező és magázó forma: a **you** mindenkinek szól. A köszönésnél inkább az számít, hogy **barátságos (informal)** vagy **udvarias (formal)** helyzetben vagy.\n\n- **Hello! / Hi!** – Szia! / Helló! (a Hi kötetlenebb)\n- **Good morning!** – Jó reggelt! (kb. délig)\n- **Good afternoon!** – Jó napot! (délután)\n- **Good evening!** – Jó estét! (este, érkezéskor)\n- **Goodbye! / Bye!** – Viszlát! / Szia!\n- **See you later! / See you tomorrow!** – Később találkozunk! / Holnap találkozunk!\n- **Good night!** – Jó éjszakát! (csak elköszönéskor, lefekvés előtt)\n\nHa valaki megkérdezi, hogy vagy:\n\n- **How are you?** – Hogy vagy?\n- **I’m fine, thanks. And you?** – Jól, köszönöm. És te?\n- **Not bad.** – Nem rossz. / Egész jól.',
          warn: 'A **Good night!** nem köszönés, hanem elköszönés! Ha este érkezel valahova, azt mondd: **Good evening!**'
        },
        {
          title: 'Bemutatkozás',
          text: 'Bemutatkozni néhány egyszerű mondattal tudsz:\n\n- **My name is Anna.** / **I’m Anna.** – Anna vagyok. / A nevem Anna.\n- **What’s your name?** – Hogy hívnak?\n- **I’m twelve (years old).** – Tizenkét éves vagyok.\n- **How old are you?** – Hány éves vagy?\n- **I’m from Hungary. I live in Debrecen.** – Magyarországról jöttem. Debrecenben lakom.\n- **Where are you from?** – Honnan jöttél? / Honnan származol?\n- **Nice to meet you!** – Örülök, hogy megismerhetlek!\n\nUdvarias kifejezések, amelyekre mindig szükséged lesz: **please** (kérlek), **thank you / thanks** (köszönöm), **you’re welcome** (szívesen), **sorry** (bocsánat), **excuse me** (elnézést – pl. ha meg akarsz szólítani valakit).',
          tip: 'Az életkort a **be** igével mondjuk: **I’m 12.** Soha ne mondd, hogy „I have 12 years” – ez tükörfordítás (spanyolból vagy franciából jön), angolul hibás.'
        },
        {
          title: 'Számok',
          text: 'Az alapszámok: **one, two, three, four, five, six, seven, eight, nine, ten** (1–10), majd **eleven, twelve** (11, 12).\n\n- 13–19: a szám végén **-teen** van: **thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen**.\n- Kerek tízesek: a végükön **-ty** van: **twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety**.\n- Összetett számoknál kötőjel kell: **twenty-one** (21), **forty-five** (45), **ninety-nine** (99).\n- **one hundred** (100), **two hundred and fifty** (250), **one thousand** (1000).\n\nA sorszámnevek (első, második…) többnyire **-th** végűek: **fourth, fifth, sixth, tenth**, de a rendhagyók: **first** (1st), **second** (2nd), **third** (3rd).',
          warn: 'Figyelj a hangsúlyra! A **thirTEEN** (13) a végén, a **THIRty** (30) az elején hangsúlyos. És a **forty** (40) helyesírása: nincs benne u, pedig a **four** (4) szóban van!'
        },
        {
          title: 'Mennyi az idő? Napok és hónapok',
          text: 'Az időt így kérdezzük: **What time is it?** – Hány óra van?\n\n- **It’s seven o’clock.** – Hét óra van. (egész óra)\n- **It’s half past seven.** – Fél nyolc van. (szó szerint: fél órával múlt hét)\n- **It’s quarter past seven.** – Negyed nyolc van. (7:15)\n- **It’s quarter to eight.** – Háromnegyed nyolc van. (7:45)\n- **It’s ten past three.** – Három óra tíz perc van. (3:10)\n- **It’s twenty to five.** – Öt óra lesz húsz perc múlva. (4:40)\n\nA hét napjai: **Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday**. A hónapok: **January, February, March, April, May, June, July, August, September, October, November, December**.\n\nElöljárók az időhöz:\n\n- **at** + pontos idő: **at 8 o’clock**, **at night**, **at the weekend**\n- **on** + nap / dátum: **on Monday**, **on 5th May**\n- **in** + hónap, évszak, év, napszak: **in July**, **in winter**, **in 2026**, **in the morning**',
          warn: 'A **half past seven** fél NYOLC, nem fél hét! A magyar a következő órához viszonyít, az angol az előzőhöz. A napok és a hónapok nevét angolul mindig **nagy kezdőbetűvel** írjuk: **Monday**, **July**.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a kifejezéseket!', count: 6, pairs: [
            ['Good morning!', 'Jó reggelt!'], ['Good night!', 'Jó éjszakát!'], ['Nice to meet you!', 'Örülök, hogy megismerhetlek!'],
            ['How old are you?', 'Hány éves vagy?'], ['Where are you from?', 'Honnan származol?'], ['You’re welcome.', 'Szívesen.'],
            ['Excuse me!', 'Elnézést!'], ['half past six', 'fél hét'], ['quarter to nine', 'háromnegyed kilenc'],
            ['forty', 'negyven'], ['fourteen', 'tizennégy'], ['Wednesday', 'szerda'], ['Thursday', 'csütörtök'],
            ['August', 'augusztus'], ['third', 'harmadik'], ['See you later!', 'Később találkozunk!']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mit mondasz, ha este 7-kor megérkezel egy születésnapi buliba?', options: ['Good evening!', 'Good night!', 'Good afternoon!', 'Goodbye!'], answer: 0, explain: 'Érkezéskor este a Good evening! a helyes. A Good night! csak elköszönéskor használható.' },
        { q: 'Hogyan mondod angolul: „Tizenhárom éves vagyok.”?', options: ['I have thirteen years.', 'I’m thirteen.', 'I’m thirty.', 'My age has thirteen.'], answer: 1, explain: 'Az életkort a be igével fejezzük ki: I’m thirteen (years old). A thirty harminc lenne.' },
        { q: 'Mennyi az idő, ha azt mondják: „It’s half past four”?', options: ['3:30', '4:50', '4:30', '4:15'], answer: 2, explain: 'Half past four = fél órával múlt négy, vagyis 4:30 (magyarul fél öt).' },
        { q: 'Melyik elöljáró kell a napok elé? „___ Friday”', options: ['in', 'at', 'to', 'on'], answer: 3, explain: 'A napok elé on kell: on Friday, on Monday.' }
      ]
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'to-be',
      title: 'A „to be” és a személyes névmások',
      level: 1, minutes: 14,
      summary: 'I am, you are, he is…: a „van, lenni” ige jelen időben, tagadása és kérdése, valamint a személyes és birtokos névmások.',
      tags: ['to be', 'am', 'is', 'are', 'személyes névmás', 'pronouns', 'I', 'you', 'he', 'she', 'it', 'we', 'they', 'birtokos névmás', 'my', 'your', 'rövidítés'],
      sections: [
        {
          title: 'Személyes névmások',
          text: 'A személyes névmások (personal pronouns) alanyként állnak a mondatban:\n\n- **I** – én (mindig nagybetűvel!)\n- **you** – te\n- **he** – ő (fiú, férfi)\n- **she** – ő (lány, nő)\n- **it** – ő, az (tárgy, állat, dolog)\n- **we** – mi\n- **you** – ti (ugyanaz, mint a „te”!)\n- **they** – ők\n\nA magyarban az „ő” mindenkire jó, az angolban viszont el kell döntened: **he** (fiú), **she** (lány) vagy **it** (tárgy, állat). A kedvenc háziállatra gyakran mondják, hogy he vagy she.',
          tip: 'A magyarban az alanyt gyakran elhagyjuk („Fáradt vagyok.”), az angolban **mindig ki kell tenni**: **I am tired.** Nem lehet csak annyit mondani, hogy „Am tired.”'
        },
        {
          title: 'A „to be” ige: am, is, are',
          text: 'A **to be** (lenni, van) a leggyakoribb angol ige. Jelen időben három alakja van:\n\n- **I am** (I’m) – én vagyok\n- **you are** (you’re) – te vagy\n- **he / she / it is** (he’s, she’s, it’s) – ő van / az\n- **we are** (we’re) – mi vagyunk\n- **you are** (you’re) – ti vagytok\n- **they are** (they’re) – ők vannak\n\nPéldák:\n\n- **I’m a student.** – Diák vagyok.\n- **She is my sister.** – Ő a nővérem / húgom.\n- **It’s cold today.** – Ma hideg van.\n- **We are in the kitchen.** – A konyhában vagyunk.\n- **They’re hungry.** – Éhesek.',
          warn: 'A magyarban harmadik személyben a „van” gyakran eltűnik: „Péter magas.” Az angolban **nem hagyható el**: **Peter is tall.** (Nem: „Peter tall.”) A melléknév elé is kell: **The film is boring.**'
        },
        {
          title: 'Tagadás és kérdés',
          text: '**Tagadás:** a **not** szót az am/is/are után tesszük.\n\n- **I am not (I’m not) late.** – Nem késtem el. / Nem vagyok késésben.\n- **He is not (he isn’t) at home.** – Nincs otthon.\n- **They are not (they aren’t) English.** – Nem angolok.\n\n**Kérdés:** az am/is/are az alany **elé** kerül (fordított szórend).\n\n- **Are you ready?** – Kész vagy?\n- **Is she your friend?** – Ő a barátnőd?\n- **Where is the station?** – Hol van az állomás?\n\nRövid válasz: **Yes, I am. / No, I’m not.** – **Yes, she is. / No, she isn’t.**',
          tip: 'Rövid igenlő válaszban nem szabad összevonni: **Yes, I am.** (nem: „Yes, I’m.”). Tagadásban viszont lehet: **No, I’m not.**'
        },
        {
          title: 'Birtokos névmások és a „there is / there are”',
          text: 'A **birtokos névmások** (possessive adjectives) a főnév előtt állnak, és nem változnak:\n\n- **my** – az én…-m: **my bag** (a táskám)\n- **your** – a te…-d: **your phone** (a telefonod)\n- **his** – az ő (fiú)…-ja: **his bike** (a biciklije)\n- **her** – az ő (lány)…-ja: **her book** (a könyve)\n- **its** – annak a…-ja: **its tail** (a farka)\n- **our** – a mi…-nk, **your** – a ti…-tok, **their** – az ő…-jük\n\nHa azt akarod mondani, hogy valahol **van / vannak** valami(k), a **there is / there are** szerkezetet használd:\n\n- **There is a cat in the garden.** – Van egy macska a kertben.\n- **There are three apples on the table.** – Három alma van az asztalon.\n- **Is there a bank near here?** – Van itt a közelben egy bank?',
          warn: 'Gyakori hiba: **it’s** és **its** összekeverése. Az **it’s** = it is (az … van), az **its** = annak a …-ja. **It’s a dog. Its name is Rex.** – Ez egy kutya. A neve Rex.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a névmásokat és mondatokat!', count: 6, pairs: [
            ['I', 'én'], ['she', 'ő (lány)'], ['he', 'ő (fiú)'], ['it', 'az (tárgy, állat)'], ['we', 'mi'], ['they', 'ők'],
            ['my', 'az én …-m'], ['their', 'az ő …-jük'], ['her bag', 'a táskája (lányé)'], ['his bike', 'a biciklije (fiúé)'],
            ['We’re late.', 'Elkéstünk.'], ['Is he at home?', 'Otthon van?'], ['They aren’t English.', 'Nem angolok.'],
            ['There are two cats.', 'Két macska van.'], ['I’m not hungry.', 'Nem vagyok éhes.']
          ] } }
        }
      ],
      quiz: [
        { q: 'Egészítsd ki: „My brother ___ fourteen years old.”', options: ['am', 'are', 'is', 'be'], answer: 2, explain: 'A my brother egyes szám 3. személy (= he), ezért is kell.' },
        { q: 'Melyik mondat helyes?', options: ['Anna very nice.', 'Anna is very nice.', 'Anna are very nice.', 'Is Anna very nice.'], answer: 1, explain: 'Az angolban a be ige nem hagyható el, és harmadik személyben az is a helyes alak. Az „Is Anna very nice.” kérdő szórendű, de pont van a végén, tehát állításként hibás.' },
        { q: 'Hogyan kérdezed: „Fáradt vagy?”', options: ['You are tired?', 'Are tired you?', 'Is you tired?', 'Are you tired?'], answer: 3, explain: 'Kérdésben az are az alany elé kerül: Are you tired?' },
        { q: 'Melyik a helyes? „The dog wags ___ tail.”', options: ['its', 'it’s', 'his’s', 'it'], answer: 0, explain: 'Az its birtokos névmás (annak a …-ja). Az it’s jelentése: it is.' }
      ]
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'jelen-ido',
      title: 'Present Simple és Present Continuous',
      level: 2, minutes: 18,
      summary: 'A két jelen idő: szokások és tények (Present Simple), illetve éppen most zajló cselekvés (Present Continuous). Az -s rag és az -ing alak.',
      tags: ['present simple', 'present continuous', 'jelen idő', 'egyszerű jelen', 'folyamatos jelen', '-s', '-ing', 'do', 'does', 'always', 'usually', 'now', 'gyakoriság'],
      sections: [
        {
          title: 'Present Simple – szokások, tények',
          text: 'A **Present Simple** (egyszerű jelen) időt használjuk:\n\n- **szokásokra, ismétlődő cselekvésekre**: **I get up at 7 every day.** – Minden nap 7-kor kelek.\n- **általános igazságokra, tényekre**: **Water boils at 100 degrees.** – A víz 100 fokon forr.\n- **állandó helyzetekre**: **My dad works in a hospital.** – Apukám egy kórházban dolgozik.\n\n**Képzése:** az ige alapalakja, de **he / she / it** után az igéhez **-s** kerül!\n\n- **I play, you play, we play, they play**\n- **he plays, she plays, it plays**\n\nHelyesírás az -s-nél:\n\n- -s, -sh, -ch, -x, -o végű igék után **-es**: **watches, washes, goes, does**\n- mássalhangzó + y végű igéknél **-ies**: **study → studies**, **fly → flies** (de: **play → plays**, mert ott magánhangzó áll az y előtt)\n- rendhagyó: **have → has**',
          warn: 'A leggyakoribb magyar tanulói hiba: lemarad a harmadik személyű **-s**! Helyesen: **She likes pizza.** (nem: „She like pizza.”) Jegyezd meg: **he, she, it – az -s-t ne felejtsd!**'
        },
        {
          title: 'Present Simple – tagadás és kérdés',
          text: 'Tagadáshoz és kérdéshez segédige kell: **do**, illetve he/she/it után **does**. Ilyenkor a főige **alapalakban** marad, nem kap -s-t!\n\n- **I don’t like tea.** – Nem szeretem a teát.\n- **She doesn’t play football.** – Ő nem focizik.\n- **Do you speak English?** – Beszélsz angolul?\n- **Does he live in London?** – Londonban lakik?\n- **Yes, he does. / No, he doesn’t.** – Igen. / Nem.\n\nA **gyakoriságot kifejező határozószók** (adverbs of frequency) a főige **elé** kerülnek, de a be ige **után**:\n\n- **always** (mindig), **usually** (általában), **often** (gyakran), **sometimes** (néha), **never** (soha)\n- **I usually walk to school.** – Általában gyalog megyek iskolába.\n- **She is always happy.** – Mindig vidám.',
          warn: 'Ha már van **does**, a főige NEM kap -s-t: **Does she like…?** (nem: „Does she likes…?”), **He doesn’t know.** (nem: „He doesn’t knows.”)'
        },
        {
          title: 'Present Continuous – éppen most',
          text: 'A **Present Continuous** (folyamatos jelen) időt használjuk:\n\n- arra, ami **éppen most, a beszéd pillanatában** történik: **Look! It’s raining.** – Nézd! Esik az eső.\n- **átmeneti** helyzetekre: **I’m staying with my grandma this week.** – Ezen a héten a nagymamámnál lakom.\n- **megbeszélt, közeli jövőbeli tervekre**: **We’re meeting Tom tomorrow.** – Holnap találkozunk Tommal.\n\n**Képzése:** am / is / are + ige**-ing** alakja.\n\n- **I am reading.** – (Épp) olvasok.\n- **She is watching TV.** – (Épp) tévét néz.\n- **They aren’t listening.** – Nem figyelnek.\n- **What are you doing?** – Mit csinálsz?\n\nAz -ing helyesírása: **make → making** (néma e elmarad), **swim → swimming**, **run → running**, **sit → sitting** (rövid magánhangzó + mássalhangzó: megduplázzuk), **lie → lying**.',
          tip: 'Jelzőszavak, amelyek segítenek választani. Present Simple: **every day, usually, always, often, never, on Mondays**. Present Continuous: **now, right now, at the moment, today, Look!, Listen!**'
        },
        {
          title: 'Melyiket válasszam?',
          text: 'Hasonlítsd össze:\n\n- **I play tennis every Saturday.** – Minden szombaton teniszezem. (szokás)\n- **I’m playing tennis now.** – Most éppen teniszezem. (most zajlik)\n- **My mum works in an office.** – Anyukám irodában dolgozik. (állandó)\n- **My mum is working from home this week.** – Anyukám ezen a héten otthonról dolgozik. (átmeneti)\n\nVannak igék, amelyeket általában **nem** használunk continuous alakban, mert állapotot fejeznek ki, nem cselekvést: **like, love, hate, want, know, understand, believe, need, belong**.\n\n- **I know the answer.** (nem: „I’m knowing…”)\n- **She wants a new phone.** (nem: „She is wanting…”)',
          warn: 'A magyarban egy jelen idő van, ezért könnyű mindig a Simple-t használni. Ha valami **éppen most** történik, angolul Continuous kell: **Where’s Peter? – He’s having a shower.** (nem: „He has a shower.”)',
          widget: { type: 'parositas', options: { title: 'Párosítsd a mondatokat a fordításukkal!', count: 6, pairs: [
            ['She plays the piano.', 'Zongorázik. (szokás)'], ['She is playing the piano.', 'Éppen zongorázik.'],
            ['I don’t eat meat.', 'Nem eszem húst.'], ['Does he speak German?', 'Beszél németül?'],
            ['They’re waiting for the bus.', 'Épp a buszra várnak.'], ['We never watch TV.', 'Soha nem nézünk tévét.'],
            ['What are you doing?', 'Mit csinálsz (most)?'], ['What do you do?', 'Mi a foglalkozásod?'],
            ['It’s raining.', 'Esik az eső.'], ['He usually walks.', 'Általában gyalog megy.'],
            ['I know.', 'Tudom.'], ['She doesn’t understand.', 'Nem érti.'],
            ['at the moment', 'jelenleg, éppen'], ['sometimes', 'néha']
          ] } }
        }
      ],
      quiz: [
        { q: 'Egészítsd ki: „She ___ to school every day.”', options: ['go', 'goes', 'is going', 'going'], answer: 1, explain: 'Every day = szokás, tehát Present Simple. She után -s kell, a go helyesírása: goes.' },
        { q: 'Egészítsd ki: „Be quiet! The baby ___.”', options: ['sleeps', 'sleep', 'is sleeping', 'does sleep'], answer: 2, explain: 'A felszólítás (Be quiet!) azt jelzi, hogy most zajlik a dolog: Present Continuous.' },
        { q: 'Melyik a helyes tagadás?', options: ['He don’t like fish.', 'He doesn’t likes fish.', 'He not likes fish.', 'He doesn’t like fish.'], answer: 3, explain: 'He után doesn’t kell, utána a főige alapalakban marad: like.' },
        { q: 'Mi a „swim” -ing alakja?', options: ['swiming', 'swimming', 'swimeing', 'swimmming'], answer: 1, explain: 'Rövid magánhangzó + mássalhangzó a végén: a mássalhangzót megduplázzuk: swimming.' }
      ]
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'mult-ido',
      title: 'Past Simple – a múlt idő',
      level: 2, minutes: 18,
      summary: 'Lezárt múltbeli események: szabályos igék -ed végződéssel, a leggyakoribb rendhagyó igék, tagadás és kérdés a „did” segítségével.',
      tags: ['past simple', 'múlt idő', 'egyszerű múlt', '-ed', 'rendhagyó igék', 'irregular verbs', 'did', 'didn’t', 'was', 'were', 'yesterday', 'ago'],
      sections: [
        {
          title: 'Mikor használjuk?',
          text: 'A **Past Simple** (egyszerű múlt) időt **lezárt, múltbeli** cselekvésekre használjuk, amelyeknek tudjuk (vagy sejtjük) az időpontját.\n\n- **I visited my grandparents last weekend.** – Múlt hétvégén meglátogattam a nagyszüleimet.\n- **We watched a film yesterday.** – Tegnap megnéztünk egy filmet.\n- **She was born in 2012.** – 2012-ben született.\n\nJellegzetes időhatározók: **yesterday** (tegnap), **last week / last year** (múlt héten / tavaly), **two days ago** (két nappal ezelőtt), **in 2020**, **when I was a child** (amikor gyerek voltam).',
          tip: 'Az **ago** mindig az időtartam **után** áll: **three years ago** – három évvel ezelőtt (nem: „ago three years”).'
        },
        {
          title: 'A „to be” múlt ideje: was, were',
          text: 'A **be** igének két múlt idejű alakja van:\n\n- **I / he / she / it was** – voltam, volt\n- **you / we / they were** – voltál, voltunk, voltatok, voltak\n\nPéldák:\n\n- **I was tired yesterday.** – Tegnap fáradt voltam.\n- **They were at the cinema.** – A moziban voltak.\n- **It wasn’t (was not) easy.** – Nem volt könnyű.\n- **Were you at home?** – Otthon voltál?\n\nA was/were-nél ugyanúgy képezzük a tagadást és a kérdést, mint jelenben az am/is/are-nél: **not**, illetve fordított szórend. Itt **nem** kell did!',
          warn: 'Ne mondd: „Did you be at home?” – Helyesen: **Were you at home?**'
        },
        {
          title: 'Szabályos igék: -ed',
          text: 'A **szabályos (regular)** igék múlt ideje az **-ed** végződéssel készül, és ez **minden személyben ugyanaz**:\n\n- **play → played**, **watch → watched**, **open → opened**\n- -e végű igéknél csak **-d**: **like → liked**, **live → lived**\n- mássalhangzó + y: **-ied**: **study → studied**, **try → tried** (de: **play → played**)\n- rövid magánhangzó + mássalhangzó: duplázás: **stop → stopped**, **plan → planned**\n\nKiejtés: az -ed háromféleképpen hangzik: [t] – **worked, watched**; [d] – **played, opened**; [id] – csak t és d után: **wanted, needed**.',
          tip: 'Jó hír: múlt időben **nincs -s** a harmadik személyben! **I played, she played, they played** – mind ugyanaz.'
        },
        {
          title: 'A leggyakoribb rendhagyó igék',
          text: 'A **rendhagyó (irregular)** igék múlt idejét meg kell tanulni. A legfontosabbak (alapalak – múlt idő – jelentés):\n\n- **be – was/were** – lenni\n- **have – had** – birtokol, van neki\n- **do – did** – csinál\n- **go – went** – megy\n- **come – came** – jön\n- **see – saw** – lát\n- **eat – ate** – eszik\n- **drink – drank** – iszik\n- **get – got** – kap, lesz\n- **give – gave** – ad\n- **make – made** – készít\n- **take – took** – vesz, visz\n- **buy – bought** – vásárol\n- **bring – brought** – hoz\n- **think – thought** – gondol\n- **say – said** – mond\n- **tell – told** – elmond, mesél\n- **know – knew** – tud, ismer\n- **write – wrote** – ír\n- **read – read** – olvas (kiejtés: [red])\n- **find – found** – talál\n- **leave – left** – elhagy, elindul\n- **meet – met** – találkozik\n- **sleep – slept** – alszik\n- **swim – swam** – úszik\n- **run – ran** – fut\n- **sit – sat** – ül\n- **speak – spoke** – beszél\n- **put – put** – tesz\n- **cut – cut** – vág\n- **win – won** – nyer\n- **lose – lost** – veszít, elveszít\n- **feel – felt** – érez\n- **forget – forgot** – elfelejt',
          tip: 'Tanulj párosával, hangosan, és csoportosíts: **buy – bought, bring – brought, think – thought** (mind -ought); **put – put, cut – cut** (nem változik).'
        },
        {
          title: 'Tagadás és kérdés: did',
          text: 'Tagadáshoz és kérdéshez a **did** segédigét használjuk minden személyben. Utána a főige **alapalakban** áll!\n\n- **I didn’t (did not) go to school yesterday.** – Tegnap nem mentem iskolába.\n- **She didn’t see the film.** – Nem látta a filmet.\n- **Did you finish your homework?** – Befejezted a házidat?\n- **Yes, I did. / No, I didn’t.** – Igen. / Nem.\n- **Where did you go?** – Hová mentél?\n- **What did he say?** – Mit mondott?',
          warn: 'A did már jelzi a múltat, ezért a főige NEM megy múlt időbe: **Did you see it?** (nem: „Did you saw it?”), **I didn’t go.** (nem: „I didn’t went.”)',
          widget: { type: 'parositas', options: { title: 'Rendhagyó igék: párosítsd az alapalakot a múlt idővel!', count: 6, pairs: [
            ['go', 'went'], ['see', 'saw'], ['eat', 'ate'], ['buy', 'bought'], ['think', 'thought'], ['bring', 'brought'],
            ['take', 'took'], ['write', 'wrote'], ['make', 'made'], ['give', 'gave'], ['know', 'knew'], ['find', 'found'],
            ['leave', 'left'], ['speak', 'spoke'], ['swim', 'swam'], ['forget', 'forgot']
          ] } }
        }
      ],
      widgets: [
        { type: 'parositas', options: { title: 'Múlt idejű mondatok', count: 6, pairs: [
          ['I was tired.', 'Fáradt voltam.'], ['We were late.', 'Elkéstünk.'], ['Did you see it?', 'Láttad?'],
          ['She didn’t come.', 'Nem jött el.'], ['They won the match.', 'Megnyerték a meccset.'], ['I lost my keys.', 'Elvesztettem a kulcsaimat.'],
          ['two days ago', 'két nappal ezelőtt'], ['last summer', 'tavaly nyáron'], ['yesterday', 'tegnap'],
          ['He told me a story.', 'Mesélt nekem egy történetet.'], ['We met at school.', 'Az iskolában találkoztunk.'], ['Where did you go?', 'Hová mentél?']
        ] } }
      ],
      quiz: [
        { q: 'Mi a „buy” múlt ideje?', options: ['buyed', 'bought', 'brought', 'buied'], answer: 1, explain: 'A buy rendhagyó: buy – bought. A brought a bring (hoz) múlt ideje.' },
        { q: 'Egészítsd ki: „We ___ at the zoo last Sunday.”', options: ['was', 'are', 'were', 'did'], answer: 2, explain: 'Last Sunday = múlt. A we mellé a be múlt ideje were.' },
        { q: 'Melyik mondat helyes?', options: ['Did you went to the party?', 'Did you go to the party?', 'Do you went to the party?', 'Went you to the party?'], answer: 1, explain: 'Kérdésben did + alapalak: Did you go…?' },
        { q: 'Hogyan mondod: „Három éve költöztünk ide.”?', options: ['We moved here three years ago.', 'We moved here ago three years.', 'We move here three years ago.', 'We moved here before three years.'], answer: 0, explain: 'Az ago az időtartam után áll, és Past Simple kell: moved.' }
      ]
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'nevelok',
      title: 'Névelők, többes szám, some/any, much/many',
      level: 2, minutes: 17,
      summary: 'Az a/an/the használata, a főnevek többes száma (rendhagyókkal), a megszámlálható és megszámlálhatatlan főnevek, some/any és much/many.',
      tags: ['névelő', 'article', 'a', 'an', 'the', 'többes szám', 'plural', 'megszámlálható', 'countable', 'uncountable', 'some', 'any', 'much', 'many', 'a lot of', 'how much', 'how many'],
      sections: [
        {
          title: 'Határozatlan névelő: a / an',
          text: 'Az **a / an** jelentése „egy”, és csak **egyes számú, megszámlálható** főnév előtt állhat.\n\n- **a** – mássalhangzóval **kiejtett** szó előtt: **a dog, a book, a university** [junivörszity], **a European city**\n- **an** – magánhangzóval **kiejtett** szó előtt: **an apple, an egg, an orange, an hour** (a h néma!), **an umbrella**\n\nHasználjuk:\n\n- ha valamit **először említünk**: **I have a cat.** – Van egy macskám.\n- **foglalkozás** előtt: **She is a teacher.** – Ő tanár. / Tanárnő.\n- ha „egy bizonyos, akármelyik”: **Can I have an apple?** – Kaphatok egy almát?',
          warn: 'A foglalkozás elé angolul kell a névelő, magyarul nem! **My dad is an engineer.** (nem: „My dad is engineer.”) Az a/an választásánál a **kiejtés** dönt, nem a betű: **an hour**, de **a uniform**.'
        },
        {
          title: 'Határozott névelő: the',
          text: 'A **the** jelentése „a / az” (az a bizonyos). Egyes és többes számban is használható.\n\n- ha **már említettük**, vagy **tudjuk, melyikről van szó**: **I have a cat. The cat is black.** – Van egy macskám. A macska fekete.\n- ha **csak egy van belőle**: **the sun, the moon, the internet**\n- folyók, tengerek, hegyláncok, néhány ország: **the Danube, the Atlantic, the Alps, the USA, the UK**\n- hangszerek előtt: **She plays the guitar.**\n\n**Nem** teszünk névelőt:\n\n- általános értelemben vett többes szám és megszámlálhatatlan főnevek elé: **I like dogs.** – Szeretem a kutyákat. **Milk is healthy.** – A tej egészséges.\n- legtöbb ország, város, nyelv, sport, étkezés elé: **Hungary, Budapest, English, football, breakfast**\n- néhány állandó kifejezésben: **go to school, go to bed, at home, by bus**',
          tip: 'A magyarban általános dolgokra is mondunk névelőt („Szeretem **a** csokit”), az angolban nem: **I love chocolate.** Ez az egyik leggyakoribb magyar tükörfordítási hiba!'
        },
        {
          title: 'A többes szám',
          text: 'A főnevek többes száma általában **-s**: **book → books, car → cars**.\n\n- -s, -ss, -sh, -ch, -x, -o után **-es**: **bus → buses, box → boxes, watch → watches, potato → potatoes** (de: **photo → photos, piano → pianos**)\n- mássalhangzó + y → **-ies**: **city → cities, baby → babies** (de: **boy → boys, day → days**)\n- -f / -fe → **-ves**: **knife → knives, leaf → leaves, wolf → wolves, life → lives**\n\nRendhagyó többes számok:\n\n- **man → men** (férfi), **woman → women** (nő)\n- **child → children** (gyerek)\n- **person → people** (ember)\n- **foot → feet** (láb), **tooth → teeth** (fog)\n- **mouse → mice** (egér)\n- **fish → fish, sheep → sheep** (nem változik)',
          warn: 'Számnév után az angolban **többes szám** kell, a magyarban egyes! **three books** – három könyv (nem: „three book”). **two children** – két gyerek.'
        },
        {
          title: 'Megszámlálható és megszámlálhatatlan főnevek',
          text: '**Megszámlálható (countable)** főnevek: van egyes és többes számuk, megszámolhatók: **an apple, two apples; a chair, five chairs**.\n\n**Megszámlálhatatlan (uncountable)** főnevek: anyagok, folyadékok, elvont fogalmak. Nincs többes számuk, nem áll előttük a/an: **water, milk, bread, money, information, advice, furniture, homework, music, rice, sugar**.\n\nHa mégis meg akarjuk számolni őket, „mértékegységet” használunk: **a glass of water** (egy pohár víz), **a piece of cake** (egy szelet torta), **a slice of bread** (egy szelet kenyér), **a bottle of milk** (egy üveg tej), **a piece of advice** (egy tanács).',
          warn: 'Ami a magyarban megszámlálható, az angolban nem mindig az! **information, advice, homework, furniture, news** megszámlálhatatlan: **I have a lot of homework.** (nem: „homeworks”), **The news is good.**'
        },
        {
          title: 'some / any, much / many / a lot of',
          text: '**some** és **any** – „néhány, valamennyi, egy kis”:\n\n- **some** állító mondatban: **There are some eggs in the fridge.** – Van néhány tojás a hűtőben. **I need some water.** – Kell egy kis víz.\n- **any** tagadó mondatban és kérdésben: **There isn’t any milk.** – Nincs tej. **Have you got any brothers?** – Van fiútestvéred?\n- Udvarias kérésnél, kínálásnál kérdésben is **some**: **Would you like some tea?** – Kérsz egy kis teát?\n\n**much** és **many** – „sok”:\n\n- **many** + megszámlálható többes szám: **many friends, many books**; kérdés: **How many apples?** – Hány alma?\n- **much** + megszámlálhatatlan: **much time, much money**; kérdés: **How much water?** – Mennyi víz? **How much is it?** – Mennyibe kerül?\n- A **much** főleg tagadásban és kérdésben gyakori: **I don’t have much time.** Állító mondatban inkább **a lot of**, ami mindkettővel jó: **a lot of friends, a lot of money**.',
          tip: 'Egyszerű próba: ha a szó elé tudsz tenni számot (two, three…), akkor **many** kell. Ha nem (két víz? két információ?), akkor **much**.',
          widget: { type: 'parositas', options: { title: 'Többes szám és mennyiségek', count: 6, pairs: [
            ['child', 'children'], ['man', 'men'], ['woman', 'women'], ['person', 'people'], ['tooth', 'teeth'], ['foot', 'feet'],
            ['mouse', 'mice'], ['knife', 'knives'], ['city', 'cities'], ['box', 'boxes'], ['a glass of', 'egy pohár …'],
            ['a piece of cake', 'egy szelet torta'], ['How many?', 'Hány? (megszámlálható)'], ['How much?', 'Mennyi? (megszámlálhatatlan)'],
            ['an hour', 'egy óra (időtartam)'], ['a university', 'egy egyetem']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik névelő kell? „She is ___ engineer.”', options: ['a', 'an', 'the', '(nem kell névelő)'], answer: 1, explain: 'Foglalkozás előtt kell határozatlan névelő, és az engineer magánhangzóval kezdődik: an engineer.' },
        { q: 'Mi a „child” többes száma?', options: ['childs', 'childes', 'children', 'childrens'], answer: 2, explain: 'Rendhagyó többes szám: child – children.' },
        { q: 'Egészítsd ki: „How ___ money have you got?”', options: ['many', 'much', 'any', 'some'], answer: 1, explain: 'A money megszámlálhatatlan, ezért How much.' },
        { q: 'Melyik mondat helyes?', options: ['I don’t have some time.', 'I have any time.', 'I don’t have any time.', 'I don’t have many time.'], answer: 2, explain: 'Tagadásban any kell. A time megszámlálhatatlan, ezért a many sem jó.' }
      ]
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'kerdesek',
      title: 'Kérdések, tagadás, kérdőszavak',
      level: 2, minutes: 15,
      summary: 'Eldöntendő és kiegészítendő kérdések, a szórend szabálya, a kérdőszavak (who, what, where…) és a tagadás minden időben.',
      tags: ['kérdés', 'question', 'tagadás', 'negative', 'kérdőszó', 'who', 'what', 'where', 'when', 'why', 'how', 'which', 'whose', 'szórend', 'segédige', 'rövid válasz'],
      sections: [
        {
          title: 'Az alapszabály: segédige az alany elé',
          text: 'A magyarban a kérdést gyakran csak a hanglejtés jelzi („Te is jössz?”). Az angolban a **szórend** változik: a **segédige** (vagy a be/can ige) az alany **elé** kerül.\n\n- **be** igénél: **You are happy. → Are you happy?**\n- **can**: **She can swim. → Can she swim?**\n- **Present Continuous**: **They are coming. → Are they coming?**\n- **Present Simple**: nincs segédige, ezért **do/does** kell: **You like music. → Do you like music?**\n- **Past Simple**: **did** kell: **He called you. → Did he call you?**\n\nRövid válaszokban a segédigét ismételjük: **Can you ride a bike? – Yes, I can.** **Did she win? – No, she didn’t.**',
          warn: 'Ne hagyd a kérdést állító szórendben! **Do you have a pet?** (nem: „You have a pet?”). Beszélt nyelvben ugyan előfordul, de dolgozatban hibának számít.'
        },
        {
          title: 'Kérdőszavak',
          text: 'A **kiegészítendő kérdés** (wh-question) a kérdőszóval kezdődik, utána jön a segédige és az alany:\n\n- **What** – mi? mit? – **What do you want?** – Mit szeretnél?\n- **Who** – ki? kit? – **Who is that girl?** – Ki az a lány?\n- **Where** – hol? hová? – **Where do you live?** – Hol laksz?\n- **When** – mikor? – **When does the film start?** – Mikor kezdődik a film?\n- **Why** – miért? – **Why are you sad?** – Miért vagy szomorú?\n- **How** – hogyan? – **How do you spell it?** – Hogy betűzöd?\n- **Which** – melyik? – **Which colour do you like?** – Melyik színt szereted?\n- **Whose** – kié? – **Whose bag is this?** – Kié ez a táska?\n- **What time** – hány órakor? – **What time do you get up?**\n\nÖsszetett kérdőszavak a **how**-val: **How old** (hány éves), **How much / How many** (mennyi / hány), **How often** (milyen gyakran), **How long** (meddig, mennyi ideig), **How far** (milyen messze).',
          tip: 'Válaszolj a **why**-ra **because**-zal: **Why are you late? – Because I missed the bus.** – Miért késtél? – Mert lekéstem a buszt.'
        },
        {
          title: 'Kérdés az alanyra',
          text: 'Ha a **who** vagy **what** maga az **alany** (vagyis azt kérdezzük, KI csinálja), **nem** kell do/does/did, és a szórend állító marad:\n\n- **Who lives here?** – Ki lakik itt? (nem: „Who does live here?”)\n- **Who broke the window?** – Ki törte be az ablakot?\n- **What happened?** – Mi történt?\n\nHasonlítsd össze:\n\n- **Who called you?** – Ki hívott téged? (a who az alany)\n- **Who did you call?** – Kit hívtál? (a you az alany, a who a tárgy)'
        },
        {
          title: 'Tagadás – összefoglalás',
          text: 'A tagadás mindig a **segédige + not** szerkezettel készül:\n\n- **be**: **I’m not / he isn’t / we aren’t / it wasn’t / they weren’t**\n- **Present Simple**: **don’t / doesn’t** + alapalak: **I don’t know.**\n- **Past Simple**: **didn’t** + alapalak: **We didn’t win.**\n- **can**: **can’t (cannot)**: **I can’t swim.**\n- **Present Continuous**: **am not / isn’t / aren’t** + -ing: **She isn’t sleeping.**\n\nAz angolban egy mondatban **csak egy tagadás** lehet! Ha a mondatban már van **never, nothing, nobody, nowhere**, akkor nem kell mellé not.\n\n- **I didn’t see anything.** = **I saw nothing.** – Nem láttam semmit.\n- **Nobody came.** – Senki sem jött.',
          warn: 'A magyar kettős tagadás („Nem láttam **semmit**”, „**Senki** sem jött”) angolul hibás: ne mondd, hogy „I didn’t see nothing.” Helyesen: **I didn’t see anything.**',
          widget: { type: 'parositas', options: { title: 'Kérdőszavak és kérdések', count: 6, pairs: [
            ['Who?', 'Ki?'], ['Where?', 'Hol? Hová?'], ['When?', 'Mikor?'], ['Why?', 'Miért?'], ['Which?', 'Melyik?'], ['Whose?', 'Kié?'],
            ['How often?', 'Milyen gyakran?'], ['How far?', 'Milyen messze?'], ['How long?', 'Mennyi ideig?'],
            ['What happened?', 'Mi történt?'], ['Who did you call?', 'Kit hívtál?'], ['Who called you?', 'Ki hívott téged?'],
            ['Nobody came.', 'Senki sem jött.'], ['I can’t swim.', 'Nem tudok úszni.'], ['What time is it?', 'Hány óra van?']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik kérdés helyes?', options: ['Where you live?', 'Where do you live?', 'Where does you live?', 'Where you do live?'], answer: 1, explain: 'Present Simple kérdés: kérdőszó + do + alany + alapalak: Where do you live?' },
        { q: 'Melyik kérdőszóval kérdezzük, hogy „kié”?', options: ['Who', 'Which', 'Whose', 'What'], answer: 2, explain: 'Whose = kié? Például: Whose phone is this?' },
        { q: 'Melyik a helyes fordítás: „Nem csináltam semmit.”?', options: ['I didn’t do nothing.', 'I didn’t do anything.', 'I don’t did anything.', 'I not did anything.'], answer: 1, explain: 'Az angolban nincs kettős tagadás: didn’t + anything.' },
        { q: 'Egészítsd ki: „Who ___ the cake? – Tom did.”', options: ['did eat', 'ate', 'does eat', 'eaten'], answer: 1, explain: 'A who itt az alany (ki ette meg?), ezért nem kell did: Who ate the cake?' }
      ]
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'szokincs',
      title: 'Hasznos szókincs témakörönként',
      level: 1, minutes: 20,
      summary: 'A leggyakoribb szavak és kifejezések: család, iskola, étel és ital, utazás, technika és szakmák – példamondatokkal és párosító játékokkal.',
      tags: ['szókincs', 'vocabulary', 'család', 'family', 'iskola', 'school', 'étel', 'food', 'utazás', 'travel', 'technika', 'szakmák', 'jobs', 'computer', 'tantárgyak'],
      sections: [
        {
          title: 'Család (family)',
          text: '- **mother / mum** – anya, **father / dad** – apa, **parents** – szülők\n- **brother** – fiútestvér (báty vagy öcs), **sister** – lánytestvér (nővér vagy húg)\n- **grandmother / grandma** – nagymama, **grandfather / grandpa** – nagypapa\n- **aunt** – nagynéni, **uncle** – nagybácsi, **cousin** – unokatestvér\n- **son** – fia valakinek, **daughter** – lánya valakinek\n- **husband** – férj, **wife** – feleség\n\nPéldák:\n\n- **I’ve got one brother and two sisters.** – Van egy fiútestvérem és két lánytestvérem.\n- **My older brother is sixteen.** – A bátyám tizenhat éves.\n- **My aunt’s son is my cousin.** – A nagynéném fia az unokatestvérem.',
          tip: 'Az angolban nincs külön szó a bátyra és az öcsre: **older brother** (báty), **younger brother** (öcs); **older sister** (nővér), **younger sister** (húg). Vigyázz: az unokatestvér **cousin**, az unoka viszont **grandchild** (fiú: **grandson**, lány: **granddaughter**).',
          widget: { type: 'parositas', options: { title: 'Család', count: 6, pairs: [
            ['parents', 'szülők'], ['aunt', 'nagynéni'], ['uncle', 'nagybácsi'], ['cousin', 'unokatestvér'], ['grandson', 'fiúunoka'],
            ['daughter', 'lánya valakinek'], ['son', 'fia valakinek'], ['husband', 'férj'], ['wife', 'feleség'],
            ['older brother', 'báty'], ['younger sister', 'húg'], ['grandparents', 'nagyszülők']
          ] } }
        },
        {
          title: 'Iskola (school)',
          text: '- **classroom** – tanterem, **timetable** – órarend, **break** – szünet\n- **teacher** – tanár, **classmate** – osztálytárs, **headteacher** – igazgató\n- **homework** – házi feladat (megszámlálhatatlan!), **test** – dolgozat, **mark** – jegy, osztályzat\n- **pencil case** – tolltartó, **rubber** – radír, **ruler** – vonalzó, **exercise book** – füzet\n\nTantárgyak (nagy kezdőbetű nélkül, kivéve a nyelveket): **maths, history, geography, biology, physics, chemistry, art, PE** (testnevelés), **IT** (informatika), **English, Hungarian, German**.\n\n- **What’s your favourite subject?** – Mi a kedvenc tantárgyad?\n- **We have maths on Tuesdays.** – Kedden van matekunk.\n- **Can I borrow your ruler?** – Kölcsönkérhetem a vonalzódat?',
          warn: 'Hamis barát: a **mark** jegyet jelent, nem márkát (az **brand**). Házit **do**-val csinálunk: **do your homework** (nem: „make your homework”). Vizsgát pedig **take**-kel teszünk: **take an exam**.',
          widget: { type: 'parositas', options: { title: 'Iskola', count: 6, pairs: [
            ['timetable', 'órarend'], ['break', 'szünet'], ['classmate', 'osztálytárs'], ['rubber', 'radír'], ['ruler', 'vonalzó'],
            ['pencil case', 'tolltartó'], ['exercise book', 'füzet'], ['mark', 'jegy, osztályzat'], ['maths', 'matematika'],
            ['history', 'történelem'], ['PE', 'testnevelés'], ['headteacher', 'igazgató'], ['do homework', 'házit ír']
          ] } }
        },
        {
          title: 'Étel és ital (food and drink)',
          text: '- **breakfast** – reggeli, **lunch** – ebéd, **dinner** – vacsora, **snack** – nasi, uzsonna\n- **bread** – kenyér, **butter** – vaj, **cheese** – sajt, **egg** – tojás, **ham** – sonka\n- **vegetables** – zöldségek: **potato, tomato, carrot, onion, pepper** (paprika)\n- **fruit** – gyümölcs: **apple, pear** (körte), **plum** (szilva), **cherry** (cseresznye), **grapes** (szőlő)\n- **chicken** – csirke, **beef** – marhahús, **pork** – sertéshús, **fish** – hal\n- **water, juice, milk, tea, hot chocolate** – víz, gyümölcslé, tej, tea, kakaó\n\nÉtteremben, boltban:\n\n- **Can I have a cheese sandwich, please?** – Kérhetnék egy sajtos szendvicset?\n- **I’d like an orange juice, please.** – Egy narancslét szeretnék.\n- **How much is it?** – Mennyibe kerül?\n- **The bill, please.** – A számlát kérném.',
          tip: 'Udvariasan kérni a **Can I have…, please?** vagy az **I’d like…** (= I would like) szerkezettel lehet. Az „I want…” kicsit nyersnek hangzik.'
        },
        {
          title: 'Utazás (travel)',
          text: '- **train** – vonat, **bus** – busz, **plane** – repülő, **ship** – hajó, **underground** – metró (britben), **bike** – bicikli\n- **station** – állomás, **airport** – repülőtér, **platform** – vágány, peron, **ticket** – jegy\n- **single ticket** – egy útra szóló jegy, **return ticket** – retúrjegy\n- **luggage** – csomag, poggyász (megszámlálhatatlan!), **suitcase** – bőrönd, **passport** – útlevél\n- **left / right / straight on** – balra / jobbra / egyenesen\n\nJárművel: **by** + jármű névelő nélkül: **by train, by car, by bus**, de gyalog: **on foot**.\n\n- **Excuse me, how do I get to the station?** – Elnézést, hogyan jutok el az állomásra?\n- **Go straight on and turn left.** – Menj egyenesen, és fordulj balra.\n- **A return ticket to Oxford, please.** – Egy retúrjegyet kérek Oxfordba.\n- **What time does the train leave?** – Hánykor indul a vonat?',
          widget: { type: 'parositas', options: { title: 'Étel és utazás', count: 6, pairs: [
            ['pear', 'körte'], ['plum', 'szilva'], ['cherry', 'cseresznye'], ['grapes', 'szőlő'], ['beef', 'marhahús'], ['pork', 'sertéshús'],
            ['The bill, please.', 'A számlát kérném.'], ['return ticket', 'retúrjegy'], ['luggage', 'csomag, poggyász'],
            ['platform', 'vágány, peron'], ['airport', 'repülőtér'], ['on foot', 'gyalog'], ['straight on', 'egyenesen'],
            ['underground', 'metró'], ['suitcase', 'bőrönd'], ['passport', 'útlevél']
          ] } }
        },
        {
          title: 'Technika és szakmák (technology and jobs)',
          text: 'Technika:\n\n- **computer, laptop, tablet, smartphone** – számítógép, laptop, tablet, okostelefon\n- **screen** – képernyő, **keyboard** – billentyűzet, **mouse** – egér, **charger** – töltő\n- **download** – letölt, **upload** – feltölt, **click** – kattint, **save** – ment, **delete** – töröl\n- **password** – jelszó, **app** – alkalmazás, **Wi-Fi**, **battery** – akkumulátor, elem\n\n- **My battery is low. Have you got a charger?** – Lemerülőben van az akkum. Van töltőd?\n- **Don’t tell anyone your password!** – Senkinek ne mondd el a jelszavad!\n\nSzakmák (jobs):\n\n- **doctor** – orvos, **nurse** – ápoló, **teacher** – tanár\n- **engineer** – mérnök, **electrician** – villanyszerelő, **mechanic** – autószerelő\n- **cook / chef** – szakács, **farmer** – gazda, **firefighter** – tűzoltó\n- **police officer** – rendőr, **shop assistant** – eladó, **programmer** – programozó\n\n- **What does your mum do? – She’s a nurse.** – Mi az anyukád foglalkozása? – Ápoló.\n- **I want to be a programmer.** – Programozó szeretnék lenni.',
          warn: 'Ne feledd a névelőt a szakma előtt: **She’s a nurse.**, **He’s an electrician.** A „What does he do?” a foglalkozásra kérdez rá, nem arra, hogy éppen mit csinál (az: **What is he doing?**).',
          widget: { type: 'parositas', options: { title: 'Technika és szakmák', count: 6, pairs: [
            ['keyboard', 'billentyűzet'], ['screen', 'képernyő'], ['charger', 'töltő'], ['password', 'jelszó'], ['download', 'letölt'],
            ['delete', 'töröl'], ['battery', 'akkumulátor, elem'], ['nurse', 'ápoló'], ['engineer', 'mérnök'], ['electrician', 'villanyszerelő'],
            ['mechanic', 'autószerelő'], ['firefighter', 'tűzoltó'], ['shop assistant', 'eladó'], ['police officer', 'rendőr'], ['cook', 'szakács']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mit jelent: „my younger sister”?', options: ['a nővérem', 'a húgom', 'az unokatestvérem', 'a nagynéném'], answer: 1, explain: 'Younger sister = fiatalabb lánytestvér, vagyis húg. A nővér older sister.' },
        { q: 'Melyik a helyes? „I have to ___ my homework.”', options: ['make', 'do', 'write up', 'take'], answer: 1, explain: 'A házi feladatot angolul do-val csináljuk: do my homework.' },
        { q: 'Hogyan mondod: „Busszal megyek iskolába.”?', options: ['I go to school with the bus.', 'I go to school by bus.', 'I go to the school by a bus.', 'I go to school on bus.'], answer: 1, explain: 'Járműnél by + jármű névelő nélkül: by bus. A go to school is névelő nélküli állandó kifejezés.' },
        { q: 'Mit jelent az „electrician”?', options: ['villanyszerelő', 'elektronika', 'villanyáram', 'mérnök'], answer: 0, explain: 'Az electrician szakmát jelöl: villanyszerelő. A mérnök engineer.' }
      ]
    }
  ]
});
