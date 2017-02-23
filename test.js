var co = require('co');
var lib = require('./lib');
var Jimp = require('jimp');

var img1 = null;
var img2 = null;

co(function *() {
    var img1 = yield read_image('./people1.jpg');
    var img2 = yield read_image('./people2.jpg');

    var buf1 = yield get_buffer(img1, Jimp.MIME_JPEG);
    var buf2 = yield get_buffer(img2, Jimp.MIME_JPEG);

    console.time();
    var result = lib.compare_images(buf1, buf2);
    console.timeEnd();

    console.log(result);

}).then(_ => {}, ex => console.log(ex));


function read_image(filename) {
    return new Promise(function (resolve, reject) {
        Jimp.read(filename, function (err, img) {
            if (err)
                reject(err);
            else
                resolve(img);
        });
    });
}

function get_buffer(img, mime) {
    return new Promise(function (resolve, reject) {
        img.getBuffer(mime, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
}