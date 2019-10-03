const logger = require('../logger/logger.js')
const path = require('path');

const directory = path.resolve(__dirname + '/../public/');

function staticCallback(err){
    if(err){
        logger.log(500, err);
    }else{
        logger.log(200, "Served static page");
    }
}

exports.redirectToHttps = function(req, res){
    var url = req.headers.url;
    if(url == undefined){
        url = "";
    }
    res.redirect("https://" + request.headers.host + url, function(){
        logger.log(301, "Redirected HTTP request to HTTPS");
    });
}

exports.serveHomepage = function(req, res){
    res.sendFile(directory + '/home.html', staticCallback);
}