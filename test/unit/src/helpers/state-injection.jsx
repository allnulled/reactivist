import Logger from "./logger.jsx";

// @TODO do something...

const _injection = function() {
	Logger.log("State injection happens here!!");
};

export default {
	injection: _injection
};
