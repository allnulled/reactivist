/**
 * 
 * ----
 * 
 * ### `grunt build:unlock`
 * 
 * **Descripción:** Modifica el fichero `grunt:build.json` para que indique que el proceso `grunt build` no está siendo ejecutado. No es una tarea pensada para el usuario, sino para otras tareas.
 * 
 */
module.exports = (grunt) =>
	function() {
		const Logger = require(`colorized-logger`).ColorizedLogger.create(
			`<:build:unlock>`,
			[`white`, `bold`, `bgGreen`]
		);
		Logger.log("@started");
		Logger.log("@getting concerned settings");
		const build = require(`${__dirname}/grunt:build.json`);
		Logger.log(`@unlocking grunt:build task`);
		require(`fs`).writeFileSync(
			`${__dirname}/grunt:build.json`,
			JSON.stringify({ locked: false }),
			`utf8`
		);
		grunt.config("build:lock:finished", true);
		Logger.log(`@done`);
	};
