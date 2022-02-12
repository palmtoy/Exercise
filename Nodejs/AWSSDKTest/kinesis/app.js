#!/usr/bin/env node

const os = require('os');
const fs = require('fs');
// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'personal-account-long-term' });
// Set the region
AWS.config.update({ region: 'us-west-2' });

// Create Kinesis service object
const kinesis = new AWS.Kinesis({apiVersion: '2013-12-02'});

const G_LIMIT_NUM = 3;


async function listStreams(params) {
  return new Promise((resolve, reject) => {
		kinesis.listStreams(params, function(e, data) {
      if (e) {
        console.error(`_listStreams error -- msg: "${e.message}"\n${e.stack}`);
        return reject(e);
      } else {
        return resolve(data);
      }
		});
  });
}


async function addTagsToStream(streamName, tags) {
	const params = {
		StreamName: streamName,
		Tags: tags
	};
  return new Promise((resolve, reject) => {
		kinesis.addTagsToStream(params, function(e, data) {
      if (e) {
        console.error(`_addTagsToStream error -- msg: "${e.message}"\n${e.stack}`);
        return reject(e);
      } else {
        return resolve(data);
      }
		});
  });
}


async function listTagsForStream(params) {
  return new Promise((resolve, reject) => {
		kinesis.listTagsForStream(params, function(e, data) {
      if (e) {
        console.error(`_listTagsForStream error -- msg: "${e.message}"\n${e.stack}`);
        return reject(e);
      } else {
        return resolve(data);
      }
		});
  });
}


async function putRecord(params) {
  console.log(`\n_putRecord Data = ${params.Data}`);
  return new Promise((resolve, reject) => {
		kinesis.putRecord(params, function(e, data) {
      if (e) {
        console.error(`_putRecord error -- msg: "${e.message}"\n${e.stack}`);
        return reject(e);
      } else {
        return resolve(data);
      }
		});
  });
}


async function getShardIterator(params) {
  return new Promise((resolve, reject) => {
		kinesis.getShardIterator(params, function(e, data) {
      if (e) {
        console.error(`_getShardIterator error -- msg: "${e.message}"\n${e.stack}`);
        return reject(e);
      } else {
        return resolve(data);
      }
		});
  });
}


async function getRecords(params) {
  return new Promise((resolve, reject) => {
		kinesis.getRecords(params, function(e, data) {
      if (e) {
        console.error(`_getRecords error -- msg: "${e.message}"\n${e.stack}`);
        return reject(e);
      } else {
        return resolve(data);
      }
		});
  });
}


(async () => {
	const lParams = { Limit: G_LIMIT_NUM };
  let retObj = await listStreams(lParams);
  console.log(`\n_listStreams retObj = ${JSON.stringify(retObj)}`);
	let kStreamName = '';
	if (retObj && retObj.StreamNames && retObj.StreamNames.length > 0) {
		kStreamName = retObj.StreamNames[0];
	}
  if (!kStreamName) {
    return console.log('\nThere is NO kinesis stream.');
  }
  console.log(`\nkStreamName = ${kStreamName}`);

	const tags = { srv: `AWS-Cost@${Date.now()}` };
  retObj = await addTagsToStream(kStreamName, tags);
  console.log(`\n_addTagsToStream retObj = ${JSON.stringify(retObj)}`);

	const ltParams = { StreamName: kStreamName, Limit: G_LIMIT_NUM };
	retObj = await listTagsForStream(ltParams);
  console.log(`\n_listTagsForStream retObj = ${JSON.stringify(retObj)}`);

	const data = `${os.hostname()} ${process.pid} ${new Date().toISOString()} foo.js:101 INFO bar ~ ${JSON.stringify({ Hello: 'World' })}`;
	const pParams = {
		Data: data,
		PartitionKey: 'AWS-Cost-Srv',
		StreamName: kStreamName
	};
	retObj = await putRecord(pParams);
  console.log(`\n_putRecord retObj = ${JSON.stringify(retObj)}`);

	let shardId = '';
	let sequenceNumber = '';
	if (retObj) {
		shardId = retObj.ShardId;
		sequenceNumber = retObj.SequenceNumber;
	}
	if (!(shardId && sequenceNumber)) {
		return console.log(`\nshardId = ${shardId} && sequenceNumber = ${sequenceNumber}`);
		return console.log('There is NO ShardId or SequenceNumber with the kinesis stream.');
	}

	const gParams = {
		ShardId: shardId,
		ShardIteratorType: 'AT_SEQUENCE_NUMBER',
		StreamName: kStreamName,
		StartingSequenceNumber: sequenceNumber
	};
	retObj = await getShardIterator(gParams);
  console.log(`\n_getShardIterator retObj = ${JSON.stringify(retObj)}`);
	let shardIterator = '';
	if (retObj) {
		shardIterator = retObj.ShardIterator;
	}
	if (!shardIterator) {
		return console.log('\nThere is NO ShardIterator of the kinesis stream.');
	}

	const grParams = {
		ShardIterator: shardIterator, /* required */
		Limit: G_LIMIT_NUM
	};
	retObj = await getRecords(grParams);
  console.log(`\n_getRecords retObj = ${JSON.stringify(retObj)}`);
	if (retObj && retObj.Records && retObj.Records.length > 0) {
		const tmpData = retObj.Records[0].Data;
		if (tmpData) {
			const buf = Buffer.from(tmpData);
			console.log(`\n_getRecords Data = ${buf.toString()}`);
		}
	}
})();

