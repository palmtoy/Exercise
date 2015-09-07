// `pkill node` or `kill PID` or `sudo pkill node` cann't make me EXIT.
// BUT, `kill -9 PID` can make me EXIT.

process.on('SIGTERM', function() {
  console.log('Got a TERM(KILL) signal ~', Date());
});

setInterval(function() {
  console.log('I\'m here ~', Date());
}, 2000);

