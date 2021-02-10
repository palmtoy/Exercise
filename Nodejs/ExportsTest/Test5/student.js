function Student() {
	this.index = 100;

	this.printIdx = () => {
		console.log('My index is', this.index);
	};
};

const G_INDEX = 666;

Student.prototype.setIdx = (tmpIdx) => {
	console.log('this =', this);
	this.G_INDEX = tmpIdx;
	console.log('this =', this, '\n');
	console.log('G_INDEX =', G_INDEX, '\n');
};

module.exports = new Student();

