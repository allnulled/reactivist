import socket from "socket.io-client";
import settings from "../../../../src/settings.json";
import Logger from "./logger.jsx";
import State from "./state-injection.jsx";

const io = socket(
	`${settings.server.host}:${settings.server.port}/port-${settings.server.port}`
);

const insertWSButton = function() {
	// Inject tested state here:
	State.injection();
	// Crate global setting:
	window.__isReactivistWebsocketCommunicationEnabled__ = true;
	// @TODO: injectar botón para desahbilitar esta comunicación.
	const btn = document.createElement("button");
	btn.textContent = "ws is on";
	btn.style.position = "fixed";
	btn.style.top = "5px";
	btn.style.right = " 5px";
	btn.style.zIndex = "999999";
	btn.onclick = function() {
		window.__isReactivistWebsocketCommunicationEnabled__ = !!!window.__isReactivistWebsocketCommunicationEnabled__;
		if (window.__isReactivistWebsocketCommunicationEnabled__) {
			btn.textContent = "ws is on";
		} else {
			btn.textContent = "ws is off";
		}
	};
	document.body.appendChild(btn);
};

if (document.readyState === "complete") {
	insertWSButton();
} else {
	window.addEventListener("load", insertWSButton);
}

io.on("refresh", function() {
	Logger.log("Refresh event received from the server!");
	if (window.__isReactivistWebsocketCommunicationEnabled__) {
		window.location.href = window.location.href;
	}
});

export default {
	socket: io
};
