const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');

const iss = '3b6-***-***-d31';
const scopes = ['publishing', 'gss'];
const iat = Math.round(new Date().getTime() / 1000);
const exp = iat + 1200;
const privateKey = fs.readFileSync('./samsung_dev_private_key', 'utf8');

try {
  const jwt = jsonwebtoken.sign({ iss, scopes, exp, iat }, privateKey, { algorithm: 'RS256' });
  console.log(jwt);
} catch (err) {
  console.error(err);
}

