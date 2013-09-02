process.on('exit', function() {
  setTimeout(function() {
    console.log('This will not run');
  }, 0);
  console.log('About to exit.');
});

console.log('Node.js app is running ...');
