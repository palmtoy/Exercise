//  > node ./runner.js

var runner = require("qunit");

runner.run({

  code: "./state-machine.js",

  tests: [
    "src/test_basics.js"
  ]

});
