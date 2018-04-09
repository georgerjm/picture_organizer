var files = require("../lib/files");
var JpgAnalyzer = require("../lib/jpg-analizer");

console.log("import jpg files");

var config = { 
    "input" : "/home/michel/data/exchange/input",
    "output" : "/media/michel/E16D-F3E2/pictures",
    "error" : "/home/michel/data/exchange/error",
    "filters" : ["jpg", "JPG"]
};

files.processPath(config, new JpgAnalyzer(config));
