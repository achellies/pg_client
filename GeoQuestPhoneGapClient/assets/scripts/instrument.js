// Save the original source files.
var fs = require('fs');
fs.renameSync(__dirname + "/../www", __dirname + "/../www-original");

// Instrument the source files.
var process = require('child_process');
var command = "jscoverage --no-highlight " + __dirname + "/../www-original  " + __dirname + "/../www";
console.log("Executing: ");
console.log(command);
process.exec(command, function (error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
});