const cluster = require('cluster');
const config = require('config');
const request = require('request');

const workerNum = 3;
const reqTimeout = config.reqTimeout;
const webUrl = config.webUrl + config.webPort + config.webPath;
const body = { name: 'palmtoy' };
const options = { url: webUrl, body, method: 'POST', json: true, timeout: reqTimeout };

const funcSleep = async (sleepTime) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, sleepTime || 0);
  });
};

const doReq = async (cnt) => {
  try {
    await new Promise((resolve, reject) => {
      request(options, (err, tmpRes) => {
        if (err) {
          return reject(err);
        } else {
          const statusCode = tmpRes.statusCode;
          tmpRes = tmpRes.body || {};
          console.debug('\n\n', { statusCode, resJson: tmpRes, cnt });
          return resolve();
        }
      });
    });
  } catch (error) {
    console.error('\n\n', { timestamp: new Date().toString(), cnt, error });
  }
};


if (cluster.isMaster) {
  console.log(`Master process:${process.pid} is running ...`);

  // worker process
  for (let i = 0; i < workerNum; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker process:${worker.process.pid} exit.`);
  });
} else {
  console.log(`Worker process:${process.pid} is running ...`);
  (async () => {
    let cnt = 0;
    do {
      ++ cnt;
      await doReq(cnt);
      await funcSleep(reqTimeout);
    } while (cnt > 0);
  })();
}

