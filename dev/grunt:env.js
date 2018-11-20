/**
 *
 * ----
 *
 * ### `grunt env`
 *
 * **Parámetros:** `-e` / `--environment`. `{String}`.
 *
 * **Descripción:** Establece el entorno. Ejemplo: `grunt env -e=test`, `grunt env --environment=production`...
 *
 */
module.exports = (grunt) =>
	function() {
		const Logger = require("colorized-logger").ColorizedLogger.create("<:env>", ["white", "bold", "bgBlue"]);
		const exec = require("execute-command-sync");
		const path = require("path");
		const fs = require("fs");
		const args = require("yargs")
			.version("1.0.3")
			.option("environment", {
				type: "string",
				alias: "e",
				default: undefined,
				describe: "Environment to be set. Available: 'test', any other string",
				help: "help"
			}).argv;
		Logger.log("@started");
		const settings = require(__dirname + "/../settings.json");
		Logger.log(`@setting environment from ${settings.env} to ${args.e}`);
		settings.env = args.e;
		fs.writeFileSync(__dirname + "/../settings.json", JSON.stringify(settings, null, 4), "utf8");
		Logger.log(`@changing environment in /src too.`);
		const settingsSrc = require(__dirname + "/../src/settings.json");
		settingsSrc.env = args.e;
		fs.writeFileSync(__dirname + "/../src/settings.json", JSON.stringify(settingsSrc, null, 4), "utf8");
		Logger.log("@done");
	};
