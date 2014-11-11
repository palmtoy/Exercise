//  > node ./runner.js

var runner = require("qunit");

runner.run({

  code: "./state-machine.js",

  tests: [
    "./test_basics.js"
  ]

});
