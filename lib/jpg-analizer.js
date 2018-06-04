var exif = require("exif");
var path = require("path");
var fs = require("fs");
var Importer = require("./importer");

class JpgAnalyzer {

    constructor(config) {
        this.config = config;
    }

    analyze(file) {
        return new Promise ((resolve, reject) => {
            var ExifImage = exif.ExifImage;

            try {
                let imp = new Importer(this.config);

                let config = this.config;

                new ExifImage({ image : file }, function (error, exifData) {
                    if (error) {
                        console.log(file + ' Error: '+error.message);
                        let basename = path.basename(file);
                        let newFileName = config.error +"/" + basename;
                        console.log("move to " + newFileName);
                        
                        fs.copyFile(file, newFileName, (err) => {
                            if (err == null) {
                                fs.unlinkSync(file);
                                resolve(file);
                            } else {
                                console.log(err);
                                reject(file);
                                process.exit(1);
                            }
                        });
                        
                    } else {
                        let relevantDate = exifData.exif.CreateDate;
                        if (relevantDate === undefined) {
                            //console.log(exifData);
                            relevantDate = exifData.image.ModifyDate;
                        }
                        console.log(file + " : " + relevantDate); // Do something with your data!
                        imp.importFilebyDate(file, relevantDate);
                        resolve(file);
                    }

                });
            } catch (error) {
                console.log('Error: ' + error.message);
            }
        });         
    }
}


module.exports = JpgAnalyzer;