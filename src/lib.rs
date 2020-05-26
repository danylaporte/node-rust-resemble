extern crate image;
extern crate libc;
extern crate rust_resemble as resemble;

use image::{load_from_memory, ImageFormat};
use libc::size_t;
use std::mem::forget;

#[no_mangle]
pub extern "C" fn get_diff_image(
    img1: *const u8,
    img1_length: size_t,
    img2: *const u8,
    img2_length: size_t,
    diff_img: *mut *mut u8,
) -> usize {
    let (v1, v2) = unsafe {
        (
            std::slice::from_raw_parts(img1, img1_length),
            std::slice::from_raw_parts(img2, img2_length),
        )
    };

    let img1 = load_from_memory(v1).unwrap();
    let img2 = load_from_memory(v2).unwrap();
    let opts = resemble::ComparisonOptions::new().ignore_antialiasing();

    let r = resemble::compare_images(&img1, &img2, &opts);
    let mut out_buffer = Vec::new();

    r.image.write_to(&mut out_buffer, ImageFormat::Png).unwrap();
    out_buffer.shrink_to_fit();

    unsafe {
        *diff_img = out_buffer.as_mut_ptr();
    }

    let size = out_buffer.len();
    forget(out_buffer);
    size
}

#[no_mangle]
pub extern "C" fn get_mismatch_percent(
    img1: *const u8,
    img1_length: size_t,
    img2: *const u8,
    img2_length: size_t,
) -> f64 {
    let (v1, v2) = unsafe {
        (
            std::slice::from_raw_parts(img1, img1_length),
            std::slice::from_raw_parts(img2, img2_length),
        )
    };

    let img1 = load_from_memory(v1).unwrap();
    let img2 = load_from_memory(v2).unwrap();
    let opts = resemble::ComparisonOptions::new().ignore_antialiasing();

    let mismatch_percent = resemble::get_mismatch_percent(&img1, &img2, &opts);
    mismatch_percent
}
