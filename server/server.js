const express = require("express");
const http = require("http");
const https = require("https");
const logger = require("../logger/logger.js");

const HTTP_PORT = 80;
const HTTPS_PORT = 443;

exports.startHttpServer = function(){
    var app = express();
    var server = http.createServer(app);
    try{
        server.listen(HTTP_PORT)
    }catch(err){
        if(err.code == "EADDRINUSE"){
            logger.log(503, "Port " + HTTP_PORT + " in use by another program. HTTP server failed.");
        }else{
            logger.log(500, "Unknown internal error: " + err + ". HTTP server failed.");
        }
        return null;
    }
    logger.log(201, "HTTP Server opened on port " + HTTP_PORT);
    return app;
}

exports.startHttpsServer = function(settings){
    var app = express();
    if(!settings){
        logger.log(503, "Private key retrieval failed. HTTPS server failed.");
        return null;
    }else{
        var server = https.createServer(settings, app);
        try{
            server.listen(HTTPS_PORT);
        }catch(err){
            if(err.code == "EADDRINUSE"){
                logger.log(503, "Port " + HTTPS_PORT + " in use by another program. HTTPS server failed.");
            }else{
                logger.log(500, "Unknown internal error: " + err + "HTTPS Server failed.");
            }
            return null;
        }
    }
    logger.log(201, "HTTPS Server opened on port " + HTTPS_PORT);
    return app;
}
