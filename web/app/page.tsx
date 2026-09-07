'use client';

import { useState } from 'react';
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
} from 'lucide-react';

const topics = [
  {
    id: 'vivienda',
    title: 'Vivienda',
    icon: Home,
    color: '#ff855f',
    x: 26,
    y: 25,
    value: '30 años',
    label: 'para dejar el hogar familiar · 2024',
    text: 'El acceso a una casa conecta empleo, autonomía y decisiones familiares. Construir donde hay demanda lleva tiempo; proteger a quienes ya alquilan también importa.',
    action:
      'Más vivienda asequible cerca del empleo, con transporte y licencias predecibles.',
    caution:
      'La vivienda influye en la fecundidad, pero no la explica por sí sola.',
    source: 'Eurostat',
    url: 'https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20250923-1',
  },
  {
    id: 'demografia',
    title: 'Demografía',
    icon: Sprout,
    color: '#d6b5ff',
    x: 73,
    y: 25,
    value: '1,10',
    label: 'hijos por mujer · 2024',
    text: 'La fecundidad es baja y los efectos tardan décadas. Los cuidados, la estabilidad y la integración migratoria forman parte de la respuesta.',
    action:
      'Facilitar proyectos de vida: vivienda, conciliación, cuidados y empleo formal.',
    caution:
      'Un indicador anual de fecundidad no equivale a los hijos finales de una generación.',
    source: 'INE',
    url: 'https://www.ine.es/dyngs/Prensa/MNP2024.htm',
  },
  {
    id: 'productividad',
    title: 'Productividad',
    icon: BriefcaseBusiness,
    color: '#79c8ff',
    x: 17,
    y: 60,
    value: 'Valor / hora',
    label: 'la clave de la convergencia',
    text: 'La inversión, la formación y la difusión tecnológica ayudan a producir más por hora. La OCDE detecta avances recientes, aunque persiste la brecha.',
    action:
      'Ayudar a las empresas a invertir, adoptar tecnología y crecer con competencia.',
    caution:
      'El tamaño empresarial está asociado a productividad; esa asociación no prueba una única dirección causal.',
    source: 'OCDE · España 2025',
    url: 'https://www.oecd.org/en/publications/oecd-economic-surveys-spain-2025_abc5c435-en/full-report/fostering-productivity-growth-in-small-and-medium-sized-enterprises_039acae9.html',
  },
  {
    id: 'pensiones',
    title: 'Pensiones',
    icon: Landmark,
    color: '#ffba59',
    x: 82,
    y: 60,
    value: '123 %',
    label: 'deuda / PIB en 2050 · escenario AIReF 2026',
    text: 'El envejecimiento presiona pensiones, sanidad y cuidados. Cumplir la regla de gasto de pensiones no garantiza por sí solo la sostenibilidad fiscal.',
    action:
      'Evaluar ingresos, prestaciones, empleo y edad efectiva junto a la protección de rentas bajas.',
    caution:
      'Es un escenario condicionado a políticas constantes, no un dato observado ni una predicción inevitable.',
    source: 'AIReF · mayo de 2026',
    url: 'https://www.airef.es/en/news/airef-confirms-the-2025-result-the-pension-expenditure-rule-is-formally-compliedwith-but-it-does-not-guarantee-sustainability/',
  },
  {
    id: 'educacion',
    title: 'Educación y empleo',
    icon: GraduationCap,
    color: '#77e1cc',
    x: 32,
    y: 88,
    value: '12,8 %',
    label: 'abandono educativo temprano · 2025',
    text: 'El aprendizaje sostiene la productividad. Importan la calidad de la FP dual, la estabilidad laboral y que los datos de inserción existentes sean útiles.',
    action:
      'Mejorar la formación en empresa y ampliar QEDU, que ya publica inserción universitaria.',
    caution:
      'Contratos temporales y personas con empleo temporal son indicadores distintos.',
    source: 'Ministerio de Educación',
    url: 'https://www.educacionfpydeportes.gob.es/dam/jcr%3Ab410eba9-18b7-44d5-b6ad-f1c69069d75e/1-3-6-tabla-1-abandono-nivel-de-formaci-n-2025.pdf',
  },
  {
    id: 'energia',
    title: 'Energía y agua',
    icon: Zap,
    color: '#d6ec6b',
    x: 66,
    y: 88,
    value: '55,5 %',
    label: 'electricidad renovable · 2025',
    text: 'Una ventaja real necesita red, almacenamiento y demanda flexible. En el agua, ahorrar energía no sustituye a gestionar las extracciones.',
    action:
      'Conectar renovables y actividad productiva; reutilizar agua y respetar límites de cuenca.',
    caution:
      'Récord de producción renovable, pero su cuota bajó desde el 56,8 % de 2024.',
    source: 'Red Eléctrica',
    url: 'https://www.sistemaelectrico-ree.es/es/informe-del-sistema-electrico/generacion/generacion-de-energia-electrica/generacion-renovable-de-energia-electrica',
  },
];
const links = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [2, 5],
  [3, 0],
  [4, 1],
  [5, 3],
];

export default function Page() {
  const [selected, setSelected] = useState(0);
  const topic = topics[selected];
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
          <Network size={24} />
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
          <span className="status-dot" /> UN PAÍS, MUCHAS CONEXIONES{' '}
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
            <span>01</span> Explora el sistema
          </h2>
          <p>Elige un tema. Sigue sus conexiones.</p>
        </div>
        <div className="explorer">
          <div className="map">
            <div className="map-caption">
              MAPA DE RELACIONES <span>6 ÁREAS CONECTADAS</span>
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
            <div className="map-center">
              <span>NO HAY UNA</span>
              <strong>pieza aislada.</strong>
              <span>VIVIENDA ↔ EMPLEO ↔ FUTURO</span>
            </div>
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
                onClick={() => setSelected(i)}
              >
                <span className="node-icon">
                  <t.icon size={25} />
                </span>
                <span>{t.title}</span>
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
              <span>0{selected + 1}/06</span>
            </div>
            <strong className="metric">{topic.value}</strong>
            <p className="metric-label">{topic.label}</p>
            <a className="source-inline" href={topic.url}>
              {topic.source} <ArrowUpRight size={14} />
            </a>
            <p className="detail-text">{topic.text}</p>
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
                  onClick={() => setSelected(i)}
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
                El mapa es una explicación cualitativa. Sus conexiones son
                hipótesis informadas; no un simulador calibrado. La posición y
                el color no representan importancia ni magnitud.
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
