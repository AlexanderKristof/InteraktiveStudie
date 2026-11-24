/* Tudtad? – számvitel és könyvvizsgálat. Formátum: js/tudtad.js */
STUDIE.addFacts([
  {
    id: 'szv-pacioli-1494', cat: 'penz',
    q: 'a kettős könyvvitelt először egy ferences szerzetes-matematikus írta le nyomtatásban, **1494-ben, Velencében**?',
    why: '**Luca Pacioli** „Summa de arithmetica, geometria, proportioni et proportionalita” című, 1494-ben Velencében kiadott matematikakönyvének egyik fejezete a kereskedők könyvvezetését mutatja be: napló, főkönyv, tartozik és követel oldal, a mérleg egyezésének ellenőrzése. A módszert nem ő találta ki – az itáliai kereskedővárosok (Velence, Genova, Firenze) már a 13–14. században használták –, de az ő könyve tette közismertté, ezért gyakran „a számvitel atyjának” nevezik.\n\nPacioli barátja volt **Leonardo da Vincinek**, aki egy másik könyvéhez (De divina proportione) rajzolta a mértani testek illusztrációit. Az alapelv több mint 500 év után is ugyanaz: minden tételt kétszer, egy tartozik és egy követel oldalon rögzítünk.',
    links: ['szakszo:szamvitel/kettos-konyvvitel', 'szakszo:szamvitel/t-szamla']
  },
  {
    id: 'szv-goethe', cat: 'penz',
    q: '**Goethe** a kettős könyvvitelt „az emberi szellem egyik legszebb találmányának” nevezte?',
    why: 'A „Wilhelm Meister tanulóévei” című regényben Werner, a kereskedő barát lelkesedik így a kettős könyvvitelért: szerinte rendet és áttekinthetőséget ad, a jó gazda pedig minden nap látja belőle, hol áll. A gondolat ma is igaz: a könyvelés nem csak adminisztráció, hanem **döntéstámogató információ**.\n\nA kettős könyvvitel ereje az önellenőrzés: mivel minden tétel kétszer szerepel, a **tartozik és a követel forgalom összegének egyeznie kell** – ha nem, valahol hiba van.',
    links: ['szakszo:szamvitel/kettos-konyvvitel', 'szakszo:szamvitel/fokonyv-naplo']
  },
  {
    id: 'szv-tartozik-kovetel', cat: 'penz',
    q: 'a „tartozik” és „követel” elnevezés abból az időből maradt ránk, amikor a számlákat **emberekről** nevezték el?',
    why: 'A középkori kereskedők könyveiben a számlák többsége egy-egy személy (vevő, szállító) neve volt. Ha a vevő árut vitt el, a róla szóló lapra azt írták: **tartozik** (latinul debet – innen az angol debit); ha fizetett vagy ő szállított, azt: **követel** (credit, a latin credere „hinni, hitelezni” igéből).\n\nKésőbb a módszert a nem személyekről szóló számlákra (pénztár, áru, gép) is kiterjesztették, de a nevek maradtak. Ezért zavaró ma: a bankszámla növekedése is „tartozik” oldalra kerül, pedig senki nem tartozik semmivel – ez csak a számla bal oldalának neve.',
    links: ['szakszo:szamvitel/kettos-konyvvitel', 'szakszo:szamvitel/t-szamla']
  },
  {
    id: 'szv-iras-konyveles', cat: 'penz',
    q: 'a legkorábbi írásos emlékek jelentős része **gazdasági nyilvántartás** – vagyis az írás és a könyvelés közeli rokonok?',
    why: 'Mezopotámiában, Uruk városában a Kr. e. 4. évezred végéről előkerült agyagtáblák nagy része gabona-, sör-, juh- és munkaerő-elszámolás: ki mennyit adott le, mennyit kapott fejadagként. A kutatók egy része szerint az írás előzményei a kis agyag **zsetonok** voltak, amelyekkel a raktárkészletet és a tartozásokat tartották nyilván.\n\nVagyis a „ki mivel tartozik kinek” kérdése az ember egyik legrégebbi írott problémája – a mai **főkönyv** és **leltár** ősei agyagból készültek.',
    links: ['szakszo:szamvitel/fokonyv-naplo', 'tantargy:tortenelem']
  },
  {
    id: 'szv-merleg-szo', cat: 'penz',
    q: 'a **mérleg** azért kapta a nevét, mert a két oldalának – mint egy kétkarú mérleg két serpenyőjének – mindig egyensúlyban kell lennie?',
    why: 'Az angol balance szó a latin bilanx („két serpenyős”) szóból ered, a magyar „mérleg” ugyanezt a képet használja. Az eszközök (mibe fektették a pénzt) és a források (honnan jött a pénz) összege mindig egyenlő, mert ugyanannak a vagyonnak két nézete: `Eszközök = Saját tőke + Kötelezettségek`.\n\nEzért a „mérleg egyezik” önmagában nem bizonyítja, hogy minden helyes – csak azt, hogy a kettős könyvelés technikailag rendben van. Hogy a számok valósak-e, azt a **leltár** és a **könyvvizsgálat** ellenőrzi.',
    links: ['szakszo:szamvitel/merleg', 'szakszo:szamvitel/eszkozok-forrasok']
  },
  {
    id: 'szv-enron-andersen', cat: 'penz',
    q: 'egy könyvelési botrány miatt **megszűnt a világ egyik legnagyobb könyvvizsgáló cége**, az Arthur Andersen?',
    why: 'Az amerikai **Enron** energiacég 2001 végén csődbe ment, miután kiderült, hogy veszteségeit és adósságait mérlegen kívüli társaságokba rejtette. Könyvvizsgálóját, az **Arthur Andersent** 2002-ben iratmegsemmisítés miatt elítélték; az ítéletet az amerikai Legfelsőbb Bíróság 2005-ben hatályon kívül helyezte, de a cég addigra elvesztette ügyfeleit és gyakorlatilag megszűnt.\n\nA botrányok nyomán született az amerikai **Sarbanes–Oxley-törvény** (2002): a vezetőknek személyesen kell igazolniuk a beszámolót, a tőzsdei cégek könyvvizsgálóit független hatóság (PCAOB) felügyeli, és szigorodtak a **függetlenségi** szabályok – például tilos a vizsgált ügyfélnek bizonyos tanácsadási szolgáltatásokat nyújtani.',
    links: ['szakszo:konyvvizsgalat/fuggetlenseg', 'szakszo:konyvvizsgalat/csalas-hiba', 'szakszo:konyvvizsgalat/belso-kontroll']
  },
  {
    id: 'szv-wirecard', cat: 'penz',
    q: 'a német Wirecard botránya azon bukott meg, hogy **1,9 milliárd euró** készpénzről nem lehetett megerősítést szerezni a bankoktól?',
    why: 'A Wirecard fizetési szolgáltató a DAX-indexbe is bekerült, mielőtt 2020 júniusában kiderült: a mérlegében szereplő, állítólag fülöp-szigeteki bankok vagyonkezelői számláin tartott 1,9 milliárd eurónak nincs nyoma. A bankok közölték, hogy a cégnél lévő igazolások nem tőlük származnak. A cég néhány nappal később fizetésképtelenséget jelentett.\n\nA könyvvizsgálót (EY) azért érte erős kritika, mert éveken át nem kért **közvetlenül a bankoktól** megerősítést, hanem harmadik féltől származó dokumentumokra és képernyőképekre támaszkodott. A tanulság a tankönyvi szabály: a **külső megerősítés** folyamatát a könyvvizsgálónak kell ellenőriznie, és a bizonyíték forrását is **szkeptikusan** kell vizsgálni.',
    links: ['szakszo:konyvvizsgalat/megerosito-level', 'szakszo:konyvvizsgalat/szakmai-szkepticizmus', 'szakszo:konyvvizsgalat/bizonyitek']
  },
  {
    id: 'szv-benford', cat: 'penz',
    q: 'a valódi könyvelési adatokban az **első számjegy kb. 30%-ban 1-es**, és csak kb. 5%-ban 9-es – és ezt csalásfelderítésre is használják?',
    why: 'A **Benford-törvény** szerint sok, több nagyságrenden átívelő valós adatsorban (számlaösszegek, népesség, folyóhosszak) az első számjegy eloszlása nem egyenletes: `P(d) = log₁₀(1 + 1/d)`, vagyis 1-es kb. 30,1%, 2-es 17,6%, … 9-es csak kb. 4,6%.\n\nAki számokat talál ki, ösztönösen „egyenletesen” választ, vagy kerül bizonyos számokat (pl. egy jóváhagyási határ alatt marad: sok 4 900 000 Ft-os tétel, ha 5 millió felett kell második aláírás). A könyvvizsgálók és csalásfelderítők az **adatelemző** eljárásokban ezért vizsgálják, hogy a könyvelési tételek követik-e a Benford-eloszlást – az eltérés nem bizonyíték, de jelzi, hol érdemes mélyebbre ásni.',
    links: ['szakszo:konyvvizsgalat/elemzo-eljarasok', 'szakszo:konyvvizsgalat/csalas-hiba', 'szakszo:valszam/eloszlasfuggveny']
  },
  {
    id: 'szv-afa-27', cat: 'penz',
    q: 'a magyar **27%-os általános ÁFA-kulcs** a legmagasabb az Európai Unióban?',
    why: 'Az EU-irányelv szerint az általános kulcs legalább 15% kell legyen; a legtöbb tagállamban 19–25% körüli. Magyarország 2012 óta alkalmaz 27%-os általános kulcsot (2026-ban is), mellette 18%-os és 5%-os kedvezményes kulcs van. A kulcsok és a termékkörök változhatnak – az aktuálisat mindig a NAV oldalán nézd meg.\n\nA vállalkozás könyveiben az ÁFA **nem bevétel és nem költség** (ha levonható): a vevőtől beszedett fizetendő adóból (467) levonja a beszerzéseire jutó előzetesen felszámított adót (466), és csak a különbözetet fizeti be (468). A teljes terhet végül a **végső fogyasztó** viseli.',
    links: ['szakszo:szamvitel/afa-konyvelese', 'lecke:penz-mindennap/afa-szamla']
  },
  {
    id: 'szv-ertekcsokkenes-nem-penz', cat: 'penz',
    q: 'egy cég lehet **veszteséges**, miközben egyre több pénz van a bankszámláján – és fordítva, nyereséges cég is csődbe mehet?',
    why: 'Az eredmény és a pénz két külön dolog. Az **értékcsökkenés** költség, de nem jár pénzkiadással: egy sok gépet használó cég könyvelési veszteség mellett is termelhet pénzt. Fordítva, ha egy gyorsan növekvő cég vevői 90 napra fizetnek, az árbevétel már nyereséget mutat, de a pénz még nincs a számlán – a bérek és a szállítók viszont esedékesek.\n\nEzért kell a mérleg és az eredménykimutatás mellett a **cash-flow kimutatást** is nézni, és ezért vizsgálja a könyvvizsgáló külön a **vállalkozás folytatásának** (going concern) kérdését. Egy régi szakmai mondás: „A profit vélemény, a cash tény.”',
    links: ['szakszo:szamvitel/cash-flow', 'szakszo:szamvitel/ertekcsokkenes', 'szakszo:konyvvizsgalat/going-concern']
  },
  {
    id: 'szv-big-four', cat: 'penz',
    q: 'a világ legnagyobb tőzsdei cégeinek túlnyomó részét mindössze **négy** könyvvizsgáló hálózat vizsgálja?',
    why: 'A „Big Four” – **Deloitte, EY, KPMG, PwC** – a 20. század végi összeolvadások (és az Arthur Andersen 2002-es bukása) után maradt a piac csúcsán. A nagy nemzetközi cégcsoportok vizsgálatához sok országban jelen lévő, egységes módszertanú hálózat kell, ezért ezen a szinten kevés a versenytárs.\n\nA koncentráció miatt az EU 2014-ben kötelező **könyvvizsgáló-rotációt** és a tiltott nem-könyvvizsgálati szolgáltatások listáját vezette be a közérdeklődésre számot tartó cégeknél. Magyarországon a kisebb cégek többségét hazai könyvvizsgáló cégek és egyéni **kamarai tag könyvvizsgálók** vizsgálják.',
    links: ['szakszo:konyvvizsgalat/fuggetlenseg', 'szakszo:konyvvizsgalat/mkvk', 'szakszo:konyvvizsgalat/szakma-utja']
  }
]);
