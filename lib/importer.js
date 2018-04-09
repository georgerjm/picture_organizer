var fs = require("fs");

class Importer {

    constructor(config) {
        this.config = config;
    }

    importFilebyDate(path, date) {
        console.log("Import File By Date " + path + " " + date);
        // format is "YYYY:MM:DD hh:mm:ss"
        let day = date.split(" ")[0].split(":");
        let hour = date.split(" ")[1].split(":");

        let yearDir = this.config.output + "/" + day[0];
        let dayBaseName = day[0] + "_" + day[1] + "_" + day[2];
        let dayDir = yearDir + "/" + dayBaseName;

        if (!fs.existsSync(yearDir)) {
            console.log("create dir " + yearDir);
            fs.mkdirSync(yearDir);
        }
        if (!fs.existsSync(dayDir)) {
            console.log("create dir " + dayDir);
            fs.mkdirSync(dayDir);
        }

        let dateBaseName = day[0] + day[1] + day[2] + "_" + hour[0] + hour[1] + hour[2];

        let newFileName = dayDir +"/img_" + dateBaseName + ".jpg"

        console.log("move to " + newFileName);
        fs.copyFile(path, newFileName, (err) => {
            if (err == null) {
                fs.unlinkSync(path);
            } else {
                console.log(err);
                process.exit(1);
            }
        });

    }
}

module.exports = Importer;