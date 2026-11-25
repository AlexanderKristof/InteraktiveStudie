/* Lengyel nyelvtanfolyam (A1–A2) – a js/nyelvek.js motor adatai. */
STUDIE.addLangCourse({
  id: 'lengyel', title: 'Lengyel', flag: '🇵🇱', tts: 'pl-PL', badge: 'A1–A2',
  noSpaces: false, script: false,
  intro: '„Lengyel, magyar – két jó barát, együtt harcol s issza borát.” Lengyelül: „Polak, Węgier – dwa bratanki, i do szabli, i do szklanki.” A két nép barátságának napja március 23.',
  units: [
    {
      id: 'powitanie', title: 'Köszönés és bemutatkozás', icon: '👋',
      tip: '**Kiejtés – a legnagyobb csapda a magyaroknak: s és sz fordítva!**\n\n' +
        '- `sz` = magyar **s**: **szkoła** (iskola); a sima `s` = magyar **sz**: **sok** (szok, gyümölcslé)\n' +
        '- `cz` = **cs**: **cześć**; a `c` = **c**, mint nálunk\n' +
        '- `rz` és `ż` = **zs**: **rzeka**, **może**\n' +
        '- `ś`, `ć`, `ź`, `ń` „lágy” hangok: az `ń` = **ny**, a többi kb. puha s, ty, gy-szerű zs (i előtt ékezet nélkül: **ci**, **si**, **zi**, **ni**)\n' +
        '- `ą` és `ę` orrhangok: kb. **on** és **en** (szó végén az `ę` sima **e**)\n' +
        '- `w` = **v**: **woda**; `ł` = angol **w** (rövid u): **łóżko**\n' +
        '- `ó` = **u**, `ch` = erős **h**, `y` = mélyebb, „tompa” **i**\n\n' +
        'Jó hír: a lengyel is **úgy olvasandó, ahogy írják**, ha egyszer megtanultad a betűket.\n\n' +
        'Megszólításnál a nevek gyakran megváltoznak (megszólító eset): **Anna → Anno!**, **mama → mamo!** – ezzel később találkozol.',
      words: [
        ['cześć', 'szia'], ['dzień dobry', 'jó napot'], ['dobry wieczór', 'jó estét'], ['dobranoc', 'jó éjszakát'],
        ['do widzenia', 'viszontlátásra'], ['tak', 'igen'], ['nie', 'nem'], ['dziękuję', 'köszönöm'], ['proszę', 'kérem'],
        ['przepraszam', 'elnézést'], ['jak się masz?', 'hogy vagy?'], ['dobrze', 'jól'], ['imię', 'név'], ['ja', 'én'],
        ['ty', 'te'], ['Polska', 'Lengyelország'], ['Węgry', 'Magyarország'], ['Polak', 'lengyel (férfi)'], ['Węgier', 'magyar (férfi)']
      ],
      sentences: [
        ['Mam na imię Anna.', 'Annának hívnak.', ['Jestem Anna.', 'Nazywam się Anna.'], ['Anna vagyok.', 'A nevem Anna.']],
        ['Jak masz na imię?', 'Hogy hívnak?', ['Jak się nazywasz?'], ['Mi a neved?']],
        ['Jak się masz?', 'Hogy vagy?'],
        ['Dziękuję, dobrze.', 'Köszönöm, jól.'],
        ['Jestem z Węgier.', 'Magyarországról jöttem.', [], ['Magyarországról származom.', 'Magyarországi vagyok.']],
        ['Jestem Węgrem.', 'Magyar vagyok.', ['Jestem Węgierką.'], ['Én magyar vagyok.']],
        ['Czy jesteś Polakiem?', 'Lengyel vagy?', ['Jesteś Polakiem?', 'Czy jesteś Polką?', 'Jesteś Polką?'], ['Te lengyel vagy?']],
        ['Tak, jestem z Polski.', 'Igen, Lengyelországból jöttem.', [], ['Igen, lengyelországi vagyok.']],
        ['Cześć, Tomek!', 'Szia, Tomek!'],
        ['Przepraszam, nie rozumiem.', 'Elnézést, nem értem.', [], ['Bocsánat, nem értem.']],
        ['Dzień dobry, jak się masz?', 'Jó napot, hogy vagy?']
      ]
    },
    {
      id: 'liczby', title: 'Számok', icon: '🔢',
      tip: '**Hangsúly: mindig az utolsó előtti szótagon!**\n\n' +
        'A magyarban az első szótag hangsúlyos, a lengyelben szinte mindig az **utolsó előtti**: **POL-ska**, **WĘ-gry**, **dzię-KU-ję**, **prze-PRA-szam**, **DZIE-sięć**. Ha a szó toldalékot kap, a hangsúly „továbbcsúszik”: **ro-DZI-na** → **ro-dzi-NA-mi**.\n\n' +
        '**Orrhangok:** `pięć` (pjenyty), `dziesięć` – az `ę` itt orrhangú **en**.\n\n' +
        '**Számok és főnevek – három szabály:**\n\n' +
        '- 1 után egyes szám: `jeden kot`\n' +
        '- 2, 3, 4 után többes szám alanyeset: `dwa koty`, `trzy lata`\n' +
        '- 5-től birtokos többes szám: `pięć książek`, `dwanaście lat`\n\n' +
        'A magyarban mindig egyes szám jön (öt könyv), ezért ez eleinte szokatlan. Az életkor: **Mam dwanaście lat.** = „tizenkét évem van”.',
      words: [
        ['zero', 'nulla'], ['jeden', 'egy'], ['dwa', 'kettő'], ['trzy', 'három'], ['cztery', 'négy'], ['pięć', 'öt'],
        ['sześć', 'hat'], ['siedem', 'hét'], ['osiem', 'nyolc'], ['dziewięć', 'kilenc'], ['dziesięć', 'tíz'],
        ['jedenaście', 'tizenegy'], ['dwanaście', 'tizenkettő'], ['dwadzieścia', 'húsz'], ['sto', 'száz'],
        ['ile?', 'hány?'], ['rok', 'év']
      ],
      sentences: [
        ['Ile masz lat?', 'Hány éves vagy?', ['Ile ty masz lat?'], ['Te hány éves vagy?']],
        ['Mam dwanaście lat.', 'Tizenkét éves vagyok.'],
        ['Mam jedenaście lat.', 'Tizenegy éves vagyok.'],
        ['On ma dziewięć lat.', 'Ő kilencéves.', ['Ona ma dziewięć lat.'], ['Kilencéves.', 'Ő kilenc éves.']],
        ['Jeden, dwa, trzy.', 'Egy, kettő, három.', [], ['Egy, két, három.']],
        ['Dwa plus dwa to cztery.', 'Kettő meg kettő az négy.', [], ['Kettő plusz kettő az négy.']],
        ['Dziesięć minus trzy to siedem.', 'Tíz mínusz három az hét.', [], ['Tíz mínusz három egyenlő héttel.']],
        ['Mam dwa koty.', 'Két macskám van.', [], ['Van két macskám.']],
        ['Mam pięć książek.', 'Öt könyvem van.', [], ['Van öt könyvem.']],
        ['Sto to dużo.', 'A száz sok.', [], ['Száz az sok.']]
      ]
    },
    {
      id: 'rodzina', title: 'Család', icon: '👨‍👩‍👧',
      tip: '**Három nem, de nincs névelő**\n\n' +
        'A lengyelben nincs „a/az” és „egy” – a `kot` lehet a macska is, egy macska is. Cserébe minden főnévnek **nyelvtani neme** van, amit legtöbbször a végződés elárul:\n\n' +
        '- **hímnem**: mássalhangzóra végződik – `brat`, `pies`, `kot`, `dom`\n' +
        '- **nőnem**: többnyire `-a` – `mama`, `siostra`, `rodzina`\n' +
        '- **semlegesnem**: `-o`, `-e`, `-ę` – `dziecko`, `mieszkanie`, `imię`\n\n' +
        'Kivétel is van: a `tata` és a `dziadek` természetesen hímnem.\n\n' +
        'A nem a birtokos névmásokat és mellékneveket is megváltoztatja: **mój** brat, **moja** siostra, **moje** dziecko (az én…). Ugyanígy: **ten** / **ta** / **to** (ez a…).\n\n' +
        'A magyarban mindez ismeretlen – nálunk a „ő” is lehet fiú és lány, a lengyelben viszont `on` (ő, fiú), `ona` (ő, lány), `ono` (semleges).',
      words: [
        ['mama', 'anya'], ['tata', 'apa'], ['brat', 'fiútestvér'], ['siostra', 'lánytestvér'], ['babcia', 'nagymama'],
        ['dziadek', 'nagypapa'], ['chłopiec', 'fiú'], ['dziewczyna', 'lány'], ['dziecko', 'gyerek'], ['rodzina', 'család'],
        ['przyjaciel', 'barát'], ['przyjaciółka', 'barátnő'], ['pies', 'kutya'], ['kot', 'macska'], ['duży', 'nagy'],
        ['mały', 'kicsi'], ['stary', 'öreg'], ['młody', 'fiatal']
      ],
      sentences: [
        ['To jest moja mama.', 'Ez az anyukám.', ['To moja mama.'], ['Ez az anyám.', 'Ez az én anyukám.']],
        ['Mam brata i siostrę.', 'Van egy fiútestvérem és egy lánytestvérem.', [], ['Van fiútestvérem és lánytestvérem.']],
        ['Mój dziadek jest stary.', 'A nagypapám öreg.', [], ['Öreg a nagypapám.', 'A nagyapám öreg.']],
        ['Moja siostra jest mała.', 'A lánytestvérem kicsi.', [], ['A húgom kicsi.', 'Kicsi a lánytestvérem.']],
        ['Mam psa.', 'Van egy kutyám.', [], ['Kutyám van.', 'Van kutyám.']],
        ['Nasza rodzina jest duża.', 'A családunk nagy.', [], ['Nagy a családunk.']],
        ['Kot jest mały.', 'A macska kicsi.', [], ['Kicsi a macska.']],
        ['To jest mój przyjaciel.', 'Ez a barátom.', ['To mój przyjaciel.'], ['Ő a barátom.', 'Ez az én barátom.']],
        ['To jest moja przyjaciółka.', 'Ez a barátnőm.', ['To moja przyjaciółka.'], ['Ő a barátnőm.']],
        ['Babcia ma kota.', 'A nagymamának van egy macskája.', [], ['Nagymamának van egy macskája.', 'A nagymamának van macskája.']]
      ]
    },
    {
      id: 'szkola', title: 'Iskola és tárgyak', icon: '🏫',
      tip: '**Igeragozás: -ę / -esz, és a „lenni” ige**\n\n' +
        'Az igék többsége az **én** alakban `-ę`-re, a **te** alakban `-esz` vagy `-isz`-re végződik:\n\n' +
        '- `pisać` (írni): **piszę, piszesz, pisze, piszemy, piszecie, piszą**\n' +
        '- `mówić` (beszélni): **mówię, mówisz, mówi, mówimy, mówicie, mówią**\n\n' +
        'Egy másik nagy csoport `-am / -asz` (`czytać` → **czytam, czytasz**), illetve `-em / -esz` (`rozumieć` → **rozumiem, rozumiesz**).\n\n' +
        '**być** (lenni): **jestem, jesteś, jest, jesteśmy, jesteście, są**.\n\n' +
        'Mint a magyarban, a személyes névmás **elhagyható**, hiszen a végződés elárulja a személyt: `Piszę.` = Írok.\n\n' +
        'Nyelvek: `po polsku` = lengyelül, `po angielsku` = angolul, `po węgiersku` = magyarul. A tagadás egyszerű: `nie` az ige elé – **Nie rozumiem.**',
      words: [
        ['szkoła', 'iskola'], ['nauczyciel', 'tanár'], ['nauczycielka', 'tanárnő'], ['uczeń', 'diák'], ['książka', 'könyv'],
        ['zeszyt', 'füzet'], ['długopis', 'toll'], ['ołówek', 'ceruza'], ['plecak', 'hátizsák'], ['ławka', 'pad'],
        ['tablica', 'tábla'], ['klasa', 'osztályterem'], ['lekcja', 'tanóra'], ['czytać', 'olvasni'], ['pisać', 'írni'],
        ['mówić', 'beszélni'], ['rozumieć', 'érteni'], ['uczyć się', 'tanulni']
      ],
      sentences: [
        ['Czytam książkę.', 'Könyvet olvasok.', [], ['Egy könyvet olvasok.', 'Olvasok egy könyvet.']],
        ['Piszę w zeszycie.', 'A füzetbe írok.', [], ['Füzetbe írok.']],
        ['Mówisz po polsku?', 'Beszélsz lengyelül?', ['Czy mówisz po polsku?'], ['Tudsz lengyelül?']],
        ['Nie mówię po polsku.', 'Nem beszélek lengyelül.', [], ['Nem tudok lengyelül.']],
        ['Mówię trochę po angielsku.', 'Beszélek egy kicsit angolul.', [], ['Egy kicsit beszélek angolul.', 'Kicsit beszélek angolul.']],
        ['Nauczyciel jest w klasie.', 'A tanár az osztályteremben van.', [], ['A tanár a teremben van.', 'A tanár az osztályban van.']],
        ['Nie rozumiem.', 'Nem értem.'],
        ['Uczę się polskiego.', 'Lengyelül tanulok.', [], ['Lengyelt tanulok.', 'Lengyel nyelvet tanulok.']],
        ['Gdzie jest mój długopis?', 'Hol van a tollam?', [], ['Hol a tollam?']],
        ['Jesteśmy w szkole.', 'Az iskolában vagyunk.', [], ['Iskolában vagyunk.']],
        ['Uczeń pisze na tablicy.', 'A diák a táblára ír.', [], ['A diák ír a táblára.']]
      ]
    },
    {
      id: 'jedzenie', title: 'Étel és ital', icon: '🥟',
      tip: '**Esetek – a lengyel is ragoz!**\n\n' +
        'A lengyelben **7 eset** van. Ez a magyar 18 körüli esetéhez képest kevés – csakhogy a végződés a nemtől és a számtól is függ. Néhány alapeset:\n\n' +
        '- **alanyeset**: `kawa`, `woda`\n' +
        '- **tárgyeset** (mint a magyar -t): a nőnemű `-a` → `-ę`: **Piję kawę.** (Kávét iszom.) A hímnemű tárgyak és a semlegesnem nem változnak: **Jem chleb.**\n' +
        '- **birtokos eset** – tagadás után ez jön a tárgy helyett: **Nie piję kawy.** (Nem iszom kávét.)\n\n' +
        '**mieć** (birtokolni, „van neki”): **mam, masz, ma, mamy, macie, mają**. A magyar „van egy kutyám” helyett tehát: **Mam psa.** („bírok kutyát”).\n\n' +
        'A lengyel konyha híres étele a **pierogi** (töltött tészta) – a magyarok gyakran derelyéhez hasonlítják.',
      words: [
        ['woda', 'víz'], ['mleko', 'tej'], ['kawa', 'kávé'], ['herbata', 'tea'], ['sok', 'gyümölcslé'], ['chleb', 'kenyér'],
        ['ser', 'sajt'], ['masło', 'vaj'], ['ryba', 'hal'], ['mięso', 'hús'], ['jabłko', 'alma'], ['zupa', 'leves'],
        ['ciasto', 'sütemény'], ['lody', 'fagylalt'], ['ziemniaki', 'krumpli'], ['jeść', 'enni'], ['pić', 'inni'],
        ['śniadanie', 'reggeli'], ['obiad', 'ebéd'], ['kolacja', 'vacsora']
      ],
      sentences: [
        ['Piję wodę.', 'Vizet iszom.', [], ['Vizet iszok.', 'Iszom vizet.']],
        ['Jem chleb z serem.', 'Sajtos kenyeret eszem.', [], ['Kenyeret eszem sajttal.', 'Sajtos kenyeret eszek.']],
        ['Jestem głodny.', 'Éhes vagyok.', ['Jestem głodna.']],
        ['Nie piję kawy.', 'Nem iszom kávét.', [], ['Nem iszok kávét.', 'Kávét nem iszom.']],
        ['Czy chcesz herbatę?', 'Kérsz teát?', ['Chcesz herbatę?', 'Chcesz herbaty?', 'Czy chcesz herbaty?'], ['Kérsz egy teát?', 'Akarsz teát?']],
        ['Mama gotuje zupę.', 'Anya levest főz.', ['Mama robi zupę.'], ['Anyu levest főz.', 'Anya levest csinál.']],
        ['Lubię lody.', 'Szeretem a fagylaltot.', [], ['Szeretem a fagyit.']],
        ['Ryba jest smaczna.', 'A hal finom.', [], ['Finom a hal.']],
        ['Na śniadanie jem jabłko.', 'Reggelire almát eszem.', [], ['Reggelire egy almát eszem.', 'Reggelire almát eszek.']],
        ['Dzieci jedzą obiad.', 'A gyerekek ebédelnek.', [], ['A gyerekek ebédet esznek.']],
        ['Poproszę sok.', 'Egy gyümölcslevet kérek.', ['Proszę sok.'], ['Gyümölcslevet kérek.']]
      ]
    },
    {
      id: 'kolory', title: 'Színek és ruhák', icon: '🎨',
      tip: '**A melléknév igazodik a főnévhez**\n\n' +
        'A magyarban a melléknév nem változik: piros kabát, piros ruha. A lengyelben viszont a melléknév **nemben, számban és esetben egyezik** a főnévvel:\n\n' +
        '- hímnem: `czerwony` sweter\n' +
        '- nőnem: `czerwona` kurtka\n' +
        '- semlegesnem: `czerwone` jabłko\n' +
        '- többes szám (nem személyek): `czerwone` buty\n\n' +
        'A szótár mindig a **hímnemű** alakot adja meg (`-y` vagy `-i`): `niebieski` → `niebieska` koszulka.\n\n' +
        'Tárgyesetben a nőnemű melléknév is `-ą`-ra vált: **Mam czerwoną kurtkę.** (Piros kabátom van.)\n\n' +
        'Érdekesség: a `spodnie` (nadrág) a lengyelben **csak többes számú** szó, ezért: **Spodnie są szare.** (szó szerint „a nadrágok szürkék”).',
      words: [
        ['czerwony', 'piros'], ['niebieski', 'kék'], ['żółty', 'sárga'], ['zielony', 'zöld'], ['czarny', 'fekete'],
        ['biały', 'fehér'], ['brązowy', 'barna'], ['szary', 'szürke'], ['różowy', 'rózsaszín'], ['koszulka', 'póló'],
        ['spodnie', 'nadrág'], ['sukienka', 'ruha'], ['buty', 'cipő'], ['kurtka', 'kabát'], ['czapka', 'sapka'],
        ['kolor', 'szín'], ['nowy', 'új'], ['ładny', 'szép']
      ],
      sentences: [
        ['Koszulka jest niebieska.', 'A póló kék.', [], ['Kék a póló.']],
        ['Mam czerwoną kurtkę.', 'Piros kabátom van.', [], ['Van egy piros kabátom.', 'Piros dzsekim van.']],
        ['Jakiego koloru to jest?', 'Milyen színű ez?', ['Jaki to kolor?', 'Jakiego to jest koloru?'], ['Ez milyen színű?']],
        ['Kot jest czarny.', 'A macska fekete.', [], ['Fekete a macska.']],
        ['Spodnie są szare.', 'A nadrág szürke.', [], ['Szürke a nadrág.']],
        ['Buty są nowe.', 'A cipő új.', [], ['Új a cipő.', 'A cipők újak.']],
        ['Sukienka jest ładna.', 'A ruha szép.', [], ['Szép a ruha.']],
        ['Lubię kolor zielony.', 'Szeretem a zöld színt.', [], ['Szeretem a zöldet.', 'A zöld színt szeretem.']],
        ['Ona ma żółtą czapkę.', 'Neki sárga sapkája van.', [], ['Sárga sapkája van.', 'Van egy sárga sapkája.']],
        ['Chcę brązowe buty.', 'Barna cipőt szeretnék.', [], ['Barna cipőt akarok.']]
      ]
    },
    {
      id: 'czas', title: 'Idő, napok', icon: '📅',
      tip: '**Tegezés és magázás: ty, Pan, Pani**\n\n' +
        'Barátokkal, családdal, gyerekek között **ty** (te) a megszólítás: `Masz czas?` – Van időd?\n\n' +
        'Felnőtt idegennel, tanárral **Pan** (uram, férfinak) vagy **Pani** (asszonyom, nőnek), több embernél **Państwo**. Az ige ilyenkor **harmadik személyű** – pont mint a magyar **Ön/maga**:\n\n' +
        '- `Czy Pan ma czas?` – Van (Önnek) ideje?\n' +
        '- `Czy Pani mówi po angielsku?` – Beszél (Ön) angolul?\n\n' +
        'Levélben a megszólítást nagy kezdőbetűvel írják: **Pan**, **Pani**. A `Pan`/`Pani` név előtt is áll: **pan Nowak** = Nowak úr.\n\n' +
        'A `czy` szóval kezdődő mondat eldöntendő kérdés – a magyarban ezt csak a hanglejtés jelzi. A napneveket **kisbetűvel** írjuk; a „mikor?” kérdésre: `w sobotę` (szombaton), `w poniedziałek` (hétfőn).',
      words: [
        ['poniedziałek', 'hétfő'], ['wtorek', 'kedd'], ['środa', 'szerda'], ['czwartek', 'csütörtök'], ['piątek', 'péntek'],
        ['sobota', 'szombat'], ['niedziela', 'vasárnap'], ['dzień', 'nap'], ['tydzień', 'hét'], ['miesiąc', 'hónap'],
        ['dzisiaj', 'ma'], ['jutro', 'holnap'], ['wczoraj', 'tegnap'], ['rano', 'reggel'], ['wieczorem', 'este'],
        ['godzina', 'óra'], ['teraz', 'most'], ['czas', 'idő']
      ],
      sentences: [
        ['Dzisiaj jest poniedziałek.', 'Ma hétfő van.', ['Dziś jest poniedziałek.'], ['Hétfő van ma.']],
        ['Jutro jest wtorek.', 'Holnap kedd lesz.', ['Jutro będzie wtorek.'], ['Holnap kedd van.']],
        ['Która jest godzina?', 'Hány óra van?', ['Która godzina?']],
        ['Jest trzecia.', 'Három óra van.', ['Jest godzina trzecia.'], ['Három óra.']],
        ['W sobotę nie idę do szkoły.', 'Szombaton nem megyek iskolába.', [], ['Szombaton nem megyek az iskolába.']],
        ['Czy Pan ma czas?', 'Van ideje?', ['Czy Pani ma czas?', 'Pan ma czas?', 'Pani ma czas?'], ['Van Önnek ideje?', 'Önnek van ideje?']],
        ['Czy Pani mówi po angielsku?', 'Beszél angolul?', ['Czy Pan mówi po angielsku?', 'Pani mówi po angielsku?', 'Pan mówi po angielsku?'], ['Ön beszél angolul?', 'Tud angolul?']],
        ['Masz jutro czas?', 'Van időd holnap?', ['Czy masz jutro czas?', 'Masz czas jutro?'], ['Holnap van időd?', 'Ráérsz holnap?']],
        ['Rano piję herbatę.', 'Reggel teát iszom.', [], ['Reggel teát iszok.']],
        ['Miłego weekendu!', 'Jó hétvégét!'],
        ['Tydzień ma siedem dni.', 'Egy héten hét nap van.', [], ['Egy hétben hét nap van.', 'Egy hét hét napból áll.']]
      ]
    },
    {
      id: 'dom', title: 'Otthon', icon: '🏠',
      tip: '**Hol? – elöljáró + helyhatározó eset**\n\n' +
        'Ahol a magyar ragot tesz a szó végére (-ban, -on), a lengyel **elöljárót** tesz elé, **és** a főnév végét is megváltoztatja (helyhatározó eset, `miejscownik`):\n\n' +
        '- `w` + hely = **-ban/-ben**: dom → **w domu**, kuchnia → **w kuchni**, pokój → **w pokoju**\n' +
        '- `na` + hely = **-on/-en/-ön**: stół → **na stole**, łóżko → **na łóżku**, kanapa → **na kanapie**\n\n' +
        'Közben a szó belsejében is változhat egy-egy hang: `stół` → `stole`, `ogród` → `w ogrodzie`. Ne ijedj meg – a gyakori alakokat egyben érdemes megtanulni.\n\n' +
        '**Jestem w domu.** = Otthon vagyok (szó szerint „a házban”).\n\n' +
        'A `drzwi` (ajtó) – akárcsak a `spodnie` – csak többes számban létezik: **Drzwi są otwarte.**',
      words: [
        ['dom', 'ház'], ['mieszkanie', 'lakás'], ['pokój', 'szoba'], ['kuchnia', 'konyha'], ['łazienka', 'fürdőszoba'],
        ['sypialnia', 'hálószoba'], ['salon', 'nappali'], ['okno', 'ablak'], ['drzwi', 'ajtó'], ['łóżko', 'ágy'],
        ['kanapa', 'kanapé'], ['lampa', 'lámpa'], ['stół', 'asztal'], ['krzesło', 'szék'], ['szafa', 'szekrény'],
        ['ogród', 'kert'], ['w domu', 'otthon']
      ],
      sentences: [
        ['Mieszkam w dużym domu.', 'Nagy házban lakom.', [], ['Egy nagy házban lakom.', 'Nagy házban lakok.']],
        ['Mama jest w kuchni.', 'Anya a konyhában van.', [], ['Anyu a konyhában van.']],
        ['Kot śpi na łóżku.', 'A macska az ágyon alszik.', [], ['A macska alszik az ágyon.']],
        ['W moim pokoju jest duże okno.', 'A szobámban nagy ablak van.', [], ['A szobámban van egy nagy ablak.']],
        ['Drzwi są otwarte.', 'Az ajtó nyitva van.', [], ['Nyitva van az ajtó.']],
        ['Tata siedzi na kanapie.', 'Apa a kanapén ül.', [], ['Apa ül a kanapén.']],
        ['Lampa jest na stole.', 'A lámpa az asztalon van.', [], ['Az asztalon van a lámpa.']],
        ['Gdzie jest łazienka?', 'Hol van a fürdőszoba?'],
        ['Bawimy się w ogrodzie.', 'A kertben játszunk.', [], ['Játszunk a kertben.']],
        ['Jestem w domu.', 'Otthon vagyok.']
      ]
    },
    {
      id: 'miasto', title: 'Város és közlekedés', icon: '🚋',
      tip: '**Iść vagy jechać? – gyalog vagy járművel**\n\n' +
        'A magyar „megyek” két igének felel meg a lengyelben:\n\n' +
        '- `iść` – **gyalog megy**: **idę, idziesz, idzie**\n' +
        '- `jechać` – **járművel megy**: **jadę, jedziesz, jedzie**\n\n' +
        'A járművet **eszközhatározó esetben** mondjuk, elöljáró nélkül – pont mint a magyar -val/-vel: `autobusem` (busszal), `pociągiem` (vonattal), `rowerem` (biciklivel), `tramwajem` (villamossal).\n\n' +
        '**Hová?** A `do` + birtokos eset = **-ba/-be, -hoz**: `do szkoły` (iskolába), `do sklepu` (boltba), `do parku` (parkba).\n\n' +
        'Útbaigazítás: `w lewo` (balra), `w prawo` (jobbra), `prosto` (egyenesen); `po lewej` / `po prawej` = bal / jobb oldalon.',
      words: [
        ['miasto', 'város'], ['ulica', 'utca'], ['sklep', 'bolt'], ['bank', 'bank'], ['biblioteka', 'könyvtár'],
        ['szpital', 'kórház'], ['dworzec', 'pályaudvar'], ['restauracja', 'étterem'], ['park', 'park'], ['autobus', 'busz'],
        ['pociąg', 'vonat'], ['tramwaj', 'villamos'], ['samochód', 'autó'], ['rower', 'bicikli'], ['samolot', 'repülőgép'],
        ['w lewo', 'balra'], ['w prawo', 'jobbra'], ['prosto', 'egyenesen']
      ],
      sentences: [
        ['Gdzie jest dworzec?', 'Hol van a pályaudvar?', [], ['Hol van az állomás?']],
        ['Jadę do szkoły autobusem.', 'Busszal megyek iskolába.', ['Jadę autobusem do szkoły.'], ['Busszal megyek az iskolába.', 'Iskolába busszal megyek.']],
        ['Biblioteka jest po lewej.', 'A könyvtár balra van.', ['Biblioteka jest po lewej stronie.'], ['A könyvtár bal oldalon van.', 'Balra van a könyvtár.']],
        ['Idź prosto, potem w prawo.', 'Menj egyenesen, aztán jobbra.', ['Idź prosto, a potem w prawo.'], ['Menj egyenesen és aztán jobbra.']],
        ['Idę do sklepu.', 'A boltba megyek.', [], ['Boltba megyek.']],
        ['Kraków to piękne miasto.', 'Krakkó szép város.', ['Kraków jest pięknym miastem.'], ['Krakkó egy szép város.']],
        ['Pociąg odjeżdża o dziesiątej.', 'A vonat tízkor indul.', [], ['A vonat tíz órakor indul.']],
        ['Jadę rowerem do parku.', 'Biciklivel megyek a parkba.', ['Jadę do parku rowerem.'], ['A parkba biciklivel megyek.']],
        ['Jemy obiad w restauracji.', 'Étteremben ebédelünk.', [], ['Egy étteremben ebédelünk.']],
        ['Bank jest obok szpitala.', 'A bank a kórház mellett van.', [], ['A kórház mellett van a bank.']]
      ]
    },
    {
      id: 'hobby', title: 'Hobbi, vásárlás és múlt idő', icon: '⚽',
      tip: '**Múlt idő – a nem itt is számít!**\n\n' +
        'A múlt idő a főnévi igenév `-ć` végének levágásával és `-ł-` hozzáadásával készül. A különlegesség: **az „én” alakban is látszik, fiú vagy lány beszél!**\n\n' +
        '- fiú: `byłem` (voltam), `kupiłem` (vettem)\n' +
        '- lány: `byłam`, `kupiłam`\n' +
        '- te: `byłeś` / `byłaś`\n' +
        '- ő: `był` (fiú) / `była` (lány)\n' +
        '- mi: `byliśmy` / `byłyśmy` (csak lányok)\n\n' +
        'Tehát egy lány azt mondja: **Wczoraj byłam w kinie.**, egy fiú: **Wczoraj byłem w kinie.** (Tegnap moziban voltam.) A magyarban ilyen különbség nincs.\n\n' +
        '**Hobbi:** `grać w piłkę` (labdázni, focizni), de hangszeren `grać na gitarze` (gitározni). A `lubić` (szeretni) után tárgyeset jön: **Lubię muzykę.**\n\n' +
        'Pénz: a lengyel fizetőeszköz a **złoty** – szó szerint „arany”.',
      words: [
        ['sport', 'sport'], ['piłka nożna', 'foci'], ['pływać', 'úszni'], ['tańczyć', 'táncolni'], ['śpiewać', 'énekelni'],
        ['grać', 'játszani'], ['muzyka', 'zene'], ['film', 'film'], ['gitara', 'gitár'], ['kino', 'mozi'], ['jezioro', 'tó'],
        ['lubić', 'szeretni'], ['kupić', 'megvenni'], ['kosztować', 'kerül (valamibe)'], ['złoty', 'zloty'], ['tani', 'olcsó'],
        ['drogi', 'drága'], ['wczoraj', 'tegnap']
      ],
      sentences: [
        ['Lubię muzykę.', 'Szeretem a zenét.', ['Ja lubię muzykę.'], ['A zenét szeretem.']],
        ['Gram w piłkę nożną.', 'Focizom.', ['Gram w piłkę.'], ['Focizok.']],
        ['Ona gra na gitarze.', 'Ő gitározik.', ['On gra na gitarze.'], ['Gitározik.']],
        ['Wczoraj byłem w kinie.', 'Tegnap moziban voltam.', ['Wczoraj byłam w kinie.', 'Byłem wczoraj w kinie.', 'Byłam wczoraj w kinie.'], ['Tegnap voltam moziban.', 'Tegnap a moziban voltam.']],
        ['Oglądaliśmy film.', 'Filmet néztünk.', ['Oglądałyśmy film.'], ['Egy filmet néztünk.']],
        ['Ile to kosztuje?', 'Mennyibe kerül ez?', [], ['Ez mennyibe kerül?', 'Mennyi ez?']],
        ['To kosztuje pięć złotych.', 'Öt zlotyba kerül.', [], ['Ez öt zlotyba kerül.', 'Öt zloty.']],
        ['To jest za drogie.', 'Ez túl drága.', ['To za drogie.']],
        ['Kupiłam nową gitarę.', 'Vettem egy új gitárt.', ['Kupiłem nową gitarę.'], ['Új gitárt vettem.']],
        ['Lubisz tańczyć?', 'Szeretsz táncolni?', ['Czy lubisz tańczyć?']],
        ['Latem pływam w jeziorze.', 'Nyáron úszom a tóban.', [], ['Nyáron a tóban úszom.', 'Nyáron úszok a tóban.']]
      ]
    }
  ]
});
