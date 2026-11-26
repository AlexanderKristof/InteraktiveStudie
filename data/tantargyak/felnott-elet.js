/* Tantárgy: Hivatalos ügyek és a munka világa (Felnőtt élet – amit az iskola nem tanít)
 * A számok és határidők a 2026-os szabályokat tükrözik; a szabályok évente változhatnak. */
STUDIE.addSubject({
  id: 'felnott-elet',
  stage: 'elet',
  title: 'Hivatalos ügyek és a munka világa',
  icon: '📋',
  color: '#3d6fb0',
  description: 'Okmányok, online ügyintézés, orvos és ügyelet, álláskeresés, munkaszerződés, vállalkozásindítás, szerződések és jogosítvány – lépésről lépésre.',
  intro: 'Tizennyolc évesen hirtelen rengeteg dolgot neked kell elintézned: lejár a személyid, orvost kell választanod, munkát keresel, aláírsz egy szerződést, vagy vállalkozást indítanál. Ebben a tantárgyban **gyakorlati, lépésről lépésre haladó** útmutatót kapsz ezekhez.\n\nA pénzügyi alapokat (költségvetés, bank, hitel, bér és adó) a **Pénzügyi ismeretek** tantárgy tanítja, az ÁFÁ-t, az adóbevallást és a bérpapírt pedig a **Pénz a mindennapokban** – itt a hivatalos ügyeken és a munka világán van a hangsúly.\n\nFontos: a számok, határidők és díjak a **2026-os szabályok** szerint szerepelnek, de ezek évente változhatnak. Döntés előtt mindig nézd meg a hivatalos forrást (**magyarorszag.hu**, **kormanyhivatalok.hu**, **nav.gov.hu**, **njt.jog.gov.hu**). Ez a tananyag a működést tanítja, **nem személyre szabott jogi vagy adótanácsadás**.',
  lessons: [
    /* ───────────────────────── 1. OKMÁNYOK ───────────────────────── */
    {
      id: 'okmanyok',
      title: 'Okmányok: személyi, lakcímkártya, útlevél, TAJ, adószám',
      level: 1, minutes: 14,
      summary: 'Milyen igazolványaid vannak, mire valók, mikor kapod őket, meddig érvényesek, és mit tegyél, ha elveszted valamelyiket.',
      tags: ['okmány', 'személyi igazolvány', 'eSzemélyi', 'lakcímkártya', 'útlevél', 'TAJ', 'TAJ-kártya', 'adóazonosító jel', 'adóigazolvány', 'kormányablak', 'elveszett okmány', 'időpontfoglalás'],
      sections: [
        {
          title: 'Az alap-okmányok és mire valók',
          text: 'Felnőttként öt „számod” és kártyád lesz, amit folyton kérnek tőled:\n\n- **Személyazonosító igazolvány (személyi)**: igazolja, ki vagy. Ma már kártya formátumú **eSzemélyi**, amelyben chip van. Az EU-n belül (és néhány más országban) útlevél helyett is elég utazáshoz.\n- **Lakcímet igazoló hatósági igazolvány (lakcímkártya)**: azt igazolja, hol laksz. A hátoldalán található a **személyi azonosító** is, amit ritkán kérnek, és amelyet ne add meg feleslegesen.\n- **Útlevél**: nemzetközi úti okmány, EU-n kívüli utazáshoz (pl. USA, Egyesült Királyság, Törökország) szükséges.\n- **TAJ-szám (társadalombiztosítási azonosító jel)**: 9 számjegy, az egészségügyben azonosít. Ezt kéri az orvos, a patika, a kórház.\n- **Adóazonosító jel**: 10 számjegy (8-assal kezdődik), a NAV ezzel azonosít. Ezt kéri a munkáltató, a bank, az egyetem, és ez kell az adóbevalláshoz.',
          tip: 'Fotózd le (vagy írd fel egy biztonságos helyre) az okmányaid számát és lejárati dátumát. Ha elveszítesz egyet, sokkal gyorsabb a pótlás.'
        },
        {
          title: 'Mikor kapod meg őket?',
          text: '- **TAJ-szám**: már születéskor kiadják, a TAJ-kártyát a szüleid kapták meg. A TAJ-szám egész életedben ugyanaz marad.\n- **Adóazonosító jel**: ma már a születés után automatikusan kiadja a NAV, és megküldi az **adóigazolványt**. Ha nincs meg, a NAV-nál (online is) kérhetsz újat.\n- **Lakcímkártya**: a lakcím bejelentésekor kapod, és **költözéskor** újat kell kérni (a lakcímváltozást be kell jelenteni).\n- **Személyi igazolvány**: gyerekkorban is kiváltható, de 14 éves kortól már a legtöbb helyen ez kell az azonosításhoz (pl. diákigazolvány-igényléskor, vizsgán, bankban).\n- **Útlevél**: csak akkor, ha szükséged van rá – kérni kell, és díja van.',
          tip: 'A lakcímváltozást költözés után **3 munkanapon belül** kell bejelenteni. Ez online, Ügyfélkapu+ vagy DÁP azonosítással is intézhető.'
        },
        {
          title: 'Meddig érvényesek?',
          text: 'A lejárat az okmányon szerepel. Az alapelvek (2026):\n\n- **Személyi igazolvány**: a kiskorúaké rövidebb ideig érvényes (12 éves kor alatt jellemzően 3 év), a nagykorúaké általában **6 év**. Az eSzemélyi a születésnapodon jár le. Idősebb korban hosszabb érvényesség is kérhető.\n- **Útlevél**: kiskorúaknál rövidebb, felnőtteknél jellemzően **5 vagy 10 év** (választható, a hosszabb drágább).\n- **Lakcímkártya, TAJ-kártya, adóigazolvány**: nincs lejárati idejük, amíg az adat (pl. lakcím, név) nem változik.\n\nFontos változás: a **régi, papír („könyv”) formátumú személyi igazolványok 2026. augusztus 3-án véglegesen érvényüket vesztették** (EU-s biztonsági szabály miatt).',
          warn: 'Lejárt okmánnyal nem tudsz azonosítani: nem nyithatsz bankszámlát, nem vehetsz fel ajánlott levelet, és a határon sem engednek át. Utazás előtt mindig nézd meg a lejáratot!'
        },
        {
          title: 'Hol intézed? – Kormányablak lépésről lépésre',
          text: 'A legtöbb okmányügyet a **kormányablakban** (a kormányhivatalok ügyfélszolgálata) intézed, az ország bármelyik kormányablakában, lakóhelytől függetlenül.\n\n1. **Foglalj időpontot** online (az időpontfoglaló rendszerben) – így nem kell sorban állnod.\n2. **Vidd magaddal**: a régi okmányt (ha van), lakcímkártyát, kiskorúként szülőt is.\n3. A helyszínen **fényképet és ujjlenyomatot** készítenek, és aláírást rögzítenek – saját fotó nem kell.\n4. **Fizesd ki a díjat**, ha van (pl. útlevél, vagy ha elvesztett okmányt pótolsz). Az első személyi és sok csere díjmentes.\n5. Az okmányt **postán** küldik, vagy a kormányablakban veheted át.\n\nTelefonos segítség: a **Kormányzati Ügyfélvonal: 1818**.',
          tip: 'Sok ügyet (pl. lakcímváltozás, jogosítvány-csere egyes esetekben, okmány elvesztésének bejelentése) online is el lehet indítani a magyarorszag.hu oldalon.'
        },
        {
          title: 'Ha elveszted vagy ellopják',
          text: '1. **Jelentsd be azonnal** az elvesztést vagy lopást: kormányablakban, a rendőrségen (lopásnál ez a jó hely), vagy online. Így az okmányt **érvénytelenítik**, és más nem élhet vissza vele.\n2. Ha a bankkártyád is eltűnt, **tiltsd le** a bank appjában vagy telefonon.\n3. Az elveszett személyi helyett **ideiglenes igazolványt** kaphatsz a kormányablakban, amíg az új el nem készül.\n4. Kérd az **új okmányt** – pótlásnál általában díjat kell fizetni.\n5. Ha később előkerül a régi: már **érvénytelen**, le kell adni.',
          warn: 'Az ellopott személyivel csalók a nevedben köthetnek szerződést, vehetnek fel hitelt. Ezért a bejelentést ne halogasd – az érvénytelenítés megvéd.'
        },
        {
          title: 'Adatvédelem: kinek mit adj meg?',
          text: '- A **személyi igazolványt** sokan „lefénymásolnák”. Bankok, mobilszolgáltatók jogszabály alapján azonosíthatnak és rögzíthetnek adatot, de egy edzőterem, lakásbérlő vagy webshop nem feltétlenül. Kérdezd meg: **miért kell, és mit tárolnak?**\n- A **személyi azonosítót** (lakcímkártya hátulja) szinte senkinek nem kell megadni.\n- **Fotót az okmányodról** ne küldj ismeretlennek, csetben vagy közösségi oldalon – ez a személyazonosság-lopás egyik fő forrása.',
          tip: 'Ha valaki fotót kér, takard le azokat az adatokat, amelyekre nincs szüksége (pl. okmányszám), és írd rá vízjelként, mire adtad („Csak lakásbérléshez, 2026”).'
        }
      ],
      quiz: [
        { q: 'Melyik azonosítót kéri tőled elsősorban az orvos és a patika?', options: ['Adóazonosító jel', 'Útlevélszám', 'TAJ-szám', 'Lakcímkártya száma'], answer: 2, explain: 'A TAJ (társadalombiztosítási azonosító jel) azonosít az egészségügyi ellátásban.' },
        { q: 'Hány számjegyű az adóazonosító jel?', options: ['10', '9', '8', '11'], answer: 0, explain: 'Az adóazonosító jel 10 számjegyű, és 8-assal kezdődik. A TAJ 9 számjegyű.' },
        { q: 'Hol intézheted a személyi igazolvány cseréjét?', options: ['Csak a lakóhelyed szerinti polgármesteri hivatalban', 'A NAV-nál', 'A postán', 'Bármelyik kormányablakban, előre foglalt időponttal is'], answer: 3, explain: 'Az okmányügyek bármelyik kormányablakban intézhetők, lakóhelytől függetlenül.' },
        { q: 'Mi az első teendő, ha ellopják a személyidet?', options: ['Megvárni, hátha előkerül', 'Bejelenteni a lopást (rendőrség/kormányablak), hogy érvénytelenítsék', 'Új lakcímkártyát kérni', 'Szólni a háziorvosnak'], answer: 1, explain: 'A bejelentéssel érvénytelenítik az okmányt, így más nem élhet vissza vele.' },
        { q: 'Mikor kell új lakcímkártyát kérni?', options: ['Ötévente', 'Minden születésnapon', 'Soha', 'Költözéskor, amikor a lakcím megváltozik'], answer: 3, explain: 'A lakcímkártyának nincs lejárata, de lakcímváltozáskor újat adnak ki.' },
        { q: 'Mi történt 2026. augusztus 3-án?', options: ['Megszűnt a TAJ-kártya', 'Bevezették az útlevél nélküli utazást az USA-ba', 'A régi, papír alapú (könyv formátumú) személyi igazolványok véglegesen érvényüket vesztették', 'Megszűnt a lakcímkártya'], answer: 2, explain: 'EU-s biztonsági szabály miatt a régi papír alapú személyik 2026. augusztus 3-án lejártak.' },
        { q: 'Melyik adatot szinte senkinek nem kell megadnod?', options: ['A személyi azonosítót (lakcímkártya hátoldala)', 'A nevedet', 'A TAJ-számot az orvosnak', 'Az adóazonosító jelet a munkáltatónak'], answer: 0, explain: 'A személyi azonosítót csak nagyon kevés szerv kezelheti; a hétköznapokban nem kell megadni.' },
        { q: 'Melyik telefonszámon érhető el a Kormányzati Ügyfélvonal?', options: ['112', '1818', '1830', '104'], answer: 1, explain: 'A 1818 a kormányzati ügyfélvonal. A 112 az egységes segélyhívó, a 1830 az orvosi ügyelet, a 104 a mentők.' }
      ]
    },

    /* ───────────────────────── 2. ONLINE ÜGYINTÉZÉS ───────────────────────── */
    {
      id: 'ugyintezes-online',
      title: 'Online ügyintézés: Ügyfélkapu+, DÁP, magyarorszag.hu',
      level: 1, minutes: 13,
      summary: 'Hogyan azonosítod magad online a hatóságoknál, mit intézhetsz otthonról (NAV, egészségügy, okmányok), és hogyan védd a fiókodat.',
      tags: ['Ügyfélkapu+', 'DÁP', 'Digitális Állampolgárság', 'magyarorszag.hu', 'KAÜ', 'kétfaktoros azonosítás', 'e-Papír', 'tárhely', 'NAV', 'eSZJA', 'ONYA', 'EESZT', 'e-ügyintézés'],
      sections: [
        {
          title: 'Miért kell digitális azonosítás?',
          text: 'Online a hatóság nem látja az arcodat, ezért biztosan tudnia kell, hogy **tényleg te** jelentkezel be. Erre szolgál a **Központi Azonosítási Ügynök (KAÜ)**: egyetlen bejelentkezéssel érheted el a magyarorszag.hu-t, a NAV-ot (eSZJA, ONYA), az EESZT-t (egészségügy), a felvi.hu-t és sok más szolgáltatást.\n\n2026-ban két fő azonosítási mód van:\n\n- **Ügyfélkapu+**: felhasználónév + jelszó + **második faktor** (egy hitelesítő alkalmazás, pl. Google vagy Microsoft Authenticator által generált egyszer használatos kód).\n- **DÁP – Digitális Állampolgárság mobilalkalmazás**: a telefonodon lévő hivatalos app, amellyel QR-kód beolvasásával vagy értesítéssel lépsz be.',
          tip: 'A **régi, csak jelszavas Ügyfélkapu 2025. január 16-án megszűnt**, mert nem felelt meg az EU biztonsági előírásainak. Ha valaki ezt ajánlja, elavult információ.'
        },
        {
          title: 'Regisztráció lépésről lépésre',
          text: '**Ügyfélkapu+:**\n\n1. Ha még nincs fiókod: regisztrálj kormányablakban személyesen, vagy online (pl. eSzemélyivel és kártyaolvasóval / DÁP-pal).\n2. Telepíts egy **hitelesítő (authenticator) appot** a telefonodra.\n3. Az ugyfelkapu.gov.hu oldalon kapcsold be a kétfaktoros azonosítást: olvasd be a QR-kódot az appal.\n4. **Mentsd el a visszaállító (törlő) kódot** biztonságos helyre – ha elveszik a telefonod, ezzel tudod visszaállítani.\n\n**DÁP:**\n\n1. Töltsd le a hivatalos **Digitális Állampolgárság** alkalmazást (csak a hivatalos áruházból!).\n2. Azonosítsd magad (pl. eSzemélyi + PIN, arcképes ellenőrzés, vagy kormányablakban).\n3. Állíts be erős PIN-kódot / biometrikus zárat.',
          warn: 'Ügyfélkapu+ második faktorát senki más nem kapcsolhatja be helyetted – a kormányablakos ügyintéző sem. Soha ne add meg senkinek a jelszavadat vagy az app által generált kódot!'
        },
        {
          title: 'Mit intézhetsz online?',
          text: '- **magyarorszag.hu**: a központi portál – lakcímváltozás, okmányok (pl. elvesztés bejelentése), erkölcsi bizonyítvány, igazolások, időpontfoglalás, ügyleírások.\n- **NAV**: az **eSZJA** oldalon megnézheted és elfogadhatod az automatikus **adóbevallási tervezetet** (határidő minden évben **május 20.**), az **ONYA** (Online Nyomtatványkitöltő) segítségével nyomtatványokat tölthetsz ki. A részleteket a Pénz a mindennapokban tantárgy SZJA-leckéje tárgyalja.\n- **EESZT lakossági portál**: e-receptjeid, leleteid, beutalóid; itt adhatsz hozzáférést orvosnak vagy tilthatod le adataidat.\n- **e-Papír**: egyszerű, hitelesített elektronikus levél bármely hivatalnak, ha az ügyedre nincs külön űrlap.\n- **Értesítési tárhely**: ide érkeznek a hivatalos elektronikus levelek (pl. határozatok).\n- **Felvételi (felvi.hu)**, diákigazolvány-igénylés, gépjármű-ügyek is ezzel a belépéssel mennek.',
          tip: 'Ha nem tudod, hol intézhető valami: írd be a magyarorszag.hu keresőjébe az ügy nevét, ott ügyleírást (díj, határidő, szükséges iratok) is találsz.'
        },
        {
          title: 'A hivatalos levelek és határidők',
          text: 'Ha elektronikus ügyintézést választasz, a hatóság a **tárhelyedre** küldi a leveleket. Ezek **kézbesítettnek számítanak** akkor is, ha nem nyitod meg (bizonyos idő elteltével beáll a kézbesítési vélelem).\n\nEz azt jelenti, hogy egy határozat elleni fellebbezési határidő úgy is elindulhat, hogy te nem olvastad a levelet. Ezért:\n\n1. Kapcsold be az **e-mail-értesítést** a tárhelyhez.\n2. Rendszeresen (legalább hetente) nézz bele.\n3. A fontos határozatokat töltsd le és mentsd el.',
          warn: 'A meg nem nyitott elektronikus hivatalos levél nem mentség: a határidők a kézbesítési vélelemmel is elindulnak.'
        },
        {
          title: 'Biztonság: csalók hivatalos köntösben',
          text: 'A csalók gyakran a **NAV, a kormányhivatal vagy a posta** nevében küldenek SMS-t vagy e-mailt („Adó-visszatérítés jár, kattints ide!”, „Tartozásod van, fizess most!”).\n\n- A hatóság **nem kér** jelszót, kártyaadatot vagy hitelesítő kódot SMS-ben, e-mailben.\n- Ne kattints linkre: a hivatalos oldalt **magad írd be** (nav.gov.hu, magyarorszag.hu, ugyfelkapu.gov.hu).\n- Ellenőrizd a címet: a hivatalos oldalak **.gov.hu** végűek, és nem fura, hosszú domainen vannak.\n- Ha bizonytalan vagy, hívd a **1818**-at vagy a NAV ügyfélszolgálatát.',
          tip: 'Az adó-visszatérítést a NAV a bevallásod alapján magától utalja – soha nem kell érte linkre kattintani és kártyaadatot megadni.'
        }
      ],
      quiz: [
        { q: 'Mikor szűnt meg a régi, csak jelszavas Ügyfélkapu?', options: ['2022. szeptember 1.', '2026. augusztus 3.', '2025. január 16.', 'Még ma is működik'], answer: 2, explain: 'A régi Ügyfélkapu 2025. január 16-án megszűnt; helyette Ügyfélkapu+ vagy DÁP kell.' },
        { q: 'Mi az Ügyfélkapu+ második faktora?', options: ['Egy hitelesítő (authenticator) app által generált, rövid ideig érvényes kód', 'Egy második jelszó', 'A TAJ-szám', 'Az anyja neve'], answer: 0, explain: 'A kétfaktoros azonosításhoz a jelszó mellé egy authenticator app egyszer használatos kódja kell.' },
        { q: 'Mi a DÁP?', options: ['Diák Áfa Program', 'Egy bankkártyatípus', 'Az adóbevallás nyomtatványa', 'A Digitális Állampolgárság hivatalos mobilalkalmazása azonosításhoz és ügyintézéshez'], answer: 3, explain: 'A DÁP a Digitális Állampolgárság Program mobilappja.' },
        { q: 'Meddig lehet elfogadni vagy módosítani az SZJA-bevallási tervezetet (2026-os szabály)?', options: ['Március 15.', 'Május 20.', 'December 31.', 'Január 31.'], answer: 1, explain: 'Az SZJA-bevallás határideje minden évben május 20.; ha nem teszel semmit, a tervezet bevallássá válik (egyéni vállalkozóknál más a szabály).' },
        { q: 'Melyik e-ügyintézési szolgáltatással küldhetsz egyszerű elektronikus levelet egy hivatalnak, ha nincs külön űrlap?', options: ['EESZT', 'ONYA', 'KAÜ', 'e-Papír'], answer: 3, explain: 'Az e-Papír általános, hitelesített elektronikus beadványküldő szolgáltatás.' },
        { q: 'SMS-t kapsz: „NAV adó-visszatérítés jár, add meg a kártyaadataidat a linken!” Mit teszel?', options: ['Kitöltöm, hiszen pénzt kapok', 'Továbbküldöm a barátaimnak', 'Nem kattintok: ez csalás, a NAV nem így utal vissza', 'Megadom, de csak a kártyaszámot'], answer: 2, explain: 'A NAV a visszatérítést magától utalja, és soha nem kér kártyaadatot linken keresztül.' },
        { q: 'Mi történik, ha egy hivatalos elektronikus levelet nem nyitsz meg a tárhelyeden?', options: ['Egy idő után kézbesítettnek tekintik, és a határidők elindulhatnak', 'Semmi, amíg el nem olvasod', 'Automatikusan postán is elküldik', 'A levél törlődik és érvénytelen'], answer: 0, explain: 'Beáll a kézbesítési vélelem, ezért érdemes értesítést kérni és rendszeresen ellenőrizni.' },
        { q: 'Hol láthatod az e-receptjeidet és a leleteidet?', options: ['A NAV eSZJA oldalán', 'Az EESZT lakossági portálján', 'A felvi.hu-n', 'Az e-Papíron'], answer: 1, explain: 'Az Elektronikus Egészségügyi Szolgáltatási Tér (EESZT) tárolja az egészségügyi adatokat.' }
      ]
    },

    /* ───────────────────────── 3. EGÉSZSÉGÜGY ───────────────────────── */
    {
      id: 'egeszsegugy',
      title: 'Egészségügyi ügyintézés: háziorvos, ügyelet, e-recept',
      level: 1, minutes: 13,
      summary: 'Hogyan választasz háziorvost, mikor hívd a 1830-at és mikor a 112-t, hogyan működik a beutaló és az e-recept, és mi kell külföldön.',
      tags: ['háziorvos', 'TAJ', 'egészségügyi szolgáltatási jogviszony', 'EESZT', 'e-recept', 'beutaló', 'szakrendelés', 'ügyelet', '1830', '112', 'mentő', 'EU-kártya', 'EEK', 'NEAK'],
      sections: [
        {
          title: 'A háziorvos: az első lépcső',
          text: 'A magyar egészségügy „kapuja” a **háziorvos**. Ő kezeli a hétköznapi betegségeket, ír receptet, és ha kell, **beutal** szakorvoshoz.\n\n- Gyerekként a **házi gyermekorvos** lát el; **14 és 18 éves kor között** már választhatsz felnőtt háziorvost is, 18 évesen pedig mindenképp át kell jelentkezned.\n- A háziorvost **szabadon választhatod** (főleg a lakóhelyed körzetéből; a körzeten kívüli orvos elutasíthat, ha túl sok a betege).\n- Választás: menj be a rendelőbe a TAJ-kártyáddal és személyiddel, és töltsd ki a **bejelentkezési nyilatkozatot**. Évente egyszer válthatsz (indokolt esetben gyakrabban).',
          tip: 'Ha egyetemre másik városba költözöl, érdemes ott háziorvost választani – különben minden recepthez haza kell utaznod (vagy telefonos konzultációt kérni).'
        },
        {
          title: 'A TAJ és a jogosultság',
          text: 'Ingyenes (társadalombiztosítás által finanszírozott) ellátás akkor jár, ha **jogosult vagy**: például munkaviszonyban dolgozol, nappali tagozatos tanuló/hallgató vagy, vagy más jogcímen biztosított vagy.\n\n- **Nappali tagozatos diákként** az állam fizeti utánad az egészségügyi szolgáltatási járulékot.\n- Ha **befejezted az iskolát és nem dolgozol** (pl. „gap year”), előfordulhat, hogy neked kell **egészségügyi szolgáltatási járulékot** fizetned, különben tartozás halmozódik fel. Ezt a NAV-nál kell bejelenteni.\n- A jogosultságot az orvos a TAJ alapján online ellenőrzi (zöld/piros lámpa).',
          warn: 'Ha nincs rendezett jogviszonyod, a sürgős ellátást akkor is megkapod, de utólag kiszámlázhatják. Iskola befejezése után nézz utána a NAV oldalán, kell-e fizetned!'
        },
        {
          title: '1830 vagy 112? – Ügyelet és mentő',
          text: '- **112 – egységes segélyhívó**: **életveszély** esetén (eszméletvesztés, súlyos nehézlégzés, erős mellkasi fájdalom, súlyos vérzés, stroke jelei, baleset). Ingyenes, térerő nélkül, SIM-kártya nélkül is hívható.\n- **1830 – központi ügyeleti szám** (országosan, 2024 októbere óta Budapesten is): **nem életveszélyes, de nem várhat reggelig** panaszoknál, amikor a háziorvos nem rendel. Hétköznap kb. 16:00-tól másnap 8:00-ig, hétvégén és ünnepnap egész nap. Egy szakember kikérdez, és eldönti: telefonos tanács, ügyeleti rendelés, kiszálló orvos – vagy ha kell, mentő.\n- **Háziorvos**: minden egyéb, ami várhat a rendelési időig.\n- **Gyógyszertár**: kisebb panaszoknál a gyógyszerész is tud tanácsot adni recept nélküli szerekről.',
          tip: 'A 1830 hívása megspórolhatja a felesleges órákig tartó várakozást a sürgősségi osztályon (SBO), mert a szakember a megfelelő helyre irányít.'
        },
        {
          title: 'Szakorvos, beutaló, e-beutaló',
          text: 'A legtöbb **szakrendelésre** (pl. kardiológia, belgyógyászat, ortopédia) **beutaló** kell, amelyet a háziorvos ad ki elektronikusan (**e-beutaló**). Néhány szakterületre beutaló nélkül is mehetsz – jellemzően ilyen a bőrgyógyászat, nőgyógyászat, szemészet, fül-orr-gégészet, urológia, sebészet/baleseti sebészet, pszichiátria (a pontos listát a NEAK oldalán ellenőrizd).\n\nLépések:\n\n1. Háziorvos megvizsgál, beutalót ad.\n2. Időpontot foglalsz (telefonon, online, egyes helyeken az EESZT/kórház rendszerében).\n3. A szakorvos elvégzi a vizsgálatot, a lelet felkerül az **EESZT**-be.\n4. A háziorvos és más orvosok – ha nem tiltottad – látják a leletet.',
          tip: 'A várólisták hosszúak lehetnek. Kérdezd meg, van-e máshol korábbi időpont – nem csak a legközelebbi rendelőbe mehetsz.'
        },
        {
          title: 'Az e-recept és az EESZT',
          text: '**2017 óta** a recepteket elektronikusan írják (**e-recept**), és az **EESZT**-ben tárolják.\n\n- A patikában a **TAJ-kártyáddal és személyiddel** (vagy a DÁP / EgészségAblak alkalmazással) kiválthatod a gyógyszert, papír nélkül.\n- Más is kiválthatja helyetted, ha tudja az adataidat és/vagy a felírási igazolást – de ezt a lakossági portálon szabályozhatod.\n- Az EESZT lakossági portálon (Ügyfélkapu+ vagy DÁP belépéssel) láthatod a **gyógyszereidet, leleteidet, beutalóidat**, és **tilthatod**, hogy bizonyos orvosok lássák az adataidat.',
          tip: 'Az EgészségAblak mobilalkalmazással a telefonodon is nálad lehetnek a recepteid és leleteid.'
        },
        {
          title: 'Külföldön: EU-kártya és utasbiztosítás',
          text: '- Az **Európai Egészségbiztosítási Kártya (EU-kártya, EEK)** ingyenes, és az EU/EGT-országokban, valamint Svájcban a **szükségessé váló** állami ellátást ugyanolyan feltételekkel biztosítja, mint a helyieknek (önrész ott is lehet!). Igényelni kormányablakban vagy online lehet.\n- Az EU-kártya **nem fedezi** a magánorvost, a hazaszállítást, a mentőhelikoptert, és EU-n kívül nem érvényes.\n- Ezért utazáshoz érdemes **utasbiztosítást** is kötni – EU-n kívül (pl. USA, Törökország) ez gyakorlatilag nélkülözhetetlen.',
          warn: 'EU-n kívül egy kórházi kezelés akár milliókba is kerülhet. Utasbiztosítás nélkül ne utazz!'
        }
      ],
      quiz: [
        { q: 'Hajnali kettőkor 39 fokos lázad van, de jól lélegzel, eszméletnél vagy. Kit hívsz?', options: ['112', 'Senkit, megvárom a reggelt mindenképp', '1830', 'A NAV-ot'], answer: 2, explain: 'Nem életveszélyes, de nem feltétlenül várhat: a 1830 központi ügyeleti szám a megfelelő.' },
        { q: 'Mikor kell a 112-t hívni?', options: ['Életveszély esetén, pl. eszméletvesztés, súlyos nehézlégzés, erős mellkasi fájdalom', 'Ha recept kell', 'Ha szakorvosi időpontot szeretnél', 'Ha elveszett a TAJ-kártyád'], answer: 0, explain: 'A 112 az egységes segélyhívó életveszélyes helyzetekre.' },
        { q: 'Hány éves kortól választhatsz felnőtt háziorvost a gyermekorvos helyett?', options: ['10', '12', '21', '14'], answer: 3, explain: '14 és 18 év között választhatsz; 18 évesen át kell jelentkezned felnőtt háziorvoshoz.' },
        { q: 'Mi kell a legtöbb szakrendelésen való ellátáshoz?', options: ['Útlevél', 'Beutaló (e-beutaló) a háziorvostól', 'Adóigazolvány', 'Semmi'], answer: 1, explain: 'A legtöbb szakrendelésre beutaló kell; néhány szakterület kivétel.' },
        { q: 'Mit nem fedez az EU-kártya?', options: ['A szükségessé váló állami ellátást Franciaországban', 'Az állami kórházi ellátást Ausztriában', 'A szükséges orvosi ellátást Spanyolországban', 'A betegség miatti hazaszállítást'], answer: 3, explain: 'A hazaszállítást és a magánellátást az EU-kártya nem fedezi – erre kell az utasbiztosítás.' },
        { q: 'Hol tárolják az e-recepteket és a leleteket?', options: ['A TAJ-kártya chipjén', 'A háziorvos fiókjában papíron', 'Az EESZT-ben', 'A NAV-nál'], answer: 2, explain: 'Az Elektronikus Egészségügyi Szolgáltatási Tér (EESZT) 2017 óta tárolja ezeket.' },
        { q: 'Befejezted a középiskolát, nem tanulsz és nem dolgozol. Mire figyelj?', options: ['Lehet, hogy egészségügyi szolgáltatási járulékot kell fizetned – nézz utána a NAV-nál', 'Semmire, a TAJ örökre ingyenes ellátást ad', 'Vissza kell adnod a TAJ-kártyát', 'Automatikusan elveszik a lakcímkártyát'], answer: 0, explain: 'Jogviszony nélkül fizetési kötelezettség keletkezhet, ezt be kell jelenteni a NAV-nál.' }
      ]
    },

    /* ───────────────────────── 4. ÁLLÁSKERESÉS ───────────────────────── */
    {
      id: 'allaskereses',
      title: 'Álláskeresés: önéletrajz, motivációs levél, interjú',
      level: 1, minutes: 15,
      summary: 'Hol keress munkát, hogyan írj jó önéletrajzot és motivációs levelet, hogyan készülj az interjúra, és mit kérdezz te.',
      tags: ['álláskeresés', 'önéletrajz', 'CV', 'Europass', 'motivációs levél', 'interjú', 'LinkedIn', 'STAR-módszer', 'referencia', 'pályakezdő', 'gyakornok'],
      sections: [
        {
          title: 'Hol keress munkát?',
          text: '- **Állásportálok** (pl. a nagy magyar álláshirdetési oldalak, nemzetközi oldalak) – szűrj helyre, munkaidőre, tapasztalatra.\n- **Cégek saját „Karrier” oldala** – sok állás csak itt jelenik meg.\n- **LinkedIn** – szakmai közösségi oldal; a toborzók itt keresnek jelölteket.\n- **Ismerősök, ajánlás** – sok állás így talál gazdát. Mondd el a környezetednek, mit keresel!\n- **Egyetemi karrierirodák, diákszövetkezetek**, gyakornoki programok.\n- **Kormányhivatal foglalkoztatási osztálya** (munkaügyi központ) – álláskeresőként regisztrálhatsz, képzéseket és támogatásokat is kínálnak.',
          tip: 'A hirdetésben a „követelmények” egy része gyakran csak „előny”. Ha a 70%-nak megfelelsz, nyugodtan jelentkezz!'
        },
        {
          title: 'Az önéletrajz (CV)',
          text: 'Az önéletrajz célja: **behívjanak interjúra**. A toborzó átlagosan csak fél percet tölt egy CV-vel, ezért legyen áttekinthető.\n\n1. **Elérhetőség**: név, telefonszám, normális e-mail-cím (nem „cicamica2008@…”), város. Lakcím, anyja neve, személyi szám **nem kell**.\n2. **Rövid bemutatkozás** (2–3 mondat): ki vagy, mit tudsz, mit keresel.\n3. **Tapasztalat** fordított időrendben: munkahely, időszak, **mit értél el** (számokkal, ha lehet: „heti 200 vendéget szolgáltam ki”).\n4. **Tanulmányok**: iskola, szak, várható végzés.\n5. **Készségek**: nyelvek (szinttel, pl. B2), szoftverek, jogosítvány.\n6. **Egyéb**: önkéntesség, verseny, hobbi, ha releváns.\n\nTerjedelem: pályakezdőként **1 oldal**. Formátum: **PDF**. A **Europass** önéletrajz-szerkesztő ingyenes, és az EU-ban mindenhol ismert sablon.',
          tip: 'Minden álláshoz igazítsd egy kicsit a CV-t: emeld ki azokat a tapasztalatokat, amelyek az adott hirdetéshez illenek. A cégek gyakran szoftverrel szűrnek kulcsszavakra.',
          warn: 'Ne hazudj a CV-ben (pl. nyelvtudás)! Az interjún vagy a próbaidőn kiderül, és rontja a hírneved.'
        },
        {
          title: 'A motivációs levél',
          text: 'A motivációs (kísérő) levél azt mondja el, **miért pont te és miért pont ők**. Felépítése (kb. fél–egy oldal):\n\n1. **Megszólítás** – ha tudod, névre szólóan („Tisztelt Kovács Anna!”).\n2. **Nyitás**: melyik állásra jelentkezel, és egy mondat, ami felkelti a figyelmet.\n3. **Miért vagy jó erre**: 2–3 konkrét példa a tapasztalatodból, amely a hirdetés követelményeihez kapcsolódik.\n4. **Miért ez a cég**: mutasd meg, hogy utánanéztél (termékük, értékeik).\n5. **Zárás**: szívesen bemutatkoznál személyesen, köszönet, elérhetőség.\n\nKerüld a sablonszöveget („csapatjátékos, precíz, stressztűrő vagyok”) bizonyíték nélkül!',
          tip: 'Olvastasd át valakivel: egy helyesírási hiba sokat ronthat az első benyomáson.'
        },
        {
          title: 'Felkészülés az interjúra',
          text: '1. **Kutass**: mit csinál a cég, kik a vevői, milyen hírek vannak róla.\n2. **Olvasd újra a hirdetést**, és gondold végig, mely tapasztalatod illik az egyes követelményekhez.\n3. **Gyakorold a gyakori kérdéseket** hangosan:\n   - „Meséljen magáról!” (1–2 perc: tanulmány, tapasztalat, miért ez az állás)\n   - „Miért szeretne nálunk dolgozni?”\n   - „Mik az erősségei és a fejlesztendő területei?”\n   - „Meséljen egy helyzetről, amikor konfliktust oldott meg / hibázott!”\n   - „Milyen fizetést vár?” – nézz utána előre a piaci béreknek, és adj egy sávot.\n4. A helyzetes kérdésekre használd a **STAR-módszert**: **S**ituation (helyzet), **T**ask (feladat), **A**ction (mit tettél), **R**esult (eredmény).\n5. **Gyakorlati dolgok**: útvonal, 10 perccel korábban érkezz, illő öltözet, online interjúnál próbáld ki a kamerát és a hangot, nyugodt háttér.',
          tip: 'A hibáról szóló kérdésnél nem az a lényeg, hogy sosem hibázol, hanem hogy **tanultál belőle**.'
        },
        {
          title: 'Mit kérdezz te?',
          text: 'Az interjú kétirányú: te is eldöntöd, akarsz-e ott dolgozni. Jó kérdések:\n\n- „Hogyan néz ki egy átlagos nap ebben a munkakörben?”\n- „Milyen betanítás vagy mentorálás van az elején?”\n- „Mi alapján mondják majd fél év múlva, hogy jól teljesítek?”\n- „Milyen a csapat, kivel dolgoznék együtt?”\n- „Mik a következő lépések a kiválasztásban?”\n\nA **bér, munkaidő, juttatások** (cafeteria, home office, utazási támogatás) is legitim kérdések – legkésőbb az ajánlatnál tisztázd őket, **írásban**.',
          tip: 'Az interjú után érdemes egy rövid köszönő e-mailt küldeni – kevesen teszik, ezért kiemel.'
        },
        {
          title: 'LinkedIn és digitális lábnyom',
          text: '- Készíts **LinkedIn-profilt**: jó minőségű, barátságos profilkép, rövid szakmai címsor („Közgazdász hallgató | Excel, angol B2”), tapasztalatok, készségek.\n- Kösd össze magad tanáraiddal, csoporttársaiddal, gyakornoki kollégáiddal.\n- Számolj vele, hogy a munkáltató **rákereshet a nevedre**. Nézd át a nyilvános közösségi profiljaidat, és állítsd be az adatvédelmet.',
          warn: 'Óvakodj az „álláshirdetésnek” álcázott csalásoktól: ha előre pénzt kérnek (regisztrációs díj, „képzés”), vagy a bankszámládat akarják „csak átutalásra” használni, az csalás vagy pénzmosás lehet!'
        }
      ],
      quiz: [
        { q: 'Mennyi legyen egy pályakezdő önéletrajza?', options: ['Legalább 5 oldal', 'Kb. 1 oldal', 'Egy mondat', 'Minél hosszabb, annál jobb'], answer: 1, explain: 'Pályakezdőként egy jól szerkesztett, áttekinthető oldal a legjobb.' },
        { q: 'Mit NE írj bele az önéletrajzba?', options: ['Telefonszám', 'Nyelvtudás szinttel', 'Személyi szám, anyja neve, teljes lakcím', 'Tanulmányok'], answer: 2, explain: 'Ezek az adatok feleslegesek, és adatvédelmi szempontból kockázatosak.' },
        { q: 'Mit jelent a STAR-módszerben az „A”?', options: ['Action – mit tettél', 'Ambition – ambíció', 'Answer – válasz', 'Attitude – hozzáállás'], answer: 0, explain: 'Situation, Task, Action, Result – helyzet, feladat, cselekvés, eredmény.' },
        { q: 'Mi a motivációs levél fő célja?', options: ['Megismételni a CV-t', 'Fizetést követelni', 'Leírni a teljes életutadat', 'Megmutatni, miért pont te illesz az álláshoz és miért pont ehhez a céghez'], answer: 3, explain: 'A levél személyes, konkrét példákkal köti össze a tapasztalatod és a cég igényeit.' },
        { q: 'Melyik a legjobb válasz arra, hogy „Milyen fizetést vár?”', options: ['„Mindegy, bármennyi jó.”', 'Előre utánanézni a piaci béreknek, és egy reális sávot mondani', '„A lehető legtöbbet.”', 'Nem válaszolni'], answer: 1, explain: 'Felkészültséget mutat, ha piaci adatok alapján egy sávot mondasz.' },
        { q: 'Egy „állás” azt kéri, hogy a bankszámládra érkező pénzt utald tovább, jutalékért. Mi ez?', options: ['Normális adminisztratív munka', 'Diákmunka', 'Gyakornoki program', 'Valószínűleg pénzmosás – bűncselekményben vehetsz részt'], answer: 3, explain: 'Ez tipikus „pénzöszvér” csalás: a csalók a te számládon mossák tisztára a pénzt.' },
        { q: 'Melyik ingyenes, EU-szerte ismert önéletrajz-sablon?', options: ['ONYA', 'EESZT', 'Europass', 'KATA'], answer: 2, explain: 'Az Europass az EU ingyenes CV-szerkesztője.' },
        { q: 'Melyik jó kérdés az interjú végén?', options: ['„Milyen betanítás van az elején, és mi alapján mérik majd a teljesítményt?”', '„Mikor mehetek szabadságra először?”', '„Muszáj dolgozni?”', 'Nincs kérdésem, sosem kérdezek'], answer: 0, explain: 'Ez érdeklődést és elköteleződést mutat, és neked is hasznos információ.' }
      ]
    },

    /* ───────────────────────── 5. MUNKASZERZŐDÉS ───────────────────────── */
    {
      id: 'munkaszerzodes',
      title: 'Munkaszerződés és munkajog alapjai',
      level: 2, minutes: 18,
      summary: 'A Munka törvénykönyve (2012. évi I. törvény) legfontosabb szabályai: szerződés, próbaidő, munkaidő, szabadság, betegség, felmondás, végkielégítés, fiatalok védelme.',
      tags: ['Munka törvénykönyve', 'Mt.', 'munkaszerződés', 'próbaidő', 'munkaidő', 'túlóra', 'rendkívüli munkaidő', 'szabadság', 'pótszabadság', 'betegszabadság', 'felmondás', 'felmondási idő', 'végkielégítés', 'fiatal munkavállaló', 'minimálbér', 'garantált bérminimum'],
      sections: [
        {
          title: 'A munkaszerződés',
          text: 'A munkaviszonyt a **Munka törvénykönyve** (**Mt., 2012. évi I. törvény**) szabályozza. A munkaszerződést **írásba kell foglalni** – szóbeli megállapodás alapján „feketén” dolgozni nem éri meg: nincs biztosításod, nem gyűlik a nyugdíjad, és nehéz bizonyítani a jussodat.\n\nA munkaszerződés **kötelező tartalma**:\n\n- a **munkakör** (mit fogsz csinálni),\n- az **alapbér** (bruttó összeg).\n\nEzen felül a munkáltatónak **legkésőbb a munkába lépéstől számított 7 napon belül** (2023 óta) írásban tájékoztatnia kell a fontos feltételekről: munkahely, napi munkaidő és beosztás, bér egyéb elemei és a bérfizetés napja, szabadság számítása, felmondási idő szabályai, ki gyakorolja a munkáltatói jogokat, milyen képzést biztosít.\n\nA szerződésben **határozatlan** vagy **határozott** idő (legfeljebb 5 év), **teljes** vagy **részmunkaidő** szerepelhet.',
          tip: 'Aláírás előtt mindig olvasd végig! Kérdezd meg: ez bruttó vagy nettó bér? Hol a munkavégzés helye? Van-e versenytilalmi vagy titoktartási kikötés?'
        },
        {
          title: 'Bér: minimálbér és garantált bérminimum (2026)',
          text: 'A bér nem lehet kevesebb a jogszabályi minimumnál. **2026. január 1-jétől** (426/2025. Korm. rendelet):\n\n- **Minimálbér**: bruttó **322 800 Ft/hó** teljes munkaidőben (11%-os emelés).\n- **Garantált bérminimum** (legalább középfokú végzettséget vagy szakképzettséget igénylő munkakörben): bruttó **373 200 Ft/hó** (7%-os emelés).\n\nRészmunkaidőben ezek arányos része jár. A bruttó bérből levonják az SZJA-t (15%) és a TB-járulékot (18,5%) – a 25 év alattiak SZJA-kedvezményével a nettó magasabb lehet. A bérpapír részletei a Pénz a mindennapokban tantárgyban, a bruttó–nettó alapok a Pénzügyi ismeretek tantárgy „Munka, bér és adó” leckéjében.',
          tip: 'A minimálbér évente változik – mindig a tárgyévi kormányrendeletet nézd meg (njt.jog.gov.hu).'
        },
        {
          title: 'Próbaidő, munkaidő, túlóra',
          text: '- **Próbaidő**: legfeljebb **3 hónap** (kollektív szerződés legfeljebb 6 hónapot engedhet). Ezalatt **bármelyik fél azonnali hatállyal, indoklás nélkül** megszüntetheti a munkaviszonyt.\n- **Munkaidő**: teljes munkaidő általában napi **8 óra**, heti 40 óra. Beosztás szerint a napi munkaidő felnőttnél legfeljebb 12 óra lehet.\n- **Pihenőidő**: két munkanap között legalább 11 óra pihenő; 6 óra munka után legalább 20 perc szünet.\n- **Rendkívüli munkaidő (túlóra)**: a munkáltató elrendelheti, de évente korlátozott mennyiségben (alapesetben 250 óra, megállapodással vagy kollektív szerződéssel több). Érte **bérpótlék** (alapesetben 50%) vagy szabadidő jár, hétvégén, ünnepnapon magasabb pótlék.',
          warn: 'Ha a próbaidő után is „szóban megbeszéljük” a túlórát, de nem fizetik, gyűjts bizonyítékot (beosztás, e-mail, jelenléti ív)!'
        },
        {
          title: 'Szabadság és betegszabadság',
          text: '**Szabadság** (naptári évente, munkanapban):\n\n- **Alapszabadság: 20 nap.**\n- **Életkor szerinti pótszabadság**: 25 éves kortól 1 nap, 28-tól 2, 31-től 3, 33-tól 4, 35-től 5, 37-től 6 … egészen 45 éves kortól 10 napig.\n- **Fiatal munkavállaló** (18 év alatti): **+5 nap**, utoljára abban az évben, amikor betölti a 18-at.\n- **Gyermek után** (16 év alatti): 1 gyerek +2, 2 gyerek +4, több +7 nap.\n\nHa évközben kezdesz, **arányos** rész jár. A szabadság nagy részét a munkáltató adja ki, de évente 7 napot a munkavállaló kérésére kell kiadni (15 nappal előre jelezve).\n\n**Betegszabadság**: naptári évente **15 munkanap**, erre a **távolléti díj 70%-a** jár a munkáltatótól. Ezt követően **táppénz** (a NEAK/egészségbiztosító fizeti). Betegséget a háziorvos igazol (keresőképtelenség).',
          tip: 'Ki nem vett szabadságot pénzben megváltani csak a munkaviszony megszűnésekor lehet. Közben „el is veszhet”, ha nem veszed ki – figyeld!'
        },
        {
          title: 'Felmondás, felmondási idő, végkielégítés',
          text: 'A munkaviszony megszűnhet **közös megegyezéssel**, **felmondással**, **azonnali hatályú felmondással** (súlyos kötelezettségszegés esetén), vagy határozott idő lejártával.\n\n- **Munkavállalói felmondás**: nem kell indokolni. Felmondási idő: **30 nap** (ha a szerződés mást nem ír, legfeljebb 6 hónapig növelhető).\n- **Munkáltatói felmondás**: határozatlan idejű szerződésnél **indokolni kell** (a munkavállaló magatartása, képessége vagy a működés miatt). A felmondási idő 30 nap, ami a munkáltatónál töltött idővel nő (pl. 3 év után +5 nap, 5 év után +15 nap, 20 év után +60 nap). Munkáltatói felmondásnál a felmondási idő legalább felére **fel kell menteni a munka alól**, erre az időre is jár bér.\n- **Végkielégítés**: munkáltatói felmondásnál (vagy jogutód nélküli megszűnésnél) jár, ha legalább **3 évet** ott dolgoztál: 3 év után 1 havi, 5 év után 2, 10 év után 3, 15 év után 4, 20 év után 5, 25 év után 6 havi távolléti díj.\n\nA megszűnéskor a munkáltató köteles kiadni a **papírjaidat** (igazolás a munkaviszonyról, járulékokról, kiadott szabadságról) és kifizetni a járandóságot.',
          warn: 'Ne írj alá „közös megegyezést”, ha valójában a munkáltató akar elküldeni! Így végkielégítést és felmondási időt veszíthetsz. Kérj gondolkodási időt, kérdezz szakszervezetet vagy jogászt.'
        },
        {
          title: 'Fiatal munkavállalók külön szabályai',
          text: 'A **18 év alattiakat** az Mt. fokozottan védi:\n\n- Munkaviszonyt **16 éves kortól** lehet létesíteni. **Nappali tagozatos tanuló 15 évesen az iskolai szünetben** is dolgozhat. 16 év alatt a szülő (törvényes képviselő) hozzájárulása is kell.\n- Napi munkaidő legfeljebb **8 óra**, és több munkáltatónál együtt sem lehet több.\n- **Tilos az éjszakai munka** (22 és 6 óra között) és a **rendkívüli munkaidő** (túlóra).\n- 4,5 óra munka után legalább **30 perc** szünet, két munkanap között legalább **12 óra** pihenő.\n- **+5 nap pótszabadság** jár.\n- Nem végezhető egészségére, testi fejlődésére káros munka.\n\nA diákszövetkezeten keresztüli diákmunkáról és annak adózásáról a Pénz a mindennapokban tantárgy „Diákmunka” leckéje szól.',
          tip: 'Ha a munkáltató megszegi ezeket, a kormányhivatal munkavédelmi és munkaügyi hatósága eljárhat – bejelentést tehetsz.'
        }
      ],
      quiz: [
        { q: 'Mi a munkaszerződés két kötelező eleme az Mt. szerint?', options: ['Munkahely és cafeteria', 'Munkakör és alapbér', 'Szabadság és próbaidő', 'Végkielégítés és felmondási idő'], answer: 1, explain: 'Az Mt. szerint a felek a munkaszerződésben meghatározzák az alapbért és a munkakört; a többiről tájékoztatást kell adni.' },
        { q: 'Mennyi a bruttó minimálbér 2026. január 1-jétől?', options: ['266 800 Ft', '290 800 Ft', '322 800 Ft', '373 200 Ft'], answer: 2, explain: 'A 426/2025. Korm. rendelet szerint 322 800 Ft; a 373 200 Ft a garantált bérminimum.' },
        { q: 'Legfeljebb mennyi lehet a próbaidő kollektív szerződés nélkül?', options: ['3 hónap', '1 hét', '1 hónap', '1 év'], answer: 0, explain: 'A próbaidő legfeljebb 3 hónap; kollektív szerződés 6 hónapig növelheti.' },
        { q: 'Hány nap alapszabadság jár évente?', options: ['10', '15', '30', '20'], answer: 3, explain: 'Az alapszabadság 20 munkanap, ehhez jönnek a pótszabadságok.' },
        { q: 'Egy 17 éves munkavállaló esetén melyik állítás igaz?', options: ['Dolgozhat éjszaka, ha kéri', 'Nem rendelhető el számára túlóra és éjszakai munka', 'Napi 12 órát dolgozhat', 'Nem jár neki szabadság'], answer: 1, explain: 'A fiatal munkavállalót tilos éjszakai munkára és rendkívüli munkaidőre beosztani.' },
        { q: 'Mennyi betegszabadság jár évente, és mekkora díjazással?', options: ['5 nap, 100%', '30 nap, 50%', 'Nem jár betegszabadság', '15 munkanap, a távolléti díj 70%-a'], answer: 3, explain: 'Évi 15 munkanap betegszabadság jár, a távolléti díj 70%-ával; utána táppénz.' },
        { q: 'Mikor jár végkielégítés?', options: ['Minden felmondásnál, első naptól', 'Csak ha te mondasz fel', 'Munkáltatói felmondásnál, ha legalább 3 évig ott dolgoztál', 'Próbaidő alatt'], answer: 2, explain: 'Legalább 3 év munkaviszony és munkáltatói felmondás (vagy jogutód nélküli megszűnés) szükséges.' },
        { q: 'Mennyi az alap felmondási idő?', options: ['30 nap', '8 nap', '90 nap', 'Nincs felmondási idő'], answer: 0, explain: 'Az alap felmondási idő 30 nap; munkáltatói felmondásnál a ledolgozott évekkel nő.' }
      ]
    },

    /* ───────────────────────── 6. VÁLLALKOZÁS INDÍTÁSA ───────────────────────── */
    {
      id: 'vallalkozas-indul',
      title: 'Vállalkozás indítása: egyéni vállalkozó vagy Kft.?',
      level: 2, minutes: 17,
      summary: 'Egyéni vállalkozás és Kft. összehasonlítása, átalányadó és KATA 2026-ban, alanyi ÁFA-mentesség, számlázás, könyvelő, kamarai hozzájárulás.',
      tags: ['vállalkozás', 'egyéni vállalkozó', 'Kft.', 'törzstőke', 'átalányadó', 'költséghányad', 'KATA', 'alanyi adómentesség', 'ÁFA', 'számla', 'online számla', 'könyvelő', 'kamarai hozzájárulás', 'TEÁOR', 'minimális járulékalap'],
      sections: [
        {
          title: 'Egyéni vállalkozó vagy cég?',
          text: '**Egyéni vállalkozó (e.v.)**:\n\n- Gyorsan, **ingyen**, online indítható (az **egyéni vállalkozói nyilvántartásba vétel** a magyarorszag.hu-n, Ügyfélkapu+ / DÁP belépéssel).\n- Nincs minimális tőke.\n- **Teljes vagyonoddal felelsz** a vállalkozás tartozásaiért.\n- Egyszerűbb adminisztráció, sokszor kedvező adózás (átalányadó).\n\n**Korlátolt felelősségű társaság (Kft.)**:\n\n- Önálló jogi személy, **cégbíróságon** jegyzik be, **ügyvédi közreműködéssel** (költség).\n- **Minimális törzstőke: 3 millió Ft.**\n- A tag **főszabályként csak a vagyoni hozzájárulásáig** felel (kivételek vannak, pl. visszaélés esetén).\n- Kettős könyvvitel, éves beszámoló – könyvelő nélkül nem megy. Adók: társasági adó (TAO) vagy KIVA, osztalékadó.\n\nKezdőként, kis bevételnél, egyedül általában az **egyéni vállalkozás** a jobb kiindulópont; nagyobb kockázatnál, több tulajdonosnál a Kft.',
          tip: 'Indítás előtt válaszd ki a tevékenységi köreidet (**TEÁOR**-kódok) – ezek határozzák meg, mivel foglalkozhatsz, és befolyásolják az átalányadó költséghányadát is.'
        },
        {
          title: 'Átalányadó (2026)',
          text: 'Az **átalányadózás** az egyéni vállalkozók egyik legnépszerűbb módja. Nem a tényleges költségeidet számolod el, hanem a bevételből egy **törvényben rögzített költséghányadot** vonsz le, és a maradék a jövedelem.\n\n2026-os főbb szabályok:\n\n- Általános **költséghányad: 45%** (2025-ig 40% volt; 2027-től 50% lesz). Bizonyos tevékenységeknél 80% vagy 90%.\n- **Adómentes rész**: a jövedelemből az éves minimálbér **fele** (2026-ban **1 936 800 Ft**) után nem kell SZJA-t fizetni.\n- **Bevételi határ**: az éves minimálbér tízszerese, 2026-ban **38 736 000 Ft** (kizárólag kiskereskedelmi tevékenységnél ötvenszerese).\n- A jövedelem után **SZJA (15%)**, **TB-járulék (18,5%)** és **szociális hozzájárulási adó (13%)** fizetendő; főfoglalkozásban **minimum járulékalapok** vannak (a minimálbérhez vagy garantált bérminimumhoz kötve).\n\nPélda (egyszerűsítve, 45% költséghányad): 6 000 000 Ft bevétel → 3 300 000 Ft jövedelem. Ebből 1 936 800 Ft SZJA-mentes, a maradék 1 363 200 Ft után 15% SZJA ≈ 204 480 Ft. A járulékokat külön kell számolni.',
          tip: 'A NAV honlapján átalányadó-kalkulátort és részletes tájékoztató füzeteket találsz – ezeket minden év elején frissítik.',
          warn: 'A számítás egyszerűsített. A minimum járulékok miatt főfoglalkozásban akkor is fizetned kell havonta, ha alig volt bevételed!'
        },
        {
          title: 'A KATA 2022 utáni szűkítése',
          text: 'A **kisadózó vállalkozások tételes adója (KATA)** sokáig nagyon népszerű volt (havi fix összeg). **2022. szeptember 1-jétől** azonban erősen leszűkült:\n\n- Csak **főfoglalkozású** egyéni vállalkozó választhatja.\n- **Csak magánszemélyeknek** számlázhat (cégeknek nem – ha mégis, súlyos különadó jár).\n- Havi tételes adó: **50 000 Ft**; éves bevételi határ: **18 millió Ft**.\n\nEzért a korábbi KATA-sok többsége **átalányadóra** váltott. Ma a KATA főleg lakossági szolgáltatóknak (pl. fodrász, kozmetikus, magántanár, akinek csak magánszemély ügyfele van) lehet érdekes.\n\n**Változás várható 2027-től:** a kormány 2026-ban törvényjavaslatot tett egy kibővített KATA-ra (magasabb bevételi határ, céges számlázás és mellékállás újra lehetséges, magasabb havi tétel). A végleges szabályokat a NAV oldalán ellenőrizd, mielőtt döntesz.',
          tip: 'Ha cégeknek is dolgoznál (pl. webfejlesztés, grafika), a 2026-os szabályok szerint a KATA nem neked való – nézd az átalányadót.'
        },
        {
          title: 'ÁFA és az alanyi adómentesség (2026)',
          text: 'Alapesetben a vállalkozó a számláin **ÁFÁ-t** (általános kulcs **27%**) számít fel és fizet be a NAV-nak (az ÁFA működését a Pénz a mindennapokban tantárgy „ÁFA és számla” leckéje magyarázza).\n\nKis vállalkozásoknak választható az **alanyi adómentesség**: ekkor nem számítasz fel ÁFÁ-t (de a vásárlásaid ÁFÁ-ját sem igényelheted vissza).\n\n- Értékhatár **2026-ban: 20 millió Ft** éves bevétel (2025-ben 18 millió volt; 2027-ben 22, 2028-ban 24 millió Ft-ra nő).\n- Ha év közben átléped, onnantól ÁFA-kötelessé válsz.\n- Bizonyos tevékenységek (pl. egyes ingatlan-, termékexport ügyletek) kizártak.',
          tip: 'Ha főleg magánszemélyeknek dolgozol, az alanyi mentesség versenyelőny: nálad 27%-kal olcsóbb lehet ugyanaz a szolgáltatás.'
        },
        {
          title: 'Számlázás, könyvelő, kamara',
          text: '- **Számla**: minden értékesítésről kötelező bizonylatot adni. **Magánszemélynek** számla helyett **nyugta** is adható (bizonyos esetekben online pénztárgéppel). Ma szinte mindenki **számlázóprogramot** használ, amely a számlaadatokat automatikusan elküldi a **NAV Online Számla** rendszerébe (2021 óta minden belföldi számláról).\n- **Könyvelő**: egyéni vállalkozóként egyszerű esetben magad is boldogulhatsz, de egy jó könyvelő (havi díjért) figyeli a határidőket, bevallásokat (pl. havi járulékbevallás, éves SZJA-bevallás, ÁFA-bevallás), és megóv a hibáktól. Kft.-nél gyakorlatilag kötelező.\n- **Kamarai hozzájárulás**: minden vállalkozás tagja a területi kereskedelmi és iparkamarának; évi **5000 Ft** hozzájárulás fizetendő (évente, a kamara által megadott határidőig).\n- **Bankszámla**: egyéni vállalkozónak érdemes külön számlát nyitni, Kft.-nek kötelező a pénzforgalmi számla.',
          warn: 'Késedelmes bevallásért és befizetésért mulasztási bírság és késedelmi pótlék jár. A határidőket naptárban rögzítsd!'
        },
        {
          title: 'Indítás lépésről lépésre (egyéni vállalkozó)',
          text: '1. **Ötlet és számok**: kik a vevőid, mennyit kérsz, mennyi bevételre számítasz? Megéri-e az adók és járulékok után?\n2. **Tevékenységi körök** (TEÁOR) kiválasztása; ellenőrizd, kell-e képesítés vagy engedély (pl. vendéglátás, építőipar).\n3. **Bejelentés online** a magyarorszag.hu-n (Ügyfélkapu+ / DÁP): itt választhatod az adózási módot (pl. átalányadó) és az alanyi ÁFA-mentességet is.\n4. Megkapod az **adószámot** és a nyilvántartási számot.\n5. **Bankszámla**, **számlázóprogram** regisztrálása (NAV Online Számla).\n6. **Kamarai regisztráció**, kamarai hozzájárulás.\n7. **Könyvelő** felkérése vagy a határidők naptárba vétele.\n\nMellékállásban (munkaviszony mellett) is lehetsz egyéni vállalkozó – ekkor a járulékszabályok kedvezőbbek.',
          tip: 'A NAV és a kormányhivatalok ingyenes tájékoztató füzeteket adnak ki kezdő vállalkozóknak – mindig az adott évi változatot olvasd.'
        }
      ],
      quiz: [
        { q: 'Mekkora a Kft. minimális törzstőkéje?', options: ['Nincs minimum', '3 millió Ft', '500 000 Ft', '20 millió Ft'], answer: 1, explain: 'A Kft. legkisebb törzstőkéje 3 millió Ft.' },
        { q: 'Mekkora az átalányadózás általános költséghányada 2026-ban?', options: ['40%', '50%', '45%', '90%'], answer: 2, explain: '2026-tól 45% (2025-ig 40% volt). A 2027-es mértéket a korábbi törvény 50%-ra emelte volna, de az új KATA-szabályokkal együtt újratárgyalják – nézd meg a NAV aktuális tájékoztatóját.' },
        { q: 'Mennyi az alanyi ÁFA-mentesség értékhatára 2026-ban?', options: ['20 millió Ft', '12 millió Ft', '18 millió Ft', '50 millió Ft'], answer: 0, explain: '2026-ban 20 millió Ft; 2025-ben 18 millió volt, 2027-ben 22 millió lesz.' },
        { q: 'Kinek számlázhat a KATA-s vállalkozó 2022. szeptember 1. óta (különadó nélkül)?', options: ['Bárkinek', 'Csak cégeknek', 'Csak külföldi cégeknek', 'Csak magánszemélyeknek'], answer: 3, explain: 'A 2022-es szűkítés óta a KATA-s csak magánszemélyeknek számlázhat.' },
        { q: 'Mekkora a jövedelem SZJA-mentes része átalányadózásnál 2026-ban?', options: ['Nincs mentes rész', 'Az éves minimálbér fele, 1 936 800 Ft', 'Az egész jövedelem', '100 000 Ft'], answer: 1, explain: 'Az éves minimálbér felét meg nem haladó jövedelem adómentes: 322 800 × 12 / 2 = 1 936 800 Ft.' },
        { q: 'Mivel felel az egyéni vállalkozó a vállalkozás tartozásaiért?', options: ['Semmivel', 'Csak a törzstőkével', 'Csak a bankszámlájával', 'Teljes vagyonával'], answer: 3, explain: 'Az egyéni vállalkozó korlátlanul, teljes vagyonával felel.' },
        { q: 'Mennyi a kamarai hozzájárulás évente?', options: ['50 000 Ft', '1000 Ft', '5000 Ft', 'A bevétel 1%-a'], answer: 2, explain: 'Minden vállalkozás évi 5000 Ft kamarai hozzájárulást fizet.' },
        { q: 'Hová kerülnek automatikusan a számlázóprogramban kiállított számlák adatai?', options: ['A NAV Online Számla rendszerébe', 'A cégbíróságra', 'A kamarához', 'Sehová'], answer: 0, explain: '2021 óta minden belföldi számla adatait jelenteni kell a NAV Online Számla rendszerébe.' }
      ]
    },

    /* ───────────────────────── 7. SZERZŐDÉSEK ───────────────────────── */
    {
      id: 'szerzodesek',
      title: 'Szerződések a mindennapokban',
      level: 2, minutes: 15,
      summary: 'A Polgári Törvénykönyv alapjai: hogyan jön létre a szerződés, mit nézz meg aláírás előtt, ÁSZF, hűségidő, kiskorúak szerződései és a kezesség veszélyei.',
      tags: ['szerződés', 'Ptk.', 'Polgári Törvénykönyv', 'ajánlat', 'elfogadás', 'írásbeliség', 'ÁSZF', 'apróbetű', 'hűségidő', 'előfizetés', 'kiskorú', 'cselekvőképesség', 'kezesség', 'kötbér', 'elállás'],
      sections: [
        {
          title: 'Hogyan jön létre egy szerződés?',
          text: 'A szerződéseket főleg a **Polgári Törvénykönyv** (**Ptk., 2013. évi V. törvény**) szabályozza. A szerződés **két (vagy több) fél egybehangzó akaratnyilatkozata**, amelyből kötelezettség keletkezik.\n\n- **Ajánlat**: az egyik fél javaslata a lényeges feltételekkel (pl. „Eladom a biciklim 40 000 Ft-ért.”). Az ajánlattevőt az ajánlata **köti**.\n- **Elfogadás**: a másik fél igent mond. Ezzel **létrejött a szerződés**.\n\nSzerződés sokszor **észrevétlenül** jön létre: buszjegy vásárlása, bolti vásárlás, egy app „Elfogadom” gombja, egy szóbeli „jó, megveszem”. Ezek mind szerződések!',
          tip: 'Ha az elfogadó módosít a feltételeken („jó, de csak 35 000-ért”), az nem elfogadás, hanem **új ajánlat**.'
        },
        {
          title: 'Írásbeliség és aláírás',
          text: 'Főszabály: a szerződés **bármilyen formában** érvényes (szóban, ráutaló magatartással is). Vannak azonban kivételek, ahol **írásba kell foglalni**, különben érvénytelen – pl. **ingatlan adásvétele** (ügyvédi ellenjegyzéssel), **kezesség**, munkaszerződés, lakásbérlet.\n\nAz írásbeli forma akkor is erősen ajánlott, ha nem kötelező: **bizonyítani** csak így tudod, miben állapodtatok meg.\n\nElektronikus formában is lehet írásbeli egy szerződés: minősített elektronikus aláírással, vagy hitelesítési szolgáltatással (pl. AVDH – az Ügyfélkapu+-hoz kapcsolódó dokumentumhitelesítés).',
          warn: 'Üres vagy hiányosan kitöltött papírt soha ne írj alá! Utólag bármit beleírhatnak.'
        },
        {
          title: 'Mit nézz meg aláírás előtt? – Ellenőrzőlista',
          text: '1. **Kik a felek?** Pontos név, cégnév, adószám, cím. Valódi cég? (cégjegyzékben ellenőrizhető)\n2. **Mi a szolgáltatás?** Pontosan mit kapsz, milyen minőségben, mikorra?\n3. **Mennyibe kerül összesen?** Egyszeri és ismétlődő díjak, rejtett költségek, ÁFA benne van-e, árváltozás joga.\n4. **Mennyi ideig köt?** Határozott idő, **hűségidő**, automatikus megújulás.\n5. **Hogyan lehet kilépni?** Felmondási idő, **kötbér** (szerződésszegésért fizetendő büntetés), elállási jog.\n6. **Mi van, ha baj van?** Jótállás, szavatosság, panaszkezelés, illetékes bíróság.\n7. **Az ÁSZF és az apróbetű** – mire hivatkozik még a szerződés?\n\nKérj **időt** és **másolatot**. A sürgetés („csak ma ilyen olcsó!”) gyanús.',
          tip: 'Egy szerződést nyugodtan hazavihetsz, és megmutathatsz valakinek. Aki nem engedi, annak oka van rá.'
        },
        {
          title: 'ÁSZF, előfizetések, hűségidő',
          text: 'Az **Általános Szerződési Feltételek (ÁSZF)** a cég által előre megírt, minden ügyfélre vonatkozó feltételek (pl. telefon-, internet-, edzőterem-, streaming-előfizetés). Ezt nem tudod módosítani, csak elfogadni vagy elutasítani – de **rád nézve kötelező**, ha elfogadtad.\n\n- A szokatlan, a megszokottól eltérő kikötésekre a cégnek **külön fel kell hívnia a figyelmed**, és kifejezetten el kell fogadnod őket; különben nem válnak a szerződés részévé.\n- A **tisztességtelen** (indokolatlanul egyoldalúan hátrányos) ÁSZF-kikötés megtámadható.\n- **Hűségidő**: kedvezményért (pl. olcsóbb telefon) cserébe vállalod, hogy pl. 12–24 hónapig maradsz. Ha korábban felmondasz, a kedvezményt (vagy annak egy részét) **vissza kell fizetned**.\n- **Automatikus megújulás**: sok előfizetés magától meghosszabbodik. Írd fel a naptárba a lemondási határidőt!',
          tip: 'Az online kötött szerződéseknél általában **14 napos elállási jog** van – erről a Pénz a mindennapokban tantárgy „Fogyasztóvédelem” leckéje szól.'
        },
        {
          title: 'Kiskorúak szerződései',
          text: 'A **cselekvőképesség** azt jelenti, hogy saját nyilatkozatoddal köthetsz érvényes szerződést.\n\n- **14 év alatt** (cselekvőképtelen kiskorú): a nyilatkozata semmis; csak a mindennapi élet **csekély jelentőségű** ügyleteit kötheti meg (pl. tízórai, buszjegy).\n- **14 és 18 év között** (korlátozottan cselekvőképes): a nyilatkozatához főszabályként a **törvényes képviselő (szülő) hozzájárulása** kell. Önállóan megkötheti a mindennapi kisebb ügyleteket, rendelkezhet a **munkával szerzett jövedelmével**, és köthet olyan szerződést, amellyel csak előnyt szerez (pl. ajándékot fogad el).\n- **18 évesen** (vagy házasságkötéssel korábban) válsz **nagykorúvá** és teljesen cselekvőképessé – innentől minden aláírásod rád nézve kötelez.',
          warn: 'A 18. születésnap után már senki nem „semmisíti meg” a meggondolatlan előfizetést vagy részletfizetést. Ekkor kezdenek el sokan „kedvező” ajánlatokkal célba venni.'
        },
        {
          title: 'A kezesség veszélye',
          text: '**Kezességvállalás**: arra vállalsz kötelezettséget, hogy ha az adós (pl. egy barátod, rokonod) nem fizet, **te fizetsz helyette**.\n\n- A kezességet **írásba kell foglalni**.\n- **Készfizető kezesség** esetén (bankoknál ez a jellemző) a hitelező **nem köteles előbb az adóstól behajtani** – rögtön tőled is követelheti.\n- A kezes a teljes tartozásért felelhet, kamatokkal, késedelmi kamattal, költségekkel együtt.\n\nCsak akkor vállalj kezességet, ha **képes és hajlandó vagy a teljes összeget kifizetni** – és ezt a pénzt adott esetben soha nem kapod vissza.',
          tip: 'Ha segíteni szeretnél valakin, gyakran jobb egy kisebb összeget **ajándékba adni**, mint egy nagy hitelre kezességet vállalni.'
        }
      ],
      quiz: [
        { q: 'Mikor jön létre a szerződés?', options: ['Amikor az egyik fél ajánlatot tesz', 'Amikor a felek akaratnyilatkozata egybehangzik (ajánlat + elfogadás)', 'Csak közjegyző előtt', 'Csak ha mindkét fél aláírja papíron'], answer: 1, explain: 'A szerződés a felek kölcsönös és egybehangzó akaratnyilatkozatával jön létre; főszabályként formakötöttség nélkül.' },
        { q: 'Az eladó 40 000 Ft-ot kér, te azt mondod: „Jó, de csak 35 000-ért.” Ez jogilag…', options: ['Elfogadás', 'Elállás', 'Új ajánlat', 'Kezesség'], answer: 2, explain: 'A módosított feltételekkel adott válasz új ajánlatnak minősül.' },
        { q: 'Melyik szerződést kell kötelezően írásba foglalni?', options: ['Kezességvállalás', 'Kenyérvásárlás a boltban', 'Buszjegy-vásárlás', 'Kávé a kávézóban'], answer: 0, explain: 'A kezességet írásba kell foglalni, különben érvénytelen.' },
        { q: 'Mit jelent a hűségidő egy előfizetésnél?', options: ['Ingyenes próbaidőszak', 'A szolgáltató garanciája', 'Az elállási jog ideje', 'Vállalod, hogy egy ideig maradsz; korai felmondásnál a kedvezményt vissza kell fizetni'], answer: 3, explain: 'A hűségidő kedvezményért cserébe vállalt kötöttség.' },
        { q: 'Egy 16 éves mire fordíthatja önállóan, szülői hozzájárulás nélkül?', options: ['Lakásvásárlásra', 'A munkával szerzett jövedelmére és a mindennapi kisebb ügyletekre', 'Hitelfelvételre', 'Bármilyen szerződésre'], answer: 1, explain: 'A korlátozottan cselekvőképes kiskorú a munkával szerzett jövedelmével és a mindennapi csekély ügyletekkel rendelkezhet.' },
        { q: 'Mi a készfizető kezesség lényege?', options: ['A kezes csak akkor fizet, ha az adóstól már mindent behajtottak', 'A kezes semmit nem kockáztat', 'Csak 10%-ért felel a kezes', 'A hitelező rögtön a kezestől is követelheti a tartozást'], answer: 3, explain: 'Készfizető kezességnél a hitelezőnek nem kell előbb az adóssal próbálkoznia.' },
        { q: 'Mi a kötbér?', options: ['Egy adófajta', 'A bankszámla díja', 'A szerződésszegés esetére kikötött, pénzben fizetendő „büntetés”', 'Kamarai hozzájárulás'], answer: 2, explain: 'A kötbér a szerződésszegés esetére előre kikötött összeg.' },
        { q: 'Mit tegyél, ha az ügynök sürget: „Csak ma írhatja alá ezen az áron!”', options: ['Kérek időt és másolatot, otthon átolvasom', 'Gyorsan aláírom', 'Aláírom, de nem olvasom el', 'Aláírok egy üres lapot, majd ő kitölti'], answer: 0, explain: 'A sürgetés gyanús; egy tisztességes ajánlat kibírja, hogy átolvasd.' }
      ]
    },

    /* ───────────────────────── 8. KÖZLEKEDÉS ───────────────────────── */
    {
      id: 'kozlekedes',
      title: 'Közlekedés: jogosítvány, biztosítás, bérlet, bírság',
      level: 1, minutes: 14,
      summary: 'Jogosítványkategóriák és korhatárok, a vizsgák menete és költségei, kötelező biztosítás, bérletek és diákkedvezmények, a bírságok alapelvei (2026).',
      tags: ['jogosítvány', 'vezetői engedély', 'AM kategória', 'A1', 'B kategória', 'KRESZ-vizsga', 'forgalmi vizsga', 'autósiskola', 'kezdő vezető', 'KGFB', 'kötelező biztosítás', 'casco', 'vármegyebérlet', 'országbérlet', 'diákkedvezmény', 'bírság', 'gyorshajtás'],
      sections: [
        {
          title: 'Jogosítványkategóriák és korhatárok',
          text: 'A vezetői engedély kategóriái az EU-ban egységesek. A legfontosabbak fiataloknak:\n\n- **AM**: segédmotoros kerékpár (robogó, legfeljebb 45 km/h) – **14 éves** kortól.\n- **A1**: kis motorkerékpár (legfeljebb 125 cm³, 11 kW) – **16 éves** kortól.\n- **A2**: közepes motor (legfeljebb 35 kW) – 18 éves kortól.\n- **A**: korlátlan motor – 24 éves kortól (vagy 2 év A2 után 20 évesen).\n- **B**: személyautó (legfeljebb 3,5 t, 8 utas + vezető) – Magyarországon a **forgalmi vizsga 17 éves kortól** tehető le. **18 éves korig csak belföldön** vezethetsz vele.\n\nAz EU 2025-ben elfogadott új jogosítvány-irányelve fokozatosan bevezeti a **17 éves kori kísérővel vezetést** az egész Unióban – a magyar átültetés részleteit a hatályos jogszabályban ellenőrizd.',
          tip: 'A KRESZ-tanfolyamot B kategóriánál már 16,5 évesen elkezdheted, a KRESZ-vizsgát a 17. születésnap előtt 3 hónappal leteheted.'
        },
        {
          title: 'A jogosítványszerzés lépései',
          text: '1. **Autósiskola kiválasztása** – hasonlítsd össze az árakat, a sikerességi mutatókat (vizsgaeredmények), az oktatókat.\n2. **Orvosi alkalmassági vizsgálat** (háziorvosnál, díjköteles).\n3. **Elméleti képzés** (tantermi vagy e-learning) és **KRESZ-vizsga** (számítógépes teszt).\n4. **Elsősegély-vizsga** (Vöröskereszt) – ha nincs már elfogadott igazolásod (pl. bizonyos középiskolai képzésből).\n5. **Gyakorlati képzés**: rutinpálya (B-nél kötelező órák száma rögzített) és forgalmi vezetés.\n6. **Forgalmi vizsga** a vizsgabiztossal.\n7. A jogosítványt a kormányablakban állítják ki; vezetés közben mindig legyen nálad.',
          tip: 'Sok fiatal számára az állam **támogatja a KRESZ-tanfolyam és -vizsga díját** (a B kategóriás KRESZ-vizsga sikeres letétele után, ha a vizsga napján 20 év alatti voltál, egy éven belül igényelhető vissza egy meghatározott összegig). A pontos feltételeket a kormanyhivatalok.hu-n ellenőrizd.'
        },
        {
          title: 'Mennyibe kerül?',
          text: 'A jogosítvány nem olcsó – B kategóriánál a teljes költség (tanfolyam, gyakorlati órák, vizsgadíjak, orvosi, elsősegély) **több százezer forint** lehet, és nagyban függ attól, hány pótórára és pótvizsgára van szükséged. A **vizsgadíjak** országosan egységesek, a **tanfolyam- és óradíjakat** az autósiskolák szabják meg.\n\n- A legtöbb pénzt a **gyakorlati órák** viszik. Ha az oktató több órát javasol, az nem feltétlenül lehúzás – a sikertelen forgalmi vizsga és a pótórák drágábbak.\n- A **kezdő vezetői** időszakban (az első 2 évben) súlyosabb szabályszegésnél **utánképzésre** kötelezhetnek – ez újabb költség.',
          tip: 'Kérj írásos árajánlatot: mennyi az alapcsomag, egy pótóra, egy pótvizsga díja?'
        },
        {
          title: 'Autó és biztosítás',
          text: '- **Kötelező gépjármű-felelősségbiztosítás (KGFB)**: minden forgalomban lévő járműre **kötelező**. A **másoknak** okozott kárt fizeti (a te autódat nem!). Fedezet nélkül közlekedni tilos, és fedezetlenségi díjat kell fizetni.\n- **Casco**: önkéntes biztosítás a **saját** autódra (lopás, saját hibás baleset, jégkár). Drágább, újabb autóknál éri meg.\n- **Bonus-malus rendszer**: kármentes évek után olcsóbb a KGFB, okozott baleset után drágább. Kezdő vezetőként és fiatalon jellemzően drágább a biztosítás.\n- Egyéb költségek: **gépjárműadó**, műszaki vizsga, szerviz, üzemanyag, parkolás, autópálya-matrica.',
          warn: 'Ha valaki más autóját vezeted és balesetet okozol, a tulajdonos bonus-malus besorolása romlik. Beszéljétek meg előre!'
        },
        {
          title: 'Bérlet és diákkedvezmények',
          text: 'Autó nélkül is lehet jól közlekedni – és jóval olcsóbban:\n\n- **Vármegyebérlet** (egy vármegye helyközi vonat- és buszjáratai) és **Országbérlet** (az egész ország helyközi vonat- és buszjáratai). Teljes áruk 2023 óta 9450 Ft, illetve 18 900 Ft havonta (2026-ban is ennyi; az aktuális árat a MÁV-oldalon ellenőrizd).\n- **14–25 éves diákoknak** (érvényes diákigazolvánnyal) **90% kedvezmény** jár ezekre: kb. 945 Ft, illetve 1890 Ft havonta.\n- **Diákigazolvánnyal** a menetjegyekre is jár kedvezmény (jellemzően 50%).\n- Kisgyermekek (6 év alatt) és 65 év felettiek **ingyenesen** utazhatnak a közösségi közlekedésen (a pontos szabályokat a szolgáltató díjszabása tartalmazza).\n- A bérletek nem érvényesek **helyjegyköteles** vonatokon helyjegy nélkül, és az 1. osztályra.',
          tip: 'A diákbérletet a MÁV appban is megveheted – a vásárláshoz meg kell adnod a diákigazolványod (vagy személyid) számát, ellenőrzéskor vidd magaddal!'
        },
        {
          title: 'Bírságok – az alapelvek',
          text: '- **Közigazgatási (objektív) bírság**: bizonyos szabályszegésekért (pl. **gyorshajtás**, piros lámpa, biztonsági öv) a **jármű üzembentartója** fizet, függetlenül attól, ki vezetett. A gyorshajtási bírság **2024. augusztus óta 50 000 Ft-tól 468 000 Ft-ig** terjedhet, a túllépés mértékétől és a helyszíntől függően.\n- **Helyszíni bírság / szabálysértés**: a rendőr helyben szabhatja ki, vagy feljelentést tesz.\n- **Pontrendszer**: súlyosabb szabályszegésekért **büntetőpontot** kapsz; ha összegyűlik a határérték, bevonják a jogosítványt.\n- **Ittas vezetés**: Magyarországon **zéró tolerancia** – már kis mennyiség is szankcionálható, súlyos esetben bűncselekmény, jogosítvány-bevonással.\n- **Bliccelés** (jegy nélküli utazás) tömegközlekedésen: pótdíjat kell fizetni, ami többszöröse a jegyárnak.\n\n2026-ban egy átfogó **új KRESZ** előkészítése zajlik, szigorúbb szankciókkal – mindig a hatályos szabályokat nézd!',
          warn: 'A ki nem fizetett bírság nem tűnik el: végrehajtás indulhat, és akár a jármű forgalomból való kivonása is lehet a következmény.'
        }
      ],
      quiz: [
        { q: 'Hány éves kortól teheted le Magyarországon a B kategóriás forgalmi vizsgát?', options: ['16', '17', '18', '21'], answer: 1, explain: 'Magyarországon 17 évesen lehet B kategóriás forgalmi vizsgát tenni; 18 éves korig csak belföldön vezethetsz.' },
        { q: 'Melyik kategória a robogóé (legfeljebb 45 km/h), és milyen korhatárral?', options: ['B, 17 év', 'A, 24 év', 'AM, 14 év', 'C, 18 év'], answer: 2, explain: 'Segédmotoros kerékpárhoz AM kategória kell, 14 éves kortól.' },
        { q: 'Mit fizet a kötelező gépjármű-felelősségbiztosítás (KGFB)?', options: ['A másoknak okozott kárt', 'A saját autód javítását', 'Az üzemanyagot', 'A gépjárműadót'], answer: 0, explain: 'A KGFB a harmadik félnek okozott kárt téríti; a saját autóra a casco vonatkozik.' },
        { q: 'Mekkora kedvezmény jár 14–25 éves diákoknak a vármegye- és országbérletre?', options: ['10%', '50%', '100%', '90%'], answer: 3, explain: 'A 14–25 éves diákok 90%-os kedvezménnyel vehetik meg ezeket a bérleteket.' },
        { q: 'Ki fizeti a közigazgatási (objektív) gyorshajtási bírságot?', options: ['Mindig az utas', 'A jármű üzembentartója', 'A biztosító', 'Az autósiskola'], answer: 1, explain: 'Objektív felelősség: az üzembentartó fizet, függetlenül attól, ki vezetett.' },
        { q: 'Mennyi a legkisebb gyorshajtási bírság 2024 augusztusa óta?', options: ['10 000 Ft', '30 000 Ft', '468 000 Ft', '50 000 Ft'], answer: 3, explain: 'A gyorshajtási bírság 50 000 Ft-tól 468 000 Ft-ig terjed.' },
        { q: 'Mi Magyarországon a szabály az ittas vezetésre?', options: ['0,5 ezrelékig szabad', 'Hétvégén szabad', 'Zéró tolerancia', 'Csak autópályán tilos'], answer: 2, explain: 'Magyarországon zéró tolerancia érvényes.' },
        { q: 'Mi a casco?', options: ['Önkéntes biztosítás a saját autóra', 'Kötelező biztosítás a másoknak okozott kárra', 'Egy jogosítványkategória', 'Az autópálya-matrica neve'], answer: 0, explain: 'A casco önkéntes, a saját jármű kárait fedezi.' }
      ]
    }
  ]
});
