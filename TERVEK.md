# Következő fejlesztések (kiválasztva: 2026-11-27)

## Döntések
- **Első lépés:** a „Miért? Hogyan?” képes füzetek (8 füzet, matricagyűjteménnyel) – lásd lent.
- **Célközönség:** bárki, nyilvánosan → érdemes a keresőkben is megtalálhatóvá tenni (oldalcímek, leírások, megosztási előnézet).
- **Saját domain:** igen (pl. mitudi.hu – szabad-e, és mennyibe kerül, ellenőrizni kell). A tulajdonos veszi meg; utána: DNS-beállítás (GitHub Pages egyedi domain, HTTPS), a sw.js és a GoatCounter beállítások frissítése az új címre.
- ✅ (kész, 2026-11-28) **MI-átláthatósági szöveg a láblécben, minden oldalon** (és a „Letöltés és használat” oldalon, valamint a README-ben is). Szöveg:

  > 🤖 **Mesterséges intelligencia segítségével készült.** A Tudásműhely tartalmát és programját MI segítségével írtuk – ez teszi lehetővé, hogy ilyen sok témát, ilyen részletesen és ingyen kínálhassunk. Az MI és az ember is tévedhet, ezért az itt olvasottakat érdemes kritikusan kezelni, és fontos ügyekben más forrásból is ellenőrizni. **Hibát találtál?** Írd meg nekünk – kijavítjuk!

  - **Hibajelentés e-mailben:** „✉️ Hibát jelzek” gomb a láblécben és minden leckénél → megnyitja a levelezőt, a tárgyban és a levélben előre kitöltve az oldal címe és linkje. Címzett: **mitudi.hibak@gmail.com**.
- **Saját arculat:** igen – logó, színpaletta, egy kalauz-figura, egységes ikonok.
- **Új név: „MiTudi”** (írásmód: MiTudi – nagy M és nagy T; a „Tudásműhely” túl általános, nehezen védhető). Ellenőrizni: SZTNH e-kutatás (41-es áruosztály), `mitudi.hu` szabad-e, Google-keresés. Ha rendben: átnevezés mindenhol (fejléc, cím, manifest, offline fájl neve, README, GoatCounter-oldal neve), a domain erre a névre.
- **Kalauz-figura: gepárd vagy farkas** (a bagoly helyett) – a végleges választás az arculattervezéskor; a figura vezet végig a képes füzeteken is.


## Kicsiknek (6–10 év)
- [ ] **Számolás játszva** – szorzótábla-játék, fejszámolás-verseny, óra leolvasása, pénz számolása, törtek pizzával
- [ ] **Felfedező mesék** – interaktív történetek, amelyekben a gyerek dönt, közben tanul (természet, történelem, biztonság)
- [ ] **Szülői felület** – a szülő látja, mit gyakorolt a gyerek, célt állíthat be (minden az eszközön marad)

## Felnőtteknek
- [ ] **Digitális készségek** – táblázatkezelés interaktív gyakorlóval, szövegszerkesztés, e-mail, online biztonság, Ügyfélkapu+ (időseknek is)
- [ ] **Személyes pénzügyi terv** – saját költségvetés, megtakarítási célok, nyugdíj-kalkulátor, hitelek összehasonlítása (a meglévő gazdasági szimulátorokra és pénz-widgetekre építve)
- [ ] **Karrier és soft skillek** – interjú-szimulátor, prezentáció, tárgyalás, időgazdálkodás, vezetés – helyzetgyakorlatokkal
- [ ] **Szülőknek** – gyereknevelés tudományosan: fejlődési szakaszok, alvás, képernyőidő, tanulás támogatása

## Készségfejlesztés mindenkinek
- [ ] **Logikai és agytorna játékok** – sudoku-szerű rejtvények, mintázatfelismerés, memória, téri látás, nehézség szerint
- [ ] **Kritikus gondolkodás** – álhír-felismerő, érvelési hibák, statisztikai csapdák, reklámtrükkök
- [ ] **Gépelés-tanuló** – tízujjas gépírás magyar billentyűzeten, ékezetekkel, sebességméréssel
- [ ] **Zene és rajz** – hangszer-alapok (zongorabillentyűzet, ritmus), hallásfejlesztés, rajztechnikák lépésenként (a meglévő ének-zene és vizuális kultúra tantárgyra építve)

## Egyéb
- [ ] **Táborok és projektek** – többhetes, lépésről lépésre vezetett projektek (pl. „Építs időjárás-állomást”, „Kezdj egy kis vállalkozást”)
- [ ] **Családi kvízest** – több játékos egy képernyőn, korosztály szerinti nehézséggel
- [ ] **Szakmai vizsgafelkészítők** – KRESZ-gyakorló (saját kérdésekkel, a hivatalos kérdésbank másolása nélkül), szakmai vizsga-felkészítők a meglévő szakmákhoz

## További ötletek (2026-11-27)
- [ ] **Jegyzetből kártya** – a saját jegyzeteidből automatikusan tanulókártyák és kérdések
- [ ] **Szakmai szimulátorok** – pl. villanyszerelői mérés, autódiagnosztika (OBD-hibakódok), ápolói vitálisparaméter-esetek
- [ ] **Versenyszobák** – szobát lehet létrehozni, linkkel vagy kóddal belépni; látszik, ki melyik tantárgyból milyen eredményt ért el és milyen szinten; a szobák és az eredmények megmaradnak.
  - ⚠️ Ehhez kell egy tárhely-szolgáltatás (pl. Supabase vagy Firebase, ingyenes fiókkal), mert a GitHub Pages nem tud közös adatot tárolni. Belépés nem kell: a szoba kódja és egy becenév elég. Adatvédelem: csak becenév + pontszámok, adatkezelési tájékoztatóval.
- [ ] **Földrajzi térképjáték** – országok, fővárosok, magyar megyék, folyók, hegyek kattintós kvízben
- [ ] **Irodalmi művek kalauza** – kötelező olvasmányok: szereplők kapcsolati hálója, cselekmény-idővonal, értelmezés (saját szöveggel)
- [ ] **Biológiai szimulációk** – róka–nyúl populációdinamika, öröklődés (Punnett-tábla), járványmodell, evolúció
- [ ] **Fenntartható háztartás** – energiaszámla-elemző, napelem-megtérülés, szigetelés-kalkulátor saját lakásra
- [ ] **„Miért? Hogyan?” képes füzetek** – a gyerekkori ismeretterjesztő könyvek hangulatában (saját szöveggel és rajzokkal, nem másolva semmilyen könyvsorozatot): egy-egy téma (dinoszauruszok, vulkánok, testünk, űr, lovagok, óceánok…) lapozható, sok-sok rajzzal, kérdés–válasz formában („Miért kék az ég?”), meglepő tényekkel, a végén kis kvízzel; felolvasható (Hangos tanulás), és kapcsolódik a „Mi miből áll?” modellekhez. 6–12 éveseknek, de a felnőttek is szeretik.
  - **Kiválasztott első 8 füzet:** Dinoszauruszok (magyar leletekkel, pl. Ajkaceratops), Az emberi test, Űr és bolygók, Lovagok és várak (magyar várak, Eger), Óceánok és tengerek, Állatok világa, Feltalálások (magyar feltalálókkal), Időjárás
  - **Rajzstílus:** részletes, pontos, felcímkézett ismeretterjesztő ábrák
  - **Használat:** lapozható könyv (telefonon húzással), nyomtatható A5-ös füzet, matricagyűjtemény (minden elolvasott füzetért és kvízért matrica a saját albumba)

## 🌍 Többnyelvű MiTudi (2026-11-27)
Cél: minél több nyelven – **először angolul**, utána a nagy nyelveken (javasolt sorrend: német, spanyol, francia, majd pl. olasz, lengyel, román, ukrán, portugál; később arab, hindi, kínai, japán – ezeknél jobbról balra írás / más betűkészlet is kell).
- **1. lépés – nyelvi alap:** nyelvválasztó a fejlécben (🌐), az összes felületi szöveg (menük, gombok, üzenetek) külön nyelvi fájlba (`lang/hu.js`, `lang/en.js` …), a böngésző nyelvének felismerése, a választás megjegyzése, a linkekben a nyelv (pl. `#/en/...`), keresőknek `hreflang`.
- **2. lépés – tartalom:** tantárgyanként külön nyelvi adatfájlok, lusta betöltéssel (csak a választott nyelv töltődik le); amíg egy rész nincs lefordítva, magyarul jelenik meg „még nincs lefordítva” jelzéssel.
- **Fordítás, nem csak szó szerint:** a magyar-specifikus részeket (adók, jogszabályok, ügyintézés, magyar történelem, érettségi, KRESZ) nem lefordítani kell, hanem helyettesíteni vagy jelölni („Magyarországra vonatkozik”); a mértékegységek, tizedesvessző/pont, dátumformátum nyelvenként.
- **Minőség:** MI-fordítás + szúrópróbás ellenőrzés anyanyelvi szemmel ahol lehet; a hibajelentő e-mail minden nyelven működjön.
- **Méret:** angolul a teljes tartalom kb. +10 MB; az egyfájlos offline változat nyelvenként külön fájl legyen.
- Az angol változattal egyúttal nemzetközi domain is érdemes lehet (pl. `mitudi.com` / `.org`) – ellenőrizni.

## 📣 Terjesztés, fenntartás, visszatérés (2026-11-27)
- [ ] **Keresőoptimalizálás** – minden lecke és oldal saját, Google által is bejárható oldalként (statikus HTML-változatok generálása a build során, oldalcím, leírás, megosztási előnézet, `sitemap.xml`, `robots.txt`).
- [ ] **Alkalmazás-boltok** – Android-alkalmazás a meglévő oldalból (TWA/PWA-csomagolás, offline is működik). Kell hozzá: Google Play fejlesztői fiók (egyszeri díj, a tulajdonos regisztrál), adatvédelmi nyilatkozat, ikonok, képernyőképek. iOS később (Apple fejlesztői fiók éves díjjal).
- [ ] **Támogatás gomb** – önkéntes adomány (pl. Buy Me a Coffee vagy hasonló), minden ingyenes marad; a tulajdonos hozza létre a fiókot.
- [x] **Nyílt forráskód** (kész, 2026-11-28: LICENSE – kód MIT, tananyag CC BY 4.0) – licenc a repóba: kód MIT, tartalom CC BY 4.0 (vagy CC BY-SA); `LICENSE` fájl + rövid „Hogyan járulhatsz hozzá?” leírás.
- [ ] **Szezonális tartalom** – ünnepekhez, évszakokhoz, évfordulókhoz kötött leckék, kvízek és „Tudtad?” tények, amelyek a dátum alapján automatikusan előkerülnek a kezdőlapon (pl. március 15., karácsony, Föld napja, Nobel-díjak hete).
- [ ] **Heti újdonság-hírlevél** – az Újdonságok oldal RSS-csatornaként (szerver nélkül, a buildben generálva); e-mailes hírlevélhez szolgáltató kell (pl. Buttondown/MailerLite – a tulajdonos regisztrál, adatkezelési tájékoztatóval).

## 💶 Üzleti modell – döntés (2026-11-27)
- **A MiTudi ingyenes marad** (nincs zárolt tartalom, nincs havidíj). Bevétel: önkéntes támogatás gomb; később opcionálisan iskolai/tanári licenc extra eszközökre (osztálykezelés, versenyszobák, statisztika) – erről később döntünk.
- Mérlegelt, de elvetett változat: ingyenes alap + 5 €/10 € havi szintek e-mailes belépéssel (középiskola, egyetem, edzői rész, nagy szimulációk zárolva). Elvetve, mert: vállalkozás, számlázás, uniós ÁFA (OSS), ÁSZF, GDPR, kiskorúak előfizetése, a nyilvános repó miatt a régi tartalom nem zárható vissza, és ütközik a nyílt forráskóddal és a „bárkinek, sok nyelven” céllal.
- **Saját szerver a saját domainen** később is jól jöhet – nem fizetős tartalomhoz, hanem a versenyszobákhoz, felhős szinkronhoz és a hírlevélhez.

## ☕ Fenntartás pénzügyileg – döntés (2026-11-27)
1. **Most: önkéntes adomány-gomb** – Ko-fi, link: **https://ko-fi.com/mitudi** (fiók kész, csak „Receive tips”; hátra: kifizetés bekötése PayPal/Stripe, könyvelői egyeztetés). Ellenszolgáltatás NÉLKÜL (nincs extra tartalom, nincs előny). Helye: lábléc + „Letöltés és használat” oldal. Szöveg: „Ha hasznos neked a MiTudi, támogasd a fenntartását ☕ (csak felnőttek, vagy szülői engedéllyel).” Bekapcsolás előtt rövid egyeztetés könyvelővel (ajándékozási értékhatárok, illeték, mikortól számít jövedelemnek).
2. **Később, ha nő a forgalom:** alapítvány vagy egyesület (adomány, céges támogatás, pályázatok, később SZJA 1%).
3. **Kiegészítő:** oktatási pályázatok, díjak; iskolai/céges szponzoráció csak alapítványon/vállalkozáson keresztül (számla miatt).

## 📊 Könyvvizsgálat és IFRS bővítése (2026-11-27)
A meglévő Könyvvizsgálat (BSc), IFRS (MSc), Számvitel és Kontrolling kurzusokra építve:
- [ ] **ISA-modulok** – minden fontos standardnak saját kártya (ISA 200–720, ISQM 1–2): cél, fő követelmények, tipikus vizsgakérdés, gyakori hiba, kapcsolódó standardok; témakörönként csoportosítva. Szükség esetén külön „Nemzetközi könyvvizsgálati standardok (ISA)” kurzus.
- [ ] **Assertionök (vezetői állítások)** részletesen (ISA 315): ügyletek és egyenlegek állításai; melyik vizsgálati eljárás melyiket teszteli (vouching/tracing, egyeztetés, leltár, cut-off, külső megerősítés), mérlegtételenként.
- [ ] **Interaktív gyakorlók:** „Melyik assertion?” (40+ helyzet), „Vouching vagy tracing?”, lényegességi küszöb kalkulátor (ISA 320), könyvvizsgálói jelentés döntőfa (ISA 700/705/706).
- [ ] **IFRS bővítés:** IFRS 9 (ECL), 15 (5 lépés), 16 (lízing számpéldával), IAS 16/36/38, IAS 2, 12, 37, IFRS 10/3, IAS 7, 1/8, IFRS 13, IFRS 18 (hatálybalépést ellenőrizni) – kalkulátorokkal.
- [ ] **80+ új tesztkérdés** és egyszerű (iskolai szintű) magyarázatok.
- Saját megfogalmazás (az ISA/IFRS szövege szerzői jogvédett), magyar szakterminológia.

## 🔍 Kérdés-minőségellenőrzés (2026-11-28)
- [ ] Az összes kvíz- és tesztkérdés átnézése (kb. 9500): **kétértelmű kérdések** (hiányzó feltétel, pl. „milyen a pálya” – ferde vagy függőleges dobás?), **több helyes válasz** (egy „rossz” opció is igaz), **félrevezető helyes válasz**, a magyarázat ellentmond-e a válasznak. A felhasználó eddig két ilyet talált (kosárlabda lapos dobás, labda pályája) – mindkettő javítva.

## ⚔️ Online párbajszobák (2026-11-28) – előkészítve
- Supabase-projekt kész (EU), publishable key: `sb_publishable_HJ2RCgin6oJ3UaISCRIYNA_Loc9Tlss` (nyilvános kulcs, a weboldalba kerül). Project URL: `https://acrlrhijksveqsuirbxt.supabase.co`.
- Adatbázis-séma: `supabase/szobak.sql` (rooms + players, RLS, Realtime). A tulajdonos futtatja az SQL Editorban; előtte: Authentication → „Allow anonymous sign-ins” bekapcsolása.
- Működés: szoba létrehozása → 4–6 jegyű kód + meghívó link (`#/szoba/KOD`) → becenév → a gazda témát választ és indít → mindenki ugyanazokat a kérdéseket kapja, élő ranglista → a szobák és eredmények megmaradnak.
- Megvalósítás (js/szobak.js): supabase-js helyett könnyű saját REST + Realtime (WebSocket) kliens, vagy a supabase-js UMD (cdn) – offline változatban a funkció jelzi, hogy internet kell. Adatkezelési tájékoztató: csak becenév + pontszám.

## 🔥 „Dühöngő” – vegyes online játékszoba (ötletek, 2026-11-28)
Az online szobák (`#/szoba`) bővítése több játékfajtával; a „Dühöngő” mód a beállított körszámnyi (pl. 20) kört véletlenszerűen keveri az összes játékfajtából, így minden meccs más.
- [ ] **Térképes tipp (GeoGuessr-szerű utolsó lépés):** egy térképre kell bökni – „Hol volt a thermopülai csata?”, „Hol feküdt Karthágó?”, „Melyik vidékről híresek a spártaiak?”. Aki közelebb bök, több pontot kap (távolság km-ben; egyezés esetén a gyorsabb nyer). Saját, egyszerűsített SVG-térképek (Európa/Mediterráneum, világ, Magyarország) – nem Google Maps, nem MI-generált kép; a meglévő idővonal-térképek (js/idovonal.js, data/idovonal.js) újrahasznosíthatók.
- [ ] **Számtipp (becslős):** „Hány méter magas a Mount Everest?”, „Melyik évben…?” – aki közelebb tippel, nyer; azonos tippnél a gyorsabb. Mindenki látja a többiek tippjét és idejét a kör végén.
- [ ] **Feleletválasztós** (a mostani), **igaz/hamis**, **sorba rendezés** (idővonal), **párosítás**, **kép/modell alkatrész-felismerés** („Keresd meg a rajzon!”).
- [ ] Beállítás: körök száma, játékfajták szűrése, idők (gondolkodási idő, „ha az ellenfél már válaszolt” idő), téma.
- Mindenhol: kétlépcsős válasz (kijelölés → Véglegesítem), „✅ az ellenfél már választott” jelzés, a kör végén mindenki tippje és ideje látszik.
