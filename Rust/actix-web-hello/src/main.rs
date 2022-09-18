use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use chrono::format::*;
use chrono::prelude::*;

// curl -v http://localhost:8080
#[get("/")]
async fn hello() -> impl Responder {
    let now = get_cur_time();
    HttpResponse::Ok().body(format!("\n{} ~ {}\n\n", now, "Hello World!"))
}

// curl -v http://localhost:8080/echo -d '{"foo": "bar"}'
#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    let now = get_cur_time();
    HttpResponse::Ok().body(format!("\n{} ~ {}\n\n", now, req_body))
}

// curl -v http://localhost:8080/hey
async fn manual_hello() -> impl Responder {
    let now = get_cur_time();
    HttpResponse::Ok().body(format!("\n{} ~ {}\n\n", now, "Hey, there!"))
}

fn get_cur_time() -> String {
    let fmt = "%Y-%m-%d %H:%M:%S CST";
    let now: DateTime<Local> = Local::now();
    let dft: DelayedFormat<StrftimeItems> = now.format(fmt);
    dft.to_string()
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let srv_port = 8080;
    println!("HTTP server is running on port {} ...", srv_port);

    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(echo)
            .route("/hey", web::get().to(manual_hello))
    })
    .bind(("localhost", srv_port))?
    .run()
    .await
}
