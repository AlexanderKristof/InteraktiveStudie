/* Matematika – extra gyakorlókérdések a Tesztközponthoz
 * Formátum: lásd js/teszt.js. A leckék azonosítói megegyeznek a data/tantargyak/matematika.js leckéivel. */
STUDIE.addQuestions('matematika', {
  tortek: [
    { q: 'Mennyi 2/3 + 1/4?', options: ['3/7', '11/12', '3/12', '2/12'], answer: 1, explain: 'Közös nevező a 12: 2/3 = 8/12 és 1/4 = 3/12, így 8/12 + 3/12 = 11/12. A 3/7 a tipikus hiba (számlálók és nevezők külön összeadva).' },
    { q: 'Mennyi 5/6 − 1/4?', options: ['4/2', '1/3', '4/10', '7/12'], answer: 3, explain: 'Közös nevező a 12: 5/6 = 10/12 és 1/4 = 3/12, így 10/12 − 3/12 = 7/12.' },
    { q: 'Mennyi 3/5 · 10/9?', options: ['2/3', '30/14', '13/14', '27/50'], answer: 0, explain: 'Számlálót a számlálóval, nevezőt a nevezővel: 3 · 10 / (5 · 9) = 30/45, ami 15-tel egyszerűsítve 2/3.' },
    { q: 'Mennyi 2 : 4/5?', options: ['8/5', '2/5', '5/2', '4/10'], answer: 2, explain: 'Osztás helyett a reciprokkal szorzunk: 2 · 5/4 = 10/4 = 5/2 = 2,5.' },
    { q: 'Mi a reciproka a 2 egész 1/3 vegyes számnak?', options: ['7/3', '1/3', '3/7', '3/2'], answer: 2, explain: 'Először törtté alakítjuk: 2 egész 1/3 = 7/3. Ennek reciproka (megfordítottja) a 3/7.' },
    { q: 'Hogyan írható fel a 11/4 vegyes számként?', options: ['2 egész 3/4', '3 egész 1/4', '2 egész 1/4', '1 egész 3/4'], answer: 0, explain: '11 : 4 = 2, maradék 3, tehát 11/4 = 2 egész 3/4. Ellenőrzés: 2 · 4 + 3 = 11.' },
    { q: 'Melyik a legnagyobb tört az alábbiak közül?', options: ['3/5', '5/8', '7/12', '2/3'], answer: 3, explain: 'Tizedes törtként: 2/3 ≈ 0,667, 3/5 = 0,6, 5/8 = 0,625, 7/12 ≈ 0,583. A legnagyobb a 2/3.' },
    { q: 'Melyik tört egyenlő a 0,35 tizedes törttel (a legegyszerűbb alakban)?', options: ['35/10', '7/20', '3/5', '7/2'], answer: 1, explain: '0,35 = 35/100, ami 5-tel egyszerűsítve 7/20.' },
    { q: 'Mennyi a 120 háromnegyed része?', options: ['90', '160', '40', '30'], answer: 0, explain: '120 negyede 30, ennek háromszorosa 90. Vagyis 120 · 3/4 = 90.' },
    { q: 'Melyik tört egyenlő a 3/4-del?', options: ['6/12', '9/16', '15/20', '4/3'], answer: 2, explain: 'A 3/4-et 5-tel bővítve 15/20 lesz. A 9/16 nem bővítés, mert ott a számlálót 3-mal, a nevezőt 4-gyel szoroztuk.' }
  ],
  szazalek: [
    { q: 'Mennyi a 350 Ft 20%-a?', options: ['35 Ft', '70 Ft', '17,5 Ft', '700 Ft'], answer: 1, explain: '10% = 35 Ft, tehát 20% = 2 · 35 = 70 Ft. (Vagy: 350 · 0,2 = 70.)' },
    { q: 'Hány százalék 27 a 90-ből?', options: ['27%', '33%', '63%', '30%'], answer: 3, explain: '27 / 90 = 0,3, ami 30%.' },
    { q: 'Minek a 15%-a 45?', options: ['6,75-nek', '675-nek', '30-nak', '300-nak'], answer: 3, explain: '1% = 45 / 15 = 3, így 100% = 300. A 6,75 a tipikus hiba: az a 45 15%-a lenne.' },
    { q: 'Egy termék nettó ára 8000 Ft. Mennyi a bruttó ára 27% ÁFA-val?', options: ['2160 Ft', '10 160 Ft', '8270 Ft', '10 800 Ft'], answer: 1, explain: 'Bruttó = nettó · 1,27 = 8000 · 1,27 = 10 160 Ft. A 2160 Ft csak maga az ÁFA összege.' },
    { q: 'Egy termék bruttó ára 25 400 Ft (27% ÁFA-val). Mennyi a nettó ára?', options: ['18 542 Ft', '24 127 Ft', '20 000 Ft', '32 258 Ft'], answer: 2, explain: 'Nettó = bruttó / 1,27 = 25 400 / 1,27 = 20 000 Ft. A 18 542 Ft a gyakori hiba: a bruttóból levont 27% nem ugyanaz, mert az ÁFA a nettóra vonatkozik.' },
    { q: 'Egy cikk ára 4000 Ft-ról 5000 Ft-ra nő. Hány százalékos az emelés?', options: ['25%', '20%', '125%', '1000%'], answer: 0, explain: 'A növekedés 1000 Ft, az alap az eredeti ár: 1000 / 4000 = 0,25 = 25%.' },
    { q: 'Egy cikk ára 5000 Ft-ról 4000 Ft-ra csökken. Hány százalékos a csökkenés?', options: ['25%', '20%', '80%', '1000%'], answer: 1, explain: 'A csökkenés 1000 Ft, az alap most az 5000 Ft: 1000 / 5000 = 0,2 = 20%. Az új ár az eredeti 80%-a.' },
    { q: '100 000 Ft-ot leköttetsz 2 évre évi 5%-os kamatos kamatra. Mennyi lesz a 2. év végén?', options: ['110 000 Ft', '105 000 Ft', '102 500 Ft', '110 250 Ft'], answer: 3, explain: '100 000 · 1,05 · 1,05 = 100 000 · 1,1025 = 110 250 Ft. A második évben már a kamattal megnövelt összeg kamatozik.' },
    { q: 'Egy árat először 20%-kal, majd az új árat további 10%-kal csökkentik. Összesen hány százalékos a csökkenés?', options: ['28%', '30%', '72%', '2%'], answer: 0, explain: 'A szorzók összeszorzódnak: 0,8 · 0,9 = 0,72, vagyis az ár az eredeti 72%-a lett, a csökkenés 28%.' },
    { q: 'Mivel kell szorozni egy árat, ha 15%-kal csökken?', options: ['1,15-dal', '0,15-dal', '0,85-dal', '0,985-dal'], answer: 2, explain: 'Az új ár az eredeti 100% − 15% = 85%-a, vagyis 0,85-szorosa.' }
  ],
  egyenletek: [
    { q: 'Mennyi x, ha 7x + 4 = 3x + 20?', options: ['6', '2,4', '4', '−4'], answer: 2, explain: 'Vonj ki 3x-et: 4x + 4 = 20. Vonj ki 4-et: 4x = 16, tehát x = 4. Ellenőrzés: 28 + 4 = 32 = 12 + 20.' },
    { q: 'Mennyi x, ha 3(x − 2) = 2x + 5?', options: ['11', '7', '−1', '3'], answer: 0, explain: 'Zárójelbontás: 3x − 6 = 2x + 5. Vonj ki 2x-et és adj hozzá 6-ot: x = 11. A 7 akkor jön ki, ha a 3-mal csak az x-et szorzod meg.' },
    { q: 'Mennyi x, ha x/3 − 2 = 5?', options: ['9', '1', '7', '21'], answer: 3, explain: 'Adj hozzá 2-t: x/3 = 7, majd szorozz 3-mal: x = 21.' },
    { q: 'Mennyi x, ha 5 − 2x = 11?', options: ['3', '−3', '8', '−8'], answer: 1, explain: 'Vonj ki 5-öt: −2x = 6, majd ossz −2-vel: x = −3. Ellenőrzés: 5 − 2 · (−3) = 5 + 6 = 11.' },
    { q: 'Mennyi x, ha (x + 1)/2 = (x − 1)/3?', options: ['−5', '5', '−1', '1'], answer: 0, explain: 'Szorozz 6-tal: 3(x + 1) = 2(x − 1), azaz 3x + 3 = 2x − 2, így x = −5.' },
    { q: 'Hogyan fejezhető ki R a P = U²/R képletből?', options: ['R = P/U²', 'R = P · U²', 'R = U²/P', 'R = U/P'], answer: 2, explain: 'Szorozz R-rel: P · R = U², majd ossz P-vel: R = U²/P.' },
    { q: 'Hogyan fejezhető ki a gyorsulás az s = a · t²/2 képletből?', options: ['a = s/(2t²)', 'a = 2s/t²', 'a = 2s · t²', 'a = s · t²/2'], answer: 1, explain: 'Szorozz 2-vel: 2s = a · t², majd ossz t²-tel: a = 2s/t².' },
    { q: 'Egy szám háromszorosánál 8-cal kisebb szám 31. Melyik ez a szám?', options: ['39', '11', '7,67', '13'], answer: 3, explain: 'Az egyenlet: 3x − 8 = 31. Adj hozzá 8-at: 3x = 39, ossz 3-mal: x = 13.' },
    { q: 'Anna háromszor annyi idős, mint az öccse, és együtt 24 évesek. Hány éves Anna?', options: ['6', '8', '21', '18'], answer: 3, explain: 'Ha az öcs x éves, Anna 3x: x + 3x = 24, tehát 4x = 24, x = 6. Anna 3 · 6 = 18 éves.' },
    { q: 'Melyik egyenletnek nincs megoldása?', options: ['2x + 1 = x + 5', '2(x + 1) = 2x + 5', '3x = 0', 'x + 2 = 2 + x'], answer: 1, explain: 'A zárójelbontás után 2x + 2 = 2x + 5, azaz 2 = 5, ami sosem igaz. A 3x = 0 megoldása x = 0, az x + 2 = 2 + x pedig minden x-re igaz.' }
  ],
  'linearis-fuggveny': [
    { q: 'Mi a zérushelye az y = −3x + 6 függvénynek?', options: ['x = −2', 'x = 6', 'x = 2', 'x = −3'], answer: 2, explain: '−3x + 6 = 0, tehát −3x = −6, x = 2.' },
    { q: 'Melyik egyenes megy át a (0; 2) ponton, −1 meredekséggel?', options: ['y = −x + 2', 'y = 2x − 1', 'y = x + 2', 'y = −2x + 1'], answer: 0, explain: 'Az y = m · x + b alakban m = −1 és b = 2 (az y-tengelymetszet), tehát y = −x + 2.' },
    { q: 'Mekkora a (−1; 4) és a (3; −4) pontokon átmenő egyenes meredeksége?', options: ['2', '−2', '−0,5', '0'], answer: 1, explain: 'm = (−4 − 4) / (3 − (−1)) = −8 / 4 = −2. Figyelj az előjelekre: 3 − (−1) = 4.' },
    { q: 'Melyik egyenes párhuzamos az y = 2x + 1 egyenessel?', options: ['y = −2x + 1', 'y = x/2 + 1', 'y = x + 2', 'y = 2x − 5'], answer: 3, explain: 'A párhuzamos egyeneseknek ugyanakkora a meredekségük. Az y = 2x − 5 meredeksége is 2, csak lejjebb van tolva.' },
    { q: 'Egy taxi alapdíja 800 Ft, kilométerdíja 350 Ft. Hány km-t utaztál, ha 4300 Ft-ot fizettél?', options: ['10 km', '12,3 km', '14,6 km', '9 km'], answer: 0, explain: 'Az egyenlet: 350x + 800 = 4300. Vonj ki 800-at: 350x = 3500, így x = 10 km.' },
    { q: 'Mi a (0; −1) és a (2; 3) pontokon átmenő egyenes egyenlete?', options: ['y = 2x + 3', 'y = −x + 2', 'y = 2x − 1', 'y = 0,5x − 1'], answer: 2, explain: 'A meredekség m = (3 − (−1)) / (2 − 0) = 4 / 2 = 2, a tengelymetszet b = −1 (az x = 0 pontból). Így y = 2x − 1.' },
    { q: 'Melyik pont van rajta az y = −2x + 3 egyenesen?', options: ['(1; −1)', '(−1; 1)', '(2; −1)', '(0; −3)'], answer: 2, explain: 'Behelyettesítve x = 2-t: y = −4 + 3 = −1, ez egyezik. A többinél: x = 1 → y = 1; x = −1 → y = 5; x = 0 → y = 3.' },
    { q: 'Hol metszi egymást az y = x + 1 és az y = −x + 5 egyenes?', options: ['(2; 3)', '(3; 2)', '(4; 5)', '(−2; −1)'], answer: 0, explain: 'A metszéspontban az y-ok egyenlők: x + 1 = −x + 5, így 2x = 4, x = 2, és y = 2 + 1 = 3.' },
    { q: 'Milyen az y = 4 függvény grafikonja?', options: ['Az y-tengellyel párhuzamos egyenes', 'Az origón átmenő egyenes', 'Parabola', 'Az x-tengellyel párhuzamos egyenes'], answer: 3, explain: 'Itt m = 0, tehát minden x-hez ugyanaz az y = 4 tartozik: vízszintes egyenes, ami a (0; 4) pontban metszi az y-tengelyt.' },
    { q: 'Egy autó tankjában 50 l benzin van, és 100 km-en 6 l-t fogyaszt. Mennyi marad 500 km után?', options: ['47 l', '20 l', '30 l', '44 l'], answer: 1, explain: 'A maradék: y = 50 − 0,06x. Ha x = 500, akkor y = 50 − 30 = 20 l. (500 km-en 5 · 6 = 30 l fogy.)' }
  ],
  pitagorasz: [
    { q: 'Mekkora az átfogó, ha a befogók 5 és 12 egység hosszúak?', options: ['13', '17', '11', '8,5'], answer: 0, explain: 'c² = 5² + 12² = 25 + 144 = 169, tehát c = √169 = 13.' },
    { q: 'Egy derékszögű háromszög átfogója 10 cm, egyik befogója 6 cm. Mekkora a másik befogó?', options: ['4 cm', '√136 cm', '8 cm', '16 cm'], answer: 2, explain: '6² + b² = 10², azaz 36 + b² = 100, b² = 64, b = 8 cm. A √136 akkor jön ki, ha a 10-et befogónak veszed.' },
    { q: 'Mekkora az 5 cm oldalú négyzet átlója?', options: ['10 cm', '≈ 7,07 cm', '≈ 3,54 cm', '25 cm'], answer: 1, explain: 'Az átló egy derékszögű háromszög átfogója: d² = 5² + 5² = 50, így d = √50 = 5√2 ≈ 7,07 cm.' },
    { q: 'Mekkora a (−1; 2) és az (5; 10) pont távolsága?', options: ['14', '√20', '100', '10'], answer: 3, explain: 'Vízszintesen 5 − (−1) = 6, függőlegesen 10 − 2 = 8 a különbség. A távolság √(6² + 8²) = √100 = 10.' },
    { q: 'Melyik pitagoraszi számhármas?', options: ['4, 5, 6', '6, 9, 11', '10, 20, 30', '9, 40, 41'], answer: 3, explain: '9² + 40² = 81 + 1600 = 1681 = 41². A többinél nem teljesül, pl. 4² + 5² = 41 ≠ 36.' },
    { q: 'Mekkora a 6 cm oldalú szabályos háromszög magassága?', options: ['3 cm', '3√3 ≈ 5,2 cm', '√45 ≈ 6,7 cm', '6√2 ≈ 8,5 cm'], answer: 1, explain: 'A magasság két derékszögű háromszögre bontja: m² + 3² = 6², így m² = 27, m = √27 = 3√3 ≈ 5,2 cm.' },
    { q: 'Egy 2,6 m-es létra alja 1 m-re van a faltól. Milyen magasan éri el a falat?', options: ['1,6 m', '2,8 m', '2,4 m', '3,6 m'], answer: 2, explain: '1² + h² = 2,6², azaz 1 + h² = 6,76, h² = 5,76, h = 2,4 m.' },
    { q: 'Mekkora a 2 cm élű kocka testátlója?', options: ['2√3 ≈ 3,46 cm', '2√2 ≈ 2,83 cm', '6 cm', '4 cm'], answer: 0, explain: 'Az alaplap átlója √(2² + 2²) = √8. A testátló: √(8 + 2²) = √12 = 2√3 ≈ 3,46 cm. A 2√2 csak a lapátló.' },
    { q: 'Milyen a háromszög, ha a két rövidebb oldal négyzetösszege nagyobb a leghosszabb oldal négyzeténél?', options: ['Derékszögű', 'Hegyesszögű', 'Tompaszögű', 'Biztosan egyenlő oldalú'], answer: 1, explain: 'Ha a² + b² = c², derékszögű; ha nagyobb, a c-vel szemközti szög kisebb 90°-nál, így minden szög hegyes; ha kisebb, tompaszögű.' },
    { q: 'Egy téglalap átlója 10 cm, egyik oldala 6 cm. Mekkora a területe?', options: ['60 cm²', '80 cm²', '24 cm²', '48 cm²'], answer: 3, explain: 'A másik oldal: √(10² − 6²) = √64 = 8 cm. A terület 6 · 8 = 48 cm².' }
  ],
  masodfoku: [
    { q: 'Melyek az x² − x − 12 = 0 egyenlet megoldásai?', options: ['4 és −3', '−4 és 3', '6 és −2', '3 és 4'], answer: 0, explain: 'D = (−1)² − 4 · 1 · (−12) = 1 + 48 = 49. x = (1 ± 7) / 2, tehát 4 és −3. Ellenőrzés: 4 + (−3) = 1, 4 · (−3) = −12.' },
    { q: 'Mik a 2x² − 18 = 0 egyenlet megoldásai?', options: ['x = 9 vagy x = −9', 'csak x = 3', 'x = 3 vagy x = −3', 'nincs valós megoldás'], answer: 2, explain: 'Adj hozzá 18-at és ossz 2-vel: x² = 9. Ennek két megoldása van: 3 és −3, mert (−3)² is 9.' },
    { q: 'Mik az x² − 6x = 0 egyenlet megoldásai?', options: ['csak a 6', '0 és −6', '0 és 6', '−6 és 6'], answer: 2, explain: 'Emeld ki az x-et: x(x − 6) = 0. A szorzat nulla, ha x = 0 vagy x − 6 = 0, azaz x = 6. Az x-szel való osztás elveszítené a 0 megoldást.' },
    { q: 'Hol van az y = x² − 4x + 1 parabola csúcspontja?', options: ['(2; −3)', '(−2; 13)', '(2; 1)', '(4; 1)'], answer: 0, explain: 'x = −b/(2a) = 4/2 = 2, és y = 2² − 4 · 2 + 1 = 4 − 8 + 1 = −3.' },
    { q: 'Mennyi a diszkrimináns a 2x² + 3x − 2 = 0 egyenletben?', options: ['−7', '1', '17', '25'], answer: 3, explain: 'D = b² − 4ac = 3² − 4 · 2 · (−2) = 9 + 16 = 25. A −7 az előjelhiba eredménye.' },
    { q: 'Mennyi az x² − 8x + 15 = 0 egyenlet gyökeinek összege?', options: ['−8', '8', '15', '−15'], answer: 1, explain: 'Viète-formula: x₁ + x₂ = −b/a = −(−8)/1 = 8. (A gyökök 3 és 5.)' },
    { q: 'Melyik egyenlet megoldásai az 1 és a 4?', options: ['x² − 5x + 4 = 0', 'x² + 5x + 4 = 0', 'x² − 4x + 5 = 0', 'x² − 5x − 4 = 0'], answer: 0, explain: 'Gyöktényezős alakban: (x − 1)(x − 4) = x² − 5x + 4. Viète szerint is: összeg 5, szorzat 4.' },
    { q: 'Mekkora k esetén van az x² + 6x + k = 0 egyenletnek pontosan egy megoldása?', options: ['k = 36', 'k = 6', 'k = 9', 'k = −9'], answer: 2, explain: 'Egy megoldás akkor van, ha D = 0: 6² − 4 · 1 · k = 36 − 4k = 0, tehát k = 9. Ekkor x² + 6x + 9 = (x + 3)².' },
    { q: 'Hol van az y = (x − 3)² + 2 parabola csúcspontja?', options: ['(−3; 2)', '(3; 2)', '(3; −2)', '(2; 3)'], answer: 1, explain: 'Az (x − u)² + v alakból a csúcs (u; v). Itt u = 3 (figyelj: x − 3, nem x + 3) és v = 2.' },
    { q: 'Hány valós gyöke van a 3x² + 2x + 1 = 0 egyenletnek?', options: ['Két gyöke van', 'Egy gyöke van', 'Végtelen sok gyöke van', 'Nincs valós gyöke'], answer: 3, explain: 'D = 2² − 4 · 3 · 1 = 4 − 12 = −8 < 0, ezért nincs valós megoldás: a parabola nem metszi az x-tengelyt.' }
  ]
});
