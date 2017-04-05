var fs = require('fs-promise');
var lib = require('./lib');

(async function () {
    var img1 = await fs.readFile('./people1.jpg');
    var img2 = await fs.readFile('./people2.jpg');

    console.time();
    var result = lib.compare_images(img1, img2);
    console.timeEnd();

    console.log(result);

}()).then(_ => {}, ex => console.log(ex));