var gcloud = require('gcloud');

// Authenticating on a per-API-basis. You don't need to do this if you 
// auth on a global basis (see Authentication section above). 
var pubsub = gcloud.pubsub({
	projectId: 'firstprojectofwill',
	keyFilename: './mykeyforgoogle.json'
});

pubsub.createTopic('my-topic', function(err, topic, apiResponse) {
	console.log('\ncreateTopic: err =', err);
	console.log('topic =', topic);
	console.log('apiResponse =', apiResponse);

	if (!err) {
		console.log('The topic was created successfully.');
	}
});

// Reference a topic. 
var topic = pubsub.topic('my-topic');

// Publish a message to the topic. 
// The topic will be created if it doesn't exist. 
topic.publish({
	data: 'New message!'
}, function(err) {
	console.log('\npublish: err =', err);
});

// Subscribe to the topic. 
topic.subscribe('my-topic', function(err, subscription) {
	console.log('\nsubscribe: err =', err);
	// Register listeners to start pulling for messages. 
	function onError(err) {
		console.log('err =', err);
	}
	function onMessage(message) {
		console.log('message =', message);
	}
	if(subscription) {
		subscription.on('error', onError);
		subscription.on('message', onMessage);

		// Remove listeners to stop pulling for messages.
		subscription.removeListener('message', onMessage);
		subscription.removeListener('error', onError);
	}
});

