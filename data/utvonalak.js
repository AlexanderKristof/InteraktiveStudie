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
})();
