// Define the original function.
var checkNumericRange = function (value) {
  if (typeof value !== 'number')
    return false;
  else
    return value >= this.minimum && value <= this.maximum;
}

// The range object will become the this value in the callback function.
var range = { minimum: 10, maximum: 20 };

// Bind the checkNumericRange function.
var boundCheckNumericRange = checkNumericRange.bind(range);

// Use the new function to check whether 12 is in the numeric range.
var result = boundCheckNumericRange (12);
console.log(result);

// Output: true
