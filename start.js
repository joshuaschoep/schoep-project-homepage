const express = require('express');
const router = require('./routing/router.js');
const server = require('./server/server.js');
const logger = require('./logger/logger.js');

var app = server.startHttpsServer();
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