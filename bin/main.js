var exif = require("exif");

var promise = new Promise((resolve, reject) => {
    console.log("toto");
    var ExifImage = exif.ExifImage;

    new ExifImage({ image : "/home/michel/data/exchange/input/IMG_20180122_121033.jpg" }, function (error, exifData) {
        if (error) {
            console.log(' Error: '+error.message);           
        } else {
            console.log(" : " + exifData.exif.CreateDate); // Do something with your data!
            resolve(exifData);
        }
     });
});

promise.then((succes) => {
    console.log(succes);
    console.log("juste apres");
} );

console.log("après");

