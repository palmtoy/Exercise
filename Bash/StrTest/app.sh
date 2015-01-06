#!/bin/bash

RND_NUM=$RANDOM

TMP_NAME=./git_cleaner_$RND_NUM.sh

awk -F'client_gam' '{print "rm \"client_gam"$2"\""}' "$1" > $TMP_NAME

chmod +x $TMP_NAME

mv $TMP_NAME "$1"

sh "$1"

rm "$1"
