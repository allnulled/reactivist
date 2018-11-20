/**
 *
 * ----
 *
 * ### `grunt dist`
 *
 * **Parámetros:** `settings.grunt.dist.{env}.files`, `settings.grunt.dist.{env}.options`
 *
 * **Descripción:** Genera imágenes de los ficheros `mmd` (Mermaid) en función de los parámetros.
 *
 */
module.exports = (grunt) =>
	function() {
		const Logger = require("colorized-logger").ColorizedLogger.create(
			"<:dist>",
			["white", "bold", "bgBlue"]
		);
		const globby = require("globby");
		const fs = require("fs-extra");
		const rimraf = require("rimraf");
		const path = require("path");
		const Utils = require(`${__dirname}/utils.js`);
		const settings = require(`${__dirname}/../settings.js`);
		Logger.log("@started");
		Logger.log("@getting concerned settings");

		Logger.log("@removing files from 'dist' folder");
		rimraf.sync(`${__dirname}/../dist/*`);
		Logger.log("@copying files to 'dist' folder");
		// Copy files from src/{patterns} to dist/{files}
		const filePatterns = Utils.mapPatternsFromBase(settings._get("dist.files"));
		Logger.log(filePatterns);
		const files = globby.sync(filePatterns);
		const options = Object.assign({}, settings._get("dist.options"));
		files.forEach((file) => {
			const fileAppendix = file
				.replace(path.resolve(__dirname, ".."), "")
				.replace(/^\//g, "")
				.replace(/^[^\/]+\//g, "dist/")
				.replace(/^\//g, "");
			const fileDst = path.resolve(
				__dirname, 
				"..", 
				fileAppendix
			);
			Logger.log(`Distributing file: ${file} to ${fileDst}.`);
			Logger.log(`@copying to dist file ${file}`);
			Logger.log(`@copying to dist file ${fileDst}`);
			Logger.log(`@copying to dist file ${fileAppendix}`);
			try {
				fs.ensureFileSync(file);
				fs.ensureFileSync(fileDst);
				fs.copyFileSync(file, fileDst);
			} catch (exc) {
				Logger.log(`Error with file: ${file} and ${fileDst}.`);
			}
		});
		Logger.log("@done");
	};
