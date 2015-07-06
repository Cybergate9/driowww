var express = require('express');
var jade = require('jade');


var app=express();

app.use(express.static('public'));
app.get('/', function(req, res){
	res.send('dataRefinery.io coming soon..')
});

var server = app.listen(80, function(){
	console.log("app listening on %s %s",server.address().address,server.address().port)
})