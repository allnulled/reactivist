import React from "react";
import ReactDOM from "react-dom";
import ScriptLoader from "minimal-script-loader";
import Component from "./component.jsx";
import settings from "./settings.json";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import allReducers from "./reducers/index.jsx";

// import "./i18n.jsx";

/**
 * 
 * # Referencia de la API
 * 
 * ---
 * 
 */

/**
 * 
 * 
 * 
 */
const store = createStore(allReducers, applyMiddleware(thunk, promise));

/**
 * 
 * 
 * 
 */
const initialization = function() {
	ReactDOM.render(
		<Provider store={store}>
			<Component />
		</Provider>,
		document.getElementById("root")
	);
}

/**
 * 
 * 
 * 
 */
window.addEventListener("load", initialization);
