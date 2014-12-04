// NODE_DEBUG=cluster node svr.js

var cluster = require("cluster");

cluster.setupMaster({
  exec : "worker.js",
  args : ["--use", "https"],
  // silent : false
  silent : false
});

cluster.fork();

