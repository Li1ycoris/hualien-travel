import fs from 'node:fs';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
export const root = fileURLToPath(new URL('../', import.meta.url));
export const places = JSON.parse(fs.readFileSync(root + 'data/places.json', 'utf8'));
assert(Array.isArray(places) && places.length, 'Places must be a nonempty array');
const ids = new Set();
for (const p of places) {
  assert(/^[a-z][a-z0-9-]*$/.test(p.id) && !ids.has(p.id), 'Invalid or duplicate id');
  ids.add(p.id);
  assert(['遊', '食', '住', '行'].includes(p.cat), 'Invalid category');
  for (const key of ['name','sub','price','priceNote','hours','hoursNote','address','feature','family','note','source']) assert(typeof p[key] === 'string' && p[key].trim(), `Missing ${key}: ${p.id}`);
  assert(Array.isArray(p.coords) && p.coords.length === 2 && p.coords.every(Number.isFinite), 'Invalid coordinates');
  assert(Math.abs(p.coords[0]) <= 90 && Math.abs(p.coords[1]) <= 180, 'Out of bounds coordinates');
  for (const key of ['source', 'source2']) if (p[key]) { const url = new URL(p[key]); assert(url.protocol === 'https:', 'Source must be HTTPS'); }
  assert(!p.status, 'Personal booking status must not be published');
}
console.log(`Validated ${places.length} public location records`);
