/* Nyelvtanulás – Görög (A1–A2) – 10 egység. A szavak görög betűsek, a 3. elem egyszerű, magyaros latin betűs átírás (a hangsúlyt ékezet jelöli). */
STUDIE.addLangCourse({
  id: 'gorog', title: 'Görög', flag: '🇬🇷', tts: 'el-GR', badge: 'A1–A2',
  noSpaces: false, script: true,
  intro: 'A görög több mint 3000 éve írott nyelv, és a magyarban is mindenhol ott van: a filozófia, a matematika, a demokrácia, a földrajz tudományneve, a geográfia, sőt a telefon is görög szóelemekből áll.',
  units: [
    {
      id: 'koszones', title: 'Köszönés és bemutatkozás', icon: '👋',
      tip: '**A görög ábécé** 24 betűből áll – sokat már ismersz a matekból (α, β, π, Σ)!\n\n**Becsapós betűk**: latinnak látszanak, de nem azok.\n\n- **Η, η = i** (nem h!)\n- **Ρ, ρ = r** (nem p!)\n- **Χ, χ = h** (nem x!)\n- **Υ, υ = i** (nem y!)\n- **Β, β = v** (nem b!)\n- **Ν, ν = n** (nem v!)\n\n**Az átírásról:** a szavak mellett magyaros átírás áll, ezt válaszként is beírhatod. A szabályok: **σ = sz**, **ξ = ksz**, **ψ = psz**, **θ = th** (mint az angol `think`), **δ = dh** (mint az angol `this`), **γ = g**, de e és i hang előtt **j**. Betűpárok: **ου = u**, **αι = e**, **ει, οι = i**, **αυ = av/af**, **ευ = ev/ef**, **μπ = b**, **ντ = d**, **τσ = c** (szó belsejében **mb**, **nd**).\n\nA hangsúlyos magánhangzót ékezet jelöli: `kaliméra`, `efharisztó`. Vigyázat: itt az **á, é, í, ó, ú csak a hangsúlyt mutatja**, nem hosszú hangot – a görögben nincs hosszú magánhangzó!',
      words: [['γεια σου', 'szia', 'ja szu'], ['γεια σας', 'jó napot kívánok', 'ja szasz'], ['καλημέρα', 'jó reggelt', 'kaliméra'], ['καλησπέρα', 'jó estét', 'kaliszpéra'], ['καληνύχτα', 'jó éjszakát', 'kaliníhta'],
        ['αντίο', 'viszontlátásra', 'andío'], ['ευχαριστώ', 'köszönöm', 'efharisztó'], ['παρακαλώ', 'kérem; szívesen', 'parakaló'], ['ναι', 'igen', 'ne'], ['όχι', 'nem', 'óhi'], ['συγγνώμη', 'bocsánat', 'szignómi'],
        ['τι κάνεις;', 'hogy vagy?', 'ti kánisz'], ['καλά', 'jól', 'kalá'], ['με λένε', 'a nevem', 'me léne'], ['πώς σε λένε;', 'hogy hívnak?', 'posz sze léne'], ['χαίρω πολύ', 'örvendek', 'héro polí'],
        ['ο φίλος', 'barát', 'o fílosz'], ['εγώ', 'én', 'egó'], ['εσύ', 'te', 'eszí']],
      sentences: [
        ['Γεια σου, Μαρία!', 'Szia, Mária!'],
        ['Με λένε Άννα.', 'Annának hívnak.', [], ['A nevem Anna.', 'Anna vagyok.']],
        ['Πώς σε λένε;', 'Hogy hívnak?', [], ['Mi a neved?']],
        ['Τι κάνεις;', 'Hogy vagy?'],
        ['Καλά, ευχαριστώ.', 'Jól, köszönöm.', ['Είμαι καλά, ευχαριστώ.'], ['Jól vagyok, köszönöm.', 'Köszönöm, jól.']],
        ['Χαίρω πολύ.', 'Örvendek.', [], ['Örülök, hogy megismertelek.', 'Nagyon örülök.']],
        ['Ναι, παρακαλώ.', 'Igen, kérem.', [], ['Igen, kérek.', 'Igen, kérlek.']],
        ['Όχι, ευχαριστώ.', 'Nem, köszönöm.'],
        ['Καληνύχτα, φίλε!', 'Jó éjszakát, barátom!'],
        ['Εγώ είμαι ο Νίκος.', 'Én Nikosz vagyok.', ['Είμαι ο Νίκος.'], ['Nikosz vagyok.']],
        ['Συγγνώμη, πώς σε λένε;', 'Bocsánat, hogy hívnak?', [], ['Elnézést, hogy hívnak?', 'Bocsánat, mi a neved?']],
        ['Αντίο, Μαρία!', 'Viszontlátásra, Mária!', [], ['Viszlát, Mária!']]
      ]
    },
    {
      id: 'szamok', title: 'Számok', icon: '🔢',
      tip: '**A hangsúlyjel (τόνος)**\n\nA magyarban mindig az első szótag hangsúlyos. A görögben bármelyik lehet – de nem kell találgatnod: minden többszótagú szón **ékezet (τόνος)** jelöli a hangsúlyos magánhangzót: `δέκα` (**dh**éka), `εκατό` (eka**tó**).\n\nA tonos jelentést is megkülönböztet: `πότε` = mikor, de `ποτέ` = soha! Az egyszótagú szavak általában nem kapnak ékezetet: `γεια`, `και`, `με`.\n\n**Számok**\n\n- 13–19: `δεκατρία`, `δεκατέσσερα`, `δεκαπέντε` … – szó szerint „tízhárom”, mint a magyar tizen-három\n- 21: `είκοσι ένα`, 35: `τριάντα πέντε`\n- Az **1, 3, 4** nemtől függően változik: `ένας` (hím), `μία` (nő), `ένα` (semleges); `τρεις` / `τρία`, `τέσσερις` / `τέσσερα`. Most a semleges alakot tanulod, ezzel számolunk.\n\nÉletkor: `Είμαι δώδεκα χρονών.` – Tizenkét éves vagyok (szó szerint: tizenkét évű vagyok).',
      words: [['μηδέν', 'nulla', 'midhén'], ['ένα', 'egy', 'éna'], ['δύο', 'kettő', 'dhío'], ['τρία', 'három', 'tría'], ['τέσσερα', 'négy', 'tészera'], ['πέντε', 'öt', 'pénde'], ['έξι', 'hat', 'ékszi'],
        ['εφτά', 'hét', 'eftá'], ['οχτώ', 'nyolc', 'ohtó'], ['εννιά', 'kilenc', 'enniá'], ['δέκα', 'tíz', 'dhéka'], ['έντεκα', 'tizenegy', 'éndeka'], ['δώδεκα', 'tizenkettő', 'dhódheka'],
        ['είκοσι', 'húsz', 'íkoszi'], ['τριάντα', 'harminc', 'triánda'], ['πενήντα', 'ötven', 'penínda'], ['εκατό', 'száz', 'ekató'], ['πόσα;', 'hány?', 'pósza']],
      sentences: [
        ['Ένα, δύο, τρία.', 'Egy, kettő, három.', [], ['Egy, két, három.']],
        ['Πόσων χρονών είσαι;', 'Hány éves vagy?', ['Πόσο χρονών είσαι;']],
        ['Είμαι δώδεκα χρονών.', 'Tizenkét éves vagyok.', [], ['Én tizenkét éves vagyok.']],
        ['Πέντε και πέντε κάνουν δέκα.', 'Öt meg öt az tíz.', [], ['Öt plusz öt az tíz.', 'Öt meg öt tíz.']],
        ['Δέκα μείον δύο κάνουν οχτώ.', 'Tíz mínusz kettő az nyolc.', [], ['Tíz mínusz kettő nyolc.', 'Tízből kettő az nyolc.']],
        ['Δύο καφέδες, παρακαλώ.', 'Két kávét kérek.', [], ['Két kávét, kérem.', 'Két kávét kérek szépen.']],
        ['Έχω τρία βιβλία.', 'Három könyvem van.'],
        ['Η μαμά μου είναι σαράντα χρονών.', 'Anyukám negyven éves.', [], ['Az anyukám negyven éves.', 'Anyám negyven éves.']],
        ['Πόσα μήλα θέλεις;', 'Hány almát kérsz?', [], ['Hány almát szeretnél?']],
        ['Θέλω έξι μήλα.', 'Hat almát kérek.', [], ['Hat almát szeretnék.']],
        ['Η εβδομάδα έχει εφτά μέρες.', 'Egy hét hét napból áll.', [], ['Egy hétben hét nap van.', 'A hét hét napból áll.']]
      ]
    },
    {
      id: 'csalad', title: 'Család', icon: '👨‍👩‍👧',
      tip: '**Nemek és névelők**\n\nA magyarban nincs nyelvtani nem, a görögben három is van! Minden főnévnek neme van, és ezt a névelő elárulja:\n\n- **ο** – hímnem: `ο πατέρας`, `ο σκύλος`\n- **η** – nőnem: `η μητέρα`, `η γάτα`\n- **το** – semlegesnem: `το παιδί`, `το σπίτι`\n\nA szóvég is segít: **-ος, -ας, -ης** többnyire hímnem, **-α, -η** nőnem, **-ο, -ι, -μα** semlegesnem. Ezért a főneveket mindig **névelővel együtt** tanuld!\n\nA határozatlan névelő is nem szerint változik: **ένας** (hím), **μια** (nő), **ένα** (semleges).\n\nA birtokos névmás a főnév **után** áll: `η μαμά μου` – anyukám (szó szerint „az anyu enyém”), `ο σκύλος σου` – a kutyád.\n\nA görög a nevek elé is névelőt tesz: `ο Νίκος`, `η Μαρία` – ahogy a magyar köznyelvben is mondjuk: „a Nikosz”.\n\nA `αυτός` (ő, hímnem) és `αυτή` (ő, nőnem) is megkülönbözteti a nemet.',
      words: [['η μητέρα', 'anya', 'i mitéra'], ['ο πατέρας', 'apa', 'o patérasz'], ['η μαμά', 'anyu', 'i mamá'], ['ο μπαμπάς', 'apu', 'o babász'], ['ο αδερφός', 'fiútestvér', 'o adherfósz'],
        ['η αδερφή', 'lánytestvér', 'i adherfí'], ['η γιαγιά', 'nagymama', 'i jajá'], ['ο παππούς', 'nagypapa', 'o papúsz'], ['η οικογένεια', 'család', 'i ikojénia'], ['το παιδί', 'gyerek', 'to pedhí'],
        ['ο γιος', 'fiú (valakinek a fia)', 'o josz'], ['η κόρη', 'lány (valakinek a lánya)', 'i kóri'], ['ο σκύλος', 'kutya', 'o szkílosz'], ['η γάτα', 'macska', 'i gáta'],
        ['μεγάλος', 'nagy', 'megálosz'], ['μικρός', 'kicsi', 'mikrósz'], ['αυτός', 'ő (hímnem)', 'aftósz'], ['αυτή', 'ő (nőnem)', 'aftí']],
      sentences: [
        ['Αυτή είναι η μητέρα μου.', 'Ő az anyám.', [], ['Ő az én anyám.', 'Ő az anyukám.']],
        ['Αυτός είναι ο πατέρας μου.', 'Ő az apám.', [], ['Ő az én apám.', 'Ő az apukám.']],
        ['Έχω έναν αδερφό.', 'Van egy fiútestvérem.', [], ['Egy fiútestvérem van.']],
        ['Η αδερφή μου είναι μικρή.', 'A húgom kicsi.', [], ['A lánytestvérem kicsi.']],
        ['Η γιαγιά μου έχει μια γάτα.', 'A nagymamámnak van egy macskája.', [], ['Nagymamámnak van egy macskája.']],
        ['Ο σκύλος είναι μεγάλος.', 'A kutya nagy.', [], ['Nagy a kutya.']],
        ['Έχεις αδέρφια;', 'Vannak testvéreid?', [], ['Van testvéred?']],
        ['Η οικογένειά μου είναι μεγάλη.', 'A családom nagy.', [], ['Nagy a családom.']],
        ['Το παιδί είναι μικρό.', 'A gyerek kicsi.', [], ['Kicsi a gyerek.']],
        ['Ο παππούς μου λέγεται Γιώργος.', 'A nagypapámat Jorgosznak hívják.', [], ['Nagypapámat Jorgosznak hívják.', 'A nagypapám neve Jorgosz.']],
        ['Έχουν έναν γιο και μια κόρη.', 'Van egy fiuk és egy lányuk.', [], ['Egy fiuk és egy lányuk van.']]
      ]
    },
    {
      id: 'iskola', title: 'Iskola és tárgyak', icon: '🎒',
      tip: '**Az είμαι (lenni) ige**\n\n- `είμαι` – vagyok\n- `είσαι` – vagy\n- `είναι` – van (ő)\n- `είμαστε` – vagyunk\n- `είστε` – vagytok / Ön van\n- `είναι` – vannak\n\nA személyes névmás (εγώ, εσύ) elhagyható, mert az igevég elárulja a személyt – pont, mint a magyarban. Fontos különbség: a görög harmadik személyben is kiteszi az igét: `Η τσάντα είναι μεγάλη.` – A táska nagy (szó szerint: nagy **van**).\n\n**Tagadás:** a `δεν` az ige elé kerül: `Δεν είμαι εδώ.` – Nem vagyok itt. (Az `όχι` önálló „nem” válasz.)\n\n**A görög kérdőjel a pontosvessző!** `Τι είναι αυτό;` – Mi ez? A kérdő mondat szórendje gyakran ugyanaz, mint a kijelentőé; a hanglejtés és a **;** jelzi, hogy kérdés. A görög pontosvessző pedig egy pont a sor tetején: **·**\n\nVicces hamis barát: a `ναι` (ne) jelentése **igen**!',
      words: [['το σχολείο', 'iskola', 'to szholío'], ['η τάξη', 'osztály', 'i tákszi'], ['ο δάσκαλος', 'tanító (férfi)', 'o dhászkalosz'], ['η δασκάλα', 'tanítónő', 'i dhaszkála'], ['ο μαθητής', 'diák (fiú)', 'o mathitísz'],
        ['η μαθήτρια', 'diáklány', 'i mathítria'], ['το βιβλίο', 'könyv', 'to vivlío'], ['το τετράδιο', 'füzet', 'to tetrádhio'], ['το στυλό', 'toll', 'to sztiló'], ['το μολύβι', 'ceruza', 'to molívi'],
        ['η γόμα', 'radír', 'i góma'], ['η τσάντα', 'táska', 'i cánda'], ['το θρανίο', 'iskolapad', 'to thranío'], ['ο πίνακας', 'tábla', 'o pínakasz'], ['το μάθημα', 'tanóra', 'to máthima'],
        ['είμαι', 'vagyok', 'íme'], ['δεν', 'nem (az ige előtt)', 'dhen'], ['εδώ', 'itt', 'edhó']],
      sentences: [
        ['Είμαι μαθητής.', 'Diák vagyok.', ['Εγώ είμαι μαθητής.'], ['Én diák vagyok.']],
        ['Αυτό είναι ένα βιβλίο.', 'Ez egy könyv.', [], ['Ez könyv.']],
        ['Τι είναι αυτό;', 'Mi ez?', [], ['Ez mi?']],
        ['Η δασκάλα είναι εδώ.', 'A tanítónő itt van.', [], ['Itt van a tanítónő.']],
        ['Ο Νίκος δεν είναι εδώ.', 'Nikosz nincs itt.'],
        ['Έχεις στυλό;', 'Van tollad?'],
        ['Ναι, έχω ένα στυλό.', 'Igen, van egy tollam.'],
        ['Η τσάντα μου είναι μεγάλη.', 'A táskám nagy.', [], ['Nagy a táskám.']],
        ['Είμαστε στην ίδια τάξη.', 'Egy osztályba járunk.', [], ['Ugyanabba az osztályba járunk.']],
        ['Το μάθημα είναι ενδιαφέρον.', 'Az óra érdekes.', [], ['Érdekes az óra.']],
        ['Δεν έχω γόμα.', 'Nincs radírom.'],
        ['Το τετράδιο είναι στο θρανίο.', 'A füzet a padon van.']
      ]
    },
    {
      id: 'etel', title: 'Étel és ital', icon: '🥗',
      tip: '**Igék -ω végződéssel**\n\nA görög igék szótári alakja az **egyes szám első személy** (nem főnévi igenév, mint a magyar „akarni”). A legtöbb ige **-ω**-ra végződik. Így ragozzuk a `θέλω` (akarok, kérek) igét:\n\n- `θέλω` – akarok\n- `θέλεις` – akarsz\n- `θέλει` – akar\n- `θέλουμε` – akarunk\n- `θέλετε` – akartok / Ön akar\n- `θέλουν` – akarnak\n\nUgyanígy: `πίνω` – iszom, `πίνεις` – iszol. A `τρώω` (eszem) kicsit rendhagyó: `τρως`, `τρώει`, `τρώμε`.\n\nRendeléskor elég: `Ένα τσάι, παρακαλώ.` – Egy teát kérek.\n\n**Szeretem = tetszik nekem:** `Μου αρέσει το ψάρι.` – szó szerint: „nekem tetszik a hal”. Ilyen a magyar „ízlik nekem” is! Ha több dolog tetszik: `Μου αρέσουν τα μήλα.`',
      words: [['το ψωμί', 'kenyér', 'to pszomí'], ['το νερό', 'víz', 'to neró'], ['το γάλα', 'tej', 'to gála'], ['ο καφές', 'kávé', 'o kafész'], ['το τσάι', 'tea', 'to cái'], ['το μήλο', 'alma', 'to mílo'],
        ['το τυρί', 'sajt', 'to tirí'], ['το αυγό', 'tojás', 'to avgó'], ['το κρέας', 'hús', 'to kréasz'], ['το ψάρι', 'hal', 'to pszári'], ['η σαλάτα', 'saláta', 'i szaláta'], ['η σούπα', 'leves', 'i szúpa'],
        ['το φρούτο', 'gyümölcs', 'to frúto'], ['το πρωινό', 'reggeli', 'to proinó'], ['θέλω', 'akarok, kérek', 'thélo'], ['τρώω', 'eszem', 'tróo'], ['πίνω', 'iszom', 'píno'], ['μου αρέσει', 'tetszik nekem, szeretem', 'mu arészi']],
      sentences: [
        ['Θέλω νερό.', 'Vizet kérek.', [], ['Vizet szeretnék.', 'Vizet akarok.']],
        ['Ένα τσάι, παρακαλώ.', 'Egy teát kérek.', [], ['Egy teát, kérem.', 'Egy teát kérek szépen.']],
        ['Τρώω ψωμί με τυρί.', 'Kenyeret eszem sajttal.', [], ['Sajtos kenyeret eszem.']],
        ['Πίνω γάλα.', 'Tejet iszom.'],
        ['Μου αρέσει το ψάρι.', 'Szeretem a halat.', ['Το ψάρι μου αρέσει.'], ['Ízlik a hal.']],
        ['Δεν μου αρέσει ο καφές.', 'Nem szeretem a kávét.'],
        ['Θέλεις καφέ;', 'Kérsz kávét?', [], ['Szeretnél kávét?']],
        ['Όχι, θέλω τσάι.', 'Nem, teát kérek.', [], ['Nem, teát szeretnék.']],
        ['Για πρωινό τρώω αυγά.', 'Reggelire tojást eszem.'],
        ['Η σούπα είναι πολύ καλή.', 'A leves nagyon jó.', [], ['Nagyon jó a leves.']],
        ['Τρώμε σαλάτα και κρέας.', 'Salátát és húst eszünk.']
      ]
    },
    {
      id: 'szinek', title: 'Színek és ruhák', icon: '🎨',
      tip: '**A melléknév egyezik a főnévvel**\n\nA magyar melléknév sosem változik a főnév előtt: piros alma, piros almák. A görögben a melléknév **nemben és számban igazodik** a főnévhez:\n\n- hímnem: `ο κόκκινος σκύλος` – a piros kutya\n- nőnem: `η κόκκινη μπλούζα` – a piros blúz\n- semlegesnem: `το κόκκινο μήλο` – a piros alma\n\nA minta tehát: **-ος / -η / -ο** (néha **-ος / -α / -ο**, pl. `ωραίος`, `ωραία`, `ωραίο`). A szavak listájában a hímnemű alakot látod.\n\nNéhány szín **sosem változik**, mert idegen eredetű: `μπλε` (kék), `γκρι` (szürke), `ροζ` (rózsaszín), `καφέ` (barna – a kávé színe!).\n\nÉrdekesség: a `τα παπούτσια` (cipő) a török `papuç` szóból jön – ahonnan a magyar **papucs** is!\n\nKérdés: `Τι χρώμα είναι;` – Milyen színű? A `πολύ` jelentése: nagyon.',
      words: [['το χρώμα', 'szín', 'to hróma'], ['κόκκινος', 'piros', 'kókinosz'], ['μπλε', 'kék', 'ble'], ['πράσινος', 'zöld', 'prászinosz'], ['κίτρινος', 'sárga', 'kítrinosz'], ['μαύρος', 'fekete', 'mávrosz'],
        ['άσπρος', 'fehér', 'ászprosz'], ['γκρι', 'szürke', 'gri'], ['ροζ', 'rózsaszín', 'roz'], ['καφέ', 'barna', 'kafé'], ['πορτοκαλί', 'narancssárga', 'portokalí'], ['η μπλούζα', 'blúz, felső', 'i blúza'],
        ['το παντελόνι', 'nadrág', 'to pandelóni'], ['η φούστα', 'szoknya', 'i fúszta'], ['το φόρεμα', 'ruha (női)', 'to fórema'], ['τα παπούτσια', 'cipő', 'ta papúcia'], ['το καπέλο', 'kalap', 'to kapélo'],
        ['το μπουφάν', 'dzseki', 'to bufán'], ['ωραίος', 'szép', 'oréosz']],
      sentences: [
        ['Το μήλο είναι κόκκινο.', 'Az alma piros.'],
        ['Η μπλούζα μου είναι άσπρη.', 'A blúzom fehér.', [], ['A felsőm fehér.']],
        ['Θέλω το μαύρο μπουφάν.', 'A fekete dzsekit kérem.', [], ['A fekete dzsekit szeretném.']],
        ['Το αγαπημένο μου χρώμα είναι το μπλε.', 'A kedvenc színem a kék.', [], ['Kedvenc színem a kék.']],
        ['Τι χρώμα είναι το παντελόνι σου;', 'Milyen színű a nadrágod?'],
        ['Το παντελόνι μου είναι γκρι.', 'A nadrágom szürke.'],
        ['Η φούστα είναι πολύ ωραία.', 'A szoknya nagyon szép.', [], ['Nagyon szép a szoknya.']],
        ['Το φόρεμα είναι κίτρινο.', 'A ruha sárga.'],
        ['Τα παπούτσια μου είναι καινούργια.', 'A cipőm új.', [], ['A cipőim újak.']],
        ['Ο σκύλος είναι μαύρος και άσπρος.', 'A kutya fekete és fehér.', [], ['A kutya fekete-fehér.']],
        ['Φοράω ένα πράσινο καπέλο.', 'Zöld kalapot hordok.', [], ['Zöld kalapot viselek.', 'Egy zöld kalap van rajtam.']]
      ]
    },
    {
      id: 'ido', title: 'Idő és napok', icon: '📅',
      tip: '**A hét napjai – számolva**\n\nA görög napnevek többsége egyszerűen sorszám:\n\n- `Δευτέρα` (hétfő) – második\n- `Τρίτη` (kedd) – harmadik\n- `Τετάρτη` (szerda) – negyedik\n- `Πέμπτη` (csütörtök) – ötödik\n- `Παρασκευή` (péntek) – előkészület (az ünnepre)\n- `Σάββατο` (szombat) – a héber sabbat szóból – végső soron a magyar szombat is innen ered\n- `Κυριακή` (vasárnap) – az Úr napja\n\nA magyarban is van ilyen: a **csütörtök** és a **péntek** szláv eredetű, jelentésük „negyedik” és „ötödik” nap.\n\nA napok nevét nagybetűvel írjuk. „Hétfőn” = `τη Δευτέρα`, „szombaton” = `το Σάββατο` – a névelő (tárgyesetben) fejezi ki az időpontot, nem kell külön rag.\n\nÓra: `Τι ώρα είναι;` – Hány óra van? `Είναι τρεις η ώρα.` – Három óra van. (Az óránál a `τρεις`, `τέσσερις` nőnemű alakot használjuk, mert az `η ώρα` nőnemű.)',
      words: [['η μέρα', 'nap', 'i méra'], ['η εβδομάδα', 'hét (naptári)', 'i evdhomádha'], ['η Δευτέρα', 'hétfő', 'i Dheftéra'], ['η Τρίτη', 'kedd', 'i Tríti'], ['η Τετάρτη', 'szerda', 'i Tetárti'],
        ['η Πέμπτη', 'csütörtök', 'i Pémpti'], ['η Παρασκευή', 'péntek', 'i Paraszkeví'], ['το Σάββατο', 'szombat', 'to Szávato'], ['η Κυριακή', 'vasárnap', 'i Kiriakí'], ['σήμερα', 'ma', 'szímera'],
        ['αύριο', 'holnap', 'ávrio'], ['χθες', 'tegnap', 'hthesz'], ['το πρωί', 'reggel', 'to proí'], ['το βράδυ', 'este', 'to vrádhi'], ['η ώρα', 'óra', 'i óra'], ['ο μήνας', 'hónap', 'o mínasz'],
        ['ο χρόνος', 'év', 'o hrónosz'], ['τώρα', 'most', 'tóra']],
      sentences: [
        ['Σήμερα είναι Δευτέρα.', 'Ma hétfő van.', [], ['Ma hétfő.']],
        ['Αύριο είναι Τρίτη.', 'Holnap kedd lesz.', [], ['Holnap kedd.', 'Holnap kedd van.']],
        ['Χθες ήταν Κυριακή.', 'Tegnap vasárnap volt.'],
        ['Τι ώρα είναι;', 'Hány óra van?', [], ['Mennyi az idő?', 'Hány óra?']],
        ['Είναι τρεις η ώρα.', 'Három óra van.', ['Είναι τρεις.'], ['Három óra.']],
        ['Το πρωί πηγαίνω στο σχολείο.', 'Reggel iskolába megyek.', [], ['Reggel megyek iskolába.']],
        ['Την Παρασκευή πάμε στο σινεμά.', 'Pénteken moziba megyünk.'],
        ['Τι κάνεις τώρα;', 'Mit csinálsz most?', [], ['Most mit csinálsz?']],
        ['Το βράδυ διαβάζω ένα βιβλίο.', 'Este olvasok egy könyvet.', [], ['Este könyvet olvasok.']],
        ['Ο χρόνος έχει δώδεκα μήνες.', 'Egy évben tizenkét hónap van.', [], ['Az év tizenkét hónapból áll.', 'Egy év tizenkét hónap.']],
        ['Το Σάββατο δεν έχουμε σχολείο.', 'Szombaton nincs iskola.']
      ]
    },
    {
      id: 'otthon', title: 'Otthon', icon: '🏠',
      tip: '**Hol? Hová? – a σε elöljárószó**\n\nA magyar ragok (-ban, -ba, -on, -ra, -nál) helyett a görög a szó **elé** tesz egy kis szót: **σε**. Ez összeolvad a névelővel:\n\n- σε + το = **στο**: `στο σπίτι` – otthon / haza\n- σε + τη(ν) = **στη(ν)**: `στην κουζίνα` – a konyhában / a konyhába\n- σε + τον = **στον**: `στον κήπο` – a kertben / a kertbe\n\nVagyis a `στο σπίτι` jelentheti azt is, hogy „otthon”, és azt is, hogy „haza” – a mondat dönti el: `Είμαι στο σπίτι.` (Otthon vagyok.) / `Πάω στο σπίτι.` (Hazamegyek.)\n\nA **ν** megmarad magánhangzó és bizonyos mássalhangzók (κ, π, τ, μπ, ντ, γκ, τσ, ξ, ψ) előtt: `στην πόρτα`, `στην ντουλάπα`, de `στη θάλασσα`.\n\n**Itt a tonos is számít:** `πού;` (hol?) kérdőszó ékezettel, a `που` (aki, ami) pedig ékezet nélkül.',
      words: [['το σπίτι', 'ház', 'to szpíti'], ['το δωμάτιο', 'szoba', 'to dhomátio'], ['η κουζίνα', 'konyha', 'i kuzína'], ['το μπάνιο', 'fürdőszoba', 'to bánio'], ['το υπνοδωμάτιο', 'hálószoba', 'to ipnodhomátio'],
        ['το σαλόνι', 'nappali', 'to szalóni'], ['η πόρτα', 'ajtó', 'i pórta'], ['το παράθυρο', 'ablak', 'to paráthiro'], ['το κρεβάτι', 'ágy', 'to kreváti'], ['η ντουλάπα', 'szekrény', 'i dulápa'],
        ['η καρέκλα', 'szék', 'i karékla'], ['το τραπέζι', 'asztal', 'to trapézi'], ['ο κήπος', 'kert', 'o kíposz'], ['η λάμπα', 'lámpa', 'i lámba'], ['η τηλεόραση', 'televízió', 'i tileóraszi'],
        ['το ψυγείο', 'hűtőszekrény', 'to pszijío'], ['πού;', 'hol?', 'pu'], ['εκεί', 'ott', 'ekí']],
      sentences: [
        ['Η μαμά είναι στην κουζίνα.', 'Anyu a konyhában van.', [], ['Az anyukám a konyhában van.', 'Anya a konyhában van.']],
        ['Πού είναι η γάτα;', 'Hol van a macska?', [], ['Hol a macska?']],
        ['Η γάτα είναι στο κρεβάτι.', 'A macska az ágyon van.', [], ['A macska az ágyban van.']],
        ['Είμαι στο σπίτι.', 'Otthon vagyok.'],
        ['Το σπίτι μας έχει τέσσερα δωμάτια.', 'A házunkban négy szoba van.', [], ['Négy szoba van a házunkban.', 'A házunk négyszobás.']],
        ['Ο σκύλος είναι στον κήπο.', 'A kutya a kertben van.'],
        ['Το γάλα είναι στο ψυγείο.', 'A tej a hűtőben van.', [], ['A tej a hűtőszekrényben van.']],
        ['Η τηλεόραση είναι στο σαλόνι.', 'A tévé a nappaliban van.', [], ['A televízió a nappaliban van.']],
        ['Τα βιβλία μου είναι στην ντουλάπα.', 'A könyveim a szekrényben vannak.'],
        ['Κλείσε την πόρτα, παρακαλώ.', 'Csukd be az ajtót, kérlek.', [], ['Kérlek, csukd be az ajtót.']],
        ['Ο μπαμπάς είναι εκεί.', 'Apu ott van.', [], ['Apa ott van.', 'Az apukám ott van.']]
      ]
    },
    {
      id: 'varos', title: 'Város és közlekedés', icon: '🚌',
      tip: '**Megyek valahová – valamivel**\n\n- `πάω` – megyek (rövid, beszélt alak; a hosszabb: `πηγαίνω`)\n- `πας` – mész, `πάει` – megy, `πάμε` – megyünk (és azt is jelenti: „Gyerünk!”)\n\nAz irányt a már ismert **σε** fejezi ki: `Πάω στο σχολείο.` – Iskolába megyek. `Πάμε στην Αθήνα.` – Athénba megyünk.\n\nA közlekedési eszközt a **με** (-val, -vel) elöljárószó és a névelő jelöli: `με το λεωφορείο` – busszal, `με το τρένο` – vonattal, `με το ποδήλατο` – biciklivel. A magyar egyetlen raggal oldja meg, a görög két külön szóval.\n\n**Útbaigazítás:**\n\n- `Στρίψε δεξιά.` – Fordulj jobbra.\n- `Στρίψε αριστερά.` – Fordulj balra.\n- `Πήγαινε ευθεία.` – Menj egyenesen.\n\nIdegennek udvariasan: `Συγγνώμη, πού είναι ο σταθμός;` – Elnézést, hol van az állomás?',
      words: [['η πόλη', 'város', 'i póli'], ['ο δρόμος', 'utca', 'o dhrómosz'], ['το λεωφορείο', 'busz', 'to leoforío'], ['το αυτοκίνητο', 'autó', 'to aftokínito'], ['το τρένο', 'vonat', 'to tréno'],
        ['το αεροπλάνο', 'repülőgép', 'to aeropláno'], ['το ποδήλατο', 'bicikli', 'to podhílato'], ['ο σταθμός', 'állomás', 'o sztathmósz'], ['το αεροδρόμιο', 'repülőtér', 'to aerodhrómio'],
        ['το μαγαζί', 'bolt', 'to magazí'], ['το νοσοκομείο', 'kórház', 'to noszokomío'], ['το πάρκο', 'park', 'to párko'], ['το μουσείο', 'múzeum', 'to muszío'], ['η θάλασσα', 'tenger', 'i thálasza'],
        ['δεξιά', 'jobbra', 'dheksziá'], ['αριστερά', 'balra', 'ariszterá'], ['ευθεία', 'egyenesen', 'efthía'], ['μακριά', 'messze', 'makriá'], ['κοντά', 'közel', 'kondá'], ['πάω', 'megyek', 'páo']],
      sentences: [
        ['Πάω στο σχολείο με το λεωφορείο.', 'Busszal megyek iskolába.', [], ['Iskolába busszal megyek.']],
        ['Πού είναι το μουσείο;', 'Hol van a múzeum?', [], ['Hol a múzeum?']],
        ['Το μουσείο είναι πολύ κοντά.', 'A múzeum nagyon közel van.', [], ['Nagyon közel van a múzeum.']],
        ['Στρίψε δεξιά.', 'Fordulj jobbra.', [], ['Jobbra fordulj.']],
        ['Πήγαινε ευθεία.', 'Menj egyenesen.', [], ['Egyenesen menj.']],
        ['Είναι μακριά το αεροδρόμιο;', 'Messze van a repülőtér?', ['Το αεροδρόμιο είναι μακριά;'], ['A repülőtér messze van?']],
        ['Ο μπαμπάς πάει στη δουλειά με το αυτοκίνητο.', 'Apu autóval megy dolgozni.', [], ['Apu autóval megy munkába.', 'Apa autóval megy dolgozni.']],
        ['Πάμε στην Αθήνα με το τρένο.', 'Vonattal megyünk Athénba.', [], ['Athénba vonattal megyünk.']],
        ['Πάω στο μαγαζί.', 'A boltba megyek.', [], ['Boltba megyek.']],
        ['Ο σταθμός είναι αριστερά.', 'Az állomás balra van.', [], ['Az állomás bal oldalon van.', 'Az állomás a bal oldalon van.']],
        ['Η πόλη είναι πολύ ωραία.', 'A város nagyon szép.', [], ['Nagyon szép a város.']],
        ['Θέλω να δω τη θάλασσα.', 'Látni szeretném a tengert.', [], ['Szeretném látni a tengert.']]
      ]
    },
    {
      id: 'mult', title: 'Hobbi és múlt idő', icon: '📸',
      tip: '**Múlt idő – első lépések**\n\nA görög egyszerű múlt idő (aorisztosz) végződései minden igénél ugyanazok:\n\n- `έπαιξα` – játszottam\n- `έπαιξες` – játszottál\n- `έπαιξε` – játszott\n- `παίξαμε` – játszottunk\n- `παίξατε` – játszottatok\n- `έπαιξαν` – játszottak\n\nFigyeld a hangsúlyt: múlt időben a **hátulról harmadik szótagra** kerül. Ha a szó ehhez túl rövid, kap egy **έ-** előtagot: `έ-παιξα`, de `παίξαμε` (itt már nem kell).\n\nA múlt idejű tő gyakran megváltozik, ezeket meg kell tanulni – mint a magyar megy → ment, eszik → evett:\n\n- `παίζω` → `έπαιξα`\n- `διαβάζω` → `διάβασα`\n- `πηγαίνω / πάω` → `πήγα`\n- `τρώω` → `έφαγα`\n- `πίνω` → `ήπια`\n- `βλέπω` → `είδα`\n\nA `δεν` itt is az ige elé kerül: `Δεν πήγα.` – Nem mentem.',
      words: [['το ποδόσφαιρο', 'foci', 'to podhószfero'], ['η μουσική', 'zene', 'i muszikí'], ['η ταινία', 'film', 'i tenía'], ['οι διακοπές', 'nyaralás', 'i dhiakopész'], ['πήγα', 'mentem', 'píga'],
        ['ήρθα', 'jöttem', 'írtha'], ['έφαγα', 'ettem', 'éfaga'], ['ήπια', 'ittam', 'ípia'], ['είδα', 'láttam', 'ídha'], ['έπαιξα', 'játszottam', 'épeksza'], ['διάβασα', 'olvastam', 'dhiávasza'],
        ['κολύμπησα', 'úsztam', 'kolímbisza'], ['άκουσα', 'hallgattam', 'ákusza'], ['έκανα', 'csináltam', 'ékana'], ['ήμουν', 'voltam', 'ímun'], ['ήταν', 'volt', 'ítan'], ['το καλοκαίρι', 'nyár', 'to kalokéri'], ['πέρσι', 'tavaly', 'pérszi']],
      sentences: [
        ['Χθες έπαιξα ποδόσφαιρο.', 'Tegnap fociztam.', ['Έπαιξα ποδόσφαιρο χθες.'], ['Tegnap futballoztam.']],
        ['Χθες το βράδυ είδαμε μια ταινία.', 'Tegnap este megnéztünk egy filmet.', [], ['Tegnap este filmet néztünk.']],
        ['Πέρσι πήγαμε στη θάλασσα.', 'Tavaly a tengerhez mentünk.', [], ['Tavaly a tengerpartra mentünk.']],
        ['Οι διακοπές ήταν πολύ ωραίες.', 'A nyaralás nagyon szép volt.', [], ['Nagyon szép volt a nyaralás.']],
        ['Τι έκανες;', 'Mit csináltál?'],
        ['Διάβασα ένα βιβλίο και άκουσα μουσική.', 'Olvastam egy könyvet és zenét hallgattam.', [], ['Elolvastam egy könyvet és zenét hallgattam.']],
        ['Ο φίλος μου ήρθε στο σπίτι μας.', 'A barátom eljött hozzánk.', [], ['A barátom átjött hozzánk.']],
        ['Κολυμπήσαμε στη θάλασσα.', 'Úsztunk a tengerben.', [], ['A tengerben úsztunk.']],
        ['Είδες την ταινία;', 'Láttad a filmet?'],
        ['Όχι, δεν την είδα.', 'Nem, nem láttam.'],
        ['Έφαγα ψάρι και ήπια νερό.', 'Halat ettem és vizet ittam.'],
        ['Το καλοκαίρι ήμουν στην Ελλάδα.', 'Nyáron Görögországban voltam.']
      ]
    }
  ]
});
