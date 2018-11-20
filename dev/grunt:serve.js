/**
 *
 * ----
 *
 * ### `grunt serve`
 *
 * **Parámetros:** -
 *
 * **Descripción:** Sirve los ficheros `dist` estáticamente bajo `http://{host}:{port}/public`, donde `{host}` y `{port}` son extraídos de `{settings.json#.grunt.serve.{env}.host}` y `{settings.json#.grunt.serve.{env}.port}`, respectivamente.
 * 
 */
module.exports = (grunt) =>
	function() {
		const Logger = require(`colorized-logger`).ColorizedLogger.create(`<:serve>`, [
			`white`,
			`bold`,
			`bgBlue`
		]);
		const path = require(`path`);
		const http = require(`http`);
		const express = require(`express`);
		const fs = require(`fs-extra`);
		const exec = require(`execute-command-sync`);
		const bodyParser = require(`body-parser`);
		const socket = require("socket.io");
		const app = express();
		const done = this.async();
		const settings = require(`${__dirname}/../settings.js`);
		Logger.log(`@started`);
		Logger.log(`@setting up server`);
		const distPath = path.resolve(__dirname + `/../dist`);
		const server = http.createServer(app);
		const port = settings._get("serve.port");
		const host = settings._get("serve.host");
		const io = socket(server);
		const nsp = io.of(`/port-${port}`);
		app.use(bodyParser.urlencoded({ extended: false }))
		app.use(bodyParser.json());
		if(settings.env === "test") {
			Logger.log("@test environment detected");
			// @TODO: Add code coverage reporting endpoints:
			Logger.log("@adding slug: 'POST /@coverage-report'");
			app.use("/@coverage", express.static(__dirname + "/../test/unit/coverage"));
			app.post("/@coverage-report", function(request, response, body) {
				// @TODO: write down and generate (nyc cli) code coverage reports at /test/coverage
				const __coverage__ = request.body.__coverage__;
				fs.outputFileSync(path.resolve(__dirname + "/../test/unit/__coverage__.json"), JSON.stringify(__coverage__, null, 4), "utf8");
				fs.ensureFileSync(path.resolve(__dirname + "/../test/unit/.nyc_output/out.json"));
				fs.outputFileSync(path.resolve(__dirname + "/../test/unit/.nyc_output/out.json"), JSON.stringify(__coverage__, null, 4), "utf8");
				exec("./node_modules/.bin/nyc report ./test/unit/__coverage__.json --reporter=html --cwd ./test/unit", {
					cwd: path.resolve(__dirname + "/..")
				});
				response.json({
					status: 200,
					message: "Success",
					operation: "Generate code coverage reporting",
					link: "/@coverage"
				})
			});
			Logger.log("@adding slug: 'GET /@turn-off'");
			app.get(`/@turn-off`, function(request, response, next) {
				response.send("<h1>Server closed</h1><p>Now the server will be closed.</p>");
				server.close();
			});
			Logger.log("@adding slug: 'GET /@autorefresh'");
			app.get(`/@autorefresh`, function(request, response, next) {
				nsp.emit("refresh", {});
				response.json({
					status: 200,
					message: "Success",
					operation: "Autorefreshing"
				});
			});
			app.use("/@tests", express.static(__dirname + "/../test/unit/dist"));
			// setInterval(() => {nsp.emit("refresh", "everyone!");}, 1000);
		} else {
			Logger.log("@no 'test' environment detected");
		}
		Logger.log("@adding slug: 'GET /public/*'");
		app.use(`/public`, express.static(distPath));
		Logger.log("@setting up websocket server'");
		nsp.on("connection", function(socket) {
			socket.on("event", function(data) {}); // No need to define server-side events.
			socket.on("disconnect", function() {
				Logger.log("Client got out");
			});
			grunt.$reactivist_grunt_serve = {};
			grunt.$reactivist_grunt_serve.client = socket;
		});
		server.listen(port, host, function() {
			Logger.log(`@server up and running`);
			Logger.log(` > ://${server.address().address}:${server.address().port}`);
			// done();
		});
	};
