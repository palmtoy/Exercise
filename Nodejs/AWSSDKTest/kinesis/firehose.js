#!/usr/bin/env node

const os = require('os');
const fs = require('fs');
// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'personal-account-long-term' });
// Set the region
AWS.config.update({ region: 'us-west-2' });

// Create Firehose service object
const firehose = new AWS.Firehose({apiVersion: '2015-08-04'});

const G_LIMIT_NUM = 3;


async function listDeliveryStreams(params) {
  return new Promise((resolve, reject) => {
		firehose.listDeliveryStreams(params, function(e, data) {
      if (e) {
        console.error(`_listDeliveryStreams error -- msg: "${e.message}"\n${e.stack}`);
        return reject(e);
      } else {
        return resolve(data);
      }
		});
  });
}


async function tagDeliveryStream(streamName, tags) {
	const params = {
		DeliveryStreamName: streamName,
		Tags: tags
	};
  return new Promise((resolve, reject) => {
		firehose.tagDeliveryStream(params, function(e, data) {
      if (e) {
        console.error(`_tagDeliveryStream error -- msg: "${e.message}"\n${e.stack}`);
        return reject(e);
      } else {
        return resolve(data);
      }
		});
  });
}


async function listTagsForDeliveryStream(params) {
  return new Promise((resolve, reject) => {
		firehose.listTagsForDeliveryStream(params, function(e, data) {
      if (e) {
        console.error(`_listTagsForDeliveryStream error -- msg: "${e.message}"\n${e.stack}`);
        return reject(e);
      } else {
        return resolve(data);
      }
		});
  });
}


async function putRecord(params) {
  console.log(`\n_putRecord Data = ${params.Record.Data}`);
  return new Promise((resolve, reject) => {
		params.Record.Data += '\n';
		firehose.putRecord(params, function(e, data) {
      if (e) {
        console.error(`_putRecord error -- msg: "${e.message}"\n${e.stack}`);
        return reject(e);
      } else {
        return resolve(data);
      }
		});
  });
}


(async () => {
	const lParams = { DeliveryStreamType: 'DirectPut', Limit: G_LIMIT_NUM };
  let retObj = await listDeliveryStreams(lParams);
  console.log(`\n_listDeliveryStreams retObj = ${JSON.stringify(retObj)}`);
	let fStreamName = '';
	if (retObj && retObj.DeliveryStreamNames && retObj.DeliveryStreamNames.length > 0) {
		fStreamName = retObj.DeliveryStreamNames[0];
	}
  if (!fStreamName) {
    return console.log('\nThere is NO firehose stream.');
  }
  console.log(`\nfStreamName = ${fStreamName}`);

	const tags = [{ Key: 'srv', Value: `AWS-Cost@${Date.now()}` }];
  retObj = await tagDeliveryStream(fStreamName, tags);
  console.log(`\n_tagDeliveryStream retObj = ${JSON.stringify(retObj)}`);

	const ltParams = { DeliveryStreamName: fStreamName, Limit: G_LIMIT_NUM };
	retObj = await listTagsForDeliveryStream(ltParams);
  console.log(`\n_listTagsForDeliveryStream retObj = ${JSON.stringify(retObj)}`);

	const data = `${os.hostname()} ${process.pid} ${new Date().toISOString()} foo.js:101 INFO bar ~ ${JSON.stringify({ Hello: 'World' })}`;
	const pParams = {
		DeliveryStreamName: fStreamName,
		Record: { Data: data }
	};
	retObj = await putRecord(pParams);
  console.log(`\n_putRecord retObj = ${JSON.stringify(retObj)}`);
})();

