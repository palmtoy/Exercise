#!/usr/bin/env bash

# `-a`: to append instead of overwrite

tee -a ./data.log << EOF > /dev/null
line 01
line 02
line 03
EOF
