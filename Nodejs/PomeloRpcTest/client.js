var Client = require('pomelo-rpc').client;

// remote service interface path info list
var records = [
  {namespace: 'user', serverType: 'test', path: __dirname + '/remote/test'}
];

var context = {
  serverId: 'test-server-1'
};

// server info list
var servers = [
  {id: 'test-server-1', serverType: 'test', host: '127.0.0.1', port: 8080}
];

// route parameter passed to route function
var routeParam = null;

// route context passed to route function
var routeContext = servers;

// route function to caculate the remote server id
var routeFunc = function(routeParam, msg, routeContext, cb) {
  cb(null, routeContext[0].id);
};

var client = Client.create({routeContext: routeContext, router: routeFunc, context: context});

client.start(function(err) {
  console.log('RPC client start ok.');

  client.addProxies(records);
  client.addServers(servers);

  var msgFromClient = 'Hello world!';
  console.log('Send msg(`%s`) to server.', msgFromClient);
  client.proxies.user.test.service.echo(routeParam, msgFromClient, function(err, resp) {
    if(err) {
      console.error(err.stack);
    }
    console.log(resp);
  });
});

