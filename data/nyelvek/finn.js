/* Finn nyelvtanfolyam (A1–A2) – a js/nyelvek.js motor adatai. */
STUDIE.addLangCourse({
  id: 'finn', title: 'Finn', flag: '🇫🇮', tts: 'fi-FI', badge: 'A1–A2',
  noSpaces: false, script: false,
  intro: 'A finn a magyar távoli nyelvrokona: közös ősük több ezer éve élt, ezért ma már nem értjük egymást – de a käsi (kéz), vesi (víz) és kala (hal) szavakban még ott a családi hasonlóság!',
  units: [
    {
      id: 'tervehdys', title: 'Köszönés és bemutatkozás', icon: '👋',
      tip: '**Rokonok vagyunk!** A finn és a magyar is az **uráli (finnugor)** nyelvcsaládba tartozik. A rokonság nem a mai szókincsben látszik, hanem a nyelv „csontvázában”:\n\n' +
        '- **magánhangzó-harmónia**: a toldalék igazodik a szóhoz, mint nálunk a házban/kertben;\n' +
        '- **nincs nyelvtani nem**: a `hän` egyszerre ő (fiú) és ő (lány), pont mint a magyar „ő”;\n' +
        '- **elöljárók helyett esetragok**: `Unkarissa` = Magyarország**on**, `talossa` = ház**ban**;\n' +
        '- a hangsúly mindig az **első szótagon** van.\n\n' +
        'Néhány nyelvészek által igazolt rokon szópár: **käsi – kéz**, **vesi – víz**, **kala – hal**, **silmä – szem**, **kivi – kő**, **mesi – méz** (a finnben ma inkább `hunaja`).\n\n' +
        'A finnt **úgy olvassuk, ahogy írjuk**: minden betű egy hangot jelöl. Az `ä` a magyar nyílt **e** (mint a „szem” e-je), az `y` a magyar **ü**, az `ö` ugyanaz, mint nálunk.',
      words: [
        ['hei', 'szia'], ['hyvää huomenta', 'jó reggelt'], ['hyvää päivää', 'jó napot'], ['hyvää iltaa', 'jó estét'],
        ['hyvää yötä', 'jó éjszakát'], ['näkemiin', 'viszontlátásra'], ['kiitos', 'köszönöm'], ['kyllä', 'igen'],
        ['ei', 'nem'], ['anteeksi', 'bocsánat'], ['ole hyvä', 'tessék'], ['mitä kuuluu?', 'hogy vagy?'],
        ['hyvin', 'jól'], ['nimi', 'név'], ['minä', 'én'], ['sinä', 'te'], ['Suomi', 'Finnország'], ['Unkari', 'Magyarország'],
        ['suomalainen', 'finn (ember)'], ['unkarilainen', 'magyar (ember)']
      ],
      sentences: [
        ['Minun nimeni on Anna.', 'A nevem Anna.', ['Nimeni on Anna.', 'Olen Anna.', 'Minä olen Anna.'], ['Az én nevem Anna.', 'Anna vagyok.', 'Annának hívnak.']],
        ['Mikä sinun nimesi on?', 'Mi a neved?', ['Mikä nimesi on?'], ['Hogy hívnak?', 'Mi a te neved?']],
        ['Hei, mitä kuuluu?', 'Szia, hogy vagy?'],
        ['Kiitos, hyvin.', 'Köszönöm, jól.'],
        ['Olen unkarilainen.', 'Magyar vagyok.', ['Minä olen unkarilainen.'], ['Én magyar vagyok.']],
        ['Oletko sinä suomalainen?', 'Finn vagy?', ['Oletko suomalainen?'], ['Te finn vagy?']],
        ['Kyllä, olen suomalainen.', 'Igen, finn vagyok.', ['Kyllä, minä olen suomalainen.']],
        ['Asun Unkarissa.', 'Magyarországon lakom.', ['Minä asun Unkarissa.'], ['Magyarországon élek.', 'Magyarországon lakok.', 'Én Magyarországon lakom.']],
        ['Hyvää huomenta, Anna!', 'Jó reggelt, Anna!'],
        ['Näkemiin, Pekka!', 'Viszontlátásra, Pekka!'],
        ['Anteeksi, en ymmärrä.', 'Bocsánat, nem értem.', ['Anteeksi, minä en ymmärrä.'], ['Elnézést, nem értem.']]
      ]
    },
    {
      id: 'numerot', title: 'Számok', icon: '🔢',
      tip: '**Hosszú és rövid hangok – a jelentés múlik rajta!**\n\n' +
        'A finnben a hosszú hangot **kettőzött betű** jelöli, magánhangzónál is (a magyar ékezet helyett):\n\n' +
        '- `tuli` = **tűz**\n' +
        '- `tuuli` = **szél** (hosszú u, mint az ú)\n' +
        '- `tulli` = **vám** (hosszú l, mint a magyar „tollal” ll-je)\n\n' +
        'Ugyanez a magyarban is megvan: **tör – tőr**, **kasza – kassza**. A finn tehát nem lesz idegen a fülednek!\n\n' +
        'A hangsúly mindig az **első szótagra** esik, akkor is, ha a második szótag hosszú: **KAH**-dek-san.\n\n' +
        '**Számok:** 11–19 = szám + `toista` (yksi**toista** = 11, kaksi**toista** = 12); a tízesek: szám + `kymmentä` (kaksi**kymmentä** = 20). Számnév után a főnév **részelő esetbe** kerül: `kolme kirjaa` (három könyv).',
      words: [
        ['nolla', 'nulla'], ['yksi', 'egy'], ['kaksi', 'kettő'], ['kolme', 'három'], ['neljä', 'négy'], ['viisi', 'öt'],
        ['kuusi', 'hat'], ['seitsemän', 'hét'], ['kahdeksan', 'nyolc'], ['yhdeksän', 'kilenc'], ['kymmenen', 'tíz'],
        ['yksitoista', 'tizenegy'], ['kaksikymmentä', 'húsz'], ['sata', 'száz'], ['kuinka monta?', 'hány?'],
        ['kirja', 'könyv'], ['tuli', 'tűz'], ['tuuli', 'szél'], ['tulli', 'vám']
      ],
      sentences: [
        ['Kuinka vanha sinä olet?', 'Hány éves vagy?', ['Kuinka vanha olet?'], ['Te hány éves vagy?']],
        ['Olen kaksitoista vuotta vanha.', 'Tizenkét éves vagyok.', ['Olen kaksitoistavuotias.', 'Minä olen kaksitoista vuotta vanha.']],
        ['Yksi, kaksi, kolme.', 'Egy, kettő, három.', [], ['Egy, két, három.']],
        ['Viisi plus viisi on kymmenen.', 'Öt meg öt az tíz.', [], ['Öt plusz öt az tíz.', 'Öt meg öt tíz.']],
        ['Minulla on kolme kirjaa.', 'Három könyvem van.', [], ['Nekem három könyvem van.']],
        ['Kuinka monta kirjaa sinulla on?', 'Hány könyved van?', [], ['Neked hány könyved van?']],
        ['Tuuli on kylmä.', 'Hideg a szél.', [], ['A szél hideg.']],
        ['Tuli on kuuma.', 'Forró a tűz.', [], ['A tűz forró.']],
        ['Minulla on yksitoista kirjaa.', 'Tizenegy könyvem van.'],
        ['Sata on iso numero.', 'A száz nagy szám.', [], ['Száz egy nagy szám.']]
      ]
    },
    {
      id: 'perhe', title: 'Család', icon: '👨‍👩‍👧',
      tip: '**Hän = ő – fiú is, lány is.** A finnben sincs nyelvtani nem, és nincs névelő sem (a „kissa” lehet a macska vagy egy macska).\n\n' +
        'Az **olla** (lenni) ige ragozása:\n\n' +
        '- `minä olen` – én vagyok, `sinä olet` – te vagy, `hän on` – ő van/ő…\n' +
        '- `me olemme`, `te olette`, `he ovat`\n\n' +
        'A finn is „-nál/-nél” jellegű raggal fejezi ki a birtoklást, épp mint a magyar „nálam van”: **Minulla on koira.** = szó szerint „nálam van kutya”, azaz **Van egy kutyám.** Nincs külön „birtokol” ige!\n\n' +
        'A birtokos személyjel is ismerős: `äiti` → `äitini` (anyám), `nimi` → `nimesi` (neved). A `minun äitini` (az én anyám) szerkezet a magyar **az én anyám** pontos párja.',
      words: [
        ['äiti', 'anya'], ['isä', 'apa'], ['veli', 'fiútestvér'], ['sisko', 'lánytestvér'], ['isoäiti', 'nagymama'],
        ['isoisä', 'nagypapa'], ['poika', 'fiú'], ['tyttö', 'lány'], ['lapsi', 'gyerek'], ['perhe', 'család'],
        ['vauva', 'kisbaba'], ['ystävä', 'barát'], ['koira', 'kutya'], ['kissa', 'macska'], ['hän', 'ő'],
        ['iso', 'nagy'], ['pieni', 'kicsi'], ['vanha', 'öreg'], ['kotona', 'otthon']
      ],
      sentences: [
        ['Tämä on minun äitini.', 'Ez az anyám.', ['Tämä on äitini.'], ['Ez az én anyám.', 'Ez az anyukám.']],
        ['Minulla on veli ja sisko.', 'Van egy fiútestvérem és egy lánytestvérem.', [], ['Van fiútestvérem és lánytestvérem.']],
        ['Minulla on koira.', 'Van egy kutyám.', [], ['Kutyám van.', 'Van kutyám.']],
        ['Hän on kymmenen vuotta vanha.', 'Ő tízéves.', ['Hän on kymmenenvuotias.'], ['Tízéves.', 'Ő tíz éves.']],
        ['Perheeni on pieni.', 'A családom kicsi.', ['Minun perheeni on pieni.'], ['Kicsi a családom.']],
        ['Isoäiti on vanha.', 'A nagymama öreg.', [], ['A nagymama idős.', 'Öreg a nagymama.']],
        ['Hän on minun ystäväni.', 'Ő a barátom.', ['Hän on ystäväni.'], ['Ő az én barátom.']],
        ['Meillä on kissa.', 'Van egy macskánk.', [], ['Macskánk van.', 'Van macskánk.']],
        ['Lapsi on pieni.', 'A gyerek kicsi.', [], ['Kicsi a gyerek.']],
        ['Isä ja äiti ovat kotona.', 'Apa és anya otthon vannak.', [], ['Apa és anya otthon van.']]
      ]
    },
    {
      id: 'koulu', title: 'Iskola és tárgyak', icon: '🏫',
      tip: '**A tagadó ige: en, et, ei**\n\n' +
        'A magyarban a „nem” sosem változik. A finnben viszont maga a **tagadószó ragozódik**, a főige pedig egy rövid, ragtalan alakba kerül:\n\n' +
        '- `minä en puhu` – nem beszélek\n' +
        '- `sinä et puhu` – nem beszélsz\n' +
        '- `hän ei puhu` – nem beszél\n' +
        '- `me emme`, `te ette`, `he eivät puhu`\n\n' +
        'Vagyis: **puhun → en puhu**, **ymmärrän → en ymmärrä**, **olen → en ole**. A tagadószó viszi a személyt, a főige ilyenkor a „szótő”.\n\n' +
        'Tagadásban a tárgy **részelő esetbe** kerül: `Minulla on kumi.` (Van radírom.) → `Minulla ei ole kumia.` (Nincs radírom.)\n\n' +
        'Kérdés: az ige végére `-ko/-kö` kerül: **Puhutko suomea?** = Beszélsz finnül?',
      words: [
        ['koulu', 'iskola'], ['opettaja', 'tanár'], ['oppilas', 'diák'], ['kynä', 'toll'], ['lyijykynä', 'ceruza'],
        ['vihko', 'füzet'], ['reppu', 'hátizsák'], ['pöytä', 'asztal'], ['tuoli', 'szék'], ['luokka', 'osztályterem'],
        ['tietokone', 'számítógép'], ['kumi', 'radír'], ['matematiikka', 'matematika'], ['lukea', 'olvasni'],
        ['kirjoittaa', 'írni'], ['opiskella', 'tanulni'], ['puhua', 'beszélni'], ['ymmärtää', 'érteni']
      ],
      sentences: [
        ['Minä luen kirjaa.', 'Könyvet olvasok.', ['Luen kirjaa.'], ['Egy könyvet olvasok.', 'Olvasok egy könyvet.', 'Én könyvet olvasok.']],
        ['En ymmärrä.', 'Nem értem.', ['Minä en ymmärrä.']],
        ['Puhutko suomea?', 'Beszélsz finnül?', ['Puhutko sinä suomea?'], ['Tudsz finnül?']],
        ['En puhu suomea.', 'Nem beszélek finnül.', ['Minä en puhu suomea.'], ['Nem tudok finnül.']],
        ['Puhun vähän englantia.', 'Beszélek egy kicsit angolul.', ['Minä puhun vähän englantia.'], ['Egy kicsit beszélek angolul.', 'Kicsit beszélek angolul.']],
        ['Opettaja on luokassa.', 'A tanár az osztályteremben van.', [], ['A tanár a teremben van.', 'A tanár az osztályban van.']],
        ['Kynä on pöydällä.', 'A toll az asztalon van.', [], ['Az asztalon van a toll.']],
        ['Hän ei ole koulussa.', 'Ő nincs az iskolában.', [], ['Nincs az iskolában.']],
        ['Kirjoitan vihkoon.', 'A füzetbe írok.', ['Minä kirjoitan vihkoon.'], ['Füzetbe írok.']],
        ['Onko sinulla kynä?', 'Van tollad?', [], ['Van egy tollad?', 'Neked van tollad?']],
        ['Minulla ei ole kumia.', 'Nincs radírom.', [], ['Nekem nincs radírom.']],
        ['Opiskelen matematiikkaa.', 'Matematikát tanulok.', ['Minä opiskelen matematiikkaa.'], ['Matekot tanulok.']]
      ]
    },
    {
      id: 'ruoka', title: 'Étel és ital', icon: '🍲',
      tip: '**A részelő eset (partitiivi) – „valamennyi valamiből”**\n\n' +
        'A finn egyik legfontosabb esete. Akkor használjuk, ha **nem egész, nem meghatározott mennyiségről** van szó, főleg anyagneveknél:\n\n' +
        '- `Juon vettä.` – Vizet iszom. (valamennyit)\n' +
        '- `Syön leipää.` – Kenyeret eszem.\n' +
        '- `Haluan jäätelöä.` – Fagylaltot szeretnék.\n\n' +
        'Végződése magánhangzó-harmónia szerint `-a/-ä`, `-ta/-tä` vagy `-tta/-ttä`: maito → **maitoa**, kahvi → **kahvia**, tee → **teetä**. A `vesi` rendhagyó: **vettä**.\n\n' +
        'Ha viszont **egy egész darabról** van szó, más az alak: `Haluatko omenan?` – Kérsz egy (egész) almát?\n\n' +
        'Jó hír: a **kala – hal** szópár itt is felbukkan, a finnek kedvenc ételei közt!',
      words: [
        ['vesi', 'víz'], ['maito', 'tej'], ['kahvi', 'kávé'], ['tee', 'tea'], ['mehu', 'gyümölcslé'], ['leipä', 'kenyér'],
        ['juusto', 'sajt'], ['voi', 'vaj'], ['kala', 'hal'], ['liha', 'hús'], ['omena', 'alma'], ['banaani', 'banán'],
        ['peruna', 'krumpli'], ['keitto', 'leves'], ['kakku', 'torta'], ['jäätelö', 'fagylalt'], ['syödä', 'enni'], ['juoda', 'inni']
      ],
      sentences: [
        ['Juon vettä.', 'Vizet iszom.', ['Minä juon vettä.'], ['Vizet iszok.', 'Iszom vizet.', 'Én vizet iszom.']],
        ['Syön leipää ja juustoa.', 'Kenyeret és sajtot eszem.', ['Minä syön leipää ja juustoa.'], ['Eszem kenyeret és sajtot.', 'Kenyeret és sajtot eszek.']],
        ['Minulla on nälkä.', 'Éhes vagyok.'],
        ['Haluan jäätelöä.', 'Fagylaltot szeretnék.', [], ['Fagyit szeretnék.', 'Fagylaltot akarok.']],
        ['Kala on hyvää.', 'A hal finom.', [], ['Finom a hal.', 'A hal jó.']],
        ['Juotko kahvia?', 'Iszol kávét?', ['Juotko sinä kahvia?'], ['Kávét iszol?']],
        ['En juo maitoa.', 'Nem iszom tejet.', ['Minä en juo maitoa.'], ['Nem iszok tejet.', 'Tejet nem iszom.']],
        ['Äiti tekee keittoa.', 'Anya levest főz.', [], ['Anya levest csinál.', 'Anyu levest főz.']],
        ['Haluatko omenan?', 'Kérsz egy almát?', [], ['Kérsz almát?', 'Akarsz egy almát?']],
        ['Lapset syövät kakkua.', 'A gyerekek tortát esznek.', [], ['A gyerekek süteményt esznek.']]
      ]
    },
    {
      id: 'varit', title: 'Színek és ruhák', icon: '🎨',
      tip: '**Magánhangzó-harmónia – mint otthon!**\n\n' +
        'A finn magánhangzók két csoportja nem keveredik egy szóban:\n\n' +
        '- **hátul képzett**: `a`, `o`, `u`\n' +
        '- **elöl képzett**: `ä`, `ö`, `y`\n' +
        '- **semleges**: `e`, `i` (bármelyikkel jöhet)\n\n' +
        'A toldalék igazodik: **talossa** (házban), de **metsässä** (erdőben) – pont mint a magyar ház**ban** – kert**ben**. A kérdő `-ko/-kö` is így viselkedik: **Onko?** (Van?), de **Ymmärrätkö?** (Érted?)\n\n' +
        '**Melléknevek:** egy nagy különbség a magyartól, hogy a finn melléknév **egyezik** a főnévvel esetben és számban: `punainen takki` (piros kabát), de többes számban `Housut ovat harmaat.` (A nadrág szürke – a `housut` a finnben többes számú.) Magyarul viszont: **piros házban**, nem „pirosban házban”.\n\n' +
        'A `-nen` végű melléknevek ragozott töve `-se-`/`-s-`: punai**nen** → punai**se**ssa.',
      words: [
        ['punainen', 'piros'], ['sininen', 'kék'], ['keltainen', 'sárga'], ['vihreä', 'zöld'], ['musta', 'fekete'],
        ['valkoinen', 'fehér'], ['ruskea', 'barna'], ['harmaa', 'szürke'], ['vaaleanpunainen', 'rózsaszín'],
        ['paita', 'ing'], ['housut', 'nadrág'], ['mekko', 'ruha'], ['kengät', 'cipő'], ['takki', 'kabát'],
        ['pipo', 'sapka'], ['väri', 'szín'], ['uusi', 'új'], ['kaunis', 'szép']
      ],
      sentences: [
        ['Paita on sininen.', 'Az ing kék.', [], ['Kék az ing.']],
        ['Minulla on punainen takki.', 'Piros kabátom van.', [], ['Van egy piros kabátom.']],
        ['Minkä värinen tämä on?', 'Milyen színű ez?', ['Mikä väri tämä on?'], ['Ez milyen színű?']],
        ['Kissa on musta.', 'A macska fekete.', [], ['Fekete a macska.']],
        ['Housut ovat harmaat.', 'A nadrág szürke.', [], ['Szürke a nadrág.']],
        ['Kengät ovat uudet.', 'A cipő új.', [], ['Új a cipő.', 'A cipők újak.']],
        ['Mekko on kaunis.', 'A ruha szép.', [], ['Szép a ruha.']],
        ['Pidän vihreästä.', 'Szeretem a zöldet.', ['Minä pidän vihreästä.'], ['A zöldet szeretem.']],
        ['Hänellä on keltainen pipo.', 'Neki sárga sapkája van.', [], ['Sárga sapkája van.', 'Van egy sárga sapkája.']],
        ['Haluan ruskeat kengät.', 'Barna cipőt szeretnék.', [], ['Barna cipőt akarok.']]
      ]
    },
    {
      id: 'aika', title: 'Idő, napok', icon: '📅',
      tip: '**Igetípusok – a főnévi igenév végződése elárulja a ragozást**\n\n' +
        'A finn igéket a szótári alak (főnévi igenév) vége szerint **hat típusba** soroljuk. Az első kettő a leggyakoribb:\n\n' +
        '- **1. típus**, két magánhangzóra végződik: `puhua` → **puhun, puhut, puhuu, puhumme, puhutte, puhuvat**\n' +
        '- **2. típus**, `-da/-dä`: `syödä` → **syön, syöt, syö**, `juoda` → **juon**\n' +
        '- **3. típus**, két mássalhangzó + e: `tulla` → **tulen**, `mennä` → **menen**\n' +
        '- **4. típus**, `-ta/-tä` magánhangzó után: `haluta` → **haluan**\n' +
        '- **5. típus** `-ita`: `tarvita` → **tarvitsen**; a **6. típus** ritka.\n\n' +
        'A személyragok mindig ugyanazok: `-n, -t, (hosszú mgh.), -mme, -tte, -vat/-vät`. Nyelvészek szerint az `-n` (én) a magyar -m (látom), a `-t` (te) a magyar -d (látod) távoli rokona.\n\n' +
        'A napneveket **kisbetűvel** írjuk, a „mikor?” kérdésre az `-na/-nä` rag felel: `lauantaina` = szombat**on**.',
      words: [
        ['maanantai', 'hétfő'], ['tiistai', 'kedd'], ['keskiviikko', 'szerda'], ['torstai', 'csütörtök'], ['perjantai', 'péntek'],
        ['lauantai', 'szombat'], ['sunnuntai', 'vasárnap'], ['päivä', 'nap'], ['viikko', 'hét'], ['kuukausi', 'hónap'],
        ['vuosi', 'év'], ['tänään', 'ma'], ['huomenna', 'holnap'], ['eilen', 'tegnap'], ['aamu', 'reggel'],
        ['ilta', 'este'], ['kello', 'óra'], ['nyt', 'most']
      ],
      sentences: [
        ['Tänään on maanantai.', 'Ma hétfő van.', [], ['Hétfő van ma.']],
        ['Huomenna on tiistai.', 'Holnap kedd lesz.', [], ['Holnap kedd van.']],
        ['Mitä kello on?', 'Hány óra van?', ['Paljonko kello on?']],
        ['Kello on kolme.', 'Három óra van.', [], ['Három óra.']],
        ['Lauantaina en mene kouluun.', 'Szombaton nem megyek iskolába.', ['Lauantaina minä en mene kouluun.'], ['Szombaton nem megyek az iskolába.']],
        ['Tulen huomenna.', 'Holnap jövök.', ['Minä tulen huomenna.'], ['Jövök holnap.']],
        ['Viikossa on seitsemän päivää.', 'Egy héten hét nap van.', [], ['Egy hétben hét nap van.']],
        ['Hyvää viikonloppua!', 'Jó hétvégét!'],
        ['Aamulla juon teetä.', 'Reggel teát iszom.', [], ['Reggel teát iszok.', 'Reggelente teát iszom.']],
        ['Illalla luen kirjaa.', 'Este könyvet olvasok.', [], ['Este olvasok egy könyvet.']],
        ['Eilen oli sunnuntai.', 'Tegnap vasárnap volt.', [], ['Vasárnap volt tegnap.']]
      ]
    },
    {
      id: 'koti', title: 'Otthon', icon: '🏠',
      tip: '**Mássalhangzó-fokváltakozás – a finn „trükk”**\n\n' +
        'Sok finn szóban a szó belsejében levő `k`, `p`, `t` **meggyengül**, ha a szótag zárttá válik (pl. `-ssa`, `-lla`, `-n` toldalék előtt):\n\n' +
        '- dupla → szimpla: `kauppa` → **kaupassa** (boltban), `kukka` → **kukat**\n' +
        '- `t` → `d`: `pöytä` → **pöydällä** (asztalon), `katu` → **kadulla**\n' +
        '- `p` → `v`: `tupa` → **tuvassa**\n' +
        '- `nk` → `ng`: `sänky` → **sängyssä** (ágyban), `Helsinki` → **Helsingissä**\n' +
        '- `k` eltűnhet: `reikä` → **reiän**\n\n' +
        'Nem kell most mindet bemagolnod – elég, ha nem lepődsz meg, amikor a `pöytä` hirtelen `pöydällä` lesz.\n\n' +
        'A szaunáról: a **sauna** az egyik legismertebb finn szó a világon, és Finnországban több mint hárommillió szauna van – nagyjából minden második emberre jut egy!',
      words: [
        ['talo', 'ház'], ['koti', 'otthon'], ['asunto', 'lakás'], ['huone', 'szoba'], ['keittiö', 'konyha'],
        ['kylpyhuone', 'fürdőszoba'], ['makuuhuone', 'hálószoba'], ['olohuone', 'nappali'], ['ikkuna', 'ablak'],
        ['ovi', 'ajtó'], ['sänky', 'ágy'], ['sohva', 'kanapé'], ['lamppu', 'lámpa'], ['sauna', 'szauna'],
        ['piha', 'udvar'], ['kaappi', 'szekrény'], ['matto', 'szőnyeg']
      ],
      sentences: [
        ['Asun talossa.', 'Házban lakom.', ['Minä asun talossa.'], ['Egy házban lakom.', 'Házban lakok.']],
        ['Meillä on sauna.', 'Van szaunánk.', [], ['Van egy szaunánk.', 'Nekünk van szaunánk.']],
        ['Äiti on keittiössä.', 'Anya a konyhában van.', [], ['Anyu a konyhában van.']],
        ['Kissa nukkuu sängyssä.', 'A macska az ágyban alszik.', [], ['A macska alszik az ágyban.']],
        ['Huoneessani on iso ikkuna.', 'A szobámban nagy ablak van.', [], ['A szobámban van egy nagy ablak.']],
        ['Ovi on auki.', 'Az ajtó nyitva van.', [], ['Nyitva van az ajtó.']],
        ['Isä istuu sohvalla.', 'Apa a kanapén ül.', [], ['Apa ül a kanapén.']],
        ['Lamppu on pöydällä.', 'A lámpa az asztalon van.', [], ['Az asztalon van a lámpa.']],
        ['Missä kylpyhuone on?', 'Hol van a fürdőszoba?', ['Missä on kylpyhuone?']],
        ['Leikimme pihalla.', 'Az udvaron játszunk.', ['Me leikimme pihalla.'], ['Játszunk az udvaron.']]
      ]
    },
    {
      id: 'kaupunki', title: 'Város és közlekedés', icon: '🚌',
      tip: '**Helyhatározó esetek – szinte mint a magyarban!**\n\n' +
        'Elöljárók helyett a finn is ragokat használ, és két „sorozata” van, akárcsak nekünk a -ban/-ból/-ba és az -on/-ról/-ra:\n\n' +
        '- **belső**: `-ssa` (-ban): kaupa**ssa**; `-sta` (-ból): kaupa**sta**; `-Vn`/`-hin` (-ba): kauppa**an**\n' +
        '- **külső**: `-lla` (-on, -nál): kadu**lla**; `-lta` (-ról, -tól): kadu**lta**; `-lle` (-ra, -hoz): kadu**lle**\n\n' +
        'A `-lla` a **járművet** is jelöli: `bussilla` = busszal, `pyörällä` = biciklivel.\n\n' +
        'Irányok: `vasemmalle` (balra), `oikealle` (jobbra), `suoraan` (egyenesen).\n\n' +
        'Névutók is vannak, mint a magyar „mellett”: `sairaalan vieressä` = a kórház **mellett** – a főnév előtte birtokos esetben áll (`-n`).',
      words: [
        ['kaupunki', 'város'], ['katu', 'utca'], ['kauppa', 'bolt'], ['pankki', 'bank'], ['kirjasto', 'könyvtár'],
        ['sairaala', 'kórház'], ['asema', 'állomás'], ['ravintola', 'étterem'], ['puisto', 'park'], ['bussi', 'busz'],
        ['juna', 'vonat'], ['raitiovaunu', 'villamos'], ['auto', 'autó'], ['pyörä', 'bicikli'], ['lentokone', 'repülőgép'],
        ['vasemmalle', 'balra'], ['oikealle', 'jobbra'], ['suoraan', 'egyenesen']
      ],
      sentences: [
        ['Missä on asema?', 'Hol van az állomás?', ['Missä asema on?']],
        ['Menen kouluun bussilla.', 'Busszal megyek iskolába.', ['Minä menen kouluun bussilla.', 'Menen bussilla kouluun.'], ['Busszal megyek az iskolába.', 'Iskolába busszal megyek.']],
        ['Kirjasto on vasemmalla.', 'A könyvtár balra van.', [], ['A könyvtár bal oldalon van.', 'Balra van a könyvtár.']],
        ['Mene suoraan ja sitten oikealle.', 'Menj egyenesen, aztán jobbra.', [], ['Menj egyenesen és aztán jobbra.']],
        ['Tulen kaupasta.', 'A boltból jövök.', ['Minä tulen kaupasta.'], ['Boltból jövök.']],
        ['Helsinki on iso kaupunki.', 'Helsinki nagy város.', [], ['Helsinki egy nagy város.']],
        ['Juna lähtee kello kymmenen.', 'A vonat tíz órakor indul.', ['Juna lähtee kymmeneltä.'], ['A vonat tízkor indul.']],
        ['Ajan pyörällä puistoon.', 'Biciklivel megyek a parkba.', ['Minä ajan pyörällä puistoon.'], ['A parkba biciklivel megyek.']],
        ['Syömme ravintolassa.', 'Étteremben eszünk.', ['Me syömme ravintolassa.'], ['Egy étteremben eszünk.']],
        ['Pankki on sairaalan vieressä.', 'A bank a kórház mellett van.', [], ['A kórház mellett van a bank.']]
      ]
    },
    {
      id: 'vapaa-aika', title: 'Hobbi és vásárlás', icon: '⚽',
      tip: '**Pidän musiikista – „a zenéből tartok”**\n\n' +
        'A „szeretni valamit” igéje, a `pitää`, nem tárgyat kér, hanem **-ból/-ből** jellegű ragot (`-sta/-stä`):\n\n' +
        '- `Pidän jalkapallosta.` – Szeretem a focit.\n' +
        '- `Pidätkö musiikista?` – Szereted a zenét?\n\n' +
        'Ragozása fokváltakozással: **pidän, pidät, pitää, pidämme, pidätte, pitävät**.\n\n' +
        '**Vásárlás:** `Kuinka paljon tämä maksaa?` vagy `Paljonko tämä maksaa?` – Mennyibe kerül ez? A válaszban a számnév után ismét **részelő eset** jön: `viisi euroa` (öt euró).\n\n' +
        '**Sport Finnországban:** a nemzeti szenvedély a `jääkiekko` (jégkorong), télen pedig szinte mindenki `hiihtää` (sízik). A „téli”, „nyári” időhatározót az `-lla/-llä` rag fejezi ki: `talvella` (télen), `kesällä` (nyáron).',
      words: [
        ['urheilu', 'sport'], ['jalkapallo', 'foci'], ['jääkiekko', 'jégkorong'], ['uida', 'úszni'], ['hiihtää', 'síelni'],
        ['laulaa', 'énekelni'], ['tanssia', 'táncolni'], ['musiikki', 'zene'], ['elokuva', 'film'], ['kitara', 'gitár'],
        ['peli', 'játék'], ['järvi', 'tó'], ['maksaa', 'kerül (valamibe)'], ['euro', 'euró'], ['halpa', 'olcsó'],
        ['kallis', 'drága'], ['ostaa', 'venni (vásárolni)'], ['liian', 'túl']
      ],
      sentences: [
        ['Pidän jalkapallosta.', 'Szeretem a focit.', ['Minä pidän jalkapallosta.'], ['A focit szeretem.']],
        ['Pelaan jääkiekkoa.', 'Jégkorongozom.', ['Minä pelaan jääkiekkoa.'], ['Jégkorongozok.', 'Hokizom.', 'Hokizok.']],
        ['Talvella hiihdän.', 'Télen síelek.', ['Talvella minä hiihdän.', 'Hiihdän talvella.'], ['Télen sízek.', 'Síelek télen.']],
        ['Hän laulaa ja tanssii.', 'Ő énekel és táncol.', [], ['Énekel és táncol.']],
        ['Kuinka paljon tämä maksaa?', 'Mennyibe kerül ez?', ['Paljonko tämä maksaa?'], ['Ez mennyibe kerül?']],
        ['Se maksaa viisi euroa.', 'Öt euróba kerül.', [], ['Ez öt euróba kerül.', 'Öt euró.']],
        ['Tämä on liian kallis.', 'Ez túl drága.'],
        ['Haluan ostaa kitaran.', 'Szeretnék venni egy gitárt.', [], ['Egy gitárt szeretnék venni.', 'Szeretnék egy gitárt venni.', 'Gitárt akarok venni.']],
        ['Pidätkö musiikista?', 'Szereted a zenét?', ['Pidätkö sinä musiikista?'], ['Te szereted a zenét?']],
        ['Katsomme elokuvaa illalla.', 'Este filmet nézünk.', ['Illalla katsomme elokuvaa.'], ['Este egy filmet nézünk.']],
        ['Uimme järvessä.', 'A tóban úszunk.', ['Me uimme järvessä.'], ['Úszunk a tóban.']]
      ]
    }
  ]
});
