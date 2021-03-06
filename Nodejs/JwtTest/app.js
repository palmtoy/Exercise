'use strict';

const Koa = require('koa');
const koajwt = require('koa-jwt');
const jwt = require('jsonwebtoken');

const profile = { id: 186163 };
const secretCode = 'd73b04b0e696b0945283defa3eee4538';
const TOKEN = jwt.sign(profile, secretCode, { expiresIn: 8 * 60 * 60 }); // 8 hours

console.log('Starting koa-jwt test server on http://localhost:3000/\n');
console.log('You can test the server by issuing curl commands like the following:\n');
console.log('  curl http://localhost:3000/public/foo            # should succeed (return "unprotected")');
console.log('  curl http://localhost:3000/api/foo               # should fail (return "401 Unauthorized ...")');
console.log('  curl -H "Authorization: Bearer ' + TOKEN + '" http://localhost:3000/api/foo   # should succeed (return "protected")\n');

const app = new Koa();

// Custom 401 handling
app.use((ctx, next) => {
	return next().catch(err => {
		if (401 == err.status) {
			ctx.status = 401;
			ctx.body = '401 Unauthorized - Protected resource, use Authorization header to get access\n';
		} else {
			throw err;
		}
	});
});

// Unprotected middleware
app.use((ctx, next) => {
	if (ctx.url.match(/^\/public/)) {
		ctx.body = 'unprotected\n';
	} else {
		return next();
	}
});

// Middleware below this line is only reached if JWT token is valid
app.use(koajwt({ secret: secretCode }));

app.use(ctx => {
	if (ctx.url.match(/^\/api/)) {
		ctx.body = 'protected\n';
	}
});

app.listen(3000);
