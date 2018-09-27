'use strict';
var server = require('../app.js');
var mysql = require('mysql');
var async = require('async');
var pool = require('./database');

module.exports = function(app) {
    app.get('/', function (req, res) {
        res.sendFile('/Users/anttu/OneDrive/Documents/GitHub/NodeNote/public/index.html');
        // res.sendFile('/var/www/html/AvoimetRajapinnat/EventCal/public/index.html');
        var results = pool.query("INSERT INTO Users VALUES ('asdf', 'asdf')");
        console.log(results);
    });

};
