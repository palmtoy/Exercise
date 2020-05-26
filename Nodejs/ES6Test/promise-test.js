const p1 = new Promise(function (resolve, reject) {
	setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
	setTimeout(() => resolve(p1), 1000)
})

console.log(new Date() + '');

p2
.then(result => console.log(new Date() + ' OK ~ ' + result))
.catch(error => console.log(new Date() + ' ~ ' + error))

// Error: fail
