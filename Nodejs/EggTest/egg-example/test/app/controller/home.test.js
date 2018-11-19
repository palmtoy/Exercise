'use strict';

const { app, assert } = require('egg-mock/bootstrap');

const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

describe('test/app/controller/home.test.js', () => {

  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should GET /home/index', done => {

    console.log(new Date());
    setTimeoutPromise(3 * 1000, 'foobar').then(value => {
      console.log(value);

      app.httpRequest()
        .get('/home/index')
        .expect(new Date().toLocaleString() + ' ~ Hello world!')
        .expect(200);
      console.log(new Date());

      done();
    });

  });

});
