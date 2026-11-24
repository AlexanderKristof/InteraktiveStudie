/* Tudásgráf: iskolai leckék → egyetemi szakszavak („Egyetemi kitekintés”).
 * Kulcs: 'tantárgy/lecke', érték: ['kurzus/szakszó', …]. A tantárgyfájlokat nem kell módosítani;
 * ez a fájl az összes tantárgy és kurzus után töltődik be. A tools/check.js ellenőrzi a hivatkozásokat. */
(function () {
  var S = window.STUDIE;
  var LINKS = {
    'matematika/tortek': ['analizis/sorozat-hatarertek'],
    'matematika/szazalek': ['analizis/exponencialis-novekedes', 'valszam/varhato-ertek'],
    'matematika/egyenletek': ['linearis-algebra/linearis-egyenletrendszer', 'linearis-algebra/gauss-eliminacio'],
    'matematika/linearis-fuggveny': ['analizis/derivalt', 'linearis-algebra/linearis-lekepezes', 'valszam/linearis-regresszio'],
    'matematika/pitagorasz': ['linearis-algebra/vektor', 'linearis-algebra/skalaris-szorzat', 'linearis-algebra/ortogonalitas'],
    'matematika/masodfoku': ['analizis/szelsoertek', 'analizis/derivalt'],
    'mat-alap/aranyossag-szazalek': ['valszam/esemenyter'],
    'mat-alap/oszthatosag': ['algoritmusok/futasi-ido'],
    'fizika/mertekegysegek-mozgas': ['analizis/derivalt', 'analizis/riemann-integral'],
    'fizika/newton': ['fizika-bsc/impulzus', 'fizika-bsc/impulzusmomentum', 'fizika-bsc/tehetetlensegi-nyomatek'],
    'fizika/energia-munka': ['fizika-bsc/munkatetel', 'fizika-bsc/konzervativ-ero', 'fizika-bsc/elso-fotetel'],
    'fizika/elektromossag': ['fizika-bsc/elektromos-terero', 'fizika-bsc/potencial', 'villamosmernoki/kirchhoff-1'],
    'fizika/atom': ['fizika-bsc/fotoeffektus', 'fizika-bsc/radioaktiv-bomlas', 'kemia-bsc/atompalya', 'kemia-bsc/kvantumszamok'],
    'fizika/hullamok-feny': ['fizika-bsc/hullamegyenlet', 'fizika-bsc/interferencia', 'fizika-bsc/doppler', 'fizika-bsc/de-broglie'],
    'kemia/atom-periodusos': ['kemia-bsc/elektronkonfiguracio', 'kemia-bsc/ionizacios-energia', 'kemia-bsc/pauli-hund'],
    'kemia/kemiai-kotesek': ['kemia-bsc/elektronegativitas', 'kemia-bsc/vsepr', 'kemia-bsc/hibridizacio', 'kemia-bsc/intermolekularis'],
    'kemia/anyagmennyiseg': ['kemia-bsc/egyensulyi-allando'],
    'kemia/reakciok': ['kemia-bsc/entalpia', 'kemia-bsc/hess-tetel', 'kemia-bsc/le-chatelier', 'kemia-bsc/aktivalasi-energia', 'kemia-bsc/gibbs'],
    'kemia/savak-bazisok': ['kemia-bsc/ph', 'kemia-bsc/pka', 'kemia-bsc/puffer'],
    'kemia/szerves-elektrokemia': ['kemia-bsc/galvanelem', 'kemia-bsc/elektrodpotencial', 'kemia-bsc/elektrolizis', 'e-mobilitas/cellakemia'],
    'informatika/szamitogep': ['digitalis-technika/utasitasciklus', 'digitalis-technika/memoriahierarchia', 'digitalis-technika/regiszter'],
    'informatika/szamrendszerek': ['digitalis-technika/bit', 'digitalis-technika/kettes-komplemens'],
    'informatika/algoritmusok': ['algoritmusok/futasi-ido', 'algoritmusok/binaris-kereses', 'algoritmusok/beszuro-rendezes', 'algoritmusok/osszefesulo-rendezes'],
    'informatika/programozas': ['algoritmusok/rekurzio', 'algoritmusok/verem-sor', 'algoritmusok/tomb'],
    'informatika/halozatok': ['algoritmusok/grafabrazolas', 'algoritmusok/dijkstra'],
    'villanyszereles/alapfogalmak': ['villamosmernoki/ohm-torveny', 'villamosmernoki/hatasos-teljesitmeny'],
    'villanyszereles/kapcsolasok': ['villamosmernoki/kirchhoff-1', 'villamosmernoki/kirchhoff-2', 'villamosmernoki/thevenin'],
    'villanyszereles/vezetekek': ['villamosmernoki/zarlati-aram'],
    'villanyszereles/vedelmek': ['villamosmernoki/aram-vedokapcsolo', 'villamosmernoki/erintesvedelem', 'villamosmernoki/foldelesi-rendszerek'],
    'elektromos-auto/mukodes': ['e-mobilitas/hatasfok', 'e-mobilitas/menetellenallas'],
    'elektromos-auto/akkumulator-bms': ['e-mobilitas/bms', 'e-mobilitas/soc', 'e-mobilitas/soh', 'e-mobilitas/cellakiegyenlites'],
    'elektromos-auto/motor-inverter': ['e-mobilitas/pmsm', 'e-mobilitas/inverter', 'e-mobilitas/pwm', 'e-mobilitas/foc'],
    'elektromos-auto/toltes': ['e-mobilitas/cc-cv', 'e-mobilitas/kw-kwh', 'e-mobilitas/ccs'],
    'autoszereles/negyutemu-motor': ['fizika-bsc/carnot-korfolyamat', 'fizika-bsc/idealis-gaz'],
    'autoszereles/eroatvitel': ['e-mobilitas/nyomatek', 'mechanika/nyomatek', 'mechanika/csavaras'],
    'fizika/newton#2': ['mechanika/ero', 'mechanika/egyensuly', 'mechanika/szabadtest'],
    'fizika/energia-munka#2': ['mechanika/munka-energia'],
    'informatika/programozas#2': ['programozas/valtozo', 'programozas/vezerlesi-szerkezet', 'programozas/fuggveny', 'programozas/osztaly-objektum'],
    'informatika/szamrendszerek#2': ['programozas/karakterkodolas', 'programozas/tipus'],
    'informatika/adatbiztonsag': ['programozas/verziokezeles'],
    'napelem/mukodes': ['fizika-bsc/fotoeffektus', 'kemia-bsc/elektrodpotencial'],
    'napelem/bekotes': ['villamosmernoki/thevenin', 'villamosmernoki/hatasos-teljesitmeny'],
    'hoszivattyu/hutokor': ['fizika-bsc/carnot-korfolyamat', 'fizika-bsc/elso-fotetel', 'fizika-bsc/entropia'],
    'hoszivattyu/cop': ['fizika-bsc/carnot-korfolyamat', 'e-mobilitas/hatasfok'],
    'penzugy/kamat-inflacio': ['analizis/exponencialis-novekedes', 'analizis/vegtelen-sor'],
    'penzugy/befektetes': ['valszam/varhato-ertek', 'valszam/szoras', 'valszam/korrelacio-oksag'],
    'mat-alap/meres-geometria': ['mechanika/masodrendu-nyomatek']
  };
  S.lessonLinks = LINKS;
  Object.keys(LINKS).forEach(function (key) {
    var p = key.replace(/#\d+$/, '').split('/'), s = S.subjects.filter(function (x) { return x.id === p[0]; })[0];
    var l = s && s.lessons.filter(function (x) { return x.id === p[1]; })[0];
    if (!l) return;
    l.terms = (l.terms || []).concat(LINKS[key].filter(function (r) { return (l.terms || []).indexOf(r) < 0; }));
  });
})();
