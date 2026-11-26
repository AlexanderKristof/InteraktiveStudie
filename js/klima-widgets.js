/* Tudásműhely – klíma-widgetek (Környezet és klíma tantárgy).
 * Leckében:  widget: { type: 'energiamix' }  ·  { type: 'labnyom' }  ·  { type: 'uveghaz-modell' }
 * Minden szám nagyságrendi, oktatási célú becslés; a kiinduló értékek a 2025-ös magyar adatokhoz közeliek
 * (MAVIR, Ember, IPCC AR5/AR6, WMO). */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc, fmt = S.fmt;
  var NS = 'http://www.w3.org/2000/svg';

  function head(t, h) { return '<div class="w-title">' + esc(t) + '</div>' + (h ? '<p class="w-help">' + S.inline(h) + '</p>' : ''); }
  function rng(k, label, min, max, step, val, unit) {
    return '<label class="kl-rng"><span class="lv"><span>' + esc(label) + '</span><b><span data-v="' + k + '">' + fmt(val) + '</span> ' + esc(unit || '') + '</b></span>' +
      '<input type="range" data-k="' + k + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></label>';
  }
  function readAll(el) {
    var v = {};
    el.querySelectorAll('input[type=range][data-k]').forEach(function (i) {
      v[i.dataset.k] = parseFloat(i.value);
      var o = el.querySelector('[data-v="' + i.dataset.k + '"]'); if (o) o.textContent = fmt(parseFloat(i.value));
    });
    el.querySelectorAll('select[data-k]').forEach(function (s) { v[s.dataset.k] = s.value; });
    el.querySelectorAll('input[type=checkbox][data-k]').forEach(function (c) { v[c.dataset.k] = c.checked; });
    return v;
  }
  function seg(name, opts, cur) {
    return '<div class="seg" data-seg="' + name + '">' + opts.map(function (o) {
      return '<button type="button" data-val="' + esc(o[0]) + '" class="' + (o[0] === cur ? 'on' : '') + '">' + esc(o[1]) + '</button>';
    }).join('') + '</div>';
  }
  function onSeg(el, name, cb) {
    var box = el.querySelector('[data-seg="' + name + '"]');
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-val]'); if (!b) return;
      box.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
      cb(b.dataset.val);
    });
  }
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
  function f1(x) { return fmt(x, 1); }
  function f0(x) { return fmt(x, 0); }

  /* =====================================================================
   * 1. Energiamix-szimulátor – Magyarország villamosenergia-rendszere
   * ===================================================================== */
  /* Óránkénti bruttó rendszerterhelés (GW), munkanap – a 2025–26-os MAVIR-csúcsokhoz (7,7–7,9 GW) igazítva. */
  var LOAD = {
    tel: [5.3, 5.0, 4.9, 4.9, 5.0, 5.4, 6.2, 6.9, 7.3, 7.4, 7.3, 7.1, 7.0, 6.9, 6.9, 7.0, 7.3, 7.6, 7.6, 7.4, 7.0, 6.6, 6.1, 5.6],
    nyar: [4.6, 4.4, 4.3, 4.3, 4.4, 4.7, 5.2, 5.7, 6.0, 6.3, 6.5, 6.7, 6.8, 6.9, 6.9, 6.9, 6.8, 6.7, 6.6, 6.5, 6.3, 6.0, 5.4, 4.9]
  };
  /* Napelemes kihasználtság óránként (a beépített kWp arányában), derült időben. */
  var SUN = {
    tel: [0, 0, 0, 0, 0, 0, 0, 0, 0.03, 0.10, 0.18, 0.24, 0.25, 0.22, 0.15, 0.06, 0, 0, 0, 0, 0, 0, 0, 0],
    nyar: [0, 0, 0, 0, 0, 0.02, 0.08, 0.18, 0.30, 0.42, 0.52, 0.58, 0.60, 0.58, 0.52, 0.42, 0.30, 0.18, 0.08, 0.02, 0, 0, 0, 0]
  };
  var DAYS = {
    tel: { load: 'tel', sun: 1, wind: 0.30, nuc: 0.95, label: 'téli munkanap, változó felhőzet, mérsékelt szél' },
    nyar: { load: 'nyar', sun: 1, wind: 0.15, nuc: 0.90, label: 'nyári, napos munkanap (a meleg Duna miatt Paks kissé visszafogva)' },
    szelcsend: { load: 'tel', sun: 0.3, wind: 0.03, nuc: 0.95, label: 'téli, ködös, szélcsendes nap („sötét szélcsend”)' }
  };
  var OTHER = 0.5; /* egyéb hazai, nem állítható: biomassza, biogáz, hulladék, a maradék szénerőmű (GW) */
  var STORE_H = 2, STORE_ETA = 0.85;
  /* forrás: [kulcs, név, szín, életciklus-kibocsátás kg CO₂e/kWh, költség Ft/kWh (nagyságrend)] */
  var SRC = [
    ['atom', 'Atom', '#8e6bd8', 0.012, 20],
    ['egyeb', 'Egyéb hazai', '#8d8d8d', 0.30, 40],
    ['viz', 'Víz', '#2f80c8', 0.024, 20],
    ['szel', 'Szél', '#3fb3c6', 0.011, 22],
    ['nap', 'Nap', '#f2b705', 0.045, 18],
    ['tar', 'Tároló (kisütés)', '#2bb673', 0, 35],
    ['gaz', 'Földgáz', '#e36d3d', 0.49, 45],
    ['imp', 'Import', '#a0785a', 0.30, 40]
  ];
  var DEF = { atom: 1.9, nap: 8, szel: 0.3, gaz: 3.5, viz: 0.06, imp: 2.5, tar: 0.3 };

  function simulate(v, dayKey) {
    var d = DAYS[dayKey], L = LOAD[d.load], sun = SUN[d.load];
    var emax = v.tar * STORE_H, soc = emax / 2, rows = [];
    for (var k = 0; k < 48; k++) {
      var h = k % 24, D = L[h];
      var r = { h: h, D: D, atom: v.atom * d.nuc, egyeb: OTHER, viz: v.viz * 0.5, szel: v.szel * d.wind, nap: v.nap * sun[h] * d.sun, tar: 0, gaz: 0, imp: 0, hiany: 0, toltes: 0, tobblet: 0 };
      var must = r.atom + r.egyeb + r.viz + r.szel + r.nap, res = D - must;
      if (res < 0) {
        var sur = -res, ch = Math.min(sur, v.tar, Math.max(0, (emax - soc) / STORE_ETA));
        soc += ch * STORE_ETA; r.toltes = ch; r.tobblet = sur - ch;
      } else {
        var dis = Math.min(res, v.tar, soc); soc -= dis; r.tar = dis; res -= dis;
        /* a gáz és az import a kapacitásuk arányában osztozik a maradékon (közelítő piaci sorrend) */
        var capT = v.gaz + v.imp;
        r.gaz = capT > 0 ? Math.min(v.gaz, res * v.gaz / capT) : 0;
        r.imp = Math.min(v.imp, res - r.gaz);
        r.gaz = Math.min(v.gaz, res - r.imp);
        res -= r.gaz + r.imp;
        r.hiany = res > 1e-9 ? res : 0;
      }
      r.soc = soc;
      /* tartalék: ami ebben az órában még bevethető lenne */
      r.margin = (must + v.gaz + v.imp + Math.min(v.tar, soc + r.tar)) / D - 1;
      if (k >= 24) rows.push(r);
    }
    return rows;
  }

  S.addWidget('energiamix', function (el) {
    var day = 'tel';
    el.classList.add('kl-w');
    el.innerHTML = head('Energiamix-szimulátor: Magyarország egy napja', 'Állítsd a **beépített teljesítményeket** (GW), és nézd meg, hogyan fedezik a fogyasztást óráról órára. A kiinduló értékek a 2025-ös magyar rendszerhez közeliek (Paks kb. 1,9 GW nettó, napelem kb. 8 GW, szél kb. 0,3 GW, bevethető gázerőmű kb. 3,5 GW, ebben a modellben kb. 2,5 GW import). Az **„egyéb hazai”** (biomassza, biogáz, hulladék, maradék szén) fixen **0,5 GW**. A tároló **2 órás** akkumulátor; a maradék igényen a gáz és az import a kapacitásuk arányában osztozik.') +
      '<div class="kl-row">' + seg('d', [['tel', '❄️ Téli nap'], ['nyar', '☀️ Nyári nap'], ['szelcsend', '🌫️ Téli szélcsend']], day) +
      ' <button type="button" class="btn sm" data-reset>Valós magyar mix</button></div>' +
      '<div class="kl-ctrls">' +
      rng('atom', '⚛️ Atom', 0, 5, 0.1, DEF.atom, 'GW') + rng('nap', '☀️ Nap', 0, 25, 0.5, DEF.nap, 'GW') +
      rng('szel', '🌬️ Szél', 0, 8, 0.1, DEF.szel, 'GW') + rng('gaz', '🔥 Földgáz', 0, 6, 0.1, DEF.gaz, 'GW') +
      rng('viz', '💧 Víz', 0, 1, 0.02, DEF.viz, 'GW') + rng('imp', '🔌 Import (határkapacitás)', 0, 6, 0.1, DEF.imp, 'GW') +
      rng('tar', '🔋 Tárolás (2 órás)', 0, 6, 0.1, DEF.tar, 'GW') + '</div>' +
      '<div class="kl-chartwrap"><svg class="w-svg kl-chart" viewBox="0 0 640 270" role="img" aria-label="Napi termelés és fogyasztás óránként"></svg></div>' +
      '<div class="kl-legend">' + SRC.map(function (s) { return '<span><i style="background:' + s[2] + '"></i>' + esc(s[1]) + '</span>'; }).join('') +
      '<span><i class="kl-hiany"></i>Hiány</span><span><i class="kl-line"></i>Fogyasztás</span></div>' +
      '<p class="kl-daynote muted" data-daynote></p>' +
      '<div data-alert></div><div data-res></div>' +
      '<p class="w-help kl-small">Kibocsátás: életciklus-értékek (IPCC; gáz kb. 490, nap kb. 45, atom kb. 12, szél kb. 11 g CO₂e/kWh), az importra feltételezett régiós átlag kb. 300 g/kWh. Költség: hozzávetőleges termelési költség Ft/kWh-ban (gáz és import kb. 40–45, nap kb. 18, a meglévő atomerőmű kb. 20, tároló +35 a kisütött kWh-ra); a valódi piaci árak óráról órára nagyon ingadoznak, a hálózat és a tartalékok költsége nincs benne.</p>';
    var svg = el.querySelector('svg');

    function draw(rows) {
      var W = 640, H = 270, x0 = 42, x1 = 630, y0 = 236, y1 = 14;
      var maxY = 0;
      rows.forEach(function (r) {
        var tot = SRC.reduce(function (a, s) { return a + r[s[0]]; }, 0) + r.hiany;
        maxY = Math.max(maxY, tot, r.D);
      });
      maxY = Math.ceil(maxY * 1.08);
      var bw = (x1 - x0) / 24;
      function Y(v) { return y0 - (v / maxY) * (y0 - y1); }
      var s = '';
      for (var g = 0; g <= maxY; g += (maxY > 14 ? 4 : 2)) {
        s += '<line x1="' + x0 + '" x2="' + x1 + '" y1="' + Y(g).toFixed(1) + '" y2="' + Y(g).toFixed(1) + '" class="kl-grid"/>' +
          '<text x="' + (x0 - 6) + '" y="' + (Y(g) + 4).toFixed(1) + '" text-anchor="end" font-size="11" class="svg-muted">' + g + '</text>';
      }
      s += '<text x="6" y="12" font-size="11" class="svg-muted">GW</text>';
      rows.forEach(function (r, i) {
        var x = x0 + i * bw, acc = 0;
        SRC.forEach(function (src) {
          var v = r[src[0]]; if (v <= 0.001) return;
          s += '<rect x="' + (x + 1).toFixed(1) + '" y="' + Y(acc + v).toFixed(1) + '" width="' + (bw - 2).toFixed(1) + '" height="' + (Y(acc) - Y(acc + v)).toFixed(1) + '" fill="' + src[2] + '"><title>' + r.h + ' óra – ' + src[1] + ': ' + f1(v) + ' GW</title></rect>';
          acc += v;
        });
        if (r.hiany > 0) s += '<rect x="' + (x + 1).toFixed(1) + '" y="' + Y(acc + r.hiany).toFixed(1) + '" width="' + (bw - 2).toFixed(1) + '" height="' + (Y(acc) - Y(acc + r.hiany)).toFixed(1) + '" class="kl-hiany-r"><title>' + r.h + ' óra – HIÁNY: ' + f1(r.hiany) + ' GW</title></rect>';
        if (i % 3 === 0) s += '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (y0 + 16) + '" text-anchor="middle" font-size="11" class="svg-muted">' + r.h + ':00</text>';
      });
      var pts = [];
      rows.forEach(function (r, i) { var x = x0 + i * bw; pts.push(x.toFixed(1) + ',' + Y(r.D).toFixed(1), (x + bw).toFixed(1) + ',' + Y(r.D).toFixed(1)); });
      s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke-width="2.5" class="kl-demand"/>';
      s += '<rect x="' + (x0 + 17 * bw).toFixed(1) + '" y="' + y1 + '" width="' + (4 * bw).toFixed(1) + '" height="' + (y0 - y1) + '" class="kl-eve"/>' +
        '<text x="' + (x0 + 19 * bw).toFixed(1) + '" y="' + (y1 + 12) + '" text-anchor="middle" font-size="11" class="svg-muted">esti csúcs</text>';
      s += '<line x1="' + x0 + '" x2="' + x1 + '" y1="' + y0 + '" y2="' + y0 + '" class="svg-line" stroke-width="1"/>';
      svg.innerHTML = s;
    }

    function update() {
      var v = readAll(el), rows = simulate(v, day);
      draw(rows);
      var E = {}, cost = 0, co2 = 0, Dsum = 0, hiany = 0, tobblet = 0, toltes = 0, minM = 9, minH = 0;
      SRC.forEach(function (s) { E[s[0]] = 0; });
      rows.forEach(function (r) {
        Dsum += r.D; hiany += r.hiany; tobblet += r.tobblet; toltes += r.toltes;
        SRC.forEach(function (s) { E[s[0]] += r[s[0]]; });
        if (r.h >= 16 && r.h <= 21 && r.margin < minM) { minM = r.margin; minH = r.h; }
      });
      /* a többletet (export / visszaszabályozás) levonjuk a napból, mert az nem itthon fogy el */
      var napUsed = Math.max(0, E.nap - tobblet);
      SRC.forEach(function (s) {
        var e = s[0] === 'nap' ? napUsed : E[s[0]];
        co2 += e * s[3]; cost += e * s[4];
      });
      var inten = co2 / Dsum * 1000; /* GWh·kg/kWh = 10⁶ kg → g/kWh = co2/Dsum·1000 */
      var share = function (k) { return Math.round((k === 'nap' ? napUsed : E[k]) / Dsum * 100); };
      var low = share('atom') + share('nap') + share('szel') + share('viz');
      el.querySelector('[data-daynote]').textContent = 'Nap típusa: ' + DAYS[day].label + '. Napi fogyasztás: ' + f0(Dsum) + ' GWh.';
      el.querySelector('[data-res]').innerHTML = '<div class="w-res">' +
        '<div><small>CO₂-intenzitás</small><b>' + f0(inten) + ' g/kWh</b></div>' +
        '<div><small>Napi kibocsátás</small><b>' + fmt(co2, 1) + ' ezer t</b></div>' +
        '<div><small>Alacsony kibocsátású arány</small><b>' + low + '%</b></div>' +
        '<div><small>Import aránya</small><b>' + share('imp') + '%</b></div>' +
        '<div><small>Gáz aránya</small><b>' + share('gaz') + '%</b></div>' +
        '<div><small>Költség (nagyságrend)</small><b>' + fmt(cost / 1000, 1) + ' Mrd Ft</b></div>' +
        '<div><small>Átlagos termelési költség</small><b>' + f0(cost / Dsum) + ' Ft/kWh</b></div>' +
        '<div><small>Déli többlet (export / leszabályozás)</small><b>' + f0(tobblet) + ' GWh</b></div>' +
        '</div>';
      var al = '';
      if (hiany > 0.01) {
        al = '<div class="note warn kl-alert-bad"><b class="t">⚠ Ellátásbiztonsági veszély!</b><p>Ezen a napon <b>' + fmt(hiany, 1) + ' GWh</b> fogyasztást nem lehet fedezni (piros sávok). A valóságban ilyenkor drága tartalékokat indítanak, vagy terhelést kell korlátozni. Növeld a szabályozható kapacitást (gáz, atom), a tárolást vagy az importot!</p></div>';
      } else if (minM < 0.1) {
        al = '<div class="note warn"><b class="t">⚠ Szűkös esti tartalék</b><p>' + minH + ' órakor a még bevethető kapacitás csak <b>' + f0(minM * 100) + '%</b>-kal haladja meg a fogyasztást. Egy erőmű kiesése vagy a szomszédos országok egyidejű csúcsa (ők is este fogyasztanak a legtöbbet) gondot okozhat. A rendszerirányítók legalább ~10–15% tartalékkal szeretnek számolni.</p></div>';
      } else {
        al = '<div class="note tip"><b class="t">✔ Az esti csúcs is fedezhető</b><p>A legszűkebb esti órában (' + minH + ':00) is kb. ' + f0(minM * 100) + '% tartalék marad.</p></div>';
      }
      if (tobblet > 5) al += '<p class="w-help">☀️ Délben <b>' + f0(tobblet) + ' GWh</b> többlet keletkezik, amit a tárolók már nem tudnak felvenni: ezt exportálni kell, vagy le kell szabályozni a napelemeket. Ilyenkor negatív is lehet az ár. Próbáld meg növelni a tárolást!</p>';
      el.querySelector('[data-alert]').innerHTML = al;
    }
    el.querySelectorAll('input').forEach(function (i) { i.addEventListener('input', update); });
    onSeg(el, 'd', function (val) { day = val; update(); });
    el.querySelector('[data-reset]').addEventListener('click', function () {
      Object.keys(DEF).forEach(function (k) { var i = el.querySelector('input[data-k="' + k + '"]'); if (i) i.value = DEF[k]; });
      update();
    });
    update();
  });

  /* =====================================================================
   * 2. Ökológiai lábnyom-kalkulátor (t CO₂e / fő / év)
   * ===================================================================== */
  var CAR = { benzin: 0.20, dizel: 0.19, hibrid: 0.13, villany: 0.05, nincs: 0 }; /* kg CO₂e/km, üzemanyag-előállítással; villany: magyar áramkeverék */
  var INSUL = { regi: 200, atlag: 130, jo: 70, passziv: 25 }; /* fűtési hőigény kWh/m²/év */
  var HEAT = { gaz: 0.22, tav: 0.20, hoszi: 0.065, fa: 0.03, villany: 0.22, olaj: 0.30 }; /* kg CO₂e / kWh hő */
  var DIET = { sokhus: 2.6, vegyes: 2.0, kevhus: 1.7, hal: 1.4, veget: 1.4, vegan: 1.05 }; /* t CO₂e/év (Scarborough és mtsai., 2014 alapján) */
  var WASTE = { keves: 0.95, kozepes: 1.0, sok: 1.12 };
  var GOODS = { keves: 0.4, atlag: 0.8, sok: 1.4 };
  var GRID = 0.22, SHARED = 0.8; /* kg/kWh; közös rész (közszolgáltatások, infrastruktúra) t/fő */
  var REF = [['Magyar átlag (területi, 2023)', 5.7], ['Világátlag (2024)', 6.5], ['1,5 °C-os pálya 2030-ra', 2.5]];

  function sel(k, label, opts, cur) {
    return '<label class="pw-f"><span>' + esc(label) + '</span><select data-k="' + k + '">' + opts.map(function (o) {
      return '<option value="' + o[0] + '"' + (o[0] === cur ? ' selected' : '') + '>' + esc(o[1]) + '</option>';
    }).join('') + '</select></label>';
  }
  function footprint(v) {
    var car = v.km * CAR[v.auto] / Math.max(1, v.utas) / 1000;
    var pub = v.tomeg * 52 * 0.05 / 1000;
    var fly = v.rovid * 0.35 + v.hosszu * 1.9;
    var heatKwh = v.m2 * INSUL[v.szig] * 1.15; /* +15% melegvíz */
    var lak = (heatKwh * HEAT[v.futes] + v.aram * GRID * (v.napelem ? 0.3 : 1)) / 1000 / Math.max(1, v.fo);
    var food = DIET[v.etrend] * WASTE[v.pazar];
    var shop = v.ruha * 0.015 + v.elektr * 0.07 + GOODS[v.egyeb];
    return [
      ['auto', '🚗 Autózás', car], ['kozl', '🚆 Tömegközlekedés', pub], ['rep', '✈️ Repülés', fly],
      ['lakas', '🏠 Lakás: fűtés és áram', lak], ['etel', '🍽️ Étkezés', food], ['vasar', '🛍️ Vásárlás', shop], ['kozos', '🏛️ Közös rész (iskola, kórház, utak…)', SHARED]
    ];
  }
  function total(parts) { return parts.reduce(function (a, p) { return a + p[2]; }, 0); }

  S.addWidget('labnyom', function (el) {
    el.classList.add('kl-w');
    el.innerHTML = head('Ökológiai lábnyom-kalkulátor', 'Becsüld meg a saját (vagy a családod egy tagjára jutó) éves szénlábnyomodat **t CO₂e/év**-ben. A számítás nagyságrendi: a cél az, hogy lásd, **mi számít a legtöbbet**. A lakás adatait az egész háztartásra add meg, a kalkulátor elosztja a lakók számával.') +
      '<div class="kl-sections">' +
      '<fieldset class="kl-fs"><legend>🚗 Közlekedés</legend>' +
      sel('auto', 'Az autó, amivel jársz', [['benzin', 'Benzines'], ['dizel', 'Dízel'], ['hibrid', 'Hibrid'], ['villany', 'Villanyautó'], ['nincs', 'Nem autózom']], 'benzin') +
      rng('km', 'Autós km/év (amennyit benne ülsz)', 0, 30000, 500, 8000, 'km') +
      rng('utas', 'Átlagosan hányan ültök benne', 1, 5, 1, 1, 'fő') +
      rng('tomeg', 'Busz, vonat, villamos', 0, 400, 10, 60, 'km/hét') +
      rng('rovid', 'Rövid repülőút oda-vissza (Európán belül)', 0, 10, 1, 1, 'db/év') +
      rng('hosszu', 'Hosszú repülőút oda-vissza (más kontinens)', 0, 5, 1, 0, 'db/év') + '</fieldset>' +
      '<fieldset class="kl-fs"><legend>🏠 Lakás</legend>' +
      sel('futes', 'Fűtés', [['gaz', 'Gázkazán'], ['tav', 'Távfűtés'], ['hoszi', 'Hőszivattyú'], ['fa', 'Fa, pellet'], ['villany', 'Villanyfűtés (közvetlen)'], ['olaj', 'Olaj, szén']], 'gaz') +
      sel('szig', 'Az épület szigetelése', [['regi', 'Régi, szigeteletlen'], ['atlag', 'Átlagos'], ['jo', 'Jól szigetelt'], ['passziv', 'Passzívház']], 'atlag') +
      rng('m2', 'Lakás alapterülete', 20, 250, 5, 80, 'm²') +
      rng('fo', 'Hányan laktok benne', 1, 8, 1, 3, 'fő') +
      rng('aram', 'Áramfogyasztás (fűtés nélkül)', 500, 8000, 100, 2500, 'kWh/év') +
      '<label class="pw-chk"><input type="checkbox" data-k="napelem"> Van napelemünk (az áram nagy részét fedezi)</label></fieldset>' +
      '<fieldset class="kl-fs"><legend>🍽️ Étkezés</legend>' +
      sel('etrend', 'Étrend', [['sokhus', 'Sok hús (naponta többször)'], ['vegyes', 'Átlagos vegyes'], ['kevhus', 'Kevés hús'], ['hal', 'Hal, de más hús nem'], ['veget', 'Vegetáriánus'], ['vegan', 'Vegán']], 'vegyes') +
      sel('pazar', 'Mennyi étel kerül a kukába?', [['keves', 'Szinte semmi'], ['kozepes', 'Néha'], ['sok', 'Sok']], 'kozepes') + '</fieldset>' +
      '<fieldset class="kl-fs"><legend>🛍️ Vásárlás</legend>' +
      rng('ruha', 'Új ruhadarab', 0, 80, 1, 20, 'db/év') +
      rng('elektr', 'Új elektronikai eszköz (telefon, laptop…)', 0, 5, 1, 1, 'db/év') +
      sel('egyeb', 'Egyéb vásárlás (bútor, játék, szolgáltatás)', [['keves', 'Kevés'], ['atlag', 'Átlagos'], ['sok', 'Sok']], 'atlag') + '</fieldset>' +
      '</div><div class="kl-out" data-out></div>' +
      '<p class="w-help kl-small">Feltételezések: benzines autó kb. 0,20 kg CO₂e/km, villanyautó magyar árammal kb. 0,05; tömegközlekedés kb. 0,05 kg/utaskm; rövid repülőút oda-vissza kb. 0,35 t, hosszú kb. 1,9 t (csak CO₂, a magaslégköri hatások ezt akár kétszeresére növelhetik); gáz kb. 0,22 kg/kWh hő, hőszivattyú SCOP 3,5 mellett kb. 0,065; áram kb. 0,22 kg/kWh; étrendek Scarborough és mtsai. (2014) alapján. A „közös rész” a közszolgáltatások és az infrastruktúra egy főre jutó becsült része.</p>';

    function render() {
      var v = readAll(el), parts = footprint(v), T = total(parts);
      var kmIn = el.querySelector('[data-k="km"]'), utIn = el.querySelector('[data-k="utas"]');
      kmIn.disabled = utIn.disabled = v.auto === 'nincs';
      var maxBar = Math.max(T, 7);
      var bars = [['Te', T, 'me']].concat(REF.map(function (r) { return [r[0], r[1], '']; })).map(function (b) {
        return '<div class="kl-bar ' + b[2] + '"><span>' + esc(b[0]) + '</span><i style="width:' + Math.min(100, b[1] / maxBar * 100).toFixed(1) + '%"></i><b>' + fmt(b[1], 1) + ' t</b></div>';
      }).join('');
      var sorted = parts.slice().sort(function (a, b) { return b[2] - a[2]; });
      var rank = '<ol class="kl-rank">' + sorted.map(function (p) {
        return '<li><span>' + esc(p[1]) + '</span><span class="kl-mini"><i style="width:' + (p[2] / Math.max(0.01, sorted[0][2]) * 100).toFixed(1) + '%"></i></span><b>' + fmt(p[2], 2) + ' t</b><small>' + Math.round(p[2] / T * 100) + '%</small></li>';
      }).join('') + '</ol>';
      /* Lehetséges lépések és megtakarításuk */
      var steps = [];
      function tryStep(label, patch) {
        var w = {}; Object.keys(v).forEach(function (k) { w[k] = v[k]; }); Object.keys(patch).forEach(function (k) { w[k] = patch[k]; });
        var d = T - total(footprint(w)); if (d > 0.02) steps.push([label, d]);
      }
      if (v.auto !== 'nincs' && v.km > 0) {
        tryStep('Fele annyi autózás (busz, vonat, bicikli helyette)', { km: v.km / 2, tomeg: v.tomeg + v.km / 2 / 52 });
        if (v.auto !== 'villany') tryStep('Villanyautóra váltás', { auto: 'villany' });
        if (v.utas < 2) tryStep('Telekocsi: ketten utaztok', { utas: 2 });
      }
      if (v.hosszu > 0) tryStep('Egy hosszú repülőúttal kevesebb', { hosszu: v.hosszu - 1 });
      if (v.rovid > 0) tryStep('Rövid repülőút helyett vonat', { rovid: v.rovid - 1, tomeg: v.tomeg + 2400 / 52 });
      if (v.futes !== 'hoszi' && v.futes !== 'fa') tryStep('Hőszivattyús fűtés', { futes: 'hoszi' });
      if (v.szig === 'regi' || v.szig === 'atlag') tryStep('Épület hőszigetelése (jól szigetelt szintre)', { szig: 'jo' });
      if (!v.napelem) tryStep('Napelem a tetőn', { napelem: true });
      var nextDiet = { sokhus: 'vegyes', vegyes: 'kevhus', kevhus: 'veget', hal: 'veget', veget: 'vegan' }[v.etrend];
      if (nextDiet) tryStep('Egy lépéssel kevesebb hús az étrendben', { etrend: nextDiet });
      if (v.pazar !== 'keves') tryStep('Kevesebb kidobott étel', { pazar: 'keves' });
      if (v.ruha > 5) tryStep('Fele annyi új ruha (második kéz, javítás)', { ruha: Math.round(v.ruha / 2) });
      if (v.elektr > 0) tryStep('Eszközeidet tovább használod (eggyel kevesebb új eszköz)', { elektr: v.elektr - 1 });
      tryStep('Fűtés 1 °C-kal alacsonyabb (kb. −6%)', { m2: v.m2 * 0.94 });
      steps.sort(function (a, b) { return b[1] - a[1]; });
      var stepHtml = steps.length ? '<ol class="kl-steps">' + steps.slice(0, 6).map(function (s) {
        return '<li><span>' + esc(s[0]) + '</span><b>−' + fmt(s[1], 2) + ' t</b></li>';
      }).join('') + '</ol>' : '<p class="muted">Már most nagyon alacsony a lábnyomod a kalkulátor szerint.</p>';
      var cmp = T <= 2.5 ? 'Ez már az 1,5 °C-os pályához illő tartományban van. 👏' : T < 5.7 ? 'Ez a magyar átlag alatt van.' : T < 8 ? 'Ez az átlag körüli érték.' : 'Ez jóval az átlag fölött van: a rangsor megmutatja, hol érdemes kezdeni.';
      el.querySelector('[data-out]').innerHTML =
        '<div class="kl-total"><small>A becsült lábnyomod</small><b>' + fmt(T, 1) + ' t CO₂e / év</b><span>' + esc(cmp) + '</span></div>' +
        '<div class="kl-bars">' + bars + '</div>' +
        '<div class="kl-two"><div><h4>📊 Mi számít nálad a legtöbbet?</h4>' + rank + '</div>' +
        '<div><h4>🎯 A leghatásosabb lépéseid</h4>' + stepHtml + '<p class="w-help kl-small">Egy hosszú repülőút vagy az autózás felezése gyakran többet ér, mint sok apró szokás együtt. A szívószál vagy a töltő kihúzása grammokban mérhető.</p></div></div>';
    }
    el.querySelectorAll('input,select').forEach(function (i) { i.addEventListener('input', render); i.addEventListener('change', render); });
    render();
  });

  /* =====================================================================
   * 3. Üvegházhatás-modell: sugárzási egyensúly CO₂-csúszkával
   * ===================================================================== */
  S.addWidget('uveghaz-modell', function (el) {
    var ecs = 3, T = 0, years = 0, target = 0, running = true;
    el.classList.add('kl-w');
    el.innerHTML = head('Üvegházhatás-modell', 'Állítsd a légkör **CO₂-tartalmát**, és figyeld, hogyan változik a sugárzási egyensúly. A sárga pontok a **napfény**, a piros pontok a felszín **hősugárzása**: minél több a CO₂, annál több hősugárzás fordul vissza a felszín felé. A hőmérséklet lassan, **évtizedek alatt** követi a változást, mert az óceánnak nagy a hőkapacitása.') +
      '<div class="w-grid"><div class="w-ctrl">' +
      rng('c', 'CO₂-koncentráció', 180, 1200, 1, 424, 'ppm') +
      '<div class="kl-presets"><button type="button" class="btn sm" data-p="185">Jégkorszak (185)</button><button type="button" class="btn sm" data-p="280">Ipar előtt (280)</button><button type="button" class="btn sm" data-p="424">2024 (424)</button><button type="button" class="btn sm" data-p="560">Duplázás (560)</button></div>' +
      '<div><small class="muted">Klímaérzékenység (CO₂-duplázásra)</small><br>' + seg('e', [['2.5', '2,5 °C'], ['3', '3 °C (legjobb becslés)'], ['4', '4 °C']], '3') + '</div>' +
      '<div class="row"><button type="button" class="btn sm" data-jump>⏩ Ugrás az egyensúlyba</button><button type="button" class="btn sm" data-pause>⏸ Szünet</button></div>' +
      '</div><div class="w-out"><svg class="w-svg kl-gh" viewBox="0 0 340 240" role="img" aria-label="A sugárzási egyensúly modellje">' +
      '<defs><linearGradient id="kl-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1a3a"/><stop offset="1" stop-color="#3a78c2"/></linearGradient></defs>' +
      '<rect x="0" y="0" width="340" height="240" fill="url(#kl-sky)"/>' +
      '<circle cx="36" cy="30" r="20" fill="#ffd54a"/><circle cx="36" cy="30" r="28" fill="#ffd54a" opacity=".25"/>' +
      '<rect data-atm x="0" y="70" width="340" height="44" fill="#c6d6ee" opacity=".2"/>' +
      '<text x="330" y="88" text-anchor="end" font-size="11" fill="#e8eefc">üvegházgázok</text><text x="330" y="102" text-anchor="end" font-size="11" fill="#e8eefc" data-atmtxt></text>' +
      '<rect x="0" y="196" width="340" height="44" fill="#4f8a3c"/><rect x="230" y="196" width="110" height="44" fill="#2c6fa8"/>' +
      '<g data-dots></g>' +
      '<rect x="296" y="124" width="14" height="66" rx="7" fill="#fff" opacity=".9"/><rect data-therm x="299" y="160" width="8" height="28" rx="4" fill="#e0412c"/><circle cx="303" cy="190" r="9" fill="#e0412c"/>' +
      '</svg>' +
      '<div data-res></div><div class="w-formula" data-f></div></div></div>' +
      '<p class="w-help kl-small">A modell csak a CO₂ hatását mutatja (ΔF = 5,35 · ln(C/280) W/m², a melegedés egyensúlyban ΔT = klímaérzékenység · ln(C/280) / ln 2). A valóságban a metán és más gázok tovább melegítenek, a szennyező részecskék (aeroszolok) pedig a melegedés egy részét elfedik; a mért, emberi eredetű melegedés 2025-ben kb. 1,37 °C volt. Az időállandó egyszerűsített: az óceán mélyebb rétegei valójában évszázadokig melegszenek.</p>';
    var dotsG = el.querySelector('[data-dots]'), atm = el.querySelector('[data-atm]'), therm = el.querySelector('[data-therm]');
    var cIn = el.querySelector('input[data-k="c"]');
    var P = [], N = 34;
    function mk(color) { var c = document.createElementNS(NS, 'circle'); c.setAttribute('r', 3); c.setAttribute('fill', color); dotsG.appendChild(c); return c; }
    for (var i = 0; i < N; i++) {
      var sun = i < 14;
      P.push({ el: mk(sun ? '#ffe680' : '#ff6b4a'), sun: sun, t: Math.random(), x: 60 + Math.random() * 220, back: false });
    }
    var C = 424, pBack = 0.5;
    function eq(c) { return ecs * Math.log(c / 280) / Math.LN2; }
    function recalc() {
      C = parseFloat(cIn.value); readAll(el);
      target = eq(C);
      pBack = Math.max(0.15, Math.min(0.85, 0.5 + 0.17 * Math.log(C / 280) / Math.LN2));
      atm.setAttribute('opacity', Math.max(0.05, Math.min(0.75, 0.22 + 0.25 * Math.log(C / 280) / Math.LN2)).toFixed(2));
      el.querySelector('[data-atmtxt]').textContent = 'CO₂: ' + Math.round(C) + ' ppm';
      years = 0;
    }
    function show() {
      var F = 5.35 * Math.log(C / 280);
      var h = Math.max(4, Math.min(60, 28 + T * 7));
      therm.setAttribute('y', (188 - h).toFixed(1)); therm.setAttribute('height', h.toFixed(1));
      el.querySelector('[data-res]').innerHTML = '<div class="w-res">' +
        '<div><small>Sugárzási kényszer</small><b>' + (F >= 0 ? '+' : '') + fmt(F, 2) + ' W/m²</b></div>' +
        '<div><small>Melegedés most</small><b>' + (T >= 0 ? '+' : '') + fmt(T, 2) + ' °C</b></div>' +
        '<div><small>Egyensúlyi melegedés</small><b>' + (target >= 0 ? '+' : '') + fmt(target, 2) + ' °C</b></div>' +
        '<div><small>Felszíni átlag kb.</small><b>' + fmt(14 + T, 1) + ' °C</b></div>' +
        '<div><small>Eltelt idő</small><b>' + f0(years) + ' év</b></div></div>';
      el.querySelector('[data-f]').textContent = 'ΔT_egyensúly = ' + fmt(ecs, 1) + ' °C · ln(' + Math.round(C) + '/280) / ln 2 = ' + fmt(target, 2) + ' °C';
    }
    cIn.addEventListener('input', function () { recalc(); show(); });
    onSeg(el, 'e', function (v) { ecs = parseFloat(v); recalc(); show(); });
    el.querySelectorAll('[data-p]').forEach(function (b) { b.addEventListener('click', function () { cIn.value = b.dataset.p; recalc(); show(); }); });
    el.querySelector('[data-jump]').addEventListener('click', function () { T = target; show(); });
    var pauseBtn = el.querySelector('[data-pause]');
    pauseBtn.addEventListener('click', function () { running = !running; pauseBtn.textContent = running ? '⏸ Szünet' : '▶ Folytatás'; });
    recalc(); T = 0.75 * target; show(); /* indulás: a mai, még nem egyensúlyi állapot közelében */
    var acc = 0;
    loop(el, function (dt) {
      if (!running) return;
      /* 1 s ≈ 10 év; e-folding idő ≈ 30 év (egyszerűsített felső óceáni réteg) */
      var dy = dt * 10; years += dy;
      T += (target - T) * (1 - Math.exp(-dy / 30));
      acc += dt; if (acc > 0.25) { acc = 0; show(); }
      P.forEach(function (p) {
        p.t += dt * (p.sun ? 0.45 : 0.4);
        if (p.t >= 1) { p.t = 0; p.x = 60 + Math.random() * 220; if (!p.sun) p.back = Math.random() < pBack; }
        var x, y;
        if (p.sun) { x = 36 + (p.x - 36) * p.t; y = 30 + (194 - 30) * p.t; }
        else if (!p.back) { x = p.x + p.t * 20; y = 194 - p.t * 200; }
        else {
          if (p.t < 0.5) { x = p.x + p.t * 20; y = 194 - p.t * 2 * (194 - 92); }
          else { x = p.x + 10 - (p.t - 0.5) * 20; y = 92 + (p.t - 0.5) * 2 * (194 - 92); }
        }
        p.el.setAttribute('cx', x.toFixed(1)); p.el.setAttribute('cy', y.toFixed(1));
        p.el.setAttribute('opacity', y < 0 ? 0 : 0.95);
      });
    });
  });
})();
