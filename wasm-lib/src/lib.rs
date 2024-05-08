use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn dec(a: i32, b: i32) -> i32 {
    a - b
}

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Welcome, {}!", name)
}

#[test]
fn greet_test() {
    assert_eq!(greet("World"), "Welcome, World!");
}

#[test]
fn add_test() {
    assert_eq!(1 + 1, add(1, 1));
}
#[test]
fn dec_test() {
    assert_eq!(2 - 1, dec(2, 1));
}
