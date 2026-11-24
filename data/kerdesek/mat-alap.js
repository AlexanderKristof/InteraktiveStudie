/* Matematika (5–8. osztály) – extra gyakorlókérdések a Tesztközponthoz
 * Formátum: lásd js/teszt.js. A leckék azonosítói megegyeznek a data/tantargyak/mat-alap.js leckéivel. */
STUDIE.addQuestions('mat-alap', {
  'egesz-szamok': [
    { q: 'Mennyi (−8) + 5?', options: ['−3', '3', '−13', '13'], answer: 0, explain: 'Különböző előjelűek: 8 − 5 = 3, és a nagyobb abszolút értékű (−8) előjelét kapja: −3.' },
    { q: 'Mennyi (−4) − 7?', options: ['3', '−11', '11', '−3'], answer: 1, explain: 'A −4-ről még 7-et lépünk balra a számegyenesen: −4 − 7 = −11.' },
    { q: 'Mennyi (−36) : (−4)?', options: ['−9', '−8', '9', '32'], answer: 2, explain: 'Azonos előjelűek hányadosa pozitív: 36 : 4 = 9.' },
    { q: 'Mennyi |−15|, vagyis a −15 abszolút értéke?', options: ['−15', '0', '1/15', '15'], answer: 3, explain: 'Az abszolút érték a nullától mért távolság, ez sosem negatív: 15.' },
    { q: 'Reggel −6 °C volt, délre 4 fokkal melegebb lett. Hány fok volt délben?', options: ['−10 °C', '−2 °C', '2 °C', '10 °C'], answer: 1, explain: '−6 + 4 = −2. Melegedésnél hozzáadunk, a számegyenesen jobbra lépünk.' },
    { q: 'Mennyi 5 − 3 · (−2)?', options: ['−4', '11', '−1', '4'], answer: 1, explain: 'Először szorzunk: 3 · (−2) = −6. Aztán 5 − (−6) = 5 + 6 = 11. A −4 akkor jönne ki, ha balról jobbra haladnánk a műveleti sorrend helyett.' },
    { q: 'Melyik állítás igaz?', options: ['−3 > −1', '−5 < −8', '0 > −2', '−10 > 1'], answer: 2, explain: 'A 0 a számegyenesen jobbra van a −2-től, ezért nagyobb. A −3 kisebb a −1-nél, a −5 nagyobb a −8-nál.' },
    { q: 'Mennyi a 7 ellentettjének abszolút értéke?', options: ['−7', '7', '0', '1/7'], answer: 1, explain: 'A 7 ellentettje −7, ennek abszolút értéke |−7| = 7.' },
    { q: 'Mennyi 2 485 százasokra kerekítve?', options: ['2 400', '2 490', '2 500', '3 000'], answer: 2, explain: 'A százasok utáni jegy a 8, ezért felfelé kerekítünk: 2 500.' },
    { q: 'Mennyi (−2) · (−3) · (−5)?', options: ['30', '10', '−10', '−30'], answer: 3, explain: '(−2) · (−3) = 6, majd 6 · (−5) = −30. Páratlan számú negatív tényező esetén a szorzat negatív.' }
  ],
  oszthatosag: [
    { q: 'Melyik szám osztható 6-tal?', options: ['424', '5 214', '3 105', '1 001'], answer: 1, explain: 'Az 5 214 páros, és számjegyeinek összege 12, ami osztható 3-mal – tehát 6-tal is osztható. A 424 jegyösszege 10, a 3 105 és az 1 001 páratlan.' },
    { q: 'Melyik szám osztható 4-gyel?', options: ['2 018', '3 330', '7 124', '5 150'], answer: 2, explain: 'Az utolsó két jegyet kell nézni: 24 osztható 4-gyel. A 18, a 30 és az 50 nem.' },
    { q: 'Hány osztója van a 18-nak?', options: ['4', '5', '6', '3'], answer: 2, explain: 'A 18 osztói: 1, 2, 3, 6, 9, 18 – összesen 6.' },
    { q: 'Mi a 84 prímtényezős felbontása?', options: ['2 · 42', '2² · 3 · 7', '4 · 21', '2 · 3² · 7'], answer: 1, explain: '84 = 2 · 42 = 2 · 2 · 21 = 2 · 2 · 3 · 7 = 2² · 3 · 7. A 42, a 4 és a 21 nem prímszám, így a többi nem prímtényezős felbontás.' },
    { q: 'Mennyi (12; 20), vagyis a 12 és a 20 legnagyobb közös osztója?', options: ['4', '2', '60', '240'], answer: 0, explain: '12 = 2² · 3 és 20 = 2² · 5. A közös tényező: 2² = 4.' },
    { q: 'Mennyi [6; 10], vagyis a 6 és a 10 legkisebb közös többszöröse?', options: ['60', '16', '2', '30'], answer: 3, explain: '6 = 2 · 3, 10 = 2 · 5. Minden tényező a legnagyobb kitevőn: 2 · 3 · 5 = 30. A 60 közös többszörös, de nem a legkisebb.' },
    { q: 'Két lámpa közül az egyik 6, a másik 8 másodpercenként villan. Most együtt villantak. Hány másodperc múlva villannak újra együtt?', options: ['14', '48', '24', '2'], answer: 2, explain: 'A legkisebb közös többszöröst keressük: [6; 8] = 24.' },
    { q: '30 piros és 45 fehér rózsából egyforma csokrokat kötünk, minden virágot felhasználva. Legfeljebb hány csokor lesz?', options: ['5', '15', '3', '75'], answer: 1, explain: 'A legnagyobb közös osztó kell: (30; 45) = 15. Minden csokorba 2 piros és 3 fehér rózsa kerül.' },
    { q: 'Melyik szám NEM prímszám?', options: ['2', '37', '41', '51'], answer: 3, explain: '51 = 3 · 17, mert jegyeinek összege 6, így osztható 3-mal. A többinek csak két osztója van.' },
    { q: 'Melyik számjegy kerüljön a 3□5 szám közepére, hogy a szám osztható legyen 9-cel?', options: ['1', '4', '0', '9'], answer: 0, explain: 'A jegyek összege 3 + □ + 5 = 8 + □. Ez akkor osztható 9-cel, ha □ = 1 (8 + 1 = 9). Ellenőrzés: 315 : 9 = 35.' }
  ],
  'tortek-alapok': [
    { q: 'Mennyi 3/4 − 1/6?', options: ['2/10', '7/12', '1/2', '5/12'], answer: 1, explain: 'Közös nevező a 12: 9/12 − 2/12 = 7/12. A 2/10 a tipikus hiba (számlálókat és nevezőket külön kivonva).' },
    { q: 'Mennyi 5/8 · 4?', options: ['20/32', '5/32', '5/2', '9/8'], answer: 2, explain: 'Egésszel csak a számlálót szorozzuk: 20/8, ami 4-gyel egyszerűsítve 5/2 = 2,5.' },
    { q: 'Melyik tört egyenlő 0,6-tel?', options: ['6/100', '3/5', '1/6', '2/3'], answer: 1, explain: '0,6 = 6/10, ami 2-vel egyszerűsítve 3/5.' },
    { q: 'Mennyi a 7/8 tizedes tört alakja?', options: ['0,78', '0,87', '1,14', '0,875'], answer: 3, explain: '7 : 8 = 0,875. (Ellenőrzés: 1/8 = 0,125, és 7 · 0,125 = 0,875.)' },
    { q: 'Hogyan írható fel a 2 egész 3/5 törtként?', options: ['13/5', '6/5', '5/13', '23/5'], answer: 0, explain: '2 egész = 10/5, ehhez jön még 3/5: 10/5 + 3/5 = 13/5.' },
    { q: 'Mennyi 3,5 + 0,75?', options: ['3,82', '4,25', '10,5', '4,15'], answer: 1, explain: 'A tizedesvesszőket egymás alá írva: 3,50 + 0,75 = 4,25. Fontos, hogy a tizedeseket a tizedesekhez, a századokat a századokhoz adjuk.' },
    { q: '45 perc hányad része egy órának?', options: ['4/5', '2/3', '1/45', '3/4'], answer: 3, explain: '45/60, ami 15-tel egyszerűsítve 3/4.' },
    { q: 'Mennyi 0,25 : 0,5?', options: ['0,125', '2', '0,5', '5'], answer: 2, explain: 'Bővítsük mindkettőt 100-zal: 25 : 50 = 0,5. (Vagy: 1/4 : 1/2 = 1/4 · 2 = 1/2.)' },
    { q: 'Melyik a legkisebb szám?', options: ['0,3', '1/4', '2/7', '0,29'], answer: 1, explain: 'Tizedes törtként: 1/4 = 0,25, 2/7 ≈ 0,286, 0,29 és 0,3. A legkisebb az 1/4.' },
    { q: 'Mennyi 2,07 · 100?', options: ['20,7', '207', '2,0700', '0,0207'], answer: 1, explain: '100-zal szorzásnál a tizedesvessző két hellyel jobbra lép: 207.' }
  ],
  'aranyossag-szazalek': [
    { q: '4 füzet 960 Ft. Mennyibe kerül 7 füzet?', options: ['1 680 Ft', '1 200 Ft', '2 240 Ft', '1 920 Ft'], answer: 0, explain: '1 füzet: 960 : 4 = 240 Ft. 7 füzet: 7 · 240 = 1 680 Ft.' },
    { q: '5 kőműves 12 nap alatt építene fel egy falat. Hány nap alatt végezne vele 6 kőműves?', options: ['14,4 nap', '10 nap', '13 nap', '11 nap'], answer: 1, explain: 'Fordított arányosság: 5 · 12 = 60 munkanap. 60 : 6 = 10 nap. A 14,4 akkor jönne ki, ha egyenes arányosságnak vennénk.' },
    { q: 'Mennyi 500 Ft 12%-a?', options: ['12 Ft', '6 Ft', '60 Ft', '120 Ft'], answer: 2, explain: '1% = 5 Ft, 12% = 12 · 5 = 60 Ft.' },
    { q: 'Egy szám 30%-a 45. Melyik ez a szám?', options: ['13,5', '150', '135', '75'], answer: 1, explain: 'Az alapot keressük: 1% = 45 : 30 = 1,5, 100% = 150. (A 13,5 a 45 30%-a lenne – fordított feladat.)' },
    { q: 'Egy 25 fős osztályban 8 tanuló szemüveges. Az osztály hány százaléka szemüveges?', options: ['8%', '17%', '25%', '32%'], answer: 3, explain: '8 : 25 = 0,32 = 32%.' },
    { q: 'Egy 8 000 Ft-os kabátot 25%-os akcióban árulnak. Mennyi az akciós ár?', options: ['7 975 Ft', '2 000 Ft', '6 000 Ft', '10 000 Ft'], answer: 2, explain: '25% = 2 000 Ft a kedvezmény, így 8 000 − 2 000 = 6 000 Ft. (Vagy: 8 000 · 0,75.)' },
    { q: '720 Ft-ot 5 : 3 arányban osztunk szét két testvér között. Mennyit kapnak?', options: ['450 Ft és 270 Ft', '500 Ft és 300 Ft', '400 Ft és 320 Ft', '360 Ft és 360 Ft'], answer: 0, explain: '5 + 3 = 8 rész, 1 rész = 720 : 8 = 90 Ft. 5 · 90 = 450 Ft, 3 · 90 = 270 Ft.' },
    { q: 'Egy térkép méretaránya 1 : 50 000. Mekkora a valóságban az a távolság, amely a térképen 4 cm?', options: ['20 km', '200 m', '2 km', '12,5 km'], answer: 2, explain: '4 · 50 000 = 200 000 cm = 2 000 m = 2 km.' },
    { q: 'Melyik két mennyiség egyenesen arányos?', options: ['egy négyzet oldala és területe', 'a megvett kiflik száma és az értük fizetett összeg', 'egy út megtételéhez szükséges idő és a sebesség', 'egy ember életkora és magassága'], answer: 1, explain: 'Kétszer annyi kifli kétszer annyiba kerül. Az idő és a sebesség fordítottan arányos, a négyzet területe az oldal négyzetével nő, az életkor és a magasság pedig nem arányos.' },
    { q: 'Egy 1 000 Ft-os termék ára 20%-kal nő, majd az új ár 20%-kal csökken. Mennyi a végső ár?', options: ['1 000 Ft', '1 040 Ft', '800 Ft', '960 Ft'], answer: 3, explain: '1 000 · 1,2 = 1 200 Ft, majd 1 200 · 0,8 = 960 Ft. A csökkenés már a nagyobb alapból számolódik.' }
  ],
  'meres-geometria': [
    { q: 'Hány méter 3,4 km?', options: ['340 m', '34 000 m', '3 400 m', '0,0034 m'], answer: 2, explain: '1 km = 1 000 m, nagyobbról kisebbre szorzunk: 3,4 · 1 000 = 3 400 m.' },
    { q: 'Hány kilogramm 2 500 g?', options: ['25 kg', '2,5 kg', '250 kg', '0,25 kg'], answer: 1, explain: '1 kg = 1 000 g, kisebbről nagyobbra osztunk: 2 500 : 1 000 = 2,5 kg.' },
    { q: 'Hány dm² 5 m²?', options: ['50 dm²', '5 000 dm²', '500 dm²', '50 000 dm²'], answer: 2, explain: '1 m = 10 dm, ezért 1 m² = 10 · 10 = 100 dm². 5 · 100 = 500 dm².' },
    { q: 'Hány perc 1,5 óra?', options: ['150 perc', '90 perc', '105 perc', '75 perc'], answer: 1, explain: '1 óra = 60 perc, így 1,5 · 60 = 90 perc. Az időnél nem tízes a váltószám, ezért a 150 rossz.' },
    { q: 'Egy négyzet kerülete 36 cm. Mekkora a területe?', options: ['36 cm²', '324 cm²', '144 cm²', '81 cm²'], answer: 3, explain: 'Az oldal 36 : 4 = 9 cm, a terület 9 · 9 = 81 cm².' },
    { q: 'Egy háromszög egyik oldala 10 cm, a hozzá tartozó magasság 6 cm. Mekkora a területe?', options: ['60 cm²', '16 cm²', '30 cm²', '32 cm²'], answer: 2, explain: 'T = a · m / 2 = 10 · 6 / 2 = 30 cm². A 60 akkor jön ki, ha elfelejtjük a 2-vel való osztást.' },
    { q: 'Mekkora az 5 cm sugarú kör kerülete? (π ≈ 3,14)', options: ['78,5 cm', '31,4 cm', '15,7 cm', '25 cm'], answer: 1, explain: 'K = 2 · r · π = 2 · 5 · 3,14 = 31,4 cm. A 78,5 a kör területe (cm²-ben).' },
    { q: 'Mekkora a 4 cm × 5 cm × 6 cm-es téglatest térfogata?', options: ['148 cm³', '15 cm³', '60 cm³', '120 cm³'], answer: 3, explain: 'V = a · b · c = 4 · 5 · 6 = 120 cm³. A 148 a felszíne lenne (cm²-ben): 2 · (20 + 30 + 24).' },
    { q: 'Mekkora a 2 cm élű kocka felszíne?', options: ['24 cm²', '8 cm²', '12 cm²', '16 cm²'], answer: 0, explain: 'A = 6 · a² = 6 · 4 = 24 cm². A 8 cm³ a térfogata.' },
    { q: 'Egy derékszögű háromszög átfogója 10 cm, egyik befogója 6 cm. Mekkora a másik befogó?', options: ['4 cm', '8 cm', '16 cm', '11,7 cm'], answer: 1, explain: 'b² = c² − a² = 100 − 36 = 64, b = 8 cm. A 11,7 cm akkor jön ki, ha kivonás helyett összeadunk.' }
  ],
  egyenletek: [
    { q: 'Mi a megoldása az x + 14 = 9 egyenletnek?', options: ['23', '5', '−5', '−23'], answer: 2, explain: 'Mindkét oldalból 14-et vonunk ki: x = 9 − 14 = −5. Ellenőrzés: −5 + 14 = 9.' },
    { q: 'Mi a megoldása az 5x = −35 egyenletnek?', options: ['7', '−7', '−30', '−175'], answer: 1, explain: 'Mindkét oldalt 5-tel osztjuk: x = −35 : 5 = −7.' },
    { q: 'Mi a megoldása az x : 3 = 6 egyenletnek?', options: ['2', '9', '3', '18'], answer: 3, explain: 'Mindkét oldalt 3-mal szorozzuk: x = 18. Ellenőrzés: 18 : 3 = 6.' },
    { q: 'Mi a megoldása a 4x − 7 = 2x + 5 egyenletnek?', options: ['6', '−1', '1', '2'], answer: 0, explain: '4x − 2x = 5 + 7, vagyis 2x = 12, x = 6. Ellenőrzés: 24 − 7 = 17 és 12 + 5 = 17.' },
    { q: 'Mi a megoldása a 2 · (x − 4) = 10 egyenletnek?', options: ['7', '9', '3', '14'], answer: 1, explain: '2x − 8 = 10, 2x = 18, x = 9. A 7 akkor jön ki, ha a zárójelbontásnál a 4-et nem szorozzuk 2-vel.' },
    { q: 'Melyik szám a megoldása a 3x + 2 = 5x − 8 egyenletnek?', options: ['2', '3', '4', '5'], answer: 3, explain: '2 + 8 = 5x − 3x, vagyis 10 = 2x, x = 5. Ellenőrzés: 17 = 17.' },
    { q: 'Három egymást követő egész szám összege 48. Melyik a legkisebb?', options: ['16', '14', '15', '12'], answer: 2, explain: 'x + (x + 1) + (x + 2) = 48, 3x + 3 = 48, 3x = 45, x = 15. A számok: 15, 16, 17.' },
    { q: 'Egy apa 30 évvel idősebb a fiánál. Életkoruk összege 46 év. Hány éves a fiú?', options: ['16', '8', '23', '38'], answer: 1, explain: 'Fiú: x, apa: x + 30. x + x + 30 = 46, 2x = 16, x = 8. Az apa 38 éves.' },
    { q: 'Gondoltam egy számot. Ha a kétszereséből elveszek 5-öt, 17-et kapok. Melyik számra gondoltam?', options: ['6', '24', '11', '12'], answer: 2, explain: '2x − 5 = 17, 2x = 22, x = 11. Ellenőrzés: 2 · 11 − 5 = 17.' },
    { q: '3 egyforma füzet és egy 200 Ft-os toll együtt 1 100 Ft. Mennyibe kerül egy füzet?', options: ['300 Ft', '433 Ft', '900 Ft', '400 Ft'], answer: 0, explain: '3x + 200 = 1 100, 3x = 900, x = 300 Ft. A 900 Ft a három füzet együttes ára.' }
  ]
});
