#!/usr/bin/env node

/*
  请求示例 ( 使用命令行 curl 测试 ):
  curl -v -X POST http://localhost:8088/billing/callback \
    -H "appId: 8309" \
    -H "token: qbdjoyaqkasdyqcayx" \
    -H "Content-Type: application/json" \
    -d '{"callbackParams": "{\"myDeviceId\":\"6070e3-59c0zp\",\"myUseId\":\"970362031\",\"myChannel\":\"g00gle\",\"myProductId\":\"com.hello.coin999\"}"}'
*/

import { createServer } from 'http';

const PORT = 8088;

const server = createServer((req, res) => {
  console.log(`\nMethod: ${req.method}, URL: ${req.url}`);
  console.log('Headers:', req.headers);
  if (req.method === 'POST' && req.url === '/billing/callback') {
    // 检查请求头
    const token = req.headers['token'];
    // token 校验
    if (token !== 'qbdjoyaqkasdyqcayx') {
      const message = 'Invalid token';
      console.log('Message:', message, '\n');
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errorCode: 1, message }));
      return;
    }

    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        // 打印请求头和请求体所有字段
        console.log('Body:', data, '\n');
        // 返回响应
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            errorCode: 0,
            timestamp: Date.now(),
          }),
        );
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ errorCode: 2, message: 'Invalid JSON body' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ errorCode: 404, message: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} ...`);
});
