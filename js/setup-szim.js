/* Tudásműhely – 🏁 Versenyautó setup-szimulátor (oktatási, egyszerűsített modell).
 * Widget: widget: { type: 'setup-szim' }   ·   Önálló oldal: #/setup
 * Minden beállítható paraméterhez: mit javít és mit ront, ha növeled/csökkented; a modell a köridőt,
 * az egyensúlyt (alul-/túlkormányzottság), a gumihőt, a kopást, a végsebességet és a fékeket becsli.
 * A számok egy kitalált, GT-szerű versenyautóra vonatkoznak: az IRÁNYOK és arányok a valós tapasztalatot követik,
 * a pontos értékek autónként és pályánként eltérnek. */
(function () {
  'use strict';
  var S = window.STUDIE, esc = S.esc;

  /* ---------- paraméterek ---------- */
  /* [kulcs, csoport, név, egység, min, max, lépés, alap, tizedes, növelés: [előnyök], [hátrányok], csökkentés: [előnyök], [hátrányok]] */
  var P = [
    ['pF', 'gumi', 'Guminyomás elöl (melegen)', 'bar', 1.5, 2.4, 0.05, 1.90, 2,
      ['Élesebb, közvetlenebb kormányreakció', 'Kisebb gördülési ellenállás', 'Kevesebb oldalfal-deformáció: kisebb belső hőtermelés'],
      ['Kisebb felfekvési felület → kevesebb tapadás elöl (több alulkormányzottság)', 'A futófelület közepe kopik jobban', 'Rázósabb a padkákon, a gumi rosszabbul nyeli el az egyenetlenséget'],
      ['Nagyobb felfekvési felület → több tapadás (az optimumig)', 'Puhább, jobban tapad bukkanókon'],
      ['Túl alacsonyan: az oldalfal sokat hajlik → túlmelegszik, a széle kopik', 'Lomhább kormányreakció', 'Nagyobb gördülési ellenállás']],
    ['pR', 'gumi', 'Guminyomás hátul (melegen)', 'bar', 1.5, 2.4, 0.05, 1.90, 2,
      ['Stabilabb, „feszesebb” far', 'Kisebb gördülési ellenállás'],
      ['Kevesebb hátsó tapadás → több túlkormányzottság és kipörgés kigyorsításkor', 'A futófelület közepe kopik'],
      ['Több hátsó tapadás és jobb kigyorsítás (az optimumig)'],
      ['Túl alacsonyan túlmelegszik és lomha lesz a far', 'Nagyobb gördülési ellenállás']],
    ['cF', 'geo', 'Dőlésszög (camber) elöl', '°', -5, 0, 0.1, -3.0, 1,
      ['(kevésbé negatív) Jobb fékezés és egyenesfutás: nagyobb felület érintkezik egyenesben', 'Egyenletesebb kopás'],
      ['(kevésbé negatív) Kanyarban a gumi külső éle terhelődik → kevesebb oldaltapadás elöl'],
      ['(negatívabb) Kanyarban a kerék „befelé dől”, a futófelület laposabban fekszik fel → több első tapadás, kevesebb alulkormányzottság'],
      ['(negatívabb) Rosszabb fékezés egyenesben, hosszabb féktáv', 'A belső él melegszik és kopik jobban']],
    ['cR', 'geo', 'Dőlésszög (camber) hátul', '°', -4, 0, 0.1, -2.0, 1,
      ['(kevésbé negatív) Jobb kigyorsítás (tapadás egyenesben)', 'Kevesebb belső élkopás'],
      ['(kevésbé negatív) Kevesebb hátsó oldaltapadás kanyarban → több túlkormányzottság'],
      ['(negatívabb) Több hátsó oldaltapadás kanyarban → stabilabb far'],
      ['(negatívabb) Rosszabb kigyorsítás/tapadás egyenesben', 'Belső él túlmelegedése, kopása']],
    ['tF', 'geo', 'Összetartás elöl (+ = befelé, − = széttartás)', 'mm', -4, 4, 0.5, -1.0, 1,
      ['(befelé) Nyugodtabb egyenesfutás, stabilabb fékezés'],
      ['(befelé) Lustább befordulás', 'Kopás és légellenállás, ha nagy az érték'],
      ['(széttartás) Élesebb, gyorsabb befordulás a kanyarba'],
      ['(széttartás) Idegesebb egyenesben, „keresi a nyomvályút”', 'Több kopás, melegedés és gördülési ellenállás']],
    ['tR', 'geo', 'Összetartás hátul (+ = befelé)', 'mm', -2, 5, 0.5, 2.0, 1,
      ['(befelé) Stabilabb far, nyugodtabb kigyorsítás és nagy sebességű kanyar'],
      ['(befelé) Kevesebb forgás (alulkormányzottabb)', 'Kopás, melegedés, ellenállás'],
      ['(kevesebb) Mozgékonyabb far, jobban „befordul” az autó'],
      ['(kevesebb / széttartás) Instabil far, hirtelen túlkormányzottság – széttartás hátul versenyben szinte sosem jó ötlet']],
    ['cas', 'geo', 'Utánfutás (caster)', '°', 3, 10, 0.5, 7.0, 1,
      ['Kormányzáskor dinamikus dőlésszög-nyereség → több első tapadás lassú kanyarban', 'Jobb egyenesfutás, erősebb visszatérítés'],
      ['Nehezebb kormány', 'Nagyobb súlyáthelyeződés a kormányzással („weight jacking”)'],
      ['Könnyebb kormány'],
      ['Kevesebb első tapadás lassú kanyarban', 'Kevésbé stabil egyenesben']],
    ['hF', 'rug', 'Hasmagasság elöl', 'mm', 40, 100, 1, 60, 0,
      ['Kevesebb felütés, jobb padkázás', 'Kevesebb első leszorítás → hátrébb tolódik az aero egyensúly'],
      ['Magasabb súlypont', 'Kevesebb leszorítás'],
      ['Több leszorítás (talajhatás) és alacsonyabb súlypont'],
      ['Túl alacsonyan: a padló felütközik, „pattog” (porpoising), elvész a leszorítás, rossz a padkákon']],
    ['hR', 'rug', 'Hasmagasság hátul', 'mm', 45, 110, 1, 70, 0,
      ['Nagyobb „rake” (hátul magasabb) → több első leszorítás, jobb befordulás gyors kanyarban', 'A diffúzor több leszorítást adhat (egy határig)'],
      ['Gyors kanyarban nyugtalanabb far', 'Több légellenállás'],
      ['Stabilabb far gyors kanyarban'],
      ['Kevesebb első aero → alulkormányzottság gyors kanyarban', 'Felütés veszélye']],
    ['kF', 'rug', 'Rugóállandó elöl', 'N/mm', 60, 250, 5, 120, 0,
      ['Stabilabb aero „platform” (kevesebbet bólint)', 'Gyorsabb reakció'],
      ['Elöl több oldalirányú terhelésátvitel → alulkormányzottabb', 'Rosszabb bukkanókon és padkán', 'Gumi melegszik'],
      ['Több mechanikai tapadás elöl, jobban nyeli a bukkanókat'],
      ['Többet bólint fékezéskor → változik a hasmagasság és az aero egyensúly']],
    ['kR', 'rug', 'Rugóállandó hátul', 'N/mm', 60, 250, 5, 100, 0,
      ['Stabil platform, kevesebb guggolás kigyorsításkor'],
      ['Túlkormányzottabb, rosszabb tapadás kigyorsításkor és bukkanón'],
      ['Jobb tapadás kigyorsításkor (a far „leül”)'],
      ['Többet mozog a far → instabil aero']],
    ['aF', 'rug', 'Stabilizátor elöl (1 = puha, 7 = kemény)', 'fokozat', 1, 7, 1, 4, 0,
      ['Kevesebb dőlés, gyorsabb irányváltás'],
      ['Alulkormányzottabb (az eleje „tol”)', 'Rosszabb a padkákon'],
      ['Több első tapadás → kevesebb alulkormányzottság', 'Jobb padkázás'],
      ['Több karosszéria-dőlés, lomhább irányváltás']],
    ['aR', 'rug', 'Stabilizátor hátul (1 = puha, 7 = kemény)', 'fokozat', 1, 7, 1, 3, 0,
      ['Az autó jobban „befordul” (kevesebb alulkormányzottság)'],
      ['Túlkormányzottabb, ideges far, rosszabb kigyorsítás'],
      ['Stabilabb far, jobb tapadás kigyorsításkor'],
      ['Alulkormányzottabb lesz az autó']],
    ['bF', 'csill', 'Csillapítás összenyomásra (bump) elöl', 'klikk', 1, 10, 1, 5, 0,
      ['Kevesebb bólintás fékezéskor, stabilabb platform'],
      ['Rossz padkán, a kerék „elugrik” bukkanón', 'Befordulásnál alulkormányzottabb'],
      ['Jobb padkázás és bukkanón tapadás'],
      ['Többet bólint, lassabb reakció']],
    ['rF', 'csill', 'Csillapítás kiengedésre (rebound) elöl', 'klikk', 1, 10, 1, 5, 0,
      ['Lassabban emelkedik az eleje kigyorsításkor → stabil'],
      ['Túl keményen: a kerék nem követi az utat („elemelkedik”)'],
      ['Jobban követi az egyenetlenséget'],
      ['Gyorsan felemelkedik az eleje kigyorsításkor → kanyarkijáratnál alulkormányzottság']],
    ['bR', 'csill', 'Csillapítás összenyomásra (bump) hátul', 'klikk', 1, 10, 1, 5, 0,
      ['Kevesebb guggolás kigyorsításkor'],
      ['Rosszabb tapadás kigyorsításkor bukkanón, ideges far'],
      ['Jobb kigyorsítás és padkázás'],
      ['Többet guggol, mozog az aero platform']],
    ['rR', 'csill', 'Csillapítás kiengedésre (rebound) hátul', 'klikk', 1, 10, 1, 5, 0,
      ['Stabilabb far fékezéskor'],
      ['Befordulásnál túlkormányzottabb lehet'],
      ['Jobban követi az utat a hátsó kerék'],
      ['Fékezéskor gyorsan felemelkedik a far → kevesebb hátsó tapadás']],
    ['wF', 'aero', 'Első szárny szöge', '°', 0, 20, 0.5, 6, 1,
      ['Több első leszorítás → kevesebb alulkormányzottság gyors kanyarban, jobb befordulás'],
      ['Kicsit több légellenállás', 'Túl sok: a far instabillá válik nagy sebességnél'],
      ['Kevesebb légellenállás, stabilabb far'],
      ['Gyors kanyarban alulkormányzottabb']],
    ['wR', 'aero', 'Hátsó szárny szöge', '°', 0, 25, 0.5, 10, 1,
      ['Sok hátsó leszorítás: stabil far gyors kanyarban és fékezéskor, jobb kigyorsítás'],
      ['Sok légellenállás → kisebb végsebesség', 'Gyors kanyarban alulkormányzottabb'],
      ['Kisebb légellenállás → nagyobb végsebesség (gyors pályán ez számít)'],
      ['Kevesebb hátsó tapadás gyors kanyarban és fékezésnél → ideges far']],
    ['bb', 'fek', 'Fékerő-elosztás (elöl)', '%', 50, 68, 0.5, 58, 1,
      ['Stabilabb fékezés (a hátsó kerék nehezebben blokkol)'],
      ['Előbb blokkol az első kerék', 'Befordulásnál alulkormányzottabb'],
      ['Az autó fékezve jobban befordul („rotáció”)'],
      ['A hátsó kerék blokkolhat → megpördülés veszélye']],
    ['duct', 'fek', 'Fékhűtő nyílás (1 = zárt, 5 = nyitott)', 'fokozat', 1, 5, 1, 3, 0,
      ['Hűvösebb fékek: nincs fékhalványulás, kisebb kopás'],
      ['Több légellenállás', 'Túl hidegen kevésbé hatékony a fék'],
      ['Kevesebb légellenállás, gyorsabban melegszik a fék'],
      ['Túlmelegedés → fékhalványulás (fading), gyors betétkopás']],
    ['diff', 'hajt', 'Differenciálmű előfeszítés (preload)', 'Nm', 20, 150, 5, 60, 0,
      ['Jobb kigyorsítás (kevesebb belső kerék-kipörgés)', 'Stabilabb fékezés'],
      ['Kanyar közepén alulkormányzottabb, nehezebben fordul'],
      ['Könnyebben fordul az autó lassú kanyarban'],
      ['A belső kerék kipörög kigyorsításkor', 'Instabilabb fékezés']],
    ['gear', 'hajt', 'Áttétel (− rövid ... + hosszú)', 'fokozat', -3, 3, 1, 0, 0,
      ['Nagyobb végsebesség, nem ütközik a fordulatszám-határba hosszú egyenesen'],
      ['Lassabb gyorsulás a kanyarokból'],
      ['Gyorsabb gyorsulás'],
      ['Gyors pályán a fordulatszám-határba ütközik → kisebb végsebesség']],
    ['fuel', 'egyeb', 'Üzemanyag a tankban', 'kg', 5, 100, 5, 50, 0,
      ['Hosszabb stint, kevesebb kiállás'],
      ['Nehezebb autó: lassabb kör (kb. 0,03 s/kg), több gumikopás, hosszabb féktáv'],
      ['Könnyebb, gyorsabb autó (időmérőn kevés üzemanyaggal mennek)'],
      ['Hamarabb ki kell állni tankolni']]
  ];
  var GROUPS = [['gumi', '🛞 Gumik'], ['geo', '📐 Futómű-geometria'], ['rug', '🔩 Rugózás és hasmagasság'], ['csill', '🎚️ Lengéscsillapítók'], ['aero', '🪽 Aerodinamika'], ['fek', '🛑 Fékek'], ['hajt', '⚙️ Hajtás'], ['egyeb', '⛽ Egyéb']];
  var TRACKS = {
    vegyes: { name: 'Vegyes pálya (pl. Hungaroring-jellegű)', seg: { slow: 32, fast: 26, straight: 22, braking: 14, kerb: 6 }, popt: 1.90, temp: 0, grip: 1 },
    gyors: { name: 'Gyors pálya (hosszú egyenesek)', seg: { slow: 14, fast: 26, straight: 42, braking: 14, kerb: 4 }, popt: 1.90, temp: 3, grip: 1 },
    lassu: { name: 'Lassú, kanyargós pálya padkákkal', seg: { slow: 44, fast: 12, straight: 14, braking: 18, kerb: 12 }, popt: 1.90, temp: -2, grip: 1 },
    esos: { name: 'Vizes pálya (esőgumi)', seg: { slow: 34, fast: 24, straight: 20, braking: 14, kerb: 8 }, popt: 1.75, temp: -18, grip: 0.82 }
  };
  var PRESETS = {
    alap: { name: '↺ Alap setup' },
    kevesaero: { name: '🏎️ Kis leszorítás (gyors pályára)', v: { wF: 3, wR: 4, hF: 58, hR: 66, gear: 2, duct: 2 } },
    sokaero: { name: '🌀 Nagy leszorítás (kanyargós pályára)', v: { wF: 10, wR: 17, gear: -1, aF: 3, duct: 4 } },
    eso: { name: '🌧️ Esős setup', v: { pF: 1.75, pR: 1.75, cF: -2.2, cR: -1.5, kF: 95, kR: 80, aF: 2, aR: 2, hF: 70, hR: 80, wF: 10, wR: 18, diff: 90, bb: 56, duct: 2 } }
  };
  function base() { var o = {}; P.forEach(function (p) { o[p[0]] = p[7]; }); return o; }
  function def(k) { return P.filter(function (p) { return p[0] === k; })[0]; }
  function sq(x) { return x * x; }
  function fmtv(v, d) { return (Math.round(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d).replace('.', ','); }
  function sgn(v, d) { return (v > 0 ? '+' : v < 0 ? '−' : '±') + fmtv(Math.abs(v), d); }

  /* ---------- modell ---------- */
  function model(v, trk) {
    var T = TRACKS[trk], m = { warn: [] };
    var popt = T.popt;
    /* gumi tapadás és hő */
    var gpF = 1 - 0.006 * sq((v.pF - popt) / 0.1), gpR = 1 - 0.006 * sq((v.pR - popt) / 0.1);
    var gcF = 1 - 0.008 * sq((v.cF + 3.2) / 0.5), gcR = 1 - 0.008 * sq((v.cR + 2.2) / 0.5);
    if (trk === 'esos') { gcF = 1 - 0.008 * sq((v.cF + 2.2) / 0.5); gcR = 1 - 0.008 * sq((v.cR + 1.5) / 0.5); }
    var hAvg = (v.hF + v.hR) / 2, rake = v.hR - v.hF;
    var cog = 1 + 0.0015 * (65 - hAvg);
    var springAvg = (v.kF + v.kR) / 2;
    var bump = trk === 'lassu' ? 1.6 : trk === 'esos' ? 1.3 : 1;
    var mech = cog * (1 - 0.0005 * bump * Math.max(0, springAvg - 110)) * (1 - 0.004 * bump * ((v.bF - 5) + (v.bR - 5)) / 2);
    var gripF = mech * gpF * gcF * (1 + 0.004 * (v.cas - 7)) * (1 - 0.01 * (v.aF - 4));
    var gripR = mech * gpR * gcR * (1 - 0.01 * (v.aR - 3)) * (1 + 0.004 * Math.max(0, v.tR));
    /* aero */
    var bottom = 0;
    if (v.hF < 50) bottom += (50 - v.hF) * 0.012;
    if (v.hR < 56) bottom += (56 - v.hR) * 0.01;
    var plat = 1 + 0.0008 * (springAvg - 110) + 0.006 * ((v.bF + v.bR) / 2 - 5);
    var aeroTot = (1 + 0.004 * (65 - hAvg) + 0.0015 * (rake - 10)) * (1 - bottom) * Math.min(1.04, Math.max(0.9, plat));
    var aeroF = aeroTot * (1 + 0.035 * (v.wF - 6) + 0.006 * (rake - 10));
    var aeroR = aeroTot * (1 + 0.03 * (v.wR - 10) - 0.004 * (rake - 10));
    var aw = trk === 'esos' ? 0.45 : 0.6;
    /* egyensúly: + = alulkormányzott */
    var balSlow = 0.02 + 0.12 * ((v.kF / v.kR) - 1.2) + 0.03 * (v.aF - 4) - 0.03 * (v.aR - 3) + (gripR - gripF) * 1.6 +
      0.012 * (v.bF - 5) + 0.008 * (v.rF - 5) - 0.012 * (v.bR - 5) - 0.006 * (v.rR - 5) + 0.0015 * (v.diff - 60) + 0.015 * v.tR * 0.3 - 0.012 * (-v.tF) * 0.5 + 0.004 * (v.bb - 58);
    var balFast = balSlow * 0.5 + 0.02 + (aeroR - aeroF) * 0.55 - 0.004 * (rake - 10);
    if (v.tR < 0) { balSlow += 0.05 * v.tR; balFast += 0.06 * v.tR; m.warn.push('⚠️ Hátsó széttartás: az autó nagy sebességnél kiszámíthatatlanul túlkormányzott lesz.'); }
    /* gumihőmérséklet (°C, ideális kb. 85–105) */
    var tBase = 95 + T.temp;
    m.tempF = tBase - 30 * (v.pF - popt) + 5 * ((-v.cF) - 3) + 1.5 * Math.abs(v.tF) + 0.04 * (v.kF - 120) + 4 * Math.max(0, balSlow) * 10 + (v.fuel - 50) * 0.04;
    m.tempR = tBase - 30 * (v.pR - popt) + 5 * ((-v.cR) - 2) + 1.5 * Math.abs(v.tR) + 0.04 * (v.kR - 100) + 4 * Math.max(0, -balSlow) * 10 + 0.04 * (v.diff - 60) + (v.fuel - 50) * 0.04;
    function tempPen(t) { return t < 80 ? 0.0012 * sq(80 - t) : t > 108 ? 0.0010 * sq(t - 108) : 0; }
    var tpF = tempPen(m.tempF), tpR = tempPen(m.tempR);
    gripF *= 1 - Math.min(0.15, tpF * 0.6); gripR *= 1 - Math.min(0.15, tpR * 0.6);
    /* kopás (100 = alap) */
    m.wearF = 100 + 30 * Math.abs(v.pF - popt) * 3 + 6 * ((-v.cF) - 3) + 4 * Math.abs(v.tF + 1) + Math.max(0, m.tempF - 105) * 2 + (v.fuel - 50) * 0.15;
    m.wearR = 100 + 30 * Math.abs(v.pR - popt) * 3 + 6 * ((-v.cR) - 2) + 4 * Math.abs(v.tR - 2) + Math.max(0, m.tempR - 105) * 2 + 0.05 * (v.diff - 60) + (v.fuel - 50) * 0.15;
    /* légellenállás, végsebesség */
    m.drag = 1 + 0.006 * (v.wF - 6) + 0.018 * (v.wR - 10) + 0.004 * (v.duct - 3) + 0.003 * (Math.abs(v.tF) + Math.abs(v.tR) - 3) - 0.01 * ((v.pF + v.pR) / 2 - 1.9) + 0.002 * (rake - 10) + 0.002 * (hAvg - 65) * -0.3;
    var vmaxDrag = 285 / Math.cbrt(m.drag);
    var vlim = 290 + 9 * v.gear;
    m.vmax = Math.min(vmaxDrag, vlim);
    if (vmaxDrag > vlim + 1 && (trk === 'gyors')) m.warn.push('⚠️ Túl rövid áttétel: a hosszú egyenesen a fordulatszám-határba ütközöl.');
    /* fék */
    var heat = trk === 'lassu' ? 80 : trk === 'gyors' ? 60 : trk === 'esos' ? -120 : 0;
    m.brakeT = 760 + heat - 70 * (v.duct - 3) + (v.fuel - 50) * 0.8;
    var fade = m.brakeT > 900 ? (m.brakeT - 900) * 0.0012 : 0, cold = m.brakeT < 450 ? (450 - m.brakeT) * 0.0008 : 0;
    var bopt = 58 - (v.fuel - 50) * 0.02 + (trk === 'esos' ? -2 : 0);
    m.brake = (1 - 0.004 * sq(v.bb - bopt)) * (1 - fade - cold) * (1 - 0.012 * ((-v.cF) - 3) / 0.5 * 0.5) * (1 + 0.01 * (v.wR - 10) * 0.3) * (1 + 0.0008 * (v.diff - 60)) * (1 + 0.006 * v.tF * 0.5);
    if (v.bb > bopt + 4) m.warn.push('⚠️ Túl sok fékerő elöl: az első kerék blokkol, laposodik a gumi.');
    if (v.bb < bopt - 3.5) m.warn.push('⚠️ Túl sok fékerő hátul: fékezéskor megpördülhet az autó!');
    if (fade) m.warn.push('🔥 A fék túlmelegszik (' + Math.round(m.brakeT) + ' °C): fékhalványulás, gyors betétkopás – nyiss a fékhűtésen.');
    if (cold) m.warn.push('🧊 Túl hideg a fék (' + Math.round(m.brakeT) + ' °C): gyengébb lassítás – zárj a fékhűtésen.');
    /* kigyorsítás, padka */
    m.traction = gripR * (1 + 0.0012 * (v.diff - 60) - 0.000015 * sq(v.diff - 60)) * (1 - 0.01 * ((-v.cR) - 2) / 0.5 * 0.6) * (1 - 0.008 * (v.bR - 5)) * (1 + 0.01 * (aeroR - 1));
    m.kerb = 1 - 0.012 * (v.bF - 5) - 0.012 * (v.bR - 5) - 0.0015 * (springAvg - 110) - 0.01 * (v.aF + v.aR - 7) - 0.006 * Math.max(0, 60 - v.hF) + 0.004 * (v.hF - 60) - 0.003 * ((v.pF + v.pR) / 2 - 1.9) * 10;
    if (bottom > 0.02) m.warn.push('⚠️ Túl alacsony hasmagasság: a padló felütközik, pattog az autó, és elvész a leszorítás.');
    if (m.tempF > 110 || m.tempR > 110) m.warn.push('🔥 Túlmelegedett gumi (' + (m.tempF > 110 ? 'elöl' : 'hátul') + '): csökken a tapadás, nő a kopás.');
    if (m.tempF < 78 || m.tempR < 78) m.warn.push('🧊 A gumi nem éri el a működési hőablakot – kevés tapadás.');
    if (v.fuel < 10) m.warn.push('⛽ Nagyon kevés üzemanyag: időmérőre jó, versenyre nem elég.');
    /* köridő-modell */
    function balPen(b) { var d = b - 0.02; return 0.5 * sq(d) + (d < -0.04 ? 0.6 * sq(d + 0.04) : 0); }
    var gSlow = (gripF * 0.45 + gripR * 0.55) * T.grip, gFast = ((gripF + gripR) / 2 * (1 - aw) + (aeroF + aeroR) / 2 * aw) * T.grip;
    var seg = T.seg, s = {};
    s.slow = seg.slow * (1 - 0.5 * (gSlow - 1) + balPen(balSlow) - 0.15 * (m.traction - 1) - 0.004 * Math.min(0, v.gear) * 2 + 0.002 * Math.max(0, v.gear));
    s.fast = seg.fast * (1 - 0.5 * (gFast - 1) + balPen(balFast) * 1.2);
    s.straight = seg.straight * (1 + 0.33 * (m.drag - 1) + (285 - m.vmax) / 285 * 0.5 - 0.003 * Math.min(0, v.gear) * 0 + 0.004 * Math.max(0, -v.gear) * (trk === 'gyors' ? 3 : 0) - 0.02 * (m.traction - 1));
    s.braking = seg.braking * (1 - 0.4 * (m.brake - 1));
    s.kerb = seg.kerb * (1 - 0.4 * (m.kerb - 1));
    var lap = 0; Object.keys(s).forEach(function (k) { lap += s[k]; });
    lap += 0.03 * (v.fuel - 50) + Math.max(0, (m.wearF + m.wearR) / 2 - 115) * 0.004;
    m.lap = lap; m.seg = s; m.balSlow = balSlow; m.balFast = balFast; m.gripF = gripF; m.gripR = gripR; m.aeroF = aeroF; m.aeroR = aeroR;
    return m;
  }

  /* pilóta-visszajelzés és javaslatok a modell alapján */
  function feedback(m) {
    var f = [];
    if (m.balSlow > 0.1) f.push(['„Lassú kanyarban tol az eleje, nem akar befordulni.”', 'Alulkormányzottság lassú kanyarban: próbálj puhább első stabilizátort, keményebb hátsót, negatívabb első dőlésszöget vagy kisebb diff-előfeszítést.']);
    if (m.balSlow < -0.06) f.push(['„A kanyar közepén és kijáratánál kicsúszik a far.”', 'Túlkormányzottság: puhább hátsó stabilizátor/rugó, kevesebb hátsó guminyomás, több hátsó összetartás vagy nagyobb diff-előfeszítés segíthet.']);
    if (m.balFast > 0.12) f.push(['„Gyors kanyarban nagyon tol az eleje.”', 'Gyors kanyarban az aero egyensúly hátul van: több első szárny vagy nagyobb rake (hátul magasabb), esetleg kevesebb hátsó szárny.']);
    if (m.balFast < -0.06) f.push(['„Nagy sebességnél ideges, félek tőle.”', 'Gyors kanyarban kevés a hátsó leszorítás: több hátsó szárny, kisebb rake vagy kevesebb első szárny.']);
    if (m.traction < 0.96) f.push(['„Kigyorsításkor kipörög, nem tudom letenni a teljesítményt.”', 'Kevés hátsó tapadás kigyorsításkor: puhább hátsó rugó/stabilizátor, több diff-előfeszítés, kevésbé negatív hátsó dőlésszög.']);
    if (m.kerb < 0.94) f.push(['„A padkákon felugrik az autó.”', 'Túl merev vagy túl alacsony az autó: puhább csillapítás (bump), puhább stabilizátorok, kicsit nagyobb hasmagasság.']);
    if (!f.length) f.push(['„Jó egyensúlyú, kiszámítható autó.”', 'Szép munka! Most finomhangolhatsz egyszerre egy dologgal, és figyeld a köridőt.']);
    return f;
  }

  function lapStr(t) { var mm = Math.floor(t / 60), ss = t - mm * 60; return mm + ':' + (ss < 10 ? '0' : '') + ss.toFixed(3).replace('.', ','); }
  function gauge(b, label) {
    var pos = Math.max(-0.25, Math.min(0.25, b)), pct = 50 + pos / 0.25 * 50;
    var txt = b > 0.08 ? 'alulkormányzott' : b > 0.03 ? 'enyhén alulkormányzott' : b > -0.02 ? 'semleges' : b > -0.07 ? 'enyhén túlkormányzott' : 'túlkormányzott';
    return '<div class="ss-gauge"><div class="ss-gl"><span>' + label + '</span><b>' + txt + '</b></div><div class="ss-gbar"><span class="ss-gz"></span><i style="left:' + pct + '%"></i></div>' +
      '<div class="ss-gs"><small>← túlkormányzott</small><small>semleges</small><small>alulkormányzott →</small></div></div>';
  }
  function bar(label, val, unit, lo, hi, okLo, okHi, d) {
    var pct = Math.max(0, Math.min(100, (val - lo) / (hi - lo) * 100)), ok = val >= okLo && val <= okHi;
    return '<div class="ss-bar"><span>' + label + '</span><span class="ss-b"><i style="width:' + pct + '%" class="' + (ok ? 'ok' : 'bad') + '"></i></span><b>' + fmtv(val, d || 0) + ' ' + unit + '</b></div>';
  }

  /* ---------- widget ---------- */
  S.addWidget('setup-szim', function (el) {
    var v = S.store.get('setup.v', null) || base(), trk = S.store.get('setup.trk', 'vegyes'), last = null, B = base();
    Object.keys(B).forEach(function (k) { if (v[k] == null) v[k] = B[k]; });
    el.classList.add('ss-wrap');
    el.innerHTML = '<div class="w-title">🏁 Versenyautó setup-szimulátor</div>' +
      '<p class="w-help">Állítsd be az autót, és nézd meg, hogyan változik a <b>köridő</b>, az <b>egyensúly</b>, a <b>gumihő</b> és a <b>kopás</b>. Minden változtatásnál kiírjuk, mit nyertél és mit vesztettél vele. ' +
      'Profi tipp: egyszerre mindig csak <b>egy</b> dolgot változtass! <small>(Egyszerűsített oktatási modell egy kitalált GT-szerű autóra: az irányok és arányok a valóságot követik, a pontos számok autónként eltérnek.)</small></p>' +
      '<div class="ss-top"><label class="pw-f"><span>Pálya</span><select id="ss-trk">' + Object.keys(TRACKS).map(function (k) { return '<option value="' + k + '"' + (k === trk ? ' selected' : '') + '>' + esc(TRACKS[k].name) + '</option>'; }).join('') + '</select></label>' +
      '<div class="ss-presets">' + Object.keys(PRESETS).map(function (k) { return '<button type="button" class="btn sm" data-preset="' + k + '">' + esc(PRESETS[k].name) + '</button>'; }).join('') +
      '<button type="button" class="btn sm" id="ss-print">🖨 Setup-lap</button></div></div>' +
      '<div class="ss-grid"><div class="ss-params">' + GROUPS.map(function (g, gi) {
        return '<details class="ss-group"' + (gi < 2 ? ' open' : '') + '><summary>' + g[1] + '</summary>' + P.filter(function (p) { return p[1] === g[0]; }).map(function (p) {
          return '<div class="ss-p" data-k="' + p[0] + '"><div class="ss-pl"><span>' + esc(p[2]) + '</span><b data-val="' + p[0] + '"></b></div>' +
            '<div class="ss-pc"><button type="button" class="btn sm" data-dec="' + p[0] + '" aria-label="csökkentés">−</button><input type="range" min="' + p[4] + '" max="' + p[5] + '" step="' + p[6] + '" data-k="' + p[0] + '" value="' + v[p[0]] + '"><button type="button" class="btn sm" data-inc="' + p[0] + '" aria-label="növelés">+</button></div></div>';
        }).join('') + '</details>';
      }).join('') + '</div><div class="ss-out" id="ss-out"></div></div>';
    var out = el.querySelector('#ss-out'), m0 = model(B, trk);
    function set(k, val) {
      var p = def(k); val = Math.max(p[4], Math.min(p[5], Math.round(val / p[6]) * p[6]));
      val = +val.toFixed(3);
      if (val === v[k]) return;
      last = { k: k, from: v[k], to: val };
      v[k] = val; S.store.set('setup.v', v);
      paint();
    }
    function paint() {
      P.forEach(function (p) {
        var r = el.querySelector('input[data-k="' + p[0] + '"]'); if (r && +r.value !== v[p[0]]) r.value = v[p[0]];
        var b = el.querySelector('[data-val="' + p[0] + '"]'); if (b) {
          var d = v[p[0]] - p[7];
          b.innerHTML = fmtv(v[p[0]], p[8]) + ' ' + esc(p[3]) + (Math.abs(d) > 1e-9 ? ' <small class="' + (d > 0 ? 'up' : 'down') + '">(' + sgn(d, p[8]) + ')</small>' : '');
        }
      });
      m0 = model(B, trk);
      var m = model(v, trk), dl = m.lap - m0.lap;
      var best = S.store.get('setup.best.' + trk, null);
      if (best == null || m.lap < best) { best = m.lap; S.store.set('setup.best.' + trk, best); }
      var html = '<div class="ss-lap"><small>Becsült köridő</small><b>' + lapStr(m.lap) + '</b><span class="' + (dl < -0.0005 ? 'good' : dl > 0.0005 ? 'badt' : '') + '">' + (Math.abs(dl) < 0.0005 ? 'mint az alap setup' : (dl < 0 ? '−' : '+') + Math.abs(dl).toFixed(3).replace('.', ',') + ' s az alaphoz képest') + '</span>' +
        '<small class="muted">Legjobbad ezen a pályán: ' + lapStr(best) + '</small></div>';
      if (last) {
        var p = def(last.k), up = last.to > last.from, mPrev = model(Object.assign({}, v, (function () { var o = {}; o[last.k] = last.from; return o; })()), trk), dd = m.lap - mPrev.lap;
        html += '<div class="ss-change"><b>Mit változtattál:</b> ' + esc(p[2]) + ': ' + fmtv(last.from, p[8]) + ' → ' + fmtv(last.to, p[8]) + ' ' + esc(p[3]) + ' (' + sgn(last.to - last.from, p[8]) + ')' +
          '<div class="ss-pc2"><div><b class="good">✓ Előnyök</b><ul>' + (up ? p[9] : p[11]).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>' +
          '<div><b class="badt">✗ Hátrányok</b><ul>' + (up ? p[10] : p[12]).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div></div>' +
          '<p class="ss-net">Ezen a pályán összességében: <b class="' + (dd < -0.0005 ? 'good' : dd > 0.0005 ? 'badt' : '') + '">' + (Math.abs(dd) < 0.0005 ? 'gyakorlatilag nem változott a köridő' : (dd < 0 ? '−' : '+') + Math.abs(dd).toFixed(3).replace('.', ',') + ' s köridő') + '</b>' +
          deltaTxt(mPrev, m) + '</p></div>';
      } else html += '<div class="ss-change muted">Mozgass egy csúszkát (vagy nyomd a + / − gombot), és itt megjelenik, mit nyertél és mit vesztettél vele.</div>';
      html += gauge(m.balSlow, 'Lassú kanyar') + gauge(m.balFast, 'Gyors kanyar') +
        '<div class="ss-bars">' + bar('Gumihő elöl', m.tempF, '°C', 60, 130, 85, 105) + bar('Gumihő hátul', m.tempR, '°C', 60, 130, 85, 105) +
        bar('Kopás elöl', m.wearF, '%', 70, 160, 0, 115) + bar('Kopás hátul', m.wearR, '%', 70, 160, 0, 115) +
        bar('Végsebesség', m.vmax, 'km/h', 230, 330, 0, 999) + bar('Féktárcsa', m.brakeT, '°C', 300, 1100, 450, 900) +
        bar('Fékhatás', m.brake * 100, '%', 80, 110, 97, 999) + bar('Kigyorsítás', m.traction * 100, '%', 80, 110, 97, 999) + bar('Padkázás', m.kerb * 100, '%', 80, 110, 95, 999) + '</div>' +
        '<div class="ss-segs"><b>Szektoridők</b>' + [['slow', 'Lassú kanyarok'], ['fast', 'Gyors kanyarok'], ['straight', 'Egyenesek'], ['braking', 'Fékezések'], ['kerb', 'Padkák, bukkanók']].map(function (x) {
          var d = m.seg[x[0]] - m0.seg[x[0]];
          return '<div><span>' + x[1] + '</span><b>' + m.seg[x[0]].toFixed(3).replace('.', ',') + ' s</b><small class="' + (d < -0.0005 ? 'good' : d > 0.0005 ? 'badt' : 'muted') + '">' + (Math.abs(d) < 0.0005 ? '–' : (d < 0 ? '−' : '+') + Math.abs(d).toFixed(3).replace('.', ',')) + '</small></div>';
        }).join('') + '</div>' +
        (m.warn.length ? '<div class="ss-warn">' + m.warn.map(function (w) { return '<p>' + esc(w) + '</p>'; }).join('') + '</div>' : '') +
        '<div class="ss-fb"><b>🎧 A pilóta a rádióban:</b>' + feedback(m).map(function (f) { return '<p><i>' + esc(f[0]) + '</i><br><small>🔧 ' + esc(f[1]) + '</small></p>'; }).join('') + '</div>';
      out.innerHTML = html;
    }
    function deltaTxt(a, b) {
      var parts = [];
      function add(label, x, y, d, unit, inv) { var dd = y - x; if (Math.abs(dd) >= Math.pow(10, -d) / 2) parts.push(label + ' ' + sgn(dd, d) + (unit || '')); }
      add('első gumihő', a.tempF, b.tempF, 0, ' °C'); add('hátsó gumihő', a.tempR, b.tempR, 0, ' °C');
      add('végsebesség', a.vmax, b.vmax, 1, ' km/h'); add('első kopás', a.wearF, b.wearF, 0, '%'); add('hátsó kopás', a.wearR, b.wearR, 0, '%');
      var bs = b.balSlow - a.balSlow; if (Math.abs(bs) > 0.003) parts.push('lassú kanyarban ' + (bs > 0 ? 'alulkormányzottabb' : 'jobban fordul'));
      var bf = b.balFast - a.balFast; if (Math.abs(bf) > 0.003) parts.push('gyors kanyarban ' + (bf > 0 ? 'alulkormányzottabb' : 'jobban fordul'));
      return parts.length ? '<br><small>Mérhető hatás: ' + parts.join(' · ') + '</small>' : '';
    }
    el.querySelectorAll('input[type=range]').forEach(function (r) { r.addEventListener('input', function () { set(r.dataset.k, +r.value); }); });
    el.querySelectorAll('[data-inc]').forEach(function (b) { b.addEventListener('click', function () { var p = def(b.dataset.inc); set(p[0], v[p[0]] + p[6]); }); });
    el.querySelectorAll('[data-dec]').forEach(function (b) { b.addEventListener('click', function () { var p = def(b.dataset.dec); set(p[0], v[p[0]] - p[6]); }); });
    el.querySelector('#ss-trk').addEventListener('change', function (e) { trk = e.target.value; S.store.set('setup.trk', trk); last = null; paint(); });
    el.querySelectorAll('[data-preset]').forEach(function (b) {
      b.addEventListener('click', function () { var pr = PRESETS[b.dataset.preset]; v = base(); if (pr.v) Object.keys(pr.v).forEach(function (k) { v[k] = pr.v[k]; }); S.store.set('setup.v', v); last = null; paint(); });
    });
    el.querySelector('#ss-print').addEventListener('click', function () {
      var m = model(v, trk), w = window.open('', '_blank'); if (!w) return;
      w.document.write('<!doctype html><html lang="hu"><head><meta charset="utf-8"><title>Setup-lap</title><style>body{font-family:system-ui,sans-serif;max-width:760px;margin:24px auto;padding:0 16px}table{width:100%;border-collapse:collapse}td,th{border-bottom:1px solid #ccc;padding:5px;text-align:left}td:last-child{text-align:right}h1{margin:0}</style></head><body>' +
        '<h1>Setup-lap</h1><p>' + esc(TRACKS[trk].name) + ' · becsült köridő: <b>' + lapStr(m.lap) + '</b> · Tudásműhely setup-szimulátor (oktatási modell)</p>' +
        GROUPS.map(function (g) { return '<h3>' + g[1] + '</h3><table>' + P.filter(function (p) { return p[1] === g[0]; }).map(function (p) { return '<tr><td>' + esc(p[2]) + '</td><td>' + fmtv(v[p[0]], p[8]) + ' ' + esc(p[3]) + '</td></tr>'; }).join('') + '</table>'; }).join('') +
        '<h3>Megjegyzések a pilótától / mérnöktől</h3><div style="height:120px;border:1px solid #ccc"></div><p><button onclick="print()">🖨 Nyomtatás</button></p></body></html>');
      w.document.close();
    });
    paint();
  });

  /* önálló oldal */
  S.pageSetup = function (main) {
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/sport">Sport</a><span>›</span><span>Setup-szimulátor</span></nav>' +
      '<h1>🏁 Versenyautó setup-szimulátor</h1><p class="lead">Légy te a versenymérnök! Guminyomás, dőlésszög, összetartás, rugók, stabilizátorok, lengéscsillapítók, szárnyak, fékek, differenciálmű – mindent állíthatsz, és minden változtatásnál látod, mit nyersz és mit veszítesz vele.</p>' +
      '<div class="widget card" id="ss-host"></div>' +
      (S.subjects.some(function (s) { return s.id === 'motorsport'; }) ? '<p><a class="btn" href="#/tantargy/motorsport">📘 Motorsport-szerelő és versenymérnök tantárgy</a> <a class="btn" href="#/felfedezo/f1-auto">🏎️ Az F1-autó szétszedve</a></p>' : '<p><a class="btn" href="#/felfedezo/f1-auto">🏎️ Az F1-autó szétszedve</a></p>');
    S.widgets['setup-szim'](main.querySelector('#ss-host'), {});
    return true;
  };
})();
