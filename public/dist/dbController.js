'use strict';

const urlStart = 'http://localhost:8081/';

$.ajaxSetup({
    headers: {
        'Authorization': "Basic " + btoa('rest.api' + ":" + 'supersecret123')
    }
});

// USERS
// function getUser(userId) {
//     let url = urlStart + 'api/users?userId=' + userId;
//     $.get(url, function(data) {
//         return data;
//     });
// }

function addUser(userId, email) {
    let url = urlStart + 'api/users?userId=' + userId + '&email=' + email;
    $.ajax({
        url: url,
        type: 'PUT',
        success: function(result) {
            console.log("user " + userId + " added");
        }
    });
}

function deleteUser(userId) {
    let url = urlStart + 'api/users?userId=' + userId;
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function(result) {
            console.log("user " + userId + " deleted");
        }
    });
}

// LISTS
function getListsOfUser(userId, success) {
    let url = urlStart + 'api/lists?userId=' + userId;
    $.get(url, function(data) {
        success(data);
    });
}

function getListById(listId) {
    let url = urlStart + 'api/lists/' + listId;
    $.get(url, function(data) {
        return data;
    });
}

function addList(userId, listName) {
    let url = urlStart + 'api/lists?userId=' + userId + '&listName=' + listName;
    $.ajax({
        url: url,
        type: 'PUT',
        success: function(result) {
            console.log("list " + listName + " added");
        }
    });
}

function editListName(listId, newName) {
    let url = urlStart + '/api/lists?listId=' + listId + '&newName=' + newName;
    $.ajax({
        url: url,
        type: 'PATCH',
        success: function(result) {
            console.log("List name changed to " + newName);
        }
    });
}

function deleteList(listId) {
    let url = urlStart + 'api/lists/' + listId;
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function(result) {
            console.log("list " + listId + " deleted");
        }
    });
}

// ITEMS
function getItems(listId, success) {
    let url = urlStart + 'api/items?listId=' + listId;
    $.get(url, function(data) {
        success(data);
    });
}

function addItem(listId, itemName) {
    let url = urlStart + 'api/items?name=' + itemName + '&listId=' + listId;
    $.ajax({
        url: url,
        type: 'PUT',
        success: function(result) {
            console.log("item " + itemName + " added");
        }
    });
}

function editItemName(itemId, newName) {
    let url = urlStart + '/api/items?itemId=' + itemId + '&newName=' + newName;
    $.ajax({
        url: url,
        type: 'PATCH',
        success: function(result) {
            console.log("item name changed to " + newName);
        }
    });
}

function deleteItem(listId, itemId) {
    let url = urlStart + '/api/items?listId=' + listId + '&itemId=' + itemId;
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function(result) {
            console.log("item " + itemId + " deleted");
        }
    });
}

function setItemStatus(itemId, completed) {
    let url = urlStart + '/api/items?itemId=' + itemId + '&completed=' + completed;
    $.ajax({
        url: url,
        type: 'PATCH',
        success: function(result) {
            console.log("item status updated to " + completed);
        }
    });
}
