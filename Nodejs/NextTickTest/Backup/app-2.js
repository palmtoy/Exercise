var foo = function() {
  console.log('I am in foo...');
};

var bar = function() {
  console.log('           I am in bar...\n');
};


/*
function maybeSync(arg, cb) {
  if (arg) {
    cb();
    return;
  }
}

for(var i = 0; i < 10; i++) {
  maybeSync(true, function() {
    foo();
  });

  bar();
}
*/

function definitelyAsync(arg, cb) {
  if (arg) {
    process.nextTick(cb);
    return;
  }
}

for(var i = 0; i < 100; i++) {
  definitelyAsync(true, function() {
    foo();
  });

  bar();
}

