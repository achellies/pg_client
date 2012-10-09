// Remove instrumented files.
// Use a 3rd party script, as there is no way to remove a directory with all files in node.
var rimraf = require("rimraf");
rimraf(__dirname + "/../www", function() {
	// Restore the original source files.
	var fs = require('fs');
	fs.renameSync(__dirname + "/../www-original", __dirname + "/../www");
});