const nsq = require('nsqjs');
const conf = require('./conf.json');

const reader = new nsq.Reader('sample_topic', 'test_channel', {
	nsqdTCPAddresses: conf.nsqd.ip + ':' + conf.nsqd.port
});

reader.connect();

/* OK */
reader.on('nsqd_connected', msg => {
  console.log(new Date() + ' ~ NSQ reader nsqd_connected:', msg);
});

reader.on('ready', () => {
  console.log(new Date() + ' ~ NSQ reader is ready to receive msgs ...');
});

reader.on('message', msg => {
  console.log(new Date() + ' ~ Received message [%s]: %s', msg.id, msg.body.toString());
  msg.finish();
});

/* ERROR */
reader.on('error', msg => {
  console.error('\n', new Date(), ' ~ NSQ reader error:', msg, '\n');
});

