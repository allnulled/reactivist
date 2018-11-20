module.exports = function(grunt) {
	const ColorizedLogger = require("colorized-logger").ColorizedLogger;
	const Logger = ColorizedLogger.create("<grunt>", ["black", "bold", "bgWhite"]);
	const path = require("path");
	grunt.initConfig({});
	grunt.option('stack', true);
	require("globby").sync(`${__dirname}/dev/grunt:*.js`).forEach(function(file) {
		const task = path.basename(file).replace(/^grunt\:/g, "").replace(/\.js$/g, "");
		const specificLogger = ColorizedLogger.create(`<grunt@${task}>`)
		Logger.log(`@defining task: ${task}.`);
		grunt.registerTask(task, require(file)(grunt, specificLogger));
	});
};
