const mysql = require('mysql');
const fs = require('fs');

CONFIG_ROUTE = "../.config/mysql.conf.json";

const pool = mysql.createPool(
    JSON.parse(fs.readFileSync(CONFIG_ROUTE))
);

exports.get_sections = function(next) {
    pool.query('SELECT * FROM sections', function(error, results, fields){
        if(error) {
            console.log(error);
        }
        next(results);
    })
}

exports.get_section_title = function(section, next) {
    pool.query('SELECT title FROM sections WHERE section_id = ' + section, function(error, results, fields){
        if(error) {
            console.log(error);
        }
        next(results);
    })
}

exports.get_ranks = function(next) {
    pool.query('SELECT * FROM ranks', function(error) {
        if(error) {
            console.log(error);
        }
        next(results);
    })
}

exports.get_links = function(section, next) {
    pool.query('SELECT * FROM links WHERE section_id = ' + section + ' ORDER BY -section_order DESC',
    function(error, results, fields){
        if(error) {
            console.log(error);
        }
        next(results);
    })
}

exports.is_link_accessible = function(link, user_rank, next) {
    pool.query('SELECT access_rank FROM links WHERE id = ' + link, function(error, results, fields){
        if(error) {
            console.log(error);
        }
        next(results >= user_rank);
    })
}