const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');

const iss = '3b6-***-***-d31';
const scopes = ['publishing'];
const iat = Math.round(new Date().getTime() / 1000);
const exp = iat + 1200;
const privateKey = fs.readFileSync('./samsung_dev_private_key', 'utf8');

try {
  const jwt = jsonwebtoken.sign({ iss, scopes, exp, iat }, privateKey, { algorithm: 'RS256' });
  console.log(`jwt: ${jwt}`);
  fetch('https://devapi.samsungapps.com/auth/accessToken', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then(async (response) => {
      const responseBody = await response.text();

      if (!response.ok) {
        throw new Error(`Request failed (${response.status}): ${responseBody}`);
      }

      try {
        console.log('\nResponse:', JSON.parse(responseBody));
      } catch {
        console.log(responseBody);
      }
    })
    .catch((err) => console.error(err));
} catch (err) {
  console.error(err);
}
