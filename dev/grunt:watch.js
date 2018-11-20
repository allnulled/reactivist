/**
 *
 * ----
 *
 * ### `grunt watch`
 * 
 * **Parámetros:** `grunt.watch.{env}.*`
 * 
 * **Descripción:** Establece escucha de ficheros. Al detectar cambios, ejecutará `grunt build`.
 * 
 */
module.exports = (grunt) =>
	function() {
		const Logger = require(`colorized-logger`).ColorizedLogger.create(`<:watch>`, [
			`white`,
			`bold`,
			`bgBlue`
		]);
		const path = require("path");
		const chokidar = require(`chokidar`);
		const exec = require(`execute-command-sync`);
		const request = require("request");
		const globby = require("globby");
		const Utils = require(__dirname + "/utils.js");
		const done = this.async();
		Logger.log(`@started`);
		Logger.log("@getting concerned settings");
		const settings = require(`${__dirname}/../settings.js`);
		const filePatterns = Utils.mapPatternsFromBase(settings._get("watch.files"));
		const files = globby.sync(filePatterns);
		const options = Object.assign({}, settings._get("watch.options"));
		Logger.log(`@start watching files:\n - ${files.join("\n - ")}`);
		chokidar.watch(files, options).on(`change`, (event, file) => {
			Logger.log("Event fired.");
			//grunt.task.clearQueue();
			exec("grunt build", {
				cwd: path.resolve(`${__dirname}/..`)
			});
			const uri = `http://${settings._get("serve.host")}:${settings._get("serve.port")}/@autorefresh`;
			Logger.log("Refreshing...", uri);
			request({
				method: "GET",
				uri: uri
			}, function(error, response, body) {
				Logger.log("Body of the response:", body);
			});
		});
	};
