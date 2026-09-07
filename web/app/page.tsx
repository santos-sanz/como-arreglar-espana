'use client';

import { useState, useRef } from 'react';
import subsystemData from './subsystems.json';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import sources from './sources.json';
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Network,
  Home,
  Sprout,
  BriefcaseBusiness,
  GraduationCap,
  Landmark,
  Zap,
  Droplets,
  HeartPulse,
  HandHeart,
  Scale,
  TrainFront,
  Compass,
  FlaskConical,
  Wheat,
  X,
  Plus,
} from 'lucide-react';

const icons = {
  Home,
  Sprout,
  BriefcaseBusiness,
  GraduationCap,
  Landmark,
  Zap,
  Droplets,
  HeartPulse,
  HandHeart,
  Scale,
  TrainFront,
  Compass,
  FlaskConical,
  Wheat,
};
const topics = subsystemData.map((t) => ({
  ...t,
  icon: icons[t.icon as keyof typeof icons],
}));
const links = topics.flatMap((t, a) =>
  t.related
    .map((id) => [a, topics.findIndex((x) => x.id === id)])
    .filter(([from, to]) => from < to),
);

export default function Page() {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const topic = topics[selected];
  function openTopic(i: number, element?: HTMLElement) {
    if (!expanded && element) opener.current = element;
    setSelected(i);
    setExpanded(true);
    panelRef.current?.scrollTo({ top: 0 });
  }
  const related = [
    ...new Set(
      links
        .filter(([a, b]) => a === selected || b === selected)
        .map(([a, b]) => (a === selected ? b : a)),
    ),
  ];
  return (
    <main>
      <a className="skip" href="#mapa">
        Saltar al mapa
      </a>
      <header className="masthead">
        <a className="brand" href="#">
          <span className="spanish-mark" aria-label="España" />
          <span>
            ESPAÑA<span className="brand-light"> / EN SISTEMA</span>
          </span>
        </a>
        <nav aria-label="Principal">
          <a href="#mapa">El mapa</a>
          <a href="#evidencia">La evidencia</a>
          <a href="#palancas">Qué mover</a>
        </nav>
        <a
          className="repo"
          href="https://github.com/santos-sanz/como-arreglar-espana"
        >
          Análisis abierto <ArrowUpRight size={16} />
        </a>
      </header>
      <section className="intro">
        <p className="eyebrow">
          <span className="status-dot" /> ESPAÑA, PIEZA A PIEZA{' '}
          <span className="edition">EDICIÓN 07.09.2026</span>
        </p>
        <h1>
          Cómo arreglar España<span className="lime">.</span>
        </h1>
        <p className="lede">
          Entender lo que conecta los problemas es el primer paso para
          cambiarlos.
        </p>
      </section>
      <section id="mapa" className="map-section">
        <div className="section-top">
          <h2>
            <span>01</span> Un mosaico de subsistemas
          </h2>
          <p>Pulsa una pieza para abrir su análisis completo.</p>
        </div>
        <div className="explorer">
          <div className="map">
            <div className="map-caption">
              MAPA DE RELACIONES{' '}
              <span>
                {topics.length} ÁMBITOS · {sources.length} FUENTES
              </span>
            </div>
            <svg
              viewBox="0 0 1000 620"
              aria-hidden="true"
              preserveAspectRatio="none"
            >
              {links.map(([a, b]) => (
                <path
                  key={`${a}-${b}`}
                  className={
                    a === selected || b === selected ? 'edge active' : 'edge'
                  }
                  d={`M ${topics[a].x * 10} ${topics[a].y * 6.2} Q 500 310 ${topics[b].x * 10} ${topics[b].y * 6.2}`}
                />
              ))}
            </svg>
            {topics.map((t, i) => (
              <Button
                variant="ghost"
                key={t.id}
                className={`node ${selected === i ? 'selected' : ''}`}
                style={
                  {
                    left: `${t.x}%`,
                    top: `${t.y}%`,
                    '--node-color': t.color,
                  } as React.CSSProperties
                }
                aria-pressed={selected === i}
                aria-haspopup="dialog"
                aria-label={`Abrir análisis de ${t.title}`}
                onClick={(event) => openTopic(i, event.currentTarget)}
              >
                <span className="node-icon">
                  <t.icon size={25} />
                </span>
                <span>{t.title}</span>
                <Plus size={14} className="node-expand" aria-hidden="true" />
              </Button>
            ))}
            <p className="map-note">
              Las líneas muestran conexiones; no estiman el tamaño del efecto.
            </p>
          </div>
          <article
            className="detail"
            style={{ '--node-color': topic.color } as React.CSSProperties}
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="detail-title">
              <topic.icon size={22} />
              <h3>{topic.title}</h3>
              <span>
                {String(selected + 1).padStart(2, '0')}/{topics.length}
              </span>
            </div>
            <strong className="metric">{topic.value}</strong>
            <p className="metric-label">{topic.label}</p>
            <a className="source-inline" href={topic.url}>
              {topic.source} <ArrowUpRight size={14} />
            </a>
            <p className="detail-text">{topic.text}</p>
            <Button
              className="expand-topic"
              onClick={(event) => openTopic(selected, event.currentTarget)}
            >
              Abrir análisis completo <Plus size={17} />
            </Button>
            <div className="lever">
              <span>UNA PALANCA POSIBLE</span>
              <p>{topic.action}</p>
            </div>
            <p className="caution">{topic.caution}</p>
            <div className="related">
              <span>CONECTA CON</span>
              {related.map((i) => (
                <Button
                  variant="outline"
                  className="related-button"
                  key={i}
                  onClick={(event) => openTopic(i, event.currentTarget)}
                >
                  {topics[i].title}
                  <ArrowUpRight size={13} />
                </Button>
              ))}
            </div>
            <a className="text-link" href="#evidencia">
              Ver qué sostiene el análisis <ArrowDown size={16} />
            </a>
          </article>
        </div>
      </section>
      <section id="evidencia" className="evidence">
        <div className="section-top">
          <h2>
            <span>02</span> Primero, la evidencia
          </h2>
          <p>Datos, hipótesis y propuestas tienen distinto peso.</p>
        </div>
        <div className="evidence-cards">
          <article>
            <span className="tag">DATO OBSERVADO · 2024</span>
            <h3>Salir de casa, más tarde</h3>
            <div className="bar-row">
              <span>España</span>
              <div style={{ width: '100%' }} />
              <strong>30,0</strong>
            </div>
            <div className="bar-row muted">
              <span>UE</span>
              <div style={{ width: '87.333%' }} />
              <strong>26,2</strong>
            </div>
            <p>
              3,8 años de diferencia en la edad media estimada de salida del
              hogar familiar.
            </p>
            <a href={topics[0].url}>
              Eurostat · escala desde cero <ArrowUpRight size={14} />
            </a>
          </article>
          <article>
            <span className="tag">ESCENARIO · AIReF 2026</span>
            <h3>El futuro no está escrito</h3>
            <div className="big-number">
              123<span>% del PIB</span>
            </div>
            <p>
              Deuda en 2050 bajo políticas constantes. La estimación de 2025 era
              129 %. Cambian los supuestos, cambia la trayectoria.
            </p>
            <a href={topics[3].url}>
              Leer las condiciones <ArrowUpRight size={14} />
            </a>
          </article>
          <article>
            <span className="tag">CORRECCIÓN DEL ANÁLISIS</span>
            <h3>La información ya existe</h3>
            <div className="big-word">
              QEDU <ArrowUpRight size={38} />
            </div>
            <p>
              España sí publica información de inserción por titulación. El reto
              es mejorar su cobertura, actualización y uso.
            </p>
            <a href="https://www.ciencia.gob.es/qedu/AyudaQEDU.html">
              Consultar la metodología <ArrowUpRight size={14} />
            </a>
          </article>
        </div>
      </section>
      <section className="nuance" aria-labelledby="matices-title">
        <div className="nuance-heading">
          <span className="tag">CUANDO LA EVIDENCIA MATIZA EL TITULAR</span>
          <h2 id="matices-title">
            Una política.
            <br />
            Distintos resultados.
          </h2>
          <p>
            El control del alquiler protege a algunos hogares, pero sus efectos
            sobre la oferta dependen del diseño y del tiempo.
          </p>
        </div>
        <div className="study">
          <span>SAN FRANCISCO · AER 2019</span>
          <h3>Protección y retirada de oferta</h3>
          <p>
            El estudio encuentra menor desplazamiento de inquilinos y una
            reducción de la oferta entre los propietarios afectados.
          </p>
          <a href="https://www.aeaweb.org/articles?id=10.1257%2Faer.20181289">
            Diamond, McQuade y Qian <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="study">
          <span>CATALUÑA 2020 · IEB, VERSIÓN 2023</span>
          <h3>Rentas menores, sin contracción detectada</h3>
          <p>
            Encuentra una bajada de rentas sin evidencia de reducción de oferta
            en la ventana analizada. No demuestra ausencia de efectos a largo
            plazo.
          </p>
          <a href="https://ieb.ub.edu/wp-content/uploads/2022/02/Doc2022-02.pdf">
            Jofre-Monseny, Martínez-Mazza y Segú <ArrowUpRight size={15} />
          </a>
        </div>
        <p className="nuance-foot">
          Estos estudios no evalúan el mismo régimen ni predicen automáticamente
          los efectos de las políticas de 2024–2026.
        </p>
      </section>
      <section id="palancas" className="actions">
        <div className="section-top">
          <h2>
            <span>03</span> Qué mover primero
          </h2>
          <p>Una secuencia propuesta, no una promesa de resultados.</p>
        </div>
        <div className="timeline">
          {[
            [
              '0–2',
              'Desbloquear',
              'Medir licencias, mejorar QEDU y evaluar formación e integración.',
            ],
            [
              '2–5',
              'Construir capacidad',
              'Vivienda asequible, redes, almacenamiento y formación en empresa.',
            ],
            [
              '5–15',
              'Comprobar resultados',
              'Evaluar acceso a vivienda, productividad y sostenibilidad por generación.',
            ],
          ].map(([n, t, d]) => (
            <article key={n}>
              <span className="years">
                {n}
                <small>AÑOS</small>
              </span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
        <a
          className="read-report"
          href="https://github.com/santos-sanz/como-arreglar-espana#readme"
        >
          Leer el análisis completo y sus limitaciones <ArrowRight size={20} />
        </a>
      </section>
      <section className="more-evidence" id="fuentes">
        <div className="section-top">
          <h2>
            <span>04</span> Profundiza sin perderte
          </h2>
          <p>Qué falta en los titulares y dónde comprobarlo.</p>
        </div>
        <Accordion className="research-accordion">
          <AccordionItem>
            <AccordionTrigger>
              Quién gana, quién paga y quién se queda atrás
            </AccordionTrigger>
            <AccordionContent>
              <p>
                La media nacional no cuenta toda la historia. La ECV 2025 sitúa
                el riesgo de pobreza o exclusión social (AROPE) en el 25,7 %.
                Ese indicador combina tres dimensiones y no equivale solo a
                pobreza monetaria.
              </p>
              <p>
                Propuesta: evaluar cada reforma por renta, generación y
                territorio, incluyendo acceso a cuidados y coste de la
                transición.
              </p>
              <a href="https://www.ine.es/dyngs/Prensa/ECV2025.htm">
                INE · Condiciones de vida 2025 ↗
              </a>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>
              Cómo saber si una medida funciona
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Antes de intervenir: definir destinatarios, situación inicial,
                coste completo, resultado e intervalo de revisión. Después:
                comparar con una evolución alternativa razonable.
              </p>
              <p>
                En vivienda, medir entregas ocupadas y esfuerzo de alquiler; en
                formación, aprendizaje y empleo a 6, 12 y 24 meses; en agua,
                extracción total por cuenca. Una mejora del promedio puede
                ocultar a los perjudicados.
              </p>
              <a href="https://github.com/santos-sanz/como-arreglar-espana/blob/main/docs/analisis-ampliado.md">
                Cartera de diez intervenciones y evaluación ↗
              </a>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>
              Qué puede decir este mapa y qué no
            </AccordionTrigger>
            <AccordionContent>
              <p>
                El mapa reúne una selección de 15 subsistemas, no una
                clasificación exhaustiva. Es una explicación cualitativa. Sus
                conexiones son hipótesis informadas; no un simulador calibrado.
                La posición y el color no representan importancia ni magnitud.
              </p>
              <p>
                Los años de la secuencia son horizontes propuestos. No se han
                calculado presupuestos ni efectos agregados. Las observaciones
                conservan su año y los escenarios dependen de sus supuestos.
              </p>
              <a href="https://github.com/santos-sanz/como-arreglar-espana/blob/main/docs/crosscheck.md">
                Ver las correcciones y verificaciones pendientes ↗
              </a>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>
              Las {sources.length} fuentes del análisis, una a una
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Consulta: 7 de septiembre de 2026. Datos oficiales, estudios
                originales y marcos conceptuales. Las propuestas editoriales se
                distinguen de sus resultados.
              </p>
              <ol className="sources-list">
                {sources.map((s) => (
                  <li key={s.id}>
                    <a href={s.url}>
                      <span>{s.id}</span>
                      {s.title}
                      <ArrowUpRight size={15} />
                    </a>
                    <p>{s.note}</p>
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <Dialog open={expanded} onOpenChange={setExpanded}>
        <DialogContent
          className="subsystem-modal"
          showCloseButton={false}
          finalFocus={() => opener.current}
        >
          <div className="modal-top">
            <span className="spanish-mark" aria-hidden="true" />
            <span>
              ESPAÑA / {String(selected + 1).padStart(2, '0')} DE{' '}
              {topics.length}
            </span>
            <DialogClose
              render={
                <Button
                  variant="ghost"
                  className="close-topic"
                  aria-label="Cerrar análisis"
                />
              }
            >
              <X size={21} />
              <span>Cerrar</span>
            </DialogClose>
          </div>
          <div className="modal-scroll" ref={panelRef}>
            <div className="modal-heading">
              <topic.icon size={36} />
              <div>
                <p className="eyebrow">
                  ANÁLISIS DEL SUBSISTEMA{topic.isNew ? ' · NUEVO' : ''}
                </p>
                <DialogTitle className="modal-title">{topic.title}</DialogTitle>
              </div>
            </div>
            <DialogDescription className="modal-description">
              {topic.text}
            </DialogDescription>
            <div className="modal-fact">
              <strong>{topic.value}</strong>
              <div>
                <p>{topic.label}</p>
                <a href={topic.url}>{topic.source} ↗</a>
              </div>
            </div>
            <section>
              <h3>Qué ocurre y por qué importa</h3>
              {topic.diagnosis.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
            <section className="causal-section">
              <h3>El mecanismo, paso a paso</h3>
              <p className="section-note">
                Hipótesis de conexión; no una estimación causal. La última pieza
                no cierra necesariamente un bucle.
              </p>
              <ol className="causal-chain">
                {topic.chain.map((step, i) => (
                  <li key={step}>
                    <span>{i + 1}</span>
                    {step}
                    {i < topic.chain.length - 1 && (
                      <ArrowRight aria-hidden="true" size={18} />
                    )}
                  </li>
                ))}
              </ol>
            </section>
            <div className="modal-columns">
              <section>
                <h3>Qué se podría cambiar</h3>
                <p className="section-note">Propuestas del análisis</p>
                <ul>
                  {topic.measures.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>Qué podría salir mal</h3>
                <ul>
                  {topic.risks.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </section>
            </div>
            <section className="measurement">
              <h3>Cómo comprobar si mejora</h3>
              <ul>
                {topic.indicators.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <dl>
                <div>
                  <dt>Coordinación</dt>
                  <dd>{topic.actors}</dd>
                </div>
                <div>
                  <dt>Horizonte propuesto</dt>
                  <dd>{topic.horizon}</dd>
                </div>
                <div>
                  <dt>Coste a evaluar</dt>
                  <dd>{topic.cost}</dd>
                </div>
              </dl>
            </section>
            <section>
              <h3>Con qué otras piezas se conecta</h3>
              <div className="modal-related">
                {topic.related.map((id) => {
                  const i = topics.findIndex((t) => t.id === id);
                  return (
                    <Button
                      key={id}
                      variant="outline"
                      onClick={() => openTopic(i)}
                    >
                      {topics[i].title}
                      <ArrowUpRight size={15} />
                    </Button>
                  );
                })}
              </div>
            </section>
            <section className="modal-sources">
              <h3>Evidencia y límites</h3>
              <p>{topic.caution}</p>
              <ol>
                {topic.sourceIds.map((id) => {
                  const source = sources.find((s) => s.id === id)!;
                  return (
                    <li key={id}>
                      <a href={source.url}>
                        {source.id} · {source.title} ↗
                      </a>
                      <p>{source.note}</p>
                    </li>
                  );
                })}
              </ol>
            </section>
          </div>
        </DialogContent>
      </Dialog>
      <footer>
        <span>ESPAÑA / EN SISTEMA</span>
        <p>
          Análisis independiente · Evidencia consultada el 7 de septiembre de
          2026.
        </p>
        <a href="https://github.com/santos-sanz/como-arreglar-espana">
          Fuentes y cambios <ArrowUpRight size={15} />
        </a>
      </footer>
    </main>
  );
}
