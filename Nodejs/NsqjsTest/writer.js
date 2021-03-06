const nsq = require('nsqjs');
const conf = require('./conf.json');

const w = new nsq.Writer(conf.nsqd.ip, conf.nsqd.port);

w.connect();

/* OK */
w.on('ready', () => {
	console.log(new Date() + ' ~ NSQ writer ready.');

	w.publish('sample_topic', {
		foo: '5cxa15tf7e',
		bar: '7u0a352f9c',
		hello: 'world'
	});

	w.publish('sample_topic', 'It really tied the room together');

	w.deferPublish('sample_topic', ['This message gonna arrive 3s later.'], 3000);

	w.publish('sample_topic', [
		'Uh, excuse me. Mark it zero. Next frame.', 
		'Smokey, this is not \'Nam. This is bowling. There are rules.'
	]);

	w.publish('sample_topic', 'Wu?',  err => {
		if (err) { return console.error(err.message) }
		console.log('Messages send successfully.')
		w.close()
	});
});

/* ERROR */
w.on('error', msg => {
	console.log(new Date() + ' ~ NSQ writer error:', msg);
});

/* CLOSED */
w.on('closed', () => {
	console.log(new Date() + ' ~ NSQ writer closed.');
});

