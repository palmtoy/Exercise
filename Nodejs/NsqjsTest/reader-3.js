const nsq = require('nsqjs');
const conf = require('./conf.json');

class CNsqReader {

	constructor() {
		this.strTopic = 'sample_topic';
		this.strChannel = 'test_channel-1';
		this.timeoutObj = null;
	}

	handleReconnect() {
		if (this.timeoutObj) {
			clearTimeout(this.timeoutObj);
			this.timeoutObj = null;
		}
		if (this.reader) {
			this.reader.close();
			delete this.reader;
		}
		this.timeoutObj = setTimeout(() => {
			console.error('\n', new Date(), ' ~ NSQ reader trys to reconnect ...', '\n');
			this.go();
		}, 3000);
	}

	go() {
		this.reader = new nsq.Reader(this.strTopic, this.strChannel, {
			nsqdTCPAddresses: conf.nsqd.ip + ':' + conf.nsqd.port
		});

		this.reader.connect();
		console.log('Subscribing %s:%s', this.strTopic, this.strChannel);

		/* OK */
		this.reader.on('nsqd_connected', msg => {
			console.log(new Date() + ' ~ NSQ reader nsqd_connected:', msg);
		});

		this.reader.on('ready', () => {
			console.log(new Date() + ' ~ NSQ reader is ready to receive msgs ...');
		});

		this.reader.on('message', msg => {
			console.log('\n');
			console.log(msg.body);

			try {
				const tmp = JSON.parse(msg.body.toString());
				console.log(tmp);
				if (tmp.foo) {
					console.log(new Date() + ' ~ tmp.foo = ' + tmp.foo);
				}
			} catch(e) {
				console.log(`${new Date()} ~ Received message [${msg.id}]: ${msg.body}`);
			}

			msg.finish();
		});

		/* ERROR */
		this.reader.on('error', msg => {
			console.error('\n', new Date(), ' ~ NSQ reader error:', msg);
			this.handleReconnect();
		});
	}

}

const nsqReaderObj = new CNsqReader();
nsqReaderObj.go();

