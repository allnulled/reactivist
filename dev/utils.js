const path = require("path")
module.exports = {
	mapPatternsFromBase: function(patterns, base = path.resolve(__dirname + "/..")) {
		return [].concat(patterns).map(pattern => {
			const isNegated = pattern.indexOf(`!`) === 0;
			return (isNegated ? "!" : "") + path.resolve(base, isNegated ? pattern.substr(1) : pattern);
		});
	}
}