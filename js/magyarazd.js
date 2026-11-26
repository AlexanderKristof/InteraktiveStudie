/* Tudásműhely – 🗣️ „Magyarázd el!” mód (Feynman-technika).
 * Választasz egy fogalmat (egyetemi szakszavak: S.courses[].terms, iskolai szinten az egyszerű magyarázatokkal: S.simple;
 * a leckék szakszótárai: S.lessonUni[...].glossary), saját szavaiddal elmagyarázod, és a program kulcsszó-egyezés
 * alapján visszajelez: mit említettél, mi hiányzik, hány pont, majd megmutatja a mintamagyarázatot.
 * Kulcsszavak: a definícióból automatikusan (magyar stopword-lista, szótövezés, zárójeles szinonimák),
 * a KEYS táblában szereplő gyakori fogalmaknál kézzel írt listából (pontosabb).
 * Útvonal: #/magyarazd  ·  #/magyarazd?f=c:<kurzus>/<fogalom>  ·  #/magyarazd?f=l:<tantárgy>/<lecke>/<sorszám>
 * Tárolás: 'magyarazd' → { fogalomId: legjobb pontszám } */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;

  /* ---------- szövegkezelés: normalizálás, szótövezés ---------- */
  function words(s) { return S.norm(s).replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean); }
  var SUF = ['jaitol', 'eitol', 'aitol', 'jainak', 'oknak', 'eknek', 'akkal', 'ekkel', 'okkal', 'okat', 'eket', 'akat', 'oket', 'javal', 'jevel', 'aval', 'evel',
    'abol', 'ebol', 'bol', 'ban', 'ben', 'nak', 'nek', 'val', 'vel', 'rol', 'tol', 'hoz', 'hez', 'nal', 'nel', 'kent', 'kor', 'ert', 'ig', 'ba', 'be', 'ra', 're',
    'on', 'en', 'ul', 'ok', 'ek', 'ak', 'uk', 'at', 'et', 'ot', 'ai', 'ei', 'ja', 'je', 'i', 'a', 'e', 'k', 't'];
  function stem(w) {
    var min = 2;
    for (var pass = 0; pass < 3; pass++) {
      var cut = false;
      for (var i = 0; i < SUF.length; i++) {
        var s = SUF[i];
        if (w.length - s.length >= min && w.slice(-s.length) === s) { w = w.slice(0, -s.length); cut = true; break; }
      }
      if (!cut) break;
    }
    return w;
  }
  /* egy felhasználói szótő illik-e egy kulcsszó-szótőre (ragozás-, képzés- és összetételtűrő) */
  function wordHit(u, k) {
    if (u === k) return true;
    if (k.length >= 4 && u.indexOf(k) === 0) return true;
    if (u.length >= 5 && k.indexOf(u) === 0 && u.length >= k.length * 0.7) return true;
    if (k.length >= 6 && u.length >= 8 && u.indexOf(k) > 0) return true; /* összetett szó utótagja: „árszínvonal” ← „színvonal” */
    return false;
  }
  function altHit(userStems, alt) { /* az alternatíva minden szavának szerepelnie kell */
    return alt.every(function (k) { return userStems.some(function (u) { return wordHit(u, k); }); });
  }
  function compileGroup(str) { /* 'címke|szinonima|két szavas' → { label, alts: [[tő, tő], …] } */
    var parts = str.split('|');
    return { label: parts[0], alts: parts.map(function (p) { return words(p).map(stem); }).filter(function (a) { return a.length; }) };
  }

  var STOP = ('a az egy es s is nem sem hogy de ha mint meg mar csak vagy van vannak volt lesz lehet kell ez ezt ezek azt azok ami amit amely amelyet amelyek amelyben amelynek aki akik akkor ' +
    'ott itt igen nagyon mely melyik minden mas masik masok sok tobb kevesebb ilyen olyan egyik ket harom azaz vagyis illetve ill pl stb peldaul altal kozott szerint utan elott alatt felett ' +
    'mellett nelkul miatt ugy ugyan ezert mert vele neki rajta benne bele tole hozza ra re ki be fel le el at vissza ossze jelenti jelent jelenteni azt mutatja megmutatja fejezi amikor ' +
    'altalaban mindig eseten adott valami valamit dolog dolgok egyes sajat egesz nevezzuk nevezik nevezett ugynevezett un oly e kb mintegy legalabb legfeljebb kozul alapjan reven ' +
    'egymas egymast egymassal tehat hiszen pedig viszont mig tovabba szinten maga maguk magat ahol amig mikor milyen mennyi mennyit hany ennek annak ezzel azzal ebben abban errol arrol ' +
    'erre arra innen onnan nincs nincsenek legyen lenne lennenek vagyunk vagy vagytok kerul kerulnek tortenik tud tudja tudnak lesznek volna tobbi resz reszt reszei jo rossz uj nagy kis ' +
    'kicsi elso masodik harmadik fontos teljes hasonlo kulonbozo bizonyos szamara mindket mindegyik barmely barmilyen semmi senki mindenki valaki mi te en o ok ti mi mit ki kik hol ' +
    'egyszerre egyarant letezik letezo helyen hely felteve feltetel utobbi elobbi kiszamit kiszamitas kiszamitasa kiszamitasara szamit szamitas hasznal hasznaljuk segit segitsegevel ' +
    'mukodik vonatkozik jelleg modon mod eset esetben alak alakban ertelemben fajta mertek merteke ertelme amelyeknel amelyre amelyben amelyek amelynel ugyanis eppen kulonosen foleg ' +
    'leggyakoribb gyakran neha mindegy szinte teljesen egyszeruen konnyen nehezen jol rosszul sokkal kevesse altalanos konkret tipikus fajtaja peldaul mutat jelzi ad adja adnak kap kapunk ' +
    'lesz levo levok vegul elejen vegen kozben soran kesobb korabban eloszor utana tobbe kevesbe egyre leginkabb mindenkeppen illetoleg legyen kerdes valasz ' +
    'hanem torteno tortenik kerul keruljon meri hasznalt hasznalhato alkalmas ellatott definicio valtozata valtozat marad szama eredmenyet eredmenye jelennek megmondhatod tehetunk lehetove teszi tesz nemcsak').split(' ');
  var STOPRE = /^(amely|ami|aki|ahol|amikor|ameddig|ahogy|mely|egyszer|minden|valam|barm|semmi|sehol|egyik|masik|ezen|azon|ilyen|olyan|annyi|ennyi|legink|egymas|mindegy|onnan|dolg|megmond)/;
  var STOPSET = {}; STOP.forEach(function (w) { STOPSET[w] = 1; });

  function plain(t) { return String(t || '').replace(/\[\[[^|\]]+\|(.+?)\]\]/g, '$1').replace(/`[^`]*`/g, ' ').replace(/[_^{}]/g, ' '); }

  /* Automatikus kulcsszó-kinyerés a definícióból. */
  function autoKeys(term, def, more) {
    var tf = {}; words(plain(more || '')).forEach(function (w) { var k = stem(w).slice(0, 7); tf[k] = (tf[k] || 0) + 1; });
    var termStems = words(term).map(stem);
    var txt = plain(def), bold = {};
    (txt.match(/\*\*(.+?)\*\*/g) || []).forEach(function (b) { words(b).forEach(function (w) { bold[stem(w)] = 1; }); });
    txt = txt.replace(/\*\*/g, '');
    /* szinonimák: „szó (másik szó)” – ha a zárójelben egy-két szó áll, felsorolás és szám nélkül */
    var syn = {};
    txt.replace(/([A-Za-zÀ-ž-]{4,})\s*\(([^(),;:=\d]{3,28})\)/g, function (m, a, b) {
      var wb = words(b).filter(function (w) { return !STOPSET[w]; });
      if (wb.length >= 1 && wb.length <= 2) { var sa = stem(words(a)[0] || ''); syn[sa] = (syn[sa] || []).concat([wb.map(stem)]); wb.forEach(function (w) { syn[stem(w)] = (syn[stem(w)] || []).concat([[sa]]); }); }
      return m;
    });
    var sentences = txt.replace(/([.!?])\s+/g, '$1\n').split('\n'), cand = {};
    sentences.forEach(function (sen, si) {
      words(sen).forEach(function (w) {
        if (w.length < 4 || STOPSET[w] || STOPRE.test(w) || /^\d+$/.test(w)) return;
        var st = stem(w);
        if (st.length < 3 || termStems.some(function (t) { return wordHit(st, t) || wordHit(t, st); })) return;
        var key = st.slice(0, 7);
        var c = cand[key] = cand[key] || { st: st, forms: {}, score: 0, first: si };
        c.forms[w] = (c.forms[w] || 0) + 1;
        c.score += (si === 0 ? 2.2 : si === 1 ? 1.4 : 0.6) + (bold[st] ? 2.5 : 0) + (w.length >= 8 ? 0.4 : 0);
        if (!c.tfDone) { c.score += 0.5 * Math.min(4, tf[key] || 0); c.tfDone = true; }
        if (st.length < c.st.length) c.st = st;
      });
    });
    var list = Object.keys(cand).map(function (k) { return cand[k]; }).sort(function (a, b) { return b.score - a.score || a.first - b.first; });
    var n = Math.max(4, Math.min(7, Math.round(list.length / 3)));
    return list.slice(0, n).map(function (c) {
      var label = Object.keys(c.forms).sort(function (a, b) { return a.length - b.length || c.forms[b] - c.forms[a]; })[0];
      var orig = (def.match(new RegExp('[A-Za-zÀ-ž-]+', 'g')) || []).filter(function (w) { return S.norm(w).toLowerCase() === label; })[0];
      return { label: (orig || label).toLowerCase(), alts: [[c.st]].concat(syn[c.st] || []) };
    });
  }

  /* ---------- kézzel írt kulcsszavak a leggyakoribb fogalmakhoz ('kurzus/fogalom' → csoportok) ---------- */
  var KEYS = {
    'kozgazdasagtan/szukosseg': ['korlátozott|kevés|véges|nem elég|kevesebb', 'erőforrás|idő|pénz|munka|nyersanyag|tőke|föld', 'igény|szükséglet|szeretnénk|akarunk|felhasznál', 'választás|választani|dönt|lemond'],
    'kozgazdasagtan/alternativakoltseg': ['lemondás|lemond|feláldoz|kihagy|elszalaszt', 'legjobb|következő legjobb', 'lehetőség|alternatíva|választás|döntés', 'érték|költség|ár'],
    'kozgazdasagtan/kereslet': ['vásárló|vevő|fogyasztó|ember', 'ár', 'mennyiség|mennyit|mennyi', 'hajlandó|akar|szeretne', 'képes|tud|pénz', 'csökken|kisebb|negatív|lefelé|kevesebbet'],
    'kozgazdasagtan/kinalat': ['eladó|termelő|cég|vállalat', 'ár', 'mennyiség|mennyit|mennyi', 'hajlandó|akar|szeretne', 'elad|termel|kínál', 'nő|növekszik|pozitív|emelkedik|felfelé|többet'],
    'kozgazdasagtan/piaci-egyensuly': ['ár', 'kereslet|keresett|vevő|vásárló', 'kínálat|kínált|eladó', 'megegyezik|egyenlő|azonos|ugyanannyi|annyi', 'hiány|többlet|fölösleg|felesleg'],
    'kozgazdasagtan/inflacio': ['ár|árszínvonal', 'emelkedés|emelkedik|nő|drágul|növekedés', 'általános|átlagos|összes', 'tartós|folyamatos|hosszú', 'vásárlóerő|kevesebbet|pénz értéke|ér a pénz'],
    'kozgazdasagtan/gdp': ['ország|nemzet', 'termék|áru', 'szolgáltatás', 'érték|pénz|forint', 'év|időszak|negyedév', 'végső|végtermék', 'területén|belül|hazai'],
    'kozgazdasagtan/monopolium': ['egyetlen|egy|egyedül', 'eladó|cég|vállalat|termelő', 'helyettesítő|alternatíva|másik termék', 'ár|árat szab|ármeghatározó', 'belépési korlát|belép|verseny'],
    'kozgazdasagtan/externalia': ['hatás|mellékhatás|következmény', 'más|harmadik|kívülálló|másokra', 'piaci ár|ár|nem fizet|fizet', 'szennyezés|negatív|pozitív|oltás'],
    'kozgazdasagtan/munkanelkuliseg': ['nincs munka|nem dolgozik|munka nélkül', 'keres|aktív', 'munkába|el tudna|vállal|tud dolgozni', 'ráta|arány|százalék', 'munkaerő|aktív|foglalkoztatott'],
    'kozgazdasagtan/kozjavak': ['kizár|kizárni', 'nem csökken|nem fogy|nem lesz kevesebb|rivalizál', 'mindenki|közös|összes', 'állam|adó|közvilágítás|honvédelem|védelem', 'potyautas|nem fizet|alultermel'],
    'kozgazdasagtan/komparativ-elony': ['alternatívaköltség|lemondás|feláldoz|lemond', 'kisebb|olcsóbb|kevesebb', 'specializáció|szakosod|arra koncentrál', 'kereskedelem|csere|kereskedik', 'kölcsönös|mindkét|mindenki jól|közös előny'],
    'fizika-bsc/impulzus': ['tömeg', 'sebesség', 'szorzat|szoroz|szorozva|mv', 'vektor|irány', 'megmarad|állandó|nem változik', 'ütközés|ütköz|lök|rakéta'],
    'fizika-bsc/harmonikus-rezges': ['ide-oda mozgás|ide-oda|oda-vissza|rezeg|leng|ismétlőd|periodik', 'szinusz|koszinusz|sin|cos', 'visszatérítő erő|visszatérítő|visszahúz|rugó', 'arányos|kitéréssel', 'kitérés|egyensúlyi|középhelyzet', 'amplitúdó|frekvencia|periódus|rezgésidő'],
    'fizika-bsc/entropia': ['rendezetlenség|rendetlenség|szétszóród|valószínű', 'hő|energia', 'hőmérséklet', 'nem csökken|nő|növekszik', 'elszigetelt|zárt|magára hagyott', 'második főtétel|főtétel'],
    'fizika-bsc/doppler': ['frekvencia|hangmagasság|magasság|szín', 'mozog|mozgás|halad', 'forrás|hangforrás|mentőautó|autó', 'megfigyelő|hallgató', 'közeledik|közelít|magasabb|nagyobb', 'távolodik|mélyebb|kisebb|alacsonyabb'],
    'fizika-bsc/gravitacio': ['vonzás|vonz|vonzóerő', 'tömeg', 'távolság|távol|közel', 'négyzet|fordítottan', 'bolygó|nap|föld|hold|pálya|kepler'],
    'fizika-bsc/fotoeffektus': ['foton|fényrészecske|energiacsomag|kvantum|adag', 'elektron', 'fém|felület', 'kilép|kilök|kiszakít|kiüt', 'frekvencia|hullámhossz|szín|energia', 'kilépési munka|küszöb|határfrekvencia'],
    'fizika-bsc/radioaktiv-bomlas': ['instabil|bomlékony|nem stabil', 'atommag|mag', 'magától|spontán|véletlen', 'sugárzás|alfa|béta|gamma', 'felezési idő|felére|fele', 'exponenciális|csökken'],
    'fizika-bsc/fenytores': ['fény', 'irány|megtörik|törés|elhajlik', 'közeg|anyag|víz|üveg|levegő', 'határ|felület|átlép|belép', 'sebesség|törésmutató|lassabb', 'teljes visszaverődés|határszög'],
    'fizika-bsc/interferencia': ['hullám', 'találkozik|egymásra|összeadód|szuperpozíció', 'erősít|konstruktív', 'gyengít|kiolt|destruktív', 'fázis|ellentétes|egyszerre', 'elhajlás|diffrakció|akadály|rés'],
    'analizis/derivalt': ['változás|változik|meredek', 'sebesség|gyors', 'pillanatnyi|adott pont|pontban', 'határérték|lim|tart', 'érintő|meredekség', 'különbségi hányados|hányados'],
    'analizis/folytonossag': ['grafikon|görbe|rajzol', 'ugrás|szakadás|nem ugrik|megszakítás|ceruza', 'határérték|lim|tart', 'függvényérték|érték', 'kicsit|kis változás|közel'],
    'analizis/riemann-integral': ['terület|görbe alatti', 'felosztás|csík|téglalap|rész|darab', 'összeg|összead|szumma', 'határérték|finomít|egyre kisebb|végtelen', 'intervallum|határ'],
    'analizis/szelsoertek': ['maximum|legnagyobb', 'minimum|legkisebb', 'környezet|helyi|lokális|közel', 'derivált|érintő|nulla', 'függvény'],
    'analizis/e-szam': ['2,718|2,72|2.718', 'határérték|sorozat', 'természetes logaritmus|ln|logaritmus', 'exponenciális|növekedés|kamat', 'irracionális|végtelen'],
    'valszam/varhato-ertek': ['átlag', 'súlyoz|valószínűség|esély', 'sokszor|ismétl|hosszú távon', 'érték|kimenetel', 'összeg|szumma|integrál'],
    'valszam/szoras': ['eltérés|szóródik|szóródás|ingadoz|szétszór', 'átlag|várható érték', 'négyzet', 'gyök', 'kiszámíthatatlan|bizonytalan|kockázat'],
    'valszam/felteteles-valoszinuseg': ['valószínűség|esély', 'feltétel|tudjuk|már megtörtént|bekövetkezett|információ', 'másik esemény|esemény', 'osztás|hányados|metszet|együtt'],
    'valszam/normalis-eloszlas': ['harang|haranggörbe|gauss', 'átlag|várható érték|közép', 'szórás', 'szimmetrikus|két oldal', 'gyakori|természet|sok mérés|centrális'],
    'valszam/korrelacio-oksag': ['együttmozgás|együtt|összefügg|korrelál', 'ok|okoz|ok-okozati', 'nem bizonyít|nem jelenti|nem feltétlenül', 'harmadik|háttér|rejtett|véletlen|zavaró'],
    'valszam/p-ertek': ['valószínűség|esély', 'nullhipotézis|semmi különös|véletlen|h0', 'szélsőséges|legalább ennyire|meglepő', 'kicsi|0,05|szignifikáns|elvet'],
    'programozas/valtozo': ['név|neve|azonosító', 'érték|adat', 'tárol|tárhely|doboz|memória', 'értékadás|felülír|módosít|megváltoz|kicserél', 'típus'],
    'programozas/rekurzio': ['önmagát|saját magát|maga', 'hív|hívás|meghív', 'kisebb|egyszerűbb|részfeladat', 'alapeset|leáll|megáll|kilépési feltétel|báziseset', 'függvény'],
    'programozas/fuggveny': ['név', 'paraméter|bemenet|argumentum', 'visszaad|visszatérési|eredmény|érték', 'feladat|művelet', 'újrafelhasznál|újra|többször|meghív|hív'],
    'programozas/oroklodes': ['osztály', 'átvesz|örököl|megkap', 'ős|szülő|alap|meglévő', 'tulajdonság|mező|metódus|képesség', 'kiegészít|felülír|bővít|megváltoztat'],
    'programozas/polimorfizmus': ['ugyanaz|azonos|ugyanarra', 'különböző|más-más|eltérő', 'objektum|osztály|típus', 'metódus|kérés|művelet|üzenet', 'viselkedés|reagál|saját módjukon'],
    'programozas/osztaly-objektum': ['tervrajz|minta|sablon|típus', 'példány|konkrét', 'adat|mező|tulajdonság|állapot', 'metódus|képesség|művelet|viselkedés'],
    'algoritmusok/binaris-kereses': ['rendezett|sorba rendezett', 'középső|közép', 'fele|felez|kettéoszt', 'összehasonlít|nagyobb|kisebb', 'logaritmus|log|gyors'],
    'algoritmusok/hasitotabla': ['kulcs', 'érték|adat', 'hasítófüggvény|hash|függvény', 'rekesz|bucket|hely|index', 'gyors|azonnal|konstans', 'ütközés|ütköz'],
    'algoritmusok/verem-sor': ['verem|stack', 'sor|queue', 'utoljára|utolsó|lifo|tetejéről', 'először|első|fifo|elejéről', 'betesz|kivesz|push|pop'],
    'algoritmusok/dijkstra': ['legrövidebb út|legrövidebb', 'gráf|hálózat|csúcs', 'él|súly|távolság|hossz', 'nemnegatív|negatív', 'kezdőpont|kiinduló|forrás', 'legkisebb|mohó|véglegesít'],
    'kemia-bsc/ph': ['savas|sav', 'lúgos|bázikus|lúg', 'semleges|7', 'oxóniumion|hidrogénion|h3o', 'logaritmus|lg|tízszeres', 'skála|14'],
    'kemia-bsc/elektronegativitas': ['atom', 'vonz|húz|magához', 'elektronpár|elektron', 'kötés|kötésben', 'pauling|fluor|skála'],
    'kemia-bsc/aktivalasi-energia': ['energiagát|energia|energiadomb|gát', 'részecske|ütközés', 'reakció|reagál|átalakul', 'katalizátor', 'gyorsít|gyors|sebesség|csökkent'],
    'kemia-bsc/puffer': ['ph|savasság|kémhatás', 'alig változik|állandó|stabil|kiegyenlít', 'gyenge sav|sav', 'konjugált|só|bázis', 'lúg|hozzáad|öntünk'],
    'kemia-bsc/redoxi': ['elektron', 'oxidáció|lead|leadás', 'redukció|felvesz|felvétel', 'oxidációs szám', 'egyszerre|együtt|párban'],
    'anatomia/homeosztazis': ['belső környezet|belső|szervezet', 'állandó|stabil|egyensúly', 'hőmérséklet|testhő|vércukor|ph|víz', 'szabályoz|szabályozás', 'visszacsatolás|negatív'],
    'anatomia/szinapszis': ['idegsejt|neuron', 'kapcsolat|találkozás|érintkez', 'ingerület|jel|üzenet', 'ingerületátvivő|neurotranszmitter|vegyület|kémiai', 'izom|izomsejt|elektromos'],
    'anatomia/akcios-potencial': ['membrán|sejthártya|sejtfal', 'feszültség|potenciál|elektromos', 'gyors|hirtelen|kisülés', 'mindent vagy semmit|küszöb', 'terjed|végigfut|továbbít|ingerület', 'nátrium|kálium|ion'],
    'anatomia/neuron': ['idegrendszer', 'alapegység|sejt', 'dendrit|fogad', 'axon|továbbít|elvezet', 'szinapszis', 'jel|ingerület|üzenet|elektromos'],
    'villamosmernoki/ohm-torveny': ['feszültség', 'áram|áramerősség', 'ellenállás', 'arányos|egyenesen arányos', 'szorzat|szoroz|hányados|osztva|képlet'],
    'villamosmernoki/transzformator': ['váltakozó|váltóáram|váltó', 'feszültség', 'tekercs|menet', 'vasmag|mag', 'átalakít|nagyobb|kisebb|letranszformál|felemel', 'indukció|mágneses'],
    'villamosmernoki/impedancia': ['váltakozó|váltóáram', 'ellenállás|akadályoz', 'ohm', 'feszültség', 'áram', 'reaktancia|képzetes|fázis|komplex'],
    'szamvitel/merleg': ['eszköz|mi van|amink van', 'forrás|miből|saját tőke|kötelezettség', 'időpont|nap|fordulónap|pillanatkép|december', 'egyenlő|egyezik|azonos|főösszeg', 'beszámoló'],
    'szamvitel/kettos-konyvvitel': ['két helyre|kétszer|két számla|két', 'tartozik|bal', 'követel|jobb', 'azonos összeg|ugyanazzal az összeggel|egyenlő', 'gazdasági esemény|esemény|könyvel'],
    'szamvitel/ertekcsokkenes': ['eszköz|gép|tárgyi', 'élettartam|évek|használat', 'szétoszt|feloszt|elosztjuk|évente', 'költség|ráfordítás', 'elhasználódik|elhasználód|kopás|értéke csökken', 'lineáris|degresszív|módszer'],
    'adatbazis/tranzakcio': ['művelet', 'csomag|együtt|egység|összetartozó', 'vagy teljesen|egyáltalán nem|visszagörget|rollback|semmi', 'acid|atomi|konzisztencia|izoláció|tartósság'],
    'adatbazis/idegen-kulcs': ['tábla|táblázat', 'oszlop|attribútum|mező', 'hivatkozik|hivatkoz|mutat|összeköt|kapcsol', 'másik tábla|másik', 'kulcs|elsődleges kulcs', 'létező|integritás|null'],
    'adatbazis/normalizalas': ['felbontás|felbont|szétbont|kisebb tábla|több tábla', 'redundancia|ismétlőd|egyszer szerepel|csak egyszer', 'anomália|ellentmondás|hiba', 'függőség|funkcionális', 'normálforma|1nf|2nf|3nf'],
    'vallalati-penzugy/npv': ['jelenérték|mai pénz|jelen', 'pénzáram|bevétel|cash flow|pénz', 'diszkontálás|diszkont|leszámítol|kamat|tőkeköltség', 'kezdő|beruházás|költség|ráfordítás', 'pozitív|megéri|nulla'],
    'vallalati-penzugy/diverzifikacio': ['több|különböző|szétoszt|megoszt', 'befektetés|portfólió|részvény', 'kockázat|veszteség', 'csökken|kisebb|mérsékel', 'együttmozgás|együtt mozog|korreláció', 'egyedi|piaci kockázat'],
    'vallalati-penzugy/penz-idoerteke': ['ma|mai|most', 'többet ér|értékesebb|jobb', 'később|jövő|jövőbeli', 'kamat|befektet', 'infláció|bizonytalan|kockázat']
  };
  S.magyarazdKeys = KEYS;

  /* ---------- fogalomlista ---------- */
  var cache = null;
  function concepts() {
    if (cache) return cache;
    var out = [];
    (S.courses || []).forEach(function (c) {
      (c.terms || []).forEach(function (t) {
        out.push({ id: 'c:' + c.id + '/' + t.id, group: (c.icon || '🎓') + ' ' + c.title, term: t.term, en: t.en, cid: c.id, tid: t.id,
          hand: !!KEYS[c.id + '/' + t.id], href: '#/egyetem/' + c.id + '/fogalom/' + t.id, short: t.short, text: t.text, simple: S.simpleOf ? S.simpleOf(c.id, t.id) : '' });
      });
    });
    S.subjects.forEach(function (s) {
      s.lessons.forEach(function (l) {
        var lu = S.lessonUni[s.id + '/' + l.id];
        ((lu && lu.glossary) || []).forEach(function (g, i) {
          if (!g.hu || !g.def) return;
          out.push({ id: 'l:' + s.id + '/' + l.id + '/' + i, group: (s.icon || '📘') + ' ' + s.title + ' – szakszavak', term: g.hu, en: g.en, def: g.def, hand: false, href: '#/lecke/' + s.id + '/' + l.id, lesson: l.title });
        });
      });
    });
    cache = out;
    return out;
  }
  function byId(id) { return concepts().filter(function (c) { return c.id === id; })[0]; }
  function firstPara(t) { return String(t || '').split(/\n\s*\n/)[0]; }
  /* a mintamagyarázat és a kulcsszavak forrása szintenként */
  function modelText(c, uni) {
    if (c.def) return c.def;
    if (!uni && c.simple) return c.simple;
    return c.short + (c.text ? '\n\n' + c.text : '');
  }
  function keyGroups(c, uni) {
    var hk = c.cid && KEYS[c.cid + '/' + c.tid];
    if (hk) return { hand: true, groups: hk.map(compileGroup) };
    var src = c.def || (!uni && c.simple ? firstPara(c.simple) + ' ' + c.short : c.short + ' ' + firstPara(c.text));
    return { hand: false, groups: autoKeys(c.term, src, (c.text || '') + ' ' + (c.simple || '') + ' ' + (c.short || '')) };
  }
  S.magyarazdEval = function (c, text, uni) { return evaluate(c, text, uni); };

  function evaluate(c, text, uni) {
    var w = words(text), us = w.map(stem), kg = keyGroups(c, uni);
    var res = kg.groups.map(function (g) {
      return { label: g.label, hit: g.alts.some(function (a) { return altHit(us, a); }) };
    });
    var hits = res.filter(function (r) { return r.hit; }).length, n = res.length || 1;
    var score = Math.round(hits / n * 100);
    var notes = [];
    if (w.length < 8) { score = Math.min(score, 40); notes.push(uni ? 'Nagyon rövid: fejtsd ki legalább 2–3 mondatban.' : 'Ez még nagyon rövid. Írj legalább 2–3 mondatot!'); }
    var example = /\b(peldaul|pl|mint amikor|kepzeld|kepzeljuk|peldanak|peldaja|mondjuk)\b/.test(S.norm(text));
    var termEcho = w.length && words(c.term).length && w.filter(function (x) { return words(c.term).indexOf(x) >= 0; }).length > w.length / 2;
    if (termEcho) { score = Math.min(score, 30); notes.push('A fogalom nevének ismételgetése még nem magyarázat. Mondd el, mit jelent!'); }
    return { res: res, hits: hits, n: res.length, score: score, hand: kg.hand, example: example, notes: notes, words: w.length };
  }

  /* ---------- oldal ---------- */
  function feynman(uni) {
    return '<details class="card mz-feyn"' + (S.store.get('magyarazd.feyn', true) ? ' open' : '') + '><summary><b>🧠 Mi az a Feynman-technika?</b></summary>' +
      (uni
        ? '<p>Richard Feynman Nobel-díjas fizikusról elnevezett tanulási módszer: ha valamit érthetően, egyszerű szavakkal el tudsz magyarázni, akkor tényleg érted. Ahol elakadsz, ott van a tudásod hézaga.</p>'
        : '<p>Egy híres fizikusról, <b>Richard Feynmanról</b> elnevezett trükk: akkor érted igazán, ha egy kisebb testvérednek is el tudod magyarázni. Ahol elakadsz, ott még van mit tanulni.</p>') +
      '<ol class="mz-steps"><li><b>Válassz egy fogalmat.</b></li><li><b>Magyarázd el saját szavaiddal</b>, ' + (uni ? 'szakzsargon nélkül, mintha egy laikusnak mondanád.' : 'mintha egy 10 évesnek mesélnéd. Hozz egy példát is!') + '</li>' +
      '<li><b>Keresd meg a hézagokat:</b> nézd meg, mi maradt ki, és olvasd el újra a forrást.</li><li><b>Egyszerűsíts és próbáld újra</b>, amíg gördülékeny nem lesz.</li></ol></details>';
  }

  function page(main, rest, params) {
    var uni = S.level === 'egyetem', all = concepts(), best = S.store.get('magyarazd', {});
    if (!all.length) {
      main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Magyarázd el!</span></nav><h1>🗣️ Magyarázd el!</h1><p class="lead">A fogalmak még töltődnek – próbáld újra egy pillanat múlva.</p>';
      return true;
    }
    var groups = [], gmap = {};
    /* iskolai szinten előbb a kurzusfogalmak (egyszerű magyarázattal), egyetemin is ugyanez a sorrend */
    all.forEach(function (c) { if (!gmap[c.group]) { gmap[c.group] = []; groups.push(c.group); } gmap[c.group].push(c); });
    var hand = all.filter(function (c) { return c.hand; });
    var cur = params && params.f && byId(params.f) ? params.f : S.store.get('magyarazd.last', '') && byId(S.store.get('magyarazd.last', '')) ? S.store.get('magyarazd.last', '') : '';

    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Magyarázd el!</span></nav>' +
      '<h1>🗣️ Magyarázd el!</h1>' +
      '<p class="lead">' + (uni
        ? 'Válassz egy fogalmat, és magyarázd el a saját szavaiddal. A program kulcsszó-egyezés alapján megmutatja, mely lényeges elemeket említetted és mi hiányzik, majd összevetheted a mintamagyarázattal.'
        : 'Válassz egy fogalmat, és írd le a saját szavaiddal, mit jelent. A program megnézi, benne vannak-e a fontos dolgok, megmondja, mi maradt ki, aztán megmutatja a mintamagyarázatot.') + '</p>' +
      feynman(uni) +
      '<div class="card pad mz-pick"><label class="mz-lab" for="mz-sel">1. Válassz fogalmat <small class="muted">(' + all.length + ' fogalom; ⭐ = kézzel kidolgozott, pontosabb értékelés)</small></label>' +
      '<select id="mz-sel" class="mz-sel"><option value="">– válassz a listából –</option>' + groups.map(function (g) {
        return '<optgroup label="' + esc(g) + '">' + gmap[g].map(function (c) {
          return '<option value="' + esc(c.id) + '"' + (c.id === cur ? ' selected' : '') + '>' + (c.hand ? '⭐ ' : '') + esc(c.term) + (best[c.id] != null ? ' · ' + best[c.id] + '%' : '') + '</option>';
        }).join('') + '</optgroup>';
      }).join('') + '</select>' +
      '<div class="mz-quick"><button type="button" class="btn" id="mz-rand">🎲 Véletlen fogalom</button><button type="button" class="btn" id="mz-rand-hand">⭐ Véletlen kidolgozott fogalom</button></div>' +
      '<div class="chips mz-chips">' + S.shuffle(hand).slice(0, 8).map(function (c) { return '<button type="button" class="chip" data-mz="' + esc(c.id) + '">⭐ ' + esc(c.term.replace(/\s*\(.*\)$/, '')) + '</button>'; }).join('') + '</div></div>' +
      '<div id="mz-work"></div>';

    var sel = main.querySelector('#mz-sel'), work = main.querySelector('#mz-work');
    S.searchableSelect(sel, '🔎 Keresés a fogalmak között (pl. kereslet, rekurzió, pH)…');
    function choose(id) {
      if (!id) { work.innerHTML = ''; return; }
      sel.value = id; S.store.set('magyarazd.last', id); showTask(byId(id));
    }
    sel.addEventListener('change', function () { choose(sel.value); });
    main.querySelector('#mz-rand').addEventListener('click', function () { choose(all[Math.floor(Math.random() * all.length)].id); });
    main.querySelector('#mz-rand-hand').addEventListener('click', function () { choose(hand[Math.floor(Math.random() * hand.length)].id); });
    main.querySelectorAll('[data-mz]').forEach(function (b) { b.addEventListener('click', function () { choose(b.getAttribute('data-mz')); }); });
    var fd = main.querySelector('.mz-feyn');
    fd.addEventListener('toggle', function () { S.store.set('magyarazd.feyn', fd.open); });

    function showTask(c) {
      if (!c) return;
      var kg = keyGroups(c, uni), draft = S.store.get('magyarazd.draft', {});
      work.innerHTML = '<div class="card pad mz-task"><div class="mz-task-head"><div><small class="muted">' + esc(c.group) + (c.lesson ? ' · ' + esc(c.lesson) : '') + '</small>' +
        '<h2>' + esc(c.term) + (uni && c.en ? ' <small class="muted">(' + esc(c.en) + ')</small>' : '') + '</h2></div>' +
        (best[c.id] != null ? '<span class="mz-best">Legjobb: <b>' + best[c.id] + '%</b></span>' : '') + '</div>' +
        '<label class="mz-lab" for="mz-txt">2. Magyarázd el a saját szavaiddal</label>' +
        '<p class="muted mz-hint">' + (uni ? 'Kb. 3–6 mondat. Mit jelent, mitől függ, mire jó, mi a tipikus példa? ' : 'Írj 3–5 mondatot: mi ez, hogyan működik, és mondj rá egy példát! ') +
        'A program <b>' + kg.groups.length + ' fontos elemet</b> keres' + (kg.hand ? ' (⭐ kézzel összeállított lista)' : ' (a definícióból automatikusan kinyerve)') + '.</p>' +
        '<textarea id="mz-txt" class="mz-txt" rows="7" placeholder="' + (uni ? 'Például: „A … azt írja le, hogy …”' : 'Például: „Ez azt jelenti, hogy … Olyan, mint amikor …”') + '">' + esc(draft[c.id] || '') + '</textarea>' +
        '<div class="mz-row"><small class="muted" id="mz-cnt"></small><div class="mz-btns"><button type="button" class="btn" id="mz-show">👀 Csak a mintát mutasd</button><button type="button" class="btn primary" id="mz-go">✔ Értékelés</button></div></div></div>' +
        '<div id="mz-res"></div>';
      var ta = work.querySelector('#mz-txt'), cnt = work.querySelector('#mz-cnt');
      function count() { var n = words(ta.value).length; cnt.textContent = n + ' szó'; }
      ta.addEventListener('input', function () { count(); try { draft[c.id] = ta.value; S.store.set('magyarazd.draft', draft); } catch (e) { /* nem kritikus */ } });
      count();
      work.querySelector('#mz-go').addEventListener('click', function () {
        if (!ta.value.trim()) { ta.focus(); ta.classList.add('mz-shake'); setTimeout(function () { ta.classList.remove('mz-shake'); }, 500); return; }
        result(c, evaluate(c, ta.value, uni));
      });
      work.querySelector('#mz-show').addEventListener('click', function () { result(c, null); });
    }

    function result(c, r) {
      var box = work.querySelector('#mz-res'), html = '';
      if (r) {
        if (r.score > (best[c.id] || 0) || best[c.id] == null) { best[c.id] = Math.max(r.score, best[c.id] || 0); S.store.set('magyarazd', best); }
        var tone = r.score >= 80 ? 'ok' : r.score >= 50 ? 'mid' : 'low';
        var msg = r.score >= 80 ? (uni ? 'Kiváló – a lényeges elemek megvannak.' : 'Szuper! Ezt tényleg érted. 🎉')
          : r.score >= 50 ? (uni ? 'Jó alap, de néhány lényeges elem hiányzik.' : 'Jó úton jársz! Pár fontos dolog még kimaradt.')
          : (uni ? 'Hiányos: nézd át a mintát, majd fogalmazd meg újra.' : 'Még hiányos. Olvasd el a mintát, aztán próbáld újra a saját szavaiddal!');
        html += '<div class="card pad mz-result mz-' + tone + '"><div class="mz-score"><b>' + r.score + '%</b><span>' + r.hits + ' / ' + r.n + ' fontos elem</span></div>' +
          '<div class="mz-res-body"><p class="mz-msg"><b>' + msg + '</b></p>' +
          '<div class="mz-cols"><div><h3>✔ Említetted</h3>' + (r.hits ? '<ul class="mz-list mz-yes">' + r.res.filter(function (x) { return x.hit; }).map(function (x) { return '<li>' + esc(x.label) + '</li>'; }).join('') + '</ul>' : '<p class="muted">Egyik kulcselemet sem találtuk.</p>') + '</div>' +
          '<div><h3>✘ Hiányzik</h3>' + (r.hits < r.n ? '<ul class="mz-list mz-no">' + r.res.filter(function (x) { return !x.hit; }).map(function (x) { return '<li>' + esc(x.label) + '</li>'; }).join('') + '</ul>' : '<p class="muted">Semmi! 👏</p>') + '</div></div>' +
          (r.notes.length ? '<div class="note warn">' + r.notes.map(function (n) { return '<p>' + esc(n) + '</p>'; }).join('') + '</div>' : '') +
          '<p class="muted mz-tip">' + (r.example ? '💡 Példát is hoztál – ez a Feynman-technika lényege!' : '💡 Tipp: egy hétköznapi példa („Olyan, mint amikor…”) sokat segít a megértésben.') +
          ' <small>(Az értékelés kulcsszavas, tájékoztató jellegű: más szavakkal is lehet jó a magyarázatod.)</small></p></div></div>';
      }
      html += '<div class="card pad mz-model"><h3>📖 Mintamagyarázat</h3>' + S.md(modelText(c, uni)) +
        '<div class="mz-btns"><button type="button" class="btn" id="mz-again">↻ Újrafogalmazom</button><button type="button" class="btn primary" id="mz-next">Következő fogalom →</button>' +
        (c.href ? '<a class="btn" href="' + esc(c.href) + '">' + (c.def ? '📘 A lecke megnyitása' : '🎓 A fogalom részletesen') + '</a>' : '') + '</div></div>';
      box.innerHTML = html;
      box.querySelector('#mz-again').addEventListener('click', function () { var ta = work.querySelector('#mz-txt'); ta.focus(); ta.scrollIntoView({ block: 'center' }); });
      box.querySelector('#mz-next').addEventListener('click', function () {
        var pool = c.hand ? hand : (gmap[c.group] || all), nx = pool[Math.floor(Math.random() * pool.length)];
        choose(nx.id); window.scrollTo(0, main.querySelector('#mz-work').offsetTop - 80);
      });
      box.scrollIntoView({ behavior: 'smooth', block: 'start' });
      var opt = sel.querySelector('option[value="' + c.id.replace(/"/g, '') + '"]');
      if (opt && best[c.id] != null) opt.textContent = (c.hand ? '⭐ ' : '') + c.term + ' · ' + best[c.id] + '%';
    }

    if (cur) showTask(byId(cur));
    return true;
  }

  S.addRoute('magyarazd', { title: 'Magyarázd el!', nav: '', page: page });
})();
