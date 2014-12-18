#!/bin/sh

npm install node-inspector@0.7.4 -g

sudo cp ./chromedriver /usr/local/bin/

node ./lib/read_pwd.js

