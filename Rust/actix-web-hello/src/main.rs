use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use chrono::format::*;
use chrono::prelude::*;
use std::collections::HashMap;

// curl -v http://localhost:8080
#[get("/")]
async fn hello() -> impl Responder {
    let _req_ret = req_httpbin().await;
    println!("fn_hello: _req_ret = {:#?}", _req_ret);
    let now = get_cur_time();
    HttpResponse::Ok().body(format!("\n{} ~ {}\n\n", now, "Hello World!"))
}

async fn req_httpbin() -> Result<(), Box<dyn std::error::Error>> {
    let resp = reqwest::get("https://httpbin.org/ip")
        .await?
        .json::<HashMap<String, String>>()
        .await?;
    println!("fn_req_httpbin: resp = {:#?}", resp);
    Ok(())
}

// curl -v http://localhost:8080/echo -d '{"foo": "bar"}'
#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    let _post_ret = post_httpbin().await;
    println!("\nfn_echo: _post_ret.is_ok = {}", _post_ret.is_ok());
    println!("fn_echo: _post_ret = {:#?}", _post_ret);
    let now = get_cur_time();
    HttpResponse::Ok().body(format!("\n{} ~ {}\n\n", now, req_body))
}

async fn post_httpbin() -> Result<(), Box<dyn std::error::Error>> {
    // This will POST a body of `{"lang": "rust"}`
    let mut map = HashMap::new();
    map.insert("lang", "rust");

    let client = reqwest::Client::new();
    let resp = client
        .post("http://httpbin.org/post")
        .json(&map)
        .send()
        .await?;
    println!("\nfn_post_httpbin: resp = {:#?}", resp);
    let buf = resp.bytes().await?;
    println!("fn_post_httpbin: buf = {:#?}", buf);
    let str_body = match String::from_utf8(buf.to_vec()) {
        Ok(v) => v,
        Err(e) => panic!("Invalid UTF-8 sequence: {}", e),
    };
    let json_body = match json::parse(str_body.as_str()) {
        Ok(jv) => jv,
        Err(_) => {
            let err_msg = "\nfn_post_httpbin: Failed to parse the HTTP body to JSON!\n";
            println!("{}", err_msg);
            json::JsonValue::Null
        }
    };
    if json_body != json::JsonValue::Null {
        println!("\nfn_post_httpbin: json_body.data = {:#?}\n", json_body["data"]);
    } else {
        println!("\nfn_post_httpbin: json_body is Null\n");
    }
    Ok(())
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
