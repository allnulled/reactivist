----

# Ahora:
# Ahora:
# Ahora:
# Ahora:
# Ahora:
# Ahora:
# Ahora:
# Ahora:
# Ahora:
# Ahora:
# Ahora:
# Ahora:
# Ahora:
# Ahora:
# Ahora:
# Ahora:
# Ahora:



----

> **Identifier**: 12

> **Name**: Documentar los flujos de trabajo del proyecto

> **Time**: 4 horas

> **Started**: 19:00

> **Finished**: 23:00

> **Description**: Añadir y concatenar los documentos de flujos de trabajo del proyecto en `docs/workflows/*.md`, en `docs/workflows/README-Workflows.md`.

> **Subtasks**: 

[x] Añadir el parámetro en el `settings.json#grunt.docs` para generar este README con `grunt docs`.

[x] Añadir un fichero por cada flujo de trabajo.

[x] Añadir un diagrama con Mermaid por cada flujo de trabajo mínimo.

[ ] Completar el fichero describiendo el flujo de trabajo.

----























----

> **Identifier**: 10

> **Name**: Documentar los comandos del proyecto

> **Time**: 4 horas

> **Started**: 13:00

> **Finished**: 17:00

> **Description**: Añadir y generar un javadoc para los comandos del proyecto en `dev/grunt:*.js`, en `README-Commands.md`.

> **Subtasks**: 

[x] Añadir el parámetro en el `settings.json#grunt.docs` para generar este README con `grunt docs`.

[x] Añadir todo de comentarios tipo Javadoc en los comandos para autogenerar la documentación.

----

> **Identifier**: 11

> **Name**: Documentar la arquitectura del proyecto

> **Time**: 2 horas

> **Started**: 17:00

> **Finished**: 19:00

> **Description**: Añadir y concatenar los documentos de la arquitectura del proyecto en `docs/architecture/*.md`, en `docs/architecture/README-Architecture.md`.

> **Subtasks**: 

[x] Añadir el parámetro en el `settings.json#grunt.docs` para generar este README con `grunt docs`.

[x] Añadir un fichero por cada punto a resaltar de la arquitectura, o todo en 1 fichero.

[x] Completar los ficheros describiendo la arquitectura.

----






























----

> **Identifier**: 2

> **Name**: Integrar tests unitarios y cobertura de código con Karma/Mocha/Chai/Sinon/NYC.

> **Time**: 4 horas

> **Started**: 7/11/2018 18:00 pm.

> **Should end**: 7/11/2018 22:00 pm.

> **Description**: Crear tarea grunt unit, que ejecutará con Karma los tests bajo `test/unit/**/*.test.js`.

> **Subtasks**: 

Cuando `grunt build` tiene `settings.json#env`===`test`, en las opciones de BROWSERIFY:
	- Hay que llamar a browserify para que empaquete los tests en `build.test.js`. Este paquete entra/devuelve por `test/booter.test.jsx`, y lo único que expone es: 
		`TestBooter` con `TestBooter.boot();`, que iniciaría los tests del componente.
	- Hay que hacer que todas las configuraciones tengan la estructura de: 
		`settings.json#grunt.{comando}.{entorno="default"}.{configuración}`.
	- Hay que hacer que si no existe el entorno actual en la configuración, que saque el de `default`.
	- Hay que hacer que en `src/index.jsx` se incluya (con ScriptLoader) el fichero `/build.test.js`, pero sólo: `ìf(settings#env="test")`.
	- Hay que añadir dos servicios en `grunt serve` como:
		- `POST /@coverage`: en `body.coverage` y como JSON se envía la variable `__coverage__` de istanbul desde el test unitario (probablemente, `TestBooter.coverage(__coverage__)`. Los reportes de cobertura de código son generados, entonces, en HTML en el directorio `test/coverage`.
		- `GET /@coverage-report`: se accede al directorio de cobertura, generado en `/test/coverage`. Se pueden visitar los distintos ficheros y su cobertura de código.


----

# Por hacer:
# Por hacer:
# Por hacer:
# Por hacer:
# Por hacer:
# Por hacer:
# Por hacer:
# Por hacer:
# Por hacer:
# Por hacer:
# Por hacer:
# Por hacer:
# Por hacer:
# Por hacer:
# Por hacer:
# Por hacer:
# Por hacer:
# Por hacer:

----

> **Identifier**: 3

> **Name**: Integrar internacionalización a través de generación de ficheros `*.JSON` a partir de ficheros `*.PO` bajo `i18n/**/*.po`.

> **Time**: 1 hora

> **Started**: 7/11/2018 21:00 pm.

> **Should end**: 7/11/2018 22:00 pm.

> **Description**: Crear tarea `grunt i18n` que creará un fichero `src/i18n.component.json`.

> **Subtasks**: 

1. Crear fichero `src/component.i18n.json` a partir de `docs/**/*.po`.

2. Meter esto en `dev/grunt:i18n.js`.

3. Parametrizar los ficheros seleccionados.

----

----

> **Identifier**: 4

> **Name**: Revisar para producción el README, REQUIREMENTS, CHANGELOG, FEATURE, y bin/~ (lo que copia y no copia)

> **Time**: 2 horas

> **Started**: 7/11/2018 21:00 pm.

> **Should end**: 7/11/2018 22:00 pm.

> **Description**: Redocumentar README con tareas nuevas. Revisar REQUIREMENTS, CHANGELOG y FEATURE para subir a producción. Revisar el bin/~ y lo que copia y no copia.

> **Subtasks**: 

1. Crear fichero `src/component.i18n.json` a partir de `docs/**/*.po`.

2. Meter esto en `dev/grunt:i18n.js`.

3. Parametrizar los ficheros seleccionados.

----

----

> **Identifier**: 5

> **Name**: Hacer que cuando se crea un nuevo proyecto Reactivist, se busque el primer puerto vacío, y se configure el proyecto consecuentemente, tanto en `settings.json` como en `src/settings.json`.

> **Time**: 2 horas

> **Started**: 7/11/2018 21:00 pm.

> **Should end**: 7/11/2018 22:00 pm.

> **Description**: Crear tarea `grunt i18n` que creará un fichero `src/i18n.component.json`.

> **Subtasks**: 

1. Crear fichero `src/component.i18n.json` a partir de `docs/**/*.po`.

2. Meter esto en `dev/grunt:i18n.js`.

3. Parametrizar los ficheros seleccionados.

----

----

> **Identifier**: 6

> **Name**: Describir tests unitarios (sólo aserciones, en `test/TESTS.md#unit-tests`) para cada comando, probar todos los comandos en general.

> **Time**: 2 horas

> **Started**: 

> **Should end**: 

> **Description**: 

> **Subtasks**: 

----

----

> **Identifier**: 7

> **Name**: Subir primera versión del proyecto `Reactivist` a GitHub y NPM. Comprobar que todo está ok.

> **Time**: 2 horas

> **Started**: 

> **Should end**: 

> **Description**: 

> **Subtasks**: 

----

# Hecho:
# Hecho:
# Hecho:
# Hecho:
# Hecho:
# Hecho:
# Hecho:
# Hecho:
# Hecho:
# Hecho:
# Hecho:
# Hecho:
# Hecho:
   
----

> **Identifier**: 1

> **Name**: Integrar generación de diagramas en `docs/**/*.mmd` desde `*.MMD` (Mermaid) a `*.PNG` con comando `grunt diagrams`.

> **Time**: 2 horas

> **Started**: 7/11/2018 16:30 pm.

> **Description**: Crear tarea grunt docs:diagram, que cogerá los ficheros `docs/**/*.mmd` y los transformará en `*.png`.

> **Subtasks**: 

1. Pasar tarea "grunt docs" a "grunt javadoc".

2. Hacer que "grunt docs" sea ahora: ["javadoc", "diagrams"].

3. Crear tarea "grunt diagrams".

4. Hacer que "grunt diagrams" coja todos los ficheros en `docs/*.mmd` y genere `*.png(s)`.

5. Subir la tarea.

   
   
   


   
   
   



   
   
   



# Plantilla de tarea:

----

> **Identifier**: ID

> **Name**: NAME

> **Time**: TIME

> **Started**: MOMENT

> **Description**: DESCRIPTION

> **Subtasks**: SUBTASKS

----