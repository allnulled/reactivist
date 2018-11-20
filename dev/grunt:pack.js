/**
 *
 * ----
 *
 * ### `grunt pack`
 *
 * **Parámetros:** `settings.grunt.pack.{env}.*`, `settings.grunt.unit.{env}.*`
 *
 * **Descripción:** Transpila los ficheros desde `src/index.jsx` y genera el `src/bundle.js`. En entorno `"test"`, también genera el `unit/test/dist/bundle.test.js` a partir de `unit/test/src/index.jsx`.
 *
 */
module.exports = (grunt) =>
	function() {
		const done = this.async();
		const Logger = require("colorized-logger").ColorizedLogger.create(
			"<:pack>",
			["white", "bold", "bgBlue"]
		);
		const globby = require("globby");
		const browserify = require("browserify");
		const fs = require("fs-extra");
		const requireNewly = require("require-newly");
		const _async = require("async");
		const path = require("path");
		const Utils = require(__dirname + "/utils.js");
		const settings = requireNewly(`${__dirname}/../settings.js`);
		const deepExtend = require("deep-extend");
		const asyncPack = function(input, browserifyOpts, output, callback) {
			const stream = browserify(input, browserifyOpts).bundle();
			stream.on("end", () => {
				if (callback) {
					callback();
				}
			});
			stream.pipe(fs.createWriteStream(output));
		};
		Logger.log("@started");
		const filePatterns = Utils.mapPatternsFromBase(
			settings
				._get("pack.files")
				.concat(["!**/node_modules/**"])
				.concat("!" + settings._get("pack.outFile"))
		);
		const files = globby.sync(filePatterns);
		const outFile = Utils.mapPatternsFromBase(
			settings._get("pack.outFile")
		)[0];
		process.env.NODE_ENV = settings.env; 			
		_async.series(
			[
				function(doneItem) {
					Logger.log("@selecting src/*.jsx files");
					const browserifyOptions = settings._get("pack.options");
					Object.keys(browserifyOptions.transform).filter(key => {
						if(browserifyOptions.transform[key] instanceof Array 
							&& browserifyOptions.transform[key].length > 0
							&& browserifyOptions.transform[key][0] === "browserify-istanbul"
						) {
							browserifyOptions.transform.splice(key, 1)
						}
					});
					asyncPack(files, browserifyOptions, outFile, () => {
						Logger.log("@input:", files);
						Logger.log("@options:", browserifyOptions);
						Logger.log("@output:", outFile);
						Logger.log("@done");
						doneItem();
					});
				},
				function(doneItem) {
					// if 'test' mode is set:
					if (settings.env !== "test") {
						return doneItem();
					}
					// ...add test files (grunt.unit.scripts.**/*.jsx) to bundle.
					Logger.log("@detected test environment");
					const testFiles = globby.sync(
						Utils.mapPatternsFromBase(
							settings._get("unit.files")
						)
					);
					const outFileTest = path.resolve(
						`${__dirname}/../${settings._get("unit.outFile")}`
					);
					const browserifyOptionsForTest = requireNewly(`${__dirname}/../settings.js`)._get("pack.options");
					asyncPack(testFiles, browserifyOptionsForTest, outFileTest, () => {
						Logger.log("@input (test):", testFiles);
						Logger.log("@options (test):", browserifyOptionsForTest);
						Logger.log("@output (test):", outFileTest);
						Logger.log("@done (test)");
						doneItem();
					});
				}
			],
			function(error, data) {
				if (error) throw error;
				done();
			}
		);
	};
