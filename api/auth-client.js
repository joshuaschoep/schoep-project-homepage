const jwt = require('express-jwt');

exports.checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://schoepproject.com/.well-known/jwks.json'
    }),

    audience: ''
})