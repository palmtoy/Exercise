
for (let i = 1; i <= 5; i++) {
	setTimeout( function timer() {
		console.log( new Date().getTime() + ' => ' + i );
	}, i * 1000 );
}

