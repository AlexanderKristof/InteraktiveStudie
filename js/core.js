/* Tudásműhely – mag: regiszter és közös segédfüggvények.
 * Minden tartalomfájl (data/...) ezt használja: STUDIE.addSubject(...), STUDIE.addModel(...).
 * Szándékosan nincs modulrendszer és nincs fetch: így a program egyszerűen
 * megnyitható dupla kattintással (file://) is, internet nélkül. */
(function () {
  'use strict';
  var S = (window.STUDIE = window.STUDIE || {});
  S.subjects = [];
  S.models = {};
  S.widgets = {};

  S.addSubject = function (s) { S.subjects.push(s); };
  /* Leckék egyetemi/szakmai rétege: STUDIE.addLessonUni('tantárgy', { leckeId: { text, glossary: [{ hu, en, latin, def }] } }) */
  S.lessonUni = {};
  S.addLessonUni = function (sid, map) { Object.keys(map).forEach(function (k) { S.lessonUni[sid + '/' + k] = map[k]; }); };
  /* Iskolai szintek a tantárgyakhoz (subject.stage). */
  S.STAGES = [['altalanos', '🎒 Általános iskola (5–8. osztály)'], ['kozep', '🏫 Középiskola'], ['szakma', '🛠️ Szakmák'], ['sport', '⚽ Sport és mozgás'], ['elet', '🧭 Felnőtt élet – amit az iskola nem tanít']];
  S.stageTitle = function (id) { var x = S.STAGES.filter(function (s) { return s[0] === (id || 'kozep'); })[0]; return x ? x[1] : ''; };
  S.addModel = function (m) { S.models[m.id] = m; };
  S.addWidget = function (name, fn) { S.widgets[name] = fn; };

  /* Kereshető legördülő lista: a <select> fölé egy szűrőmezőt tesz; gépeléskor csak az illő opciók maradnak.
   * Ha pontosan egy opció marad, azt ki is választja (change eseménnyel), Enterre az elsőt. */
  S.searchableSelect = function (sel, placeholder) {
    if (!sel || sel.dataset.searchable) return; sel.dataset.searchable = '1';
    var orig = sel.innerHTML, inp = document.createElement('input');
    inp.type = 'search'; inp.className = 'sel-find'; inp.placeholder = placeholder || '🔎 Keresés a listában…'; inp.autocomplete = 'off';
    sel.parentNode.insertBefore(inp, sel);
    function filter(pickOne) {
      var q = S.norm(inp.value.trim()), words = q.split(/\s+/).filter(Boolean), cur = sel.value;
      var tmp = document.createElement('select'); tmp.innerHTML = orig;
      if (words.length) {
        Array.prototype.slice.call(tmp.querySelectorAll('optgroup')).forEach(function (g) {
          var gl = S.norm(g.label || '');
          Array.prototype.slice.call(g.querySelectorAll('option')).forEach(function (o) {
            if (!words.every(function (w) { return (S.norm(o.textContent) + ' ' + gl).indexOf(w) >= 0; })) o.remove();
          });
          if (!g.querySelector('option')) g.remove();
        });
        Array.prototype.slice.call(tmp.children).forEach(function (o) {
          if (o.tagName === 'OPTION' && o.value && !words.every(function (w) { return S.norm(o.textContent).indexOf(w) >= 0; })) o.remove();
        });
      }
      sel.innerHTML = tmp.innerHTML;
      var opts = Array.prototype.slice.call(sel.querySelectorAll('option')).filter(function (o) { return o.value; });
      if (opts.some(function (o) { return o.value === cur; })) sel.value = cur;
      if (words.length && (opts.length === 1 || pickOne) && opts[0] && cur !== opts[0].value) { sel.value = opts[0].value; sel.dispatchEvent(new Event('change', { bubbles: true })); }
    }
    inp.addEventListener('input', function () { filter(false); });
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); filter(true); } });
  };
  S.esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  /* Ékezetek nélküli, kisbetűs alak a kereséshez. */
  S.norm = function (s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  };

  /* Magyar számformátum (tizedesvessző). */
  S.fmt = function (n, d) {
    if (!isFinite(n)) return '∞';
    var d0 = d == null ? 2 : d, r = Math.round(n * Math.pow(10, d0)) / Math.pow(10, d0);
    if (r === 0) n = 0; // ne legyen „−0”
    return Number(n).toLocaleString('hu-HU', { maximumFractionDigits: d == null ? 2 : d });
  };

  /* Egyszerű szövegjelölés a tananyagban:
   *   **félkövér**, `képlet`, [[modell-id|link a felfedezőbe]], [[#/útvonal|belső link]]
   *   "- " kezdetű sorok: felsorolás, "1. " kezdetű sorok: számozott lista,
   *   üres sor: új bekezdés. */
  /* Alsó index a folyó szövegben is: U_0, F_g, c_{w}, T_{CPU} (kódrészleten kívül). */
  function subs(t) {
    return t.replace(/(^|[^\w&#\/])([A-Za-zα-ωΑ-Ω])_(?:\{([^}]+)\}|([A-Za-z0-9]{1,4})(?![\w]))/g, function (m, pre, base, a, b) {
      return pre + base + '<sub>' + (a || b) + '</sub>';
    });
  }
  function inline(s) {
    return S.esc(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .split(/(`[^`]*`)/).map(function (part, i) { return i % 2 ? part : subs(part); }).join('')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\[\[(#[^|\]]+)\|(.+?)\]\]/g, '<a href="$1">$2</a>')
      .replace(/\[\[([\w-]+)\|(.+?)\]\]/g, '<a class="model-link" href="#/felfedezo/$1">$2</a>');
  }
  S.inline = inline;

  S.md = function (text) {
    if (!text) return '';
    return String(text).trim().split(/\n\s*\n/).map(function (block) {
      var lines = block.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
      if (lines.every(function (l) { return /^- /.test(l); })) {
        return '<ul>' + lines.map(function (l) { return '<li>' + inline(l.slice(2)) + '</li>'; }).join('') + '</ul>';
      }
      if (lines.every(function (l) { return /^\d+\. /.test(l); })) {
        return '<ol>' + lines.map(function (l) { return '<li>' + inline(l.replace(/^\d+\. /, '')) + '</li>'; }).join('') + '</ol>';
      }
      return '<p>' + lines.map(inline).join('<br>') + '</p>';
    }).join('');
  };

  /* Böngészőben tárolt haladás. Ha a tárolás nem elérhető, csendben kihagyjuk. */
  S.store = {
    get: function (k, d) {
      try { var v = localStorage.getItem('tudasmuhely.' + k); return v ? JSON.parse(v) : d; }
      catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem('tudasmuhely.' + k, JSON.stringify(v)); } catch (e) { /* nincs tárolás */ }
    }
  };

  /* ---------- rajzsegéd a modellekhez ---------- */
  function shade(hex, f) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    var n = parseInt(h, 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    function c(x) { return Math.max(0, Math.min(255, Math.round(f < 1 ? x * f : x + (255 - x) * (f - 1)))); }
    return 'rgb(' + c(r) + ',' + c(g) + ',' + c(b) + ')';
  }
  S.draw = {
    shade: shade,
    /* Izometrikus vetítés. Világkoordináták: x jobbra-le, y balra-le, z felfelé.
     *   var I = STUDIE.draw.iso(300, 220);
     *   I.box(x, y, z, szélesség, mélység, magasság, '#színkód')  -> 3D doboz (teteje + két látható oldala)
     *   I.face(x, y, z, szélesség, mélység, '#szín')              -> vízszintes lap (pl. felirat, minta)
     *   I.pt(x, y, z)                                            -> [képernyő x, képernyő y]
     *   I.cyl(x, y, z, sugár, magasság, '#szín')                  -> álló henger */
    iso: function (ox, oy, k) {
      k = k || 1;
      function pt(x, y, z) { return [ox + (x - y) * 0.866 * k, oy + ((x + y) * 0.5 - (z || 0)) * k]; }
      function poly(pts, fill, extra) {
        return '<polygon points="' + pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ') +
          '" fill="' + fill + '"' + (extra || ' stroke="rgba(0,0,0,.25)" stroke-width="0.8" stroke-linejoin="round"') + '/>';
      }
      return {
        pt: pt,
        poly: poly,
        face: function (x, y, z, w, d, fill, extra) {
          return poly([pt(x, y, z), pt(x + w, y, z), pt(x + w, y + d, z), pt(x, y + d, z)], fill, extra);
        },
        box: function (x, y, z, w, d, h, color, extra) {
          return poly([pt(x, y + d, z), pt(x + w, y + d, z), pt(x + w, y + d, z + h), pt(x, y + d, z + h)], shade(color, 0.72), extra) +
            poly([pt(x + w, y, z), pt(x + w, y + d, z), pt(x + w, y + d, z + h), pt(x + w, y, z + h)], shade(color, 0.86), extra) +
            poly([pt(x, y, z + h), pt(x + w, y, z + h), pt(x + w, y + d, z + h), pt(x, y + d, z + h)], color, extra);
        },
        cyl: function (x, y, z, r, h, color) {
          var c = pt(x, y, z), t = pt(x, y, z + h), rx = r * 1.2247 * k, ry = r * 0.7071 * k;
          return '<path d="M' + (c[0] - rx) + ' ' + c[1] + ' A' + rx + ' ' + ry + ' 0 0 0 ' + (c[0] + rx) + ' ' + c[1] +
            ' L' + (t[0] + rx) + ' ' + t[1] + ' L' + (t[0] - rx) + ' ' + t[1] + ' Z" fill="' + shade(color, 0.78) + '" stroke="rgba(0,0,0,.25)" stroke-width="0.8"/>' +
            '<ellipse cx="' + t[0] + '" cy="' + t[1] + '" rx="' + rx + '" ry="' + ry + '" fill="' + color + '" stroke="rgba(0,0,0,.25)" stroke-width="0.8"/>';
        }
      };
    }
  };

  S.shuffle = function (arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };
})();
