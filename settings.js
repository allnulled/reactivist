const { Introspector } = require("introspector");
const settings = require(__dirname + "/settings.json");
const introsp = Introspector.from(settings);
module.exports = Object.assign({}, settings, {
	_introspector: introsp,
	_get: function(prop) {
		const fProp = "grunt." + prop.replace(".", "." + settings.env + ".");
		const i = {};
		const res1 = introsp.get(fProp, i);
		if(res1 !== i) {
			return res1;
		}
		const fProp2 = "grunt." + prop.replace(".", ".default.");
		const resDefault = introsp.get(fProp2, i);
		if(resDefault !== i) {
			return resDefault;
		}
		throw `Property '${fProp}' not found in settings for env '${settings.env}' and 'default'.`;
	}
});
// Usage: require("settings")._get("serve.port")
// Usage: require("settings")._get("serve.host")
// Usage: require("settings")._get("unit.files")
// Usage: require("settings")._get("e2e.files")
// Usage: require("settings")._get("unit.outFile")