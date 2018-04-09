var fs = require("fs");

function processPath(config, analyzer) {
    function logs(err, files) {
        let path = config.input;
        files.forEach(file => {
            let match = false;
            config.filters.forEach(filter => {
                if (file.endsWith(filter)) {
                    match = true;
                }
            });

            if (match) {
                console.log(file + " will be analyzed");
                analyzer.analyze(path + "/" + file);
            } else {
                console.log(file + " not match " + config.filters);
                let fullpath = path + "/" + file;
                fs.lstat(fullpath, (err, stats) => {
                    if (stats.isDirectory()) {
                        let newconfig = { 
                            "input" : fullpath,
                            "output" : config.output,
                            "error" : config.error,
                            "filters" : config.filters
                        };
                        processPath(newconfig, analyzer);
                    }
                })
            }
        });
    }

    fs.readdir(config.input, logs);
}

exports.processPath = processPath;