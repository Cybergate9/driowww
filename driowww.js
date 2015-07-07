var express = require('express');
var logger = require('morgan');
var fs = require('fs');
//var jade = require('jade');


var app=express();

app.set('view engine', 'jade');
app.use(express.static('public'));

var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
app.use(logger('combined', {stream: accessLogStream}));

app.get('/', function(req, res){
	res.render('index', { title: 'datarefinery.io', message: 'datarefinery.io coming soon!'});
});

var server = app.listen(80, function(){
	console.log("app listening on %s %s",server.address().address,server.address().port)
})