#!/usr/bin/env node

function myPromiseAllNew(promiseList) {
	if(promiseList && promiseList.length === 0) {
		return Promise.resolve([]);
	}

	const valueList = [];
	let completedNum = 0;

	return new Promise((resolve, reject) => {
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
	setTimeout(resolve, 2000, 'foo');
});

const promise2 = Promise.resolve(3);


console.log(new Date());

myPromiseAllNew([promise0, promise1, promise2]).then(valueList => {
	console.log(valueList);
	console.log(new Date());
}).catch(err => {
	console.error(err);
});

