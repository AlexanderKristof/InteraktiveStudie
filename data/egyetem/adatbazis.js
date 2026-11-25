/* Egyetem: Adatbázisok (BSc) – szakszótár. */
(function () {
  var T = 'class="svg-text"', M = 'class="svg-muted"';
  var FG = 'var(--fg-2)', BG = 'var(--stage)';
  var RED = '#e5484d', BLUE = '#2f7bf6', GREEN = '#2f9e6a', ORANGE = '#f08c2e', PURPLE = '#7c5cd6', TEAL = '#0e9aa7';

  /* ---------- rajzsegédek ---------- */
  function r1(v) { return Math.round(v * 10) / 10; }
  function sub(s) { return String(s).replace(/_([A-Za-z0-9áéíóöőúüű]+)/g, '<tspan baseline-shift="sub" font-size="75%">$1</tspan>'); }
  function txt(x, y, s, size, anchor, extra) {
    var muted = extra && extra.indexOf('muted') === 0;
    if (muted) extra = extra.slice(5);
    var cls = extra && /fill=/.test(extra) ? 'style="font-family:var(--font)"' : (muted ? M : T);
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + ' ' + cls + (extra ? ' ' + extra : '') + '>' + sub(s) + '</text>';
  }
  // kód jellegű szöveg (oszlopnevek): alsó index nélkül
  function code(x, y, s, size, anchor, extra) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-size="' + (size || 12) + '" font-family="var(--mono, monospace)"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + ' ' + (extra && /fill=/.test(extra) ? '' : T) + (extra ? ' ' + extra : '') + '>' + s + '</text>';
  }
  function head(x, y, ang, col, s) {
    s = s || 8;
    return '<path d="M' + r1(x) + ' ' + r1(y) + ' L' + r1(x - s * Math.cos(ang - 0.4)) + ' ' + r1(y - s * Math.sin(ang - 0.4)) + ' L' + r1(x - s * Math.cos(ang + 0.4)) + ' ' + r1(y - s * Math.sin(ang + 0.4)) + ' z" fill="' + col + '"/>';
  }
  function arrow(x1, y1, x2, y2, col, w) {
    col = col || FG;
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) + '" stroke="' + col + '" stroke-width="' + (w || 2) + '"/>' + head(x2, y2, Math.atan2(y2 - y1, x2 - x1), col);
  }
  function path(p, col, w) {
    col = col || FG;
    var n = p.length;
    return '<path d="' + p.map(function (q, i) { return (i ? 'L' : 'M') + r1(q[0]) + ' ' + r1(q[1]); }).join(' ') + '" fill="none" stroke="' + col + '" stroke-width="' + (w || 2) + '" stroke-linejoin="round"/>' +
      head(p[n - 1][0], p[n - 1][1], Math.atan2(p[n - 1][1] - p[n - 2][1], p[n - 1][0] - p[n - 2][0]), col);
  }
  /* Táblázat: o = { x, y, title, cols, rows, w: [oszlopszélességek], color, pk: [oszlopindexek], fk: [...], hl: { 'sor,oszlop': szín } } */
  function table(o) {
    var rh = 22, W = o.w.reduce(function (a, b) { return a + b; }, 0), col = o.color || BLUE, s = '';
    if (o.title) s += code(o.x, o.y - 8, o.title, 12, null, 'font-weight="700" fill="' + col + '"');
    s += '<rect x="' + o.x + '" y="' + o.y + '" width="' + W + '" height="' + rh + '" fill="' + col + '" opacity=".18"/>';
    var cx = o.x;
    o.cols.forEach(function (c, j) {
      var deco = (o.pk || []).indexOf(j) >= 0 ? ' text-decoration="underline" font-weight="700"' : ((o.fk || []).indexOf(j) >= 0 ? ' font-style="italic" font-weight="700"' : ' font-weight="700"');
      s += code(cx + 6, o.y + 15, c, 11, null, deco);
      o.rows.forEach(function (r, i) {
        var key = i + ',' + j, y = o.y + rh * (i + 1);
        if (o.hl && o.hl[key]) s += '<rect x="' + cx + '" y="' + y + '" width="' + o.w[j] + '" height="' + rh + '" fill="' + o.hl[key] + '" opacity=".22"/>';
        s += code(cx + 6, y + 15, r[j] == null ? 'NULL' : r[j], 11, null, r[j] == null ? 'fill="var(--muted)"' : '');
      });
      cx += o.w[j];
    });
    var H = rh * (o.rows.length + 1);
    s += '<rect x="' + o.x + '" y="' + o.y + '" width="' + W + '" height="' + H + '" fill="none" stroke="var(--line)" stroke-width="1.5"/>';
    for (var i = 1; i <= o.rows.length; i++) s += '<line x1="' + o.x + '" y1="' + (o.y + rh * i) + '" x2="' + (o.x + W) + '" y2="' + (o.y + rh * i) + '" stroke="var(--line)"/>';
    cx = o.x;
    for (var j = 0; j < o.w.length - 1; j++) { cx += o.w[j]; s += '<line x1="' + cx + '" y1="' + o.y + '" x2="' + cx + '" y2="' + (o.y + H) + '" stroke="var(--line)"/>'; }
    return s;
  }

  /* ---------- 1. Reláció anatómiája ---------- */
  var relSvg = '<svg viewBox="0 0 600 250">' +
    table({ x: 40, y: 70, cols: ['neptun', 'nev', 'szak', 'atlag'], w: [90, 130, 70, 70], pk: [0],
      rows: [['ABC123', 'Kiss Anna', 'MI', '4.52'], ['QWE456', 'Nagy Bence', 'VM', '3.87'], ['XYZ789', 'Tóth Csilla', 'MI', '4.10'], ['KLM321', 'Szabó Dávid', 'GI', '3.25']],
      hl: { '1,0': ORANGE, '1,1': ORANGE, '1,2': ORANGE, '1,3': ORANGE } }) +
    code(40, 30, 'hallgato(neptun, nev, szak, atlag)', 13, null, 'font-weight="700"') + txt(40, 50, 'relációséma: a reláció neve és attribútumai', 11, null, 'muted') +
    path([[460, 82], [404, 82]], BLUE, 1.8) + txt(466, 86, 'attribútum (oszlop)', 12, null, 'fill="' + BLUE + '"') +
    path([[460, 125], [404, 125]], ORANGE, 1.8) + txt(466, 122, 'sor (rekord, n-es)', 12, null, 'fill="' + ORANGE + '"') + txt(466, 137, 'egy hallgató adatai', 10, null, 'muted') +
    path([[460, 175], [404, 175]], PURPLE, 1.8) + txt(466, 172, 'tartomány: dom(atlag)', 12, null, 'fill="' + PURPLE + '"') + txt(466, 187, '= [1,00; 5,00]', 10, null, 'muted') +
    txt(40, 206 + 18, 'aláhúzva: elsődleges kulcs', 11, null, 'muted') + txt(220, 224, 'fok (attribútumok száma) = 4 · számosság (sorok száma) = 4', 11, null, 'muted') + '</svg>';

  /* ---------- 2. Idegen kulcs ---------- */
  var fkSvg = '<svg viewBox="0 0 600 230">' +
    table({ x: 20, y: 40, title: 'hallgato', cols: ['neptun', 'nev', 'szak_kod'], w: [84, 120, 84], pk: [0], fk: [2], color: BLUE,
      rows: [['ABC123', 'Kiss Anna', 'MI'], ['QWE456', 'Nagy Bence', 'VM'], ['XYZ789', 'Tóth Csilla', 'MI'], ['KLM321', 'Szabó Dávid', 'GI']],
      hl: { '0,2': GREEN, '1,2': GREEN, '2,2': GREEN, '3,2': GREEN } }) +
    table({ x: 400, y: 40, title: 'szak', cols: ['kod', 'megnevezes'], w: [56, 130], pk: [0], color: TEAL,
      rows: [['GI', 'Gazdaságinf.'], ['MI', 'Mérnökinf.'], ['VM', 'Villamosmérn.']], hl: { '0,0': GREEN, '1,0': GREEN, '2,0': GREEN } }) +
    path([[308, 51], [350, 51], [350, 51], [396, 51]], GREEN, 2.2) + txt(352, 40, 'hivatkozik', 11, 'middle', 'fill="' + GREEN + '"') +
    code(20, 172, 'INSERT … szak_kod = \'XX\'', 12, null, 'fill="' + RED + '"') + txt(20, 192, '→ elutasítva: nincs ilyen szak (hivatkozási integritás)', 11, null, 'fill="' + RED + '"') +
    code(400, 172, 'DELETE szak \'MI\'', 12, null, 'fill="' + ORANGE + '"') + txt(400, 192, '→ RESTRICT: tiltva, ha van rá', 11, null, 'fill="' + ORANGE + '"') + txt(400, 207, '   hivatkozás; CASCADE: törli azokat is', 11, null, 'fill="' + ORANGE + '"') + '</svg>';

  /* ---------- 3. ER-diagram (Chen-jelölés) ---------- */
  function ent(x, y, w, label, col) { return '<rect x="' + (x - w / 2) + '" y="' + (y - 20) + '" width="' + w + '" height="40" rx="3" fill="' + BG + '" stroke="' + col + '" stroke-width="2.5"/>' + txt(x, y + 5, label, 13, 'middle', 'font-weight="700"'); }
  function rel(x, y, label, col) { return '<path d="M' + (x - 50) + ' ' + y + ' L' + x + ' ' + (y - 28) + ' L' + (x + 50) + ' ' + y + ' L' + x + ' ' + (y + 28) + ' z" fill="' + BG + '" stroke="' + col + '" stroke-width="2.5"/>' + txt(x, y + 4, label, 12, 'middle', 'font-weight="700"'); }
  function attr(x, y, label, key, lx, ly) {
    var w = Math.max(54, label.length * 7.4 + 16);
    return '<line x1="' + lx + '" y1="' + ly + '" x2="' + x + '" y2="' + y + '" stroke="' + FG + '" stroke-width="1.5"/>' +
      '<ellipse cx="' + x + '" cy="' + y + '" rx="' + w / 2 + '" ry="14" fill="' + BG + '" stroke="' + FG + '" stroke-width="1.5"/>' +
      txt(x, y + 4, label, 11, 'middle', key ? 'text-decoration="underline"' : '');
  }
  var erSvg = '<svg viewBox="0 0 600 280">' +
    '<line x1="140" y1="150" x2="300" y2="150" stroke="' + FG + '" stroke-width="2"/><line x1="300" y1="150" x2="460" y2="150" stroke="' + FG + '" stroke-width="2"/>' +
    '<line x1="90" y1="150" x2="90" y2="224" stroke="' + FG + '" stroke-width="2"/><line x1="90" y1="224" x2="430" y2="224" stroke="' + FG + '" stroke-width="2"/>' +
    attr(40, 70, 'neptun', true, 90, 150) + attr(140, 70, 'név', false, 90, 150) +
    attr(470, 66, 'kód', true, 510, 150) + attr(560, 92, 'cím', false, 510, 150) + attr(565, 205, 'kredit', false, 510, 150) +
    attr(300, 78, 'jegy', false, 300, 150) + attr(530, 250, 'név', false, 430, 224) +
    ent(90, 150, 110, 'HALLGATÓ', BLUE) + rel(300, 150, 'FELVESZ', ORANGE) + ent(510, 150, 100, 'KURZUS', BLUE) +
    rel(240 + 50, 224, 'TARTOZIK', ORANGE) + ent(430, 224, 80, 'SZAK', BLUE) +
    txt(172, 142, 'N', 14, 'middle', 'font-weight="700" fill="' + RED + '"') + txt(430, 142, 'M', 14, 'middle', 'font-weight="700" fill="' + RED + '"') +
    txt(104, 196, 'N', 14, 'middle', 'font-weight="700" fill="' + RED + '"') + txt(366, 216, '1', 14, 'middle', 'font-weight="700" fill="' + RED + '"') +
    txt(20, 274, 'téglalap: egyedtípus · rombusz: kapcsolat · ellipszis: tulajdonság (aláhúzva: kulcs)', 11, null, 'muted') + '</svg>';

  /* ---------- 4. Anomáliák: redundáns tábla ---------- */
  var anomSvg = '<svg viewBox="0 0 600 240">' +
    table({ x: 20, y: 34, title: 'felvetel_regi', cols: ['neptun', 'nev', 'kurzus', 'cim', 'jegy'], w: [80, 110, 66, 150, 50], pk: [0, 2],
      rows: [['ABC123', 'Kiss Anna', 'AB1', 'Adatbázisok', '5'], ['ABC123', 'Kiss Anna', 'SZ1', 'Szabályozás', '4'], ['QWE456', 'Nagy Bence', 'AB1', 'Adatbázisok', '3'], ['XYZ789', 'Tóth Csilla', 'AB1', 'Adatbázisok', '4']],
      hl: { '0,1': ORANGE, '1,1': ORANGE, '0,3': PURPLE, '2,3': PURPLE, '3,3': PURPLE } }) +
    txt(490, 60, 'Módosítási', 12, null, 'font-weight="700" fill="' + PURPLE + '"') + txt(490, 75, 'a kurzuscímet', 10, null, 'muted') + txt(490, 88, '3 helyen kell átírni', 10, null, 'muted') +
    txt(490, 116, 'Beszúrási', 12, null, 'font-weight="700" fill="' + ORANGE + '"') + txt(490, 131, 'új kurzus nem vehető', 10, null, 'muted') + txt(490, 144, 'fel hallgató nélkül', 10, null, 'muted') +
    txt(490, 172, 'Törlési', 12, null, 'font-weight="700" fill="' + RED + '"') + txt(490, 187, 'Bence sorával az', 10, null, 'muted') + txt(490, 200, 'adatai is elvesznek', 10, null, 'muted') +
    txt(20, 176, 'Kulcs: (neptun, kurzus)', 11, null, 'muted') + txt(20, 192, 'Függések: neptun → nev, kurzus → cim, (neptun, kurzus) → jegy', 11, null, 'muted') +
    txt(20, 212, 'A nev és a cim csak a kulcs egy részétől függ:', 11, null, 'fill="' + RED + '"') + txt(20, 228, 'részleges függés, 2NF-sértés.', 11, null, 'fill="' + RED + '"') + '</svg>';

  /* ---------- 5. Normalizálás: felbontás ---------- */
  var normSvg = '<svg viewBox="0 0 600 250">' +
    code(20, 26, 'felvetel_regi(neptun, nev, kurzus, cim, jegy)', 12, null, 'font-weight="700" fill="' + RED + '"') + txt(20, 44, 'kulcs: (neptun, kurzus) · 1NF, de nem 2NF', 11, null, 'muted') +
    arrow(130, 54, 90, 86, FG, 1.8) + arrow(300, 54, 300, 86, FG, 1.8) + arrow(420, 54, 500, 86, FG, 1.8) +
    table({ x: 10, y: 104, title: 'hallgato', cols: ['neptun', 'nev'], w: [80, 106], pk: [0], color: BLUE, rows: [['ABC123', 'Kiss Anna'], ['QWE456', 'Nagy Bence'], ['XYZ789', 'Tóth Csilla']] }) +
    table({ x: 208, y: 104, title: 'felvetel', cols: ['neptun', 'kurzus', 'jegy'], w: [76, 64, 46], pk: [0, 1], fk: [], color: GREEN, rows: [['ABC123', 'AB1', '5'], ['ABC123', 'SZ1', '4'], ['QWE456', 'AB1', '3'], ['XYZ789', 'AB1', '4']] }) +
    table({ x: 406, y: 104, title: 'kurzus', cols: ['kurzus', 'cim'], w: [64, 122], pk: [0], color: TEAL, rows: [['AB1', 'Adatbázisok'], ['SZ1', 'Szabályozás']] }) +
    txt(20, 240, 'Minden tény egyszer szerepel; a felbontás veszteségmentes (a természetes illesztés visszaadja az eredetit).', 11, null, 'muted') + '</svg>';

  /* ---------- 6. JOIN-típusok (halmazábrák) ---------- */
  var joinSvg = '<svg viewBox="0 0 600 200"><defs>';
  for (var jn = 0; jn < 4; jn++) joinSvg += '<clipPath id="ab-jclip' + jn + '"><circle cx="' + (95 + jn * 140) + '" cy="90" r="44"/></clipPath>';
  joinSvg += '</defs>';
  [['INNER JOIN', 'i'], ['LEFT JOIN', 'l'], ['RIGHT JOIN', 'r'], ['FULL OUTER JOIN', 'f']].forEach(function (j, i) {
    var ax = 45 + i * 140, bx = 95 + i * 140, fill = BLUE;
    if (j[1] === 'l') joinSvg += '<circle cx="' + ax + '" cy="90" r="44" fill="' + fill + '" opacity=".55"/>';
    if (j[1] === 'r') joinSvg += '<circle cx="' + bx + '" cy="90" r="44" fill="' + fill + '" opacity=".55"/>';
    if (j[1] === 'f') joinSvg += '<g opacity=".55"><circle cx="' + ax + '" cy="90" r="44" fill="' + fill + '"/><circle cx="' + bx + '" cy="90" r="44" fill="' + fill + '"/></g>';
    if (j[1] === 'i') joinSvg += '<circle cx="' + ax + '" cy="90" r="44" fill="' + fill + '" opacity=".55" clip-path="url(#ab-jclip' + i + ')"/>';
    joinSvg += '<circle cx="' + ax + '" cy="90" r="44" fill="none" stroke="' + FG + '" stroke-width="2"/><circle cx="' + bx + '" cy="90" r="44" fill="none" stroke="' + FG + '" stroke-width="2"/>' +
      txt(ax - 18, 94, 'A', 14, 'middle', 'font-weight="700"') + txt(bx + 18, 94, 'B', 14, 'middle', 'font-weight="700"') +
      code(70 + i * 140, 160, j[0], 12, 'middle', 'font-weight="700"');
  });
  joinSvg += txt(70, 178, 'csak a párosítható sorok', 10, 'middle', 'muted') + txt(210, 178, 'A összes sora (+ NULL)', 10, 'middle', 'muted') +
    txt(350, 178, 'B összes sora (+ NULL)', 10, 'middle', 'muted') + txt(490, 178, 'mindkettő összes sora', 10, 'middle', 'muted') +
    txt(300, 22, 'A = hallgato, B = felvetel, illesztés a neptun oszlopon', 11, 'middle', 'muted') + '</svg>';

  /* ---------- 7. B+-fa ---------- */
  function node(x, y, keys, hl, cw) {
    cw = cw || 30;
    var w = keys.length * cw + 4, s = '<rect x="' + (x - w / 2) + '" y="' + y + '" width="' + w + '" height="26" rx="4" fill="' + (hl ? GREEN : BG) + '" fill-opacity="' + (hl ? '.2' : '1') + '" stroke="' + (hl ? GREEN : FG) + '" stroke-width="' + (hl ? 2.5 : 1.8) + '"/>';
    keys.forEach(function (k, i) {
      s += code(x - w / 2 + 2 + cw / 2 + i * cw, y + 18, String(k), 12, 'middle', 'font-weight="' + (hl ? 700 : 400) + '"');
      if (i) s += '<line x1="' + (x - w / 2 + 2 + i * cw) + '" y1="' + y + '" x2="' + (x - w / 2 + 2 + i * cw) + '" y2="' + (y + 26) + '" stroke="var(--line)"/>';
    });
    return s;
  }
  var bt = '<svg viewBox="0 0 600 220">';
  var midX = [110, 300, 490], leafKeys = [[5, 8], [12, 17], [24, 30], [35, 41], [45, 50], [58, 63], [70, 75], [80, 86], [92, 97]];
  midX.forEach(function (x, i) {
    bt += '<line x1="' + (270 + i * 30) + '" y1="46" x2="' + x + '" y2="86" stroke="' + (i === 1 ? GREEN : FG) + '" stroke-width="' + (i === 1 ? 2.5 : 1.5) + '"/>';
    for (var k = 0; k < 3; k++) {
      var lx = 34 + (i * 3 + k) * 66;
      bt += '<line x1="' + (x - 30 + k * 30) + '" y1="112" x2="' + (lx) + '" y2="150" stroke="' + (i === 1 && k === 1 ? GREEN : FG) + '" stroke-width="' + (i === 1 && k === 1 ? 2.5 : 1.2) + '"/>';
    }
  });
  bt += node(300, 20, [35, 70], true) + node(110, 86, [12, 24]) + node(300, 86, [45, 58], true) + node(490, 86, [80, 92]);
  leafKeys.forEach(function (lk, i) {
    var lx = 34 + i * 66;
    bt += node(lx, 150, lk, i === 4, 26);
    if (i < 8) bt += '<line x1="' + (lx + 28) + '" y1="163" x2="' + (lx + 37) + '" y2="163" stroke="var(--muted)" stroke-width="1.5"/>' + head(lx + 38, 163, 0, 'var(--muted)', 5);
  });
  bt += txt(20, 200, 'Keresés: 50 → gyökér (35 ≤ 50 < 70) → középső csúcs (45 ≤ 50 < 58) → levél: 3 lapolvasás.', 11, null, 'fill="' + GREEN + '"') +
    txt(20, 216, 'A levelek láncolva vannak: tartomány-lekérdezésnél (BETWEEN) elég végigsétálni rajtuk.', 11, null, 'muted') +
    txt(258, 37, 'gyökér', 10, 'end', 'muted') + txt(590, 78, 'belső csúcsok', 10, 'end', 'muted') + txt(590, 142, 'láncolt levelek', 10, 'end', 'muted') + '</svg>';

  /* ---------- 8. Holtpont: idővonal és várakozási gráf ---------- */
  var dlSvg = '<svg viewBox="0 0 600 240">' +
    txt(20, 64, 'T1', 14, null, 'font-weight="700" fill="' + BLUE + '"') + txt(20, 144, 'T2', 14, null, 'font-weight="700" fill="' + ORANGE + '"') +
    arrow(50, 60, 400, 60, 'var(--muted)', 1.5) + arrow(50, 140, 400, 140, 'var(--muted)', 1.5) + txt(400, 212, 'idő →', 11, 'end', 'muted');
  [[70, 60, 'X-zár(A) ✓', BLUE, false], [150, 140, 'X-zár(B) ✓', ORANGE, false], [230, 60, 'X-zár(B) ⏳', BLUE, true], [310, 140, 'X-zár(A) ⏳', ORANGE, true]].forEach(function (e, i) {
    dlSvg += '<rect x="' + (e[0] - 4) + '" y="' + (e[1] - 30) + '" width="86" height="22" rx="5" fill="' + (e[4] ? RED : e[3]) + '" opacity=".18"/>' +
      txt(e[0] + 39, e[1] - 14, e[2], 11, 'middle', 'font-weight="700"') + '<circle cx="' + (e[0] + 39) + '" cy="' + e[1] + '" r="4.5" fill="' + e[3] + '"/>' +
      txt(e[0] + 39, e[1] + 18, (i + 1) + '.', 10, 'middle', 'muted');
  });
  dlSvg += '<line x1="274" y1="60" x2="392" y2="60" stroke="' + RED + '" stroke-width="4" stroke-dasharray="6 4"/><line x1="354" y1="140" x2="392" y2="140" stroke="' + RED + '" stroke-width="4" stroke-dasharray="6 4"/>' +
    txt(340, 80, 'vár…', 10, 'middle', 'fill="' + RED + '"') + txt(375, 160, 'vár…', 10, 'middle', 'fill="' + RED + '"') +
    txt(200, 192, 'T1 a B-re vár (T2 fogja), T2 az A-ra vár (T1 fogja).', 11, 'middle', 'fill="' + RED + '"') +
    // várakozási gráf
    '<rect x="425" y="20" width="160" height="200" rx="10" fill="none" stroke="var(--line)"/>' + txt(505, 42, 'várakozási gráf', 12, 'middle', 'font-weight="700"') +
    '<circle cx="465" cy="120" r="24" fill="' + BLUE + '" opacity=".2" stroke="' + BLUE + '" stroke-width="2"/>' + txt(465, 125, 'T1', 13, 'middle', 'font-weight="700"') +
    '<circle cx="545" cy="120" r="24" fill="' + ORANGE + '" opacity=".2" stroke="' + ORANGE + '" stroke-width="2"/>' + txt(545, 125, 'T2', 13, 'middle', 'font-weight="700"') +
    '<path d="M480 100 Q505 76 528 100" fill="none" stroke="' + RED + '" stroke-width="2.2"/>' + head(528, 100, Math.atan2(24, 23), RED) +
    '<path d="M530 140 Q505 164 482 140" fill="none" stroke="' + RED + '" stroke-width="2.2"/>' + head(482, 140, Math.atan2(-24, -23), RED) +
    txt(505, 72, 'B-re vár', 10, 'middle', 'fill="' + RED + '"') + txt(505, 176, 'A-ra vár', 10, 'middle', 'fill="' + RED + '"') +
    txt(505, 200, 'kör = holtpont', 11, 'middle', 'font-weight="700" fill="' + RED + '"') + '</svg>';

  /* ---------- 9. Izolációs szintek mátrixa ---------- */
  var isoRows = [['READ UNCOMMITTED', 1, 1, 1], ['READ COMMITTED', 0, 1, 1], ['REPEATABLE READ', 0, 0, 1], ['SERIALIZABLE', 0, 0, 0]];
  var isoSvg = '<svg viewBox="0 0 600 200">' +
    txt(330, 30, 'piszkos olvasás', 12, 'middle', 'font-weight="700"') + txt(450, 22, 'nem megismételhető', 12, 'middle', 'font-weight="700"') + txt(450, 36, 'olvasás', 12, 'middle', 'font-weight="700"') + txt(555, 30, 'fantom', 12, 'middle', 'font-weight="700"');
  isoRows.forEach(function (r, i) {
    var y = 48 + i * 34;
    isoSvg += code(20, y + 22, r[0], 12, null, 'font-weight="700"');
    [330, 450, 555].forEach(function (x, j) {
      var bad = r[j + 1];
      isoSvg += '<rect x="' + (x - 46) + '" y="' + (y + 4) + '" width="92" height="26" rx="6" fill="' + (bad ? RED : GREEN) + '" opacity=".2"/>' +
        txt(x, y + 22, bad ? 'előfordulhat' : 'kizárt', 12, 'middle', 'font-weight="700" fill="' + (bad ? RED : GREEN) + '"');
    });
  });
  isoSvg += txt(20, 194, '↓ erősebb izoláció: kevesebb anomália, de több várakozás / megszakított tranzakció', 11, null, 'muted') + '</svg>';

  /* ---------- 10. CAP-háromszög ---------- */
  var capSvg = '<svg viewBox="0 0 600 250">' +
    '<path d="M300 40 L120 200 L480 200 z" fill="' + TEAL + '" fill-opacity=".08" stroke="' + FG + '" stroke-width="2"/>' +
    '<circle cx="300" cy="40" r="22" fill="' + BLUE + '"/>' + txt(300, 46, 'C', 16, 'middle', 'font-weight="700" fill="#fff"') +
    '<circle cx="120" cy="200" r="22" fill="' + GREEN + '"/>' + txt(120, 206, 'A', 16, 'middle', 'font-weight="700" fill="#fff"') +
    '<circle cx="480" cy="200" r="22" fill="' + ORANGE + '"/>' + txt(480, 206, 'P', 16, 'middle', 'font-weight="700" fill="#fff"') +
    txt(330, 30, 'konzisztencia: mindenki a legfrissebb adatot látja', 11, null, 'fill="' + BLUE + '"') +
    txt(120, 238, 'rendelkezésre állás: minden kérés választ kap', 11, 'middle', 'fill="' + GREEN + '"') +
    txt(480, 238, 'partíciótűrés: a hálózat kettészakadhat', 11, 'middle', 'fill="' + ORANGE + '"') +
    txt(420, 116, 'CP', 13, null, 'font-weight="700"') + txt(420, 132, 'HBase, ZooKeeper,', 10, null, 'muted') + txt(420, 145, 'etcd, MongoDB (alap)', 10, null, 'muted') +
    txt(180, 116, 'CA', 13, 'end', 'font-weight="700"') + txt(180, 132, 'egygépes RDBMS:', 10, 'end', 'muted') + txt(180, 145, 'csak partíció nélkül', 10, 'end', 'muted') +
    txt(300, 166, 'AP', 13, 'middle', 'font-weight="700"') + txt(300, 182, 'Cassandra, CouchDB, DynamoDB (alap)', 10, 'middle', 'muted') + '</svg>';

  /* ---------- 11. Csillagséma ---------- */
  function dimBox(x, y, title, cols, col) {
    var s = '<rect x="' + x + '" y="' + y + '" width="130" height="' + (26 + cols.length * 16) + '" rx="6" fill="' + BG + '" stroke="' + col + '" stroke-width="2"/>' +
      '<rect x="' + x + '" y="' + y + '" width="130" height="22" rx="6" fill="' + col + '" opacity=".2"/>' + code(x + 8, y + 16, title, 12, null, 'font-weight="700"');
    cols.forEach(function (c, i) { s += code(x + 8, y + 38 + i * 16, c, 11, null, i === 0 ? 'text-decoration="underline"' : ''); });
    return s;
  }
  var starSvg = '<svg viewBox="0 0 600 260">' +
    '<line x1="300" y1="130" x2="95" y2="50" stroke="' + FG + '" stroke-width="1.5"/><line x1="300" y1="130" x2="505" y2="50" stroke="' + FG + '" stroke-width="1.5"/>' +
    '<line x1="300" y1="130" x2="95" y2="210" stroke="' + FG + '" stroke-width="1.5"/><line x1="300" y1="130" x2="505" y2="210" stroke="' + FG + '" stroke-width="1.5"/>' +
    dimBox(20, 14, 'dim_ido', ['ido_id', 'datum', 'honap', 'negyedev', 'ev'], TEAL) +
    dimBox(450, 14, 'dim_termek', ['termek_id', 'nev', 'kategoria', 'marka'], TEAL) +
    dimBox(20, 170, 'dim_bolt', ['bolt_id', 'varos', 'regio'], TEAL) +
    dimBox(450, 170, 'dim_vevo', ['vevo_id', 'korcsoport', 'tagsag'], TEAL) +
    '<rect x="215" y="70" width="170" height="122" rx="6" fill="' + BG + '" stroke="' + ORANGE + '" stroke-width="2.5"/><rect x="215" y="70" width="170" height="22" rx="6" fill="' + ORANGE + '" opacity=".25"/>' +
    code(223, 86, 'tenyek_ertekesites', 12, null, 'font-weight="700"') +
    ['ido_id', 'termek_id', 'bolt_id', 'vevo_id'].map(function (c, i) { return code(223, 108 + i * 15, c, 11, null, 'font-style="italic"'); }).join('') +
    code(310, 108, 'darab', 11, null, 'font-weight="700" fill="' + ORANGE + '"') + code(310, 123, 'arbevetel', 11, null, 'font-weight="700" fill="' + ORANGE + '"') + code(310, 138, 'kedvezmeny', 11, null, 'font-weight="700" fill="' + ORANGE + '"') +
    txt(300, 214, 'ténytábla: mérőszámok + idegen kulcsok', 11, 'middle', 'fill="' + ORANGE + '"') + txt(300, 230, 'dimenziók: csoportosítási szempontok', 11, 'middle', 'fill="' + TEAL + '"') + '</svg>';

  STUDIE.addCourse({
    id: 'adatbazis',
    title: 'Adatbázisok',
    icon: '🗄️',
    color: '#0e9aa7',
    level: 'BSc 2–4. félév (programtervező, mérnökinformatikus, gazdaságinformatikus)',
    description: 'Relációs modell, tervezés és normalizálás, SQL, tranzakciók, indexek, NoSQL és adattárházak.',
    intro: 'Szinte minden alkalmazás mögött adatbázis áll: a Neptuntól a webshopig. A kurzus fogalmai a relációs modell elméletétől az SQL-en át a tranzakciókezelésig és a modern, elosztott rendszerekig vezetnek. Az indexek mögötti adatszerkezeteket az [[#/egyetem/algoritmusok|Algoritmusok és adatszerkezetek]] kurzus részletezi.',
    topics: [
      { id: 'rel', title: 'Relációs modell' },
      { id: 'terv', title: 'Tervezés és normalizálás' },
      { id: 'sql', title: 'SQL' },
      { id: 'tranz', title: 'Tranzakciók és teljesítmény' },
      { id: 'modern', title: 'Modern adatkezelés' }
    ],
    formulas: [
      {
        id: 'ff', title: 'Funkcionális függőség', en: 'functional dependency',
        parts: [{ t: 'X', d: 'Determináns: attribútumhalmaz a bal oldalon', unit: 'attribútumok' }, { t: '→' },
          { t: 'Y', d: 'Függő attribútumhalmaz: az X értéke egyértelműen meghatározza', unit: 'attribútumok' }, { t: '⇔ ∀' },
          { t: 't_1, t_2', d: 'A reláció bármely két sora (minden megengedett állapotban)', unit: 'sorok' }, { t: ': t_1[X] = t_2[X] ⇒ t_1[Y] = t_2[Y]' }],
        text: 'Ha két sor X-en megegyezik, akkor Y-on is meg kell egyeznie. A függőség a **séma tulajdonsága** (az üzleti szabályokból ered), nem egy konkrét táblapéldányé. Triviális, ha `Y ⊆ X`. Az Armstrong-axiómák (reflexivitás, bővíthetőség, tranzitivitás) segítségével a többi függés levezethető.',
        example: '`neptun → nev`: egy Neptun-kódhoz egyetlen név tartozik. Fordítva `nev → neptun` nem áll fenn, mert lehet két Kiss Anna.'
      },
      {
        id: 'lezart', title: 'Attribútumhalmaz lezárása', en: 'attribute closure',
        parts: [{ t: 'X^{+}', d: 'X lezártja: az összes attribútum, amely X-től (közvetve) függ', unit: 'attribútumok' }, { t: '= { A |' },
          { t: 'F', d: 'A sémára érvényes funkcionális függőségek halmaza', unit: '–' }, { t: '⊢ X → A }' }],
        text: 'Kiszámítása iteratív: kezdetben `X⁺ = X`; ha van olyan `U → V` függés, amelyre `U ⊆ X⁺`, akkor V-t hozzávesszük, amíg bővül. **X szuperkulcs, ha X⁺ az összes attribútumot tartalmazza**; kulcs, ha ráadásul minimális.',
        example: 'R(A, B, C, D, E), F = {A → B, B → C, CD → E}. `{A, D}⁺`: A, D → (A→B) B → (B→C) C → (CD→E) E, tehát `{A, D}⁺ = ABCDE`: AD kulcs. `{A}⁺ = ABC`, tehát A egyedül nem az.'
      },
      {
        id: 'harmadik-nf', title: 'Harmadik normálforma (3NF) feltétele', en: 'third normal form condition',
        parts: [{ t: '∀ X → A ∈ F^{+}', d: 'Minden nemtriviális funkcionális függőségre, ahol A egyetlen attribútum és A ∉ X', unit: '–' }, { t: ':' },
          { t: 'X szuperkulcs', d: 'X tartalmaz egy kulcsot', unit: '–' }, { t: '∨' },
          { t: 'A prím', d: 'A valamelyik kulcs része (prímattribútum)', unit: '–' }],
        text: 'Szemléletesen: minden nem kulcs attribútum „a kulcstól, az egész kulcstól és csak a kulcstól” függ. A 3NF kizárja a részleges (2NF-sértő) és a tranzitív függéseket. Mindig létezik veszteségmentes **és függőségőrző** 3NF-felbontás (szintézis algoritmus).',
        example: 'hallgato(neptun, nev, szak_kod, szak_nev) kulcsa neptun. A `szak_kod → szak_nev` függésben a szak_kod nem szuperkulcs, a szak_nev nem prím: **nem 3NF**. Felbontás: hallgato(neptun, nev, szak_kod) és szak(szak_kod, szak_nev).'
      },
      {
        id: 'bcnf-feltetel', title: 'Boyce–Codd normálforma (BCNF) feltétele', en: 'Boyce–Codd normal form condition',
        parts: [{ t: '∀ X → Y ∈ F^{+}', d: 'Minden nemtriviális funkcionális függőségre (Y ⊄ X)', unit: '–' }, { t: ':' },
          { t: 'X szuperkulcs', d: 'A bal oldal tartalmaz egy kulcsot', unit: '–' }],
        text: 'Szigorúbb a 3NF-nél: hiányzik a „vagy A prím” kiskapu. BCNF-ben minden függés bal oldala szuperkulcs, így funkcionális függésből adódó redundancia nem marad. Veszteségmentes BCNF-felbontás mindig létezik, de **nem mindig függőségőrző**.',
        example: 'oktatas(hallgato, targy, oktato), F = {(hallgato, targy) → oktato, oktato → targy}. Kulcsok: (hallgato, targy) és (hallgato, oktato). Az `oktato → targy` bal oldala nem szuperkulcs: 3NF (a targy prím), de nem BCNF.'
      },
      {
        id: 'szelektivitas', title: 'Szelektivitás', en: 'selectivity',
        parts: [{ t: 'sel(p)', d: 'A p feltétel szelektivitása: a sorok mekkora hányada teljesíti', unit: '0…1' }, { t: '=' },
          { t: '|σ_p(R)|', d: 'A feltételt teljesítő sorok száma', unit: 'sor' }, { t: '/' },
          { t: '|R|', d: 'A tábla összes sorának száma', unit: 'sor' }, { t: '≈ 1 /' },
          { t: 'V(R, a)', d: 'Az a oszlop különböző értékeinek száma; egyenlőségi feltétel (a = c) becslése egyenletes eloszlást feltételezve', unit: 'db' }],
        text: 'Az optimalizáló ezzel becsli a közbülső eredmények méretét, és dönt indexhasználatról, illesztési sorrendről. Pontosabb becsléshez **hisztogramot** tart fenn az oszlopok eloszlásáról (ezért fontos a statisztikák frissítése: `ANALYZE`). Kis szelektivitás (kevés találat) esetén éri meg az index.',
        example: '1 000 000 hallgató, 20 különböző szak: `szak = \'MI\'` becsült szelektivitása 1/20 = 0,05, azaz kb. 50 000 sor. A `neptun = \'ABC123\'` feltétel szelektivitása 1/1 000 000: egyetlen sor.'
      },
      {
        id: 'join-becsles', title: 'Illesztés eredményméretének becslése', en: 'join size estimation',
        parts: [{ t: '|R ⋈ S|', d: 'Az a attribútumon vett természetes illesztés sorainak száma', unit: 'sor' }, { t: '≈' },
          { t: '|R| · |S|', d: 'A két tábla sorszámának szorzata (a Descartes-szorzat mérete)', unit: 'sor' }, { t: '/ max(' },
          { t: 'V(R, a), V(S, a)', d: 'Az illesztő oszlop különböző értékeinek száma a két táblában', unit: 'db' }, { t: ')' }],
        text: 'Feltevés: az értékek egyenletesen oszlanak el, és a kisebb értékkészlet része a nagyobbnak. Idegenkulcs–elsődlegeskulcs illesztésnél ez pontosan a hivatkozó tábla sorszámát adja.',
        example: 'hallgato: 10 000 sor, felvetel: 200 000 sor, mindkettőben 10 000 különböző neptun: `10 000 · 200 000 / 10 000 = 200 000` sor, pontosan annyi, ahány felvétel van.'
      },
      {
        id: 'b-fa-magassag', title: 'B-fa magassága', en: 'B-tree height',
        parts: [{ t: 'h', d: 'A fa szintjeinek száma: egy kereséshez ennyi lapot (blokkot) kell beolvasni', unit: 'szint' }, { t: '≈ ⌈ log_' },
          { t: 'm', d: 'Elágazási tényező (fan-out): egy csúcs gyerekeinek száma, gyakorlatilag 100–1000', unit: 'db' }, { t: '' },
          { t: 'n', d: 'Az indexelt kulcsok (sorok) száma', unit: 'db' }, { t: '⌉' }],
        text: 'Mivel egy csúcs egy lemezlapot (pl. 8 KB) foglal, és sok kulcs fér el benne, a fa rendkívül lapos. A felső szinteket a puffer általában a memóriában tartja, így egy kereséshez gyakran csak 1–2 tényleges lemezolvasás kell.',
        example: 'm = 500, n = 10⁹ sor: `log₅₀₀ 10⁹ = 9 / 2,699 ≈ 3,33`, tehát **4 szint**. Bináris keresőfával ugyanez kb. 30 szint lenne.'
      },
      {
        id: 'cap', title: 'CAP-tétel', en: 'CAP theorem',
        parts: [{ t: 'P', d: 'Partíció: a hálózat kettészakad, a csomópontok egy része nem éri el a többit', unit: '–' }, { t: '⇒ ¬(' },
          { t: 'C', d: 'Konzisztencia (linearizálhatóság): minden olvasás a legutóbbi sikeres írást látja', unit: '–' }, { t: '∧' },
          { t: 'A', d: 'Rendelkezésre állás: minden működő csomóponthoz érkező kérés (hiba nélküli) választ kap', unit: '–' }, { t: ')' }],
        text: 'Brewer sejtése (2000), Gilbert és Lynch bizonyította (2002). Elosztott rendszerben partíció előfordulhat, ezért valójában a kérdés: **partíció esetén** konzisztenciát (CP) vagy rendelkezésre állást (AP) választunk. A **PACELC** kiegészítés szerint partíció nélkül (Else) is van választás: késleltetés (Latency) vagy konzisztencia.',
        example: 'Banki átutalás: inkább CP (hiba esetén elutasítás, de nincs kettős költés). Közösségi oldal lájkszámlálója: AP (elérhető marad, a számláló pár másodpercig eltérhet).'
      },
      {
        id: 'bnl-koltseg', title: 'Blokkos beágyazott ciklusú illesztés költsége', en: 'block nested loop join cost',
        parts: [{ t: 'C', d: 'Az illesztés becsült költsége lapolvasásokban', unit: 'I/O' }, { t: '≈' },
          { t: 'B(R)', d: 'A külső tábla lapjainak száma: egyszer olvassuk végig', unit: 'lap' }, { t: '+ ⌈' },
          { t: 'B(R) / (M − 2)', d: 'Hány külső „adagban” fér el R a memóriában: M memórialapból egy a belső tábla olvasásáé, egy a kimeneté', unit: 'db' }, { t: '⌉ ·' },
          { t: 'B(S)', d: 'A belső tábla lapjainak száma: minden külső adaghoz egyszer végigolvassuk', unit: 'lap', more: 'A kimenet kiírásának költségét (minden illesztési módszernél azonos) nem számoljuk.' }],
        text: 'Mindig a **kisebb** tábla legyen kívül: így kevesebb adag kell, és kevesebbszer olvassuk végig a nagyobbat. Ha a kisebb tábla teljesen elfér a memóriában (`B(R) ≤ M − 2`), a költség `B(R) + B(S)`, azaz mindkét táblát pontosan egyszer olvassuk.',
        example: 'B(R) = 500, B(S) = 1000, M = 102: `500 + ⌈500/100⌉ · 1000 = 500 + 5 · 1000 = 5500` I/O. Fordított sorrendben: `1000 + ⌈1000/100⌉ · 500 = 6000` I/O.'
      },
      {
        id: 'kvorum', title: 'Olvasási és írási kvórum', en: 'read/write quorum condition',
        parts: [{ t: 'W', d: 'Hány replikának kell megerősítenie egy írást, hogy sikeresnek számítson', unit: 'db' }, { t: '+' },
          { t: 'R', d: 'Hány replikától kérdez le egy olvasás (és a legújabb verziót választja)', unit: 'db' }, { t: '>' },
          { t: 'N', d: 'Az adatelem replikáinak száma', unit: 'db' }],
        text: 'Ha `W + R > N`, akkor bármely írási és bármely olvasási replikahalmaznak van közös eleme (skatulyaelv), így az olvasás legalább egy olyan replikát elér, amely a legutóbbi sikeres írást tartalmazza. Ha `W > N/2`, két írási halmaz is mindig átfed. Kisebb W gyorsabb írást, kisebb R gyorsabb olvasást ad.',
        example: 'N = 3, W = 2, R = 2: `2 + 2 = 4 > 3` – egy replika kiesése mellett írni és olvasni is lehet. N = 3, W = 1, R = 1: gyors, de egy olvasás lemaradt replikát is elérhet (végső konzisztencia).'
      }
    ],
    terms: [
      /* ----- Relációs modell ----- */
      { id: 'relacio', term: 'Reláció, attribútum, tartomány', en: 'relation, attribute, domain', topic: 'rel',
        short: 'A reláció sorok (n-esek) halmaza egy rögzített attribútumlistán; minden attribútum értékei egy tartományból (domain) származnak.',
        prereq: ['lecke:informatika/programozas', 'programozas/tipus'],
        visual: relSvg, caption: 'Egy reláció a gyakorlatban táblaként jelenik meg: a séma a fejléc, a sorok az adatok.',
        text: 'A **relációs modellt** E. F. Codd javasolta 1970-ben. Matematikailag a reláció a tartományok Descartes-szorzatának részhalmaza: `R ⊆ D_1 × D_2 × … × D_n`.\n\n- **Attribútum**: elnevezett oszlop (pl. neptun, nev).\n- **Tartomány** (domain): az attribútum lehetséges értékei, atomi (oszthatatlan) értékek, pl. 6 karakteres kód, 1–5 közötti szám.\n- **Sor** (rekord, n-es): egy entitás adatai.\n- **Séma**: a reláció neve és attribútumai, pl. `hallgato(neptun, nev, szak, atlag)`.\n- **Fok**: az attribútumok száma; **számosság**: a sorok száma.\n\nMivel halmazról van szó, a sorok sorrendje lényegtelen, és két egyforma sor nem lehet. A műveleteket a **relációs algebra** adja: szelekció (σ, sorok szűrése), projekció (π, oszlopok kiválasztása), illesztés (⋈), unió, különbség, átnevezés. Az SQL ezekre épül.',
        example: 'Ha a szak tartománya {GI, MI, VM} (3 érték), az atlag pedig 401 lehetséges érték 1,00 és 5,00 között, a `szak × atlag` Descartes-szorzat 3 · 401 = 1203 lehetséges párt tartalmaz. Egy konkrét reláció ennek csak egy kis részhalmaza.',
        pitfall: 'Az SQL-tábla nem pontosan reláció: megengedi az ismétlődő sorokat (ha nincs kulcs), és a NULL értéket. Ezért kell a `DISTINCT` kulcsszó, ha halmaz-szemantikát akarunk.',
        related: ['kulcs', 'integritas', 'select', 'er-modell', 'normalizalas'] },
      { id: 'kulcs', term: 'Szuperkulcs, kulcs, elsődleges kulcs', en: 'superkey, candidate key, primary key', topic: 'rel',
        short: 'A szuperkulcs olyan attribútumhalmaz, amely egyértelműen azonosít minden sort; a kulcs (kulcsjelölt) minimális szuperkulcs; ezek közül egyet választunk elsődleges kulcsnak.',
        text: '- **Szuperkulcs**: nincs két sor, amely ezeken az attribútumokon megegyezik. Az összes attribútum együtt mindig szuperkulcs.\n- **Kulcs** (kulcsjelölt, candidate key): olyan szuperkulcs, amelyből egyetlen attribútum sem hagyható el.\n- **Elsődleges kulcs** (primary key): a kulcsjelöltek közül kiválasztott, amelyre a többi tábla hivatkozik. Értéke nem lehet NULL.\n- **Alternatív kulcs**: a többi kulcsjelölt, SQL-ben `UNIQUE` megszorítással.\n\n**Természetes kulcs** a valóságból jön (adóazonosító, ISBN); **mesterséges** (surrogate) kulcs egy generált sorszám vagy UUID. Mesterséges kulcsot akkor érdemes választani, ha a természetes kulcs változhat vagy hosszú. Az **összetett kulcs** több attribútumból áll, pl. (neptun, kurzus) a felvételeknél.',
        example: 'hallgato(neptun, email, nev, szuletes): szuperkulcsok pl. {neptun}, {email}, {neptun, nev}. Kulcsjelöltek: {neptun} és {email}. Elsődleges kulcsnak a neptun-t választjuk, az email UNIQUE lesz. A {neptun, nev} szuperkulcs, de nem kulcs (a nev elhagyható).',
        pitfall: 'A kulcs a séma tulajdonsága, nem a pillanatnyi adatoké: attól, hogy most nincs két egyforma nevű hallgató, a nev még nem kulcs. Ugyanígy a „mindig egyedi” telefonszám sem jó kulcs, mert változhat és megosztható.',
        formulas: ['lezart'],
        related: ['relacio', 'idegen-kulcs', 'integritas', 'funkcionalis-fuggoseg', 'index'] },
      { id: 'idegen-kulcs', term: 'Idegen kulcs és hivatkozási integritás', en: 'foreign key, referential integrity', topic: 'rel',
        short: 'Az idegen kulcs egy tábla olyan attribútuma, amely egy másik (vagy ugyanazon) tábla kulcsára hivatkozik; értéke csak létező kulcsérték vagy NULL lehet.',
        visual: fkSvg, caption: 'A hallgato.szak_kod idegen kulcs a szak tábla elsődleges kulcsára mutat. Az adatbázis-kezelő nem enged „lógó” hivatkozást.',
        text: 'Az idegen kulcs valósítja meg a táblák közötti **kapcsolatot**: a relációs modellben nincsenek mutatók, csak értékek egyezése.\n\nA **hivatkozási integritás** azt jelenti, hogy minden nem NULL idegenkulcs-értékhez létezik a hivatkozott sor. Ha a hivatkozott sort törölnék vagy a kulcsát módosítanák, a viselkedés beállítható:\n\n- `RESTRICT` / `NO ACTION`: a művelet tiltott, amíg van rá hivatkozás;\n- `CASCADE`: a hivatkozó sorok is törlődnek (módosulnak);\n- `SET NULL` / `SET DEFAULT`: a hivatkozás NULL-ra (alapértékre) áll.\n\nAz önhivatkozó idegen kulcs hierarchiát ír le, pl. `dolgozo.fonok_id → dolgozo.id`.',
        example: '`CREATE TABLE hallgato (…, szak_kod CHAR(2) REFERENCES szak(kod) ON DELETE RESTRICT)`\n\nHa a szak táblában 3 szak van, a hallgato.szak_kod csak ezt a 3 értéket (vagy NULL-t) veheti fel. A „MI” szak nem törölhető, amíg 2 hallgató hivatkozik rá.',
        pitfall: 'A `CASCADE` kényelmes, de veszélyes: egy kategória törlése csendben akár több ezer termék és rendelési tétel törlését indíthatja el. Számlázási adatoknál inkább RESTRICT és logikai törlés (archivált jelző) ajánlott.',
        related: ['kulcs', 'integritas', 'er-modell', 'join', 'ddl'] },
      { id: 'integritas', term: 'Integritási megszorítások', en: 'integrity constraints', topic: 'rel',
        short: 'Szabályok, amelyeket az adatbázis minden állapotának teljesítenie kell; az adatbázis-kezelő kikényszeríti őket.',
        prereq: ['lecke:informatika/adatbiztonsag'],
        text: 'Fajtái:\n\n- **tartományi** (domain): típus, `NOT NULL`, `CHECK (jegy BETWEEN 1 AND 5)`;\n- **egyedi** (entitás-) integritás: az elsődleges kulcs egyedi és nem NULL;\n- **egyediség**: `UNIQUE` (pl. e-mail-cím);\n- **hivatkozási integritás**: idegen kulcs;\n- **általános** üzleti szabályok: összetett `CHECK`, **trigger**, illetve az SQL-szabvány szerinti assertion (ezt a legtöbb rendszer nem valósítja meg).\n\nA megszorítást a kiértékelés idejére is be lehet állítani: azonnali (minden utasítás után) vagy **halasztott** (`DEFERRABLE`, csak a tranzakció végén). Utóbbi kell például körkörös hivatkozásoknál.\n\nAz adatbázisban kikényszerített szabály akkor is véd, ha az adatot egy másik alkalmazás, script vagy kézi beavatkozás módosítja.',
        example: '`CHECK (atlag BETWEEN 1 AND 5)` mellett az `UPDATE hallgato SET atlag = 5.2 WHERE neptun = \'ABC123\'` utasítás hibával leáll, és az érintett sor változatlan marad.',
        pitfall: 'NULL és CHECK: a `CHECK (jegy >= 1)` feltétel NULL értékre UNKNOWN eredményt ad, amit a CHECK **elfogad**. Ha a mező kötelező, külön `NOT NULL` kell. Általában: `NULL = NULL` sem igaz, a NULL vizsgálata `IS NULL`-lal történik.',
        related: ['kulcs', 'idegen-kulcs', 'ddl', 'tranzakcio', 'relacio'] },

      /* ----- Tervezés és normalizálás ----- */
      { id: 'er-modell', term: 'Egyed-kapcsolat modell (ER) és számosság', en: 'entity–relationship model, cardinality', topic: 'terv',
        short: 'Fogalmi adatmodell: egyedtípusok, tulajdonságaik és a köztük lévő kapcsolatok, a kapcsolatok számosságával (1:1, 1:N, N:M).',
        visual: erSvg, caption: 'Chen-féle ER-diagram: egy hallgató több kurzust vehet fel és egy kurzust sokan, egy hallgató egy szakhoz tartozik.',
        text: 'Az ER-modellt (Peter Chen, 1976) a tervezés első lépésében használjuk, még az adatbázis-kezelő kiválasztása előtt.\n\n- **Egyed** (entitás): a valóság megkülönböztethető dolga (hallgató, kurzus); **egyedtípus** a hasonló egyedek osztálya.\n- **Tulajdonság** (attribútum): lehet összetett (cím: irányítószám, város, utca), többértékű (telefonszámok) vagy származtatott (életkor a születési dátumból).\n- **Kapcsolat**: egyedek közötti viszony, saját tulajdonsága is lehet (pl. jegy a felvételen).\n\nA kapcsolat **számossága**:\n\n- **1:1**: egy személyhez egy személyi igazolvány;\n- **1:N**: egy szakhoz sok hallgató, egy hallgató egy szakhoz;\n- **N:M**: hallgató–kurzus.\n\nA **részvétel** lehet kötelező (minden hallgatónak van szakja) vagy opcionális. A **gyenge egyed** nem azonosítható önmagában (pl. egy rendelés tétele csak a rendeléssel együtt).\n\nLeképezés relációkra: minden egyedből tábla; 1:N kapcsolatból idegen kulcs az „N” oldalon; **N:M kapcsolatból külön kapcsolótábla** a két kulccsal (ez itt a felvetel tábla).',
        example: 'A fenti diagramból 4 tábla lesz: hallgato(neptun, nev, szak_kod), szak(kod, nev), kurzus(kod, cim, kredit), felvetel(neptun, kurzus_kod, jegy). A felvetel kulcsa az összetett (neptun, kurzus_kod), és mindkét oszlop idegen kulcs.',
        pitfall: 'Az N:M kapcsolatot nem lehet egy idegen kulccsal megoldani: ha a hallgato táblába tennénk egy kurzus_kod oszlopot, egy hallgató csak egy kurzust vehetne fel, ha pedig vesszővel elválasztott listát írunk bele, az sérti az 1NF-et.',
        related: ['idegen-kulcs', 'kulcs', 'normalizalas', 'relacio', 'join'] },
      { id: 'funkcionalis-fuggoseg', term: 'Funkcionális függőség', en: 'functional dependency', topic: 'terv',
        short: 'X → Y: az X attribútumok értéke egyértelműen meghatározza az Y attribútumok értékét.',
        prereq: ['lecke:matematika/linearis-fuggveny'],
        text: 'A funkcionális függőség (FF) a normalizálás alapfogalma: azt rögzíti, milyen tényeket tárol a séma. Ha `X → Y`, akkor ugyanazt az X-értéket tartalmazó sorokban az Y-érték ismétlődik: ez a **redundancia** forrása, ha X nem kulcs.\n\n**Armstrong-axiómák** (helyesek és teljesek):\n\n1. reflexivitás: ha `Y ⊆ X`, akkor `X → Y`;\n2. bővíthetőség: ha `X → Y`, akkor `XZ → YZ`;\n3. tranzitivitás: ha `X → Y` és `Y → Z`, akkor `X → Z`.\n\nTovábbi fogalmak: **részleges függés** (a kulcs egy valódi részétől függ), **tranzitív függés** (kulcs → nem kulcs → nem kulcs), **minimális fedés** (a függések egyszerűsített, ekvivalens halmaza).',
        example: 'felvetel_regi(neptun, nev, kurzus, cim, jegy) függései: `neptun → nev`, `kurzus → cim`, `(neptun, kurzus) → jegy`. A lezárás: `{neptun, kurzus}⁺` = minden attribútum, tehát (neptun, kurzus) kulcs. A `neptun → nev` részleges függés.',
        pitfall: 'A függőséget nem a mintaadatokból kell kiolvasni: ha a táblában véletlenül minden kurzusnak más a kreditje, abból még nem következik, hogy `kredit → kurzus`. A függés üzleti szabály.',
        formulas: ['ff', 'lezart'],
        related: ['normalizalas', 'bcnf', 'kulcs', 'anomaliak'] },
      { id: 'anomaliak', term: 'Módosítási, beszúrási és törlési anomália', en: 'update, insertion and deletion anomalies', topic: 'terv',
        short: 'Rosszul tervezett, redundáns sémában fellépő hibák: egy tény több helyen szerepel, vagy csak más tényekkel együtt tárolható.',
        visual: anomSvg, caption: 'Egyetlen nagy táblában a hallgató neve és a kurzus címe sokszor ismétlődik: ez háromféle anomáliához vezet.',
        text: 'Ha egy táblában több, egymástól független tény keveredik, a redundancia három gondot okoz:\n\n- **módosítási anomália**: egy tényt (pl. kurzuscímet) több sorban kell átírni; ha egy kimarad, az adatbázis ellentmondásos lesz;\n- **beszúrási anomália**: egy tényt nem lehet rögzíteni egy másik nélkül (új kurzus nem vehető fel, amíg senki nem jelentkezett rá, mert a kulcs része, a neptun nem lehet NULL);\n- **törlési anomália**: egy sor törlésével olyan információ is elvész, amit meg akartunk tartani (Bence egyetlen felvételét törölve a neve is eltűnik).\n\nA normalizálás célja ezek kiküszöbölése felbontással.',
        example: 'A felvetel_regi táblában 1000 hallgató átlag 8 kurzusfelvétellel 8000 sort jelent. Ha egy 300 fős kurzus címe megváltozik, 300 sort kell módosítani; normalizált sémában 1-et.',
        pitfall: 'A redundancia nem mindig hiba: adattárházakban és gyorsítótárakban szándékosan **denormalizálnak** a gyorsabb olvasásért. Ilyenkor viszont a konzisztencia fenntartása (pl. triggerrel vagy betöltési folyamattal) a tervező felelőssége.',
        related: ['normalizalas', 'funkcionalis-fuggoseg', 'bcnf', 'adattarhaz'] },
      { id: 'normalizalas', term: 'Normalizálás (1NF, 2NF, 3NF)', en: 'normalization, normal forms', topic: 'terv',
        short: 'A séma lépésenkénti felbontása kisebb relációkra a redundancia és az anomáliák megszüntetésére, a funkcionális függőségek alapján.',
        prereq: ['algoritmusok/futasi-ido'],
        visual: normSvg, caption: 'A redundáns felvetel_regi tábla felbontása három, 3NF-ben lévő táblára.',
        text: '- **1NF**: minden attribútum értéke atomi, nincsenek ismétlődő csoportok vagy listák egy cellában.\n- **2NF**: 1NF, és minden nem prím attribútum a **teljes** kulcstól függ (nincs részleges függés). Csak összetett kulcsnál lehet sérülés.\n- **3NF**: 2NF, és nincs **tranzitív** függés: nem kulcs attribútum nem függ másik nem kulcs attribútumtól.\n- **BCNF**: minden nemtriviális függés bal oldala szuperkulcs.\n\nA felbontásnak két fontos tulajdonsága van:\n\n- **veszteségmentes** (lossless join): a részek természetes illesztése pontosan az eredeti táblát adja vissza (nem keletkeznek hamis sorok);\n- **függőségőrző**: minden eredeti függés ellenőrizhető a részeken belül.\n\n3NF-ig mindkettő mindig elérhető; ezért a gyakorlatban a 3NF a szokásos cél.',
        example: 'felvetel_regi(neptun, nev, kurzus, cim, jegy) → hallgato(neptun, nev), kurzus(kurzus, cim), felvetel(neptun, kurzus, jegy). 4 sor · 5 oszlop = 20 cella helyett 3·2 + 2·2 + 4·3 = 22 cella: kis mintán nem kevesebb, de 8000 felvételnél és 50 kurzusnál a nev és a cim már nem ismétlődik 8000-szer.',
        pitfall: 'A túlnormalizálás is hiba lehet: sok apró tábla miatt minden lekérdezéshez 6–8 illesztés kell. A normalizálás a tervezés kiindulópontja; teljesítményokokból tudatosan, dokumentáltan lehet tőle eltérni.',
        formulas: ['harmadik-nf'],
        related: ['anomaliak', 'funkcionalis-fuggoseg', 'bcnf', 'er-modell', 'join'] },
      { id: 'bcnf', term: 'Boyce–Codd normálforma (BCNF)', en: 'Boyce–Codd normal form', topic: 'terv',
        short: 'Olyan séma, amelyben minden nemtriviális funkcionális függőség bal oldala szuperkulcs.',
        text: 'A BCNF a 3NF szigorítása: a 3NF még megengedi az `X → A` függést, ha A prímattribútum (valamelyik kulcs része), a BCNF nem.\n\nA különbség csak akkor jelentkezik, ha a sémának **több, egymást átfedő összetett kulcsa** van. A BCNF-felbontás algoritmusa: keressünk egy sértő `X → Y` függést, és bontsuk a sémát `X ∪ Y`-ra és `R − (Y − X)`-re; ismételjük, amíg kell. Az eredmény mindig veszteségmentes, de **elveszhet a függőségőrzés**.\n\nA magasabb normálformák (4NF: többértékű függések, 5NF: illesztési függések) ritkábban kerülnek elő a gyakorlatban.',
        example: 'oktatas(hallgato, targy, oktato), szabályok: minden oktató egy tárgyat tanít (`oktato → targy`), és egy hallgató egy tárgyat egy oktatónál hallgat. BCNF-felbontás: (oktato, targy) és (hallgato, oktato). Az eredeti `(hallgato, targy) → oktato` függést már csak illesztéssel lehet ellenőrizni.',
        pitfall: 'Nem mindig érdemes ragaszkodni a BCNF-hez: ha a függőségőrzés fontosabb (az adatbázisnak kell kikényszerítenie a szabályt), a 3NF a jobb kompromisszum.',
        formulas: ['bcnf-feltetel', 'harmadik-nf'],
        related: ['normalizalas', 'funkcionalis-fuggoseg', 'kulcs', 'anomaliak'] },

      /* ----- SQL ----- */
      { id: 'select', term: 'SELECT … FROM … WHERE', en: 'SQL query: SELECT statement', topic: 'sql',
        short: 'Az SQL lekérdező utasítása: mely oszlopokat (SELECT), mely táblákból (FROM), milyen feltétellel (WHERE) kérjük.',
        prereq: ['lecke:informatika/programozas', 'programozas/imperativ-deklarativ'],
        text: 'Az SQL **deklaratív** nyelv: azt írjuk le, **mit** szeretnénk, nem azt, hogyan keresse meg a rendszer.\n\n`SELECT nev, atlag`\n`FROM hallgato`\n`WHERE szak = \'MI\' AND atlag >= 4.0`\n`ORDER BY atlag DESC`\n\nA logikai kiértékelési sorrend eltér az írásitól: **FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT**. Ezért nem használható a WHERE-ben a SELECT-ben adott álnév.\n\nHasznos elemek: `DISTINCT` (ismétlődések szűrése), `LIKE \'Ki%\'` (mintaillesztés), `IN (…)`, `BETWEEN`, `IS NULL`, `CASE WHEN … THEN … END`. Relációs algebrában a WHERE a szelekció (σ), a SELECT-lista a projekció (π).',
        example: 'A hallgato táblában 4 sor van (MI: 4,52 és 4,10; VM: 3,87; GI: 3,25). A fenti lekérdezés eredménye 2 sor: Kiss Anna (4,52), majd Tóth Csilla (4,10).',
        pitfall: 'Az oszloplistát érdemes mindig kiírni, nem „minden oszlopot” kérni: ha a tábla később bővül, a program váratlanul több adatot kap, és az index-only lekérdezés lehetősége is elvész. NULL-összehasonlítás: `WHERE szak = NULL` sosem igaz, helyesen `WHERE szak IS NULL`.',
        related: ['join', 'group-by', 'allekerdezes', 'relacio', 'optimalizalas', 'sql-injection'] },
      { id: 'join', term: 'JOIN: illesztések típusai', en: 'SQL joins: inner, left, right, full outer', topic: 'sql',
        short: 'Két tábla sorainak összekapcsolása egy feltétel (jellemzően kulcs–idegen kulcs egyezés) alapján.',
        prereq: ['algoritmusok/hasitotabla'],
        visual: joinSvg, caption: 'Az illesztéstípusok halmazszerű szemléltetése: a kék rész kerül az eredménybe.',
        text: '- **INNER JOIN**: csak azok a sorpárok, amelyekre a feltétel teljesül.\n- **LEFT (OUTER) JOIN**: a bal tábla minden sora; ahol nincs párja, a jobb oldali oszlopok NULL-ok.\n- **RIGHT (OUTER) JOIN**: ugyanez a jobb oldalra.\n- **FULL OUTER JOIN**: mindkét oldal minden sora.\n- **CROSS JOIN**: Descartes-szorzat, minden sor minden sorral.\n- **önillesztés** (self join): a tábla önmagával, álnevekkel.\n\n`SELECT h.nev, f.kurzus_kod, f.jegy`\n`FROM hallgato h LEFT JOIN felvetel f ON f.neptun = h.neptun`\n\nVégrehajtási algoritmusok: **beágyazott ciklusos** (nested loop, kis táblákhoz vagy indexszel), **hash join** (egyenlőségi feltételhez, nagy táblákhoz), **merge join** (rendezett bemenetekhez).',
        example: '4 hallgató, 5 felvétel (Anna 2, Bence 1, Csilla 2, Dávid 0). INNER JOIN: 5 sor. LEFT JOIN: 6 sor, Dávid sorában a kurzus és a jegy NULL. CROSS JOIN: 4 · 5 = 20 sor.',
        pitfall: 'LEFT JOIN után a jobb oldali táblára tett WHERE-feltétel (pl. `WHERE f.jegy >= 2`) kiszűri a NULL-os sorokat, így az eredmény INNER JOIN-ná „romlik”. Ha a pár nélküli sorokat is meg akarjuk tartani, a feltételt az ON részbe kell írni.',
        formulas: ['join-becsles'],
        related: ['select', 'idegen-kulcs', 'group-by', 'optimalizalas', 'normalizalas'] },
      { id: 'group-by', term: 'GROUP BY és HAVING (aggregálás)', en: 'GROUP BY, HAVING, aggregate functions', topic: 'sql',
        short: 'A GROUP BY a sorokat csoportokba gyűjti, az aggregáló függvények (COUNT, SUM, AVG, MIN, MAX) csoportonként egy értéket adnak, a HAVING a csoportokat szűri.',
        text: '`SELECT kurzus_kod, COUNT(neptun) AS letszam, AVG(jegy) AS atlag`\n`FROM felvetel`\n`WHERE jegy IS NOT NULL`\n`GROUP BY kurzus_kod`\n`HAVING COUNT(neptun) >= 2`\n\n- a **WHERE** a csoportosítás **előtt** szűri a sorokat;\n- a **HAVING** a csoportosítás **után** szűri a csoportokat, aggregált értékre is.\n\nA SELECT-listában csak a csoportosító oszlopok és aggregátumok szerepelhetnek. Az aggregáló függvények a NULL-t kihagyják. Haladó változatok: `ROLLUP`, `CUBE` (részösszegek), illetve az **ablakfüggvények** (`AVG(jegy) OVER (PARTITION BY kurzus_kod)`), amelyek a sorokat nem vonják össze.',
        example: 'Jegyek: AB1: 5, 4, 3; SZ1: 2, 5; PR1: 4. Csoportok: AB1 (3 fő, átlag 4,0), SZ1 (2 fő, 3,5), PR1 (1 fő, 4,0). `HAVING COUNT(neptun) >= 2` után az AB1 és az SZ1 marad.',
        pitfall: 'A `COUNT(oszlop)` a NULL-okat nem számolja, a sorokat számoló `COUNT(∗)` igen. Ha egy jegy még nincs beírva, a két érték eltér. Az átlag is csak a nem NULL értékekből számolódik.',
        related: ['select', 'join', 'allekerdezes', 'adattarhaz', 'nezet'] },
      { id: 'allekerdezes', term: 'Allekérdezés', en: 'subquery, nested query', topic: 'sql',
        short: 'Egy másik lekérdezésbe ágyazott SELECT; eredménye lehet egyetlen érték, egy oszlop (IN), vagy létezés-vizsgálat (EXISTS).',
        text: 'Fajtái:\n\n- **skalár** allekérdezés: egy értéket ad, összehasonlításban használható;\n- **listás**: `IN`, `ANY`, `ALL` operátorokkal;\n- **EXISTS**: igaz, ha az allekérdezés legalább egy sort ad;\n- **FROM-beli** (származtatott tábla) vagy `WITH` (CTE) blokkban elnevezett;\n- **korrelált**: hivatkozik a külső lekérdezés aktuális sorára, ezért (logikailag) soronként újra kiértékelődik.\n\n`SELECT nev FROM hallgato`\n`WHERE atlag > (SELECT AVG(atlag) FROM hallgato)`\n\nKorrelált példa (akiknek nincs felvétele):\n\n`SELECT h.nev FROM hallgato h`\n`WHERE NOT EXISTS (SELECT 1 FROM felvetel f WHERE f.neptun = h.neptun)`',
        example: 'Átlagok: 4,52; 3,87; 4,10; 3,25, ezek átlaga 3,935. Az első lekérdezés Kiss Annát (4,52) és Tóth Csillát (4,10) adja. A második Szabó Dávidot, akinek nincs felvétele.',
        pitfall: '`NOT IN` és NULL: ha az allekérdezés eredményében akár egy NULL is van, a `x NOT IN (…)` feltétel soha nem igaz (UNKNOWN), és az eredmény üres. Ilyenkor `NOT EXISTS` a biztos megoldás.',
        related: ['select', 'group-by', 'join', 'nezet', 'optimalizalas'] },
      { id: 'dml', term: 'INSERT, UPDATE, DELETE (DML)', en: 'data manipulation language', topic: 'sql',
        short: 'Az adatok módosítására szolgáló SQL-utasítások: sorok beszúrása, módosítása és törlése.',
        text: '`INSERT INTO hallgato (neptun, nev, szak_kod) VALUES (\'NEW001\', \'Fekete Ede\', \'MI\')`\n`UPDATE termek SET ar = ar + 500 WHERE kategoria = \'kabel\'`\n`DELETE FROM felvetel WHERE jegy IS NULL AND felev = \'2023/24/1\'`\n\nTovábbi lehetőségek: több sor beszúrása egyszerre vagy lekérdezésből (`INSERT … SELECT`), **upsert** (beszúrás, vagy ha már létezik, módosítás: `MERGE`, illetve `INSERT … ON CONFLICT`), a módosított sorok visszaadása (`RETURNING`).\n\nMinden DML utasítás tranzakcióban fut: vagy minden érintett sor módosul, vagy egyik sem. A megszorítások (kulcs, idegen kulcs, CHECK) ilyenkor ellenőrződnek.\n\nA `TRUNCATE` a teljes tábla gyors kiürítése; egyes rendszerekben DDL-ként viselkedik (nem minden esetben vonható vissza, triggereket nem futtat).',
        example: 'A termek táblában 120 kábel van, átlagár 2500 Ft. Az UPDATE után az átlagár 3000 Ft, és a rendszer azt jelzi: „120 rows affected”. Ha valamelyik sor CHECK-et sértene, egyik sem változik.',
        pitfall: 'A WHERE nélküli UPDATE vagy DELETE **minden sort** érint. Éles rendszeren érdemes előbb ugyanazzal a feltétellel egy SELECT-tel megnézni, hány sor jön, és a módosítást explicit tranzakcióban (BEGIN … COMMIT) végezni.',
        related: ['ddl', 'tranzakcio', 'integritas', 'select', 'sql-injection'] },
      { id: 'ddl', term: 'DDL: táblák létrehozása és módosítása', en: 'data definition language', topic: 'sql',
        short: 'Az adatbázis szerkezetét leíró utasítások: CREATE, ALTER, DROP – táblák, megszorítások, indexek, nézetek.',
        text: '`CREATE TABLE felvetel (`\n`neptun CHAR(6) NOT NULL REFERENCES hallgato(neptun),`\n`kurzus_kod VARCHAR(10) NOT NULL REFERENCES kurzus(kod),`\n`jegy SMALLINT CHECK (jegy BETWEEN 1 AND 5),`\n`PRIMARY KEY (neptun, kurzus_kod) )`\n\nTovábbi utasítások: `ALTER TABLE … ADD COLUMN`, `ALTER TABLE … ADD CONSTRAINT`, `DROP TABLE`, `CREATE INDEX`, `CREATE VIEW`. A jogosultságokat a DCL kezeli (`GRANT`, `REVOKE`).\n\nAz adattípus megválasztása fontos: pénzösszegre `NUMERIC(12,2)` (nem lebegőpontos!), dátumra `DATE`/`TIMESTAMP`, szövegre `VARCHAR(n)` vagy `TEXT`, logikai értékre `BOOLEAN`.\n\nÉles rendszeren a sémaváltozásokat **migrációs scriptek** verziókezelve rögzítik, hogy minden környezetben ugyanaz a szerkezet legyen.',
        example: 'Egy `NUMERIC(3,2)` oszlop 3 értékes jegyet tárol, ebből 2 tizedes: −9,99 és 9,99 között. A 4,52-es átlag tárolható, a 10,5 nem (túlcsordulási hiba).',
        pitfall: 'Pénzt `FLOAT` típusban tárolni hiba: 0,1 + 0,2 kettes számrendszerben nem pontosan 0,3, így a kerekítési hibák összegződnek. Nagy táblán egy oszlop hozzáadása vagy típusváltása zárolhatja a táblát percekig: üzemidőben óvatosan.',
        related: ['integritas', 'idegen-kulcs', 'dml', 'nezet', 'index'] },
      { id: 'nezet', term: 'Nézet (VIEW)', en: 'view, materialized view', topic: 'sql',
        short: 'Elnevezett, tárolt lekérdezés, amely virtuális táblaként használható; a materializált nézet az eredményt fizikailag is tárolja.',
        text: '`CREATE VIEW kituno_hallgatok AS`\n`SELECT neptun, nev, atlag FROM hallgato WHERE atlag >= 4.5`\n\nEzután `SELECT nev FROM kituno_hallgatok` úgy működik, mintha tábla lenne; a rendszer a nézet definícióját behelyettesíti a lekérdezésbe.\n\nFelhasználás:\n\n- **egyszerűsítés**: bonyolult illesztések elrejtése;\n- **biztonság**: a felhasználó csak a nézetre kap jogot, így nem látja például a fizetés oszlopot;\n- **logikai adatfüggetlenség**: a táblák átszervezhetők, a nézet felülete változatlan marad.\n\nA **materializált nézet** (`CREATE MATERIALIZED VIEW`) az eredményt eltárolja: olvasáskor gyors, de frissíteni kell (`REFRESH`). Adattárházakban és jelentéseknél gyakori.\n\nEgyszerű nézet (egy tábla, nincs aggregálás) módosítható is; összetettnél `INSTEAD OF` trigger kell.',
        example: 'A hallgato táblában 4 sor van; a kituno_hallgatok nézet egyetlen sort mutat (Kiss Anna, 4,52). Ha Tóth Csilla átlaga 4,6-ra nő, a nézet azonnal 2 sort ad, mert minden lekérdezéskor újra kiértékelődik. Egy materializált nézet csak a következő frissítés után.',
        pitfall: 'Egy normál nézet **nem gyorsít**: minden lekérdezéskor a teljes definíció lefut. Nézetekre épülő nézetek láncolata nehezen optimalizálható és nehezen átlátható lekérdezéseket eredményez.',
        related: ['select', 'ddl', 'group-by', 'allekerdezes', 'adattarhaz'] },

      /* ----- Tranzakciók és teljesítmény ----- */
      { id: 'tranzakcio', term: 'Tranzakció és az ACID-tulajdonságok', en: 'transaction, ACID properties', topic: 'tranz',
        short: 'Logikailag egybetartozó műveletek sorozata, amely vagy teljes egészében végrehajtódik, vagy egyáltalán nem; az ACID négy garanciát fogalmaz meg.',
        prereq: ['programozas/versenyhelyzet'],
        text: '`BEGIN;`\n`UPDATE szamla SET egyenleg = egyenleg - 10000 WHERE id = 1;`\n`UPDATE szamla SET egyenleg = egyenleg + 10000 WHERE id = 2;`\n`COMMIT;`\n\n- **A – atomicitás** (atomicity): vagy mindkét módosítás megtörténik, vagy egyik sem (hiba esetén `ROLLBACK`);\n- **C – konzisztencia** (consistency): a tranzakció érvényes állapotból érvényes állapotba visz (megszorítások teljesülnek);\n- **I – izoláció** (isolation): a párhuzamos tranzakciók nem látják egymás félkész állapotát;\n- **D – tartósság** (durability): a COMMIT után az adat egy áramszünetet is túlél.\n\nMegvalósítás: a módosításokat előbb a **tranzakciós naplóba** írják (write-ahead logging, WAL). Összeomlás után a napló alapján a véglegesített tranzakciókat újrajátsszák (redo), a félbemaradtakat visszagörgetik (undo).',
        example: 'Ha a két UPDATE között áramszünet van, újraindítás után a WAL alapján a félkész tranzakció visszagörgetődik: az 1-es számláról sem tűnik el a 10 000 Ft. A két számla összege (pl. 50 000 + 20 000 = 70 000 Ft) minden pillanatban ugyanannyi marad.',
        pitfall: 'Sok programkönyvtár alapból **autocommit** módban fut: minden utasítás külön tranzakció. Ha a két UPDATE-et nem tesszük egy explicit tranzakcióba, a köztük bekövetkező hiba „elveszett” pénzt okoz.',
        related: ['izolacios-szintek', 'zarolas', 'holtpont', 'dml', 'cap-tetel'] },
      { id: 'izolacios-szintek', term: 'Izolációs szintek', en: 'transaction isolation levels', topic: 'tranz',
        short: 'Az SQL-szabvány négy szintje, amely megmondja, a párhuzamos tranzakciók milyen anomáliákat okozhatnak egymásnak.',
        visual: isoSvg, caption: 'Az SQL-szabvány izolációs szintjei és az általuk megengedett jelenségek.',
        text: 'A jelenségek:\n\n- **piszkos olvasás** (dirty read): egy tranzakció olyan adatot olvas, amelyet egy másik még nem véglegesített (és akár vissza is vonhat);\n- **nem megismételhető olvasás**: ugyanazt a sort kétszer olvasva más értéket kapunk, mert közben egy másik tranzakció módosította;\n- **fantom**: ugyanazt a feltételes lekérdezést kétszer futtatva új sorok jelennek meg.\n\nAz alapértelmezett szint PostgreSQL-ben, Oracle-ben és SQL Serverben READ COMMITTED, MySQL InnoDB-ben REPEATABLE READ. A SERIALIZABLE garantálja, hogy az eredmény megegyezik a tranzakciók **valamely soros végrehajtásával**.\n\nMegvalósítás: **zárolással**, vagy **többverziós konkurenciakezeléssel** (MVCC): az író új sorverziót hoz létre, az olvasók a tranzakció kezdetekor érvényes pillanatképet látják, így az olvasó nem blokkolja az írót.',
        example: 'Készlet: 5 db. T1 (READ COMMITTED) kiolvassa: 5. Közben T2 eladja 3-at és véglegesít. T1 újra kiolvassa: 2 (nem megismételhető olvasás). REPEATABLE READ szinten T1 mindkétszer 5-öt látna.',
        pitfall: 'A „lost update”: két tranzakció kiolvassa az 5-öt, mindkettő levon 1-et, és visszaírja a 4-et: az eredmény 4 lesz 3 helyett. READ COMMITTED-en ez megtörténhet; megoldás az atomi `UPDATE … SET db = db - 1`, a `SELECT … FOR UPDATE`, vagy magasabb izoláció.',
        related: ['tranzakcio', 'zarolas', 'holtpont', 'cap-tetel'] },
      { id: 'zarolas', term: 'Zárolás és kétfázisú zárolás', en: 'locking, two-phase locking (2PL)', topic: 'tranz',
        short: 'A tranzakciók zárakat kérnek az adatelemekre (osztott olvasáshoz, kizárólagos íráshoz); a kétfázisú protokoll garantálja a sorbarendezhetőséget.',
        prereq: ['programozas/parhuzamossag', 'programozas/versenyhelyzet'],
        text: 'Zártípusok:\n\n- **osztott (S, shared)** zár olvasáshoz: több tranzakció is tarthatja egyszerre;\n- **kizárólagos (X, exclusive)** zár íráshoz: csak egy tranzakcióé lehet, és más zárral nem fér össze.\n\nKompatibilitás: S–S összefér; S–X, X–S, X–X nem.\n\n**Kétfázisú zárolás (2PL)**: a tranzakció először csak zárakat szerez (növekvő fázis), majd csak elenged (csökkenő fázis); az első elengedés után új zárat nem kérhet. Ez garantálja a **konfliktus-sorbarendezhetőséget**. A **szigorú 2PL** az X zárakat a COMMIT-ig tartja, így a többiek nem olvashatnak véglegesítetlen adatot.\n\nA zárolás **granularitása** lehet sor, lap vagy tábla szintű: a finomabb több párhuzamosságot, de több adminisztrációt jelent.',
        example: 'T1 X-zárat tart egy számlán. T2 olvasni szeretné (S-zárat kér): várnia kell T1 COMMIT-jáig. Ha T1 2 s-ig fut, T2 válaszideje is legalább 2 s-mal nő. Ezért kell a tranzakciókat rövidre fogni.',
        pitfall: 'A 2PL nem véd a holtpont ellen, sőt, éppen a zárak tartása miatt holtpont alakulhat ki. Felhasználói interakció (pl. „Biztosan menti?”) alatt nyitva hagyott tranzakció hosszú ideig blokkolhat másokat.',
        related: ['tranzakcio', 'holtpont', 'izolacios-szintek', 'index'] },
      { id: 'holtpont', term: 'Holtpont', en: 'deadlock', topic: 'tranz',
        short: 'Két vagy több tranzakció körkörösen egymás zárjaira vár, így egyik sem tud továbblépni.',
        visual: dlSvg, caption: 'Klasszikus holtpont: két átutalás ellentétes sorrendben zárolja ugyanazt a két számlát. A várakozási gráfban kör keletkezik.',
        text: 'A holtpont négy feltétele (Coffman): kölcsönös kizárás, foglalva várakozás, nincs erőszakos elvétel, körkörös várakozás.\n\nKezelése az adatbázis-kezelőkben:\n\n- **felismerés**: a rendszer időnként felépíti a **várakozási gráfot** (ki kire vár); ha kört talál, egy „áldozat” tranzakciót megszakít (ROLLBACK), a többi folytatódhat;\n- **időkorlát**: aki túl sokáig vár, megszakad;\n- **megelőzés**: pl. wait-die / wound-wait sémák időbélyeg alapján.\n\nAz alkalmazás oldaláról: mindig **azonos sorrendben** zároljuk az erőforrásokat (pl. számlaszám szerint növekvően), rövidek legyenek a tranzakciók, és a megszakított tranzakciót a program próbálja újra.',
        example: 'T1: 1-es számláról 2-esre utal, T2: 2-esről 1-esre, egyszerre. T1 zárolja az 1-est, T2 a 2-est, majd mindkettő a másikra vár. Ha mindkettő a kisebb számlaszámú számlát zárolja először, T2 már az 1-es számlánál várakozni kezd, és nincs kör.',
        pitfall: 'A holtpont nem programhiba-üzenet, hanem normális esemény nagy terhelésnél. A megszakított tranzakciót (pl. PostgreSQL „deadlock detected”, SQL Server 1205-ös hiba) az alkalmazásnak kell újrapróbálnia; ha ezt nem teszi, adat vész el.',
        related: ['zarolas', 'tranzakcio', 'izolacios-szintek'] },
      { id: 'index', term: 'Index és B-fa', en: 'index, B-tree / B+ tree', topic: 'tranz',
        short: 'Kiegészítő adatszerkezet, amely egy oszlop értékei alapján gyorsan megtalálja a sorokat; a leggyakoribb a kiegyensúlyozott, lapos B+-fa.',
        prereq: ['algoritmusok/kiegyensulyozott-fa', 'algoritmusok/binaris-kereses', 'lecke:informatika/algoritmusok'],
        visual: bt, caption: 'B+-fa: a belső csúcsok csak útjelzők, az adatmutatók a láncolt levelekben vannak. Valódi rendszerben egy csúcs több száz kulcsot tartalmaz.',
        text: 'Index nélkül a kereséshez a teljes táblát végig kell olvasni (**full table scan**, O(n)). B-fa indexszel a keresés O(log n), és ami fontosabb: csak néhány **lapolvasás**.\n\nA **B-fa** tulajdonságai: minden levél ugyanolyan mélyen van (kiegyensúlyozott); egy csúcs egy lemezlap, sok kulccsal (nagy elágazási tényező); beszúráskor a betelt csúcs kettéválik, és a fa felfelé nő. A **B+-fa** változatban az adatmutatók csak a levelekben vannak, és a levelek láncolva vannak, ezért tartomány-lekérdezésekre (`BETWEEN`, `ORDER BY`) is kiváló.\n\nTovábbi indexfajták: **hash index** (csak egyenlőségre), **bitmap index** (kevés különböző érték, adattárházak), **összetett index** több oszlopon, **fedő (covering) index** (minden kért oszlop benne van, nem kell a táblához nyúlni), **klaszterezett index** (a tábla sorai fizikailag az index szerint rendezettek).',
        example: '10⁹ sor, 500-as elágazási tényező: `⌈log₅₀₀ 10⁹⌉ = 4` szint, azaz 4 lapolvasás a 10⁹ helyett. Egy összetett (szak, atlag) index a `WHERE szak = \'MI\' ORDER BY atlag` lekérdezést rendezés nélkül kiszolgálja.',
        pitfall: 'Az index nem ingyenes: minden INSERT, UPDATE és DELETE frissíti, és tárhelyet foglal. Összetett indexnél számít az oszlopsorrend: a (szak, atlag) index nem segít a csak atlag-ra szűrő lekérdezésen. Függvénybe csomagolt oszlop (`WHERE UPPER(nev) = …`) a sima indexet nem tudja használni.',
        formulas: ['b-fa-magassag', 'szelektivitas'],
        related: ['optimalizalas', 'kulcs', 'select', 'zarolas', 'ddl'], models: ['alaplap'] },
      { id: 'optimalizalas', term: 'Lekérdezés-optimalizálás', en: 'query optimization, execution plan', topic: 'tranz',
        short: 'Az adatbázis-kezelő az SQL-utasításhoz a lehetséges végrehajtási tervek közül a becsült költség alapján a legolcsóbbat választja.',
        prereq: ['algoritmusok/futasi-ido', 'algoritmusok/dinamikus-programozas'],
        text: 'A lekérdezés feldolgozásának lépései: elemzés (parse) → átírás relációs algebrára → **logikai optimalizálás** (szabályok) → **fizikai optimalizálás** (költségalapú) → végrehajtás.\n\nLogikai átírások: a szelekciók „lenyomása” az illesztések alá (minél korábban szűrjünk), projekciók korai alkalmazása, allekérdezések illesztéssé alakítása.\n\nKöltségalapú döntések: hozzáférési út (teljes olvasás vagy index), **illesztési algoritmus** (nested loop, hash, merge), **illesztési sorrend** (n táblánál a lehetséges sorrendek száma gyorsan nő, ezért dinamikus programozás vagy heurisztika). A költséget a statisztikák (sorszám, különböző értékek, hisztogram) alapján becsüli.\n\nA tervet az `EXPLAIN` (illetve a ténylegesen futtatott `EXPLAIN ANALYZE`) mutatja meg.',
        example: 'hallgato (10 000 sor) illesztése a felvetel-lel (200 000 sor). Beágyazott ciklus index nélkül: `10 000 · 200 000 = 2·10⁹` összehasonlítás. Hash join: a kisebb táblából hasítótábla (10 000 beszúrás), majd a nagyobb egyszeri végigolvasása (200 000 keresés): kb. 210 000 művelet, közel tízezerszer kevesebb.',
        pitfall: 'Elavult statisztika rossz tervet eredményez: ha az optimalizáló azt hiszi, a tábla 100 soros, pedig 10 milliós, beágyazott ciklust választ. Tömeges betöltés után `ANALYZE` kell. Ugyanaz a lekérdezés más adatmennyiségnél más tervet kaphat.',
        formulas: ['szelektivitas', 'join-becsles'],
        related: ['index', 'join', 'select', 'allekerdezes'] },

      /* ----- Modern adatkezelés ----- */
      { id: 'nosql', term: 'NoSQL-adatbázisok típusai', en: 'NoSQL databases: key–value, document, column-family, graph', topic: 'modern',
        short: 'Nem relációs adatmodellt használó rendszerek: kulcs–érték, dokumentum-, oszlopcsalád- és gráfadatbázisok, jellemzően vízszintes skálázásra tervezve.',
        prereq: ['lecke:rendszeruzem/szerverek', 'algoritmusok/hasitotabla'],
        text: 'A 2000-es évek végén a webes léptékű alkalmazások (sok szerver, rugalmas séma, hatalmas írási terhelés) hívták életre őket. Négy fő típus:\n\n- **kulcs–érték**: egyszerű `get(kulcs)` / `put(kulcs, érték)`; nagyon gyors, gyorsítótárnak, munkamenetnek (Redis, DynamoDB);\n- **dokumentum**: JSON-szerű, beágyazott dokumentumok rugalmas sémával; egy dokumentumban tárolódik, ami együtt kell (MongoDB, CouchDB);\n- **oszlopcsalád** (wide-column): soronként eltérő oszlopok, írásra optimalizált, elosztott (Cassandra, HBase);\n- **gráf**: csúcsok és élek, kapcsolatbejáró lekérdezésekhez, pl. közösségi háló, ajánló (Neo4j).\n\nGyakran **BASE** elvet követnek (Basically Available, Soft state, Eventually consistent): az ACID szigorú konzisztenciája helyett **végső konzisztencia**. A határ ma elmosódik: sok NoSQL-rendszer tud tranzakciót, a relációs rendszerek pedig JSON-t (pl. PostgreSQL `jsonb`).',
        example: 'Webshop kosár: kulcs–érték tárban `kosar:ABC123` → a tételek JSON-listája, ezredmásodperces elérés. Barátok barátai lekérdezés gráfadatbázisban 2 lépéses bejárás, relációs adatbázisban két önillesztés egy 10⁸ soros kapcsolattáblán.',
        pitfall: 'A „NoSQL” nem „SQL helyett mindenhol”: a séma nélküliség valójában **implicit séma** a kódban. Ha az adatok erősen kapcsolódnak, és tranzakciós garancia kell (számlázás, készlet), a relációs adatbázis általában jobb választás.',
        related: ['cap-tetel', 'adattarhaz', 'tranzakcio', 'relacio'] },
      { id: 'cap-tetel', term: 'CAP-tétel', en: 'CAP theorem', topic: 'modern',
        short: 'Elosztott adattárolóban hálózati partíció esetén nem lehet egyszerre teljes konzisztencia és teljes rendelkezésre állás.',
        prereq: ['lecke:informatika/halozatok'],
        visual: capSvg, caption: 'A CAP-háromszög. Mivel elosztott rendszerben a partíció elkerülhetetlen, a valódi választás C és A között van, partíció idejére.',
        text: '- **C** (consistency): minden olvasás a legutolsó írást látja, mintha egyetlen példány lenne;\n- **A** (availability): minden működő csomópont minden kérésre választ ad;\n- **P** (partition tolerance): a rendszer akkor is működik, ha üzenetek vesznek el a csomópontok között.\n\nHa a hálózat kettészakad, egy csomópont kétféleképpen viselkedhet egy írási kérésnél: elutasítja, mert nem tudja egyeztetni a másik féllel (**CP**: konzisztens, de nem elérhető), vagy elfogadja, és később egyeztet (**AP**: elérhető, de a két fél ideiglenesen eltérő adatot lát).\n\nCP-rendszerek konszenzusalgoritmust (Paxos, Raft) és **kvórumot** használnak: N másolatból W írási és R olvasási visszaigazolás kell; ha `R + W > N`, az olvasás biztosan látja a legutóbbi írást.',
        example: 'N = 3 másolat, W = 2, R = 2: `2 + 2 > 3`, tehát erős konzisztencia, és egy csomópont kiesését a rendszer elviseli. W = 1, R = 1 esetén gyorsabb és elérhetőbb, de egy olvasás régi adatot is kaphat (végső konzisztencia).',
        pitfall: 'A CAP „C”-je nem azonos az ACID „C”-jével: az ACID-ban a konzisztencia az integritási szabályok betartását jelenti, a CAP-ban a másolatok egyezését (linearizálhatóság). Egy egygépes adatbázisra a CAP nem is értelmezhető.',
        formulas: ['cap'],
        related: ['nosql', 'tranzakcio', 'izolacios-szintek', 'adattarhaz'] },
      { id: 'adattarhaz', term: 'Adattárház, OLAP és OLTP', en: 'data warehouse, OLAP vs. OLTP', topic: 'modern',
        short: 'Az OLTP sok rövid, írásintenzív tranzakciót szolgál ki; az OLAP-ot (adattárház) nagy mennyiségű történeti adat elemzésére, összesítésére tervezik.',
        prereq: ['valszam/varhato-ertek'],
        visual: starSvg, caption: 'Csillagséma: középen a ténytábla (mérőszámok), körülötte a dimenziótáblák.',
        text: 'A két feldolgozási mód összehasonlítása:\n\n- **OLTP** (online tranzakciófeldolgozás): webshop, banki rendszer; sok, kis, egyidejű írás és olvasás, normalizált séma (3NF), ms-os válaszidő, aktuális adat.\n- **OLAP** (online analitikus feldolgozás): üzleti jelentések, elemzések; kevés, de óriási lekérdezés (milliárd sor összesítése), denormalizált **csillag**- vagy hópehelyséma, történeti adat.\n\nAz adattárházat **ETL** (vagy ELT) folyamat tölti: kinyerés (extract) az operatív rendszerekből, átalakítás (transform: tisztítás, egységesítés), betöltés (load), jellemzően éjszakánként vagy folyamatosan.\n\nAz elemzési műveletek: **lefúrás** (drill-down: évről hónapra), felgörgetés (roll-up), szeletelés (slice), forgatás (pivot). Az adattárházak gyakran **oszlopalapú** tárolást használnak: egy összesítő lekérdezés csak a szükséges oszlopokat olvassa, és ezek jól tömöríthetők.',
        example: '„Mennyi volt a negyedéves árbevétel régiónként és kategóriánként 2023-ban?” A ténytábla 500 millió eladási sor; a lekérdezés 3 dimenzióval illeszt, és csak 2 oszlopot (ido_id, arbevetel) kell végigolvasni a ténytáblából. Oszlopalapú tárolással ez a teljes tábla adatainak kis része.',
        pitfall: 'Elemző lekérdezéseket ne az éles OLTP-adatbázison futtassunk: egy több perces összesítés zárakat és I/O-t foglal, és lelassítja a vásárlókat kiszolgáló tranzakciókat. Erre valók a replikák vagy az adattárház.',
        related: ['group-by', 'nezet', 'anomaliak', 'nosql', 'cap-tetel'] },
      { id: 'sql-injection', term: 'SQL injection és védekezés', en: 'SQL injection, prepared statements', topic: 'modern',
        short: 'Támadás, amelyben a felhasználói bemenet SQL-kódként kerül végrehajtásra, mert a program szövegösszefűzéssel állítja elő a lekérdezést.',
        prereq: ['lecke:informatika/adatbiztonsag', 'lecke:rendszeruzem/biztonsag'],
        text: 'Sebezhető kód (bármely nyelven):\n\n`sql = "SELECT nev FROM felhasznalo WHERE login = \'" + login + "\' AND jelszo_hash = \'" + h + "\'"`\n\nHa a támadó a login mezőbe ezt írja: `admin\' --`, a lekérdezés így alakul:\n\n`SELECT nev FROM felhasznalo WHERE login = \'admin\' --\' AND jelszo_hash = …`\n\nA `--` utáni rész megjegyzés lesz, a jelszóellenőrzés eltűnik. Más bemenettel (`\' OR \'1\'=\'1`) minden sor visszajön, `UNION SELECT`-tel más táblák is kiolvashatók, rosszabb esetben adatot törölhet.\n\n**Védekezés**:\n\n1. **paraméterezett lekérdezés** (prepared statement): `WHERE login = ?`, az érték külön kerül átadásra, sosem értelmeződik kódként;\n2. ORM vagy lekérdezésépítő, amely ezt automatikusan teszi;\n3. **legkisebb jogosultság**: az alkalmazás adatbázis-felhasználója ne tudjon táblát törölni;\n4. bemenet-ellenőrzés (fehérlista), hibaüzenetek elrejtése, WAF kiegészítésként.',
        example: 'Paraméterezve a `admin\' --` bemenet egyszerűen egy 9 karakteres login-név lesz, amilyen felhasználó nincs: a lekérdezés 0 sort ad, a belépés sikertelen.',
        pitfall: 'A „kézi escape-elés” (aposztrófok duplázása) törékeny: karakterkódolási trükkökkel és számmezőknél (ahol nincs is idézőjel) kijátszható. Tábla- és oszlopnevet nem lehet paraméterként átadni: ezeket fehérlistáról kell választani.',
        related: ['select', 'dml', 'integritas', 'nezet'] },

      /* ----- Bővítés: relációs alapok, tervezés ----- */
      { id: 'relacios-algebra', term: 'Relációs algebra', en: 'relational algebra', topic: 'rel',
        short: 'Relációkon értelmezett műveletek zárt rendszere (szelekció, projekció, szorzat, unió, különbség, átnevezés és az ezekből származtatott illesztés): minden művelet eredménye ismét reláció, ezért a műveletek tetszőlegesen egymásba ágyazhatók.',
        prereq: ['lecke:informatika/algoritmusok'],
        text: 'A relációs modellt E. F. Codd vezette be (1970); a relációs algebra a lekérdezések **procedurális** matematikai nyelve, az adatbázis-kezelők belül ilyen kifejezésfává alakítják az SQL-t.\n\nAlapműveletek:\n\n- **szelekció** `σ_feltétel(R)`: a feltételt teljesítő **sorok** (SQL: `WHERE`);\n- **projekció** `π_A,B(R)`: a kiválasztott **oszlopok** (SQL: `SELECT A, B`), a halmazszemantika miatt az ismétlődő sorok kiesnek;\n- **Descartes-szorzat** `R × S`: minden sor minden sorral párosítva;\n- **unió** `R ∪ S` és **különbség** `R − S`: azonos sémájú relációkon;\n- **átnevezés** `ρ`: reláció vagy attribútum új nevet kap (önillesztéshez kell).\n\nSzármaztatott műveletek:\n\n- **théta-illesztés**: `R ⋈_θ S = σ_θ(R × S)`; a **természetes illesztés** az azonos nevű attribútumok egyenlőségére illeszt, és a közös oszlopot egyszer tartja meg;\n- **metszet**: `R ∩ S = R − (R − S)`;\n- **osztás** `R ÷ S`: „minden”-típusú kérdésekhez (azok a hallgatók, akik **minden** kötelező tárgyat felvettek).\n\nEgy lekérdezőnyelv **relációsan teljes**, ha legalább a relációs algebra kifejezőerejével bír; az SQL ilyen, sőt több (aggregálás, rendezés, rekurzió).\n\nAz algebrai **ekvivalenciák** (pl. a szelekció lejjebb tolása az illesztés alá: `σ_p(R ⋈ S) = σ_p(R) ⋈ S`, ha p csak R attribútumaira hivatkozik) az optimalizáló fő eszközei: kisebb közbülső eredményt adnak.',
        example: '„Az informatika szakos hallgatók neve, akik felvették az Adatbázisok tárgyat”: `π_nev(σ_szak=\'MI\'(Hallgato) ⋈ σ_targy=\'Adatbázisok\'(Felvetel))`. SQL-ben: `SELECT DISTINCT h.nev FROM hallgato h JOIN felvetel f ON f.neptun = h.neptun WHERE h.szak = \'MI\' AND f.targy = \'Adatbázisok\';`.',
        pitfall: 'Az SQL **multihalmaz** (bag) szemantikát használ: a `SELECT` nem szűri ki az ismétlődéseket, ehhez `DISTINCT` kell; a `UNION` viszont szűr, a `UNION ALL` nem. A relációs algebra osztásának nincs közvetlen SQL-megfelelője: dupla `NOT EXISTS`-szel vagy csoportos számlálással írható le.',
        formulas: ['join-becsles'],
        related: ['relacio', 'select', 'join', 'optimalizalas', 'join-algoritmus', 'allekerdezes'] },
      { id: 'er-lekepezes', term: 'ER-modell leképezése relációs sémára', en: 'mapping an ER model to relations', topic: 'terv',
        short: 'Szabályrendszer, amely a fogalmi ER-modell egyedeit, kapcsolatait és tulajdonságait táblákká, kulcsokká és idegen kulcsokká alakítja; a kapcsolat számossága dönti el, hová kerül az idegen kulcs.',
        text: 'Lépések:\n\n1. **Erős egyed → tábla**; az egyszerű tulajdonságok oszlopok, a kulcsból elsődleges kulcs lesz. Az összetett tulajdonság (cím) részeire bomlik.\n2. **Gyenge egyed** (nincs saját teljes kulcsa, pl. a Számla tétele) → tábla, amelynek elsődleges kulcsa a **tulajdonos kulcsa + a részleges kulcs** (számlaszám, tételsorszám); törléskor jellemzően `ON DELETE CASCADE`.\n3. **1:N kapcsolat** → az „N” oldali táblába kerül az idegen kulcs (a Hallgató táblába a szak azonosítója). Kötelező részvételnél `NOT NULL`.\n4. **1:1 kapcsolat** → bármelyik oldalra idegen kulcs `UNIQUE` megszorítással, célszerűen oda, ahol a részvétel kötelező; vagy a két egyed összevonása.\n5. **N:M kapcsolat** → külön **kapcsolótábla**, amely mindkét egyed kulcsát idegen kulcsként tartalmazza, elsődleges kulcsa a kettő együtt; a kapcsolat saját tulajdonságai (jegy, dátum) is ide kerülnek.\n6. **Többértékű tulajdonság** (telefonszámok) → külön tábla (tulajdonos kulcsa + érték).\n7. **Többágú (n-es) kapcsolat** → kapcsolótábla mind az n résztvevő kulcsával.\n8. **Specializáció** (ISA, pl. Személy → Hallgató, Oktató) három megoldással: **egy tábla** típusoszloppal és sok NULL-lal; **táblánként egy osztály**, ahol az altábla kulcsa egyben idegen kulcs az ősre; vagy csak a **konkrét altípusok** táblái, a közös oszlopok ismétlésével.\n\nHa az ER-modell jó, a kapott séma általában már 3NF-ben van; a normalizálás ilyenkor ellenőrzés.',
        example: 'Hallgató (neptun) N:M Kurzus (kód), a kapcsolat tulajdonsága a jegy: `CREATE TABLE felvetel (neptun CHAR(6) REFERENCES hallgato, kod VARCHAR(10) REFERENCES kurzus, felev CHAR(6), jegy SMALLINT CHECK (jegy BETWEEN 1 AND 5), PRIMARY KEY (neptun, kod, felev));` – a félév is a kulcs része, mert egy kurzus újra felvehető.',
        pitfall: 'N:M kapcsolatot nem lehet egyetlen idegen kulccsal ábrázolni; a „vesszővel elválasztott azonosítók egy oszlopban” megoldás megsérti az 1NF-et, és sem idegen kulcs, sem index nem használható rá. A kapcsolótábla kulcsából ne hagyd ki azt az attribútumot, amely miatt ugyanaz a pár többször is szerepelhet.',
        related: ['er-modell', 'idegen-kulcs', 'kulcs', 'normalizalas', 'ddl', 'integritas'] },
      { id: 'negyedik-nf', term: 'Többértékű függőség és a 4. normálforma', en: 'multivalued dependency and fourth normal form (4NF)', topic: 'terv',
        short: 'X ↠ Y többértékű függőség: X értéke egy Y-értékhalmazt határoz meg, amely független a többi attribútumtól. A 4NF-ben minden nemtriviális többértékű függőség bal oldala szuperkulcs.',
        text: 'A BCNF a funkcionális függőségekből eredő redundanciát szünteti meg, de van redundancia, amelyet nem funkcionális függőség okoz. Ha egy táblában két, egymástól **független többértékű** tény szerepel ugyanarról az egyedről, a táblának minden kombinációt tartalmaznia kell.\n\n**Definíció**: R(X, Y, Z)-ben `X ↠ Y`, ha bármely két sorhoz, amely X-en egyezik, létezik olyan sor is, amely X-en egyezik velük, Y-t az elsőből, Z-t a másodikból veszi. Szemléletesen: X rögzítése mellett az Y- és a Z-értékek **minden párosítása** jelen van.\n\nTulajdonságok:\n\n- minden funkcionális függőség egyben többértékű is (`X → Y` ⇒ `X ↠ Y`);\n- **komplementer szabály**: ha `X ↠ Y`, akkor `X ↠ Z` is (Z = a maradék attribútumok);\n- triviális, ha Y ⊆ X, vagy X ∪ Y az összes attribútum.\n\n**4NF** (Ronald Fagin, 1977): minden nemtriviális `X ↠ Y` esetén X szuperkulcs. A 4NF-ből következik a BCNF. A felbontás: R → R₁(X, Y) és R₂(X, Z); ez **veszteségmentes**, mert pontosan akkor bontható R veszteségmentesen két részre, ha a közös attribútumok bármelyik részre többértékűen meghatározzák a másikat.\n\nA még ritkább **5NF** (projekció–illesztés normálforma) az összekapcsolási függőségekkel foglalkozik, amelyek csak három vagy több részre bontva szüntethetők meg.',
        example: 'Oktato(nev, targy, nyelv): Kiss tanít Adatbázist és Hálózatot, angolul és magyarul is tud – a két tény független, ezért 4 sor kell (2 tárgy × 2 nyelv). Ha Kiss megtanul németül, 2 új sort kell beszúrni. A tábla BCNF-ben van (a kulcs mindhárom oszlop), de `nev ↠ targy` miatt nem 4NF. Felbontás: OktatoTargy(nev, targy) és OktatoNyelv(nev, nyelv): 2 + 2 sor, az új nyelv 1 sor.',
        pitfall: 'Ha a nyelv a tárgytól **függ** (Kiss az Adatbázist csak angolul tanítja), akkor nincs többértékű függőség, és a felbontás információt veszítene: a háromoszlopos tábla a helyes. A függőség a valóság szabálya, nem egy konkrét táblaállapotból olvasható le.',
        related: ['bcnf', 'normalizalas', 'funkcionalis-fuggoseg', 'anomaliak', 'er-lekepezes'] },
      { id: 'denormalizalas', term: 'Denormalizálás', en: 'denormalization', topic: 'terv',
        short: 'A normalizált séma tudatos, ellenőrzött „visszabontása”: redundáns adatok vagy előre összesített értékek tárolása az olvasási teljesítmény javítására, a módosítás bonyolultabbá válása árán.',
        text: 'A normalizálás a **helyességet** és a karbantarthatóságot szolgálja: minden tény egy helyen van. Az ára, hogy a lekérdezéseknek sok táblát kell illeszteniük. Ha egy lekérdezés nagyon gyakori és lassú, mérlegelhető a denormalizálás.\n\nTipikus technikák:\n\n- **származtatott érték tárolása**: a rendelés végösszege a tételek összege helyett egy oszlopban; a hozzászólások száma egy bejegyzésnél;\n- **oszlop másolása** egy másik táblából, hogy az illesztés elmaradjon (a rendelés sorában a vevő neve);\n- **előre illesztett vagy összesített táblák**, **materializált nézetek**;\n- **ismétlődő csoportok** egy sorban (pl. JSON oszlop) ritkán módosuló, mindig együtt olvasott adatokhoz.\n\nAz adattárházak **csillagsémája** (ténytábla + denormalizált dimenziótáblák) tudatosan denormalizált, mert ott szinte csak olvasnak. A dokumentum-adatbázisokban a beágyazott dokumentum is denormalizálás.\n\nA redundanciát **következetesen karban kell tartani**: ugyanabban a tranzakcióban, triggerrel, materializált nézet frissítésével vagy aszinkron feldolgozással. Utóbbinál átmenetileg eltérhetnek az értékek, ezt az alkalmazásnak tűrnie kell.\n\nSorrend: először normalizált terv, majd **mérés** (végrehajtási terv, lassú lekérdezések naplója), csak azután célzott denormalizálás – gyakran egy jó index vagy gyorsítótár elég.',
        example: 'Egy webáruház termékoldala minden megjelenítéskor kiszámolná az átlagos értékelést 2 millió értékelésből (`AVG` + `GROUP BY`). Denormalizálva a `termek` táblában `ertekeles_db` és `ertekeles_osszeg` oszlop van, amelyet minden új értékelés ugyanabban a tranzakcióban növel; az átlag egy osztás.',
        pitfall: 'A „denormalizált” nem jelenti, hogy „sosem normalizáltuk”: tervezési hiányosság és tudatos döntés között a különbség a dokumentált ok és a redundancia karbantartásának mechanizmusa. Írásintenzív OLTP-táblákban a denormalizálás a zárolási versenyt is növelheti (minden új értékelés ugyanazt a termék-sort módosítja).',
        related: ['normalizalas', 'anomaliak', 'nezet', 'adattarhaz', 'nosql', 'tarolt-eljaras'] },

      /* ----- Bővítés: SQL ----- */
      { id: 'null-logika', term: 'NULL és a háromértékű logika', en: 'NULL and three-valued logic', topic: 'sql',
        short: 'A NULL az „ismeretlen vagy nem alkalmazható” érték jelölése; vele minden összehasonlítás eredménye UNKNOWN (ismeretlen), ezért az SQL logikája háromértékű: TRUE, FALSE, UNKNOWN.',
        text: 'A NULL **nem** a 0 és nem az üres szöveg, hanem az érték hiánya. Következmények:\n\n- `NULL = NULL`, `NULL <> 5`, `NULL > 3` eredménye mind **UNKNOWN**; NULL-t csak `IS NULL` / `IS NOT NULL` vizsgál;\n- aritmetika: `5 + NULL` = NULL; szövegösszefűzés a legtöbb rendszerben szintén NULL;\n- a `WHERE` és a `HAVING` csak a **TRUE** sorokat tartja meg, az UNKNOWN-t eldobja; a `CHECK` megszorítás viszont csak a FALSE-t utasítja el, az UNKNOWN-t átengedi.\n\nIgazságtáblák (Kleene-logika): `TRUE AND UNKNOWN = UNKNOWN`, `FALSE AND UNKNOWN = FALSE`, `TRUE OR UNKNOWN = TRUE`, `FALSE OR UNKNOWN = UNKNOWN`, `NOT UNKNOWN = UNKNOWN`. Tehát az ismeretlen csak akkor számít, ha a végeredmény tőle függ.\n\nAggregálás:\n\n- `COUNT(*)` minden sort számol, `COUNT(oszlop)` csak a nem NULL értékeket;\n- `SUM`, `AVG`, `MIN`, `MAX` kihagyja a NULL-okat; üres halmazon (vagy csupa NULL-on) a `SUM` eredménye NULL, nem 0;\n- a `GROUP BY` a NULL-okat egy csoportba teszi, a `DISTINCT` egynek tekinti őket.\n\nHasznos függvények: `COALESCE(a, b, …)` az első nem NULL érték; `NULLIF(a, b)` NULL, ha a = b (nullával osztás elkerülésére). A külső illesztés (`LEFT JOIN`) a párosítatlan sorokat NULL-okkal egészíti ki.',
        example: 'Hallgato(neptun, mentor): `SELECT COUNT(*) FROM hallgato WHERE mentor <> \'KISS\'` nem számolja azokat, akiknek nincs mentora (mentor NULL). Helyesen: `WHERE mentor <> \'KISS\' OR mentor IS NULL`, vagy szabványos SQL-ben `WHERE mentor IS DISTINCT FROM \'KISS\'`.',
        pitfall: 'A klasszikus csapda: `WHERE x NOT IN (SELECT y FROM t)` **egyetlen sort sem** ad vissza, ha az allekérdezés eredményében van NULL, mert `x <> NULL` UNKNOWN. Biztonságos alternatíva a `NOT EXISTS`. Az `AVG(jegy)` a NULL jegyeket kihagyja, ami mást jelent, mint ha 0-nak számolnánk őket.',
        related: ['select', 'integritas', 'join', 'group-by', 'allekerdezes', 'relacio'] },
      { id: 'ablakfuggveny', term: 'Ablakfüggvények (OVER, PARTITION BY)', en: 'window functions', topic: 'sql',
        short: 'Olyan számítás, amely minden sorhoz a vele „rokon” sorok egy ablakán (partícióján, keretén) végez aggregálást vagy rangsorolást, de – a GROUP BY-jal ellentétben – a sorokat nem vonja össze.',
        text: 'Az SQL:2003 szabványban jelent meg, ma minden jelentős relációs rendszer ismeri. Szerkezet:\n\n`függvény(…) OVER (PARTITION BY csoport ORDER BY rendezés ROWS BETWEEN … AND …)`\n\n- **PARTITION BY**: mely sorok tartoznak egy csoportba (elhagyva: az egész eredmény egy partíció);\n- **ORDER BY**: sorrend a partíción belül (rangsorhoz, futó összeghez);\n- **keret** (frame): a partíción belül az aktuális sorhoz képest mely sorok számítanak, pl. `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` (3 napos mozgóátlag).\n\nFüggvénycsoportok:\n\n- **rangsorolás**: `ROW_NUMBER()` (1, 2, 3, 4), `RANK()` (holtversenynél ugrik: 1, 2, 2, 4), `DENSE_RANK()` (1, 2, 2, 3), `NTILE(n)`;\n- **eltolás**: `LAG(x)`, `LEAD(x)` – az előző / következő sor értéke (változás az előző naphoz képest), `FIRST_VALUE`, `LAST_VALUE`;\n- **aggregálók ablakként**: `SUM`, `AVG`, `COUNT`, `MIN`, `MAX` `OVER (…)` – futó összeg, csoportátlaghoz viszonyítás.\n\nA logikai kiértékelési sorrendben az ablakfüggvények a `WHERE`, `GROUP BY`, `HAVING` **után**, a `ORDER BY` előtt számolódnak. Ezért eredményükre `WHERE`-ben nem lehet szűrni, csak egy külső lekérdezésben vagy `WITH` (CTE) segítségével.\n\nKorábban ezekhez önillesztés vagy korrelált allekérdezés kellett, ami lassabb és nehezebben olvasható.',
        example: 'Szakonként a 3 legjobb átlagú hallgató: `WITH r AS (SELECT nev, szak, atlag, DENSE_RANK() OVER (PARTITION BY szak ORDER BY atlag DESC) AS hely FROM hallgato) SELECT * FROM r WHERE hely <= 3;`. Futó egyenleg: `SUM(osszeg) OVER (PARTITION BY szamla ORDER BY datum, id)`.',
        pitfall: 'Ha van `ORDER BY`, de nincs keret megadva, az alapértelmezett keret „a partíció elejétől az aktuális sorig” (és az azonos rendezési értékű társakig): ezért ad a `LAST_VALUE` meglepő eredményt, és ezért ugrik a futó összeg az azonos dátumú soroknál. Egyértelmű rendezéshez adj hozzá egyedi oszlopot (pl. id).',
        related: ['group-by', 'select', 'allekerdezes', 'adattarhaz', 'nezet'] },
      { id: 'tarolt-eljaras', term: 'Tárolt eljárás és trigger', en: 'stored procedure and trigger', topic: 'sql',
        short: 'A tárolt eljárás az adatbázisban tárolt, ott futó, névvel hívható programkód; a trigger olyan tárolt kód, amely egy táblán bekövetkező esemény (INSERT, UPDATE, DELETE) hatására automatikusan lefut.',
        text: 'A tárolt kód eljárásnyelven íródik (szabványos neve SQL/PSM; rendszerfüggő dialektusok: PL/SQL, PL/pgSQL, T-SQL). Változókat, elágazást, ciklust, kivételkezelést tartalmazhat, és SQL-utasításokat futtat.\n\n**Tárolt eljárás / függvény** előnyei:\n\n- kevesebb hálózati oda-vissza út: egy hívás több utasítást futtat az adatok mellett;\n- a logika egy helyen van, több alkalmazás közösen használja;\n- jogosultság az eljárásra adható úgy, hogy a táblákhoz közvetlenül nincs hozzáférés;\n- a paraméterek kötöttek, így (dinamikus SQL nélkül) védett az SQL injection ellen.\n\n**Trigger** részei: esemény (`INSERT`, `UPDATE`, `DELETE`), időzítés (`BEFORE`, `AFTER`, nézetnél `INSTEAD OF`), szint (`FOR EACH ROW` – soronként, vagy utasításonként), feltétel (`WHEN`), és a törzs, amely soronként a régi és az új sorértéket (`OLD`, `NEW`) éri el. Felhasználás:\n\n- **naplózás, audit** (ki, mikor, mit módosított);\n- a deklaratív megszorításokkal (CHECK, FOREIGN KEY) nem kifejezhető **összetett szabályok** kikényszerítése;\n- **származtatott vagy denormalizált adatok** szinkronban tartása.\n\nA trigger a kiváltó utasítással **ugyanabban a tranzakcióban** fut: ha hibát dob, az eredeti módosítás is visszagörgetődik.',
        example: 'PostgreSQL-szerű audit trigger: `CREATE TRIGGER fizetes_naplo AFTER UPDATE OF fizetes ON dolgozo FOR EACH ROW WHEN (OLD.fizetes IS DISTINCT FROM NEW.fizetes) EXECUTE FUNCTION naploz();` – a `naploz()` függvény beszúr egy sort a `fizetes_valtozas` táblába a régi és az új értékkel, a felhasználóval és az időponttal.',
        pitfall: 'A triggerek „láthatatlan” logikát adnak: egy egyszerű UPDATE váratlanul lassú lehet, vagy láncreakciót indíthat (trigger triggert hív). Ami deklaratív megszorítással megoldható, azt úgy oldd meg. A tárolt kódban szövegösszefűzéssel épített dinamikus SQL ugyanúgy sebezhető, mint az alkalmazásban.',
        related: ['integritas', 'dml', 'tranzakcio', 'sql-injection', 'denormalizalas', 'jogosultsag'] },

      /* ----- Bővítés: tranzakciók és teljesítmény ----- */
      { id: 'sorbarendezhetoseg', term: 'Ütemezés és sorbarendezhetőség', en: 'schedules and serializability', topic: 'tranz',
        short: 'Párhuzamos tranzakciók műveleteinek egy összefésült sorrendje (ütemezés) akkor helyes, ha sorbarendezhető: hatása megegyezik a tranzakciók valamely soros (egymás utáni) végrehajtásáéval.',
        prereq: ['algoritmusok/grafabrazolas', 'algoritmusok/dfs'],
        text: 'Egy **ütemezés** a tranzakciók olvasási (r) és írási (w) műveleteinek időrendje, amely megtartja a tranzakciókon belüli sorrendet. A **soros** ütemezés helyes, de nem párhuzamos; a cél olyan párhuzamos ütemezés, amely ugyanazt eredményezi.\n\n**Konfliktus**: két művelet különböző tranzakcióból, ugyanazon adatelemen, és legalább egyikük írás (`r–w`, `w–r`, `w–w`). Konfliktusban álló műveletek sorrendje nem cserélhető fel; a többi igen.\n\n**Konfliktus-sorbarendezhető** az ütemezés, ha nem konfliktusos szomszédos műveletek cseréjével soros ütemezéssé alakítható. **Teszt – precedenciagráf**: csúcsok a tranzakciók; él `Tᵢ → Tⱼ`, ha Tᵢ egy művelete konfliktusban áll Tⱼ egy **későbbi** műveletével. Az ütemezés pontosan akkor konfliktus-sorbarendezhető, ha a gráf **körmentes**; az egyenértékű soros sorrendet a gráf **topologikus rendezése** adja.\n\nA tágabb **nézet-sorbarendezhetőség** eldöntése NP-teljes, ezért a gyakorlat a konfliktus-alapú fogalmat használja; a **kétfázisú zárolás** (2PL) minden általa engedett ütemezésre garantálja.\n\nA helyreállíthatóság külön követelmény:\n\n- **helyreállítható** ütemezés: egy tranzakció csak akkor véglegesít, ha minden tranzakció, amelytől olvasott, már véglegesített;\n- **kaszkádmentes**: csak véglegesített adatot olvas (különben egy abort láncreakciót indít);\n- **szigorú**: véglegesítés előtt más nem is írhatja az adatot – ezt a **szigorú 2PL** biztosítja.',
        example: 'S: `r₁(A) w₂(A) w₁(A)`. Konfliktusok: `r₁(A)` előbb van, mint `w₂(A)` → él `T₁ → T₂`; `w₂(A)` előbb, mint `w₁(A)` → él `T₂ → T₁`. Kör van, tehát S nem konfliktus-sorbarendezhető: ez az **elveszett módosítás** – T₂ írását T₁ felülírja, pedig T₁ a régi értékből számolt.',
        pitfall: 'A „körmentes precedenciagráf” elégséges, de nem szükséges feltétele a helyességnek (vannak nézet-sorbarendezhető, de nem konfliktus-sorbarendezhető ütemezések) – a rendszerek ennek ellenére a konfliktus-alapú fogalmat használják. A sorbarendezhetőség a véglegesítés helyes kezelését (helyreállíthatóságot) nem foglalja magában.',
        related: ['tranzakcio', 'zarolas', 'izolacios-szintek', 'mvcc', 'holtpont'] },
      { id: 'mvcc', term: 'Többverziós konkurenciakezelés (MVCC)', en: 'multiversion concurrency control', topic: 'tranz',
        short: 'Az adatelemek több, időbélyeggel ellátott változatát tároljuk; minden tranzakció egy pillanatkép szerinti, konzisztens állapotot olvas, így az olvasók nem blokkolják az írókat, és az írók sem az olvasókat.',
        prereq: ['programozas/kolcsonos-kizaras'],
        text: 'Zárolásos rendszerben egy hosszú jelentés olvasási zárjai feltartják a módosításokat, és fordítva. Az MVCC ezt úgy oldja fel, hogy módosításkor **nem írja felül** a sort, hanem új **verziót** hoz létre; a régi verzió megmarad, amíg valamelyik futó tranzakciónak szüksége lehet rá.\n\nMűködés (egyszerűsítve):\n\n- minden verzió jelöli, melyik tranzakció hozta létre és melyik tette érvénytelenné;\n- a tranzakció (vagy utasítás) indulásakor **pillanatképet** (snapshot) kap: a már véglegesített tranzakciók listáját;\n- olvasáskor mindig az a verzió látszik, amely a pillanatkép szerint érvényes;\n- két tranzakció **ugyanazon sor** írásakor továbbra is ütközés van: az egyik vár vagy hibával megszakad („first committer wins”);\n- a már senkinek sem látható régi verziókat egy háttérfolyamat takarítja (pl. PostgreSQL: `VACUUM`; mások a visszagörgetési naplóból rekonstruálják a régi verziót).\n\nAz MVCC-re épülő **pillanatkép-izoláció** (snapshot isolation) kizárja a piszkos olvasást, a nem megismételhető olvasást és a fantomokat a pillanatképen belül, de **nem** sorbarendezhető: megengedi az **írási ferdeséget** (write skew), amikor két tranzakció ugyanazt a feltételt ellenőrzi, majd **különböző** sorokat ír. Ezt a „Serializable Snapshot Isolation” (SSI) típusú megoldások a veszélyes függőségek felismerésével és az egyik tranzakció megszakításával szüntetik meg.',
        example: 'Írási ferdeség: egy kórházban szabály, hogy legalább 1 orvos ügyeletes. Ketten vannak beosztva; mindkettő egyszerre jelentkezik ki. Mindkét tranzakció a saját pillanatképében 2 ügyeletest lát, ezért mindkettő a **saját** sorát `ugyeletes = false`-ra állítja. Nincs közös sor, nincs írási ütközés – a végén 0 ügyeletes marad.',
        pitfall: 'Hosszú ideig nyitva hagyott tranzakció megakadályozza a régi verziók takarítását, a táblák „felfúvódnak”, a lekérdezések lassulnak. Az, hogy egy rendszer „REPEATABLE READ” vagy „SERIALIZABLE” néven milyen garanciát ad, termékenként eltérhet – mindig a dokumentáció szerinti tényleges viselkedést kell nézni.',
        related: ['izolacios-szintek', 'tranzakcio', 'zarolas', 'sorbarendezhetoseg', 'naplozas'] },
      { id: 'naplozas', term: 'Naplózás és helyreállítás (WAL)', en: 'logging and recovery, write-ahead logging', topic: 'tranz',
        short: 'Az adatbázis minden módosítást előbb a tartós tárolón lévő naplóba ír (write-ahead log), és csak utána az adatlapokra; összeomlás után a napló alapján újrajátssza a véglegesített és visszavonja a befejezetlen tranzakciókat.',
        text: 'A tartósság (ACID „D”) és az atomicitás („A”) megvalósításának fő eszköze. A probléma: az adatlapok a memóriában lévő **pufferben** módosulnak, és nem minden véglegesítéskor kerülnek lemezre (az túl lassú lenne, és véletlen elérésű írásokat jelentene). Áramszünetkor tehát a lemezen lévő állapot se nem régi, se nem új.\n\n**WAL-szabályok**:\n\n1. egy módosított adatlapot csak azután szabad lemezre írni, hogy a rá vonatkozó **naplóbejegyzés** már tartós tárolón van (ez teszi lehetővé a visszavonást, UNDO);\n2. egy tranzakció akkor számít **véglegesítettnek**, amikor a `COMMIT` naplóbejegyzése (és minden előtte lévő bejegyzés) tartós tárolóra került (ez teszi lehetővé az újrajátszást, REDO).\n\nA napló **szekvenciálisan** írható, ezért a véglegesítés gyors; sok tranzakció véglegesítése egy lemezírásban csoportosítható (group commit). A bejegyzések sorszámot (LSN) kapnak, és tartalmazzák a módosított elemet, a régi és az új értéket (vagy a művelet leírását).\n\n**Ellenőrzőpont** (checkpoint): időnként a módosított lapok kiírása és ennek naplózása, hogy helyreállításkor ne kelljen a napló elejétől kezdeni.\n\n**Helyreállítás** – az ARIES algoritmus (Mohan és társai, 1992) három fázisa: **elemzés** (mely tranzakciók voltak aktívak, mely lapok lehetnek elavultak), **REDO** (a történet megismétlése, a befejezetlen tranzakciókkal együtt), **UNDO** (a nem véglegesített tranzakciók visszavonása visszafelé haladva, ezt is naplózva).\n\nA napló a **replikáció** és a **időpontra visszaállítás** (point-in-time recovery: teljes mentés + napló) alapja is.',
        example: 'T₁ véglegesít, T₂ még fut, amikor elmegy az áram. Újraindításkor: T₁ módosításai a naplóból újrajátszódnak (akkor is, ha az adatlapok nem kerültek ki), T₂ módosításai visszavonódnak (akkor is, ha egyes lapjai már a lemezen voltak). Eredmény: mintha T₁ megtörtént volna, T₂ soha.',
        pitfall: 'A „véglegesítés” csak akkor tartós, ha a tároló valóban kiírta az adatot: az írási gyorsítótárat használó, de áramvédelem nélküli lemez vagy az aszinkron véglegesítés (szinkron kiírás kikapcsolása) kis adatvesztést kockáztat. A napló mentése nélkül egy teljes mentés csak a mentés pillanatára állít vissza.',
        related: ['tranzakcio', 'replikacio', 'mvcc', 'holtpont', 'integritas'] },
      { id: 'join-algoritmus', term: 'Illesztési algoritmusok: beágyazott ciklus, összefésülés, hasítás', en: 'join algorithms: nested loop, sort-merge, hash join', topic: 'tranz',
        short: 'Az adatbázis-kezelő három fő módszerrel illeszt táblákat: beágyazott ciklussal (index segítségével vagy blokkonként), rendezés utáni összefésüléssel, illetve hasítótáblával; a választás a táblák méretétől, az indexektől és a memóriától függ.',
        prereq: ['algoritmusok/hasitotabla', 'algoritmusok/osszefesulo-rendezes'],
        text: 'A költséget a **lemezlap-olvasások** (I/O) számában mérjük. Jelölés: B(R) az R tábla lapjainak száma, M a rendelkezésre álló memórialapok száma.\n\n1. **Beágyazott ciklusú illesztés** (nested loop): a külső tábla minden sorához végignézi a belsőt. **Blokkos** változata a memóriát kitöltő külső blokkokhoz olvassa végig a belsőt egyszer – lásd a képletet. Mindenfajta feltételre (pl. `<`, `LIKE`) működik.\n2. **Indexes beágyazott ciklus**: ha a belső tábla illesztő oszlopán index van, minden külső sorhoz egy indexkeresés. Kevés külső sornál (szelektív szűrés után) a legjobb.\n3. **Rendezés-összefésülés** (sort-merge): mindkét táblát az illesztő kulcs szerint rendezi (külső rendezéssel), majd egy menetben összefésüli. Költsége kb. `3 · (B(R) + B(S))`, ha két menetben rendezhető; ha a bemenet már rendezett (index, előző művelet), csak `B(R) + B(S)`. Egyenlőségi és tartomány-feltételre is jó.\n4. **Hasításos illesztés** (hash join): a kisebb táblából (build) memóriában hasítótáblát épít, a nagyobbat (probe) végigolvasva minden sorhoz kikeresi a párját: ha a kisebb elfér a memóriában, `B(R) + B(S)`. Ha nem, mindkét táblát azonos hasítófüggvénnyel részekre bontja (Grace hash join), ami kb. `3 · (B(R) + B(S))`. Csak egyenlőségi feltételre.\n\nAz optimalizáló a **szelektivitás** és a táblastatisztikák alapján becsli a bemenetek méretét, és ez alapján választ; több tábla esetén az **illesztési sorrendet** is (dinamikus programozással).',
        example: 'B(R) = 1000, B(S) = 500, M = 102. Blokkos beágyazott ciklus a kisebb S-sel kívül: `500 + ⌈500/100⌉ · 1000 = 5500` I/O. Hasításos illesztés két menetben: `3 · 1500 = 4500` I/O. Ha S csak 90 lapos lenne, elférne a memóriában: hasítással és blokkos ciklussal is `90 + 1000 = 1090` I/O.',
        pitfall: 'Elavult statisztikák miatt az optimalizáló kis táblára számít, és soronkénti indexes ciklust választ milliós bemenetre – a lekérdezés órákig fut. Ilyenkor először a statisztikákat kell frissíteni (`ANALYZE`) és a végrehajtási tervet (`EXPLAIN ANALYZE`) megnézni, nem a lekérdezést átírni.',
        formulas: ['bnl-koltseg', 'join-becsles'],
        related: ['join', 'optimalizalas', 'index', 'relacios-algebra', 'index-tipusok'] },
      { id: 'index-tipusok', term: 'Indextípusok: klaszterezett, összetett, fedő, hasító', en: 'index types: clustered, composite, covering, hash, bitmap', topic: 'tranz',
        short: 'Az indexek felépítésük és használatuk szerint különböznek: a klaszterezett index a sorok fizikai sorrendjét határozza meg, az összetett index több oszlopra épül, a fedő index önmagában megválaszolja a lekérdezést, a hasítóindex csak egyenlőségre jó.',
        text: '- **Klaszterezett (elsődleges) index**: a tábla sorai az indexkulcs szerinti sorrendben tárolódnak (gyakran maguk a sorok a B+-fa leveleiben). Egy táblának **legfeljebb egy** lehet. Tartomány-lekérdezésre kiváló, mert az egymás utáni kulcsok egymás melletti lapokon vannak.\n- **Másodlagos (nem klaszterezett) index**: a levelekben a kulcs és a sor helye (vagy az elsődleges kulcs) áll; minden találat külön lapolvasást jelenthet. Sok találatnál ezért a teljes táblaolvasás olcsóbb lehet.\n- **Összetett index** (több oszlop): `(szak, evfolyam, nev)` – a rendezés lexikografikus, ezért a **bal oldali előtag** szabálya érvényes: használható `szak`-ra, `szak + evfolyam`-ra, de önmagában `evfolyam`-ra nem. Az egyenlőséggel szűrt oszlopok kerüljenek előre, a tartománnyal szűrt utánuk.\n- **Fedő index** (covering): minden, a lekérdezéshez szükséges oszlopot tartalmaz, így a tábla meg sem nyitódik (index-only scan).\n- **Hasítóindex**: O(1) egyenlőségi keresés, de tartományra és rendezésre nem használható.\n- **Bittérkép-index** (bitmap): kevés különböző értékű oszlopra (nem, megye), adattárházakban; a feltételek bitenkénti ÉS / VAGY műveletekkel kombinálhatók.\n- **Részleges** (feltételes) és **kifejezés-index** (`lower(email)`), **teljes szöveges** (fordított) index.\n\nMinden index gyorsítja az olvasást, de **lassítja az írást** (minden INSERT, UPDATE, DELETE módosítja), és helyet foglal. Indexet a gyakori, szelektív lekérdezésekhez kell tervezni.',
        example: 'Lekérdezés: `SELECT nev FROM hallgato WHERE szak = \'MI\' AND evfolyam = 2 ORDER BY nev;`. Az `(szak, evfolyam, nev)` index egyszerre szűr, rendezett sorrendet ad (nincs külön rendezés) és fedő is, mert a `nev` benne van. Ugyanez az index a `WHERE evfolyam = 2` lekérdezésen nem segít.',
        pitfall: 'Az indexelt oszlopra alkalmazott függvény vagy típuskonverzió kikapcsolja az indexet: `WHERE YEAR(datum) = 2024` helyett `WHERE datum >= \'2024-01-01\' AND datum < \'2025-01-01\'`. A `LIKE \'%alma\'` (elején joker) B-fa indexszel nem gyorsítható.',
        formulas: ['b-fa-magassag', 'szelektivitas'],
        related: ['index', 'optimalizalas', 'join-algoritmus', 'kulcs', 'adattarhaz', 'ddl'] },

      /* ----- Bővítés: elosztott és biztonságos adatkezelés ----- */
      { id: 'replikacio', term: 'Replikáció', en: 'replication', topic: 'modern',
        short: 'Ugyanazon adatok másolatainak (replikáinak) fenntartása több szerveren a rendelkezésre állás, a hibatűrés és az olvasási kapacitás növelésére; a fő kérdés, hogyan és mikor jutnak el a módosítások a másolatokhoz.',
        prereq: ['lecke:informatika/halozatok'],
        text: 'Architektúrák:\n\n- **Vezető–követő** (leader–follower, primary–replica): az írások a vezetőhöz mennek, ő továbbítja a módosítási naplót a követőknek; olvasni a követőkről is lehet. A legelterjedtebb.\n- **Több vezetős** (multi-leader): több helyen is lehet írni (pl. több adatközpont); az egyidejű, ütköző írásokat fel kell oldani (pl. „az utolsó írás nyer”, vagy összefésülés).\n- **Vezető nélküli** (leaderless, Dynamo-stílus): a kliens több replikára ír és több replikáról olvas; a helyességet a **kvórum** adja – lásd a képletet.\n\n**Szinkron vagy aszinkron?**\n\n- **szinkron**: a vezető csak akkor jelez sikert, ha a követő(k) is megerősítették az írást – nincs adatvesztés, de lassabb, és egy elérhetetlen követő megakaszthatja az írást;\n- **aszinkron**: gyors, de a követők **lemaradhatnak** (replikációs késés), és a vezető kiesésekor a még át nem vitt írások elveszhetnek.\n\nA késés miatti anomáliák és a kívánt garanciák: **saját írás olvasása** (read-your-writes: a felhasználó látja, amit ő írt), **monoton olvasás** (nem „ugrik vissza” az időben), **végső konzisztencia** (ha nincs több írás, a replikák idővel egyezni fognak).\n\n**Átállás** (failover) a vezető kiesésekor: új vezető választása, a kliensek átirányítása. Veszélye a **kettészakadt agy** (split brain): két csomópont is vezetőnek hiszi magát. A replikáció **nem helyettesíti a mentést**: egy hibás törlés azonnal minden másolatra átterjed.',
        example: 'Webshop egy vezetővel és két aszinkron követővel: a terméklistázás a követőkről olvas (háromszoros olvasási kapacitás). A felhasználó módosítja a szállítási címét, majd az oldal újratöltésekor egy lemaradt követő még a régit mutatja – megoldás: a saját profilját 1 percig a vezetőről olvassa.',
        pitfall: 'Egy aszinkron követőről olvasott „friss” adat nem feltétlenül friss: pénzügyi döntést (pl. egyenleg-ellenőrzést) a vezetőn kell végezni. A kvórum (`W + R > N`) önmagában nem ad linearizálhatóságot ütköző egyidejű írások és hibák mellett.',
        formulas: ['kvorum', 'cap'],
        related: ['cap-tetel', 'nosql', 'naplozas', 'particionalas', 'tranzakcio'] },
      { id: 'particionalas', term: 'Particionálás és shardolás', en: 'partitioning and sharding', topic: 'modern',
        short: 'Egy nagy tábla adatainak felosztása kisebb részekre (partíciókra) egy kulcs alapján; ha a részek külön szerverekre kerülnek, shardolásról beszélünk – így az adatmennyiség és a terhelés vízszintesen skálázható.',
        text: 'A **replikáció** ugyanazt az adatot másolja, a **particionálás** szétosztja; a kettőt általában együtt használják (minden partíció több replikában).\n\nFelosztás iránya:\n\n- **vízszintes** (soronként): a sorok különböző partíciókba kerülnek – ez a shardolás alapja;\n- **függőleges** (oszloponként): ritkán használt vagy nagy oszlopok (pl. képek, hosszú szövegek) külön táblába.\n\nA partíciókulcs szerinti stratégiák:\n\n- **tartomány** (range): pl. dátum szerint havonta. A tartomány-lekérdezés egy-két partíciót érint, a régi adat egyszerűen leválasztható; de a legújabb partícióra eshet minden írás (**forró pont**);\n- **hasítás** (hash): `hash(kulcs) mod n` – egyenletes eloszlás, de a tartomány-lekérdezés minden partíciót érint, és n változásakor szinte minden adat átrendeződne. Ezt a **konzisztens hasítás** enyhíti: új csomópont felvételekor csak az adatok kis része költözik;\n- **lista**: explicit értékek (ország, régió) szerint.\n\nKövetkezmények:\n\n- a partíciókulcsot tartalmazó lekérdezések csak a releváns partíciót olvassák (**partíciókizárás**, partition pruning);\n- a partíciókon átnyúló illesztés, aggregálás és egyedi megszorítás drága; az elosztott tranzakció **kétfázisú véglegesítést** (2PC) igényel, ami lassú és hibaérzékeny;\n- a jó partíciókulcs gyakori a lekérdezésekben, és egyenletesen osztja el a terhelést.',
        example: 'Üzenetküldő alkalmazás: a beszélgetések a `beszelgetes_id` hasítása szerint 16 shardra oszlanak, így egy beszélgetés összes üzenete egy szerveren van, a megnyitás egyetlen shardot kérdez. A „felhasználó összes üzenete” lekérdezés viszont mind a 16-ot – ehhez külön, felhasználó szerint particionált index kell.',
        pitfall: 'Rossz partíciókulcs (pl. országkód egy főleg egy országban használt rendszerben, vagy egy híresség felhasználói azonosítója) egyetlen túlterhelt partíciót eredményez. A shardolás nagy bonyolultságot hoz; előbb érdemes kimeríteni a függőleges skálázást, az indexeket és a replikákat.',
        related: ['replikacio', 'nosql', 'cap-tetel', 'index-tipusok', 'adattarhaz'] },
      { id: 'jogosultsag', term: 'Jogosultságkezelés (GRANT, REVOKE, szerepkörök)', en: 'database access control: privileges and roles', topic: 'modern',
        short: 'Az adatbázis-kezelő szabályozza, melyik felhasználó vagy szerepkör milyen műveletet (SELECT, INSERT, UPDATE, DELETE, …) végezhet mely objektumokon; az alapelv a legkisebb jogosultság.',
        prereq: ['lecke:informatika/adatbiztonsag'],
        text: 'Két külön lépés: **hitelesítés** (authentication – ki vagy?) és **jogosultságellenőrzés** (authorization – mit tehetsz?).\n\nSQL-ben (DCL, Data Control Language):\n\n- `GRANT SELECT, INSERT ON rendeles TO ugyfelszolgalat;`\n- `REVOKE INSERT ON rendeles FROM ugyfelszolgalat;`\n- `WITH GRANT OPTION`: a jogosult maga is továbbadhatja a jogot; visszavonáskor a továbbadott jogok is visszavonódhatnak (`CASCADE`).\n\nJogosultságok szintjei: adatbázis, séma, tábla, oszlop (`GRANT UPDATE (cim) ON ugyfel …`), és sok rendszerben sorszint (**row-level security**: pl. minden üzletkötő csak a saját ügyfeleit látja). Finomabb hozzáférés nézetekkel is adható: a felhasználó csak a nézetre kap jogot, a mögöttes táblára nem.\n\nModellek:\n\n- **DAC** (diszkrecionális): az objektum tulajdonosa dönt a jogokról – az SQL GRANT ilyen;\n- **RBAC** (szerepkör-alapú): a jogokat **szerepkörökhöz** rendeljük (könyvelő, olvasó), a felhasználók szerepköröket kapnak. Személycserénél csak a szerepkör-tagság változik;\n- **MAC** (kötelező): biztonsági címkék (titkos, szigorúan titkos) alapján, a rendszer kényszeríti ki.\n\nGyakorlati elvek: a **legkisebb jogosultság** elve (az alkalmazás felhasználója ne legyen rendszergazda, ne tudjon táblát törölni); **feladatok szétválasztása**; **naplózás** (audit) az érzékeny adatokhoz való hozzáférésről; **titkosítás** átvitel közben és tároláskor; személyes adatoknál álnevesítés.',
        example: '`CREATE ROLE riport_olvaso; GRANT SELECT ON ertekesites_osszesito TO riport_olvaso; GRANT riport_olvaso TO kovacs_anna;` – Anna lekérdezheti az összesítő nézetet, de az egyedi vevőadatokat tartalmazó táblákat nem, és semmit nem módosíthat. Ha Anna munkakört vált, egyetlen `REVOKE riport_olvaso FROM kovacs_anna;` elég.',
        pitfall: 'Ha a webalkalmazás tulajdonosi (minden jogot birtokló) felhasználóval csatlakozik, egy SQL injection az egész adatbázist veszélyezteti, akár `DROP TABLE` is lefuthat. A jogosultságkezelés nem helyettesíti a paraméterezett lekérdezéseket – a kettő együtt ad mélységi védelmet.',
        related: ['sql-injection', 'nezet', 'tarolt-eljaras', 'ddl', 'integritas'] }
    ]
  });
})();
