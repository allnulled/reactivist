/**
 *
 * ----
 *
 * ### `grunt i18n`
 *
 * **Parámetros:** `settings.grunt.i18n.{env}.files`, `settings.grunt.i18n.{env}.outFile`, `settings.grunt.i18n.{env}.options`.
 *
 * **Descripción:** Genera un fichero de tipo JSON a partir de los ficheros de traducción de `i18n/*.po` en `i18n/i18n.json`.
 *
 */
module.exports = (grunt) =>
	function() {
		const Logger = require(`colorized-logger`).ColorizedLogger.create(
			`<:i18n>`,
			[`white`, `bold`, `bgBlue`]
		);
		Logger.log("@started");
		const settings = require(`${__dirname}/../settings.js`);
		const path = require("path");
		const globby = require("globby");
		const fs = require("fs-extra");
		const Utils = require(__dirname + "/utils.js");
		const po2json = require("po2json");
		const filePatterns = Utils.mapPatternsFromBase(
			settings._get("i18n.files")
		);
		const files = globby.sync(filePatterns);
		const outFiles = Utils.mapPatternsFromBase(
			settings._get("i18n.outFile")
		);
		const options = settings._get("i18n.options");
		const data = {};
		files.forEach((file) => {
			const lang = path.basename(file).replace(/\.po$/g, "");
			const values = po2json.parseFileSync(file, options);
			Logger.log(
				`Packing translations for ${lang} (${
					Object.keys(values).length
				} entries).`
			);
			data[lang] = values;
		});
		outFiles.forEach((outFile) => {
			fs.writeFileSync(outFile, JSON.stringify(data, null, 4), "utf8");
		});
		Logger.log("@done");
	};
