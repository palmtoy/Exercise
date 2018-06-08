'use strict';

exports.detail = async ctx => {
  // 如果请求 URL 被正则匹配， 可以按照捕获分组的顺序，从 ctx.params 中获取。
  // 按照下面的用户请求，`ctx.params[0]` 的 内容就是 `egg/1.0.0`
  ctx.body = `${new Date()} ~ package: ${ctx.params[0]}`;
};

// curl http://127.0.0.1:7001/package/egg/1.0.0
