const web2os = require("web2os");
const fs = require("fs");
const browser = web2os.create();
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
browser.open("https://github.com/istanbuljs");
browser.onWeb(function(done) {
	const h1 = document.createElement("h1");
	h1.textContent = "Istanbul/nyc will generate code coverage reports from our unit tests.";
	h1.style.fontFamily = "monospace";
	h1.style.fontSize = "14px";
	h1.style.border = "1px dashed red";
	h1.style.backgroundColor = "yellow";
	h1.style.color = "red";
	h1.style.padding = "12px";
	h1.style.margin = "0px";
	h1.style.position = "fixed";
	h1.style.top = "0px";
	h1.style.right = "0px";
	h1.style.left = "0px";
	h1.style.zIndex = "999999";
	h1.style.fontSize = "15px";
	document.body.parentElement.insertBefore(h1, document.body);
	setTimeout(done, 7000);
});
browser.onOs(function(done, error, data) {
	done();
});
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
browser.run(function() {
	require(__dirname + "/../logger.js").log("Done!");
});