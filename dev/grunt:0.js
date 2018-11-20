/**
 * 
 * ----
 *
 * ## Comandos
 * 
 * Los ficheros `gruntfile.js` y `dev/grunt:*.js` son los encargados de hacer funcionar los comandos de `Reactivist`.
 * 
 * Para crear tu propio comando, crea un nuevo fichero `dev/grunt:<%comando%>.js` tomando como plantilla a `dev/grunt:0.js`.
 * 
 * A continuación se listan los comandos que `Reactivist` proporciona por defecto.
 * 
 * 
 */
module.exports = (grunt) =>
	function() {
		const _async = this.async();
		console.log("You can see me running 'grunt 0' from the root of the project.");
		setTimeout(_async, 5000);
	};
