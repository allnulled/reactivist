import Component from "../../../src/component.jsx";
import Logger from "./helpers/logger.jsx";
import "qunit";

export default {
	Logger: Logger,
	/**
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 */
	run: function(done) {

		Logger.log("Logger works chill.");

		/**
		 * 
		 * 
		 * 
		 * 
		 * 
		 */
		QUnit.test("First test", function(assert) {
			const doneTest = assert.async();
			assert.ok(true, "Tests started successfully!");
			setTimeout(doneTest, 1);
		});

		/**
		 * 
		 * 
		 * 
		 * 
		 * 
		 */
		QUnit.test("Last test", function(assert) {
			const doneTest = assert.async();
			assert.ok(true, "Tests finished successfully!");
			setTimeout(() => {
				done();
				doneTest();
			}, 1);
		});
	}
};
