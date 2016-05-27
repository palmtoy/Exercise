#!/usr/bin/env node

function ValidateIPaddress(ipaddress) {
	ipaddress = ipaddress.trim();

	if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
		return true;
	}
	return false;
}

var strIP = ' 10.11.12.13 ';
var bFlag = ValidateIPaddress(strIP);

if(bFlag) {
	console.log(strIP + ' is a valid ip.');
} else {
	console.log(strIP + ' is NOT a valid ip.');
}

