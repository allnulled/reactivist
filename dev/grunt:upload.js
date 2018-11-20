/**
 *
 * ----
 *
 * ### `grunt upload`
 * 
 * **Parámetros:** `grunt.upload.{env}.*`
 * 
 * **Descripción:** Selecciona los ficheros, los añade al `commit` actual, e intenta hacer un `push` al repositorio remoto.
 * 
 */
module.exports = (grunt) =>
	function() {
		const Logger = require(`colorized-logger`).ColorizedLogger.create(`<:upload>`, [
			`white`,
			`bold`,
			`bgBlue`
		]);
		const exec = require(`execute-command-sync`);
		const path = require("path");
		const chokidar = require(`chokidar`);
		const request = require("request");
		const globby = require("globby");
		const Utils = require(__dirname + "/utils.js");
		const done = this.async();
		Logger.log(`@started`);
		Logger.log("@getting concerned settings");
		const settings = require(`${__dirname}/../settings.js`);
		const filePatterns = Utils.mapPatternsFromBase(settings._get("upload.files"));
		const files = globby.sync(filePatterns);
		files.forEach(file => {
			exec(`git add ${JSON.stringify(file)}`, {
				cwd: path.resolve(`${__dirname}/..`)
			});
		});
		exec("git commit", {
			cwd: path.resolve(`${__dirname}/..`)
		});
		exec("git push", {
			cwd: path.resolve(`${__dirname}/..`)
		});
		Logger.log("@end");
		done();
	};
