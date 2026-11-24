/* Tantárgy: Hegesztés és fémmegmunkálás */
STUDIE.addSubject({
  id: 'hegesztes',
  stage: 'szakma',
  title: 'Hegesztés és fémmegmunkálás',
  icon: '🔥',
  color: '#e5484d',
  description: 'Fémek, forgácsolás, hegesztési eljárások, gépbeállítás, varrathibák és a hegesztő munkavédelme.',
  intro: 'Ez a tananyag a fémmegmunkálás és a hegesztés **elméletét** tanítja meg: milyen fémekkel dolgozunk, hogyan fúrunk, esztergálunk, marunk, és hogyan születik egy jó varrat. Hegeszteni csak **betanítás után, teljes védőfelszerelésben, felügyelet mellett** kezdj: az ív fénye, a füst, a szikra, a gázpalack és az áram egyaránt komoly veszély.',
  lessons: [
    {
      id: 'femek',
      title: 'Fémek és ötvözetek',
      level: 1, minutes: 13,
      summary: 'Acél, öntöttvas, rozsdamentes acél és alumínium; szilárdság, keménység, hővezetés és hegeszthetőség.',
      tags: ['fém', 'ötvözet', 'acél', 'szénacél', 'öntöttvas', 'rozsdamentes', 'inox', 'alumínium', 'szilárdság', 'folyáshatár', 'keménység', 'hővezetés', 'hőtágulás', 'S235', 'hegeszthetőség'],
      sections: [
        {
          title: 'Acél és öntöttvas',
          text: 'Az **acél** vas és szén ötvözete, amelyben a szén kevesebb, mint kb. **2%**. A szerkezeti acélokban jóval kevesebb, általában **0,1–0,25%**. Minél több benne a szén, annál keményebb és szilárdabb, de annál **ridegebb és nehezebben hegeszthető**.\n\n- **Szerkezeti acél** (pl. **S235**, **S355**): a szám a minimális **folyáshatár** MPa-ban. Ebből készülnek a tartók, zártszelvények, lemezek. Jól hegeszthető.\n- **Szerszámacél**: magasabb széntartalmú, edzhető. Kések, fúrók, vésők.\n- **Ötvözött acél**: króm, nikkel, molibdén, mangán adalékkal a szilárdság, szívósság vagy hőállóság javul.\n\nAz **öntöttvas** szene **2% feletti**. Jól önthető (motorblokk, csőidom, kályha, gépágy), de **rideg**: ütésre eltörik, nem hajlik. Hegesztése nehéz, különleges elektróda és előmelegítés kell hozzá, mert könnyen megreped.'
        },
        {
          title: 'Rozsdamentes acél',
          text: 'A **rozsdamentes acél** (inox) legalább kb. **10,5% krómot** tartalmaz. A króm a felületen vékony, láthatatlan **króm-oxid réteget** (passzív réteget) képez, ami megvédi a rozsdától, és ha megsérül, magától újraképződik.\n\nA leggyakoribb a **króm-nikkel ausztenites** acél (pl. 18% Cr, 8–10% Ni, gyakran „304”-esként emlegetik): **nem mágneses**, jól hegeszthető, élelmiszeripar, konyha, korlát.\n\nJellemzők, amire figyelni kell:\n\n- **rossz hővezető** és **jobban tágul**, mint a szénacél, ezért hegesztéskor jobban **vetemedik**,\n- a hegesztés utáni elszíneződést (futtatási színeket) **pácolással** vagy polírozással el kell távolítani, különben ott rozsdásodhat,\n- **ne** érintkezzen szénacél szerszámmal (drótkefe, köszörűkorong), mert a ráragadt vasszemcsék rozsdásodnak. Külön, inoxhoz való szerszám kell.'
        },
        {
          title: 'Alumínium',
          text: 'Az **alumínium** könnyű (sűrűsége kb. **2,7 g/cm³**, az acélé **7,85 g/cm³**), nem rozsdásodik, és nagyon jó hővezető. Járműipar, nyílászárók, burkolatok.\n\nHegesztésnél trükkös anyag:\n\n- a felületén **alumínium-oxid** réteg van, amely kb. **2050 °C**-on olvad, maga az alumínium viszont már kb. **660 °C**-on. Az oxidot ezért el kell távolítani (rozsdamentes drótkefével közvetlenül hegesztés előtt, illetve AWI-nál váltakozó árammal),\n- **nem változtatja a színét**, mielőtt megolvadna: hirtelen „beroskad”,\n- a jó hővezetés miatt **nagy hőbevitel** kell, a vékony lemez viszont könnyen átég.'
        },
        {
          title: 'Mechanikai és fizikai tulajdonságok',
          text: '- **Szilárdság**: mekkora terhelést bír el az anyag. A **szakítószilárdság** (R_{m}) az a feszültség, amelynél elszakad, a **folyáshatár** (R_{e}) az, amelynél maradó alakváltozás kezdődik. Mértékegysége **MPa** (N/mm²). Az S235 folyáshatára 235 MPa, szakítószilárdsága kb. 360–510 MPa.\n- **Keménység**: mennyire áll ellen az anyag a benyomódásnak, karcolásnak. Mérése: **Brinell (HB)**, **Vickers (HV)**, **Rockwell (HRC)**. Az edzett fúró kb. 60–65 HRC.\n- **Szívósság**: mennyi energiát nyel el törés előtt (ütővizsgálattal mérik). Az öntöttvas rideg, a szerkezeti acél szívós. Hidegben az acél ridegebb lesz.\n- **Hővezetés**: réz kb. 400, alumínium kb. 235, szénacél kb. 50, rozsdamentes acél kb. 15 W/(m·K). A jó hővezető elvezeti a hőt a varrat helyéről, ezért több hő kell a hegesztéshez.\n- **Hőtágulás**: az alumínium kb. kétszer annyit tágul, mint a szénacél. Ezért vetemedik és zsugorodik a hegesztett szerkezet.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a fémet a jellemzőjével!', count: 6, pairs: [
            ['Szerkezeti acél (S235)', 'Jól hegeszthető, 235 MPa a folyáshatára'],
            ['Öntöttvas', 'Több mint 2% szén, rideg, jól önthető'],
            ['Ausztenites rozsdamentes acél', 'Króm-nikkel, nem mágneses'],
            ['Alumínium', 'Könnyű, oxidrétege 2050 °C-on olvad'],
            ['Réz', 'Kiváló hő- és áramvezető'],
            ['Szerszámacél', 'Magasabb széntartalom, edzhető'],
            ['Horganyzott acél', 'Cinkréteg véd, hegesztéskor mérgező füst']
          ] } }
        },
        {
          title: 'Hegeszthetőség',
          text: 'Egy acél akkor **jól hegeszthető**, ha a varrat és környezete hegesztés után sem lesz rideg és repedékeny. Ezt főleg a **széntartalom** és az ötvözők határozzák meg, amit a **szén-egyenértékkel** (CEV) fejeznek ki:\n\n`CEV = C + Mn/6 + (Cr+Mo+V)/5 + (Ni+Cu)/15`\n\nHa a CEV kb. **0,4 alatt** van, az acél általában előmelegítés nélkül is jól hegeszthető. Efölött, és vastag lemeznél **előmelegítés** kellhet (pl. 100–200 °C), hogy a varrat lassabban hűljön, és ne keletkezzen **hidegrepedés**.\n\nAz ismeretlen anyag felismerésében segít a **mágnes** (az ausztenites inox és az alumínium nem mágneses) és a **szikrapróba** a köszörűn: a szénacél sok, elágazó szikrát szór, az öntöttvas rövid, vöröses szikrát.',
          tip: 'A **horganyzott** acélt hegesztés előtt a varrat helyén meg kell tisztítani a cinktől, mert a cink kiégése porózus varratot és **mérgező füstöt** okoz.'
        }
      ],
      quiz: [
        { q: 'Mi a fő különbség az acél és az öntöttvas között?', options: ['Az öntöttvasban kb. 2%-nál több a szén', 'Az acélban több a szén', 'Az öntöttvas alumíniumot tartalmaz', 'Nincs különbség'], answer: 0, explain: 'Az acél 2% alatti, az öntöttvas 2% feletti széntartalmú vas–szén ötvözet.' },
        { q: 'Mit jelent az S235 jelölésben a 235?', options: ['A szakítószilárdságot', 'A minimális folyáshatárt MPa-ban', 'A széntartalmat ezrelékben', 'Az olvadáspontot'], answer: 1, explain: 'Az S betű szerkezeti acélt jelent, a szám a minimális folyáshatár N/mm²-ben.' },
        { q: 'Miért nehéz az alumíniumot hegeszteni?', options: ['Mert túl rossz hővezető', 'Mert az oxidrétege sokkal magasabb hőmérsékleten olvad, mint maga a fém', 'Mert mágneses', 'Mert vasat tartalmaz'], answer: 1, explain: 'Az alumínium kb. 660 °C-on, az oxidja kb. 2050 °C-on olvad, ezért az oxidot el kell távolítani.' }
      ]
    },
    {
      id: 'megmunkalas',
      title: 'Fémmegmunkálás',
      level: 1, minutes: 14,
      summary: 'Fúrás, esztergálás, marás, köszörülés és menetvágás, valamint a forgácsolási sebesség alapjai.',
      tags: ['forgácsolás', 'fúrás', 'csigafúró', 'HSS', 'esztergálás', 'eszterga', 'marás', 'köszörülés', 'sarokcsiszoló', 'menetvágás', 'menetfúró', 'magfurat', 'forgácsolási sebesség', 'fordulatszám', 'hűtő-kenő folyadék'],
      sections: [
        {
          title: 'Fúrás',
          text: 'A **csigafúró** a leggyakoribb fúrószerszám. Anyaga általában **gyorsacél (HSS)**, keményebb anyagokhoz kobalttal ötvözött (HSS-Co) vagy keményfém. Acélhoz a csúcsszög általában **118°**.\n\nA jó fúrás lépései:\n\n1. **Jelölés és pontozás**: a furat közepét pontozóval bejelölöd, hogy a fúró ne „vándoroljon” el.\n2. Nagyobb furatnál **előfúrás** kisebb fúróval (a nagy fúró csúcsa nem vág jól).\n3. Megfelelő **fordulatszám**: nagy fúró → kisebb fordulatszám.\n4. **Hűtés-kenés**: acélnál fúróolaj vagy hűtő-kenő emulzió. Alumíniumnál is segít, öntöttvasat szárazon fúrják.\n5. Kifutáskor **csökkentsd az előtolást**, mert a fúró átütéskor beakadhat.',
          warn: 'A munkadarabot **mindig fogd be** (gépsatuba, szorítóval)! Ha a fúró beakad, a kézben tartott lemezt megpörgeti, és súlyos vágott sérülést okoz. Oszlopos fúrógépnél **kesztyű tilos**, a hosszú hajat kösd fel, a forgácsot ne kézzel, hanem **ecsettel vagy kampóval** távolítsd el.'
        },
        {
          title: 'Esztergálás és marás',
          text: '**Esztergálás**: a **munkadarab forog** (a tokmányba fogva), a **kés áll**, és hosszában vagy keresztben halad. Forgástesteket készítenek vele: tengelyeket, perselyeket, csapokat, meneteket. Fő műveletek: **hosszesztergálás**, **síkesztergálás** (homlokfelület), **beszúrás**, **furatesztergálás**, **menetesztergálás**.\n\n**Marás**: a **szerszám forog** (marótüske, ujjmaró, homlokmaró), a **munkadarab halad** alatta. Sík felületeket, hornyokat, zsebeket, fogazatot készítenek vele. A CNC marógépek bonyolult 3D formákat is kimarnak.',
          warn: 'Az esztergán a **tokmánykulcsot soha ne hagyd a tokmányban**! Bekapcsoláskor kirepül, mint egy lövedék. A forgó munkadarabhoz és a hosszú, szalagszerű forgácshoz ne nyúlj: a forgács borotvaéles és forró. Védőszemüveg kötelező.'
        },
        {
          title: 'Köszörülés',
          text: 'A köszörülés **apró, kemény szemcsékkel** forgácsol (korund, szilícium-karbid, CBN). Nagyon pontos, sima felületet ad, és edzett anyagot is megmunkál.\n\n- **Asztali (kettős) köszörű**: szerszámélezés, sorjázás. A **munkadarab-támasz** a koronghoz legfeljebb **3 mm**-re legyen, különben a darab beszorulhat.\n- **Sarokcsiszoló** („flex”): vágás, tisztítás, varratköszörülés. A **vágókoronggal** csak vágni szabad, oldalával köszörülni **tilos**, mert eltörik. Tisztításhoz **tisztítókorong** (vastagabb) vagy lamellás csiszolótányér kell.\n- A korongon fel van tüntetve a **megengedett legnagyobb fordulatszám** (vagy kerületi sebesség). Ez legyen **legalább akkora**, mint a gépé.',
          warn: 'A sarokcsiszolót **soha ne használd védőburkolat nélkül**, és ne tegyél rá nagyobb átmérőjű korongot, mint amire készült. A szétrobbanó korong darabjai halálos sérülést okozhatnak. Védőszemüveg vagy arcvédő, hallásvédő, kesztyű kötelező. A szikra irányában ne álljon senki, és ne legyen éghető anyag.'
        },
        {
          title: 'Menetvágás',
          text: '**Belső menet** (anyacsavar helyett a darabban) **menetfúróval** készül. A kézi menetfúró készlet általában **3 darabos**: előfúró, közép- és simítófúró (gépi menetfúrónál egy darab is lehet).\n\nElőször **magfuratot** fúrsz, amelynek átmérője durván: `magfurat ≈ névleges átmérő − menetemelkedés`. Metrikus finom menetek helyett a szabványos (normál) menetekre:\n\n- **M6** (emelkedés 1 mm) → **5 mm**-es fúró\n- **M8** (1,25 mm) → **6,8 mm**\n- **M10** (1,5 mm) → **8,5 mm**\n- **M12** (1,75 mm) → **10,2 mm**\n\nVágás közben a menetfúrót tartsd **merőlegesen**, használj menetvágó olajat, és fél fordulat előre után kb. negyed fordulat **vissza**, hogy a forgács eltörjön, és a fúró ne törjön bele.\n\n**Külső menetet** (csavaron) **menetmetszővel** vágunk, a csap végét előtte kissé **letörve**.'
        },
        {
          title: 'Forgácsolási sebesség',
          text: 'A **forgácsolási sebesség** (v_{c}) azt mutatja meg, milyen gyorsan halad a szerszám éle az anyaghoz képest, **m/perc**-ben. Ez az **anyagtól és a szerszámtól** függ, a gyártó táblázatban adja meg. Tájékoztató értékek **HSS** szerszámmal:\n\n- szerkezeti acél: kb. **20–30 m/perc**\n- rozsdamentes acél: kb. **8–15 m/perc**\n- alumínium: kb. **60–100 m/perc** (vagy több)\n\nA szükséges **fordulatszám**:\n\n`n = 1000 · vc / (d · π)`   (n: 1/perc, vc: m/perc, d: mm)\n\nPélda: 10 mm-es HSS fúró acélba, vc = 25 m/perc: `n = 1000 · 25 / (10 · 3,14) ≈ 796 1/perc`, tehát kb. **800-as** fokozat. Egy 5 mm-es fúróhoz ugyanebben az anyagban **kétszer akkora**, kb. 1600 1/perc kell.\n\nA túl nagy fordulatszám **kiizzítja és tompítja** a fúrót (kékre fut a forgács), a túl kicsi lassú, és a szerszám rángat.',
          tip: 'A rozsdamentes acél fúrásánál **lassú fordulat, erős előtolás**! Ha a fúró csak „simogatja” az inoxot, az anyag felülete felkeményedik, és utána már alig fúrható.'
        }
      ],
      quiz: [
        { q: 'Mi forog esztergáláskor?', options: ['A kés', 'A munkadarab', 'Mindkettő', 'Egyik sem'], answer: 1, explain: 'Esztergáláskor a munkadarab forog, a kés áll és előtoló mozgást végez. Marásnál fordítva: a szerszám forog.' },
        { q: 'Mekkora magfuratot fúrsz M8-as menethez?', options: ['8 mm', '6,8 mm', '7,5 mm', '5 mm'], answer: 1, explain: 'Magfurat ≈ 8 − 1,25 = 6,75 mm, a gyakorlatban 6,8 mm-es fúró.' },
        { q: 'Ugyanabban az anyagban a nagyobb átmérőjű fúróhoz…', options: ['…nagyobb fordulatszám kell', '…kisebb fordulatszám kell', '…ugyanakkora fordulatszám kell', '…nem kell hűtés'], answer: 1, explain: 'n = 1000 · vc / (d · π): nagyobb d esetén kisebb n adja ugyanazt a forgácsolási sebességet.' }
      ]
    },
    {
      id: 'eljarasok',
      title: 'A hegesztés elve és eljárásai',
      level: 1, minutes: 14,
      summary: 'Mi a hegesztés, és hogyan működik a bevont elektródás, a MIG/MAG, az AWI/TIG és a lánghegesztés; mire való a védőgáz.',
      tags: ['hegesztés', 'ömlesztő hegesztés', 'ömledék', 'hőhatásövezet', 'MMA', 'bevont elektróda', 'rutilos', 'bázikus', 'MIG', 'MAG', 'AWI', 'TIG', 'volfrám', 'lánghegesztés', 'acetilén', 'védőgáz', 'argon', 'CO₂', 'forrasztás'],
      sections: [
        {
          title: 'Mi a hegesztés?',
          text: '**Ömlesztő hegesztéskor** a két alkatrész szélét helyben **megolvasztjuk**, általában **hozaganyagot** (elektródát, huzalt, pálcát) is adunk hozzá, és az olvadt fém (az **ömledék**) megdermedve **egy darabbá** köti őket. A kész kötés a **varrat**.\n\nA varrat mellett az alapanyag nem olvad meg, de nagyon felmelegszik: ez a **hőhatásövezet**. Itt az anyag szerkezete megváltozhat (keményebb, ridegebb lehet), ezért itt indulnak a repedések is.\n\n**Hegesztés vagy forrasztás?** Forrasztáskor az **alapanyag nem olvad meg**, csak a nála alacsonyabb olvadáspontú forraszanyag, amely „beszívódik” a résbe. Hegesztéskor az alapanyag is megolvad.',
          tip: 'A hegesztési eljárásokat számmal is jelölik (ISO 4063): **111** = bevont elektródás kézi ívhegesztés, **131** = MIG, **135** = MAG, **141** = AWI/TIG, **311** = oxigén-acetilén lánghegesztés. Ezeket a számokat a hegesztési utasításokon és a vizsgabizonyítványokon is látod.'
        },
        {
          title: 'Bevont elektródás kézi ívhegesztés (MMA, 111)',
          text: 'Az elektróda és a munkadarab között **villamos ív** ég (kb. 4000–6000 °C fölött), amely megolvasztja az alapanyagot és magát az elektródát is. Az elektróda **fémmagját** **bevonat** borítja, amely égéskor:\n\n- **védőgázt** fejleszt, ami elzárja az ömledéket a levegőtől,\n- **salakot** képez, amely betakarja és lassan hűti a varratot (hegesztés után le kell verni),\n- stabilizálja az ívet, és ötvözőket juttathat a varratba.\n\nBevonattípusok:\n\n- **Rutilos**: könnyű ívgyújtás, szép, sima varrat, könnyen eltávolítható salak. Kezdőknek, általános munkákra.\n- **Bázikus**: szívós, repedésálló varrat, felelős szerkezetekhez. Nedvességre érzékeny, ezért használat előtt **szárítani** kell (pl. 300–350 °C-on), és általában **egyenárammal** (DC+) hegesztik.\n- **Cellulóz**: mély beolvadás, csővezetékek függőleges lefelé hegesztéséhez.\n\nElőnye: egyszerű, olcsó gép, **szabadban, szélben** is működik, nem kell gázpalack. Hátránya: lassú, sok elektródacsere, salakolás.'
        },
        {
          title: 'MIG/MAG: védőgázas fogyóelektródás ívhegesztés (131/135)',
          text: 'A hegesztőpisztolyon keresztül egy **huzaladagoló** folyamatosan tolja ki a **huzalelektródát** (pl. 0,8–1,2 mm), amely az ívben leolvad. A pisztoly **gázterelő hüvelyéből** áramló **védőgáz** védi az ömledéket. Ezt hívják köznyelven „CO-hegesztésnek” vagy félautomata hegesztésnek.\n\n- **MIG** (Metal Inert Gas): **semleges (inert) gáz**, pl. **argon**. Alumínium, réz hegesztéséhez.\n- **MAG** (Metal Active Gas): **aktív gáz**, **CO₂** vagy **argon + CO₂** keverék (pl. 82% Ar + 18% CO₂). Szerkezeti acélhoz. A keverékgáz kevesebbet fröcsköl, szebb varratot ad, mint a tiszta CO₂.\n- **Porbeles huzal** (136/114): a huzal belsejében por van, amely salakot és gázt képez. Az önvédő porbeles huzal gáz nélkül, szabadban is használható.\n\nElőnye: **gyors**, termelékeny, nincs elektródacsere, könnyen tanulható. Hátránya: a szél **elfújja** a védőgázt, ezért szabadban nehéz vele dolgozni.'
        },
        {
          title: 'AWI / TIG: volfrámelektródás védőgázas ívhegesztés (141)',
          text: 'Az ív egy **nem leolvadó volfrámelektróda** és a munkadarab között ég, **argon** védőgázban. A hozaganyagot a hegesztő a másik kezével, **pálcaként** adagolja (vagy hozag nélkül is összeolvaszthatja a széleket).\n\n- A **legszebb, legtisztább** varratot adja, fröcskölés és salak nélkül.\n- Nagyon pontosan szabályozható: **vékony lemezek**, **rozsdamentes** acél, csővezetékek gyökvarrata, **alumínium** (ehhez váltakozó áram kell).\n- Hátránya: **lassú**, két kéz (és gyakran lábpedál) összehangolását igényli, ezért nehezebb megtanulni.\n\nA magyar név: **AWI** = argon védőgázas volfrámelektródás ívhegesztés. Az angol: **TIG** (Tungsten Inert Gas).'
        },
        {
          title: 'Lánghegesztés (311)',
          text: '**Oxigén és acetilén** keverékének lángja (kb. **3100 °C**) olvasztja meg az anyagot, a hozaganyagot pálcaként adagolják. A láng beállítása szerint:\n\n- **semleges láng**: oxigén és acetilén kb. egyenlő arányban, acélhoz ez kell,\n- **oxigénfelesleges (oxidáló)** és **acetilénfelesleges (karburáló)** láng: különleges esetekre.\n\nMa már ritkábban hegesztenek vele, de **vékony csövekhez**, javításokhoz, **forrasztáshoz**, **melegítéshez** (hajlítás, rozsdás csavar oldása) és **lángvágáshoz** ma is használják. Előnye, hogy nem kell hozzá áram.'
        },
        {
          title: 'A védőgáz szerepe',
          text: 'A levegő **oxigénje és nitrogénje** az olvadt fémbe oldódva:\n\n- **oxidálja** a fémet (salakos, gyenge varrat),\n- dermedéskor buborékokat, **porozitást** okoz,\n- **ridegíti** a varratot.\n\nA védőgáz (vagy MMA-nál az elektróda bevonatából keletkező gáz) **kiszorítja a levegőt** az ív és az ömledék környezetéből. Ezenkívül befolyásolja az **ív stabilitását**, a **beolvadás** alakját és a **fröcskölést**.\n\n- **Argon** (inert): nem lép reakcióba, stabil, nyugodt ív. MIG, AWI.\n- **CO₂** (aktív): olcsó, mély beolvadás, több fröcskölés. MAG.\n- **Ar + CO₂** keverék: a kettő előnyei.\n\nA gázmennyiséget az **átfolyásmérőn** állítják be, MAG-nál jellemzően kb. **10–15 l/perc**, AWI-nál kb. **6–10 l/perc**. A túl kevés gáz nem véd, a túl sok örvénylik, és levegőt szív be.'
        },
        {
          title: 'Egy kis történelem',
          text: 'A hegesztés modern története alig 150 éves. Kattints az évszámokra!',
          widget: { type: 'idovonal', options: { title: 'A hegesztés története', events: [
            { year: 1881, title: 'Szénelektródás ívhegesztés', text: 'Nyikolaj Benardosz szénelektróda és a munkadarab közti ívvel olvasztotta össze a fémet.' },
            { year: 1888, title: 'Fémelektródás ívhegesztés', text: 'Nyikolaj Szlavjanov fém elektródát használt, amely maga is leolvadt, és hozaganyag lett belőle.' },
            { year: 1903, title: 'Oxigén-acetilén láng', text: 'Francia mérnökök kifejlesztik az oxigén-acetilén égőt: megszületik a lánghegesztés és a lángvágás.' },
            { year: 1907, title: 'Bevont elektróda', text: 'Oscar Kjellberg svéd mérnök szabadalma: a bevonat védi az ömledéket, így sokkal jobb lesz a varrat.' },
            { year: 1941, title: 'Volfrámelektródás védőgázas hegesztés', text: 'Az USA repülőgépiparában kifejlesztik a nem leolvadó volfrámelektródás, semleges gázos eljárást (a mai AWI/TIG elődjét) magnézium és alumínium hegesztésére.' },
            { year: 1948, title: 'MIG hegesztés', text: 'Megjelenik a folyamatos huzalelektródás, semleges gázos ívhegesztés.' },
            { year: 1953, title: 'CO₂ védőgáz (MAG)', text: 'Az olcsó szén-dioxid védőgáz bevezetése: a félautomata hegesztés elterjed az acélszerkezetgyártásban.' }
          ] } }
        }
      ],
      quiz: [
        { q: 'Melyik eljárásnál NEM olvad le az elektróda?', options: ['MMA (bevont elektródás)', 'MAG', 'AWI/TIG', 'MIG'], answer: 2, explain: 'AWI/TIG-nél a volfrámelektróda nem olvad le, a hozaganyagot külön pálcaként adagolják.' },
        { q: 'Mi a különbség a MIG és a MAG között?', options: ['A védőgáz: MIG-nél semleges (argon), MAG-nál aktív (CO₂ vagy keverék)', 'A MIG kézi, a MAG automata', 'A MAG-nál nincs huzal', 'Nincs különbség'], answer: 0, explain: 'Mindkettő fogyó huzalelektródás, csak a védőgáz eltérő: Metal Inert Gas és Metal Active Gas.' },
        { q: 'Mi a védőgáz fő feladata?', options: ['Hűteni a hegesztőt', 'Távol tartani a levegő oxigénjét és nitrogénjét az ömledéktől', 'Gyorsítani a huzal adagolását', 'Csökkenteni az áramfogyasztást'], answer: 1, explain: 'A levegő gázai porozitást, oxidációt és rideg varratot okoznának.' }
      ]
    },
    {
      id: 'parameterek',
      title: 'Hegesztőgép és paraméterek',
      level: 2, minutes: 14,
      summary: 'Hegesztőáram, ívfeszültség, ívhossz, polaritás és bekapcsolási idő: mit állítasz a gépen, és mi történik, ha rosszul.',
      tags: ['hegesztőgép', 'inverter', 'hegesztőáram', 'ívfeszültség', 'ívhossz', 'polaritás', 'DC+', 'DC−', 'váltakozó áram', 'bekapcsolási idő', 'ED', 'duty cycle', 'huzalelőtolás', 'hőbevitel'],
      sections: [
        {
          title: 'Hegesztő áramforrások',
          text: 'A hegesztéshez **nagy áram** (tipikusan 50–300 A) és **kis feszültség** (kb. 15–35 V) kell. A gép a hálózati feszültséget ehhez alakítja át:\n\n- **Hegesztőtranszformátor**: egyszerű, nehéz, **váltakozó áramot** ad.\n- **Egyenirányító**: transzformátor + egyenirányító, **egyenáramot** ad.\n- **Inverteres gép**: a hálózati áramot nagy frekvencián alakítja, ezért **kicsi, könnyű**, pontosan szabályozható. Ma ez a legelterjedtebb.\n\nA gép jelleggörbéje az eljáráshoz illik:\n\n- **MMA és AWI**: **állandó áramú** (eső jelleggörbéjű) gép. Az áramot állítod be, és ha a kezed remeg (változik az ívhossz), az áram alig változik.\n- **MIG/MAG**: **állandó feszültségű** (lapos jelleggörbéjű) gép. A **feszültséget** és a **huzalelőtolást** állítod; az áramot a huzalelőtolás határozza meg.'
        },
        {
          title: 'Hegesztőáram',
          text: 'Az áram határozza meg, mennyi hő jut a varratba, vagyis a **beolvadás mélységét**. Bevont elektródánál egy jó kiinduló szabály: kb. **30–40 A elektróda-milliméterenként**:\n\n- **2,5 mm**-es elektróda: kb. **70–100 A**\n- **3,2 mm**-es elektróda: kb. **100–140 A**\n- **4,0 mm**-es elektróda: kb. **140–180 A**\n\nA pontos tartomány a dobozon van, és függ a helyzettől (fej fölött kevesebb), a lemezvastagságtól és az elektróda típusától.\n\n- **Túl kicsi áram**: az elektróda **leragad**, az ív nehezen gyullad, **nincs beolvadás**, a varrat „ráül” a lemezre, salakzárvány keletkezik.\n- **Túl nagy áram**: sok **fröcskölés**, **alámetszés** a varrat szélén, **átégés**, az elektróda vége izzik, a bevonat lepereg.',
          tip: 'Hallgasd az ívet! A jó MAG-ív egyenletesen „serceg”, mint a sülő szalonna. A pattogó, robbanó hang túl rövid ívre vagy túl kevés feszültségre utal, a sziszegő, lobogó hang túl hosszú ívre.'
        },
        {
          title: 'Ívhossz és ívfeszültség',
          text: 'Az **ívhossz** az elektróda vége és az ömledék közti távolság. Bevont elektródánál a jó ívhossz kb. az **elektróda magátmérője** (pl. 3,2 mm-es elektródánál kb. 3 mm).\n\n- **Túl hosszú ív**: az ív lobog, **fröcsköl**, a védőgáz nem véd, ezért **porozitás** keletkezik, a varrat lapos és széles, a beolvadás kicsi.\n- **Túl rövid ív**: az elektróda leragad, a varrat keskeny és púpos.\n\nAz **ívfeszültség** az ívhosszal együtt nő. MIG/MAG-nál ezt **közvetlenül a gépen állítod**: több feszültség → hosszabb ív, szélesebb, laposabb varrat. A feszültséget és a huzalelőtolást **együtt**, egymáshoz hangolva kell beállítani (sok gépen ezt a **szinergikus** program elvégzi).\n\n**Hőbevitel:** a varratba jutó hő az áramtól, a feszültségtől és a hegesztési sebességtől függ:\n\n`Q = k · U · I / v`\n\nPélda: U = 24 V, I = 200 A, v = 5 mm/s, k = 0,8 (MAG hatásfok): `Q = 0,8 · 24 · 200 / 5 = 768 J/mm ≈ 0,77 kJ/mm`. Lassabb haladásnál több a hőbevitel, nagyobb a vetemedés.'
        },
        {
          title: 'Polaritás',
          text: 'Egyenáramnál számít, hogy az elektróda (vagy huzal) a **pozitív** vagy a **negatív** pólusra kerül. Az ívben a hő nem egyenletesen oszlik meg, ezért a polaritás befolyásolja a beolvadást és az elektróda melegedését.\n\n- **DC+** (elektróda a pluszon, „fordított polaritás”): **MIG/MAG** mindig így megy. A **bázikus** elektródák többsége is DC+-on hegeszt.\n- **DC−** (elektróda a mínuszon, „egyenes polaritás”): **AWI acélhoz és rozsdamenteshez**: a volfrámelektróda így kevésbé melegszik. Az **önvédő porbeles huzalok** nagy része is DC−.\n- **AC** (váltakozó áram): **AWI alumíniumhoz**. A pozitív félperiódus „feltöri” az oxidréteget (tisztító hatás), a negatív hegeszt.\n\nRutilos elektródánál a gyártó gyakran többféle polaritást is megenged. **Mindig nézd meg az elektróda dobozát** vagy a huzal adatlapját!',
          warn: 'Polaritást (kábelcserét) csak **kikapcsolt** gépen végezz! A rossz polaritás nehéz ívgyújtást, sok fröcskölést, porozitást okozhat.'
        },
        {
          title: 'Bekapcsolási idő (ED)',
          text: 'A hegesztőgép hegesztés közben melegszik, ezért nem bír akármeddig teljes áramon dolgozni. A **bekapcsolási idő** (ED, angolul duty cycle) megmutatja, egy **10 perces** cikluson belül a gép hány százalékában hegeszthetsz az adott árammal.\n\nPélda: **„200 A @ 60%”** azt jelenti, hogy 200 A-rel 10 percből **6 percig** hegeszthetsz, utána **4 percig** hűlnie kell.\n\n- Kisebb áramnál nagyobb a bekapcsolási idő (pl. 150 A @ 100%: folyamatosan).\n- Ha túlléped, a **hővédelem** kiold, és a gép hűlésig nem hegeszt. Ilyenkor **ne kapcsold ki**: a ventilátor hűti!\n\nKözelítő átszámítás: `I2 = I1 · √(ED1 / ED2)`. Ha a gép 200 A @ 60%, akkor 100%-on kb. `200 · √0,6 ≈ 155 A`-t bír folyamatosan.',
          widget: { type: 'gyakorlas', options: { kind: 'szazalek', title: 'Százalékszámítás gyakorló', help: 'A bekapcsolási idő, a gázkeverék aránya és a hatásfok is százalékszámítás. Például: 10 perc 35%-a = 3,5 perc hegesztés.' } }
        }
      ],
      quiz: [
        { q: 'Mit jelent a „160 A @ 35%” felirat a gépen?', options: ['160 A-rel 10 percből 3,5 percig hegeszthetsz', '160 A-rel 35 percig hegeszthetsz', 'A gép hatásfoka 35%', '35 V a feszültség'], answer: 0, explain: 'A bekapcsolási idő 10 perces ciklusra vonatkozik: 35% = 3,5 perc hegesztés, 6,5 perc hűlés.' },
        { q: 'Mi történik túl hosszú ívnél?', options: ['Az elektróda leragad', 'Fröcskölés, porozitás, kis beolvadás', 'Mélyebb lesz a beolvadás', 'Semmi'], answer: 1, explain: 'A hosszú ív lobog, és a védőgáz nem tudja megvédeni az ömledéket.' },
        { q: 'Milyen polaritással hegesztünk MIG/MAG eljárással (tömör huzallal)?', options: ['DC− (huzal a mínuszon)', 'DC+ (huzal a pluszon)', 'Váltakozó árammal', 'Mindegy'], answer: 1, explain: 'Tömör huzalos MIG/MAG-nál a huzal a pozitív póluson van.' }
      ]
    },
    {
      id: 'varratok',
      title: 'Varratok és hibák',
      level: 2, minutes: 14,
      summary: 'Tompa- és sarokvarrat, élelőkészítés, hegesztési helyzetek, a jellegzetes varrathibák és a vizsgálati módszerek.',
      tags: ['varrat', 'tompavarrat', 'sarokvarrat', 'V-varrat', 'élelőkészítés', 'gyökvarrat', 'a-méret', 'beolvadás', 'porozitás', 'repedés', 'salakzárvány', 'alámetszés', 'szemrevételezés', 'festékpenetrációs vizsgálat', 'ultrahangos vizsgálat', 'roncsolásmentes vizsgálat'],
      sections: [
        {
          title: 'Tompavarrat és élelőkészítés',
          text: 'A **tompavarrat** két egymás mellé (egy síkba) illesztett lemezt köt össze. A cél a **teljes átolvadás**: a varratnak a lemez teljes vastagságán át kell érnie.\n\n- **I-varrat**: vékony lemeznél (kb. 3–4 mm-ig) a széleket nem kell megmunkálni, csak egy kis **gyökhézagot** hagyni.\n- **V-varrat**: vastagabb lemeznél a széleket **leélezik**, kb. **60°**-os nyílásszöggel, alul kis **gyökmagassággal** (orral) és **gyökhézaggal**.\n- **X-varrat**: nagyon vastag lemeznél mindkét oldalról élezve: kevesebb hozaganyag kell, és kisebb a vetemedés.\n\nVastag varrat több rétegben készül: **gyökvarrat** (alul, a legkényesebb), **töltőrétegek**, végül a **takaróréteg** (fedőréteg).'
        },
        {
          title: 'Sarokvarrat',
          text: 'A **sarokvarrat** két, egymással szöget bezáró lemezt köt össze: **T-kötés**, **átlapolt kötés**, **sarokkötés**. A leggyakoribb varrattípus az acélszerkezetekben.\n\nMéretét az **a-méret** (varratvastagság) adja meg: a varrat keresztmetszetébe írható egyenlő szárú háromszög **magassága**. A **szárhossz** (z) ennél nagyobb: `a ≈ 0,7 · z`. Egy **a4**-es varrat szára tehát kb. 5,7 mm.\n\nA jó sarokvarrat felülete **sík vagy enyhén domború**, mindkét lemezbe egyformán beolvad, és a szélein nincs alámetszés.'
        },
        {
          title: 'Hegesztési helyzetek',
          text: 'A varrat helyzete nagyban befolyásolja a nehézséget, ezért szabványos jelölése van (ISO 6947):\n\n- **PA**: vízszintes, felülről (**kádhelyzet**), a legkönnyebb.\n- **PB**: vízszintes sarokvarrat (függőleges és vízszintes lemez között).\n- **PC**: függőleges falon vízszintesen futó varrat (**harántvarrat**).\n- **PF**: függőleges, **alulról felfelé**.\n- **PG**: függőleges, **felülről lefelé**.\n- **PE**: **fej feletti**, a legnehezebb.\n\nA hegesztővizsgán is azt nézik, milyen helyzetekben tudsz jó varratot készíteni.'
        },
        {
          title: 'A leggyakoribb varrathibák',
          text: '- **Beolvadási hiba (kötéshiány)**: a varrat nem olvadt össze az alapanyaggal vagy az előző réteggel. Okai: kis áram, túl gyors haladás, rossz pisztoly- vagy elektródaszög. Kívülről nem mindig látszik, ezért **nagyon veszélyes**.\n- **Gyökhiba**: a gyök nem olvadt át, a lemez hátoldalán rés maradt.\n- **Porozitás (gázzárvány)**: kis buborékok a varratban vagy a felületén. Okai: kevés vagy elfújt védőgáz, nedves elektróda, olajos, rozsdás, festékes, horganyzott felület, túl hosszú ív.\n- **Salakzárvány**: a varratba zárt salak. Okai: a rétegek között nem verték le a salakot, kis áram, rossz elektródavezetés.\n- **Repedés**: a **legveszélyesebb** hiba, mert terhelésre tovább terjed. **Melegrepedés** a dermedéskor, a varrat közepén; **hidegrepedés** órákkal később, a hőhatásövezetben, főleg hidrogén (nedves elektróda), rideg anyag és nagy merevség miatt.\n- **Alámetszés**: beégett horony a varrat szélén. Okai: túl nagy áram, túl hosszú ív.\n- **Fröcskölés**, **túl nagy varratdudor**, **átégés**, **vetemedés**.',
          widget: { type: 'parositas', options: { title: 'Párosítsd a hibát a jellemző okával!', count: 6, pairs: [
            ['Porozitás', 'Kevés vagy elfújt védőgáz, szennyezett felület'],
            ['Salakzárvány', 'Nem verték le a salakot a rétegek között'],
            ['Alámetszés', 'Túl nagy áram vagy túl hosszú ív'],
            ['Beolvadási hiba', 'Kis áram, túl gyors haladás'],
            ['Hidegrepedés', 'Hidrogén (nedves elektróda), rideg anyag'],
            ['Átégés', 'Túl nagy hőbevitel vékony lemeznél'],
            ['Fröcskölés', 'Rossz feszültség–huzalelőtolás arány, túl hosszú ív']
          ] } }
        },
        {
          title: 'Varratvizsgálat',
          text: '**Roncsolásmentes vizsgálatok** (a darab épen marad):\n\n- **Szemrevételezés** (VT): az **első és legfontosabb** vizsgálat. Méretek, felületi hibák, alámetszés, repedés, porozitás, fröcskölés. Lámpa, nagyító, varratmérő idomszer kell hozzá.\n- **Festékpenetrációs vizsgálat** (PT): a **felületre nyíló** hibákat mutatja meg, bármilyen nem porózus anyagon (inox, alumínium is). Menete: tisztítás → **piros penetráló folyadék** felvitele → várakozás (kb. 10–30 perc) → felesleg letörlése → **fehér előhívó** → a repedésből kiszívódó festék piros vonalként rajzolódik ki.\n- **Mágnesporos vizsgálat** (MT): felületi és felszín közeli hibák **ferromágneses** acélon.\n- **Ultrahangos vizsgálat** (UT): a hanghullám a **belső hibákról** (repedés, beolvadási hiba) visszaverődik. Csatolóközeg (gél) kell a fej és a darab közé. Képzett vizsgáló kell hozzá.\n- **Radiográfiai vizsgálat** (RT): röntgen- vagy gammasugárzással „átvilágítják” a varratot, a filmen látszanak a zárványok és a pórusok. Sugárvédelem miatt csak engedéllyel.\n\n**Roncsolásos vizsgálatok** (próbadarabon): hajlító-, szakító-, ütővizsgálat, **makrocsiszolat** (a varrat keresztmetszetét csiszolják és maratják). Így vizsgáztatják a hegesztőket is.'
        }
      ],
      quiz: [
        { q: 'Melyik a legveszélyesebb varrathiba?', options: ['A fröcskölés', 'A repedés', 'A kissé domború varrat', 'Az elszíneződés'], answer: 1, explain: 'A repedés terhelés hatására tovább terjed, és a szerkezet töréséhez vezethet.' },
        { q: 'Mit mutat ki a festékpenetrációs vizsgálat?', options: ['A varrat belsejében lévő zárványokat', 'A felületre nyíló hibákat (repedés, pórus)', 'A varrat szilárdságát', 'Az acél széntartalmát'], answer: 1, explain: 'A penetráló folyadék csak a felületre nyíló résekbe szívódik be.' },
        { q: 'Mi a sarokvarrat „a-mérete”?', options: ['A varrat hossza', 'A beírható egyenlő szárú háromszög magassága', 'A lemezvastagság', 'Az elektróda átmérője'], answer: 1, explain: 'Az a-méret a varratvastagság, a szárhossz ennek kb. 1,4-szerese.' }
      ]
    },
    {
      id: 'munkavedelem',
      title: 'A hegesztő munkavédelme',
      level: 1, minutes: 14,
      summary: 'UV-sugárzás és hegesztőpajzs, füst és elszívás, tűzvédelem, gázpalackok kezelése és áramütés.',
      tags: ['munkavédelem', 'UV-sugárzás', 'ívfény', 'hegesztőpajzs', 'DIN-fokozat', 'automata pajzs', 'hegesztési füst', 'elszívás', 'fémgőzláz', 'tűzvédelem', 'gázpalack', 'oxigén', 'acetilén', 'visszaégésgátló', 'áramütés', 'védőruha'],
      sections: [
        {
          title: 'Az ív fénye: UV és infravörös sugárzás',
          text: 'Az ív rendkívül erős **ultraibolya (UV)**, látható és **infravörös (IR)** sugárzást bocsát ki.\n\n- Az UV néhány másodperc alatt **„hegesztőszemet”** (ívfény okozta szaruhártya- és kötőhártya-gyulladást) okoz. Órákkal később, gyakran éjjel jelentkezik: erős **homokszemcse-érzés**, könnyezés, fényérzékenység, fájdalom.\n- Az IR hosszú távon **szürkehályogot** okozhat.\n- Az UV a fedetlen bőrt percek alatt **leégeti**, mint a legerősebb napfény.\n\nAz ívbe **soha ne nézz** szabad szemmel, egy pillanatra se, még messziről sem. A **napszemüveg nem véd**!',
          warn: 'Az ív fénye a **közelben dolgozókat** is veszélyezteti. A hegesztőhelyet **hegesztőfüggönnyel vagy paravánnal** el kell keríteni, és szólj, mielőtt ívet gyújtasz („Vigyázz, szem!”).'
        },
        {
          title: 'Hegesztőpajzs és védőszűrő',
          text: 'A pajzs vagy sisak **védőszűrőjének sötétségét** a **DIN-fokozat** (védőfokozat) adja meg: minél nagyobb a szám, annál sötétebb. A szükséges fokozat az **eljárástól és az áramerősségtől** függ (tájékoztató értékek):\n\n- **lánghegesztés**, forrasztás: **DIN 4–6**\n- **MMA**: kb. **DIN 9–13** (pl. 100–175 A között 11, 175–300 A között 12)\n- **MIG/MAG**: kb. **DIN 10–14**\n- **AWI**: kb. **DIN 9–13**\n\nAz **automata sötétedő** pajzs nyugalmi állapotban világos (kb. DIN 3–4), és az ív gyulladásakor ezredmásodpercek alatt elsötétül. Az **UV- és IR-szűrés** a világos állapotban is folyamatosan véd. A szűrő elé **védőüveg** kerül a fröcskölés ellen: ha karcos, cseréld.\n\nA pajzs alatt **védőszemüveget** is viselj, mert salakveréskor és köszörüléskor a pajzsot felhajtod.'
        },
        {
          title: 'Hegesztési füst',
          text: 'A hegesztési füst apró fém-oxid részecskékből és gázokból áll. A hegesztési füstöt a nemzetközi rákkutató ügynökség **rákkeltőnek** minősítette.\n\n- **Rozsdamentes acél** hegesztésekor **króm(VI)** és nikkel szabadul fel: rákkeltő.\n- **Horganyzott acélnál** cink-oxid füst keletkezik, ami **fémgőzlázat** okoz (influenzaszerű tünetek: láz, hidegrázás, néhány óra múlva).\n- Festett, olajos felületből mérgező bomlástermékek keletkeznek.\n- **Klórtartalmú zsírtalanítók** gőzéből az ív UV-sugárzása **foszgént**, egy rendkívül mérgező gázt képez. Ilyen oldószer ne legyen a hegesztés közelében!\n\nVédekezés: **helyi elszívás** közvetlenül a füst keletkezési helyén (elszívókar, pisztolyba épített elszívás), jó szellőzés, a fej **ne legyen a füstoszlopban**, szükség esetén **FFP3** maszk vagy **friss levegős (ventilált) pajzs**.',
          warn: 'Zárt, szűk térben (tartály, akna, gödör) a **védőgáz** (argon, CO₂) kiszorítja az oxigént, és **szagtalanul, figyelmeztetés nélkül fulladást** okoz. Az argon és a CO₂ nehezebb a levegőnél, ezért a mélyedésekben összegyűlik. Ilyen helyen csak szellőztetéssel, oxigénméréssel, kint álló segítővel szabad dolgozni.'
        },
        {
          title: 'Tűzvédelem',
          text: 'A hegesztési szikra és a fröcskölés **akár 10 méterre** is elrepül, résekbe, padlóhézagokba, falnyílásokba hullhat, és ott órák múlva is lángra lobbanthat valamit. A hegesztés **tűzveszélyes tevékenység**, alkalmi helyszínen (nem hegesztőműhelyben) írásos **engedély** kell hozzá.\n\n- Az éghető anyagot (fa, papír, rongy, festék, olaj, műanyag) **távolítsd el**, amit nem lehet, takard le nem éghető takaróval.\n- Legyen kéznél **tűzoltó készülék**, szükség esetén legyen **tűzőr**.\n- A munka után **legalább fél–egy óráig** ellenőrizd a helyet (rejtett parázs), és később is nézz rá.\n- **Üres tartályt, hordót, üzemanyagtartályt tilos** csak úgy hegeszteni vagy vágni: a maradék gőz **felrobban**. Csak szakszerű tisztítás és közömbösítés után, szakember végezheti.'
        },
        {
          title: 'Gázpalackok kezelése',
          text: '- A palackot **állítva**, **lánccal vagy bilinccsel rögzítve** tárold és használd, hogy ne dőljön el. Szállításkor a **szelepvédő sapka** legyen rajta.\n- Az **acetilénpalack mindig álljon**: acetonban oldott acetilén van benne, fekve az aceton a szelepbe juthat.\n- Ne tedd ki hőnek, napsütésnek, szikrának; tartsd távol a hegesztési helytől.\n- A szelepet **lassan** nyisd, és ne állj a nyomáscsökkentő elé.\n- Az **oxigénszelephez és nyomáscsökkentőhöz olajos, zsíros kézzel, kesztyűvel, szerszámmal nyúlni tilos**: a nagy nyomású oxigén és az olaj **öngyulladást, robbanást** okozhat.\n- Szivárgást **szappanos vízzel** (vagy szivárgáskereső spray-vel) keress, **soha nem lánggal**!\n- Lánghegesztő berendezésen kötelező a **lángvisszacsapás-gátló** (visszaégésgátló) szelep.\n\nA palackok színjelölése a vállukon (Európában): **oxigén – fehér**, **acetilén – gesztenyebarna**, **argon – sötétzöld**, **CO₂ – szürke**. A biztos azonosítást mindig a **palack címkéje** adja.',
          warn: 'A felborult, letört szelepű gázpalack **rakétaként** repülhet. Rögzítetlen palack mellett soha ne dolgozz!'
        },
        {
          title: 'Áramütés és védőruha',
          text: 'A hegesztőgép **üresjárati feszültsége** (ív nélkül) akár 50–100 V is lehet. Száraz kézzel ez általában „csak” csíp, de **nedves, izzadt** bőrrel, **vasszerkezeten, tartályban, szűk helyen** életveszélyes lehet.\n\n- Csak **száraz, ép** hegesztőkesztyűben dolgozz, és nedves kesztyűben ne cserélj elektródát.\n- Ne állj vizes talajon; használj szigetelő alátétet.\n- Szűk, vezető környezetben csak erre alkalmas (**„S” jelű**) géppel szabad hegeszteni.\n- A **testkábelt közvetlenül a munkadarabhoz** csatlakoztasd, a varrat közelében. Ha épületszerkezeten, csővezetéken, gépvázon át folyik az áram, az ott kárt és veszélyt okozhat.\n- Sérült kábellel, elektródafogóval, csatlakozóval nem szabad dolgozni.\n- **Szívritmus-szabályozóval** (pacemakerrel) élő ember ne hegesszen, és ne tartózkodjon a kábelek közelében orvosi engedély nélkül.\n\n**Védőruha:** lángálló **pamut- vagy bőr** munkaruha (műszálas ruha megolvad és a bőrre ég!), **bőrkötény**, **hegesztőkesztyű**, magas szárú **bakancs**, a nadrág szára a bakancson **kívül**. Ne legyen felhajtott hajtóka, nyitott zseb, ahova szikra eshet, és ne legyen öngyújtó a zsebedben.'
        }
      ],
      quiz: [
        { q: 'Mi a „hegesztőszem” oka?', options: ['Az ív UV-sugárzása', 'A füst', 'A szikra', 'A zaj'], answer: 0, explain: 'Az ív UV-sugárzása okozza a szaruhártya-gyulladást, órákkal a sugárzás után.' },
        { q: 'Mivel keresd a gázszivárgást?', options: ['Öngyújtóval', 'Szappanos vízzel', 'Szaglással', 'Gyufával'], answer: 1, explain: 'A szappanos víz buborékot képez a szivárgásnál. Lánggal keresni életveszélyes.' },
        { q: 'Miért nem szabad olajos kézzel az oxigénpalack szelepéhez nyúlni?', options: ['Mert csúszik', 'Mert a nagy nyomású oxigén és az olaj öngyulladást, robbanást okozhat', 'Mert az oxigén mérgező', 'Mert a szelep berozsdásodik'], answer: 1, explain: 'Tiszta oxigénben az olaj és a zsír hevesen, akár robbanásszerűen ég.' }
      ]
    }
  ]
});

/* Hibakereső döntési fák (formátum: js/hibakereses.js fejléce) */
STUDIE.addTrouble({
  id: 'hegesztes-porozus',
  title: 'Porózus (lyukacsos) a varrat',
  lessons: ['hegesztes/varratok', 'hegesztes/eljarasok'],
  intro: 'A porozitás szinte mindig arra utal, hogy a levegő vagy nedvesség bejutott az ömledékbe. Haladj végig a kérdéseken! Ellenőrzés közben is viseld a védőfelszerelést, a gázpalack szelepét lassan nyisd, és **a szivárgást szappanos vízzel, soha ne lánggal** keresd.',
  start: 'eljaras',
  nodes: {
    eljaras: { q: 'Milyen eljárással hegesztesz?', answers: [
      { t: 'MIG/MAG (huzallal, védőgázzal)', next: 'gaz_van' },
      { t: 'AWI/TIG', next: 'gaz_van' },
      { t: 'Bevont elektródával (MMA)', next: 'elektroda' }] },
    gaz_van: { q: 'Áramlik a védőgáz, és jó a beállított mennyiség?', check: 'Nyisd a palackszelepet, nézd meg a nyomásmérőt (van-e még gáz a palackban), és a pisztoly gázgombjával (vagy rövid gázelőáramlással) ellenőrizd az átfolyásmérőt. MAG-nál kb. 10–15 l/perc, AWI-nál kb. 6–10 l/perc a szokásos.', answers: [
      { t: 'Kifogyott a palack, vagy zárva a szelep', next: 'r_nincs_gaz' },
      { t: 'Nagyon kevés vagy nagyon sok a gáz', next: 'r_gazmennyiseg' },
      { t: 'A gáz rendben áramlik', next: 'huzat' }] },
    huzat: { q: 'Van huzat, szél, ventilátor a hegesztés helyén?', answers: [
      { t: 'Igen, szabadban vagy nyitott ajtónál, ventilátor mellett hegesztek', next: 'r_huzat' },
      { t: 'Nincs huzat', next: 'pisztoly' }] },
    pisztoly: { q: 'Milyen állapotú a gázterelő hüvely (fúvóka), és hogyan tartod a pisztolyt?', check: 'Kapcsold ki a gépet, és nézd meg a gázterelő hüvelyt: tele van fröcsköléssel? Gondold végig: túl messze tartod a darabtól, vagy nagyon dönti a pisztolyt?', answers: [
      { t: 'A hüvely eltömődött fröcsköléssel', next: 'r_huvely' },
      { t: 'Messze tartom, vagy nagyon döntöm', next: 'r_pisztolytartas' },
      { t: 'A hüvely tiszta, a tartás rendben', next: 'tomitetlen' }] },
    tomitetlen: { q: 'Van szivárgás a gázútban (tömlő, csatlakozók, pisztolycsatlakozó)?', check: 'Kikapcsolt gépnél nyitott gázzal kend be a csatlakozásokat szappanos vízzel. Buborék = szivárgás. Sérült tömlőnél a szivárgó rés levegőt is beszívhat.', answers: [
      { t: 'Igen, buborékol valahol', next: 'r_szivargas' },
      { t: 'Nem szivárog', next: 'felulet' }] },
    elektroda: { q: 'Milyen az elektróda állapota és tárolása?', check: 'Nézd meg a bevonatot: ép, száraz? Bázikus elektródánál: szárítottad használat előtt? Nyitott dobozban, párás helyen állt?', answers: [
      { t: 'Nyirkos helyen állt, vagy bázikus és nem szárítottam', next: 'r_nedves_elektroda' },
      { t: 'Sérült, lepergett a bevonata', next: 'r_serult_elektroda' },
      { t: 'Száraz és ép', next: 'ivhossz' }] },
    ivhossz: { q: 'Milyen hosszú ívvel hegesztesz?', check: 'A jó ívhossz kb. az elektróda magátmérője. Ha lobog, sziszeg, sokat fröcsköl, valószínűleg túl hosszú.', answers: [
      { t: 'Elég hosszú, az ív lobog', next: 'r_hosszu_iv' },
      { t: 'Rövid, az elektróda szinte hozzáér', next: 'felulet' }] },
    felulet: { q: 'Milyen volt a lemez felülete a varrat helyén?', answers: [
      { t: 'Rozsdás, olajos, festékes vagy nedves', next: 'r_szennyezett' },
      { t: 'Horganyzott', next: 'r_horgany' },
      { t: 'Fémtiszta, száraz', next: 'r_anyag' }] },
    r_nincs_gaz: { result: 'Nincs védőgáz', fix: 'Nyisd ki teljesen a palackszelepet, vagy cserélj palackot. A palackcserét lezárt szeleppel végezd, a palackot rögzítsd lánccal. Hegesztés után a palackszelepet mindig zárd el.', level: 'ok' },
    r_gazmennyiseg: { result: 'Rosszul beállított gázmennyiség', fix: 'A **túl kevés** gáz nem véd, a **túl sok** örvénylik, és levegőt kever az ömledékbe. Állítsd be a szokásos értékre (MAG kb. 10–15 l/perc, AWI kb. 6–10 l/perc), a hüvely méretéhez és az áramhoz igazítva.', level: 'ok' },
    r_huzat: { result: 'A huzat elfújja a védőgázt', fix: 'Zárd be az ajtót, kapcsold ki a ventilátort, állíts fel **szélfogó paravánt**. Az elszívó kart ne tedd túl közel az ívhez, mert az is elszívja a gázt. Szabadban MMA-t vagy **önvédő porbeles huzalt** használj, ezek kevésbé érzékenyek a szélre.', level: 'ok' },
    r_huvely: { result: 'Eltömődött gázterelő hüvely', fix: 'A ráragadt fröcskölés eltéríti a gázáramot, és levegő jut az ívhez. **Kikapcsolt gépen** tisztítsd ki a hüvelyt (hüvelytisztító fogóval), és használj **fröcskölésgátló** sprayt vagy pasztát. Ellenőrizd a gázelosztó gyűrűt és a hüvely illeszkedését is.', level: 'ok' },
    r_pisztolytartas: { result: 'Rossz pisztolytartás', fix: 'A gázterelő hüvely és a munkadarab közti távolság MAG-nál kb. **10–15 mm** legyen, a pisztoly dőlésszöge kb. **10–20°**. Túl nagy távolságnál vagy dőlésnél a gázáram nem fedi az ömledéket. A varrat végén várj, amíg a **gázutóáramlás** lejár, csak utána emeld el a pisztolyt.', level: 'ok' },
    r_szivargas: { result: 'Szivárgó gázvezeték vagy csatlakozó', fix: 'Húzd meg vagy cseréld a hibás csatlakozót, tömítést, tömlőt. A sérült tömlőt nem szabad ragasztással „javítani”. Ha a hiba a gépben vagy a pisztolykábelben van, szervizben javíttasd.', level: 'warn', pro: true },
    r_nedves_elektroda: { result: 'Nedves elektróda (hidrogén és gőz kerül a varratba)', fix: 'A nedves bevonatból hidrogén és gőz kerül az ömledékbe: porozitás és **hidegrepedés** is keletkezhet. A bázikus elektródát a gyártó előírása szerint (pl. 300–350 °C-on, 1–2 óráig) **szárítsd ki**, és hegesztésig tartsd **tárolókemencében** vagy hőtartó tegezben. Az elektródát száraz helyen, zárt dobozban tárold.', level: 'warn' },
    r_serult_elektroda: { result: 'Sérült bevonatú elektróda', fix: 'Ahol a bevonat lepergett, ott nincs védőgáz és salak. Az ilyen elektródát dobd ki. Ne hajlítgasd, ne ejtsd le az elektródákat.', level: 'ok' },
    r_hosszu_iv: { result: 'Túl hosszú ív', fix: 'Hosszú ívnél a bevonatból keletkező gáz nem tudja megvédeni az ömledéket. Tartsd az ívhosszt kb. az elektróda **magátmérőjén**, és az elektróda leolvadásával arányosan **közelítsd** a kezed a darabhoz. Bázikus elektródával különösen rövid ívvel dolgozz.', level: 'ok' },
    r_szennyezett: { result: 'Szennyezett alapanyag', fix: 'A rozsda, olaj, festék, nedvesség az ívben gázzá bomlik, és buborékot képez. A varrat helyét és környékét (kb. 20 mm-es sávban) **köszörüld vagy keféld fémtisztára**, zsírtalaníts. Klórtartalmú zsírtalanítót ne használj, mert az ívfényben **foszgén** keletkezhet!', level: 'ok' },
    r_horgany: { result: 'A cinkréteg kiégése okozza', fix: 'A horgany az ívben elpárolog, és pórusokat okoz. A varrat helyén **köszörüld le a horganyt**, és hegesztés után a sérült részt pótold (pl. hidegcinkezéssel). A cinkgőz **fémgőzlázat** okoz: erős elszívás és légzésvédő kell!', level: 'warn' },
    r_anyag: { result: 'Anyag- vagy hozaganyag-probléma', fix: 'Ha minden más rendben van, a hiba lehet a hozaganyagban (nem az alapanyaghoz illő huzal vagy elektróda, rozsdás, szennyezett huzal), vagy az alapanyagban (pl. magas kén- vagy foszfortartalmú, automatacél). Próbálj új tekercs huzalt vagy új doboz elektródát, és egyeztesd a hozaganyagot a gyártó ajánlásával. Felelős szerkezetnél hegesztőmérnök döntse el, mi a teendő.', level: 'warn', pro: true }
  }
});

STUDIE.addTrouble({
  id: 'hegesztes-iv',
  title: 'Nem gyullad vagy szakadozik az ív',
  lessons: ['hegesztes/parameterek'],
  intro: 'Kezdd a legegyszerűbb okokkal! **Kábelt, polaritást, alkatrészt csak kikapcsolt, áramtalanított géppel** cserélj, és a gép belsejét ne bontsd meg: abban hálózati feszültség van.',
  start: 'gep',
  nodes: {
    gep: { q: 'Működik a gép (világít a kijelző, megy a ventilátor)?', answers: [
      { t: 'Nem, teljesen halott', next: 'r_halozat' },
      { t: 'Működik, de hibát vagy túlmelegedést jelez', next: 'r_tulmelegedes' },
      { t: 'Működik, nincs hibajelzés', next: 'test' }] },
    test: { q: 'Jól csatlakozik a testkábel (testcsipesz)?', check: 'Nézd meg, hogy a testcsipesz **fémtiszta** felületen, a varrat közelében, szorosan fog-e; nem rozsdás, festékes, laza. Nézd meg a kábelvégeket a gépnél is: ütközésig bedugva, elfordítva?', answers: [
      { t: 'Festékes, rozsdás felületen vagy lazán van, messze a varrattól', next: 'r_test' },
      { t: 'Rendben van', next: 'eljaras' }] },
    eljaras: { q: 'Milyen eljárással hegesztesz?', answers: [
      { t: 'Bevont elektródával (MMA)', next: 'mma' },
      { t: 'MIG/MAG', next: 'mag' },
      { t: 'AWI/TIG', next: 'awi' }] },
    mma: { q: 'Mi történik ívgyújtáskor?', answers: [
      { t: 'Az elektróda azonnal leragad', next: 'mma_aram' },
      { t: 'Szikrázik, de nem gyullad be, vagy az ív rögtön kialszik', next: 'mma_polaritas' },
      { t: 'Begyullad, de hegesztés közben szakadozik', next: 'r_ivhossz' }] },
    mma_aram: { q: 'Mekkora áramot állítottál be az elektróda átmérőjéhez képest?', check: 'Kiinduló érték: kb. 30–40 A elektróda-milliméterenként (pl. 3,2 mm-hez kb. 100–140 A). A pontos tartomány az elektróda dobozán van.', answers: [
      { t: 'Kevesebbet, mint ajánlott', next: 'r_kis_aram' },
      { t: 'Az ajánlott tartományban', next: 'r_gyujtas_technika' }] },
    mma_polaritas: { q: 'Az elektróda dobozán előírt polaritással és áramnemmel hegesztesz?', check: 'Nézd meg a dobozon: DC+, DC− vagy AC? A bázikus elektródák többsége DC+, és sok közülük AC-vel nem is hegeszthető.', answers: [
      { t: 'Nem, vagy nem tudom', next: 'r_polaritas' },
      { t: 'Igen, az előírt polaritással', next: 'r_nedves_elektroda' }] },
    mag: { q: 'Egyenletesen jön a huzal a pisztolyból?', check: 'Kapcsold be a huzalbefűzést (vagy nyomd a gombot, testkábel nélkül, a pisztolyt **a darabtól és magadtól elfordítva**). Figyeld, egyenletesen, rángatás nélkül jön-e a huzal.', answers: [
      { t: 'Akadozik, rángat, vagy megáll', next: 'r_huzaladagolas' },
      { t: 'Egyenletesen jön', next: 'mag_beallitas' }] },
    mag_beallitas: { q: 'Hogyan viselkedik az ív?', check: 'Hallgasd és nézd az ívet egy próbadarabon.', answers: [
      { t: 'A huzal „belerúg” a lemezbe, pattog, a pisztolyt hátratolja', next: 'r_mag_sok_huzal' },
      { t: 'Az ív hosszú, lobog, a huzalvégen golyó képződik és visszaég', next: 'r_mag_keves_huzal' },
      { t: 'Az ív rendben, de időnként kihagy', next: 'r_aramatado' }] },
    awi: { q: 'Milyen a volfrámelektróda csúcsa?', check: 'Kikapcsolt állapotban vedd ki az elektródát: hegyes, tiszta, vagy szennyezett (beleért az ömledékbe), lekerekedett?', answers: [
      { t: 'Szennyezett, beleért az ömledékbe', next: 'r_volfram' },
      { t: 'Tiszta, hegyes', next: 'r_awi_gaz' }] },
    r_halozat: { result: 'Nincs hálózati táplálás', fix: 'Ellenőrizd a csatlakozót, a hosszabbítót és a gép főkapcsolóját. Ha a kismegszakító lekapcsolt, egyszer visszakapcsolhatod. Ha újra lekapcsol, vagy a gép mégsem indul, **ne bontsd meg**, vidd szervizbe. Hosszú, vékony hosszabbítón a gép nem kap elég feszültséget: használj vastagabb, rövidebb kábelt.', level: 'warn', pro: true },
    r_tulmelegedes: { result: 'Túlmelegedés (túllépted a bekapcsolási időt)', fix: 'A hővédelem kioldott. **Ne kapcsold ki a gépet**, hagyd járni a ventilátort, amíg a jelzés kialszik. Utána kisebb áramon dolgozz, vagy tarts több szünetet (nézd meg a gép ED értékét). Ellenőrizd, hogy a szellőzőnyílások nincsenek-e eltömődve porral.', level: 'ok' },
    r_test: { result: 'Rossz testcsatlakozás', fix: 'A festék, rozsda és a laza kötés nagy átmeneti ellenállást okoz, az ív nehezen gyullad és szakadozik. A testcsipeszt **fémtisztára köszörült** helyre, a varrathoz közel rögzítsd. A gépen a kábelcsatlakozókat dugd be ütközésig, és fordítsd el. A felmelegedő, elszíneződött csatlakozót cseréld.', level: 'ok' },
    r_kis_aram: { result: 'Túl kicsi a hegesztőáram', fix: 'Növeld az áramot az elektróda dobozán megadott tartományba. Hidegebb, vastag darabnál a tartomány felső részét válaszd.', level: 'ok' },
    r_gyujtas_technika: { result: 'Ívgyújtási technika', fix: 'Gyújtsd az ívet **gyufahúzásszerűen** (lendületesen végighúzva a lemezen) vagy **koppintással**, és azonnal emeld el az elektródát kb. a magátmérőnyi ívhosszra. Ha leragad, egy gyors oldalirányú mozdulattal törd le (és ne a kezeddel fogd meg a forró elektródát). Sok inverteren a **gyújtási áramlöket** (hot start) és a **leragadásgátló** (anti-stick) beállítható.', level: 'ok' },
    r_polaritas: { result: 'Rossz polaritás vagy áramnem', fix: '**Kikapcsolt** gépen cseréld fel a kábeleket a doboz előírása szerint (pl. bázikus elektróda: elektródafogó a + pólusra). AC-s transzformátorral csak AC-re alkalmas (pl. rutilos) elektródát használj.', level: 'ok' },
    r_nedves_elektroda: { result: 'Nedves vagy rossz minőségű elektróda', fix: 'A nyirkos bevonat nehezíti az ívgyújtást, és instabil ívet ad. Szárítsd ki az elektródát a gyártó előírása szerint, vagy bonts új dobozt.', level: 'ok' },
    r_ivhossz: { result: 'Ingadozó, túl hosszú ív', fix: 'Az ív kialszik, ha túl hosszúra húzod. Támaszd meg a kezed vagy az alkarod, és az elektróda fogyásával arányosan **közelíts** a darabhoz. Gyakorolj egyenes vonalú „húzásokat” egy hulladéklemezen.', level: 'ok' },
    r_huzaladagolas: { result: 'Huzaladagolási hiba', fix: 'Kikapcsolt gépen ellenőrizd:\n- a **görgő hornya** illik-e a huzalátmérőhöz és -típushoz (alumíniumhoz U-horony),\n- a **görgő szorítóereje**: se túl laza, se túl szoros,\n- a **huzalvezető bowden** nem kopott vagy szennyezett-e, nincs-e megtörve a pisztolykábel,\n- az **áramátadó csúcs** furata illik-e a huzalhoz, nincs-e beleégve a huzal,\n- a huzaltekercs fékje nem túl szoros-e.', level: 'ok' },
    r_mag_sok_huzal: { result: 'Túl sok huzal a feszültséghez képest', fix: 'A huzal gyorsabban érkezik, mint ahogy leolvad, ezért belenyomódik az ömledékbe. **Csökkentsd a huzalelőtolást**, vagy **növeld a feszültséget**. Szinergikus gépen ellenőrizd, jó huzalátmérőt és gázt választottál-e ki a programban.', level: 'ok' },
    r_mag_keves_huzal: { result: 'Túl kevés huzal (vagy túl nagy feszültség)', fix: 'Az ív túl hosszú, a huzal visszaég az áramátadó csúcsba. **Növeld a huzalelőtolást** vagy **csökkentsd a feszültséget**. Ha a huzal beleégett a csúcsba, kikapcsolt gépen cseréld az áramátadó csúcsot.', level: 'ok' },
    r_aramatado: { result: 'Kopott áramátadó csúcs vagy rossz érintkezés', fix: 'A kitágult furatú csúcs rosszul adja át az áramot a huzalnak, ezért az ív kihagy. Kikapcsolt gépen cseréld a csúcsot, húzd meg, és ellenőrizd a pisztolycsatlakozót és a testkábelt.', level: 'ok' },
    r_volfram: { result: 'Szennyezett volfrámelektróda', fix: 'Ha a volfrám az ömledékbe ér, szennyeződik, és az ív szétterül, vándorol, nehezen gyullad. A szennyezett részt **vágd le**, és köszörüld újra hegyesre, **hosszirányban** (a köszörűnyomok az elektróda tengelyével párhuzamosak legyenek). A volfrámköszörülés pora ne kerüljön belélegzésre: elszívás, maszk.', level: 'ok' },
    r_awi_gaz: { result: 'Gáz- vagy nagyfrekvenciás gyújtási probléma', fix: 'Ellenőrizd, hogy **tiszta argon** van-e a palackban (CO₂-tartalmú keverék tönkreteszi a volfrámot), áramlik-e a gáz (kb. 6–10 l/perc), és be van-e kapcsolva a **nagyfrekvenciás (HF)** vagy az érintéses (lift-arc) gyújtás a gépen. Ha a HF gyújtás nem működik, az a gép hibája: szervizbe kell vinni.', level: 'warn', pro: true }
  }
});
