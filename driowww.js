var express = require('express');
var logger = require('morgan');
var mmarkdown = require('meta-marked');
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
	data = fs.readFileSync('contact.md', 'utf-8')
	md = mmarkdown(data);
	res.render('index', {Title : md.meta.Title, pageHtml: md.html});
});
app.get('/museums', function(req, res){
	data = fs.readFileSync('museums.md', 'utf-8')
	md = mmarkdown(data);
	res.render('index', {Title : md.meta.Title, pageHtml: md.html});
});
app.get('/services', function(req, res){
	data = fs.readFileSync('services.md', 'utf-8')
	md = mmarkdown(data);
	res.render('index', {Title : md.meta.Title, pageHtml: md.html});
});

// blog single entry handler
app.get(new RegExp('\/blog\/(.*)\/'), function(req, res) {
	data = fs.readFileSync('blog/'+req.params[0], 'utf-8')
	md = mmarkdown(data);
	res.render('blog', {Title: 'Welcome to the Bloggery', pageHtml: md.html});
});
// blog directory handler
app.get('/blog', function(req, res) {
    var files = fs.readdirSync('blog');
		md=[]; bloghtml='';
		for(idx in files.reverse()){
			if(files[idx][0] !== '.'){
				data = fs.readFileSync('blog/'+files[idx], 'utf-8');
				md[files[idx]]=(mmarkdown(data));
			}
		}
		for(idx in md){
			bloghtml = bloghtml+'<a href="'+idx+'/"><h3>'+md[idx].meta.Title+'</h3></a>';
			bloghtml = bloghtml+'<p><em>posted by '+md[idx].meta.Author+' on '+md[idx].meta.PostDate.toDateString()+'</em><p>';
			bloghtml = bloghtml+md[idx].html;
		}
		res.render('blog', {Title: 'Welcome to the Bloggery', pageHtml: bloghtml});
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
