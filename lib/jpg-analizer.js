var exif = require("exif");
var path = require("path");
var fs = require("fs");
var Importer = require("./importer");

class JpgAnalyzer {

    constructor(config) {
        this.config = config;
    }

    analyze(file) {
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
                        } else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                    
                } else {
                    console.log(file + " : " + exifData.exif.CreateDate); // Do something with your data!
                    imp.importFilebyDate(file, exifData.exif.CreateDate);
                }

            });
        } catch (error) {
            console.log('Error: ' + error.message);
        }
    }
}


module.exports = JpgAnalyzer;