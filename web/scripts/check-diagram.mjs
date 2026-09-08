import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { groups, nodes, edges, edgeGeometry } from '../app/diagram-data.ts';
const subsystems=JSON.parse(readFileSync(new URL('../app/subsystems.json',import.meta.url)));
assert.deepEqual(groups.map(g=>g.id).sort(),subsystems.map(s=>s.id).sort());
assert.equal(new Set(nodes.map(n=>n.id)).size,nodes.length);
assert.equal(new Set(edges.map(e=>e.id)).size,edges.length);
for(const e of edges){
 assert(nodes.some(n=>n.id===e.from)&&nodes.some(n=>n.id===e.to));
 assert.notEqual(e.from,e.to);
 const geometry=edgeGeometry(e);
 assert(Number.isFinite(geometry.x)&&Number.isFinite(geometry.y));
 if(!e.loop) assert(!e.sign&&!e.delay,'Hypotheses must not imply a signed mechanism');
}
for(const [id,negativeCount] of [['B1',1],['R1',0],['R2',0]]){
 const loop=edges.filter(e=>e.loop===id);
 assert.equal(loop.length,3);
 assert.equal(loop.filter(e=>e.sign==='−').length,negativeCount);
 for(const e of loop) assert.equal(loop.filter(next=>next.from===e.to).length,1,'Loop must close');
}
assert(edges.find(e=>e.from==='vivienda-1'&&e.to==='vivienda-2').delay);
assert(edges.find(e=>e.from==='productividad-0'&&e.to==='productividad-1').delay);
console.log(`${groups.length} subsystems, ${nodes.length} variables, ${edges.length} unique relationships; signed loops close correctly.`);
