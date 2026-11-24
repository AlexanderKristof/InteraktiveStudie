/* Tudásműhely – pénzügyi kalkulátorok: afa, berkalkulator, megtakaritas.
 * Leckében: widget: { type: 'afa' }  ·  { type: 'berkalkulator' }  ·  { type: 'megtakaritas' }
 * Az alapértelmezett kulcsok a 2026-os magyar szabályok; minden kulcs átírható, mert évente változhatnak. */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;
  function ft(n) { return isFinite(n) ? Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ft' : '–'; }
  function num(el, id) { var v = parseFloat(String(el.querySelector('#' + id).value).replace(/\s/g, '').replace(',', '.')); return isFinite(v) ? v : 0; }
  function pc(x) { return String(Math.round(x * 1000) / 10).replace('.', ','); }
  function field(id, label, val, unit, extra) {
    return '<label class="pw-f"><span>' + esc(label) + '</span><span class="pw-in"><input id="' + id + '" type="number" inputmode="decimal" value="' + val + '"' + (extra || '') + '><small>' + esc(unit || '') + '</small></span></label>';
  }
  function head(t, h) { return '<div class="w-title">' + esc(t) + '</div>' + (h ? '<p class="w-help">' + S.inline(h) + '</p>' : ''); }
  function rows(list) { return '<table class="pw-table"><tbody>' + list.map(function (r) { return '<tr' + (r[2] ? ' class="' + r[2] + '"' : '') + '><td>' + r[0] + '</td><td>' + r[1] + '</td></tr>'; }).join('') + '</tbody></table>'; }

  /* ---------- ÁFA ---------- */
  S.addWidget('afa', function (el) {
    var mode = 'netto';
    el.innerHTML = head('ÁFA-kalkulátor', 'Az árcédulán (boltban) mindig a **bruttó**, áfával együtt számolt ár szerepel. Cégek között gyakran **nettó** árban beszélnek. Kulcsok 2026-ban: **27 %** általános, **18 %** (pl. egyes alapvető élelmiszerek, szálláshely), **5 %** (pl. gyógyszerek, könyvek, egyes élelmiszerek), és vannak adómentes tételek.') +
      '<div class="seg" id="afa-mode"><button type="button" data-m="netto" class="on">Nettóból bruttó</button><button type="button" data-m="brutto">Bruttóból nettó</button></div>' +
      '<div class="pw-grid">' + field('afa-ar', 'Ár', 10000, 'Ft') +
      '<label class="pw-f"><span>ÁFA-kulcs</span><select id="afa-k"><option value="27">27 %</option><option value="18">18 %</option><option value="5">5 %</option><option value="0">0 % (mentes)</option></select></label></div>' +
      '<div id="afa-out"></div>';
    function calc() {
      var a = num(el, 'afa-ar'), k = parseFloat(el.querySelector('#afa-k').value) / 100, n, b;
      if (mode === 'netto') { n = a; b = a * (1 + k); } else { b = a; n = a / (1 + k); }
      el.querySelector('#afa-out').innerHTML = rows([['Nettó ár', ft(n)], ['ÁFA (' + Math.round(k * 100) + ' %)', ft(b - n)], ['<b>Bruttó ár</b>', '<b>' + ft(b) + '</b>', 'sum']]) +
        '<p class="w-help" style="margin-top:8px">Képlet: <code>bruttó = nettó × ' + (1 + k).toFixed(2).replace('.', ',') + '</code> · <code>nettó = bruttó ÷ ' + (1 + k).toFixed(2).replace('.', ',') + '</code>. ' +
        (k > 0 ? 'Figyeld meg: a bruttó árban lévő áfa <b>' + (k / (1 + k) * 100).toFixed(1).replace('.', ',') + ' %</b>, nem ' + Math.round(k * 100) + ' %! (Gyakori hiba a bruttóból egyszerűen ' + Math.round(k * 100) + ' %-ot levonni.)' : '') + '</p>';
    }
    el.querySelector('#afa-mode').addEventListener('click', function (e) {
      var b = e.target.closest('[data-m]'); if (!b) return; mode = b.dataset.m;
      el.querySelectorAll('#afa-mode button').forEach(function (x) { x.classList.toggle('on', x === b); }); calc();
    });
    el.querySelectorAll('input,select').forEach(function (i) { i.addEventListener('input', calc); });
    calc();
  });

  /* ---------- bruttó → nettó bér ---------- */
  S.addWidget('berkalkulator', function (el) {
    el.innerHTML = head('Bérkalkulátor: bruttóból nettó', 'A munkaszerződésben a **bruttó** bér áll; ebből vonják le a személyi jövedelemadót (**SZJA, 15 %**) és a társadalombiztosítási járulékot (**TB-járulék, 18,5 %**). A munkáltató ezen felül **szociális hozzájárulási adót** (**13 %**) fizet. A kulcsok a 2026-os szabályok szerintiek, de átírhatók; a pontos kedvezményekről mindig a NAV oldala a mérvadó.') +
      '<div class="pw-grid">' + field('b-br', 'Havi bruttó bér', 400000, 'Ft') + field('b-szja', 'SZJA', 15, '%') + field('b-tb', 'TB-járulék', 18.5, '%') + field('b-szo', 'Szocho (munkáltató)', 13, '%') + '</div>' +
      '<label class="pw-chk"><input type="checkbox" id="b-25"> 25 év alatti vagyok (SZJA-mentesség)</label>' +
      '<div id="b-cap" class="pw-grid" hidden>' + field('b-plafon', 'A mentesség havi felső határa', '', 'Ft', ' placeholder="2026: kb. 715 765 Ft – ellenőrizd a NAV-on"') + '</div>' +
      '<div class="pw-grid">' + field('b-csk', 'Családi kedvezmény (havi adóalap-csökkentés, ha jár)', 0, 'Ft') + '</div>' +
      '<div id="b-out"></div>';
    function calc() {
      var br = num(el, 'b-br'), szja = num(el, 'b-szja') / 100, tb = num(el, 'b-tb') / 100, szo = num(el, 'b-szo') / 100;
      var young = el.querySelector('#b-25').checked; el.querySelector('#b-cap').hidden = !young;
      var cap = num(el, 'b-plafon'), csk = num(el, 'b-csk');
      var adoalap = young ? (cap > 0 ? Math.max(0, br - cap) : 0) : br;
      var szjaFt = Math.max(0, (adoalap - csk) * szja);
      var csRest = Math.max(0, csk - adoalap); /* a fel nem használt kedvezmény a járulékból is érvényesíthető (családi járulékkedvezmény) */
      var tbFt = Math.max(0, br * tb - csRest * szja);
      var net = br - szjaFt - tbFt, cost = br * (1 + szo);
      el.querySelector('#b-out').innerHTML = rows([
        ['Bruttó bér', ft(br)],
        ['− SZJA (' + pc(szja) + ' %' + (young ? ', 25 év alatti mentességgel' : '') + ')', ft(szjaFt)],
        ['− TB-járulék (' + pc(tb) + ' %)', ft(tbFt)],
        ['<b>Nettó (kézhez kapott) bér</b>', '<b>' + ft(net) + '</b>', 'sum'],
        ['A munkáltató teljes költsége (bruttó + ' + pc(szo) + ' % szocho)', ft(cost), 'muted']
      ]) + '<div class="pw-bar"><i style="width:' + (cost ? net / cost * 100 : 0) + '%;background:#22c55e" title="nettó"></i><i style="width:' + (cost ? (szjaFt + tbFt) / cost * 100 : 0) + '%;background:#f59e0b" title="levonások"></i><i style="width:' + (cost ? (cost - br) / cost * 100 : 0) + '%;background:#94a3b8" title="szocho"></i></div>' +
        '<p class="w-help">🟩 neked marad · 🟧 tőled levont adó és járulék · ⬜ a munkáltató által fizetett adó. A munkáltató összköltségének kb. <b>' + (cost ? Math.round(net / cost * 100) : 0) + ' %</b>-a jut el hozzád. ' +
        (young ? 'A 25 év alattiak mentessége egy havi felső határig jár (az előző év júliusi átlagkeresetéhez kötve): e fölött a résznek már van SZJA-ja. A TB-járulékot ők is fizetik.' : '') + '</p>';
    }
    el.querySelectorAll('input').forEach(function (i) { i.addEventListener('input', calc); i.addEventListener('change', calc); });
    calc();
  });

  /* ---------- megtakarítás: kamatos kamat + infláció ---------- */
  S.addWidget('megtakaritas', function (el) {
    el.innerHTML = head('Megtakarítás-tervező', 'Mennyi lesz a havonta félretett pénzed, ha kamatozik? Az **infláció** közben csökkenti a pénz vásárlóerejét, ezért a „mai pénzben” mért értéket is kiszámoljuk. (Egyszerűsített modell: havi befizetés, éves kamat havi tőkésítéssel, adó és díjak nélkül.)') +
      '<div class="pw-grid">' + field('m-kezd', 'Kezdő összeg', 0, 'Ft') + field('m-havi', 'Havi befizetés', 10000, 'Ft') + field('m-ev', 'Időtartam', 10, 'év') +
      field('m-kamat', 'Éves hozam (kamat)', 6, '%') + field('m-inf', 'Éves infláció', 4, '%') + '</div><div id="m-out"></div><svg class="w-svg pw-chart" id="m-svg" viewBox="0 0 400 160"></svg>';
    function calc() {
      var p = num(el, 'm-kezd'), m = num(el, 'm-havi'), y = Math.min(60, Math.max(0, Math.round(num(el, 'm-ev')))), r = num(el, 'm-kamat') / 100 / 12, inf = num(el, 'm-inf') / 100;
      var bal = p, paid = p, pts = [[0, p, p]];
      for (var i = 1; i <= y * 12; i++) { bal = bal * (1 + r) + m; paid += m; if (i % 12 === 0) pts.push([i / 12, bal, paid]); }
      var real = bal / Math.pow(1 + inf, y);
      el.querySelector('#m-out').innerHTML = rows([['Befizetett összeg', ft(paid)], ['Kamat / hozam', ft(bal - paid)], ['<b>Egyenleg ' + y + ' év múlva</b>', '<b>' + ft(bal) + '</b>', 'sum'],
        ['Ugyanez mai pénzben (inflációval)', ft(real), 'muted']]) +
        '<p class="w-help">' + (real < paid ? '⚠️ Ha a hozam nem éri el az inflációt, a megtakarítás vásárlóereje <b>csökken</b> – ezért nem elég a „párnacihában” tartani.' : 'A kamatos kamat az idő múlásával egyre gyorsabban dolgozik: a görbe nem egyenes, hanem felfelé hajlik.') + '</p>';
      var max = Math.max.apply(null, pts.map(function (q) { return q[1]; })) || 1, W = 400, H = 150;
      function line(idx, color) { return '<polyline fill="none" stroke="' + color + '" stroke-width="2.5" points="' + pts.map(function (q) { return (y ? q[0] / y * (W - 10) + 5 : 5) + ',' + (H - q[idx] / max * (H - 10)); }).join(' ') + '"/>'; }
      el.querySelector('#m-svg').innerHTML = '<line x1="5" y1="' + H + '" x2="' + (W - 5) + '" y2="' + H + '" stroke="var(--line)"/>' + line(2, '#94a3b8') + line(1, '#22c55e') +
        '<text x="8" y="14" font-size="11" class="svg-text">— egyenleg (zöld) · befizetés (szürke)</text>';
    }
    el.querySelectorAll('input').forEach(function (i) { i.addEventListener('input', calc); });
    calc();
  });
})();
