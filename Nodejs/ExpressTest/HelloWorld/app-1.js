const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.json({ msg: 'Hello World ~ ' + new Date().toString()});
});

const port = 3003;
app.listen(port, () => {
	console.log(`Server running on port ${port} ...`);
});

