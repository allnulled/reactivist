/**
 *
 * ----
 *
 * ### `grunt sass`
 *
 * **Parámetros:** `settings.grunt.sass.{env}.*`, `settings.grunt.unit.{env}.*`
 *
 * **Descripción:** Transpila los ficheros desde `src/index.scss` y genera el `src/bundle.css`. En entorno `"test"`, también genera el `unit/test/dist/bundle.test.css` a partir de `unit/test/src/index.scss`.
 *
 */
module.exports = (grunt) =>
	function() {
		const done = this.async();
		const Logger = require("colorized-logger").ColorizedLogger.create(
			"<:sass>",
			["white", "bold", "bgBlue"]
		);
		const globby = require("globby");
		const sass = require("node-sass");
		const fs = require("fs");
		const Utils = require(__dirname + "/utils.js");
		const path = require("path");
		const settings = require(__dirname + "/../settings.js");
		const CleanCSS = require("clean-css");
		Logger.log("@started");
		Logger.log("@transpiling scss entry file");
		const sassFile = globby.sync(
			Utils.mapPatternsFromBase(settings._get("sass.file"))
		)[0];
		const outFile = path.resolve(`${__dirname}/..`,settings._get("sass.outFile"));
		Logger.log(`SCSS entry file: ${sassFile}`);
		Logger.log(`SCSS output file: ${outFile}`);
		const result = sass.renderSync({
			file: sassFile,
			outFile: outFile,
			outputStyle: "nested"
		});
		fs.writeFileSync(outFile, result.css);
		Logger.log("@ok");
		if (settings.env === "test") {
			Logger.log("@detected test environment");
			Logger.log("@transpiling scss entry file (test)");
			const sassFileTest = globby.sync(
				Utils.mapPatternsFromBase(settings._get("unit.cssFile"))
			)[0];
			const outFileTest = path.resolve(
				`${__dirname}/..`,
				settings._get("unit.cssOutFile")
			);
			Logger.log(`SCSS entry file (test): ${sassFileTest}`);
			Logger.log(`SCSS output file (test): ${outFileTest}`);
			const result = sass.renderSync({
				file: sassFileTest,
				outFile: outFileTest,
				outputStyle: "nested"
			});
			fs.writeFileSync(outFileTest, result.css);
			Logger.log("@ok (test)");
		}
		Logger.log("@done");
		done();
	};
