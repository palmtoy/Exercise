const tmpPm = async (x) => {
	return new Promise((resolev, reject) => {
		setTimeout(() => resolev(x + 1), 200)
	});
}

( async () => {
	const v = await tmpPm(100);
	console.log(new Date().toString(), `~ v = ${v}`);
	} )();

