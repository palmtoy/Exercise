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
topic.publish({
  data: 'New message!'
}, function(err) {});
 
// Subscribe to the topic. 
topic.subscribe('new-subscription', function(err, subscription) {
  // Register listeners to start pulling for messages. 
  function onError(err) {}
  function onMessage(message) {}
  subscription.on('error', onError);
  subscription.on('message', onMessage);
 
  // Remove listeners to stop pulling for messages. 
  subscription.removeListener('message', onMessage);
  subscription.removeListener('error', onError);
});

