# Flujos de trabajo

## Flujos de trabajo en proyectos `reactivist`

En aras de hacer un desarrollo productivo y confiable, los proyectos `reactivist` definen ya un `flujo de trabajo de desarrollo de una feature` como referencia de buenas prácticas.

#### El flujo de trabajo del desarrollo de una `feature`

Toda `feature` tiene este flujo de estados:

- **`Plenamente requerida`**
- **`Plenamente abierta`**
- **`Plenamente definida al usuario`**
- **`Plenamente definida al desarrollador`**
- **`Plenamente aceptada`**
- **`Plenamente documentada`**
- **`Plenamente subida`**
- **`Plenamente integrada`**
- **`Plenamente cerrada`**

Puedes echar un vistazo general al flujo de trabajo aquí:

- Define el requerimiento.
- Abre una `feature`
- Define un test de usuario basado en los requerimientos
- Define un test unitario basado en la codificación y conducta esperadas
- Desarrolla hasta pasar el test unitario y de usuario
- Documenta la `feature`
- Une la `feature` a la branca origen
- Cierra la `feature`

#### El trabajo inicial del arquitecto

Antes de poder desarrollar, el arquitecto tiene aquí las siguientes tareas asignadas:

- Rellenar la documentación de:
   - `docs/general/*.md`. El inicio del `README.md` inicial. Este es normalmente el último de todos.
   - `docs/architecture/*.md`. Estos documentos se rellenan parcialmente con el cliente para que pueda expresar sus demandas, parcialmente con documentación técnica para otros arquitectos.
   - `docs/requirements/*.md`. Estos documentos duplican a los anteriores a medida que se va definiendo más y más el desarrollo, así que crece más que el anterior. Está expresamente pensado para que el arquitecto exponga los requisitos que entiende que el software necesita desde los requisitos que el cliente ha creído convenientes y los que él aporta en la implementación añadidamente, como la potencial reusabilidad de los componentes requeridos, o dependencias concretas que pueden ayudar o condicionar el desarrollo, pero que al ir más ligado al presente de las tecnologías se deja en el equipo de desarrollo.
   - `docs/workflows/*.md|*.mmd|*.png`. En este directorio se generan diagramas con `mermaid`, un lenguaje y herramienta para generar diagramas. El arquitecto debería definir todos los diagramas de flujo convenientes aquí para que los desarrolladores puedan comprender rápidamente las ideas que se quieren o se están llevando a cabo. También para otros arquitectos, o incluso para el cliente.
   - `test/e2e/*.js`. De los comentarios `javadoc` se extrae la documentación de los tests de usuario. Cuantos más comentarios definiendo en qué consiste cada `user test` deje escritos el arquitecto, menos problemas deberían aflorar posteriormente.
   - `test/unit/*.js`. De los comentarios `javadoc` se extrae la documentación de los tests de usuario. Cuantos más comentarios definiendo en qué consiste cada `unit test` deje escritos el arquitecto, menos problemas deberían aflorar posteriormente.
   - `src/*.jsx`. De los comentarios `javadoc` se extrae la documentación de la referencia de la API. Cuantos más comentarios definiendo en qué consiste cada clase, método, función, variable, o en general, de fragmento de código, más referencia se tendrá después en la documentación.
   - `src/*.scss`. De los comentarios `javadoc` se extrae la documentación de la referencia de la API. Cuantos más comentarios definiendo en qué consiste cada clase, método, función, variable, o en general, de fragmento de código, más referencia se tendrá después en la documentación.

#### Los 20 pasos recomendados en el flujo de trabajo del desarrollo de una `feature`

##### Leyenda de la guía de 20 pasos

**[C]** significa **Línea de comandos**.

**[E]** significa **Editor**.

**[R]** significa **Repositorio**.

##### Configuración inicial del entorno

- **[C]** | Crea un nuevo proyecto `reactivist` | `reactivist -f {folder}`.

- **[R]** | Inicializa el proyecto en el repositorio y en el directorio.

- **[R]** | Cámbiate a la branca principal del nuevo proyecto.

##### Flujo de trabajo de 20 pasos de los proyectos `reactivist`

- 1. [ ] **[E]** Añade y toma un requerimiento. `docs/requirements/*.md`

- 2. [ ] **[E]** Añade y toma un cambio del `CHANGELOG.md`. Debe resolver el requerimiento anterior.
> La `feature` está aquí `PLENAMENTE REQUERIDA`.

- 3. [ ] **[C]** Comprueba que los tests pasan y sube los cambios al repositorio. En caso contrario, resuélvelos, y súbelo.

- 4. [ ] **[C]** Crea una nueva branca y llámala `feature-{ID del requerimiento}`. Cámbiate a la nueva branca.
> La `feature` está aquí `PLENAMENTE ABIERTA`.

- 5. [ ] **[C]** Iniciar **modo desarrollo** con los comandos apropiados. Por defecto: `grunt serve` y `grunt watch` paralelamente.

- 6. [ ] **[E]** Desarrolla el test de usuario necesario para demostrar el requerimiento anterior.
> La `feature` está aquí `PLENAMENTE DEFINIDA AL USUARIO`.

- 7. [ ] **[E]** Desarrolla el test unitario para confirmar la codificación y las entradas/salidas/conductas de la implementación.
> La `feature` está aquí `PLENAMENTE DEFINIDA AL DESARROLLADOR`.

- 8. [ ] **[C]** Haz los tests de usuario y unitarios fallar.

- 9. [ ] **[E]** Desarrolla el código fuente para que pase los tests de usuario y unitario. 

- 10. [ ] **[C]** Pásalos satisfactoriamente. Por defecto: `grunt e2e` y `grunt unit`.

- 10. [ ] **[E]** Añade la `feature` en el `CHANGELOG.md`. Las acciones recomendadas son:
  - `Added`
  - `Changed`
  - `Deprecated`
  - `Removed`
  - `Fixed`

- 11. [ ] **[R]** Sube los cambios.
> La `feature` está aquí `PLENAMENTE ACEPTADA`.

- 12. [ ] **[E]** Documenta (en el código fuente, el del test de usuario y el del test unitario) la `feature`.

- 13. [ ] **[C]** Genera documentación las veces necesarias.

- 14. [ ] **[E]** Añade la `feature` de documentación en el `CHANGELOG.md`.
> La `feature` está aquí `PLENAMENTE DOCUMENTADA`.

- 15. [ ] **[R]** Sube los cambios.
> La `feature` está aquí `PLENAMENTE SUBIDA`.

- 16. [ ] **[R]** Unifica la branca de la `feature` con la branca `master` (un `merge`).
> La `feature` está aquí `PLENAMENTE UNIFICADA`.

- 17. [ ] **[R]** Cámbiate a la branca `master`

- 18. [ ] **[C]** Haz pasar todos los tests a la branca unificada resultante.
   - Si los tests son pasados: continúa al siguiente punto.
   - Si los tests no son pasados:
      - Intenta pasarlos.
      - Alternativamente: duplica la `feature` por ahora, y haz rollback en la feature actual.
> La `feature` aquí está `PLENAMENTE INTEGRADA`.

- 19. [ ] **[R]** Cerrar branca.
> La `feature` está aquí `PLENAMENTE CERRADA`.

- 20. [ ] **[-]** Tómate un descanso, respira y estira el cuerpo un poco. Lo mereces porque lo has conseguido.



## Flujo de trabajo del desarrollo de una `feature`

Una `feature` es una característica de la aplicación.

Todo desarrollo de aplicación se hace añadiéndole `features` o características a un software de base.

Toda `feature` tiene su propia `branch` o rama de desarrollo (que es manejado por el control de versiones).

Todo desarrollo de una `feature` sigue un ciclo normal, un flujo de trabajo o `workflow` que el desarrollador va repitiendo.

A continuación se explica paso por paso este `workflow`.

Además, se ha intentado establecer la proporción de tiempo para cada tarea (suponiendo que lo mínimo por tarea fuera un día).

![Dibujo del flujo de trabajo del desarrollo de una feature](docs/workflows/workflow-temporization.mmd.png)

### Sección de contrato

En la sección de contrato, se habla con el cliente (o usuario final) para establecer los requisitos del producto.

#### Definición del `feature`

En este punto se define, genéricamente, el `requisito`, la `solución` y la `implementación`.

En este punto se define:
  
  - ¿Qué necesita proveer y/o resolver el producto (a modo específico)? `#requisitos`
  - ¿Qué necesita cumplir al mismo tiempo (a modo específico)? `#requisitos`
  - ¿Cómo se propone solucionarlo (a modo general)? `#soluciones`
  - ¿Cómo se propone implementarlo (a modo general)? `#implementaciones`

Los requisitos, las soluciones y las implementaciones de la aplicación se definen en `README-Requirements.md`.

#### Apertura del requisito

En este punto se declara abierta esta `feature` (con su `branch` correspondiente).

### Sección de diseño

En la sección de diseño, se plasma la idea completa de la solución ante el requisito o problema, y la implementación o `feature`. Sin código.

#### Diseño de solución

En este punto se explica con palabras no-técnicas, en qué consiste la solución que se propone.

En este punto, simplemente, se desarrolla con palabras que cualquiera entendería:

  - [ ] ¿Cómo se propone solucionar el problema?
  - [ ] ¿Cómo soluciona esta propuesta el problema?

En este punto se define el siguiente tipo de información:

  - [ ] ¿Qué debe poder hacer el usuario que interactúe con esta `feature`?
  - [ ] ¿Qué no debe poder hacer el usuario que interactúe con esta `feature`?
  - [ ] ¿Cómo debe responder la aplicación (y más concretamente la `feature`) ante cierta respuesta?
  - [ ] ¿Cómo no debe responder la aplicación (y más concretamente la `feature`) ante cierta respuesta?
  - [ ] ¿Qué debe ocurrir dada una interacción con la aplicación (que implica funcionalmente a la `feature`)?

En este punto se definen los siguientes tipos de documentos:

  - [ ] Imágenes de prototipos de interfaces de usuario
  - [ ] Imágenes de mockups de interfaces de usuario
  - [ ] Documentación exhaustiva (a nivel de UI/UX) del requisito/solución/implementación o `feature` en `docs/requirements.md`.

*En la redacción de este punto, es importante dividir (y subdividir) los contenidos, incluso asignarles tiempo a cada uno.*

#### Diseño de implementación

En este punto se explica con palabras no-técnicas, en qué consiste la solución concreta (implementación) que se ha propuesto.

En este punto se desarrolla con palabras no-técnicas y programáticas que cualquiera entendería:

  - [ ] ¿Qué hace la implementación?
  - [ ] ¿Qué hace la implementación para solucionar el problema?

En este punto se definen los siguientes tipos de documentos:

  - [ ] Diagramas de árbol: flujos de eventos de la aplicación.
  - [ ] Diagramas de árbol: clases, interfaces, propiedades, métodos, objetos, funciones, parámetros de entrada, parámetros de salida.
  - [ ] Diagramas de árbol: componentes y contenedores (e interdependencias).
  - [ ] Diagramas de árbol: algoritmos de los flujos de datos de la API (no necesariamente un flujo de evento de la aplicación).
  - [ ] Dibujos: componentes y contenedores.
  - [ ] Texto internacionalizado
  - [ ] Documentación estructural y superficial (a nivel de API) de:
     - [ ] clases
     - [ ] interfaces
     - [ ] propiedades
     - [ ] métodos
     - [ ] objetos
     - [ ] funciones
     - [ ] parámetros de entrada
     - [ ] parámetros de salida
     - [ ] flujos de eventos de la aplicación
     - [ ] componentes
     - [ ] contenedores

### Sección de testing

En la sección de testing se codificarán y documentarán en profundidad las especificaciones (o tests) de usuario y unitarias.

#### Especificación de uso

En este punto se codifican y documentan las especificaciones (o tests) de usuario, o `user specifications`, necesarias para solventar el requisito.

En este punto se desarrolla:

  - [ ] [con código] Las comprobaciones suficientes para demostrar la correcta solución (`user tests`) de la `feature`.
  - [ ] [con comentarios] La documentación suficiente de la solución (comentarios en los `user tests`).
  
En este punto se definen los siguientes tipos de documentos:

  - [ ] Código de los tests de usuario demostrando:
     - [ ] las acciones del usuario que demuestran la `feature`
     - [ ] las reacciones de la aplicación que demuestran la `feature`
  - [ ] Imágenes del proceso de `user test`
  - [ ] Documentación de las especificaciones de usuario para esta `feature`.

#### Especificación de unidad

En este punto se codifican y documentan las especificaciones (o tests) unitarias, o `unit specifications`, necesarias para solventar el requisito.

En este punto se desarrolla:

  - [ ] [con código] Las comprobaciones suficientes para demostrar la correcta implementación (`unit tests`) de la `feature`.
  - [ ] [con código] La documentación suficiente de la implementación (comentarios en los `unit tests`).

En este punto se definen los siguientes tipos de documentos:

  - [ ] Código de los tests unitarios demostrando:
     - [ ] la entrada y salida de datos de los métodos, funciones y clases
     - [ ] los valores de las propiedades, los objetos
     - [ ] el correcto trazado/flujo de los eventos
     - [ ] el uso previsto de los componentes
     - [ ] el uso previsto de los contenedores
     - [ ] el reporte de cobertura de código de la `feature`.

Es importante que en este punto se especifique, claramente, paso por paso (cronológicamente al desarrollo), qué debe de ser capaz de hacer la `feature`.

### Sección de codificación

En esta sección se codificará la `feature`, propiamente.

#### Superación de especificaciones

En este punto se codificará la `feature` de manera que pase los dos tests: los `user tests` y los `unit tests`.

Es importante que en este punto:

  - Se proceda paso por paso a completar las especificaciones (de usuario y unitarias) de la `feature`.
  - Se mantenga un control constante del tiempo previsto e invertido en la `feature`.
  - Se advierta y notifique de puntos de conflicto en el desarrollo a tiempo para revisar si hace falta la implementación y la solución.

### Sección de documentación

En esta sección se documentarán exhaustivamente los cambios que la `feature` implica.

#### Documentación de la `feature`

En este punto se documentarán exhaustivamente los cambios que la `feature` implica.

Esta documentación quedará reflejada en los ficheros:

  - `test/user/README-User-tests.md`: los (`user`) tests añadidos para demostrar la presente `feature` deben quedar explicados aquí.
  - `test/unit/README-Unit-tests.md`: los (`unit`) tests añadidos para demostrar la presente `feature` deben quedar explicados aquí.
  - `README-Feature.md`: la `feature` en su totalidad (`requirement`, `solution` e `implementation`) debe quedar explicada en este documento al finalizar el desarrollo de la branch.
  - `src/*.jsx` y `src/*.scss`: la `feature` debe quedar documentada a nivel programático en los comentarios de nuestro código fuente.

### Sección de integración

En esta sección se integrará la `feature` con la branca madre.

#### Subir la `feature`

En este punto subiremos el código de nuestra `feature` al repositorio externo usando un software de control de versiones.

#### Mezclar branca

En este punto se resuelven los `merge conflicts` que pudieran haber al mezclar el nuevo código con el actual.

#### Cerrar branca

En este punto se cierra y elimina la branca, y pasa a considerarse como `feature` finalizada.


# Temporización del proceso de desarrollo de una `feature`

1 día:  Definición del `feature` (3% -- toma 02:30 minutos de 1 hora aproximadamente)

1 día:  Apertura del requisito (3% -- toma 02:30 minutos de 1 hora aproximadamente)

4 días: Diseño de solución (15% -- toma 09:00 minutos de 1 hora aproximadamente)

4 días: Diseño de implementación (15% -- toma 09:00 minutos de 1 hora aproximadamente)

2 días: Especificación de uso (7% -- toma 04:30 minutos de 1 hora aproximadamente)

2 días: Especificación de unidad (7% -- toma 04:30 minutos de 1 hora aproximadamente)

6 días: Superación de especificaciones (22% -- toma 15:00 minutos de 1 hora aproximadamente)

3 días: Documentación de la `feature` (11% -- toma 07:30 minutos de 1 hora aproximadamente)

1 día:  Subir la `feature` (3% -- toma 02:30 minutos de 1 hora aproximadamente)

2 días: Mezclar branca (7% -- toma 04:30 minutos de 1 hora aproximadamente)

1 día:  Cerrar branca (3% -- toma 02:30 minutos de 1 hora aproximadamente)







