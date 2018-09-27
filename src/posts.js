// 'use strict';
// var server = require('../app.js');
// var mysql = require('mysql');
// var async = require('async');
// var pool = require('./database');
// var bodyParser = require('body-parser');
//
// module.exports = function(app) {
//     app.use(bodyParser.urlencoded({ extended: false }));
//     app.use(bodyParser.json({ type: 'application/*+json' }));
//
//     app.post('/api/events', function (req, res) {
//         if (!req.body) return res.sendStatus(400);
//         try{req.body = JSON.parse(Object.keys(req.body)[0])}catch(err){req.body = req.body}
//
//         console.log(req.body);
//         var eventId = req.body.Event_id;
//         var eventName = req.body.Name;
//         var eventType = req.body.Type;
//         var locationId = req.body.Location_Location_id;
//         var eventDate = req.body.Date;
//         var eventTime = req.body.Time;
//
//         // If location exists ...
//         pool.query("INSERT INTO Event VALUES (?, ?, ?, ?);", [eventId, eventName, eventType, locationId]);
//         pool.query("INSERT INTO Event_date VALUES (?, ?, ?);", [eventDate, eventId, eventTime]);
//
//         console.log(eventId + "," + eventName + ", " + eventType + ", " + locationId + ", " + eventDate + ", " + eventTime);
//         res.send("INSERTING: " + JSON.stringify(req.body));
//     });
//
// };
