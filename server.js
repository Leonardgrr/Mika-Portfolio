var express = require('express');
var path = require('path');
var app = express();
var http = require('http');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(express.static(path.join(__dirname, 'public')));

//application root
app.use('/', function(req, res){
  res.render('index');
});

app.set("port", process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set("ip", process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

http.createServer(app).listen(app.get('port') ,app.get('ip'), function () {
    console.log("✔ Express server listening at %s:%d ", app.get('ip'),app.get('port'));
});
