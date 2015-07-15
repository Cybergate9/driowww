var express = require('express');
var logger = require('morgan');
var md = require('node-markdown').Markdown;
var fs = require('fs');


var app=express();

//app.locals.pretty = true;

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/files'));

var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
app.use(logger('combined', {stream: accessLogStream}));

app.get(['/','/contact'], function(req, res){
	res.render('index', { title: 'datarefinery.io', message: 'datarefinery.io coming soon!'});
});
app.get('/blog', function(req, res) {
	    var files = fs.readdirSync('blog');
			var mddata = [];
			for(idx in files){
			if(files[idx][0] !== '.'){
      mddata.push(fs.readFileSync('blog/'+files[idx], {encoding: 'utf-8'}));
		 }
		}
		res.render('blog', {title: 'Welcome to the Bloggery', message: mddata, md: md});
});
// Handle 404
app.use(function(req, res) {
  res.status(400);
  res.render('404.jade', {
    title: '404: File Not Found'
  });
});


var server = app.listen(80, function(){
	console.log("app listening on %s %s",server.address().address,server.address().port)
})
