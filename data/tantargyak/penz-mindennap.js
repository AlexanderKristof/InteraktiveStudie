/* Tantárgy: Pénz a mindennapokban (felnőtt élet) – ÁFA, adóbevallás, bérpapír, diákmunka, bank, megtakarítás, biztosítás, lakhatás, fogyasztóvédelem.
 * A számok a 2026-os magyar szabályokat tükrözik (2026. novemberi állapot). A szabályok évente változnak – mindig ellenőrizd a NAV, az MNB és a magyarorszag.hu oldalán. */
STUDIE.addSubject({
  id: 'penz-mindennap',
  stage: 'elet',
  title: 'Pénz a mindennapokban',
  icon: '🧾',
  color: '#1f8a70',
  description: 'ÁFA és számla, szja-bevallás, bérpapír, diákmunka, bankszámla, megtakarítás, biztosítások, albérlet és rezsi, fogyasztói jogok – gyakorlati példákkal, 2026-os számokkal.',
  intro: 'Az iskolában megtanulod a százalékszámítást, de azt ritkán, hogy **mennyi ÁFA van a pizzád árában**, hogyan kell elfogadni az **szja-bevallási tervezetet**, mit jelent a bérpapíron a **TB-járulék**, vagy mit tehetsz, ha a webshop nem akarja visszavenni a hibás cipőt. Ez a tantárgy ezekről szól.\n\nA **Pénzügyi ismeretek** tantárgy (költségvetés, kamat, hitel, befektetés alapjai) után ez a gyakorlati folytatás: konkrét magyar szabályok, ügyintézés és sok **számolt példa**.\n\n**Fontos:** a számok (adókulcsok, határok, kedvezmények) a **2026-os szabályok szerint** szerepelnek, és **évente változhatnak**. Itt azt tanulod meg, **hogyan működnek** a dolgok – konkrét döntés előtt mindig nézd meg a **NAV** (nav.gov.hu), az **MNB** (mnb.hu) vagy a **magyarorszag.hu** aktuális tájékoztatóját. Ez a tananyag nem személyre szabott adó- vagy jogi tanácsadás.',
  lessons: [
    {
      id: 'afa-szamla',
      widgets: [{ type: 'afa' }],
      title: 'ÁFA, nyugta és számla',
      level: 1, minutes: 14,
      summary: 'Mi az ÁFA, milyen kulcsai vannak, hogyan számolsz nettóból bruttót és vissza, mi a különbség a nyugta és a számla között, és miért érdemes megtartani a blokkot.',
      tags: ['ÁFA', 'általános forgalmi adó', 'bruttó', 'nettó', 'adókulcs', '27%', '18%', '5%', 'nyugta', 'számla', 'blokk', 'NAV Online Számla', 'alanyi adómentesség', 'fogyasztási adó'],
      terms: ['kozgazdasagtan/fiskalis-politika'],
      sections: [
        {
          title: 'Mi az ÁFA?',
          text: 'Az **ÁFA (általános forgalmi adó)** egy **fogyasztási adó**: szinte minden termék és szolgáltatás árában benne van, és a végén **a vásárló (te) fizeti meg**. A bolt csak „beszedi” tőled, és befizeti az államnak.\n\nA láncban minden vállalkozás csak a **hozzáadott érték** után fizet: a pék a lisztért ÁFÁ-t fizet a malomnak, a kenyér eladásakor beszedi az ÁFÁ-t, és a kettő **különbségét** fizeti be a NAV-nak (ez az **áfalevonási jog**). A magánszemély viszont nem tudja levonni – nála a lánc véget ér.\n\nMagyarország **általános ÁFA-kulcsa 27%** – ez évek óta **az Európai Unió legmagasabb** általános kulcsa. Az állam adóbevételeinek egyik legnagyobb tétele az ÁFA.',
          tip: 'A boltban kiírt ár mindig **bruttó** (ÁFÁ-val együtt) – fogyasztónak a bruttó árat kötelező feltüntetni. Vállalkozások közötti árlistákon viszont gyakran nettó árak szerepelnek: mindig nézd meg, melyik!'
        },
        {
          title: 'Az ÁFA-kulcsok (2026)',
          text: 'A **2026-os szabályok szerint** Magyarországon három pozitív ÁFA-kulcs van:\n\n- **27% (általános kulcs)**: a legtöbb termék és szolgáltatás – ruha, műszaki cikk, üdítő a boltban, benzin, fodrász, telefon.\n- **18% (kedvezményes)**: például a **tej és tejtermékek** egy része, **kenyér és pékáru**, kereskedelmi **szálláshely** (hotel).\n- **5% (kedvezményes)**: például **nem vényköteles gyógyszerek**, **könyv**, újság, **éttermi étel és helyben fogyasztott alkoholmentes ital**, **sertés-, marha-, baromfihús, tojás, friss tej**, internet-hozzáférés, távhő, bizonyos **új lakások**.\n- **0%**: **2026. szeptember 1-jétől** a **vényköteles gyógyszerekre** (korábban 5% volt). Ez 0%-os kulcs, nem „adómentesség”.\n\nVannak **adómentes** tevékenységek is (például egészségügyi ellátás, oktatás, lakásbérbeadás magánszemélytől), ezek számláján nincs ÁFA.\n\nA pontos lista hosszú és változik: a besorolást mindig az **ÁFA-törvény mellékletei** és a NAV tájékoztatói döntik el.',
          warn: 'A kulcsokat gyakran módosítják (2026-ban is változott a gyógyszereké). Ha pontos kulcsra van szükséged, nézd meg a NAV oldalán az aktuális tájékoztatót!'
        },
        {
          title: 'Számolás: nettó ↔ bruttó',
          text: 'A **nettó ár** ÁFA nélkül, a **bruttó ár** ÁFÁ-val értendő.\n\n- Nettóból bruttó (27%): `bruttó = nettó × 1,27`\n- Bruttóból nettó: `nettó = bruttó / 1,27`\n- Az ÁFA összege: `ÁFA = bruttó − nettó = nettó × 0,27`\n- Az ÁFA aránya a bruttó árban: `27 / 127 ≈ 21,26%`\n\n**1. példa (2026):** egy webshop nettó **50 000 Ft**-os fülhallgatót hirdet (27%).\n`bruttó = 50 000 × 1,27 = 63 500 Ft`, ebből ÁFA `13 500 Ft`.\n\n**2. példa:** egy könyv bruttó **5 250 Ft** (5% ÁFA).\n`nettó = 5 250 / 1,05 = 5 000 Ft`, ÁFA `250 Ft`.\n\n**3. példa:** egy bruttó **12 700 Ft**-os cipőben mennyi az ÁFA? `12 700 / 1,27 = 10 000 Ft` nettó, tehát **2 700 Ft** ÁFA – nem 12 700 × 27% = 3 429 Ft!',
          warn: 'Gyakori hiba: a bruttó árból 27%-ot levonni. A bruttó árnak nem 27%-a, hanem csak kb. **21,26%-a** az ÁFA, mert a 27% a nettóra vonatkozik.',
          widget: { type: 'gyakorlas', options: { kind: 'szazalek', title: 'Százalékszámítás', help: 'Az ÁFA, a kedvezmények és a levonások mind százalékszámítás. Gyakorold!' } }
        },
        {
          title: 'Nyugta vagy számla?',
          text: 'Minden vásárlásról **bizonylatot** kell kapnod – ezt az eladó kötelessége kiadni.\n\n- **Nyugta** (a köznyelvben „blokk”): a pénztárgép adja, vevő neve nélkül. Magánszemélyek vásárlásainál ez az alap. Az ÁFA-tartalmat nem mindig bontja ki tételesen.\n- **Számla**: hivatalos, részletes bizonylat, rajta az **eladó és a vevő** neve, címe, az eladó **adószáma**, a sorszám, a teljesítés dátuma, tételenként a nettó ár, az ÁFA-kulcs, az ÁFA összege és a bruttó ár. Ha a vevő vállalkozás, az ő adószáma is.\n\n**Mikor kérj számlát magánszemélyként?**\n- ha **munkáltatód vagy cégeden** keresztül számolod el a költséget,\n- nagyobb értékű termék (laptop, telefon, háztartási gép) vásárlásakor – a számla a **jótállás és a garancia** legjobb bizonyítéka,\n- szolgáltatásnál (szerelő, autójavítás), hogy egyértelmű legyen, mit és mennyiért végeztek el.\n\nSzámlát **kérhetsz** a nyugta helyett: a vállalkozás ilyenkor köteles kiállítani.',
          tip: 'Ha egy szerelő vagy szolgáltató „számla nélkül olcsóbban” csinálná meg, gondold végig: nincs bizonyítékod, nehéz reklamálni, és ő adót csal. A számla a **te védelmed** is.'
        },
        {
          title: 'NAV Online Számla és az online pénztárgép',
          text: 'Magyarországon a bizonylatozás **valós időben** követhető:\n\n- Az **online pénztárgépek** a nyugtaadatokat automatikusan a **NAV**-hoz küldik.\n- Minden belföldi vállalkozás által kiállított számla adatai bekerülnek a **NAV Online Számla** rendszerbe – akkor is, ha a vevő magánszemély.\n\nMagánszemélyként az **Ügyfélkapu+** vagy a **DÁP** mobilalkalmazás segítségével belépve megnézheted a **rád kiállított számlákat** a NAV online felületén (például az e-SZJA mellett elérhető szolgáltatásokban).\n\nEzért van értelme a NAV szúrópróbaszerű ellenőrzéseinek és a „**Blokklottónak**” is: a cél, hogy minden eladás nyoma megmaradjon, és ne legyen adócsalás.',
          tip: 'Az online vásárlásnál a webshop e-mailben küldi a számlát (PDF). Hozz létre egy külön mappát a levelezésedben „Számlák, garancia” néven, és ments ide minden fontos számlát.'
        },
        {
          title: 'Miért fontos a blokk? Alanyi adómentes vállalkozók',
          text: 'A blokk vagy számla a **vásárlás bizonyítéka**:\n\n- **jótállás és szavatosság** érvényesítésekor (lásd a Fogyasztóvédelem leckét),\n- **cserénél, elállásnál**,\n- ha valamit **elszámolsz** (munkáltató, biztosító, utasbiztosítás kárrendezése).\n\nA hőpapíros blokk néhány hónap alatt **kifakulhat**: fotózd le vagy szkenneld be, és őrizd meg legalább a jótállás végéig.\n\n**Alanyi adómentesség:** a kis forgalmú vállalkozók választhatják, hogy **nem számítanak fel ÁFÁ-t**. A **2026-os** bevételi értékhatár **20 millió Ft/év** (2025-ben 18 millió volt; a törvény szerint 2027-ben 22, 2028-ban 24 millió Ft lesz). Ilyenkor a számlán ÁFA helyett „**AAM** – alanyi adómentes” jelölés szerepel. Ezért lehet, hogy egy kis vállalkozó (például egy korrepetáló tanár vagy kézműves) számláján nincs ÁFA.',
          warn: 'A blokk megőrzése nem bürokrácia: ha a 120 000 Ft-os telefon 11 hónap után elromlik, a bizonylat nélkül sokkal nehezebb érvényesíteni a jogaidat.'
        }
      ],
      quiz: [
        { q: 'Egy termék nettó ára 20 000 Ft, ÁFA-kulcsa 27%. Mennyi a bruttó ár?', options: ['14 600 Ft', '20 270 Ft', '25 400 Ft', '27 000 Ft'], answer: 2, explain: 'bruttó = nettó × 1,27 = 20 000 × 1,27 = 25 400 Ft.' },
        { q: 'Egy bruttó 6 350 Ft-os termékben (27% ÁFA) mennyi az ÁFA?', options: ['1 350 Ft', '1 714,5 Ft', '635 Ft', '5 000 Ft'], answer: 0, explain: 'nettó = 6 350 / 1,27 = 5 000 Ft, ÁFA = 6 350 − 5 000 = 1 350 Ft. A 6 350 × 0,27 = 1 714,5 Ft a gyakori hiba.' },
        { q: 'Ki fizeti meg ténylegesen az ÁFÁ-t?', options: ['Senki, a bolt nyeresége', 'Csak a gyártó', 'A bank', 'A végső fogyasztó, a vásárló'], answer: 3, explain: 'Az ÁFA fogyasztási adó: az árban a vásárló fizeti, a vállalkozás beszedi és befizeti a NAV-nak.' },
        { q: 'Melyik ÁFA-kulcs vonatkozik 2026-ban Magyarországon a legtöbb termékre?', options: ['18%', '27%', '5%', '20%'], answer: 1, explain: 'Az általános kulcs 27%, ez az EU legmagasabb általános ÁFA-kulcsa.' },
        { q: 'Mi szerepel a számlán, ami a nyugtán általában nem?', options: ['A vásárlás dátuma', 'A végösszeg', 'A vevő neve és címe', 'Az eladó neve'], answer: 2, explain: 'A számla a vevőt is azonosítja (név, cím, cégnél adószám), és tételesen bontja a nettó árat, az ÁFA-kulcsot és -összeget.' },
        { q: 'Miért érdemes megőrizni egy laptop vásárlásáról szóló számlát?', options: ['Mert a NAV évente bekéri', 'Mert ezt kéri a posta', 'Mert enélkül nem lehet bekapcsolni', 'Ez bizonyítja a vásárlást jótállási és szavatossági igénynél'], answer: 3, explain: 'A bizonylat a vásárlás legjobb bizonyítéka garanciális ügyintézésnél, cserénél, elállásnál.' },
        { q: 'Mit jelent az „AAM” jelölés egy számlán?', options: ['Az ár akciós', 'A kiállító alanyi adómentes, nem számít fel ÁFÁ-t', 'A számla érvénytelen', 'Az ÁFA 0%, mert külföldi termék'], answer: 1, explain: 'Az alanyi adómentes vállalkozó (2026-ban évi 20 millió Ft bevételig) választhatja, hogy nem számít fel ÁFÁ-t.' },
        { q: 'Mit tegyél a hőpapíros blokkal, hogy évek múlva is olvasható legyen?', options: ['Semmit, sosem fakul ki', 'Fotózd le vagy szkenneld be', 'Laminálás forró vasalóval', 'Tedd napos helyre'], answer: 1, explain: 'A hőpapír kifakulhat, ezért a digitális másolat a biztos.' }
      ]
    },
    {
      id: 'szja-bevallas',
      title: 'Az szja-bevallás lépésről lépésre',
      level: 2, minutes: 14,
      summary: 'Ki ad be szja-bevallást, mi az e-SZJA tervezet, mi a május 20-i határidő, mikor kell módosítani, hogyan rendelkezz az 1+1%-ról, és mi történik, ha nem csinálsz semmit.',
      tags: ['szja', 'személyi jövedelemadó', 'adóbevallás', 'e-SZJA', 'bevallási tervezet', 'NAV', 'május 20', '1+1%', 'Ügyfélkapu+', 'DÁP', 'önellenőrzés', 'adóazonosító jel'],
      sections: [
        {
          title: 'Mi az szja, és miért kell bevallás?',
          text: 'A **személyi jövedelemadó (szja)** a magánszemélyek jövedelmét terheli. Kulcsa **2026-ban 15%** (egykulcsos adó).\n\nA munkáltató a fizetésedből havonta **adóelőleget** von le, és befizeti a NAV-nak. Év végén viszont el kell számolni: **mennyi adót kellett volna fizetned az egész évre**, és mennyit fizettél ténylegesen. Ez az **éves szja-bevallás**.\n\nAz eredmény háromféle lehet:\n- **nulla**: az előlegek pontosan fedték az adót,\n- **befizetendő**: kevesebb előleget vontak le (például mert volt egy mellékjövedelmed),\n- **visszaigényelhető**: túl sokat vontak le (például év közben jogosulttá váltál egy kedvezményre, vagy nyugdíjpénztári befizetésed után **adójóváírás** jár).'
        },
        {
          title: 'Az e-SZJA tervezet: a NAV elkészíti helyetted',
          text: 'A NAV a munkáltatók, bankok, kifizetők adataiból minden évben elkészíti a **bevallási tervezetet**. Ezt az **e-SZJA** felületen (eszja.nav.gov.hu) nézheted meg, általában **március közepétől**.\n\n**Belépés:** **Ügyfélkapu+** (kétlépcsős azonosítás, 2025 óta ez váltotta a régi Ügyfélkaput) vagy a **DÁP** (Digitális Állampolgárság) mobilalkalmazás. Papíron is kérhető a tervezet.\n\n**Mit nézz át?**\n1. Minden munkáltatód és kifizetőd szerepel-e (diákmunka, megbízás, ösztöndíj)?\n2. Jók-e az összegek – vesd össze a munkáltatótól januárban kapott **igazolással**!\n3. Érvényesítetted-e a kedvezményeidet (25 év alatti, családi, első házasok, anyák kedvezménye)?\n4. Van-e jövedelem, amiről a NAV **nem tudhat** (például külföldi jövedelem, lakáskiadás, kriptoeladás)?\n5. Rendelkeztél-e az **1+1%-ról**?',
          tip: 'Az e-SZJA felületen a tervezetet egy kattintással **elfogadhatod**, vagy **módosíthatod** és utána küldheted be. A beküldés után kapott **nyugtát** (visszaigazolást) érdemes elmenteni.'
        },
        {
          title: 'Határidő: május 20.',
          text: 'A **2025-ös** jövedelemről a bevallás (25SZJA nyomtatvány) határideje **2026. május 20.** volt – ez **mindenkire egységes** határidő, a befizetésre és az 1+1%-os rendelkezésre is. A **2026-os** jövedelemről **2027. május 20-ig** kell bevallani (a szabályok változhatnak, nézd meg a NAV oldalán).\n\n**Mi történik, ha nem csinálsz semmit?**\n- A legtöbb magánszemélynél (munkavállaló, diák, nyugdíjas) a tervezet a határidő után **automatikusan bevallássá válik** – ilyenkor az abban szereplő adatok lesznek a hivatalos bevallásod.\n- **Kivétel:** az **egyéni vállalkozók**, **mezőgazdasági őstermelők** és az **ÁFA-fizetésre kötelezett** magánszemélyek tervezete **nem** válik automatikusan bevallássá – nekik be kell küldeniük.\n\nA befizetendő adót **május 20-ig** kell megfizetni; a visszajáró összeget a NAV általában néhány héten belül utalja a megadott bankszámlára.',
          warn: 'Ha a tervezet hiányos (például kimaradt egy jövedelem), és hagyod automatikusan bevallássá válni, a hibás bevallás a **te felelősséged**. Mindig nézd át!'
        },
        {
          title: 'Mikor kell módosítani, és mit tehetsz utólag?',
          text: 'Módosítanod kell a tervezetet, ha:\n- volt olyan jövedelmed, amit a NAV nem lát (külföldi munka, ingatlan-bérbeadás magánszemélynek, értékpapír- vagy kriptoárfolyam-nyereség),\n- egy kedvezményt év közben nem érvényesítettél, de jár (például a családi kedvezmény),\n- **adójóváírást** igényelsz (önkéntes nyugdíjpénztár, NYESZ, nyugdíjbiztosítás),\n- valamelyik adat hibás.\n\n**Ha utólag veszed észre a hibát:** a határidő után is javíthatsz **önellenőrzéssel** vagy javító bevallással (az elévülési időn belül, ami általában 5 év). Ha a hiba miatt kevesebb adót fizettél, **önellenőrzési pótlékot** kell fizetned, ami jóval kisebb, mint ha a NAV ellenőrzés során találná meg (akkor **adóbírság** is jöhet).'
        },
        {
          title: 'Az 1+1%',
          text: 'A befizetett szja **1%-áról** rendelkezhetsz egy **civil szervezet** (alapítvány, egyesület) javára, további **1%-áról** pedig egy **egyház** vagy a **Nemzeti Tehetség Program** javára. Ezt a NAV utalja nekik – **neked nem kerül semmibe**.\n\nA rendelkezést az e-SZJA felületen a tervezettel együtt vagy külön is megteheted, a bevallási határidőig. Érdemes minden évben ellenőrizni az e-SZJA felületen, hogy érvényes-e a rendelkezésed, és jogosult-e még a kiválasztott szervezet.\n\nA kedvezményezett **adószámára** lesz szükséged (ezt a szervezet honlapján megtalálod).',
          tip: 'Ha diákként nem fizettél szja-t (például a 25 év alatti kedvezmény miatt), nincs miből 1%-ot felajánlani – amint lesz befizetett adód, a rendelkezésed már pénzt jelent a szervezetnek.'
        },
        {
          title: 'Példák diákoknak (2026-os szabályokkal)',
          text: '**1. Anna (19)** nyáron iskolaszövetkezettel dolgozott, összesen 600 000 Ft-ot keresett. A 25 év alatti kedvezmény miatt nem vontak le szja-t. A tervezetben szerepel a jövedelme, nulla fizetendő adóval. **Teendő:** átnézi, rendelkezik az 1+1%-ról, elfogadja – vagy hagyja, hogy május 20-án automatikusan bevallássá váljon.\n\n**2. Bence (23)** két helyen dolgozott diákként és megbízással is. Az egyik kifizető nem tudott a kedvezményről, és levont szja-t. **Teendő:** ellenőrzi, hogy a tervezetben érvényesül-e a **25 év alatti kedvezmény**. Ha igen, a levont adót **visszakapja**.\n\n**3. Csilla (24)** nyelvtanítással is keresett magánórákon, amiről nem adott számlát. Ez a jövedelem **nem szerepel** a tervezetben. **Teendő:** ki kell egészítenie a bevallást (és tisztáznia, hogy ez a tevékenység milyen formában – például vállalkozóként – végezhető legálisan).',
          warn: 'Ezek tanulópéldák. Konkrét esetben a NAV ügyfélszolgálata (1819-es telefonszám) vagy egy adótanácsadó segít.'
        }
      ],
      quiz: [
        { q: 'Mi a 2025-ös jövedelemről szóló szja-bevallás határideje?', options: ['2026. május 20.', '2026. december 31.', '2025. május 20.', '2026. március 15.'], answer: 0, explain: 'Az szja-bevallás és -befizetés egységes határideje a tárgyévet követő év május 20.' },
        { q: 'Mi történik egy munkavállaló tervezetével, ha nem foglalkozik vele?', options: ['A munkáltató küldi be', 'A határidő után automatikusan bevallássá válik', 'Érvénytelenné válik és bírságot kap', 'A következő évre tolódik'], answer: 1, explain: 'A legtöbb magánszemélynél a NAV tervezete május 20. után bevallássá válik.' },
        { q: 'Kinek a tervezete NEM válik automatikusan bevallássá?', options: ['A diáké', 'A nyugdíjasé', 'Az egyéni vállalkozóé', 'A munkavállalóé'], answer: 2, explain: 'Egyéni vállalkozóknak, őstermelőknek és ÁFA-fizetésre kötelezett magánszemélyeknek be kell küldeniük a bevallást.' },
        { q: 'Mivel lehet 2026-ban belépni az e-SZJA felületre?', options: ['Ügyfélkapu+ vagy DÁP alkalmazás', 'Bankkártyával', 'A TAJ-számmal és e-mail-címmel', 'Csak személyesen a NAV-nál'], answer: 0, explain: 'A régi Ügyfélkaput 2025-ben az Ügyfélkapu+ (kétlépcsős) és a DÁP váltotta.' },
        { q: 'Mikor kell kiegészítened a tervezetet?', options: ['Ha volt olyan jövedelmed, amiről a NAV nem tud', 'Csak ha 30 év feletti vagy', 'Soha, a NAV mindent tud', 'Csak ha visszajár pénz'], answer: 0, explain: 'Például külföldi jövedelem, bérbeadás, árfolyamnyereség – ezeket neked kell bevallani.' },
        { q: 'Mit jelent az 1+1%?', options: ['A munkáltató 1%-ot von le', 'A NAV 2% kamatot fizet', 'Plusz 2% adót kell fizetni', 'A befizetett szja 1-1%-áról rendelkezhetsz civil szervezet és egyház javára'], answer: 3, explain: 'Az adódból a NAV utalja a kedvezményezettnek, neked nem kerül pénzbe.' },
        { q: 'Mit tehetsz, ha a határidő után derül ki, hogy hibás volt a bevallásod?', options: ['Új adóazonosítót kérsz', 'Semmit, végleges', 'Önellenőrzéssel javíthatod', 'Megvárod, amíg elévül'], answer: 2, explain: 'Az önellenőrzés az elévülési időn belül lehetséges; a pótléka jóval kisebb, mint egy NAV-ellenőrzés bírsága.' },
        { q: 'Mennyi az szja kulcsa 2026-ban?', options: ['16%', '15%', '18,5%', '27%'], answer: 1, explain: 'Az szja egykulcsos, 15%. (A 18,5% a TB-járulék, a 27% az általános ÁFA.)' }
      ]
    },
    {
      id: 'berpapir',
      widgets: [{ type: 'berkalkulator' }],
      title: 'A bérpapír: bruttóból nettó',
      level: 2, minutes: 15,
      summary: 'Hogyan lesz a bruttó bérből nettó 2026-ban: szja, TB-járulék, a munkáltató terhei, a 25 év alatti kedvezmény és plafonja, családi és egyéb kedvezmények – számolt példákkal.',
      tags: ['bérpapír', 'bérjegyzék', 'bruttó bér', 'nettó bér', 'szja', 'TB-járulék', 'szocho', 'munkáltatói költség', '25 év alatti kedvezmény', 'családi kedvezmény', 'anyák kedvezménye', 'minimálbér', 'garantált bérminimum'],
      sections: [
        {
          title: 'A bérjegyzék részei',
          text: 'Minden hónapban **bérjegyzéket** (fizetési papírt, „bérlapot”) kell kapnod – papíron vagy elektronikusan. Tartalma:\n\n- **Bruttó bér**: alapbér + pótlékok (éjszakai, túlóra, műszak) + egyéb bérelemek.\n- **Levonások**: szja-előleg, TB-járulék, esetleg letiltás, szakszervezeti tagdíj, önkéntes pénztári tagdíj.\n- **Kedvezmények**: családi, 25 év alatti, anyák, első házasok kedvezménye stb.\n- **Nettó bér**: a ténylegesen kifizetett, számládra utalt összeg.\n- Ledolgozott napok, szabadság, betegszabadság, táppénz.\n\nAz alapfogalmakat a **Pénzügyi ismeretek / Munka, bér és adó** lecke vezeti be; itt a pontos 2026-os számolást tanulod meg.'
        },
        {
          title: 'Levonások 2026-ban',
          text: 'A **2026-os szabályok szerint** a munkavállaló bruttó béréből levonják:\n\n- **szja-előleg: 15%**\n- **TB-járulék (társadalombiztosítási járulék): 18,5%** – ebből lesz a nyugdíj, egészségügyi ellátás, táppénz, munkanélküli-ellátás jogosultsága.\n\nÖsszesen: **33,5%**. Kedvezmény nélkül tehát:\n\n`nettó = bruttó × (1 − 0,15 − 0,185) = bruttó × 0,665`\n\n**Példa (2026):** bruttó **400 000 Ft**, kedvezmény nélkül:\n- szja: `400 000 × 0,15 = 60 000 Ft`\n- TB-járulék: `400 000 × 0,185 = 74 000 Ft`\n- **nettó: 266 000 Ft**\n\n**Minimálbér 2026:** bruttó **322 800 Ft** → nettó `322 800 × 0,665 = 214 662 Ft`.\n**Garantált bérminimum 2026** (legalább középfokú végzettséget igénylő munkakörben): bruttó **373 200 Ft** → nettó **248 178 Ft**.',
          tip: 'A 2027-es költségvetési javaslat (2026. október) szerint a minimálbér szja-terhe csökkenhet. Ez még bejelentés/javaslat – mindig a hatályos szabályt nézd!',
          widget: { type: 'gyakorlas', options: { kind: 'szazalek', title: 'Levonások számolása', help: 'Gyakorold a százalékszámítást: 15% szja, 18,5% járulék, 13% szocho.' } }
        },
        {
          title: 'Mennyibe kerülsz a munkáltatónak?',
          text: 'A bruttó béreden felül a munkáltató is fizet adót: a **szociális hozzájárulási adót (szocho)**, ami **2026-ban 13%**.\n\n`munkáltatói költség = bruttó × 1,13`\n\n**Példa (2026):** bruttó 400 000 Ft esetén:\n- szocho: `400 000 × 0,13 = 52 000 Ft`\n- **teljes bérköltség: 452 000 Ft**\n- ebből te kézhez kapsz: **266 000 Ft** (kedvezmény nélkül)\n\nVagyis a munkáltató által kifizetett összeg kb. **59%-a** jut el hozzád, a többi adó és járulék. Ezt hívják **adóéknek**: a munkáltatói költség és a nettó bér közötti különbség.',
          warn: 'Állásinterjún mindig tisztázd, hogy a megbeszélt összeg **bruttó vagy nettó**! Magyarországon a munkaszerződésben szinte mindig bruttó bér szerepel.'
        },
        {
          title: '25 év alatti fiatalok kedvezménye',
          text: 'A **25 év alatti** munkavállalóknak **nem kell szja-t fizetniük** egy plafonig. A plafon az előző év júliusi **bruttó átlagkereset**; **2026-ban havi 715 765 Ft** (a NAV tájékoztatója szerint – ellenőrizd az aktuális értéket). A TB-járulékot (18,5%) viszont **ők is fizetik**.\n\nA kedvezmény **addig a hónapig jár, amelyben betöltöd a 25. életévedet** (azt a hónapot még beleértve).\n\n**Példa (2026):** 22 éves pályakezdő, bruttó 400 000 Ft:\n- szja: **0 Ft** (a plafon alatt van)\n- TB-járulék: `74 000 Ft`\n- **nettó: 326 000 Ft** (60 000 Ft-tal több, mint egy 25 év felettinek)\n\n**Plafon feletti bérnél:** bruttó 800 000 Ft esetén csak a plafon feletti rész után kell szja: `(800 000 − 715 765) × 0,15 ≈ 12 635 Ft`.',
          tip: 'A kedvezményt a munkáltató **automatikusan** alkalmazza, nem kell kérni. Ha valamiért mégsem tette, az éves bevallásban visszakapod a levont adót.'
        },
        {
          title: 'Egyéb kedvezmények (2026)',
          text: '- **Családi kedvezmény**: a családi pótlékra jogosult szülő kapja. **2026-tól a havi összeg megduplázódott**: gyermekenként havonta **1 gyermeknél 20 000 Ft**, **2 gyermeknél 40 000 Ft**, **3 vagy több gyermeknél 66 000 Ft** adómegtakarítás. Ha az szja nem elég, a TB-járulékból is érvényesíthető (családi járulékkedvezmény).\n- **Anyák kedvezményei**: a **30 év alatti anyák** szja-mentesek (plafonig); **2025 októberétől a három- vagy többgyermekes anyák**, **2026 januárjától a 40 év alatti kétgyermekes anyák** is szja-mentesek – a pontos feltételeket és ütemezést a NAV-on nézd meg.\n- **Első házasok kedvezménye**: a házasságkötés utáni 24 hónapig havonta **5 000 Ft** adómegtakarítás egy párnak.\n- **Súlyosan fogyatékos személyek kedvezménye**: igazolás alapján.\n\nA kedvezményeket év közben **adóelőleg-nyilatkozattal** kérheted a munkáltatónál (vagy a bevallásban, év végén egy összegben).',
          warn: 'A kedvezmények szabályai 2025–2026-ban sokat változtak, és a 2027-es költségvetési javaslat is módosítana rajtuk. A pontos jogosultságot a NAV kalkulátorával és tájékoztatóival ellenőrizd!'
        },
        {
          title: 'Ellenőrizd a bérpapírod!',
          text: '1. **Bruttó** megegyezik a szerződéssel (+ pótlékok)?\n2. **Ledolgozott órák**, túlóra, szabadság jól szerepel?\n3. **Kedvezmények** érvényesültek?\n4. **Nettó** megérkezett a számládra a megadott napon (általában a következő hónap 10-éig)?\n\nA munkáltató januárban **éves igazolást** ad (vagy elérhetővé teszi), amit vess össze a NAV e-SZJA tervezetével.\n\nA bejelentett munkaviszonyodat a NAV online felületén (Ügyfélkapu+-szal) vagy a **TAJ-jogviszony** lekérdezéssel is ellenőrizheted – így kiderül, ha „papíron” nem vagy bejelentve.'
        }
      ],
      quiz: [
        { q: 'Mennyi a nettó bér 2026-ban bruttó 500 000 Ft-ból, kedvezmények nélkül?', options: ['365 000 Ft', '425 000 Ft', '332 500 Ft', '407 500 Ft'], answer: 2, explain: '500 000 × (1 − 0,15 − 0,185) = 500 000 × 0,665 = 332 500 Ft.' },
        { q: 'Mennyi a TB-járulék mértéke 2026-ban?', options: ['27%', '18,5%', '13%', '15%'], answer: 1, explain: 'A munkavállaló bruttó béréből 18,5% TB-járulékot vonnak le.' },
        { q: 'Mennyibe kerül a munkáltatónak egy bruttó 300 000 Ft-os munkavállaló 2026-ban (szocho 13%)?', options: ['355 500 Ft', '339 000 Ft', '261 000 Ft', '300 000 Ft'], answer: 1, explain: '300 000 × 1,13 = 339 000 Ft.' },
        { q: 'Egy 21 éves munkavállaló bruttó bére 350 000 Ft. Mennyi a nettó 2026-ban?', options: ['297 500 Ft', '285 250 Ft', '232 750 Ft', '350 000 Ft'], answer: 1, explain: 'A plafon alatt nincs szja, csak 18,5% TB-járulék: 350 000 × 0,815 = 285 250 Ft.' },
        { q: 'Meddig jár a 25 év alatti fiatalok kedvezménye?', options: ['26 éves korig', 'Amíg diák vagy', 'Annak a hónapnak a végéig, amelyben betöltöd a 25. életévet', 'A 25. születésnapod előtti napig'], answer: 2, explain: 'A betöltés hónapjában még jár a kedvezmény.' },
        { q: 'Mennyi a bruttó minimálbér 2026-ban?', options: ['290 800 Ft', '373 200 Ft', '266 800 Ft', '322 800 Ft'], answer: 3, explain: '2026-ban a minimálbér 322 800 Ft, a garantált bérminimum 373 200 Ft (2025-ben 290 800 és 348 800 Ft volt).' },
        { q: 'Mennyi 2026-ban a családi kedvezményből adódó havi adómegtakarítás egy gyermek után?', options: ['66 000 Ft', '5 000 Ft', '20 000 Ft', '10 000 Ft'], answer: 2, explain: '2026-tól a családi kedvezmény megduplázódott: 1 gyermeknél havi 20 000 Ft.' },
        { q: 'Mi a szocho?', options: ['A munkáltató által a bér után fizetett adó', 'A szakszervezeti tagdíj', 'Az ÁFA egyik fajtája', 'A munkavállaló nyugdíjjáruléka'], answer: 0, explain: 'A szociális hozzájárulási adót (2026-ban 13%) a munkáltató fizeti a bruttó bér felett.' }
      ]
    },
    {
      id: 'diakmunka',
      title: 'Diákmunka és első munka',
      level: 1, minutes: 12,
      summary: 'Iskolaszövetkezet, nyári munka, 16 év alattiak szabályai, adóazonosító jel és TAJ, és mennyi marad meg a keresetből 2026-ban.',
      tags: ['diákmunka', 'iskolaszövetkezet', 'nyári munka', 'fiatal munkavállaló', 'adóazonosító jel', 'adókártya', 'TAJ', 'egyszerűsített foglalkoztatás', '25 év alatti kedvezmény', 'munkaidő'],
      sections: [
        {
          title: 'Hány évesen dolgozhatsz?',
          text: 'A **Munka törvénykönyve** szerint:\n\n- **16 éves kortól** létesíthetsz munkaviszonyt.\n- **15 évesen**, ha **nappali tagozatos tanuló** vagy, az **iskolai szünidőben** dolgozhatsz (például nyáron).\n- 16 év alatt (és 18 év alatt bizonyos esetekben) a **törvényes képviselő (szülő) hozzájárulása** kell.\n- Fiatalabbak kivételesen, **gyámhatósági engedéllyel** léphetnek fel (művészeti, sport-, modell- vagy hirdetési tevékenység).\n\n**18 év alatti munkavállalóra** (fiatal munkavállaló) szigorúbb szabályok vonatkoznak:\n- legfeljebb **napi 8, heti 40 óra** munkaidő,\n- **nem** dolgozhat **éjszaka** (22 és 6 óra között),\n- **nem** rendelhető el neki **rendkívüli munkaidő** (túlóra),\n- **4,5 óránként 30 perc** szünet jár,\n- veszélyes munkára nem alkalmazható.'
        },
        {
          title: 'Iskolaszövetkezet',
          text: 'A legtöbb diák **iskolaszövetkezeten** keresztül dolgozik. Így működik:\n\n1. Belépsz egy iskolaszövetkezetbe (tag leszel, néha jelképes **részjegyet** kell vásárolni).\n2. A szövetkezet közvetít munkát partnercégekhez (bolt, raktár, rendezvény, irodai munka).\n3. A bért a szövetkezet fizeti, ő intézi a bejelentést és a levonásokat.\n\n**Feltétel:** általában **nappali tagozatos** diáknak kell lenned (középiskola, egyetem), és **diákigazolvány** vagy hallgatói jogviszony-igazolás kell.\n\n**Előnye** (2026-os szabályok): a nappali tagozatos diák iskolaszövetkezeti munkája után **nem kell 18,5%-os TB-járulékot** fizetni (nem válsz biztosítottá), és **25 év alatt** a plafonig **szja sem** terheli. Így a **bruttó bér nagyjából megegyezik a nettóval**!',
          tip: 'Mivel iskolaszövetkezetben nem vagy biztosított, nem szerzel **nyugdíjjogosultságot** és **táppénzt** sem. Egészségügyi ellátásra diákként amúgy is jogosult vagy.'
        },
        {
          title: 'Mennyi marad meg? (2026-os példák)',
          text: '**1. Iskolaszövetkezet, 18 éves gimnazista:** nyáron 160 órát dolgozik bruttó 2 200 Ft-os órabérrel.\n`160 × 2 200 = 352 000 Ft` bruttó → szja 0 (25 év alatt), TB-járulék 0 (nappali tagozatos szövetkezeti tag) → **nettó ≈ 352 000 Ft**.\n\n**2. Munkaviszony egy boltban, 20 éves egyetemista:** bruttó 322 800 Ft (minimálbér):\n- szja: 0 Ft (25 év alatti kedvezmény)\n- TB-járulék: `322 800 × 0,185 = 59 718 Ft`\n- **nettó: 263 082 Ft**\n\n**3. Ugyanez 26 évesen:** szja is jön (`48 420 Ft`) → **nettó 214 662 Ft**.\n\n**4. Egyszerűsített foglalkoztatás (alkalmi munka):** a munkáltató fizet egy napi fix közterhet, a teljes bér a tiéd – de ez is **bejelentett** munka, és a NAV látja.',
          warn: 'A „zsebbe” (bejelentés nélkül) fizetett munka nem csak illegális: baleset esetén **nincs biztosításod**, és nem tudod bizonyítani, hogy dolgoztál – ha nem fizetnek, nehéz behajtani.'
        },
        {
          title: 'Iratok: adóazonosító jel, TAJ, bankszámla',
          text: 'Munkába álláshoz ezek kellenek:\n\n- **Adóazonosító jel** (10 jegyű, 8-cal kezdődik): a **NAV** adja ki, és az **adóigazolványon** (régi nevén „adókártya”) szerepel. Ha még nincs, a NAV-nál igényelheted (online is). Gyakran a szülők már kiváltották neked.\n- **TAJ-szám** (társadalombiztosítási azonosító jel, 9 jegyű): a TAJ-kártyán szerepel, születéskor kapod.\n- **Személyi igazolvány**, **lakcímkártya**.\n- **Bankszámla** a fizetés fogadásához (lásd a Bankszámla és kártyák leckét) – a diákszámlák általában ingyenesek.\n- **Diákigazolvány** vagy iskolalátogatási igazolás az iskolaszövetkezethez.\n- Bizonyos munkákhoz (vendéglátás, élelmiszer) **egészségügyi alkalmassági vizsgálat** is kell.'
        },
        {
          title: 'Szerződés és jogaid',
          text: '- Mindig legyen **írásos szerződés** (munkaszerződés vagy szövetkezeti megállapodás) a bérrel, munkaidővel, munkahellyel.\n- Kérj **bérjegyzéket**, és ellenőrizd, hogy a ledolgozott órák stimmelnek-e.\n- Vezess saját nyilvántartást a ledolgozott órákról (például egy jegyzet a telefonon).\n- A diákmunkára is vonatkozik a **minimálbér** és a **munkavédelem** – munkavédelmi oktatás nélkül nem kezdhetsz veszélyes munkát.\n- Ha nem kapod meg a béred, fordulj a szövetkezethez, majd a **munkaügyi hatósághoz** (kormányhivatal).\n\n**Bevallás:** a diákmunka jövedelmét is be kell vallani – a NAV e-SZJA tervezete ezt általában tartalmazza (lásd az szja-bevallás leckét).'
        }
      ],
      quiz: [
        { q: 'Hány évesen dolgozhat egy nappali tagozatos diák az iskolai szünidőben?', options: ['12 évesen', '15 évesen', '14 évesen', '18 évesen'], answer: 1, explain: 'A Munka törvénykönyve szerint a 15 éves nappali tagozatos tanuló az iskolai szünidőben dolgozhat.' },
        { q: 'Melyik tiltott egy 17 éves munkavállalónál?', options: ['Éjszakai munka 22 és 6 óra között', 'Hétvégi munka', 'Napi 6 óra munka', 'Bolti eladói munka'], answer: 0, explain: 'Fiatal munkavállaló nem dolgozhat éjszaka, és túlóra sem rendelhető el neki.' },
        { q: 'Mennyi TB-járulékot fizet a nappali tagozatos diák iskolaszövetkezeti munka után 2026-ban?', options: ['18,5%-ot', '13%-ot', 'Nem fizet', '15%-ot'], answer: 2, explain: 'Iskolaszövetkezeti nappali tagozatos tagként nem válik biztosítottá, így nincs TB-járulék.' },
        { q: 'Egy 20 éves diák munkaviszonyban bruttó 300 000 Ft-ot keres 2026-ban. Mennyi a nettó?', options: ['300 000 Ft', '199 500 Ft', '244 500 Ft', '255 000 Ft'], answer: 2, explain: 'Szja nincs (25 év alatt), TB-járulék 18,5%: 300 000 × 0,815 = 244 500 Ft.' },
        { q: 'Ki adja ki az adóazonosító jelet?', options: ['Az iskola', 'A NAV', 'A bank', 'A háziorvos'], answer: 1, explain: 'Az adóazonosító jelet a NAV adja ki, az adóigazolványon szerepel.' },
        { q: 'Mi a TAJ-szám?', options: ['Diákigazolvány-szám', 'Társadalombiztosítási azonosító jel', 'Adószám', 'Bankszámlaszám'], answer: 1, explain: 'A TAJ a társadalombiztosítási azonosító, az egészségügyi ellátásnál és a munkába lépésnél is kell.' },
        { q: 'Miért veszélyes a bejelentés nélküli diákmunka?', options: ['Mert kevesebb az órabér', 'Baleset esetén nincs biztosításod, és nehéz bizonyítani a munkát', 'Mert nem lehet nyáron dolgozni', 'Nem veszélyes'], answer: 1, explain: 'Nincs szerződés, nincs bejelentés: jogilag szinte védtelen vagy.' }
      ]
    },
    {
      id: 'szamlak-kartyak',
      title: 'Bankszámla, kártyák, fintech',
      level: 1, minutes: 13,
      summary: 'Hogyan válassz bankszámlát, mennyibe kerül egy év alatt, mi a különbség a betéti és a hitelkártya között, hogyan működik az azonnali utalás, mi a Revolut-típusú fintech, mit véd az OBA, és hogyan ismered fel a csalókat.',
      tags: ['bankszámla', 'számlavezetési díj', 'betéti kártya', 'hitelkártya', 'türelmi idő', 'azonnali utalás', 'másodlagos azonosító', 'fintech', 'Revolut', 'OBA', 'betétbiztosítás', 'adathalászat', 'telefonos csalás', 'tranzakciós illeték'],
      sections: [
        {
          title: 'Bankszámlát választok: mit hasonlíts össze?',
          text: 'Az alapokat (számlaszám, IBAN, utalás) a **Pénzügyi ismeretek / Bankszámla, kártya, utalás, biztonság** lecke mutatja be. Itt a **választás** a cél.\n\nA díjak, amiket érdemes összevetni:\n- **havi számlavezetési díj** (sok bank fiataloknak vagy rendszeres jóváírás esetén **0 Ft**),\n- **kártyadíj** (éves vagy havi),\n- **utalási díj** – Magyarországon a bankok a **tranzakciós illetéket** jellemzően továbbhárítják az ügyfélre,\n- **készpénzfelvétel díja** (saját és idegen ATM, külföld),\n- **devizaváltás** díja / árfolyama külföldi kártyás fizetésnél,\n- **SMS-értesítő** díja.\n\nA jogszabály szerint magánszemélyek a **főszámlájukról** havonta **két alkalommal, összesen 150 000 Ft-ig** díjmentesen vehetnek fel készpénzt belföldi ATM-ből (ehhez a banknál nyilatkozni kell – kérdezz rá).\n\nAz MNB **Bankszámlaválasztó** programja (mnb.hu) a te szokásaid alapján hasonlítja össze a számlacsomagokat.',
          tip: 'Ne a reklám alapján dönts, hanem a **saját havi szokásaid** (hány utalás, hány kártyás fizetés, mennyi készpénz) alapján számolj éves költséget!'
        },
        {
          title: 'Számolt példa: mennyibe kerül egy év alatt?',
          text: 'Képzeletbeli **2026-os** ajánlatok egy havi 8 utalást, 1 készpénzfelvételt végző fiatalnak:\n\n**„A” számla:** számlavezetés 0 Ft, kártya 0 Ft, utalás tételenként átlag 150 Ft.\n`12 × 8 × 150 = 14 400 Ft/év`\n\n**„B” számla:** számlavezetés 1 290 Ft/hó, minden utalás díjmentes.\n`12 × 1 290 = 15 480 Ft/év`\n\n**„C” számla:** számlavezetés 0 Ft, ha havonta legalább 150 000 Ft jóváírás érkezik – egyébként 1 990 Ft/hó; utalás ingyenes.\nHa van fizetésed: **0 Ft/év**. Ha a nyári szünetben 3 hónapig nincs jóváírás: `3 × 1 990 = 5 970 Ft/év`.\n\nTanulság: a „0 Ft-os számla” feltételeit mindig olvasd el!'
        },
        {
          title: 'Betéti kártya vagy hitelkártya?',
          text: '- **Betéti (debit) kártya**: a saját pénzedet költöd. Ha nincs fedezet, a fizetés nem megy át. Kezdőknek ez a biztonságos.\n- **Hitelkártya**: a bank pénzét költöd egy **hitelkeretig**. Ha a **türelmi időn** belül (gyakran 45 nap körül) a teljes összeget visszafizeted, nincs kamat. Ha nem, **magas kamat** jön – a hitelkártyák **THM-je** sokszor jóval magasabb, mint egy személyi kölcsöné. Hitelkártyáról **készpénzt felvenni** szinte mindig drága (díj + azonnali kamat).\n\n**Példa:** 200 000 Ft hitelkártyás tartozás, 35%-os éves kamat, csak a minimum (például 5%) befizetésével **évekig** tart a visszafizetés, és a kamat jóval meghaladhatja a 100 000 Ft-ot.\n\nA THM-ről és a hitelekről bővebben: **Pénzügyi ismeretek / Hitelek és adósság**.',
          warn: 'A hitelkártya nem „plusz pénz”, hanem hitel. Csak akkor használd, ha minden hónapban a teljes összeget vissza tudod fizetni.'
        },
        {
          title: 'Azonnali utalás és fintech',
          text: '**Azonnali átutalás** (2020 óta): a forintutalások legfeljebb néhány másodperc alatt megérkeznek, **éjjel-nappal, hétvégén is**. Utalhatsz **másodlagos azonosítóra** is (telefonszám, e-mail-cím, adóazonosító jel), ha a kedvezményezett ezt regisztrálta. Az azonnali utalás **nem vonható vissza** – ezért ellenőrizd a címzett nevét!\n\n**Fintech (pl. Revolut, Wise):** mobilalkalmazás-alapú pénzügyi szolgáltatók. Előnyük a gyors devizaváltás, külföldi kártyás fizetés, kényelmes app. Amire figyelj:\n- **melyik ország** felügyelete alá tartozik, és **melyik betétbiztosítási rendszer** véd (nem feltétlenül a magyar OBA),\n- mely szolgáltatás **banki betét**, és melyik csak **e-pénz** (az e-pénzt nem védi betétbiztosítás, hanem más védelmi szabályok),\n- hétvégi devizaváltási felár, havidíjas csomagok,\n- magyar **munkáltató, NAV, közművek** felé van-e magyar számlaszám.',
          tip: 'Sokan kombinálnak: magyar bankszámla a fizetésnek és a rezsinek, fintech app az utazáshoz és a külföldi fizetésekhez.'
        },
        {
          title: 'Az OBA: mennyi pénzed biztonságos?',
          text: 'Az **Országos Betétbiztosítási Alap (OBA)** a magyarországi bankokban elhelyezett betéteket védi: ha egy bank csődbe megy, betétesenként és bankonként legfeljebb **100 000 euró** értékű betétet fizet vissza (forintban). Ez a határ az EU-s szabályokon alapul; a kártalanítás **ingyenes**, nem kell igényelni a védelmet.\n\nNem védi az OBA például: a **részvényeket**, **befektetési alapokat** (ezekre más védelem vonatkozik, például a Befektető-védelmi Alap). A **magyar állampapírok** visszafizetéséért az **állam** felel.\n\nHa 100 000 eurónál több megtakarításod van (például lakás eladása után), érdemes **több bank között** megosztani.',
          tip: 'Egy banknál, de két számlán lévő pénz együtt számít a 100 000 eurós határba – a határ bankonként és ügyfelenként értendő.'
        },
        {
          title: 'Csalások: így védd magad',
          text: 'A leggyakoribb trükkök (2025–2026):\n\n- **Hamis banki hívás**: „a bank biztonsági osztályáról” hívnak (a kijelzett szám akár a bank valódi száma is lehet – ezt hamisítják), hogy „gyanús tranzakció van, utalja át a pénzét egy biztonsági számlára”, vagy hogy telepíts egy távsegítő appot.\n- **Adathalász SMS/e-mail**: „csomagja megérkezett, fizessen 290 Ft vámot”, „lejárt a jelszava” – egy hamis oldalra visznek, ahol a kártyaadataidat kérik.\n- **„Szia anya, új a számom”** üzenet, sürgős pénzkéréssel.\n- **Befektetési csalás**: hamis, ismert embereket utánzó (akár **deepfake** videós) hirdetés „garantált” hozammal.\n- **Online piactér**: „a futár kifizeti, csak add meg a kártyaadatod a linken”.\n\n**Aranyszabályok:**\n1. A bank **soha** nem kéri a **PIN-kódod**, a netbank **jelszavad**, az **SMS-kódot** vagy a teljes kártyaadatot telefonon/e-mailben.\n2. Ne telepíts távsegítő appot idegen kérésére.\n3. Tedd le, és **te hívd vissza** a bankot a kártyád hátoldalán lévő számon.\n4. Ha baj van: azonnal **tiltsd le a kártyát** (appban vagy telefonon), hívd a bankot, tegyél **rendőrségi feljelentést**.',
          warn: 'A csalók **sürgetnek** és **megijesztenek**. Ha valaki azt mondja, „most azonnal” kell utalnod, az szinte biztosan csalás.'
        }
      ],
      quiz: [
        { q: 'Mekkora betétet véd az OBA egy ügyfélnek egy bankban?', options: ['Korlátlanul', 'Legfeljebb 100 000 eurónak megfelelő összeget', 'Legfeljebb 1 millió forintot', 'Semmit, csak a cégekét'], answer: 1, explain: 'Az OBA betétesenként és bankonként 100 000 euróig kártalanít.' },
        { q: 'Mit kér tőled a valódi bank telefonon?', options: ['A teljes kártyaszámot és a CVC-t', 'Az SMS-ben kapott kódot', 'A PIN-kódot a biztonság kedvéért', 'Soha nem kéri a PIN-kódot, jelszót vagy SMS-kódot'], answer: 3, explain: 'Aki ezeket kéri, csaló. Tedd le, és hívd vissza a bankot a hivatalos számán.' },
        { q: 'Mi a hitelkártya türelmi ideje?', options: ['Az időszak, amíg kamatmentesen visszafizetheted a költést', 'A PIN-kód megváltoztatásának ideje', 'Amíg a kártya érvényes', 'Az az idő, amíg a kártya megérkezik'], answer: 0, explain: 'Ha a türelmi időn belül a teljes összeget visszafizeted, nincs kamat.' },
        { q: '„A” számla: 0 Ft havidíj, utalás 150 Ft. „B” számla: 1 290 Ft/hó, utalás ingyen. Havi 8 utalásnál melyik olcsóbb egy évre?', options: ['A „B” (12 000 Ft vs 15 480 Ft)', 'Nem lehet kiszámolni', 'Egyformák', 'Az „A” (14 400 Ft vs 15 480 Ft)'], answer: 3, explain: 'A: 12 × 8 × 150 = 14 400 Ft; B: 12 × 1 290 = 15 480 Ft.' },
        { q: 'Mire figyelj azonnali utalásnál?', options: ['Semmire, bármikor visszavonható', 'Arra, hogy 2 napig tart', 'Arra, hogy csak hétköznap működik', 'A címzett nevére és számára, mert az utalás nem vonható vissza'], answer: 3, explain: 'Az azonnali utalás másodpercek alatt megérkezik, és nem vonható vissza.' },
        { q: 'Mit érdemes ellenőrizni egy fintech-szolgáltatónál?', options: ['Semmit, mind ugyanúgy működik', 'Melyik ország felügyeli, és melyik betétbiztosítás védi a pénzed', 'Hány követője van a közösségi médiában', 'Hogy milyen színű a kártya'], answer: 1, explain: 'Nem minden fintech-pénzt véd az OBA; lehet külföldi betétbiztosítás vagy e-pénz-szabály.' },
        { q: 'Mit tegyél, ha gyanús hívás után megadtad a kártyaadataidat?', options: ['Írj a csalónak, hogy adja vissza', 'Azonnal tiltsd le a kártyát és hívd a bankot', 'Várj egy hetet, hátha nem történik semmi', 'Változtasd meg a profilképed'], answer: 1, explain: 'Minél gyorsabban tiltasz, annál kisebb a kár esélye.' }
      ]
    },
    {
      id: 'megtakaritas-ongondoskodas',
      widgets: [{ type: 'megtakaritas' }],
      title: 'Megtakarítás és öngondoskodás',
      level: 2, minutes: 15,
      summary: 'Vésztartalék, kamatos kamat számokkal, infláció, állampapír, TBSZ, önkéntes nyugdíjpénztár 20%-os jóváírással, NYESZ – miért éri meg korán kezdeni (2026-os szabályokkal).',
      tags: ['megtakarítás', 'vésztartalék', 'kamatos kamat', 'infláció', 'reálkamat', 'állampapír', 'TBSZ', 'önkéntes nyugdíjpénztár', 'adójóváírás', 'NYESZ', 'nyugdíjbiztosítás', 'kamatadó', 'öngondoskodás'],
      terms: ['kozgazdasagtan/inflacio', 'kozgazdasagtan/jelenertek'],
      sections: [
        {
          title: 'Először: vésztartalék',
          text: 'Mielőtt befektetsz, legyen **vésztartalékod**: **3–6 havi kiadásnyi** pénz, **gyorsan elérhető**, kockázatmentes helyen (külön bankszámla, rövid lekötésű betét vagy rövid futamidejű állampapír).\n\n**Példa (2026):** ha havonta 250 000 Ft-ot költesz, a cél `3 × 250 000 = 750 000 Ft` és `6 × 250 000 = 1 500 000 Ft` között van.\n\nAz alapokat (50/30/20 szabály, „először fizesd ki magad”) a **Pénzügyi ismeretek / Költségvetés** lecke tárgyalja.'
        },
        {
          title: 'A kamatos kamat: miért éri meg korán kezdeni?',
          text: 'A kamatos kamatnál a kamat is kamatozik:\n\n`végösszeg = kezdőtőke × (1 + r)^n`\n\n**1. példa:** 1 000 000 Ft, évi 6%, 10 év: `1 000 000 × 1,06^10 ≈ 1 790 848 Ft`.\n\n**2. példa: rendszeres megtakarítás.** Évi 120 000 Ft (havi 10 000 Ft), évi 5% hozam mellett (évenkénti befizetéssel közelítve):\n\n`végösszeg ≈ éves befizetés × ((1 + r)^n − 1) / r`\n\n- **25 évesen kezdve, 40 évig**: `120 000 × (1,05^40 − 1) / 0,05 ≈ 14,5 millió Ft` – ebből befizetés csak **4,8 millió Ft**!\n- **35 évesen kezdve, 30 évig**: `120 000 × (1,05^30 − 1) / 0,05 ≈ 8,0 millió Ft` – befizetés 3,6 millió Ft.\n\nA 10 év késés **kb. 6,5 millió Ft-ba** kerül, pedig csak 1,2 millióval kevesebbet fizettél be. Ez a kamatos kamat ereje.',
          tip: 'A „72-es szabály”: `72 / kamatláb(%)` ≈ ennyi év alatt duplázódik a pénz. 6%-nál kb. 12 év.'
        },
        {
          title: 'Infláció és adó a hozamon',
          text: 'Az **infláció** csökkenti a pénz vásárlóerejét. Ami számít, az a **reálhozam**:\n\n`reálhozam ≈ (1 + névleges hozam) / (1 + infláció) − 1`\n\n**Példa:** 6%-os betéti kamat, 4%-os infláció mellett: `1,06 / 1,04 − 1 ≈ 1,9%` a valódi gyarapodás.\n\n**Kamatadó (2026):** a bankbetétek kamatából általában **15% szja** és **13% szocho**, összesen **28%** adót vonnak le. Így a 6%-os kamatból adózás után kb. **4,3%** marad – 4%-os infláció mellett ez alig több a nulla reálhozamnál.\n\nKivételek, ahol a hozam **adómentes** lehet: a **lakossági állampapírok** kamata, a lejáratig megtartott **TBSZ**, a feltételeket teljesítő **NYESZ** és a nyugdíjpénztári hozam (a 2026-os szabályok szerint – ellenőrizd az aktuális feltételeket).',
          warn: 'A magas, „garantált” hozamot ígérő ajánlatok gyakran csalások. Valódi befektetésnél a nagyobb hozam mindig nagyobb kockázattal jár.'
        },
        {
          title: 'Állampapír és TBSZ',
          text: '**Lakossági állampapír:** az állam kölcsönt vesz fel tőled, és kamatot fizet. Az ÁKK kínálatában vannak **fix kamatozású**, **inflációkövető** és **rövid futamidejű** papírok. Ingyenesen tarthatod a **Magyar Államkincstárnál** (Kincstári Értékpapírszámla, online is), vagy bankban. Az aktuális kamatokat és termékeket az **allampapir.hu** oldalon találod. Lejárat előtti visszaváltásnál díj lehet.\n\n**TBSZ (tartós befektetési számla):** egy naptári évben (gyűjtőév) befizetsz, és ha a pénzt **5 évig** nem veszed ki, a hozam **adómentes**. Ha a 3. év után, de az 5. év előtt szünteted meg, kedvezményes adó jár; korábbi megszüntetésnél normál adó. Ide állampapírt, részvényt, befektetési alapot is tehetsz.\n\nA befektetés alapjairól (kockázat, diverzifikáció) a **Pénzügyi ismeretek / Megtakarítás és befektetés alapjai** leckében tanulhatsz.'
        },
        {
          title: 'Nyugdíjcélú megtakarítás 20%-os állami jóváírással',
          text: 'Az állam **adójóváírással** ösztönzi a nyugdíjcélú megtakarítást (**2026-os szabályok**): a befizetés **20%-át** visszautalja a befizetett szja-dból, évente egy felső határig.\n\n- **Önkéntes nyugdíjpénztár (ÖNYP):** 20%, legfeljebb **150 000 Ft/év** (ehhez évi 750 000 Ft befizetés kell). A jóváírás a számládra érkezik, és tovább kamatozik. A munkáltató is fizethet bele. **10 év várakozási idő** után a hozam már felvehető, a teljes összeg a nyugdíjkorhatártól.\n- **NYESZ (nyugdíj-előtakarékossági számla):** 20%, legfeljebb **100 000 Ft/év**. A lekötött összeg 10 év után adómentesen vehető fel (a pontos feltételeket nézd meg).\n- **Nyugdíjbiztosítás:** 20%, legfeljebb **130 000 Ft/év**.\n\n**Példa (2026):** havi 25 000 Ft ÖNYP-befizetés = évi 300 000 Ft → **60 000 Ft** jóváírás, vagyis azonnal **20% „hozam”**, mielőtt a pénz egyáltalán befektetésre kerülne.\n\nA jóváírást az **szja-bevallásban** kell kérni.',
          warn: 'A jóváírás a befizetett szja-ból jár. Ha a kedvezmények (például a 25 év alatti kedvezmény) miatt nem fizetsz szja-t, a jóváírás lehetőségét a NAV aktuális tájékoztatójában ellenőrizd.'
        },
        {
          title: 'A magyar nyugdíjrendszer és az öngondoskodás',
          text: 'Magyarországon az **állami nyugdíjat** a mai dolgozók TB-járulékából fizetik a mai nyugdíjasoknak (**felosztó-kirovó rendszer**). Az öregedő népesség miatt egyre kevesebb dolgozóra jut egy nyugdíjas, ezért a szakértők szerint a jövőbeli nyugdíj a mostani bérhez képest **kisebb arányú** lehet.\n\nEzért fontos az **öngondoskodás**: minél korábban kezdesz el félretenni (akár havi 5–10 ezer forintot), annál többet dolgozik helyetted a kamatos kamat.\n\nA nyugdíjkorhatár **2026-ban 65 év** (a nők 40 év jogosultsági idő után korábban is nyugdíjba mehetnek).',
          tip: 'Ha a munkáltatód **béren kívüli juttatásként** nyugdíjpénztári hozzájárulást ad, mindenképp lépj be – ez ingyen pénz.'
        }
      ],
      quiz: [
        { q: 'Mennyi lesz 1 000 000 Ft 10 év alatt évi 6%-os kamatos kamattal (kerekítve)?', options: ['1 060 000 Ft', '1 600 000 Ft', 'Kb. 2 500 000 Ft', 'Kb. 1 790 000 Ft'], answer: 3, explain: '1 000 000 × 1,06^10 ≈ 1 790 848 Ft. Az 1 600 000 Ft az egyszerű kamat lenne.' },
        { q: 'Mekkora vésztartalék javasolt havi 200 000 Ft kiadásnál?', options: ['600 000 – 1 200 000 Ft', '20 000 Ft', '200 000 Ft', '5 millió Ft'], answer: 0, explain: 'A javasolt 3–6 havi kiadás: 3 × 200 000 és 6 × 200 000 között.' },
        { q: 'Mennyi adójóváírás jár 2026-ban évi 300 000 Ft önkéntes nyugdíjpénztári befizetés után?', options: ['30 000 Ft', '60 000 Ft', '45 000 Ft', '150 000 Ft'], answer: 1, explain: 'A befizetés 20%-a: 300 000 × 0,2 = 60 000 Ft (a felső határ 150 000 Ft/év).' },
        { q: 'Mennyi befizetés kell az ÖNYP maximális, 150 000 Ft-os jóváírásához?', options: ['1 500 000 Ft/év', '150 000 Ft/év', '300 000 Ft/év', '750 000 Ft/év'], answer: 3, explain: '150 000 / 0,2 = 750 000 Ft.' },
        { q: '6%-os betéti kamat és 4%-os infláció mellett kb. mekkora a reálhozam (adó előtt)?', options: ['Kb. 1,9%', '10%', '6%', '−2%'], answer: 0, explain: '1,06 / 1,04 − 1 ≈ 1,9%.' },
        { q: 'Mennyi adót vonnak le összesen a bankbetét kamatából 2026-ban (szja + szocho)?', options: ['28%', '13%', '0%', '15%'], answer: 0, explain: '15% szja + 13% szociális hozzájárulási adó = 28%.' },
        { q: 'Mikor adómentes a TBSZ hozama?', options: ['Soha', 'Azonnal', 'Ha a gyűjtőév után 5 évig nem veszed ki a pénzt', '1 év után'], answer: 2, explain: 'Az 5 éves lekötési idő végén a hozam adómentes; a 3. év után kedvezményes az adó.' },
        { q: 'Miért éri meg 25 évesen kezdeni a nyugdíjcélú megtakarítást 35 helyett?', options: ['Mert 35 felett tilos', 'Nincs különbség', 'Mert az állam csak fiataloknak ad jóváírást', 'A kamatos kamat miatt a plusz 10 év sokszorosan többet hoz, mint a plusz befizetés'], answer: 3, explain: 'A példában havi 10 000 Ft, 5%: 40 év alatt ≈ 14,5 M Ft, 30 év alatt ≈ 8,0 M Ft.' }
      ]
    },
    {
      id: 'biztositasok',
      title: 'Biztosítások',
      level: 2, minutes: 13,
      summary: 'Kötelező gépjármű-felelősségbiztosítás, casco, lakásbiztosítás albérlőknek is, utasbiztosítás és EU egészségbiztosítási kártya, önrész és bónusz-málusz – mikor mi fizet és mennyit.',
      tags: ['biztosítás', 'kgfb', 'kötelező gépjármű-felelősségbiztosítás', 'casco', 'bónusz-málusz', 'önrész', 'lakásbiztosítás', 'felelősségbiztosítás', 'utasbiztosítás', 'EU egészségbiztosítási kártya', 'EHIC', 'alulbiztosítás', 'kárbejelentés'],
      sections: [
        {
          title: 'Hogyan működik a biztosítás?',
          text: 'Sok ember fizet egy kisebb **biztosítási díjat**, és a közös pénzből fizetik ki annak a keveseknek a nagy kárát, akikkel baj történik. Te tehát egy **kis, biztos kiadással** megvéded magad egy **nagy, bizonytalan** veszteségtől.\n\nAlapfogalmak:\n- **Biztosító** és **szerződő / biztosított**: aki fizet, és akit véd.\n- **Kockázatviselés**: mire terjed ki (például tűz, betörés, csőtörés).\n- **Kizárások**: mire **nem** fizet – ezt mindig olvasd el!\n- **Önrész**: a kár azon része, amit te fizetsz.\n- **Biztosítási összeg**: a térítés felső határa.\n- **Kárbejelentés**: határidőn belül, bizonyítékokkal (fotó, rendőrségi jegyzőkönyv, számla).',
          tip: 'Ne az legyen a kérdés, hogy „megéri-e”: a biztosítás arra való, hogy egy **ritka, de súlyos** esemény ne tegyen tönkre anyagilag.'
        },
        {
          title: 'Autó: KGFB és casco',
          text: '**KGFB (kötelező gépjármű-felelősségbiztosítás):** minden forgalomban lévő gépjárműre **kötelező**. Azt a kárt fizeti, amit **te okozol másnak** (az ő autója, egészsége). A **saját** autódban keletkezett kárt **nem**! Ha nincs érvényes KGFB, a forgalomból kivonhatják az autót, és magas **fedezetlenségi díjat** kell fizetni.\n\n**Bónusz-málusz rendszer:** a kezdő vezető **A0** osztályból indul. Minden kármentes év után eggyel jobb **bónusz** (B1…B10) osztályba kerülsz, ami olcsóbb díjat jelent; ha te okozol kárt, visszaesel (akár **málusz**, M1–M4 osztályba).\n\n**Casco:** **önkéntes**, a **saját autód** kárait fizeti (ütközés, lopás, jégkár, rongálás), általában **önrésszel**.\n\n**Önrész példa:** casco, önrész a kár 10%-a, de legalább 100 000 Ft.\n- 600 000 Ft-os kár: 10% = 60 000 Ft < 100 000 Ft → te fizetsz **100 000 Ft-ot**, a biztosító 500 000 Ft-ot.\n- 2 000 000 Ft-os kár: 10% = **200 000 Ft** a tiéd, 1 800 000 Ft a biztosítóé.',
          warn: 'A KGFB díja kezdő, fiatal sofőröknek magas lehet. Hasonlíts össze ajánlatokat (alkuszok, összehasonlító oldalak), és figyelj a **szerződés évfordulójára** – a váltás határidejét a szerződés és a biztosító tájékoztatója írja le.'
        },
        {
          title: 'Lakásbiztosítás – albérlőknek is',
          text: 'A **lakásbiztosítás** két nagy része:\n- **épület** (falak, tető, beépített dolgok) – ezt általában a tulajdonos köti,\n- **ingóság** (bútor, laptop, ruhák) – albérlőként **a te holmid** a tulajdonos biztosítása **nem** fedezi!\n\nNagyon fontos a **felelősségbiztosítás**: ha a mosógéped elárasztja az alsó szomszéd lakását, a kár akár milliós is lehet – ezt a lakásbiztosítás felelősségi része fizeti.\n\n**Alulbiztosítás:** ha a vagyonod értékénél kisebb összegre biztosítod, a biztosító **arányosan** kevesebbet fizet. Például 10 millió Ft értékű ingóságot 5 millióra biztosítottál (50%): egy 1 milliós kárnál csak kb. **500 000 Ft**-ot kapsz.',
          tip: 'Albérlőknek léteznek olcsó, **bérlői lakásbiztosítások** (ingóság + felelősség). Egy laptop ellopása vagy egy csőtörés miatt is megérheti.'
        },
        {
          title: 'Utasbiztosítás és EU egészségbiztosítási kártya',
          text: '**Európai Egészségbiztosítási Kártya (EEK / EHIC):** a **NEAK** adja ki **ingyen** a magyar TB-ben biztosítottaknak (diákoknak is). Az EU/EGT-országokban és Svájcban a **szükséges állami egészségügyi ellátást** a helyi szabályok szerint veheted igénybe vele – de csak azt, amit a helyi biztosítottak is kapnak (esetleges önrésszel), **magánkórházban nem** érvényes, és a **hazaszállítást** sem fizeti.\n\n**Utasbiztosítás:** fizeti a **sürgősségi orvosi ellátást** (magánklinikán is), a **mentést, hazaszállítást**, a **poggyászkárt**, a **járatkésést** (csomagtól függően). Figyelj:\n- **síelés, extrém sport** csak külön kiegészítővel!\n- **orvosi költség limitje** (Európán kívül, például az USA-ban akár több tízmillió forintos számla is lehet),\n- a **bankkártyához adott** utasbiztosítás limitjei gyakran alacsonyak, és csak akkor érvényes, ha az utat azzal a kártyával fizetted.',
          warn: 'Az EEK nem helyettesíti az utasbiztosítást! Egy külföldi baleset után a hazaszállítás több millió forint is lehet.'
        },
        {
          title: 'Egyéb biztosítások és panaszkezelés',
          text: '- **Kockázati életbiztosítás**: halál esetén fizet a kedvezményezettnek – lakáshitelhez a bank gyakran kéri.\n- **Baleset- és egészségbiztosítás**: baleset, kórházi napok, műtét esetén fizet.\n- **Telefonbiztosítás / kiterjesztett garancia**: gyakran drága a várható kárhoz képest – olvasd el a kizárásokat (például „gondatlanság”).\n\n**Ha vitád van a biztosítóval:**\n1. írásos **panasz** a biztosítónál,\n2. a **Pénzügyi Békéltető Testület** (az MNB mellett működik, ingyenes),\n3. az **MNB** fogyasztóvédelmi eljárása vagy bíróság.',
          tip: 'Kárnál azonnal fotózz, gyűjtsd össze a számlákat, és tartsd a bejelentési határidőt. A „baleseti bejelentő” nyomtatványt érdemes az autóban tartani.'
        }
      ],
      quiz: [
        { q: 'Mit fizet a KGFB?', options: ['A tankolást', 'A kárt, amit te okozol másnak', 'Az autó ellopását', 'A saját autód javítását minden esetben'], answer: 1, explain: 'A kötelező felelősségbiztosítás a károsult (másik fél) kárát fizeti; a saját autó kárára a casco való.' },
        { q: 'Casco önrész: a kár 10%-a, minimum 100 000 Ft. Mennyit fizetsz egy 800 000 Ft-os kárnál?', options: ['0 Ft', '800 000 Ft', '100 000 Ft', '80 000 Ft'], answer: 2, explain: '10% = 80 000 Ft, ami kevesebb a minimumnál, így 100 000 Ft az önrész.' },
        { q: 'Melyik osztályból indul a kezdő vezető a bónusz-málusz rendszerben?', options: ['B1', 'M4', 'B10', 'A0'], answer: 3, explain: 'Minden új szerződő A0-ból indul; kármentes évek után bónuszosztályba lép.' },
        { q: 'Albérlőként védi-e a laptopodat a tulajdonos lakásbiztosítása?', options: ['Általában nem, a saját ingóságodra neked kell biztosítást kötnöd', 'Csak hétvégén', 'Igen, mindig', 'Csak ha drága'], answer: 0, explain: 'A tulajdonos biztosítása az ő vagyonát védi; a bérlő ingóságát a bérlő biztosíthatja.' },
        { q: 'Mit NEM fizet az Európai Egészségbiztosítási Kártya?', options: ['A szükséges állami ellátást az EU-ban', 'Semmit nem fizet', 'A hazaszállítást és a magánkórházi ellátást', 'Az orvosi vizsgálatot állami kórházban'], answer: 2, explain: 'Az EEK csak a helyi állami ellátásra jó; a hazaszállításra és magánellátásra utasbiztosítás kell.' },
        { q: '10 millió Ft-os ingóságot 5 millióra biztosítottál. Kb. mennyit fizet a biztosító egy 1 milliós kárnál?', options: ['5 000 000 Ft', '0 Ft', 'Kb. 500 000 Ft', '1 000 000 Ft'], answer: 2, explain: 'Alulbiztosításnál arányos a térítés: 50% × 1 000 000 = 500 000 Ft.' },
        { q: 'Hová fordulhatsz ingyen, ha vitád van a biztosítóval és a panaszod nem vezetett eredményre?', options: ['A háziorvoshoz', 'A rendőrséghez minden esetben', 'A Pénzügyi Békéltető Testülethez', 'A NAV-hoz'], answer: 2, explain: 'A Pénzügyi Békéltető Testület az MNB mellett működik, eljárása ingyenes.' }
      ]
    },
    {
      id: 'lakhatas-rezsi',
      title: 'Albérlet, rezsi, első lakás',
      level: 2, minutes: 14,
      summary: 'Mennyibe kerül egy albérlet havonta, mi a kaució, mire figyelj a bérleti szerződésben, hogyan működik a rezsiszámla és a mérőóra, mi a közös költség, és milyen támogatások vannak az első saját lakáshoz 2026-ban.',
      tags: ['albérlet', 'bérleti szerződés', 'kaució', 'rezsi', 'rezsicsökkentés', 'mérőóra', 'közös költség', 'átadás-átvételi jegyzőkönyv', 'Wekerle Plusz', 'Otthon Start', 'CSOK Plusz', 'lakáshitel', 'illeték', 'első lakás'],
      sections: [
        {
          title: 'Mennyibe kerül egy albérlet? (2026-os példa)',
          text: 'Egy **elképzelt, 2026-os** budapesti példa: 35 m²-es egyszobás lakás, egy fő.\n\n- bérleti díj: **220 000 Ft**\n- közös költség (ha a bérlőre hárítják): **18 000 Ft**\n- áram: **8 000 Ft**\n- gáz (évi átlag, télen több): **12 000 Ft**\n- víz-csatorna: **6 000 Ft**\n- internet: **7 000 Ft**\n- hulladékszállítás (ha a bérlő fizeti): **3 000 Ft**\n- bérlői lakásbiztosítás: **2 000 Ft**\n\n**Összesen: kb. 276 000 Ft/hó** – a bérleti díjon felül tehát még **kb. 25%**!\n\nKöltözéskor egyszerre kell: **kaució** (például 2 havi bérleti díj = 440 000 Ft) + az **első havi** bérleti díj (220 000 Ft) + esetleg **ingatlanközvetítői díj** → akár **660 000 Ft** azonnal. Erre előre spórolni kell.',
          tip: 'A számok városonként és évente nagyon eltérnek. Hirdetések nézegetésekor mindig kérdezd meg: „Mennyi a rezsi és a közös költség télen?”'
        },
        {
          title: 'A kaució és a bérleti szerződés',
          text: 'A **kaució (óvadék)** biztosíték a bérbeadónak: ha károsítod a lakást vagy tartozást hagysz, ebből vonhatja le. A szerződés végén – ha minden rendben – **vissza kell kapnod**. A szokásos összeg **1–3 havi bérleti díj**.\n\nA bérleti szerződés legyen **írásban**, és tartalmazza:\n- a felek adatait, a lakás címét, a **bérleti díjat** és **esedékességét**,\n- **mit fizet** a bérlő (rezsi, közös költség) és mit a tulajdonos,\n- a **kaució** összegét és visszafizetésének feltételeit,\n- a szerződés **időtartamát** (határozott / határozatlan) és a **felmondási időt**,\n- lehet-e **bejelentkezni** a lakcímre, tartani **háziállatot**, albérlőt befogadni.\n\n**Átadás-átvételi jegyzőkönyv:** a beköltözéskor rögzítsd a **mérőóra-állásokat**, a **leltárt** (bútorok, gépek) és a lakás állapotát – **fotókkal, dátummal**. Kiköltözéskor ugyanezt csináld meg, így nem vitatkozhatnak a kaución.',
          warn: 'Soha ne utalj kauciót vagy foglalót lakásmegtekintés előtt, főleg ha a „tulajdonos külföldön van, és postán küldi a kulcsot”. Ez gyakori **albérlet-csalás**.'
        },
        {
          title: 'Rezsi: mérőóra, számla, rezsicsökkentés',
          text: '**Mérőóra:** az áram (kWh), a gáz (m³), a víz (m³) fogyasztását méri. A szolgáltató számlázhat:\n- **leolvasás vagy diktálás** alapján (ha diktálod, appban vagy telefonon add meg a havi óraállást),\n- **becsült részszámlával**, majd évente **elszámoló számlával** – ilyenkor jöhet egy nagyobb **pótlólagos** befizetés vagy **jóváírás**.\n\n**Rezsicsökkentés (2026-os szabályok):** a háztartások egy **átlagfogyasztásig** kedvezményes (hatósági) áron kapják az áramot és a gázt: áramból évi **2 523 kWh**, gázból évi **1 729 m³** (2022 augusztusa óta). Az e fölötti részért magasabb, **piaci alapú** árat kell fizetni. A pontos árakat és feltételeket a szolgáltatónál nézd meg.\n\n**Közös költség:** társasházban a közös részek (lépcsőház, lift, takarítás, felújítási alap) költsége; alapvetően a **tulajdonos** fizeti, de a bérleti szerződés átháríthatja a bérlőre.',
          tip: 'Ha egy hónapban hirtelen nagyon nagy a fogyasztás, nézd meg a mérőórát éjszaka, amikor minden ki van kapcsolva: ha forog, szivárgás (víz) vagy hibás készülék lehet.'
        },
        {
          title: 'Hogyan spórolj a rezsin?',
          text: '- Diktáld a valós óraállást, hogy ne a becslés alapján fizess.\n- LED-izzók, a készenléti (stand-by) fogyasztás megszüntetése elosztóval.\n- Fűtésnél 1 °C csökkentés kb. **6%** fűtési energiát takaríthat meg.\n- Mosógépet, mosogatógépet teli állapotban és alacsonyabb hőfokon járass.\n- Rövidebb zuhany, víztakarékos zuhanyfej.\n\nAz energiatakarékosság részleteiről az **Önálló élet és háztartás** tantárgy energiatakarékossági leckéje szól.'
        },
        {
          title: 'Első saját lakás: támogatások (2026)',
          text: 'A 2026-os legfontosabb lehetőségek (a feltételek gyakran változnak – mindig ellenőrizd a bankoknál és a **magyarorszag.hu**-n):\n\n- **Wekerle Plusz** (2026. október 28. óta, az Otthon Start utódja): első saját lakáshoz államilag támogatott, **fix kamatú** lakáshitel – **új lakásra fix 3%**, **használt lakásra fix 5%** kamattal, legfeljebb **50 millió Ft**, jellemzően legalább **10% önerővel**. Az ingatlan árára és négyzetméterárára korlát vonatkozik. (Az elődjére, a 2025 szeptemberében indult, fix 3%-os **Otthon Start** hitelre 2026. november 15-ig lehetett igényt beadni.)\n- **CSOK Plusz**: gyermeket vállaló házaspároknak kedvezményes kamatozású hitel.\n- **Babaváró kölcsön**: házaspároknak, gyermekvállaláshoz kötött kedvezményekkel.\n\n**Számolt példa (fix 3%-os támogatott hitel, 2026):** 40 millió Ft hitel, 3% kamat, 25 év:\n`havi részlet = H × i / (1 − (1 + i)^(−n))`, ahol `i = 0,03 / 12 = 0,0025`, `n = 300`\n→ kb. **190 000 Ft/hó**. 25 év alatt összesen kb. **57 millió Ft**-ot fizetsz vissza (ebből kb. 17 millió a kamat).\n\nLakásvásárlásnál **vagyonszerzési illetéket** is fizetni kell (általában a vételár **4%-a**; bizonyos esetekben kedvezmény jár) – ezzel is számolj!',
          warn: 'Lakáshitelt csak akkor vegyél fel, ha a törlesztőrészlet a nettó jövedelmed **legfeljebb kb. harmada**, és marad vésztartalékod. Hitelfelvétel előtt kérj több banktól ajánlatot, és hasonlítsd össze a **THM**-et.'
        }
      ],
      quiz: [
        { q: 'Mi a kaució?', options: ['A közös költség', 'Az ingatlanközvetítő jutaléka', 'Biztosíték a bérbeadónak, amit rendben hagyott lakásnál vissza kell kapnod', 'A havi bérleti díj'], answer: 2, explain: 'A kaució (óvadék) a károk és tartozások fedezete; a szerződés végén visszajár, ha nincs levonható tétel.' },
        { q: 'Mit érdemes rögzíteni beköltözéskor az átadás-átvételi jegyzőkönyvben?', options: ['A szomszédok nevét', 'Csak a kulcsok számát', 'Semmit, felesleges', 'A mérőóra-állásokat, a leltárt és a lakás állapotát fotókkal'], answer: 3, explain: 'Így kiköltözéskor nem lehet vita arról, mi volt eredetileg sérült vagy mennyit fogyasztottál.' },
        { q: 'Bérleti díj 200 000 Ft, kaució 2 havi. Mennyit kell beköltözéskor kifizetni az első hónappal együtt?', options: ['400 000 Ft', '600 000 Ft', '800 000 Ft', '200 000 Ft'], answer: 1, explain: '2 × 200 000 kaució + 200 000 első havi díj = 600 000 Ft.' },
        { q: 'Mi az elszámoló számla?', options: ['A közös költség éves díja', 'A kaució visszautalása', 'A bérleti díj számlája', 'Az éves tényleges fogyasztás alapján elkészített számla, ami korrigálja a becsült részszámlákat'], answer: 3, explain: 'Becsült részszámlák után az elszámoló számla mutatja meg, kell-e még fizetni vagy jóváírás jár.' },
        { q: 'Mekkora éves áramfogyasztásig jár 2026-ban a rezsicsökkentett ár?', options: ['10 000 kWh', 'Korlátlanul', '2 523 kWh', '1 729 kWh'], answer: 2, explain: 'Áramból évi 2 523 kWh, gázból évi 1 729 m³ az átlagfogyasztási határ (2022 augusztusa óta).' },
        { q: 'Mennyi a Wekerle Plusz hitel kamata új lakás vásárlásakor?', options: ['A jegybanki alapkamat duplája', 'Fix 3%', '0%', 'Változó 10%'], answer: 1, explain: 'A Wekerle Plusz (2026. október 28-tól, az Otthon Start utódja) új lakásra fix 3%, használt lakásra fix 5% kamatot ad, legfeljebb 50 millió Ft-ig.' },
        { q: 'Mi a jele egy albérlet-csalásnak?', options: ['Megmutatják a lakást', 'Átadás-átvételi jegyzőkönyvet készítenek', 'Írásos szerződést kínálnak', 'Megtekintés előtt kérnek kauciót, mert a tulajdonos „külföldön van”'], answer: 3, explain: 'Soha ne fizess olyan lakásért, amit nem láttál, és ahol nem találkoztál a tulajdonossal.' }
      ]
    },
    {
      id: 'fogyasztovedelem',
      title: 'Fogyasztói jogaid',
      level: 1, minutes: 14,
      summary: 'Jótállás és szavatosság közti különbség, a jótállás időtartama 2026-ban, 14 napos elállás online vásárlásnál, garanciális ügyintézés lépései, békéltető testület, csalások és apró betűs részek.',
      tags: ['fogyasztóvédelem', 'jótállás', 'garancia', 'kellékszavatosság', 'termékszavatosság', 'elállás', '14 nap', 'webshop', 'békéltető testület', 'vásárlók könyve', 'panasz', 'ÁSZF', 'előfizetési csapda', 'hamis webshop'],
      sections: [
        {
          title: 'Szavatosság vagy jótállás?',
          text: 'Két különböző jog véd, ha hibás terméket kapsz:\n\n**Kellékszavatosság** (a **Ptk.** alapján, **minden** termékre és szolgáltatásra):\n- az **eladóval** szemben érvényesíted,\n- fogyasztóként a teljesítéstől számított **2 évig** (használt terméknél ez szerződésben rövidebb, de legalább 1 év lehet),\n- az első **1 évben** vélelmezik, hogy a hiba már vásárláskor megvolt – **neked nem kell bizonyítanod**; utána neked kell.\n\n**Termékszavatosság:** ingó termék esetén a **gyártóval** szemben, 2 évig, csak javítás vagy csere kérhető.\n\n**Jótállás (köznyelven „garancia”):** **szigorúbb**, mert a jótállási idő alatt a **vállalkozásnak kell bizonyítania**, hogy a hibát te okoztad. Kötelező jótállás jár a jogszabályban felsorolt **tartós fogyasztási cikkekre** (műszaki cikk, háztartási gép, bútor, kerékpár stb.) **10 000 Ft** eladási ár felett.',
          tip: 'Ha egy hiba 1,5 év után jelentkezik egy kötelező jótállás nélküli terméknél, a kellékszavatosság akkor is véd (de ekkor neked kell bizonyítanod, hogy a hiba már vásárláskor megvolt).'
        },
        {
          title: 'Mennyi a kötelező jótállás? (2026)',
          text: 'A **2026-os szabályok szerint** (151/2003. Korm. rendelet) a kötelező jótállás időtartama a termék **eladási árától** függ:\n\n- **10 000 Ft – 250 000 Ft**: **2 év**\n- **250 000 Ft felett**: **3 év**\n\n(Korábban 10 000 – 100 000 Ft között csak 1 év volt – ezt a sávot **2024-ben megszüntették**.)\n\nA jótállás a termék **átadásától** (vagy a vállalkozás általi üzembe helyezéstől) indul.\n\n**Fontos szabályok:**\n- Ha a hiba a vásárlástól számított **3 munkanapon belül** jelentkezik, **cserét** kérhetsz.\n- A javítást **legfeljebb 15 napon** belül el kell végezni (törekedni kell erre).\n- **100 000 Ft felett** jótállási jegyet kell adni (lehet elektronikus is); alatta a **számla vagy nyugta** is elég a jótállás érvényesítéséhez.',
          warn: 'A jótállási jegy hiánya nem szünteti meg a jogodat – a vásárlást más módon (számla, nyugta, bankszámlakivonat) is bizonyíthatod.'
        },
        {
          title: '14 napos elállás online vásárlásnál',
          text: 'Ha **interneten, telefonon vagy házalótól** vásárolsz (távollévők közötti szerződés), **14 napon belül indoklás nélkül elállhatsz** a szerződéstől.\n\n- A 14 nap **termék** esetén az **átvételtől**, szolgáltatásnál a szerződéskötéstől számít.\n- Elég **jelezni** az elállást a határidőn belül (e-mailben vagy a webshop nyilatkozatmintájával), majd további 14 napon belül visszaküldeni a terméket.\n- A webshopnak a bejelentéstől számított **14 napon belül vissza kell fizetnie** a vételárat **és az eredeti szállítási díj alapdíját** (de visszatarthatja, amíg a terméket vissza nem kapja).\n- A **visszaküldés költsége** általában a **vásárlót** terheli, ha a webshop erről előre tájékoztatott.\n\n**Kivételek** (nincs elállási jog): **személyre szabott** termék, gyorsan **romló** élelmiszer, **felbontott** higiéniai termék (például fülhallgató, kozmetikum, ha zárt csomagolásban volt), felbontott **szoftver, film**, letöltött **digitális tartalom** (ha előre beleegyeztél), szállás- és jegyfoglalás meghatározott időpontra.',
          tip: '**Bolti** vásárlásnál **nincs** törvényes 14 napos visszaviteli jog hibátlan termékre! Ha a bolt mégis visszaveszi, az a saját üzletpolitikája.'
        },
        {
          title: 'Garanciális ügyintézés lépésről lépésre',
          text: '1. **Gyűjtsd össze** a bizonyítékokat: számla/nyugta, jótállási jegy, fotók, videó a hibáról.\n2. **Vidd vissza** az eladóhoz (vagy a jótállási jegyen szereplő szervizbe). Webshopnál írj e-mailt.\n3. Az eladó **jegyzőkönyvet** vesz fel a kifogásodról – kérj belőle **másolatot**.\n4. Mondd meg, mit kérsz: elsősorban **javítás vagy csere**; ha ez nem lehetséges, vagy nem végzik el határidőben, **árleszállítás** vagy **elállás** (pénz-visszafizetés).\n5. Ha a válasz nem megfelelő: **írásos panasz**, amelyre a vállalkozásnak **30 napon belül** írásban kell válaszolnia.\n6. Ha így sem jutsz eredményre: **békéltető testület** vagy **fogyasztóvédelmi hatóság** (kormányhivatal).\n\nA boltokban kötelező a **vásárlók könyve** is: a beírt panaszra szintén írásban kell válaszolni.',
          warn: 'Ne fogadd el, ha a bolt azt mondja: „forduljon közvetlenül a gyártóhoz”. A jótállást és a kellékszavatosságot **az eladónál** is érvényesítheted.'
        },
        {
          title: 'Békéltető testület és hatóság',
          text: '**Békéltető testület:** a megyei (vármegyei) és a budapesti **kereskedelmi és iparkamarák** mellett működik. Fogyasztó és vállalkozás közötti vitában **ingyenes**, gyorsabb, mint a bíróság, és ha a vállalkozás alávetette magát (vagy bizonyos esetekben), a döntése **kötelező** lehet. Ide a vállalkozással való **sikertelen egyeztetés után** fordulhatsz.\n\n**Pénzügyi Békéltető Testület:** bankokkal, biztosítókkal kapcsolatos vitákban (MNB mellett).\n\n**Fogyasztóvédelmi hatóság** (kormányhivatal): ha egy vállalkozás **szabályt szeg** (például nem ad jótállást, hamis árat tüntet fel), eljárást indíthat és **bírságot** szabhat ki – de a te egyéni kártérítésedről nem dönt.\n\n**EU-s vásárlásnál:** az **Európai Fogyasztói Központ** ingyen segít, ha egy másik EU-országbeli webshoppal van gondod.'
        },
        {
          title: 'Csalások és apró betűs részek',
          text: '**Hamis webshop jelei:**\n- **gyanúsan olcsó** márkás termékek (−70–90%),\n- nincs **cégnév, adószám, cím**, vagy nem létező cég,\n- csak **előre utalással** lehet fizetni, nincs utánvét vagy kártyás fizetés,\n- friss domain, rossz magyarság, nincsenek valódi vélemények.\n\nEllenőrizd a cégadatokat (például az e-cegjegyzek.hu-n), és keress rá a webshop nevére + „vélemény” vagy „csalás” szóval.\n\n**Apró betűs részek (ÁSZF) – mire figyelj:**\n- **„Ingyenes próbaidőszak”**, ami automatikusan **havidíjas előfizetésbe** fordul – jegyezd fel a lemondás határidejét!\n- **Hűségidő** (például mobilelőfizetés): idő előtti felmondásnál **kötbér** vagy visszafizetendő kedvezmény.\n- **Automatikus megújítás** (biztosítás, edzőterem, streaming).\n- **Plusz díjak** (kezelési költség, „szervizdíj”).',
          warn: 'Bankkártyás fizetésnél, ha a webshop nem szállít, a bankod **visszaterhelési (chargeback)** eljárással segíthet – előre utalásnál erre sokkal kisebb az esély.'
        }
      ],
      quiz: [
        { q: 'Mennyi a kötelező jótállás egy 180 000 Ft-os mosógépre 2026-ban?', options: ['6 hónap', '2 év', '3 év', '1 év'], answer: 1, explain: '10 000 és 250 000 Ft között 2 év a kötelező jótállás.' },
        { q: 'Mennyi a kötelező jótállás egy 400 000 Ft-os laptopra 2026-ban?', options: ['1 év', '2 év', '3 év', '5 év'], answer: 2, explain: '250 000 Ft felett 3 év a kötelező jótállás.' },
        { q: 'Hány napon belül állhatsz el indoklás nélkül egy webshopos vásárlástól?', options: ['A termék átvételétől számított 14 napon belül', 'Soha', '3 napon belül', '30 napon belül'], answer: 0, explain: 'Távollévők közötti szerződésnél 14 napos elállási jog jár.' },
        { q: 'Visszaviheted-e egy hibátlan pólót a bolti vásárlás után 10 nappal, törvény alapján?', options: ['Igen, mindig 14 napig', 'Csak ha a címke rajta van', 'Nem, bolti vásárlásnál erre nincs törvényes jog, csak ha a bolt üzletpolitikája megengedi', 'Igen, 30 napig'], answer: 2, explain: 'A 14 napos elállás a távollévők (online, telefonos) szerződéseire vonatkozik.' },
        { q: 'Mi a különbség a jótállás és a kellékszavatosság között a bizonyításban?', options: ['Jótállásnál neked kell mindent bizonyítanod', 'Nincs különbség', 'Jótállásnál a vállalkozásnak kell bizonyítania, hogy a hibát te okoztad', 'Kellékszavatosság csak 3 napig él'], answer: 2, explain: 'A jótállás alatt a vállalkozást terheli a bizonyítás; kellékszavatosságnál az első 1 év után a fogyasztót.' },
        { q: 'Hol érvényesítheted a jótállást?', options: ['A NAV-nál', 'Az eladónál (vagy a jótállási jegyen szereplő szervizben)', 'Sehol, ha elveszett a doboz', 'Csak a gyártónál külföldön'], answer: 1, explain: 'Az eladó nem küldhet el azzal, hogy „forduljon a gyártóhoz”.' },
        { q: 'Mi a békéltető testület?', options: ['A kamarák mellett működő, ingyenes vitarendező testület fogyasztói ügyekben', 'Egy biztosító', 'Egy bíróság, ahol ügyvéd kötelező', 'A rendőrség egyik osztálya'], answer: 0, explain: 'Gyors és ingyenes alternatíva a bíróság helyett.' },
        { q: 'Mi a hamis webshop egyik jellemző jele?', options: ['Szerepel az adószám és a cím', 'Csak előre utalással lehet fizetni, és nincs cégadat', 'Normál árak', 'Van utánvétes fizetés'], answer: 1, explain: 'A hiányzó cégadat és a kizárólagos előre utalás tipikus figyelmeztető jel.' }
      ]
    }
  ]
});
