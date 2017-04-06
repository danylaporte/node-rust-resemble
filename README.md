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

// compare those 2 images and get mismatch percentage
var mismatch_percent = resemble.get_mismatch_percent(img1, img2);

// compare those 2 images and get a diff image
var diff_image = resemble.get_diff_image(img1, img2);
fs.writeFileSync('diff.png', diff_image);
```
