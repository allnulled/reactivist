/**
 *
 * ----
 *
 * ### `grunt export:pc`
 *
 * **Parámetros:** `package.json`
 *
 * **Descripción:** Genera una aplicación de escritorio con `Electron` del proyecto en `dist-pc`.
 *
 */
module.exports = (grunt) =>
	function() {
		const Logger = require("colorized-logger").ColorizedLogger.create("<:export:pc>", [
			"white",
			"bold",
			"bgBlue"
		]);
		const fs = require("fs-extra");
		const path = require("path");
		const exec = require("execute-command-sync");
		const done = this.async();
		// @TODO: copy all files from dist to dist-pc
		const base = path.resolve(__dirname + "/..");
		const dist = path.resolve(base, "dist");
		const srcPc = path.resolve(base, "dist-pc/original");
		fs.copySync(dist, srcPc);
		fs.copySync(
			__dirname + "/electron-quick-start.js",
			srcPc + "/electron-quick-start.js"
		);
		// @TODO: create and modify dist-pc/package.json in order to fit the settings.js configurations.
		exec("npm init -y", {
			cwd: srcPc
		});
		var pkg = require(path.resolve(base, "dist-pc/original/package.json"));
		var originalPkg = require(path.resolve(base, "package.json"));
		pkg.name = originalPkg.name + "-pc";
		pkg.main = "./grunt:export:pc:electron-quickstart.jsx";
		pkg = Object.assign(pkg, {
			forge: {
				make_targets: {
					win32: ["squirrel"],
					darwin: ["zip"],
					linux: ["deb", "rpm"]
				},
				electronPackagerConfig: {},
				electronWinstallerConfig: {
					name: ""
				},
				electronInstallerDebian: {},
				electronInstallerRedhat: {},
				github_repository: {
					owner: "",
					name: ""
				},
				windowsStoreConfig: {
					packageName: ""
				}
			}
		});
		fs.writeFileSync(
			path.resolve(base, "dist-pc/original/package.json"),
			JSON.stringify(pkg, null, 4)
		);
		//*
		exec("npm i", {
			cwd: srcPc
		});
		//*/
		// @TODO: generate PC application:
		exec("./node_modules/.bin/electron-packager . --out ..", {
			cwd: srcPc
		});
		done();
	};
