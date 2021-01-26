function Student() {
	this.index = 100;

	this.printIdx = () => {
		console.log('My index is', this.index);
	};
};

Student.prototype.setIdx = function (tmpIdx) {
	this.index = tmpIdx;
};

module.exports = new Student();

