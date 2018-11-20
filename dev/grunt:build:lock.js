/**
 * 
 * ----
 * 
 * ### `grunt build:lock`
 * 
 * **Descripción:** Modifica el fichero `grunt:build.json` para que indique que el proceso `grunt build` está siendo ejecutado. No es una tarea pensada para el usuario, sino para otras tareas.
 * 
 */
module.exports = (grunt) =>
	function() {
		const Logger = require(`colorized-logger`).ColorizedLogger.create(`<:build:lock>`,[`red`, `bold`, `bgYellow`]);
		const fs = require(`fs`);
		Logger.log(`@started`);
		Logger.log(`@getting concerned settings`);
		const build = fs.existsSync(`${__dirname}/grunt:build.json`) ? require(`${__dirname}/grunt:build.json`) : { locked: false };
		if (build.locked) {
			Logger.log(`@grunt:build task is locked`);
			Logger.log(`@aborting grunt:build task`);
			grunt.fail.warn(
				`Task grunt:build is currently locked and must be aborted.\n` +
					`To unlock it, simply delete the file ~/dev/grunt:build.json.\n`
			);
		} else {
			Logger.log(`@grunt:build task is not locked`);
			Logger.log(`@locking grunt:build task`);
			process.stdin.resume();
			process.on("exit", function() {
				// Unlock when it is being accessed (not 100% safe, but enough for now at least)
				fs.writeFileSync(
					`${__dirname}/grunt:build.json`,
					JSON.stringify({
						locked: false
					}),
					`utf8`
				);
			});
			fs.writeFileSync(
				`${__dirname}/grunt:build.json`,
				JSON.stringify({
					locked: true
				}),
				`utf8`
			);
			Logger.log(`@done`);
		}
	};
