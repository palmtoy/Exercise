process.on('SIGHUP', function() {
  console.log('Got SIGHUP signal ~', Date());
});

setTimeout(function() {
  console.log('          Exiting ~', Date());
  process.exit(0);
}, 1000);

process.kill(process.pid, 'SIGHUP');

