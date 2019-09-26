var express = require('express');
var path = require('path')
var fs = require('fs')
var http = require('http')
var https = require('https')

const httpsOptions = {
	key: fs.readFileSync('/etc/letsencrypt/live/schoepproject.com/privkey.pem', 'utf8'),
	cert: fs.readFileSync('/etc/letsencrypt/live/schoepproject.com/cert.pem', 'utf8'),
	ca: fs.readFileSync('/etc/letsencrypt/live/schoepproject.com/chain.pem', 'utf8')
};

const HTTPPORT = 80;
const HTTPSPORT = 443;

const app = express();
const httpapp = express();
const httpsServer = https.createServer(httpsOptions, app);
const httpServer = http.createServer(httpapp);

app.use(express.static('public'));

httpapp.use(function(request, response){
	var url = request.headers.url;
	if(url == undefined){
		url = "";
	}
	response.redirect("https://" + request.headers.host + url);
});

app.get('/', function(req, res){
	console.log("Get request for homepage");
	res.sendFile(__dirname + '/public/home.html');
});

console.log("Listening on port", HTTPSPORT);
httpsServer.listen(HTTPSPORT);

console.log("Listening for redirect port", HTTPPORT);
httpServer.listen(HTTPPORT)
