var express = require('express');
var fs = require('fs');
var app = express();

app.use('/public', express.static(__dirname + '/public'));

app.locals = {
	title: 'Extended Express Example'
};

app.all('*', function(req, res, next){
	console.log('app.all is running ...');
	fs.readFile('posts.json', function(err, data){
		res.locals.posts = JSON.parse(data);
		next();
	});
});

app.get('/', function(req, res){
	console.log('/ is running ...');
	res.render('index.ejs');
});

app.get('/post/:slug', function(req, res, next){
	console.log('/post/:slug is running ... req.params.slug =', req.params.slug);
	res.locals.posts.forEach(function(post){
		if (req.params.slug === post.slug){
			res.render('post.ejs', { post: post });
		}
	})
});

app.get('/api/posts', function(req, res){
	console.log('/api/posts is running ...');
	res.json(res.locals.posts);
});

app.listen(3000);
console.log('app is listening at localhost:3000');
