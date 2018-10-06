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
    }).catch((err) => console.log(err));
}

exports.load_index = function(req, res, err) {
    res.sendFile(appDir + "/public/index.html");
};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

// // GET /api/lists?userId=userId
exports.all_lists_of_user = async function(req, res, err) {
    let userId = req.query['userId'] || 'null';
    let result = await pool.query("SELECT ListId FROM UserLists WHERE UserId = '" + userId + "';");
    var resultArr = [];
    Promise.all([
        fetchLists(resultArr)
    ]).then(() => res.send(resultArr)).catch(err => console.log(err));
    async function fetchLists(resultArr) {
        return new Promise((resolve, reject) => {
            asyncForEach(result, async (resVal) => {
                let listId = resVal['ListId'];
                let queryRes = await pool.query("SELECT * FROM Lists WHERE List_id = '" + listId + "';");
                resultArr.push(queryRes);
            })
            .then(data => resolve([resultArr]))
            .catch(err => reject(err))
        })
    }

    // let promise = getPromise(query1, res).then(result =>  {
    //     asyncForEach(result, async (resVal) => {
    //         let listId = resVal['ListId'];
    //
    //         getPromise(query2, res).then(result =>  {
    //             return this;
    //         })
    //         .catch(err => console.log(err));
    //     }).catch(err => console.log(err));
    // }).catch(err => console.log(err));
};

// // GET /api/lists?userId=userId
// exports.all_lists_of_user = function(req, res, err) {
//     let userId = req.query['userId'] || 'null';
//     let query = "SELECT ListId FROM UserLists WHERE UserId = '" + userId + "';";
//     getPromise(query, res).then(result =>  {
//         if (result == null) res.send("Empty");
//         else res.send(result);
//     }).catch(err => console.log(err));
// };

// GET /api/lists/:id
exports.list_by_id = function(req, res, err) {
    let listId = req.url.slice(11);
    let query = "SELECT * FROM Lists WHERE List_id = " + listId + ";";
    getPromise(query, res).then(result =>  {
        res.send(result);
    }).catch(err => console.log(err)).catch(err => console.log(err)); // ???
};

// PATCH /api/lists?listId=LIST_ID&newName=NEW_NAME
exports.list_name_change = function(req, res, err) {
    let listId = req.query['listId'] || 'null';
    let newName = req.query['newName'] || 'null';
    let query = " UPDATE Lists SET Name = '" + newName + "' WHERE List_id = " + listId + ";";
    getPromise(query, res).then(result =>  {
        res.send(result);
    }).catch(err => console.log(err)).catch(err => console.log(err)); // ???
};

// PUT /api/lists?userId=USER_ID&listName=LIST_NAME
// exports.create_list = function(req, res, err) {
//     let listName = req.query['listName'] || 'null';
//     let userId = req.query['userId'] || 'null';
//     let query = "INSERT INTO Lists (User_id, Name) VALUES ('" + userId + "', '" +  listName  + "');";
//     getPromise(query, res).then(result =>  {
//         res.send(result);
//     }).catch(err => console.log(err));
// };

// PUT /api/lists/user?userId=USER_ID&listName=LIST_NAME
exports.create_list = function(req, res, err) {
    let userId = req.query['userId'] || 'null';
    let listName = req.query['listName'] || 'null';
    let query1 = "INSERT INTO Lists (User_id, Name) VALUES ('" + userId + "', '" +  listName  + "');";
    getPromise(query1, res).then(result =>  {
        res.send(result);
        res.end();
        let query2 = "SELECT List_id FROM Lists WHERE User_id = '" + userId + "' AND Name = '" + listName + "';";
        getPromise(query2, res).then(result =>  {
            let listId = result[0]['List_id'];
            let query3 = "INSERT INTO UserLists (UserId, ListId) VALUES ('" + userId + "', " + listId + ");";
            getPromise(query3, res).then(result =>  {
                console.log(result);
            }).catch(err => console.log(err));
            res.send(result);
            res.end();
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};

// PUT /api/lists/users?email=EMAIL&listId=LIST_ID
exports.create_list_ref_to_userlists = function(req, res, err) {
    // let userId = req.query['userId'] || 'null';
    // let listName = req.query['listName'] || 'null';
    let email = req.query['email'] || 'null';
    let listIdOrig = req.query['listId'] || 'null';
    let query1 = "SELECT User_id FROM Users WHERE email = '" + email + "';";
    getPromise(query1, res).then(result => {
        let userId = result[0]['User_id'];
        let query2 = "SELECT List_id FROM Lists WHERE User_id = '" + userId + "';";
        // let query2 = "INSERT INTO UserLists (UserId, ListId) VALUES ('" + userId + "', " + listId + ");"
        getPromise(query2, res).then(result => {
            // res.send(result);
            let listId = result[0]['List_id'];
            let query3 = "INSERT INTO UserLists (UserId, ListId) VALUES ('" + userId + "', " + listIdOrig + ");";
            getPromise(query3, res).then(result => {
                res.send(result);
            });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};

// GET /api/items?listId=listId
exports.all_items_of_list = function(req, res, err) {
    let listId = req.query['listId'] || 'null';
    let query = "SELECT * FROM Items WHERE List_id = " + listId + ";";
    getPromise(query, res).then(result =>  {
        if (result == null) res.send("Empty");
        else res.send(result);
    }).catch(err => console.log(err));
};

// DELETE /api/lists/<LIST_ID>
// Deletes the list and every item on it
// Works, but needs rethinking
exports.delete_list = function(req, res, err) {
    let listId = req.url.slice(11);
    let query1 = "DELETE FROM UserLists WHERE ListId = " + listId + ";";
    getPromise(query1, res).then(result =>  {
        res.send(result);
        res.end();
    }).catch(err => console.log(err));
    let query2 = "DELETE FROM Lists WHERE List_id = " + listId + ";";
    getPromise(query2, res).then(result =>  {
        res.send(result);
        res.end();
    }).catch(err => console.log(err));
    let query3 = "DELETE FROM Items WHERE List_id = " + listId + ";";
    getPromise(query3, res).then(result =>  {
        res.send(result);
        res.end();
    }).catch(err => console.log(err));
};

// Some method for checking if the item already exists in the list?
// PUT /api/items?name=<ITEM_NAME>&listId=<LIST_ID>
exports.add_item = function(req, res, err) {
    let itemName = req.query['name'] || 'null';
    let listId = req.query['listId'] || 'null';
    let query = "INSERT INTO Items (Name, List_id) VALUES ('" + itemName + "', " + listId + ");";
    getPromise(query, res).then(result =>  {
        res.send(result);
    }).catch(err => console.log(err));
};

// PATCH /ap/items?itemId=ITEM_ID&newName=NEW_NAME
exports.item_name_change = function(req, res, err) {
    let itemId = req.query['itemId'] || 'null';
    let newName = req.query['newName'] || 'null';
    let query = " UPDATE Items SET Name = '" + newName + "' WHERE Item_id = " + itemId + ";";
    getPromise(query, res).then(result =>  {
        res.send(result);
    }).catch(err => console.log(err)).catch(err => console.log(err)); // ???
};

// DELETE /api/items?listId=LIST_ID&itemId=ITEM_ID&itemName=ITEM_NAME
exports.delete_item = function(req, res, err) {
    let listId = req.query['listId'] || 'null';
    let itemId = req.query['itemId'] || 'null';
    let itemName = req.query['itemName'] || 'null';
    let query = "DELETE FROM Items WHERE List_id = " + listId + " AND Item_id = " + itemId + " AND Name = '" + itemName + "';";
    getPromise(query, res).then(result =>  {
        res.send(result);
    }).catch(err => console.log(err));
};

// GET /api/users
exports.get_users = function(req, res, err) {
    let query = "SELECT * FROM Users;";
    getPromise(query, res).then(result =>  {
        res.send(result);
    }).catch(err => console.log(err));
};

// PUT /api/users?userId=<USER_ID>&email=<EMAIL>
exports.add_user = function(req, res, err) {
    let userId = req.query['userId'] || 'null';
    let email = req.query['email'] || 'null';
    let query = " INSERT INTO Users (User_id, email) SELECT * FROM (SELECT '" + userId + "', '" + email + "') AS tmp WHERE NOT EXISTS (SELECT User_id FROM Users WHERE User_id = '" + userId + "');";
    getPromise(query, res).then(result =>  {
        res.send(result);
    }).catch(err => console.log(err));
};

// DELETE /api/users?userId=<USER_ID>
exports.delete_user = function(req, res, err) {
    let userId = req.query['userId'] || 'null';
    let query = "DELETE FROM Users WHERE User_id = '" + userId + "';";
    getPromise(query, res).then(result =>  {
        res.send(result);
    }).catch(err => console.log(err));
};

// PATCH /api/items/status?itemId=<ITEM_ID>&completed=<1/0>
exports.item_status = function(req, res, err) {
    let itemId = req.query['itemId'] || 'null';
    let completed = req.query['completed'] || 'null';
    let query = "UPDATE Items SET Completed = '" + completed + "' WHERE Item_id = '" + itemId + "';";
    getPromise(query, res).then(result =>  {
        res.send(result);
    }).catch(err => console.log(err));
};
