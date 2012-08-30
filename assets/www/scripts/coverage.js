//instrument.bat & 
//rmdir /s /q "build" & mkdir build & 
//node ../node_modules/mocha/bin/mocha ../tests --reporter html-cov > build/coverage.html & 
//restore.bat


//require("./instrument");

//require("./restore");

// Instrument the source files.
var process = require('child_process');
// Instrument source files...
process.exec("node " + __dirname + "/instrument.js", function (error, stdout, stderr) {
	console.log(stdout);
	console.log(stderr);
	
	// Remove previous build directory...
	var rimraf = require("rimraf");
	rimraf(__dirname + "/../build", function() {
		// Create an empty build directory again.
		var fs = require('fs');
		fs.mkdirSync(__dirname + "/../build");
		
		// Run tests on instrumented files.
		var command = "node " + __dirname + "/../node_modules/mocha/bin/mocha " + __dirname + "/../tests --reporter html-cov > " + __dirname + "/../build/coverage.html";
		process.exec(command,  function (error, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			
			// Clean up after testing.
			process.exec("node " + __dirname + "/restore.js",  function (error, stdout, stderr) {
				console.log(stdout);
				console.log(stderr);
			});
		});
	});
});