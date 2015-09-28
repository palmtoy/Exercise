var tty = require('tty.js');

var app = tty.createServer({
	shell: 'zsh',
	users: {
		//'foo': 'bar'
		'0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33': '62cdb7020ff920e5aa642c3d4066950dd1f01f4d'
	},
	port: 6868
});

app.listen();
