'use strict'

class BookStore {

	constructor() {
		if(!BookStore.instance){
			this._id = -1;
			BookStore.instance = this;
		}

		return BookStore.instance;
	}

	setId(id) {
		this._id = id;
	}

	getId() {
		return this._id;
	}

}

const instance = new BookStore();

module.exports = instance;

