// Save the original source files.
var fs = require('fs');
fs.renameSync(__dirname + "/../src", __dirname + "/../src-original");

// Instrument the source files.
var process = require('child_process');
var command = "jscoverage --no-highlight " + __dirname + "/../src-original  " + __dirname + "/../src";
console.log("Executing: ");
console.log(command);
process.exec(command, function (error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
});