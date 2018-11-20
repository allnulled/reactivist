/**
 * 
 * ----
 * 
 * ### `grunt clean`
 * 
 * **Parámetros:** `settings.grunt.clean.{env}.files`
 * 
 * **Descripción:** Limpia el proyecto en función de los parámetros.
 * 
 */
module.exports = (grunt) => {
	return function() {
		const Logger = require(`colorized-logger`).ColorizedLogger.create(
			`<:clean>`,
			[`red`, `bold`, `bgYellow`]
		);
		const path = require("path");
		const Utils = require(`${__dirname}/utils.js`);
		const rimraf = require("rimraf");
		const settings = require(__dirname + "/../settings.js");
		Logger.log("@starting");
		Utils.mapPatternsFromBase(settings._get("clean.files")).forEach(filePattern => {
			Logger.log(`@deleting ${filePattern}`);
			rimraf.sync(filePattern);
		});
		Logger.log("@done");
	};
};