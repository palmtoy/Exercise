'use strict';

exports.index = async ctx => {
  ctx.body = `${new Date()} ~ search: ${ctx.query.name}`;
};
