var ffi = require('ffi');
var path = require('path');
var ref = require('ref');
var u8ptr = ref.refType(ref.types.void);
var libname = 'libresemble_node';

if (process.platform)
    libname = 'resemble_node';

var libm = ffi.Library(path.join(__dirname, 'target/release/' + libname), {
  'compare_images': [ 'double', [ 'pointer', ref.types.size_t, 'pointer', ref.types.size_t ]]
});

exports.compare_images = function (buffer1, buffer2) {
  return libm.compare_images(buffer1, buffer1.length, buffer2, buffer2.length);
};