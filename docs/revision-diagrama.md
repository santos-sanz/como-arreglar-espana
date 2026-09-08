# Revisión del diagrama de España

Revisión editorial: 8 de septiembre de 2026.

El referente compositivo es el diagrama de Afganistán asociado al general Stanley McChrystal, documentado en el [Planner’s Handbook for Operational Design](https://www.jcs.mil/Portals/36/Documents/Doctrine/pams_hands/opdesign_hbk.pdf). No implica su autoría ni aval del mapa de España.

## Problemas encontrados

- El cierre del bucle de vivienda cruzaba «suelo y permisos», confundiendo una condición de oferta con una variable del bucle.
- Las flechas de productividad no recorrían de manera coherente inversión, valor por hora y margen para invertir.
- Numerosas flechas grises asignaban una dirección causal a relaciones que el análisis solo plantea cualitativamente.
- La deuda pública aparecía agrupada exclusivamente bajo pensiones, aunque el mecanismo afecta al conjunto de las finanzas públicas.
- La imagen contenía lemas decorativos sin función analítica y carecía de una lectura accesible independiente de los píxeles.

## Criterio de revisión

El SVG nativo conserva los 15 ámbitos y la identidad visual española, con 42 variables y 80 relaciones únicas: 9 enlaces dirigidos en tres bucles y 71 hipótesis editoriales no dirigidas. Solo se elimina una relación recíproca duplicada. Resaltar un ámbito mantiene todas las conexiones y su geometría. La densidad expresa las interdependencias propuestas, no demuestra exactitud causal.

1. **B1:** precio de vivienda → (+) incentivo a construir → (+, con retardo) oferta disponible → (−) precio. Un enlace negativo cierra un bucle equilibrador. La localización y las restricciones de oferta importan.
2. **R1:** inversión → (+, con retardo) valor por hora → (+) margen para invertir → (+) inversión. El cierre depende de que se reinvierta; no es automático.
3. **R2:** deuda nominal → (+) intereses → (+) déficit → (+) deuda. Tipo efectivo y saldo primario dados; se omiten ajustes stock–flujo. El crecimiento del PIB afecta a la ratio deuda/PIB, no reduce por sí solo la deuda nominal.

Estos mecanismos se desarrollan en el [análisis principal](../README.md#2-cómo-leer-un-sistema-sin-inventar-causalidad). Los datos y cautelas de cada ámbito siguen en las [fichas de subsistemas](subsistemas.md). No se asignan tamaños de efecto, probabilidades ni un orden de prioridad a partir de la posición o color.

## Integración

La web ofrece SVG integrado en el HTML, texto seleccionable, ampliación al 150 % y 200 %, desplazamiento y descarga vectorial con estilos incorporados. Cada relación puede consultarse mediante una línea o un selector accesible por teclado. La ficha distingue supuestos y fuentes de contexto de una prueba causal específica. Se conserva el mapa interactivo de fichas para la exploración individual.

El script `web/scripts/check-diagram.mjs` comprueba identificadores únicos, extremos válidos, geometría finita, cierre y polaridad de los tres bucles y sus retardos explícitos. Estas comprobaciones validan la representación, no estiman efectos empíricos. La revisión de navegador comprueba además que el resaltado no cambia el número ni la geometría de las relaciones.
