#!/usr/bin/env bash

ffmpeg -i ./f.mp4 -qscale 4 ./f.mpg
ffmpeg -i ./b.mp4 -qscale 4 ./b.mpg
ffmpeg -i ./l.mp4 -qscale 4 ./l.mpg
ffmpeg -i ./r.mp4 -qscale 4 ./r.mpg

cat ./f.mpg ./b.mpg ./l.mpg ./r.mpg | ffmpeg -f mpeg -i - -qscale 6 -vcodec mpeg4 my-car.mp4
rm ./*.mpg
