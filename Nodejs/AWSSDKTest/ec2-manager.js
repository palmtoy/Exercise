// ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ec2-example-managing-instances.html

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-west-2'});
// Create EC2 service object
const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

const SLEEP_INTERVAL = 25 * 1000; // 25s

const G_EC2_ACTIONS = {
	START: 'START',
	STOP: 'STOP'
};

const funcNow = () => {
	return new Date().toLocaleString() + ' ~ ';
};

const funcSleep = async (sleepInterval) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			return resolve();
		}, sleepInterval);
	});
}

const getInstanceIdAndPublicIp = async () => {
	const retObj = { instanceId: '', publicIpAddress: '' };
	const params = {
		DryRun: false
	};
	try {
		await new Promise((resolve, reject) => {
			ec2.describeInstances(params, function(err, jsonData) {
				if (err) {
					return reject(err);
				} else {
					console.log(funcNow() + '_getInstanceIdAndPublicIp OK');
					if (jsonData.Reservations.length > 0) {
						const instanceObj = jsonData.Reservations[0].Instances[0];
						retObj.instanceId = instanceObj.InstanceId;
						retObj.publicIpAddress = instanceObj.PublicIpAddress;
					}
					return resolve();
				}
			});
		});
	} catch (e) {
		console.log(funcNow() + '_getInstanceIdAndPublicIp Error', { e });
	}
	return retObj;
};


const manageInstance = async (instanceId, instanceAction) => {
	if (!instanceId) {
		return;
	}
	try {
		const params = {
			InstanceIds: [ instanceId ],
			DryRun: true
		};
		if (instanceAction === G_EC2_ACTIONS.START) {
			await new Promise((resolve, reject) => {
				// Call EC2 to start the selected instances
				ec2.startInstances(params, function(err) {
					if (err && err.code === 'DryRunOperation') {
						params.DryRun = false;
						ec2.startInstances(params, function(err, jsonData) {
								if (err) {
									console.log(funcNow() + `_manageInstance ${instanceAction} Error`, err);
									return reject();
								} else if (jsonData) {
									console.log(funcNow() + `_manageInstance ${instanceAction} OK`, JSON.stringify(jsonData.StartingInstances));
									return resolve();
								}
						});
					} else {
						console.log(funcNow() + '_manageInstance: You don NOT have permission to start instances.', err);
						return reject();
					}
				});
			});
		} else if (instanceAction === G_EC2_ACTIONS.STOP) {
			await new Promise((resolve, reject) => {
				// Call EC2 to stop the selected instances
				ec2.stopInstances(params, function(err) {
					if (err && err.code === 'DryRunOperation') {
						params.DryRun = false;
						ec2.stopInstances(params, function(err, jsonData) {
								if (err) {
									console.log(funcNow() + `_manageInstance ${instanceAction} Error`, err);
									return reject();
								} else if (jsonData) {
									console.log(funcNow() + `_manageInstance ${instanceAction} OK`, JSON.stringify(jsonData.StoppingInstances));
									return resolve();
								}
						});
					} else {
						console.log(funcNow() + '_manageInstance: You don NOT have permission to stop instances.', err);
						return reject();
					}
				});
			});
		}
	} catch (e) {}
};


async function main(instanceAction) {
	instanceAction = instanceAction.toUpperCase();
	let { instanceId, publicIpAddress } = await getInstanceIdAndPublicIp();
	if (instanceAction === G_EC2_ACTIONS.START && instanceId && publicIpAddress) {
		return console.log(funcNow() + `${JSON.stringify({ instanceId })} is already running on`, { publicIpAddress });
	}
	console.log({ instanceId, publicIpAddress });
	await manageInstance(instanceId, instanceAction);
	if (instanceAction === G_EC2_ACTIONS.START && instanceId) {
		await funcSleep(SLEEP_INTERVAL);
	} else {
		return;
	}
	const retObj = await getInstanceIdAndPublicIp();
	instanceId = retObj.instanceId;
	publicIpAddress = retObj.publicIpAddress;
	if (instanceAction === G_EC2_ACTIONS.START && instanceId && publicIpAddress) {
		console.log('==> You can connect to', { publicIpAddress }, 'right now. <==');
	} else {
		console.error(funcNow() + 'There is something wrong with your action, please check it.');
	}
};

main(process.argv[2]);

