const exec = require('child_process').exec;

const REDIS_PORT = process.argv[2];
const MAX_SLOT_NUM = 16384;
const REDIS_CLI = `redis-cli -p ${REDIS_PORT}`;

let tmpCmd = `echo 'FLUSHALL' | ${REDIS_CLI}; echo 'CLUSTER RESET' | ${REDIS_CLI}; echo 'CLUSTER ADDSLOTS`;

for (let i = 0; i < MAX_SLOT_NUM; i++) {
	tmpCmd += ' ' + i;
}

tmpCmd += `' | ${REDIS_CLI}`

// console.log(tmpCmd);

exec(tmpCmd,
		 function(errorA, stdoutA, stderrA) {
			 if(errorA !== null) {
				 console.log('exec errorA: ' + errorA);
			 } else {
				 console.log(stdoutA);
			 }
		 });

