'use strict'

class MyStore {

	constructor() {
		this.bookStoreObj = require('./book-store');
	}

	setId(id) {
		this.bookStoreObj.setId(id);
	}

}

module.exports = MyStore;

