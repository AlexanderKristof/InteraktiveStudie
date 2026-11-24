/* Tantárgy: Informatikai rendszer- és hálózatüzemeltetés */
STUDIE.addSubject({
  id: 'rendszeruzem',
  stage: 'szakma',
  title: 'Informatikai rendszer- és hálózatüzemeltetés',
  icon: '🖧',
  color: '#0e9aa7',
  description: 'Gépösszeszerelés, operációs rendszerek, hálózatok, szerverek és informatikai biztonság: a rendszergazda mindennapjai.',
  intro: 'A rendszergazda (rendszer- és hálózatüzemeltető) gondoskodik róla, hogy a gépek, a hálózat és a szerverek **megbízhatóan, biztonságosan** működjenek. Ebben a tantárgyban összeszerelsz (fejben) egy számítógépet, megismered a Windows és a Linux alapjait, kiszámolod az IP-címeket, bekötsz egy hálózati kábelt, és megtanulod, hogyan véded meg a rendszert a támadásoktól. A parancsokat bátran próbáld ki a saját gépeden!',
  lessons: [
    {
      id: 'hardver',
      title: 'Számítógép összeszerelése és hibaelhárítása',
      level: 1, minutes: 15,
      summary: 'A PC alkatrészei, ESD-védelem, az összeszerelés sorrendje, POST, BIOS/UEFI és a meghajtók.',
      tags: ['alaplap', 'processzor', 'CPU', 'RAM', 'tápegység', 'SSD', 'HDD', 'NVMe', 'ESD', 'POST', 'BIOS', 'UEFI', 'összeszerelés', 'hibaelhárítás'],
      models: ['alaplap', 'processzor'],
      sections: [
        {
          title: 'A PC fő alkatrészei',
          text: 'Egy asztali számítógép néhány jól elkülönülő, cserélhető egységből áll:\n\n- **[[alaplap|Alaplap]]**: a „gerinc”, erre csatlakozik minden. A formája (pl. ATX, micro-ATX) határozza meg, milyen házba fér.\n- **[[processzor|Processzor]] (CPU)**: a számításokat végzi. Csak a hozzá illő **foglalatba** (socketbe) tehető, pl. AM5 vagy LGA1700.\n- **Memória (RAM)**: az éppen futó programok adatai. A típusnak (pl. DDR4, DDR5) egyeznie kell az alaplappal.\n- **Háttértár**: SSD vagy HDD, itt van az operációs rendszer és a fájljaid.\n- **Tápegység (PSU)**: a 230 V-os hálózati feszültségből 12 V, 5 V és 3,3 V egyenfeszültséget állít elő.\n- **Videokártya (GPU)**: ha a processzorban nincs beépített grafika, vagy játékhoz, grafikához nagyobb teljesítmény kell.\n- **Hűtés**: processzorhűtő hővezető pasztával, házventilátorok.',
          tip: 'Vásárlás előtt mindig ellenőrizd a **kompatibilitást**: CPU-foglalat és alaplap, RAM-típus, a tápegység teljesítménye (W) és csatlakozói, a videokártya hossza és a ház mérete.'
        },
        {
          title: 'ESD-védelem: a láthatatlan ellenség',
          text: 'Az **ESD** (elektrosztatikus kisülés) az, amikor a testedben felgyűlt töltés egy pillanat alatt kisül, például egy alkatrész lábán keresztül. Te talán meg sem érzed (kb. 3000 V alatt nem érezhető), de egy chip ennél jóval kisebb feszültségtől is tönkremehet, vagy rejtetten megsérül, és később hibásodik meg.\n\nÍgy védekezz:\n\n- Viselj **antisztatikus csuklópántot**, és csatlakoztasd a gép fém vázához vagy földelt ponthoz.\n- Dolgozz **antisztatikus alátéten**, ne szőnyegen.\n- Az alkatrészeket az **antisztatikus zacskójukban** tárold, és a szélüknél fogd meg, ne az érintkezőknél.\n- Szerelés előtt húzd ki a tápkábelt, és nyomd meg a bekapcsológombot pár másodpercre, hogy a kondenzátorok kisüljenek.',
          warn: 'A **tápegységet soha ne szedd szét**! A benne lévő kondenzátorok kihúzott állapotban is életveszélyes feszültséget tárolhatnak. Hibás tápot egyben cserélünk.'
        },
        {
          title: 'Az összeszerelés sorrendje',
          text: 'Egy bevált sorrend, amivel a legkevesebb a bosszúság:\n\n1. A **processzort** még a házon kívül tedd az alaplapba (figyelj a sarokjelölésre, a lábakat ne hajlítsd meg).\n2. Kenj rá kevés **hővezető pasztát** (ha a hűtőn nincs gyárilag), és szereld fel a **processzorhűtőt**, kösd be a ventilátorát a CPU_FAN csatlakozóba.\n3. Tedd be a **RAM-modulokat** (két modulnál általában a 2. és 4. foglalatba, lásd a kézikönyvet), és a **M.2 SSD-t**.\n4. Csavarozd be a **távtartókat** a házba, majd az alaplapot.\n5. Szereld be a **tápegységet** és a többi meghajtót.\n6. Kösd be a tápkábeleket: 24 tűs alaplapi, 8 tűs CPU-tápcsatlakozó, videokártya-táp, SATA-táp.\n7. Kösd be az előlap csatlakozóit (bekapcsológomb, LED-ek, USB, hang).\n8. Tedd be a **videokártyát**, rendezd el a kábeleket, és csak ezután zárd be a házat.',
          tip: 'Az első bekapcsolást érdemes nyitott házzal végezni: így látod, hogy pörögnek-e a ventilátorok, és könnyebb javítani, ha valamit elfelejtettél bekötni.'
        },
        {
          title: 'POST, BIOS és UEFI',
          text: 'Bekapcsoláskor a gép először a **firmware**-t futtatja, ami az alaplapon lévő flash-memóriában van.\n\n- **POST** (Power-On Self-Test): önellenőrzés. Megnézi, megvan-e és működik-e a processzor, a memória és a videokártya. Ha hibát talál, **sípkóddal** vagy az alaplapon lévő hibajelző LED-ekkel, kétjegyű kóddal jelez.\n- **BIOS**: a régi, 1980-as évekbeli firmware. MBR partíciós táblával legfeljebb 2 TB-os lemezről tud indítani.\n- **UEFI**: a mai utódja. Egérrel kezelhető felület, **GPT** partíciós tábla (2 TB fölötti lemezek), gyorsabb indítás, **Secure Boot** (csak aláírt rendszerbetöltőt enged elindítani).\n\nA beállítófelületbe bekapcsolás után egy gombbal jutsz be, gyakran `Del`, `F2` vagy `F10`. Itt állíthatod a **rendszerindítási sorrendet** (boot order), a dátumot, a ventilátorokat és a RAM sebességprofilját (XMP/EXPO).',
          warn: 'A sípkódok jelentése **gyártónként eltér** (AMI, Award, Phoenix stb.). Mindig az alaplap kézikönyvében nézd meg, mit jelent az adott sípolás. Általában egy rövid sípszó azt jelenti, hogy a POST rendben lefutott.'
        },
        {
          title: 'Meghajtók: HDD, SATA SSD, NVMe',
          text: '- **HDD** (merevlemez): forgó mágneses lemezek, olcsó és nagy kapacitású, de lassú (kb. 100–250 MB/s) és érzékeny az ütésre.\n- **SATA SSD**: flash-memória, nincs mozgó alkatrész. A SATA-csatolófelület kb. **550 MB/s**-ra korlátozza.\n- **NVMe SSD**: M.2 foglalatba kerül, a **PCIe** buszon kommunikál, ezért többezer MB/s-ra képes.\n\nA lemezt használat előtt **particionálni** és **formázni** kell (fájlrendszert létrehozni). Ezt a következő leckében nézzük meg.',
          tip: 'Egy régi, lassú gépet a legolcsóbban egy HDD → SSD cserével lehet „felgyorsítani”: a rendszerindítás és a programok betöltése többszörösére gyorsul.'
        },
        {
          title: 'Hibaelhárítás módszeresen',
          text: 'A jó szerelő nem találgat, hanem **lépésről lépésre** halad:\n\n1. **Tünet pontos leírása**: mi történik, mióta, mi változott előtte?\n2. **Az egyszerű okok először**: be van dugva? Be van kapcsolva? Jó a kábel?\n3. **Egyszerre egy dolgot változtass**, különben nem tudod, mi segített.\n4. **Cserealkatrész** (ismerten jó RAM, táp, kábel) segít kizárni a hibás részt.\n5. **Dokumentáld**, mit csináltál: legközelebb gyorsabb leszel.\n\nA lecke végén lévő hibakereső pontosan így vezet végig egy „nem indul el a gép” esetet.'
        },
        {
          title: 'Párosítás',
          text: 'Melyik alkatrész mit csinál?',
          widget: { type: 'parositas', options: { title: 'Alkatrészek és feladataik', pairs: [
            ['Processzor (CPU)', 'Végrehajtja a programok utasításait'],
            ['RAM', 'Tárolja a futó programok adatait, kikapcsoláskor törlődik'],
            ['Tápegység', 'A 230 V-ból 12, 5 és 3,3 V egyenfeszültséget állít elő'],
            ['NVMe SSD', 'Gyors háttértár az M.2 foglalatban'],
            ['UEFI', 'A bekapcsoláskor elsőként futó firmware'],
            ['Csuklópánt', 'Elvezeti a sztatikus töltést, véd az ESD ellen'],
            ['Hővezető paszta', 'Kitölti a rést a processzor és a hűtő között']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mire való az antisztatikus csuklópánt?', options: ['Hogy ne csússzon ki a csavarhúzó', 'Hogy a testedben felgyűlt töltés ne az alkatrészeken át süljön ki', 'Hogy ne rázzon meg a 230 V', 'Hogy ne fázzon a kezed'], answer: 1, explain: 'A csuklópánt a gép vázához köti a testedet, így a sztatikus töltés lassan, veszélytelenül kiegyenlítődik.' },
        { q: 'Mit csinál a POST?', options: ['Elküldi az e-maileket', 'Telepíti az operációs rendszert', 'Bekapcsoláskor ellenőrzi a fő hardverelemeket', 'Formázza a lemezt'], answer: 2, explain: 'A Power-On Self-Test önellenőrzés: hiba esetén sípkóddal vagy LED-kóddal jelez.' },
        { q: 'Melyik meghajtó a leggyorsabb általában?', options: ['HDD', 'SATA SSD', 'DVD', 'NVMe SSD'], answer: 3, explain: 'Az NVMe SSD a PCIe buszt használja, így jóval gyorsabb a SATA-korlátos SSD-nél.' }
      ]
    },
    {
      id: 'operacios-rendszerek',
      title: 'Operációs rendszerek: Windows és Linux',
      level: 2, minutes: 16,
      summary: 'Mit csinál az operációs rendszer, fájlrendszerek, felhasználók és jogosultságok, alapvető parancssori parancsok.',
      tags: ['operációs rendszer', 'Windows', 'Linux', 'fájlrendszer', 'NTFS', 'ext4', 'FAT32', 'felhasználó', 'jogosultság', 'chmod', 'sudo', 'parancssor', 'terminál', 'PowerShell'],
      sections: [
        {
          title: 'Mit csinál az operációs rendszer?',
          text: 'Az **operációs rendszer** (OS) a hardver és a programok közötti réteg. Feladatai:\n\n- **Erőforrás-kezelés**: elosztja a processzoridőt és a memóriát a futó programok (folyamatok) között.\n- **Fájlkezelés**: rendszerezi az adatokat a háttértáron.\n- **Eszközkezelés**: az **illesztőprogramok** (driverek) segítségével kezeli a hardvert.\n- **Felhasználókezelés és biztonság**: ki léphet be, és mihez férhet hozzá.\n- **Felhasználói felület**: grafikus (ablakok) vagy parancssoros.\n\nA legelterjedtebbek: **Windows** (irodai gépek, Windows Server), **Linux** (szerverek többsége, pl. Ubuntu, Debian, Red Hat), **macOS**, a telefonokon **Android** (Linux-alapú) és **iOS**.',
          tip: 'A Linux **nyílt forráskódú**: a kódja szabadon megnézhető és módosítható, és a legtöbb disztribúció ingyenes. Ezért fut rajta a webszerverek és a felhőgépek nagy része.'
        },
        {
          title: 'Fájlrendszerek',
          text: 'A **fájlrendszer** határozza meg, hogyan tárolódnak a fájlok és mappák a lemezen. A **formázás** hozza létre.\n\n- **NTFS**: a Windows alapértelmezett fájlrendszere. Tud jogosultságokat, naplózást, nagy fájlokat.\n- **FAT32**: régi, szinte minden eszköz olvassa, de egy fájl legfeljebb **4 GB** lehet.\n- **exFAT**: pendrive-okra, memóriakártyákra, nincs 4 GB-os korlátja.\n- **ext4**: a Linux leggyakoribb fájlrendszere.\n\nWindowsban a meghajtók betűjelet kapnak (`C:`, `D:`). Linuxon **egyetlen fa** van, ami a gyökérkönyvtárból (`/`) indul: a felhasználók mappái a `/home`, a beállítások az `/etc` alatt vannak, a további lemezeket pedig egy mappába **csatoljuk** (mount).',
          warn: 'A formázás **törli** a lemezen lévő adatok elérhetőségét. Mindig háromszor nézd meg, melyik meghajtót választod ki!'
        },
        {
          title: 'Felhasználók és jogosultságok',
          text: 'Minden felhasználó csak ahhoz férjen hozzá, amire a munkájához szüksége van. Ez a **legkisebb jogosultság elve**.\n\n- Windowsban vannak **normál** és **rendszergazda** (Administrator) fiókok. Rendszergazdai műveletnél a **UAC** (felhasználói fiókok felügyelete) rákérdez.\n- Linuxon a mindenható felhasználó a **root**. Egy normál felhasználó a `sudo` paranccsal futtathat egy-egy parancsot rendszergazdaként.\n\nLinuxon minden fájlnak három jogosultsága van, három csoportra: **tulajdonos**, **csoport**, **mindenki más**.\n\n- **r** (read, olvasás) = 4\n- **w** (write, írás) = 2\n- **x** (execute, futtatás) = 1\n\nA `chmod 754 szkript.sh` jelentése: tulajdonos 7 = 4 + 2 + 1 (`rwx`), csoport 5 = 4 + 1 (`r-x`), mindenki más 4 (`r--`). Az `ls -l` ezt így mutatja: `-rwxr-xr--`.',
          tip: 'Ne használd a rendszergazda fiókot a napi munkához! Ha egy kártevő a te nevedben fut, csak annyit tud rombolni, amennyi jogod van.'
        },
        {
          title: 'Parancssor: az első lépések',
          text: 'A rendszergazda sok mindent gyorsabban intéz parancssorból, és távoli szervereken gyakran nincs is grafikus felület. Windowsban a **Parancssor** (`cmd`) vagy a **PowerShell**, Linuxon a **terminál** (pl. `bash`) a parancsértelmező.\n\n- `pwd`: kiírja, melyik mappában vagy (Linux)\n- `ls` (Linux) vagy `dir` (Windows): a mappa tartalma. Az `ls -l` részletesen, jogosultságokkal együtt listáz.\n- `cd mappa`: belépés egy mappába, `cd ..`: egy szinttel feljebb\n- `mkdir uj`: új mappa létrehozása\n- `cp`, `mv`, `rm` (Linux) vagy `copy`, `move`, `del` (Windows): másolás, áthelyezés, törlés\n- `ping 8.8.8.8`: elérhető-e egy gép a hálózaton\n- `ipconfig` (Windows) vagy `ip a` (Linux): a gép IP-címe és hálózati beállításai\n- `sudo apt update` és `sudo apt upgrade`: csomagok frissítése Debian- és Ubuntu-alapú rendszeren',
          warn: 'Az `rm -r` paranccsal törölt fájlok **nem kerülnek a lomtárba**! Parancssorban mindig gondold át, mit írsz, mielőtt Entert nyomsz.'
        },
        {
          title: 'Párosítás',
          text: 'Melyik parancs mit csinál?',
          widget: { type: 'parositas', options: { title: 'Parancsok', pairs: [
            ['`ls -l`', 'Részletes fájllista Linuxon'],
            ['`cd ..`', 'Egy mappaszinttel feljebb lép'],
            ['`ipconfig`', 'IP-beállítások Windowson'],
            ['`ip a`', 'IP-címek Linuxon'],
            ['`ping`', 'Elérhetőség ellenőrzése'],
            ['`sudo`', 'Parancs futtatása rendszergazdaként'],
            ['`chmod`', 'Jogosultságok módosítása'],
            ['`pwd`', 'Az aktuális mappa kiírása']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mekkora lehet legfeljebb egy fájl FAT32 fájlrendszeren?', options: ['4 MB', '4 GB', '2 TB', 'Nincs korlát'], answer: 1, explain: 'A FAT32 fájlonként 4 GB-ot enged, ezért nagy videókhoz exFAT vagy NTFS kell.' },
        { q: 'Mit jelent a `chmod 640` jogosultság?', options: ['Mindenki mindent tehet', 'Tulajdonos: olvas, ír; csoport: olvas; mások: semmi', 'Tulajdonos: semmi; mások: minden', 'Csak futtatni lehet'], answer: 1, explain: '6 = 4 + 2 (rw-), 4 = r--, 0 = ---.' },
        { q: 'Melyik paranccsal nézed meg Linuxon a gép IP-címét?', options: ['`ls`', '`cd`', '`ip a`', '`pwd`'], answer: 2, explain: 'Az `ip a` (ip address) kiírja az összes hálózati csatoló címeit. Windowson ennek az `ipconfig` felel meg.' }
      ]
    },
    {
      id: 'halozatok',
      title: 'Hálózatok: rétegek, IP-címek, alhálózatok',
      level: 3, minutes: 20,
      summary: 'OSI és TCP/IP modell, IPv4-cím, alhálózati maszk, CIDR, alapértelmezett átjáró, DHCP, DNS és NAT.',
      tags: ['OSI', 'TCP/IP', 'IP-cím', 'IPv4', 'IPv6', 'alhálózati maszk', 'subnet', 'CIDR', 'átjáró', 'gateway', 'DHCP', 'DNS', 'NAT', 'MAC-cím', 'port', 'kettes számrendszer'],
      sections: [
        {
          title: 'Rétegmodellek: OSI és TCP/IP',
          text: 'A hálózati kommunikációt **rétegekre** bontjuk. Minden réteg egy feladatot old meg, és csak a szomszédos rétegekkel „beszélget”. Így pl. a böngészőnek nem kell tudnia, hogy kábelen vagy Wi-Fin megy-e az adat.\n\nAz **OSI-modell** 7 rétege (alulról felfelé):\n\n1. **Fizikai**: bitek a kábelen, rádióhullámon (kábel, csatlakozó, jelszint)\n2. **Adatkapcsolati**: keretek a helyi hálózaton, **MAC-cím** alapján (switch)\n3. **Hálózati**: csomagok továbbítása hálózatok között, **IP-cím** alapján (router)\n4. **Szállítási**: **TCP** (megbízható, sorrendhelyes) vagy **UDP** (gyors, nyugtázás nélkül), **portszámok**\n5. **Viszony**: a kapcsolat (munkamenet) felépítése, fenntartása\n6. **Megjelenítési**: kódolás, tömörítés, titkosítás\n7. **Alkalmazási**: a programok protokolljai (HTTP, DNS, SMTP)\n\nA gyakorlatban a **TCP/IP-modellt** használjuk, ami 4 rétegű: **hálózati hozzáférési** (OSI 1–2), **internet** (3), **szállítási** (4), **alkalmazási** (5–7).',
          tip: 'Hibakeresésnél is alulról felfelé haladj: van kábel és link (1.)? Van IP-cím (3.)? Működik a név feloldása (7.)? Ez a „rétegenkénti” hibakeresés.'
        },
        {
          title: 'Az IPv4-cím',
          text: 'Az **IPv4-cím** 32 bites szám, amit 4 darab 8 bites részre (**oktettre**) bontunk, és tízes számrendszerben, pontokkal elválasztva írunk le: pl. `192.168.1.10`. Egy oktett értéke 0 és 255 között lehet, mert 8 biten 2⁸ = 256 érték fér el.\n\nKettes számrendszerben: `192.168.1.10` = `11000000.10101000.00000001.00001010`\n\nNéhány fontos címtartomány:\n\n- **Magáncímek** (otthoni és céges belső hálózat, az interneten nem irányíthatók): `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`\n- `127.0.0.1`: **loopback**, maga a gép („localhost”)\n- `169.254.x.x`: **APIPA**, ezt a Windows akkor adja magának, ha **nem kapott címet a DHCP-szervertől**\n\nAz **IPv6** 128 bites, hexadecimálisan írjuk (pl. `2001:db8::1`), mert az IPv4 kb. 4,3 milliárd címe elfogyott.',
          tip: 'Az oktett bitjeinek helyiértékei balról jobbra: **128, 64, 32, 16, 8, 4, 2, 1**. Pl. 192 = 128 + 64, ezért `11000000`.'
        },
        {
          title: 'Gyakorlás: kettes számrendszer',
          text: 'Az alhálózatok számolásához gyorsan kell tudnod váltani tízes és kettes számrendszer között. Gyakorolj!',
          widget: { type: 'gyakorlas', options: { kind: 'szamrendszer', title: 'Kettes és tizenhatos számrendszer', help: 'Egy oktett 0 és 255 között van. Használd a helyiértékeket: 128, 64, 32, 16, 8, 4, 2, 1. A MAC-címek hexadecimálisak.' } }
        },
        {
          title: 'Alhálózati maszk és CIDR',
          text: 'Az IP-cím két részből áll: **hálózatrész** (melyik hálózat) és **gépcím** (azon belül melyik eszköz). Hogy hol a határ, azt az **alhálózati maszk** mondja meg: ahol a maszkban 1-es bit van, az a hálózatrész.\n\nA **CIDR-jelölés** egyszerűen megadja az 1-es bitek számát: `/24` = `255.255.255.0` = 24 darab egyes, utána 8 nulla.\n\nA gépek száma egy alhálózatban: **2^(gépbitek száma) − 2**, mert a legelső cím a **hálózatcím**, a legutolsó a **szórási (broadcast) cím**, ezeket nem kaphatja meg gép.\n\n- `/24` → `255.255.255.0` → 8 gépbit → 256 − 2 = **254** gép\n- `/25` → `255.255.255.128` → 7 gépbit → **126** gép\n- `/26` → `255.255.255.192` → 6 gépbit → **62** gép\n- `/27` → `255.255.255.224` → 5 gépbit → **30** gép\n- `/28` → `255.255.255.240` → 4 gépbit → **14** gép\n- `/30` → `255.255.255.252` → 2 gépbit → **2** gép (két router összekötésére)'
        },
        {
          title: 'Kidolgozott példa',
          text: 'Adott: `192.168.10.75/26`. Mi a hálózatcím, a szórási cím és a kiosztható tartomány?\n\n1. A `/26` maszk: `255.255.255.192`. Az utolsó oktettben 2 hálózati bit van, így egy alhálózat **64 címet** fog át (256 / 4 = 64).\n2. Az alhálózatok kezdetei: 0, 64, 128, 192. A 75 a **64-es** blokkba esik.\n3. **Hálózatcím**: `192.168.10.64`\n4. **Szórási cím**: a következő blokk előtti cím: `192.168.10.127`\n5. **Kiosztható címek**: `192.168.10.65` – `192.168.10.126` (62 darab)\n\nBinárisan ugyanez: a 75 = `01001011`. A maszk utolsó oktettje `11000000`. Bitenkénti ÉS művelettel: `01000000` = 64, ez a hálózatcím utolsó oktettje.',
          tip: 'A „blokkméret” gyors képlete: **256 − a maszk utolsó nem 255-ös oktettje**. `/26`-nál 256 − 192 = 64, `/28`-nál 256 − 240 = 16.'
        },
        {
          title: 'Átjáró, DHCP, DNS, NAT',
          text: '- **Alapértelmezett átjáró** (default gateway): a router címe a helyi hálózatban, pl. `192.168.1.1`. Ha egy gép olyan címre küld adatot, ami **nincs a saját alhálózatában**, az átjárónak adja oda.\n- **DHCP**: automatikusan kioszt IP-címet, maszkot, átjárót és DNS-szervert. Négy lépése: **Discover, Offer, Request, Acknowledge** (DORA). A cím csak bérletként (lease) jár, egy időre.\n- **DNS**: a „telefonkönyv”, a neveket (`www.pelda.hu`) IP-címekre fordítja. Ha a `ping 8.8.8.8` működik, de a weboldalak nem jönnek be, gyakran a DNS a hibás.\n- **NAT** (hálózati címfordítás): az otthoni router a belső magáncímeket **egyetlen nyilvános IP-címre** fordítja, amikor kimész az internetre. Ezért lehet egy háztartásban egy nyilvános címmel 20 eszköz is.\n\nNéhány gyakori **port**: HTTP 80, HTTPS 443, SSH 22, DNS 53, DHCP 67/68, RDP 3389.',
          warn: 'Fix (statikus) IP-címet csak a DHCP-tartományon **kívül** adj meg egy nyomtatónak vagy szervernek, különben címütközés lesz: két eszköz ugyanazt a címet kapja, és egyik sem működik rendesen.'
        }
      ],
      quiz: [
        { q: 'Hány kiosztható gépcím van egy /24-es alhálózatban?', options: ['256', '255', '254', '24'], answer: 2, explain: '2⁸ = 256 cím, ebből a hálózatcím és a szórási cím nem osztható ki: 254.' },
        { q: 'Mit jelent, ha egy Windows gép címe 169.254.12.7?', options: ['Kapcsolódott az internethez', 'Nem kapott címet a DHCP-szervertől', 'Ez a router címe', 'IPv6-cím'], answer: 1, explain: 'A 169.254.x.x (APIPA) címet a gép magának adja, ha nem érte el a DHCP-szervert.' },
        { q: 'Melyik szolgáltatás fordítja a domainneveket IP-címre?', options: ['DHCP', 'NAT', 'DNS', 'VPN'], answer: 2, explain: 'A DNS a hálózat „telefonkönyve”.' }
      ]
    },
    {
      id: 'halozati-eszkozok',
      title: 'Hálózati eszközök és kábelezés',
      level: 2, minutes: 14,
      summary: 'Switch, router, access point, UTP-kábelek kategóriái, RJ45-bekötés a T568B szabvány szerint, Wi-Fi-sávok.',
      tags: ['switch', 'router', 'access point', 'hozzáférési pont', 'UTP', 'Cat5e', 'Cat6', 'RJ45', 'T568B', 'T568A', 'krimpelés', 'Wi-Fi', '2,4 GHz', '5 GHz', 'PoE', 'optikai kábel'],
      sections: [
        {
          title: 'Switch, router, access point',
          text: '- **Switch** (kapcsoló): a **helyi hálózat** gépeit köti össze. Megjegyzi, melyik portján melyik **MAC-cím** van, és csak oda küldi a keretet (OSI 2. réteg). A régi **hub** ezzel szemben mindent minden portra kiküldött.\n- **Router** (útválasztó): **különböző hálózatokat** köt össze, pl. a belső hálózatot az internettel, az **IP-cím** alapján (OSI 3. réteg). Ő az alapértelmezett átjáró.\n- **Access point** (AP, vezeték nélküli hozzáférési pont): a Wi-Fi-eszközöket kapcsolja a vezetékes hálózatba.\n\nAz otthoni „Wi-Fi-router” valójában **mindhárom egyben**: router + néhány portos switch + access point, ráadásul DHCP-szerver, NAT és tűzfal is.',
          tip: 'Céges hálózatban gyakori a **PoE** (Power over Ethernet): a switch a hálózati kábelen áramot is ad, így az access pointot, IP-kamerát, IP-telefont nem kell külön konnektorba dugni.'
        },
        {
          title: 'UTP-kábelek',
          text: 'A legtöbb vezetékes hálózat **UTP** (árnyékolatlan csavart érpáras) kábellel készül. 4 érpár van benne, a párok **össze vannak sodorva**, ez csökkenti a zavarokat (áthallást).\n\n- **Cat5e**: 1 Gbit/s, 100 m-ig\n- **Cat6**: 1 Gbit/s 100 m-ig, rövidebb (kb. 55 m-es) szakaszon 10 Gbit/s\n- **Cat6a**: 10 Gbit/s 100 m-ig\n\nEgy szakasz (a switchtől a végpontig) legfeljebb **100 m** lehet. Ennél nagyobb távolságra, épületek között **optikai kábelt** használnak: fényt visz, nem zavarja az elektromágneses tér, és kilométereket is áthidal.\n\nÁrnyékolt változatok: **FTP, STP** (fóliával, fonattal árnyékolt), zajos ipari környezetbe.',
          warn: 'A hálózati kábelt ne vezesd közvetlenül az erősáramú (230 V-os) kábelek mellett hosszú szakaszon, és ne hajlítsd meg élesen: mindkettő zavarokat és sebességcsökkenést okoz.'
        },
        {
          title: 'RJ45-bekötés: T568B',
          text: 'A kábel végére **RJ45** csatlakozót (8P8C) préselünk **krimpelőfogóval**. A vezetékek sorrendjét szabvány rögzíti. A leggyakoribb a **T568B**. A csatlakozót úgy tartsd, hogy a **rögzítőfül lefelé** nézzen, az érintkezők feléd, és balról jobbra számolj:\n\n1. fehér-narancs\n2. narancs\n3. fehér-zöld\n4. kék\n5. fehér-kék\n6. zöld\n7. fehér-barna\n8. barna\n\nA **T568A** csak annyiban más, hogy a narancs és a zöld pár helyet cserél (fehér-zöld, zöld, fehér-narancs, kék, fehér-kék, narancs, fehér-barna, barna).\n\nHa a kábel mindkét vége T568B, az **egyenes kábel** (patch kábel): ez kell gép és switch közé. Ha az egyik vége A, a másik B, az a régi **kereszt kábel** (crossover). A mai eszközök (**Auto-MDIX**) ezt már maguk megoldják.',
          tip: 'Krimpelés után mindig ellenőrizd a kábelt **kábelteszterrel**: a 8 LED-nek sorban, 1-től 8-ig kell felvillannia mindkét oldalon. Egy épületen belül mindig ugyanazt a szabványt használd!'
        },
        {
          title: 'Wi-Fi: 2,4 GHz és 5 GHz',
          text: 'A Wi-Fi rádióhullámokon kommunikál, több frekvenciasávban:\n\n- **2,4 GHz**: nagyobb **hatótáv**, jobban átjut a falakon, de lassabb, és zsúfolt (mikrohullámú sütő, Bluetooth is itt van). Csak 3 nem átfedő csatorna van: **1, 6, 11**.\n- **5 GHz**: **gyorsabb**, sok csatorna, kevesebb zavar, de kisebb a hatótáv, a falak jobban csillapítják.\n- **6 GHz** (Wi-Fi 6E, Wi-Fi 7): még több szabad csatorna, még kisebb hatótáv.\n\nA szabványok új nevei: Wi-Fi 4 (802.11n), Wi-Fi 5 (802.11ac), Wi-Fi 6 (802.11ax), Wi-Fi 7 (802.11be).\n\nBiztonság: használj **WPA2** vagy inkább **WPA3** titkosítást, erős jelszóval. A régi **WEP** percek alatt feltörhető, a **WPS** gombos párosítást pedig érdemes kikapcsolni.',
          tip: 'Ha a lakás egyik végében gyenge a Wi-Fi, egy **mesh** rendszer (több, egymással együttműködő AP) vagy egy kábellel bekötött második access point sokkal jobb, mint egy olcsó „jelerősítő”, ami felezi a sebességet.'
        },
        {
          title: 'Párosítás',
          text: 'Párosítsd az eszközt vagy fogalmat a jellemzőjével!',
          widget: { type: 'parositas', options: { title: 'Hálózati eszközök', pairs: [
            ['Switch', 'MAC-cím alapján továbbít a helyi hálózaton'],
            ['Router', 'IP-cím alapján hálózatok között továbbít'],
            ['Access point', 'Wi-Fi-eszközöket kapcsol a vezetékes hálózatba'],
            ['T568B 1. ér', 'fehér-narancs'],
            ['Cat6a', '10 Gbit/s 100 m-ig'],
            ['2,4 GHz', 'Nagyobb hatótáv, lassabb'],
            ['5 GHz', 'Gyorsabb, kisebb hatótáv'],
            ['PoE', 'Áramellátás a hálózati kábelen']
          ] } }
        }
      ],
      quiz: [
        { q: 'Mi a T568B szabvány szerinti első ér színe?', options: ['fehér-zöld', 'fehér-narancs', 'kék', 'barna'], answer: 1, explain: 'T568B: fehér-narancs, narancs, fehér-zöld, kék, fehér-kék, zöld, fehér-barna, barna.' },
        { q: 'Milyen hosszú lehet legfeljebb egy UTP-szakasz?', options: ['10 m', '50 m', '100 m', '1 km'], answer: 2, explain: 'A rézalapú Ethernet szakaszhossza 100 m. Ennél nagyobb távra optikai kábel kell.' },
        { q: 'Melyik eszköz köti össze a helyi hálózatot az internettel?', options: ['Switch', 'Hub', 'Router', 'Kábelteszter'], answer: 2, explain: 'A router különböző hálózatok között irányítja a csomagokat, IP-cím alapján.' }
      ]
    },
    {
      id: 'szerverek',
      title: 'Szerverek és szolgáltatások',
      level: 3, minutes: 15,
      summary: 'Virtualizáció, fájl- és webszerver, mentés a 3-2-1 szabály szerint, RAID 0/1/5, felhőszolgáltatások.',
      tags: ['szerver', 'virtualizáció', 'virtuális gép', 'hypervisor', 'konténer', 'fájlszerver', 'webszerver', 'mentés', 'backup', '3-2-1', 'RAID', 'NAS', 'felhő', 'IaaS', 'PaaS', 'SaaS'],
      sections: [
        {
          title: 'Mi a szerver?',
          text: 'A **szerver** olyan számítógép (vagy program), amely **szolgáltatást nyújt** más gépeknek, a **klienseknek**. A szervergépek a hétköznapi PC-hez hasonlóak, de folyamatos üzemre készülnek:\n\n- **ECC memória**, ami a memóriahibákat felismeri és kijavítja\n- **redundáns** (kettőzött) tápegység és lemezek, menet közben cserélhetők (hot-swap)\n- **távfelügyelet**: akkor is elérhető a hálózaton, ha az operációs rendszer leállt\n- rackszekrénybe szerelhető ház, szünetmentes táp (**UPS**), légkondicionált szerverterem\n\nGyakori szolgáltatások: **fájlszerver** (közös mappák, Windowsban SMB-protokollal), **webszerver** (pl. Apache, nginx, IIS: weboldalakat szolgál ki HTTP/HTTPS-en), **levelezőszerver**, **adatbázis-szerver**, **címtár** (pl. Active Directory: központi felhasználó- és gépkezelés), DHCP- és DNS-szerver.'
        },
        {
          title: 'Virtualizáció',
          text: 'Egy erős fizikai gépen több **virtuális gép** (VM) futhat egyszerre, mindegyik saját operációs rendszerrel. Ezt a **hypervisor** teszi lehetővé, ami szétosztja köztük a processzort, a memóriát és a lemezt.\n\n- **1-es típusú** (bare-metal) hypervisor közvetlenül a hardveren fut: pl. VMware ESXi, Microsoft Hyper-V, Proxmox VE (KVM). Ez kell szerverekre.\n- **2-es típusú** hypervisor egy meglévő operációs rendszeren fut alkalmazásként: pl. VirtualBox. Tanuláshoz, teszteléshez ideális.\n\nElőnyök: jobb kihasználtság, kevesebb fizikai gép (kevesebb áram, hely), **pillanatkép** (snapshot) frissítés előtt, gyors visszaállítás, a VM-ek áthelyezhetők másik gépre.\n\nA **konténerek** (pl. Docker) még könnyebbek: nem saját operációs rendszert futtatnak, hanem a gazdagép rendszermagját osztják meg, és csak az alkalmazást és annak függőségeit csomagolják.',
          tip: 'Telepíts egy VirtualBoxot, és benne próbálj ki egy Linuxot! Ha elrontasz valamit, csak visszaállsz a pillanatképre. Ez a legjobb gyakorlóterep.'
        },
        {
          title: 'RAID: több lemez együtt',
          text: 'A **RAID** több lemezt kapcsol össze egy logikai egységgé, a gyorsaság vagy a hibatűrés kedvéért.\n\n- **RAID 0** (csíkozás, striping): az adat felváltva kerül a lemezekre. **Gyors**, a teljes kapacitás használható, de **ha egy lemez tönkremegy, minden adat elvész**.\n- **RAID 1** (tükrözés, mirroring): minden adat **két lemezen** is megvan. Egy lemez kiesését túléli, de a kapacitás csak egy lemeznyi.\n- **RAID 5** (paritásos csíkozás): legalább **3 lemez**, az adatok mellett paritásinformáció is tárolódik, elosztva. **Egy lemez** kiesését túléli. Hasznos kapacitás: (n − 1) lemeznyi, pl. 4 × 4 TB-ból 12 TB.\n\nA **NAS** (hálózati tároló) egy kis, fájlszerverként működő doboz, benne általában RAID-be kötött lemezekkel.',
          warn: '**A RAID nem mentés!** Ha véletlenül törölsz egy fájlt, vagy zsarolóvírus titkosítja, a RAID ezt a „hibát” is azonnal tükrözi az összes lemezre. A RAID csak a lemez meghibásodása ellen véd.'
        },
        {
          title: 'Mentés: a 3-2-1 szabály',
          text: 'Az adatvesztés nem az, „ha”, hanem az, „mikor”. A bevált **3-2-1 szabály**:\n\n- **3** példány legyen az adatból (az eredeti + 2 mentés),\n- **2** különböző típusú adathordozón (pl. NAS és külső lemez vagy szalag),\n- **1** példány **másik helyszínen** (pl. felhőben vagy egy másik telephelyen), tűz, betörés vagy árvíz esetére.\n\nMentéstípusok:\n\n- **Teljes**: minden adatot ment. Lassú, sok helyet foglal, de a visszaállítás egyszerű.\n- **Növekményes** (inkrementális): csak az **előző mentés óta** változott fájlokat menti.\n- **Különbözeti** (differenciális): az **utolsó teljes mentés óta** változott fájlokat menti.\n\nZsarolóvírusok ellen fontos, hogy legyen olyan mentés, ami **nincs folyamatosan csatlakoztatva** (offline) vagy **nem módosítható**.',
          tip: 'Egy mentés csak akkor ér valamit, ha **vissza is lehet állítani**. Rendszeresen próbáld ki a visszaállítást egy tesztgépen!'
        },
        {
          title: 'A felhő',
          text: 'A **felhő** (cloud) azt jelenti, hogy a szervereket nem te üzemelteted, hanem egy szolgáltató adatközpontjában **bérled**, és az interneten éred el. Annyit fizetsz, amennyit használsz, és percek alatt bővíthetsz.\n\n- **IaaS** (infrastruktúra szolgáltatásként): virtuális gépet, hálózatot, tárhelyet bérelsz, az operációs rendszert te kezeled.\n- **PaaS** (platform szolgáltatásként): kész futtatókörnyezetet kapsz, csak az alkalmazásodat töltöd fel.\n- **SaaS** (szoftver szolgáltatásként): kész programot használsz a böngészőben, pl. webes levelezőt, irodai programcsomagot.\n\nA felhőben is a **te felelősséged** a jó jelszó, a jogosultságok és az adataid mentése. Személyes adatoknál számít az is, melyik országban vannak a szerverek.'
        }
      ],
      quiz: [
        { q: 'Melyik RAID-szint nem nyújt semmilyen hibatűrést?', options: ['RAID 0', 'RAID 1', 'RAID 5', 'Mindegyik nyújt'], answer: 0, explain: 'A RAID 0 csak csíkoz: gyors, de egy lemez kiesésekor minden adat elvész.' },
        { q: 'Mit jelent a 3-2-1 mentési szabályban az „1”?', options: ['Naponta egy mentés', 'Egy példány másik helyszínen', 'Egy lemezből álló RAID', 'Egy rendszergazda'], answer: 1, explain: 'Egy másolat legyen fizikailag máshol, hogy egy tűz vagy betörés se vigyen el mindent.' },
        { q: 'Mi a hypervisor?', options: ['Egy vírusirtó', 'A virtuális gépeket futtató és felügyelő szoftver', 'Egy gyors SSD', 'A szerverterem vezetője'], answer: 1, explain: 'A hypervisor osztja szét a fizikai gép erőforrásait a virtuális gépek között.' }
      ]
    },
    {
      id: 'biztonsag',
      title: 'Informatikai biztonság',
      level: 2, minutes: 15,
      summary: 'Tűzfal, frissítések, jelszópolitika, többfaktoros hitelesítés, VPN, adathalászat, zsarolóvírus, naplózás.',
      tags: ['informatikai biztonság', 'tűzfal', 'frissítés', 'patch', 'jelszó', 'jelszókezelő', 'MFA', 'kétlépcsős azonosítás', 'VPN', 'adathalászat', 'phishing', 'zsarolóvírus', 'ransomware', 'naplózás', 'log', 'CIA'],
      sections: [
        {
          title: 'A biztonság három alapcélja',
          text: 'Az informatikai biztonság három alapcélját angol kezdőbetűikből **CIA**-nak hívják:\n\n- **Bizalmasság** (Confidentiality): az adatot csak az láthatja, akinek szabad.\n- **Sértetlenség** (Integrity): az adatot senki nem módosíthatja észrevétlenül.\n- **Rendelkezésre állás** (Availability): a rendszer akkor működjön, amikor szükség van rá.\n\nA védelem **rétegekből** áll („mélységi védelem”): ha egy réteg átszakad, a következő még megállítja a támadót.'
        },
        {
          title: 'Tűzfal és frissítések',
          text: 'A **tűzfal** szabályok alapján engedi vagy tiltja a hálózati forgalmat (pl. forrás- és cél-IP-cím, port, protokoll szerint). Alapelv: **minden tilos, ami nincs kifejezetten engedélyezve**. Van **hálózati tűzfal** (a router vagy egy külön eszköz a hálózat határán) és **gépi tűzfal** (pl. Windows Defender tűzfal, Linuxon `ufw`).\n\nA **frissítések** (patchek) a felfedezett biztonsági réseket javítják. A támadók a nyilvánosságra került hibákat napokon belül kihasználják, ezért a frissítéseket **gyorsan, tervezetten** kell telepíteni: operációs rendszer, böngésző, router firmware, szerverprogramok egyaránt.',
          tip: 'Céges környezetben a frissítéseket először néhány tesztgépen telepítik, és csak ha minden rendben, akkor az összes gépre. Így egy hibás frissítés nem állítja le az egész céget.'
        },
        {
          title: 'Jelszavak és többfaktoros hitelesítés',
          text: 'Egy jó **jelszópolitika**:\n\n- **Hosszú** jelszó (legalább 12–16 karakter). Egy több szóból álló jelmondat könnyen megjegyezhető és nehezen törhető.\n- **Minden szolgáltatáshoz más** jelszó, hogy egy kiszivárgott jelszóval ne lehessen máshova is belépni.\n- **Jelszókezelő** program, ami megjegyzi és generálja őket.\n- A gyári (alapértelmezett) jelszavakat azonnal meg kell változtatni, pl. a routeren.\n\nA **többfaktoros hitelesítés** (MFA, kétlépcsős azonosítás) a jelszó mellé még egy tényezőt kér:\n\n- amit **tudsz** (jelszó, PIN),\n- ami **nálad van** (telefonos hitelesítő alkalmazás, biztonsági kulcs),\n- ami **te vagy** (ujjlenyomat, arc).\n\nÍgy egy ellopott jelszó önmagában nem elég a belépéshez.',
          warn: 'Senki (rendszergazda, bank, futárcég) nem kéri jogosan a jelszavadat vagy az egyszer használatos kódodat. Ha valaki kéri, az csalás.'
        },
        {
          title: 'VPN',
          text: 'A **VPN** (virtuális magánhálózat) **titkosított alagutat** épít két pont között a nyilvános interneten keresztül. Így egy otthonról dolgozó kolléga úgy éri el a céges belső hálózatot, mintha az irodában ülne, és a forgalmát a nyilvános Wi-Fin sem lehet lehallgatni.\n\nKét gyakori felhasználás: **távoli hozzáférés** (egy felhasználó csatlakozik a céghez) és **telephelyek összekötése** (site-to-site: két iroda hálózata egy alagúton).'
        },
        {
          title: 'Adathalászat és zsarolóvírus',
          text: 'A legtöbb támadás nem bonyolult technikai trükkel, hanem **emberi tévedéssel** kezdődik.\n\n**Adathalászat** (phishing): hamis e-mail, SMS vagy weboldal, ami megtévesztésig hasonlít egy valódira, és belépési adatokat, kártyaadatot kér, vagy kártevőt telepíttet. Gyanús jelek:\n\n- **sürgetés**, fenyegetés („24 órán belül letiltjuk a fiókod”)\n- a feladó címe vagy a link címe **kicsit eltér** a valóditól (pl. betűcsere)\n- váratlan csatolmány, számla, csomagértesítő\n- jelszó vagy kód kérése\n\n**Zsarolóvírus** (ransomware): titkosítja a gép és a hálózati meghajtók fájljait, majd váltságdíjat követel. A legjobb védekezés: **naprakész frissítések**, **legkisebb jogosultság**, felhasználói **oktatás** és **offline mentés**, amiből vissza lehet állni.',
          tip: 'Ha egy linkre kattintanál, előbb vidd fölé az egeret (vagy telefonon nyomd hosszan), és nézd meg, valójában hova mutat.'
        },
        {
          title: 'Naplózás és felügyelet',
          text: 'A **naplók** (logok) rögzítik, mi történt a rendszerben: belépések, sikertelen próbálkozások, hibák, szolgáltatások indulása. Windowsban az **Eseménynapló** (Event Viewer), Linuxon a `journalctl` parancs és a `/var/log` mappa tartalmazza őket.\n\nA rendszergazda a naplókból veszi észre például, ha valaki éjjel százszor próbál belépni egy fiókba. Nagyobb helyen a naplókat egy központi gyűjtőrendszerbe küldik, ami riaszt is (**SIEM**). Fontos, hogy a naplók pontos **időbélyeget** kapjanak (szinkronizált óra, NTP), és a támadó ne tudja őket törölni.'
        },
        {
          title: 'Párosítás',
          text: 'Melyik védekezés melyik veszély ellen segít leginkább?',
          widget: { type: 'parositas', options: { title: 'Veszély és védekezés', pairs: [
            ['Ellopott jelszó', 'Többfaktoros hitelesítés (MFA)'],
            ['Zsarolóvírus', 'Offline mentés, amiből vissza lehet állni'],
            ['Ismert biztonsági rés', 'Frissítések telepítése'],
            ['Lehallgatás nyilvános Wi-Fin', 'VPN'],
            ['Kéretlen bejövő kapcsolat', 'Tűzfal'],
            ['Adathalász e-mail', 'Felhasználói oktatás, a link ellenőrzése'],
            ['Észrevétlen betörési kísérlet', 'Naplózás és riasztás']
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik a legerősebb jelszó?', options: ['Jelszo123', 'qwerty', 'kek-bicikli-hajnal-tarsasjatek', 'P@ss1'], answer: 2, explain: 'A hossz számít leginkább: egy négyszavas jelmondat sokkal nehezebben törhető, mint egy rövid, „bonyolultnak látszó” jelszó.' },
        { q: 'Mi a többfaktoros hitelesítés lényege?', options: ['Kétszer kell beírni a jelszót', 'A jelszó mellé egy másik típusú tényező is kell, pl. telefonos kód', 'Két felhasználónév kell', 'A jelszó kétszer olyan hosszú'], answer: 1, explain: 'Két különböző típusú tényező kell (tudás + birtok vagy biometria), így egy ellopott jelszó nem elég.' },
        { q: 'Mi véd leginkább a zsarolóvírus okozta adatvesztés ellen?', options: ['RAID 1', 'Erősebb processzor', 'Offline, rendszeresen tesztelt mentés', 'Nagyobb monitor'], answer: 2, explain: 'A RAID a titkosított fájlokat is tükrözi. Csak egy elérhetetlen, visszaállítható mentés segít.' }
      ]
    }
  ]
});

/* Hibakereső fák */
STUDIE.addTrouble({
  id: 'rendszeruzem-nincs-internet',
  title: 'Nincs internet',
  lessons: ['rendszeruzem/halozatok', 'rendszeruzem/halozati-eszkozok'],
  intro: 'Haladj **alulról felfelé**, ahogy a rétegmodell tanítja: fizikai kapcsolat, IP-cím, helyi hálózat, internet, végül a névfeloldás. A parancsokat Windowson a Parancssorban, Linuxon a terminálban futtasd.',
  start: 'kapcsolat',
  nodes: {
    kapcsolat: { q: 'Hogyan csatlakozik a gép a hálózathoz?', answers: [
      { t: 'Kábellel', next: 'kabel' },
      { t: 'Wi-Fin', next: 'wifi' }] },
    kabel: { q: 'Világít vagy villog a hálózati csatlakozó mellett a link-LED, a gépen és a switchen/routeren is?', check: 'Nézd meg a LED-eket a gép hálózati csatlakozójánál és a switch adott portjánál. Az operációs rendszer tálcáján a hálózati ikon „kábel kihúzva” jelzést is mutathat.', answers: [
      { t: 'Nem világít', next: 'r_kabel' },
      { t: 'Világít', next: 'ipcim' }] },
    wifi: { q: 'Csatlakozva van a gép a megfelelő Wi-Fi-hálózathoz?', check: 'Nézd meg a hálózati ikont: a helyes hálózatnév (SSID) mellett „Csatlakozva” felirat legyen. Nézd meg, nincs-e bekapcsolva a repülőgép üzemmód.', answers: [
      { t: 'Nem, vagy nem tud csatlakozni', next: 'r_wifi' },
      { t: 'Igen, csatlakozva van', next: 'ipcim' }] },
    ipcim: { q: 'Milyen IP-címet kapott a gép?', check: 'Futtasd az `ipconfig` (Windows) vagy `ip a` (Linux) parancsot, és nézd meg a használt csatoló IPv4-címét.', answers: [
      { t: '169.254.x.x vagy nincs IPv4-cím', next: 'r_dhcp' },
      { t: 'Rendes cím, pl. 192.168.1.23', next: 'atjaro' }] },
    atjaro: { q: 'Válaszol a ping az alapértelmezett átjárónak (a routernek)?', check: 'Az átjáró címét az `ipconfig` kimenetében találod („Alapértelmezett átjáró”), Linuxon az `ip route` parancs mutatja („default via…”). Utána: `ping 192.168.1.1` (a saját átjáród címével).', answers: [
      { t: 'Nem válaszol (időtúllépés vagy „nem érhető el”)', next: 'r_atjaro' },
      { t: 'Válaszol', next: 'kulso' }] },
    kulso: { q: 'Válaszol egy internetes IP-cím, pl. a `ping 8.8.8.8`?', check: 'A 8.8.8.8 egy nyilvános DNS-szerver címe. Itt még nem használunk nevet, csak IP-címet, így a DNS-t kizárjuk.', answers: [
      { t: 'Nem válaszol', next: 'r_szolgaltato' },
      { t: 'Válaszol', next: 'dns' }] },
    dns: { q: 'Működik a névfeloldás? Pl. válaszol a `ping www.google.com`, vagy ad címet az `nslookup www.google.com`?', check: 'Ha a név helyett hibaüzenetet kapsz („nem található a gazdagép”), a DNS a gond.', answers: [
      { t: 'Nem, a nevet nem tudja feloldani', next: 'r_dns' },
      { t: 'Igen, a név is működik', next: 'r_bongeszo' }] },
    r_kabel: { result: 'Fizikai hiba: kábel, csatlakozó vagy port', fix: '- Nézd meg, mindkét végén bent van-e a kábel (kattanásig).\n- Próbálj ki egy **másik, ismerten jó kábelt** és egy másik switchportot.\n- Saját krimpelésű kábelt ellenőrizz **kábelteszterrel** (T568B sorrend!).\n- Nézd meg, a router és a switch be van-e kapcsolva.\n- Ha semmi sem segít, a gép hálózati kártyája vagy a driver lehet hibás: nézd meg az Eszközkezelőben.', level: 'ok' },
    r_wifi: { result: 'Wi-Fi-csatlakozási hiba', fix: '- Kapcsold ki a **repülőgép üzemmódot**, és kapcsold be a Wi-Fit.\n- Ellenőrizd a **jelszót** (kis- és nagybetű!).\n- Menj közelebb a routerhez: lehet, hogy túl gyenge a jel (az 5 GHz-es sáv hatótávja kisebb).\n- „Felejtsd el” a hálózatot, és csatlakozz újra.\n- Indítsd újra a routert és a gépet.\n- Ha más eszköz sem tud csatlakozni, a router vagy az access point a hibás.', level: 'ok' },
    r_dhcp: { result: 'A gép nem kapott címet a DHCP-szervertől', fix: 'A 169.254-gyel kezdődő (APIPA) cím azt jelenti, hogy a gép nem érte el a DHCP-szervert.\n\n- Windowson próbáld meg: `ipconfig /release`, majd `ipconfig /renew`.\n- Indítsd újra a routert (otthon általában ő a DHCP-szerver).\n- Nézd meg, nincs-e beállítva kézzel rossz cím a gépen: a hálózati adapter IPv4-beállításainál legyen „automatikus”.\n- Céges hálózaton lehet, hogy **elfogyott** a DHCP-tartomány címkészlete, vagy rossz VLAN-ba került a port: szólj a rendszergazdának.', level: 'warn' },
    r_atjaro: { result: 'A gép nem éri el a routert', fix: '- Nézd meg, hogy a gép címe és az átjáró címe **ugyanabban az alhálózatban** van-e (azonos hálózatrész a maszk szerint).\n- Kézi beállításnál könnyű elírni az átjárót vagy a maszkot.\n- Indítsd újra a routert.\n- Lehet, hogy a gép **tűzfala** vagy a router tiltja a pinget: ilyenkor próbáld meg a router webes felületét böngészőből megnyitni.\n- Ha más gépek sem érik el, a router vagy a switch hibás.', level: 'warn' },
    r_szolgaltato: { result: 'A helyi hálózat jó, de nincs kijutás az internetre', fix: '- Nézd meg a router állapotjelzőit és a webes felületét: van-e **WAN/internetkapcsolat**, kapott-e nyilvános IP-címet.\n- Indítsd újra a **modemet és a routert** (előbb a modemet, aztán a routert).\n- Ellenőrizd a modem és a router közötti kábelt.\n- Nézd meg az internetszolgáltató oldalán vagy telefonos ügyfélszolgálatán, nincs-e **hálózati hiba** a környéken.\n- Céges hálózaton a tűzfal vagy a proxy szabályai is okozhatják.', level: 'warn' },
    r_dns: { result: 'DNS-hiba: az IP-címek elérhetők, a nevek nem', fix: '- Nézd meg az `ipconfig /all` kimenetében, milyen **DNS-szerver** van beállítva.\n- Állítsd a DNS-t „automatikusra”, vagy próbálj ki egy megbízható nyilvános DNS-szervert.\n- Windowson ürítsd a DNS-gyorsítótárat: `ipconfig /flushdns`.\n- Indítsd újra a routert, mert gyakran ő a DNS-továbbító.\n- Céges hálózaton a belső DNS-szerver állhatott le: szólj a rendszergazdának.', level: 'ok' },
    r_bongeszo: { result: 'A hálózat működik: a hiba a böngészőben vagy az adott weboldalnál van', fix: '- Próbálj ki **másik böngészőt** vagy privát ablakot.\n- Kapcsold ki ideiglenesen a böngészőbővítményeket, töröld a gyorsítótárat.\n- Nézd meg, nincs-e beállítva rossz **proxy** a rendszerben.\n- Ha csak egy weboldal nem jön be, lehet, hogy az a szolgáltatás áll le, nem a te hálózatod.', level: 'ok' }
  }
});

STUDIE.addTrouble({
  id: 'rendszeruzem-nem-indul',
  title: 'Nem indul el a számítógép',
  lessons: ['rendszeruzem/hardver'],
  intro: 'Haladj a legegyszerűbb okoktól a bonyolultabbak felé. Mielőtt a gépházat kinyitod, **húzd ki a tápkábelt**, és használj **antisztatikus csuklópántot**. A tápegységet soha ne szedd szét!',
  start: 'tap',
  nodes: {
    tap: { q: 'Mi történik, amikor megnyomod a bekapcsológombot?', answers: [
      { t: 'Semmi: nem pörög ventilátor, nem világít semmi', next: 'aram' },
      { t: 'Elindulnak a ventilátorok, de rögtön le is áll', next: 'r_zarlat' },
      { t: 'Elindulnak a ventilátorok, és sípol', next: 'sip' },
      { t: 'Elindulnak a ventilátorok, nem sípol, de a monitor fekete', next: 'kijelzo' },
      { t: 'Elindul, de hibaüzenettel megáll: nincs rendszerindító eszköz', next: 'boot' }] },
    aram: { q: 'Van áram a konnektorban, és be van kapcsolva a tápegység hátulján a kapcsoló?', check: 'Próbáld ki a konnektort egy másik eszközzel (pl. lámpával). Nézd meg a hosszabbító kapcsolóját és a tápegység hátsó, I/O jelű billenőkapcsolóját.', answers: [
      { t: 'Nem volt bekapcsolva vagy nincs áram', next: 'r_aram' },
      { t: 'Van áram, minden be van kapcsolva', next: 'elolap' }] },
    elolap: { q: 'Jól van bekötve az előlapi bekapcsológomb és a 24 tűs, valamint a 8 tűs CPU-tápcsatlakozó?', check: 'Kihúzott tápkábel mellett nézd meg az alaplap kézikönyve szerint a „PWR_SW” tüskéket, és hogy a nagy tápcsatlakozók kattanásig be vannak-e nyomva.', answers: [
      { t: 'Laza vagy rossz helyen volt', next: 'r_bekotes' },
      { t: 'Minden rendben bekötve', next: 'r_tap' }] },
    sip: { q: 'Milyen a sípolás?', check: 'Számold meg a sípszókat, figyeld a rövid és hosszú hangokat, és keresd ki az alaplap kézikönyvében. Ha van az alaplapon hibajelző LED (CPU, DRAM, VGA, BOOT), nézd meg, melyik világít.', answers: [
      { t: 'Memóriahibát jelez (vagy a DRAM-LED világít)', next: 'ram' },
      { t: 'Videokártya-hibát jelez (vagy a VGA-LED világít)', next: 'r_vga' },
      { t: 'Egy rövid sípszó, utána mégsincs kép', next: 'kijelzo' }] },
    ram: { q: 'Segít, ha a RAM-modulokat kiveszed és újra, kattanásig betolod, vagy egyenként próbálod ki őket?', check: 'Kihúzott tápkábellel, csuklópánttal dolgozz. Próbálj **egyetlen modullal** indítani, a kézikönyvben ajánlott foglalatban, majd cseréld a modult.', answers: [
      { t: 'Igen, így elindul', next: 'r_ram_kontakt' },
      { t: 'Egyik modullal sem indul', next: 'r_ram_csere' }] },
    kijelzo: { q: 'Biztosan jó helyre csatlakozik a monitor, és be van kapcsolva a jó bemenetre?', check: 'Ha van külön videokártya, a monitort **arra** kell kötni, ne az alaplap kimenetére. Nézd meg a monitor menüjében a bemenetet (HDMI, DisplayPort), és próbálj ki másik kábelt.', answers: [
      { t: 'Rossz kimenetre vagy bemenetre volt kötve', next: 'r_monitor' },
      { t: 'Jó helyen van, mégsincs kép', next: 'ram' }] },
    boot: { q: 'Látja a gép a lemezt az UEFI/BIOS beállításaiban?', check: 'Bekapcsoláskor nyomd a `Del` vagy `F2` gombot, és nézd meg a tárolóeszközök listáját és a rendszerindítási sorrendet (boot order).', answers: [
      { t: 'Nem látja a lemezt', next: 'r_lemez' },
      { t: 'Látja, de nem arról indul', next: 'r_bootsorrend' }] },
    r_aram: { result: 'Nem kapott áramot a gép', fix: 'Kapcsold be a hosszabbítót és a tápegység hátsó kapcsolóját, vagy használj működő konnektort. Ha a túlfeszültség-védős hosszabbító kioldott, nézd meg, miért.', level: 'ok' },
    r_bekotes: { result: 'Laza vagy rosszul bekötött csatlakozó', fix: 'Kihúzott tápkábel mellett dugd vissza kattanásig a 24 tűs alaplapi és a 8 tűs CPU-tápcsatlakozót, és kösd be helyesen az előlapi gombot a kézikönyv szerint.', level: 'ok' },
    r_tap: { result: 'Valószínűleg hibás a tápegység (vagy az alaplap)', fix: 'Próbáld ki egy **ismerten jó tápegységgel**. Ha azzal sem indul, az alaplap lehet hibás.\n\nA tápegységet **ne nyisd ki**: a kondenzátorai kikapcsolva is veszélyes feszültséget tárolhatnak. Hibás tápot egyben kell cserélni.', level: 'warn' },
    r_zarlat: { result: 'Zárlat vagy túlterhelés: a táp védelme lekapcsol', fix: '- Nézd meg, nem ér-e hozzá az alaplap a házhoz ott, ahol nincs **távtartó**, és nem esett-e csavar a lap alá.\n- Vedd le az összes nem szükséges eszközt (meghajtók, bővítőkártyák, USB-eszközök), és próbáld csak CPU-val, hűtővel, egy RAM-mal indítani.\n- Ellenőrizd, be van-e kötve a 8 tűs CPU-táp.\n- Ha így sem indul, a táp vagy az alaplap hibás: cserealkatrésszel derítsd ki.', level: 'warn' },
    r_ram_kontakt: { result: 'Kontakthibás vagy hibás memóriamodul', fix: 'Ha az egyik modullal megy, a másikkal nem, az a modul hibás: cseréld. Ha újraillesztés után mindkettővel jó, kontakthiba volt.\n\nÉrdemes egy memóriatesztet is lefuttatni (pl. Windows Memóriadiagnosztika vagy MemTest86).', level: 'ok' },
    r_ram_csere: { result: 'Memória-, foglalat- vagy kompatibilitási hiba', fix: '- Nézd meg, a RAM típusa (DDR4/DDR5) és sebessége szerepel-e az alaplap **támogatott listáján**.\n- Ha az UEFI-ben gyorsító profil (XMP/EXPO) volt bekapcsolva, állítsd vissza alapértékre (CMOS-törlés a kézikönyv szerint).\n- Próbálj ki ismerten jó modult. Ha azzal sem megy, a processzor memóriavezérlője vagy az alaplap lehet hibás: ez szervizbe való.', level: 'warn', pro: true },
    r_vga: { result: 'Videokártya-hiba', fix: '- Told be a videokártyát kattanásig, és kösd be a **kiegészítő tápcsatlakozóit**.\n- Ha a processzorban van beépített grafika, vedd ki a kártyát, és próbáld az alaplap kimenetéről.\n- Próbáld ki a kártyát másik gépben, vagy egy másik kártyát ebben a gépben.', level: 'warn' },
    r_monitor: { result: 'Rossz kijelzőcsatlakozás', fix: 'Kösd a monitort a **videokártya** kimenetére (ha van külön kártya), és állítsd a monitort a megfelelő bemenetre. Próbálj ki másik kábelt is.', level: 'ok' },
    r_lemez: { result: 'A gép nem látja a háttértárat', fix: '- Ellenőrizd a SATA-adatkábelt és -tápkábelt, illetve hogy az M.2 SSD rendesen a foglalatban van-e, rögzítőcsavarral.\n- Nézd meg, hogy az M.2 foglalat nincs-e letiltva, vagy nem osztozik-e egy SATA-porttal (kézikönyv).\n- Próbáld ki a lemezt másik gépben. Ha ott sem látszik, a lemez hibás: ha fontos adat van rajta, **adatmentő szakemberhez** fordulj, ne próbálgasd tovább.', level: 'warn' },
    r_bootsorrend: { result: 'Rossz rendszerindítási sorrend vagy sérült rendszerbetöltő', fix: '- Az UEFI-ben állítsd a rendszerlemezt az **első helyre** a boot sorrendben, és húzd ki az USB-s tárolókat.\n- Ellenőrizd, hogy a rendszer UEFI- vagy régi (Legacy/CSM) módban lett telepítve, és ugyanaz legyen bekapcsolva.\n- Ha ez sem segít, a rendszerbetöltő sérült: a telepítő pendrive-ról indítva a **Rendszerhelyreállítás** (indítási javítás) segíthet.', level: 'ok' }
  }
});
