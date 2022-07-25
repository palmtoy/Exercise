#!/bin/bash

docker run --name smartonoff-rust-compiler --rm \
	-v $HOME/Repository/Software/Programming/IDF-Rust/registry:/home/esp/.cargo/registry \
	-v $HOME/Workspace/GitHub/Exercise/Rust/ESP-IDF-Rust/smartonoff-rust:/smartonoff-rust \
	-w /smartonoff-rust \
	-it espressif/idf-rust:esp32c3_v4.4_1.62.0.0_classic

