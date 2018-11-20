const Logger = require("colorized-logger").ColorizedLogger.create(
	"<reactivist>",
	["bgBlue", "white", "bold"]
);
const path = require("path");
const globby = require("globby");
const exec = require("execute-command-sync");
const fs = require("fs-extra");
class Reactivist {
	static getSettings(parameters) {
		const parametersAdapted =
			parameters instanceof Array
				? require("yargs-parser")(parameters)
				: parameters;
		const settingsTemp = require("yargs")
			.config(parametersAdapted)
			.version("1.0.1")
			.option("folder", {
				type: "array",
				alias: "f",
				default: [],
				describe: "Folder(s) where to start a reactivist project",
				help: "help"
			})
			.option("name", {
				type: "string",
				alias: "n",
				default: "component",
				describe:
					"Name of the React component to be created inside the reactivist project. Used to create the basic files of the component: ~.jsx, ~.scss, ~.unit.js, ~.e2e.js.",
				help: "help"
			})
			.option("package", {
				type: "string",
				alias: "p",
				default: "",
				describe: "Name of the npm package to be created",
				help: "help"
			}).argv;
		settingsTemp.folder = settingsTemp.folder.map((one) => path.resolve(one));
		const settings = Object.assign(
			{},
			{
				folders: settingsTemp.folder,
				name: settingsTemp.name,
				package: settingsTemp.package
			}
		);
		return settings;
	}
	static start(parameters) {
		const settings = Reactivist.getSettings(parameters);
		const { folders, name, package: packet } = settings;
		folders.forEach((folder) => {
			Reactivist.initializeProject(folder, name, packet);
		});
	}
	static initializeProject(folder, name, packet = "") {
		Logger.log(`Initializing a new Reactivist Project from:
  - Folder: ${folder}
  - Name: ${name}
  - Package: ${packet}`);
		Logger.log("Copying dev, bin, src, test, Gruntfile.js and settings.json files...");
		const basepath = path.resolve(__dirname + "/..");
		fs.copySync(path.resolve(basepath, "dev"), path.resolve(folder, "dev"));
		fs.copySync(path.resolve(basepath, "src"), path.resolve(folder, "src"));
		//fs.copySync(path.resolve(basepath, "bin"), path.resolve(folder, "bin"));
		fs.copySync(path.resolve(basepath, "test"), path.resolve(folder, "test"));
		fs.copySync(path.resolve(basepath, "README.md"), path.resolve(folder, "README.md"));
		fs.copySync(path.resolve(basepath, "LICENSE.md"), path.resolve(folder, "LICENSE.md"));
		fs.copySync(path.resolve(basepath, "CHANGELOG.md"), path.resolve(folder, "CHANGELOG.md"));
		fs.copySync(path.resolve(basepath, "gruntfile.js"), path.resolve(folder, "gruntfile.js"));
		fs.copySync(path.resolve(basepath, "cypress.json"), path.resolve(folder, "cypress.js"));
		fs.copySync(path.resolve(basepath, "settings.json"), path.resolve(folder, "settings.json"));
		/////////////////////////////////
		Logger.log("Initializing new NPM project...");
		const packagePathSrc = path.resolve(basepath, "package.json");
		const packagePathDst = path.resolve(folder, "package.json");
		const { bin, devDependencies } = fs.readJsonSync(packagePathSrc);
		Logger.log(packet);
		if (packet.length === 0) {
			exec("npm init -y", {
				cwd: folder
			});
		} else {
			exec("npm init -y", {
				cwd: folder
			});
		}
		/////////////////////////////////
		Logger.log("Fixing dependencies in package.json...");
		const packetBase = fs.readJsonSync(packagePathDst);
		packetBase.name = packet;
		packetBase.bin = bin;
		packetBase.devDependencies = devDependencies;
		fs.writeFileSync(packagePathDst, JSON.stringify(packetBase, null, 4));
		/////////////////////////////////
		// @TODO: find first open port:
		// @TODO: change settings.json properly to fit the new port.
		Logger.log("Trying to run: grunt build && grunt serve");
		exec("grunt build && grunt serve", {
			cwd: folder
		});
		Logger.log("Done.");
	}
}

module.exports = { Reactivist };
