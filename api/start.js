const express = require('express');
const db = require('./sql');
const fs = require('fs');
const cookieParser = require('cookie-parser');

const app = express();
const SERVICE_PORT = JSON.parse(fs.readFileSync('../.config/ports.conf.json'))['sql'];

app.use(cookieParser());

app.use(function(req, res, next){
    console.log(req.cookies);
    next()
})

app.get('/sections', (req, res) => {
    db.get_sections(results => {
        let string = JSON.stringify(results);
        res.send(JSON.parse(string));
    });
});

app.get('/sections/:id', (req, res) => {
    db.get_section_title(results => {
        let string = JSON.stringify(results);
        res.send(JSON.parse(string));
    })
})

app.get('/sections/:id/links', (req, res) => {
    db.get_links(req.params.id, (results) => {
        let string = JSON.stringify(results);
        res.send(JSON.parse(string));
    });
});

app.listen(SERVICE_PORT, () => console.log('API opened on port', SERVICE_PORT));
