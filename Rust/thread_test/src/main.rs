extern crate chrono;
use chrono::offset::Local;
use chrono::DateTime;
use std::io::{self, BufRead};
use std::sync::mpsc;
use std::thread;
use std::time::Duration;
use std::time::SystemTime;

fn main() {
    println!("\nPress enter to wake up the child thread ↓\n");
    let (tx, rx) = mpsc::channel();
    thread::spawn(move || loop {
        let system_time = SystemTime::now();
        let datetime: DateTime<Local> = system_time.into();
        println!(
            "I'm suspending in a child thread ~ {}",
            datetime.format("%Y-%m-%d %T")
        );
        match rx.recv() {
            Ok(_) => {
                let system_time = SystemTime::now();
                let datetime: DateTime<Local> = system_time.into();
                println!(
                    "{} ~ I'm working in a child thread ...",
                    datetime.format("%Y-%m-%d %T")
                );
                thread::sleep(Duration::from_millis(500));
            }
            Err(_) => {
                println!("Terminating.");
                break;
            }
        }
    });

    let mut line = String::new();
    let stdin = io::stdin();
    for _ in 0..3 {
        let _ = stdin.lock().read_line(&mut line);
        let _ = tx.send(());
    }
}
