var fs = require('fs-promise');
var lib = require('./lib');

(async function () {
    var img1 = await fs.readFile('./people1.jpg');
    var img2 = await fs.readFile('./people2.jpg');

    console.time('get_diff_image');
    var diffImage = lib.get_diff_image(img1, img2);
    console.timeEnd('get_diff_image');

    fs.writeFileSync('diff.png', diffImage);


    console.time('get_mismatch_percent');
    var result = lib.get_mismatch_percent(img1, img2);
    console.timeEnd('get_mismatch_percent');

    console.log(result);

}()).then(_ => {}, ex => console.log(ex));