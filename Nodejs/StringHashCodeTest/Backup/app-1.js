function Convert2HashCode(str){
	var hash = 0;
	if(str.length === 0) {
		return hash;
	}
	for(var i = 0; i < str.length; i++) {
		var c = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + c;
		hash = hash & hash; // Convert to 32bit integer
	}

	return Math.abs(hash);
}


var tmpList = ["3a01744f5c5a83f5746fc784e75f83e7f5a1de61_BEI-zgli01-mac.local_0", "9e1193f0b03ef1ca3afe7fd658a6b522e63ba317_BEI-zgli01-mac.local_1", "0d6895fab2ec33aad6b5fa555f1a846eacc986bb_BEI-zgli01-mac.local_2"];


var len = tmpList.length;
for(var i = 0; i < len; i++) {
	console.log('  string =', tmpList[i]);
	var hashCode = Convert2HashCode(tmpList[i]);
	console.log('hashCode =', hashCode);
}
