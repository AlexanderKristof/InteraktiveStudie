/* Tanulási útvonalak. Formátum: js/utvonalak.js fejléce. A tools/check.js minden hivatkozást ellenőriz. */
(function () {
  var P = STUDIE.addPath;

  P({ id: 'villanyszerelo', title: 'Villanyszerelő leszek', icon: '⚡', color: '#f5a524', level: 'szakma',
    description: 'A biztonságtól az elosztószekrényig: az épületvillamosság elmélete lépésről lépésre, kapcsolás-építéssel és hibakereséssel.',
    steps: [
      { lecke: 'villanyszereles/biztonsag', note: 'Mindig ezzel kezdj: az öt biztonsági szabály.' },
      { lecke: 'fizika/elektromossag' },
      { lecke: 'villanyszereles/alapfogalmak' },
      { lecke: 'villanyszereles/kapcsolasok', note: 'Itt van a kapcsolás-építő játék is.' },
      { lecke: 'villanyszereles/vezetekek' },
      { lecke: 'villanyszereles/vedelmek', note: 'A hibakeresőkkel gyakorold a FI relé és a kismegszakító leoldását.' },
      { modell: 'elosztoszekreny' },
      { szakszo: 'villamosmernoki/erintesvedelem' },
      { teszt: 'villanyszereles', note: 'Ha 70% felett vagy, mehetsz tovább a napelemekre.' },
      { lecke: 'napelem/bekotes' }
    ] });

  P({ id: 'e-auto', title: 'Elektromosautó-szerelő alapozó', icon: '🔋', color: '#2f9e6a', level: 'szakma',
    description: 'Hogyan működik a villanyautó, miért veszélyes a nagyfeszültség, és mi van az akkumulátorban az atomokig.',
    steps: [
      { lecke: 'elektromos-auto/mukodes' },
      { modell: 'elektromos-auto' },
      { lecke: 'elektromos-auto/hv-biztonsag', note: 'A legfontosabb lecke: a nagyfeszültség életveszélyes.' },
      { lecke: 'elektromos-auto/akkumulator-bms' },
      { modell: 'akkucella' },
      { lecke: 'elektromos-auto/motor-inverter' },
      { szakszo: 'e-mobilitas/inverter' },
      { lecke: 'elektromos-auto/toltes' },
      { teszt: 'elektromos-auto' }
    ] });

  P({ id: 'szamitogep-melyen', title: 'A számítógép a mélyben', icon: '💻', color: '#7c5cd6', level: 'középiskola → egyetem',
    description: 'Az alaplaptól a processzoron és a tranzisztoron át egészen az atomig, közben megtanulod, hogyan „gondolkodik” a gép.',
    steps: [
      { lecke: 'informatika/szamitogep' },
      { modell: 'alaplap' },
      { modell: 'processzor' },
      { lecke: 'informatika/szamrendszerek' },
      { szakszo: 'digitalis-technika/logikai-kapu' },
      { modell: 'tranzisztor' },
      { szakszo: 'digitalis-technika/cmos' },
      { modell: 'atom' },
      { teszt: 'informatika' }
    ] });

  P({ id: 'erettsegi-matek', title: 'Érettségire készülök: matematika', icon: '📐', color: '#7c5cd6', level: 'középiskola',
    description: 'A középszintű érettségi alaptémái sorban, gyakorló feladatokkal és záró teszttel.',
    steps: [
      { lecke: 'matematika/tortek' },
      { lecke: 'matematika/szazalek' },
      { lecke: 'matematika/egyenletek' },
      { lecke: 'matematika/linearis-fuggveny' },
      { lecke: 'matematika/pitagorasz' },
      { lecke: 'matematika/masodfoku' },
      { teszt: 'matematika', note: 'Próbáld vizsga módban, mintha élesben lennél!' }
    ] });

  P({ id: 'mernoki-alapozo', title: 'Mérnöki alapozó', icon: '🎓', color: '#2f7bf6', level: 'egyetem (BSc 1. félév)',
    description: 'A középiskolai fizikától és matektól az első egyetemi tárgyak kulcsfogalmaiig.',
    steps: [
      { lecke: 'matematika/masodfoku' },
      { lecke: 'fizika/newton' },
      { szakszo: 'analizis/derivalt' },
      { szakszo: 'analizis/riemann-integral' },
      { szakszo: 'linearis-algebra/matrix' },
      { szakszo: 'mechanika/egyensuly' },
      { szakszo: 'fizika-bsc/impulzus' },
      { szakszo: 'villamosmernoki/kirchhoff-1' },
      { teszt: 'analizis' }
    ] });

  P({ id: 'megujulo', title: 'Megújuló energia', icon: '☀️', color: '#f5a524', level: 'középiskola / szakma',
    description: 'Energia, napelem, hőszivattyú: hogyan lesz a napfényből és a levegő hőjéből áram és fűtés.',
    steps: [
      { lecke: 'fizika/energia-munka' },
      { lecke: 'napelem/mukodes' },
      { modell: 'napelempanel' },
      { lecke: 'napelem/rendszerek' },
      { lecke: 'hoszivattyu/hutokor' },
      { modell: 'hoszivattyu' },
      { lecke: 'hoszivattyu/cop' },
      { szakszo: 'fizika-bsc/carnot-korfolyamat' },
      { teszt: 'napelem' }
    ] });

  P({ id: 'elet', title: 'Az élet építőkövei', icon: '🧬', color: '#c2417a', level: 'középiskola',
    description: 'A sejttől a DNS-en át a szívig: hogyan működik az élő szervezet.',
    steps: [
      { lecke: 'biologia/sejt' },
      { modell: 'sejt' },
      { lecke: 'biologia/genetika' },
      { modell: 'dns' },
      { lecke: 'biologia/keringes-legzes' },
      { modell: 'sziv' },
      { teszt: 'biologia' }
    ] });

  P({ id: 'kezdo', title: 'Kezdő felfedező', icon: '🌱', color: '#2f9e6a', level: 'általános iskola',
    description: 'Ismerkedés a Tudásműhellyel 10–14 éveseknek: számok, anyagok, élőlények, nyelv, és egy kis „szétszedés”.',
    steps: [
      { lecke: 'mat-alap/egesz-szamok' },
      { lecke: 'termeszet/anyagok' },
      { modell: 'atom' },
      { lecke: 'termeszet/eloleny-sejt' },
      { modell: 'sejt' },
      { lecke: 'magyar/szofajok' },
      { lecke: 'angol/koszones' },
      { teszt: 'mat-alap' }
    ] });
  P({ id: 'rendszergazda', title: 'Rendszergazda leszek', icon: '🖧', color: '#0e9aa7', level: 'szakma',
    description: 'A számítógép összeszerelésétől a hálózatokon át az informatikai biztonságig, hibakeresőkkel.',
    steps: [
      { lecke: 'informatika/szamitogep' },
      { modell: 'alaplap' },
      { lecke: 'rendszeruzem/hardver', note: 'A „Nem indul a számítógép” hibakeresővel gyakorolj!' },
      { lecke: 'rendszeruzem/operacios-rendszerek' },
      { lecke: 'informatika/szamrendszerek' },
      { lecke: 'rendszeruzem/halozatok', note: 'Itt van a „Nincs internet” hibakereső.' },
      { lecke: 'rendszeruzem/halozati-eszkozok' },
      { lecke: 'rendszeruzem/szerverek' },
      { lecke: 'rendszeruzem/biztonsag' },
      { teszt: 'rendszeruzem' }
    ] });

  P({ id: 'fa-fem', title: 'Kétkezi szakmák: fa és fém', icon: '🪚', color: '#b7791f', level: 'szakma',
    description: 'Asztalos és hegesztő alapok: anyagismeret, szerszámok, gépek, és mindenekelőtt a munkavédelem.',
    steps: [
      { lecke: 'asztalos/fa-anyag' },
      { lecke: 'asztalos/keziszerszamok' },
      { lecke: 'asztalos/gepek', note: 'Gépeknél a biztonság az első!' },
      { lecke: 'asztalos/kotesek' },
      { lecke: 'hegesztes/femek' },
      { lecke: 'hegesztes/eljarasok' },
      { lecke: 'hegesztes/munkavedelem' },
      { teszt: 'asztalos' },
      { teszt: 'hegesztes' }
    ] });

  P({ id: 'penz-gazdasag', title: 'Pénz, gazdaság, társadalom', icon: '💰', color: '#2f9e6a', level: 'középiskola → egyetem',
    description: 'A saját pénzügyeidtől a piacok és az infláció működéséig, és hogyan működik az állam és az EU.',
    steps: [
      { lecke: 'penzugy/koltsegvetes' },
      { lecke: 'penzugy/kamat-inflacio' },
      { szakszo: 'kozgazdasagtan/kereslet' },
      { szakszo: 'kozgazdasagtan/piaci-egyensuly' },
      { szakszo: 'kozgazdasagtan/inflacio' },
      { szakszo: 'kozgazdasagtan/jelenertek' },
      { lecke: 'allampolgari/intezmenyek' },
      { lecke: 'allampolgari/europai-unio' },
      { teszt: 'penzugy' }
    ] });

  P({ id: 'emberi-test', title: 'Az emberi test titkai', icon: '🫀', color: '#c2417a', level: 'általános iskola → egyetem',
    description: 'A szívtől az agyon és a szemen át a sejtekig, felfedezőkkel; a végén egyetemi kitekintés az élettanba.',
    steps: [
      { lecke: 'bio-alap/emberi-test-1' },
      { modell: 'sziv' },
      { lecke: 'bio-alap/emberi-test-2' },
      { modell: 'agy' },
      { modell: 'szem' },
      { lecke: 'biologia/keringes-legzes' },
      { szakszo: 'anatomia/akcios-potencial' },
      { szakszo: 'anatomia/percterfogat' },
      { teszt: 'bio-alap' }
    ] });

  P({ id: 'energia-jovo', title: 'Honnan jön az áram?', icon: '⚡', color: '#2f9e6a', level: 'középiskola',
    description: 'Atomerőmű, szélturbina, napelem és villanymotor: hogyan termeljük és használjuk az elektromos energiát.',
    steps: [
      { lecke: 'fizika/energia-munka' },
      { modell: 'atomeromu' },
      { modell: 'szelturbina' },
      { modell: 'napelempanel' },
      { lecke: 'fizika/elektromossag' },
      { modell: 'villanymotor' },
      { modell: 'elosztoszekreny' },
      { szakszo: 'villamosmernoki/haromfazisu-rendszer' },
      { teszt: 'fizika' }
    ] });

  P({ id: 'konyha', title: 'Konyhai alapok és élelmiszer-biztonság', icon: '👨‍🍳', color: '#f08c2e', level: 'szakma',
    description: 'Higiénia, hőmérsékletek, allergének és biztonságos konyhai munka – vizsgafelkészítővel.',
    steps: [
      { lecke: 'szakacs/higienia' },
      { lecke: 'szakacs/homerseklet', note: 'Próbáld ki az „Ételmérgezés gyanúja” hibakeresőt!' },
      { lecke: 'szakacs/allergenek' },
      { lecke: 'szakacs/technologia' },
      { lecke: 'szakacs/munkavedelem' },
      { teszt: 'szakacs' }
    ] });

  P({ id: 'termtud-78', title: 'Fizika és kémia 7–8. osztályban', icon: '🔭', color: '#2f7bf6', level: 'általános iskola',
    description: 'Mozgás, energia, anyagok és atomok: a felső tagozatos természettudomány lépésről lépésre, modellekkel.',
    steps: [
      { lecke: 'fiz-alap/mozgas' },
      { lecke: 'fiz-alap/ero-tomeg' },
      { lecke: 'fiz-alap/energia-munka' },
      { modell: 'szelturbina' },
      { lecke: 'kem-alap/anyagok' },
      { lecke: 'kem-alap/atom-periodusos' },
      { modell: 'atom' },
      { modell: 'fold' },
      { teszt: 'fiz-alap' },
      { teszt: 'kem-alap' }
    ] });
})();
