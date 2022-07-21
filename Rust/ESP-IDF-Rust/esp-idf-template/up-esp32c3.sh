#!/bin/bash

docker run --name esp32c3-compiler --rm -v $HOME/Workspace/GitHub/Exercise/Rust/ESP-IDF-Rust/esp-idf-template:/esp-idf-template -w /esp-idf-template -it espressif/idf-rust:esp32c3_v4.4_1.62.0.0

