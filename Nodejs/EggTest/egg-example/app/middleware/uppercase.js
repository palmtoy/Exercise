'use strict';

module.exports = () => {
  return async function uppercase(ctx, next) {
    ctx.query.name = new Date().toString().toUpperCase() + ' ~ ' + ctx.query.name.toUpperCase();
    await next();
  };
};
