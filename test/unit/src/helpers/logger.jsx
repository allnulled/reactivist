import DOMLogger from "domlogger";

const key = Symbol("DOMLogger");
const keys = Object.getOwnPropertySymbols(global);
const hasKey = keys.indexOf(key) !== -1;

if(!hasKey) {
	global[key] = (new DOMLogger()).show().log("Started!");
}

var singleton = {};

Object.defineProperty(singleton, "DOMLogger", {
  get: function(){
    return global[key];
  }
});

// ensure the API is never changed
// -------------------------------

Object.freeze(singleton);

export default global[key];
