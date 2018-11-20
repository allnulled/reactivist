/**
 *
 * ----
 *
 * ### `grunt imports`
 *
 * **Parámetros:** `settings.grunt.imports.{env}.files`
 *
 * **Descripción:** Importa los ficheros especificados como clave (URLs o ficheros) a los ficheros especificados como valor del mapa `settings.grunt.imports.{env}.files`.
 *
 */
module.exports = (grunt) =>
	function() {
		const Logger = require(`colorized-logger`).ColorizedLogger.create(
			`<:serve>`,
			[`white`, `bold`, `bgBlue`]
		);
		Logger.log("@start");
		const doneCommand = this.async();
		const _async = require("async");
		const fs = require("fs-extra");
		const path = require("path");
		const download = require("download");
		const settings = require(__dirname + "/../settings.js");
		const filesMap = settings._get("imports.files");
		const transformPath = (f) =>
			f.indexOf(".") === 0
				? f.replace(".", path.resolve(__dirname + "/.."))
				: f;
		const asyncDownloads = [];
		for (var fileFrom in filesMap) {
			const fileTo = filesMap[fileFrom];
			const fileIn = transformPath(fileFrom);
			const fileOut = transformPath(fileTo);
			const asyncDownload = function(doneItem) {
				Logger.log(`@downloading\n\t- From: ${fileIn}\n\t- To: ${fileOut}`);
				if (fileIn.indexOf("/") === 0) {
					fs.copyFileSync(fileIn, fileOut);
					doneItem();
				} else {
					download(fileIn, fileOut)
						.then((data) => {
							Logger.log(
								`@successfully '${path.basename(fileIn)}' > '${path.basename(fileOut)}'!`
							);
							doneItem();
						})
						.catch((error) => {
							Logger.log(
								`@error trying to download or dump files:\n\t- From: ${path.basename(fileIn)}\n\tTo: ${path.basename(fileOut)}`,
								error
							);
						});
				}
			};
			asyncDownloads.push(asyncDownload);
		}
		_async.parallel(asyncDownloads, function() {
			Logger.log("@done");
			doneCommand();
		});
	};
