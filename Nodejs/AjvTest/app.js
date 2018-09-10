const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

const schema = {
	"properties": {
		"foo": { "type": "string" },
		"bar": { "type": "number", "maximum": 3 }
	}
};
const validate = ajv.compile(schema);

const funcTest = data => {
	const valid = validate(data);
	if (valid) {
		console.log('Valid!');
	} else {
		console.log('Invalid: ' + ajv.errorsText(validate.errors));
	}
}


funcTest({ "foo": "abc", "bar": 2 });
funcTest({ "foo": 2, "bar": 4 });
funcTest({ "foo": "xyz" });
