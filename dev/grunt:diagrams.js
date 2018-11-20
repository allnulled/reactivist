/**
 *
 * ----
 * 
 * ### `grunt diagrams`
 *
 * **Parámetros:** `settings.grunt.diagrams.{env}.files`
 *
 * **Descripción:** Genera imágenes de los ficheros `mmd` (Mermaid) en función de los parámetros.
 *
 */
module.exports = (grunt) =>
	function() {
		const Logger = require(`colorized-logger`).ColorizedLogger.create(`<:docs:diagrams>`, [
			`white`,
			`bold`,
			`bgBlue`
		]);
		const path = require(`path`);
		const globby = require(`globby`);
		const settings = require(path.resolve(__dirname, "..", "settings.js"));
		const exec = require(`execute-command-sync`);
		Logger.log(`@started`);
		const files = globby.sync(path.resolve(__dirname, "..", settings._get("diagrams.files")));
		files.forEach(file => {
			const command = `./node_modules/.bin/mmdc -i "${file}" -o "${file}.png" -b "#E8E8E8" -C "${__dirname}/grunt:diagrams.css"`;
			Logger.log(`Executing command: ${command}`);
			//*
			exec(command, {
				cwd: path.resolve(__dirname + "/..")
			});
			//*/
		})
		Logger.log("@done");
	};
