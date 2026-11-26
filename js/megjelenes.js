/* Tudásműhely – Témák és megjelenés.
 * Színtémák (Alap, Óceán, Erdő, Naplemente, Lila – világos és sötét változattal, csak CSS-változók),
 * világos/sötét/rendszer szerinti mód, betűméret-csúszka élő előnézettel (80–160%),
 * a magas kontraszt és a csökkentett mozgás kapcsoló a Beállítások „Megjelenés” blokkjában.
 * A js/app.js applySettings() hívja: S.applyMegjelenes(beállítások); a Beállítások oldal: S.megjelenesPanel(main). */
(function () {
  'use strict';
  var S = window.STUDIE;
  var esc = S.esc;
  if (typeof document === 'undefined') return; /* tools/check.js: nincs böngésző */
  var root = document.documentElement;

  /* minta-színek a választógombokhoz: [világos akcentus, világos felület, sötét akcentus, sötét felület] */
  S.SCHEMES = [
    { id: '', name: 'Alap', sw: ['#2357d9', '#eef1f8', '#6f9bff', '#171e2d'] },
    { id: 'ocean', name: 'Óceán', sw: ['#086a80', '#e4f1f5', '#4fc6e0', '#10232a'] },
    { id: 'forest', name: 'Erdő', sw: ['#246a2b', '#e8f1e4', '#73d07d', '#152019'] },
    { id: 'sunset', name: 'Naplemente', sw: ['#b3431a', '#f7ebe3', '#ff9d6e', '#251a16'] },
    { id: 'purple', name: 'Lila', sw: ['#6a3ec2', '#efeaf9', '#b8a0ff', '#1d1929'] }
  ];
  function schemeOk(id) { return S.SCHEMES.some(function (x) { return x.id === id; }) ? id : ''; }

  function isDark() {
    var t = root.getAttribute('data-theme');
    return t === 'dark' || (!t && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  /* a böngésző címsorának színe (telefonon) kövesse a témát */
  function paintMeta() {
    var m = document.querySelector('meta[name="theme-color"]');
    if (!m) return;
    var bg = getComputedStyle(root).getPropertyValue('--surface').trim();
    if (bg) m.setAttribute('content', bg);
  }
  S.applyMegjelenes = function (st) {
    st = st || S.store.get('settings', {});
    var sc = st.contrast ? '' : schemeOk(st.scheme || '');
    if (sc) root.setAttribute('data-scheme', sc); else root.removeAttribute('data-scheme');
    paintMeta();
  };
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', paintMeta);
  }
  /* a fejléc ◐ gombja után is frissüljön a címsor színe */
  document.addEventListener('click', function (e) { if (e.target && e.target.id === 'theme') setTimeout(function () { paintMeta(); syncMode(); }, 0); });

  /* Csökkentett mozgás: a JS-ből indított sima görgetés is azonnali legyen. */
  function lessMotion() {
    return root.classList.contains('no-motion') || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  function calm(o) {
    if (o && typeof o === 'object' && o.behavior === 'smooth' && lessMotion()) { var c = {}; for (var k in o) c[k] = o[k]; c.behavior = 'auto'; return c; }
    return o;
  }
  if (Element.prototype.scrollIntoView) {
    var sIV = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function (o) { return sIV.call(this, calm(o)); };
  }
  ['scrollTo', 'scrollBy'].forEach(function (fn) {
    var orig = window[fn];
    if (typeof orig !== 'function') return;
    window[fn] = function (a) { return arguments.length === 1 ? orig.call(window, calm(a)) : orig.apply(window, arguments); };
  });

  function save(k, v) {
    var st = S.store.get('settings', {});
    if (v === null || v === '' || v === undefined) delete st[k]; else st[k] = v;
    S.store.set('settings', st);
    if (S.applySettings) S.applySettings(); else S.applyMegjelenes(st);
  }

  var modeWrap = null;
  function curMode() { var t = S.store.get('theme', null); return t === 'dark' || t === 'light' ? t : 'auto'; }
  function syncMode() {
    if (!modeWrap || !document.body.contains(modeWrap)) return;
    var m = curMode();
    modeWrap.querySelectorAll('button').forEach(function (b) { var on = b.dataset.v === m; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
  }

  S.megjelenesPanel = function (main) {
    var box = main.querySelector('.settings');
    if (!box) return;
    var st = S.store.get('settings', {});
    var font = Math.max(80, Math.min(160, +st.font || 100));
    var sc = schemeOk(st.scheme || '');
    var mode = curMode();
    var wrap = document.createElement('section');
    wrap.className = 'mj-panel';
    wrap.setAttribute('aria-labelledby', 'mj-h');
    wrap.innerHTML = '<h3 id="mj-h" style="margin:0">🎨 Megjelenés</h3>' +
      '<div class="mj-row"><b id="mj-mode-l">Világos vagy sötét</b><div class="seg" id="mj-mode" role="group" aria-labelledby="mj-mode-l">' +
      [['light', '☀️ Világos'], ['dark', '🌙 Sötét'], ['auto', '🖥 Rendszer szerint']].map(function (x) {
        return '<button type="button" data-v="' + x[0] + '" aria-pressed="' + (mode === x[0]) + '" class="' + (mode === x[0] ? 'on' : '') + '">' + x[1] + '</button>';
      }).join('') + '</div></div>' +
      '<div class="mj-row"><b id="mj-sc-l">Színtéma</b><div class="mj-schemes" role="radiogroup" aria-labelledby="mj-sc-l">' + S.SCHEMES.map(function (x) {
        var on = x.id === sc;
        return '<button type="button" role="radio" class="mj-sch' + (on ? ' on' : '') + '" data-v="' + x.id + '" aria-checked="' + on + '" tabindex="' + (on ? 0 : -1) + '">' +
          '<span class="mj-sw" aria-hidden="true"><i style="background:' + x.sw[0] + '"></i><i style="background:' + x.sw[1] + '"></i><i style="background:' + x.sw[2] + '"></i><i style="background:' + x.sw[3] + '"></i></span>' +
          '<span>' + esc(x.name) + '</span></button>';
      }).join('') + '</div>' +
      (st.contrast ? '<small class="muted">Magas kontraszt mellett a színtéma nem érvényesül: az olvashatóság az elsődleges.</small>' : '') + '</div>' +
      '<div class="mj-row"><label for="mj-font"><b>Betűméret</b> <output id="mj-fout" for="mj-font">' + font + '%</output></label>' +
      '<div class="mj-font"><button type="button" class="btn sm" id="mj-fm" aria-label="Kisebb betű">A−</button>' +
      '<input type="range" id="mj-font" min="80" max="160" step="5" value="' + font + '" aria-describedby="mj-prev">' +
      '<button type="button" class="btn sm" id="mj-fp" aria-label="Nagyobb betű">A+</button>' +
      '<button type="button" class="btn sm" id="mj-f0">Alaphelyzet</button></div>' +
      '<div class="mj-prev card" id="mj-prev"><b>Élő előnézet</b><p>Az egész oldal azonnal követi a csúszkát. Így néz ki egy bekezdés: a <a href="#/beallitasok">link</a>, a <code>v = s / t</code> képlet és a <span class="badge l1">kezdő</span> címke.</p>' +
      '<span class="btn primary" aria-hidden="true">Gomb</span> <span class="btn" aria-hidden="true">Másik gomb</span></div></div>';
    box.insertBefore(wrap, box.firstChild);

    /* az app.js régi betűméret-gombjai helyett a csúszka áll */
    var oldFont = box.querySelector('#st-font');
    if (oldFont && oldFont.parentNode && oldFont.parentNode !== box) oldFont.parentNode.remove();
    /* a magas kontraszt és a csökkentett mozgás kapcsolói ide, a Megjelenés blokkba kerülnek */
    ['#st-contrast', '#st-motion'].forEach(function (sel) {
      var inp = box.querySelector(sel), lab = inp && inp.closest('label');
      if (lab) wrap.appendChild(lab);
    });

    modeWrap = wrap.querySelector('#mj-mode');
    modeWrap.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.dataset.v;
        if (v === 'auto') { root.removeAttribute('data-theme'); S.store.set('theme', null); }
        else { root.setAttribute('data-theme', v); S.store.set('theme', v); }
        syncMode(); paintMeta();
      });
    });

    var schBtns = wrap.querySelectorAll('.mj-sch');
    function pickScheme(b) {
      save('scheme', b.dataset.v);
      schBtns.forEach(function (x) { var on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-checked', on ? 'true' : 'false'); x.tabIndex = on ? 0 : -1; });
    }
    schBtns.forEach(function (b, i) {
      b.addEventListener('click', function () { pickScheme(b); });
      b.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        var n = schBtns[(i + d + schBtns.length) % schBtns.length];
        pickScheme(n); n.focus();
      });
    });

    var rng = wrap.querySelector('#mj-font'), out = wrap.querySelector('#mj-fout');
    function setFont(v, persist) {
      v = Math.max(80, Math.min(160, Math.round(v / 5) * 5));
      rng.value = v; out.textContent = v + '%';
      root.style.fontSize = v === 100 ? '' : v + '%';
      if (persist) save('font', v === 100 ? null : v);
    }
    rng.addEventListener('input', function () { setFont(+rng.value, false); });
    rng.addEventListener('change', function () { setFont(+rng.value, true); });
    wrap.querySelector('#mj-fm').addEventListener('click', function () { setFont(+rng.value - 5, true); });
    wrap.querySelector('#mj-fp').addEventListener('click', function () { setFont(+rng.value + 5, true); });
    wrap.querySelector('#mj-f0').addEventListener('click', function () { setFont(100, true); });
  };
})();
