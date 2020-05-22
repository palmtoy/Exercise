#!/usr/bin/env node

function myPromiseAllNew(promiseList) {
	return new Promise((resolve, reject) => {
		const valueList = [];
		let completedNum = 0;

		promiseList.forEach((promiseObj, idx) => {
			Promise.resolve(promiseObj).then(v => {
				valueList[idx] = v;
				completedNum ++;
				if (completedNum === promiseList.length) {
					resolve(valueList);
				}
			}).catch(err => {
				reject(err);
			});
		});
	});
}


const promise0 = 9001

const promise1 = new Promise((resolve, reject) => {
	setTimeout((v) => {
		resolve(v);
	}, 2000, 'foobar');
});

const promise2 = Promise.resolve(3);


console.log(new Date());

myPromiseAllNew([promise0, promise1, promise2]).then(valueList => {
	console.log(valueList);
	console.log(new Date());
}).catch(err => {
	console.error(err);
});
