#!/usr/bin/env /opt/node/current/bin/node

var tcpProxy = require('tcp-proxy');
 
var targetArray = [
  {
    host: 'UbuntuVM',
    port: 6379
  },
  {
    host: 'api-qa.gods.sparx.io',
    port: 6379
  }
];

var proxyArray = targetArray.map(function (tObj) {
	return tcpProxy.createServer({
		target: tObj
	});
});

function nextProxy() {
  return proxyArray.shift();
};

nextProxy().listen(26379);
nextProxy().listen(26380);

