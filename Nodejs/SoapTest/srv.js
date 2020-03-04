const fs = require('fs');
const http = require('http');
const soap = require('soap');

const myService = {
	ws: {
		calc: {
			sumar: function(args) {
				const n = 1 * args.a + 1 * args.b;
				return { sumRes: n };
			},

			multiplicar: function(args) {
				const n = args.a * args.b;
				return { mulRes: n };
			}
		}
	}
};

const xml = fs.readFileSync('./wscalc.wsdl', 'utf8');

const server = http.createServer(function(request, response) {
	response.end("404: Not Found: " + request.url);
});

const srvPort = 8000;

server.listen(srvPort);

soap.listen(server, '/wscalc', myService, xml, function() {
	console.log(`SOAP server initialized and running on port:${srvPort} ...`);
});

