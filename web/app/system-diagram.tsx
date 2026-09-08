'use client';

import { useMemo, useState } from 'react';
import { edges, groups, nodes } from './diagram-data';

const loops = [
  { id: 'B1', title: 'La oferta modera el precio', chain: 'Precio → (+) Incentivo a construir → (+, con retardo) Oferta → (−) Precio', note: 'El cierre requiere viviendas disponibles donde hay demanda. Permisos, suelo, financiación y plazos condicionan la respuesta.' },
  { id: 'R1', title: 'La inversión puede sostener más inversión', chain: 'Inversión → (+, con retardo) Valor por hora → (+) Margen para invertir → (+) Inversión', note: 'El margen no se reinvierte automáticamente. Influyen competencia, demanda, financiación y decisiones empresariales.' },
  { id: 'R2', title: 'La deuda puede alimentar el déficit', chain: 'Deuda → (+) Intereses → (+) Déficit → (+) Deuda', note: 'Deuda nominal del conjunto de las administraciones, dado el tipo efectivo y el saldo primario. No es exclusivamente deuda de pensiones; se omiten ajustes stock–flujo.' },
];

export default function SystemDiagram() {
  const [zoom, setZoom] = useState(100);
  const [active, setActive] = useState<string | null>(null);
  const visibleEdges = useMemo(() => edges.filter(e => !active || e.from.startsWith(`${active}-`) || e.to.startsWith(`${active}-`)), [active]);
  return (
    <section id="diagrama" className="system-diagram" aria-labelledby="diagram-title">
      <div className="section-top">
        <h2 id="diagram-title">España · Anatomía de un sistema</h2>
        <p>Las conexiones, vistas en conjunto.</p>
      </div>
      <p>Un mapa de los 15 subsistemas inspirado en la composición del diagrama asociado a McChrystal. Los bucles de color proponen mecanismos simplificados; las líneas grises indican relaciones por explorar.</p>
      <div className="diagram-tools" aria-label="Ampliación del diagrama">
        <button type="button" onClick={() => setActive(null)} aria-pressed={!active}>Mostrar todo</button>
        {[100, 150, 200].map((value) => (
          <button key={value} type="button" aria-pressed={zoom === value} onClick={() => setZoom(value)}>{value === 100 ? 'Ajustar' : `${value} %`}</button>
        ))}
        <span className="diagram-count">{nodes.length} nodos · {edges.length} relaciones</span>
      </div>
      <figure>
        <div className="diagram-native-viewport" tabIndex={0} role="region" aria-label="Diagrama nativo ampliable; pulsa un subsistema para resaltar sus conexiones">
          <svg className="native-diagram" viewBox="0 0 1650 1240" role="img" aria-labelledby="diagram-title diagram-desc" style={{ width: `${zoom}%`, maxWidth: 'none' }}>
            <desc id="diagram-desc">Red densa de interdependencias entre quince subsistemas de España, con tres bucles dirigidos de vivienda, productividad y deuda.</desc>
            <defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" /></marker></defs>
            <rect width="1650" height="1240" className="diagram-paper" />
            <path d="M80 34H1570" className="diagram-flag" /><path d="M80 48H1570" className="diagram-flag gold" />
            <text x="825" y="88" textAnchor="middle" className="diagram-kicker">MAPA DE INTERDEPENDENCIAS</text>
            <text x="825" y="128" textAnchor="middle" className="diagram-heading">ESPAÑA · ANATOMÍA DE UN SISTEMA</text>
            <text x="825" y="158" textAnchor="middle" className="diagram-subheading">15 subsistemas, decisiones conectadas</text>
            {groups.map(g => <g key={g.id} className={`diagram-group ${active && active !== g.id ? 'dimmed' : ''}`} onClick={() => setActive(active === g.id ? null : g.id)}><ellipse cx={g.x} cy={g.y + 38} rx="190" ry="90" fill={g.color} fillOpacity=".08" stroke={g.color} /><text x={g.x} y={g.y - 6} textAnchor="middle" className="diagram-group-title">{g.title.toUpperCase()}</text></g>)}
            <g className="diagram-edges">{visibleEdges.map((e, i) => { const from = nodes.find(n => n.id === e.from)!; const to = nodes.find(n => n.id === e.to)!; const d = `M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${(from.y + to.y) / 2 + (i % 2 ? 22 : -22)} ${to.x} ${to.y}`; return <path key={`${e.from}-${e.to}-${i}`} d={d} className={e.loop ? `loop-edge ${e.loop}` : 'network-edge'} markerEnd={e.loop ? 'url(#arrow)' : undefined}><title>{from.label} → {to.label}{e.sign ? ` (${e.sign})` : ''}</title></path>; })}</g>
            <g className="diagram-nodes">{nodes.map(n => { const g = groups.find(x => x.id === n.group)!; return <g key={n.id} className={`diagram-node ${active && active !== n.group ? 'dimmed' : ''}`}><circle cx={n.x} cy={n.y} r="9" fill={g.color} /><text x={n.x + 15} y={n.y + 5}>{n.label}</text></g>; })}</g>
            <text x="825" y="1190" textAnchor="middle" className="diagram-legend">+ misma dirección · − dirección contraria · // retardo · R refuerzo · B equilibrio · líneas grises: relación cualitativa</text>
          </svg>
        </div>
        <figcaption>Esquema cualitativo, sin magnitudes estimadas. Una conexión no prueba causalidad. R: refuerzo · B: equilibrio · +: misma dirección · −: dirección contraria · //: retardo.</figcaption>
      </figure>
      <div className="diagram-loops">
        {loops.map((loop) => (
          <article key={loop.id}>
            <h3>{loop.id} · {loop.title}</h3>
            <p className="loop-chain">{loop.chain}</p>
            <p>{loop.note}</p>
          </article>
        ))}
      </div>
      <p className="diagram-reference">La lectura de las flechas se desarrolla en las secuencias anteriores. <a href="https://github.com/santos-sanz/como-arreglar-espana/blob/main/docs/revision-diagrama.md">Revisión y límites del diagrama ↗</a> · <a href="#mapa">Explorar las fichas de los 15 subsistemas ↑</a></p>
    </section>
  );
}
