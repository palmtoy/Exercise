const soap = require('soap');
const fs = require('fs');

const srvPort = 8000;

const url = `http://localhost:${srvPort}/wscalc?wsdl`;

soap.createClient(url, function(err, client) {

	if (err) throw err;

	const tmpStr = JSON.stringify(client.describe().ws.calc, null, 2);
	console.log(tmpStr);
	fs.writeFileSync('./soap-output.txt', tmpStr);

	const a = 3
			, b = 6;

	client.sumar({a, b}, function(err, res){
		if (err) throw err;
		console.log(`\n${a} + ${b} =>`, res);
	});

	client.multiplicar({a, b}, function(err, res){
		if (err) throw err;
		console.log(`\n${a} * ${b} =>`, res);
	});

});

