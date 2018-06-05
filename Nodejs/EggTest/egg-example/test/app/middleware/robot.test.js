'use strict';

const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/app/middleware/robot.test.js', () => {
  it('should block robot', () => {
    console.log('  ' + Object.keys(mock)[0] + ',', Object.keys(assert)[0], '\n');
    return app.httpRequest()
      .get('/')
      .set('User-Agent', 'Baiduspider')
      .expect(403);
  });
});
