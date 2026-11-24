#!/usr/bin/env node
/* Tartalomellenőrző: betölti az index.html-ben felsorolt összes fájlt (az app.js kivételével,
 * mert az a böngészőt igényli), és ellenőrzi a tananyag épségét.
 * Használat:  node tools/check.js      (hibák esetén 1-es kilépési kóddal áll le) */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);
const errors = [], warns = [];
const err = (where, msg) => errors.push(where + ': ' + msg);
const warn = (where, msg) => warns.push(where + ': ' + msg);

const ctx = { console, setTimeout, clearTimeout };
ctx.window = ctx;
vm.createContext(ctx);
for (const src of scripts) {
  const file = path.join(root, src);
  if (!fs.existsSync(file)) { err(src, 'a fájl hiányzik'); continue; }
  if (src === 'js/app.js') continue;
  try { vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: src }); }
  catch (e) { err(src, 'betöltési hiba: ' + e.message); }
}
const S = ctx.STUDIE;
if (!S) { console.error('A STUDIE regiszter nem jött létre.'); process.exit(1); }

const subj = Object.fromEntries(S.subjects.map(s => [s.id, s]));
const lessonExists = ref => { const [s, l] = String(ref).split('/'); return !!(subj[s] && subj[s].lessons.some(x => x.id === l)); };
const termExists = ref => !!(S.resolveTerm && S.resolveTerm(ref));
const STAGES = new Set(S.STAGES.map(s => s[0]));

/* Egyetlen „*” a szövegben dőlt betűt sejtet, de a jelölő nem ismeri: kódrészleten kívül csak „**” használható. */
function markup(where, text) {
  if (typeof text !== 'string') return;
  const outside = text.split(/`[^`]*`/).join('').replace(/\*\*/g, '');
  if (outside.includes('*')) warn(where, 'magányos * a szövegben (a jelölő csak **félkövért** ismer)');
}
function quizCheck(where, q, exact4) {
  if (!q.q) err(where, 'hiányzó kérdésszöveg');
  if (!Array.isArray(q.options) || q.options.length < 2) return err(where, 'kevés válaszlehetőség');
  if (exact4 && q.options.length !== 4) err(where, 'nem 4 válaszlehetőség (' + q.options.length + ')');
  if (!(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length)) err(where, 'érvénytelen answer index: ' + q.answer);
  if (new Set(q.options).size !== q.options.length) warn(where, 'ismétlődő válaszlehetőség');
  if (!q.explain) warn(where, 'nincs magyarázat');
  [q.q, q.explain].concat(q.options).forEach(t => markup(where, t));
}
function widgetCheck(where, w) {
  if (!w || !S.widgets[w.type]) err(where, 'ismeretlen widget: ' + (w && w.type));
  if (w && w.type === 'gyakorlas' && w.options && w.options.kind) {
    const src = fs.readFileSync(path.join(root, 'js/widgets.js'), 'utf8');
    if (!new RegExp('\\n\\s+' + w.options.kind.replace('-', '\\-') + ': function').test(src)) err(where, 'ismeretlen gyakorló feladattípus: ' + w.options.kind);
  }
  if (w && w.type === 'hibakereses' && !S.troubles[w.options && w.options.tree]) err(where, 'ismeretlen hibakereső fa');
}

/* Tantárgyak */
const seenSubj = new Set();
let lessonCount = 0, quizCount = 0;
S.subjects.forEach(s => {
  if (seenSubj.has(s.id)) err(s.id, 'ismétlődő tantárgy-azonosító'); seenSubj.add(s.id);
  if (s.stage && !STAGES.has(s.stage)) err(s.id, 'ismeretlen szint: ' + s.stage);
  const ids = new Set();
  s.lessons.forEach(l => {
    lessonCount++;
    const w = s.id + '/' + l.id;
    if (ids.has(l.id)) err(w, 'ismétlődő lecke-azonosító'); ids.add(l.id);
    (l.sections || []).forEach((sec, i) => { ['text', 'tip', 'warn'].forEach(k => markup(w + ' szakasz ' + i, sec[k])); if (sec.widget) widgetCheck(w, sec.widget); });
    (l.widgets || []).forEach(x => widgetCheck(w, x));
    (l.models || []).forEach(m => { if (!S.models[m]) err(w, 'ismeretlen modell: ' + m); });
    (l.terms || []).forEach(t => { if (!termExists(t)) err(w, 'ismeretlen szakszó: ' + t); });
    (l.quiz || []).forEach((q, i) => { quizCount++; quizCheck(w + ' kvíz ' + (i + 1), q, false); });
  });
});

/* Kérdésbank */
let bankCount = 0;
Object.keys(S.bank || {}).forEach(g => {
  const isCourse = S.courseById && S.courseById(g);
  if (!subj[g] && !isCourse && g !== 'felfedezo') err('kérdésbank ' + g, 'ismeretlen tantárgy/kurzus');
  Object.keys(S.bank[g]).forEach(t => {
    if (subj[g] && !subj[g].lessons.some(l => l.id === t)) err('kérdésbank ' + g + '/' + t, 'ismeretlen lecke');
    S.bank[g][t].forEach((q, i) => { bankCount++; quizCheck('kérdésbank ' + g + '/' + t + ' #' + (i + 1), q, true); });
  });
});

/* Modellek */
Object.values(S.models).forEach(m => {
  const ids = new Set();
  m.parts.forEach(p => {
    const w = 'modell ' + m.id + '.' + p.id;
    if (ids.has(p.id)) err(w, 'ismétlődő alkatrész-azonosító'); ids.add(p.id);
    if (p.link && !S.models[p.link]) err(w, 'ismeretlen link: ' + p.link);
    if (p.lesson && !lessonExists(p.lesson)) err(w, 'ismeretlen lecke: ' + p.lesson);
    (p.terms || []).forEach(t => { if (!termExists(t)) err(w, 'ismeretlen szakszó: ' + t); });
    if (!p.what) warn(w, 'nincs „Mi ez?” szöveg');
    ['what', 'madeOf', 'how', 'uni', 'fact'].forEach(k => markup(w, p[k]));
  });
  (m.steps || []).forEach((st, i) => (st.parts || []).forEach(pid => { if (!ids.has(pid)) err('modell ' + m.id + ' lépés ' + (i + 1), 'ismeretlen alkatrész: ' + pid); }));
  ((m.uni || {}).terms || []).forEach(t => { if (!termExists(t)) err('modell ' + m.id, 'ismeretlen szakszó: ' + t); });
  ((m.uni || {}).widgets || []).forEach(x => widgetCheck('modell ' + m.id, x));
  (m.quiz || []).forEach((q, i) => quizCheck('modell ' + m.id + ' kvíz ' + (i + 1), q, false));
});

/* Egyetemi kurzusok */
let termCount = 0;
(S.courses || []).forEach(c => {
  const ids = new Set(), fids = new Set((c.formulas || []).map(f => f.id)), topics = new Set((c.topics || []).map(t => t.id));
  c.terms.forEach(t => {
    termCount++;
    const w = 'kurzus ' + c.id + '/' + t.id;
    if (ids.has(t.id)) err(w, 'ismétlődő szakszó-azonosító'); ids.add(t.id);
    if (!topics.has(t.topic)) err(w, 'ismeretlen témakör: ' + t.topic);
    if (!t.en) warn(w, 'nincs angol megfelelő');
    (t.formulas || []).forEach(f => { if (!fids.has(f)) err(w, 'ismeretlen képlet: ' + f); });
    (t.models || []).forEach(m => { if (!S.models[m]) err(w, 'ismeretlen modell: ' + m); });
    (t.prereq || []).forEach(r => {
      const ok = r.startsWith('lecke:') ? lessonExists(r.slice(6)) : r.startsWith('modell:') ? !!S.models[r.slice(7)] : termExists(r);
      if (!ok) err(w, 'ismeretlen előismeret: ' + r);
    });
    if (t.widget) widgetCheck(w, t.widget);
    ['short', 'text', 'example', 'pitfall'].forEach(k => markup(w, t[k]));
  });
  c.terms.forEach(t => (t.related || []).forEach(r => { if (!ids.has(r)) err('kurzus ' + c.id + '/' + t.id, 'ismeretlen kapcsolódó szakszó: ' + r); }));
});

/* Hibakereső fák */
Object.values(S.troubles || {}).forEach(tr => {
  const w = 'hibakereső ' + tr.id;
  if (!tr.nodes[tr.start]) err(w, 'nem létező kezdőcsomópont');
  const reach = new Set(), stack = [tr.start];
  while (stack.length) {
    const id = stack.pop(); if (reach.has(id) || !tr.nodes[id]) continue; reach.add(id);
    (tr.nodes[id].answers || []).forEach(a => { if (!tr.nodes[a.next]) err(w + '.' + id, 'nem létező következő lépés: ' + a.next); else stack.push(a.next); });
  }
  Object.keys(tr.nodes).forEach(id => { if (!reach.has(id)) warn(w, 'elérhetetlen csomópont: ' + id); });
  (tr.lessons || []).forEach(l => { if (!lessonExists(l)) err(w, 'ismeretlen lecke: ' + l); });
});

console.log('Tantárgyak: ' + S.subjects.length + ', leckék: ' + lessonCount + ', leckekvíz-kérdések: ' + quizCount + ', kérdésbank: ' + bankCount);
console.log('Modellek: ' + Object.keys(S.models).length + ', egyetemi kurzusok: ' + (S.courses || []).length + ', szakszavak: ' + termCount + ', hibakeresők: ' + Object.keys(S.troubles || {}).length);
if (warns.length) console.log('\nFigyelmeztetések (' + warns.length + '):\n  ' + warns.slice(0, 40).join('\n  ') + (warns.length > 40 ? '\n  …' : ''));
if (errors.length) { console.log('\nHIBÁK (' + errors.length + '):\n  ' + errors.join('\n  ')); process.exit(1); }
console.log('\n✔ Nincs hiba.');
