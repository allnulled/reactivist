
module.exports = (grunt) =>
	function() {
		const Logger = require("colorized-logger").ColorizedLogger.create("<:pack-css>", [
			"white",
			"bold",
			"bgBlue"
		]);
		const globby = require("globby");
		const path = require("path");
		const fs = require("fs");
		const CleanCSS = require("clean-css");
		Logger.log("@started");
		Logger.log("@getting concerned settings");
		const settings = require(`${__dirname}/../settings.js`);
		const fileMapper = (file) =>
			path.resolve(
				(file.indexOf(`!`) === 0 ? `!` : ``) +
					`${__dirname}/../src/${file.replace(/^\!/g, ``)}`
			);
		const filePatterns = settings._get("pack-css.files").map(fileMapper);
		Logger.log(filePatterns);
		const files = globby.sync(filePatterns);
		const options = Object.assign({}, settings._get("pack-css.options"));
		Logger.log(`@dumping css unified`);
		var input = "";
		files.forEach(file => {
			input += fs.readFileSync(file).toString() + "\n";
		});
		fs.writeFileSync(path.resolve(`${__dirname}/../src/${settings._get("pack-css.outFile")}`), input, "utf8")
		// @TODO: minify 
		Logger.log(`@dumping css unified and minified`);
		const outMinifiedContents = new CleanCSS({}).minify(input);
		fs.writeFileSync(path.resolve(`${__dirname}/../src/${settings._get("pack-css.outFileMinified")}`), outMinifiedContents.styles, "utf8");
		Logger.log(`@done`);
	};
