var ffi = require('ffi');
var path = require('path');
var ref = require('ref');
var u8ptr = ref.refType(ref.types.void);
var libname = 'libresemble_node';

if (process.platform === 'win32')
    libname = 'resemble_node';

var libm = ffi.Library(path.join(__dirname, 'target/release/' + libname), {
  'compare_images': [ 'double', [ 'pointer', ref.types.size_t, 'int', 'pointer', ref.types.size_t, 'int' ]]
});

exports.compare_images = function (buffer1, buffer2, opts) {
  var opts = opts || {};
  var type1 = getImageType(opts.type1);
  var type2 = getImageType(opts.type2);

  return libm.compare_images(buffer1, buffer1.length, type1, buffer2, buffer2.length, type2);
};

function getImageType(type) {
  switch ((type || 'auto').toString().toLowerCase()) {
    case 'jpg':
    case 'jpeg':
      return 1;

    case 'png':
      return 2;

    case 'tif':
    case 'tiff':
      return 3;

    case 'bmp':
      return 4;

    default:
      return 0;
  }
}