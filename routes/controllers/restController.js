'use strict';
const async = require('async');
const pool = require('../../db/database');
const path = require('path');
const appDir = path.dirname(require.main.filename);

// Returns a new promise that resolves the sql query results
async function getPromise(query, res) {
    return new Promise(async function(resolve, reject, err) {
        let result = await pool.query(query);
        resolve(result);
    }).catch((err) => res.send('ERROR: Handle this error better'));
}

exports.load_index = function(req, res, err) {
    res.sendFile(appDir + "/public/index.html");
};

// GET /api/lists?ownerId=ownerId
exports.all_lists_of_user = function(req, res, err) {
    let userId = req.query['ownerId'] || 'null';
    let query = "SELECT * FROM Lists WHERE User_id = '" + userId + "';";
    getPromise(query, res).then(function(result) {
        if (result == null) res.send("Empty");
        else res.send(result);
    }).catch(err => res.send('ERROR: Handle this error better'));
};

// GET /api/lists/:id
exports.list_by_id = function(req, res, err) {
    let listId = req.url.slice(11);
    let query = "SELECT * FROM Lists WHERE List_id = " + listId + ";";
    getPromise(query, res).then(function(result) {
        res.send(result);
    }).catch(err => res.send('ERROR: Handle this error better')).catch(err => console.log(err)); // ???
};

// PUT /api/lists/:id
exports.create_list = function(req, res, err) {
    let listName = req.url.slice(11);
    let query = "INSERT INTO Lists (Owner_id, User_id, Name) VALUES ('" +  "TEST_USER_ID"  + "', '" +  "TEST_USER_ID"  + "', '" +  listName  + "');";
    getPromise(query, res).then(function(result) {
        res.send(result);
    }).catch(err => res.send('ERROR: Handle this error better'));
};

// GET /api/items?listId=listId
exports.all_items_of_list = function(req, res, err) {
    let listId = req.query['listId'] || 'null';
    let query = "SELECT * FROM Item WHERE List_id = " + listId + ";";
    getPromise(query, res).then(function(result) {
        if (result == null) res.send("Empty");
        else res.send(result);
    }).catch(err => console.log(err));
};

// DELETE /api/lists/<LIST_ID>
// Deletes the list and every item on it
// Works, but needs rethinking
exports.delete_list = function(req, res, err) {
    let listId = req.url.slice(11);
    let query = "DELETE FROM Lists WHERE List_id = " + listId + ";";
    getPromise(query, res).then(function(result) {
        res.send(result);
        res.end();
    }).catch(err => console.log(err));
    let query1 = "DELETE FROM Item WHERE List_id = " + listId + ";";
    getPromise(query1, res).then(function(result) {
        res.send(result);
        res.end();
    }).catch(err => console.log(err));
};

// Some method for checking if the item already exists in the list?
// PUT /api/items?name=<ITEM_NAME>&listId=<LIST_ID>
exports.add_item = function(req, res, err) {
    let itemName = req.query['name'] || 'null';
    let listId = req.query['listId'] || 'null';
    let query = "INSERT INTO Item (Name, List_id) VALUES ('" + itemName + "', " + listId + ");";
    getPromise(query, res).then(function(result) {
        res.send(result);
    }).catch(err => console.log(err));
};

// DELETE /api/items?listId=<LIST_ID>&itemId=<ITEM_ID>&itemName=<ITEM_NAME>
exports.delete_item = function(req, res, err) {
    let listId = req.query['listId'] || 'null';
    let itemId = req.query['itemId'] || 'null';
    let itemName = req.query['itemName'] || 'null';
    let query = "DELETE FROM Item WHERE List_id = " + listId + " AND Item_id = " + itemId + " AND Name = '" + itemName + "';";
    getPromise(query, res).then(function(result) {
        res.send(result);
    }).catch(err => console.log(err));
};