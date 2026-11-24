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
  S.addModel = function (m) { S.models[m.id] = m; };
  S.addWidget = function (name, fn) { S.widgets[name] = fn; };

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
  function inline(s) {
    return S.esc(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
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
