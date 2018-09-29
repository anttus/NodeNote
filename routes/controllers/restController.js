'use strict';
var server = require('../../app.js');
var mysql = require('mysql');
var async = require('async');
var pool = require('../../db/database');

// exports.load_index = function(req, res) {
//     res.sendFile('public/index.html', { root: '.' });
//     console.log("asdf");
// }

exports.list_all_items = function(req, res) {
    // Task.find({}, function(err, task) {
    //     if (err)
    //     res.send(err);
    //     res.json(task);
    // });
};

exports.create_a_list = function(req, res) {
    // var new_task = new Task(req.body);
    // new_task.save(function(err, task) {
    //     if (err)
    //     res.send(err);
    //     res.json(task);
    // });
};

exports.add_item = function(req, res) {
    // Task.findById(req.params.taskId, function(err, task) {
    //     if (err)
    //     res.send(err);
    //     res.json(task);
    // });
};

exports.delete_item = function(req, res) {
    // Task.remove({
    //     _id: req.params.taskId
    // }, function(err, task) {
    //     if (err)
    //     res.send(err);
    //     res.json({ message: 'Item succesfully deleted' });
    // });
};
