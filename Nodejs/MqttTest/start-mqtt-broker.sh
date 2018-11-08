#!/bin/bash

# https://github.com/emqx/emqx/wiki/Installation

pushd ./emqttd

	# start console
	./bin/emqttd console

	# # start daemon
	# ./bin/emqttd start

popd

