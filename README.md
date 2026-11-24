# Tudásműhely – interaktív tanulás, offline is

Ingyenes, letölthető tananyag diákoknak, amiből **egyedül, a saját tempójukban** lehet tanulni.
Nem kell hozzá internet, regisztráció vagy telepítés: egy sima weboldal, ami a saját gépen fut.

## Mi van benne?

**Tantárgyak és szakmák**, leckékkel, interaktív kísérletekkel és kvízekkel:

| Terület | Példák az interaktív elemekre |
|---|---|
| ⚡ Villanyszerelés | Ohm-törvény áramkör, soros/párhuzamos kapcsolás, vezeték-keresztmetszet és feszültségesés |
| 🔧 Autószerelés | Animált négyütemű motor, fogaskerék-áttétel |
| 🔋 Elektromosautó-szerelés | Akkupakk-tervező (cellák, feszültség, kWh, hatótáv) |
| ➗ Matematika | Függvényábrázoló, Pitagorasz-tétel, végtelen gyakorló feladatok |
| 🪐 Fizika | Ferde hajítás különböző bolygókon, atomépítő |
| 🏛️ Történelem | Idővonalak időrendi játékkal |

**„Mi miből áll?” felfedező.** Szétszedhető, kattintható modellek (processzor, alaplap, tranzisztor, atom,
elektromos autó, akkucella, benzinmotor, elosztószekrény). Minden alkatrésznél megtudod:

- **Mi ez?**: mire való
- **Miből van?**: milyen anyagokból készül
- **Hogyan készül?**: a gyártás menete

Minden modellhez tartozik egy lépésről lépésre végigvehető gyártási folyamat és egy történeti idővonal.
A modellek egymásba ágyazhatók, így le lehet ásni egészen az atomokig:
**alaplap → processzor → tranzisztor → atom**.

**🎓 Egyetem – szakszótár és vizuális jegyzet** BSc-s hallgatóknak (digitális technika, villamosmérnöki alapok,
e-mobilitás, analízis, fizika):

- **Szakszótár**: definíció, részletes magyarázat, angol megfelelő, ábra, példa, „gyakori hiba”
- **Képlet-boncoló**: a képlet minden jelére kattintva megmutatja a jelentését és a mértékegységét
- **Fogalomtérkép**: a fogalmak hálózata, ami megmutatja, mi mivel függ össze
- **Tanulókártyák** Leitner-módszerrel, és minden alkalommal újragenerált **kvíz**

**🎒/🎓 Mélységi szintek – egy tudásgráf.** A fejlécben váltható, hogy iskolai vagy egyetemi szinten nézed a tartalmat.
Ugyanaz a modell (pl. processzor, tranzisztor, alaplap) egyetemi szinten megmutatja az angol szakszavakat, az
„Egyetemi háttér” magyarázatokat és paraméterezhető szimulációkat (MOSFET I–U karakterisztika, CPU-teljesítmény).
A szakszavaknál megjelenik, milyen középiskolai leckékre épülnek („Előismeret”) és hol találkozol velük a valóságban.

**📝 Tesztközpont.** Témákra bontott kérdésbank, minden kérdés 4 válaszlehetőséggel. Választható az *azonnali visszajelzés*
(minden válasz után kiírja, helyes volt-e) vagy a *vizsga mód* (csak a végén értékel). Az eredmény osztályzattal,
témánkénti bontással és a hibás kérdések újragyakorlásával jár, a gyenge témákat pedig a program megjegyzi.

Ezen kívül: **kereső** az összes tartalomban (ékezet nélkül is működik), haladásmentés, világos és sötét mód,
mobilbarát felület.

## Letöltés és használat

1. **Egyetlen fájl (a legegyszerűbb).** Töltsd le a [`dist/tudasmuhely-offline.html`](dist/tudasmuhely-offline.html)
   fájlt, és nyisd meg dupla kattintással. Pendrive-on vagy e-mailben is továbbadható.
2. **A teljes mappa.** GitHubon: *Code → Download ZIP*, csomagold ki, és nyisd meg az `index.html` fájlt.
3. **Telepíthető alkalmazásként (PWA).** Ha a mappát egy webszerverre teszed (pl. GitHub Pages vagy az iskola
   szervere), a böngészőben „Telepítés” vagy „Hozzáadás a kezdőképernyőhöz” választható. Az első megnyitás után
   telefonon is offline működik.

## Bővítés: új lecke vagy modell

Minden tartalom egy-egy egyszerű JavaScript fájl, nincs szükség fordításra.

- Tantárgyak: `data/tantargyak/*.js`. A minta a `villanyszereles.js`.
- Modellek: `data/modellek/*.js`. A minta a `processzor.js`.
- Egyetemi kurzusok: `data/egyetem/*.js`. A minta a `digitalis-technika.js`.
- Kérdésbank: `data/kerdesek/*.js` – `STUDIE.addQuestions('tantárgy', { leckeId: [ { q, options: [4 db], answer, explain } ] })`.
- Egyetemi kapcsolatok: alkatrésznél és leckénél `terms: ['kurzus/fogalom']`, szakszónál `prereq: ['lecke:tantárgy/lecke', 'modell:id']`, modellnél `uni: { text, widgets, terms }`.
- Új fájlt az `index.html`-ben kell felvenni egy `<script>` sorral.
- Szövegjelölés: `**félkövér**`, `` `képlet` ``, `- ` felsorolás, `1. ` számozott lista, üres sor új bekezdés,
  `[[processzor|link a felfedezőbe]]`.
- Interaktív elemek (`js/widgets.js`): `ohm`, `soros-parhuzamos`, `feszultsegeses`, `negyutemu`, `attetel`,
  `akkupakk`, `fuggveny`, `pitagorasz`, `gyakorlas`, `idovonal`, `hajitas`, `atomepito`, `mosfet-iv`, `cpu-teljesitmeny`.
  Leckében: `widget: { type: 'ohm', options: {} }`.

A tananyag ellenőrzése (hivatkozások, kvízek, kérdésbank, hibakereső fák). A GitHub ezt minden feltöltéskor automatikusan lefuttatja:

```
node tools/check.js
```

Az egyfájlos változat újragenerálása (Node.js kell hozzá):

```
node tools/build-single.js
```

## Felépítés

```
index.html            belépési pont
css/style.css         megjelenés (világos/sötét mód)
js/core.js            regiszter, szövegjelölés, rajzsegéd (izometrikus 3D)
js/widgets.js         interaktív kísérletek
js/explorer.js        „Mi miből áll?” felfedező
js/app.js             oldalak, keresés, kvíz, haladás
js/university.js      egyetemi rész: szakszótár, képletek, fogalomtérkép, kártyák
js/teszt.js           tesztközpont: kérdésbank, azonnali és vizsga mód
data/                 a tananyag
sw.js, manifest       offline mód és telepíthetőség
tools/build-single.js egyfájlos változat készítése
```

## Biztonsági megjegyzés

A villanyszerelési és elektromosautó-szerelési leckék az **elméletet** tanítják. Hálózati (230/400 V-os) és
nagyfeszültségű (HV) járműrendszeren csak megfelelő képesítéssel rendelkező szakember dolgozhat.
