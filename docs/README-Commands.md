 


----

## Comandos

Los ficheros `gruntfile.js` y `dev/grunt:*.js` son los encargados de hacer funcionar los comandos de `Reactivist`.

Para crear tu propio comando, crea un nuevo fichero `dev/grunt:<%comando%>.js` tomando como plantilla a `dev/grunt:0.js`.

A continuación se listan los comandos que `Reactivist` proporciona por defecto.





 


----

### `grunt build`

**Subtareas:** 

- `clean`
- `build:lock`
- `i18n`
- `sass`
- `pack`
- `docs`
- `build:unlock`
- `dist`

**Descripción:** Limpia, inernacionaliza, estiliza, empaqueta, documenta y distribuye el código fuente.




 


----

### `grunt build:lock`

**Descripción:** Modifica el fichero `grunt:build.json` para que indique que el proceso `grunt build` está siendo ejecutado. No es una tarea pensada para el usuario, sino para otras tareas.




 


----

### `grunt build:unlock`

**Descripción:** Modifica el fichero `grunt:build.json` para que indique que el proceso `grunt build` no está siendo ejecutado. No es una tarea pensada para el usuario, sino para otras tareas.




 


----

### `grunt clean`

**Parámetros:** `settings.grunt.clean.{env}.files`

**Descripción:** Limpia el proyecto en función de los parámetros.




 


----

### `grunt component`

**Parámetros:** 

- `-f | --folder`: opcional.
- `-n | --name`: opcional.
- `-p | --package`: opcional.

**Descripción:** Crea un nuevo componente en `src/components/{componente}` como un nuevo `Proyecto Reactivist` dentro del proyecto.




 


----

### `grunt default`

**Descripción:** Imprime una explicación de cómo iniciar el modo desarrollo.




 


----

### `grunt diagrams`

**Parámetros:** `settings.grunt.diagrams.{env}.files`

**Descripción:** Genera imágenes de los ficheros `mmd` (Mermaid) en función de los parámetros.




 


----

### `grunt dist`

**Parámetros:** `settings.grunt.dist.{env}.files`, `settings.grunt.dist.{env}.options`

**Descripción:** Genera imágenes de los ficheros `mmd` (Mermaid) en función de los parámetros.




 


----

### `grunt docs`

**Subtareas:** 

- `javadoc`
- `diagrams`




 


----

### `grunt e2e`

**Parámetros:** `cypress.json`

**Descripción:** Inicia los tests de [Cypress](https://docs.cypress.io/api/api/table-of-contents.html). 




 


----

### `grunt env`

**Parámetros:** `-e` / `--environment`. `{String}`.

**Descripción:** Establece el entorno. Ejemplo: `grunt env -e=test`, `grunt env --environment=production`...




 


----

### `grunt export:mobile`

**Parámetros:** `package.json`, `settings.grunt.export:mobile.{env}.package`, `settings.grunt.export:mobile.{env}.title`.

**Descripción:** Genera una aplicación móvil con `Cordova` del proyecto en `dist-mobile`.




 


----

### `grunt export:pc`

**Parámetros:** `package.json`

**Descripción:** Genera una aplicación de escritorio con `Electron` del proyecto en `dist-pc`.




 


----

### `grunt i18n`

**Parámetros:** `settings.grunt.i18n.{env}.files`, `settings.grunt.i18n.{env}.outFile`, `settings.grunt.i18n.{env}.options`.

**Descripción:** Genera un fichero de tipo JSON a partir de los ficheros de traducción de `i18n/*.po` en `i18n/i18n.json`.




 


----

### `grunt imports`

**Parámetros:** `settings.grunt.imports.{env}.files`

**Descripción:** Importa los ficheros especificados como clave (URLs o ficheros) a los ficheros especificados como valor del mapa `settings.grunt.imports.{env}.files`.




 


----

### `grunt javadoc`

**Parámetros:** `settings.grunt.docs.{env}.options`

**Descripción:** Genera la documentación, en formato `json` o `markdown`, de los comentarios tipo Javadoc de los ficheros especificados. Se pueden especificar una lista de configuraciones, y generará un fichero distinto cada vez.




 


----

### `grunt pack`

**Parámetros:** `settings.grunt.pack.{env}.*`, `settings.grunt.unit.{env}.*`

**Descripción:** Transpila los ficheros desde `src/index.jsx` y genera el `src/bundle.js`. En entorno `"test"`, también genera el `unit/test/dist/bundle.test.js` a partir de `unit/test/src/index.jsx`.




 


----

### `grunt sass`

**Parámetros:** `settings.grunt.sass.{env}.*`, `settings.grunt.unit.{env}.*`

**Descripción:** Transpila los ficheros desde `src/index.scss` y genera el `src/bundle.css`. En entorno `"test"`, también genera el `unit/test/dist/bundle.test.css` a partir de `unit/test/src/index.scss`.




 


----

### `grunt scraps`

**Parámetros:**

**Descripción:** Ejecuta los scripts bajo `scraps/scripts/*.js` en orden natural con Electron, y el módulo `web2os` disponible.

Este comando está pensado para ciertos contextos en los que puede ser importante extraer información de otras páginas web en vivo mediante un navegador.

Consultar ejemplos y API oficial de `web2os` para saber más sobre esta opción.




 


----

### `grunt serve`

**Parámetros:** -

**Descripción:** Sirve los ficheros `dist` estáticamente bajo `http://{host}:{port}/public`, donde `{host}` y `{port}` son extraídos de `{settings.json#.grunt.serve.{env}.host}` y `{settings.json#.grunt.serve.{env}.port}`, respectivamente.




 


----

### `grunt test`

**Subtareas:** 

- `unit`
- `e2e`

**Descripción:** Arranca los tests unitarios y luego los tests de usuario.




 


----

### `grunt unit`

**Descripción:** Arranca los tests unitarios.




 


----

### `grunt watch`

**Parámetros:** `grunt.watch.{env}.*`

**Descripción:** Establece escucha de ficheros. Al detectar cambios, ejecutará `grunt build`.




