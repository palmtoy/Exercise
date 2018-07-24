'use strict';

const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const pump = require('mz-modules/pump');
const mongodbRestore = require('mongodb-restore');

class UploadMultipleController extends Controller {
  async show() {
    await this.ctx.render('page/multiple.html');
  }

  async upload() {
    const parts = this.ctx.multipart({ autoFields: true });
    const files = [];
    let restoreTar = null;

    let stream;
    while ((stream = await parts()) != null) {
      const filename = stream.filename.toLowerCase();
      const target = path.join(this.config.baseDir, 'app/public', filename);
      const writeStream = fs.createWriteStream(target);
      await pump(stream, writeStream);
      files.push(filename);
      if (!restoreTar && filename) {
        restoreTar = target;
      }
    }

    if (restoreTar) {
      mongodbRestore({
        uri: 'mongodb://127.0.0.1/trace-source-data', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
        root: path.dirname(restoreTar), // read backup(s) file(s) from this dir
        tar: path.basename(restoreTar), // restore backup(s) tar file(s) from this dir
        metadata: true,
        drop: true, // drop entire database before restore backup
        logger: '/tmp/mongodb-restore.log',
      });
    }

    await this.ctx.render('page/multiple_result.html', {
      fields: Object.keys(parts.field).map(key => ({ key, value: parts.field[key] })),
      files,
    });
  }
}

module.exports = UploadMultipleController;

