const one2three = () => {
	const arr = [1, 2, 3];
	arr.reduce((accumulator, curVal) => {
		return accumulator.then(() => {
			return new Promise((resolve) => {
				setTimeout(() => {
					console.log(new Date().toString(), '~', curVal);
					resolve();
				}, 1000);
			})
		});
	}, Promise.resolve());
};

console.log(new Date().toString(), '~ Go ->');
one2three();

