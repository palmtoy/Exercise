cmd:
nexe -i HelloWorld.js -r 0.10.38 -o hw.exe

Info:
Nexe is a command-line utility that compiles your Node.js application into a single executable file.

Motivation:
Ability to run multiple applications with different node.js runtimes.
Distributable binaries without needing node / npm.
Starts faster.
Lockdown specific application versions, and easily rollback.
Faster deployments.

Requirements:
Linux / Mac / BSD

Installation:
Via NPM:
npm install nexe [-g]

CLI Usage:
Usage: nexe -i [sources] -o [binary]
Options:
-i, --input    The entry javascript files         [default: cwd]
-o, --output   The output binary                  [default: cwd/release/app.nex]
-r, --runtime  The node.js runtime to use         [default: "0.8.15"]
-t, --temp     The path to store node.js sources  [default: /tmp/nexe]
-f, --flags    Don't parse node and v8 flags, pass through app flags  [default: false]

Code usage:
var nexe = require('nexe');
nexe.compile({ input: 'input.js', output: 'path/to/bin', runtime: '0.8.15', flags: true } function() {
  // ...
    });

