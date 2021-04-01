const cluster = require('cluster');
const os = require('os');
const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');

const port = config.srvPort;


if (cluster.isMaster) {
  console.log(`Srv-Master process:${process.pid} is running ...`);

  const workerNum = 3;
  // worker process
  for (let i = 0; i < workerNum; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Srv-Worker process:${worker.process.pid} exit.`);
  });
} else {
  const app = express();
  const router = express.Router();

  const maxRandom = config.reqTimeout - 10;

  router.post('/', async (req, res) => {
    const reqTime = new Date().toString();
    console.log('\n\n', { reqTime, 'web req.body': req.body });
    const { name: cliName } = req.body;

    const rdmNum = Math.floor(Math.random() * maxRandom + 1);
    if (rdmNum <= maxRandom / 5) {
      console.log({ errorMsg: '500, Server Internal Error' });
      return res.status(500).end();
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        const resTime = new Date().toString();
        const srvHostname = os.hostname();
        const resJson = { cliName, srvTime: 'bar ~ ' + resTime, srvHostname, pid: process.pid };
        console.log({ resJson });
        res.json(resJson);
        resolve();
      }, rdmNum);
    });
  });

  app.use(bodyParser.json());
  app.use('/bar', router);

  app.listen(port);
  console.log(`Srv-Worker Express ( process:${process.pid} ) http srv is running on`, { port }, '...');
}

