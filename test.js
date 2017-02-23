var lib = require('./lib');
var fs = require('fs');

// load 2 images from the disk into memory.
var img1 = fs.readFileSync('people1.jpg');
var img2 = fs.readFileSync('people2.jpg');

// compare those 2 images
console.time('compare_time');
var mismatch_percent = lib.compare_images(img1, img2, { type1: 'jpg', type2: 'jpg' });
console.timeEnd('compare_time');

console.log(`diff: ${mismatch_percent}%`);