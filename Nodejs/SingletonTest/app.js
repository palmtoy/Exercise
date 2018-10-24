'use strict'

const myStore = require('./my-store');
const bookStoreObj = require('./book-store');

console.log(`1: bookId = ${bookStoreObj.getId()}\n`);

const myStoreObj = new myStore;
myStoreObj.setId(369);

console.log(`2: bookId = ${bookStoreObj.getId()}`);

