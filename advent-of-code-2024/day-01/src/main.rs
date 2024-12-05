use std::error::Error;

fn main() {
    println!("Hello, world!");
}

fn get_data() -> Result<(), Box<dyn Error>>{
    let resp = reqwest::blocking::get("https://adventofcode.com/2024/day/1/input")?.text()?;
    Ok(resp)
}
