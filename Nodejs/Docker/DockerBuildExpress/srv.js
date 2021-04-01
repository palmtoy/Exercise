const cluster = require('cluster');
const os = require('os');
const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const dbOptions = require('./db-options');
const knex = require('knex')(dbOptions);

const port = config.srvPort;


const _getDataFromDb = async () => {
  let ret = [];
  try {
    ret = await new Promise((resolve, reject) => {
      knex.from('automobile').select("*")
        .then(dataRows => {
	  return resolve(dataRows);
        })
        .catch((err) => { reject(err); })
        .finally(() => {});
    });
  } catch (e) {
    console.error('__getDataFromDb:', { error: e });
  }
  return ret;
};


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
      setTimeout(async () => {
				const carInfoList = await _getDataFromDb();
        const resTime = new Date().toString();
        const srvHostname = os.hostname();
        const resJson = { cliName, srvTime: 'bar ~ ' + resTime, carInfoList, srvHostname, pid: process.pid };
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

