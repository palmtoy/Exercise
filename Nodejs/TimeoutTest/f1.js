var n = 0;
setInterval(function() {
	console.log(++n + ' hello');
}, 1000);

process.on('SIGINT', function() {
	console.log('good bye');
	process.exit(0);
});
