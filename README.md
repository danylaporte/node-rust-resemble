# node-rust-resemble
Analyze and compare images. This is a reimplementaton of [Resemble.js](https://github.com/Huddle/Resemble.js/) in [Rust](https://github.com/danylaporte/rust-resemble) to improve the performance of the comparison algorithm.

## NOT READY FOR PRODUCTION

## Requirements

### Rust Language support

Install rust by using [rustup](https://www.rustup.rs/).

## Installation

```bash
# install the npm module
npm install https://github.com/danylaporte/node-rust-resemble.git

# go to the module folder
cd node_modules/node-rust-resemble

# compile the release for your machine
cargo build --release
```

## Example

```js
var fs = require('fs');
var resemble = require('node-rust-resemble');

// load 2 images from the disk into memory.
var img1 = fs.readFileSync('people1.jpg');
var img2 = fs.readFileSync('people2.jpg');

// compare those 2 images
var mismatch_percent = resemble.compare_images(img1, img2);
```
