# Cómo arreglar España: entender el sistema antes de intervenir

Análisis independiente preparado para Andrés Santos Sanz. **Revisión de fuentes: 7 de septiembre de 2026.**

España combina avances reales con dificultades persistentes para acceder a vivienda, formar un hogar y mejorar la renta por persona. Vivienda, empleo, productividad, demografía, pensiones, energía y agua se influyen entre sí. Estudiar esas conexiones ayuda a diseñar políticas; no permite atribuir todos los problemas a una sola causa ni prometer resultados sin medirlos.

**[Abrir la web en Sites](https://como-arreglar-espana.santossanzandres.chatgpt.site)** · Publicada con acceso público.

**[Explorar los 15 subsistemas](docs/subsistemas.md)** · Fichas individuales con diagnóstico, mecanismos, propuestas, riesgos e indicadores.

**[CPS y otras comunidades](docs/analisis-comunidad.md)** · Seis lecturas comentadas, incorporadas el 8 de septiembre de 2026.

**Lecturas:** [auditoría del contenido original](docs/crosscheck.md) · [análisis ampliado y evaluación de políticas](docs/analisis-ampliado.md) · [fuentes y método](docs/fuentes.md) · [original histórico, sin corregir](docs/analisis-original.md). La web está en [`web/`](web/).

## 1. Qué sabemos y de cuándo es cada dato

| Indicador | Valor y periodo | Cómo interpretarlo | Fuente |
| --- | --- | --- | --- |
| Diferencial vivienda–hogares | ≈750.000, acumulado 2021–2025 | Creación neta de hogares menos viviendas terminadas en España; no es un censo territorial de necesidades | [BdE, diapositiva 29](https://www.bde.es/f/webbe/SES/Secciones/Publicaciones/PublicacionesAnuales/InformesAnuales/25/Fich/IIPP-2026-06-18-lopez-salido-es-or.pdf) |
| Salida del hogar parental | España 30,0 años; UE 26,2, en 2024 | Edad media estimada, no tasa de emancipación | [Eurostat](https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20250923-1) |
| Fecundidad | 1,10 hijos por mujer, 2024 | Indicador coyuntural; no descendencia final por generación | [INE](https://www.ine.es/dyngs/Prensa/MNP2024.htm) |
| Nacimientos | 318.005 en 2024; 321.164 estimados en 2025 | 2024 definitivo; 2025 provisional | [INE 2024](https://www.ine.es/dyngs/Prensa/MNP2024.htm), [INE 2025](https://www.ine.es/dyngs/Prensa/es/EDES_EMN2025.htm) |
| Crecimiento del PIB real | 2,8 %, 2025 | Estimación publicada el 26/03/2026; revisable | [INE](https://ine.es/dyngs/Prensa/es/CNTR4T25.htm) |
| Contratos temporales de jóvenes | 59,26 % de los contratos a menores de 30, 2025 | Flujo de contratos, no porcentaje de trabajadores temporales | [SEPE](https://www.sepe.es/dctm/informes%3A09019af4802688d5/RElTRVdFQg%3D%3D/4676-701.pdf) |
| Abandono educativo temprano | 12,8 %, 2025 | Personas de 18–24 con baja titulación que no continúan formación | [Educación](https://www.educacionfpydeportes.gob.es/dam/jcr%3Ab410eba9-18b7-44d5-b6ad-f1c69069d75e/1-3-6-tabla-1-abandono-nivel-de-formaci-n-2025.pdf) |
| Deuda pública | 100,7 % del PIB, cierre 2025 | Dato publicado por BdE el 31/03/2026 | [BdE](https://www.bde.es/wbe/es/noticias-eventos/actualidad-banco-espana/deuda-aapp-2025t4.html) |
| Electricidad renovable | 55,5 % y 150.988 GWh, 2025 | Récord de producción absoluta; la cuota de 2024 fue 56,8 % | [REE](https://www.sistemaelectrico-ree.es/es/informe-del-sistema-electrico/generacion/generacion-de-energia-electrica/generacion-renovable-de-energia-electrica) |

Las observaciones no se mezclan con escenarios: **AIReF sitúa la deuda en 123 % del PIB en 2050 bajo políticas constantes en su ejercicio de mayo de 2026**. La edición de 2025 daba 129 % en 2050 y 181 % en 2070. No se presenta el valor antiguo de 2070 como continuación de la nueva senda. El cumplimiento formal de la regla de pensiones es compatible con riesgos de sostenibilidad. [AIReF 2026](https://www.airef.es/en/news/airef-confirms-the-2025-result-the-pension-expenditure-rule-is-formally-compliedwith-but-it-does-not-guarantee-sustainability/).

## 2. Cómo leer un sistema sin inventar causalidad

Un **stock** es algo acumulado, como viviendas, capital o deuda. Un **flujo** lo cambia: construcción neta, inversión neta o déficit. El crecimiento nominal del PIB puede reducir la ratio deuda/PIB sin reducir la deuda en euros; la inflación tampoco es una salida contable del stock nominal.

Una flecha con `+` significa que ambas variables se mueven en la misma dirección, manteniendo lo demás constante; `−`, en dirección contraria. **Un bucle debe cerrar**. Un número par de enlaces negativos produce un bucle reforzador (R); uno impar, un equilibrador (B). Los diagramas siguientes son hipótesis económicas simplificadas, no estimaciones de impacto.

```mermaid
flowchart LR
  P[Precio de vivienda] -->|+| I[Incentivo a construir]
  I -->|+ con retardo| V[Viviendas terminadas]
  V -->|+| O[Oferta disponible]
  O -->|−| P
```

**B1, respuesta de oferta:** un precio mayor puede estimular construcción y moderar precios. Depende de suelo, financiación, infraestructura, permisos y localización. La respuesta no es inmediata y no protege por sí sola al hogar que hoy pierde su alquiler.

```mermaid
flowchart LR
  K[Capital y conocimiento por hora trabajada] -->|+| P[Productividad por hora]
  P -->|+ condicionado| M[Margen para invertir]
  M -->|+ condicionado| K
```

**R1, acumulación productiva:** producir mejor puede sostener nueva inversión. Competencia, demanda y financiación condicionan el cierre. Más productividad no se traduce automáticamente en salarios en la misma proporción; importan negociación y distribución.

```mermaid
flowchart LR
  D[Deuda nominal] -->|+ dado el tipo efectivo| I[Gasto por intereses]
  I -->|+ dado el saldo primario| F[Déficit total]
  F -->|+| D
```

**R2, deuda e intereses:** se omiten ajustes stock–flujo para simplificar. El crecimiento y el saldo primario pueden contrarrestarlo. Es un mecanismo contable, no una predicción de crisis.

Vivienda → emancipación → decisiones familiares → población activa futura es una **cadena con retardos**, no un bucle cerrado demostrado. Migración, empleo, salud, cuidados y productividad también modifican sus resultados.

El marco de [Donella Meadows](https://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/) ayuda a distinguir cambios en precios, infraestructura, información, reglas y objetivos. Su jerarquía no es un ranking empírico de rentabilidad ni implica que modificar reglas siempre sea barato o rápido.

## 3. Seis ámbitos, con más de una explicación

### Vivienda: oferta, acceso y protección

El diferencial del BdE es una señal de tensión agregada. Debe completarse con alquiler registrado, esfuerzo sobre renta, vivienda disponible y ubicación del empleo. Construir en un municipio sin demanda no sustituye vivienda cerca de oportunidades. La oferta asequible necesita suelo servido, rehabilitación y transporte; la protección de hogares vulnerables requiere instrumentos que actúen antes de terminar las obras.

La evidencia sobre controles de alquiler no permite un «siempre»: [Diamond, McQuade y Qian (2019)](https://www.aeaweb.org/articles?id=10.1257%2Faer.20181289) identifican protección de inquilinos existentes y reducción de oferta en San Francisco. [Jofre-Monseny, Martínez-Mazza y Segú](https://ieb.ub.edu/wp-content/uploads/2022/02/Doc2022-02.pdf) encuentran reducción de rentas sin evidencia de contracción de oferta en la ventana analizada tras la regulación catalana de 2020. No son el mismo régimen ni el mismo horizonte. Evaluar rentas, nuevos contratos, permanencia, composición y desplazamiento entre mercados.

### Demografía: facilitar decisiones, no fijar una obligación

La baja fecundidad no tiene una sola causa. Empleo, vivienda, cuidados, conciliación y preferencias forman parte de la explicación. La [OCDE, Society at a Glance 2024](https://www.oecd.org/en/publications/society-at-a-glance-2024-country-notes_fd5558c7-en/spain_b1ed2dfd-en.html) amplía el foco del documento original. Ni emanciparse a los 30 imposibilita tener dos hijos ni una vivienda barata asegura tenerlos.

El censo de 2025 cuenta 49,13 millones de residentes a 1 de enero. Su aumento total de 508.602 no equivale a migración neta. El escenario INE 2024–2074 incorpora supuestos migratorios; no prescribe cuotas. Integración significa empleo formal, reconocimiento de capacidades y servicios, además de vivienda. [INE Censo](https://ine.es/dyngs/Prensa/CensoVariables2025.htm), [INE Proyecciones](https://ine.es/dyngs/Prensa/es/PROP20242074.htm).

### Productividad: reconocer la brecha y los avances

El [Consejo de Productividad](https://portal.mineco.gob.es/es-es/economiayempresa/ConsejoProductividad/Documents/Evolucion-productividad-hora-Espana_1999-2024.pdf) descompone la brecha de PIB per cápita en productividad por hora y horas por habitante. En 2024 la diferencia con Alemania es aproximadamente −20 %, esencialmente vinculada a productividad en esa descomposición. Frente a la UE, el componente de horas por habitante también importa. Es contabilidad comparada, no identificación causal.

La [OCDE 2025](https://www.oecd.org/en/publications/oecd-economic-surveys-spain-2025_abc5c435-en/full-report/fostering-productivity-growth-in-small-and-medium-sized-enterprises_039acae9.html) reconoce mejoras recientes. Las prioridades propuestas son inversión, gestión, capacidades digitales, financiación y difusión tecnológica. Revisar umbrales regulatorios exige comprobar cuáles frenan crecimiento y cuáles protegen derechos; eliminar todos no es una conclusión demostrada.

### Educación y empleo: estabilidad y aprendizaje medidos correctamente

El 59,26 % del SEPE describe contratos temporales a menores de 30. No permite decir que seis de cada diez jóvenes asalariados son temporales ni compararlo directamente con paro europeo de menores de 25. La FP dual debe evaluarse por aprendizaje y empleo posterior, no solo por matrículas o contratos.

**QEDU ya publica inserción universitaria.** Sus indicadores de afiliación y bases de cotización tienen límites de cobertura; las bases no son salarios. Mejorarlos es una política distinta de crear desde cero información supuestamente inexistente. [QEDU](https://www.ciencia.gob.es/qedu/AyudaQEDU.html).

### Pensiones, salud y cuidados: repartir ajustes de forma explícita

El envejecimiento no solo afecta a pensiones. Comparar paquetes que combinen empleo, productividad, cotizaciones, impuestos, edad efectiva y prestaciones; publicar incidencia por renta, sexo, salud y cohorte. Una regla automática puede aumentar previsibilidad, pero no elimina decisiones distributivas ni la necesidad de proteger carreras laborales difíciles. [OCDE, sostenibilidad fiscal](https://www.oecd.org/en/publications/oecd-economic-surveys-spain-2025_abc5c435-en/full-report/sustaining-growth-and-achieving-fiscal-sustainability_ab211a46.html).

La inmigración puede ampliar la base de empleo y cotización, pero sus efectos dependen de integración y salarios; las personas migrantes también envejecen. No existe un único número de llegadas que «resuelva» permanentemente las pensiones.

### Energía, agua y clima: capacidad útil y límites físicos

La cuota renovable mide generación eléctrica, no toda la energía consumida, fiabilidad horaria ni factura final. Redes y almacenamiento permiten aprovecharla mejor. La ventaja industrial depende también de contratos, financiación, capacidades y demanda.

La [Oficina C, sequía 2025](https://oficinac.es/sites/default/files/informes/2025_10_30_InformeC-Sequia-oficinac-fecyt-congreso.pdf) muestra riesgos entre sectores y cuencas. La demanda agraria domina los usos consuntivos estimados, pero hay heterogeneidad territorial. Desalar añade agua a cambio de energía, inversión y gestión de salmuera. Modernizar riego puede reducir consumo por unidad de producto sin ahorrar agua total si aumenta superficie o intensidad: el [MITECO](https://www.miteco.gob.es/content/dam/miteco/images/es/3-actualizacion-conclusiones-mesas-enrr_tcm30-547784.pdf) identifica este efecto rebote. Medir extracciones y fijar límites forma parte de la solución.

## 4. Qué añade la ampliación

El [análisis ampliado](docs/analisis-ampliado.md) incorpora distribución y pobreza, cuidados y participación laboral, diferencias territoriales, capacidad administrativa, financiación y evaluación. Incluye una cartera de diez intervenciones con responsables, costes cualitativos, posibles perjudicados e indicadores. Las secuencias 0–2, 2–5 y 5–15 años son horizontes de planificación propuestos, no plazos causales estimados.

La regla de decisión es sencilla: identificar el cuello de botella local; financiar una intervención concreta; medir ejecución y resultado; comparar con un contrafactual razonable; corregir o detener lo que no funciona. No se suman impactos como si las políticas fueran independientes.

## 5. Límites y trazabilidad

- Este documento contiene **datos**, **resultados de estudios**, **hipótesis** y **propuestas**; no son intercambiables.
- Los informes internacionales orientan, pero no sustituyen una evaluación española de cada instrumento.
- No se han calibrado elasticidades ni un simulador. No se predice cuánto bajará el alquiler o subirá la fecundidad.
- No se ha presupuestado un programa de gobierno. Las prioridades requieren decisiones distributivas y financiación.
- Las fechas corresponden a cada publicación. Consultar una fuente en septiembre de 2026 no convierte su dato de 2024 en dato de 2026.
- Las afirmaciones retiradas y las verificaciones pendientes están en la [auditoría](docs/crosscheck.md).
