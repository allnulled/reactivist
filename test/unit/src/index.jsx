import ScriptLoader from "minimal-script-loader";
import componentTest from "./component.test.jsx";
import Autorefresh from "./helpers/autorefresh.jsx";
import settings from "../../../src/settings.json";

/**
 * 
 * # Tests unitarios
 * 
 * 
 * ----
 * 
 * **Dado...**
 *  
 *   - Un contexto
 *   - Unos estados
 *   - Una función
 * 
 * **Cuando...**
 * 
 *   - Un input
 * 
 * **Espera...**
 * 
 *   - Un output
 *   - Un estado
 * 
 * ----
 * 
 */

const executeTests = function () {
	const qunitDiv = document.createElement("div");
	qunitDiv.setAttribute("id", "qunit");
	if(document.body.children.length === 0) {
		document.body.appendChild(qunitDiv);
	} else {
		document.body.insertBefore(qunitDiv, document.body.children[0])
	}
		
	componentTest.run(function() {
		var isDone = false;
		const callback = data => {
			if(isDone) {
				return;
			}
			isDone = true;
			const qunitTag = document.querySelectorAll("#qunit")[0];
			const linkTag = document.createElement("a");
			linkTag.classList.add("code-coverage-link");
			linkTag.setAttribute("href", `http://${settings.server.host}:${settings.server.port}/@coverage`);
			linkTag.setAttribute("target", "_blank");
			linkTag.textContent = "Visit coverage report.";
			qunitTag.insertBefore(linkTag, qunitTag.children[0]);
		};
		ScriptLoader.xhr({
			uri: `http://{settings.server.host}:{settings.server.port}/@coverage-report`,
			method: "POST",
			body: {__coverage__},
			json: true
		}).then(callback).catch(callback);
	});
};

if (["complete", "interactive"].indexOf(document.readyState) !== -1) {
	executeTests();
} else {
	window.addEventListener("load", executeTests);
}


export default {};
