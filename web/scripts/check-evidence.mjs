import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url)));
const sources = read('../app/sources.json');
const topics = read('../app/subsystems.json');
const sourceIds = new Set(sources.map(s => s.id));
const topicIds = new Set(topics.map(t => t.id));
assert.equal(sourceIds.size, sources.length, 'Duplicate source IDs');
assert.equal(topicIds.size, topics.length, 'Duplicate subsystem IDs');
for (const s of sources) {
  assert.match(s.id, /^S\d{2}$/);
  assert.ok(s.title && s.note, `Missing context: ${s.id}`);
  assert.equal(new URL(s.url).protocol, 'https:');
}
for (const t of topics) {
  for (const key of ['diagnosis', 'measures', 'risks', 'indicators', 'sourceIds', 'related']) {
    assert.ok(t[key]?.length, `${t.id}: incomplete ${key}`);
  }
  assert.ok(t.actors && t.horizon && t.cost && t.caution, `${t.id}: missing limitations`);
  assert.ok(sources.some(s => s.url === t.url), `${t.id}: headline source absent from registry`);
  assert.ok(t.sourceIds.every(id => sourceIds.has(id)), `${t.id}: unresolved source`);
  assert.ok(t.related.every(id => topicIds.has(id) && id !== t.id), `${t.id}: invalid connection`);
  for (const id of t.related) {
    assert.ok(topics.find(x => x.id === id).related.includes(t.id), `${t.id}/${id}: asymmetric connection`);
  }
}
// Every subsystem must be reachable, so the map cannot silently hide isolated areas.
const reached = new Set();
const visit = id => { if (reached.has(id)) return; reached.add(id); topics.find(t => t.id === id).related.forEach(visit); };
visit(topics[0].id);
assert.equal(reached.size, topics.length, 'Disconnected subsystem map');
console.log(`${topics.length} complete subsystems; ${sources.length} unique sources; all references resolve and graph is connected.`);

const community = read('../app/community.json');
assert.equal(new Set(community.map(r => r.id)).size, community.length, 'Duplicate reading IDs');
assert.equal(new Set(community.map(r => r.url)).size, community.length, 'Duplicate readings');
for (const reading of community) {
  for (const field of ['title', 'author', 'community', 'date', 'kind', 'summary', 'application', 'limit']) {
    assert.ok(reading[field]?.trim(), `${reading.id}: missing ${field}`);
  }
  assert.match(reading.date, /^\d{4}-\d{2}(-\d{2})?$/);
  assert.equal(new URL(reading.url).protocol, 'https:');
  assert.ok(reading.topics.length && reading.topics.every(id => topicIds.has(id)), `${reading.id}: invalid subsystem`);
}
console.log(`${community.length} community readings with attribution, scope and valid subsystem links.`);
