/**
 *
 * ----
 *
 * ### `grunt javadoc`
 *
 * **Parámetros:** `settings.grunt.docs.{env}.options`
 *
 * **Descripción:** Genera la documentación, en formato `json` o `markdown`, de los comentarios tipo Javadoc de los ficheros especificados. Se pueden especificar una lista de configuraciones, y generará un fichero distinto cada vez.
 *
 */
module.exports = (grunt) =>
	function() {
		const done = this.async();
		const Logger = require(`colorized-logger`).ColorizedLogger.create(`<:docs:code>`, [
			`white`,
			`bold`,
			`bgBlue`
		]);
		const path = require(`path`);
		const javadoc = require(`javadoc`);
		const fs = require(`fs-extra`);
		const globby = require(`globby`);
		const Utils = require(__dirname + "/utils.js");
		const settings = require(`${__dirname}/../settings.js`);
		Logger.log(`@started`);
		const allDocsParams = settings._get("docs.options");
		Logger.log("@exporting documentation", allDocsParams);
		allDocsParams.forEach(docParam => {
			const _include = docParam.include;
			const _exclude = docParam.exclude;
			const _output = docParam.output;
			const _format = docParam.format;
			const _includePatterns = Utils.mapPatternsFromBase(docParam.include);
			const _includeFiles = globby.sync(_includePatterns);
			const _excludePatterns = Utils.mapPatternsFromBase(docParam.exclude);
			const _excludeFiles = globby.sync(_excludePatterns);
			const _outputFile = path.resolve(`${__dirname}/..`, docParam.output);
			const opts = {
				include: _includeFiles,
				exclude: _excludeFiles,
				output: _outputFile,
				format: docParam.format
			};
			Logger.log("Javadoc options:", opts);
			javadoc.generate(opts);
		});
		Logger.log("@ok");
		const unifiedDocParams = settings._get("docs.unifications");
		Logger.log("@exporting documentation (from documents unification)", unifiedDocParams);
		unifiedDocParams.forEach(unifiedDocParam => {
			const _include = Utils.mapPatternsFromBase(unifiedDocParam.include);
			const _output = Utils.mapPatternsFromBase(unifiedDocParam.output)[0];
			const _files = globby.sync(_include);
			var _contents = "";
			_files.forEach(file => {
				_contents += fs.readFileSync(file).toString() + "\n\n\n";
			});
			fs.outputFileSync(_output, _contents, "utf8");
		});
		Logger.log("@done");
		setTimeout(done, 0);
	};
