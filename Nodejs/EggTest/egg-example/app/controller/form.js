'use strict';

exports.post = async ctx => {
  ctx.body = `${new Date()} ~ body: ${JSON.stringify(ctx.request.body)}`;
};

// curl -X POST http://127.0.0.1:7001/form --data '{"name":"controller"}' --header 'Content-Type:application/json'
