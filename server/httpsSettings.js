const fs = require('fs');

exports.getHttpsSettings = function(){
    try{
        const httpsOptions = {
            key: fs.readFileSync('/etc/letsencrypt/live/schoepproject.com/privkey.pem', 'utf8'),
            cert: fs.readFileSync('/etc/letsencrypt/live/schoepproject.com/cert.pem', 'utf8'),
            ca: fs.readFileSync('/etc/letsencrypt/live/schoepproject.com/chain.pem', 'utf8')
        };
    }catch(err){
        console.log(err);
        return null;
    }
}
