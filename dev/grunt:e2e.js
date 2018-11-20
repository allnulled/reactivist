/**
 *
 * ----
 *
 * ### `grunt e2e`
 *
 * **Parámetros:** `cypress.json`
 *
 * **Descripción:** Inicia los tests de [Cypress](https://docs.cypress.io/api/api/table-of-contents.html). 
 *
 */
module.exports = (grunt) =>
	function() {
		const Logger = require("colorized-logger").ColorizedLogger.create("<:e2e>", ["white", "bold", "bgBlue"]);
		const exec = require("execute-command-sync");
		const path = require("path");
		Logger.log("@started");
		exec("./node_modules/.bin/cypress run", {
			cwd: path.resolve(__dirname + "/..")
		});
		Logger.log("@done");
	};
