var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();

app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res){
    res.render('index.html');
});

app.set("port", process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set("ip", process.env.OPENSHIFT_NODEJS_IP || 'localhost');

http.createServer(app).listen(app.get('port') ,app.get('ip'), function () {
    console.log("✔ Express server listening at %s:%d ", app.get('ip'),app.get('port'));
});
