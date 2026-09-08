'use client';

import { useState } from 'react';

const loops = [
  { id: 'B1', title: 'La oferta modera el precio', chain: 'Precio → (+) Incentivo a construir → (+, con retardo) Oferta → (−) Precio', note: 'El cierre requiere viviendas disponibles donde hay demanda. Permisos, suelo, financiación y plazos condicionan la respuesta.' },
  { id: 'R1', title: 'La inversión puede sostener más inversión', chain: 'Inversión → (+, con retardo) Valor por hora → (+) Margen para invertir → (+) Inversión', note: 'El margen no se reinvierte automáticamente. Influyen competencia, demanda, financiación y decisiones empresariales.' },
  { id: 'R2', title: 'La deuda puede alimentar el déficit', chain: 'Deuda → (+) Intereses → (+) Déficit → (+) Deuda', note: 'Deuda nominal del conjunto de las administraciones, dado el tipo efectivo y el saldo primario. No es exclusivamente deuda de pensiones; se omiten ajustes stock–flujo.' },
];

export default function SystemDiagram() {
  const [zoom, setZoom] = useState(100);
  return (
    <section id="diagrama" className="system-diagram" aria-labelledby="diagram-title">
      <div className="section-top">
        <h2 id="diagram-title">España · Anatomía de un sistema</h2>
        <p>Las conexiones, vistas en conjunto.</p>
      </div>
      <p>Un mapa de los 15 subsistemas inspirado en la composición del diagrama asociado a McChrystal. Los bucles de color proponen mecanismos simplificados; las líneas grises indican relaciones por explorar.</p>
      <div className="diagram-tools" aria-label="Ampliación del diagrama">
        {[100, 150, 200].map((value) => (
          <button key={value} type="button" aria-pressed={zoom === value} onClick={() => setZoom(value)}>{value === 100 ? 'Ajustar' : `${value} %`}</button>
        ))}
        <a href="/diagrama-espana-revisado.png" target="_blank" rel="noopener noreferrer">Abrir imagen completa ↗</a>
        <a href="/diagrama-espana-revisado.png" download>Descargar PNG ↓</a>
      </div>
      <figure>
        <div className="diagram-viewport" tabIndex={0} role="region" aria-label="Diagrama ampliable; desplázate horizontalmente al ampliar">
          <img src="/diagrama-espana-revisado.png" alt="Mapa de interdependencias de los 15 subsistemas de España. Los tres bucles destacados se describen debajo de la imagen." loading="lazy" width={1536} height={1024} style={{ width: `${zoom}%`, maxWidth: 'none', height: 'auto' }} />
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
