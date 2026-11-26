/* 🧭 Pályaorientáció – pályaleírások. Formátum: js/palya.js fejléce.
 * code: Holland-féle RIASEC-kód (R Realista, I Vizsgálódó, A Művészi, S Szociális, E Vállalkozó, C Konvencionális), a legjellemzőbb betű elöl.
 * Szándékosan nincsenek benne konkrét bérek és intézménynevek: ezek gyorsan változnak. */
(function () {
  var P = STUDIE.addPalya;

  /* ===================== Műszaki szakmák ===================== */
  P({ id: 'villanyszerelo', title: 'Villanyszerelő', icon: '⚡', code: 'RIC', szint: 'szakma', terulet: 'Műszaki szakma',
    short: 'Áramot visz a házakba: vezetékez, bekötöz, hibát keres – biztonságosan.',
    mit: 'Lakásokban, irodákban, üzemekben kiépíti és javítja az elektromos hálózatot: vezetékeket fektet, aljzatokat, kapcsolókat, lámpákat és elosztószekrényt köt be, védelmeket (kismegszakító, FI relé) szerel. Hibát keres, ha „lecsap” valami, és ellenőrző méréseket végez. Egyre többször találkozik okosotthonnal, napelemmel, töltőoszloppal is.',
    nap: 'Reggel átveszi a napi munkákat, anyagot pakol a kocsiba. Délelőtt egy felújítás alatt álló lakásban falat horonyol és vezetéket húz be, délután egy ügyfélnél kideríti, miért old le újra meg újra a FI relé. A nap végén mér, dokumentál, és elmagyarázza az ügyfélnek, mit javított.',
    tulajdonsagok: ['**Biztonságtudat** – az áram nem bocsát meg', 'Kézügyesség és jó térlátás', 'Logikus hibakereső gondolkodás', 'Pontosság, türelem', 'Jó kommunikáció az ügyfelekkel'],
    ut: ['8. osztály után **szakképző iskola** (villanyszerelő, 3 év), vagy **technikum** (villamos szakirány, 5 év, érettségivel együtt)', 'Gyakorlat cégnél, mestertől tanulva – a duális képzésben már iskola közben', 'Később ráépülő tanfolyamok: pl. érintésvédelmi szabványossági felülvizsgáló, napelemes rendszerszerelő, villamos tervezés', 'Továbbtanulás is lehetséges: villamosmérnöki BSc'],
    tantargyak: ['fizika (elektromosság)', 'matematika', 'műszaki rajz', 'informatika'],
    kereset: 'Jól kereső, keresett szakma; a tapasztalt, megbízható villanyszerelőkre hetekig várnak az ügyfelek. Vállalkozóként a kereset jelentősen nőhet.',
    kilatas: 'Az energiaátállás (napelem, hőszivattyú, villanyautó-töltés) miatt a kereslet várhatóan tovább nő.',
    linkek: [{ tantargy: 'villanyszereles' }, { utvonal: 'villanyszerelo' }, { lecke: 'villanyszereles/biztonsag' }, { modell: 'elosztoszekreny' }, { lecke: 'fizika/elektromossag' }, { tantargy: 'napelem' }] });

  P({ id: 'autoszerelo', title: 'Autószerelő', icon: '🔧', code: 'RIC', szint: 'szakma', terulet: 'Műszaki szakma',
    short: 'Járművek szervize, javítása és hibakeresése – kulccsal és diagnosztikai géppel.',
    mit: 'Személyautókat, kisteherautókat tart karban és javít: olajcsere, fékjavítás, futómű, motor és váltó hibái. A modern autókban rengeteg az elektronika, ezért a munka egyre nagyobb része **diagnosztika**: számítógéppel kiolvassa a hibakódokat, mér, és logikusan kizárja a lehetséges okokat.',
    nap: 'Reggel egy szervizzel kezd (olaj, szűrők, ellenőrzés), aztán egy autó, amely „néha rángat”: hibakódot olvas, mér, próbaútra megy. Délután fékbetétet és tárcsát cserél, majd elmondja az ügyfélnek, mire figyeljen. Közben új autótípusok szervizadatait böngészi.',
    tulajdonsagok: ['Műszaki érzék, kíváncsiság, hogyan működik a gép', 'Kézügyesség, erő és állóképesség', 'Rendszeres, logikus hibakeresés', 'Felelősségtudat (a fék nem lehet „majdnem jó”)', 'Folyamatos tanulás az új technikákról'],
    ut: ['**Szakképző iskola** (autószerelő, 3 év), vagy **technikum** (járműmechatronikai szakirány, érettségivel)', 'Gyakorlat márkaszervizben vagy független műhelyben', 'Gyártói és diagnosztikai tanfolyamok; később mestervizsga', 'Továbbtanulás: járműmérnöki BSc'],
    tantargyak: ['fizika', 'matematika', 'műszaki ismeretek', 'informatika', 'angol (szervizanyagokhoz)'],
    kereset: 'Átlagos kezdés, a tapasztalat és a diagnosztikai tudás sokat emel rajta. A jó diagnoszta nagyon keresett.',
    kilatas: 'A szakma átalakul: a belső égésű motorok mellett egyre több a hibrid és elektromos autó, aki tanul, annak biztos a helye.',
    linkek: [{ tantargy: 'autoszereles' }, { modell: 'benzinmotor' }, { lecke: 'autoszereles/diagnosztika' }, { lecke: 'autoszereles/fekrendszer' }, { kurzus: 'e-mobilitas' }] });

  P({ id: 'ev-szerelo', title: 'Elektromosautó-szerelő', icon: '🔋', code: 'RIC', szint: 'szakma', terulet: 'Műszaki szakma',
    short: 'Villanyautók nagyfeszültségű rendszereinek biztonságos szervize.',
    mit: 'Elektromos és hibrid járműveket szervizel: az akkumulátort, a töltőrendszert, az invertert és a villanymotort vizsgálja, a hagyományos részek (fék, futómű, klíma) mellett. A nagyfeszültségű (több száz voltos) rendszeren csak **feszültségmentesítés** után, szigorú szabályok szerint, védőfelszerelésben dolgozhat.',
    nap: 'Reggel egy autó jelzi, hogy lassan tölt: kiolvassa az akkumulátor-kezelő (BMS) adatait, és megnézi a cellák állapotát. Délelőtt egy baleseti autó HV-rendszerét feszültségmentesíti és ellenőrzi. Délután szoftverfrissítést tölt fel és töltőt próbál.',
    tulajdonsagok: ['Szigorú szabálykövetés és biztonságtudat', 'Villamos és műszaki érdeklődés', 'Diagnosztikai, informatikai érzék', 'Precizitás', 'Nyitottság az új technológiákra'],
    ut: ['Alap: **autószerelő** vagy **villanyszerelő** szakma (szakképző iskola vagy technikum)', 'Nagyfeszültségű (HV) járművek szervizelésére feljogosító képzés, gyártói tréningek', 'Gyakorlat márkaszervizben', 'Továbbtanulás: járműmérnöki BSc e-mobilitás irányban'],
    tantargyak: ['fizika (elektromosság)', 'kémia (akkumulátorok)', 'matematika', 'informatika', 'angol'],
    kereset: 'A különleges tudás miatt jellemzően az átlagos autószerelői kereset felett van, és gyorsan nő a kereslet.',
    kilatas: 'Az egyik leggyorsabban növekvő műszaki terület – kevés még a képzett szakember.',
    linkek: [{ tantargy: 'elektromos-auto' }, { utvonal: 'e-auto' }, { modell: 'elektromos-auto' }, { modell: 'akkucella' }, { modell: 'villanymotor' }, { kurzus: 'e-mobilitas' }] });

  P({ id: 'motorsport-szerelo', title: 'Motorsport-szerelő', icon: '🏁', code: 'RIE', szint: 'szakma', terulet: 'Műszaki szakma',
    short: 'Versenyautókat készít fel, állít be és javít – percre pontosan, a boxban.',
    mit: 'Versenycsapatnál dolgozik: összeszereli, beállítja és a futamok között gyorsan javítja a versenyautót. Futóművet állít, gumit cserél, ellenőriz minden csavart. A versenymérnökökkel együtt a telemetria és a pilóta visszajelzése alapján változtat a beállításokon (setup).',
    nap: 'Versenyhétvégén hajnalban kezd: átvizsgálja az autót, beállítja a futóművet a mérnök kérése szerint. Az edzés után adatokat néznek, rugót cserél. Futam közben a boxutcában másodpercek alatt cserél kereket. Este bontás, pakolás – másnap utazás a következő pályára.',
    tulajdonsagok: ['Kiváló kézügyesség és precizitás', 'Stressztűrés, gyors munka nyomás alatt', 'Csapatjátékos szemlélet', 'Sok utazás vállalása, hétvégi munka', 'Szenvedély a technika és a sport iránt'],
    ut: ['Alap: **autószerelő** vagy járműmechatronikai technikus képzés', 'Tapasztalat amatőr és utánpótlás-versenysorozatokban, gyakran önkéntesként kezdve', 'Specializáció: motor, futómű, sebességváltó, kompozit', 'Versenymérnök lenni járműmérnöki vagy gépészmérnöki BSc/MSc után lehet'],
    tantargyak: ['fizika (mechanika)', 'matematika', 'műszaki ismeretek', 'angol (nemzetközi csapatok)'],
    kereset: 'Nagyon változó: a kisebb hazai sorozatokban gyakran mellékállás, a nemzetközi élmezőnyben viszont jól fizetett, de kemény munka.',
    kilatas: 'Kicsi, nagyon versengő terület; a kapcsolatok és a tapasztalat sokat számítanak.',
    linkek: [{ tantargy: 'motorsport' }, { oldal: '#/setup', title: 'Setup-szimulátor', icon: '🏎️' }, { modell: 'f1-auto' }, { lecke: 'motorsport/setup' }, { lecke: 'sport/forma1' }, { kurzus: 'mechanika' }] });

  P({ id: 'napelemes-szerelo', title: 'Napelemes rendszerszerelő', icon: '☀️', code: 'RCI', szint: 'szakma', terulet: 'Műszaki szakma',
    short: 'Napelemeket telepít a tetőre, és beköti őket a ház hálózatába.',
    mit: 'Felméri a tetőt, felszereli a tartószerkezetet és a paneleket, majd szakszerűen beköti az invertert és a védelmeket. A rendszert üzembe helyezi, ellenőrzi és karbantartja. Gyakran akkumulátoros tárolót és okos vezérlést is telepít.',
    nap: 'Reggel csapattal egy családi házhoz mennek. Leesés elleni biztosítással a tetőn rögzítik a sínt és a paneleket, majd lent bekötik az invertert. Délután mérnek, beállítják az alkalmazást, és megmutatják a tulajdonosnak, hogyan látja a termelést.',
    tulajdonsagok: ['Nem fél a magasban dolgozni (biztosítással)', 'Fizikai állóképesség, szabadtéri munka szeretete', 'Villamos alapismeretek, pontosság', 'Csapatmunka', 'Környezettudatosság'],
    ut: ['Alap: **villanyszerelő** szakma (szakképző iskola vagy technikum)', 'Napelemes rendszerszerelő képzés felnőttképzésben, gyártói tréningek', 'Magasban végzett munka biztonsági oktatása', 'Továbbképzés: tervezés, villamosmérnöki irány'],
    tantargyak: ['fizika (elektromosság, fény)', 'matematika', 'földrajz (napsugárzás)', 'műszaki rajz'],
    kereset: 'Jó kereseti lehetőség, főleg tapasztalattal és saját vállalkozásban; a kereslet az energiaárakkal és a támogatásokkal együtt hullámzik.',
    kilatas: 'A megújuló energia terjedésével hosszú távon is szükség lesz rájuk, a karbantartásra és a bővítésekre is.',
    linkek: [{ tantargy: 'napelem' }, { utvonal: 'megujulo' }, { modell: 'napelempanel' }, { lecke: 'napelem/bekotes' }, { lecke: 'napelem/szereles' }, { tantargy: 'villanyszereles' }] });

  P({ id: 'klimaszerelo', title: 'Hűtő-, klíma- és hőszivattyú-szerelő', icon: '❄️', code: 'RIC', szint: 'szakma', terulet: 'Műszaki szakma',
    short: 'Klímákat, hűtőket és hőszivattyúkat telepít és javít.',
    mit: 'Klímaberendezéseket, hőszivattyúkat, kereskedelmi és ipari hűtőket szerel fel, tölt fel hűtőközeggel és tart karban. Ehhez a hűtőkör működését (kompresszor, kondenzátor, adagoló, elpárologtató) érteni kell, mert a hibakeresés nyomás- és hőmérséklet-mérésen alapul.',
    nap: 'Délelőtt egy lakásban új klímát szerel: fúr, csövez, vákuumoz, majd üzembe helyez. Délután egy bolt hűtőpultja nem hűt: mér, szivárgást keres, és kiderül, hogy a ventilátor hibás. Nyáron rengeteg a munka, télen a hőszivattyúk adnak feladatot.',
    tulajdonsagok: ['Műszaki és fizikai érdeklődés (hőtan)', 'Pontos, tiszta munka', 'Hibakereső gondolkodás', 'Környezettudatosság (hűtőközegek)', 'Ügyfélközpontú hozzáállás'],
    ut: ['**Szakképző iskola** (hűtő-, klíma- és hőszivattyú-berendezés-szerelő) vagy épületgépész **technikum**', 'A fluortartalmú hűtőközegek kezeléséhez kötelező **F-gáz képesítés**', 'Gyártói tanfolyamok, villamos alapismeretek', 'Továbbtanulás: épületgépész vagy energetikai mérnöki BSc'],
    tantargyak: ['fizika (hőtan)', 'matematika', 'kémia', 'műszaki rajz'],
    kereset: 'Jól kereső szakma, a szezonban sok a munka; a hőszivattyús tudás külön értéket jelent.',
    kilatas: 'A melegedő nyarak és a fűtés elektrifikációja miatt erősen keresett szakma.',
    linkek: [{ tantargy: 'hoszivattyu' }, { modell: 'hoszivattyu' }, { lecke: 'hoszivattyu/hutokor' }, { lecke: 'hoszivattyu/cop' }, { lecke: 'fiz-alap/hotan' }] });

  P({ id: 'vizgazfutes', title: 'Víz-, gáz- és fűtésszerelő', icon: '🚰', code: 'RCI', szint: 'szakma', terulet: 'Műszaki szakma',
    short: 'Épületgépész: csövek, kazánok, radiátorok, fürdőszobák.',
    mit: 'Kiépíti és javítja az épületek víz-, szennyvíz-, fűtési és gázhálózatát: csöveket köt, radiátort, kazánt, bojlert, szaniterek szerel be. Csőtörést, dugulást, fűtési hibát hárít el. Gázkészülékeken csak megfelelő képesítéssel dolgozhat, mert ott a hiba életveszélyes lehet.',
    nap: 'Reggel egy csőtörés: elzárja a vizet, kibontja és kicseréli a hibás szakaszt. Délelőtt egy fürdőszoba-felújításon a csövezést végzi, délután egy kazán nem indul – megkeresi az okát. Sok a sürgős hívás, főleg télen.',
    tulajdonsagok: ['Kézügyesség, fizikai erőnlét', 'Gyakorlatias problémamegoldás', 'Felelősség és szabálykövetés (gáz!)', 'Megbízhatóság, pontos időbeosztás', 'Türelem az ügyfelekkel'],
    ut: ['**Szakképző iskola** (pl. víz-, csatorna- és közműrendszer-szerelő, gázfogyasztóberendezés- és csőhálózat-szerelő) vagy épületgépész **technikum**', 'Gázszereléshez külön képesítés és nyilvántartásba vétel', 'Gyártói kazán- és hőszivattyú-tanfolyamok', 'Továbbtanulás: épületgépész mérnöki BSc'],
    tantargyak: ['fizika (nyomás, hőtan)', 'matematika', 'kémia (égés)', 'műszaki rajz'],
    kereset: 'Jól kereső szakma, a megbízható szerelő ritka kincs – sokan saját vállalkozásban dolgoznak.',
    kilatas: 'Mindig lesz rá szükség; a korszerűsítések (hőszivattyú, padlófűtés) új feladatokat hoznak.',
    linkek: [{ tantargy: 'vizszereles' }, { lecke: 'vizszereles/gaz-alapok' }, { lecke: 'vizszereles/futes' }, { lecke: 'fiz-alap/nyomas' }, { tantargy: 'hoszivattyu' }] });

  P({ id: 'asztalos', title: 'Asztalos', icon: '🪚', code: 'RAC', szint: 'szakma', terulet: 'Műszaki szakma',
    short: 'Fából bútort, ajtót, ablakot, konyhát készít – tervtől a felületkezelésig.',
    mit: 'Bútorokat, beépített szekrényeket, konyhákat, ajtókat, lépcsőket tervez és gyárt fából és fa alapú lapokból. Méretet vesz, szabásjegyzéket készít, gépeken megmunkál, összeállít, felületet kezel és helyszínen beszerel. A modern műhelyekben CNC-gépek és tervezőprogramok is segítik.',
    nap: 'Reggel egy konyha elemeit szabja a lapszabászgépen, élzáróz, fúr. Délben egy ügyfélnél méretet vesz egy gardróbhoz, és megbeszélik a színeket. Délután összeállít egy fiókos szekrényt, és lakkozásra készíti elő.',
    tulajdonsagok: ['Kézügyesség és térlátás', 'Esztétikai érzék', 'Pontosság (milliméteres munka)', 'Gépek biztonságos kezelése', 'Türelem és kitartás'],
    ut: ['**Szakképző iskola** (asztalos, 3 év) vagy faipari **technikum**', 'Gyakorlat műhelyben; mestervizsga', 'Tervezőprogramok, CNC-ismeretek elsajátítása', 'Továbbtanulás: faipari mérnök vagy formatervező BSc'],
    tantargyak: ['matematika (geometria)', 'műszaki rajz', 'vizuális kultúra', 'fizika'],
    kereset: 'A kezdés szerény lehet, de a minőségi egyedi munkát végző asztalosok jól keresnek, sokan saját műhelyt nyitnak.',
    kilatas: 'Az egyedi bútor és a felújítások miatt a jó asztalosokra mindig van igény.',
    linkek: [{ tantargy: 'asztalos' }, { utvonal: 'fa-fem' }, { lecke: 'asztalos/kotesek' }, { lecke: 'asztalos/feluletkezeles' }, { lecke: 'vizualis/kompozicio' }] });

  P({ id: 'hegeszto', title: 'Hegesztő', icon: '🔥', code: 'RCI', szint: 'szakma', terulet: 'Műszaki szakma',
    short: 'Fémeket köt össze erős, hibátlan varratokkal – hidaktól a csővezetékekig.',
    mit: 'Acél-, rozsdamentes és alumínium szerkezeteket hegeszt: csővezetékeket, tartályokat, acélszerkezeteket, járműalkatrészeket. Rajz alapján dolgozik, kiválasztja az eljárást (pl. bevont elektródás, AWI, fogyóelektródás) és a paramétereket. A varratokat gyakran roncsolásmentes vizsgálattal ellenőrzik.',
    nap: 'Reggel átnézi a rajzot, előkészíti és illeszti a darabokat. Egész nap védőfelszerelésben dolgozik: fűz, hegeszt, csiszol. Délután a minőségellenőr megvizsgálja a varratokat, egy hibás szakaszt kijavít.',
    tulajdonsagok: ['Nagyon biztos kéz, jó szem–kéz koordináció', 'Türelem és koncentráció', 'Szigorú munkavédelem', 'Rajzolvasás', 'Állóképesség (hő, zaj, kényelmetlen testhelyzet)'],
    ut: ['**Szakképző iskola** (hegesztő) vagy gépészeti **technikum**', 'Eljárásonkénti **hegesztői minősítő vizsgák**, ezeket rendszeresen meg kell újítani', 'Tapasztalattal különleges munkák: csővezeték, víz alatti hegesztés, robotprogramozás', 'Továbbtanulás: hegesztési szakmérnök (gépészmérnöki BSc után)'],
    tantargyak: ['fizika', 'kémia (fémek)', 'matematika', 'műszaki rajz'],
    kereset: 'A minősített, több eljárást ismerő hegesztők jól keresnek, külföldön különösen keresettek.',
    kilatas: 'Hiányszakma: az ipar, az energetika és az építőipar folyamatosan keresi a jó hegesztőket.',
    linkek: [{ tantargy: 'hegesztes' }, { utvonal: 'fa-fem' }, { lecke: 'hegesztes/eljarasok' }, { lecke: 'hegesztes/munkavedelem' }, { kurzus: 'mechanika' }] });

  P({ id: 'szakacs', title: 'Szakács', icon: '👨‍🍳', code: 'RAE', szint: 'szakma', terulet: 'Vendéglátás',
    short: 'Ízeket alkot nagy tempóban, szigorú higiéniai szabályok szerint.',
    mit: 'Étteremben, szállodában, közétkeztetésben ételeket készít: előkészít, főz, süt, tálal. Ismeri az alapanyagokat, a technológiákat, a hőmérsékleti és higiéniai szabályokat, az allergéneket. Tapasztaltabban menüt tervez, rendel, kalkulál és csapatot vezet.',
    nap: 'Délelőtt áru átvétel és előkészítés: zöldség, hús, mártások alapjai. Délben és este csúcsidő: a rendelések záporoznak, mindennek pontosan és szépen kell kimennie. Zárás után takarítás, hűtőellenőrzés és a másnapi rendelés.',
    tulajdonsagok: ['Kreativitás és jó ízérzék', 'Gyorsaság, stressztűrés', 'Higiénia és pontosság', 'Csapatmunka', 'Állóképesség (sok állás, hétvégi munka)'],
    ut: ['**Szakképző iskola** (szakács, 3 év) vagy vendéglátó **technikum**', 'Gyakorlat konyhán, különböző pozíciókban', 'Később: séf, konyhafőnök, saját étterem; cukrász vagy más specializáció', 'Továbbtanulás: turizmus-vendéglátás BA'],
    tantargyak: ['kémia és biológia (élelmiszer)', 'matematika (kalkuláció)', 'idegen nyelvek', 'vizuális kultúra (tálalás)'],
    kereset: 'Kezdetben szerény, de a jó szakácsokért verseny van; a vezető séfek és a saját étterem jól jövedelmezhet. A borravaló és a helyszín sokat számít.',
    kilatas: 'Állandó a kereslet itthon és külföldön is.',
    linkek: [{ tantargy: 'szakacs' }, { utvonal: 'konyha' }, { lecke: 'szakacs/higienia' }, { lecke: 'szakacs/allergenek' }, { lecke: 'haztartas/fozes-alapok' }] });

  P({ id: 'komuves', title: 'Kőműves', icon: '🧱', code: 'RCE', szint: 'szakma', terulet: 'Építőipar',
    short: 'Falakat, házakat épít – az alapoktól a vakolatig.',
    mit: 'Épületek szerkezeteit építi: falaz, betonoz, zsaluz, vakol, szigetel, javít és felújít. Tervrajz alapján dolgozik, kitűzi a falakat, vízszintet és függőt tart. A munkája évtizedekig, akár évszázadokig áll.',
    nap: 'Kora reggel kezdés az építkezésen: anyag kirakodás, malter keverése, majd falazás a terv szerint. Délben a betonozás előtt ellenőrzik a vasalást. Délután szigetelés és a következő nap előkészítése. A munka időjárásfüggő.',
    tulajdonsagok: ['Fizikai erőnlét, szabadtéri munka bírása', 'Pontosság (vízszint, merőlegesség)', 'Tervolvasás, térlátás', 'Csapatmunka', 'Munkavédelem a magasban'],
    ut: ['**Szakképző iskola** (kőműves, 3 év) vagy építőipari **technikum**', 'Gyakorlat építkezésen; mestervizsga', 'Később: brigádvezető, építésvezető, saját vállalkozás', 'Továbbtanulás: építőmérnöki BSc'],
    tantargyak: ['matematika (geometria, mennyiségszámítás)', 'fizika', 'műszaki rajz', 'kémia (kötőanyagok)'],
    kereset: 'Keresett szakma, a tapasztalt kőművesek és a vállalkozók jól keresnek; az építőipar azonban ciklikus.',
    kilatas: 'Hiányszakma: kevés a fiatal szakember, a felújítások és energetikai korszerűsítések sok munkát adnak.',
    linkek: [{ tantargy: 'epitoipar' }, { lecke: 'epitoipar/falazas' }, { lecke: 'epitoipar/beton' }, { lecke: 'epitoipar/tervrajz' }, { kurzus: 'mechanika' }] });

  /* ===================== Informatika ===================== */
  P({ id: 'rendszergazda', title: 'Rendszergazda (IT-üzemeltető)', icon: '🖧', code: 'CIR', szint: 'vegyes', terulet: 'Informatika',
    short: 'Gondoskodik róla, hogy a gépek, a hálózat és a szerverek mindig működjenek.',
    mit: 'Egy cég vagy intézmény informatikai rendszerét üzemelteti: számítógépeket, nyomtatókat, hálózati eszközöket, szervereket, felhőszolgáltatásokat állít be és tart karban. Felhasználói fiókokat kezel, mentéseket ellenőriz, frissít, és ha valami nem megy, ő a „segítség”. A biztonság is az ő feladata.',
    nap: 'Reggel átnézi a monitorozó rendszer riasztásait és a mentések naplóját. Délelőtt új kollégának állít be gépet és jogosultságokat, közben egy „nem megy a nyomtató” hibát old meg. Délután egy szerverfrissítést tervez esti időpontra, hogy senkit ne zavarjon.',
    tulajdonsagok: ['Rendszerező, logikus gondolkodás', 'Türelem a felhasználókkal', 'Pontosság, dokumentálás', 'Folyamatos önképzés', 'Megbízhatóság (sokszor bizalmas adatokhoz fér hozzá)'],
    ut: ['Informatikai **technikum** (rendszer- és alkalmazásüzemeltető irány)', 'Gyártói és szakmai minősítések (hálózat, operációs rendszerek, felhő)', 'Felsőfokú lehetőség: mérnökinformatikus vagy üzemmérnök-informatikus BSc', 'Előrelépés: hálózati mérnök, felhőmérnök, IT-biztonsági szakember'],
    tantargyak: ['informatika', 'matematika', 'angol (szinte minden leírás angolul van)', 'fizika'],
    kereset: 'Jó kereset, a minősítések és a felhős, biztonsági tudás sokat emel rajta.',
    kilatas: 'Minden szervezetnek szüksége van rá; a munka egyre inkább a felhő és az automatizálás felé tolódik.',
    linkek: [{ tantargy: 'rendszeruzem' }, { utvonal: 'rendszergazda' }, { lecke: 'informatika/halozatok' }, { lecke: 'rendszeruzem/szerverek' }, { kurzus: 'msc-elosztott' }, { modell: 'alaplap' }] });

  P({ id: 'programozo', title: 'Programozó (szoftverfejlesztő)', icon: '⌨️', code: 'ICR', szint: 'vegyes', terulet: 'Informatika',
    short: 'Alkalmazásokat, weboldalakat, játékokat és rendszereket ír kódban.',
    mit: 'Szoftvereket tervez, ír, tesztel és javít: mobilalkalmazásokat, weboldalakat, banki rendszereket, játékokat, autók vezérlőit. A feladatot kisebb lépésekre bontja, algoritmusokat választ, és csapatban, verziókezelővel dolgozik. A munka nagy része gondolkodás, hibakeresés és mások kódjának megértése.',
    nap: 'Reggel rövid csapatmegbeszélés (ki min dolgozik, hol akadt el). Utána egy új funkciót fejleszt, teszteket ír hozzá. Délután egy kolléga kódját nézi át, és kijavít egy hibát, amit a felhasználók jeleztek. Sok helyen részben otthonról is lehet dolgozni.',
    tulajdonsagok: ['Logikus, elvont gondolkodás', 'Kitartás a hibakeresésben', 'Pontosság', 'Csapatmunka, kommunikáció', 'Állandó tanulás (a technológia gyorsan változik)'],
    ut: ['Informatikai **technikum** (szoftverfejlesztő és -tesztelő irány), vagy gimnázium után egyetem', 'Felsőfokú lehetőség: programtervező informatikus vagy mérnökinformatikus **BSc**, majd MSc', 'Saját projektek, verseny, nyílt forráskód – a portfólió sokat számít', 'Előrelépés: senior fejlesztő, szoftverarchitekt, csapatvezető'],
    tantargyak: ['matematika', 'informatika', 'angol', 'fizika'],
    kereset: 'Az átlag feletti keresetű pályák közé tartozik; a tapasztalt fejlesztők kifejezetten jól keresnek.',
    kilatas: 'Továbbra is keresett, de a mesterséges intelligencia átalakítja a munkát: az egyszerű kódolás helyett egyre fontosabb a problémamegoldás és a rendszerszemlélet.',
    linkek: [{ lecke: 'informatika/programozas' }, { lecke: 'informatika/algoritmusok' }, { kurzus: 'programozas' }, { kurzus: 'algoritmusok' }, { utvonal: 'szamitogep-melyen' }, { modell: 'processzor' }] });

  P({ id: 'adatelemzo', title: 'Adatelemző (adattudós)', icon: '📈', code: 'ICE', szint: 'diploma', terulet: 'Informatika',
    short: 'Adatokból válaszokat és előrejelzéseket készít – statisztikával és programozással.',
    mit: 'Nagy adathalmazokat gyűjt, tisztít és elemez, hogy választ adjon üzleti, egészségügyi vagy tudományos kérdésekre: miért esett a forgalom, melyik gyógymód hat jobban, mennyi áram kell holnap. Statisztikát, adatbázisokat, programozást és gépi tanulást használ, az eredményeket pedig érthető grafikonokkal mutatja be.',
    nap: 'Reggel egy kérést kap: „miért mondják le többen az előfizetést?”. Adatbázisból lekérdezi az adatokat, kiszűri a hibásakat, és összefüggéseket keres. Délután modellt épít az előrejelzéshez, majd egy egyszerű grafikonnal elmagyarázza a vezetőknek, mit talált.',
    tulajdonsagok: ['Matematikai, statisztikai érzék', 'Kíváncsiság, kérdezni tudás', 'Programozási készség', 'Kritikus gondolkodás (korreláció ≠ ok-okozat)', 'Érthető kommunikáció nem szakembereknek is'],
    ut: ['Gimnázium vagy technikum, erős matematikával', '**BSc**: pl. matematika, alkalmazott matematika, gazdaságinformatika, programtervező informatikus, közgazdaság', '**MSc** adattudomány, statisztika vagy gépi tanulás irányban', 'Gyakorlat: saját elemzési projektek, versenyek'],
    tantargyak: ['matematika', 'informatika', 'angol', 'gazdasági ismeretek'],
    kereset: 'Jól fizetett terület, különösen a pénzügyi és technológiai cégeknél.',
    kilatas: 'Az adatok mennyisége nő, ezért az elemzők iránt nagy a kereslet; a mesterséges intelligencia eszközeit kezelni tudók előnyben vannak.',
    linkek: [{ kurzus: 'valszam' }, { kurzus: 'adatbazis' }, { kurzus: 'msc-gepi-tanulas' }, { kurzus: 'msc-sztochasztika' }, { lecke: 'matematika/szazalek' }, { kurzus: 'programozas' }] });

  P({ id: 'kiberbiztonsag', title: 'Kiberbiztonsági szakértő', icon: '🔐', code: 'ICE', szint: 'diploma', terulet: 'Informatika',
    short: 'Megvédi a rendszereket a támadóktól – és néha engedéllyel ő maga „támad”.',
    mit: 'Cégek, bankok, kórházak informatikai rendszereit védi: felméri a gyenge pontokat, figyeli a gyanús eseményeket, és támadás esetén gyorsan reagál. Etikus hekkerként, **megbízás és engedély alapján** behatolásteszteket végez, hogy a hibákat a valódi támadók előtt találja meg. A felhasználókat is képzi, mert sok támadás egy rossz kattintással kezdődik.',
    nap: 'Reggel a biztonsági monitorozó rendszer riasztásait elemzi: egy furcsa bejelentkezés külföldről. Kivizsgálja, letiltja a fiókot. Délután egy új webalkalmazást tesztel sérülékenységekre, és jelentést ír a fejlesztőknek a javításról.',
    tulajdonsagok: ['Kíváncsiság, „hogyan lehetne ezt kijátszani?” gondolkodás', 'Erős etikai tartás és titoktartás', 'Mély informatikai tudás (hálózat, operációs rendszer, programozás)', 'Higgadtság vészhelyzetben', 'Folyamatos tanulás'],
    ut: ['Informatikai alapok: technikum vagy gimnázium', '**BSc**: mérnökinformatikus, programtervező informatikus; majd kiberbiztonsági **MSc**', 'Nemzetközileg elismert biztonsági minősítések', 'Gyakorlás legális terepen: CTF-versenyek, gyakorló laborok'],
    tantargyak: ['informatika', 'matematika', 'angol', 'állampolgári ismeretek (jog)'],
    kereset: 'Az informatikán belül is a jobban fizetett területek közé tartozik.',
    kilatas: 'Világszerte nagy a szakemberhiány; a támadások száma nő, így a terület hosszú távon biztosnak látszik.',
    linkek: [{ kurzus: 'msc-kripto' }, { lecke: 'informatika/adatbiztonsag' }, { lecke: 'rendszeruzem/biztonsag' }, { lecke: 'informatika/halozatok' }, { lecke: 'allampolgari/mediatudatossag' }] });

  /* ===================== Mérnöki pályák ===================== */
  P({ id: 'villamosmernok', title: 'Villamosmérnök', icon: '🔌', code: 'IRC', szint: 'diploma', terulet: 'Mérnöki pálya',
    short: 'Áramköröket, elektronikát, energiarendszereket és vezérléseket tervez.',
    mit: 'Elektronikai eszközöket, áramköröket, villamos hálózatokat, motorhajtásokat, beágyazott rendszereket és automatizálást tervez és fejleszt. Dolgozhat erőműnél, hálózati társaságnál, autóiparban, telekommunikációban, orvosi műszereknél. Szimulál, prototípust épít, mér, és szabványok szerint dokumentál.',
    nap: 'Délelőtt egy villanyautó-töltő teljesítményelektronikáját szimulálja, majd a laborban oszcilloszkóppal méri a prototípust. Délben megbeszélés a gépészekkel és a szoftveresekkel. Délután egy alkatrész helyettesítését keresi, mert az eredeti nem kapható.',
    tulajdonsagok: ['Erős matematika és fizika', 'Elvont gondolkodás, modellezés', 'Precizitás, mérési fegyelem', 'Csapatmunka más mérnökökkel', 'Angol szaknyelv'],
    ut: ['Gimnázium vagy villamos **technikum**, emelt matematika és fizika érettségi ajánlott', '**Villamosmérnöki BSc** (kb. 3,5 év), szakirány: pl. energetika, elektronika, automatizálás', '**MSc** a fejlesztői és kutatói munkákhoz', 'Tervezői jogosultságokhoz gyakorlat és kamarai regisztráció'],
    tantargyak: ['matematika', 'fizika', 'informatika', 'angol'],
    kereset: 'A jól fizetett mérnöki pályák közé tartozik, különösen az ipari fejlesztésben.',
    kilatas: 'Az energiaátállás, az elektromobilitás és az automatizálás miatt kifejezetten keresett.',
    linkek: [{ kurzus: 'villamosmernoki' }, { kurzus: 'elektronika' }, { kurzus: 'digitalis-technika' }, { kurzus: 'msc-teljesitmenyelektronika' }, { utvonal: 'mernoki-alapozo' }, { modell: 'tranzisztor' }] });

  P({ id: 'gepeszmernok', title: 'Gépészmérnök', icon: '⚙️', code: 'RIC', szint: 'diploma', terulet: 'Mérnöki pálya',
    short: 'Gépeket, járműveket, szerkezeteket tervez és gyártat.',
    mit: 'Gépeket, járműalkatrészeket, gyártósorokat, épületgépészeti rendszereket tervez és fejleszt. 3D-s tervezőprogramban modellez, szilárdsági és áramlástani számításokat végez, anyagot választ, és együttműködik a gyártással. Dolgozhat autóiparban, energetikában, repülőgépiparban vagy karbantartásban.',
    nap: 'Reggel egy alkatrész 3D-modelljén dolgozik, majd szimulációval ellenőrzi, kibírja-e a terhelést. Délután a gyártócsarnokban megnézi, miért reped egy darab a próbagyártásban, és a technológussal együtt javítási ötletet keresnek.',
    tulajdonsagok: ['Térlátás és műszaki érzék', 'Matematika és fizika iránti érdeklődés', 'Gyakorlatias problémamegoldás', 'Csapatmunka', 'Felelősségtudat (biztonságos gépek)'],
    ut: ['Gimnázium vagy gépészeti **technikum**', '**Gépészmérnöki BSc** (kb. 3,5 év), vagy járműmérnöki, mechatronikai BSc', '**MSc** a tervezői, fejlesztői munkákhoz', 'Gyakorlat ipari cégnél, tervezőprogramok és szabványok ismerete'],
    tantargyak: ['matematika', 'fizika', 'műszaki rajz', 'informatika', 'angol'],
    kereset: 'Jól fizetett mérnöki pálya, a fejlesztésben és vezetői szerepben különösen.',
    kilatas: 'Az ipar folyamatosan keresi; egyre fontosabb a digitális tervezés és az automatizálás ismerete.',
    linkek: [{ kurzus: 'mechanika' }, { kurzus: 'e-mobilitas' }, { modell: 'hajtomu' }, { modell: 'benzinmotor' }, { utvonal: 'mernoki-alapozo' }, { lecke: 'fizika/newton' }] });

  P({ id: 'epiteszmernok', title: 'Építészmérnök', icon: '🏛️', code: 'AIR', szint: 'diploma', terulet: 'Mérnöki pálya',
    short: 'Épületeket tervez: szépet, használhatót és biztonságosat.',
    mit: 'Lakóházakat, iskolákat, középületeket tervez a vázlattól a kiviteli tervig. Összehangolja a megrendelő kívánságait, a telek adottságait, a szabályokat, a költségvetést és a többi szakág (statika, gépészet, villany) igényeit. Az építkezést is felügyelheti, hogy minden a terv szerint épüljön.',
    nap: 'Reggel egy családi ház vázlatait egyezteti az ügyféllel, aztán a tervezőprogramban módosítja az alaprajzot. Délután egyeztet a statikussal, majd kimegy egy építkezésre, ahol egy részlet megoldásáról kell dönteni.',
    tulajdonsagok: ['Esztétikai érzék és kreativitás', 'Kiváló térlátás', 'Műszaki és jogi pontosság', 'Kommunikáció, tárgyalókészség', 'Sok munkaóra vállalása határidő előtt'],
    ut: ['Gimnázium, rajz és matematika fontos (sok helyen rajzi alkalmassági vizsga)', '**Építészmérnöki** képzés egyetemen (BSc + MSc, vagy osztatlan, összesen kb. 5 év)', 'Gyakorlat tervezőirodában', 'Önálló tervezéshez **kamarai jogosultság** szakmai vizsgával'],
    tantargyak: ['matematika', 'rajz és vizuális kultúra', 'fizika', 'történelem (építészettörténet)'],
    kereset: 'Pályakezdőként átlagos, a tapasztalt, saját irodát vezető építészek jól kereshetnek; a piac az építőipartól függ.',
    kilatas: 'A fenntartható, energiatakarékos építés és a felújítások miatt a szakértelem keresett.',
    linkek: [{ lecke: 'vizualis/perspektiva' }, { lecke: 'epitoipar/tervrajz' }, { kurzus: 'mechanika' }, { lecke: 'vizualis/muveszettortenet-1' }, { lecke: 'matematika/pitagorasz' }] });

  /* ===================== Egészség és élettudomány ===================== */
  P({ id: 'orvos', title: 'Orvos', icon: '🩺', code: 'ISR', szint: 'diploma', terulet: 'Egészségügy',
    short: 'Betegségeket ismer fel és gyógyít – tudás, felelősség, emberség.',
    mit: 'Megvizsgálja a betegeket, kikérdezi őket, vizsgálatokat kér (labor, röntgen, ultrahang), felállítja a diagnózist és kezelést javasol. Szakterülettől függően rendel, műt, ügyel, mentőben dolgozik vagy kutat. A háziorvos hosszú távon kíséri a családokat, a szakorvos egy területben mélyül el.',
    nap: 'Egy kórházi belgyógyász reggel vizitel: végigjárja a betegeit, megnézi a leleteket, módosítja a kezelést. Délelőtt új betegeket vesz fel, délután konzultál más szakorvosokkal és hozzátartozókkal beszél. Néha éjszakai ügyelet következik.',
    tulajdonsagok: ['Nagyon jó tanulási képesség, kitartás (hosszú képzés)', 'Felelősségtudat, döntésképesség', 'Empátia és jó kommunikáció', 'Stressztűrés, terhelhetőség', 'Élethosszig tartó tanulás'],
    ut: ['Gimnázium, **emelt szintű biológia és kémia** érettségi', '**Általános orvos** osztatlan egyetemi képzés (6 év)', '**Szakorvosképzés** (rezidensként, kb. 4–6 év) a választott szakterületen', 'Rendszeres kötelező továbbképzések egész pályán át'],
    tantargyak: ['biológia', 'kémia', 'fizika', 'latin és angol', 'matematika'],
    kereset: 'A hosszú képzés alatt mérsékelt, szakorvosként jó vagy kiemelkedő kereset; függ a szakterülettől és a munkahelytől.',
    kilatas: 'Itthon és külföldön is nagy a szakemberhiány, a munka biztos – de megterhelő.',
    linkek: [{ kurzus: 'anatomia' }, { kurzus: 'msc-elettan' }, { utvonal: 'emberi-test' }, { modell: 'sziv' }, { lecke: 'biologia/keringes-legzes' }, { lecke: 'haztartas/elsosegely' }] });

  P({ id: 'apolo', title: 'Ápoló', icon: '💉', code: 'SIR', szint: 'vegyes', terulet: 'Egészségügy',
    short: 'A betegek mellett van éjjel-nappal: gondoz, figyel, kezel.',
    mit: 'Kórházban, rendelőben, otthonápolásban gondozza a betegeket: gyógyszert ad be, infúziót köt be, sebet kötöz, méri az életjeleket, és figyeli, hogy romlik vagy javul-e az állapotuk. Segít a mindennapi teendőkben, és lelki támasz is a betegnek és családjának. Az orvos sokszor tőle tudja meg először, ha baj van.',
    nap: 'A reggeli műszak átadással kezdődik: kinek milyen volt az éjszakája. Utána gyógyszerosztás, vérvétel, életjelek mérése, kötéscsere. Délben egy új beteget fogad, délután egy hazamenő beteget tanít meg az inzulin beadására. Három műszakos munkarend is lehet.',
    tulajdonsagok: ['Empátia és türelem', 'Pontosság (gyógyszerelés!)', 'Gyors helyzetfelismerés', 'Fizikai és lelki terhelhetőség', 'Csapatmunka'],
    ut: ['Egészségügyi **technikum** (gyakorló ápoló), majd érettségi után ápolói szakképzés', 'Vagy egyetemen **ápolás és betegellátás BSc** (kb. 4 év)', 'Specializáció: intenzív, műtői, mentő-, gyermekápolás stb.', 'Továbbtanulás: MSc, vezetői szerepek, oktatás'],
    tantargyak: ['biológia', 'kémia', 'matematika (adagszámítás)', 'idegen nyelv', 'pszichológia jellegű ismeretek'],
    kereset: 'Kezdetben mérsékelt, a végzettség, a szakterület, a műszakpótlékok és a tapasztalat emeli.',
    kilatas: 'Nagy a hiány itthon és külföldön is, a munka biztos.',
    linkek: [{ utvonal: 'emberi-test' }, { lecke: 'haztartas/elsosegely' }, { lecke: 'bio-alap/emberi-test-1' }, { kurzus: 'anatomia' }, { modell: 'sziv' }] });

  P({ id: 'gyogyszeresz', title: 'Gyógyszerész', icon: '💊', code: 'ICS', szint: 'diploma', terulet: 'Egészségügy',
    short: 'A gyógyszerek szakértője: kiad, tanácsot ad, fejleszt, ellenőriz.',
    mit: 'Patikában kiadja a gyógyszereket, ellenőrzi, hogy a felírt szerek nem ütik-e egymást, és tanácsot ad a helyes szedésről. Dolgozhat kórházi gyógyszertárban, gyógyszergyárban (fejlesztés, minőségellenőrzés, gyártás), hatóságnál vagy kutatásban is.',
    nap: 'Egy patikában reggel átveszi az árut, ellenőrzi a lejáratokat. A pultnál egész nap recepteket vált ki, és elmagyarázza, mit evés előtt, mit után kell bevenni. Délután egy kenőcsöt készít egyedi recept szerint, és egy idős vásárlónak összeírja a napi gyógyszerrendjét.',
    tulajdonsagok: ['Kémia és biológia iránti érdeklődés', 'Precizitás, felelősség', 'Jó kommunikáció, türelem', 'Megbízhatóság', 'Folyamatos tanulás (új gyógyszerek)'],
    ut: ['Gimnázium, **emelt kémia és biológia**', '**Gyógyszerész** osztatlan egyetemi képzés (5 év)', 'Szakgyógyszerész-képzés (pl. kórházi, ipari)', 'Kötelező továbbképzések'],
    tantargyak: ['kémia', 'biológia', 'fizika', 'matematika', 'latin és angol'],
    kereset: 'Jó, stabil kereset; az iparban és vezetőként magasabb.',
    kilatas: 'Biztos pálya, a gyógyszeripar is sok gyógyszerészt foglalkoztat.',
    linkek: [{ kurzus: 'msc-molbio-farma' }, { kurzus: 'szerves-kemia' }, { kurzus: 'kemia-bsc' }, { lecke: 'kemia/savak-bazisok' }, { lecke: 'kem-alap/mindennapok' }] });

  P({ id: 'biologus', title: 'Biológus', icon: '🧬', code: 'IRA', szint: 'diploma', terulet: 'Tudomány',
    short: 'Az élő világot kutatja: sejtektől a génektől az ökoszisztémákig.',
    mit: 'Élőlényeket és életfolyamatokat kutat: laborban sejteket, géneket, fehérjéket vizsgál, vagy terepen állatokat, növényeket, élőhelyeket figyel meg. Dolgozhat egyetemen, kutatóintézetben, gyógyszeriparban, természetvédelemben, laboratóriumi diagnosztikában vagy környezetvédelemben.',
    nap: 'Egy molekuláris biológus reggel sejttenyészetet ellenőriz, majd DNS-mintákat készít elő vizsgálatra. Délután az eredményeket elemzi a számítógépen, és a csoporttal megbeszélik a következő kísérletet. Egy terepbiológus ezalatt hajnalban madarakat számol egy nádasban.',
    tulajdonsagok: ['Kíváncsiság és türelem (a kísérletek sokszor nem sikerülnek elsőre)', 'Pontos megfigyelés és dokumentálás', 'Analitikus gondolkodás, statisztika', 'Angol nyelvtudás (szakirodalom)', 'Terepmunkánál jó fizikum'],
    ut: ['Gimnázium, **emelt biológia és kémia**', '**Biológia BSc** (3 év), majd **biológus MSc** (2 év)', 'Kutatói pályához **PhD** (doktori képzés)', 'Gyakorlat kutatócsoportban már az egyetem alatt'],
    tantargyak: ['biológia', 'kémia', 'matematika', 'angol', 'földrajz'],
    kereset: 'Az akadémiai kutatásban szerényebb, az iparban (gyógyszer, biotechnológia) jobb kereset.',
    kilatas: 'A biotechnológia és az orvosi kutatás bővül, a versengés a kutatói állásokért erős.',
    linkek: [{ tantargy: 'biologia' }, { utvonal: 'elet' }, { modell: 'sejt' }, { modell: 'dns' }, { lecke: 'biologia/genetika' }, { kurzus: 'msc-molbio-farma' }] });

  /* ===================== Természettudomány ===================== */
  P({ id: 'vegyesz', title: 'Vegyész', icon: '⚗️', code: 'IRC', szint: 'diploma', terulet: 'Tudomány',
    short: 'Anyagokat elemez, új vegyületeket állít elő és fejleszt.',
    mit: 'Új anyagokat, gyógyszer-hatóanyagokat, műanyagokat, akkumulátor-anyagokat fejleszt, vagy meglévő anyagok összetételét vizsgálja. Laborban szintetizál, analitikai műszerekkel mér, és gyártási folyamatokat felügyel. Dolgozhat gyógyszer-, vegy- és élelmiszeriparban, környezetvédelemben, hatósági laborban.',
    nap: 'Reggel elindít egy több lépéses szintézist, közben egy előző minta tisztaságát méri műszerrel. Délben a biztonsági előírások szerint hulladékot kezel. Délután az eredményeket kiértékeli, és jegyzőkönyvet ír.',
    tulajdonsagok: ['Kémia iránti szenvedély', 'Precíz, biztonságos laborgyakorlat', 'Türelem és kitartás', 'Elemző gondolkodás', 'Angol nyelvtudás'],
    ut: ['Gimnázium, **emelt kémia**; vegyipari technikum is jó alap', '**Kémia BSc**, majd **vegyész MSc**', 'Kutatói pályához PhD', 'Rokon lehetőség: vegyészmérnöki képzés'],
    tantargyak: ['kémia', 'matematika', 'fizika', 'biológia', 'angol'],
    kereset: 'Az iparban jó kereset, az akadémiai kutatásban szerényebb.',
    kilatas: 'A gyógyszer-, akkumulátor- és anyagipar folyamatosan keres vegyészeket.',
    linkek: [{ tantargy: 'kemia' }, { kurzus: 'kemia-bsc' }, { kurzus: 'szerves-kemia' }, { modell: 'atom' }, { modell: 'akkucella' }, { utvonal: 'termtud-78' }] });

  P({ id: 'fizikus', title: 'Fizikus', icon: '🔭', code: 'IRA', szint: 'diploma', terulet: 'Tudomány',
    short: 'A világ alapvető törvényeit kutatja – és a tudását a technikában is használja.',
    mit: 'Kísérletekkel és elméleti modellekkel kutatja az anyag, az energia, a fény, a csillagok és a részecskék törvényeit. Sok fizikus nem csak kutat: dolgozik orvosi fizikában (sugárterápia), energetikában, félvezetőiparban, adatelemzésben, szoftverfejlesztésben is, mert a problémamegoldó tudása sokfelé hasznos.',
    nap: 'Egy kísérleti fizikus reggel a lézeres mérőrendszer beállításán dolgozik, délután a mért adatokat programmal elemzi, és összeveti az elmélettel. Egy orvosi fizikus ugyanekkor besugárzási tervet ellenőriz a kórházban.',
    tulajdonsagok: ['Erős matematika', 'Elvont gondolkodás és kreativitás', 'Kitartás a nehéz problémákban', 'Programozási készség', 'Angol nyelv'],
    ut: ['Gimnázium, **emelt matematika és fizika**', '**Fizika BSc**, majd **fizikus MSc** (vagy orvosi fizika, csillagászat, anyagtudomány)', 'Kutatói pályához **PhD**', 'Iparban: elektronika, energetika, adatelemzés'],
    tantargyak: ['fizika', 'matematika', 'informatika', 'angol', 'kémia'],
    kereset: 'Az akadémiai kutatásban szerényebb, az iparban és a technológiai cégeknél jó vagy kiemelkedő.',
    kilatas: 'Sokoldalúan használható végzettség; a kutatói állásokért erős a verseny.',
    linkek: [{ tantargy: 'fizika' }, { kurzus: 'fizika-bsc' }, { modell: 'atom' }, { modell: 'atomeromu' }, { lecke: 'fizika/hullamok-feny' }, { kurzus: 'msc-numerikus' }] });

  P({ id: 'matematikus', title: 'Matematikus', icon: '➗', code: 'ICA', szint: 'diploma', terulet: 'Tudomány',
    short: 'Mintázatokat, bizonyításokat és modelleket keres – a tiszta gondolkodás mestere.',
    mit: 'Új matematikai tételeket bizonyít, vagy a matematikát alkalmazza: titkosításban, pénzügyekben (kockázatelemzés, biztosítás), logisztikában, időjárás-előrejelzésben, mesterséges intelligenciában. A munka nagy része gondolkodás, papíron és számítógépen.',
    nap: 'Egy alkalmazott matematikus egy biztosítónál reggel adatokat elemez, és azt modellezi, mekkora kockázatot jelent egy új termék. Délután programot ír a szimulációhoz, majd kollégáival megvitatja az eredményeket. Egy egyetemi kutató eközben egy bizonyítás egyetlen lépésén töpreng napok óta.',
    tulajdonsagok: ['Kiemelkedő logikai és elvont gondolkodás', 'Türelem, kitartás', 'Pontosság', 'Kreativitás a problémamegoldásban', 'Programozási készség (alkalmazott területen)'],
    ut: ['Gimnázium, **emelt matematika**, versenyek, szakkörök', '**Matematika BSc**, majd **matematikus MSc** vagy alkalmazott matematikus MSc', 'Kutatói pályához **PhD**', 'Rokon pályák: aktuárius, kriptográfus, adattudós'],
    tantargyak: ['matematika', 'informatika', 'fizika', 'angol'],
    kereset: 'Az alkalmazott területeken (pénzügy, informatika) kiemelkedő is lehet, az oktatásban és a kutatásban szerényebb.',
    kilatas: 'A matematikusok tudása szinte minden adatvezérelt iparágban keresett.',
    linkek: [{ tantargy: 'matematika' }, { kurzus: 'analizis' }, { kurzus: 'linearis-algebra' }, { kurzus: 'valszam' }, { kurzus: 'msc-optimalizalas' }, { utvonal: 'erettsegi-matek' }] });

  /* ===================== Oktatás, sport, lélek ===================== */
  P({ id: 'tanar', title: 'Tanár', icon: '👩‍🏫', code: 'SAE', szint: 'diploma', terulet: 'Oktatás',
    short: 'Tudást ad át, és segít a diákoknak felnőni – minden nap más.',
    mit: 'Általános vagy középiskolában tanít egy-két tantárgyat: órákat tervez, magyaráz, kísérletezik, gyakoroltat, dolgozatot javít, értékel. Osztályfőnökként a diákok ügyeivel, a szülőkkel is foglalkozik. Jó esetben nemcsak tananyagot, hanem gondolkodást és tanulási kedvet is átad.',
    nap: 'Reggel 4–5 órát tart különböző osztályokban: az egyikben kísérletet mutat, a másikban csoportmunkát vezet. A szünetekben ügyel, kérdésekre válaszol. Délután dolgozatot javít, szülővel beszél, és a következő napi órákra készül.',
    tulajdonsagok: ['Türelem és empátia', 'Jó magyarázókészség, kommunikáció', 'Szervezőkészség, következetesség', 'Érdeklődés a tantárgya iránt', 'Humor és rugalmasság'],
    ut: ['Gimnázium, a tanítandó tárgyakból jó érettségi', '**Osztatlan tanárképzés** két szakon (kb. 5–6 év, iskolai gyakorlattal)', 'Vagy szakmai BSc/MSc után **tanári mesterképzés**', 'Szakmai tantárgyakat (pl. villamosság) mérnök- vagy szakmai tanárként is lehet tanítani'],
    tantargyak: ['a választott két tantárgy', 'magyar (kommunikáció)', 'pszichológia jellegű ismeretek'],
    kereset: 'Közalkalmazotti bértábla szerint, a fokozatok és a pótlékok emelik; az utóbbi években javult.',
    kilatas: 'Sok tárgyból (főleg természettudomány, matematika, informatika) tanárhiány van, a munka biztos.',
    linkek: [{ tantargy: 'tanari' }, { oldal: '#/tanaroknak', title: 'Tanároknak – eszközök', icon: '👩‍🏫' }, { lecke: 'tanari/oratervezes' }, { lecke: 'tanari/tanulas-tudomanya' }, { oldal: '#/tanulas', title: 'Tanulássegéd', icon: '📚' }] });

  P({ id: 'ovodapedagogus', title: 'Óvodapedagógus', icon: '🧸', code: 'SAC', szint: 'diploma', terulet: 'Oktatás',
    short: 'Játékkal, mesével, zenével fejleszti a 3–7 éves gyerekeket.',
    mit: 'Óvodai csoportot vezet: játékos foglalkozásokat tart (mese, ének, rajz, mozgás, környezetismeret), figyeli és fejleszti a gyerekek mozgását, beszédét, önállóságát és társas kapcsolatait. Segít felkészülni az iskolára, és szoros kapcsolatot tart a szülőkkel.',
    nap: 'Reggel fogadja a gyerekeket, megnyugtatja a sírókat. Délelőtt mesél, énekel, kézműveskedik, kimennek az udvarra. Ebéd és pihenő után délután szabad játék, egyéni fejlesztés. Közben megfigyeléseket jegyez és szülőkkel beszél.',
    tulajdonsagok: ['Gyerekszeretet, türelem', 'Kreativitás (mese, zene, kézművesség)', 'Állóképesség és jókedv', 'Megfigyelőképesség', 'Kommunikáció a szülőkkel'],
    ut: ['Érettségi', '**Óvodapedagógus BA** (3 év, sok óvodai gyakorlattal)', 'Továbbképzés: fejlesztőpedagógus, gyógypedagógia, vezetői feladatok', 'Középfokon: pedagógiai munkatárs, dajka képzés is létezik'],
    tantargyak: ['magyar (mese, beszéd)', 'ének-zene', 'vizuális kultúra', 'testnevelés', 'biológia (fejlődés)'],
    kereset: 'Közalkalmazotti bértábla szerint; nem a legmagasabb, de biztos.',
    kilatas: 'Állandó a kereslet, sok helyen óvodapedagógus-hiány van.',
    linkek: [{ tantargy: 'enek-zene' }, { tantargy: 'vizualis' }, { lecke: 'tanari/motivacio' }, { lecke: 'tanari/differencialas' }, { lecke: 'magyar/irodalom-alapok' }] });

  P({ id: 'edzo', title: 'Edző', icon: '🏋️', code: 'SER', szint: 'vegyes', terulet: 'Sport',
    short: 'Sportolókat fejleszt: edzést tervez, motivál, versenyre készít.',
    mit: 'Gyerekeket, amatőröket vagy élsportolókat edz egy sportágban, vagy személyi edzőként egyéni célokhoz (fogyás, erősödés) segít. Edzéstervet készít, figyeli a terhelést és a regenerációt, technikát tanít, taktikát épít, és motivál. Felelős a sportolói biztonságáért is.',
    nap: 'Délelőtt edzéstervet ír a hétre, és videót elemez a múlt heti meccsről. Délután két csoportot edz: a kicsiknél a játékosság, a versenyzőknél az intenzitás a fontos. Hétvégén versenyre kíséri a csapatot.',
    tulajdonsagok: ['Szenvedély a sport iránt', 'Vezetői és motiváló képesség', 'Türelem, főleg gyerekekkel', 'Tudományos szemlélet (edzéselmélet)', 'Felelősségtudat, biztonság'],
    ut: ['Érettségi után **sportedző szakképzés** (sportág szerint)', 'Vagy egyetemen **edző / testnevelő BSc**, majd MSc', 'Szövetségi edzői licencek (pl. labdarúgásban)', 'Személyi edzőnek külön képzés'],
    tantargyak: ['testnevelés', 'biológia (élettan)', 'kémia (táplálkozás)', 'pszichológia jellegű ismeretek'],
    kereset: 'Nagyon változó: sokan részmunkaidőben kezdenek; élsportban és jó ügyfélkörrel személyi edzőként jól lehet keresni.',
    kilatas: 'Az egészséges életmód iránti érdeklődés miatt nő a kereslet, de nagy a verseny.',
    linkek: [{ tantargy: 'edzo' }, { oldal: '#/edzoknek', title: 'Edzőknek – eszközök', icon: '🏋️' }, { lecke: 'edzo/periodizacio' }, { lecke: 'sport/edzeselmelet' }, { oldal: '#/sport', title: 'Így edzenek a legjobbak', icon: '🏆' }] });

  P({ id: 'sportpszichologus', title: 'Sportpszichológus', icon: '🧠', code: 'SIA', szint: 'diploma', terulet: 'Sport',
    short: 'Segít a sportolóknak fejben is erősnek lenni.',
    mit: 'Sportolókkal és csapatokkal dolgozik a mentális teljesítményen: koncentráció, versenyszorongás, motiváció, célkitűzés, sérülés utáni visszatérés, csapatlégkör. Technikákat tanít (légzés, vizualizáció, rutinok), és támogatja az edzőket a kommunikációban.',
    nap: 'Délelőtt egy fiatal teniszezővel dolgozik a meccs előtti izgalom kezelésén. Délután a csapat edzését nézi meg, utána az edzővel beszéli át, hogyan adjon visszajelzést. Este egy sérült sportolóval tart online beszélgetést.',
    tulajdonsagok: ['Empátia, jó meghallgatás', 'Sportismeret', 'Titoktartás', 'Tudományos szemlélet', 'Türelem (a változás időbe telik)'],
    ut: ['Gimnázium, biológia és jó fogalmazás előny', '**Pszichológia BA**, majd **pszichológus MA** (összesen kb. 5 év)', 'Sportpszichológiai szakirányú továbbképzés, szupervízió', 'Rokon út: sporttudományi végzettség + mentáltréner-képzés (de pszichológusként csak a pszichológus dolgozhat)'],
    tantargyak: ['biológia', 'magyar (kommunikáció)', 'testnevelés', 'matematika (statisztika)'],
    kereset: 'Erősen függ az ügyfélkörtől; élsportban és magánpraxisban jó lehet.',
    kilatas: 'A mentális felkészítés egyre elfogadottabb, a terület bővül.',
    linkek: [{ lecke: 'sport/sportpszichologia' }, { lecke: 'edzo/kommunikacio-motivacio' }, { modell: 'agy' }, { lecke: 'haztartas/mentalis-egeszseg' }, { tantargy: 'sport' }] });

  P({ id: 'pszichologus', title: 'Pszichológus', icon: '🫂', code: 'ISA', szint: 'diploma', terulet: 'Egészségügy',
    short: 'Az emberi gondolkodást és viselkedést érti – és segít, ha baj van.',
    mit: 'Az emberi gondolkodást, érzelmeket és viselkedést vizsgálja és segíti. Dolgozhat klinikai pszichológusként (diagnózis, terápia), iskolapszichológusként, munkahelyi (HR-) pszichológusként, kutatóként vagy tanácsadóként. Beszélget, teszteket vesz fel, és bizonyítékokon alapuló módszerekkel segít.',
    nap: 'Egy iskolapszichológus reggel osztályfoglalkozást tart a stresszkezelésről. Délelőtt egyéni beszélgetések diákokkal, délben egyeztet egy osztályfőnökkel és a szülőkkel. Délután tanácsadói jegyzeteket ír és szakmai esetmegbeszélésen vesz részt.',
    tulajdonsagok: ['Empátia és jó meghallgatás', 'Lelki stabilitás, határok tartása', 'Titoktartás', 'Tudományos, kritikus gondolkodás', 'Kommunikáció'],
    ut: ['Gimnázium (biológia, matematika előny)', '**Pszichológia BA** (3 év), majd **pszichológus MA** (2 év)', 'Klinikai munkához **szakpszichológus-képzés** (több év)', 'Terápiás módszerekhez további képzések, szupervízió'],
    tantargyak: ['biológia', 'magyar', 'matematika (statisztika)', 'angol', 'történelem és társadalomismeret'],
    kereset: 'Közszférában mérsékelt, magánpraxisban és a cégeknél jobb.',
    kilatas: 'A lelki egészség iránti igény nő, a szakpszichológusokra hosszú várólisták vannak.',
    linkek: [{ modell: 'agy' }, { lecke: 'haztartas/mentalis-egeszseg' }, { lecke: 'tanari/jollet' }, { lecke: 'biologia/ideg-hormon-emesztes' }, { kurzus: 'valszam' }] });

  P({ id: 'szocialis-munkas', title: 'Szociális munkás', icon: '🤲', code: 'SEA', szint: 'diploma', terulet: 'Közszolgálat',
    short: 'Nehéz helyzetbe került embereknek, családoknak segít talpra állni.',
    mit: 'Családsegítőben, gyermekvédelemben, idősotthonban, hajléktalanellátásban, kórházban dolgozik. Felméri, kinek milyen segítség kell, ügyeket intéz, támogatásokhoz segít hozzá, családokat kísér, és összehangolja az orvosok, iskolák, hivatalok munkáját.',
    nap: 'Reggel családlátogatás: egy anyuka nem tudja fizetni a rezsit, közösen megnézik, milyen támogatás jár. Délben esetmegbeszélés a kollégákkal, délután egy iskolával egyeztet egy sokat hiányzó gyerek ügyében, majd adminisztrál.',
    tulajdonsagok: ['Empátia, de érzelmi határok tartása', 'Problémamegoldás, kitartás', 'Jó kommunikáció, konfliktuskezelés', 'Jogszabályok, ügyintézés ismerete', 'Lelki terhelhetőség'],
    ut: ['Érettségi', '**Szociális munka BA** (kb. 3,5 év, sok terepgyakorlattal)', 'MA: szociálpolitika, szociális munka', 'Középfokon: szociális ápoló és gondozó, gyermekgondozó képzések is vannak'],
    tantargyak: ['társadalomismeret és állampolgári ismeretek', 'magyar', 'pszichológia jellegű ismeretek', 'idegen nyelv'],
    kereset: 'A közszféra bértáblái szerint, szerény; az értelmes, segítő munka a fő motiváció.',
    kilatas: 'Állandó és növekvő igény (idősödő társadalom), a pályán hiány van.',
    linkek: [{ tantargy: 'allampolgari' }, { lecke: 'allampolgari/jogok' }, { lecke: 'felnott-elet/ugyintezes-online' }, { lecke: 'penz-mindennap/lakhatas-rezsi' }, { lecke: 'haztartas/mentalis-egeszseg' }] });

  /* ===================== Gazdaság és jog ===================== */
  P({ id: 'konyvelo', title: 'Könyvelő', icon: '📒', code: 'CEI', szint: 'vegyes', terulet: 'Gazdaság',
    short: 'Rendben tartja a cégek pénzügyeit: számlák, bevallások, mérleg.',
    mit: 'Cégek és vállalkozók gazdasági eseményeit rögzíti: számlákat, bankszámlákat, béreket könyvel, adóbevallásokat készít, és elkészíti az éves beszámolót. Figyeli a határidőket és a változó adószabályokat, tanácsot ad az ügyfeleknek. Ma szinte mindent szoftverrel végez, az automatizálás egyre több rutinmunkát átvesz.',
    nap: 'Reggel egy ügyfél számláit dolgozza fel, és egyezteti a bankszámlakivonattal. Délben a havi bérszámfejtést ellenőrzi. Délután egy vállalkozónak elmagyarázza, mikor éri meg áfakörbe lépni, majd beküldi a bevallást.',
    tulajdonsagok: ['Pontosság, precizitás', 'Számok szeretete', 'Rendszerező gondolkodás', 'Megbízhatóság, titoktartás', 'Határidők tartása'],
    ut: ['Gazdasági **technikum** (pénzügyi-számviteli irány) érettségivel', 'Érettségi után **mérlegképes könyvelő** képesítés', 'Vagy egyetemen **pénzügy és számvitel BA**', 'Önálló könyveléshez szakmai nyilvántartásba vétel és kötelező továbbképzés'],
    tantargyak: ['matematika', 'gazdasági ismeretek', 'informatika (táblázatkezelés)', 'magyar (szövegértés, jog)'],
    kereset: 'Biztos, átlag feletti is lehet; a mérlegképes képesítés és a saját ügyfélkör sokat emel.',
    kilatas: 'A rutinmunkát automatizálják, de a tanácsadásra képes könyvelőkre továbbra is szükség van.',
    linkek: [{ utvonal: 'konyvelo' }, { kurzus: 'szamvitel' }, { kurzus: 'adozas' }, { lecke: 'penz-mindennap/afa-szamla' }, { lecke: 'penz-mindennap/berpapir' }] });

  P({ id: 'konyvvizsgalo', title: 'Könyvvizsgáló', icon: '🔍', code: 'CIE', szint: 'diploma', terulet: 'Gazdaság',
    short: 'Ellenőrzi, hogy egy cég beszámolója megbízható és valós-e.',
    mit: 'Független szakértőként átvizsgálja a vállalatok éves beszámolóját, és véleményt mond arról, hogy az valós képet ad-e a cég helyzetéről. Mintákat vesz, egyeztet, kockázatokat mér fel, belső kontrollokat tesztel. A befektetők, bankok, állam bizalma az ő munkáján múlik.',
    nap: 'Egy könyvvizsgáló cég csapatával az ügyfélnél dolgozik: készletleltáron vesz részt, majd szerződéseket és számlákat vet össze a könyveléssel. Délután egy eltérést tisztáz a pénzügyi vezetővel, és dokumentálja a megállapításait.',
    tulajdonsagok: ['Kritikus, „szakmai szkepszis”', 'Precizitás', 'Függetlenség, etikus viselkedés', 'Kommunikáció és határozottság', 'Terhelhetőség (szezonális csúcsok)'],
    ut: ['Közgazdasági, pénzügyi **BA/BSc** (pl. pénzügy és számvitel), gyakran MSc is', 'Több év szakmai gyakorlat könyvvizsgáló cégnél', 'Szigorú **szakmai vizsgák** után kamarai tagként **bejegyzett könyvvizsgáló**', 'Kötelező éves továbbképzés'],
    tantargyak: ['matematika', 'gazdasági ismeretek', 'angol', 'informatika'],
    kereset: 'Pályakezdőként jó, bejegyzett könyvvizsgálóként és partnerként kiemelkedő is lehet.',
    kilatas: 'Kevés a bejegyzett könyvvizsgáló, az utánpótlásra szükség van; az adatelemző eszközök átalakítják a munkát.',
    linkek: [{ kurzus: 'konyvvizsgalat' }, { kurzus: 'szamvitel' }, { kurzus: 'msc-ifrs' }, { utvonal: 'konyvelo' }, { kurzus: 'valszam' }] });

  P({ id: 'penzugyi-elemzo', title: 'Pénzügyi elemző', icon: '💹', code: 'CIE', szint: 'diploma', terulet: 'Gazdaság',
    short: 'Cégek, befektetések és piacok számait elemzi, döntéseket készít elő.',
    mit: 'Vállalatok pénzügyi helyzetét, befektetési lehetőségeket, piaci folyamatokat elemez. Modelleket épít táblázatkezelőben, előrejelzést készít a bevételekre, értékel cégeket és projekteket, és ajánlást ír a döntéshozóknak. Dolgozhat banknál, befektetési alapnál, vállalati pénzügyön vagy tanácsadó cégnél.',
    nap: 'Reggel átnézi a piaci híreket és az árfolyamokat. Délelőtt egy beruházás megtérülését számolja (pénzáramok, kamatláb, kockázat). Délután prezentációt készít a vezetőségnek, amely röviden és világosan összefoglalja, megéri-e.',
    tulajdonsagok: ['Matematikai és elemző gondolkodás', 'Precizitás, táblázatkezelés', 'Gazdasági érdeklődés, hírkövetés', 'Érthető prezentálás', 'Stressztűrés (határidők)'],
    ut: ['Gimnázium, emelt matematika ajánlott', '**BA/BSc**: pénzügy és számvitel, gazdálkodás, közgazdaság', '**MSc**: pénzügy, befektetéselemzés', 'Nemzetközi szakmai minősítések (pl. befektetési elemzői)'],
    tantargyak: ['matematika', 'gazdasági ismeretek', 'angol', 'informatika'],
    kereset: 'A jól fizetett pályák közé tartozik, különösen a befektetési szektorban.',
    kilatas: 'Keresett; az elemzők a programozást és az adatelemzést is egyre inkább használják.',
    linkek: [{ kurzus: 'vallalati-penzugy' }, { kurzus: 'msc-halado-penzugy' }, { tantargy: 'penzugy' }, { lecke: 'penzugy/befektetes' }, { lecke: 'penzugy/kamat-inflacio' }, { utvonal: 'penz-gazdasag' }] });

  P({ id: 'kozgazdasz', title: 'Közgazdász', icon: '📊', code: 'ICE', szint: 'diploma', terulet: 'Gazdaság',
    short: 'Azt kutatja, hogyan működik a gazdaság – piacok, árak, munka, döntések.',
    mit: 'A gazdasági folyamatokat elemzi: inflációt, munkanélküliséget, árakat, kereskedelmet, emberek és cégek döntéseit. Adatokból és modellekből következtetéseket von le, előrejelzést készít, és javaslatokat tesz kormányzati szerveknek, jegybanknak, cégeknek vagy nemzetközi szervezeteknek.',
    nap: 'Egy elemzőintézetben reggel friss inflációs adatokat dolgoz fel, majd statisztikai modellel megbecsüli a következő hónapokat. Délután egy tanulmányon dolgozik arról, hogyan hat a minimálbér-emelés a foglalkoztatásra, és egy újságírónak nyilatkozik.',
    tulajdonsagok: ['Elemző, modellező gondolkodás', 'Matematika és statisztika', 'Érdeklődés a társadalom iránt', 'Jó írás- és vitakészség', 'Angol nyelv'],
    ut: ['Gimnázium, emelt matematika', '**Közgazdasági BA/BSc** (pl. alkalmazott közgazdaságtan, gazdaságelemzés)', '**MSc** közgazdaság, gazdaságelemzés; kutatói pályához PhD', 'Gyakorlat elemző intézetnél, banknál, minisztériumban'],
    tantargyak: ['matematika', 'történelem és társadalomismeret', 'angol', 'informatika', 'földrajz (világgazdaság)'],
    kereset: 'Jó, a pénzügyi szektorban és nemzetközi szervezeteknél kiemelkedő is lehet.',
    kilatas: 'Sokoldalú végzettség, keresett az elemzői pályákon.',
    linkek: [{ kurzus: 'kozgazdasagtan' }, { utvonal: 'penz-gazdasag' }, { lecke: 'penzugy/kamat-inflacio' }, { lecke: 'foldrajz/nepesseg-gazdasag' }, { kurzus: 'valszam' }] });

  P({ id: 'jogasz', title: 'Jogász', icon: '⚖️', code: 'EIS', szint: 'diploma', terulet: 'Jog',
    short: 'Ügyvéd, bíró, ügyész vagy cégjogász: a szabályok és az igazság szakértője.',
    mit: 'A jogszabályokat értelmezi és alkalmazza. Ügyvédként ügyfeleket képvisel, szerződéseket ír, tárgyalásokon érvel. Bíróként dönt a vitákban és büntetőügyekben, ügyészként vádat emel. Cégjogászként a vállalat szerződéseit és kockázatait kezeli. Sokat olvas, ír és tárgyal.',
    nap: 'Egy ügyvéd reggel egy adásvételi szerződést fogalmaz, délben az ügyfélnek elmagyarázza a kockázatokat. Délután bírósági tárgyaláson képviseli egy munkaügyi vitában, este felkészül a következő napi ügyre.',
    tulajdonsagok: ['Kiváló szövegértés és fogalmazás', 'Logikus érvelés, vitakészség', 'Pontosság (egy szó is számít)', 'Etikus magatartás, titoktartás', 'Magabiztos fellépés'],
    ut: ['Gimnázium, jó magyar és történelem; a nyelvtudás előny', '**Jogász** osztatlan egyetemi képzés (5 év)', 'Joggyakorlat (pl. ügyvédjelöltként, bírósági fogalmazóként), majd **jogi szakvizsga**', 'Ügyvédi kamarai tagság, bírói vagy ügyészi kinevezés'],
    tantargyak: ['magyar', 'történelem', 'állampolgári ismeretek', 'idegen nyelvek', 'latin'],
    kereset: 'Pályakezdőként átlagos, tapasztalt ügyvédként, nagy irodában vagy cégjogászként kiemelkedő is lehet.',
    kilatas: 'Mindig kell jogász; a rutinszerű munkát (iratkeresés) a mesterséges intelligencia gyorsítja.',
    linkek: [{ tantargy: 'allampolgari' }, { lecke: 'allampolgari/jogok' }, { lecke: 'allampolgari/intezmenyek' }, { lecke: 'felnott-elet/szerzodesek' }, { lecke: 'felnott-elet/munkaszerzodes' }, { kurzus: 'adozas' }] });

  /* ===================== Művészet és média ===================== */
  P({ id: 'ujsagiro', title: 'Újságíró', icon: '📰', code: 'AEI', szint: 'diploma', terulet: 'Média',
    short: 'Utánajár, kérdez, ellenőriz – és érthetően elmondja, mi történt.',
    mit: 'Híreket, riportokat, interjúkat, elemzéseket készít írott, online, rádiós vagy televíziós médiumoknak. Forrásokat keres és **ellenőriz**, kérdez, jegyzetel, majd érthető, pontos szöveget vagy videót készít. A jó újságíró elválasztja a tényeket a véleménytől, és ellenáll a manipulációnak.',
    nap: 'Reggel szerkesztőségi értekezlet: ki mivel foglalkozik. Délelőtt telefonál, adatokat keres, és egy szakértővel interjút készít. Délután megírja a cikket, a szerkesztő javaslatára átírja, és ellenőrzi az összes számot. Ha nagy hír jön, minden felborul.',
    tulajdonsagok: ['Kíváncsiság, bátorság kérdezni', 'Kiváló írás- és fogalmazókészség', 'Kritikus gondolkodás, tényellenőrzés', 'Gyorsaság, határidők', 'Etikus hozzáállás'],
    ut: ['Gimnázium, jó magyar és nyelvtudás', 'Egyetem: **kommunikáció és médiatudomány BA**, vagy bármilyen szakterület (pl. közgazdaság, jog) + újságírói képzés', 'Gyakorlat: iskolaújság, blog, gyakornokság szerkesztőségben', 'A szakterületi tudás (pl. tudomány, gazdaság) nagy előny'],
    tantargyak: ['magyar', 'történelem', 'idegen nyelvek', 'állampolgári ismeretek (médiatudatosság)'],
    kereset: 'Változó és sokszor szerény; ismert szerzőként, nagy médiumnál vagy kommunikációs területen jobb.',
    kilatas: 'A média átalakul (online, videó, podcast); a hiteles, ellenőrzött tájékoztatás értéke nő, de a biztos állás ritkább.',
    linkek: [{ lecke: 'allampolgari/mediatudatossag' }, { tantargy: 'magyar' }, { lecke: 'magyar/helyesiras' }, { tantargy: 'tortenelem' }, { oldal: '#/tudtad', title: 'Tudtad? – meglepő tények', icon: '💡' }] });

  P({ id: 'grafikus', title: 'Grafikus (tervezőgrafikus)', icon: '🎨', code: 'ARE', szint: 'vegyes', terulet: 'Művészet',
    short: 'Logókat, plakátokat, weboldalakat, alkalmazásfelületeket tervez.',
    mit: 'Vizuális üzeneteket tervez: arculatot (logó, színek, betűk), plakátot, csomagolást, könyvet, weboldalt, alkalmazásfelületet, közösségi médiás tartalmat. A megrendelő céljából indul ki, vázlatokat készít, majd szoftverekkel kidolgozza és nyomdára vagy webre előkészíti.',
    nap: 'Reggel egy kávézó új logójához készít három vázlatot. Délben megbeszélés az ügyféllel, aki a második irányt választja, de „kicsit vidámabban”. Délután egy alkalmazás képernyőit rendezi át, hogy könnyebben használható legyen.',
    tulajdonsagok: ['Kreativitás és jó vizuális érzék', 'Rajzkészség, szoftverismeret', 'Kritika elfogadása, rugalmasság', 'Határidők tartása', 'Kommunikáció az ügyfelekkel'],
    ut: ['Művészeti szakgimnázium vagy kreatív **technikum** (grafikus irány)', 'Egyetem: **tervezőgrafika** vagy médiadesign BA, majd MA', 'A legfontosabb: **erős portfólió** saját munkákból', 'Folyamatos szoftveres és trendkövetés'],
    tantargyak: ['vizuális kultúra (rajz)', 'informatika', 'magyar', 'angol', 'művészettörténet'],
    kereset: 'Széles skála: pályakezdőként és szabadúszóként ingadozó, tapasztalt felülettervezőként vagy art directorként jó.',
    kilatas: 'A digitális felületek tervezése (UX/UI) keresett; a mesterséges intelligencia az egyszerű feladatokat átveszi, az ötlet és az ízlés értéke nő.',
    linkek: [{ tantargy: 'vizualis' }, { utvonal: 'muveszet' }, { lecke: 'vizualis/szinek' }, { lecke: 'vizualis/kompozicio' }, { lecke: 'vizualis/digitalis-kep' }] });

  P({ id: 'zenesz', title: 'Zenész', icon: '🎸', code: 'AES', szint: 'vegyes', terulet: 'Művészet',
    short: 'Játszik, énekel, komponál – színpadon, stúdióban, tanítva.',
    mit: 'Hangszeren játszik vagy énekel zenekarban, kórusban, együttesben, szólóban; stúdióban felvételeken dolgozik, zenét szerez vagy hangszerel. Sok zenész több lábon áll: tanít, hangmérnököl, filmzenét vagy reklámzenét készít.',
    nap: 'Délelőtt otthon gyakorol (napi több óra skála, darabok). Délután zeneiskolában tanít, este próba vagy koncert. Hétvégén fellépések, a kettő között közösségi média és szervezés.',
    tulajdonsagok: ['Zenei tehetség és nagyon sok gyakorlás', 'Kitartás, önfegyelem', 'Lámpaláz kezelése, fellépési kedv', 'Együttműködés más zenészekkel', 'Vállalkozói szemlélet (fellépések szervezése)'],
    ut: ['Kezdés minél korábban: **alapfokú zeneiskola**', 'Zeneművészeti szakgimnázium (középfok)', 'Egyetemi **zeneművészeti BA/MA** (előadó, zeneszerző, zenetanár)', 'Könnyűzenében a tudás, a gyakorlat és a kapcsolatok gyakran fontosabbak a papírnál'],
    tantargyak: ['ének-zene', 'idegen nyelvek', 'matematika (ritmus, akusztika)', 'fizika (hang)'],
    kereset: 'Nagyon változó: a többség több forrásból (koncert, tanítás, stúdió) él; kevesen lesznek híresek.',
    kilatas: 'Erős verseny, de a tanítás és a zenei szolgáltatások stabilabb lehetőséget adnak.',
    linkek: [{ tantargy: 'enek-zene' }, { utvonal: 'muveszet' }, { lecke: 'enek-zene/hangszerek' }, { lecke: 'enek-zene/hang-alapjai' }, { lecke: 'fizika/hullamok-feny' }] });

  P({ id: 'fordito', title: 'Fordító, tolmács', icon: '🗣️', code: 'ASC', szint: 'diploma', terulet: 'Nyelvek',
    short: 'Hidat épít nyelvek és kultúrák között – írásban vagy élőszóban.',
    mit: 'A **fordító** írott szövegeket ültet át egyik nyelvről a másikra: szerződést, használati útmutatót, regényt, filmfeliratot, weboldalt. A **tolmács** élőszóban dolgozik: konferencián fülkéből szinkronban, tárgyaláson vagy orvosnál konszekutívan. Mindkettőhöz két nyelv és két kultúra mély ismerete kell.',
    nap: 'Egy szabadúszó fordító délelőtt egy műszaki dokumentációt fordít szakszótárakkal és fordítómemória-programmal. Délután egy gépi fordítás eredményét ellenőrzi és javítja (utószerkesztés). Egy tolmács ezalatt kollégájával felváltva, 20–30 percenként tolmácsol egy konferencián.',
    tulajdonsagok: ['Kiváló nyelvtudás és anyanyelvi igényesség', 'Pontosság, kultúraérzékenység', 'Koncentráció (tolmácsnál villámgyors reakció)', 'Önálló munkavégzés, határidők', 'Szakterületi tudás (jog, orvoslás, műszaki)'],
    ut: ['Gimnázium, magas szintű nyelvtudás két idegen nyelvből', 'Egyetem: valamilyen nyelvi vagy szakmai **BA** (pl. anglisztika, germanisztika, műszaki, jogi)', '**Fordító és tolmács MA** vagy szakfordító-képzés', 'Hivatalos fordításokhoz külön jogosultságok'],
    tantargyak: ['idegen nyelvek', 'magyar', 'történelem és kultúra', 'a választott szakterület tárgyai'],
    kereset: 'Változó: szabadúszóként a megrendelésektől függ; a szakfordítók és a konferenciatolmácsok jól kereshetnek.',
    kilatas: 'A gépi fordítás sok rutinfeladatot átvesz, de a minőségellenőrzés, a tolmácsolás és a kreatív, felelősségteljes szövegek emberi szakértőt igényelnek.',
    linkek: [{ oldal: '#/nyelvek', title: 'Nyelvtanfolyamok', icon: '🌐' }, { tantargy: 'angol' }, { tantargy: 'magyar' }, { lecke: 'magyar/szofajok' }, { lecke: 'allampolgari/europai-unio' }] });

  /* ===================== Közlekedés, közszolgálat ===================== */
  P({ id: 'pilota', title: 'Pilóta', icon: '✈️', code: 'RIE', szint: 'vegyes', terulet: 'Közlekedés',
    short: 'Repülőgépet vezet biztonságosan, utasokkal vagy áruval.',
    mit: 'Utasszállító, teher-, mentő-, mezőgazdasági vagy katonai repülőgépet (vagy helikoptert) vezet. Repülés előtt ellenőrzi az időjárást, a gépet, az útvonalat és az üzemanyagot, repülés közben a másodpilótával együtt kezeli a gépet és a rendszereket, kommunikál a légiforgalmi irányítással. A munka nagy része szabálykövetés és ellenőrzőlisták.',
    nap: 'Hajnalban jelentkezik a repülőtéren: eligazítás, időjárás, üzemanyag-számítás. Körbejárja a gépet, majd a pilótafülkében végigmennek az ellenőrzőlistán. Egy nap alatt két-három járatot is repülhet, közben az utasok biztonsága az első.',
    tulajdonsagok: ['Nyugodtság, gyors döntés vészhelyzetben', 'Szabálykövetés, fegyelem', 'Jó térérzék, koordináció', 'Csapatmunka, angol kommunikáció', 'Kiváló egészség'],
    ut: ['Érettségi, jó matematika, fizika és **angol**', 'Szigorú **repülőorvosi alkalmassági** vizsgálat', 'Repülőiskolában elméleti és gyakorlati képzés a hivatásos (forgalmi) pilótaszakszolgálati engedélyig', 'Légitársasági kadétprogram, vagy katonai pilótaképzés; műszaki egyetemen közlekedésmérnöki repülő szakirány is van'],
    tantargyak: ['fizika', 'matematika', 'angol', 'földrajz (meteorológia, navigáció)'],
    kereset: 'Utasszállító kapitányként kiemelkedő; a drága képzés miatt a pálya eleje anyagilag nehéz lehet.',
    kilatas: 'A légi közlekedés hosszabb távon nő, a pilótákra szükség van, de a kereslet hullámzik.',
    linkek: [{ modell: 'hajtomu' }, { lecke: 'foldrajz/legkor' }, { lecke: 'fizika/newton' }, { tantargy: 'angol' }, { lecke: 'fiz-alap/nyomas' }] });

  P({ id: 'rendor', title: 'Rendőr', icon: '👮', code: 'ESR', szint: 'vegyes', terulet: 'Közszolgálat',
    short: 'Vigyáz a közbiztonságra, segít bajban, és fellép a bűnözés ellen.',
    mit: 'Járőrözik, forgalmat irányít, intézkedik bajba jutott emberek, balesetek, bűncselekmények esetén. Nyomozóként bűnügyeket derít fel, más szakterületeken közlekedésrendészettel, kiberbűnözéssel, bűnmegelőzéssel foglalkozik. A törvények pontos ismerete és az emberekkel való higgadt bánásmód is a munkája része.',
    nap: 'Egy járőr reggel eligazításon vesz részt, utána párjával körzetet jár. Délelőtt egy kisebb balesetnél intézkedik, délben egy eltévedt idős embert visz haza. Délután jelentést ír. Hétvégén és éjszaka is dolgozik.',
    tulajdonsagok: ['Higgadtság, határozottság', 'Igazságérzet, etikus viselkedés', 'Jó fizikai állapot', 'Kommunikáció, konfliktuskezelés', 'Csapatmunka és szabálykövetés'],
    ut: ['Rendészeti **technikum** vagy érettségi után **rendőrtiszthelyettesi képzés**', 'Tiszti pályához **rendészeti egyetemi képzés** (BA)', 'Egészségügyi, pszichológiai és fizikai alkalmassági vizsgálat', 'Szakirányok: nyomozó, közlekedés, bűnügyi technika, kiberbűnözés'],
    tantargyak: ['állampolgári ismeretek', 'testnevelés', 'magyar', 'idegen nyelv', 'informatika'],
    kereset: 'Stabil, a rendvédelmi illetményrendszer szerint; pótlékokkal és rangokkal nő.',
    kilatas: 'Biztos munkahely, folyamatos utánpótlás-igénnyel.',
    linkek: [{ tantargy: 'allampolgari' }, { lecke: 'allampolgari/jogok' }, { lecke: 'felnott-elet/kozlekedes' }, { lecke: 'haztartas/elsosegely' }, { lecke: 'informatika/adatbiztonsag' }] });

  P({ id: 'tuzolto', title: 'Tűzoltó', icon: '🚒', code: 'RSE', szint: 'szakma', terulet: 'Közszolgálat',
    short: 'Tüzet olt, embereket ment – balesetnél, árvíznél, viharban.',
    mit: 'Tüzet olt, de legalább ilyen gyakran **műszaki mentést** végez: balesetnél kivág a roncsból, kidőlt fát távolít el, árvíznél, viharban segít, veszélyes anyagot kezel. Békeidőben gyakorol, karbantartja a felszerelést, és tűzmegelőzési ellenőrzéseken is részt vehet.',
    nap: 'A 24 órás szolgálat reggel váltással indul: járműátvétel, felszerelés ellenőrzése. Délelőtt gyakorlat (létra, légzőkészülék), sport. Délután riasztás: közúti baleset, ki kell emelni a sérültet. Éjjel egy kéménytűz. Utána több pihenőnap jön.',
    tulajdonsagok: ['Kiváló fizikum és bátorság', 'Higgadtság veszélyben', 'Csapatmunka, fegyelem', 'Műszaki érzék', 'Segítőkészség'],
    ut: ['Érettségi (vagy szakma), jó fizikai állapot', '**Tűzoltó szakképesítés** (katasztrófavédelmi szakképzés)', 'Szigorú egészségügyi, fizikai és pszichológiai alkalmasság', 'Tiszti pályához katasztrófavédelmi egyetemi képzés; önkéntes tűzoltóként már fiatalon kipróbálható'],
    tantargyak: ['testnevelés', 'fizika', 'kémia (égés)', 'biológia (elsősegély)'],
    kereset: 'Stabil közszolgálati illetmény, pótlékokkal; nem a legmagasabb, de biztos.',
    kilatas: 'Az időjárási szélsőségek miatt a műszaki mentések száma nő; folyamatos az utánpótlás-igény.',
    linkek: [{ lecke: 'haztartas/elsosegely' }, { lecke: 'kemia/reakciok' }, { lecke: 'kem-alap/kemiai-valtozasok' }, { lecke: 'fizika/energia-munka' }, { lecke: 'vizszereles/gaz-alapok' }] });

  /* ===================== Agrár, logisztika, vállalkozás ===================== */
  P({ id: 'mezogazdasz', title: 'Mezőgazdász (agrárszakember)', icon: '🚜', code: 'RIE', szint: 'vegyes', terulet: 'Agrár',
    short: 'Növényt termeszt, állatot tart – egyre több technológiával.',
    mit: 'Növénytermesztéssel, állattenyésztéssel, kertészettel vagy szőlészettel foglalkozik saját gazdaságban vagy nagyobb üzemben. Talajt elemez, vetésforgót tervez, öntöz, növényvédelmet végez, gépeket kezel. A modern gazdaságban drónok, GPS-vezérelt gépek, szenzorok és adatok segítik a döntéseket (precíziós gazdálkodás).',
    nap: 'Tavasszal hajnalban kimegy a földekre, megnézi a vetés állapotát és a talaj nedvességét. Délelőtt a traktor GPS-es vetőgépét állítja be, délután az állatok takarmányozását és egészségét ellenőrzi. Este a gazdálkodási napló és a támogatási ügyek jönnek. Az időjárás diktál.',
    tulajdonsagok: ['Szereti a természetet és a szabadtéri munkát', 'Gyakorlatias, műszaki érzék', 'Felelősség az állatokért és a környezetért', 'Vállalkozói szemlélet, tervezés', 'Kitartás (időjárás, szezonok)'],
    ut: ['Mezőgazdasági **szakképző iskola** (pl. gazda) vagy agrár **technikum**', 'Egyetem: **agrármérnöki** (vagy kertészmérnöki, állattenyésztő) **BSc**, majd MSc', 'Gyakorlat családi vagy nagyobb gazdaságban', 'Precíziós technológiák, gazdálkodási ismeretek'],
    tantargyak: ['biológia', 'kémia', 'földrajz', 'matematika', 'gazdasági ismeretek'],
    kereset: 'Erősen függ a gazdaság méretétől, az időjárástól és a piaci áraktól; jól működő gazdaság jó jövedelmet adhat.',
    kilatas: 'Kevés a fiatal gazda; a technológia és a klímaváltozás új tudást kíván.',
    linkek: [{ modell: 'level' }, { lecke: 'bio-alap/novenyek' }, { lecke: 'biologia/evolucio-okologia' }, { lecke: 'foldrajz/magyarorszag' }, { lecke: 'termeszet/novenyek' }] });

  P({ id: 'logisztikus', title: 'Logisztikus', icon: '📦', code: 'ECI', szint: 'vegyes', terulet: 'Gazdaság',
    short: 'Megszervezi, hogy a termék a megfelelő helyre, időben és olcsón érkezzen.',
    mit: 'Az áruk útját szervezi a gyártótól a vásárlóig: raktárkészletet tervez, szállítást ütemez, útvonalat optimalizál, fuvarozókkal és vámmal egyeztet. Raktárban, szállítmányozó cégnél, webáruháznál vagy gyárban dolgozik. Sok adattal és szoftverrel dolgozik, és gyorsan kell megoldania, ha valami elakad.',
    nap: 'Reggel ellenőrzi, melyik kamion hol jár, és kiderül, hogy egy szállítmány a határon késik. Átütemez, értesíti az ügyfelet. Délben a raktárvezetővel tervezik a karácsonyi csúcsot, délután egy táblázatban kiszámolja, melyik fuvarozó a legolcsóbb.',
    tulajdonsagok: ['Szervezőkészség, átlátás', 'Problémamegoldás nyomás alatt', 'Számok, táblázatok kezelése', 'Tárgyalókészség, nyelvtudás', 'Rugalmasság'],
    ut: ['Közlekedési-logisztikai **technikum** (logisztikai technikus) érettségivel', 'Vagy egyetemen **logisztikai mérnöki**, közlekedésmérnöki vagy gazdálkodási **BSc**', 'Gyakorlat raktárban, szállítmányozásban', 'Előrelépés: logisztikai vezető, ellátásilánc-elemző'],
    tantargyak: ['matematika', 'földrajz', 'idegen nyelvek', 'informatika', 'gazdasági ismeretek'],
    kereset: 'Átlagos kezdés, a vezetői és elemző szerepekben jó.',
    kilatas: 'A webes kereskedelem és a gyártás miatt keresett; az automatizált raktárak új tudást kívánnak.',
    linkek: [{ kurzus: 'msc-optimalizalas' }, { lecke: 'foldrajz/terkep' }, { lecke: 'matematika/szazalek' }, { lecke: 'penz-mindennap/afa-szamla' }, { lecke: 'foldrajz/nepesseg-gazdasag' }] });

  P({ id: 'vallalkozo', title: 'Vállalkozó', icon: '🚀', code: 'ESC', szint: 'vegyes', terulet: 'Gazdaság',
    short: 'Saját ötletből saját céget épít – és vállalja a kockázatot.',
    mit: 'Saját vállalkozást indít és vezet: lehet ez egy villanyszerelő egyéni vállalkozás, egy kávézó, egy webáruház vagy egy technológiai startup. Ötletet keres, megnézi, van-e rá vevő, kiszámolja a költségeket, intézi a papírokat, értékesít, embereket vesz fel, és mindenért felelős. Sok vállalkozó egy szakmából indul.',
    nap: 'Reggel ügyféllel tárgyal, délelőtt saját maga is dolgozik a szakmájában. Délben a könyvelővel egyeztet az adókról, délután egy új munkatárs felvételi beszélgetése. Este a következő havi marketinget tervezi – a munkaidő gyakran hosszú.',
    tulajdonsagok: ['Kezdeményezőkészség, önállóság', 'Kockázatvállalás és kudarctűrés', 'Szervezés és pénzügyi tudatosság', 'Kommunikáció, értékesítés', 'Kitartás'],
    ut: ['Nincs kötelező út: bármilyen **szakma** vagy **diploma** jó kiindulás', 'Hasznos: gazdálkodás és menedzsment BA, vállalkozásfejlesztési képzések, mentorprogramok', 'Alapok: adózás, könyvelés, szerződések, marketing', 'Kicsiben kezdeni: diákvállalkozás, mellékállás, próba-projekt'],
    tantargyak: ['matematika', 'gazdasági és pénzügyi ismeretek', 'magyar (kommunikáció)', 'idegen nyelvek', 'informatika'],
    kereset: 'A legszélesebb skála: lehet bizonytalan és alacsony, de sikeres vállalkozásnál messze átlag feletti is.',
    kilatas: 'A vállalkozások egy része az első években megszűnik – a felkészülés, a tartalék és a jó szakmai alap sokat számít.',
    linkek: [{ lecke: 'felnott-elet/vallalkozas-indul' }, { lecke: 'penz-mindennap/afa-szamla' }, { kurzus: 'vallalati-penzugy' }, { lecke: 'penzugy/koltsegvetes' }, { utvonal: 'felnott-leszek' }, { kurzus: 'adozas' }] });
})();
