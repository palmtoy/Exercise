var gcloud = require('gcloud');
 
// Authenticating on a per-API-basis. You don't need to do this if you 
// auth on a global basis (see Authentication section above). 
 
var pubsub = gcloud.pubsub({
  projectId: 'firstprojectofwill',
  keyFilename: './mykeyforgoogle.json'
});
 
// Reference a topic. 
var topic = pubsub.topic('my-topic');
 
// Publish a message to the topic. 
// The topic will be created if it doesn't exist. 
for(var i = 0; i < 3; i++) {
	topic.publish({
		data: 'New message!'
	}, function(err) {});
}

/*
// Subscribe to the topic. 
topic.subscribe('my-topic', function(err, subscription) {
	// Register listeners to start pulling for messages.
	function onError(err) {
		console.log('err =', err);
	}
	function onMessage(message) {
		console.log('message =', message);
	}
	subscription.on('error', onError);
	subscription.on('message', onMessage);
});
*/

