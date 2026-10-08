import fs from 'node:fs';
import {root, places} from './check.mjs';
fs.rmSync(root + 'dist', {recursive:true, force:true});
fs.cpSync(root + 'public', root + 'dist', {recursive:true});
fs.writeFileSync(root + 'dist/data.js', 'const places = ' + JSON.stringify(places).replaceAll('<', '\\u003c') + ';\n');
fs.writeFileSync(root + 'dist/.nojekyll', '');
console.log('Built dist/ for static hosting');
