/* Egyetem: Programozás (BSc) – szakszótár. */
(function () {
  var T = 'class="svg-text"', M = 'class="svg-muted"';
  var RED = '#e5484d', BLUE = '#2f7bf6', GREEN = '#2f9e6a', ORANGE = '#f08c2e', PURPLE = '#7c5cd6', TEAL = '#1aa3a3';

  /* ---------- rajzsegédek ---------- */
  function r1(v) { return Math.round(v * 10) / 10; }
  function head(x, y, ang, col, s) {
    s = s || 9;
    return '<path d="M' + r1(x) + ' ' + r1(y) + ' L' + r1(x - s * Math.cos(ang - 0.4)) + ' ' + r1(y - s * Math.sin(ang - 0.4)) + ' L' + r1(x - s * Math.cos(ang + 0.4)) + ' ' + r1(y - s * Math.sin(ang + 0.4)) + ' z" fill="' + col + '"/>';
  }
  function arrow(x1, y1, x2, y2, col, w, dash) {
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="' + col + '" stroke-width="' + (w || 2) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>' + head(x2, y2, Math.atan2(y2 - y1, x2 - x1), col);
  }
  // görbe nyíl (kvadratikus Bézier), a fej az érintő irányában
  function carrow(x1, y1, cx, cy, x2, y2, col, w) {
    return '<path d="M' + x1 + ' ' + y1 + ' Q' + cx + ' ' + cy + ' ' + x2 + ' ' + y2 + '" fill="none" stroke="' + col + '" stroke-width="' + (w || 2) + '"/>' + head(x2, y2, Math.atan2(y2 - cy, x2 - cx), col);
  }
  function txt(x, y, s, cls, size, anchor, extra) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + ' ' + (cls || T) + (extra ? ' ' + extra : '') + '>' + s + '</text>';
  }
  function ctxt(x, y, s, col, size, anchor, bold, mono) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + (bold ? ' font-weight="700"' : '') + ' fill="' + col + '" style="font-family:' + (mono ? 'monospace' : 'var(--font)') + '">' + s + '</text>';
  }
  function mono(x, y, s, cls, size, anchor) { return txt(x, y, s, cls || T, size || 12, anchor, 'font-family="monospace" style="font-family:monospace"'); }
  function box(x, y, w, h, stroke, fill, rx) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx === undefined ? 6 : rx) + '" fill="' + (fill || 'var(--surface)') + '" stroke="' + (stroke || 'var(--fg-2)') + '" stroke-width="1.8"/>';
  }
  function dot(x, y, col) { return '<circle cx="' + x + '" cy="' + y + '" r="4.5" fill="' + col + '"/>'; }

  /* ---------- 1. Rekurzió: a hívási verem fakt(4)-nél ---------- */
  var recSvg = (function () {
    var fr = [['main()', 'eredmény = fakt(4)', 'var(--fg-2)'], ['fakt(4)', 'n = 4 → 4 · fakt(3)', BLUE], ['fakt(3)', 'n = 3 → 3 · fakt(2)', BLUE], ['fakt(2)', 'n = 2 → 2 · fakt(1)', BLUE], ['fakt(1)', 'n = 1 → alapeset: 1', GREEN]];
    var ret = ['24', '6', '2', '1'];
    var s = '<svg viewBox="0 0 560 270">';
    fr.forEach(function (f, i) {
      var y = 220 - i * 46;
      s += box(110, y, 230, 38, f[2]) + ctxt(122, y + 16, f[0], f[2], 13, null, true, true) + mono(122, y + 32, f[1], M, 11);
      if (i > 0) s += carrow(345, y + 19, 385, y + 42, 345, y + 65, GREEN, 1.8) + ctxt(392, y + 47, 'return ' + ret[i - 1], GREEN, 12, null, true, true);
    });
    s += arrow(70, 250, 70, 40, 'var(--muted)', 1.5) + txt(60, 150, 'hívás: a verem nő', M, 11, 'middle', 'transform="rotate(-90 60 150)"') +
      txt(110, 22, 'verem teteje (az éppen futó hívás)', M, 11) + txt(480, 236, 'visszatérés:', T, 12, 'middle') + txt(480, 252, 'a keret törlődik', M, 11, 'middle') + '</svg>';
    return s;
  })();

  /* ---------- 2. Verem és kupac ---------- */
  var heapSvg = '<svg viewBox="0 0 560 290">' +
    txt(120, 22, 'VEREM (stack)', T, 13, 'middle', 'font-weight="700"') + txt(410, 22, 'KUPAC (heap)', T, 13, 'middle', 'font-weight="700"') +
    box(30, 34, 180, 110, 'var(--fg-2)', 'var(--surface)') + ctxt(40, 52, 'keret: main()', PURPLE, 12, null, true, true) +
    mono(44, 76, 'int x = 42') + mono(44, 100, 'Pont p =') + dot(130, 96, BLUE) + mono(44, 124, 'String s =') + dot(138, 120, ORANGE) +
    box(30, 152, 180, 84, 'var(--fg-2)', 'var(--surface)') + ctxt(40, 170, 'keret: rajzol(q)', PURPLE, 12, null, true, true) +
    mono(44, 194, 'Pont q =') + dot(130, 190, BLUE) + mono(44, 218, 'int i = 0') +
    txt(120, 256, '↑ automatikus, LIFO', M, 11, 'middle') + txt(120, 272, 'kilépéskor a keret eltűnik', M, 11, 'middle') +
    box(320, 50, 180, 50, BLUE, 'var(--surface)') + mono(332, 72, 'Pont {', T, 12) + mono(332, 90, '  x: 1.0, y: 2.0 }', T, 12) +
    box(320, 128, 180, 34, ORANGE, 'var(--surface)') + mono(332, 150, '"Szia, világ!"', T, 12) +
    box(320, 192, 180, 34, 'var(--muted)', 'var(--line)') + mono(332, 214, 'int[] {7, 8, 9}', M, 12) +
    ctxt(410, 244, 'senki nem mutat rá: szemét', RED, 11, 'middle') +
    carrow(134, 96, 260, 60, 318, 68, BLUE, 2) + carrow(134, 190, 270, 150, 318, 90, BLUE, 2) + carrow(142, 120, 250, 150, 318, 145, ORANGE, 2) +
    txt(410, 272, 'new: kézi vagy GC általi felszabadítás', M, 11, 'middle') + '</svg>';

  /* ---------- 3. Mutató és referencia ---------- */
  var refSvg = '<svg viewBox="0 0 560 230">' +
    box(30, 30, 110, 40) + mono(42, 55, 'a', T, 13) + mono(70, 55, '0x1A40', BLUE, 12) +
    box(30, 100, 110, 40) + mono(42, 125, 'b', T, 13) + mono(70, 125, '0x1A40', BLUE, 12) +
    box(30, 170, 110, 40) + mono(42, 195, 'c', T, 13) + mono(70, 195, 'null', RED, 12) +
    box(300, 60, 220, 60, BLUE) + ctxt(312, 54, 'cím: 0x1A40', BLUE, 11, null, false, true) +
    [0, 1, 2].map(function (i) { return '<rect x="' + (312 + i * 66) + '" y="72" width="60" height="36" rx="4" fill="' + BLUE + '" fill-opacity=".15" stroke="' + BLUE + '"/>' + mono(342 + i * 66, 95, String(i + 1), T, 14, 'middle'); }).join('') +
    arrow(140, 50, 296, 82, BLUE, 2.2) + arrow(140, 120, 296, 100, BLUE, 2.2) +
    '<line x1="140" y1="190" x2="190" y2="190" stroke="' + RED + '" stroke-width="2.2"/><path d="M190 178 v24 M196 183 v14 M202 187 v6" stroke="' + RED + '" stroke-width="2"/>' +
    txt(215, 194, 'sehova nem mutat', M, 12) +
    txt(300, 142, 'b = a  → csak a CÍM másolódik:', T, 12) + txt(300, 158, 'a és b ugyanazt a tömböt látja', M, 12) +
    txt(300, 174, '(aliasing): b[0] = 9 után a[0] is 9', M, 12) + '</svg>';

  /* ---------- 4. Érték és referencia szerinti átadás ---------- */
  var passSvg = '<svg viewBox="0 0 560 240">' +
    txt(135, 22, 'Érték szerint', T, 13, 'middle', 'font-weight="700"') + txt(415, 22, 'Referencia szerint', T, 13, 'middle', 'font-weight="700"') +
    '<line x1="275" y1="12" x2="275" y2="228" stroke="var(--line)" stroke-width="2"/>' +
    ctxt(20, 50, 'hívó', PURPLE, 11, null, true) + box(20, 56, 100, 36) + mono(30, 79, 'x = 5') +
    ctxt(150, 50, 'növel(n)', PURPLE, 11, null, true) + box(150, 56, 110, 36) + mono(160, 79, 'n = 5 → 6') +
    arrow(122, 74, 146, 74, GREEN, 2) + ctxt(134, 110, 'másolat', GREEN, 11, 'middle', true) +
    txt(135, 150, 'a hívás után x még mindig 5', M, 12, 'middle') + mono(135, 176, 'void növel(int n) { n++; }', M, 11, 'middle') +
    ctxt(295, 50, 'hívó', PURPLE, 11, null, true) + box(295, 56, 100, 36) + mono(305, 79, 'lista') + dot(360, 74, BLUE) +
    ctxt(430, 50, 'bővít(l)', PURPLE, 11, null, true) + box(430, 56, 110, 36) + mono(440, 79, 'l') + dot(470, 74, BLUE) +
    box(330, 140, 190, 38, BLUE) + mono(342, 164, '[1, 2, 3, 4]', T, 13) + ctxt(470, 164, '+4', GREEN, 13, null, true) +
    carrow(360, 74, 360, 110, 380, 137, BLUE, 2) + carrow(470, 74, 480, 110, 460, 137, BLUE, 2) +
    txt(415, 205, 'ugyanaz az objektum: a változás látszik', M, 12, 'middle') + mono(415, 224, 'void bővít(List l) { l.add(4); }', M, 11, 'middle') + '</svg>';

  /* ---------- 5. UML osztálydiagram ---------- */
  function cls(x, y, w, name, stereo, attrs, meths, col) {
    var hh = stereo ? 36 : 24, h = hh + 8 + attrs.length * 16 + 8 + meths.length * 16;
    var s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="3" fill="var(--surface)" stroke="' + col + '" stroke-width="2"/>' +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + hh + '" rx="3" fill="' + col + '" fill-opacity=".18" stroke="' + col + '" stroke-width="2"/>';
    if (stereo) s += txt(x + w / 2, y + 14, '«' + stereo + '»', M, 10, 'middle');
    s += ctxt(x + w / 2, y + hh - 7, name, col, 13, 'middle', true);
    var yy = y + hh + 4;
    attrs.forEach(function (a) { yy += 16; s += mono(x + 8, yy - 3, a, T, 11); });
    yy += 8; s += '<line x1="' + x + '" y1="' + (yy - 4) + '" x2="' + (x + w) + '" y2="' + (yy - 4) + '" stroke="' + col + '" stroke-width="1.2"/>';
    meths.forEach(function (m) { yy += 16; s += mono(x + 8, yy - 3, m, T, 11); });
    return { svg: s, h: h };
  }
  function inh(x1, y1, x2, y2, col, dashed) {
    var a = Math.atan2(y2 - y1, x2 - x1), bx = x2 - 14 * Math.cos(a), by = y2 - 14 * Math.sin(a);
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(bx) + '" y2="' + r1(by) + '" stroke="' + col + '" stroke-width="1.8"' + (dashed ? ' stroke-dasharray="6 4"' : '') + '/>' +
      '<path d="M' + r1(x2) + ' ' + r1(y2) + ' L' + r1(bx + 8 * Math.sin(a)) + ' ' + r1(by - 8 * Math.cos(a)) + ' L' + r1(bx - 8 * Math.sin(a)) + ' ' + r1(by + 8 * Math.cos(a)) + ' z" fill="var(--surface)" stroke="' + col + '" stroke-width="1.8"/>';
  }
  var umlSvg = (function () {
    var J = cls(185, 10, 190, 'Jármű', 'abstract', ['# sebesség: double'], ['+ gyorsít(dv: double)', '+ leírás(): String'], PURPLE);
    var A = cls(30, 150, 170, 'Autó', null, ['- rendszám: String'], ['+ leírás(): String'], BLUE);
    var K = cls(360, 150, 170, 'Kerékpár', null, ['- váltók: int'], ['+ leírás(): String'], BLUE);
    var E = cls(30, 290, 170, 'ElektromosAutó', null, ['- akku: double'], ['+ tölt(kWh: double)'], GREEN);
    var I = cls(360, 290, 170, 'Tölthető', 'interface', [], ['+ tölt(kWh: double)'], ORANGE);
    return '<svg viewBox="0 0 560 400">' + J.svg + A.svg + K.svg + E.svg + I.svg +
      inh(115, 150, 240, 10 + J.h, 'var(--fg-2)') + inh(445, 150, 320, 10 + J.h, 'var(--fg-2)') +
      inh(115, 290, 115, 150 + A.h, 'var(--fg-2)') + inh(200, 330, 360, 330, ORANGE, true) +
      txt(280, 322, 'megvalósítja', M, 11, 'middle') + txt(124, 270, 'örököl', M, 11) +
      txt(280, 392, 'Üres háromszög: öröklődés (folytonos) / interfész megvalósítása (szaggatott).', M, 11, 'middle') + '</svg>';
  })();

  /* ---------- 6. Git ágak ---------- */
  var gitSvg = (function () {
    var s = '<svg viewBox="0 0 560 232">', yM = 70, yF = 150;
    var main = [[50, 'a1f3'], [120, '7c2e'], [190, '9b04'], [330, 'e51d'], [450, 'c8a0']], feat = [[250, '3d7f'], [320, '41bb'], [390, 'f02a']];
    s += '<line x1="50" y1="' + yM + '" x2="450" y2="' + yM + '" stroke="' + BLUE + '" stroke-width="4"/>';
    s += '<path d="M190 ' + yM + ' C220 ' + yM + ' 220 ' + yF + ' 250 ' + yF + ' L390 ' + yF + ' C420 ' + yF + ' 420 ' + yM + ' 450 ' + yM + '" fill="none" stroke="' + GREEN + '" stroke-width="4"/>';
    main.forEach(function (c, i) { s += '<circle cx="' + c[0] + '" cy="' + yM + '" r="' + (i === 4 ? 11 : 9) + '" fill="var(--surface)" stroke="' + BLUE + '" stroke-width="3.5"/>' + mono(c[0], yM - 18, c[1], M, 11, 'middle'); });
    feat.forEach(function (c) { s += '<circle cx="' + c[0] + '" cy="' + yF + '" r="9" fill="var(--surface)" stroke="' + GREEN + '" stroke-width="3.5"/>' + mono(c[0], yF + 26, c[1], M, 11, 'middle'); });
    s += ctxt(500, yM + 5, 'main', BLUE, 13, null, true) + ctxt(30, yF + 5, 'feature/bejelentkezés', GREEN, 12, null, true) +
      '<rect x="420" y="' + (yM + 18) + '" width="60" height="20" rx="4" fill="' + ORANGE + '"/>' + ctxt(450, yM + 32, 'HEAD', '#fff', 11, 'middle', true) +
      mono(186, yF - 28, 'git switch -c', M, 11, 'end') + txt(450, 36, 'merge commit', M, 11, 'middle') +
      txt(30, 222, 'Minden kör egy commit (pillanatkép); a nyíl nélküli vonal a szülő felé mutat (balra).', M, 11) + '</svg>';
    return s;
  })();

  /* ---------- 7. Versenyhelyzet idővonala ---------- */
  var raceSvg = (function () {
    var s = '<svg viewBox="0 0 560 250">', yA = 60, yB = 130, yMem = 200;
    s += ctxt(20, yA + 5, 'A szál', BLUE, 13, null, true) + ctxt(20, yB + 5, 'B szál', ORANGE, 13, null, true) + txt(20, yMem + 5, 'számláló', T, 13, null, 'font-weight="700"');
    s += arrow(90, 232, 545, 232, 'var(--muted)', 1.5) + txt(545, 248, 'idő', M, 11, 'end');
    var ev = [[130, yA, 'olvas: 5', BLUE], [230, yB, 'olvas: 5', ORANGE], [330, yA, 'ír: 5+1 = 6', BLUE], [440, yB, 'ír: 5+1 = 6', ORANGE]];
    ev.forEach(function (e) {
      s += '<rect x="' + (e[0] - 48) + '" y="' + (e[1] - 16) + '" width="96" height="30" rx="6" fill="' + e[3] + '" fill-opacity=".18" stroke="' + e[3] + '" stroke-width="2"/>' + mono(e[0], e[1] + 4, e[2], T, 12, 'middle');
      s += '<line x1="' + e[0] + '" y1="' + (e[1] + 14) + '" x2="' + e[0] + '" y2="' + (yMem - 16) + '" stroke="' + e[3] + '" stroke-dasharray="3 3"/>';
    });
    [[130, '5'], [230, '5'], [330, '6'], [440, '6']].forEach(function (m) { s += box(m[0] - 18, yMem - 14, 36, 26, 'var(--fg-2)', 'var(--surface)', 4) + mono(m[0], yMem + 4, m[1], T, 13, 'middle'); });
    s += ctxt(495, yMem - 22, 'várt: 7', GREEN, 12, 'middle', true) + ctxt(495, yMem + 4, 'kapott: 6', RED, 12, 'middle', true) +
      txt(290, 22, 'A „számláló++” valójában három lépés: olvas, növel, ír.', M, 12, 'middle') + '</svg>';
    return s;
  })();

  /* ---------- 8. UTF-8 kódolás bájtjai ---------- */
  var utfSvg = (function () {
    var rows = [['A', 'U+0041', ['41'], '1 bájt (ASCII)'], ['ő', 'U+0151', ['C5', '91'], '2 bájt'], ['€', 'U+20AC', ['E2', '82', 'AC'], '3 bájt'], ['😀', 'U+1F600', ['F0', '9F', '98', '80'], '4 bájt']];
    var cols = ['#2f7bf6', '#2f9e6a', '#f08c2e', '#7c5cd6'];
    var s = '<svg viewBox="0 0 560 220">' + txt(30, 20, 'karakter', M, 11) + txt(90, 20, 'kódpont', M, 11) + txt(190, 20, 'UTF-8 bájtok (hexa)', M, 11);
    rows.forEach(function (r, i) {
      var y = 36 + i * 44;
      s += txt(42, y + 22, r[0], T, 20, 'middle') + mono(90, y + 21, r[1], T, 12);
      r[2].forEach(function (b, j) { s += '<rect x="' + (190 + j * 56) + '" y="' + y + '" width="50" height="30" rx="5" fill="' + cols[i] + '"/>' + ctxt(215 + j * 56, y + 20, b, '#fff', 13, 'middle', true, true); });
      s += txt(420, y + 20, r[3], M, 12);
    });
    s += txt(30, 214, 'Az első bájt eleje elárulja a hosszt: 0xxxxxxx, 110xxxxx, 1110xxxx, 11110xxx.', M, 11) + '</svg>';
    return s;
  })();

  STUDIE.addCourse({
    id: 'programozas',
    title: 'Programozás (BSc)',
    icon: '⌨️',
    color: '#2f7bf6',
    level: 'BSc 1–2. félév',
    description: 'Változóktól az objektumokig: memóriakezelés, OOP, verziókezelés, tesztelés és programozási paradigmák.',
    intro: 'A programozás alapkurzusok fogalmai nyelvfüggetlenek: ugyanaz a **verem**, **referencia**, **öröklődés** vagy **versenyhelyzet** jelenik meg C-ben, Javában, Pythonban vagy C#-ban. A példák többnyire Java- vagy Python-szerűek. Ha kíváncsi vagy, min fut mindez, nézz bele a [[processzor|processzor]] és az [[alaplap|alaplap]] modellbe; az algoritmusokról és adatszerkezetekről külön kurzus szól.',
    topics: [
      { id: 'alap', title: 'Alapfogalmak' },
      { id: 'memoria', title: 'Memória és adatok' },
      { id: 'oop', title: 'Objektumorientált programozás' },
      { id: 'fejlesztes', title: 'Szoftverfejlesztés' },
      { id: 'paradigmak', title: 'Paradigmák és párhuzamosság' }
    ],
    formulas: [
      {
        id: 'tomb-cim', title: 'Tömbelem címe', en: 'array element address',
        parts: [{ t: 'cím(a[i])', d: 'Az i-edik elem memóriacíme', unit: 'bájtcím' }, { t: '=' },
          { t: 'b', d: 'A tömb kezdőcíme (báziscím), a tömbváltozó/mutató értéke', unit: 'bájtcím' }, { t: '+' },
          { t: 'i', d: 'Index, 0-tól számozva', unit: 'db' }, { t: '·' },
          { t: 's', d: 'Egy elem mérete', unit: 'bájt', more: 'Pl. int: 4, double: 8, referencia 64 bites rendszeren: 8 bájt.' }],
        text: 'Ezért O(1) a tömb indexelése: egyetlen szorzás és összeadás, akármekkora a tömb. És ezért indul az index 0-ról: az első elem eltolása nulla.',
        example: 'int tömb (s = 4) a 1000-es címen: `a[5]` címe `1000 + 5 · 4 = 1020`. Kétdimenziós, sorfolytonos tömbnél (C, Java belső tömbje nem!) `cím(a[i][j]) = b + (i·m + j)·s`.'
      },
      {
        id: 'tomb-meret', title: 'Tömb memóriaigénye', en: 'array memory footprint',
        parts: [{ t: 'M', d: 'A tömb mérete a memóriában', unit: 'bájt' }, { t: '=' },
          { t: 'n', d: 'Elemek száma', unit: 'db' }, { t: '·' }, { t: 's', d: 'Egy elem mérete', unit: 'bájt' }, { t: '+' },
          { t: 'h', d: 'Fejléc (header): a futtatókörnyezet adminisztrációja', unit: 'bájt', more: 'C-ben 0, Javában tipikusan 16 bájt (objektumfejléc + hossz).' }],
        text: 'Objektumok tömbjénél (pl. Java `Integer[]`, Python lista) a tömb csak **referenciákat** tárol, maguk az objektumok külön foglalnak helyet a kupacon, saját fejléccel. Ez akár 4–5-ször több memória, mint a primitív tömb.',
        example: '1 millió `int` (4 B): `10⁶ · 4 B ≈ 4 MB`. Ugyanez `double`-lel 8 MB. Java `Integer[]`-ként: 8 B referencia + kb. 16 B objektum elemenként ≈ 24 MB.'
      },
      {
        id: 'egesz-tartomany', title: 'Előjeles egész típus értéktartománya', en: 'signed integer range',
        parts: [{ t: '−2^{n−1}', d: 'A legkisebb ábrázolható érték', unit: '–' }, { t: ' ≤ x ≤ ' },
          { t: '2^{n−1} − 1', d: 'A legnagyobb ábrázolható érték', unit: '–', more: 'A pozitív oldalon eggyel kevesebb szám fér el, mert a 0 is a „nem negatív” felére esik.' },
          { t: ',  n =' }, { t: 'n', d: 'A típus bitszáma', unit: 'bit', more: 'byte 8, short 16, int 32, long 64 bit (Java, C# esetén rögzítve).' }],
        text: 'Kettes komplemens ábrázolásból következik. Előjel nélküli (unsigned) típusnál a tartomány `0 … 2^n − 1`. A tartományból kilépés **túlcsordulás**: a legtöbb nyelvben csendben „körbefordul”.',
        example: '32 bites int: `−2 147 483 648 … 2 147 483 647`. Javában `Integer.MAX_VALUE + 1 == Integer.MIN_VALUE` igaz. 16 biten a tartomány −32 768 … 32 767.'
      },
      {
        id: 'veremigeny', title: 'Rekurzió veremigénye', en: 'stack usage of recursion',
        parts: [{ t: 'S', d: 'A rekurzió által elfoglalt veremterület', unit: 'bájt' }, { t: '≈' },
          { t: 'd', d: 'A legnagyobb rekurziós mélység (egyszerre aktív hívások száma)', unit: 'db' }, { t: '·' },
          { t: 'k', d: 'Egy veremkeret mérete: visszatérési cím, paraméterek, lokális változók', unit: 'bájt' }],
        text: 'Ha S meghaladja a szál vermének méretét (Linuxon alapból 8 MB, Windowson 1 MB), **veremtúlcsordulás** (stack overflow) történik. A futási idő a hívások **számától**, a veremigény a **mélységtől** függ: a fa alakú rekurziónál (Fibonacci) a kettő nagyon eltér.',
        example: '8 MB verem, 64 bájtos keret: `d_max ≈ 8 · 1024 · 1024 / 64 = 131 072` hívásmélység. A Python ennél jóval előbb, alapból 1000 mélységnél leállítja a rekurziót.'
      },
      {
        id: 'toltesi-tenyezo', title: 'Hasítótábla telítettségi (kitöltési) tényezője', en: 'hash table load factor',
        parts: [{ t: 'α', d: 'Kitöltési tényező: átlagosan ennyi elem jut egy rekeszre', unit: '–' }, { t: '=' },
          { t: 'n', d: 'Tárolt elemek száma', unit: 'db' }, { t: '/' }, { t: 'm', d: 'Rekeszek (bucketek) száma', unit: 'db' }],
        text: 'Láncolt hasítótáblában egy keresés várható költsége `O(1 + α)`. Ha α túl nagy lesz, a táblát átméretezik (általában duplázzák) és minden elemet újra elhelyeznek: ez egy lassú lépés, de amortizáltan a beszúrás O(1) marad.',
        example: 'A Java `HashMap` alapból 16 rekesszel indul és α = 0,75-nél duplázódik: a 13. elem beszúrásakor (12 / 16 = 0,75 után) 32 rekeszre nő. 750 elem 1000 rekeszben: `α = 0,75`.'
      }
    ],
    terms: [
      /* ----- Alapfogalmak ----- */
      { id: 'valtozo', term: 'Változó és értékadás', en: 'variable and assignment', topic: 'alap',
        short: 'Névvel ellátott tárhely, amely egy értéket tárol; az értékadás (=) ezt az értéket felülírja.',
        prereq: ['lecke:informatika/programozas'],
        text: 'Egy változónak van **neve** (azonosító), **típusa**, **értéke**, **címe** (hol van a memóriában) és **élettartama** (mikor létezik). Az `x = x + 1` nem matematikai egyenlet, hanem utasítás: „számold ki a jobb oldalt, és tedd x-be”.\n\nA **konstans** (`final`, `const`) értéke kezdőértékadás után nem változhat. Ez a hibák egy egész osztályát zárja ki, ezért ahol lehet, érdemes használni.\n\nStatikusan típusos nyelvekben (C, Java, C#) a változó típusa rögzített; dinamikusan típusosakban (Python, JavaScript) a változó csak egy név, amely bármilyen típusú értékre mutathat.',
        example: '`int a = 3; int b = a; a = 10;` után b értéke 3 marad: az értékadás az **értéket** másolta. Csere segédváltozóval: `t = a; a = b; b = t;`. Pythonban: `a, b = b, a`.',
        pitfall: 'Inicializálatlan változó: C-ben a lokális változó kezdőértéke „memóriaszemét”, Java és C# fordítási hibát ad. A `=` (értékadás) és `==` (összehasonlítás) összekeverése C-ben a `if (x = 0)` típusú, csendben hibás feltételhez vezet.',
        related: ['tipus', 'hatokor', 'mutato', 'verem-kupac'] },
      { id: 'tipus', term: 'Típus és kifejezés', en: 'data type and expression', topic: 'alap',
        short: 'A típus megmondja, milyen értékeket vehet fel egy adat és milyen műveletek értelmezettek rajta; a kifejezés operátorokból és operandusokból álló, kiértékelhető szerkezet.',
        prereq: ['lecke:informatika/szamrendszerek', 'digitalis-technika/kettes-komplemens'],
        text: '**Primitív típusok**: egész (`int`, `long`), lebegőpontos (`float`, `double`), logikai (`bool`), karakter (`char`). **Összetett típusok**: tömb, rekord/struktúra, osztály, lista.\n\nA **kifejezés** kiértékelése egy értéket ad, amelynek szintén van típusa. Az operátorok jelentése a típustól függ: `7 / 2` egészekre (C, Java) 3, lebegőpontosra 3,5. A kiértékelés sorrendjét a **precedencia** és az **asszociativitás** szabja meg; kétség esetén zárójel.\n\nA **típuskonverzió** lehet automatikus (int → double, „szélesítés”) vagy explicit (`(int) 3.7` → 3, csonkol). Erősen típusos nyelvben a fordító a legtöbb típushibát még futtatás előtt jelzi.',
        example: 'IEEE 754 double-ben `0.1 + 0.2 == 0.30000000000000004`, mert 0,1 kettes számrendszerben végtelen tört. Pénzt ezért egész centben vagy decimális típussal (`BigDecimal`, `decimal`) tárolunk. Egész osztás negatív számmal: C/Java `−7 / 2 = −3` (nulla felé kerekít), Python `−7 // 2 = −4` (lefelé).',
        pitfall: 'Lebegőpontos számokat ne hasonlíts `==`-vel; helyette `abs(a − b) < ε`. Egészeknél figyelj a túlcsordulásra: két nagy int szorzata már nem fér el int-ben, előbb long-ra kell alakítani.',
        formulas: ['egesz-tartomany'],
        related: ['valtozo', 'vezerlesi-szerkezet', 'karakterkodolas', 'osztaly-objektum'], models: ['processzor'] },
      { id: 'vezerlesi-szerkezet', term: 'Vezérlési szerkezetek', en: 'control structures', topic: 'alap',
        short: 'Az utasítások végrehajtási sorrendjét meghatározó szerkezetek: szekvencia, elágazás (if, switch) és ciklus (for, while).',
        prereq: ['lecke:informatika/algoritmusok'],
        text: 'A **Böhm–Jacopini-tétel** (1966) szerint minden algoritmus felírható csupán három szerkezettel:\n\n1. **szekvencia**: utasítások egymás után;\n2. **szelekció (elágazás)**: `if … else`, `switch` / `match`;\n3. **iteráció (ciklus)**: elöltesztelő (`while`), hátultesztelő (`do … while`), számlálós (`for`), bejáró (`for x in lista`).\n\nEzért nincs szükség a `goto`-ra (Dijkstra 1968: „Go To Statement Considered Harmful”), ez a **strukturált programozás** alapja. A `break` és `continue` a ciklusból való korai kilépésre / továbblépésre szolgál.\n\nCiklus helyességének bizonyítása **ciklusinvariánssal**: olyan állítás, amely minden iteráció elején igaz, és a ciklus végén a kívánt eredményt adja.',
        example: 'Összegzés tétele: `s = 0; for (i = 0; i < n; i++) s += a[i];`. Invariáns: a ciklusmag előtt s = a[0] + … + a[i−1]. Kilépéskor i = n, tehát s a teljes összeg.',
        pitfall: '„Egyel elcsúszás” (off-by-one): `i <= n` vs. `i < n`, a tömb utolsó indexe n − 1. Végtelen ciklus, ha a ciklusfeltétel változóját a mag nem változtatja.',
        related: ['tipus', 'fuggveny', 'rekurzio', 'imperativ-deklarativ', 'komplexitas'] },
      { id: 'fuggveny', term: 'Függvény (eljárás, metódus)', en: 'function (procedure, method)', topic: 'alap',
        short: 'Névvel ellátott, paraméterezhető kódrészlet, amely egy jól körülhatárolt feladatot végez, és (általában) értéket ad vissza.',
        prereq: ['lecke:informatika/programozas'],
        text: 'A függvény az **absztrakció** alapegysége: a hívónak csak a **szignatúrát** (név, paraméterek típusa, visszatérési típus) és a viselkedést kell ismernie, a megvalósítást nem.\n\n- **Formális paraméter**: a definícióban szereplő név (`n`).\n- **Aktuális paraméter (argumentum)**: a híváskor átadott érték (`fakt(5)`-ben az 5).\n- **Eljárás**: nincs visszatérési értéke (`void`); **metódus**: osztályhoz tartozó függvény.\n\nHíváskor a futtatókörnyezet egy **veremkeretet** (activation record) hoz létre a paramétereknek, a lokális változóknak és a visszatérési címnek; `return`-nél a keret törlődik.\n\nA **tiszta függvény** (pure function) eredménye csak a paraméterektől függ, és nincs **mellékhatása** (nem ír globális változót, fájlt, képernyőt). Ezt a legkönnyebb tesztelni.',
        example: '`int max(int a, int b) { return a > b ? a : b; }` tiszta függvény. A `print(x)` nem az: mellékhatása a kiírás. Egy jó függvény egy dolgot csinál, és a neve megmondja, mit (`szamolAtlag`, nem `feldolgoz2`).',
        pitfall: 'A függvény, amely a paraméterként kapott listát módosítja, váratlan mellékhatást okozhat a hívónál (lásd referencia szerinti átadás). Python csapda: a módosítható alapértelmezett paraméter (`def f(l=[])`) a hívások között megmarad!',
        related: ['hatokor', 'rekurzio', 'parameteratadas', 'verem-kupac', 'funkcionalis', 'unit-teszt'] },
      { id: 'hatokor', term: 'Hatókör és élettartam', en: 'scope and lifetime', topic: 'alap',
        short: 'A hatókör a programszöveg azon része, ahol egy név látható; az élettartam az az időszak, amíg a változó a memóriában létezik.',
        text: 'A legtöbb nyelv **lexikális (statikus) hatókört** használ: a név azt a deklarációt jelenti, amelyik a forráskódban körülötte, legbelül van. Szintek:\n\n- **blokk** (`{ … }` C, Java; Pythonban nincs blokkszintű hatókör!);\n- **függvény** (lokális változók);\n- **osztály** (mezők);\n- **modul / globális**.\n\nHa egy belső név ugyanúgy hívják, mint egy külsőt, **elfedi** (shadowing) azt. A lokális változó élettartama a függvényhívásig tart (veremkeret); a kupacon lévő objektum addig él, amíg elérhető.\n\nA **lezárás (closure)** olyan függvény, amely magával viszi a létrehozásakor látható külső változókat, így azok élettartama meghosszabbodik.',
        example: 'Pythonban: `x = 1` a modulban, a függvényben `x = 2` egy **új lokális** x-et hoz létre; a globálist csak `global x` után lehet módosítani. JavaScriptben `for (var i …)` után i a ciklus után is létezik, `let` esetén nem.',
        pitfall: 'A globális változók kényelmesek, de bárhonnan módosíthatók, ezért a hibák nehezen lokalizálhatók és a kód nehezen tesztelhető. Szálak esetén a megosztott globális állapot versenyhelyzetet okoz.',
        related: ['valtozo', 'fuggveny', 'verem-kupac', 'egysegbezaras', 'funkcionalis'] },
      { id: 'rekurzio', term: 'Rekurzió', en: 'recursion', topic: 'alap',
        short: 'Olyan függvény, amely (közvetlenül vagy közvetve) önmagát hívja; egy feladatot ugyanolyan, de kisebb részfeladatra vezet vissza.',
        prereq: ['algoritmusok/rekurzio', 'algoritmusok/verem-sor'],
        visual: recSvg, caption: 'fakt(4) kiszámítása: minden hívás új veremkeretet kap; az alapesettől visszafelé „gyűlik össze” az eredmény.',
        text: 'Két kötelező rész:\n\n1. **alapeset** (báziseset): itt a függvény már nem hív tovább, közvetlenül válaszol;\n2. **rekurzív lépés**: a feladatot kisebbre vezeti vissza, és így biztosan eléri az alapesetet.\n\nMinden aktív hívás egy veremkeretet foglal, ezért a veremigény a **rekurziós mélységgel** arányos. Minden rekurzió átírható ciklusra (szükség esetén explicit veremmel). A **farokrekurziót** (a rekurzív hívás az utolsó művelet) egyes fordítók ciklussá alakítják, ekkor a veremigény állandó.\n\nTermészetesen rekurzív feladatok: fák és könyvtárszerkezet bejárása, oszd meg és uralkodj algoritmusok, nyelvtani elemzés.',
        example: '`int fakt(int n) { return n <= 1 ? 1 : n * fakt(n - 1); }`. A naiv Fibonacci (`fib(n−1) + fib(n−2)`) fib(30)-hoz 2 692 537 hívást végez, a mélység viszont csak 30. Memoizálással (részeredmények tárolása) a hívások száma 31-re csökken.',
        pitfall: 'Hiányzó vagy el nem érhető alapeset → végtelen rekurzió → `StackOverflowError` / `RecursionError`. A naiv, fa alakú rekurzió exponenciális futási időt adhat, ha ugyanazokat a részfeladatokat újra és újra kiszámolja.',
        formulas: ['veremigeny'],
        related: ['fuggveny', 'verem-kupac', 'vezerlesi-szerkezet', 'komplexitas', 'funkcionalis'] },

      /* ----- Memória és adatok ----- */
      { id: 'verem-kupac', term: 'Verem és kupac memória', en: 'stack and heap memory', topic: 'memoria',
        short: 'A verem a függvényhívások automatikusan kezelt, LIFO-elvű memóriaterülete; a kupac a dinamikusan (new, malloc) foglalt, tetszőleges élettartamú objektumok helye.',
        prereq: ['algoritmusok/verem-sor', 'digitalis-technika/memoriahierarchia'],
        visual: heapSvg, caption: 'A veremben a lokális változók és a referenciák vannak, a kupacon maguk az objektumok. Amire semmi nem mutat, az szemét.',
        text: '**Verem (stack)**:\n\n- függvényhíváskor új keret kerül a tetejére, visszatéréskor lekerül;\n- foglalás és felszabadítás egyetlen mutatóléptetés: nagyon gyors;\n- mérete korlátos (néhány MB szálanként), a méretnek fordításkor ismertnek kell lennie.\n\n**Kupac (heap)**:\n\n- tetszőleges méret, futásidőben (`new`, `malloc`);\n- az objektum túlélheti az őt létrehozó függvényt;\n- lassabb foglalás, töredezettség; felszabadítás kézzel (`free`, `delete`) vagy szemétgyűjtővel.\n\nJavában és C#-ban a primitív lokális változók a veremben vannak, az objektumok mindig a kupacon; a változó csak a **referenciát** tárolja.',
        example: '`int[] a = new int[1000000];` → a referencia (8 B) a veremben, a 4 MB-os tömb a kupacon. Ugyanez C-ben lokális tömbként (`int a[1000000];`) 4 MB-ot foglalna a veremből, ami Windows 1 MB-os alapvermén azonnal túlcsordulást okoz.',
        pitfall: 'A „kupac” memóriaterület és a kupac **adatszerkezet** (prioritási sor) két külön dolog, csak a nevük azonos. C-ben lokális változó címét visszaadni (`return &x;`) súlyos hiba: a keret a visszatéréskor megszűnik (lógó mutató).',
        formulas: ['veremigeny', 'tomb-meret'],
        related: ['mutato', 'szemetgyujtes', 'rekurzio', 'fuggveny', 'hatokor', 'parameteratadas', 'valtozo'], models: ['alaplap'] },
      { id: 'mutato', term: 'Mutató és referencia', en: 'pointer and reference', topic: 'memoria',
        short: 'Olyan érték, amely egy másik adat memóriacímét (helyét) tárolja; rajta keresztül az adat közvetetten érhető el.',
        prereq: ['algoritmusok/lancolt-lista', 'algoritmusok/tomb'],
        visual: refSvg, caption: 'Két referencia ugyanarra a tömbre (aliasing), és egy null referencia, amely sehova sem mutat.',
        text: '**Mutató (pointer)** C-ben és C++-ban: valódi memóriacím, amellyel számolni is lehet. `&x` az x címe, `*p` a p által mutatott érték (dereferálás), `p + 1` a következő **elem** címe (a lépésköz az elemtípus mérete).\n\n**Referencia** Javában, C#-ban, Pythonban: biztonságosabb „fogantyú” egy objektumra; címaritmetika nincs, a futtatókörnyezet az objektumot akár át is helyezheti (a GC tömörítéskor). C++-ban a referencia (`int& r = x`) egy meglévő változó álneve.\n\nA **null** (nullptr, None) azt jelzi, hogy a referencia nem mutat semmire. Tony Hoare, a null feltalálója „milliárd dolláros hibának” nevezte; a modern nyelvek ezért opcionális típusokat vezetnek be (`Optional<T>`, `T?` Kotlinban és C#-ban).',
        example: 'Pythonban `a = [1, 2, 3]; b = a; b.append(4)` után `a` is `[1, 2, 3, 4]`, mert csak a referencia másolódott. Másolat: `b = a.copy()` (sekély) vagy `copy.deepcopy(a)` (mély). Összehasonlítás: `a == b` tartalom, `a is b` azonosság (Javában `equals` vs. `==`).',
        pitfall: 'Null dereferálás (`NullPointerException`, szegmentálási hiba); lógó mutató (felszabadított memóriára mutat); C-ben tömb túlindexelése, ami biztonsági rést (puffertúlcsordulás) okozhat.',
        formulas: ['tomb-cim'],
        related: ['verem-kupac', 'parameteratadas', 'szemetgyujtes', 'valtozo', 'osztaly-objektum'] },
      { id: 'parameteratadas', term: 'Érték és referencia szerinti átadás', en: 'pass by value vs. pass by reference', topic: 'memoria',
        short: 'Érték szerinti átadásnál a függvény az argumentum másolatát kapja; referencia szerintinél magát a változót (annak címét), így a módosítás a hívónál is látszik.',
        visual: passSvg, caption: 'Bal: a függvény a másolatot növeli, x változatlan. Jobb: a hívó és a függvény ugyanazt a listát látja.',
        text: '- **C**: mindig érték szerinti; „referencia szerinti” hatás mutató átadásával érhető el (`void f(int *p)`).\n- **C++**: mindkettő, `void f(int& x)` referencia szerinti; nagy objektumot `const T&`-ként adunk át, hogy ne másolódjon.\n- **C#**: alapból érték szerinti, `ref` / `out` kulcsszóval referencia szerinti.\n- **Java és Python**: mindig érték szerinti, de objektumoknál **a referencia értéke** másolódik (call by sharing). A függvény ezért módosíthatja az objektum tartalmát, de a hívó változóját nem állíthatja át másik objektumra.',
        example: 'Javában `void f(List<Integer> l) { l.add(4); }` a hívó listáját bővíti, de `void g(List<Integer> l) { l = new ArrayList<>(); }` a hívónál semmit sem változtat. Két egész cseréje (`swap(a, b)`) Javában függvénnyel nem oldható meg, C++-ban `swap(int& a, int& b)`-vel igen.',
        pitfall: 'A „Java referencia szerint adja át az objektumokat” állítás pontatlan: ha így lenne, a g függvény a hívó változóját is átállítaná. A mutálható (módosítható) argumentumok tartalmának megváltoztatása rejtett mellékhatás; dokumentáld, vagy készíts másolatot.',
        related: ['mutato', 'fuggveny', 'verem-kupac', 'funkcionalis'] },
      { id: 'szemetgyujtes', term: 'Szemétgyűjtés (garbage collection)', en: 'garbage collection', topic: 'memoria',
        short: 'Automatikus memóriakezelés: a futtatókörnyezet felismeri és felszabadítja azokat a kupacobjektumokat, amelyeket a program már nem tud elérni.',
        text: 'Egy objektum **élő**, ha a gyökerekből (verem változói, globális változók, regiszterek) referencialáncon elérhető; különben szemét. Fő technikák:\n\n- **referenciaszámlálás** (Python, Swift): minden objektum számolja, hányan mutatnak rá; 0-nál azonnal felszabadul. A körkörös hivatkozásokat külön kell kezelni.\n- **megjelöl és söpör** (mark and sweep): a gyökerekből bejárja a gráfot, a meg nem jelölt objektumokat felszabadítja.\n- **generációs GC** (Java, .NET): a legtöbb objektum fiatalon „hal meg”, ezért a fiatal generációt gyakran és olcsón, az öreget ritkán gyűjti.\n\nAz alternatíva a **kézi** memóriakezelés (C: `malloc` / `free`) vagy a **tulajdonosi rendszer** (C++ RAII és smart pointerek, Rust ownership), ahol a felszabadítás helye fordításkor ismert.',
        example: '`Pont p = new Pont(1, 2); p = new Pont(3, 4);` után az első Pont elérhetetlenné válik, a GC később felszabadítja. Pythonban `a = []; a.append(a)` körkörös hivatkozás: a referenciaszámláló nem tudná felszabadítani, ezért van mellette ciklusdetektáló gyűjtő is.',
        pitfall: 'GC mellett is lehet **memóriaszivárgás**: ha egy statikus listában, gyorsítótárban vagy eseményfigyelőben ott marad a referencia, az objektum élő marad. A GC szünetei (stop-the-world) valós idejű rendszerekben gondot okozhatnak.',
        related: ['verem-kupac', 'mutato', 'osztaly-objektum'] },
      { id: 'karakterkodolas', term: 'Karakterkódolás (ASCII, Unicode, UTF-8)', en: 'character encoding', topic: 'memoria',
        short: 'Szabály, amely a karaktereket számokká (kódpontokká), majd bájtsorozattá alakítja; ma a Unicode kódpontok UTF-8 kódolása az általános.',
        prereq: ['lecke:informatika/szamrendszerek', 'digitalis-technika/bit'],
        visual: utfSvg, caption: 'UTF-8: az ASCII karakterek 1 bájtosak, az ékezetes betűk 2, a többi 3 vagy 4 bájtot foglal.',
        text: '- **ASCII** (1963): 7 bit, 128 karakter (angol ábécé, számjegyek, írásjelek). Nincs benne „ő”.\n- **8 bites kódlapok** (Latin-2 / ISO 8859-2, Windows-1250): a magyar betűk a 128–255 tartományban, de kódlaponként másutt. Innen a „kalapos-ő” (õ, û) hibák.\n- **Unicode**: egyetlen táblázat a világ összes írásjelére, ~150 000 karakter, kódpont `U+0000 … U+10FFFF`.\n- **UTF-8**: változó hosszú (1–4 bájt) kódolás, ASCII-kompatibilis. Ma a web több mint 98%-a ezt használja. **UTF-16**: 2 vagy 4 bájt (Java és JavaScript belső stringje, Windows API).\n\nA **string** tehát nem bájttömb: a hossz lehet karakterben, kódpontban vagy bájtban értelmezve, és ezek eltérnek.',
        example: '„Árvíztűrő” 9 karakter, de UTF-8-ban 13 bájt (Á, í, ű, ő 2-2 bájt). JavaScriptben `"😀".length === 2`, mert az emoji UTF-16-ban két kódegység (surrogate pair).',
        pitfall: 'Ha egy UTF-8 fájlt Latin-2-ként olvasunk be, az „ő”-ből „Å‘” lesz (mojibake). Mindig add meg a kódolást fájl olvasásakor (`open(f, encoding="utf-8")`), és ne vágj stringet bájtpozíciónál.',
        related: ['tipus', 'mutato'] },

      /* ----- OOP ----- */
      { id: 'osztaly-objektum', term: 'Osztály és objektum', en: 'class and object', topic: 'oop',
        short: 'Az osztály egy típus „tervrajza” (adatmezők és metódusok); az objektum az osztály egy konkrét példánya saját állapottal.',
        text: 'Az objektumorientált programozás az adatot és a rajta dolgozó műveleteket egy egységbe szervezi. Egy objektumnak van:\n\n- **állapota** (mezők, attribútumok aktuális értéke);\n- **viselkedése** (metódusok);\n- **identitása** (két azonos állapotú objektum is különböző lehet).\n\nAz objektum létrehozása a **konstruktorral** történik (`new Auto("ABC-123")`), amely érvényes kezdőállapotba hozza. Az **osztályszintű (static)** mező és metódus nem példányhoz, hanem az osztályhoz tartozik (pl. `Math.sqrt`). A metóduson belül a `this` (Pythonban `self`) az aktuális objektumra hivatkozik.',
        example: '`class Pont { double x, y; Pont(double x, double y) { this.x = x; this.y = y; } double tav() { return Math.sqrt(x * x + y * y); } }`. `new Pont(3, 4).tav()` értéke 5.',
        pitfall: 'Javában az `==` két objektumnál az identitást vizsgálja; tartalmi egyenlőséghez `equals` kell, és ha felülírod, a `hashCode`-ot is felül kell írni, különben a HashMap/HashSet hibásan működik.',
        formulas: ['tomb-meret'],
        related: ['egysegbezaras', 'oroklodes', 'interfesz', 'polimorfizmus', 'mutato', 'szemetgyujtes', 'tipus'] },
      { id: 'egysegbezaras', term: 'Egységbezárás (enkapszuláció)', en: 'encapsulation', topic: 'oop',
        short: 'Az objektum belső állapotát elrejtjük, és csak jól definiált metódusokon keresztül engedjük elérni és módosítani.',
        text: 'Láthatósági szintek (Java): `private` (csak az osztályon belül), csomagszintű (alapértelmezett), `protected` (alosztályok is), `public` (mindenki). UML-ben: `-`, `~`, `#`, `+`. Pythonban konvenció: az `_` előtag jelzi a belső használatot.\n\nCélja az **invariánsok** védelme: olyan feltételek, amelyeknek az objektum teljes élete alatt teljesülniük kell (pl. a számlaegyenleg nem negatív). Ha a mező publikus, bárki megsértheti; ha csak a `kivesz()` metódus módosíthatja, az ellenőrzés egy helyen van.\n\nMellékhatásként a belső megvalósítás szabadon cserélhető a hívók módosítása nélkül: a nyilvános **interfész** a szerződés.',
        example: '`class Szamla { private long egyenleg; public void kivesz(long o) { if (o <= 0 || o > egyenleg) throw new IllegalArgumentException(); egyenleg -= o; } public long getEgyenleg() { return egyenleg; } }`.',
        pitfall: 'Az „automatikus getter-setter minden mezőre” nem egységbezárás: ha a setter ellenőrzés nélkül bármit beállít, a mező gyakorlatilag publikus. Módosítható belső lista visszaadása getterrel szintén kiszivárogtatja az állapotot (helyette másolat vagy csak olvasható nézet).',
        related: ['osztaly-objektum', 'interfesz', 'oroklodes', 'hatokor'] },
      { id: 'oroklodes', term: 'Öröklődés', en: 'inheritance', topic: 'oop',
        short: 'Egy osztály (alosztály) átveszi egy másik (ősosztály) mezőit és metódusait, kiegészítheti és felülírhatja őket; „egyfajta” (is-a) kapcsolat.',
        visual: umlSvg, caption: 'UML osztálydiagram: az Autó és a Kerékpár a Jármű absztrakt osztályból örököl, az ElektromosAutó az Autóból, és megvalósítja a Tölthető interfészt.',
        text: 'Az alosztály a `super` (`base`) kulcsszóval hívhatja az ős konstruktorát és metódusait. **Felülírás (override)**: az alosztály ugyanolyan szignatúrájú metódussal lecseréli az ős viselkedését. **Absztrakt osztály**: nem példányosítható, absztrakt metódusait az alosztálynak kell megvalósítania.\n\nJava és C# osztályok között csak **egyszeres** öröklődést enged (interfészből többet is); a C++ és a Python többszörös öröklődést is, ami a „gyémántproblémához” vezethet.\n\nA **Liskov-féle helyettesítési elv** (LSP): az alosztály objektuma mindenhol használható legyen, ahol az ősé, a program helyessége nélkül. Ha ez nem teljesül, az öröklődés rossz modell.',
        example: '`abstract class Jarmu { abstract String leiras(); }`, `class Auto extends Jarmu { String leiras() { return "Autó: " + rendszam; } }`. Egy `List<Jarmu>`-ben autók és kerékpárok vegyesen tárolhatók.',
        pitfall: 'Az öröklődést gyakran túlhasználják kódújrahasznosításra. „Előnyben a kompozíció az öröklődéssel szemben”: ha a kapcsolat „van neki egy” (has-a), mezőként tartalmazza a másik objektumot. Klasszikus hibás példa: a Négyzet a Téglalap alosztálya, de a setSzélesség megsérti az LSP-t.',
        related: ['osztaly-objektum', 'polimorfizmus', 'interfesz', 'egysegbezaras'] },
      { id: 'polimorfizmus', term: 'Polimorfizmus (többalakúság)', en: 'polymorphism', topic: 'oop',
        short: 'Ugyanaz a művelet (metódushívás) a hivatkozott objektum tényleges típusától függően más-más viselkedést eredményez.',
        text: 'Fajtái:\n\n- **altípusos (futásidejű)** polimorfizmus: a `jarmu.leiras()` hívás a változó statikus típusa (Jármű) helyett az objektum **dinamikus** típusának (Autó vagy Kerékpár) metódusát futtatja. Ezt **dinamikus kötésnek** (late binding) nevezzük, a háttérben virtuális metódustáblával (vtable).\n- **parametrikus** polimorfizmus: **generikusok** / sablonok, pl. `List<T>`, amely bármilyen elemtípussal működik.\n- **ad hoc** polimorfizmus: **túlterhelés (overloading)**, azonos nevű, eltérő paraméterlistájú metódusok, amelyek közül a fordító választ.\n\nA polimorfizmus teszi lehetővé, hogy egy algoritmus új típusokkal bővíthető legyen a meglévő kód módosítása nélkül (**nyitott–zárt elv**).',
        example: '`for (Jarmu j : jarmuvek) System.out.println(j.leiras());` minden elemre a saját leírását írja ki, `if (j instanceof Auto)` típusvizsgálat nélkül. Egy új Roller osztály hozzáadásához ezt a ciklust nem kell módosítani.',
        pitfall: 'Túlterhelés ≠ felülírás. A túlterhelt metódusok közül a választás a **statikus** típus alapján, fordításkor történik; `void f(Object o)` és `void f(String s)` közül egy `Object` típusú, de String értékű változóval az első hívódik.',
        related: ['oroklodes', 'interfesz', 'osztaly-objektum', 'esemenyvezerelt'] },
      { id: 'interfesz', term: 'Interfész', en: 'interface', topic: 'oop',
        short: 'Metódusszignatúrák gyűjteménye megvalósítás nélkül: egy „szerződés”, amelyet az azt megvalósító osztályok teljesíteni vállalnak.',
        text: 'Az interfész azt írja le, **mit** tud egy objektum, nem azt, **hogyan**. Egy osztály több interfészt is megvalósíthat (`class ElektromosAuto extends Auto implements Toltheto, Comparable<ElektromosAuto>`). Java 8 óta lehetnek benne `default` metódusok is.\n\n„Programozz interfészre, ne megvalósításra”: a változó típusa legyen az interfész (`List<String> l = new ArrayList<>();`), így a megvalósítás később cserélhető (`LinkedList`), és teszteléskor **mock** objektum adható át.\n\nDinamikusan típusos nyelvekben (Python) gyakran **duck typing** érvényesül: „ha úgy hápog, mint egy kacsa, akkor kacsa”. Nincs formális interfész, elég, ha a metódus létezik; Pythonban opcionálisan `Protocol` vagy absztrakt ősosztály (ABC) írja le.',
        example: 'A Java `Comparable<T>` interfész egyetlen metódusa `int compareTo(T o)`. Bármely osztály, amely megvalósítja, rendezhető a `Collections.sort`-tal, mert a rendező algoritmus csak az interfészt ismeri.',
        pitfall: 'A „kövér” interfészt (sok, egymáshoz lazán kapcsolódó metódus) nehéz megvalósítani. Az **interfész-szegregációs elv**: inkább több kicsi, célzott interfész.',
        related: ['oroklodes', 'polimorfizmus', 'egysegbezaras', 'osztaly-objektum', 'unit-teszt'] },

      /* ----- Szoftverfejlesztés ----- */
      { id: 'verziokezeles', term: 'Verziókezelés (git)', en: 'version control (git)', topic: 'fejlesztes',
        short: 'A forráskód változásainak nyilvántartása: ki, mikor, mit és miért módosított; lehetővé teszi a párhuzamos munkát és bármely korábbi állapot visszaállítását.',
        visual: gitSvg, caption: 'Egy funkcióág (feature branch) leágazik a main-ből, két commit után egy merge commit egyesíti a kettőt.',
        text: 'A **git** (Linus Torvalds, 2005) elosztott verziókezelő: minden fejlesztőnél a teljes történet megvan. Alapfogalmak:\n\n- **commit**: a projekt pillanatképe, egyedi SHA-azonosítóval, szülő(k)re mutatva;\n- **branch (ág)**: egy mozgatható címke egy commitra;\n- **HEAD**: az aktuálisan kivett állapot;\n- **staging area (index)**: a következő commitba szánt változások.\n\nTipikus munkamenet: `git switch -c uj-funkcio` → szerkesztés → `git add` → `git commit -m "…"` → `git push` → pull request / code review → **merge** a main-be. Ha két ág ugyanazt a sort módosította, **ütközés (merge conflict)** keletkezik, amelyet kézzel kell feloldani.\n\nA **rebase** a commitokat egy másik alapra „ülteti át”, így lineáris történetet ad, de átírja a történetet.',
        example: '`git log --oneline --graph` megmutatja az ábrán látható ággráfot. `git bisect` bináris kereséssel megtalálja azt a commitot, amely egy hibát bevezette: 1000 commit közül kb. `log₂ 1000 ≈ 10` lépésben.',
        pitfall: 'Soha ne commitolj jelszót, API-kulcsot (a történetből utólag is nehéz törölni), és már megosztott (pusholt) ágon ne használj `rebase`-t vagy `push --force`-t, mert a többiek története elágazik. A jó commit kicsi, egy logikai változás, és az üzenete a **miértet** is leírja.',
        related: ['unit-teszt', 'kodolasi-konvencio', 'hibakereses'] },
      { id: 'unit-teszt', term: 'Tesztelés és egységteszt (unit teszt)', en: 'testing and unit test', topic: 'fejlesztes',
        short: 'Automatikusan futtatható kód, amely egy kis programegység (függvény, osztály) viselkedését ellenőrzi adott bemenetekre ismert elvárt kimenettel.',
        text: 'A tesztpiramis szintjei alulról felfelé: sok gyors **egységteszt**, kevesebb **integrációs teszt** (komponensek együttműködése), kevés lassú **végponttól végpontig** (E2E) teszt.\n\nEgy jó egységteszt szerkezete **AAA**: Arrange (előkészítés), Act (végrehajtás), Assert (ellenőrzés). Legyen gyors, független (sorrendtől és más tesztektől), determinisztikus és olvasható. A külső függőségeket (adatbázis, hálózat) **mock** vagy **stub** objektum helyettesíti.\n\nFontos tesztesetek: tipikus érték, **határesetek** (0, 1, üres lista, maximum), hibás bemenet. **TDD** (tesztvezérelt fejlesztés): előbb a (bukó) teszt, aztán a kód, majd refaktorálás (piros–zöld–refaktor).\n\nA **lefedettség** (code coverage) azt méri, a kód hány százaléka futott a tesztek alatt; ez szükséges, de nem elégséges feltétel.',
        example: 'JUnit: `@Test void ures_lista_atlaga_kivetelt_dob() { assertThrows(IllegalArgumentException.class, () -> Stat.atlag(List.of())); }`. Pythonban pytest: `def test_fakt(): assert fakt(0) == 1 and fakt(5) == 120`.',
        pitfall: '„A tesztelés a hibák jelenlétét mutathatja meg, a hiányukat soha” (Dijkstra). A 100% lefedettség sem bizonyít helyességet. Ne a megvalósítás részleteit teszteld, hanem a viselkedést, különben minden refaktoráláskor törnek a tesztek.',
        related: ['hibakereses', 'verziokezeles', 'fuggveny', 'interfesz', 'kodolasi-konvencio'] },
      { id: 'hibakereses', term: 'Hibakeresés és debugger', en: 'debugging and debugger', topic: 'fejlesztes',
        short: 'A hibás működés okának szisztematikus felderítése; a debugger lehetővé teszi a program lépésenkénti futtatását és állapotának vizsgálatát.',
        text: 'A debugger alapfunkciói:\n\n- **töréspont (breakpoint)**: a futás megáll egy adott soron; **feltételes** töréspont csak ha egy feltétel teljesül;\n- **léptetés**: step over (következő sor), step into (belép a hívott függvénybe), step out (kilép belőle);\n- **változók és kifejezések figyelése** (watch), a **hívási verem** (call stack) megtekintése.\n\nSzisztematikus módszer:\n\n1. **Reprodukáld** a hibát megbízhatóan, minimális bemenettel.\n2. Fogalmazz meg **hipotézist** a hiba okáról.\n3. Ellenőrizd (debugger, naplózás, assert).\n4. Javítsd, és írj **regressziós tesztet**, amely ezt a hibát elkapja.\n\nA **stack trace** (veremnyomkövetés) kivételnél megmutatja a hívási láncot: alulról felfelé olvasva látszik, hogyan jutott a program a hibához.',
        example: 'Gumikacsa-módszer: soronként elmagyarázod a kódot egy (képzeletbeli) hallgatónak, és közben rájössz a hibára. Bináris keresés a kódban: ha egy 1000 soros feldolgozás végén rossz az eredmény, a közepén ellenőrizd a részeredményt, így kb. 10 lépésben behatárolható a hibás rész.',
        pitfall: 'A tünet helye ritkán azonos az ok helyével: a NullPointerException ott jelentkezik, ahol a null-t használják, nem ahol keletkezett. Ne „próbálgass” véletlenszerű módosításokkal; egyszerre egy dolgot változtass.',
        related: ['unit-teszt', 'verziokezeles', 'rekurzio', 'versenyhelyzet'] },
      { id: 'kodolasi-konvencio', term: 'Kódolási konvenciók és tiszta kód', en: 'coding conventions and clean code', topic: 'fejlesztes',
        short: 'A kód formázására, elnevezésére és szerkezetére vonatkozó egységes szabályok, amelyek a kódot olvashatóbbá és karbantarthatóbbá teszik.',
        text: 'A kódot sokkal többször olvassák, mint írják. Nyelvenkénti szabványok: Python **PEP 8**, Java Code Conventions / Google Java Style, C# .NET konvenciók.\n\nElnevezési stílusok: `camelCase` (Java változók, metódusok), `PascalCase` (osztályok), `snake_case` (Python függvények és változók), `UPPER_CASE` (konstansok).\n\nA tiszta kód néhány elve:\n\n- beszédes nevek (`hatralevoNapok`, nem `d`);\n- rövid függvények, egy felelősséggel;\n- **DRY** (Don\'t Repeat Yourself): ne másold a kódot, emeld ki függvénybe;\n- **KISS**: a legegyszerűbb működő megoldás;\n- a megjegyzés a **miértet** magyarázza, a mit a kódból látszódjon;\n- nincs „mágikus szám”: `MAX_PROBALKOZAS = 3` konstans.\n\nAz automatikus eszközök (formázó: Black, Prettier; statikus elemző/linter: pylint, ESLint, SonarLint) a stílusvitákat megszüntetik.',
        example: '`if (s > 18)` helyett `if (eletkor >= NAGYKORUSAG_HATARA)`. A `def f(l): return [x for x in l if x % 2 == 0]` ugyanaz, mint `def paros_elemek(szamok)`, de az utóbbiból azonnal kiderül, mit csinál.',
        pitfall: 'A konvenció lényege az egységesség: egy projekten belül a meglévő stílust kövesd, akkor is, ha mást szoksz meg. A túl sok megjegyzés elavul és félrevezet; a kód és a megjegyzés könnyen „elcsúszik” egymástól.',
        related: ['verziokezeles', 'unit-teszt', 'fuggveny'] },
      { id: 'komplexitas', term: 'Időbonyolultság röviden', en: 'time complexity (Big O)', topic: 'fejlesztes',
        short: 'Azt írja le, hogyan nő egy algoritmus lépésszáma (vagy memóriaigénye) a bemenet méretével; jelölése az O-jelölés.',
        prereq: ['algoritmusok/aszimptotikus-jeloles', 'algoritmusok/futasi-ido', 'algoritmusok/hasitotabla'],
        text: 'A gyakorlatban leggyakoribb osztályok, gyorsulási sorrendben: `O(1)` < `O(log n)` < `O(n)` < `O(n log n)` < `O(n²)` < `O(2ⁿ)`.\n\nProgramozói ökölszabályok:\n\n- egy ciklus n elemen: O(n); két egymásba ágyazott: O(n²);\n- minden lépésben feleződő tartomány (bináris keresés): O(log n);\n- jó rendezés: O(n log n);\n- tömb indexelése, hasítótábla keresése (átlagosan): O(1); lista `contains` / `in`: O(n).\n\nA konstans szorzók és az alacsonyabb rendű tagok elhagyhatók, ezért az O-jelölés a **nagy n**-re érvényes viselkedést mutatja. Ugyanez a **tárbonyolultságra** is értelmezett.',
        example: 'n = 10⁶ elemre, 10⁹ művelet/s sebességgel: O(n²) algoritmus `10¹² / 10⁹ = 1000 s` ≈ 17 perc, O(n log n) kb. `2·10⁷` művelet ≈ 0,02 s. Duplikátumkeresés két ciklussal O(n²), halmazzal (`set`) O(n).',
        pitfall: 'Rejtett ciklus: Pythonban `if x in lista` cikluson belül O(n²)-et ad, mert maga az `in` lineáris keresés; halmazzal O(1). String ismételt összefűzése ciklusban (`s += …`) sok nyelvben szintén négyzetes.',
        formulas: ['toltesi-tenyezo'],
        related: ['rekurzio', 'vezerlesi-szerkezet', 'unit-teszt'] },

      /* ----- Paradigmák ----- */
      { id: 'imperativ-deklarativ', term: 'Imperatív és deklaratív programozás', en: 'imperative vs. declarative programming', topic: 'paradigmak',
        short: 'Imperatív stílusban lépésenként leírjuk, HOGYAN változzon a program állapota; deklaratív stílusban azt írjuk le, MIT szeretnénk eredményül, a végrehajtás módját a rendszer választja.',
        text: '**Imperatív** paradigma: utasítások sorozata, változók, értékadás, ciklusok; a gép működéséhez (Neumann-architektúra) közel áll. Alfajai: **procedurális** (C, Pascal: függvényekre bontás) és **objektumorientált** (Java, C#).\n\n**Deklaratív** paradigma: a kívánt eredmény leírása. Példák:\n\n- **SQL**: `SELECT nev FROM hallgato WHERE atlag > 4.5 ORDER BY nev;` – az adatbázis dönti el, indexet használ-e;\n- **HTML / CSS**: mit jelenítsen meg, nem azt, hogyan rajzolja ki;\n- **logikai programozás** (Prolog): tények és szabályok, a rendszer következtet;\n- **funkcionális** programozás (Haskell);\n- konfigurációs nyelvek (YAML, Terraform), reguláris kifejezések.\n\nA mai nyelvek **többparadigmásak**: Pythonban, Javában, C#-ban, JavaScriptben mindkét stílus keverhető.',
        example: 'Imperatív: `s = 0; for x in lista: if x > 0: s += x`. Deklaratív: `s = sum(x for x in lista if x > 0)`. C#-ban LINQ: `lista.Where(x => x > 0).Sum()`.',
        pitfall: 'A deklaratív kód elrejti a végrehajtást, így a teljesítmény nem mindig nyilvánvaló: egy rosszul megírt SQL lekérdezés teljes táblát olvashat be. Ilyenkor a végrehajtási tervet (`EXPLAIN`) kell megnézni.',
        related: ['funkcionalis', 'vezerlesi-szerkezet', 'esemenyvezerelt', 'osztaly-objektum'] },
      { id: 'funkcionalis', term: 'Funkcionális programozás', en: 'functional programming', topic: 'paradigmak',
        short: 'Paradigma, amely a programot tiszta függvények kompozíciójaként építi fel, megváltoztathatatlan (immutábilis) adatokkal és mellékhatások nélkül.',
        prereq: ['analizis/lancszabaly'],
        text: 'Alapelvek:\n\n- **tiszta függvények**: azonos bemenetre mindig azonos kimenet, mellékhatás nélkül (hivatkozási átlátszóság);\n- **immutabilitás**: adatot nem módosítunk, hanem újat hozunk létre;\n- **elsőrendű és magasabb rendű függvények**: a függvény érték, átadható paraméterként és visszaadható (`map`, `filter`, `reduce`);\n- **rekurzió** a ciklusok helyett;\n- **lambda**, névtelen függvény: `x -> x * x`.\n\nNyelvek: Haskell (tisztán funkcionális, lusta kiértékelés), Lisp, Clojure, F#, Scala, Elixir; funkcionális elemek: Java Stream API, Python, JavaScript, Kotlin.\n\nElőnyei: könnyű tesztelni és párhuzamosítani (nincs megosztott, változó állapot, így nincs versenyhelyzet), a kód jól komponálható.',
        example: 'Java Stream: `lista.stream().filter(x -> x % 2 == 0).map(x -> x * x).reduce(0, Integer::sum)` a páros elemek négyzetösszege. A függvénykompozíció a matematikából ismert: `(f ∘ g)(x) = f(g(x))`.',
        pitfall: 'Az I/O (fájl, hálózat, képernyő) eleve mellékhatás; a funkcionális nyelvek ezt elkülönítik (Haskellben az IO monád), nem tüntetik el. Mély rekurzió farokrekurzió-optimalizálás nélkül (Java, Python) veremtúlcsorduláshoz vezet.',
        related: ['imperativ-deklarativ', 'fuggveny', 'rekurzio', 'parameteratadas', 'hatokor', 'parhuzamossag'] },
      { id: 'esemenyvezerelt', term: 'Eseményvezérelt programozás', en: 'event-driven programming', topic: 'paradigmak',
        short: 'A program futását külső vagy belső események (kattintás, billentyű, hálózati üzenet, időzítő) irányítják, amelyekre előre regisztrált eseménykezelők reagálnak.',
        text: 'A program magja egy **eseményhurok** (event loop): várakozik a következő eseményre, majd meghívja a hozzá tartozó **eseménykezelőt** (handler, callback, listener). Így működik minden grafikus felület (GUI), a böngészőben futó JavaScript, a Node.js szerver és a mikrokontrolleres megszakításkezelés is.\n\nKapcsolódó minták:\n\n- **megfigyelő (observer) minta**: az objektumok feliratkoznak egy eseményforrásra;\n- **callback** → **Promise / Future** → **async / await**: az aszinkron műveletek (hálózat, fájl) eredményének kezelése blokkolás nélkül.\n\nAz eseményhurok egyszálú: amíg egy kezelő fut, a többi esemény várakozik. Ezért a kezelőknek gyorsnak kell lenniük, a hosszú munkát háttérszálra vagy aszinkron műveletre kell bízni.',
        example: 'JavaScript: `gomb.addEventListener("click", () => szamlalo++);`. Ha egy kattintáskezelő 3 másodpercig számol, a teljes oldal „lefagy” erre az időre, mert az eseményhurok nem tud más eseményt (görgetés, rajzolás) feldolgozni.',
        pitfall: 'Az egymásba ágyazott callbackek („callback hell”) nehezen olvashatók; használj async/await-et. A fel nem iratkozott (le nem szedett) eseménykezelők memóriaszivárgást okoznak.',
        related: ['imperativ-deklarativ', 'parhuzamossag', 'polimorfizmus'] },
      { id: 'parhuzamossag', term: 'Párhuzamosság és szál', en: 'concurrency, parallelism and threads', topic: 'paradigmak',
        short: 'A szál (thread) egy folyamaton belüli önálló végrehajtási egység saját veremmel, de közös kupaccal; több szál egyidejű futásával a munka párhuzamosítható.',
        prereq: ['modell:processzor', 'digitalis-technika/cache'],
        text: '**Folyamat (process)**: futó program saját, elszigetelt címtartománnyal. **Szál**: egy folyamaton belül; a szálak a kupacot és a globális változókat **megosztják**, csak a vermük és regisztereik sajátok.\n\n- **Konkurencia (concurrency)**: több feladat átlapolódva halad (akár egy magon is, időosztással).\n- **Párhuzamosság (parallelism)**: több feladat ténylegesen egyszerre fut több processzormagon.\n\nSzinkronizációs eszközök: **zár / mutex** (egyszerre csak egy szál léphet a kritikus szakaszba), szemafor, **atomi műveletek**, szálbiztos adatszerkezetek, üzenetküldés (csatornák). Magasabb szintű absztrakciók: **szálkészlet (thread pool)**, futures, párhuzamos streamek.\n\nA gyorsulás korlátja az Amdahl-törvény: a soros rész szabja meg a maximumot.',
        example: 'Java: `Thread t = new Thread(() -> szamol()); t.start(); t.join();`. Egy 8 magos processzoron egy jól párhuzamosítható képfeldolgozás közel 8-szor gyorsabb lehet. A CPython GIL-je miatt viszont Pythonban a CPU-igényes szálak nem futnak valóban párhuzamosan; ilyenkor `multiprocessing` kell.',
        pitfall: '**Holtpont (deadlock)**: A szál tartja az 1. zárat és a 2.-ra vár, B szál tartja a 2.-at és az 1.-re vár. Megelőzés: a zárakat mindig azonos sorrendben szerezzük meg. Túl sok szál a váltások miatt lassít.',
        related: ['versenyhelyzet', 'esemenyvezerelt', 'funkcionalis', 'verem-kupac', 'hatokor'], models: ['processzor'] },
      { id: 'versenyhelyzet', term: 'Versenyhelyzet', en: 'race condition', topic: 'paradigmak',
        short: 'Hiba, amelynél a program eredménye a szálak (vagy folyamatok) nem determinisztikus ütemezési sorrendjétől függ, mert szinkronizálatlanul érnek el közös adatot.',
        visual: raceSvg, caption: 'Két szál ugyanazt a számlálót növeli. Mindkettő az 5-öt olvassa ki, így az egyik növelés elvész.',
        text: 'Az **adatverseny** (data race) feltétele: legalább két szál ugyanahhoz a memóriaterülethez fér hozzá, legalább egyikük ír, és nincs köztük szinkronizáció. A `szamlalo++` nem atomi: **olvasás → növelés → írás** három lépés, és a szálváltás bármelyik között bekövetkezhet.\n\nMegoldások:\n\n- **kölcsönös kizárás** zárral (`synchronized`, `lock`, mutex) a kritikus szakasz körül;\n- **atomi műveletek** (`AtomicInteger.incrementAndGet()`, compare-and-swap);\n- megosztott, változó állapot elkerülése: immutábilis adatok, szálanként saját részeredmény, majd összegzés;\n- üzenetküldés megosztott memória helyett.\n\nAz ilyen hibák **nem determinisztikusak**: a teszten ezerszer átmennek, éles terhelés alatt jelentkeznek, debuggerrel pedig gyakran eltűnnek („heisenbug”), mert a megállítás megváltoztatja az időzítést.',
        example: 'Két szál 1 000 000-szor növel egy közös int-et zár nélkül: az eredmény futásonként más és kevesebb, mint 2 000 000. `AtomicInteger`-rel vagy `synchronized` blokkal pontosan 2 000 000. Banki példa: két egyidejű 10 000 Ft-os kivét 15 000 Ft-os számláról, ha mindkettő a „van-e fedezet” ellenőrzés után vált.',
        pitfall: 'A `volatile` (Java) csak a láthatóságot garantálja, az atomicitást nem: a `volatile int` növelése is versenyhelyzet. Az „ellenőriz, majd cselekszik” (check-then-act, pl. `if (!map.containsKey(k)) map.put(k, v)`) minta zár nélkül szintén hibás.',
        related: ['parhuzamossag', 'hibakereses', 'funkcionalis', 'esemenyvezerelt'], models: ['processzor'] }
    ]
  });
})();
