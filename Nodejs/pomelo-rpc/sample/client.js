// var Client = require('..').client;
var Client = require('../index').client;
var utils = require('../lib/util/utils');

// remote service interface path info list
var records = [
  {namespace: 'user', serverType: 'test', path: __dirname + '/remote/test'}
];


// server info list
var servers = [
  {id: 'test-server-1', serverType: 'test', host: '127.0.0.1', port: 3333}
];

// route parameter passed to route function
var routeParam = null;

// route context passed to route function
// {id: 'test-server-1', serverType: 'test', host: '127.0.0.1', port: 3333}
var routeContext = servers;

// route function to caculate the remote server id
var routeFunc = function(routeParam, msg, routeContext, cb) {
	utils.myPrint('routeContext[0].id = ', routeContext[0].id);
  cb(null, routeContext[0].id);
};

var client = Client.create({routeContext: routeContext, router: routeFunc});

client.start(function(err) {
  console.log('rpc client start ok.');

  client.addProxies(records);
  client.addServers(servers);

	utils.myPrint('routeParam = ', routeParam);
	client.proxies.user.test.service.echo(routeParam, 'hello', function(err, resp) {
    if(err) {
      console.error(err.stack);
    }
    console.log(resp);
  });

	/*
  client.proxies.user.test.service.combine(routeParam, {arg1:99, arg2:100}, function(err, resp) {
    if(err) {
      console.error(err.stack);
    }
    console.log(resp);
  });
  */

});