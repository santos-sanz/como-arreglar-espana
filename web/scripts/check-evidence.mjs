import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const sources = JSON.parse(readFileSync(new URL('../app/sources.json', import.meta.url)));
assert.equal(sources.length, 25, 'Source registry changed: review the advertised coverage');
assert.equal(new Set(sources.map(s => s.id)).size, sources.length, 'Duplicate source IDs');
for (const source of sources) {
  assert.match(source.id, /^S\d{2}$/);
  assert.ok(source.title && source.note, `Missing context for ${source.id}`);
  assert.equal(new URL(source.url).protocol, 'https:');
}
const page = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');
assert.equal((page.match(/aria-pressed=/g) || []).length, 1, 'Topic controls must expose selected state');
assert.ok(page.includes('aria-live="polite"'), 'Topic changes must be announced');
assert.ok(page.includes('escenario AIReF 2026'), 'Fiscal projection must keep its vintage');
assert.ok(page.includes('2024 fue 56,8') || page.includes('56,8 % de 2024'), 'Renewable record qualification missing');
console.log(`Evidence registry: ${sources.length} unique HTTPS sources; key qualifications and accessible state preserved.`);
