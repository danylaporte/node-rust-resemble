const ffi = require('ffi');
const path = require('path');
const ref = require('ref');
const refArray = require('ref-array');

var libname = 'libresemble_node';

if (process.platform === 'win32')
  libname = 'resemble_node';

const uint8Array = refArray(ref.types.uint8);
const uint8ArrayPtr = ref.refType(uint8Array);

var lib = ffi.Library(path.join(__dirname, 'target/release/' + libname), {
  'get_diff_image': [ref.types.size_t, ['pointer', ref.types.size_t, 'pointer', ref.types.size_t, uint8ArrayPtr]],
  'get_mismatch_percent': ['double', ['pointer', ref.types.size_t, 'pointer', ref.types.size_t]]
});

exports.get_diff_image = function (buffer1, buffer2) {
  const diffImageAlloc = ref.alloc(uint8ArrayPtr);

  const size = lib.get_diff_image(buffer1, buffer1.length, buffer2, buffer2.length, diffImageAlloc);
  const imageArray = uint8Array(diffImageAlloc.deref());

  imageArray.length = size;
  return new Buffer(imageArray);
};

exports.get_mismatch_percent = function (buffer1, buffer2) {
  var result = lib.get_mismatch_percent(buffer1, buffer1.length, buffer2, buffer2.length);
  return result;
};