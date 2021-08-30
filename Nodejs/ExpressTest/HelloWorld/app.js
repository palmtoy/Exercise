const express = require('express');

const app = express();

const port = 3006;
app.listen(port, () => {
	console.log(`Server running on port ${port} ...`);
});


app.get('/hi', (req, res) => {
	res.json({ msg: 'Hello World ~ ' + new Date().toString()});
});

app.get('/baby', (req, res) => {
	res.json({ msg: 'Hello baby ~ ' + new Date().toString()});
});

app.post('/json', (req, res) => {
	res.json('Fake json ~ ' + new Date().toString());
});

