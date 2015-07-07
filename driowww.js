var express = require('express');
var logger = require('morgan');
var fs = require('fs');
//var jade = require('jade');

var app=express();

//
app.locals.pretty = true;

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/files'));

var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
app.use(logger('combined', {stream: accessLogStream}));

app.get(['/','/blog','/home','/contact'], function(req, res){
	res.render('index', { title: 'datarefinery.io', message: 'datarefinery.io coming soon!'});
});

 // Handle 404
  app.use(function(req, res) {
      res.status(400);
      res.render('404.jade', {title: '404: File Not Found'});
  });


var server = app.listen(80, function(){
	console.log("app listening on %s %s",server.address().address,server.address().port)
})