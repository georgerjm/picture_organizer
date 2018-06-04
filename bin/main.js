var exif = require("exif");
var fs = require("fs");

var myFiles = fs.readdirSync("/home/michel/data/exchange/input");

function myprocess(myList) { 

    function analyse(files){
        return new Promise((resolve, reject) =>{
            console.log(files.pop());
            resolve(files);
        }); 
    } 

    analyse(myList).then((success) => { 
        if (success.length > 0){
            myprocess(success);
        } else {
            console.log("end of process");
        }    
    } );
} 


myprocess(myFiles);

/*
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
*/
