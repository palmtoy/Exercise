var n = 0;
setInterval(function() {
	console.log(++n + ': Hello ~ ');
}, 1000);

process.on('SIGINT', function() {
	console.log('\nGood bye!');
	process.exit(0);
});
