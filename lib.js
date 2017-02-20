var ffi = require('ffi');
var ref = require('ref');
var u8ptr = ref.refType(ref.types.void);

var libm = ffi.Library('./target/release/libresemble_node', {
  'compare_images': [ 'double', [ 'pointer', ref.types.size_t, 'pointer', ref.types.size_t ]]
});

exports.compare_images = function (buffer1, buffer2) {
  return libm.compare_images(buffer1, buffer1.length, buffer2, buffer2.length);
};