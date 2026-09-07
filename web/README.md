# España / En sistema

Web del análisis [Cómo arreglar España](https://github.com/santos-sanz/como-arreglar-espana). React/Vinext, con el starter de Sites y su catálogo Shadcn. El mapa enlaza quince ámbitos y abre una ficha individual completa al pulsar cada uno; las conexiones no representan magnitudes causales.

## Desarrollo

Requiere Node >=22.13. Desde esta carpeta:

```sh
npm ci
npm run dev
```

## Comprobación

```sh
node scripts/check-evidence.mjs
npm exec tsc -- --noEmit
npm run build
```

La compilación incluye cliente y Worker. `npm start` ejecuta el resultado de producción mediante Wrangler. La comprobación de fuentes comprueba estructura y etiquetas críticas; no vuelve a verificar sus cifras en internet ni sustituye pruebas de navegador.

## Publicación

`.openai/hosting.json` conserva el identificador de Sites. No crear otro proyecto al publicar de nuevo. El código vive en GitHub dentro de `web/`; para Sites se prepara una copia limpia con Git en su raíz, el mismo árbol de fuentes y el resultado de compilación correspondiente. Las credenciales de Sites se aplican solo al comando de push; nunca se guardan aquí.

`app/subsystems.json` contiene las fichas y relaciones, con su equivalente editorial en `docs/subsistemas.md`. `app/sources.json` refleja `docs/fuentes.md` del repositorio principal. Revisar conjuntamente ambos, la auditoría y las etiquetas de la página al actualizar la evidencia. La publicación inicial es privada para el propietario en Sites.
