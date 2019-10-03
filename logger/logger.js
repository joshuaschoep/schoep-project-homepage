const fs = require("fs");

var logConsole = false;

exports.log = function(code, message){
    if(!logConsole){
        fs.writeFile("logs/log.txt", "[ " + code + " ]\t\t" + message, 
        function(err){
            if(err){
                console.log("Error while opening logfile. Sending logs to console.");
                logConsole = true;
                console.log("[ " + code + " ]\t\t" + message);
            }
        });
    }else{
        console.log("[ " + code + " ]\t\t" + message);
    }
}