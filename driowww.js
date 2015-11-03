var express = require('express');
var logger = require('morgan');
var md = require('node-markdown-alt').Markdown;
var fs = require('fs');

var app=express();

//app.locals.pretty = true;
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/files'));
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
app.use(logger('combined', {stream: accessLogStream}));

// top level handlers for now
app.get('/', function(req, res){
	res.render('home', { title: 'datarefinery.io', message: 'Welcome'});
});
app.get('/contact', function(req, res){
	var mddata = [];
	mddata.push(fs.readFileSync('contact.md', {encoding: 'utf-8'}));
	res.render('index', { title: 'Contact', message: mddata, md: md});
});
app.get('/museums', function(req, res){
	var mddata = [];
	mddata.push(fs.readFileSync('museums.md', {encoding: 'utf-8'}));
	res.render('index', { title: 'Museums', message: mddata, md: md});
});
app.get('/services', function(req, res){
	var mddata = [];
	mddata.push(fs.readFileSync('services.md', {encoding: 'utf-8'}));
	res.render('index', {title: 'Our Services', message: mddata, md: md});
});


// blog entry handler
app.get(new RegExp('\/blog\/(.*)\/'), function(req, res) {
			var mddata = [];
      mddata.push(fs.readFileSync('blog/'+req.params[0]+'.md', {encoding: 'utf-8'}));
		res.render('blog', {title: 'Welcome to the Bloggery', message: mddata, md: md});
});
// blog directory handler
app.get('/blog', function(req, res) {
	    var files = fs.readdirSync('blog');
			var mddata = [];
			for(idx in files.reverse()){
			if(files[idx][0] !== '.'){
      mddata.push(fs.readFileSync('blog/'+files[idx], {encoding: 'utf-8'}));
		 }
		}
		res.render('blog', {title: 'Welcome to the Bloggery', message: mddata, md: md});
});
// Handle 404's
app.use(function(req, res) {
  res.status(400);
  res.render('404.jade', {
    title: '404: File Not Found'
  });
});

var server = app.listen(80, function(){
	console.log("app listening on %s %s",server.address().address,server.address().port)
})
