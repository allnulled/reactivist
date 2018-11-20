/**
 *
 * ----
 *
 * ### `grunt export:mobile`
 *
 * **Parámetros:** `package.json`, `settings.grunt.export:mobile.{env}.package`, `settings.grunt.export:mobile.{env}.title`.
 * 
 * **Descripción:** Genera una aplicación móvil con `Cordova` del proyecto en `dist-mobile`.
 *
 */
module.exports = (grunt) =>
	function() {
		const Logger = require("colorized-logger").ColorizedLogger.create(
			"<:export:mobile>",
			["white", "bold", "bgBlue"]
		);
		const fs = require("fs-extra");
		const path = require("path");
		const rimraf = require("rimraf");
		const exec = require("execute-command-sync");
		const done = this.async();
		const settings = require(__dirname + "/../settings.js");
		// @TODO: copy all files from dist to dist-mobile
		const base = path.resolve(__dirname + "/..");
		const dist = path.resolve(base, "dist");
		const srcMobile = path.resolve(base, "dist-mobile/original");
		const wwwMobile = path.resolve(srcMobile, "www");
		rimraf.sync(srcMobile);
		const cmd = `./node_modules/.bin/cordova create dist-mobile/original ${JSON.stringify(
				settings._get("export:mobile.package")
			)} ${JSON.stringify(settings._get("export:mobile.title"))}`
		console.log(cmd);
		exec(cmd,{cwd: base});
		// @TODO: create and modify dist-mobile/package.json in order to fit the settings.js configurations.
		fs.copySync(dist, srcMobile);
		exec("npm init -y", {
			cwd: srcMobile
		});

		var pkg = require(path.resolve(base, "dist-mobile/original/package.json"));
		var originalPkg = require(path.resolve(base, "package.json"));
		pkg.name = originalPkg.name + "-pc";
		pkg.main = "./index.html";
		pkg = Object.assign(pkg, {
			//
			devDependencies: {
				cordova: "8.1.2"
			}
		});
		fs.writeFileSync(
			path.resolve(srcMobile, "package.json"),
			JSON.stringify(pkg, null, 4)
		);
		exec("npm i", {
			cwd: srcMobile
		});
		// @TODO: generate PC application:
		exec("./node_modules/.bin/cordova platform add android", {
			cwd: srcMobile
		});
		exec("./node_modules/.bin/cordova platform add ios", {
			cwd: srcMobile
		});
		exec(
			"./node_modules/.bin/cordova build android .",
			{
				cwd: srcMobile
			}
		);
		done();
	};
