const stream = require('stream');
const util = require('util');

const Transform = stream.Transform;

/*
 * Filters an object stream properties
 *
 * @param filterProps array of props to filter
 */
function Filter(filterProps, options) {
	// allow use without new
	if (!(this instanceof Filter)) {
		return new Filter(filterProps, options);
	}

	// init Transform(ensure object)
	options = options || {};
	// forcing object mode
	options.objectMode = true;

	Transform.call(this, options);

	this.filterProps = filterProps;
}
util.inherits(Filter, Transform);

/* filter each object's sensitive properties */
Filter.prototype._transform = function (obj, enc, cb) {
	// determine what keys to keep
	const filteredKeys = Object.keys(obj).filter( key => {
			// only those keys in this list
			return (this.filterProps.indexOf(key) > -1);
		}
	);

	// create clone with only these keys
	const filteredObj = filteredKeys.reduce( (accum, key) => {
			accum[key] = obj[key];
			return accum;
		}, {}
	);

	// push the filtered obj out
	this.push(filteredObj);
	cb();
};


// try it out, output to stdout
// filter phone and email from objects ( Only output these items. )
const filter = new Filter([ 'name', 'phone', 'id' ]);

filter.on('readable', () => {
	let obj;
	while (null !== (obj = filter.read())) {
		console.log(obj);
	}
});

// now send some objects to filter through
filter.write({ name: 'Foo', phone: '555-1212', email: 'foo@foo.com', id: 123 });
filter.write({ name: 'Bar', phone: '555-1313', email: 'bar@bar.com', id: 456 });
filter.end(); // finish

