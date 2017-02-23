extern crate image;
extern crate libc;
extern crate rust_resemble as resemble;

use libc::{c_double, size_t};
use image::{ImageFormat, DynamicImage};

#[no_mangle]
pub extern "C" fn compare_images(img1: *const u8,
                                 img1_length: size_t,
                                 img1_type: u8,
                                 img2: *const u8,
                                 img2_length: size_t,
                                 img2_type: u8)
                                 -> c_double {

    let v1;
    let v2;

    unsafe {
        v1 = std::slice::from_raw_parts(img1, img1_length);
        v2 = std::slice::from_raw_parts(img2, img2_length);
    }

    let img1 = load_image(v1, img1_type);
    let img2 = load_image(v2, img2_type);
    let opts = resemble::ComparisonOptions::new().ignore_antialiasing();

    let r = resemble::compare_images(&img1, &img2, &opts);
    r.mismatch_percent
}

fn get_image_format(v: u8) -> Option<ImageFormat> {
    match v {
        1 => Some(ImageFormat::JPEG),
        2 => Some(ImageFormat::PNG),
        3 => Some(ImageFormat::TIFF),
        4 => Some(ImageFormat::BMP),
        _ => None,
    }
}

fn load_image(buf: &[u8], img_type: u8) -> DynamicImage {
    use image::{load_from_memory, load_from_memory_with_format};

    let format = get_image_format(img_type);

    if let Some(format) = format {
        load_from_memory_with_format(buf, format).unwrap()
    } else {
        load_from_memory(buf).unwrap()
    }
}