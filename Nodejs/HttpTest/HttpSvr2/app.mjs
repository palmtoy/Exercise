#!/usr/bin/env node

/*
  请求示例 ( 使用命令行 curl 测试 ):
  curl -v -X POST http://localhost:8088/billing/callback \
    -H "appId: 8309" \
    -H "token: qbdjoyaqkasdyqcay" \
    -H "Content-Type: application/json" \
    -d '{"callbackParams": "{\"myDeviceId\":\"6070e3-59c0zp\",\"myUseId\":\"970362031\",\"myChannel\":\"g00gle\",\"myProductId\":\"com.hello.coin999\"}"}'
*/

import { createServer } from 'http';

const PORT = 8088;
const G_INTERVAL = 7; // units: s

function sendRespose(res, statusCode, errCode, message) {
  console.log('Message:', message, '\n');
  setTimeout(() => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ errCode, message }));
  }, G_INTERVAL * 1000);
}

const server = createServer((req, res) => {
  console.log(`\n${new Date().toLocaleString()} ->\nMethod: ${req.method}, URL: ${req.url}`);
  console.log('Headers:', req.headers);
  if (req.method === 'POST' && req.url === '/billing/callback') {
    // 检查请求头
    const token = req.headers['token'];
    // token 校验
    if (token !== 'qbdjoyaqkasdyqcay') {
      return sendRespose(res, 400, 1, 'Invalid token');
    }

    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        // 打印请求头和请求体所有字段
        console.log('Body:', data);
        // 返回响应
        return sendRespose(res, 200, 0, new Date().toLocaleString());
      } catch (e) {
        sendRespose(res, 400, 2, 'Invalid JSON body');
      }
    });
  } else {
    sendRespose(res, 404, 404, 'Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} ...\n`);
});

