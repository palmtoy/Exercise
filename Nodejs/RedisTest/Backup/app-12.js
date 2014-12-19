var client = require("redis").createClient();

console.log('redis_version = ', JSON.stringify(client.server_info));

client.end();
