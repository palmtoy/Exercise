/*
	curl -v http://localhost:3000
*/
const Koa = require('koa');
const app = new Koa();

// X-Response-Time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`X-Response-Time: ${ms}ms\n`);
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response
app.use(async ctx => {
  ctx.body = new Date() + ' ~ Hello World';
});

const port = 3000;

app.listen(port);

console.log(new Date() + ' ~ Koa http server is running on port ' + port + ' ...');

