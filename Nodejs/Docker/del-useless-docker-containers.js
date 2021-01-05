/*
	allIdList ↓
	$ docker ps -qa

	keepIdList ↓
	$ docker ps | awk '{print $1}'

	$ node del-useless-docker-containers.js > do-del.sh
	$ sh ./do-del.sh
*/


const allIdList = [ '7d201b7e7f7b', 'c2f9b7b9d940', 'b76c05b698e1' ];

const keepIdList = [ '7d201b7e7f7b', 'c2f9b7b9d940' ];

const tmpLen = allIdList.length;

for (let i = 0; i < tmpLen; i++) {
	const tmpId = allIdList[i];
	if (keepIdList.indexOf(tmpId) < 0) {
		console.log('docker rm -f ' + tmpId);
	}
}

