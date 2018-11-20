/**
 *
 * ----
 *
 * ### `grunt unit`
 * 
 * **Descripción:** Arranca los tests unitarios.
 * 
 */


//*
module.exports = (grunt) =>
	function() {
		const Logger = require(`colorized-logger`).ColorizedLogger.create(`<:unit>`, [
			`white`,
			`bold`,
			`bgBlue`
		]);
		const done = this.async();
		const exec = require("execute-command-sync");
		const settings = require(__dirname + "/../settings.js");
		const entry = settings._get("unit.entry");
		const path = require("path");
		const entryFinal = entry.indexOf("http") === 0 ? entry : path.resolve(__dirname + "/..", entry);
		Logger.log("@start");
		const command = `./node_modules/.bin/electron${entryFinal.indexOf("http") === 0 ? "-open" : ""} ${entryFinal}`;
		Logger.log(`@executing command ${command}`);
		exec(command, {
			cwd: __dirname + "/.."
		});
		Logger.log("@end");
		return done();
	};


