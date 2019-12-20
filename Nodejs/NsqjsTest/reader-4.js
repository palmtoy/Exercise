const nsq = require('nsqjs');
const conf = require('./conf.json');

class CNsqReader {

	constructor() {
		this.strTopic = 'sample_topic';
		this.strChannel = 'test_channel';
		this.timeoutObj = null;
	}

	addNewReader(readerName, strTopic, strChannel) {
		this[readerName] = new nsq.Reader(strTopic, strChannel, {
			nsqdTCPAddresses: conf.nsqd.ip + ':' + conf.nsqd.port
		});

		this[readerName].connect();
		console.log('Subscribing %s:%s', strTopic, strChannel);

		/* OK */
		this[readerName].on('nsqd_connected', msg => {
			console.log(`${new Date()} ~ NSQ ${readerName} nsqd_connected: ${msg}`);
		});

		this[readerName].on('ready', () => {
			console.log(`${new Date()} ~ NSQ ${readerName} is ready to receive msgs ...`);
		});

		this[readerName].on('message', msg => {
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
		this[readerName].on('error', msg => {
			console.error(`\n${new Date()} ~ NSQ ${readerName} error: ${msg}`);
		});
	}

	go() {
		this.addNewReader('reader-1', this.strTopic, this.strChannel + '-1');
		this.addNewReader('reader-2', this.strTopic, this.strChannel + '-2');
		this.addNewReader('reader-3', this.strTopic, this.strChannel + '-3');
	}

}

const nsqReaderObj = new CNsqReader();
nsqReaderObj.go();

