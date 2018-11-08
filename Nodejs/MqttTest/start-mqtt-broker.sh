#!/bin/bash

# https://github.com/emqx/emqx/wiki/Installation

pushd ./emqx

	# start console
	./bin/emqx console

	# # start daemon
	# ./bin/emqttd start

popd

