# Következő fejlesztések (kiválasztva: 2026-11-27)

## Döntések
- **Első lépés:** a „Miért? Hogyan?” képes füzetek (8 füzet, matricagyűjteménnyel) – lásd lent.
- **Célközönség:** bárki, nyilvánosan → érdemes a keresőkben is megtalálhatóvá tenni (oldalcímek, leírások, megosztási előnézet).
- **Saját domain:** igen (pl. mitudi.hu – szabad-e, és mennyibe kerül, ellenőrizni kell). A tulajdonos veszi meg; utána: DNS-beállítás (GitHub Pages egyedi domain, HTTPS), a sw.js és a GoatCounter beállítások frissítése az új címre.
- **MI-átláthatósági szöveg a láblécben, minden oldalon** (és a „Letöltés és használat” oldalon, valamint a README-ben is). Szöveg:

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
