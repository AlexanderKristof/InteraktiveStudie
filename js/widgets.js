/* Tudásműhely – interaktív elemek (widgetek).
 * Leckében így lehet használni:  widget: { type: 'ohm', options: { ... } }
 * Elérhető típusok: ohm, soros-parhuzamos, feszultsegeses, negyutemu, attetel,
 * akkupakk, fuggveny, pitagorasz, gyakorlas, idovonal, hajitas, atomepito. */
(function () {
  'use strict';
  var S = window.STUDIE, fmt = S.fmt, esc = S.esc;
  var NS = 'http://www.w3.org/2000/svg';

  function head(title, help) {
    return '<div class="w-title">' + esc(title) + '</div>' + (help ? '<p class="w-help">' + S.inline(help) + '</p>' : '');
  }
  /* csúszka: [kulcs, felirat, min, max, lépés, érték, mértékegység] */
  function rng(k, label, min, max, step, val, unit) {
    return '<label>' + '<span class="lv"><span>' + esc(label) + '</span><b><span data-v="' + k + '">' + fmt(val) + '</span> ' + esc(unit || '') + '</b></span>' +
      '<input type="range" data-k="' + k + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></label>';
  }
  function bind(el, update) {
    var inputs = el.querySelectorAll('input[type=range][data-k]');
    function read() {
      var v = {};
      inputs.forEach(function (i) {
        v[i.dataset.k] = parseFloat(i.value);
        var o = el.querySelector('[data-v="' + i.dataset.k + '"]');
        if (o) o.textContent = fmt(parseFloat(i.value));
      });
      return v;
    }
    inputs.forEach(function (i) { i.addEventListener('input', function () { update(read()); }); });
    update(read());
    return read;
  }
  function res(items) {
    return '<div class="w-res">' + items.map(function (x) { return '<div><small>' + esc(x[0]) + '</small><b>' + x[1] + '</b></div>'; }).join('') + '</div>';
  }
  function seg(name, opts, cur) {
    return '<div class="seg" data-seg="' + name + '">' + opts.map(function (o) {
      return '<button type="button" data-val="' + esc(o[0]) + '" class="' + (o[0] === cur ? 'on' : '') + '">' + esc(o[1]) + '</button>';
    }).join('') + '</div>';
  }
  function onSeg(el, name, cb) {
    var box = el.querySelector('[data-seg="' + name + '"]');
    box.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        box.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
        cb(b.dataset.val);
      });
    });
  }
  /* Animáció, ami leáll, ha a widget eltűnik az oldalról. */
  function loop(el, fn) {
    var last = null;
    function tick(t) {
      if (!document.body.contains(el)) return;
      var dt = last == null ? 0 : Math.min(0.05, (t - last) / 1000);
      last = t; fn(dt);
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- 1. Ohm-törvény ---------- */
  S.addWidget('ohm', function (el, o) {
    el.innerHTML = head(o.title || 'Ohm törvénye – próbáld ki!', o.help || 'Állítsd a feszültséget és az ellenállást, és figyeld, hogyan változik az áram és a teljesítmény. Az izzó fényereje a teljesítménnyel nő.') +
      '<div class="w-grid"><div class="w-ctrl">' +
      rng('u', 'Feszültség (U)', 0, o.maxU || 24, 0.5, o.u || 12, 'V') +
      rng('r', 'Ellenállás (R)', 1, o.maxR || 100, 1, o.r || 12, 'Ω') +
      '</div><div class="w-out"><svg class="w-svg" viewBox="0 0 320 170">' +
      '<rect x="40" y="30" width="240" height="110" rx="10" fill="none" stroke-width="4" class="svg-line"/>' +
      '<rect x="20" y="62" width="40" height="46" rx="4" fill="var(--surface)" stroke-width="3" class="svg-line"/>' +
      '<text x="40" y="82" text-anchor="middle" class="svg-text" font-size="13" font-weight="700">+</text><text x="40" y="100" text-anchor="middle" class="svg-text" font-size="13">−</text>' +
      '<rect x="125" y="128" width="70" height="24" rx="3" fill="#c9a26b" stroke="#7a5a2b" stroke-width="2"/>' +
      '<text x="160" y="166" text-anchor="middle" class="svg-muted" font-size="11">ellenállás</text>' +
      '<circle id="glow" cx="160" cy="30" r="30" fill="#ffd54a" opacity="0"/>' +
      '<circle cx="160" cy="30" r="16" fill="var(--surface)" stroke-width="3" class="svg-line"/>' +
      '<path d="M152 34 q4 -12 8 0 q4 -12 8 0" fill="none" stroke="#b8860b" stroke-width="2"/>' +
      '<g id="dots"></g></svg><div class="w-formula" id="f"></div><div id="r"></div></div></div>';
    var dots = el.querySelector('#dots'), glow = el.querySelector('#glow');
    var path = [[40, 30], [280, 30], [280, 140], [40, 140]];
    var per = 2 * (240 + 110), n = 14, pos = 0, I = 0;
    for (var i = 0; i < n; i++) { var c = document.createElementNS(NS, 'circle'); c.setAttribute('r', 3.5); c.setAttribute('fill', '#2f7bf6'); dots.appendChild(c); }
    function pt(d) {
      d = ((d % per) + per) % per;
      if (d < 240) return [40 + d, 30]; d -= 240;
      if (d < 110) return [280, 30 + d]; d -= 110;
      if (d < 240) return [280 - d, 140]; d -= 240;
      return [40, 140 - d];
    }
    bind(el, function (v) {
      I = v.u / v.r; var P = v.u * I;
      el.querySelector('#f').textContent = 'I = U / R = ' + fmt(v.u) + ' V / ' + fmt(v.r) + ' Ω = ' + fmt(I, 3) + ' A';
      el.querySelector('#r').innerHTML = res([['Áramerősség (I)', fmt(I, 3) + ' A'], ['Teljesítmény (P = U·I)', fmt(P, 2) + ' W'], ['Áram mA-ben', fmt(I * 1000, 0) + ' mA']]);
      glow.setAttribute('opacity', Math.min(1, P / 20).toFixed(2));
    });
    loop(el, function (dt) {
      pos += dt * Math.min(I, 3) * 80;
      for (var k = 0; k < n; k++) { var p = pt(pos + k * per / n); dots.children[k].setAttribute('cx', p[0]); dots.children[k].setAttribute('cy', p[1]); }
    });
  });

  /* ---------- 2. Soros és párhuzamos kapcsolás ---------- */
  S.addWidget('soros-parhuzamos', function (el, o) {
    var mode = 'soros';
    el.innerHTML = head('Soros vagy párhuzamos?', 'Válts a két kapcsolás között, és nézd meg, hogyan oszlik meg a feszültség és az áram.') +
      '<div class="row" style="margin-bottom:10px">' + seg('m', [['soros', 'Soros'], ['parhuzamos', 'Párhuzamos']], mode) + '</div>' +
      '<div class="w-grid"><div class="w-ctrl">' + rng('u', 'Tápfeszültség (U)', 1, 48, 1, 12, 'V') + rng('r1', 'R1', 1, 100, 1, 10, 'Ω') + rng('r2', 'R2', 1, 100, 1, 30, 'Ω') +
      '</div><div class="w-out"><svg class="w-svg" viewBox="0 0 320 170" id="sch"></svg><div id="r"></div><div class="w-formula" id="f"></div></div></div>';
    var read;
    function draw(v) {
      var R1 = '<rect x="X" y="Y" width="56" height="20" rx="3" fill="#c9a26b" stroke="#7a5a2b" stroke-width="2"/>';
      function r(x, y, t) { return R1.replace('X', x).replace('Y', y) + '<text x="' + (x + 28) + '" y="' + (y - 6) + '" text-anchor="middle" class="svg-text" font-size="12">' + t + '</text>'; }
      var bat = '<rect x="18" y="62" width="34" height="46" rx="4" fill="var(--surface)" stroke-width="3" class="svg-line"/><text x="35" y="90" text-anchor="middle" class="svg-text" font-size="11">' + fmt(v.u) + 'V</text>';
      var s = bat;
      if (mode === 'soros') {
        s += '<path d="M35 62 V30 H90 M146 30 H200 M256 30 H290 V140 H35 V108" fill="none" stroke-width="3" class="svg-line"/>' + r(90, 20, 'R1') + r(200, 20, 'R2');
      } else {
        s += '<path d="M35 62 V30 H290 V140 H35 V108 M130 30 V55 M130 115 V140 M230 30 V55 M230 115 V140" fill="none" stroke-width="3" class="svg-line"/>' +
          '<g transform="rotate(90 130 85)">' + r(102, 75, '') + '</g><g transform="rotate(90 230 85)">' + r(202, 75, '') + '</g>' +
          '<text x="148" y="90" class="svg-text" font-size="12">R1</text><text x="248" y="90" class="svg-text" font-size="12">R2</text>';
      }
      el.querySelector('#sch').innerHTML = s;
    }
    function update(v) {
      draw(v);
      var Re, I, rows, f;
      if (mode === 'soros') {
        Re = v.r1 + v.r2; I = v.u / Re;
        rows = [['Eredő ellenállás', fmt(Re) + ' Ω'], ['Áram (mindenhol ugyanannyi)', fmt(I, 3) + ' A'], ['U1 (R1-en)', fmt(I * v.r1) + ' V'], ['U2 (R2-n)', fmt(I * v.r2) + ' V']];
        f = 'Re = R1 + R2   |   U = U1 + U2';
      } else {
        Re = v.r1 * v.r2 / (v.r1 + v.r2); I = v.u / Re;
        rows = [['Eredő ellenállás', fmt(Re) + ' Ω'], ['Teljes áram', fmt(I, 3) + ' A'], ['I1 (R1-en)', fmt(v.u / v.r1, 3) + ' A'], ['I2 (R2-n)', fmt(v.u / v.r2, 3) + ' A']];
        f = '1/Re = 1/R1 + 1/R2   |   I = I1 + I2   |   feszültség mindkettőn ' + fmt(v.u) + ' V';
      }
      el.querySelector('#r').innerHTML = res(rows);
      el.querySelector('#f').textContent = f;
    }
    read = bind(el, update);
    onSeg(el, 'm', function (val) { mode = val; update(read()); });
  });

  /* ---------- 3. Vezeték feszültségesése ---------- */
  S.addWidget('feszultsegeses', function (el) {
    var A = 2.5;
    el.innerHTML = head('Mekkora vezeték kell? – feszültségesés', 'Egyfázisú, 230 V-os rézvezeték. Állítsd a hosszt és az áramot, válaszd ki a keresztmetszetet. Lakásban általában legfeljebb kb. 3–4% esés a megengedett.') +
      '<div class="w-grid"><div class="w-ctrl">' + rng('l', 'Vezetékhossz (egy irányban)', 1, 100, 1, 25, 'm') + rng('i', 'Terhelő áram', 1, 32, 1, 16, 'A') +
      '<div><small class="muted">Keresztmetszet</small><br>' + seg('a', [['1.5', '1,5 mm²'], ['2.5', '2,5 mm²'], ['4', '4 mm²'], ['6', '6 mm²'], ['10', '10 mm²']], '2.5') + '</div>' +
      '</div><div class="w-out"><div class="w-formula">ΔU = 2 · L · I · ρ / A,  ρ(réz) = 0,0175 Ω·mm²/m</div><div id="r"></div><div id="m"></div></div></div>';
    var read = bind(el, update);
    onSeg(el, 'a', function (v) { A = parseFloat(v); update(read()); });
    function update(v) {
      var du = 2 * v.l * v.i * 0.0175 / A, pct = du / 230 * 100, loss = du * v.i;
      el.querySelector('#r').innerHTML = res([['Feszültségesés', fmt(du) + ' V'], ['Százalékban', fmt(pct) + ' %'], ['A fogyasztónál', fmt(230 - du, 1) + ' V'], ['Hőveszteség a vezetékben', fmt(loss, 1) + ' W']]);
      var max = { 1.5: 16, 2.5: 20, 4: 27, 6: 34, 10: 46 }[A];
      var msg = v.i > max ? ['bad', 'Túl nagy áram ehhez a keresztmetszethez! A vezeték túlmelegedhet (tájékoztató terhelhetőség kb. ' + max + ' A, szerelési módtól függ).']
        : pct > 4 ? ['bad', 'Túl nagy a feszültségesés. Válassz vastagabb vezetéket vagy rövidebb nyomvonalat.']
          : pct > 3 ? ['warn', 'Határeset. Érdemes vastagabb vezetéket választani.'] : ['ok', 'Rendben: a feszültségesés elfogadható.'];
      el.querySelector('#m').innerHTML = '<div class="w-msg ' + msg[0] + '">' + msg[1] + '</div>';
    }
  });

  /* ---------- 4. Négyütemű motor animáció ---------- */
  S.addWidget('negyutemu', function (el) {
    var PH = [
      ['1. Szívás', 'A dugattyú lefelé mozog, a **szívószelep nyitva**: üzemanyag–levegő keverék áramlik a hengerbe.', '#7fb3ff'],
      ['2. Sűrítés', 'Mindkét szelep zárva. A dugattyú felfelé mozog és kb. tizedére **összenyomja** a keveréket, ami közben felmelegszik.', '#a58bff'],
      ['3. Munkaütem (égés)', 'A gyertya szikrája **meggyújtja** a keveréket. A forró gáz nagy erővel lenyomja a dugattyút: ez az egyetlen ütem, ami munkát végez.', '#ff8a3d'],
      ['4. Kipufogás', 'A **kipufogószelep nyitva**, a felfelé mozgó dugattyú kitolja az égéstermékeket. Utána kezdődik újra a szívás.', '#9aa0a6']
    ];
    el.innerHTML = head('Négyütemű benzinmotor működés közben', 'Egy teljes ciklus két főtengely-fordulat (720°). Indítsd el, lassítsd le, vagy ugorj egy ütemre.') +
      '<div class="w-grid"><svg class="w-svg" viewBox="0 0 300 340" id="eng">' +
      '<rect x="95" y="40" width="110" height="170" fill="var(--surface)" stroke-width="4" class="svg-line"/>' +
      '<rect id="gas" x="97" y="42" width="106" height="60" fill="#7fb3ff" opacity=".55"/>' +
      '<rect x="80" y="22" width="140" height="22" rx="3" fill="#8d96a8"/>' +
      '<path d="M40 30 H105 M195 30 H260" stroke="#8d96a8" stroke-width="16"/>' +
      '<text x="40" y="16" class="svg-muted" font-size="11">szívás</text><text x="215" y="16" class="svg-muted" font-size="11">kipufogó</text>' +
      '<g id="vi"><rect x="117" y="10" width="6" height="34" fill="#596275"/><rect x="104" y="42" width="32" height="6" rx="2" fill="#596275"/></g>' +
      '<g id="ve"><rect x="177" y="10" width="6" height="34" fill="#596275"/><rect x="164" y="42" width="32" height="6" rx="2" fill="#596275"/></g>' +
      '<rect x="146" y="6" width="8" height="30" fill="#e6e6e6" stroke="#777"/><circle id="spark" cx="150" cy="50" r="10" fill="#fff36b" opacity="0"/>' +
      '<g id="pist"><rect x="99" y="0" width="102" height="44" rx="4" fill="#b9c0cc" stroke="#6b7385" stroke-width="2"/>' +
      '<path d="M99 10 H201 M99 18 H201" stroke="#6b7385"/><circle cx="150" cy="28" r="6" fill="#6b7385"/></g>' +
      '<line id="rod" stroke="#6b7385" stroke-width="12" stroke-linecap="round"/>' +
      '<circle cx="150" cy="275" r="52" fill="none" stroke="var(--line)" stroke-width="3" stroke-dasharray="4 5"/>' +
      '<g id="crank"><circle cx="150" cy="275" r="20" fill="#596275"/><line x1="150" y1="275" x2="150" y2="235" stroke="#596275" stroke-width="16"/></g>' +
      '<circle id="pin" r="7" fill="#d7dbe3" stroke="#596275" stroke-width="2"/>' +
      '<text x="150" y="330" text-anchor="middle" class="svg-muted" font-size="11" id="deg"></text></svg>' +
      '<div class="w-out"><h3 id="ph" style="margin:0"></h3><p id="pt" style="margin:0"></p>' +
      '<div class="row"><button type="button" class="btn primary" id="play">⏸ Szünet</button>' + rng('sp', 'Sebesség', 0.1, 2, 0.1, 0.5, '×').replace('<label>', '<label style="flex:1;min-width:150px">') + '</div>' +
      '<div class="row">' + PH.map(function (p, i) { return '<button type="button" class="btn" data-ph="' + i + '">' + p[0] + '</button>'; }).join('') + '</div></div></div>';
    var th = 0, playing = true, speed = 0.5, lastPh = -1;
    var r = 40, l = 115, cx = 150, cy = 275;
    var $ = function (s) { return el.querySelector(s); };
    bind(el, function (v) { speed = v.sp; });
    $('#play').addEventListener('click', function () { playing = !playing; this.textContent = playing ? '⏸ Szünet' : '▶ Indítás'; });
    el.querySelectorAll('[data-ph]').forEach(function (b) { b.addEventListener('click', function () { th = +b.dataset.ph * 180 + 1; draw(); }); });
    function draw() {
      var a = th * Math.PI / 180, ph = Math.floor((th % 720) / 180);
      var px = cx + r * Math.sin(a), py = cy - r * Math.cos(a);
      var pinY = cy - (r * Math.cos(a) + Math.sqrt(l * l - Math.pow(r * Math.sin(a), 2)));
      $('#pist').setAttribute('transform', 'translate(0 ' + (pinY - 28) + ')');
      $('#rod').setAttribute('x1', px); $('#rod').setAttribute('y1', py); $('#rod').setAttribute('x2', cx); $('#rod').setAttribute('y2', pinY);
      $('#pin').setAttribute('cx', px); $('#pin').setAttribute('cy', py);
      $('#crank').setAttribute('transform', 'rotate(' + (th % 360) + ' 150 275)');
      var top = 42, bottom = pinY - 28;
      $('#gas').setAttribute('y', top); $('#gas').setAttribute('height', Math.max(0, bottom - top));
      $('#gas').setAttribute('fill', PH[ph][2]);
      var local = (th % 720) - ph * 180;
      $('#vi').setAttribute('transform', 'translate(0 ' + (ph === 0 ? 10 * Math.sin(local / 180 * Math.PI) : 0) + ')');
      $('#ve').setAttribute('transform', 'translate(0 ' + (ph === 3 ? 10 * Math.sin(local / 180 * Math.PI) : 0) + ')');
      $('#spark').setAttribute('opacity', ph === 2 && local < 25 ? (1 - local / 25).toFixed(2) : 0);
      $('#deg').textContent = 'főtengely: ' + Math.round(th % 720) + '° / 720°';
      if (ph !== lastPh) {
        lastPh = ph;
        $('#ph').textContent = PH[ph][0];
        $('#pt').innerHTML = S.inline(PH[ph][1]);
        el.querySelectorAll('[data-ph]').forEach(function (b) { b.classList.toggle('on', +b.dataset.ph === ph); });
      }
    }
    loop(el, function (dt) { if (playing) th = (th + dt * 360 * speed) % 720; draw(); });
  });

  /* ---------- 5. Fogaskerék-áttétel ---------- */
  function gearPath(cx, cy, z, m) {
    var rp = z * m / 2, ra = rp + m, rf = rp - 1.25 * m, d = '';
    for (var i = 0; i < z; i++) {
      var a = i * 2 * Math.PI / z, t = Math.PI / z;
      var pts = [[rf, a - t * 0.55], [ra, a - t * 0.28], [ra, a + t * 0.28], [rf, a + t * 0.55], [rf, a + t * 1.45]];
      pts.forEach(function (p, j) {
        d += (i === 0 && j === 0 ? 'M' : 'L') + (cx + p[0] * Math.cos(p[1])).toFixed(1) + ' ' + (cy + p[0] * Math.sin(p[1])).toFixed(1) + ' ';
      });
    }
    return d + 'Z';
  }
  S.addWidget('attetel', function (el) {
    el.innerHTML = head('Fogaskerék-áttétel', 'A kis kerék hajtja a nagyot. Nagyobb hajtott kerék: lassabb forgás, de **nagyobb nyomaték**. Így működik a sebességváltó is.') +
      '<div class="w-grid"><div class="w-ctrl">' + rng('z1', 'Hajtó kerék fogszáma (z1)', 8, 30, 1, 12, 'fog') + rng('z2', 'Hajtott kerék fogszáma (z2)', 8, 40, 1, 24, 'fog') +
      rng('n', 'Motor fordulatszáma', 500, 6000, 100, 3000, '1/perc') + rng('m', 'Motor nyomatéka', 50, 400, 10, 200, 'Nm') +
      '</div><div class="w-out"><svg class="w-svg" viewBox="0 0 340 200" id="g"></svg><div id="r"></div></div></div>';
    var v0, a1 = 0;
    var mod = 5;
    bind(el, function (v) { v0 = v; });
    loop(el, function (dt) {
      var v = v0; if (!v) return;
      var r1 = v.z1 * mod / 2, r2 = v.z2 * mod / 2;
      var c1x = 170 - (r1 + r2) / 2, c2x = c1x + r1 + r2, cy = 100;
      var sc = Math.min(1, 320 / (2 * r1 + 2 * r2 + 4 * mod), 180 / (2 * r2 + 4 * mod));
      a1 += dt * 60 * (v.n / 3000);
      var a2 = -a1 * v.z1 / v.z2 + 180 / v.z2 + (v.z2 % 2 ? 0 : 180 / v.z2);
      el.querySelector('#g').innerHTML = '<g transform="translate(170 100) scale(' + sc + ') translate(-170 -100)">' +
        '<g transform="rotate(' + a1 + ' ' + c1x + ' ' + cy + ')"><path d="' + gearPath(c1x, cy, v.z1, mod) + '" fill="#2f7bf6" opacity=".85"/><circle cx="' + c1x + '" cy="' + cy + '" r="5" fill="var(--surface)"/><line x1="' + c1x + '" y1="' + cy + '" x2="' + (c1x + r1 * 0.7) + '" y2="' + cy + '" stroke="var(--surface)" stroke-width="3"/></g>' +
        '<g transform="rotate(' + a2 + ' ' + c2x + ' ' + cy + ')"><path d="' + gearPath(c2x, cy, v.z2, mod) + '" fill="#f08c2e" opacity=".85"/><circle cx="' + c2x + '" cy="' + cy + '" r="6" fill="var(--surface)"/><line x1="' + c2x + '" y1="' + cy + '" x2="' + (c2x + r2 * 0.7) + '" y2="' + cy + '" stroke="var(--surface)" stroke-width="3"/></g></g>';
      var i = v.z2 / v.z1;
      el.querySelector('#r').innerHTML = res([['Áttétel (i = z2/z1)', fmt(i) + ' : 1'], ['Kimenő fordulat', fmt(v.n / i, 0) + ' 1/perc'], ['Kimenő nyomaték', fmt(v.m * i, 0) + ' Nm'], ['Teljesítmény (nem változik)', fmt(v.m * v.n * 2 * Math.PI / 60 / 1000, 1) + ' kW']]);
    });
  });

  /* ---------- 6. Akkupakk tervező (elektromos autó) ---------- */
  S.addWidget('akkupakk', function (el) {
    var chem = 'nmc';
    el.innerHTML = head('Tervezz akkumulátort egy elektromos autóba!', 'A cellákat sorba kötve nő a **feszültség**, párhuzamosan kötve a **kapacitás**. A kettő szorzata adja az energiát (kWh).') +
      '<div class="row" style="margin-bottom:10px">' + seg('c', [['nmc', 'NMC cella (3,6 V)'], ['lfp', 'LFP cella (3,2 V)']], chem) + '</div>' +
      '<div class="w-grid"><div class="w-ctrl">' + rng('s', 'Sorba kötött cellák (S)', 1, 200, 1, 96, 'db') + rng('p', 'Párhuzamos ágak (P)', 1, 60, 1, 46, 'db') +
      rng('ah', 'Egy cella kapacitása', 1, 100, 0.5, 5, 'Ah') + rng('c', 'Fogyasztás', 12, 25, 0.5, 16, 'kWh/100 km') +
      '</div><div class="w-out"><svg class="w-svg" viewBox="0 0 320 120" id="cells"></svg><div id="r"></div><div id="m"></div></div></div>';
    var read = bind(el, update);
    onSeg(el, 'c', function (v) { chem = v; update(read()); });
    function update(v) {
      var vc = chem === 'nmc' ? 3.6 : 3.2, kg = chem === 'nmc' ? 0.07 : 0.08;
      var U = v.s * vc, Ah = v.p * v.ah, kWh = U * Ah / 1000, n = v.s * v.p;
      var wPerCell = vc * v.ah; // Wh
      var mass = n * wPerCell / (chem === 'nmc' ? 250 : 160) * (1 + 0.45); // cellatömeg + ház, hűtés, BMS kb. +45%
      el.querySelector('#r').innerHTML = res([['Pakk feszültség', fmt(U, 0) + ' V'], ['Pakk kapacitás', fmt(Ah, 0) + ' Ah'], ['Energia', fmt(kWh, 1) + ' kWh'],
        ['Cellák száma', fmt(n, 0) + ' db'], ['Becsült hatótáv', fmt(kWh * 0.92 / v.c * 100, 0) + ' km'], ['Becsült tömeg', fmt(mass, 0) + ' kg']]);
      var msg = U > 1000 ? ['bad', 'Ez már túl nagy feszültség egy személyautóhoz.'] : U >= 600 ? ['ok', '800 V-os rendszer: gyorsabb töltés, vékonyabb kábelek (pl. néhány prémium modell).']
        : U >= 300 ? ['ok', 'Tipikus 400 V-os rendszer, mint a legtöbb mai villanyautóban.'] : ['warn', 'Alacsony feszültség: nagy áram kellene ugyanakkora teljesítményhez, ezért vastagabb kábel kellene.'];
      el.querySelector('#m').innerHTML = '<div class="w-msg ' + msg[0] + '">' + msg[1] + '</div>';
      var cols = Math.min(v.s, 24), rows = Math.min(v.p, 6), w = 300 / cols, h = 100 / rows, s = '';
      for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
        s += '<rect x="' + (10 + c * w + 1) + '" y="' + (10 + r * h + 1) + '" width="' + Math.max(1, w - 2) + '" height="' + Math.max(1, h - 2) + '" rx="2" fill="' + (chem === 'nmc' ? '#2f9e6a' : '#3478c6') + '"/>';
      }
      if (v.s > 24 || v.p > 6) s += '<text x="310" y="114" text-anchor="end" class="svg-muted" font-size="10">(a rajz csak egy részletet mutat)</text>';
      el.querySelector('#cells').innerHTML = s;
    }
  });

  /* ---------- 7. Függvényábrázoló ---------- */
  S.addWidget('fuggveny', function (el, o) {
    var kind = o.kind || 'masodfoku';
    var X = 10;
    el.innerHTML = head(kind === 'linearis' ? 'Lineáris függvény: y = m·x + b' : 'Másodfokú függvény: y = a·x² + b·x + c',
      kind === 'linearis' ? 'Az **m** a meredekség (mennyit lép fel, ha egyet lépsz jobbra), a **b** az y-tengellyel vett metszéspont.' : 'Figyeld meg: az **a** előjele dönti el, felfelé vagy lefelé nyílik-e a parabola. A diszkrimináns megmondja, hány zérushely van.') +
      '<div class="w-grid"><div class="w-ctrl">' +
      (kind === 'linearis' ? rng('a', 'm (meredekség)', -5, 5, 0.1, 1, '') + rng('b', 'b (eltolás)', -8, 8, 0.5, 2, '')
        : rng('a', 'a', -3, 3, 0.1, 1, '') + rng('b', 'b', -8, 8, 0.5, 0, '') + rng('c', 'c', -8, 8, 0.5, -4, '')) +
      '<div id="r"></div></div><div class="w-out"><svg class="w-svg" viewBox="-11 -11 22 22" id="p"></svg><div class="w-formula" id="f"></div></div></div>';
    var grid = '';
    for (var i = -X; i <= X; i++) grid += '<line x1="' + i + '" y1="-10" x2="' + i + '" y2="10" class="svg-grid" stroke-width="' + (i ? 0.04 : 0.1) + '"' + (i ? '' : ' style="stroke:var(--fg-2)"') + '/><line x1="-10" y1="' + i + '" x2="10" y2="' + i + '" class="svg-grid" stroke-width="' + (i ? 0.04 : 0.1) + '"' + (i ? '' : ' style="stroke:var(--fg-2)"') + '/>';
    for (i = -X; i <= X; i += 2) if (i) grid += '<text x="' + i + '" y="0.9" font-size="0.6" text-anchor="middle" class="svg-muted">' + i + '</text><text x="-0.4" y="' + (-i + 0.2) + '" font-size="0.6" text-anchor="end" class="svg-muted">' + i + '</text>';
    bind(el, function (v) {
      var f = kind === 'linearis' ? function (x) { return v.a * x + v.b; } : function (x) { return v.a * x * x + v.b * x + v.c; };
      var d = '', started = false;
      for (var x = -X; x <= X + 1e-9; x += 0.05) {
        var y = f(x);
        if (Math.abs(y) > 40) { started = false; continue; }
        d += (started ? 'L' : 'M') + x.toFixed(2) + ' ' + (-y).toFixed(3) + ' '; started = true;
      }
      var extra = '', rows = [], ftxt;
      if (kind === 'linearis') {
        ftxt = 'y = ' + fmt(v.a) + '·x ' + (v.b < 0 ? '− ' + fmt(-v.b) : '+ ' + fmt(v.b));
        rows.push(['Meredekség', fmt(v.a)], ['Metszés az y-tengelyen', '(0; ' + fmt(v.b) + ')']);
        if (v.a !== 0) { var z = -v.b / v.a; rows.push(['Zérushely', 'x = ' + fmt(z)]); extra += '<circle cx="' + z + '" cy="0" r="0.3" fill="#e5484d"/>'; }
        rows.push(['Növekvő?', v.a > 0 ? 'igen' : v.a < 0 ? 'nem, csökkenő' : 'konstans']);
      } else {
        ftxt = 'y = ' + fmt(v.a) + '·x² ' + (v.b < 0 ? '− ' + fmt(-v.b) : '+ ' + fmt(v.b)) + '·x ' + (v.c < 0 ? '− ' + fmt(-v.c) : '+ ' + fmt(v.c));
        if (Math.abs(v.a) < 1e-9) rows.push(['Figyelem', 'a = 0: ez már nem parabola, hanem egyenes!']);
        else {
          var D = v.b * v.b - 4 * v.a * v.c, vx = -v.b / (2 * v.a), vy = f(vx);
          rows.push(['Diszkrimináns (D = b² − 4ac)', fmt(D)], ['Csúcspont', '(' + fmt(vx) + '; ' + fmt(vy) + ')']);
          if (D > 0) {
            var x1 = (-v.b - Math.sqrt(D)) / (2 * v.a), x2 = (-v.b + Math.sqrt(D)) / (2 * v.a);
            rows.push(['Zérushelyek', 'x₁ = ' + fmt(x1) + ', x₂ = ' + fmt(x2)]);
            extra += '<circle cx="' + x1 + '" cy="0" r="0.3" fill="#e5484d"/><circle cx="' + x2 + '" cy="0" r="0.3" fill="#e5484d"/>';
          } else if (D === 0) { rows.push(['Zérushely', 'egy: x = ' + fmt(vx)]); extra += '<circle cx="' + vx + '" cy="0" r="0.3" fill="#e5484d"/>'; }
          else rows.push(['Zérushely', 'nincs (D < 0)']);
          extra += '<circle cx="' + vx + '" cy="' + (-vy) + '" r="0.3" fill="#f08c2e"/>';
        }
      }
      el.querySelector('#p').innerHTML = grid + '<path d="' + d + '" fill="none" stroke="#2f7bf6" stroke-width="0.18"/>' + extra;
      el.querySelector('#f').textContent = ftxt;
      el.querySelector('#r').innerHTML = res(rows);
    });
  });

  /* ---------- 8. Pitagorasz-tétel ---------- */
  S.addWidget('pitagorasz', function (el) {
    el.innerHTML = head('Pitagorasz-tétel: a² + b² = c²', 'A két befogóra rajzolt négyzet területe együtt pontosan akkora, mint az átfogóra rajzolt négyzeté. Próbáld ki bármilyen oldalakkal!') +
      '<div class="w-grid"><div class="w-ctrl">' + rng('a', 'a befogó', 1, 12, 0.5, 3, 'egység') + rng('b', 'b befogó', 1, 12, 0.5, 4, 'egység') +
      '<div id="r"></div></div><div class="w-out"><svg class="w-svg" id="p"></svg><div class="w-formula" id="f"></div></div></div>';
    bind(el, function (v) {
      var a = v.a, b = v.b, c = Math.sqrt(a * a + b * b);
      // derékszög az origóban; a az x-tengelyen, b az y-tengelyen (y felfelé)
      var minX = -b, maxX = a + b, minY = -a, maxY = b + a, pad = 1.2;
      var svg = el.querySelector('#p');
      svg.setAttribute('viewBox', (minX - pad) + ' ' + (-(maxY) - pad) + ' ' + (maxX - minX + 2 * pad) + ' ' + (maxY - minY + 2 * pad));
      function P(pts) { return pts.map(function (p) { return p[0] + ',' + (-p[1]); }).join(' '); }
      var sw = (maxX - minX) / 160;
      var fs = (maxX - minX) / 22;
      svg.innerHTML =
        '<polygon points="' + P([[0, 0], [a, 0], [a, -a], [0, -a]]) + '" fill="#2f7bf6" opacity=".35" stroke="#2f7bf6" stroke-width="' + sw + '"/>' +
        '<polygon points="' + P([[0, 0], [0, b], [-b, b], [-b, 0]]) + '" fill="#2f9e6a" opacity=".35" stroke="#2f9e6a" stroke-width="' + sw + '"/>' +
        '<polygon points="' + P([[a, 0], [0, b], [b, b + a], [a + b, a]]) + '" fill="#f08c2e" opacity=".35" stroke="#f08c2e" stroke-width="' + sw + '"/>' +
        '<polygon points="' + P([[0, 0], [a, 0], [0, b]]) + '" fill="var(--surface)" stroke="var(--fg)" stroke-width="' + sw * 1.5 + '"/>' +
        '<text x="' + a / 2 + '" y="' + a / 2 + '" font-size="' + fs + '" text-anchor="middle" class="svg-text">a² = ' + fmt(a * a) + '</text>' +
        '<text x="' + -b / 2 + '" y="' + -b / 2 + '" font-size="' + fs + '" text-anchor="middle" class="svg-text">b² = ' + fmt(b * b) + '</text>' +
        '<text x="' + (a + b) / 2 + '" y="' + -(a + b) / 2 + '" font-size="' + fs + '" text-anchor="middle" class="svg-text">c² = ' + fmt(c * c) + '</text>';
      el.querySelector('#f').textContent = fmt(a) + '² + ' + fmt(b) + '² = ' + fmt(a * a) + ' + ' + fmt(b * b) + ' = ' + fmt(c * c) + ' = c²';
      el.querySelector('#r').innerHTML = res([['Átfogó (c)', fmt(c, 3)], ['Egész szám?', Math.abs(c - Math.round(c)) < 1e-9 ? 'igen – pitagoraszi számhármas!' : 'nem']]);
    });
  });

  /* ---------- 9. Gyakorló feladatgenerátor ---------- */
  function ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  var GEN = {
    egyenlet: function () {
      var x = ri(-9, 9), a = ri(2, 9) * (Math.random() < 0.2 ? -1 : 1), b = ri(-20, 20), c = a * x + b;
      return { task: a + '·x ' + (b < 0 ? '− ' + -b : '+ ' + b) + ' = ' + c, answer: x,
        steps: ['Vonjuk ki mindkét oldalból a(z) ' + b + '-t: ' + a + '·x = ' + (c - b), 'Osszuk el mindkét oldalt ' + a + '-val: x = ' + x] };
    },
    szazalek: function () {
      var p = [5, 10, 15, 20, 25, 30, 40, 50, 75][ri(0, 8)], base = ri(2, 40) * 20;
      return { task: base + ' ' + p + '%-a = ?', answer: base * p / 100,
        steps: ['1% = ' + base + ' / 100 = ' + fmt(base / 100), p + '% = ' + fmt(base / 100) + ' · ' + p + ' = ' + fmt(base * p / 100)] };
    },
    ohm: function () {
      var r = [2, 4, 5, 10, 20, 50, 100][ri(0, 6)], i = [0.5, 1, 2, 3, 4, 5][ri(0, 5)], u = r * i, k = ri(0, 2);
      if (k === 0) return { task: 'U = ' + fmt(u) + ' V, R = ' + r + ' Ω → I = ? (A)', answer: i, steps: ['I = U / R = ' + fmt(u) + ' / ' + r + ' = ' + fmt(i) + ' A'] };
      if (k === 1) return { task: 'I = ' + fmt(i) + ' A, R = ' + r + ' Ω → U = ? (V)', answer: u, steps: ['U = I · R = ' + fmt(i) + ' · ' + r + ' = ' + fmt(u) + ' V'] };
      return { task: 'U = ' + fmt(u) + ' V, I = ' + fmt(i) + ' A → R = ? (Ω)', answer: r, steps: ['R = U / I = ' + fmt(u) + ' / ' + fmt(i) + ' = ' + r + ' Ω'] };
    },
    tortek: function () {
      var a = ri(1, 5), b = ri(2, 6), c = ri(1, 5), d = ri(2, 6);
      function g(x, y) { return y ? g(y, x % y) : x; }
      var n = a * d + c * b, m = b * d, k = g(n, m);
      return { task: a + '/' + b + ' + ' + c + '/' + d + ' = ? (tizedes törtként)', answer: Math.round(n / m * 100) / 100, tol: 0.01,
        steps: ['Közös nevező: ' + b + '·' + d + ' = ' + m, 'Számláló: ' + a + '·' + d + ' + ' + c + '·' + b + ' = ' + n, 'Eredmény: ' + n + '/' + m + (k > 1 ? ' = ' + n / k + '/' + m / k : '') + ' ≈ ' + fmt(n / m)] };
    },
    szamrendszer: function () {
      var n = ri(5, 255), k = ri(0, 2);
      if (k === 0) return { task: n + ' (tízes) = ? (kettes számrendszerben)', answerStr: n.toString(2), steps: ['Oszd el sorban 2-vel, és írd le a maradékokat alulról felfelé.', n + ' = ' + n.toString(2) + '₂'] };
      if (k === 1) { var b = n.toString(2); return { task: b + '₂ = ? (tízes számrendszerben)', answer: n, steps: [b.split('').map(function (d, i) { return d + '·2^' + (b.length - 1 - i); }).join(' + ') + ' = ' + n] }; }
      return { task: n + ' (tízes) = ? (tizenhatos, hexadecimális)', answerStr: n.toString(16).toUpperCase(), steps: [n + ' = ' + Math.floor(n / 16) + '·16 + ' + (n % 16), 'A 10–15 számjegyek: A–F. Eredmény: ' + n.toString(16).toUpperCase() + '₁₆'] };
    },
    oszthatosag: function () {
      function g(x, y) { return y ? g(y, x % y) : x; }
      var f = ri(2, 12), a = f * ri(2, 9), b = f * ri(2, 9);
      if (a === b) b += f;
      var lnko = g(a, b), lkkt = a * b / lnko;
      return Math.random() < 0.5
        ? { task: 'Mennyi (' + a + '; ' + b + ') legnagyobb közös osztója?', answer: lnko, steps: ['Euklideszi algoritmus vagy prímtényezős felbontás: a közös prímtényezők a legkisebb kitevőn.', 'LNKO = ' + lnko] }
        : { task: 'Mennyi [' + a + '; ' + b + '] legkisebb közös többszöröse?', answer: lkkt, steps: ['LKKT = a · b / LNKO = ' + a + ' · ' + b + ' / ' + lnko, 'LKKT = ' + lkkt] };
    },
    negativ: function () {
      var a = ri(-20, 20), b = ri(-12, 12), op = ['+', '−', '·'][ri(0, 2)];
      var r = op === '+' ? a + b : op === '−' ? a - b : a * b;
      function p(x) { return x < 0 ? '(' + x + ')' : '' + x; }
      return { task: p(a) + ' ' + op + ' ' + p(b) + ' = ?', answer: r,
        steps: [op === '·' ? 'Szorzásnál: azonos előjelek → pozitív, különbözők → negatív eredmény.' : op === '−' ? 'Negatív szám kivonása = az ellentettjének hozzáadása: ' + a + ' + ' + p(-b) : 'Különböző előjelűeknél: a nagyobb abszolút értékűből vond ki a kisebbet, az előjel a nagyobbé.', '= ' + r] };
    },
    mertekegyseg: function () {
      var T = [['km', 'm', 1000], ['m', 'cm', 100], ['cm', 'mm', 10], ['kg', 'g', 1000], ['t', 'kg', 1000], ['l', 'dl', 10], ['l', 'ml', 1000], ['óra', 'perc', 60], ['perc', 'másodperc', 60], ['m²', 'dm²', 100], ['m²', 'cm²', 10000], ['dm³', 'cm³', 1000], ['m³', 'l', 1000]];
      var t = T[ri(0, T.length - 1)], v = ri(1, 40) / [1, 2, 4, 5, 10][ri(0, 4)];
      if (Math.random() < 0.5) return { task: fmt(v) + ' ' + t[0] + ' = ? ' + t[1], answer: v * t[2], tol: 1e-6, steps: ['1 ' + t[0] + ' = ' + t[2] + ' ' + t[1] + ', tehát szorozni kell: ' + fmt(v) + ' · ' + t[2] + ' = ' + fmt(v * t[2]) + ' ' + t[1]] };
      var w = v * t[2];
      return { task: fmt(w) + ' ' + t[1] + ' = ? ' + t[0], answer: v, tol: 1e-6, steps: ['1 ' + t[0] + ' = ' + t[2] + ' ' + t[1] + ', tehát osztani kell: ' + fmt(w) + ' / ' + t[2] + ' = ' + fmt(v) + ' ' + t[0]] };
    },
    kerulet: function () {
      var k = ri(0, 4), a = ri(2, 15), b = ri(2, 15), r = ri(1, 10);
      if (k === 0) return { task: 'Téglalap: a = ' + a + ' cm, b = ' + b + ' cm. Kerülete = ? cm', answer: 2 * (a + b), steps: ['K = 2·(a + b) = 2·(' + a + ' + ' + b + ') = ' + 2 * (a + b) + ' cm'] };
      if (k === 1) return { task: 'Téglalap: a = ' + a + ' cm, b = ' + b + ' cm. Területe = ? cm²', answer: a * b, steps: ['T = a·b = ' + a + '·' + b + ' = ' + a * b + ' cm²'] };
      if (k === 2) return { task: 'Háromszög: alap = ' + a + ' cm, magasság = ' + b + ' cm. Területe = ? cm²', answer: a * b / 2, steps: ['T = a·m / 2 = ' + a + '·' + b + ' / 2 = ' + fmt(a * b / 2) + ' cm²'] };
      if (k === 3) return { task: 'Kör: r = ' + r + ' cm. Területe = ? cm² (π ≈ 3,14, két tizedesre)', answer: Math.round(3.14 * r * r * 100) / 100, tol: 0.06, steps: ['T = r²·π = ' + r + '²·3,14 = ' + fmt(3.14 * r * r) + ' cm²'] };
      return { task: 'Kocka: a = ' + r + ' cm. Térfogata = ? cm³', answer: r * r * r, steps: ['V = a³ = ' + r + '³ = ' + r * r * r + ' cm³'] };
    },
    mol: function () {
      var S2 = [['H₂O', 18], ['CO₂', 44], ['NaCl', 58.5], ['O₂', 32], ['C', 12], ['CH₄', 16], ['NH₃', 17], ['Fe', 56]];
      var s = S2[ri(0, S2.length - 1)], n = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5][ri(0, 7)], m = s[1] * n;
      return Math.random() < 0.5
        ? { task: fmt(m) + ' g ' + s[0] + ' hány mol? (M = ' + fmt(s[1]) + ' g/mol)', answer: n, tol: 0.01, steps: ['n = m / M = ' + fmt(m) + ' / ' + fmt(s[1]) + ' = ' + fmt(n) + ' mol'] }
        : { task: fmt(n) + ' mol ' + s[0] + ' tömege hány gramm? (M = ' + fmt(s[1]) + ' g/mol)', answer: m, tol: 0.01, steps: ['m = n · M = ' + fmt(n) + ' · ' + fmt(s[1]) + ' = ' + fmt(m) + ' g'] };
    }
  };
  S.addWidget('gyakorlas', function (el, o) {
    var kind = o.kind || 'egyenlet', cur, streak = 0, total = 0, good = 0;
    el.innerHTML = head(o.title || 'Gyakorolj!', o.help || 'Végtelen sok feladat: mindig újat kapsz. Írd be a választ, és nézd meg a megoldás lépéseit.') +
      '<div class="practice"><div class="task" id="t"></div><form class="row" id="fm"><input type="text" inputmode="' + (kind === 'szamrendszer' ? 'text' : 'decimal') + '" id="in" aria-label="Válasz" placeholder="válasz">' +
      '<button class="btn primary" type="submit">Ellenőrzés</button><button class="btn" type="button" id="nx">Új feladat</button></form>' +
      '<div id="fb" style="margin-top:10px"></div><p class="muted" id="st"></p></div>';
    var $ = function (s) { return el.querySelector(s); };
    function next() { cur = GEN[kind](); $('#t').textContent = cur.task; $('#in').value = ''; $('#fb').innerHTML = ''; }
    $('#fm').addEventListener('submit', function (e) {
      e.preventDefault();
      var raw = $('#in').value.replace(/\s/g, ''), ok;
      if (cur.answerStr != null) {
        if (!raw) { $('#fb').innerHTML = '<div class="w-msg warn">Írj be egy választ!</div>'; return; }
        ok = raw.toUpperCase().replace(/^0+(?=.)/, '') === cur.answerStr;
      } else {
        var val = parseFloat(raw.replace(',', '.'));
        if (isNaN(val)) { $('#fb').innerHTML = '<div class="w-msg warn">Írj be egy számot!</div>'; return; }
        ok = Math.abs(val - cur.answer) <= (cur.tol || 1e-6);
      }
      total++; if (ok) { good++; streak++; } else streak = 0;
      $('#fb').innerHTML = '<div class="w-msg ' + (ok ? 'ok' : 'bad') + '">' + (ok ? '✔ Helyes!' : '✘ Nem jó. A helyes válasz: ' + (cur.answerStr != null ? cur.answerStr : fmt(cur.answer))) + '</div>' +
        '<div class="w-formula" style="margin-top:8px">' + cur.steps.map(esc).join('<br>') + '</div>';
      $('#st').textContent = 'Eredmény: ' + good + ' / ' + total + (streak > 1 ? ' · sorozat: ' + streak + ' 🔥' : '');
    });
    $('#nx').addEventListener('click', next);
    next();
  });

  /* ---------- 10. Idővonal + sorba rendezős játék ---------- */
  S.addWidget('idovonal', function (el, o) {
    var ev = (o.events || []).slice().sort(function (a, b) { return a.year - b.year; });
    var sel = 0;
    el.innerHTML = head(o.title || 'Idővonal', o.help || (o.steps ? 'Kattints egy lépésre a részletekért, utána próbáld ki a sorrendi játékot!' : 'Kattints egy évszámra a részletekért, utána próbáld ki az időrendi játékot!')) +
      '<div class="tl" id="tl">' + ev.map(function (e, i) {
        return '<button type="button" data-i="' + i + '"><i></i><b>' + esc(e.label || e.year) + '</b><span>' + esc(e.title) + '</span></button>';
      }).join('') + '</div><div class="tl-detail" id="d"></div>' +
      '<div class="order-game"><b>' + (o.steps ? 'Játék: tedd helyes sorrendbe!' : 'Játék: tedd időrendbe!') + '</b><span class="muted">' + (o.steps ? 'Kattints a lépésekre az elsőtől az utolsóig.' : 'Kattints az eseményekre a legkorábbitól a legkésőbbiig.') + '</span><div class="pool" id="pool"></div><div id="gm"></div>' +
      '<div><button type="button" class="btn" id="ng">Új kör</button></div></div>';
    function paint() {
      el.querySelectorAll('#tl button').forEach(function (b) { b.classList.toggle('on', +b.dataset.i === sel); });
      var e = ev[sel];
      el.querySelector('#d').innerHTML = '<b>' + esc(e.label || e.year) + ' – ' + esc(e.title) + '</b>' + S.md(e.text || '');
    }
    el.querySelectorAll('#tl button').forEach(function (b) { b.addEventListener('click', function () { sel = +b.dataset.i; paint(); }); });
    paint();
    function game() {
      var pick = S.shuffle(ev).slice(0, Math.min(5, ev.length));
      var sorted = pick.slice().sort(function (a, b) { return a.year - b.year; }), k = 0, miss = 0;
      el.querySelector('#gm').innerHTML = '';
      el.querySelector('#pool').innerHTML = pick.map(function (e, i) { return '<button type="button" class="btn" data-i="' + i + '">' + esc(e.title) + '</button>'; }).join('');
      el.querySelectorAll('#pool button').forEach(function (b) {
        b.addEventListener('click', function () {
          var e = pick[+b.dataset.i];
          if (e === sorted[k]) {
            k++; b.disabled = true; b.textContent = k + '. ' + e.title + ' (' + (e.label || e.year) + ')';
            if (k === sorted.length) el.querySelector('#gm').innerHTML = '<div class="w-msg ok">Kész! ' + (miss ? miss + ' tévedéssel.' : 'Hibátlanul! 🎉') + '</div>';
          } else { miss++; el.querySelector('#gm').innerHTML = '<div class="w-msg bad">Nem ez következik. Gondold át újra!</div>'; }
        });
      });
    }
    el.querySelector('#ng').addEventListener('click', game);
    game();
  });

  /* ---------- 11. Ferde hajítás ---------- */
  S.addWidget('hajitas', function (el) {
    var g = 9.81, t = null;
    el.innerHTML = head('Ferde hajítás', 'Állítsd be a kezdősebességet és a szöget, válaszd ki a bolygót, és lőj! (A légellenállást most elhanyagoljuk.)') +
      '<div class="row" style="margin-bottom:10px">' + seg('g', [['9.81', 'Föld'], ['1.62', 'Hold'], ['3.71', 'Mars'], ['24.79', 'Jupiter']], '9.81') + '</div>' +
      '<div class="w-grid"><div class="w-ctrl">' + rng('v', 'Kezdősebesség', 5, 50, 1, 20, 'm/s') + rng('a', 'Kilövési szög', 5, 85, 1, 45, '°') +
      '<button type="button" class="btn primary" id="go">🚀 Kilövés</button><div id="r"></div></div>' +
      '<div class="w-out"><svg class="w-svg" viewBox="0 0 400 220" id="s"></svg><div class="w-formula">távolság = v²·sin(2α) / g,   max. magasság = v²·sin²(α) / (2g)</div></div></div>';
    var cur;
    var read = bind(el, function (v) { cur = v; t = null; draw(); });
    onSeg(el, 'g', function (val) { g = parseFloat(val); t = null; draw(); });
    el.querySelector('#go').addEventListener('click', function () { t = 0; });
    function draw() {
      var v = cur, a = v.a * Math.PI / 180, vx = v.v * Math.cos(a), vy = v.v * Math.sin(a);
      var T = 2 * vy / g, R = vx * T, H = vy * vy / (2 * g);
      var sc = Math.min(360 / Math.max(R, 1), 180 / Math.max(H, 1));
      var d = '';
      for (var i = 0; i <= 60; i++) { var tt = T * i / 60; d += (i ? 'L' : 'M') + (20 + vx * tt * sc).toFixed(1) + ' ' + (200 - (vy * tt - g * tt * tt / 2) * sc).toFixed(1) + ' '; }
      var ball = '';
      if (t != null) { var tb = Math.min(t, T); ball = '<circle cx="' + (20 + vx * tb * sc) + '" cy="' + (200 - (vy * tb - g * tb * tb / 2) * sc) + '" r="7" fill="#e5484d"/>'; }
      el.querySelector('#s').innerHTML = '<line x1="0" y1="200" x2="400" y2="200" class="svg-line" stroke-width="2"/>' +
        '<path d="' + d + '" fill="none" stroke="#2f7bf6" stroke-width="2" stroke-dasharray="5 4"/>' +
        '<line x1="' + (20 + R / 2 * sc) + '" y1="200" x2="' + (20 + R / 2 * sc) + '" y2="' + (200 - H * sc) + '" stroke="var(--muted)" stroke-dasharray="2 3"/>' +
        '<text x="' + (24 + R / 2 * sc) + '" y="' + (196 - H * sc) + '" font-size="11" class="svg-muted">' + fmt(H, 1) + ' m</text>' +
        '<text x="' + Math.min(380, 20 + R * sc) + '" y="214" font-size="11" text-anchor="end" class="svg-muted">' + fmt(R, 1) + ' m</text>' + ball;
      el.querySelector('#r').innerHTML = res([['Távolság', fmt(R, 1) + ' m'], ['Max. magasság', fmt(H, 1) + ' m'], ['Repülési idő', fmt(T, 2) + ' s']]);
      return T;
    }
    loop(el, function (dt) {
      if (t == null) return;
      var T = draw(); t += dt;
      if (t > T + 0.5) t = null;
    });
    read();
  });

  /* ---------- 12. Atomépítő ---------- */
  var EL = [['H', 'hidrogén', 0], ['He', 'hélium', 2], ['Li', 'lítium', 4], ['Be', 'berillium', 5], ['B', 'bór', 6], ['C', 'szén', 6], ['N', 'nitrogén', 7],
    ['O', 'oxigén', 8], ['F', 'fluor', 10], ['Ne', 'neon', 10], ['Na', 'nátrium', 12], ['Mg', 'magnézium', 12], ['Al', 'alumínium', 14], ['Si', 'szilícium', 14],
    ['P', 'foszfor', 16], ['S', 'kén', 16], ['Cl', 'klór', 18], ['Ar', 'argon', 22], ['K', 'kálium', 20], ['Ca', 'kalcium', 20]];
  S.addWidget('atomepito', function (el, o) {
    var st = { p: o.p || 6, n: o.n != null ? o.n : 6, e: o.e || 6 };
    el.innerHTML = head('Építs atomot!', 'A **protonok száma** dönti el, melyik elemről van szó. A neutronok az izotópot, az elektronok a töltést változtatják.') +
      '<div class="w-grid"><div class="w-ctrl">' +
      [['p', 'Protonok (+)', '#e5484d'], ['n', 'Neutronok (0)', '#8d96a8'], ['e', 'Elektronok (−)', '#2f7bf6']].map(function (x) {
        return '<div class="counter"><span style="width:130px"><span style="color:' + x[2] + '">●</span> ' + x[1] + '</span><button type="button" data-d="-1" data-k="' + x[0] + '">−</button><b id="c' + x[0] + '"></b><button type="button" data-d="1" data-k="' + x[0] + '">+</button></div>';
      }).join('') + '<div id="r"></div><div id="m"></div></div><div class="w-out"><svg class="w-svg" viewBox="-150 -150 300 300" id="a"></svg></div></div>';
    el.querySelectorAll('.counter button').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.dataset.k, lim = { p: [1, 20], n: [0, 24], e: [0, 20] }[k];
        st[k] = Math.max(lim[0], Math.min(lim[1], st[k] + +b.dataset.d)); paint();
      });
    });
    var rot = 0;
    function paint() {
      ['p', 'n', 'e'].forEach(function (k) { el.querySelector('#c' + k).textContent = st[k]; });
      var E = EL[st.p - 1], q = st.p - st.e, A = st.p + st.n;
      var name = E[1] + (q ? (q > 0 ? ' ion (' + q + '+)' : ' ion (' + -q + '−)') : ' atom');
      el.querySelector('#r').innerHTML = res([['Elem', E[0] + ' – ' + E[1]], ['Rendszám (Z)', st.p], ['Tömegszám (A)', A], ['Töltés', q === 0 ? 'semleges' : (q > 0 ? '+' : '−') + Math.abs(q)]]);
      var stable = st.n === E[2] || (st.p === 1 && st.n <= 1) || (Math.abs(st.n - E[2]) <= 1 && st.p > 5);
      el.querySelector('#m').innerHTML = '<div class="w-msg ' + (stable ? 'ok' : 'warn') + '">' + esc(name) + ' · ' + E[0] + '-' + A + (stable ? ' – létező, stabil (vagy közel stabil) izotóp.' : ' – ez az izotóp instabil vagy nagyon ritka.') + '</div>';
    }
    loop(el, function (dt) {
      rot += dt * 25;
      var s = '', cnt = st.p + st.n, nuc = [];
      // protonok és neutronok egyenletes keverése a magban
      for (var i = 0, placed = 0; i < cnt; i++) {
        var isProton = placed < st.p && (placed + 1) / (i + 1) <= st.p / cnt + 1e-9 || cnt - i <= st.p - placed;
        if (isProton) placed++;
        nuc.push(isProton);
      }
      var R = 4 + Math.sqrt(cnt) * 4.2;
      nuc.forEach(function (isP, i) {
        var ang = i * 2.39996, rr = Math.sqrt((i + 0.5) / cnt) * R;
        s += '<circle cx="' + (rr * Math.cos(ang)).toFixed(1) + '" cy="' + (rr * Math.sin(ang)).toFixed(1) + '" r="6" fill="' + (isP ? '#e5484d' : '#8d96a8') + '" stroke="rgba(0,0,0,.25)"/>';
      });
      var shells = [2, 8, 8, 2], left = st.e, rad = [55, 85, 112, 138];
      for (var k = 0; k < 4 && (left > 0 || k === 0); k++) {
        var cnt2 = Math.min(left, shells[k]); left -= cnt2;
        s += '<circle r="' + rad[k] + '" fill="none" stroke="var(--line)" stroke-width="1.5"/>';
        for (var j = 0; j < cnt2; j++) {
          var an = (j / cnt2) * 2 * Math.PI + rot * Math.PI / 180 * (1.6 - k * 0.3);
          s += '<circle cx="' + (rad[k] * Math.cos(an)).toFixed(1) + '" cy="' + (rad[k] * Math.sin(an)).toFixed(1) + '" r="5" fill="#2f7bf6"/>';
        }
      }
      el.querySelector('#a').innerHTML = s;
    });
    paint();
  });
  /* ---------- 13. MOSFET kimeneti karakterisztika (egyetemi) ---------- */
  S.addWidget('mosfet-iv', function (el, o) {
    el.innerHTML = head(o.title || 'MOSFET kimeneti karakterisztika: I_D(U_DS)', o.help || 'Négyzetes (Shichman–Hodges) modell, n-csatornás MOSFET. Állítsd a gate-feszültséget, a drain-feszültséget és a hőmérsékletet: a piros pont a munkapont. Melegben csökken a mozgékonyság (és a küszöbfeszültség), ezért kisebb lesz a telítési áram.') +
      '<div class="w-grid"><div class="w-ctrl">' + rng('ugs', 'Gate–source feszültség (U_GS)', 0, 5, 0.1, 3, 'V') + rng('uds', 'Drain–source feszültség (U_DS)', 0, 5, 0.05, 2, 'V') +
      rng('t', 'Hőmérséklet', -40, 150, 5, 25, '°C') + '<div id="r"></div><div id="m"></div></div>' +
      '<div class="w-out"><svg class="w-svg" viewBox="0 0 360 260" id="p"></svg><div class="w-formula">lineáris: I_D = k·[(U_GS − U_T)·U_DS − U_DS²/2]·(1 + λ·U_DS)<br>telítés: I_D = (k/2)·(U_GS − U_T)²·(1 + λ·U_DS)</div></div></div>';
    var X0 = 44, Y0 = 228, W = 300, H = 210, IMAX = 40;
    function model(T) {
      var TK = T + 273.15;
      return { k: 2 * Math.pow(TK / 300, -1.5), ut: 0.7 - 0.002 * (TK - 300), lam: 0.05 };
    }
    function id(m, ugs, uds) {
      var ov = ugs - m.ut;
      if (ov <= 0) return 0;
      if (uds < ov) return m.k * (ov * uds - uds * uds / 2) * (1 + m.lam * uds);
      return m.k / 2 * ov * ov * (1 + m.lam * uds);
    }
    function sx(u) { return X0 + u / 5 * W; }
    function sy(i) { return Y0 - Math.min(i, IMAX) / IMAX * H; }
    bind(el, function (v) {
      var m = model(v.t), s = '';
      for (var g = 0; g <= 5; g++) s += '<line x1="' + sx(g) + '" y1="' + Y0 + '" x2="' + sx(g) + '" y2="' + (Y0 - H) + '" class="svg-grid"/><text x="' + sx(g) + '" y="' + (Y0 + 16) + '" text-anchor="middle" font-size="11" class="svg-muted">' + g + '</text>';
      for (var i = 0; i <= IMAX; i += 10) s += '<line x1="' + X0 + '" y1="' + sy(i) + '" x2="' + (X0 + W) + '" y2="' + sy(i) + '" class="svg-grid"/><text x="' + (X0 - 6) + '" y="' + (sy(i) + 4) + '" text-anchor="end" font-size="11" class="svg-muted">' + i + '</text>';
      s += '<text x="' + (X0 + W) + '" y="' + (Y0 + 30) + '" text-anchor="end" font-size="11" class="svg-muted">U_DS [V]</text><text x="6" y="' + (Y0 - H - 6) + '" font-size="11" class="svg-muted">I_D [mA]</text>';
      // telítési határ (U_DS = U_GS − U_T) parabolája
      var b = '';
      for (var u = 0; u <= 4.6; u += 0.1) { var ib = m.k / 2 * u * u * (1 + m.lam * u); b += (u ? 'L' : 'M') + sx(u).toFixed(1) + ' ' + sy(ib).toFixed(1); }
      s += '<path d="' + b + '" fill="none" stroke="var(--muted)" stroke-dasharray="4 4"/>';
      [1, 2, 3, 4, 5].forEach(function (g) {
        var d = '';
        for (var x = 0; x <= 5.001; x += 0.05) d += (x ? 'L' : 'M') + sx(x).toFixed(1) + ' ' + sy(id(m, g, x)).toFixed(1);
        s += '<path d="' + d + '" fill="none" stroke="#8d96a8" stroke-width="1.5"/><text x="' + (X0 + W + 3) + '" y="' + (sy(id(m, g, 5)) + 4) + '" font-size="10" class="svg-muted">' + g + 'V</text>';
      });
      var cur = '';
      for (var x2 = 0; x2 <= 5.001; x2 += 0.05) cur += (x2 ? 'L' : 'M') + sx(x2).toFixed(1) + ' ' + sy(id(m, v.ugs, x2)).toFixed(1);
      var I = id(m, v.ugs, v.uds);
      s += '<path d="' + cur + '" fill="none" stroke="#2f7bf6" stroke-width="3"/><circle cx="' + sx(v.uds) + '" cy="' + sy(I) + '" r="6" fill="#e5484d" stroke="var(--surface)" stroke-width="2"/>';
      el.querySelector('#p').innerHTML = s;
      var ov = v.ugs - m.ut, reg = ov <= 0 ? 'lezárt (cut-off)' : v.uds < ov ? 'lineáris / trióda' : 'telítéses (aktív)';
      var gm = ov <= 0 ? 0 : v.uds < ov ? m.k * v.uds : m.k * ov * (1 + m.lam * v.uds);
      el.querySelector('#r').innerHTML = res([['Munkatartomány', reg], ['Drain-áram (I_D)', fmt(I, 2) + ' mA'], ['Küszöbfeszültség (U_T)', fmt(m.ut, 3) + ' V'], ['U_DS,sat = U_GS − U_T', ov > 0 ? fmt(ov, 2) + ' V' : '–'], ['Meredekség (g_m)', fmt(gm, 2) + ' mS'], ['k (μ·C_ox·W/L)', fmt(m.k, 2) + ' mA/V²']]);
      el.querySelector('#m').innerHTML = '<div class="w-msg ' + (ov <= 0 ? 'warn' : 'ok') + '">' + (ov <= 0 ? 'U_GS < U_T: nincs inverziós csatorna, a tranzisztor zárva van (digitálisan: kikapcsolt állapot).'
        : v.uds < ov ? 'Lineáris tartomány: a csatorna végig kialakult, a tranzisztor vezérelt ellenállásként viselkedik (digitálisan: bekapcsolt kapcsoló).'
          : 'Telítés: a csatorna a drain felől elzáródott (pinch-off), az áram alig függ U_DS-től. Analóg erősítők itt dolgoznak.') + '</div>';
    });
  });

  /* ---------- 14. Processzor teljesítményfelvétele (egyetemi) ---------- */
  S.addWidget('cpu-teljesitmeny', function (el, o) {
    el.innerHTML = head(o.title || 'Mennyit fogyaszt egy processzor? P = α·C·V²·f + P_szivárgás', o.help || 'Állítsd a paramétereket, és figyeld, hogyan nő a hőtermelés. A feszültség négyzetesen számít!') +
      '<div class="w-grid"><div class="w-ctrl">' + rng('f', 'Órajel (f)', 0.5, 6, 0.1, 4, 'GHz') + rng('v', 'Tápfeszültség (V)', 0.6, 1.5, 0.01, 1.2, 'V') +
      rng('c', 'Kapcsolt kapacitás (C)', 2, 60, 1, 25, 'nF') + rng('a', 'Aktivitási tényező (α)', 0.05, 0.6, 0.01, 0.2, '') + rng('il', 'Szivárgási áram', 0, 40, 1, 10, 'A') +
      '</div><div class="w-out"><svg class="w-svg" viewBox="0 0 360 150" id="b"></svg><div id="r"></div><div id="m"></div></div></div>';
    bind(el, function (v) {
      var pd = v.a * v.c * v.v * v.v * v.f, pl = v.il * v.v, P = pd + pl, sc = 320 / Math.max(250, P);
      el.querySelector('#b').innerHTML = '<rect x="20" y="40" width="' + (pd * sc).toFixed(1) + '" height="40" fill="#f08c2e" rx="4"/><rect x="' + (20 + pd * sc).toFixed(1) + '" y="40" width="' + (pl * sc).toFixed(1) + '" height="40" fill="#7c5cd6" rx="4"/>' +
        '<line x1="' + (20 + 125 * sc) + '" y1="26" x2="' + (20 + 125 * sc) + '" y2="96" stroke="#e5484d" stroke-dasharray="4 3" stroke-width="2"/><text x="' + (16 + 125 * sc) + '" y="22" font-size="11" text-anchor="end" fill="#e5484d">asztali hűtés határa ~125 W</text>' +
        '<rect x="20" y="112" width="12" height="12" fill="#f08c2e"/><text x="38" y="122" font-size="11" class="svg-text">dinamikus (kapcsolás)</text><rect x="180" y="112" width="12" height="12" fill="#7c5cd6"/><text x="198" y="122" font-size="11" class="svg-text">statikus (szivárgás)</text>';
      el.querySelector('#r').innerHTML = res([['Dinamikus', fmt(pd, 1) + ' W'], ['Szivárgási', fmt(pl, 1) + ' W'], ['Összesen', fmt(P, 1) + ' W'], ['Áramfelvétel', fmt(P / v.v, 0) + ' A']]);
      el.querySelector('#m').innerHTML = '<div class="w-msg ' + (P > 125 ? 'bad' : P > 65 ? 'warn' : 'ok') + '">' + (P > 125 ? 'Ezt egy átlagos hűtő már nem bírja: a processzor visszaveszi az órajelet (thermal throttling).' : P > 65 ? 'Erős hűtés kell (asztali, nagy teljesítményű kategória).' : 'Laptopban vagy kis gépben is hűthető.') +
        ' Figyeld meg: a ' + fmt(P / v.v, 0) + ' A-es áramot az alaplap feszültségszabályzójának (VRM) kell előállítania!</div>';
    });
  });
  /* ---------- 15. Periódusos rendszer (1–36) ---------- */
  var PT = [[1,'H','hidrogén',1.008,1,'nf'],[2,'He','hélium',4.003,18,'ng'],[3,'Li','lítium',6.94,1,'af'],[4,'Be','berillium',9.012,2,'aff'],[5,'B','bór',10.81,13,'ff'],
    [6,'C','szén',12.011,14,'nf'],[7,'N','nitrogén',14.007,15,'nf'],[8,'O','oxigén',15.999,16,'nf'],[9,'F','fluor',18.998,17,'hal'],[10,'Ne','neon',20.18,18,'ng'],
    [11,'Na','nátrium',22.99,1,'af'],[12,'Mg','magnézium',24.305,2,'aff'],[13,'Al','alumínium',26.982,13,'fem'],[14,'Si','szilícium',28.085,14,'ff'],[15,'P','foszfor',30.974,15,'nf'],
    [16,'S','kén',32.06,16,'nf'],[17,'Cl','klór',35.45,17,'hal'],[18,'Ar','argon',39.948,18,'ng'],[19,'K','kálium',39.098,1,'af'],[20,'Ca','kalcium',40.078,2,'aff'],
    [21,'Sc','szkandium',44.956,3,'atm'],[22,'Ti','titán',47.867,4,'atm'],[23,'V','vanádium',50.942,5,'atm'],[24,'Cr','króm',51.996,6,'atm'],[25,'Mn','mangán',54.938,7,'atm'],
    [26,'Fe','vas',55.845,8,'atm'],[27,'Co','kobalt',58.933,9,'atm'],[28,'Ni','nikkel',58.693,10,'atm'],[29,'Cu','réz',63.546,11,'atm'],[30,'Zn','cink',65.38,12,'atm'],
    [31,'Ga','gallium',69.723,13,'fem'],[32,'Ge','germánium',72.63,14,'ff'],[33,'As','arzén',74.922,15,'ff'],[34,'Se','szelén',78.971,16,'nf'],[35,'Br','bróm',79.904,17,'hal'],[36,'Kr','kripton',83.798,18,'ng']];
  var PTCAT = { af: ['Alkálifém', '#f08c2e'], aff: ['Alkáliföldfém', '#d9a520'], atm: ['Átmenetifém', '#e5484d'], fem: ['Egyéb fém', '#8d96a8'], ff: ['Félfém', '#0e9aa7'], nf: ['Nemfém', '#2f9e6a'], hal: ['Halogén', '#2f7bf6'], ng: ['Nemesgáz', '#7c5cd6'] };
  function econf(z) {
    var orb = [['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2], ['3p', 6], ['4s', 2], ['3d', 10], ['4p', 6]], left = z, out = [];
    orb.forEach(function (o) { if (left > 0) { var n = Math.min(left, o[1]); out.push([o[0], n]); left -= n; } });
    if (z === 24 || z === 29) out.forEach(function (o) { if (o[0] === '4s') o[1] = 1; if (o[0] === '3d') o[1] += 1; });
    var sup = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    return out.map(function (o) { return o[0] + String(o[1]).split('').map(function (d) { return sup[+d]; }).join(''); }).join(' ');
  }
  S.addWidget('periodusos', function (el, o) {
    var sel = o.z || 6, game = null;
    var gas = { 1: 1, 2: 1, 7: 1, 8: 1, 9: 1, 10: 1, 17: 1, 18: 1, 36: 1 };
    el.innerHTML = head(o.title || 'Periódusos rendszer (az első 36 elem)', o.help || 'Kattints egy elemre a részletekért. A színek az elemcsoportokat jelölik. Próbáld ki a „Találd meg!” játékot is!') +
      '<div class="pt-wrap"><div class="pt" id="pt"></div></div><div class="chips" style="margin:8px 0">' + Object.keys(PTCAT).map(function (k) {
        return '<span class="chip" style="--tc:' + PTCAT[k][1] + '"><i class="dot"></i>' + PTCAT[k][0] + '</span>';
      }).join('') + '</div><div id="d"></div><div class="row" style="margin-top:10px"><button type="button" class="btn" id="g">🎯 Találd meg!</button><span id="gm"></span></div>';
    var box = el.querySelector('#pt');
    box.innerHTML = PT.map(function (e) {
      var per = e[0] <= 2 ? 1 : e[0] <= 10 ? 2 : e[0] <= 18 ? 3 : 4;
      return '<button type="button" data-z="' + e[0] + '" style="grid-column:' + e[4] + ';grid-row:' + per + ';--c:' + PTCAT[e[5]][1] + '"><small>' + e[0] + '</small><b>' + e[1] + '</b></button>';
    }).join('');
    function info() {
      var e = PT[sel - 1], per = sel <= 2 ? 1 : sel <= 10 ? 2 : sel <= 18 ? 3 : 4;
      var val = e[4] <= 2 ? e[4] : e[4] >= 13 ? (sel === 2 ? 2 : e[4] - 10) : null;
      box.querySelectorAll('button').forEach(function (b) { b.classList.toggle('on', +b.dataset.z === sel); });
      el.querySelector('#d').innerHTML = res([['Elem', e[1] + ' – ' + e[2]], ['Rendszám (protonok)', e[0]], ['Moláris tömeg', fmt(e[3], 3) + ' g/mol'], ['Csoport / periódus', e[4] + '. csoport, ' + per + '. periódus'],
        ['Kategória', PTCAT[e[5]][0]], ['Halmazállapot (25 °C)', sel === 35 ? 'folyékony' : gas[sel] ? 'gáz' : 'szilárd'], ['Vegyértékelektronok', val != null ? val : 'átmenetifém (d-pálya)'], ['Elektronszerkezet', econf(sel)]]);
    }
    box.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        var z = +b.dataset.z;
        if (game) {
          if (z === game.z) { game.ok++; el.querySelector('#gm').innerHTML = '<span class="w-msg ok">✔ Igen, ez a(z) ' + PT[z - 1][2] + '! (' + game.ok + ' találat)</span>'; sel = z; info(); nextGame(); }
          else el.querySelector('#gm').innerHTML = '<span class="w-msg bad">✘ Ez a(z) ' + PT[z - 1][2] + '. Keresd tovább: <b>' + PT[game.z - 1][2] + '</b></span>';
          return;
        }
        sel = z; info();
      });
    });
    function nextGame() { game.z = ri(1, 36); el.querySelector('#g').textContent = '🎯 Hol van: ' + PT[game.z - 1][2] + '?'; }
    el.querySelector('#g').addEventListener('click', function () {
      if (game) { game = null; this.textContent = '🎯 Találd meg!'; el.querySelector('#gm').innerHTML = ''; return; }
      game = { ok: 0 }; nextGame(); el.querySelector('#gm').innerHTML = '<span class="muted">Kattints a keresett elemre! (A gombra kattintva kiléphetsz.)</span>';
    });
    info();
  });
  /* ---------- 16. Párosító játék ---------- */
  S.addWidget('parositas', function (el, o) {
    var pairs = o.pairs || [], left, right, sel = null, done = 0, miss = 0;
    function start() {
      var pick = S.shuffle(pairs).slice(0, Math.min(o.count || 6, pairs.length));
      left = pick.map(function (p, i) { return { t: p[0], k: i }; });
      right = S.shuffle(pick.map(function (p, i) { return { t: p[1], k: i }; }));
      sel = null; done = 0; miss = 0; paint();
    }
    function paint() {
      el.innerHTML = head(o.title || 'Párosítsd össze!', o.help || 'Kattints egy elemre a bal oldalon, majd a hozzá tartozóra a jobb oldalon.') +
        '<div class="pair-grid"><div>' + left.map(function (x, i) { return '<button type="button" class="pair-btn' + (x.ok ? ' ok' : sel === i ? ' sel' : '') + '" data-l="' + i + '"' + (x.ok ? ' disabled' : '') + '>' + S.inline(x.t) + '</button>'; }).join('') + '</div>' +
        '<div>' + right.map(function (x, i) { return '<button type="button" class="pair-btn' + (x.ok ? ' ok' : '') + '" data-r="' + i + '"' + (x.ok ? ' disabled' : '') + '>' + S.inline(x.t) + '</button>'; }).join('') + '</div></div>' +
        '<div id="pm" style="margin-top:8px">' + (done === left.length ? '<div class="w-msg ok">Kész! ' + (miss ? miss + ' tévesztéssel.' : 'Hibátlanul! 🎉') + '</div>' : '') + '</div>' +
        '<button type="button" class="btn" id="pn" style="margin-top:8px">Új kör</button>';
      el.querySelectorAll('[data-l]').forEach(function (b) { b.addEventListener('click', function () { sel = +b.dataset.l; paint(); }); });
      el.querySelectorAll('[data-r]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (sel == null) { el.querySelector('#pm').innerHTML = '<div class="w-msg warn">Előbb a bal oldalon válassz!</div>'; return; }
          var r = right[+b.dataset.r];
          if (r.k === left[sel].k) { r.ok = left[sel].ok = true; done++; sel = null; paint(); }
          else { miss++; b.classList.add('bad'); setTimeout(function () { b.classList.remove('bad'); }, 500); }
        });
      });
      el.querySelector('#pn').addEventListener('click', start);
    }
    start();
  });
  /* ---------- 17. Zongora: hangok, skálák, akkordok, hangköz-felismerés (WebAudio, offline) ---------- */
  var NOTE_HU = ['C', 'Cisz', 'D', 'Disz', 'E', 'F', 'Fisz', 'G', 'Gisz', 'A', 'B', 'H'];
  var SOLMI = { 0: 'dó', 2: 'ré', 4: 'mi', 5: 'fá', 7: 'szó', 9: 'lá', 11: 'ti' };
  var INTERVALS = [[1, 'kis szekund'], [2, 'nagy szekund'], [3, 'kis terc'], [4, 'nagy terc'], [5, 'tiszta kvart'], [7, 'tiszta kvint'], [8, 'kis szext'], [9, 'nagy szext'], [12, 'tiszta oktáv']];
  var actx = null;
  function tone(midi, when, dur) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      var t = actx.currentTime + (when || 0), o = actx.createOscillator(), g = actx.createGain();
      o.type = 'triangle'; o.frequency.value = 440 * Math.pow(2, (midi - 69) / 12);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.3, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 0.9));
      o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + (dur || 0.9) + 0.05);
    } catch (e) { /* nincs hang */ }
  }
  S.addWidget('zongora', function (el, o) {
    var base = 60, keys = 25, hl = {};
    el.innerHTML = head(o.title || 'Zongora', o.help || 'Kattints a billentyűkre (vagy használd a gépeled A–K sorát)! Alatta skálákat, akkordokat hallgathatsz, és kipróbálhatod a hangköz-felismerő játékot.') +
      '<div class="piano" id="pn"></div><div class="row" style="margin-top:10px"><span id="pn-name" class="pn-name">–</span></div>' +
      '<div class="row" style="margin-top:8px">' + seg('sk', [['dur', 'C-dúr skála'], ['moll', 'a-moll skála'], ['penta', 'Pentaton (dó)'], ['akkord', 'C-dúr hármashangzat'], ['makkord', 'a-moll hármashangzat']], '') + '</div>' +
      '<div class="pn-game"><b>🎧 Hangköz-felismerés</b> <button type="button" class="btn sm" id="pn-play">▶ Új hangköz</button> <button type="button" class="btn sm" id="pn-again">↻ Ismét</button>' +
      '<div class="chips" id="pn-opts" style="margin-top:6px"></div><div id="pn-res"></div></div>';
    var pn = el.querySelector('#pn'), whites = [], html = '';
    for (var i = 0; i < keys; i++) { var pc = (base + i) % 12; if ([1, 3, 6, 8, 10].indexOf(pc) < 0) whites.push(base + i); }
    var w = 100 / whites.length;
    whites.forEach(function (m, k) { html += '<button type="button" class="pk white" data-m="' + m + '" style="left:' + (k * w) + '%;width:' + w + '%"><span>' + NOTE_HU[m % 12] + '</span></button>'; });
    for (i = 0; i < keys; i++) {
      var mm = base + i, p2 = mm % 12;
      if ([1, 3, 6, 8, 10].indexOf(p2) >= 0) { var left = whites.indexOf(mm - 1); html += '<button type="button" class="pk black" data-m="' + mm + '" style="left:' + ((left + 0.68) * w) + '%;width:' + (w * 0.64) + '%"></button>'; }
    }
    pn.innerHTML = html;
    function name(m) { var pc3 = m % 12; return NOTE_HU[pc3] + (Math.floor(m / 12) - 1) + (SOLMI[pc3] ? ' · ' + SOLMI[pc3] : ''); }
    function press(m, when) {
      tone(m, when);
      setTimeout(function () {
        var b = pn.querySelector('[data-m="' + m + '"]'); if (b) { b.classList.add('down'); setTimeout(function () { b.classList.remove('down'); }, 300); }
        el.querySelector('#pn-name').textContent = name(m);
      }, (when || 0) * 1000);
    }
    pn.querySelectorAll('.pk').forEach(function (b) { b.addEventListener('mousedown', function (e) { e.preventDefault(); press(+b.dataset.m); }); b.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') press(+b.dataset.m); }); });
    var KB = 'awsedftgzhujk';
    function onKey(e) {
      if (!document.body.contains(el)) { document.removeEventListener('keydown', onKey); return; }
      if (e.target.closest && e.target.closest('input, textarea')) return;
      var k = KB.indexOf(e.key.toLowerCase()); if (k >= 0 && !e.repeat) press(base + k);
    }
    document.addEventListener('keydown', onKey);
    var SEQ = { dur: [0, 2, 4, 5, 7, 9, 11, 12], moll: [9, 11, 12, 14, 16, 17, 19, 21], penta: [0, 2, 4, 7, 9, 12] };
    onSeg(el, 'sk', function (v) {
      if (SEQ[v]) SEQ[v].forEach(function (x, k) { press(base + x, k * 0.38); });
      else (v === 'akkord' ? [0, 4, 7] : [9, 12, 16]).forEach(function (x) { press(base + x, 0); });
    });
    var cur = null, ok = 0, all = 0;
    function playCur() { if (!cur) return; press(cur[0], 0); press(cur[0] + cur[1], 0.7); }
    el.querySelector('#pn-play').addEventListener('click', function () {
      var iv = INTERVALS[ri(0, INTERVALS.length - 1)];
      cur = [base + ri(0, 10), iv[0]];
      var opts = S.shuffle(INTERVALS.filter(function (x) { return x !== iv; })).slice(0, 3).concat([iv]);
      opts = S.shuffle(opts);
      el.querySelector('#pn-opts').innerHTML = opts.map(function (x) { return '<button type="button" class="chip" data-iv="' + x[0] + '">' + x[1] + '</button>'; }).join('');
      el.querySelector('#pn-res').innerHTML = '';
      el.querySelectorAll('[data-iv]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (!cur) return;
          all++; var good = +b.dataset.iv === cur[1]; if (good) ok++;
          var right = INTERVALS.filter(function (x) { return x[0] === cur[1]; })[0][1];
          el.querySelector('#pn-res').innerHTML = '<div class="w-msg ' + (good ? 'ok' : 'bad') + '">' + (good ? '✔ Helyes: ' : '✘ Ez ' ) + right + (good ? '' : ' volt') + ' (' + name(cur[0]).split(' ·')[0] + ' → ' + name(cur[0] + cur[1]).split(' ·')[0] + ', ' + cur[1] + ' félhang). Eredmény: ' + ok + ' / ' + all + '</div>';
          cur = null;
        });
      });
      playCur();
    });
    el.querySelector('#pn-again').addEventListener('click', playCur);
    (o.highlight || []).forEach(function (m) { var b = pn.querySelector('[data-m="' + m + '"]'); if (b) b.classList.add('hl'); });
  });

  /* ---------- 18. Színkeverő: additív (fény) és szubtraktív (festék) keverés ---------- */
  S.addWidget('szinkever', function (el, o) {
    var mode = o.mode || 'feny';
    el.innerHTML = head(o.title || 'Színkeverés', o.help || 'Fénynél (képernyő, színpad) a színek összeadódnak: piros + zöld + kék = fehér. Festéknél (nyomtatás) elnyelik egymás fényét: cián + bíbor + sárga ≈ fekete.') +
      '<div class="row" style="margin-bottom:10px">' + seg('md', [['feny', '💡 Fény (RGB)'], ['festek', '🎨 Festék (CMY)']], mode) + '</div>' +
      '<div class="w-grid"><div class="w-ctrl" id="sk-ctrl"></div><div class="w-out"><svg class="w-svg" viewBox="0 0 300 240" id="sk-svg"></svg><div id="sk-res"></div></div></div>';
    var read;
    function build() {
      var L = mode === 'feny' ? [['a', 'Piros (R)'], ['b', 'Zöld (G)'], ['c', 'Kék (B)']] : [['a', 'Cián (C)'], ['b', 'Bíbor (M)'], ['c', 'Sárga (Y)']];
      el.querySelector('#sk-ctrl').innerHTML = L.map(function (x) { return rng(x[0], x[1], 0, 255, 1, 255, ''); }).join('');
      read = bind(el.querySelector('#sk-ctrl'), paint);
    }
    function hex(r, g, b) { return '#' + [r, g, b].map(function (v) { return ('0' + Math.round(v).toString(16)).slice(-2); }).join('').toUpperCase(); }
    function paint(v) {
      var add = mode === 'feny', r, g, b, cols;
      if (add) { r = v.a; g = v.b; b = v.c; cols = [hex(v.a, 0, 0), hex(0, v.b, 0), hex(0, 0, v.c)]; }
      else { r = 255 - v.a; g = 255 - v.b; b = 255 - v.c; cols = [hex(255 - v.a, 255, 255), hex(255, 255 - v.b, 255), hex(255, 255, 255 - v.c)]; }
      var bg = add ? '#000' : '#fff';
      el.querySelector('#sk-svg').innerHTML = '<rect width="300" height="240" fill="' + bg + '" rx="10"/><g style="mix-blend-mode:' + (add ? 'screen' : 'multiply') + ';isolation:isolate">' +
        '<circle cx="120" cy="95" r="65" fill="' + cols[0] + '" style="mix-blend-mode:' + (add ? 'screen' : 'multiply') + '"/>' +
        '<circle cx="180" cy="95" r="65" fill="' + cols[1] + '" style="mix-blend-mode:' + (add ? 'screen' : 'multiply') + '"/>' +
        '<circle cx="150" cy="148" r="65" fill="' + cols[2] + '" style="mix-blend-mode:' + (add ? 'screen' : 'multiply') + '"/></g>';
      var comp = hex(255 - r, 255 - g, 255 - b);
      el.querySelector('#sk-res').innerHTML = '<div class="sk-swatches"><div><i style="background:' + hex(r, g, b) + '"></i><small>Keverék (középen)</small><b>' + hex(r, g, b) + '</b></div>' +
        '<div><i style="background:' + comp + '"></i><small>Kiegészítő színe</small><b>' + comp + '</b></div></div>' +
        '<div class="w-formula">RGB(' + Math.round(r) + ', ' + Math.round(g) + ', ' + Math.round(b) + ')' + (add ? '' : '  ←  CMY(' + v.a + ', ' + v.b + ', ' + v.c + ')') + '</div>';
    }
    onSeg(el, 'md', function (v) { mode = v; build(); });
    build();
  });
})();
