#!/usr/bin/env node
/* Egyetlen, önálló HTML fájlt készít az egész alkalmazásból: dist/tudasmuhely-offline.html
 * Ezt elég átadni a diákoknak (pendrive, e-mail): dupla kattintással megnyílik, internet nélkül.
 * Használat:  node tools/build-single.js */
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (_, href) =>
  '<style>\n' + fs.readFileSync(path.join(root, href), 'utf8') + '\n</style>');
html = html.replace(/<script src="([^"]+)"><\/script>/g, (_, src) => {
  if (!fs.existsSync(path.join(root, src))) { console.warn('Hiányzó fájl, kihagyva: ' + src); return ''; }
  const code = fs.readFileSync(path.join(root, src), 'utf8').replace(/<\/script/gi, '<\\/script');
  return '<script>/* ' + src + ' */\n' + code + '\n</script>';
});
// Egyfájlos módban nincs manifest és service worker; az ikon beágyazva.
html = html.replace(/\s*<link rel="manifest"[^>]*>/, '');
const icon = fs.readFileSync(path.join(root, 'icons/icon.svg'), 'utf8');
html = html.replace(/<link rel="icon" href="icons\/icon.svg"[^>]*>/,
  '<link rel="icon" href="data:image/svg+xml,' + encodeURIComponent(icon) + '">');

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
const out = path.join(root, 'dist', 'tudasmuhely-offline.html');
fs.writeFileSync(out, html);
console.log('Kész: ' + path.relative(root, out) + ' (' + Math.round(fs.statSync(out).size / 1024) + ' KB)');
