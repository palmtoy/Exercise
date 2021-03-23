const cluster = require('cluster');
const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const port = config.webPort;


if (cluster.isMaster) {
  console.log(`Web-Master process:${process.pid} is running ...`);

  const workerNum = 3;
  // worker process
  for (let i = 0; i < workerNum; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Web-Worker process:${worker.process.pid} exit.`);
  });
} else {
  const app = express();
  const router = express.Router();

  router.post('/', function (req, res) {
    const reqTime = new Date().toString();
    console.log('\n\n', { reqTime , 'cli req.body': req.body });
    const srvUrl = config.srvUrl + config.srvPort + config.srvPath;
    const body = req.body;
    const options = { url: srvUrl, body, method: 'POST', json: true };
    request(options, (err, tmpRes) => {
      let resJson = { webTime: 'foo ~ ' + reqTime };
      if (err) {
        console.error({ err });
        return res.json(resJson);
      } else {
        const statusCode = tmpRes.statusCode;
        tmpRes = tmpRes.body || {};
        tmpRes.webTime = resJson.webTime;
        console.debug({ statusCode, resJson: tmpRes });
        return res.json(tmpRes);
      }
    });
  });

  app.use(bodyParser.json());
  app.use('/foo', router);

  app.listen(port);
  console.log(`Web-Worker Express ( process:${process.pid} ) http web is running on`, { port }, '...');
}

