function fetchNum(x) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(x);
		}, 1000 * x);
	})
}

const beginTime = new Date().getTime();

function go() {
	let arr = [3, 2, 1];
	arr.forEach(async item => {
		const res = await fetchNum(item);
		console.log(`output: ${res}, after ${new Date().getTime() - beginTime}(ms)`);
	})

	const endTime = new Date();
	console.log(`End ~ ${endTime} - ${endTime.getTime()}\n`);
}

go();

