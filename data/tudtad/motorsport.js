/* Tudtad? – Motorsport-szerelő és versenymérnök. Ellenőrzött tények a versenytechnikából és a boxból. Formátum: js/tudtad.js */
STUDIE.addFacts([
  {
    id: 'mot-boxkiallas-180', cat: 'sport', sport: 'f1', athletes: ['Lando Norris'],
    q: 'a McLaren szerelői **1,80 másodperc** alatt cserélték le mind a négy kereket Lando Norris autóján?',
    why: 'A 2023-as Katari Nagydíjon felállított boxkiállás-rekordot a Guinness Rekordok Könyve is hitelesítette. A korábbi csúcs a Red Bull 2019-es, 1,82 másodperces kiállása volt.\n\nA titok a **begyakorolt koreográfia**: keréknként három ember (légkulcsos, levevő, felrakó), emelősök, stabilizálók – és egy lámparendszer, amely csak akkor enged, ha minden kerék rögzítve van.',
    links: ['lecke:motorsport/box-biztonsag', 'lecke:sport/forma1', 'modell:f1-auto#gumik']
  },
  {
    id: 'mot-plank-kizaras', cat: 'sport', sport: 'f1', athletes: ['Lewis Hamilton', 'Charles Leclerc'],
    q: 'Lewis Hamiltont és Charles Leclerc-t egy **egyetlen milliméteren** múló szabály miatt zárták ki utólag a 2023-as USA Nagydíjról?',
    why: 'Az F1-es autók padlója alatt egy fa alapú **csúszólap** (plank) fut, amely újonnan 10 mm vastag, és legfeljebb 9 mm-ig kophat. A szabály azt akadályozza meg, hogy a csapatok veszélyesen alacsonyra állítsák az autót.\n\nAustinban a futam után ellenőrzött négy autóból kettőnél túlkopott a lap, így Hamilton elvesztette második, Leclerc a hatodik helyét. A hasmagasságot tehát **biztonsági tartalékkal** kell beállítani.',
    links: ['lecke:motorsport/alapok', 'lecke:motorsport/aero', 'modell:f1-auto#padlolemez']
  },
  {
    id: 'mot-ackermann-lankensperger', cat: 'szakmak',
    q: 'az **Ackermann-kormányzást** nem Ackermann találta ki, hanem egy müncheni kocsigyártó, **Georg Lankensperger**?',
    why: 'Lankensperger 1816-ban dolgozta ki azt a megoldást, amellyel kanyarban a belső kerék jobban fordul, mint a külső, így a kerekek csúszás nélkül gördülnek. Angliai szabadalmát az ügynöke, **Rudolph Ackermann** nyújtotta be 1818-ban – és a név rajta ragadt.\n\nA mai versenyautók érdekes módon gyakran **kevesebb** Ackermannt használnak, mert nagy oldalgyorsulásnál a gumik csúszási szöggel dolgoznak.',
    links: ['lecke:motorsport/geometria', 'tantargy:autoszereles']
  },
  {
    id: 'mot-hans-hubbard', cat: 'sport', sport: 'altalanos',
    q: 'a versenyzők életét mentő **HANS** nyakvédőt egy egyetemi mérnök és a sógora, egy autóversenyző találta fel?',
    why: 'Dr. **Robert Hubbard** amerikai biomechanikai mérnök és sógora, **Jim Downing** versenyző dolgozta ki az eszközt; a szabadalmat 1985-ben nyújtották be. A HANS a sisakot hevederekkel a vállon fekvő kerethez köti, így ütközéskor a fej nem csapódik előre, és a nyakat nem éri halálos terhelés.\n\nAz F1-ben **2003 óta kötelező**, ma szinte minden komoly autóversenyben előírják.',
    links: ['lecke:motorsport/box-biztonsag', 'lecke:sport/forma1']
  },
  {
    id: 'mot-esogumi-85-liter', cat: 'sport', sport: 'f1',
    q: 'egy F1-es esőgumi 300 km/h-nál **kerekenként akár 85 liter vizet** szór ki másodpercenként?',
    why: 'A Pirelli adata szerint a teljes esőgumi (full wet) mély barázdái ennyi vizet vezetnek el a kontaktfolt elől, hogy a gumi ne ússzon fel a vízen (aquaplaning). Négy kerékre számolva ez másodpercenként nagyjából két fürdőkádnyi víz.\n\nNagyon erős esőben mégis gyakran megállítják a versenyt – nem a tapadás, hanem a felcsapó vízpermet miatti **rossz látási viszonyok** miatt.',
    links: ['lecke:motorsport/gumik', 'modell:f1-auto#gumik']
  },
  {
    id: 'mot-grosjean-halo', cat: 'sport', sport: 'f1', athletes: ['Romain Grosjean'],
    q: 'Romain Grosjean kb. **fél percet** töltött egy lángoló, kettészakadt autóban 2020-ban – és égési sérülésekkel túlélte?',
    why: 'A 2020-as Bahreini Nagydíjon Grosjean autója nagy sebességgel a szalagkorlátba fúródott, kettészakadt és lángba borult. A **halo** fejvédő keret szétnyitotta a korlátot a feje előtt, a túlélőcella egyben maradt, a tűzálló overall, kesztyű és alsóruházat pedig a vártnál jóval hosszabb ideig védte.\n\nA halo bevezetésekor (2018) sokan bírálták – Grosjean is. A baleset után ő maga mondta, hogy a halo mentette meg az életét.',
    links: ['lecke:motorsport/box-biztonsag', 'modell:f1-auto#halo']
  },
  {
    id: 'mot-tankolas-tilalom', cat: 'sport', sport: 'f1',
    q: 'az F1-ben **2010 óta** egyáltalán nem tankolnak a futam közben?',
    why: 'A tankolást biztonsági és költségokokból tiltották be – korábban több boxtűz is történt tankolás közben. Azóta az autók a teljes futamra elegendő üzemanyaggal rajtolnak, és a boxkiállás csak kerékcseréből áll, ezért lett ilyen hihetetlenül gyors.\n\nMás sorozatokban, például hosszútávú versenyeken, ma is tankolnak, szigorú tűzvédelmi előírások mellett.',
    links: ['lecke:motorsport/box-biztonsag', 'lecke:sport/forma1']
  },
  {
    id: 'mot-fektarcsa-furatok', cat: 'sport', sport: 'f1',
    q: 'egy F1-es karbon féktárcsán akár **1480 apró hűtőfurat** is lehet?',
    why: 'A Brembo legerősebben hűtött első tárcsáin ennyi furat van; pályától és időjárástól függően a csapatok kevesebb furatú változatot is választhatnak. A furatok a tárcsa belsejéből vezetik el a hőt.\n\nA karbonfék különleges: a fékezés elején kb. **350–600 °C**-on kell lennie, hogy jól fogjon, csúcsban pedig 1000 °C fölé is melegszik. Hidegen meglepően gyengén fékez.',
    links: ['lecke:motorsport/fekek-hajtas', 'modell:f1-auto#fekek']
  },
  {
    id: 'mot-gumimelegito-70', cat: 'sport', sport: 'f1',
    q: 'az F1-ben a gumimelegítő takarókkal a slickeket csak **70 °C-ig** szabad melegíteni – és a futófelületen hőmérővel ellenőrzik?',
    why: 'Korábban kb. 100 °C volt a határ, ezt fokozatosan csökkentették. A biztosok infravörös hőmérővel a **gumi futófelületén** mérnek, nem a takaró beállítását nézik. A teljes betiltást is tervezték, de végül elvetették, mert a hideg gumi az első körökben veszélyesen kevés tapadást ad.\n\nEzért a boxból kijövő vagy a biztonsági autó mögül induló pilóta mindig óvatosan kezd.',
    links: ['lecke:motorsport/gumik', 'modell:f1-auto#gumik']
  },
  {
    id: 'mot-sik-padlo-1983', cat: 'sport', sport: 'f1',
    q: 'az F1-ben **1983-ban betiltották** a padló alatti talajhatást – és 2022-ben visszahozták?',
    why: 'Az 1970-es évek végének „szárnyautói” a padló alatti Venturi-csatornákkal olyan nagy leszorítóerőt termeltek, hogy a kanyarsebességek veszélyesen megnőttek. 1983-tól ezért **sík padlót** írtak elő.\n\nA 2022-es szabályokkal a Venturi-csatornás padló visszatért, hogy az autók kevésbé zavarják egymást, és könnyebb legyen a követés. Vele együtt visszatért egy régi ismerős is: a nagy sebességű pattogás, a **porpoising**.',
    links: ['lecke:motorsport/aero', 'modell:f1-auto#padlolemez', 'modell:f1-auto#diffuzor']
  },
  {
    id: 'mot-szenzorok', cat: 'sport', sport: 'f1',
    q: 'egy F1-es autó kb. **250–300 szenzorral** és másodpercenként nagyjából **1,1 millió adatponttal** „beszél” a boxhoz?',
    why: 'A szenzorok a kerékfordulattól a féknyomáson és a gumihőmérsékleten át a lengéscsillapítók elmozdulásáig mindent mérnek. Egy versenyhétvégén – a becslések szerint, attól függően, mit számolunk bele – több száz gigabájt, akár egy terabájtnál is több adat keletkezik autónként.\n\nAz adatot mérnökök tucatjai elemzik a pályán és a gyárban, de a pilóta érzése továbbra is pótolhatatlan.',
    links: ['lecke:motorsport/telemetria', 'modell:f1-auto']
  },
  {
    id: 'mot-ers-zold-lampa', cat: 'szakmak',
    q: 'a hibrid és elektromos versenyautókon egy **zöld lámpa** jelzi a pályabíróknak, hogy az autót biztonságosan meg lehet érinteni?',
    why: 'A nagyfeszültségű rendszer baleset után is „élő” maradhat. Ha a jelzőfény **nem zöld**, az autóhoz csak szigetelő kesztyűvel, képzett személy nyúlhat. Ugyanezt az elvet használják a ralin és más elektromos sorozatokban is.\n\nA 2026-os F1-es szabályok szerint az MGU-K teljesítménye 120 kW-ról **350 kW**-ra nőtt, így a nagyfeszültségű biztonság még fontosabb lett.',
    links: ['lecke:motorsport/box-biztonsag', 'lecke:elektromos-auto/hv-biztonsag', 'modell:f1-auto#mgu-k', 'modell:elektromos-auto#hv']
  }
]);
