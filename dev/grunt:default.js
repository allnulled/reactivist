/**
 *
 * ----
 * 
 * ### `grunt default`
 *
 * **Descripción:** Imprime una explicación de cómo iniciar el modo desarrollo.
 *
 */
module.exports = (grunt) =>
	function() {
		const Logger = require(`colorized-logger`).ColorizedLogger.create(
			`<:default>`,
			[`red`, `bold`, `bgYellow`]
		);
		Logger.log("Run 'grunt serve' and 'grunt watch' simultaneously to start development mode.");
	};

