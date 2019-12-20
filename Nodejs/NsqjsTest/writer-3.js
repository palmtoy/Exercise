const nsq = require('nsqjs');
const conf = require('./conf.json');

class CNsqWriter {

	constructor() {
		this.strTopic = 'sample_topic';
		this.timeoutObj = null;
	}

	handleReconnect() {
		if (this.timeoutObj) {
			clearTimeout(this.timeoutObj);
			this.timeoutObj = null;
		}
		if (this.writerObj) {
			this.writerObj.close();
			delete this.writerObj;
		}
		this.timeoutObj = setTimeout(() => {
			console.error('\n', new Date(), ' ~ NSQ writerObj trys to reconnect ...', '\n');
			this.go();
		}, 3000);
	}

	pubMsg(msg) {
		if (this.writerObj) {
			this.writerObj.publish(this.strTopic, msg, err => {
				if (err) {
					console.error(`NSQ writer is NOT ready to publish msg, ${err}`);
				}
			});
		}
	}

	go() {
		this.writerObj = new nsq.Writer(conf.nsqd.ip, conf.nsqd.port);

		this.writerObj.connect();

		/* OK */
		this.writerObj.on('ready', () => {
			console.log(new Date() + ' ~ NSQ writer ready.');
			this.writerObj.deferPublish('sample_topic', ['This message gonna arrive 2s later.'], 2000);
		});

		/* ERROR */
		this.writerObj.on('error', msg => {
			console.log(new Date() + ' ~ NSQ writer error:', msg);
			this.handleReconnect();
		});

		/* CLOSED */
		this.writerObj.on('closed', () => {
			console.log(new Date() + ' ~ NSQ writer closed.');
		});
	}

}

const nsqWriterObj = new CNsqWriter();
nsqWriterObj.go();

setInterval(() => {
		console.log(new Date() + ' ~ NSQ writer setInterval cb is running ...');

		nsqWriterObj.pubMsg({
			foo: '5cxa15tf7e',
			bar: '7u0a352f9c',
			hello: 'world'
		});

		nsqWriterObj.pubMsg('It really tied the room together');

		nsqWriterObj.pubMsg([
			'Uh, excuse me. Mark it zero. Next frame.',
			'Smokey, this is not \'Nam. This is bowling. There are rules.'
		]);

		nsqWriterObj.pubMsg('Wu?',  err => {
			if (err) { return console.error(err.message) }
			console.log('Messages send successfully.')
		});
}, 5000);

