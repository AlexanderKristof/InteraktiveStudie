/* Tudásműhely – 🎧 Hangos tanulás.
 * A leckékből „podcast” készül: bevezető, a szakaszok felolvasható szövegre alakítva (jelölés, emojik,
 * képletek, mértékegységek, rövidítések, tizedes törtek kiejthető alakban), szünetek, a végén felolvasott
 * kvízkérdések gondolkodási idővel. A böngésző beépített felolvasóját (Web Speech API) használja.
 * Útvonalak: #/hangos · #/hangos/<tárgy> · #/hangos/utvonal/<útvonal> · #/hangos/<tárgy>/<lecke>[?lista=targy|ut:<id>]
 * Tárolás: 'hangos' → { rate, voice, think, wake, quiz, pos: { 'tárgy/lecke': { i, lv } }, heard: { kulcs: dátum }, last: { key, list } }
 * Nyilvános segédek: S.hangos.toSpeech(szöveg), S.hangos.script(tárgy, lecke, szint), S.hangos.chunks(szöveg). */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  var LT = 'A-Za-z\\u00C0-\\u024F';

  /* ================= szöveg → kiejthető szöveg ================= */
  var PROGRAM = /(^\s*#\s)|(\b(print|input|def|while|for|if|elif|else|return|import|range|len|function|var|let|const|console\.log|SELECT|FROM|WHERE|INSERT|UPDATE|class)\b\s*[\(:\w])|==|!=|\+=|:\s*$|^\s{2,}\S|\{\s*$|^\s*\}|\w\(\)/;
  var CODE_MSG = ' (Itt egy programkód-részlet áll, ezt a képernyőn érdemes megnézni.) ';

  function rx(s, f) { return new RegExp(s, f || 'g'); }
  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&'); }

  /* rövidítések (a pont még a helyén van) */
  var ABBR = [
    ['Kr. e.', 'Krisztus előtt'], ['Kr. u.', 'Krisztus után'], ['Kr.e.', 'Krisztus előtt'], ['Kr.u.', 'Krisztus után'],
    ['i. e.', 'időszámításunk előtt'], ['i. sz.', 'időszámításunk szerint'], ['pl.', 'például'], ['Pl.', 'Például'],
    ['kb.', 'körülbelül'], ['Kb.', 'Körülbelül'], ['stb.', 'és így tovább'], ['ill.', 'illetve'], ['ún.', 'úgynevezett'],
    ['vö.', 'vesd össze'], ['ld.', 'lásd'], ['Ld.', 'Lásd'], ['max.', 'maximum'], ['min.', 'minimum'], ['ált.', 'általában'],
    ['tkp.', 'tulajdonképpen'], ['ti.', 'tudniillik'], ['dr.', 'doktor'], ['Dr.', 'doktor'], ['id.', 'idősebb'], ['ifj.', 'ifjabb'],
    ['Ptk.', 'Polgári Törvénykönyv'], ['Btk.', 'Büntető Törvénykönyv'], ['Mt.', 'Munka Törvénykönyve'], ['Fgytv.', 'fogyasztóvédelmi törvény'],
    ['Alaptv.', 'Alaptörvény'], ['Bp.', 'Budapest'], ['tel.', 'telefon'], ['cca.', 'körülbelül'], ['cca', 'körülbelül'], ['vs.', 'kontra'],
    ['ford.', 'fordította'], ['évf.', 'évfolyam'], ['jan.', 'január'], ['febr.', 'február'], ['márc.', 'március'], ['ápr.', 'április'],
    ['jún.', 'június'], ['júl.', 'július'], ['aug.', 'augusztus'], ['szept.', 'szeptember'], ['okt.', 'október'], ['nov.', 'november'], ['dec.', 'december'],
    ['db', 'darab'], ['mp', 'másodperc'], ['Ft', 'forint'], ['mrd', 'milliárd'], ['Mrd', 'milliárd'], ['e Ft', 'ezer forint'], ['eFt', 'ezer forint'],
    ['M Ft', 'millió forint'], ['MFt', 'millió forint'], ['és/vagy', 'és vagy'], ['C#', 'C sharp'], ['C++', 'C plusz plusz']
  ].sort(function (a, b) { return b[0].length - a[0].length; });
  var ABBR_RE = rx('(^|[^' + LT + '#+])(' + ABBR.map(function (a) { return escRe(a[0]); }).join('|') + ')(?![' + LT + '])');
  var ABBR_MAP = {}; ABBR.forEach(function (a) { ABBR_MAP[a[0]] = a[1]; });

  /* mértékegységek: csak szám után (a többértelműek miatt) */
  var UNITS = {
    'km': 'kilométer', 'm': 'méter', 'dm': 'deciméter', 'cm': 'centiméter', 'mm': 'milliméter', 'μm': 'mikrométer', 'µm': 'mikrométer', 'nm': 'nanométer',
    'km²': 'négyzetkilométer', 'm²': 'négyzetméter', 'dm²': 'négyzetdeciméter', 'cm²': 'négyzetcentiméter', 'mm²': 'négyzetmilliméter',
    'm³': 'köbméter', 'dm³': 'köbdeciméter', 'cm³': 'köbcentiméter', 'mm³': 'köbmilliméter',
    'l': 'liter', 'L': 'liter', 'dl': 'deciliter', 'cl': 'centiliter', 'ml': 'milliliter', 'hl': 'hektoliter',
    'kg': 'kilogramm', 'g': 'gramm', 'dkg': 'dekagramm', 'mg': 'milligramm', 'μg': 'mikrogramm', 'µg': 'mikrogramm', 't': 'tonna',
    's': 'másodperc', 'ms': 'milliszekundum', 'μs': 'mikroszekundum', 'µs': 'mikroszekundum', 'ns': 'nanoszekundum', 'min': 'perc', 'h': 'óra',
    'N': 'newton', 'kN': 'kilonewton', 'Nm': 'newtonméter', 'J': 'dzsúl', 'kJ': 'kilodzsúl', 'MJ': 'megadzsúl', 'cal': 'kalória', 'kcal': 'kilokalória',
    'W': 'watt', 'kW': 'kilowatt', 'MW': 'megawatt', 'GW': 'gigawatt', 'Wh': 'wattóra', 'kWh': 'kilowattóra', 'MWh': 'megawattóra', 'GWh': 'gigawattóra', 'TWh': 'terawattóra',
    'Wp': 'watt csúcsteljesítmény', 'kWp': 'kilowatt csúcsteljesítmény', 'VA': 'voltamper', 'kVA': 'kilovoltamper', 'LE': 'lóerő',
    'V': 'volt', 'mV': 'millivolt', 'kV': 'kilovolt', 'A': 'amper', 'mA': 'milliamper', 'kA': 'kiloamper', 'Ah': 'amperóra', 'mAh': 'milliamperóra',
    'Ω': 'ohm', 'kΩ': 'kiloohm', 'MΩ': 'megaohm', 'mΩ': 'milliohm', 'μF': 'mikrofarad', 'µF': 'mikrofarad', 'nF': 'nanofarad', 'pF': 'pikofarad', 'mH': 'millihenry',
    'Hz': 'hertz', 'kHz': 'kilohertz', 'MHz': 'megahertz', 'GHz': 'gigahertz', 'Pa': 'pascal', 'kPa': 'kilopascal', 'MPa': 'megapascal', 'hPa': 'hektopascal', 'GPa': 'gigapascal',
    'bar': 'bar', 'mbar': 'millibar', 'K': 'kelvin', 'mol': 'mol', 'mmol': 'millimol', 'dB': 'decibel', 'lx': 'lux', 'lm': 'lumen', 'cd': 'kandela',
    'bit': 'bit', 'kbit': 'kilobit', 'Mbit': 'megabit', 'Gbit': 'gigabit', 'B': 'bájt', 'kB': 'kilobájt', 'KB': 'kilobájt', 'MB': 'megabájt', 'GB': 'gigabájt', 'TB': 'terabájt',
    'Hgmm': 'higanymilliméter', 'ppm': 'milliomodrész', 'rpm': 'fordulat per perc', 'ford': 'fordulat', 'kcal/nap': 'kilokalória naponta', 'km/h': 'kilométer per óra',
    'forint': 'forint', 'év': 'év', 'hó': 'hónap', 'nap': 'nap', 'fő': 'fő', 'db': 'darab', 'perc': 'perc', 'óra': 'óra'
  };
  var DEN = { 's': 'szekundum', 's²': 'szekundum négyzet', 'h': 'óra', 'ó': 'óra', 'min': 'perc', 'Ft': 'forint' };
  var UNIT_KEYS = Object.keys(UNITS).sort(function (a, b) { return b.length - a.length; }).map(escRe).join('|');
  var DEN_KEYS = Object.keys(UNITS).concat(Object.keys(DEN)).sort(function (a, b) { return b.length - a.length; }).map(escRe).join('|');
  var END = '(?:-(?=[a-z\\u00C0-\\u024F])|(?![' + LT + '0-9\\u00B2\\u00B3]))';
  var COMPOSITE_RE = rx('(^|[^' + LT + '])(' + UNIT_KEYS + '|Ft|€)/(' + DEN_KEYS + ')' + END);
  var NUM_UNIT_RE = rx('(\\d)[ \\u00A0]?(' + UNIT_KEYS + ')' + END);
  /* szám nélkül is egyértelmű jelek */
  var SAFE = ['km', 'cm', 'mm', 'kg', 'mg', 'dkg', 'ml', 'dl', 'kWh', 'MWh', 'GWh', 'TWh', 'Wh', 'kW', 'MW', 'kWp', 'mA', 'mV', 'kV', 'mAh', 'Ah', 'Hz', 'kHz', 'MHz', 'GHz', 'kPa', 'MPa', 'hPa', 'kN', 'Nm', 'kJ', 'MJ', 'kcal', 'dB', 'Hgmm', 'km²', 'm²', 'm³', 'cm²', 'cm³', 'dm³', 'mm²', 'kΩ', 'MΩ', 'Ω', 'μF', 'µF', 'kVA'];
  var SAFE_RE = rx('(^|[^' + LT + '0-9])(' + SAFE.sort(function (a, b) { return b.length - a.length; }).map(escRe).join('|') + ')' + END);

  var GREEK = { 'α': 'alfa', 'β': 'béta', 'γ': 'gamma', 'δ': 'delta', 'Δ': 'delta', 'ε': 'epszilon', 'η': 'éta', 'θ': 'téta', 'λ': 'lambda',
    'μ': 'mű', 'µ': 'mű', 'ν': 'nű', 'π': 'pí', 'ρ': 'ró', 'σ': 'szigma', 'Σ': 'szumma', 'τ': 'tau', 'φ': 'fí', 'Φ': 'fí', 'ω': 'omega', 'Ω': 'ohm', 'χ': 'khí', 'ψ': 'pszí', 'κ': 'kappa', 'ζ': 'dzéta', 'ξ': 'kszí' };
  var SYM = [
    ['⇔', ' akkor és csak akkor, ha '], ['⇒', ' ebből következik: '], ['⇌', ' egyensúlyban '], ['↔', ' oda-vissza '], ['→', ', majd '], ['←', ' visszafelé '], ['↑', ' fel '], ['↓', ' le '],
    ['≈', ' körülbelül '], ['≠', ' nem egyenlő '], ['≤', ' kisebb vagy egyenlő, mint '], ['≥', ' nagyobb vagy egyenlő, mint '], ['≡', ' azonos '], ['∝', ' egyenesen arányos '],
    ['±', ' plusz-mínusz '], ['∞', ' végtelen '], ['∫', ' integrál '], ['∑', ' szumma '], ['∈', ' eleme '], ['∉', ' nem eleme '], ['∩', ' metszet '], ['∪', ' unió '], ['⊂', ' részhalmaza '],
    ['′', ' vessző '], ['″', ' két vessző '], ['‰', ' ezrelék'], ['§', ' paragrafus'], ['♯', ' kereszt'], ['♭', ' bé'], ['♮', ' feloldójel'], ['♩', ' negyedhang'], ['♪', ' nyolcadhang'],
    ['½', ' fél '], ['¼', ' negyed '], ['¾', ' háromnegyed '], ['⅓', ' harmad '], ['⅔', ' kétharmad '], ['€', ' euró'], ['$', ' dollár'], ['£', ' font'], ['&', ' és '], ['@', ' kukac '], ['×', ' szorozva '], ['·', ' szorozva '], ['⋅', ' szorozva '], ['÷', ' osztva '], ['−', ' mínusz '], ['–', ' – '], ['—', ' – ']
  ];
  var SUP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
  var SUB = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' };
  var FRAC = { 2: 'ketted', 3: 'harmad', 4: 'negyed', 5: 'ötöd', 6: 'hatod', 7: 'heted', 8: 'nyolcad', 9: 'kilenced', 10: 'tized', 100: 'század', 1000: 'ezred' };

  function azA(n) { n = +n; return (n === 1 || n === 5 || (n >= 50 && n < 60) || (n >= 500 && n < 600) || (n >= 1000 && n < 2000)) ? 'az' : 'a'; }
  function power(nStr, neg) {
    if (!neg && nStr === '2') return ' a négyzeten';
    if (!neg && nStr === '3') return ' a köbön';
    return neg ? ' a mínusz ' + nStr + '. hatványon' : ' ' + azA(nStr) + ' ' + nStr + '. hatványon';
  }
  /* -tól/-től a szám kiejtett alakjának utolsó tagja szerint */
  function tol(numStr) {
    var p = String(numStr).split(','), n = parseInt(p.length > 1 ? p[1].replace(/^0+/, '') || '0' : p[0], 10) || 0;
    var back = { 1: 'től', 2: 'től', 3: 'tól', 4: 'től', 5: 'től', 6: 'tól', 7: 'től', 8: 'tól', 9: 'től' };
    var tens = { 1: 'től', 2: 'tól', 3: 'tól', 4: 'től', 5: 'től', 6: 'tól', 7: 'től', 8: 'tól', 9: 'től' };
    if (n === 0) return 'tól';
    if (n % 10) return back[n % 10];
    if (n % 100) return tens[(n % 100) / 10];
    if (n % 1000) return 'tól';
    if (n % 1000000) return 'től';
    return 'tól';
  }
  function roman(s) {
    var v = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }, n = 0;
    for (var i = 0; i < s.length; i++) { var a = v[s[i]], b = v[s[i + 1]] || 0; n += a < b ? -a : a; }
    var back = '', t = n, tab = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
    tab.forEach(function (x) { while (t >= x[0]) { back += x[1]; t -= x[0]; } });
    return back === s ? n : 0;
  }

  function toSpeech(src) {
    var t = String(src == null ? '' : src);
    /* 1. nyers HTML, linkek, kód */
    t = t.replace(/<br\s*\/?>/gi, '. ').replace(/<\/?[a-zA-Z][^<>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&amp;/g, '&');
    t = t.replace(/\[\[[^|\]]*\|([^\]]*)\]\]/g, '$1').replace(/\[\[([^\]|]*)\]\]/g, '$1').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
    t = t.replace(/`([^`\n]*)`/g, function (m, c) { return PROGRAM.test(c) ? ' \u0001 ' : ' ' + c + ' '; });
    t = t.replace(/\u0001(?:[\s.,;:]*\u0001)*/g, CODE_MSG).replace(/`/g, ' ');
    t = t.replace(/\*\*/g, '').replace(/__/g, ' ').replace(/^\s{0,3}#{1,6}\s+/gm, '').replace(/^\s*>\s?/gm, '');
    t = t.replace(/^\s*\|?\s*:?-{2,}.*$/gm, '').replace(/\s*\|\s*/g, ', ');
    t = t.replace(/#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/g, ' hexa $1 ');
    /* 2. emojik és díszítő jelek */
    t = t.replace(/[\uD83C-\uD83E][\uDC00-\uDFFF]|[☀-♨♰-➿⬀-⯿⏩-⏿️‍­■-◿®©™]/g, '');
    /* 3. rövidítések, római számok */
    t = t.replace(/(\d+|[IVXLCDM]+)\.\s*sz\.(?=\s|$|[,;:])/g, '$1. század');
    t = t.replace(ABBR_RE, function (m, pre, a) { return pre + ABBR_MAP[a]; });
    t = t.replace(/(^|[^A-Za-zÀ-ɏ])([IVXLCDM]{2,7}|[IVX])\.(?=\s+[A-Za-zÀ-ɏ\d])/g, function (m, pre, r) { var n = roman(r); return n ? pre + n + '.' : m; });
    /* 4. mértékegységek */
    t = t.replace(/°\s?C\b/g, ' fok Celsius').replace(/°\s?F\b/g, ' fok Fahrenheit').replace(/°/g, ' fok');
    t = t.replace(/\b(\d+)\s?l\/100\s?km\b/g, '$1 liter per 100 kilométer');
    t = t.replace(COMPOSITE_RE, function (m, pre, a, b) { return pre + (a === '€' ? 'euró' : a === 'Ft' ? 'forint' : UNITS[a]) + ' per ' + (DEN[b] || UNITS[b]) + (m.charAt(m.length - 1) === '-' ? '' : ' '); });
    t = t.replace(NUM_UNIT_RE, function (m, d, u) { return d + ' ' + UNITS[u] + (m.charAt(m.length - 1) === '-' ? '' : ' '); });
    t = t.replace(SAFE_RE, function (m, pre, u) { return pre + UNITS[u] + (m.charAt(m.length - 1) === '-' ? '' : ' '); });
    t = t.replace(/\s?%(-(?=[a-zÀ-ɏ]))?/g, function (m, h) { return ' százalék' + (h ? '' : ' '); });
    /* 5. hatványok, indexek, töltések */
    t = t.replace(/([⁰¹²³⁴⁵⁶⁷⁸⁹]+)([⁺⁻])/g, function (m, d, s) { return ' ' + d.split('').map(function (c) { return SUP[c]; }).join('') + (s === '⁺' ? ' plusz ' : ' mínusz '); });
    t = t.replace(/(⁻?)([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, function (m, neg, d) { return power(d.split('').map(function (c) { return SUP[c]; }).join(''), !!neg) + ' '; });
    t = t.replace(/⁺/g, ' plusz ').replace(/⁻/g, ' mínusz ').replace(/₊/g, ' plusz ').replace(/₋/g, ' mínusz ');
    t = t.replace(/ᵢ/g, ' i ').replace(/ⱼ/g, ' j ').replace(/ₙ/g, ' n ').replace(/ⁱ/g, ' az i-edik hatványon ').replace(/ⁿ/g, ' az n-edik hatványon ').replace(/[\u1D00-\u1DBF\u2070-\u209F]/g, function (c) { return SUB[c] ? ' ' + SUB[c] + ' ' : SUP[c] || ' '; });
    t = t.replace(/[₀-₉]+/g, function (d) { return ' ' + d.split('').map(function (c) { return SUB[c]; }).join('') + ' '; });
    t = t.replace(/\^\(([^()]*)\)/g, ' a következő hatványon: ($1) ')
      .replace(/\^(-?)(\d+)(?![,\d])/g, function (m, neg, d) { return power(d, !!neg) + ' '; })
      .replace(/\^([A-Za-z])\b/g, ' az $1-edik hatványon ')
      .replace(/\^(-?[\d,]+)/g, ' a következő hatványon: $1 ').replace(/\^/g, ' ');
    t = t.replace(/([A-Za-zΑ-ω])_\{([^}]*)\}/g, '$1 $2').replace(/([A-Za-zΑ-ω])_([A-Za-z0-9À-ɏ]+)/g, '$1 $2').replace(/[{}]/g, ' ');
    t = t.replace(/√\s*\(/g, ' négyzetgyök alatt (').replace(/√/g, ' négyzetgyök ');
    /* 6. számok: ezres tagolás, tartományok, negatív számok, törtek, tizedes vessző */
    t = t.replace(/(^|[^\d,])(\d{1,3}(?:[   ]\d{3})+)(?![\d,])/g, function (m, pre, n) { return pre + n.replace(/[   ]/g, ''); });
    t = t.replace(/\b(1[5-9]\d\d|20\d\d)\/(\d{2}|\d{4})\b/g, '$1–$2');
    t = t.replace(/(\d+(?:,\d+)?)\s?[–]\s?(\d+(?:,\d+)?)(?!\d|\.\s|\.$|,\d)/g, function (m, a, b) { return a + '-' + tol(a) + ' ' + b + '-ig'; });
    t = t.replace(/(^|[\s(=:;])[-−](\d)/g, '$1mínusz $2');
    t = t.replace(/(^|[^\d\/,])(\d+)\/(\d+)(?![\d\/]|,\d)/g, function (m, pre, a, b) { return pre + a + (FRAC[b] && +a < 10 ? ' ' + FRAC[b] : ' per ' + b); });
    t = t.replace(/(\d+),(\d+)/g, function (m, a, b) { var z = b.match(/^0*/)[0]; var rest = b.slice(z.length); return a + ' egész ' + (z ? new Array(z.length + 1).join('nulla ') : '') + (rest || ''); });
    /* 7. műveleti jelek, görög betűk, egyéb jelek */
    SYM.forEach(function (p) { if (t.indexOf(p[0]) >= 0) t = t.split(p[0]).join(p[1]); });
    t = t.replace(/[α-ωΑ-Ωµ]/g, function (c) { return GREEK[c] ? ' ' + GREEK[c] + ' ' : ' '; });
    t = t.replace(/\s?==\s?/g, ' egyenlő ').replace(/\s?!=\s?/g, ' nem egyenlő ').replace(/\s?<=\s?/g, ' kisebb vagy egyenlő, mint ').replace(/\s?>=\s?/g, ' nagyobb vagy egyenlő, mint ')
      .replace(/\s?=\s?/g, ' egyenlő ').replace(/\s<\s?|\s?<\s/g, ' kisebb, mint ').replace(/\s>\s?|\s?>\s/g, ' nagyobb, mint ').replace(/[<>]/g, ' ')
      .replace(/(\S)\s?\+\s?(?=\S)/g, '$1 plusz ').replace(/\+/g, ' plusz ')
      .replace(/(\S)\s\*\s(?=\S)/g, '$1 szorozva ').replace(/\*/g, ' ')
      .replace(/(\w)\s-\s(?=[\w(])/g, function (m, a) { return /\d/.test(a) ? a + ' mínusz ' : m; })
      .replace(/\s\/\s/g, ' osztva ').replace(/(^|[^A-Za-z\u00C0-\u024F])([a-z\u00E0-\u024F]+)\/([a-z\u00E0-\u024F]+)(?![A-Za-z\u00C0-\u024F])/g, function (m, pre, a, b) { return a.length + b.length > 2 ? pre + a + ' vagy ' + b : m; }).replace(/([^\s\/])\/(?=[^\s\/])/g, '$1 per ').replace(/\//g, ' ')
      .replace(/~/g, ' ekvivalens ').replace(/[\\_|#\[\]\u0001]/g, ' ');
    /* 8. takarítás */
    t = t.replace(/\.{3}/g, '…').replace(/\s+/g, ' ').replace(/\s+([.,;:!?…)])/g, '$1').replace(/\(\s+/g, '(').replace(/\(\)/g, '')
      .replace(/([.,;:!?])(?=[A-Za-zÀ-ɏ])/g, '$1 ').replace(/,\s*,/g, ',').replace(/\.\s*\./g, '.').replace(/\bundefined\b|\bnull\b|\bNaN\b/g, '').trim();
    return t;
  }

  /* egy válaszlehetőség lehet puszta mértékegység is („N”, „kWh”) */
  function optSpeech(o) { var k = String(o).trim(); return UNITS[k] && k.length < 6 ? UNITS[k] : toSpeech(o); }

  /* Mondatokra, majd rövid darabokra bontás (Chrome ~15 mp után megszakíthatja a hosszú felolvasást). */
  var MAXC = 170;
  function sentences(t) {
    var out = [], start = 0, re = /[.!?…]+["”»)]?\s+/g, m;
    while ((m = re.exec(t))) {
      var end = m.index + m[0].length, prev = t.charAt(m.index - 1), next = t.charAt(end);
      if (m[0].charAt(0) === '.' && /\d/.test(prev)) continue; /* sorszám: „19. század”, „4. Béla” */
      if (/[a-zà-ɏ]/.test(next) && next.toUpperCase() !== next) continue;
      out.push(t.slice(start, end).trim()); start = end;
    }
    if (start < t.length) out.push(t.slice(start).trim());
    return out.filter(Boolean);
  }
  function chunks(t) {
    var out = [];
    sentences(t).forEach(function (s) {
      if (s.length <= MAXC) { out.push(s); return; }
      var parts = s.split(/([,;:–]\s)/), cur = '';
      for (var i = 0; i < parts.length; i += 2) {
        var piece = parts[i] + (parts[i + 1] || '');
        if (cur && (cur + piece).length > MAXC) { out.push(cur.trim()); cur = ''; }
        cur += piece;
        while (cur.length > MAXC + 40) { var cut = cur.lastIndexOf(' ', MAXC); if (cut < 40) cut = MAXC; out.push(cur.slice(0, cut).trim()); cur = cur.slice(cut); }
      }
      if (cur.trim()) out.push(cur.trim());
    });
    return out.filter(function (x) { return /[0-9A-Za-zÀ-ɏ]/.test(x); });
  }

  /* ================= lecke → forgatókönyv ================= */
  function endDot(s) { s = s.trim().replace(/\s*[,;–-]+$/, ''); return /[.!?…:]["”»)]?$/.test(s) ? s : s + '.'; }
  /* markdown-szöveg → elemek (mondatdarabok szünetekkel) */
  function mdItems(text, prefix) {
    var items = [];
    String(text || '').trim().split(/\n\s*\n/).forEach(function (block, bi) {
      var lines = block.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
      var para = [];
      lines.forEach(function (l) {
        var li = /^([-*•]\s+|\d+[.)]\s+)/.test(l);
        var s = toSpeech(l.replace(/^([-*•]\s+|\d+[.)]\s+)/, ''));
        if (!s) return;
        if (li || /`/.test(l)) {
          if (para.length) { items.push(para.join(' ')); para = []; }
          if (s.indexOf(CODE_MSG.trim()) === 0 && items.length && items[items.length - 1].indexOf(CODE_MSG.trim()) >= 0) s = s.slice(CODE_MSG.trim().length).trim();
          if (s) items.push(endDot(s));
        }
        else para.push(endDot(s));
      });
      if (para.length) items.push(para.join(' '));
      items.push('\u0000'); /* bekezdéshatár */
    });
    var out = [], first = true;
    items.forEach(function (x) {
      if (x === '\u0000') { if (out.length) out[out.length - 1].p = 750; return; }
      chunks(x).forEach(function (c) {
        if (first && prefix) { c = prefix + ' ' + c; first = false; }
        out.push({ t: c, p: 380 });
      });
    });
    return out;
  }
  function seeded(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul ? Math.imul(h, 16777619) : (h * 16777619) | 0; } return function () { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 100000) / 100000; }; }
  var ORD = ['első', 'második', 'harmadik', 'negyedik', 'ötödik', 'hatodik'];
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function quizPick(s, l, n) {
    var bank = (S.bank && S.bank[s.id] && S.bank[s.id][l.id]) || [], seen = {}, pool = [];
    (l.quiz || []).concat(bank).forEach(function (q) {
      if (!q || !q.q || !q.options || q.options.length < 2 || q.options.length > 6 || !(q.answer >= 0 && q.answer < q.options.length)) return;
      var k = S.norm(q.q); if (seen[k]) return; seen[k] = 1; pool.push(q);
    });
    var r = seeded(s.id + '/' + l.id), own = pool.slice(0, (l.quiz || []).length), rest = pool.slice(own.length);
    function sh(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
    var picked = sh(own).slice(0, Math.ceil(n * 0.6));
    picked = picked.concat(sh(rest).slice(0, n - picked.length));
    if (picked.length < n) picked = picked.concat(sh(own).filter(function (q) { return picked.indexOf(q) < 0; }).slice(0, n - picked.length));
    return picked;
  }

  /* A forgatókönyv: szakaszok (segs) → elemek (items: { t: szöveg, p: szünet ms, think: true }) */
  function buildScript(s, l, level, opt) {
    opt = opt || {};
    var uni = level === 'egyetem', lu = uni ? S.lessonUni[s.id + '/' + l.id] : null, segs = [];
    var nq = opt.quiz === false ? 0 : (uni ? 5 : 3);
    var qs = nq ? quizPick(s, l, nq) : [];
    var intro = { kind: 'intro', title: 'Bevezető', items: [] };
    segs.push(intro);
    if (lu && lu.text) segs.push({ kind: 'uni', title: '🎓 Egyetemi / szakmai összefoglaló', items: [{ t: 'Egyetemi, szakmai összefoglaló.', p: 700 }].concat(mdItems(lu.text)) });
    if (lu && lu.glossary && lu.glossary.length) {
      var g = { kind: 'gloss', title: '📖 Szakszavak', items: [{ t: 'A legfontosabb szakszavak.', p: 600 }] };
      lu.glossary.slice(0, 15).forEach(function (x) {
        var d = toSpeech(x.def || ''); if (!x.hu) return;
        chunks(endDot(toSpeech(x.hu) + (d ? ': ' + d : ''))).forEach(function (c) { g.items.push({ t: c, p: 450 }); });
      });
      segs.push(g);
    }
    if (uni && lu && lu.text) segs.push({ kind: 'note', title: '🎒 Az alapok', items: [{ t: 'Most jönnek az alapok, egyszerűbb nyelven, ahogy a leckében is szerepelnek.', p: 800 }] });
    (l.sections || []).forEach(function (sec, i) {
      var items = [];
      if (sec.title) items.push({ t: endDot(toSpeech(sec.title)), p: 650 });
      items = items.concat(mdItems(sec.text));
      if (sec.tip) items = items.concat(mdItems(sec.tip, 'Jó tudni:'));
      if (sec.warn) items = items.concat(mdItems(sec.warn, 'Figyelem!'));
      if (sec.widget) items.push({ t: uni ? 'Ehhez a részhez interaktív feladat is tartozik, ezt a lecke oldalán érdemes kipróbálni.' : 'Ehhez a részhez egy kipróbálható gyakorló is tartozik, azt majd a lecke oldalán nézd meg.', p: 500 });
      if (!items.length) return;
      items[items.length - 1].p = 1300;
      segs.push({ kind: 'sec', title: sec.title || ((i + 1) + '. rész'), items: items });
    });
    qs.forEach(function (q, k) {
      var it = [];
      if (k === 0) it.push({ t: uni ? 'Végül ellenőrző kérdések következnek. Minden kérdés után van egy kis gondolkodási idő, utána elhangzik a helyes válasz és az indoklás.' : 'Jöhet a kvíz! Felolvasom a kérdést és a lehetőségeket, utána gondolkodhatsz egy kicsit, aztán elmondom a helyes választ.', p: 900 });
      it.push({ t: (k + 1) + '. kérdés. ' + endDot(toSpeech(q.q)), p: 600 });
      q.options.forEach(function (o, j) { it.push({ t: cap(ORD[j]) + ' lehetőség: ' + endDot(optSpeech(o)), p: 420, opt: j }); });
      it.push({ t: 'Gondolkodj!', think: true, p: 0 });
      var ans = 'A helyes válasz ' + (j0(q.answer)) + ' ' + ORD[q.answer] + ' lehetőség: ' + endDot(optSpeech(q.options[q.answer]));
      it.push({ t: ans, p: 500, ans: true });
      if (q.explain) chunks(toSpeech(q.explain)).forEach(function (c) { it.push({ t: c, p: 380 }); });
      it[it.length - 1].p = 1500;
      segs.push({ kind: 'quiz', title: '❓ ' + (k + 1) + '. kérdés', items: it, q: q });
    });
    function j0(i) { return i === 0 || i === 4 ? 'az' : 'a'; }
    var outroT = uni ? 'Ezzel a lecke végére értünk. A képleteket, ábrákat és az interaktív elemeket a lecke oldalán találod.' : 'Ennyi volt a lecke. Szép munka! Ha kedved van, a lecke oldalán kipróbálhatod az interaktív feladatokat is.';
    segs.push({ kind: 'outro', title: 'Zárás', items: [{ t: outroT, p: 600 }] });

    /* bevezető a végén, hogy a becsült időt is tartalmazza */
    var chars = 0, pauses = 0;
    segs.forEach(function (sg) { sg.items.forEach(function (x) { chars += x.t.length; pauses += x.p || 0; if (x.think) pauses += (opt.think || 6) * 1000; }); });
    var mins = Math.max(1, Math.round((chars / 14 + pauses / 1000) / 60));
    var sum = l.summary ? endDot(toSpeech(l.summary)) : '';
    var introT = uni
      ? 'Üdvözöllek! Ez a Tudásműhely hangos leckéje, egyetemi szinten. Tantárgy: ' + toSpeech(s.title) + '. Téma: ' + endDot(toSpeech(l.title)) + ' ' + sum + ' ' +
        (lu && lu.text ? 'Először a szakmai összefoglaló következik' + (lu.glossary && lu.glossary.length ? ', majd a legfontosabb szakszavak' : '') + ', utána az alapok' : 'Ehhez a leckéhez nincs külön egyetemi kiegészítés, ezért az alapanyagot hallod') +
        (qs.length ? ', végül ' + qs.length + ' ellenőrző kérdés.' : '.') + ' A hanganyag nagyjából ' + mins + ' perc.'
      : 'Szia! Ez a Tudásműhely hangos leckéje. Tantárgy: ' + toSpeech(s.title) + '. A mai téma: ' + endDot(toSpeech(l.title)) + ' ' + sum + ' Nagyjából ' + mins + ' percig tart' +
        (qs.length ? ', a végén pedig ' + qs.length + ' kérdéssel ellenőrizheted magad.' : '.') + ' Kezdjük!';
    intro.items = chunks(introT.replace(/\s+/g, ' ')).map(function (c) { return { t: c, p: 380 }; });
    intro.items[intro.items.length - 1].p = 1000;
    var flat = [];
    segs.forEach(function (sg, si) { sg.start = flat.length; sg.items.forEach(function (x) { x.seg = si; flat.push(x); }); });
    return { segs: segs, items: flat, mins: mins, level: level, key: s.id + '/' + l.id, quiz: qs.length };
  }

  /* ================= lejátszási listák ================= */
  function subjectById(id) { return S.subjects.filter(function (x) { return x.id === id; })[0]; }
  function lessonRef(ref) {
    var p = String(ref).split('/'), s = subjectById(p[0]);
    var l = s && s.lessons.filter(function (x) { return x.id === p[1]; })[0];
    return l ? { s: s, l: l, key: s.id + '/' + l.id } : null;
  }
  function pathById(id) { return (S.paths || []).filter(function (p) { return p.id === id; })[0]; }
  function pathLessons(p) { return (p.steps || []).filter(function (x) { return x.lecke; }).map(function (x) { return lessonRef(x.lecke); }).filter(Boolean); }
  function listItems(list) {
    if (!list) return [];
    if (list.indexOf('ut:') === 0) { var p = pathById(list.slice(3)); return p ? pathLessons(p) : []; }
    if (list.indexOf('targy:') === 0) { var s = subjectById(list.slice(6)); return s ? s.lessons.map(function (l) { return { s: s, l: l, key: s.id + '/' + l.id }; }) : []; }
    return [];
  }
  function listTitle(list) {
    if (!list) return '';
    if (list.indexOf('ut:') === 0) { var p = pathById(list.slice(3)); return p ? p.icon + ' ' + p.title : ''; }
    var s = subjectById(list.slice(6)); return s ? s.icon + ' ' + s.title : '';
  }

  /* ================= tárolás ================= */
  function st() { var d = S.store.get('hangos', null) || {}; d.pos = d.pos || {}; d.heard = d.heard || {}; if (!d.rate) d.rate = 1; if (!d.think) d.think = 6; if (d.quiz == null) d.quiz = true; return d; }
  function save(fn) { var d = st(); fn(d); S.store.set('hangos', d); return d; }

  /* ================= hangok ================= */
  var hasTTS = typeof window !== 'undefined' && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance !== 'undefined';
  function voices() { try { return hasTTS ? speechSynthesis.getVoices() || [] : []; } catch (e) { return []; } }
  function huVoices() { return voices().filter(function (v) { return /^hu/i.test(v.lang); }); }
  function pickVoice() {
    var want = st().voice, all = voices();
    return all.filter(function (v) { return v.voiceURI === want; })[0] || huVoices()[0] || null;
  }
  function installHelp() {
    return '<details class="hg-help"><summary>Hogyan telepíthetek magyar hangot?</summary><ul>' +
      '<li><b>Android:</b> Beállítások → Rendszer → Nyelvek és bevitel → Szövegfelolvasó kimenet (Text-to-speech). Előnyben részesített motor: <i>Google beszédszolgáltatások</i> → ⚙ → Hangadatok telepítése → <b>Magyar</b>. Utána indítsd újra a böngészőt.</li>' +
      '<li><b>iPhone / iPad:</b> Beállítások → Kisegítő lehetőségek → Felolvasott tartalom → Hangok → <b>Magyar</b> → tölts le egy hangot (pl. Mariska). Utána zárd be és nyisd meg újra a Safarit.</li>' +
      '<li><b>Windows 10/11:</b> Gépház → Idő és nyelv → Beszéd → Hangok kezelése → Hangok hozzáadása → <b>Magyar</b>. A Microsoft Edge böngésző internetkapcsolat mellett természetes hangzású magyar online hangokat is kínál.</li>' +
      '<li><b>macOS:</b> Rendszerbeállítások → Kisegítő lehetőségek → Felolvasott tartalom → Rendszerhang → Hangok kezelése → <b>Magyar</b>.</li>' +
      '<li><b>Linux:</b> telepítsd az <i>espeak-ng</i> és a <i>speech-dispatcher</i> csomagot (van benne magyar hang).</li></ul>' +
      '<p class="muted">A menük neve rendszerverziónként kicsit eltérhet. Telepítés után a böngészőt újra kell indítani.</p></details>';
  }
  function voiceNote(box) {
    if (!box) return;
    if (!hasTTS) { box.innerHTML = '<div class="note warn"><b class="t">🔇 Nincs felolvasó</b><p>Ez a böngésző nem támogatja a beépített felolvasást (Web Speech API). Próbáld Chrome-, Edge-, Safari- vagy Firefox-böngészőben. A forgatókönyvet így is el tudod olvasni.</p></div>'; return; }
    var all = voices();
    if (!all.length) { box.innerHTML = ''; return; }
    if (huVoices().length) { box.innerHTML = ''; return; }
    box.innerHTML = '<div class="note warn"><b class="t">🗣️ Nincs magyar hang ezen az eszközön</b><p>A felolvasás így idegen kiejtéssel szólna. Telepíts magyar felolvasóhangot, vagy válassz egy másik hangot a lejátszóban.</p>' + installHelp() + '</div>';
  }
  var voiceCbs = [];
  if (hasTTS) {
    var vc = function () { voiceCbs.forEach(function (f) { try { f(); } catch (e) { /* */ } }); };
    if (speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', vc); else speechSynthesis.onvoiceschanged = vc;
  }
  function onVoices(f) { voiceCbs = [f]; f(); setTimeout(f, 600); setTimeout(f, 2000); }

  /* ================= lejátszómotor ================= */
  var P = { sc: null, s: null, l: null, list: '', i: 0, playing: false, gen: 0, timers: [], poll: null, ui: null, sleepAt: 0, sleepEnd: false, wake: null, autoplay: false };
  S.hangos = { toSpeech: toSpeech, chunks: chunks, script: function (sid, lid, level, opt) { var r = lessonRef(sid + '/' + lid); return r ? buildScript(r.s, r.l, level || S.level, opt) : null; }, state: P, timeScale: 1 };
  function T(ms) { return ms * (S.hangos.timeScale || 1); }
  function later(f, ms) { var id = setTimeout(f, T(ms)); P.timers.push(id); return id; }
  function clearTimers() { P.timers.forEach(clearTimeout); P.timers = []; if (P.poll) { clearInterval(P.poll); P.poll = null; } }

  function savePos() {
    if (!P.sc) return;
    var key = P.sc.key, i = P.i, lv = P.sc.level, list = P.list;
    save(function (d) { d.pos[key] = { i: i, lv: lv, n: P.sc.items.length }; d.last = { key: key, list: list, t: Date.now() }; });
  }
  function stop(keepPos) {
    P.gen++; clearTimers();
    if (hasTTS) { try { speechSynthesis.cancel(); } catch (e) { /* */ } }
    if (P.playing && keepPos !== false) savePos();
    P.playing = false; wakeOff(); mediaState(); paint();
  }
  function play() {
    if (!P.sc) return;
    if (!hasTTS) { alert('Ez a böngésző nem tud felolvasni. Próbáld Chrome-, Edge- vagy Safari-böngészőben.'); return; }
    if (P.i >= P.sc.items.length) P.i = 0;
    P.playing = true; wakeOn(); mediaSetup(); mediaState();
    try { speechSynthesis.cancel(); speechSynthesis.resume(); } catch (e) { /* */ }
    speakCur();
  }
  function pause() { stop(); }
  function toggle() { if (P.playing) pause(); else play(); }
  function go(i, autoplay) {
    var was = P.playing || autoplay;
    stop(false); P.i = Math.max(0, Math.min(i, P.sc.items.length - 1)); savePos(); paint();
    if (was) play();
  }
  function curSeg() { return P.sc.items[P.i] ? P.sc.items[P.i].seg : P.sc.segs.length - 1; }
  function nextSeg() { var sg = P.sc.segs[curSeg() + 1]; if (sg) go(sg.start); else nextLesson(true); }
  function prevSeg() {
    var si = curSeg(), sg = P.sc.segs[si];
    if (P.i - sg.start > 1 || si === 0) go(sg.start); else go(P.sc.segs[si - 1].start);
  }
  function speakCur() {
    var it = P.sc.items[P.i], g = ++P.gen;
    clearTimers();
    if (!it) { lessonEnd(); return; }
    if (P.sleepAt && Date.now() >= P.sleepAt) { P.sleepAt = 0; stop(); sleepMsg('😴 Az alvásidőzítő megállította a lejátszást.'); return; }
    paint(); savePos();
    function advance(pauseMs) {
      if (g !== P.gen) return;
      P.gen++; var g2 = P.gen; clearTimers();
      later(function () { if (g2 !== P.gen || !P.playing) return; P.i++; speakCur(); }, (pauseMs || 0) / Math.max(0.8, st().rate));
    }
    if (it.think) {
      var secs = st().think || 6, left = secs;
      thinkPaint(left);
      var tick = function () { if (g !== P.gen) return; left--; thinkPaint(left); if (left <= 0) { thinkPaint(-1); P.i++; speakCur(); } else later(tick, 1000); };
      speakText('Gondolkodj!', function () {}, g);
      later(tick, 1000);
      return;
    }
    speakText(it.t, function () { advance(it.p); }, g);
  }
  function speakText(text, done, g) {
    var u = new SpeechSynthesisUtterance(text), d = st(), v = pickVoice(), fired = false, started = Date.now(), quiet = 0;
    u.lang = v ? v.lang : 'hu-HU'; if (v) u.voice = v; u.rate = d.rate || 1; u.pitch = 1;
    function end() { if (fired || g !== P.gen) return; fired = true; done(); }
    u.onend = end;
    u.onerror = function (e) { if (e && (e.error === 'interrupted' || e.error === 'canceled')) return; end(); };
    P.utt = u; /* hivatkozás megtartása: a Chrome különben eldobhatja, és nem jön onend */
    try { speechSynthesis.speak(u); } catch (e) { later(end, 400); return; }
    /* őrkutya: ha a böngésző elnyeli az onend-et (ismert Chrome/Android hiba), továbblépünk */
    if (P.poll) clearInterval(P.poll);
    var cap = Math.max(6000, text.length * 160 / (u.rate || 1));
    P.poll = setInterval(function () {
      if (g !== P.gen || fired) { clearInterval(P.poll); P.poll = null; return; }
      var busy = false; try { busy = speechSynthesis.speaking || speechSynthesis.pending; } catch (e) { /* */ }
      quiet = busy ? 0 : quiet + 1;
      if ((quiet >= 3 && Date.now() - started > 1500) || Date.now() - started > T(cap)) { clearInterval(P.poll); P.poll = null; end(); }
    }, T(500));
  }
  function lessonEnd() {
    P.playing = false; clearTimers();
    var key = P.sc.key;
    save(function (d) { d.heard[key] = new Date().toISOString().slice(0, 10); d.pos[key] = { i: 0, lv: P.sc.level, n: P.sc.items.length }; });
    P.i = 0;
    if (P.sleepEnd) { P.sleepEnd = false; wakeOff(); mediaState(); paint(); sleepMsg('😴 A lecke végén megálltam, ahogy kérted.'); return; }
    nextLesson(false);
  }
  function nextLesson(manual) {
    var items = listItems(P.list), idx = -1;
    items.forEach(function (x, k) { if (x.key === P.sc.key) idx = k; });
    var nx = items[idx + 1];
    if (!nx) { stop(false); paint(); if (P.ui) { var e = P.ui.querySelector('#hg-msg'); if (e) e.innerHTML = P.list ? '🎉 A lejátszási lista végére értél.' : '✓ A lecke véget ért.'; } return; }
    var href = '#/hangos/' + nx.s.id + '/' + nx.l.id + '?lista=' + encodeURIComponent(P.list);
    var keep = manual ? P.playing : true;
    stop(false);
    try { history.replaceState(null, '', href); } catch (e) { /* */ }
    if (P.main) lessonPage(P.main, nx.s, nx.l, P.list, keep, true);
  }
  function sleepMsg(t) { if (P.ui) { var e = P.ui.querySelector('#hg-msg'); if (e) e.textContent = t; } }

  /* képernyő ébren tartása */
  function wakeOn() {
    if (!st().wake || !navigator.wakeLock || P.wake) return;
    navigator.wakeLock.request('screen').then(function (w) { P.wake = w; w.addEventListener && w.addEventListener('release', function () { P.wake = null; }); }).catch(function () {});
  }
  function wakeOff() { if (P.wake) { try { P.wake.release(); } catch (e) { /* */ } P.wake = null; } }
  if (typeof document !== 'undefined' && document.addEventListener) document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible' && P.playing) wakeOn(); });

  /* Media Session: zár képernyőn / értesítésben vezérlés, ahol a böngésző engedi */
  function mediaSetup() {
    if (typeof navigator === 'undefined' || !navigator.mediaSession || !P.l) return;
    try {
      if (window.MediaMetadata) navigator.mediaSession.metadata = new MediaMetadata({ title: P.l.title, artist: 'Tudásműhely – Hangos tanulás', album: P.s.title + (P.list ? ' · ' + listTitle(P.list).replace(/^\S+\s/, '') : '') });
      var h = { play: play, pause: pause, stop: pause, previoustrack: prevSeg, nexttrack: nextSeg, seekbackward: function () { go(P.i - 1); }, seekforward: function () { go(P.i + 1); } };
      Object.keys(h).forEach(function (k) { try { navigator.mediaSession.setActionHandler(k, h[k]); } catch (e) { /* nem támogatott művelet */ } });
    } catch (e) { /* */ }
  }
  function mediaState() { try { if (navigator.mediaSession) navigator.mediaSession.playbackState = P.playing ? 'playing' : 'paused'; } catch (e) { /* */ } }

  /* ================= felület ================= */
  function crumbs(parts) {
    return '<nav class="crumbs"><a href="#/">Kezdőlap</a>' + parts.map(function (p) { return '<span>›</span>' + (p[1] ? '<a href="' + p[1] + '">' + esc(p[0]) + '</a>' : '<span>' + esc(p[0]) + '</span>'); }).join('') + '</nav>';
  }
  function fmtMin(m) { return 'kb. ' + m + ' perc'; }
  function paint() {
    var ui = P.ui; if (!ui || !P.sc || !document.body.contains(ui)) return;
    var it = P.sc.items[P.i], sg = P.sc.segs[it ? it.seg : 0];
    var pb = ui.querySelector('#hg-play'); if (pb) { pb.textContent = P.playing ? '⏸' : '▶'; pb.setAttribute('aria-label', P.playing ? 'Szünet' : 'Lejátszás'); pb.title = pb.getAttribute('aria-label'); }
    var segEl = ui.querySelector('#hg-seg'); if (segEl) segEl.textContent = sg ? sg.title : '';
    var line = ui.querySelector('#hg-line'); if (line) line.textContent = it ? (it.think ? '🤔 Gondolkodási idő…' : it.t) : '';
    var pct = Math.round(100 * P.i / Math.max(1, P.sc.items.length - 1));
    var bar = ui.querySelector('#hg-bar i'); if (bar) bar.style.width = pct + '%';
    var pos = ui.querySelector('#hg-pos'); if (pos) pos.textContent = (it ? it.seg + 1 : 0) + '. / ' + P.sc.segs.length + ' szakasz · ' + pct + '%' + (P.sleepAt ? ' · 😴 ' + Math.max(0, Math.ceil((P.sleepAt - Date.now()) / 60000)) + ' perc múlva leáll' : '') + (P.sleepEnd ? ' · 😴 a lecke végén leáll' : '');
    ui.querySelectorAll('.hg-sg').forEach(function (el) { el.classList.toggle('on', +el.dataset.sg === (it ? it.seg : -1)); });
    ui.querySelectorAll('.hg-it').forEach(function (el) { el.classList.toggle('on', +el.dataset.i === P.i); });
    var cur = ui.querySelector('.hg-it.on');
    var sc = ui.querySelector('#hg-script');
    if (cur && sc && P.playing && sc.open) { var r = cur.getBoundingClientRect(), br = sc.getBoundingClientRect(); if (r.top < br.top || r.bottom > br.bottom) cur.scrollIntoView({ block: 'nearest' }); }
  }
  function thinkPaint(left) {
    var ui = P.ui; if (!ui) return; var el = ui.querySelector('#hg-think'); if (!el) return;
    if (left < 0) { el.hidden = true; return; }
    el.hidden = false; el.textContent = '🤔 Gondolkodási idő: ' + left + ' mp';
  }

  function opts(arr, cur) { return arr.map(function (a) { return '<option value="' + a[0] + '"' + (String(a[0]) === String(cur) ? ' selected' : '') + '>' + a[1] + '</option>'; }).join(''); }
  function lessonPage(main, s, l, list, autoplay, inPlace) {
    stop(false);
    var d = st(), level = S.level === 'egyetem' ? 'egyetem' : 'iskolai';
    var sc = buildScript(s, l, level, { quiz: d.quiz, think: d.think });
    P.sc = sc; P.s = s; P.l = l; P.list = list || ''; P.main = main;
    var pos = d.pos[sc.key]; P.i = pos && pos.lv === level && pos.i < sc.items.length ? pos.i : 0;
    if (inPlace) { try { document.title = l.title + ' – Hangos tanulás'; } catch (e) { /* */ } }
    var items = listItems(P.list), idx = -1; items.forEach(function (x, k) { if (x.key === sc.key) idx = k; });
    var v = pickVoice();
    main.innerHTML = '<div class="hg-page">' + crumbs([['Hangos tanulás', '#/hangos'], [s.title, '#/hangos/' + s.id], [l.title]]) +
      '<div class="hg-head"><span class="hg-ico" aria-hidden="true">🎧</span><div><h1>' + esc(l.title) + '</h1><p class="lead">' + esc(s.icon + ' ' + s.title) + ' · ' + fmtMin(sc.mins) + ' · ' + (level === 'egyetem' ? '🎓 egyetemi szint' : '🎒 iskolai szint') + (sc.quiz ? ' · ' + sc.quiz + ' kvízkérdés' : '') + '</p></div></div>' +
      '<div id="hg-voice"></div>' +
      '<section class="hg-player card pad" aria-label="Lejátszó">' +
      '<div class="hg-now"><small class="muted">Most szól</small><b id="hg-seg"></b><p id="hg-line" class="hg-line"></p><p id="hg-think" class="hg-think" hidden></p>' +
      '<div class="hg-bar" id="hg-bar"><i></i></div><small id="hg-pos" class="muted"></small></div>' +
      '<div class="hg-ctrl"><button type="button" class="btn" id="hg-prev" title="Előző szakasz" aria-label="Előző szakasz">⏮</button>' +
      '<button type="button" class="btn primary hg-big" id="hg-play" aria-label="Lejátszás">▶</button>' +
      '<button type="button" class="btn" id="hg-next" title="Következő szakasz" aria-label="Következő szakasz">⏭</button></div>' +
      '<p id="hg-msg" class="hg-msg muted" role="status"></p>' +
      '<div class="hg-set">' +
      '<label class="hg-f"><span>Sebesség: <b id="hg-ratev">' + S.fmt(d.rate, 2) + '×</b></span><input type="range" id="hg-rate" min="0.8" max="1.5" step="0.05" value="' + d.rate + '"></label>' +
      '<label class="hg-f"><span>Hang</span><select id="hg-vsel"></select></label>' +
      '<label class="hg-f"><span>Gondolkodási idő</span><select id="hg-think-s">' + opts([[5, '5 mp'], [6, '6 mp'], [7, '7 mp'], [8, '8 mp'], [12, '12 mp']], d.think) + '</select></label>' +
      '<label class="hg-f"><span>Alvásidőzítő</span><select id="hg-sleep">' + opts([['0', 'Ki'], ['5', '5 perc'], ['10', '10 perc'], ['15', '15 perc'], ['30', '30 perc'], ['45', '45 perc'], ['60', '60 perc'], ['end', 'A lecke végén']], P.sleepEnd ? 'end' : '0') + '</select></label>' +
      '<label class="hg-c"><input type="checkbox" id="hg-quiz"' + (d.quiz ? ' checked' : '') + '> Kvíz a végén</label>' +
      ((typeof navigator !== 'undefined' && navigator.wakeLock) ? '<label class="hg-c"><input type="checkbox" id="hg-wake"' + (d.wake ? ' checked' : '') + '> Képernyő ébren tartása</label>' : '') +
      '</div></section>' +
      (items.length ? '<section class="hg-plist card pad"><h2>📃 Lejátszási lista: ' + esc(listTitle(P.list)) + '</h2><p class="muted">' + (idx + 1) + '. / ' + items.length + ' lecke – a lecke végén automatikusan jön a következő.</p><ol>' + items.map(function (x, k) {
        return '<li class="' + (k === idx ? 'on' : '') + '"><a href="#/hangos/' + x.s.id + '/' + x.l.id + '?lista=' + encodeURIComponent(P.list) + '">' + esc(x.l.title) + '</a>' + (d.heard[x.key] ? ' <span class="hg-ok" title="Meghallgatva">✓</span>' : '') + '</li>';
      }).join('') + '</ol></section>' : '') +
      '<details class="hg-script card pad" id="hg-script" open><summary><b>📜 Forgatókönyv</b> <span class="muted">– ezt hallod (koppints egy mondatra, onnan folytatom)</span></summary>' +
      sc.segs.map(function (sg, si) {
        return '<div class="hg-sg" data-sg="' + si + '"><h3><button type="button" class="linkish" data-go="' + sg.start + '">' + esc(sg.title) + '</button></h3><p>' + sg.items.map(function (x, k) {
          var gi = sg.start + k;
          return x.think ? '<span class="hg-it hg-wait" data-i="' + gi + '">⏳ (' + d.think + ' mp gondolkodási idő)</span> ' : '<span class="hg-it' + (x.ans ? ' hg-ans' : '') + '" data-i="' + gi + '" tabindex="0">' + esc(x.t) + '</span> ';
        }).join('') + '</p></div>';
      }).join('') + '</details>' +
      '<div class="row hg-links"><a class="btn" href="#/lecke/' + s.id + '/' + l.id + '">📖 Vissza a leckéhez</a>' + (P.list ? '' : '<a class="btn" href="#/hangos/' + s.id + '/' + l.id + '?lista=targy:' + s.id + '">📃 Az egész tantárgy lejátszása innen</a>') + '</div>' +
      '<p class="muted hg-tip">💡 Telefonon az első indításhoz koppints a ▶ gombra (iPhone-on csak érintésre indulhat a felolvasás). Lezárt képernyőn a böngészőtől függ, hogy szól-e tovább; ha megáll, kapcsold be a „Képernyő ébren tartása” lehetőséget.</p></div>';
    var ui = P.ui = main.querySelector('.hg-page');
    function vsel() {
      var sel = ui.querySelector('#hg-vsel'); if (!sel) return;
      var all = voices(), hu = huVoices(), cur = (pickVoice() || {}).voiceURI || '';
      if (!all.length) { sel.innerHTML = '<option value="">Alapértelmezett (magyar)</option>'; sel.disabled = !hasTTS; return; }
      var other = all.filter(function (x) { return hu.indexOf(x) < 0; });
      sel.disabled = false;
      sel.innerHTML = (hu.length ? '<optgroup label="Magyar hangok">' + hu.map(function (x) { return '<option value="' + esc(x.voiceURI) + '"' + (x.voiceURI === cur ? ' selected' : '') + '>' + esc(x.name) + '</option>'; }).join('') + '</optgroup>' : '<option value="">– nincs magyar hang –</option>') +
        '<optgroup label="Más nyelvű hangok">' + other.map(function (x) { return '<option value="' + esc(x.voiceURI) + '"' + (x.voiceURI === cur ? ' selected' : '') + '>' + esc(x.name + ' (' + x.lang + ')') + '</option>'; }).join('') + '</optgroup>';
      voiceNote(ui.querySelector('#hg-voice'));
    }
    onVoices(vsel);
    if (!hasTTS) voiceNote(ui.querySelector('#hg-voice'));
    ui.querySelector('#hg-play').addEventListener('click', toggle);
    ui.querySelector('#hg-prev').addEventListener('click', prevSeg);
    ui.querySelector('#hg-next').addEventListener('click', nextSeg);
    var rate = ui.querySelector('#hg-rate');
    rate.addEventListener('input', function () { ui.querySelector('#hg-ratev').textContent = S.fmt(+rate.value, 2) + '×'; });
    rate.addEventListener('change', function () { var r = +rate.value; save(function (x) { x.rate = r; }); if (P.playing) go(P.i); });
    ui.querySelector('#hg-vsel').addEventListener('change', function () { var val = this.value; save(function (x) { x.voice = val; }); if (P.playing) go(P.i); });
    ui.querySelector('#hg-think-s').addEventListener('change', function () { var val = +this.value; save(function (x) { x.think = val; }); ui.querySelectorAll('.hg-wait').forEach(function (e) { e.textContent = '⏳ (' + val + ' mp gondolkodási idő)'; }); });
    ui.querySelector('#hg-sleep').addEventListener('change', function () {
      var val = this.value; P.sleepEnd = val === 'end'; P.sleepAt = val !== 'end' && +val ? Date.now() + val * 60000 : 0;
      if (P.sleepAt) { var at = P.sleepAt; setTimeout(function () { if (P.sleepAt === at && P.playing) { P.sleepAt = 0; stop(); sleepMsg('😴 Az alvásidőzítő megállította a lejátszást.'); var se = P.ui && P.ui.querySelector('#hg-sleep'); if (se) se.value = '0'; } }, val * 60000); }
      paint();
    });
    ui.querySelector('#hg-quiz').addEventListener('change', function () { var val = this.checked; save(function (x) { x.quiz = val; }); lessonPage(main, s, l, P.list, false, true); });
    var wk = ui.querySelector('#hg-wake');
    if (wk) wk.addEventListener('change', function () { var val = this.checked; save(function (x) { x.wake = val; }); if (val && P.playing) wakeOn(); else if (!val) wakeOff(); });
    ui.querySelector('#hg-script').addEventListener('click', function (e) {
      var g = e.target.closest('[data-go]'), it = e.target.closest('.hg-it');
      if (g) go(+g.dataset.go, true); else if (it) go(+it.dataset.i, true);
    });
    ui.querySelector('#hg-script').addEventListener('keydown', function (e) { var it = e.target.closest('.hg-it'); if (it && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); go(+it.dataset.i, true); } });
    paint();
    if (P.i > 0) sleepMsg('↩ Ott folytatom, ahol abbahagytad (' + Math.round(100 * P.i / Math.max(1, sc.items.length - 1)) + '%). A forgatókönyvben bármelyik mondatra koppintva máshonnan is indíthatsz.');
    if (autoplay) play();
  }

  function subjCount(s) { return s.lessons.length; }
  function hubPage(main) {
    stop(false);
    var d = st(), last = d.last && lessonRef(d.last.key);
    var paths = (S.paths || []).filter(function (p) { return pathLessons(p).length; });
    var nl = 0; S.subjects.forEach(function (s) { nl += s.lessons.length; });
    main.innerHTML = crumbs([['Hangos tanulás']]) +
      '<h1>🎧 Hangos tanulás</h1><p class="lead">Hallgasd a leckéket, mint egy podcastot: útközben, edzés közben vagy elalvás előtt. A felolvasó elmondja a lecke lényegét, a végén pedig kérdez is: van időd gondolkodni, utána elhangzik a helyes válasz.</p>' +
      '<div id="hg-voice"></div>' +
      (last ? '<div class="card pad hg-cont"><div><small class="muted">Folytatás</small><b>' + esc(last.s.icon + ' ' + last.l.title) + '</b><small class="muted">' + esc(last.s.title) + (d.last.list ? ' · lejátszási lista: ' + esc(listTitle(d.last.list)) : '') + '</small></div>' +
        '<a class="btn primary" href="#/hangos/' + last.s.id + '/' + last.l.id + (d.last.list ? '?lista=' + encodeURIComponent(d.last.list) : '') + '">▶ Folytatás</a></div>' : '') +
      '<p class="muted">' + S.subjects.length + ' tantárgy, ' + nl + ' lecke hallgatható meg' + (paths.length ? ', és ' + paths.length + ' tanulási útvonal lejátszási listaként' : '') + '. Szint: ' + (S.level === 'egyetem' ? '🎓 egyetemi (szakmai összefoglalóval, szakszavakkal, 5 kérdéssel)' : '🎒 iskolai (egyszerűen, 3 kérdéssel)') + ' – a fejlécben válthatsz.</p>' +
      (paths.length ? '<h2>🛤️ Tanulási útvonalak</h2><div class="hg-grid">' + paths.map(function (p) {
        var n = pathLessons(p).length;
        return '<a class="card hg-tile" style="--tile:' + p.color + '" href="#/hangos/utvonal/' + p.id + '"><span class="hg-ti" aria-hidden="true">' + p.icon + '</span><span><b>' + esc(p.title) + '</b><small>' + n + ' lecke lejátszási listában</small></span></a>';
      }).join('') + '</div>' : '') +
      S.STAGES.map(function (stg) {
        var ss = S.subjects.filter(function (s) { return (s.stage || 'kozep') === stg[0]; });
        if (!ss.length) return '';
        return '<h2>' + esc(stg[1]) + '</h2><div class="hg-grid">' + ss.map(function (s) {
          var heard = s.lessons.filter(function (l) { return d.heard[s.id + '/' + l.id]; }).length;
          return '<a class="card hg-tile" style="--tile:' + (s.color || 'var(--accent)') + '" href="#/hangos/' + s.id + '"><span class="hg-ti" aria-hidden="true">' + s.icon + '</span><span><b>' + esc(s.title) + '</b><small>' + subjCount(s) + ' lecke' + (heard ? ' · ' + heard + ' meghallgatva' : '') + '</small></span></a>';
        }).join('') + '</div>';
      }).join('') + '<div class="note"><b class="t">ℹ️ Hogyan működik?</b><p>A böngésződ beépített felolvasóját használjuk, ezért internet nélkül is működik, ha a gépeden van magyar hang. A hosszú szöveget mondatonként olvassuk fel, mert egyes böngészők a hosszú felolvasást megszakítják. A lejátszó megjegyzi, hol tartasz.</p>' + installHelp() + '</div>';
    onVoices(function () { voiceNote(main.querySelector('#hg-voice')); });
    return true;
  }
  function listPage(main, title, crumb, items, list, intro) {
    stop(false);
    var d = st();
    var first = items.filter(function (x) { return !d.heard[x.key]; })[0] || items[0];
    var last = d.last && d.last.list === list && lessonRef(d.last.key);
    main.innerHTML = crumbs([['Hangos tanulás', '#/hangos'], [crumb]]) +
      '<h1>🎧 ' + esc(title) + '</h1>' + (intro ? '<p class="lead">' + esc(intro) + '</p>' : '') +
      '<div class="row hg-links">' + (last ? '<a class="btn primary" href="#/hangos/' + last.s.id + '/' + last.l.id + '?lista=' + encodeURIComponent(list) + '">▶ Folytatás: ' + esc(last.l.title) + '</a>' : '') +
      (first ? '<a class="btn' + (last ? '' : ' primary') + '" href="#/hangos/' + first.s.id + '/' + first.l.id + '?lista=' + encodeURIComponent(list) + '">▶ ' + (first === items[0] ? 'Lejátszás az elejétől' : 'Az első meg nem hallgatott leckétől') + '</a>' : '') +
      (items[0] && first !== items[0] ? '<a class="btn" href="#/hangos/' + items[0].s.id + '/' + items[0].l.id + '?lista=' + encodeURIComponent(list) + '">⏮ Az elejétől</a>' : '') + '</div>' +
      '<p class="muted">' + items.length + ' lecke a lejátszási listában. A lecke végén automatikusan indul a következő.</p>' +
      '<ol class="hg-lessons">' + items.map(function (x) {
        var p = d.pos[x.key], pct = p && p.n ? Math.round(100 * p.i / p.n) : 0;
        return '<li class="card"><a href="#/hangos/' + x.s.id + '/' + x.l.id + '?lista=' + encodeURIComponent(list) + '"><b>' + esc(x.l.title) + '</b><small class="muted">' + esc(x.s.icon + ' ' + x.s.title) + (x.l.minutes ? ' · olvasva ' + x.l.minutes + ' perc' : '') +
          (d.heard[x.key] ? ' · ✓ meghallgatva' : pct ? ' · ' + pct + '%-nál tartasz' : '') + '</small></a><a class="btn sm" href="#/lecke/' + x.s.id + '/' + x.l.id + '" title="A lecke szöveges változata">📖</a></li>';
      }).join('') + '</ol>';
    return true;
  }

  S.addRoute('hangos', { title: 'Hangos tanulás', nav: '', page: function (main, rest, params) {
    if (!rest.length) return hubPage(main);
    if (rest[0] === 'utvonal') {
      var p = pathById(rest[1]); if (!p) return false;
      return listPage(main, p.title, p.title, pathLessons(p), 'ut:' + p.id, p.description);
    }
    var s = subjectById(rest[0]); if (!s) return false;
    if (rest.length === 1) return listPage(main, s.title, s.title, listItems('targy:' + s.id), 'targy:' + s.id, s.description);
    var l = s.lessons.filter(function (x) { return x.id === rest[1]; })[0]; if (!l) return false;
    var list = params && params.lista ? (params.lista === 'targy' ? 'targy:' + s.id : params.lista) : '';
    lessonPage(main, s, l, list, false, false);
    return true;
  } });

  /* másik oldalra lépve megállunk (a helyet megjegyezzük) */
  if (typeof window.addEventListener === 'function') window.addEventListener('hashchange', function () {
    if (P.sc && P.playing && location.hash.indexOf('#/hangos/' + P.sc.key) !== 0) stop();
  });
})();
