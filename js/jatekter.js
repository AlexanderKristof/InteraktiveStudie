/* Tudásműhely – 🎱 Fizikai játéktér: saját 2D merevtest-fizikamotorral (külső könyvtár nélkül).
 * Oldalak:  #/jatekter  (áttekintő)   ·   #/jatekter/<mod>
 *   homokozo · hajitas · utkozes · hid · inga · leszallas
 * Motor: STUDIE.jatekter.Motor  (node-ból is tesztelhető: tools/jatekter-teszt.js)
 *   - testek: kör és (forgó) téglalap; tömeg, tehetetlenségi nyomaték, restitúció, súrlódás, légellenállás
 *   - ütközés: kör–kör, kör–téglalap, téglalap–téglalap (SAT + élvágás, legfeljebb 2 érintkezési pont)
 *   - kényszerek: rúd (merev távolság), kötél (csak húzásra), csukló (rögzített pont), rugó (Hooke + csillapítás)
 *   - megoldó: impulzus-alapú, iteratív „szekvenciális impulzusok” (projektált Gauss–Seidel),
 *     melegindítás (warm start), Baumgarte-féle helyzetkorrekció; fix időlépés, félig implicit (szimplektikus) Euler.
 * Tárolás: 'jatekter' → { hajitas: { <szint>: csillag }, hid: { <szint>: { cs, ar } }, leszallas: { <szint>: csillag } } */
(function () {
  'use strict';
  var S = window.STUDIE;

  /* =====================================================================
   *  1. FIZIKAMOTOR
   * ===================================================================== */
  var Motor = (function () {
    var uid = 1;
    function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

    /* ---------- test ---------- */
    function Body(o) {
      o = o || {};
      this.id = uid++;
      this.shape = o.shape === 'box' ? 'box' : 'circle';
      this.r = o.r || 0.5;
      this.hw = (o.w || 1) / 2; this.hh = (o.h || 1) / 2;
      this.x = o.x || 0; this.y = o.y || 0; this.a = o.a || 0;
      this.vx = o.vx || 0; this.vy = o.vy || 0; this.av = o.av || 0;
      this.fx = 0; this.fy = 0; this.tq = 0; this.bvx = 0; this.bvy = 0; this.bav = 0;
      this.e = o.e == null ? 0.2 : o.e;
      this.mu = o.mu == null ? 0.5 : o.mu;
      this.drag = o.drag || 0;          /* négyzetes közegellenállás: F = −k·|v|·v */
      this.group = o.group || 0;        /* azonos (nem 0) csoport tagjai nem ütköznek egymással */
      this.nc = !!o.nc;                 /* semmivel sem ütközik (pl. hídcsomópont) */
      this.sensor = !!o.sensor;         /* érzékelő: jelez, de nem lök */
      this.wheel = !!o.wheel;           /* ütközik az útpálya-rudakkal */
      this.noGrav = !!o.noGrav;
      this.color = o.color || null; this.tag = o.tag || null;
      this.c = Math.cos(this.a); this.s = Math.sin(this.a);
      this.V = [0, 0, 0, 0, 0, 0, 0, 0]; this.N = [0, 0, 0, 0, 0, 0, 0, 0];
      var m = o.static ? 0 : (o.m != null ? o.m : (o.density || 1) * this.area());
      this.setMass(m, !!o.noRot);
    }
    Body.prototype.area = function () { return this.shape === 'circle' ? Math.PI * this.r * this.r : 4 * this.hw * this.hh; };
    Body.prototype.setMass = function (m, noRot) {
      this.m = m > 0 && isFinite(m) ? m : 0;
      if (!this.m) { this.invM = 0; this.I = 0; this.invI = 0; return; }
      this.invM = 1 / this.m;
      this.I = this.shape === 'circle' ? 0.5 * this.m * this.r * this.r : this.m * (4 * this.hw * this.hw + 4 * this.hh * this.hh) / 12;
      this.invI = noRot ? 0 : 1 / this.I;
    };
    Body.prototype.isStatic = function () { return this.invM === 0; };
    Body.prototype.toWorld = function (lx, ly) { var c = Math.cos(this.a), s = Math.sin(this.a); return [this.x + c * lx - s * ly, this.y + s * lx + c * ly]; };
    Body.prototype.toLocal = function (px, py) { var c = Math.cos(this.a), s = Math.sin(this.a), dx = px - this.x, dy = py - this.y; return [c * dx + s * dy, -s * dx + c * dy]; };
    Body.prototype.contains = function (px, py, pad) {
      pad = pad || 0;
      if (this.shape === 'circle') { var dx = px - this.x, dy = py - this.y; return dx * dx + dy * dy <= (this.r + pad) * (this.r + pad); }
      var l = this.toLocal(px, py); return Math.abs(l[0]) <= this.hw + pad && Math.abs(l[1]) <= this.hh + pad;
    };
    Body.prototype.update = function () {
      this.c = Math.cos(this.a); this.s = Math.sin(this.a);
      if (this.shape === 'circle') { this.x0 = this.x - this.r; this.x1 = this.x + this.r; this.y0 = this.y - this.r; this.y1 = this.y + this.r; return; }
      var c = this.c, s = this.s, hw = this.hw, hh = this.hh, V = this.V, N = this.N;
      var L = [-hw, -hh, hw, -hh, hw, hh, -hw, hh], LN = [0, -1, 1, 0, 0, 1, -1, 0];
      for (var i = 0; i < 4; i++) {
        V[2 * i] = this.x + c * L[2 * i] - s * L[2 * i + 1]; V[2 * i + 1] = this.y + s * L[2 * i] + c * L[2 * i + 1];
        N[2 * i] = c * LN[2 * i] - s * LN[2 * i + 1]; N[2 * i + 1] = s * LN[2 * i] + c * LN[2 * i + 1];
      }
      var ex = Math.abs(c) * hw + Math.abs(s) * hh, ey = Math.abs(s) * hw + Math.abs(c) * hh;
      this.x0 = this.x - ex; this.x1 = this.x + ex; this.y0 = this.y - ey; this.y1 = this.y + ey;
    };
    function applyImp(b, px, py, rx, ry) {
      b.vx += px * b.invM; b.vy += py * b.invM; b.av += b.invI * (rx * py - ry * px);
    }

    /* ---------- ütközésvizsgálat (keskeny fázis) ----------
     * Mindegyik { nx, ny, pts:[{x,y,pen,key}] }-et ad vissza, a normális A-ból B felé mutat. */
    function circleCircle(A, B) {
      var dx = B.x - A.x, dy = B.y - A.y, d2 = dx * dx + dy * dy, R = A.r + B.r;
      if (d2 > R * R) return null;
      var d = Math.sqrt(d2), nx = 0, ny = 1;
      if (d > 1e-9) { nx = dx / d; ny = dy / d; }
      var pen = R - d;
      return { nx: nx, ny: ny, pts: [{ x: A.x + nx * (A.r - pen / 2), y: A.y + ny * (A.r - pen / 2), pen: pen, key: 0 }] };
    }
    /* A kör, B téglalap */
    function circleBox(A, B) {
      var c = B.c, s = B.s, dx = A.x - B.x, dy = A.y - B.y;
      var lx = c * dx + s * dy, ly = -s * dx + c * dy;
      var qx = clamp(lx, -B.hw, B.hw), qy = clamp(ly, -B.hh, B.hh), nlx, nly, pen;
      if (qx === lx && qy === ly) {
        var ox = B.hw - Math.abs(lx), oy = B.hh - Math.abs(ly);
        if (ox < oy) { nlx = lx < 0 ? -1 : 1; nly = 0; qx = nlx * B.hw; pen = A.r + ox; }
        else { nlx = 0; nly = ly < 0 ? -1 : 1; qy = nly * B.hh; pen = A.r + oy; }
      } else {
        var ex = lx - qx, ey = ly - qy, d2 = ex * ex + ey * ey;
        if (d2 > A.r * A.r) return null;
        var d = Math.sqrt(d2); nlx = ex / d; nly = ey / d; pen = A.r - d;
      }
      /* doboz → kör normális világkoordinátában; nekünk kör → doboz kell */
      var wnx = c * nlx - s * nly, wny = s * nlx + c * nly;
      return { nx: -wnx, ny: -wny, pts: [{ x: B.x + c * qx - s * qy, y: B.y + s * qx + c * qy, pen: pen, key: 0 }] };
    }
    function maxSep(P, Q) {
      var best = -Infinity, bi = 0;
      for (var i = 0; i < 4; i++) {
        var nx = P.N[2 * i], ny = P.N[2 * i + 1], vx = P.V[2 * i], vy = P.V[2 * i + 1], mn = Infinity;
        for (var j = 0; j < 4; j++) { var d = nx * (Q.V[2 * j] - vx) + ny * (Q.V[2 * j + 1] - vy); if (d < mn) mn = d; }
        if (mn > best) { best = mn; bi = i; }
      }
      return [best, bi];
    }
    function clip(p, nx, ny, off) {
      /* megtartja a szakasz azon részét, ahol n·x − off ≤ 0 */
      var d1 = nx * p[0] + ny * p[1] - off, d2 = nx * p[2] + ny * p[3] - off, out = [];
      if (d1 <= 0) out.push(p[0], p[1], p[4]);
      if (d2 <= 0) out.push(p[2], p[3], p[5]);
      if (d1 * d2 < 0) {
        var t = d1 / (d1 - d2);
        out.push(p[0] + t * (p[2] - p[0]), p[1] + t * (p[3] - p[1]), d1 > 0 ? p[4] + 2 : p[5] + 2);
      }
      if (out.length < 6) return null;
      return [out[0], out[1], out[3], out[4], out[2], out[5]];
    }
    function boxBox(A, B) {
      var sa = maxSep(A, B); if (sa[0] > 0) return null;
      var sb = maxSep(B, A); if (sb[0] > 0) return null;
      var R, I, flip, i;
      if (sb[0] > 0.98 * sa[0] + 0.001) { R = B; I = A; flip = 1; i = sb[1]; } else { R = A; I = B; flip = 0; i = sa[1]; }
      var nx = R.N[2 * i], ny = R.N[2 * i + 1], i2 = (i + 1) % 4;
      var v1x = R.V[2 * i], v1y = R.V[2 * i + 1], v2x = R.V[2 * i2], v2y = R.V[2 * i2 + 1];
      var j = 0, mn = Infinity;
      for (var k = 0; k < 4; k++) { var d = I.N[2 * k] * nx + I.N[2 * k + 1] * ny; if (d < mn) { mn = d; j = k; } }
      var j2 = (j + 1) % 4;
      var seg = [I.V[2 * j], I.V[2 * j + 1], I.V[2 * j2], I.V[2 * j2 + 1], 0, 1];
      var tx = v2x - v1x, ty = v2y - v1y, tl = Math.sqrt(tx * tx + ty * ty); tx /= tl; ty /= tl;
      seg = clip(seg, -tx, -ty, -(tx * v1x + ty * v1y)); if (!seg) return null;
      seg = clip(seg, tx, ty, tx * v2x + ty * v2y); if (!seg) return null;
      var front = nx * v1x + ny * v1y, pts = [];
      for (var q = 0; q < 2; q++) {
        var px = seg[2 * q], py = seg[2 * q + 1], sep = nx * px + ny * py - front;
        if (sep <= 0.02) pts.push({ x: px - nx * sep / 2, y: py - ny * sep / 2, pen: -sep, key: flip * 256 + i * 64 + j * 16 + seg[4 + q] });
      }
      if (!pts.length) return null;
      return flip ? { nx: -nx, ny: -ny, pts: pts } : { nx: nx, ny: ny, pts: pts };
    }
    function collidePair(A, B) {
      if (A.shape === 'circle') return B.shape === 'circle' ? circleCircle(A, B) : circleBox(A, B);
      return B.shape === 'box' ? boxBox(A, B) : null; /* doboz–kör: a hívó cseréli a sorrendet */
    }

    /* ---------- kényszerek ---------- */
    /* Távolságkényszer: rúd (merev) vagy kötél (csak húzásra). maxF: szakítószilárdság [N]. */
    function DistJ(A, B, o) {
      o = o || {};
      this.id = uid++; this.A = A; this.B = B;
      this.la = o.la || [0, 0]; this.lb = o.lb || [0, 0];
      var pa = A.toWorld(this.la[0], this.la[1]), pb = B.toWorld(this.lb[0], this.lb[1]);
      this.L = o.L != null ? o.L : Math.hypot(pb[0] - pa[0], pb[1] - pa[1]);
      this.rope = !!o.rope; this.maxF = o.maxF || 0; this.road = !!o.road;
      this.acc = 0; this.force = 0; this.fs = 0; this.broken = false; this.kind = o.kind || (this.rope ? 'rope' : 'rod'); this.mat = o.mat || null;
    }
    DistJ.prototype.pre = function (inv, W) {
      var A = this.A, B = this.B;
      var rax = A.c * this.la[0] - A.s * this.la[1], ray = A.s * this.la[0] + A.c * this.la[1];
      var rbx = B.c * this.lb[0] - B.s * this.lb[1], rby = B.s * this.lb[0] + B.c * this.lb[1];
      var dx = B.x + rbx - A.x - rax, dy = B.y + rby - A.y - ray, len = Math.sqrt(dx * dx + dy * dy) || 1e-9;
      var nx = dx / len, ny = dy / len, C = len - this.L;
      this.rax = rax; this.ray = ray; this.rbx = rbx; this.rby = rby; this.nx = nx; this.ny = ny; this.len = len;
      this.active = !this.rope || C > -1e-4;
      if (!this.active) { this.acc = 0; return; }
      var rnA = rax * ny - ray * nx, rnB = rbx * ny - rby * nx;
      var k = A.invM + B.invM + A.invI * rnA * rnA + B.invI * rnB * rnB;
      this.mass = k > 0 ? 1 / k : 0;
      this.bias = W.jbeta * inv * (this.rope ? Math.max(C, 0) : C);
      if (W.warm) { var px = this.acc * nx, py = this.acc * ny; applyImp(A, -px, -py, rax, ray); applyImp(B, px, py, rbx, rby); }
      else this.acc = 0;
    };
    DistJ.prototype.solve = function () {
      if (!this.active || !this.mass) return;
      var A = this.A, B = this.B;
      var dvx = B.vx - B.av * this.rby - A.vx + A.av * this.ray, dvy = B.vy + B.av * this.rbx - A.vy - A.av * this.rax;
      var cd = dvx * this.nx + dvy * this.ny, lam = -this.mass * (cd + this.bias);
      if (this.rope) { var old = this.acc; this.acc = Math.min(old + lam, 0); lam = this.acc - old; } else this.acc += lam;
      var px = lam * this.nx, py = lam * this.ny;
      applyImp(A, -px, -py, this.rax, this.ray); applyImp(B, px, py, this.rbx, this.rby);
    };
    /* Csukló (rögzített pont / forgástengely): két test egy-egy pontját összeköti. */
    function PinJ(A, B, o) {
      o = o || {};
      this.id = uid++; this.A = A; this.B = B; this.kind = 'pin';
      this.la = o.la || [0, 0]; this.lb = o.lb || [0, 0];
      this.px = 0; this.py = 0; this.force = 0; this.broken = false; this.maxF = o.maxF || 0;
    }
    PinJ.prototype.pre = function (inv, W) {
      var A = this.A, B = this.B;
      var r1x = A.c * this.la[0] - A.s * this.la[1], r1y = A.s * this.la[0] + A.c * this.la[1];
      var r2x = B.c * this.lb[0] - B.s * this.lb[1], r2y = B.s * this.lb[0] + B.c * this.lb[1];
      var im = A.invM + B.invM;
      var k11 = im + A.invI * r1y * r1y + B.invI * r2y * r2y;
      var k12 = -A.invI * r1x * r1y - B.invI * r2x * r2y;
      var k22 = im + A.invI * r1x * r1x + B.invI * r2x * r2x;
      var det = k11 * k22 - k12 * k12;
      if (Math.abs(det) < 1e-12) { this.ok = false; return; }
      this.ok = true; det = 1 / det;
      this.m11 = det * k22; this.m12 = -det * k12; this.m22 = det * k11;
      this.r1x = r1x; this.r1y = r1y; this.r2x = r2x; this.r2y = r2y;
      this.bx = -W.jbeta * inv * (B.x + r2x - A.x - r1x); this.by = -W.jbeta * inv * (B.y + r2y - A.y - r1y);
      if (W.warm) { applyImp(A, -this.px, -this.py, r1x, r1y); applyImp(B, this.px, this.py, r2x, r2y); }
      else { this.px = 0; this.py = 0; }
    };
    PinJ.prototype.solve = function () {
      if (!this.ok) return;
      var A = this.A, B = this.B;
      var dvx = B.vx - B.av * this.r2y - A.vx + A.av * this.r1y, dvy = B.vy + B.av * this.r2x - A.vy - A.av * this.r1x;
      var ex = this.bx - dvx, ey = this.by - dvy;
      var ix = this.m11 * ex + this.m12 * ey, iy = this.m12 * ex + this.m22 * ey;
      this.px += ix; this.py += iy;
      applyImp(A, -ix, -iy, this.r1x, this.r1y); applyImp(B, ix, iy, this.r2x, this.r2y);
    };
    /* Rugó: erőelem (Hooke-törvény + sebességarányos csillapítás). */
    function Spring(A, B, o) {
      o = o || {};
      this.id = uid++; this.A = A; this.B = B; this.kind = 'spring';
      this.la = o.la || [0, 0]; this.lb = o.lb || [0, 0];
      var pa = A.toWorld(this.la[0], this.la[1]), pb = B.toWorld(this.lb[0], this.lb[1]);
      this.L = o.L != null ? o.L : Math.hypot(pb[0] - pa[0], pb[1] - pa[1]);
      this.k = o.k || 50; this.d = o.d == null ? 0.5 : o.d; this.force = 0;
    }
    Spring.prototype.apply = function () {
      var A = this.A, B = this.B;
      var rax = A.c * this.la[0] - A.s * this.la[1], ray = A.s * this.la[0] + A.c * this.la[1];
      var rbx = B.c * this.lb[0] - B.s * this.lb[1], rby = B.s * this.lb[0] + B.c * this.lb[1];
      var dx = B.x + rbx - A.x - rax, dy = B.y + rby - A.y - ray, len = Math.sqrt(dx * dx + dy * dy) || 1e-9;
      var nx = dx / len, ny = dy / len;
      var dvx = B.vx - B.av * rby - A.vx + A.av * ray, dvy = B.vy + B.av * rbx - A.vy - A.av * rax;
      var f = this.k * (len - this.L) + this.d * (dvx * nx + dvy * ny);
      this.force = f; this.len = len;
      var fx = f * nx, fy = f * ny;
      A.fx += fx; A.fy += fy; A.tq += rax * fy - ray * fx;
      B.fx -= fx; B.fy -= fy; B.tq -= rbx * fy - rby * fx;
    };
    Spring.prototype.energy = function () { var A = this.A, B = this.B, pa = A.toWorld(this.la[0], this.la[1]), pb = B.toWorld(this.lb[0], this.lb[1]), x = Math.hypot(pb[0] - pa[0], pb[1] - pa[1]) - this.L; return 0.5 * this.k * x * x; };

    /* ---------- világ ---------- */
    function World(o) {
      o = o || {};
      this.gx = o.gx || 0; this.gy = o.gy == null ? -9.81 : o.gy;
      this.iter = o.iter || 10;
      this.beta = o.beta == null ? 0.2 : o.beta;      /* érintkezési helyzetkorrekció */
      this.jbeta = o.jbeta == null ? 0.2 : o.jbeta;   /* kényszerek helyzetkorrekciója */
      this.slop = o.slop == null ? 0.005 : o.slop;
      this.restThresh = o.restThresh == null ? 0.5 : o.restThresh;
      this.warm = o.warm !== false; this.air = !!o.air;
      this.angDamp = o.angDamp || 0; this.linDamp = o.linDamp || 0;
      this.bodies = []; this.joints = []; this.springs = [];
      this.arbs = []; this.arbMap = {}; this.segs = [];
      this.time = 0; this.steps = 0;
      this.ground = new Body({ static: true, nc: true });   /* „világ” horgony: csuklók, rögzített végek */
      this.ground.update();
      this.drag = null; this.onSensor = null; this.onBreak = null;
    }
    World.prototype.add = function (b) { b.update(); this.bodies.push(b); return b; };
    World.prototype.remove = function (b) {
      this.bodies = this.bodies.filter(function (x) { return x !== b; });
      this.joints = this.joints.filter(function (j) { return j.A !== b && j.B !== b; });
      this.springs = this.springs.filter(function (j) { return j.A !== b && j.B !== b; });
      if (this.drag && this.drag.b === b) this.drag = null;
    };
    World.prototype.addJoint = function (j) { (j.kind === 'spring' ? this.springs : this.joints).push(j); return j; };
    World.prototype.removeJoint = function (j) {
      this.joints = this.joints.filter(function (x) { return x !== j; });
      this.springs = this.springs.filter(function (x) { return x !== j; });
    };
    World.prototype.mixE = function (A, B) { return Math.max(A.e, B.e); };
    World.prototype.mixMu = function (A, B) { return Math.sqrt(A.mu * B.mu); };
    World.prototype.bodyAt = function (x, y, pad) {
      for (var i = this.bodies.length - 1; i >= 0; i--) { var b = this.bodies[i]; if (!b.isStatic() && b.contains(x, y, pad || 0)) return b; }
      return null;
    };

    World.prototype.collide = function () {
      var bs = this.bodies, n = bs.length, map = {}, list = [], old = this.arbMap, i, j;
      for (i = 0; i < n; i++) bs[i].update();
      for (i = 0; i < n; i++) {
        var A = bs[i]; if (A.nc) continue;
        for (j = i + 1; j < n; j++) {
          var B = bs[j]; if (B.nc) continue;
          if (A.invM === 0 && B.invM === 0) continue;
          if (A.group && A.group === B.group) continue;
          if (A.x1 < B.x0 || B.x1 < A.x0 || A.y1 < B.y0 || B.y1 < A.y0) continue;
          var P = A, Q = B;
          if (P.shape === 'box' && Q.shape === 'circle') { P = B; Q = A; }
          var m = collidePair(P, Q); if (!m) continue;
          if (P.sensor || Q.sensor) { if (this.onSensor) this.onSensor(P.sensor ? P : Q, P.sensor ? Q : P); continue; }
          var key = P.id + ':' + Q.id, o = old[key];
          var arb = { A: P, B: Q, nx: m.nx, ny: m.ny, cs: m.pts, e: this.mixE(P, Q), mu: this.mixMu(P, Q), vn: 0 };
          for (var k = 0; k < arb.cs.length; k++) {
            var c = arb.cs[k]; c.Pn = 0; c.Pt = 0;
            if (o && this.warm) {
              /* melegindítás: az előző lépés legközelebbi érintkezési pontjának impulzusait örököljük */
              var best = 0.0025, bq = -1;
              for (var q = 0; q < o.cs.length; q++) { var ddx = o.cs[q].x - c.x, ddy = o.cs[q].y - c.y, dd = ddx * ddx + ddy * ddy; if (dd < best && !o.cs[q].used) { best = dd; bq = q; } }
              if (bq >= 0) { c.Pn = o.cs[bq].Pn; c.Pt = o.cs[bq].Pt; o.cs[bq].used = true; }
            }
          }
          map[key] = arb; list.push(arb);
        }
      }
      this.arbMap = map; this.arbs = list;
      /* kerekek az útpálya-rudakon */
      var segs = [], oldS = this.segMap || {}, smap = {};
      for (i = 0; i < this.joints.length; i++) {
        var J = this.joints[i]; if (!J.road || J.broken) continue;
        for (j = 0; j < n; j++) {
          var w = bs[j]; if (!w.wheel) continue;
          var ax = J.A.x, ay = J.A.y, ex = J.B.x - ax, ey = J.B.y - ay, l2 = ex * ex + ey * ey; if (l2 < 1e-9) continue;
          var t = clamp(((w.x - ax) * ex + (w.y - ay) * ey) / l2, 0, 1);
          var qx = ax + t * ex, qy = ay + t * ey, dx = w.x - qx, dy = w.y - qy, d2 = dx * dx + dy * dy, R = w.r + this.roadHalf;
          if (d2 > R * R) continue;
          var d = Math.sqrt(d2) || 1e-9, sk = J.id + ':' + w.id, so = oldS[sk];
          var sc = { w: w, J: J, t: t, nx: dx / d, ny: dy / d, pen: R - d, Pn: so ? so.Pn : 0, Pt: so ? so.Pt : 0, e: 0, mu: Math.sqrt(w.mu * 0.9) };
          smap[sk] = sc; segs.push(sc);
        }
      }
      this.segMap = smap; this.segs = segs;
    };
    World.prototype.roadHalf = 0.12;

    function preContact(arb, c, inv, W) {
      var A = arb.A, B = arb.B, nx = arb.nx, ny = arb.ny, tx = ny, ty = -nx;
      var rax = c.x - A.x, ray = c.y - A.y, rbx = c.x - B.x, rby = c.y - B.y;
      c.rax = rax; c.ray = ray; c.rbx = rbx; c.rby = rby;
      var rnA = rax * ny - ray * nx, rnB = rbx * ny - rby * nx;
      c.mn = 1 / (A.invM + B.invM + A.invI * rnA * rnA + B.invI * rnB * rnB);
      var rtA = rax * ty - ray * tx, rtB = rbx * ty - rby * tx;
      c.mt = 1 / (A.invM + B.invM + A.invI * rtA * rtA + B.invI * rtB * rtB);
      var dvx = B.vx - B.av * rby - A.vx + A.av * ray, dvy = B.vy + B.av * rbx - A.vy - A.av * rax;
      var vn = dvx * nx + dvy * ny;
      if (vn < arb.vn) arb.vn = vn;
      /* helyzetkorrekció külön „ál-sebességgel” (split impulse), így nem pumpál energiát a rendszerbe */
      c.pbias = W.beta * inv * Math.max(0, c.pen - W.slop); c.Pb = 0;
      c.bias = vn < -W.restThresh && arb.e > 0 ? -arb.e * vn : 0;
    }
    /* melegindítás: csak miután MINDEN érintkezés közelítési sebességét felmértük */
    function warmContact(arb, c) {
      var nx = arb.nx, ny = arb.ny, px = c.Pn * nx + c.Pt * ny, py = c.Pn * ny - c.Pt * nx;
      applyImp(arb.A, -px, -py, c.rax, c.ray); applyImp(arb.B, px, py, c.rbx, c.rby);
    }
    function solveContact(arb, c) {
      var A = arb.A, B = arb.B, nx = arb.nx, ny = arb.ny, tx = ny, ty = -nx;
      var dvx = B.vx - B.av * c.rby - A.vx + A.av * c.ray, dvy = B.vy + B.av * c.rbx - A.vy - A.av * c.rax;
      var vn = dvx * nx + dvy * ny, dP = c.mn * (-vn + c.bias), P0 = c.Pn;
      c.Pn = Math.max(P0 + dP, 0); dP = c.Pn - P0;
      applyImp(A, -dP * nx, -dP * ny, c.rax, c.ray); applyImp(B, dP * nx, dP * ny, c.rbx, c.rby);
      dvx = B.vx - B.av * c.rby - A.vx + A.av * c.ray; dvy = B.vy + B.av * c.rbx - A.vy - A.av * c.rax;
      var vt = dvx * tx + dvy * ty, dT = -c.mt * vt, mx = arb.mu * c.Pn, T0 = c.Pt;
      c.Pt = clamp(T0 + dT, -mx, mx); dT = c.Pt - T0;
      applyImp(A, -dT * tx, -dT * ty, c.rax, c.ray); applyImp(B, dT * tx, dT * ty, c.rbx, c.rby);
    }
    function solvePseudo(arb, c) {
      if (!c.pbias && !c.Pb) return;
      var A = arb.A, B = arb.B, nx = arb.nx, ny = arb.ny;
      var dvx = B.bvx - B.bav * c.rby - A.bvx + A.bav * c.ray, dvy = B.bvy + B.bav * c.rbx - A.bvy - A.bav * c.rax;
      var dP = c.mn * (-(dvx * nx + dvy * ny) + c.pbias), P0 = c.Pb;
      c.Pb = Math.max(P0 + dP, 0); dP = c.Pb - P0;
      var px = dP * nx, py = dP * ny;
      A.bvx -= px * A.invM; A.bvy -= py * A.invM; A.bav -= A.invI * (c.rax * py - c.ray * px);
      B.bvx += px * B.invM; B.bvy += py * B.invM; B.bav += B.invI * (c.rbx * py - c.rby * px);
    }
    /* kerék (W) – útpálya-szakasz (A–B csomópont, t aránynál) érintkezés: 3 testes kényszer */
    function preSeg(c, inv, Wd) {
      var w = c.w, A = c.J.A, B = c.J.B, t = c.t, nx = c.nx, ny = c.ny, tx = ny, ty = -nx;
      var rx = -nx * w.r, ry = -ny * w.r; c.rx = rx; c.ry = ry;
      var rn = rx * ny - ry * nx, rt = rx * ty - ry * tx, wa = (1 - t) * (1 - t) * A.invM + t * t * B.invM;
      c.mn = 1 / (w.invM + w.invI * rn * rn + wa); c.mt = 1 / (w.invM + w.invI * rt * rt + wa);
      c.bias = Wd.beta * inv * Math.max(0, c.pen - Wd.slop);
      var px = c.Pn * nx + c.Pt * tx, py = c.Pn * ny + c.Pt * ty;
      segImp(c, px, py);
    }
    function segImp(c, px, py) {
      var w = c.w, A = c.J.A, B = c.J.B, t = c.t;
      applyImp(w, px, py, c.rx, c.ry);
      A.vx -= (1 - t) * px * A.invM; A.vy -= (1 - t) * py * A.invM;
      B.vx -= t * px * B.invM; B.vy -= t * py * B.invM;
    }
    function segRel(c) {
      var w = c.w, A = c.J.A, B = c.J.B, t = c.t;
      return [w.vx - w.av * c.ry - (1 - t) * A.vx - t * B.vx, w.vy + w.av * c.rx - (1 - t) * A.vy - t * B.vy];
    }
    function solveSeg(c) {
      var nx = c.nx, ny = c.ny, tx = ny, ty = -nx, dv = segRel(c);
      var dP = c.mn * (-(dv[0] * nx + dv[1] * ny) + c.bias), P0 = c.Pn;
      c.Pn = Math.max(P0 + dP, 0); dP = c.Pn - P0; segImp(c, dP * nx, dP * ny);
      dv = segRel(c);
      var dT = -c.mt * (dv[0] * tx + dv[1] * ty), mx = c.mu * c.Pn, T0 = c.Pt;
      c.Pt = clamp(T0 + dT, -mx, mx); dT = c.Pt - T0; segImp(c, dT * tx, dT * ty);
    }

    World.prototype.step = function (dt) {
      var inv = 1 / dt, bs = this.bodies, i, k, b;
      /* 1. erők → sebességek (félig implicit Euler első fele) */
      for (i = 0; i < this.springs.length; i++) this.springs[i].apply();
      var D = this.drag;
      if (D && D.b && D.b.invM) {
        b = D.b; var p = b.toWorld(D.lx, D.ly), rx = p[0] - b.x, ry = p[1] - b.y;
        var vpx = b.vx - b.av * ry, vpy = b.vy + b.av * rx, om = 2 * Math.PI * 3, z = 0.8;
        var Fx = b.m * (om * om * (D.tx - p[0]) - 2 * z * om * vpx), Fy = b.m * (om * om * (D.ty - p[1]) - 2 * z * om * vpy);
        var Fm = Math.hypot(Fx, Fy), lim = b.m * 400; if (Fm > lim) { Fx *= lim / Fm; Fy *= lim / Fm; }
        b.fx += Fx; b.fy += Fy; b.tq += rx * Fy - ry * Fx; b.av *= 0.97;
        if (!b.noGrav) { b.fx -= b.m * this.gx; b.fy -= b.m * this.gy; }
      }
      for (i = 0; i < bs.length; i++) {
        b = bs[i]; if (!b.invM) continue;
        if (this.air && b.drag) { var sp = Math.sqrt(b.vx * b.vx + b.vy * b.vy); b.fx -= b.drag * sp * b.vx; b.fy -= b.drag * sp * b.vy; }
        var g = b.noGrav ? 0 : 1;
        b.vx += (g * this.gx + b.fx * b.invM) * dt; b.vy += (g * this.gy + b.fy * b.invM) * dt;
        b.av += b.tq * b.invI * dt;
        if (this.linDamp) { var f = 1 / (1 + this.linDamp * dt); b.vx *= f; b.vy *= f; }
        if (this.angDamp) b.av *= 1 / (1 + this.angDamp * dt);
      }
      /* 2. ütközések keresése */
      this.collide();
      /* 3. előkészítés + melegindítás */
      for (i = 0; i < this.arbs.length; i++) { var a = this.arbs[i]; for (k = 0; k < a.cs.length; k++) preContact(a, a.cs[k], inv, this); }
      for (i = 0; i < this.arbs.length; i++) { a = this.arbs[i]; for (k = 0; k < a.cs.length; k++) warmContact(a, a.cs[k]); }
      for (i = 0; i < this.segs.length; i++) preSeg(this.segs[i], inv, this);
      for (i = 0; i < this.joints.length; i++) this.joints[i].pre(inv, this);
      /* 4. iteratív megoldó (szekvenciális impulzusok) */
      for (var it = 0; it < this.iter; it++) {
        for (i = 0; i < this.joints.length; i++) this.joints[i].solve();
        for (i = 0; i < this.segs.length; i++) solveSeg(this.segs[i]);
        for (i = 0; i < this.arbs.length; i++) { var ar = this.arbs[i]; for (k = 0; k < ar.cs.length; k++) solveContact(ar, ar.cs[k]); }
      }
      for (it = 0; it < this.iter; it++)
        for (i = 0; i < this.arbs.length; i++) { var ap = this.arbs[i]; for (k = 0; k < ap.cs.length; k++) solvePseudo(ap, ap.cs[k]); }
      /* 5. sebességek → helyzetek (félig implicit Euler második fele) */
      for (i = 0; i < bs.length; i++) {
        b = bs[i]; b.fx = 0; b.fy = 0; b.tq = 0;
        if (!b.invM) continue;
        b.x += (b.vx + b.bvx) * dt; b.y += (b.vy + b.bvy) * dt; b.a += (b.av + b.bav) * dt;
        b.bvx = 0; b.bvy = 0; b.bav = 0;
      }
      /* 6. kényszererők, szakadás */
      var broke = null;
      for (i = 0; i < this.joints.length; i++) {
        var J = this.joints[i];
        J.force = J.kind === 'pin' ? Math.hypot(J.px, J.py) * inv : (J.active === false ? 0 : -J.acc * inv);
        J.fs = (J.fs || 0) + (J.force - (J.fs || 0)) * 0.12;
        if (J.maxF && Math.abs(J.fs) > J.maxF) { J.broken = true; (broke = broke || []).push(J); }
      }
      if (broke) {
        this.joints = this.joints.filter(function (x) { return !x.broken; });
        if (this.onBreak) for (i = 0; i < broke.length; i++) this.onBreak(broke[i]);
      }
      this.time += dt; this.steps++;
    };
    /* Energiák: mozgási (haladó + forgó), helyzeti (a választott nullszinthez), rugóenergia */
    World.prototype.energy = function (filter) {
      var ek = 0, ep = 0, es = 0;
      for (var i = 0; i < this.bodies.length; i++) {
        var b = this.bodies[i]; if (!b.invM || (filter && !filter(b))) continue;
        ek += 0.5 * b.m * (b.vx * b.vx + b.vy * b.vy) + (b.invI ? 0.5 * b.I * b.av * b.av : 0);
        ep += -b.m * (this.gx * b.x + this.gy * b.y);
      }
      for (var j = 0; j < this.springs.length; j++) es += this.springs[j].energy();
      return { ek: ek, ep: ep, es: es, tot: ek + ep + es };
    };
    World.prototype.momentum = function (filter) {
      var px = 0, py = 0;
      for (var i = 0; i < this.bodies.length; i++) { var b = this.bodies[i]; if (!b.invM || (filter && !filter(b))) continue; px += b.m * b.vx; py += b.m * b.vy; }
      return [px, py];
    };
    return { Body: Body, World: World, DistJ: DistJ, PinJ: PinJ, Spring: Spring, clamp: clamp };
  })();


  /* =====================================================================
   *  2. KÖZÖS FELÜLET: vászon, képkocka-ciklus, vezérlősáv
   * ===================================================================== */
  var esc = S.esc, fmt = S.fmt, Body = Motor.Body, World = Motor.World, clamp = Motor.clamp;
  var DT = 1 / 120;
  var PAL = ['#4f86f7', '#f2994a', '#27ae60', '#eb5757', '#9b51e0', '#e2b33c', '#2d9cdb', '#e86aa6'];
  function uni() { return S.level === 'egyetem'; }
  function f(x, d) { return fmt(x, d == null ? 2 : d); }
  function prog() { var p = S.store.get('jatekter', null); return p && typeof p === 'object' ? p : {}; }
  function getProg(mod, i) { var p = prog(); return p[mod] && p[mod][i]; }
  function setProg(mod, i, val) { var p = prog(); p[mod] = p[mod] || {}; p[mod][i] = val; S.store.set('jatekter', p); }
  function stars(n) { n = n || 0; return '★★★'.slice(0, n) + '☆☆☆'.slice(0, 3 - n); }
  function lum(c) {
    var m = /^#([0-9a-f]{6})$/i.exec(c);
    if (m) { var n = parseInt(m[1], 16); return ((n >> 16) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114) / 255; }
    m = /rgba?\((\d+)[ ,]+(\d+)[ ,]+(\d+)/.exec(c);
    return m ? (m[1] * 0.299 + m[2] * 0.587 + m[3] * 0.114) / 255 : 1;
  }
  function shade(hex, k) {
    var m = /^#([0-9a-f]{6})$/i.exec(hex); if (!m) return hex;
    var n = parseInt(m[1], 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    function c(v) { v = k < 0 ? v * (1 + k) : v + (255 - v) * k; return Math.round(clamp(v, 0, 255)); }
    return 'rgb(' + c(r) + ',' + c(g) + ',' + c(b) + ')';
  }
  function readTheme(el) {
    var cs = getComputedStyle(el);
    function v(n, d) { var x = cs.getPropertyValue(n); return x && x.trim() ? x.trim() : d; }
    var t = { fg: v('--fg', '#172033'), muted: v('--muted', '#6b7489'), line: v('--line', '#dfe4ee'), accent: v('--accent', '#2357d9'), bg: v('--surface', '#ffffff'), sky: v('--stage', '#f1f4fa') };
    t.dark = lum(t.bg) < 0.4;
    t.ground = t.dark ? '#3b4559' : '#cdbb9f'; t.groundEdge = t.dark ? '#5b6880' : '#9c8668';
    t.water = t.dark ? 'rgba(60,120,200,.35)' : 'rgba(80,150,230,.35)';
    return t;
  }
  /* feszültség → szín (zöld → sárga → piros) */
  function stressCol(r) {
    r = clamp(r, 0, 1);
    var h = 130 - 130 * r;
    return 'hsl(' + h.toFixed(0) + ',75%,' + (45 + 5 * r).toFixed(0) + '%)';
  }

  /* ---------- Vászon + fix időlépésű ciklus ----------
   * o: { view() → {x0,x1,y0,y1}, step(dt), draw(st), tick(), down/move/up(wx, wy, e), aspect, aspectM, center } */
  function Stage(wrap, o) {
    var self = this;
    this.o = o; this.wrap = wrap;
    var cv = this.cv = document.createElement('canvas');
    cv.className = 'jt-cv'; cv.tabIndex = 0;
    cv.setAttribute('role', 'img'); cv.setAttribute('aria-label', o.label || 'Fizikai szimuláció');
    wrap.appendChild(cv);
    this.g = cv.getContext('2d');
    this.paused = false; this.speed = 1; this.acc = 0; this.dirty = true; this.fps = 60; this.frames = 0;
    this.W = 300; this.H = 200; this.dpr = 1; this.sc = 1; this.cx = 0; this.cy = 0; this.raf = 0; this.last = 0; this.ptr = null;
    this.theme = readTheme(wrap);
    this._frame = function (t) { self.frame(t); };
    this._vis = function () { if (document.hidden) self.halt(); else self.start(); };
    this._hash = function () { setTimeout(function () { if (!cv.isConnected) self.destroy(); }, 0); };
    this._resize = function () { self.resize(); };
    this._theme = function () { self.theme = readTheme(wrap); self.dirty = true; };
    document.addEventListener('visibilitychange', this._vis);
    window.addEventListener('hashchange', this._hash);
    if (window.ResizeObserver) { this.ro = new ResizeObserver(this._resize); this.ro.observe(wrap); }
    window.addEventListener('resize', this._resize);
    if (window.MutationObserver) { this.mo = new MutationObserver(this._theme); this.mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class', 'style'] }); }
    if (window.matchMedia) { this.mq = window.matchMedia('(prefers-color-scheme: dark)'); if (this.mq.addEventListener) this.mq.addEventListener('change', this._theme); }
    function wpos(e) { var r = cv.getBoundingClientRect(); return self.toW(e.clientX - r.left, e.clientY - r.top); }
    cv.addEventListener('pointerdown', function (e) {
      if (!o.down || (self.ptr != null && self.ptr !== e.pointerId)) return;
      e.preventDefault(); cv.focus({ preventScroll: true });
      self.ptr = e.pointerId; try { cv.setPointerCapture(e.pointerId); } catch (x) { /* nem baj */ }
      var w = wpos(e); o.down(w[0], w[1], e); self.dirty = true;
    });
    cv.addEventListener('pointermove', function (e) {
      if (!o.move) return;
      var w = wpos(e); o.move(w[0], w[1], e, self.ptr === e.pointerId); if (self.ptr === e.pointerId || o.hover) self.dirty = true;
    });
    function end(e) {
      if (self.ptr !== e.pointerId) return;
      self.ptr = null; var w = wpos(e); if (o.up) o.up(w[0], w[1], e, e.type === 'pointercancel'); self.dirty = true;
    }
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
    cv.addEventListener('keydown', function (e) {
      if (o.key && o.key(e, true)) { e.preventDefault(); return; }
      if (e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); self.togglePause(); }
    });
    cv.addEventListener('keyup', function (e) { if (o.key && o.key(e, false)) e.preventDefault(); });
    this.resize(); this.start();
  }
  Stage.prototype.resize = function () {
    var w = Math.round(this.wrap.clientWidth || 300);
    var asp = w < 560 ? (this.o.aspectM || this.o.aspect || 1.6) : (this.o.aspect || 1.6);
    var h = Math.round(w / asp), dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (w === this.W && h === this.H && dpr === this.dpr) return;
    this.W = w; this.H = h; this.dpr = dpr;
    this.cv.style.height = h + 'px';
    this.cv.width = Math.round(w * dpr); this.cv.height = Math.round(h * dpr);
    this.dirty = true;
  };
  Stage.prototype.fit = function (r) {
    var sc = Math.min(this.W / (r.x1 - r.x0), this.H / (r.y1 - r.y0));
    this.sc = sc; this.cx = (r.x0 + r.x1) / 2;
    /* alapból a világ alja kerül a vászon aljára (a többlethely felül marad) */
    this.cy = this.o.center ? (r.y0 + r.y1) / 2 : r.y0 + this.H / (2 * sc);
  };
  Stage.prototype.toS = function (x, y) { return [(x - this.cx) * this.sc + this.W / 2, this.H / 2 - (y - this.cy) * this.sc]; };
  Stage.prototype.toW = function (sx, sy) { return [(sx - this.W / 2) / this.sc + this.cx, this.cy - (sy - this.H / 2) / this.sc]; };
  Stage.prototype.px = function (n) { return n / this.sc; };
  Stage.prototype.worldTf = function () { var d = this.dpr, s = this.sc; this.g.setTransform(d * s, 0, 0, -d * s, d * (this.W / 2 - this.cx * s), d * (this.H / 2 + this.cy * s)); };
  Stage.prototype.screenTf = function () { this.g.setTransform(this.dpr, 0, 0, this.dpr, 0, 0); };
  Stage.prototype.visibleRect = function () { var a = this.toW(0, this.H), b = this.toW(this.W, 0); return { x0: a[0], y0: a[1], x1: b[0], y1: b[1] }; };
  Stage.prototype.start = function () {
    if (this.raf || this.dead || document.hidden) return;
    this.last = 0; this.raf = requestAnimationFrame(this._frame);
  };
  Stage.prototype.halt = function () { if (this.raf) cancelAnimationFrame(this.raf); this.raf = 0; };
  Stage.prototype.destroy = function () {
    if (this.dead) return;
    this.dead = true; this.halt();
    document.removeEventListener('visibilitychange', this._vis);
    window.removeEventListener('hashchange', this._hash);
    window.removeEventListener('resize', this._resize);
    if (this.ro) this.ro.disconnect();
    if (this.mo) this.mo.disconnect();
    if (this.mq && this.mq.removeEventListener) this.mq.removeEventListener('change', this._theme);
    if (this.o.destroy) this.o.destroy();
  };
  Stage.prototype.frame = function (t) {
    this.raf = 0;
    if (!this.cv.isConnected) { this.destroy(); return; }
    var dt = this.last ? Math.min(0.05, (t - this.last) / 1000) : 1 / 60; this.last = t;
    if (dt > 0) this.fps += (1 / dt - this.fps) * 0.05;
    var o = this.o;
    if (!this.paused) {
      this.acc += dt * this.speed; var n = 0;
      while (this.acc >= DT && n < 8) { o.step(DT); this.acc -= DT; n++; }
      if (n >= 8) this.acc = 0;
      this.dirty = true;
    }
    if (this.dirty) { this.dirty = false; this.render(); }
    if (o.tick && this.frames % 8 === 0) o.tick();
    this.frames++;
    this.raf = requestAnimationFrame(this._frame);
  };
  Stage.prototype.render = function () {
    var g = this.g;
    this.fit(this.o.view());
    this.screenTf();
    g.fillStyle = this.o.sky ? this.o.sky(this.theme) : this.theme.sky;
    g.fillRect(0, 0, this.W, this.H);
    this.o.draw(this);
    this.screenTf();
  };
  Stage.prototype.togglePause = function () { this.paused = !this.paused; this.acc = 0; this.dirty = true; if (this.paintPause) this.paintPause(); };
  /* --- rajzolási segédek (világkoordinátában, worldTf után) --- */
  Stage.prototype.body = function (b, fill, stroke) {
    var g = this.g; b.update();
    g.beginPath();
    if (b.shape === 'circle') g.arc(b.x, b.y, Math.max(b.r, this.px(3)), 0, 2 * Math.PI);
    else { g.moveTo(b.V[0], b.V[1]); for (var i = 1; i < 4; i++) g.lineTo(b.V[2 * i], b.V[2 * i + 1]); g.closePath(); }
    g.fillStyle = fill; g.fill();
    if (stroke) { g.lineWidth = this.px(1.5); g.strokeStyle = stroke; g.stroke(); }
    if (b.shape === 'circle' && b.r * this.sc > 7) {
      g.beginPath(); g.moveTo(b.x, b.y); g.lineTo(b.x + Math.cos(b.a) * b.r * 0.85, b.y + Math.sin(b.a) * b.r * 0.85);
      g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = this.px(2); g.stroke();
    }
  };
  Stage.prototype.jointEnds = function (j) { return [j.A.toWorld(j.la[0], j.la[1]), j.B.toWorld(j.lb[0], j.lb[1])]; };
  Stage.prototype.joint = function (j, col, wpx) {
    var g = this.g, e = this.jointEnds(j), a = e[0], b = e[1];
    g.strokeStyle = col; g.lineCap = 'round';
    if (j.kind === 'spring') {
      var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1e-6, nx = -dy / L, ny = dx / L, n = 12, amp = Math.min(0.15, Math.max(0.06, 0.6 / (j.L + 0.5)) * 1.2);
      g.beginPath(); g.moveTo(a[0], a[1]);
      for (var i = 1; i < n; i++) { var t = i / n, s = (i % 2 ? 1 : -1) * amp; g.lineTo(a[0] + dx * t + nx * s, a[1] + dy * t + ny * s); }
      g.lineTo(b[0], b[1]); g.lineWidth = this.px(wpx || 2); g.stroke();
    } else if (j.kind === 'pin') {
      g.beginPath(); g.arc(b[0], b[1], this.px(4), 0, 2 * Math.PI); g.fillStyle = col; g.fill();
    } else {
      g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]);
      g.lineWidth = this.px(wpx || (j.kind === 'rope' ? 1.5 : 4));
      if (j.kind === 'rope' && j.len < j.L - 0.01) g.setLineDash([this.px(4), this.px(3)]);
      g.stroke(); g.setLineDash([]);
    }
  };
  /* képernyő-koordinátás felirat (a hívás után a transzformáció a képernyőé) */
  Stage.prototype.label = function (str, sx, sy, o) {
    var g = this.g; o = o || {};
    this.screenTf();
    g.font = (o.bold ? '600 ' : '') + (o.size || 13) + 'px system-ui, -apple-system, "Segoe UI", sans-serif';
    g.textAlign = o.align || 'left'; g.textBaseline = o.base || 'alphabetic';
    if (o.bg) {
      var w = g.measureText(str).width, h = (o.size || 13) + 8, x = o.align === 'center' ? sx - w / 2 - 6 : o.align === 'right' ? sx - w - 6 : sx - 6;
      g.fillStyle = o.bg; g.beginPath();
      if (g.roundRect) g.roundRect(x, sy - h + 5, w + 12, h, 6); else g.rect(x, sy - h + 5, w + 12, h);
      g.fill();
    }
    g.fillStyle = o.col || this.theme.fg; g.fillText(str, sx, sy);
  };
  Stage.prototype.wlabel = function (str, x, y, o) { var p = this.toS(x, y); this.label(str, p[0], p[1], o); this.worldTf(); };
  Stage.prototype.ground = function (b) { this.body(b, this.theme.ground, this.theme.groundEdge); };
  Stage.prototype.grid = function (step, col) {
    var g = this.g, r = this.visibleRect(), x, y;
    g.beginPath();
    for (x = Math.ceil(r.x0 / step) * step; x <= r.x1; x += step) { g.moveTo(x, r.y0); g.lineTo(x, r.y1); }
    for (y = Math.ceil(r.y0 / step) * step; y <= r.y1; y += step) { g.moveTo(r.x0, y); g.lineTo(r.x1, y); }
    g.strokeStyle = col; g.lineWidth = this.px(1); g.stroke();
  };
  Stage.prototype.arrow = function (x, y, dx, dy, col, wpx) {
    var g = this.g, L = Math.hypot(dx, dy); if (L < 1e-6) return;
    var ux = dx / L, uy = dy / L, h = Math.min(L * 0.4, this.px(10));
    g.strokeStyle = col; g.fillStyle = col; g.lineWidth = this.px(wpx || 2.5); g.lineCap = 'round';
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + dx - ux * h * 0.6, y + dy - uy * h * 0.6); g.stroke();
    g.beginPath(); g.moveTo(x + dx, y + dy); g.lineTo(x + dx - ux * h - uy * h * 0.5, y + dy - uy * h + ux * h * 0.5); g.lineTo(x + dx - ux * h + uy * h * 0.5, y + dy - uy * h - ux * h * 0.5); g.closePath(); g.fill();
  };

  /* ---------- vezérlők ---------- */
  function ctrlBar(extra) {
    return '<div class="jt-bar">' +
      '<button type="button" class="btn" data-c="pause">⏸ Szünet</button>' +
      '<button type="button" class="btn" data-c="step" title="Egy lépés: 1/60 másodperc">⏭ Lépés</button>' +
      '<button type="button" class="btn" data-c="reset">↺ Újraindítás</button>' +
      '<span class="seg jt-speed" role="group" aria-label="Lejátszási sebesség"><button type="button" data-sp="0.25">¼×</button><button type="button" data-sp="0.5">½×</button><button type="button" data-sp="1" class="on">1×</button></span>' +
      (extra || '') + '<span class="jt-fps muted" data-j="fps" aria-hidden="true"></span></div>';
  }
  function wireBar(root, st, mode) {
    var bar = root.querySelector('.jt-bar'), pb = bar.querySelector('[data-c="pause"]');
    st.paintPause = function () { pb.textContent = st.paused ? '▶ Folytatás' : '⏸ Szünet'; pb.classList.toggle('primary', st.paused); };
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.c === 'pause') st.togglePause();
      else if (b.dataset.c === 'step') { if (!st.paused) st.togglePause(); mode.step(DT); mode.step(DT); st.dirty = true; if (mode.tick) mode.tick(); }
      else if (b.dataset.c === 'reset') { mode.reset(); st.dirty = true; if (mode.tick) mode.tick(); }
      else if (b.dataset.sp) {
        st.speed = +b.dataset.sp;
        [].forEach.call(bar.querySelectorAll('[data-sp]'), function (x) { x.classList.toggle('on', x === b); });
      }
    });
    st.paintPause();
    var fpsEl = bar.querySelector('[data-j="fps"]'), n = 0;
    var tk = mode.tick;
    mode.tick = function () { if (tk) tk(); if (++n % 4 === 0) fpsEl.textContent = Math.round(st.fps) + ' fps'; };
  }
  function seg(key, items, cur) {
    return '<div class="seg" data-seg="' + key + '" role="group">' + items.map(function (it) {
      return '<button type="button" data-v="' + esc(String(it[0])) + '" class="' + (String(it[0]) === String(cur) ? 'on' : '') + '">' + esc(it[1]) + '</button>';
    }).join('') + '</div>';
  }
  function segSet(root, key, v) { [].forEach.call(root.querySelectorAll('[data-seg="' + key + '"] button'), function (b) { b.classList.toggle('on', b.dataset.v === String(v)); }); }
  function rng(k, label, min, max, step, val, unit, d) {
    return '<label class="jt-rng"><span class="jt-lv"><span>' + esc(label) + '</span><b><span data-v="' + k + '">' + f(val, d) + '</span>' + (unit ? ' ' + esc(unit) : '') + '</b></span>' +
      '<input type="range" data-k="' + k + '" data-d="' + (d == null ? 2 : d) + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '" aria-label="' + esc(label) + '"></label>';
  }
  function bindRng(root, cb) {
    [].forEach.call(root.querySelectorAll('input[type=range][data-k]'), function (i) {
      i.addEventListener('input', function () {
        var v = parseFloat(i.value), o = root.querySelector('[data-v="' + i.dataset.k + '"]');
        if (o) o.textContent = f(v, +i.dataset.d);
        cb(i.dataset.k, v);
      });
    });
  }
  function setRng(root, k, v) {
    var i = root.querySelector('input[data-k="' + k + '"]'); if (!i) return;
    i.value = v; var o = root.querySelector('[data-v="' + k + '"]'); if (o) o.textContent = f(+i.value, +i.dataset.d);
  }
  function onSeg(root, cb) {
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-seg] button'); if (!b || !root.contains(b)) return;
      var k = b.closest('[data-seg]').dataset.seg; segSet(root, k, b.dataset.v); cb(k, b.dataset.v, b);
    });
  }
  function distSeg(px, py, a, b) {
    var ex = b[0] - a[0], ey = b[1] - a[1], l2 = ex * ex + ey * ey, t = l2 ? clamp(((px - a[0]) * ex + (py - a[1]) * ey) / l2, 0, 1) : 0;
    return Math.hypot(px - a[0] - t * ex, py - a[1] - t * ey);
  }
  function staticBox(W, x0, y0, x1, y1, o) {
    o = o || {}; o.shape = 'box'; o.static = true; o.x = (x0 + x1) / 2; o.y = (y0 + y1) / 2; o.w = x1 - x0; o.h = y1 - y0;
    return W.add(new Body(o));
  }

  /* =====================================================================
   *  3. MÓDOK
   * ===================================================================== */

  /* ---------------- 3.1 Homokozó ---------------- */
  function mountHomokozo(app) {
    var GR = [['fold', 'Föld · 9,81'], ['hold', 'Hold · 1,62'], ['mars', 'Mars · 3,71'], ['nulla', 'Súlytalanság']];
    var GV = { fold: 9.81, hold: 1.62, mars: 3.71, nulla: 0 };
    var TOOLS = [['huz', '✋', 'Húzás'], ['kor', '⚪', 'Golyó'], ['doboz', '🟫', 'Doboz'], ['rugo', '〰️', 'Rugó'], ['kotel', '🪢', 'Kötél'], ['rud', '➖', 'Rúd'], ['csuklo', '📌', 'Rögzítés'], ['torol', '🗑️', 'Törlés']];
    var HELP = {
      huz: 'Fogj meg egy testet, és húzd/dobd el!', kor: 'Koppints egy üres helyre: golyó kerül oda. Meglévő testet ezzel is húzhatsz.',
      doboz: 'Koppints egy üres helyre: doboz kerül oda. Meglévő testet ezzel is húzhatsz.',
      rugo: 'Húzz egy vonalat két test (vagy egy test és a háttér) között: rugó köti össze őket.',
      kotel: 'Húzz egy vonalat két test (vagy egy test és a háttér) között: kötél – csak húzni tud, tolni nem.',
      rud: 'Húzz egy vonalat két test (vagy egy test és a háttér) között: merev rúd tartja őket állandó távolságra.',
      csuklo: 'Koppints egy test egy pontjára: ott a háttérhez szögeled, körülötte foroghat.',
      torol: 'Koppints egy testre vagy egy összekötő elemre a törléshez.'
    };
    var cfg = S.store.get('jatekter.homokozo', null) || {};
    cfg = { g: GV[cfg.g] != null ? cfg.g : 'fold', mu: cfg.mu != null ? cfg.mu : 0.5, e: cfg.e != null ? cfg.e : 0.3, tool: 'kor', size: cfg.size || 'm', pre: cfg.pre || 'halom' };
    function save() { S.store.set('jatekter.homokozo', { g: cfg.g, mu: cfg.mu, e: cfg.e, size: cfg.size, pre: cfg.pre }); }
    app.innerHTML =
      '<div class="jt-top">' +
      '<div class="jt-tools" role="toolbar" aria-label="Eszközök">' + TOOLS.map(function (t) {
        return '<button type="button" class="btn' + (t[0] === cfg.tool ? ' on' : '') + '" data-tool="' + t[0] + '"><span aria-hidden="true">' + t[1] + '</span> ' + t[2] + '</button>';
      }).join('') + '</div>' +
      '<div class="jt-opts">' +
      '<div class="jt-opt"><b>Gravitáció (m/s²)</b>' + seg('g', GR, cfg.g) + '</div>' +
      rng('mu', 'Súrlódási együttható', 0, 1, 0.05, cfg.mu, '', 2) +
      rng('e', 'Rugalmasság (ütközési szám)', 0, 1, 0.05, cfg.e, '', 2) +
      '<div class="jt-opt"><b>Új test mérete</b>' + seg('size', [['s', 'Kicsi'], ['m', 'Közepes'], ['l', 'Nagy']], cfg.size) + '</div>' +
      '<div class="jt-opt"><b>Kiinduló jelenet</b>' + seg('pre', [['halom', 'Halom'], ['domino', 'Dominó'], ['inga', 'Ingák, rugók'], ['lejto', 'Lejtő'], ['ures', 'Üres']], cfg.pre) + '</div>' +
      '</div></div>' +
      '<p class="jt-help muted" data-j="help">' + esc(HELP[cfg.tool]) + '</p>' +
      '<div class="jt-stage"></div>' + ctrlBar('<button type="button" class="btn" data-c="clear">🧹 Mindent töröl</button>') +
      '<div class="jt-info" data-j="info"></div>';
    var W, ci = 0, link = null, hover = null, SIZE = { s: 0.7, m: 1, l: 1.5 };
    var X0 = -8, X1 = 8;
    function applyMat(b) { b.mu = cfg.mu; b.e = cfg.e; }
    function mk(o) { var b = W.add(new Body(o)); applyMat(b); return b; }
    function build() {
      W = new World({ iter: 12, gy: -GV[cfg.g], angDamp: 0.05 });
      staticBox(W, X0 - 30, -2, X1 + 30, 0, { tag: 'fal' });
      staticBox(W, X0 - 2, 0, X0, 40, { tag: 'fal' });
      staticBox(W, X1, 0, X1 + 2, 40, { tag: 'fal' });
      var i, r, p = cfg.pre;
      if (p === 'halom') {
        for (r = 0; r < 5; r++) for (i = 0; i < 5 - r; i++) mk({ shape: 'box', x: 2 + (i - (4 - r) / 2) * 0.82, y: 0.4 + r * 0.8, w: 0.8, h: 0.8, density: 2, color: PAL[(r + i) % 3 + 4] });
        mk({ shape: 'circle', x: -5, y: 1, r: 0.5, density: 3, color: PAL[0] });
        mk({ shape: 'circle', x: -3.5, y: 0.35, r: 0.35, density: 2, color: PAL[1] });
      } else if (p === 'domino') {
        for (i = 0; i < 11; i++) mk({ shape: 'box', x: -3 + i * 0.95, y: 0.7, w: 0.18, h: 1.4, density: 3, color: PAL[i % 2 ? 1 : 6] });
        staticBox(W, -7.95, 2.3, -6.8, 2.5, { tag: 'fal' });
        var ramp = W.add(new Body({ shape: 'box', static: true, x: -5.6, y: 1.45, w: 3.2, h: 0.2, a: -0.62, tag: 'fal' })); applyMat(ramp);
        mk({ shape: 'circle', x: -7.5, y: 2.85, r: 0.32, vx: 2, density: 4, color: PAL[3] });
      } else if (p === 'inga') {
        var a1 = mk({ shape: 'circle', x: -6, y: 4, r: 0.4, density: 3, color: PAL[0] });
        W.addJoint(new Motor.DistJ(W.ground, a1, { la: [-3, 7.5] }));
        var a2 = mk({ shape: 'circle', x: -1.6, y: 4.2, r: 0.4, density: 3, color: PAL[2] });
        W.addJoint(new Motor.DistJ(W.ground, a2, { la: [-1.6, 7.5], rope: true }));
        var bx = mk({ shape: 'box', x: 2, y: 4.5, w: 0.9, h: 0.9, density: 2, color: PAL[1] });
        W.addJoint(new Motor.Spring(W.ground, bx, { la: [2, 7.5], lb: [0, 0.45], L: 1.6, k: 35, d: 0.3 }));
        var c1 = mk({ shape: 'box', x: 5, y: 4.4, w: 1.6, h: 0.25, density: 2, color: PAL[4] });
        W.addJoint(new Motor.PinJ(W.ground, c1, { la: [5, 4.4], lb: [0, 0] }));
        mk({ shape: 'circle', x: 5.6, y: 6, r: 0.3, density: 2, color: PAL[3] });
      } else if (p === 'lejto') {
        var rp = W.add(new Body({ shape: 'box', static: true, x: -1, y: 2.0, w: 11, h: 0.3, a: 25 * Math.PI / 180, tag: 'fal' })); applyMat(rp);
        var c = Math.cos(25 * Math.PI / 180), s = Math.sin(25 * Math.PI / 180);
        [-2.5, 0.5, 3].forEach(function (d, k) {
          var cx = -1 + c * d - s * 0.55, cy = 2 + s * d + c * 0.55;
          if (k < 2) mk({ shape: 'box', x: cx, y: cy, w: 0.8, h: 0.8, a: 25 * Math.PI / 180, density: 2, color: PAL[k + 1] });
          else mk({ shape: 'circle', x: cx, y: cy - 0.1, r: 0.4, density: 2, color: PAL[0] });
        });
      }
      W.bodies.forEach(applyMat);
    }
    function addBody(x, y) {
      if (W.bodies.length > 140) return;
      var k = SIZE[cfg.size], col = PAL[ci++ % PAL.length];
      if (cfg.tool === 'kor') mk({ shape: 'circle', x: x, y: y, r: 0.35 * k, density: 2, color: col });
      else mk({ shape: 'box', x: x, y: y, w: 0.8 * k, h: 0.8 * k, density: 2, color: col });
    }
    function jointAt(x, y) {
      var all = W.joints.concat(W.springs), best = null, bd = 0.25;
      all.forEach(function (j) { var e = st.jointEnds(j), d = j.kind === 'pin' ? Math.hypot(x - e[1][0], y - e[1][1]) : distSeg(x, y, e[0], e[1]); if (d < bd) { bd = d; best = j; } });
      return best;
    }
    var mode = {
      label: 'Homokozó: fizikai testek egy dobozban',
      aspect: 16 / 9, aspectM: 4 / 3.4,
      view: function () { return { x0: X0 - 0.15, x1: X1 + 0.15, y0: -0.25, y1: 9 }; },
      step: function (dt) { W.step(dt); },
      reset: function () { build(); st.dirty = true; },
      down: function (x, y) {
        var b = W.bodyAt(x, y, 0.08), t = cfg.tool;
        if (t === 'torol') { if (b) W.remove(b); else { var j = jointAt(x, y); if (j) W.removeJoint(j); } return; }
        if (t === 'csuklo') { if (b) W.addJoint(new Motor.PinJ(W.ground, b, { la: [x, y], lb: b.toLocal(x, y) })); return; }
        if (t === 'rugo' || t === 'kotel' || t === 'rud') { link = { A: b || W.ground, la: b ? b.toLocal(x, y) : [x, y], x0: x, y0: y, x: x, y: y }; return; }
        if (b) { var l = b.toLocal(x, y); W.drag = { b: b, lx: l[0], ly: l[1], tx: x, ty: y }; return; }
        if (t === 'kor' || t === 'doboz') { if (x > X0 + 0.3 && x < X1 - 0.3 && y > 0.3) addBody(x, y); }
      },
      move: function (x, y, e, held) {
        if (!held) return;
        if (W.drag) { W.drag.tx = x; W.drag.ty = y; }
        if (link) { link.x = x; link.y = y; }
      },
      up: function (x, y, e, cancel) {
        W.drag = null;
        if (link && !cancel) {
          var b = W.bodyAt(x, y, 0.08), B = b || W.ground, lb = b ? b.toLocal(x, y) : [x, y], d = Math.hypot(x - link.x0, y - link.y0);
          if (B !== link.A && d > 0.15) {
            var mA = link.A.m || 0, mB = B.m || 0, mm = mA && mB ? mA * mB / (mA + mB) : (mA || mB);
            if (cfg.tool === 'rugo') W.addJoint(new Motor.Spring(link.A, B, { la: link.la, lb: lb, k: Math.max(8, 30 * mm), d: 0.4 * Math.sqrt(30 * mm) * 0.5 }));
            else W.addJoint(new Motor.DistJ(link.A, B, { la: link.la, lb: lb, rope: cfg.tool === 'kotel' }));
          }
        }
        link = null;
      },
      draw: function (st) {
        var g = st.g, th = st.theme;
        st.worldTf();
        st.grid(1, th.dark ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.045)');
        W.bodies.forEach(function (b) { if (b.isStatic()) st.ground(b); });
        W.springs.forEach(function (j) { st.joint(j, th.dark ? '#9fb3d9' : '#51607d'); });
        W.joints.forEach(function (j) { if (j.kind !== 'pin') st.joint(j, j.kind === 'rope' ? (th.dark ? '#cfc2a8' : '#7a6440') : (th.dark ? '#aab4c8' : '#4a5568')); });
        W.bodies.forEach(function (b) { if (!b.isStatic()) st.body(b, b.color || PAL[0], shade(b.color || PAL[0], -0.35)); });
        W.joints.forEach(function (j) { if (j.kind === 'pin') st.joint(j, th.fg); });
        if (W.drag) { var p = W.drag.b.toWorld(W.drag.lx, W.drag.ly); g.beginPath(); g.moveTo(p[0], p[1]); g.lineTo(W.drag.tx, W.drag.ty); g.strokeStyle = th.accent; g.lineWidth = st.px(2); g.setLineDash([st.px(5), st.px(4)]); g.stroke(); g.setLineDash([]); }
        if (link) { g.beginPath(); g.moveTo(link.x0, link.y0); g.lineTo(link.x, link.y); g.strokeStyle = th.accent; g.lineWidth = st.px(3); g.setLineDash([st.px(6), st.px(4)]); g.stroke(); g.setLineDash([]); }
        if (!W.bodies.some(function (b) { return !b.isStatic(); })) st.label('Koppints a dobozba testek lerakásához!', st.W / 2, st.H / 2, { align: 'center', col: th.muted, size: 15 });
      },
      tick: function () {
        var E = W.energy(), n = W.bodies.filter(function (b) { return !b.isStatic(); }).length;
        info.innerHTML = '<span><b>' + n + '</b> test</span><span>g = <b>' + f(GV[cfg.g], 2) + '</b> m/s²</span>' +
          '<span>Mozgási energia: <b>' + f(E.ek, 1) + '</b> J</span><span>Helyzeti energia: <b>' + f(E.ep, 1) + '</b> J</span>' +
          (W.springs.length ? '<span>Rugóenergia: <b>' + f(E.es, 1) + '</b> J</span>' : '') +
          '<span>Összesen: <b>' + f(E.tot, 1) + '</b> J</span><span class="muted">idő: ' + f(W.time, 1) + ' s</span>';
      }
    };
    var info = app.querySelector('[data-j="info"]');
    build();
    var st = new Stage(app.querySelector('.jt-stage'), mode);
    wireBar(app, st, mode);
    app.querySelector('[data-c="clear"]').addEventListener('click', function () { cfg.pre = 'ures'; segSet(app, 'pre', 'ures'); save(); build(); st.dirty = true; });
    app.querySelector('.jt-tools').addEventListener('click', function (e) {
      var b = e.target.closest('[data-tool]'); if (!b) return;
      cfg.tool = b.dataset.tool;
      [].forEach.call(app.querySelectorAll('[data-tool]'), function (x) { x.classList.toggle('on', x === b); });
      app.querySelector('[data-j="help"]').textContent = HELP[cfg.tool];
    });
    onSeg(app, function (k, v) {
      if (k === 'g') { cfg.g = v; W.gy = -GV[v]; }
      else if (k === 'size') cfg.size = v;
      else if (k === 'pre') { cfg.pre = v; build(); }
      save(); st.dirty = true;
    });
    bindRng(app, function (k, v) { cfg[k] = v; W.bodies.forEach(applyMat); save(); });
    return st;
  }

  /* ---------------- 3.2 Ferde hajítás célba ---------------- */
  /* cel: [középx, középy, szélesség, magasság] – érzékelő; akad: [x0, y0, x1, y1] – akadályok; h0: az ágyú tengelyének magassága */
  var HAJ = [
    { nev: 'Első lövés', h0: 1, cel: [30, 0.6, 4, 1.2], akad: [], v: [45, 16], tipp: 'Kezdd 45°-kal, és a sebességgel állítsd be a távolságot!' },
    { nev: 'Messzi cél', h0: 1, cel: [70, 0.6, 3, 1.2], akad: [], v: [85, 24], tipp: 'Légüres térben 45° adja a legnagyobb hatótávot.' },
    { nev: 'Fal mögött', h0: 1, cel: [40, 0.6, 4, 1.2], akad: [[22, 0, 23.5, 14]], v: [50, 22], tipp: 'Meredekebb szög kell, hogy átrepüljön a falon – ugyanaz a távolság két szöggel is elérhető!' },
    { nev: 'Emelvény', h0: 1, cel: [52, 12.6, 4, 1.2], akad: [[48, 0, 56, 12]], v: [65, 26], tipp: 'A cél 12 m magasan van: a pálya ereszkedő ágának kell eltalálnia.' },
    { nev: 'Alagút', h0: 1, cel: [54, 0.6, 4, 1.2], akad: [[18, 7, 48, 11]], v: [62, 18], tipp: 'A plafon alatt kell elrepülnie: lapos szög, nagy sebesség. A csúcsmagasság h₀ + (v·sin α)²/(2g).' },
    { nev: 'Valódi levegő', h0: 1, cel: [42, 0.6, 4, 1.2], akad: [], air: true, lov: 'labda', v: [55, 20], tipp: 'Bekapcsolt légellenállás, könnyű labda: a légüres térre számolt sebesség itt kevés lesz!' },
    { nev: 'Szakadék', h0: 30, cel: [60, 0.6, 3, 1.2], akad: [], v: [75, 40], tipp: 'Magasról lősz: itt nem a 45° a legjobb, a vízszinteshez közelebbi szög is messzire visz.' },
    { nev: 'Kosár', h0: 1, cel: [35, 9.75, 2.2, 0.7], akad: [[34.8, 0, 35.2, 9.2], [33.4, 9, 36.6, 9.3], [33.4, 9.3, 33.6, 10.8], [36.4, 9.3, 36.6, 10.8]], v: [45, 20], tipp: 'A labdának felülről kell a kosárba esnie – ehhez magas ív kell.' }
  ];
  var LOV = {
    labda: { nev: 'Labda (0,45 kg)', r: 0.11, m: 0.45, col: '#f2994a' },
    vas: { nev: 'Vasgolyó (4,1 kg)', r: 0.05, m: 4.1, col: '#5b6677' }
  };
  /* F = ½·ρ·c·A·v²,  ρ = 1,2 kg/m³ (levegő), c = 0,47 (sima gömb) */
  function dragK(r) { return 0.5 * 1.2 * 0.47 * Math.PI * r * r; }
  function hajElmelet(v, deg, h0, yEnd, g) {
    var a = deg * Math.PI / 180, vx = v * Math.cos(a), vy = v * Math.sin(a), tc = vy / g, H = h0 + vy * vy / (2 * g);
    var D = vy * vy + 2 * g * (h0 - yEnd), tf = D >= 0 ? (vy + Math.sqrt(D)) / g : NaN;
    return { tc: tc, H: H, tf: tf, R: vx * tf };
  }
  function mountHajitas(app, start) {
    var lvl = clamp(start || 0, 0, HAJ.length - 1);
    var s = { ang: 45, v: 16, air: false, lov: 'labda', elm: false };
    var W, L, ball = null, shots = 0, hit = false, traces = [], cur = null, rec = null, aim = null, msg = null;
    app.innerHTML =
      '<div class="jt-levels" data-j="lv"></div>' +
      '<p class="jt-help" data-j="tipp"></p>' +
      '<div class="jt-stage"><div class="jt-msg" data-j="msg" hidden></div></div>' + ctrlBar() +
      '<div class="jt-top"><div class="jt-opts">' +
      rng('ang', 'Szög (α)', 0, 90, 1, s.ang, '°', 0) + rng('v', 'Kezdősebesség (v₀)', 5, 40, 0.5, s.v, 'm/s', 1) +
      '<div class="jt-opt"><b>Lövedék</b>' + seg('lov', [['labda', LOV.labda.nev], ['vas', LOV.vas.nev]], s.lov) + '</div>' +
      '<div class="jt-opt jt-checks"><label><input type="checkbox" data-k2="air"> Légellenállás</label><label><input type="checkbox" data-k2="elm"> Elméleti pálya (légüres tér)</label></div>' +
      '<div class="jt-opt"><button type="button" class="btn primary jt-fire" data-c="fire">💥 Tűz!</button></div>' +
      '</div></div>' +
      '<p class="muted jt-help">Tipp: a vásznon húzással is célozhatsz (az ágyútól húzott nyíl iránya a szög, hossza a sebesség).</p>' +
      '<div class="jt-tablewrap" data-j="tab"></div>';
    var info = app.querySelector('[data-j="tab"]'), msgEl = app.querySelector('[data-j="msg"]');
    function lvChips() {
      app.querySelector('[data-j="lv"]').innerHTML = '<span class="muted">Szint:</span> ' + HAJ.map(function (h, i) {
        var p = getProg('hajitas', i);
        return '<button type="button" class="chip' + (i === lvl ? ' on' : '') + '" data-lv="' + i + '" title="' + esc(h.nev) + '">' + (i + 1) + (p ? ' <small>' + stars(p) + '</small>' : '') + '</button>';
      }).join('');
    }
    function build() {
      L = HAJ[lvl];
      W = new World({ iter: 8, restThresh: 0.3 });
      W.air = L.air || s.air;
      staticBox(W, -30, -3, L.v[0] + 60, 0, { tag: 'talaj', e: 0.3, mu: 0.5 });
      staticBox(W, -6, 0, 1, Math.max(0.2, L.h0 - 0.45), { tag: 'talapzat', mu: 0.5 });
      L.akad.forEach(function (a) { staticBox(W, a[0], a[1], a[2], a[3], { tag: 'akad', e: 0.3, mu: 0.5 }); });
      W.add(new Body({ shape: 'box', static: true, sensor: true, x: L.cel[0], y: L.cel[1], w: L.cel[2], h: L.cel[3], tag: 'cel' }));
      W.onSensor = function (sen, b) {
        if (sen.tag !== 'cel' || b !== ball || hit) return;
        hit = true; var n = shots <= 1 ? 3 : shots <= 3 ? 2 : 1, old = getProg('hajitas', lvl) || 0;
        if (n > old) setProg('hajitas', lvl, n);
        lvChips(); showMsg(n);
      };
      ball = null; cur = null; rec = null; hit = false; shots = 0; traces = []; hideMsg();
      if (L.air) { s.air = true; s.lov = L.lov || s.lov; segSet(app, 'lov', s.lov); }
      var ac = app.querySelector('[data-k2="air"]'); ac.checked = W.air; ac.disabled = !!L.air;
      [].forEach.call(app.querySelectorAll('[data-seg="lov"] button'), function (b) { b.disabled = !!L.lov && b.dataset.v !== L.lov; });
      app.querySelector('[data-j="tipp"]').innerHTML = '<b>' + (lvl + 1) + '. ' + esc(L.nev) + '.</b> ' + esc(L.tipp);
      lvChips(); table();
    }
    function showMsg(n) {
      msgEl.hidden = false;
      msgEl.innerHTML = '<b>🎯 Talált!</b> <span class="jt-stars">' + stars(n) + '</span><br><small>' + shots + ' lövésből</small>' +
        (lvl < HAJ.length - 1 ? '<br><button type="button" class="btn primary" data-c="next">Következő szint →</button>' : '<br><small>Az összes szintet teljesítetted! 🏆</small>');
    }
    function hideMsg() { msgEl.hidden = true; msgEl.innerHTML = ''; }
    msgEl.addEventListener('click', function (e) { if (e.target.closest('[data-c="next"]')) { lvl++; build(); st.dirty = true; } });
    function fire() {
      if (ball) W.remove(ball);
      var P = LOV[s.lov], a = s.ang * Math.PI / 180;
      ball = W.add(new Body({ shape: 'circle', r: P.r, m: P.m, drag: dragK(P.r), e: 0.35, mu: 0.4, x: 0, y: L.h0, vx: s.v * Math.cos(a), vy: s.v * Math.sin(a), color: P.col }));
      W.air = !!(L.air || s.air);
      shots++;
      if (cur) { traces.push(cur); if (traces.length > 5) traces.shift(); }
      cur = [0, L.h0];
      rec = { v: s.v, ang: s.ang, air: W.air, lov: s.lov, t0: W.time, H: L.h0, tc: 0, R: null, tf: null, blocked: false, still: 0, done: false };
      if (st.paused) st.togglePause();
      table();
    }
    function table() {
      var r = rec, g = 9.81;
      if (!r) { info.innerHTML = '<p class="muted">Lőj egyet, és itt összevetheted a mért értékeket a légüres térre számolt elméleti értékekkel!</p>'; return; }
      var T = hajElmelet(r.v, r.ang, L.h0, LOV[r.lov].r, g);
      function row(n, th, sim, u, d) {
        var diff = sim == null || !isFinite(th) || !th ? '—' : f((sim - th) / th * 100, 1) + ' %';
        return '<tr><th scope="row">' + n + '</th><td>' + (isFinite(th) ? f(th, d) + ' ' + u : '—') + '</td><td>' + (sim == null ? '…' : f(sim, d) + ' ' + u) + '</td><td>' + diff + '</td></tr>';
      }
      info.innerHTML = '<table class="jt-table"><caption>Lövés: v₀ = ' + f(r.v, 1) + ' m/s, α = ' + r.ang + '°, ' + esc(LOV[r.lov].nev.toLowerCase()) + (r.air ? ', <b>légellenállással</b>' : ', légellenállás nélkül') + '</caption>' +
        '<thead><tr><th></th><th>Elmélet (légüres tér)</th><th>Szimuláció</th><th>Eltérés</th></tr></thead><tbody>' +
        row('Csúcsmagasság', T.H, r.tc ? r.H : null, 'm', 2) +
        row('Idő a csúcsig', T.tc, r.tc || null, 's', 2) +
        row('Repülési idő (talajig)', T.tf, r.blocked ? null : r.tf, 's', 2) +
        row('Vízszintes távolság (talajig)', T.R, r.blocked ? null : r.R, 'm', 2) + '</tbody></table>' +
        (r.blocked && r.R == null ? '<p class="muted jt-note">A lövedék akadályba ütközött, mielőtt a talajszintet elérte volna, ezért a távolságot nem lehetett megmérni.</p>' : '') +
        (r.air ? '<p class="muted jt-note">Légellenállással a mért csúcsmagasság és távolság kisebb az elméletinél – a könnyű labdánál sokkal jobban, mint a nehéz vasgolyónál.</p>' :
          '<p class="muted jt-note">Légüres térben az eltérés csak a lépésenkénti (numerikus) számolásból adódik – ' + (uni() ? 'a félig implicit Euler-módszer hibája O(Δt), itt Δt = 1/120 s.' : 'minél kisebb az időlépés, annál kisebb.') + '</p>');
    }
    var mode = {
      label: 'Ferde hajítás: ágyú, céltábla, pálya',
      aspect: 16 / 9, aspectM: 1.45,
      view: function () { return { x0: -4, x1: L.v[0], y0: -1, y1: Math.max(L.v[1], 8) }; },
      step: function (dt) {
        W.step(dt);
        if (!ball || !rec || rec.done) return;
        var r = rec, b = ball, P = LOV[r.lov];
        if (W.steps % 2 === 0) { cur.push(b.x, b.y); if (cur.length > 4000) cur.splice(0, 2); }
        if (b.y > r.H) { r.H = b.y; r.Hx = b.x; r.tc = W.time - r.t0; }
        if (!r.blocked) W.arbs.forEach(function (a) { if ((a.A === b || a.B === b) && (a.A.tag === 'akad' || a.B.tag === 'akad' || a.A.tag === 'talapzat' || a.B.tag === 'talapzat')) r.blocked = true; });
        if (r.R == null && !r.blocked && b.vy < 0 && b.y <= P.r + 1e-3) { r.R = b.x; r.tf = W.time - r.t0; table(); }
        r.still = Math.hypot(b.vx, b.vy) < 0.05 ? r.still + dt : 0;
        if (r.still > 0.5 || b.x > L.v[0] + 40 || b.x < -25 || W.time - r.t0 > 25) { r.done = true; table(); }
      },
      reset: function () { build(); },
      down: function (x, y) { aim = true; mode.move(x, y, null, true); },
      move: function (x, y, e, held) {
        if (!held || !aim) return;
        var dx = x, dy = y - L.h0, a = Math.round(clamp(Math.atan2(dy, Math.max(dx, 0.001)) * 180 / Math.PI, 0, 90));
        var v = Math.round(clamp(Math.hypot(dx, dy) * (40 / (0.6 * L.v[0])), 5, 40) * 2) / 2;
        s.ang = a; s.v = v; setRng(app, 'ang', a); setRng(app, 'v', v);
      },
      up: function () { aim = null; },
      draw: function (st) {
        var g = st.g, th = st.theme, i;
        st.worldTf();
        st.grid(L.v[0] > 60 ? 10 : 5, th.dark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.05)');
        /* célzóna */
        var c = L.cel;
        g.fillStyle = 'rgba(235,87,87,.18)'; g.fillRect(c[0] - c[2] / 2, c[1] - c[3] / 2, c[2], c[3]);
        g.strokeStyle = '#eb5757'; g.lineWidth = st.px(2); g.setLineDash([st.px(4), st.px(3)]); g.strokeRect(c[0] - c[2] / 2, c[1] - c[3] / 2, c[2], c[3]); g.setLineDash([]);
        W.bodies.forEach(function (b) { if (b.isStatic() && !b.sensor) st.ground(b); });
        /* elméleti pálya */
        if (s.elm) {
          var a = s.ang * Math.PI / 180, vx = s.v * Math.cos(a), vy = s.v * Math.sin(a);
          g.beginPath(); g.moveTo(0, L.h0);
          for (var t = 0.05; t < 30; t += 0.05) { var yy = L.h0 + vy * t - 4.905 * t * t; g.lineTo(vx * t, yy); if (yy < -1) break; }
          g.strokeStyle = th.accent; g.globalAlpha = 0.7; g.lineWidth = st.px(1.5); g.setLineDash([st.px(6), st.px(5)]); g.stroke(); g.setLineDash([]); g.globalAlpha = 1;
        }
        /* nyomvonalak */
        function trace(p, col, al) {
          if (!p || p.length < 4) return;
          g.beginPath(); g.moveTo(p[0], p[1]); for (var k = 2; k < p.length; k += 2) g.lineTo(p[k], p[k + 1]);
          g.strokeStyle = col; g.globalAlpha = al; g.lineWidth = st.px(2); g.stroke(); g.globalAlpha = 1;
        }
        for (i = 0; i < traces.length; i++) trace(traces[i], th.muted, 0.35 + 0.1 * i);
        trace(cur, '#eb5757', 0.9);
        if (rec && rec.tc && cur) st.wlabel('csúcs: ' + f(rec.H, 1) + ' m', rec.Hx, rec.H + st.px(8), { align: 'center', size: 11, col: th.muted });
        /* ágyú */
        var an = s.ang * Math.PI / 180, bl = Math.max(1.6, st.px(26)), bw = Math.max(0.35, st.px(7));
        g.save(); g.translate(0, L.h0); g.rotate(an);
        g.fillStyle = th.dark ? '#9aa6bd' : '#3d4557'; g.fillRect(0, -bw / 2, bl, bw); g.restore();
        g.beginPath(); g.arc(0, L.h0, Math.max(0.45, st.px(9)), 0, 2 * Math.PI); g.fillStyle = th.dark ? '#c3cbe0' : '#2a3142'; g.fill();
        if (aim) st.arrow(0, L.h0, Math.cos(an) * s.v * 0.6 * L.v[0] / 40, Math.sin(an) * s.v * 0.6 * L.v[0] / 40, th.accent, 2);
        if (ball) st.body(ball, ball.color, shade(ball.color, -0.4));
        /* feliratok */
        st.wlabel('🎯', c[0], c[1] + c[3] / 2 + st.px(4), { align: 'center', size: 18 });
        if (ball && rec && !rec.done) st.label('v = ' + f(Math.hypot(ball.vx, ball.vy), 1) + ' m/s   x = ' + f(ball.x, 1) + ' m   y = ' + f(ball.y, 1) + ' m', 10, 20, { col: th.fg, bg: th.dark ? 'rgba(0,0,0,.45)' : 'rgba(255,255,255,.75)' });
        st.label('Lövések: ' + shots, st.W - 10, 20, { align: 'right', col: th.muted });
        st.worldTf();
        var lbl = L.v[0] > 60 ? 10 : 5;
        for (i = lbl; i < L.v[0]; i += lbl) st.wlabel(i + ' m', i, -0.2 - st.px(12), { align: 'center', size: 11, col: th.muted });
      }
    };
    var st = new Stage(app.querySelector('.jt-stage'), mode);
    wireBar(app, st, mode);
    build();
    app.querySelector('[data-j="lv"]').addEventListener('click', function (e) { var b = e.target.closest('[data-lv]'); if (b) { lvl = +b.dataset.lv; build(); st.dirty = true; } });
    app.querySelector('[data-c="fire"]').addEventListener('click', fire);
    bindRng(app, function (k, v) { s[k] = v; st.dirty = true; });
    onSeg(app, function (k, v) { if (k === 'lov') s.lov = v; st.dirty = true; });
    [].forEach.call(app.querySelectorAll('[data-k2]'), function (c) {
      c.addEventListener('change', function () { s[c.dataset.k2] = c.checked; if (c.dataset.k2 === 'air' && !L.air) W.air = c.checked; st.dirty = true; });
    });
    return st;
  }

  /* ---------------- 3.3 Ütközések laborja ---------------- */
  function mountUtkozes(app) {
    var s = S.store.get('jatekter.utkozes', null) || {};
    s = { m1: s.m1 || 2, m2: s.m2 || 1, v1: s.v1 != null ? s.v1 : 1.5, v2: s.v2 != null ? s.v2 : -0.5, e: s.e != null ? s.e : 1 };
    var W, c1, c2, glued = false, run = false, done = '', p0, E0, hist = [];
    var TRK = 10, CW = 0.8, CH = 0.4;
    app.innerHTML =
      '<div class="jt-top"><div class="jt-opts jt-opts4">' +
      rng('m1', 'Kék kocsi tömege (m₁)', 0.5, 5, 0.5, s.m1, 'kg', 1) + rng('v1', 'Kék kocsi sebessége (v₁)', -3, 3, 0.1, s.v1, 'm/s', 1) +
      rng('m2', 'Narancs kocsi tömege (m₂)', 0.5, 5, 0.5, s.m2, 'kg', 1) + rng('v2', 'Narancs kocsi sebessége (v₂)', -3, 3, 0.1, s.v2, 'm/s', 1) +
      rng('e', 'Ütközési szám (e)', 0, 1, 0.05, s.e, '', 2) +
      '<div class="jt-opt jt-wide"><b>Gyors beállítás</b>' + seg('pre', [['1', 'Rugalmas (e = 1)'], ['0', 'Tépőzáras (e = 0)'], ['eq', 'Egyforma kocsik'], ['fal', 'Nehéz és könnyű']], '') + '</div>' +
      '<div class="jt-opt"><button type="button" class="btn primary" data-c="go">▶ Indítás</button></div>' +
      '</div></div>' +
      '<div class="jt-stage"></div>' + ctrlBar() +
      '<div class="jt-lab" data-j="info"></div>';
    var info = app.querySelector('[data-j="info"]');
    function save() { S.store.set('jatekter.utkozes', s); }
    function build() {
      W = new World({ gy: 0, restThresh: 0.001, iter: 12 });
      W.mixE = function () { return s.e; };
      c1 = W.add(new Body({ shape: 'box', w: CW, h: CH, x: 3, y: CH / 2, m: s.m1, noRot: true, mu: 0, e: s.e, vx: 0, color: '#4f86f7' }));
      c2 = W.add(new Body({ shape: 'box', w: CW, h: CH, x: 7, y: CH / 2, m: s.m2, noRot: true, mu: 0, e: s.e, vx: 0, color: '#f2994a' }));
      glued = false; run = false; done = ''; hist = []; p0 = null; E0 = null;
    }
    function go() {
      build();
      c1.vx = s.v1; c2.vx = s.v2; run = true;
      p0 = s.m1 * s.v1 + s.m2 * s.v2; E0 = 0.5 * s.m1 * s.v1 * s.v1 + 0.5 * s.m2 * s.v2 * s.v2;
      if (st.paused) st.togglePause();
    }
    function pred() {
      var m1 = s.m1, m2 = s.m2, v1 = s.v1, v2 = s.v2, e = s.e, M = m1 + m2, P = m1 * v1 + m2 * v2;
      return { u1: (P + m2 * e * (v2 - v1)) / M, u2: (P + m1 * e * (v1 - v2)) / M, meet: v1 > v2 };
    }
    var mode = {
      label: 'Ütközések laborja: két kocsi egy sínen', center: true,
      aspect: 16 / 5, aspectM: 16 / 8,
      view: function () { return { x0: -0.4, x1: TRK + 0.4, y0: -0.7, y1: 1.6 }; },
      step: function (dt) {
        if (!run) return;
        W.step(dt);
        if (!glued && s.e === 0 && W.arbs.length) { glued = true; W.addJoint(new Motor.DistJ(c1, c2)); }
        if (W.steps % 3 === 0) { hist.push([W.time, c1.m * c1.vx + c2.m * c2.vx, 0.5 * c1.m * c1.vx * c1.vx + 0.5 * c2.m * c2.vx * c2.vx]); if (hist.length > 400) hist.shift(); }
        if (c1.x < CW / 2 || c2.x > TRK - CW / 2 || c1.x > TRK - CW / 2 || c2.x < CW / 2 || W.time > 12) { run = false; done = 'A kocsi a sín végére ért – a mérés kész.'; }
      },
      reset: function () { build(); },
      draw: function (st) {
        var g = st.g, th = st.theme;
        st.worldTf();
        /* sín */
        g.fillStyle = th.dark ? '#59657d' : '#8792a8'; g.fillRect(0, -0.12, TRK, 0.08);
        g.fillRect(-0.15, -0.12, 0.15, 0.55); g.fillRect(TRK, -0.12, 0.15, 0.55);
        for (var x = 0; x <= TRK; x += 1) st.wlabel(String(x), x, -0.32, { align: 'center', size: 10, col: th.muted, base: 'top' });
        [c1, c2].forEach(function (c, i) {
          st.body(c, c.color, shade(c.color, -0.35));
          g.fillStyle = th.dark ? '#cfd6e6' : '#2a3142';
          [-0.25, 0.25].forEach(function (d) { g.beginPath(); g.arc(c.x + d, -0.02, 0.07, 0, 2 * Math.PI); g.fill(); });
          st.wlabel(f(c.m, 1) + ' kg', c.x, c.y, { align: 'center', base: 'middle', size: 12, bold: true, col: '#fff' });
          var v = run || done ? c.vx : (i ? s.v2 : s.v1);
          if (Math.abs(v) > 0.01) st.arrow(c.x, c.y + 0.45, v * 0.6, 0, i ? '#d9822b' : '#3a6fd8', 3);
          st.wlabel(f(v, 2) + ' m/s', c.x, c.y + 0.62, { align: 'center', size: 12, col: th.fg });
        });
        if (glued) st.wlabel('összetapadtak', (c1.x + c2.x) / 2, 1.1, { align: 'center', size: 12, col: th.muted });
        if (done) st.label(done, st.W / 2, 18, { align: 'center', col: th.muted, size: 12 });
        else if (!run) st.label('Állítsd be a kocsikat, majd nyomd meg az Indítás gombot!', st.W / 2, 18, { align: 'center', col: th.muted, size: 12 });
      },
      tick: function () {
        var pr = pred(), pv1 = run || done ? c1.vx : s.v1, pv2 = run || done ? c2.vx : s.v2;
        var P0 = s.m1 * s.v1 + s.m2 * s.v2, K0 = 0.5 * s.m1 * s.v1 * s.v1 + 0.5 * s.m2 * s.v2 * s.v2;
        var P = s.m1 * pv1 + s.m2 * pv2, K = 0.5 * s.m1 * pv1 * pv1 + 0.5 * s.m2 * pv2 * pv2;
        var Kp = 0.5 * s.m1 * pr.u1 * pr.u1 + 0.5 * s.m2 * pr.u2 * pr.u2, mx = Math.max(Math.abs(P0), Math.abs(P), K0, K, 0.01);
        function bar(lbl, v, col) { var w = Math.abs(v) / mx * 100; return '<div class="jt-barrow"><span>' + lbl + '</span><span class="jt-bartrack"><i style="width:' + w.toFixed(1) + '%;background:' + col + '"></i></span><b>' + f(v, 2) + '</b></div>'; }
        info.innerHTML =
          '<div class="jt-labgrid"><table class="jt-table"><thead><tr><th></th><th>v₁ (m/s)</th><th>v₂ (m/s)</th><th>Σp (kg·m/s)</th><th>ΣE<sub>mozg</sub> (J)</th></tr></thead><tbody>' +
          '<tr><th scope="row">Ütközés előtt</th><td>' + f(s.v1) + '</td><td>' + f(s.v2) + '</td><td>' + f(P0) + '</td><td>' + f(K0) + '</td></tr>' +
          '<tr><th scope="row">Most (szimuláció)</th><td>' + f(pv1) + '</td><td>' + f(pv2) + '</td><td>' + f(P) + '</td><td>' + f(K) + '</td></tr>' +
          '<tr><th scope="row">Elmélet szerint utána</th><td>' + (pr.meet ? f(pr.u1) : '—') + '</td><td>' + (pr.meet ? f(pr.u2) : '—') + '</td><td>' + f(P0) + '</td><td>' + (pr.meet ? f(Kp) : f(K0)) + '</td></tr>' +
          '</tbody></table>' +
          '<div class="jt-bars"><div class="jt-bartitle">Lendület (kg·m/s)</div>' + bar('előtte', P0, '#7b61ff') + bar('most', P, '#7b61ff') +
          '<div class="jt-bartitle">Mozgási energia (J)</div>' + bar('előtte', K0, '#27ae60') + bar('most', K, '#27ae60') + '</div></div>' +
          (!pr.meet ? '<p class="jt-note">⚠️ Ezekkel a sebességekkel a kék kocsi nem éri utol a narancsot – nem lesz ütközés.</p>' :
            '<p class="jt-note">Energiaveszteség az elmélet szerint: <b>' + (K0 ? f((K0 - Kp) / K0 * 100, 1) : '0') + ' %</b>' + (s.e === 1 ? ' – tökéletesen rugalmas ütközésnél semennyi.' : s.e === 0 ? ' – tökéletesen rugalmatlan ütközésnél ez a legnagyobb lehetséges.' : '.') + ' A lendület viszont minden esetben megmarad.</p>');
      }
    };
    build();
    var st = new Stage(app.querySelector('.jt-stage'), mode);
    wireBar(app, st, mode);
    app.querySelector('[data-c="go"]').addEventListener('click', go);
    bindRng(app, function (k, v) { s[k] = v; save(); if (!run) build(); st.dirty = true; mode.tick(); });
    onSeg(app, function (k, v) {
      var p = { '1': { e: 1 }, '0': { e: 0 }, eq: { m1: 1, m2: 1, v1: 2, v2: 0, e: 1 }, fal: { m1: 0.5, m2: 5, v1: 2, v2: 0, e: 1 } }[v];
      Object.keys(p).forEach(function (q) { s[q] = p[q]; setRng(app, q, p[q]); });
      save(); build(); st.dirty = true; mode.tick();
      setTimeout(function () { segSet(app, 'pre', ''); }, 300);
    });
    mode.tick();
    return st;
  }

  /* ---------------- 3.4 Hídépítő ---------------- */
  var HMAT = {
    ut: { nev: 'Útpálya', ar: 200, rho: 60, maxF: 0, maxL: 2.25, road: true, col: '#7a5c45', colD: '#b08d70', w: 7 },
    fa: { nev: 'Fa', ar: 100, rho: 25, maxF: 0, maxL: 3.2, col: '#d4a15a', colD: '#d9ad6f', w: 5 },
    acel: { nev: 'Acél', ar: 230, rho: 45, maxF: 0, maxL: 4.3, col: '#6f7f99', colD: '#a5b3cc', w: 5 },
    kabel: { nev: 'Acélsodrony', ar: 60, rho: 8, maxF: 0, maxL: 12, rope: true, col: '#3a3f4a', colD: '#c7ccd6', w: 2 }
  };
  /* szakítóerők [N] – a node-os tesztek (tools/jatekter-teszt.js) a minta-megoldásokkal ellenőrzik */
  HMAT.ut.maxF = 34000; HMAT.fa.maxF = 20000; HMAT.acel.maxF = 60000; HMAT.kabel.maxF = 45000;
  var AUTOK = {
    auto: { nev: 'személyautó', w: 3.0, h: 0.7, m: 700, r: 0.4, wm: 40, wx: 1.05, wy: -0.45, col: '#eb5757' },
    teher: { nev: 'teherautó', w: 4.2, h: 1.2, m: 1900, r: 0.5, wm: 90, wx: 1.55, wy: -0.65, col: '#2d9cdb' }
  };
  /* gap: a szakadék szélessége; yR: a jobb part magassága; fix: további rögzítési pontok; pill: pillér (x, felső y); pylon: függőhíd-torony */
  var HID = [
    { nev: 'Patak', gap: 4, fix: [], auto: 'auto', k: 1.3, ref: function () { return warren(4, 1, 'fa', 'fa'); }, tipp: 'Két útelem a part között még nem elég: a középső csomópontot háromszögekkel kell megtámasztani.' },
    { nev: 'Szakadék', gap: 6, fix: [[0, -2], [6, -2]], auto: 'auto', k: 1.25, ref: function () { return under(6, [[0, -2], [6, -2]]); }, tipp: 'A part oldalában lévő alsó rögzítési pontokról ferde támaszokkal alulról is megtámaszthatod az utat.' },
    { nev: 'Folyó', gap: 8, fix: [], auto: 'auto', k: 1.25, ref: function () { return warren(8, 2, 'fa', 'fa'); }, tipp: 'A háromszögekből álló rácsos tartó (például Warren-rács) merev: a háromszög alakja nem változhat, ha az oldalai nem nyúlnak.' },
    { nev: 'Pillér', gap: 12, fix: [[6, -3]], pill: [6, -3], auto: 'auto', k: 1.25, ref: function () { return warren(12, 1, 'fa', 'fa', [[6, -3]]); }, tipp: 'Használd ki a középső pillért: két rövidebb fesztáv kevesebb anyagból is kitart.' },
    { nev: 'Teherautó', gap: 8, fix: [[0, -2], [8, -2]], auto: 'teher', k: 1.15, ref: function () { return warren(8, 2, 'acel', 'acel'); }, tipp: 'Ez a teherautó majdnem háromszor nehezebb. Ahol a feszültség piros, oda erősebb anyag (acél) kell.' },
    { nev: 'Függőhíd', gap: 16, fix: [[-1, 7], [17, 7]], pylon: true, auto: 'auto', k: 1.3, ref: function () { return susp(16); }, tipp: 'Az acélsodrony olcsó és erős, de csak húzni tud. Akaszd fel az utat a tornyokra!' },
    { nev: 'Emelkedő', gap: 10, yR: 1, fix: [], auto: 'auto', k: 1.2, ref: function () { return warren(10, 2, 'acel', 'acel', null, 1); }, tipp: 'A túlsó part 1 m-rel magasabb: az útnak emelkednie kell. Túl meredek rámpán az autó megcsúszhat!' },
    { nev: 'Szűk keret', gap: 10, fix: [[0, -2], [10, -2]], auto: 'auto', k: 1.06, ref: function () { return warren(10, 2, 'fa', 'fa'); }, tipp: 'Nagyon kevés a pénz: gondold végig, melyik elem dolgozik igazán, és melyik felesleges.' }
  ];
  /* minta-megoldások (csak a tesztekhez és a költségkeret kiszámításához) */
  function deckY(x, gap, yR) { return yR && x > gap - 2 ? (x - (gap - 2)) / 2 * yR : 0; }
  function warren(gap, H, md, mt, extra, yR) {
    var n = [], r = [], i, idx = {};
    function N(x, y) { var k = x + ',' + y; if (idx[k] == null) { idx[k] = n.length; n.push([x, y]); } return idx[k]; }
    for (i = 0; i < gap; i += 2) r.push([N(i, deckY(i, gap, yR)), N(i + 2, deckY(i + 2, gap, yR)), 'ut']);
    for (i = 0; i < gap; i += 2) {
      var t = N(i + 1, H + (yR ? Math.ceil(deckY(i + 1, gap, yR)) : 0));
      r.push([N(i, deckY(i, gap, yR)), t, md], [t, N(i + 2, deckY(i + 2, gap, yR)), md]);
      if (i + 3 < gap) r.push([t, N(i + 3, H + (yR ? Math.ceil(deckY(i + 3, gap, yR)) : 0)), mt]);
    }
    (extra || []).forEach(function (p) { r.push([N(p[0], p[1]), N(p[0], 0), 'fa']); });
    return { n: n, r: r };
  }
  function under(gap, fx, depth) {
    depth = depth || 1;
    var n = [], r = [], idx = {}, i;
    function N(x, y) { var k = x + ',' + y; if (idx[k] == null) { idx[k] = n.length; n.push([x, y]); } return idx[k]; }
    for (i = 0; i < gap; i += 2) r.push([N(i, 0), N(i + 2, 0), 'ut']);
    var lo = [];
    for (i = 0; i <= gap; i++) lo.push(i === 0 ? fx[0] : i === gap ? fx[1] : [i, -depth]);
    for (i = 0; i < gap; i++) r.push([N(lo[i][0], lo[i][1]), N(lo[i + 1][0], lo[i + 1][1]), 'fa']);
    for (i = 1; i < gap; i++) {
      if (i % 2 === 0) r.push([N(i, -depth), N(i, 0), 'fa']);
      else r.push([N(i, -depth), N(i - 1, 0), 'fa'], [N(i, -depth), N(i + 1, 0), 'fa']);
    }
    return { n: n, r: r };
  }
  function susp(gap) {
    var n = [], r = [], idx = {}, i;
    function N(x, y) { var k = x + ',' + y; if (idx[k] == null) { idx[k] = n.length; n.push([x, y]); } return idx[k]; }
    for (i = 0; i < gap; i += 2) r.push([N(i, 0), N(i + 2, 0), 'ut']);
    for (i = 2; i < gap; i += 2) r.push([N(i < gap / 2 ? -1 : gap + 1, 7), N(i, 0), 'kabel']);
    return { n: n, r: r };
  }
  function hidCost(n, r) { return r.reduce(function (s, q) { return s + Math.hypot(n[q[1]][0] - n[q[0]][0], n[q[1]][1] - n[q[0]][1]) * HMAT[q[2]].ar; }, 0); }
  HID.forEach(function (L) { var d = L.ref(); L.refCost = hidCost(d.n, d.r); L.budget = Math.ceil(L.refCost * L.k / 100) * 100; });

  /* rögzített pontok egy szinten */
  function hidFix(L) { var a = [[0, 0], [L.gap, L.yR || 0]]; return a.concat(L.fix); }
  /* A szimuláció felépítése egy tervből: { n: [[x,y],...], r: [[i,j,anyag],...] } */
  function hidWorld(L, d) {
    var W = new World({ iter: 40, gy: -9.81, jbeta: 0.25, slop: 0.003 }), yR = L.yR || 0, RT = W.roadHalf, AU = AUTOK[L.auto];
    staticBox(W, -60, -25, 0, RT, { tag: 'part', mu: 0.9 });
    staticBox(W, L.gap, -25, L.gap + 60, yR + RT, { tag: 'part', mu: 0.9 });
    if (L.pill) staticBox(W, L.pill[0] - 0.4, -25, L.pill[0] + 0.4, L.pill[1] - 0.15, { tag: 'pillér' });
    var fx = hidFix(L), mass = d.n.map(function () { return 5; });
    d.r.forEach(function (q) { var a = d.n[q[0]], b = d.n[q[1]], m = Math.hypot(b[0] - a[0], b[1] - a[1]) * HMAT[q[2]].rho / 2; mass[q[0]] += m; mass[q[1]] += m; });
    var nodes = d.n.map(function (p, i) {
      var fixed = fx.some(function (q) { return q[0] === p[0] && q[1] === p[1]; });
      return W.add(new Body({ shape: 'circle', r: 0.1, x: p[0], y: p[1], m: fixed ? 0 : mass[i], static: fixed, nc: true, noRot: true, tag: fixed ? 'fix' : 'csp' }));
    });
    var rods = d.r.map(function (q) { var M = HMAT[q[2]]; return W.addJoint(new Motor.DistJ(nodes[q[0]], nodes[q[1]], { maxF: M.maxF, rope: !!M.rope, road: !!M.road, mat: q[2] })); });
    var y0 = RT + AU.r - AU.wy + 0.02, x0 = -AU.w / 2 - 1.5;
    var car = W.add(new Body({ shape: 'box', w: AU.w, h: AU.h, m: AU.m, x: x0, y: y0, group: 7, nc: true, tag: 'auto', color: AU.col }));
    var wheels = [-1, 1].map(function (sx) {
      var w = W.add(new Body({ shape: 'circle', r: AU.r, m: AU.wm, x: x0 + sx * AU.wx, y: y0 + AU.wy, group: 7, wheel: true, mu: 0.9, e: 0, tag: 'kerek' }));
      W.addJoint(new Motor.PinJ(car, w, { la: [sx * AU.wx, AU.wy], lb: [0, 0] }));
      return w;
    });
    return { W: W, nodes: nodes, rods: rods, car: car, wheels: wheels, AU: AU, broken: 0, maxS: 0, state: 'megy', t: 0 };
  }
  /* egy szimulációs lépés + kiértékelés */
  function hidStep(H, L, dt) {
    var W = H.W;
    H.t += dt;
    if (H.state === 'megy' && H.t > 0.8) {
      /* motor: legfeljebb akkora nyomaték, amennyi a jármű súlyának 60 %-át vonóerőként kifejtené */
      var tq = H.AU.m * 9.81 * 0.6 * H.AU.r / 2;
      H.wheels.forEach(function (w) { var tg = -3 / w.r, mx = tq * w.invI * dt; w.av += clamp(tg - w.av, -mx, mx); });
    }
    W.step(dt);
    var mx = 0;
    W.joints.forEach(function (j) { if (j.mat) { var s = Math.abs(j.fs) / HMAT[j.mat].maxF; if (s > mx) mx = s; } });
    if (H.t > 0.8 && mx > H.maxS) H.maxS = mx;
    if (H.state !== 'megy') return;
    var c = H.car;
    if (c.x > L.gap + 3.5 + H.AU.w / 2) H.state = 'siker';
    else if (c.y < Math.min(0, L.yR || 0) - 4) H.state = 'leesett';
    else if (H.t > 30) H.state = 'elakadt';
  }
  function hidRun(L, d, tmax, cb) {
    var H = hidWorld(L, d), b = 0;
    H.W.onBreak = function (j) { b++; if (cb) cb(j, H); };
    while (H.state === 'megy' && H.t < (tmax || 32)) hidStep(H, L, DT);
    H.broken = b;
    return H;
  }

  function mountHid(app, start) {
    var lvl = clamp(start || 0, 0, HID.length - 1), L, d, sel = null, drag = null, mat = 'ut', tool = 'epit', undo = [], H = null, hover = null;
    var plans = S.store.get('jatekter.hid.terv', null) || {};
    app.innerHTML =
      '<div class="jt-levels" data-j="lv"></div><p class="jt-help" data-j="tipp"></p>' +
      '<div class="jt-top"><div class="jt-opts">' +
      '<div class="jt-opt"><b>Anyag</b>' + seg('mat', Object.keys(HMAT).map(function (k) { return [k, HMAT[k].nev + ' · ' + HMAT[k].ar + ' Ft/m']; }), mat) + '</div>' +
      '<div class="jt-opt"><b>Eszköz</b>' + seg('tool', [['epit', '🔨 Építés'], ['torol', '🗑️ Törlés']], tool) + '</div>' +
      '<div class="jt-opt jt-btnrow"><button type="button" class="btn" data-c="undo">↶ Vissza</button><button type="button" class="btn" data-c="wipe">🧹 Új terv</button>' +
      '<button type="button" class="btn primary" data-c="test">🚗 Teszt</button></div>' +
      '</div></div>' +
      '<div class="jt-budget" data-j="budget"></div>' +
      '<div class="jt-stage"><div class="jt-msg" data-j="msg" hidden></div></div>' + ctrlBar() +
      '<p class="muted jt-help" data-j="help"></p>';
    var msgEl = app.querySelector('[data-j="msg"]'), budEl = app.querySelector('[data-j="budget"]'), helpEl = app.querySelector('[data-j="help"]');
    function lvChips() {
      app.querySelector('[data-j="lv"]').innerHTML = '<span class="muted">Szint:</span> ' + HID.map(function (h, i) {
        var p = getProg('hid', i);
        return '<button type="button" class="chip' + (i === lvl ? ' on' : '') + '" data-lv="' + i + '" title="' + esc(h.nev) + '">' + (i + 1) + (p ? ' <small>' + stars(p.cs) + '</small>' : '') + '</button>';
      }).join('');
    }
    function fixPts() { return hidFix(L); }
    function isFix(p) { return fixPts().some(function (q) { return q[0] === p[0] && q[1] === p[1]; }); }
    function load() {
      L = HID[lvl]; H = null; sel = null; drag = null; undo = [];
      var pl = plans[lvl];
      d = pl && pl.n && pl.r ? { n: pl.n.slice(), r: pl.r.slice() } : { n: fixPts().map(function (p) { return p.slice(); }), r: [] };
      fixPts().forEach(function (p) { if (!d.n.some(function (q) { return q[0] === p[0] && q[1] === p[1]; })) d.n.push(p.slice()); });
      app.querySelector('[data-j="tipp"]').innerHTML = '<b>' + (lvl + 1) + '. ' + esc(L.nev) + '.</b> ' + esc(L.tipp) + ' <span class="muted">(Jármű: ' + AUTOK[L.auto].nev + ', ' + f(AUTOK[L.auto].m + 2 * AUTOK[L.auto].wm, 0) + ' kg.)</span>';
      lvChips(); paint(); hideMsg();
    }
    function persist() { plans[lvl] = { n: d.n, r: d.r }; S.store.set('jatekter.hid.terv', plans); }
    function cost() { return hidCost(d.n, d.r); }
    function paint() {
      var c = cost(), over = c > L.budget + 1e-6, testing = !!H;
      budEl.innerHTML = '<span>Költség: <b class="' + (over ? 'jt-bad' : '') + '">' + f(c, 0) + ' Ft</b> / ' + f(L.budget, 0) + ' Ft</span>' +
        '<span class="jt-budbar"><i style="width:' + Math.min(100, c / L.budget * 100).toFixed(1) + '%" class="' + (over ? 'over' : '') + '"></i></span>' +
        '<span class="muted">' + d.r.length + ' elem</span>' + (over ? '<span class="jt-bad">Túllépted a keretet!</span>' : '');
      var tb = app.querySelector('[data-c="test"]');
      tb.textContent = testing ? '✎ Szerkesztés' : '🚗 Teszt'; tb.disabled = !testing && (over || !d.r.length);
      helpEl.textContent = testing ? 'A rudak színe a terhelésüket mutatja: zöld = kicsi, sárga = közepes, piros = a szakítás határán. A túlterhelt rúd elszakad.' :
        tool === 'torol' ? 'Koppints egy elemre vagy csomópontra a törléshez.' :
        'Húzz egy meglévő csomópontból (vagy koppints egymás után két pontra) egy új elem lerakásához. Az útpálya legfeljebb ' + f(HMAT.ut.maxL, 2) + ' m, a fa ' + f(HMAT.fa.maxL, 1) + ' m, az acél ' + f(HMAT.acel.maxL, 1) + ' m, a sodrony ' + f(HMAT.kabel.maxL, 1) + ' m hosszú lehet.';
      st && (st.dirty = true);
    }
    function snap(x, y) { return [Math.round(x), Math.round(y)]; }
    function nodeIdx(p) { for (var i = 0; i < d.n.length; i++) if (d.n[i][0] === p[0] && d.n[i][1] === p[1]) return i; return -1; }
    function nodeNear(x, y, r) { var best = -1, bd = r; d.n.forEach(function (p, i) { var q = Math.hypot(p[0] - x, p[1] - y); if (q < bd) { bd = q; best = i; } }); return best; }
    function solid(p) { return !isFix(p) && ((p[0] <= 0 && p[1] < 0.5) || (p[0] >= L.gap && p[1] < (L.yR || 0) + 0.5)); }
    function canLink(a, p) {
      var A = d.n[a], len = Math.hypot(p[0] - A[0], p[1] - A[1]);
      if (len < 0.5 || len > HMAT[mat].maxL + 1e-6 || solid(p) || p[1] < -8 || p[1] > 12) return false;
      var b = nodeIdx(p);
      return !(b >= 0 && d.r.some(function (q) { return (q[0] === a && q[1] === b) || (q[0] === b && q[1] === a); }));
    }
    function addRod(a, p) {
      if (!canLink(a, p)) return -1;
      undo.push(JSON.stringify(d)); if (undo.length > 60) undo.shift();
      var b = nodeIdx(p); if (b < 0) { b = d.n.length; d.n.push(p.slice()); }
      d.r.push([a, b, mat]); persist(); paint(); return b;
    }
    function removeNode(i) {
      d.r = d.r.filter(function (q) { return q[0] !== i && q[1] !== i; }).map(function (q) { return [q[0] > i ? q[0] - 1 : q[0], q[1] > i ? q[1] - 1 : q[1], q[2]]; });
      d.n.splice(i, 1);
    }
    function cleanup() { for (var i = d.n.length - 1; i >= 0; i--) if (!isFix(d.n[i]) && !d.r.some(function (q) { return q[0] === i || q[1] === i; })) removeNode(i); }
    function del(x, y) {
      var ni = nodeNear(x, y, 0.35);
      undo.push(JSON.stringify(d));
      if (ni >= 0 && !isFix(d.n[ni])) removeNode(ni);
      else {
        var best = -1, bd = 0.35;
        d.r.forEach(function (q, k) { var dd = distSeg(x, y, d.n[q[0]], d.n[q[1]]); if (dd < bd) { bd = dd; best = k; } });
        if (best < 0) { undo.pop(); return; }
        d.r.splice(best, 1); cleanup();
      }
      persist(); paint();
    }
    function startTest() {
      if (cost() > L.budget + 1e-6 || !d.r.length) return;
      H = hidWorld(L, { n: d.n, r: d.r }); H.br = 0;
      H.W.onBreak = function () { H.br++; };
      sel = null; hideMsg(); paint();
      if (st.paused) st.togglePause();
    }
    function stopTest() { H = null; hideMsg(); paint(); }
    function showMsg(html) { msgEl.hidden = false; msgEl.innerHTML = html; }
    function hideMsg() { msgEl.hidden = true; msgEl.innerHTML = ''; }
    function finish() {
      if (H.state === 'siker') {
        var c = cost(), n = H.br ? 1 : c <= L.budget * 0.9 ? 3 : 2, old = getProg('hid', lvl);
        if (!old || n > old.cs || (n === old.cs && c < old.ar)) setProg('hid', lvl, { cs: n, ar: Math.round(c) });
        lvChips();
        showMsg('<b>🎉 Átért!</b> <span class="jt-stars">' + stars(n) + '</span><br><small>Költség: ' + f(c, 0) + ' Ft · legnagyobb terhelés: ' + f(H.maxS * 100, 0) + ' %' + (H.br ? ' · ' + H.br + ' elem elszakadt' : '') + '</small><br>' +
          '<small class="muted">' + (H.br ? 'Elem szakadása nélkül 2★, a keret 90 %-a alatt 3★ jár.' : n < 3 ? 'A keret 90 %-a alatt 3★ jár.' : 'Tökéletes!') + '</small>' +
          (lvl < HID.length - 1 ? '<br><button type="button" class="btn primary" data-c="next">Következő szint →</button>' : ''));
      } else {
        showMsg('<b>' + (H.state === 'leesett' ? '💥 Leszakadt a híd!' : '⏱️ Az autó elakadt.') + '</b><br><small>' + (H.br ? H.br + ' elem szakadt el. ' : '') + 'Nézd meg, hol lett piros a szerkezet, és erősítsd meg ott!</small><br><button type="button" class="btn" data-c="edit">✎ Vissza a szerkesztéshez</button>');
      }
    }
    msgEl.addEventListener('click', function (e) {
      if (e.target.closest('[data-c="next"]')) { lvl++; load(); }
      else if (e.target.closest('[data-c="edit"]')) stopTest();
    });
    var mode = {
      label: 'Hídépítő: rudakból híd két part között',
      aspect: 16 / 9, aspectM: 4 / 3.6,
      view: function () {
        var ys = fixPts().map(function (p) { return p[1]; }), top = Math.max(4, Math.max.apply(null, ys) + 3);
        return { x0: -4.5, x1: L.gap + 4.5, y0: -8.5, y1: top };
      },
      step: function (dt) {
        if (!H) return;
        var was = H.state; hidStep(H, L, dt);
        if (was === 'megy' && H.state !== 'megy') { H.fin = H.t; }
        if (H.fin != null && H.t - H.fin > (H.state === 'siker' ? 0.6 : 1.2) && !H.shown) { H.shown = true; finish(); }
      },
      reset: function () { if (H) startTest(); },
      down: function (x, y) {
        if (H) return;
        if (tool === 'torol') { del(x, y); return; }
        var ni = nodeNear(x, y, 0.45);
        if (ni >= 0) { drag = { from: ni, x: x, y: y, moved: false }; return; }
        if (sel != null) { var nb = addRod(sel, snap(x, y)); if (nb >= 0) sel = nb; }
      },
      move: function (x, y, e, held) {
        hover = [x, y];
        if (drag && held) { drag.x = x; drag.y = y; var p = snap(x, y), A = d.n[drag.from]; if (p[0] !== A[0] || p[1] !== A[1]) drag.moved = true; }
      },
      hover: true,
      up: function (x, y, e, cancel) {
        if (!drag) return;
        var p = snap(x, y), A = d.n[drag.from];
        if (!cancel) {
          if (drag.moved && (p[0] !== A[0] || p[1] !== A[1])) { var nb = addRod(drag.from, p); sel = nb >= 0 ? null : sel; }
          else if (sel != null && sel !== drag.from) { if (addRod(sel, A) >= 0) sel = drag.from; else sel = drag.from; }
          else sel = sel === drag.from ? null : drag.from;
        }
        drag = null;
      },
      draw: function (st) {
        var g = st.g, th = st.theme, yR = L.yR || 0, RT = 0.12;
        st.worldTf();
        var vr = st.visibleRect();
        /* víz */
        g.fillStyle = th.water; g.fillRect(-1, vr.y0, L.gap + 2, -6 - vr.y0);
        if (!H) st.grid(1, th.dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.07)');
        /* partok, pillér, tornyok */
        g.fillStyle = th.ground; g.strokeStyle = th.groundEdge; g.lineWidth = st.px(1.5);
        g.fillRect(vr.x0 - 1, vr.y0 - 1, 1 - vr.x0 + 0, RT - vr.y0 + 1);
        g.fillRect(L.gap, vr.y0 - 1, vr.x1 - L.gap + 1, yR + RT - vr.y0 + 1);
        if (L.pill) g.fillRect(L.pill[0] - 0.4, vr.y0 - 1, 0.8, L.pill[1] - 0.15 - vr.y0 + 1);
        if (L.pylon) { g.fillStyle = th.dark ? '#59657d' : '#9aa3b5'; g.fillRect(-1.3, RT, 0.6, 7 - RT); g.fillRect(L.gap + 0.7, RT, 0.6, 7 - RT); }
        var mxF = 0;
        if (H) {
          var W = H.W;
          W.joints.forEach(function (j) {
            if (!j.mat) return;
            var M = HMAT[j.mat], s = Math.abs(j.fs) / M.maxF;
            g.beginPath(); g.moveTo(j.A.x, j.A.y); g.lineTo(j.B.x, j.B.y);
            g.strokeStyle = j.rope && !j.active ? th.muted : stressCol(s); g.lineCap = 'round';
            g.lineWidth = st.px(M.w) * (st.sc > 25 ? 1 : 0.8); g.stroke();
          });
          H.nodes.forEach(function (b) { g.beginPath(); g.arc(b.x, b.y, st.px(b.isStatic() ? 5 : 3), 0, 2 * Math.PI); g.fillStyle = b.isStatic() ? th.fg : (th.dark ? '#dfe5f2' : '#2a3142'); g.fill(); });
          st.body(H.car, H.car.color, shade(H.car.color, -0.4));
          H.wheels.forEach(function (w) { st.body(w, th.dark ? '#262b36' : '#2a2f3a', '#11141a'); });
          st.label('Legnagyobb terhelés: ' + f(H.maxS * 100, 0) + ' %' + (H.br ? '   Elszakadt: ' + H.br : ''), 10, 20, { col: th.fg, bg: th.dark ? 'rgba(0,0,0,.45)' : 'rgba(255,255,255,.8)' });
          var lx = st.W - 150, ly = 14;
          for (var q = 0; q <= 20; q++) { g.fillStyle = stressCol(q / 20); g.fillRect(lx + q * 6.5, ly, 7, 8); }
          st.label('0 %', lx, ly + 22, { size: 11, col: th.muted }); st.label('100 %', lx + 136, ly + 22, { size: 11, col: th.muted, align: 'right' });
          return;
        }
        /* terv */
        d.r.forEach(function (q) {
          var a = d.n[q[0]], b = d.n[q[1]], M = HMAT[q[2]];
          g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.lineCap = 'round';
          g.strokeStyle = th.dark ? M.colD : M.col; g.lineWidth = st.px(M.w); g.stroke();
          if (M.road) { g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = st.px(1); g.setLineDash([st.px(4), st.px(4)]); g.stroke(); g.setLineDash([]); }
        });
        d.n.forEach(function (p, i) {
          var fx = isFix(p);
          g.beginPath(); g.arc(p[0], p[1], st.px(fx ? 7 : 5), 0, 2 * Math.PI);
          g.fillStyle = fx ? '#eb5757' : (i === sel ? th.accent : (th.dark ? '#dfe5f2' : '#2a3142')); g.fill();
          if (fx) { g.strokeStyle = th.bg; g.lineWidth = st.px(2); g.stroke(); }
          if (i === sel) { g.beginPath(); g.arc(p[0], p[1], HMAT[mat].maxL, 0, 2 * Math.PI); g.strokeStyle = th.accent; g.globalAlpha = 0.35; g.lineWidth = st.px(1); g.setLineDash([st.px(4), st.px(4)]); g.stroke(); g.setLineDash([]); g.globalAlpha = 1; }
        });
        var from = drag ? drag.from : sel, to = drag ? [drag.x, drag.y] : (sel != null && hover ? hover : null);
        if (from != null && to && tool === 'epit' && (!drag || drag.moved)) {
          var A = d.n[from], p = snap(to[0], to[1]), okk = canLink(from, p);
          g.beginPath(); g.moveTo(A[0], A[1]); g.lineTo(p[0], p[1]);
          g.strokeStyle = okk ? th.accent : '#eb5757'; g.lineWidth = st.px(HMAT[mat].w); g.globalAlpha = 0.6; g.stroke(); g.globalAlpha = 1;
          st.wlabel(f(Math.hypot(p[0] - A[0], p[1] - A[1]), 2) + ' m · ' + f(Math.hypot(p[0] - A[0], p[1] - A[1]) * HMAT[mat].ar, 0) + ' Ft', p[0], p[1] + 0.35, { align: 'center', size: 12, col: okk ? th.fg : '#eb5757', bg: th.dark ? 'rgba(0,0,0,.5)' : 'rgba(255,255,255,.8)' });
        }
      }
    };
    var st = new Stage(app.querySelector('.jt-stage'), mode);
    wireBar(app, st, mode);
    load();
    app.querySelector('[data-j="lv"]').addEventListener('click', function (e) { var b = e.target.closest('[data-lv]'); if (b) { lvl = +b.dataset.lv; load(); } });
    onSeg(app, function (k, v) { if (k === 'mat') mat = v; else { tool = v; sel = null; } paint(); });
    app.querySelector('[data-c="undo"]').addEventListener('click', function () { if (H || !undo.length) return; d = JSON.parse(undo.pop()); persist(); paint(); });
    app.querySelector('[data-c="wipe"]').addEventListener('click', function () {
      if (H) return; undo.push(JSON.stringify(d)); d = { n: fixPts().map(function (p) { return p.slice(); }), r: [] }; sel = null; persist(); paint();
    });
    app.querySelector('[data-c="test"]').addEventListener('click', function () { if (H) stopTest(); else startTest(); });
    return st;
  }

  /* ---------------- 3.5 Newton-bölcső és kettős inga ---------------- */
  var NB = { R: 0.2, L: 1.6, gap: 0.004, N: 5, top: 2.4, SUB: 4 };
  function cradleWorld(k, e, deg) {
    var W = new World({ restThresh: 0.01, iter: 20, jbeta: 0.1 }), balls = [];
    W.mixE = function () { return e; };
    var th = -(deg || 35) * Math.PI / 180;
    for (var i = 0; i < NB.N; i++) {
      var ax = (i - (NB.N - 1) / 2) * (2 * NB.R + NB.gap), t = i < k ? th : 0;
      var b = W.add(new Body({ shape: 'circle', r: NB.R, m: 1, mu: 0, e: e, x: ax + NB.L * Math.sin(t), y: NB.top - NB.L * Math.cos(t), color: '#aab4c8' }));
      b.ax = ax;
      W.addJoint(new Motor.DistJ(W.ground, b, { la: [ax, NB.top], L: NB.L }));
      balls.push(b);
    }
    return { W: W, balls: balls };
  }
  function newtonTest(k) {
    var C = cradleWorld(k, 1, 35), dt = DT / NB.SUB, i;
    for (i = 0; i < Math.round(0.95 / dt); i++) C.W.step(dt);
    var ke = C.balls.map(function (b) { return 0.5 * b.m * (b.vx * b.vx + b.vy * b.vy); }), tot = ke.reduce(function (a, b) { return a + b; }, 0);
    var right = ke.slice(NB.N - k).reduce(function (a, b) { return a + b; }, 0), q = right / tot;
    return { ok: q > 0.95, info: 'a mozgási energia ' + (q * 100).toFixed(1) + ' %-a a jobb oldali ' + k + ' golyóban' };
  }
  function dpWorld(t1, t2) {
    var W = new World({ iter: 20, jbeta: 0.1 }), L1 = 1.2, L2 = 1.2, out = [];
    [0, 0.001].forEach(function (eps, c) {
      var a = t1 * Math.PI / 180 + eps, b = t2 * Math.PI / 180;
      var x1 = L1 * Math.sin(a), y1 = -L1 * Math.cos(a), x2 = x1 + L2 * Math.sin(b), y2 = y1 - L2 * Math.cos(b);
      var b1 = W.add(new Body({ shape: 'circle', r: 0.12, m: 1, x: x1, y: y1, nc: true, noRot: true }));
      var b2 = W.add(new Body({ shape: 'circle', r: 0.12, m: 1, x: x2, y: y2, nc: true, noRot: true }));
      W.addJoint(new Motor.DistJ(W.ground, b1, { la: [0, 0], L: L1 }));
      W.addJoint(new Motor.DistJ(b1, b2, { L: L2 }));
      out.push([b1, b2]);
    });
    return { W: W, p: out };
  }
  function mountInga(app) {
    var s = { sub: 'bolcso', k: 1, e: 1, t1: 120, t2: 150 };
    var C = null, D = null, trail = [], split = null, E0 = null, drag = null;
    app.innerHTML =
      '<div class="jt-top"><div class="jt-opts">' +
      '<div class="jt-opt"><b>Kísérlet</b>' + seg('sub', [['bolcso', 'Newton-bölcső'], ['kettos', 'Kettős inga (káosz)']], s.sub) + '</div>' +
      '<div class="jt-opt" data-only="bolcso"><b>Elengedett golyók</b>' + seg('k', [[1, '1'], [2, '2'], [3, '3'], [4, '4']], s.k) + '</div>' +
      '<div data-only="bolcso">' + rng('e', 'Ütközési szám (e)', 0.5, 1, 0.01, s.e, '', 2) + '</div>' +
      '<div data-only="kettos">' + rng('t1', 'Felső kar szöge', -180, 180, 1, s.t1, '°', 0) + '</div>' +
      '<div data-only="kettos">' + rng('t2', 'Alsó kar szöge', -180, 180, 1, s.t2, '°', 0) + '</div>' +
      '<div class="jt-opt"><button type="button" class="btn primary" data-c="go">▶ Elengedés</button></div>' +
      '</div></div>' +
      '<div class="jt-stage"></div>' + ctrlBar() + '<p class="muted jt-help" data-j="help"></p><div class="jt-info" data-j="info"></div>';
    var info = app.querySelector('[data-j="info"]');
    function vis() {
      [].forEach.call(app.querySelectorAll('[data-only]'), function (el) { el.hidden = el.dataset.only !== s.sub; });
      app.querySelector('[data-j="help"]').textContent = s.sub === 'bolcso' ? 'Húzd félre egérrel vagy ujjal a bal oldali golyót, vagy válaszd ki, hány golyót engedjen el, és nyomd meg az Elengedés gombot!' : 'A két inga szinte ugyanonnan indul (a felső kar szögében 0,001 rad = 0,06° a különbség). Meddig mozognak együtt?';
    }
    function build() {
      trail = []; split = null;
      if (s.sub === 'bolcso') { C = cradleWorld(s.k, s.e, 35); D = null; E0 = C.W.energy().tot; }
      else { D = dpWorld(s.t1, s.t2); C = null; E0 = energy1(); }
    }
    function energy1() { var p = D.p[0]; return D.W.energy(function (b) { return b === p[0] || b === p[1]; }).tot; }
    var mode = {
      label: s.sub === 'bolcso' ? 'Newton-bölcső' : 'Kettős inga',
      aspect: 16 / 9, aspectM: 1, center: true,
      view: function () { return C ? { x0: -2.6, x1: 2.6, y0: 0.2, y1: 2.8 } : { x0: -2.7, x1: 2.7, y0: -2.6, y1: 0.6 }; },
      step: function (dt) {
        var h = dt / NB.SUB, i;
        if (C) {
          if (drag) { var b = C.balls[0], th = clamp(Math.atan2(drag[0] - b.ax, NB.top - drag[1]), -1.3, 0); b.x = b.ax + NB.L * Math.sin(th); b.y = NB.top - NB.L * Math.cos(th); b.vx = 0; b.vy = 0; }
          for (i = 0; i < NB.SUB; i++) C.W.step(h);
        } else {
          for (i = 0; i < NB.SUB; i++) D.W.step(h);
          var p = D.p[0][1], q = D.p[1][1];
          if (D.W.steps % 8 === 0) { trail.push(p.x, p.y); if (trail.length > 1200) trail.splice(0, 2); }
          if (split == null && Math.hypot(p.x - q.x, p.y - q.y) > 0.3) split = D.W.time;
        }
      },
      reset: function () { build(); },
      down: function (x, y) { if (C) { var b = C.balls[0]; if (Math.hypot(x - b.x, y - b.y) < 0.5) { C = cradleWorld(1, s.e, 0); drag = [x, y]; } } },
      move: function (x, y, e, held) { if (drag && held) drag = [x, y]; },
      up: function () { if (drag) { drag = null; E0 = C.W.energy().tot; } },
      draw: function (st) {
        var g = st.g, th = st.theme;
        st.worldTf();
        if (C) {
          g.fillStyle = th.dark ? '#59657d' : '#6b7489';
          g.fillRect(-1.6, NB.top, 3.2, 0.08);
          C.balls.forEach(function (b) {
            g.beginPath(); g.moveTo(b.ax - 0.15, NB.top); g.lineTo(b.x, b.y); g.lineTo(b.ax + 0.15, NB.top);
            g.strokeStyle = th.muted; g.lineWidth = st.px(1); g.stroke();
          });
          C.balls.forEach(function (b) {
            var gr = g.createRadialGradient(b.x - 0.07, b.y + 0.07, 0.02, b.x, b.y, NB.R);
            gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.35, th.dark ? '#c9d2e3' : '#b9c3d6'); gr.addColorStop(1, th.dark ? '#5b6880' : '#59647a');
            g.beginPath(); g.arc(b.x, b.y, NB.R, 0, 2 * Math.PI); g.fillStyle = gr; g.fill();
            var v = Math.hypot(b.vx, b.vy); if (v > 0.05) st.arrow(b.x, b.y - NB.R - 0.08, b.vx * 0.25, 0, th.accent, 2);
          });
        } else {
          for (var c = 1; c >= 0; c--) {
            var P = D.p[c], col = c ? '#f2994a' : th.accent;
            if (c === 0 && trail.length > 4) {
              g.beginPath(); g.moveTo(trail[0], trail[1]); for (var i = 2; i < trail.length; i += 2) g.lineTo(trail[i], trail[i + 1]);
              g.strokeStyle = th.accent; g.globalAlpha = 0.3; g.lineWidth = st.px(1.2); g.stroke(); g.globalAlpha = 1;
            }
            g.globalAlpha = c ? 0.75 : 1;
            g.beginPath(); g.moveTo(0, 0); g.lineTo(P[0].x, P[0].y); g.lineTo(P[1].x, P[1].y); g.strokeStyle = col; g.lineWidth = st.px(3); g.stroke();
            [P[0], P[1]].forEach(function (b) { g.beginPath(); g.arc(b.x, b.y, 0.12, 0, 2 * Math.PI); g.fillStyle = col; g.fill(); });
            g.globalAlpha = 1;
          }
          g.beginPath(); g.arc(0, 0, st.px(5), 0, 2 * Math.PI); g.fillStyle = th.fg; g.fill();
          st.label('kék: eredeti · narancs: 0,06°-kal eltérő indítás', 10, 20, { col: th.muted, size: 12 });
        }
      },
      tick: function () {
        if (C) {
          var E = C.W.energy(), P = C.W.momentum();
          info.innerHTML = '<span>Teljes energia: <b>' + f(E.tot, 3) + '</b> J' + (E0 ? ' <small class="muted">(kezdetben ' + f(E0, 3) + ' J)</small>' : '') + '</span><span>Vízszintes lendület: <b>' + f(P[0], 3) + '</b> kg·m/s</span><span class="muted">idő: ' + f(C.W.time, 1) + ' s</span>';
        } else if (D) {
          var e1 = energy1();
          info.innerHTML = '<span>Energia (kék inga): <b>' + f(e1, 3) + '</b> J <small class="muted">(eltérés a kezdetitől: ' + f((e1 - E0) / Math.max(1e-6, Math.abs(E0)) * 100, 2) + ' %)</small></span>' +
            '<span>Szétválás (> 30 cm): <b>' + (split == null ? 'még együtt mozognak…' : f(split, 1) + ' s után') + '</b></span><span class="muted">idő: ' + f(D.W.time, 1) + ' s</span>';
        }
      }
    };
    build(); vis();
    var st = new Stage(app.querySelector('.jt-stage'), mode);
    wireBar(app, st, mode);
    app.querySelector('[data-c="go"]').addEventListener('click', function () { build(); if (st.paused) st.togglePause(); st.dirty = true; });
    onSeg(app, function (k, v) { s[k] = k === 'k' ? +v : v; vis(); build(); st.dirty = true; });
    bindRng(app, function (k, v) { s[k] = v; if (k !== 'e' || !C) build(); else { C.W.mixE = function () { return s.e; }; } st.dirty = true; });
    return st;
  }

  /* ---------------- 3.6 Holdraszállás ---------------- */
  /* ter: [x0, x1, felszín y]; pad: [x0, x1, y]; start: [x, y, vx, vy]; a: hajtómű-gyorsulás (m/s²); fuel: égési idő (s) */
  var LAND = [
    { nev: 'Hold – első leszállás', hely: 'hold', g: 1.62, a: 4, fuel: 30, start: [0, 45, 0, -2], ter: [[-300, 300, 0]], pad: [-5, 5, 0], tipp: 'Engedd zuhanni egy kicsit, majd a ▲ gombbal fékezz. Leszálláskor legfeljebb 2,5 m/s-mal érj földet!' },
    { nev: 'Hold – oldalt a cél', hely: 'hold', g: 1.62, a: 4, fuel: 25, start: [-60, 40, 7, 0], ter: [[-300, -35, 0], [-35, -20, 6], [-20, 300, 0]], pad: [30, 38, 0], tipp: 'Az oldalirányú sebességet csak a rakéta megdöntésével tudod csökkenteni (◀ ▶).' },
    { nev: 'Hold – kráter', hely: 'hold', g: 1.62, a: 4, fuel: 30, start: [-40, 55, 3, 0], ter: [[-300, -8, 18], [-8, 8, 0], [8, 300, 18]], pad: [-3, 3, 0], tipp: 'A leszállóhely egy szűk kráter alján van: először állj meg felette, aztán ereszkedj függőlegesen.' },
    { nev: 'Mars', hely: 'mars', g: 3.71, a: 9, fuel: 22, start: [-30, 70, 6, -8], ter: [[-300, 0, 0], [0, 25, 3], [25, 300, 0]], pad: [10, 18, 3], tipp: 'A Marson több mint kétszer akkora a gravitáció, mint a Holdon – korábban kell fékezni.' },
    { nev: 'Föld – visszatérő rakétafokozat', hely: 'fold', g: 9.81, a: 16, fuel: 10, start: [0, 160, 0, -30], ter: [[-300, 300, 0]], pad: [-6, 6, 0], tipp: 'Kevés az üzemanyag: a fékezést csak kb. 120 m magasan kezdd, és ne lebegj sokáig!' }
  ];
  var HELY = { hold: { sky: '#0b1020', ter: '#8d929c', edge: '#5d626c' }, mars: { sky: '#2a1410', ter: '#b5653d', edge: '#7d3f22' }, fold: { sky: '#9ec9ee', skyD: '#1d3047', ter: '#6b8f4e', edge: '#45603a' } };
  function mountLeszallas(app, start) {
    var lvl = clamp(start || 0, 0, LAND.length - 1), L, W, rk, fuel, keys = { up: 0, l: 0, r: 0 }, state, impact, touchT, still, debris, msgShown, flame = 0;
    var RW = 1.6, RH = 3.2;
    app.innerHTML =
      '<div class="jt-levels" data-j="lv"></div><p class="jt-help" data-j="tipp"></p>' +
      '<div class="jt-stage"><div class="jt-msg" data-j="msg" hidden></div></div>' +
      '<div class="jt-pad" aria-label="Irányítás"><button type="button" class="btn jt-hold" data-key="l" aria-label="Forgatás balra">⟲</button><button type="button" class="btn jt-hold jt-thr" data-key="up">▲ Hajtómű</button><button type="button" class="btn jt-hold" data-key="r" aria-label="Forgatás jobbra">⟳</button></div>' +
      ctrlBar() + '<p class="muted jt-help">Billentyűzet: ↑ vagy W = hajtómű, ← → vagy A D = forgatás, szóköz = szünet.</p><div class="jt-info" data-j="info"></div>';
    var msgEl = app.querySelector('[data-j="msg"]'), info = app.querySelector('[data-j="info"]');
    function lvChips() {
      app.querySelector('[data-j="lv"]').innerHTML = '<span class="muted">Küldetés:</span> ' + LAND.map(function (h, i) {
        var p = getProg('leszallas', i);
        return '<button type="button" class="chip' + (i === lvl ? ' on' : '') + '" data-lv="' + i + '" title="' + esc(h.nev) + '">' + (i + 1) + (p ? ' <small>' + stars(p) + '</small>' : '') + '</button>';
      }).join('');
    }
    function build() {
      L = LAND[lvl];
      W = new World({ gy: -L.g, iter: 10, restThresh: 0.3 });
      L.ter.forEach(function (t) { staticBox(W, t[0], -60, t[1], t[2], { tag: 'terep', mu: 0.8, e: 0.1 }); });
      staticBox(W, L.pad[0], L.pad[2], L.pad[1], L.pad[2] + 0.3, { tag: 'pad', mu: 0.9, e: 0 });
      rk = W.add(new Body({ shape: 'box', w: RW, h: RH, m: 1000, x: L.start[0], y: L.start[1], vx: L.start[2], vy: L.start[3], mu: 0.8, e: 0.05, tag: 'raketa' }));
      fuel = L.fuel; state = 'repul'; impact = 0; touchT = 0; still = 0; debris = null; msgShown = false;
      app.querySelector('[data-j="tipp"]').innerHTML = '<b>' + (lvl + 1) + '. ' + esc(L.nev) + '.</b> ' + esc(L.tipp) + ' <span class="muted">(g = ' + f(L.g, 2) + ' m/s², hajtómű: ' + f(L.a, 1) + ' m/s²)</span>';
      hideMsg(); lvChips();
    }
    function showMsg(h) { msgEl.hidden = false; msgEl.innerHTML = h; }
    function hideMsg() { msgEl.hidden = true; msgEl.innerHTML = ''; }
    function explode() {
      state = 'robbant'; debris = [];
      for (var i = 0; i < 26; i++) { var a = Math.random() * Math.PI, v = 3 + Math.random() * 8; debris.push([rk.x, rk.y, Math.cos(a) * v, Math.sin(a) * v, 1]); }
      W.remove(rk);
    }
    function end(ok, why) {
      if (msgShown) return; msgShown = true;
      if (ok) {
        var q = fuel / L.fuel, n = q >= 0.4 ? 3 : q >= 0.15 ? 2 : 1, old = getProg('leszallas', lvl) || 0;
        if (n > old) setProg('leszallas', lvl, n);
        lvChips();
        showMsg('<b>🚀 Sikeres leszállás!</b> <span class="jt-stars">' + stars(n) + '</span><br><small>Földet érés: ' + f(impact, 2) + ' m/s · maradék üzemanyag: ' + f(q * 100, 0) + ' %</small>' +
          (lvl < LAND.length - 1 ? '<br><button type="button" class="btn primary" data-c="next">Következő küldetés →</button>' : '<br><small>Minden küldetést teljesítettél! 🏆</small>'));
      } else showMsg('<b>' + why + '</b><br><button type="button" class="btn" data-c="again">↺ Újra</button>');
    }
    msgEl.addEventListener('click', function (e) {
      if (e.target.closest('[data-c="next"]')) { lvl++; build(); st.dirty = true; }
      else if (e.target.closest('[data-c="again"]')) { build(); st.dirty = true; }
    });
    function keyMap(k) { return { ArrowUp: 'up', w: 'up', W: 'up', ArrowLeft: 'l', a: 'l', A: 'l', ArrowRight: 'r', d: 'r', D: 'r' }[k]; }
    function onKey(e, down) { var k = keyMap(e.key); if (!k) return false; keys[k] = down ? 1 : 0; return true; }
    function winKey(e) {
      var t = e.target; if (t && /INPUT|TEXTAREA|SELECT/.test(t.tagName)) return;
      if (onKey(e, e.type === 'keydown')) e.preventDefault();
    }
    window.addEventListener('keydown', winKey); window.addEventListener('keyup', winKey);
    var mode = {
      label: 'Holdraszállás: irányítsd a leszállóegységet',
      aspect: 16 / 9, aspectM: 1,
      sky: function (th) { var h = HELY[L.hely]; return th.dark && h.skyD ? h.skyD : h.sky; },
      view: function () {
        var x = rk && state !== 'robbant' ? rk.x : (debris && debris[0] ? debris[0][0] : 0), y = rk && state !== 'robbant' ? rk.y : 0;
        return { x0: x - 28, x1: x + 28, y0: -3, y1: Math.max(32, y + 10) };
      },
      key: function (e, down) { return onKey(e, down); },
      step: function (dt) {
        if (state === 'robbant') { debris.forEach(function (p) { p[2] *= 0.995; p[3] -= L.g * dt; p[0] += p[2] * dt; p[1] += p[3] * dt; if (p[1] < 0) { p[1] = 0; p[3] *= -0.3; p[2] *= 0.7; } p[4] = Math.max(0, p[4] - dt * 0.25); }); return; }
        var thr = keys.up && fuel > 0 && state === 'repul';
        if (thr) { rk.fx += -Math.sin(rk.a) * L.a * rk.m; rk.fy += Math.cos(rk.a) * L.a * rk.m; fuel = Math.max(0, fuel - dt); }
        flame = thr ? Math.min(1, flame + dt * 8) : Math.max(0, flame - dt * 8);
        if (state === 'repul') { var tg = (keys.l - keys.r) * 1.2; rk.av += clamp(tg - rk.av, -3 * dt, 3 * dt); }
        W.step(dt);
        var touch = null, vn = 0;
        W.arbs.forEach(function (a) { if (a.A === rk || a.B === rk) { var o = a.A === rk ? a.B : a.A; if (!touch || o.tag === 'pad') touch = o; vn = Math.max(vn, -a.vn); } });
        var deg = Math.abs(((rk.a * 180 / Math.PI) + 540) % 360 - 180);
        if (touch) {
          if (!touchT) { impact = Math.max(vn, Math.hypot(rk.vx, rk.vy)); if (impact > (touch.tag === 'pad' ? 2.5 : 1.8) || deg > 20) { explode(); end(false, '💥 Túl kemény becsapódás (' + f(impact, 1) + ' m/s)' + (deg > 20 ? ' és túl nagy dőlés' : '') + '!'); return; } }
          touchT += dt; state = 'all';
          still = Math.hypot(rk.vx, rk.vy) < 0.15 && Math.abs(rk.av) < 0.15 ? still + dt : 0;
          if (deg > 50) { explode(); end(false, '💥 A leszállóegység felborult!'); return; }
          if (still > 1) end(touch.tag === 'pad' && deg < 12, touch.tag === 'pad' ? '⚠️ Túlságosan megdőlve álltál meg.' : '🧭 Leszálltál, de nem a leszállóhelyen. Próbáld újra!');
        } else if (state === 'all' && !msgShown) { state = 'repul'; touchT = 0; }
        if (rk.y > 400 || Math.abs(rk.x) > 280) { explode(); end(false, '🛰️ Elhagytad a küldetési területet.'); }
      },
      reset: function () { build(); },
      draw: function (st) {
        var g = st.g, th = st.theme, hl = HELY[L.hely], vr = st.visibleRect();
        st.worldTf();
        if (L.hely !== 'fold' || th.dark) {
          g.fillStyle = 'rgba(255,255,255,.6)';
          for (var i = 0; i < 60; i++) { var sx = ((i * 97.3) % 300) - 150, sy = 10 + ((i * 53.7) % 220); if (sx > vr.x0 && sx < vr.x1 && sy < vr.y1) g.fillRect(sx, sy, st.px(1.5), st.px(1.5)); }
        }
        W.bodies.forEach(function (b) {
          if (!b.isStatic()) return;
          if (b.tag === 'pad') st.body(b, '#e2b33c', '#9b7a1d'); else st.body(b, hl.ter, hl.edge);
        });
        var pc = (L.pad[0] + L.pad[1]) / 2;
        st.wlabel('H', pc, L.pad[2] + 0.4 + st.px(16), { align: 'center', bold: true, size: 14, col: '#e2b33c' });
        if (state === 'robbant') {
          debris.forEach(function (p) { g.globalAlpha = p[4]; g.fillStyle = p[4] > 0.6 ? '#f2994a' : '#888'; g.fillRect(p[0] - 0.2, p[1] - 0.2, 0.4, 0.4); });
          g.globalAlpha = 1;
        } else {
          g.save(); g.translate(rk.x, rk.y); g.rotate(rk.a);
          var k = Math.max(1, st.px(10) / RW);
          g.scale(k, k);
          if (flame > 0) {
            g.beginPath(); g.moveTo(-0.45, -RH / 2); g.lineTo(0, -RH / 2 - (1.4 + Math.random() * 0.6) * flame); g.lineTo(0.45, -RH / 2); g.closePath();
            g.fillStyle = 'rgba(255,170,60,.9)'; g.fill();
          }
          g.fillStyle = '#d9dee8'; g.strokeStyle = '#59647a'; g.lineWidth = st.px(1.2) / k;
          g.beginPath(); g.moveTo(-RW / 2, -RH / 2 + 0.4); g.lineTo(-RW / 2, RH / 2 - 0.9); g.lineTo(0, RH / 2); g.lineTo(RW / 2, RH / 2 - 0.9); g.lineTo(RW / 2, -RH / 2 + 0.4); g.closePath(); g.fill(); g.stroke();
          g.beginPath(); g.moveTo(-RW / 2, -RH / 2 + 0.6); g.lineTo(-RW / 2 - 0.35, -RH / 2); g.moveTo(RW / 2, -RH / 2 + 0.6); g.lineTo(RW / 2 + 0.35, -RH / 2); g.lineWidth = st.px(2) / k; g.stroke();
          g.beginPath(); g.arc(0, 0.5, 0.28, 0, 2 * Math.PI); g.fillStyle = '#4f86f7'; g.fill();
          g.restore();
          var alt = rk.y - RH / 2 - L.pad[2], vy = rk.vy, bad = vy < -2.5;
          st.label('Magasság: ' + f(Math.max(0, alt), 1) + ' m', 10, 20, { col: '#fff', bg: 'rgba(0,0,0,.45)' });
          st.label('Függőleges sebesség: ' + f(vy, 1) + ' m/s', 10, 44, { col: bad ? '#ff8a80' : '#fff', bg: 'rgba(0,0,0,.45)' });
          st.label('Vízszintes sebesség: ' + f(rk.vx, 1) + ' m/s', 10, 68, { col: Math.abs(rk.vx) > 1.5 ? '#ff8a80' : '#fff', bg: 'rgba(0,0,0,.45)' });
          var bw = Math.min(160, st.W * 0.3), q = fuel / L.fuel;
          st.screenTf();
          g.fillStyle = 'rgba(0,0,0,.45)'; g.fillRect(st.W - bw - 14, 10, bw + 4, 18);
          g.fillStyle = q > 0.3 ? '#27ae60' : q > 0.1 ? '#e2b33c' : '#eb5757'; g.fillRect(st.W - bw - 12, 12, bw * q, 14);
          st.label('Üzemanyag', st.W - 12, 44, { align: 'right', col: '#fff', size: 12, bg: 'rgba(0,0,0,.45)' });
          if (alt > 25) { var ps = st.toS(pc, L.pad[2]); st.label('▼ leszállóhely', clamp(ps[0], 60, st.W - 60), st.H - 10, { align: 'center', col: '#e2b33c', size: 12 }); }
        }
      },
      tick: function () {
        if (!rk) return;
        info.innerHTML = state === 'robbant' ? '' : '<span>Dőlés: <b>' + f(rk.a * 180 / Math.PI, 0) + '°</b></span><span>Tolóerő/súly: <b>' + f(L.a / L.g, 2) + '</b></span><span>Üzemanyag: <b>' + f(fuel, 1) + ' s</b></span><span class="muted">idő: ' + f(W.time, 1) + ' s</span>';
      },
      destroy: function () { window.removeEventListener('keydown', winKey); window.removeEventListener('keyup', winKey); }
    };
    build();
    var st = new Stage(app.querySelector('.jt-stage'), mode);
    wireBar(app, st, mode);
    app.querySelector('[data-j="lv"]').addEventListener('click', function (e) { var b = e.target.closest('[data-lv]'); if (b) { lvl = +b.dataset.lv; build(); st.dirty = true; } });
    [].forEach.call(app.querySelectorAll('.jt-hold'), function (b) {
      var k = b.dataset.key;
      function on(e) { e.preventDefault(); keys[k] = 1; b.classList.add('on'); try { b.setPointerCapture(e.pointerId); } catch (x) { /* nem baj */ } }
      function off() { keys[k] = 0; b.classList.remove('on'); }
      b.addEventListener('pointerdown', on); b.addEventListener('pointerup', off); b.addEventListener('pointercancel', off); b.addEventListener('lostpointercapture', off);
      b.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    });
    return st;
  }

  /* =====================================================================
   *  4. MÓDOK LEÍRÁSA, OLDALAK
   * ===================================================================== */
  var MODES = [
    { id: 'homokozo', ico: '🧱', nev: 'Homokozó', rovid: 'Golyók, dobozok, rugók, kötelek – állítható gravitációval, súrlódással és rugalmassággal.', mount: mountHomokozo,
      lead: 'Rakj le testeket, kösd össze őket rugóval vagy kötéllel, dobd el őket – és nézd meg, mit csinál velük a gravitáció a Földön, a Holdon, a Marson vagy súlytalanságban.',
      figyel: ['Ejts le egymás mellől egy kicsi és egy nagy golyót: egyszerre érnek le – a gravitáció minden testet ugyanúgy gyorsít.', 'Holdon minden lassabban esik, de hogy milyen magasra pattan vissza egy golyó, azt a rugalmasság dönti el, nem a gravitáció.', 'A Lejtő jelenetben csökkentsd a súrlódást: kb. 0,45 alatt a dobozok megcsúsznak (a lejtő 25°-os, tan 25° ≈ 0,47), a golyó viszont mindig gurul.', 'A rugón lógó doboz egyre kisebb kilengésekkel rezeg, a kötélen lógó golyó viszont a kötél megfeszülésekor rándul.', 'A Dominó jelenetben a lökés végigfut a soron – minden dominó a következőnek adja tovább az energiát.'],
      figyelE: ['Figyeld az „Összesen” energiát: súrlódás nélkül és tökéletesen rugalmas ütközéseknél közel állandó, egyébként csökken – soha nem nő.'],
      miert: 'A gravitáció minden testet ugyanakkora **gyorsulással** húz lefelé, a tömegétől függetlenül (a Földön g ≈ 9,81 m/s², a Holdon 1,62 m/s², a Marson 3,71 m/s²). Amikor két test összeér, a program kiszámolja, mekkora **lökést** kell kapniuk, hogy ne hatoljanak egymásba. A **rugalmasság** (ütközési szám, 0 és 1 között) megmondja, a közeledési sebesség hányad részével pattannak szét. A **súrlódás** a felület mentén fékez; legfeljebb a testet a felülethez nyomó erő μ-szöröse lehet – ezért csúszik meg a doboz, ha a lejtő túl meredek.',
      egyetem: 'A motor merevtest-dinamikát számol: minden testnek tömege és tehetetlenségi nyomatéka van (korong: `I = ½·m·r²`, téglalap: `I = m·(a² + b²)/12`). Minden időlépésben (Δt = 1/120 s) **félig implicit (szimplektikus) Euler**-lépést tesz: először a sebességet frissíti (`v ← v + a·Δt`), majd az új sebességgel a helyzetet (`x ← x + v·Δt`). Az explicit Euler-módszerrel ellentétben ez nem „pumpál” energiát a rendszerbe; az energia hibája korlátos marad.\n\nAz érintkezéseket **szekvenciális impulzusokkal** oldja meg – ez a sebességszintű lineáris komplementaritási feladat projektált Gauss–Seidel-iterációja: a normál impulzus nem lehet negatív (`P_n ≥ 0`, a testek csak tolni tudják egymást), a súrlódási impulzust a Coulomb-kúpba vágja (`|P_t| ≤ μ·P_n`). A **melegindítás** (warm start) az előző lépés impulzusaiból indul, ezért stabilak a halmok. A behatolást külön „ál-sebességgel” korrigálja (split impulse), így a helyzetkorrekció nem ad valódi mozgási energiát. A visszapattanás Newton-féle modell: `v_n′ = −e·v_n`. Két téglalap ütközését a szeparáló tengelyek tételével (SAT) ismeri fel, az érintkezési pontokat élvágással (clipping) kapja.' },
    { id: 'hajitas', ico: '🎯', nev: 'Ferde hajítás célba', rovid: HAJ.length + ' pálya: szög, sebesség, légellenállás – az elmélet és a szimuláció összevetve.', mount: mountHajitas, levels: HAJ.length,
      lead: 'Állítsd be az ágyú szögét és a kezdősebességet, és találd el a célt! Minden lövés után összevetheted a mért csúcsmagasságot, repülési időt és távolságot a képletekből számolt értékekkel.',
      figyel: ['Légüres térben ugyanaz a távolság két szöggel is elérhető: α-val és 90° − α-val (például 30° és 60°). A meredekebb lövés tovább repül.', 'Vízszintesen a sebesség végig állandó, függőlegesen egyenletesen változik – ezért parabola a pálya.', 'Kapcsold be a légellenállást: a pálya nem szimmetrikus, a leszálló ága meredekebb, mint a felszálló.', 'A nehéz vasgolyót a levegő alig fékezi, a könnyű labdát nagyon – légüres térben viszont egyformán repülnek.'],
      figyelE: ['A táblázatban légüres térben az eltérés csak néhány tized százalék: ez a numerikus integrálás hibája, és Δt-vel arányosan csökken.'],
      miert: 'Az elhajított test mozgása két egyszerű mozgásra bontható: vízszintesen **egyenletes** (`x = v₀·cos α · t`), függőlegesen **egyenletesen gyorsuló** (`y = h₀ + v₀·sin α · t − g·t²/2`). A csúcsmagasság `H = h₀ + (v₀·sin α)²/(2g)`; ha a kilövés és a becsapódás azonos szinten van, a hatótáv `R = v₀²·sin 2α / g` – ez 45°-nál a legnagyobb. A levegő a sebesség négyzetével arányos erővel fékez (`F = ½·ρ·c·A·v²`), ezért gyors, könnyű testeknél sokat számít.',
      egyetem: 'A légellenállásos mozgásegyenlet `m·dv/dt = m·g − k·|v|·v`, ahol `k = ½·ρ·c_w·A` (a modellben ρ = 1,2 kg/m³, c_w = 0,47 – sima gömb). Ennek nincs zárt alakú megoldása, a szimuláció numerikusan integrál. A határsebesség `v_h = √(m·g/k)`: a 0,45 kg-os, 11 cm sugarú labdára ≈ 20 m/s, a 4,1 kg-os, 5 cm sugarú vasgolyóra ≈ 135 m/s – ezért fékezi a levegő annyira másként a kettőt.\n\nLégüres térben a félig implicit Euler-módszer **elsőrendű**: a hatótáv relatív hibája O(Δt), Δt = 1/120 s mellett néhány tized százalék (a node-os teszt 20 m/s-os, 40°-os lövésre 0,3 % alatti eltérést ellenőriz). Egy másodrendű módszer (pl. Verlet vagy RK4) pontosabb lenne, de ütközésekkel együtt az impulzus-alapú megoldóhoz ez a séma illik.' },
    { id: 'utkozes', ico: '🚃', nev: 'Ütközések laborja', rovid: 'Két kocsi egy sínen: lendület és mozgási energia ütközés előtt és után.', mount: mountUtkozes,
      lead: 'Két kocsi gurul egymással szemben egy súrlódásmentes sínen. Állítsd be a tömegüket, a sebességüket és az ütközés rugalmasságát, és figyeld, mi marad meg és mi nem!',
      figyel: ['Egyforma kocsik, rugalmas ütközés: a mozgó kocsi megáll, az álló ugyanazzal a sebességgel megy tovább.', 'Tépőzárral (e = 0) a kocsik összetapadnak és együtt mennek tovább: a lendület megmarad, de a mozgási energia egy része elvész.', 'Könnyű kocsi a nehéznek ütközve visszapattan – mint a labda a falról.', 'A Σp oszlop az ütközés előtt és után mindig ugyanannyi, bármit állítasz be.'],
      figyelE: ['Ellenőrizd: ha a második kocsi állt és e = 0, az elvesző mozgási energia aránya pontosan m₂/(m₁ + m₂).'],
      miert: 'Ha a két kocsira csak egymás ereje hat, akkor a **lendületük** (p = m·v) összege nem változhat: ugyanakkora erő hat mindkettőre ellentétes irányban, ugyanannyi ideig (Newton III. törvénye) – amennyi lendületet az egyik kap, annyit a másik veszít. A **mozgási energia** (`E = ½·m·v²`) viszont csak **rugalmas** ütközésnél marad meg; rugalmatlan ütközésnél egy része hővé, hanggá és alakváltozássá alakul.',
      egyetem: 'Egydimenziós ütközésnél a lendületmegmaradás és a Newton-féle ütközési törvény (`v₂′ − v₁′ = −e·(v₂ − v₁)`) együtt egyértelműen meghatározza a végsebességeket: `v₁′ = (m₁v₁ + m₂v₂ + m₂·e·(v₂ − v₁))/(m₁ + m₂)`, és szimmetrikusan v₂′. Az energiaveszteség `ΔE = ½·μ·(1 − e²)·(v₁ − v₂)²`, ahol `μ = m₁m₂/(m₁ + m₂)` a redukált tömeg.\n\nA motorban az ütközés impulzusok sorozata, és mindegyik ugyanakkora, ellentétes irányú impulzust ad a két testnek – ezért a lendület **gépi pontossággal** megmarad (a node-os teszt 10⁻⁹ pontossággal ellenőrzi), a mozgási energia pedig e = 1-nél a numerikus hibán belül. A behatolás korrekciója nem módosítja a valódi sebességeket (split impulse), különben a rugalmatlan ütközés után is szétlökődnének a kocsik.' },
    { id: 'hid', ico: '🌉', nev: 'Hídépítő', rovid: HID.length + ' szint: építs hidat rudakból korlátozott keretből – aztán ráhajt egy autó.', mount: mountHid, levels: HID.length,
      lead: 'Építs hidat a két part közé útpályából, fa- és acélrudakból vagy acélsodronyból, a rendelkezésre álló pénzből! Aztán jön a teszt: ráhajt egy autó – a túlterhelt elemek elszakadnak.',
      figyel: ['A háromszögekből álló szerkezet merev, a négyszög viszont összecsuklik, ha nincs benne átló.', 'A színek a terhelést mutatják: ahol piros a rúd, ott a legnagyobb az erő – gyakran a partok közelében és középen.', 'Az autó haladtával vándorol a terhelés: más rúd lesz piros, amikor a híd elején és amikor a közepén jár.', 'Ha alulról támasztod meg az utat, a támaszokat nyomja a teher; ha felülről függeszted fel, a kábeleket húzza.'],
      figyelE: ['Az elemek csak a végpontjukban, csuklósan kapcsolódnak (rácsos tartó), ezért bennük csak húzó- vagy nyomóerő ébred, hajlítás nincs.'],
      miert: 'A híd minden csomópontjának egyensúlyban kell lennie: a rudakban ébredő erők együtt tartják meg a csomópontot és a rá nehezedő terhet. Egy vízszintes rúd függőleges terhet csak óriási erővel tud megtartani (gondolj egy kifeszített kötélre, amelyre ráülsz) – ezért kellenek a **ferde** elemek, amelyek **háromszögeket** alkotnak. Minden anyagnak van **szakítószilárdsága**: ha a rúdban ébredő erő meghaladja, a rúd elszakad.',
      egyetem: 'A szerkezet minden rúdja merev távolságkényszer két pontszerű csomópont között; a csomópont tömege a hozzá csatlakozó rudak tömegének fele. A megoldó a kényszerimpulzusból számolja a rúderőt (`F = P/Δt`), és ennek rövid simítás utáni abszolút értékét veti össze az anyag szakítóerejével (útpálya ' + HMAT.ut.maxF / 1000 + ' kN, fa ' + HMAT.fa.maxF / 1000 + ' kN, acél ' + HMAT.acel.maxF / 1000 + ' kN, sodrony ' + HMAT.kabel.maxF / 1000 + ' kN – ez csak húzásra).\n\nSíkbeli csuklós rácsnál a statikai határozottság feltétele `r = 2c − 3` (c: csomópontok, r: rudak – a rögzített pontok miatt itt a támaszok számával módosul). Határozott tartónál a rúderők a csomóponti módszerrel kézzel is kiszámolhatók; túlhatározottnál az erőeloszlás a merevségektől függ – itt a merev rudak és az iteratív megoldó miatt a konvergencia során alakul ki. Az autó kereke három test közötti érintkezéssel adja át a terhet: az impulzus a kerék és az útpálya-szakasz két végpontja között oszlik meg, az érintkezési pont helyének arányában.' },
    { id: 'inga', ico: '🔮', nev: 'Newton-bölcső és kettős inga', rovid: 'Lendületátadás egy golyósorban – és a káosz egy egyszerű ingában.', mount: mountInga,
      lead: 'Két híres inga: a Newton-bölcsőben a lendület és az energia együtt halad végig a golyósoron, a kettős inga pedig a káosz iskolapéldája – a mozgása hosszú távon megjósolhatatlan.',
      figyel: ['Egy golyót elengedve a túloldalon pontosan egy lendül ki, kettőt elengedve kettő.', 'Közben a középső golyók szinte meg sem mozdulnak – rajtuk csak „átfut” a lendület.', 'e < 1 esetén a mozgás lassan elhal, és a golyók végül együtt lengenek.', 'Kettős ingánál a két, szinte azonos helyzetből indított inga egy darabig együtt mozog, aztán teljesen eltérő utat jár be.'],
      figyelE: ['Kettős ingánál figyeld az energiát: a kényszerek numerikus stabilizálása miatt lassan csökken – ez numerikus csillapítás, nem fizika.'],
      miert: 'Rugalmas ütközésnél a **lendületnek és a mozgási energiának is** meg kell maradnia. Egyforma golyóknál ez csak úgy lehetséges, ha ugyanannyi golyó lendül ki, ahány becsapódott, ugyanakkora sebességgel. A kettős inga **kaotikus**: a kezdőhelyzet parányi különbsége (itt 0,001 rad, azaz kb. 0,06°) idővel óriásira nő, ezért a mozgása hosszú távon nem jósolható meg – pedig a törvényei pontosan ismertek.',
      egyetem: 'A Newton-bölcső „egy be, egy ki” viselkedése azon múlik, hogy az ütközések **egymás után**, páronként zajlanak (a valódi golyók között parányi rés van, vagy rugalmasan deformálódnak). Ha egy impulzus-alapú megoldó a teljesen összeérő golyósor összes érintkezését egyszerre oldaná meg, a lendület szétkenődne a golyók között. Ezért itt a golyók között 4 mm a rés, és az időlépés 1/480 s (a node-os teszt ellenőrzi, hogy az energia több mint 95 %-a a megfelelő számú golyóba kerül).\n\nA kettős inga mozgásegyenletei csatoltak és nemlineárisak; a közeli pályák exponenciálisan távolodnak (pozitív Ljapunov-exponens). A numerikus hiba is ilyen „parányi különbség”: két különböző időlépéssel számolt pálya is szétválik, ezért hosszú távon csak a statisztikai jellemzők jósolhatók. A rudakat sebességszintű kényszerek és Baumgarte-stabilizáció tartják hosszon, ami kis numerikus csillapítást okoz – szimplektikus, kényszereket pontosan tartó integrátorral (pl. RATTLE) ez elkerülhető lenne.' },
    { id: 'leszallas', ico: '🚀', nev: 'Holdraszállás', rovid: LAND.length + ' küldetés: tedd le a leszállóegységet a Holdon, a Marson és a Földön.', mount: mountLeszallas, levels: LAND.length,
      lead: 'Irányítsd a leszállóegységet: a hajtóművel fékezhetsz, megdöntve oldalra is gyorsíthatsz. Érj földet finoman a leszállóhelyen, mielőtt kifogy az üzemanyag!',
      figyel: ['Ha a hajtómű nem működik, a lefelé mutató sebesség egyenletesen nő – a Holdon kb. hatszor lassabban, mint a Földön.', 'A hajtómű a rakéta tengelye irányában tol: döntött rakétánál oldalra is gyorsít.', 'Lebegéshez a tolóerőnek pontosan akkorának kell lennie, mint a súlynak – közben fogy az üzemanyag.', 'A Földön a fékezést az utolsó pillanatra kell hagyni, különben elfogy az üzemanyag.'],
      figyelE: ['Becsüld meg a fékutat: állandó lassulásnál `s = v²/(2·(a_t − g))` – a Föld-küldetésben ebből kiszámolható, mikor kell begyújtani.'],
      miert: 'A rakétára két erő hat: a **gravitáció** lefelé és a hajtómű **tolóereje** a rakéta tengelye mentén. Ha a tolóerő nagyobb a súlynál, a rakéta lassul (vagy emelkedik), ha kisebb, gyorsul lefelé. A Holdon nincs levegő, ami fékezné az oldalirányú mozgást: a vízszintes sebességet csak a rakéta megdöntésével, a tolóerő oldalirányú összetevőjével lehet csökkenteni.',
      egyetem: 'A modellben a tolóerőből származó gyorsulás állandó (`a_t`), a tömeg csökkenését elhanyagoljuk. Valójában a Ciolkovszkij-egyenlet szerint `Δv = v_e·ln(m₀/m₁)`, és a fogyó tömeg miatt állandó tolóerőnél a gyorsulás nő. Állandó lassulással a fékút `s = v²/(2·(a_t − g))`; ebből adódik a „suicide burn” stratégia, amely az üzemanyag-szükségletet (a gravitációs veszteséget) minimalizálja. A becsapódási sebességet a motor érintkezési adataiból (a normális irányú közeledési sebességből) olvassuk ki; a forgást egy egyszerű sebességszabályozó végzi (a valóságban reakciós fúvókák, RCS).' }
  ];
  function modeById(id) { for (var i = 0; i < MODES.length; i++) if (MODES[i].id === id) return MODES[i]; return null; }
  function done(M) {
    if (!M.levels) return '';
    var p = prog()[M.id] || {}, n = 0, s = 0;
    Object.keys(p).forEach(function (k) { var v = p[k]; var c = typeof v === 'object' ? v.cs : v; if (c) { n++; s += c; } });
    return '<span class="jt-prog">' + n + '/' + M.levels + ' teljesítve · ' + s + '★</span>';
  }
  function explain(M) {
    var u = uni(), items = M.figyel.concat(u ? M.figyelE : []);
    return '<div class="jt-explain"><section class="card jt-ex"><h2>👀 Mit figyelj meg?</h2><ul>' + items.map(function (t) { return '<li>' + S.inline(t) + '</li>'; }).join('') + '</ul></section>' +
      '<section class="card jt-ex"><h2>💡 Miért?</h2>' + S.md(M.miert) +
      (u ? '<div class="jt-uni"><h3>🎓 A szimuláció mögött</h3>' + S.md(M.egyetem) + '</div>' : '<p class="muted jt-hint">🎓 Egyetemi szinten itt a numerikus módszerekről és a megmaradási törvényekről is olvashatsz. <button type="button" class="linkish" data-level="egyetem">Váltás egyetemi szintre</button></p>') +
      '</section></div>';
  }
  function hub(main) {
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><span>Fizikai játéktér</span></nav>' +
      '<h1>🎱 Fizikai játéktér</h1><p class="lead">Kísérletezz egy valódi fizikamotorral: testek esnek, pattannak, csúsznak, ütköznek, rugók rezegnek, hidak hajlanak és szakadnak. Minden módban megtudhatod, mit érdemes megfigyelni, és miért történik.</p>' +
      '<div class="jt-hub">' + MODES.map(function (M) {
        return '<a class="card jt-card" href="#/jatekter/' + M.id + '"><span class="jt-ico" aria-hidden="true">' + M.ico + '</span><b>' + esc(M.nev) + '</b><small>' + esc(M.rovid) + '</small>' + done(M) + '</a>';
      }).join('') + '</div>' +
      '<details class="card jt-how"><summary>⚙️ Hogyan működik a motor?</summary>' + S.md(
        'A játéktér saját, böngészőben futó **kétdimenziós fizikamotort** használ (külső program nélkül). Körök és forgó téglalapok mozognak benne gravitáció, súrlódás és ütközések hatására; a testeket rudak, kötelek, rugók és csuklók köthetik össze.\n\n' +
        '- Az idő apró, **egyforma lépésekben** halad (másodpercenként 120 lépés), így a lassú és a gyors gépen is ugyanaz történik.\n' +
        '- Ütközéskor a program kiszámolja, mekkora **lökés (impulzus)** kell, hogy a testek ne hatoljanak egymásba – ebből adódik a visszapattanás és a súrlódás is.\n' +
        '- Mivel minden lökés párban, ellentétes irányban hat, a **lendület** az ütközésekben pontosan megmarad.') +
      (uni() ? S.md('**Egyetemi kiegészítés.** Integrátor: félig implicit (szimplektikus) Euler, Δt = 1/120 s. Kényszermegoldó: szekvenciális impulzusok (projektált Gauss–Seidel) melegindítással, Baumgarte-stabilizációval a kényszereknél és ál-sebességes (split impulse) behatolás-korrekcióval az érintkezéseknél. Ütközésfelismerés: AABB-előszűrés, kör–kör, kör–téglalap, és téglalap–téglalap SAT + élvágás (legfeljebb két érintkezési pont). A motor node-ból tesztelhető (`node tools/jatekter-teszt.js`): energia- és lendületmegmaradás rugalmas ütközésben, nyugvó halmok stabilitása, inga- és rugóperiódus, hajítási hatótáv, Newton-bölcső, és minden hídszint megoldhatósága.') : '') +
      '</details>';
    return true;
  }
  function page(main, rest) {
    var id = rest && rest[0];
    if (!id) return hub(main);
    var M = modeById(id); if (!M) return false;
    var lv = rest[1] ? clamp((parseInt(rest[1], 10) || 1) - 1, 0, 50) : 0;
    main.innerHTML = '<nav class="crumbs"><a href="#/">Kezdőlap</a><span>›</span><a href="#/jatekter">Fizikai játéktér</a><span>›</span><span>' + esc(M.nev) + '</span></nav>' +
      '<h1>' + M.ico + ' ' + esc(M.nev) + '</h1><p class="lead">' + esc(M.lead) + '</p>' +
      '<div class="jt-modenav" role="navigation" aria-label="Módok">' + MODES.map(function (x) {
        return '<a class="chip' + (x === M ? ' on' : '') + '" href="#/jatekter/' + x.id + '"' + (x === M ? ' aria-current="page"' : '') + '>' + x.ico + ' ' + esc(x.nev) + '</a>';
      }).join('') + '</div>' +
      '<div class="card jt-app" id="jt-app"></div>' + explain(M);
    M.mount(main.querySelector('#jt-app'), lv);
    return true;
  }
  S.addRoute('jatekter', { title: 'Fizikai játéktér', nav: '', page: page });

  S.jatekter = {
    Motor: Motor, modes: MODES.map(function (m) { return m.id; }),
    hajSzintek: HAJ, hidSzintek: HID, landSzintek: LAND, anyagok: HMAT,
    hajElmelet: hajElmelet, newtonTest: newtonTest,
    hidRun: hidRun, hidKoltseg: hidCost,
    bridgeTest: function (i) {
      var L = HID[i], d = L.ref(), H = hidRun(L, d), c = hidCost(d.n, d.r);
      var naive = { n: hidFix(L).concat([]), r: [] }, k, idx = {};
      naive.n.forEach(function (p, j) { idx[p[0] + ',' + p[1]] = j; });
      for (k = 0; k < L.gap; k += 2) {
        [k, k + 2].forEach(function (x) { var y = deckY(x, L.gap, L.yR); if (idx[x + ',' + y] == null) { idx[x + ',' + y] = naive.n.length; naive.n.push([x, y]); } });
        naive.r.push([idx[k + ',' + deckY(k, L.gap, L.yR)], idx[(k + 2) + ',' + deckY(k + 2, L.gap, L.yR)], 'ut']);
      }
      var N = hidRun(L, naive);
      return { ok: H.state === 'siker' && H.broken === 0 && c <= L.budget && N.state !== 'siker',
        info: 'minta: ' + H.state + ', ' + H.broken + ' szakadás, max. terhelés ' + Math.round(H.maxS * 100) + ' %, költség ' + Math.round(c) + ' / ' + L.budget + ' Ft; csak útpálya: ' + N.state + ' (' + N.broken + ' szakadás)' };
    }
  };
})();
