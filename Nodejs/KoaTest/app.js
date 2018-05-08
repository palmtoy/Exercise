const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = new Date() + ' ~ Hello World';
});

const port = 3000;

app.listen(port);

console.log(new Date() + ' ~ Koa http server is running on port ' + port + ' ...');

