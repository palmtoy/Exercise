#!/usr/bin/env node

function promiseAllIterative(promiseList) {
	return new Promise((resolve, reject) => {
		let resultList = [];
		let completedNum = 0;

		promiseList.forEach((v, idx) => {
			Promise.resolve(v).then(result => {
				resultList[idx] = result;
				completedNum += 1;

				if (completedNum === promiseList.length) {
					resolve(resultList);
				}
			}).catch(err => reject(err));
		});
	});
}

const promise0 = 9001;

const promise1 = new Promise((resolve, reject) => {
	setTimeout(resolve, 2000, 'foo');
});

const promise2 = Promise.resolve(3);

console.log(new Date());

promiseAllIterative([promise0, promise1, promise2]).then((values) => {
	console.log(values);
	console.log(new Date());
});

// expected output: Array [ 9001, 'foo', 3 ]

