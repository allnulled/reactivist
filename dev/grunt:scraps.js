/**
 *
 * ----
 *
 * ### `grunt scraps`
 *
 * **Parámetros:**
 *
 * **Descripción:** Ejecuta los scripts bajo `scraps/scripts/*.js` en orden natural con Electron, y el módulo `web2os` disponible.
 *
 * Este comando está pensado para ciertos contextos en los que puede ser importante extraer información de otras páginas web en vivo mediante un navegador.
 *
 * Consultar ejemplos y API oficial de `web2os` para saber más sobre esta opción.
 *
 */
module.exports = (grunt) =>
	function() {
		const done = this.async();
		const Logger = require(`colorized-logger`).ColorizedLogger.create(
			`<:scraps>`,
			[`white`, `bold`, `bgRed`]
		);
		const exec = require("execute-command-sync");
		const Utils = require("./utils");
		const settings = require(`${__dirname}/../settings.js`);
		const globby = require("globby");
		const path = require("path");
		const filePatterns = Utils.mapPatternsFromBase(
			settings._get("scraps.files")
		);
		Logger.log("Found files:", filePatterns);
		const files = globby.sync(filePatterns);
		Logger.log("Found files:", files);
		files.forEach((file) => {
			const command = `./node_modules/.bin/electron ${JSON.stringify(file)}`;
			Logger.log("@command:" + command);
			exec(command, {
				cwd: path.resolve(__dirname + "/..")
			});
		});
		done();
	};
