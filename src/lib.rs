extern crate image;
extern crate libc;
extern crate rust_resemble as resemble;

use libc::{c_double, size_t};
use image::load_from_memory;

#[no_mangle]
pub extern "C" fn compare_images(img1: *const u8,
                                 img1_length: size_t,
                                 img2: *const u8,
                                 img2_length: size_t)
                                 -> c_double {

    let v1;
    let v2;

    unsafe {
        v1 = std::slice::from_raw_parts(img1, img1_length);
        v2 = std::slice::from_raw_parts(img2, img2_length);
    }

    let img1 = load_from_memory(v1).unwrap();
    let img2 = load_from_memory(v2).unwrap();
    let opts = resemble::ComparisonOptions::new().ignore_antialiasing();

    let r = resemble::compare_images(&img1, &img2, &opts);
    r.mismatch_percent
}