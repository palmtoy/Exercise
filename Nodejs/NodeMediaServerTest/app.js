#!/usr/bin/env node

// $ ffmpeg -re -i ./The-Simpsons-Movie.mp4 -c copy -f flv rtmp://localhost/live/simpsons-stream
// $ open http://127.0.0.1:8086/demo/

const NodeMediaServer = require('node-media-server');

const config = {

  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },

  http: {
    port: 8000,
    allow_origin: '*'
  }

};


var nms = new NodeMediaServer(config)

nms.run();

