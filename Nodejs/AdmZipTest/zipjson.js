"use strict";

const admZip = require('adm-zip');

// creating archives
const zipObj = new admZip();

zipObj.addLocalFile('./big-size.json');
zipObj.writeZip('./big-size.zip');

