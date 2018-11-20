const { assert, expect } = require("chai");


/**
 * 
 * # Tests de usuario
 * 
 * 
 * ----
 * 
 * **Dado...**
 *  
 *   - Un contexto
 *   - Unas acciones de usuario (unos estados)
 *   - Una parte de la UI
 * 
 * **Cuando...**
 * 
 *   - Una acción de usuario
 * 
 * **Espera...**
 * 
 *   - Una reacción en la UI
 * 
 * ----
 * 
 */
describe("<Component> class", function() {

	/**
	 * 
	 * 
	 */
	it("got e2e feature 1", function(doneTest) {
		this.timeout(20000);
		// Arrange - setup initial app state -
		//    - visit a web page
		cy.readFile("/settings.json").then(settings => {
			cy.visit(`http://${settings.grunt.serve.host}:${settings.grunt.serve.port}`);
			//    - query for an element
			// @TODO:
			// 
			// 
			// Act - take an action -
			//    - interact with that element
			// @TODO:
			// 
			// 
			// Assert - make an assertion -
			//    - make an assertion about page content
			// @TODO:
			// 
			// 
			setTimeout(doneTest, 1000);
		});
	});

	/**
	 * 
	 * 
	 * 
	 */
	it("accomplished e2e feature 2", function(doneTest) {
		this.timeout(20000);
		// Arrange - setup initial app state -
		//    - visit a web page
		cy.readFile("/settings.json").then(settings => {
			cy.visit(`http://${settings.grunt.serve.host}:${settings.grunt.serve.port}`);
			//    - query for an element
			// @TODO:
			// 
			// 
			// Act - take an action -
			//    - interact with that element
			// @TODO:
			// 
			// 
			// Assert - make an assertion -
			//    - make an assertion about page content
			// @TODO:
			// 
			// 
			setTimeout(doneTest, 1000);
		});
	});

});