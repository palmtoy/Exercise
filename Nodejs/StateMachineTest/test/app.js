//  > node ./runner.js

var runner = require("qunit");

runner.run({

  code: "./state-machine.js",

  tests: [
    "src/test_basics.js",
    "src/test_advanced.js",
    "src/test_classes.js",
    "src/test_async.js",
    "src/test_initialize.js"
  ]

});
