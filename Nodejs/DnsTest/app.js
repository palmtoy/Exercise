var dns = require('dns');

dns.lookup('www.google.com', function onLookup(err, addresses, family) {
  console.log('err:', err);
  console.log('addresses:', addresses);
  console.log('family:', family);
});

