# Reactivist: una plantila de proyecto para componentes React

***Reactivist*** es una nueva *plantila de proyecto para componentes React* basada en:

|Parte |Contribución |
|--------------:|------------------|
| **Componentes:** | React |
| **Eventos:** | Redux |
| **Estilos:** | Sass |
| **Módulos:** | Browserify |
| **Tests de usuario:** | Cypress |
| **Tests unitarios:** | QUnit/Electron |
| **Cobertura de código:** | NYC |
| **Documentación:** | Javadoc/Markdown/Mermaid |
| **Desarrollo:** | Grunt/Chokidar/Socket.io/... |
| **Incluye:** | Flujos de trabajo definidos |
|  | Comandos por defecto y personalizables |
|  | Configuraciones de los comandos |
|  | Configuraciones de entorno |
|  | Tests unitarios en vivo |
|  | Tests de usuario en vivo |
|  | Simples pero avanzadas herramientas |
|  | Método de trabajo definido |

# Índice

1. [Índice](#indice)
2. [Instalación](#instalación)
3. [Referencia de la CLI](#referencia-de-la-cli)
4. [Arquitectura](#arquitectura)
5. [Requisitos](#requisitos)
6. [Flujos de trabajo](#flujos-de-trabajo)
7. [Referencia de la API](#referencia-de-la-api)
8. [Tests de usuario](#tests-de-usuario)
9. [Tests unitarios](#tests-unitarios)
10. [Comandos](#comandos)
11. [Cambios](#changelog)
12. [Licencia](#licencia)

# Instalación

Para instalar la herramienta `reactivist` sólo tienes que ejecutar en tu línea de comandos:

~$ `npm install --save-dev reactivist`


Si quieres poder ejecutar el comando de CLI de `reactivist` en cualquier parte fácilmente:

~$ `npm install --global reactivist`


# Referencia de la CLI

Para crear un nuevo proyecto `reactivist`, simplemente ejecuta en línea de comandos:

```
 ~$ reactivist --folder "src/components/MyNewComponent" 
```

Optionalmente, se pueden proporcionar estas opciones:

```
    [--name "MyNewComponent"]             # Nombre general
    [--package "my-new-component-module"] # Nombre del paquete npm, para el package.json#name
```

Entonces, los ficheros de un proyecto `reactivist` básicos se copiarán, y las dependencias correspondientes se instalarán (en un proyecto nuevo, si es necesario).




