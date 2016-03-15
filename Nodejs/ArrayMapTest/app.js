#!/usr/bin/env /opt/node/current/bin/node

var persons = [
	{firstname: "Malcom", lastname: "Reynolds"},
	{firstname: "Kaylee", lastname: "Frye"},
	{firstname: "Jayne", lastname: "Cobb"}
];


function getFullName(item, index) {
	var fullname = [item.firstname, item.lastname].join("~");
	console.log('GetFullName: index =', index);
	console.log('GetFullName: fullname =', fullname);
	console.log('');
	return fullname;
}

var ret = persons.map(getFullName);

console.log('typeof ret =', typeof ret);
console.log('ret.length =', ret.length);
console.log('ret =', ret);

