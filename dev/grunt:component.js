/**
 * 
 * ----
 * 
 * ### `grunt component`
 * 
 * **Parámetros:** 
 * 
 * - `-f | --folder`: opcional.
 * - `-n | --name`: opcional.
 * - `-p | --package`: opcional.
 * 
 * **Descripción:** Crea un nuevo componente en `src/components/{componente}` como un nuevo `Proyecto Reactivist` dentro del proyecto.
 * 
 */
module.exports = (grunt) =>
	function() {
		const Logger = require("colorized-logger").ColorizedLogger.create("<:component>", ["white", "bold", "bgBlue"]);
		const path = require("path");
		Logger.log("@started");
		require(path.resolve(__dirname + "/../bin/reactivist.bin.js"));
		Logger.log("@done");
	};
