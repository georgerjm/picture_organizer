var fs = require("fs");

function internalProcess(config, myList, analyzer) { 
    function analyse(files){
        return new Promise((resolve, reject) =>{
            let file = files.pop();
            let path = config.input;
            let match = false;
            config.filters.forEach(filter => {
                if (file.endsWith(filter)) {
                    match = true;
                }
            });

            if (match) {
                console.log(file + " will be analyzed");
                analyzer.analyze(path + "/" + file).then((success) =>{
                    console.log("end of processing for " + success );
                    resolve(files);
                });
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
                });
                resolve(files);
            }
        }); 
    } 

    analyse(myList).then((success) => { 
        if (success.length > 0){
            internalProcess(config, success, analyzer);
        } else {
            console.log("end of process");
        }    
    } );
}

function processPath(config, analyzer) {
    let files = fs.readdirSync(config.input);
    if (files.length > 0) { 
        console.log("analyze of " + files.length);
        internalProcess(config, files, analyzer);
    } else{
        console.log("empty path " + config.input);
    }  
} 

function processPath2(config, analyzer) {
    function logs(err, files) {
        
        files.forEach(file => {
            
            
        });
    }

    fs.readdir(config.input, logs);
}

exports.processPath = processPath;