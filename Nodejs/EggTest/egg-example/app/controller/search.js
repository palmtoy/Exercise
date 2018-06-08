'use strict';

exports.index = async ctx => {
  ctx.body = `${new Date()} ~ search: ${ctx.query.name}`;
};

// curl http://localhost:7001/search2?type=bing&q=node.js
// curl http://localhost:7001/search2?type=baidu&q=node.js
// curl http://localhost:7001/search2?q=node.js
exports.index2 = async ctx => {
  const type = ctx.query.type;
  const q = ctx.query.q || 'nodejs';
  if (type === 'bing') {
    ctx.redirect(`https://www.bing.com/search?q=${q}`);
  } else if (type === 'baidu') {
    ctx.redirect(`https://www.baidu.com/s?wd=${q}`);
  } else {
    ctx.redirect(`https://www.google.co.kr/search?q=${q}`);
  }
};

// curl http://localhost:7001/search3?name=egg
exports.index3 = async ctx => {
  ctx.body = `search: ${ctx.query.name}`;
};
