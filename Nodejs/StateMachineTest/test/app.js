//  > node ./runner.js

var runner = require("qunit");

runner.run({

  code: "./state-machine.js",

  tests: [
    "./test_basics.js",
    "./test_advanced.js",
    "./test_classes.js",
    "./test_async.js",
    "./test_initialize.js"
  ]

});
