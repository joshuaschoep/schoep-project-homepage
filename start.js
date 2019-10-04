const fs = require('fs');
const express = require('express');
const router = require('./routing/router.js');
const server = require('./server/server.js');
const logger = require('./logger/logger.js');

const httpsOptions = {
        key: fs.readFileSync('/etc/letsencrypt/live/schoepproject.com/privkey.pem', 'utf8'),
        cert: fs.readFileSync('/etc/letsencrypt/live/schoepproject.com/cert.pem', 'utf8'),
        ca: fs.readFileSync('/etc/letsencrypt/live/schoepproject.com/chain.pem', 'utf8')
};


var app = server.startHttpsServer(httpsOptions);
var httpapp = server.startHttpServer();

if(!app){
	logger.log(301, "Rerouting HTTPS data to HTTP server");
	app = httpapp;
}else{
	logger.log(200, "Rerouting HTTP data to HTTPS server");
	httpapp.use(router.redirectToHttps);
}

app.use(express.static('public'));

var routes = router.route(app);
