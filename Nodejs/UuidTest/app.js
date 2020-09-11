const uuid = require('uuid');

const loopNum = 3;

for (let i = 0; i < loopNum; i++) {
	let uid = uuid.v1();
	console.log(`uid.v1 = ${uid}`);
}
console.log();

for (let j = 0; j < loopNum; j++) {
	let uid = uuid.v4();
	console.log(`uid.v4 = ${uid}`);

}

/*

uid.v1 = 75977f50-f3e3-11ea-a551-951f80339538
uid.v1 = 7597f480-f3e3-11ea-a551-951f80339538
uid.v1 = 7597f481-f3e3-11ea-a551-951f80339538

uid.v4 = efb6575d-9b29-4062-bd75-8db182e818e8
uid.v4 = 48caa17d-4b18-4097-b38f-0723b3da7b03
uid.v4 = 337e6391-e5a1-4b14-8e15-5db2fcc0cf1c

*/

