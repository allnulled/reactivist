/**
 * 
 * ----
 *
 * ### `grunt build`
 * 
 * **Subtareas:** 
 * 
 * - `clean`
 * - `build:lock`
 * - `i18n`
 * - `sass`
 * - `pack`
 * - `docs`
 * - `build:unlock`
 * - `dist`
 * 
 * **Descripción:** Limpia, inernacionaliza, estiliza, empaqueta, documenta y distribuye el código fuente.
 * 
 */
module.exports = () => [
	"clean",
	"build:lock",
	"i18n",
	"sass",
	// "pack-css",
	"pack",
	"docs",
	// "unit",
	// "e2e",
	"build:unlock",
	"dist"
];
