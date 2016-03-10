////NODE SETUP USING EXPRESS

// think of these like a PHP 'include'
// this adds the node modules (dependencies) you've set in your 'packages.json' file 
// (i.e. things you've installed via 'npm install').  To setup Express, you always
// have to store it in a variable (express) then set another variable (app) with 'express()'.
// Express is to Node like jQuery is to Javascript.  Express gives you a simpler API to work
// with Node.
var express = require('express');
var app = express();

// the 'http' and 'path' modules below are actually built into Node
// but you still have to 'require' them in order to use them
var path = require('path');
var http = require('http');



////VIEW ENGINE SETUP

//this defines what folder will contain the views you plan to use
//thus when you use the 'res.render' function below, in the routes, you simply pass in
//the file name or path (without the extension on the end).
app.set('views', path.join(__dirname, 'views'));

//this defines what view engine you want to use
//I used 'ejs' since it essentially just lets you use
//HTML like normal but .ejs files can be passed variables
//accessed by using the <%- %> delimiter (http://www.embeddedjs.com/)
app.set('view engine', 'ejs');

//This defines where your static files will be like your CSS, Fonts, Javascripts, Images, etc)
//This is where you can put files that your clients are allowed to access
app.use(express.static(path.join(__dirname, 'public')));




////ROUTES

// There are better ways to define routes or nested routes and you can even 
// have routes that take in parameters, similar to a query string, is would be like this:
// router.get('/user/:id', function (req, res) {})
// Find out more in the Express documentation (http://expressjs.com/en/api.html#router).
// With my current setup, you have to put the 'easter' route before the '/' route, otherwise
// the '/easter' route won't work.

//easter egg route
app.use('/easter', function(req, res){
	//get date this page is loaded on
	//just to show how data can be passed
	//into the template
	var today = new Date(),
    	dd 	  = today.getDate(),
    	mm 	  = today.getMonth()+1,
		yyyy  = today.getFullYear();
    if(dd<10)
        dd='0'+dd
    if(mm<10)
        mm='0'+mm
    var today = dd+'/'+mm+'/'+yyyy;

    //renders the 'easter.ejs' file, which resides in the 'views' folder
    //we defined above.  If that file was in a sub-folder within views
    //called 'sub_views', for example, the code below would be:
    //res.render('/sub_views/easter', {today:today});
	res.render('easter', {today:today});
})

//application root
app.use('/', function(req, res){
  //Second parameter is optional.  Without sending data to the template
  //it will just render the template as is.
  res.render('index');
});





// CREATE THE SERVER!!!1!1!!

// This just sets the 'port' and 'ip' of the application.
// When on your own computer, it will default to port 8080 and ip 127.0.0.1.
// When push to the OpenShift server, it get's your port and ip automatically
// based on accessing the 'process' object.  The 'process' object is basically
// your access to all the environment variables (or setting them how you please)
app.set("port", process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set("ip", process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

//This creates the actual server and opens the 'ip' address at the defined 'port'
//if working locally, you will access your application by simply typing the following in the console:
//npm start
//then put '127.0.0.1:8080' in your browser to see your app running.
http.createServer(app).listen(app.get('port') ,app.get('ip'), function () {
    console.log("✔ Express server listening at %s:%d ", app.get('ip'),app.get('port'));
});
