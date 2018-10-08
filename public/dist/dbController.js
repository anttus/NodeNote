'use strict';

const urlStart = 'http://localhost:8081/';

$.ajaxSetup({
    headers: {
        'Authorization': "Basic " + btoa('rest.api' + ":" + 'supersecret123')
    }
});

// USERS
function getUser() {
    let url = urlStart + 'api/users';
    return $.get(url, function(data) {
        return data;
    });
}

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
function getListsOfUser(userId) {
    let url = urlStart + 'api/lists?userId=' + userId;
    return $.get(url, function(data) {
        return data;
    });
}

function getSharedToUsers(listId) {
    let url = urlStart + 'api/lists/users/shared?listId=' + listId;
    return $.get(url, function(data) {
        return data;
    });
}

// function getListById(listId) {
//     let url = urlStart + 'api/lists/' + listId;
//     return $.get(url, function(data) {
//         return data;
//     });
// }

function addList(userId, listName) {
    let url = urlStart + 'api/lists?userId=' + userId + '&listName=' + listName;
    $.ajax({
        url: url,
        type: 'PUT',
        success: function(result) {
            // console.log("list " + listName + " added");
        }
    }).then(function() {
        setUserLists(userId);
        let promise = Promise.resolve(setUserLists(userId));
        promise.then(data => {
            console.log("list " + listName + " added");
        });
    });
}

function addReferenceToUserLists(email, listId) {
    let url = urlStart + 'api/lists/users?email=' + email + '&listId=' + listId;
    $.ajax({
        url: url,
        type: 'PUT',
        success: function(result) {
            console.log("reference added to UserLists for " + email + " and " + listId);
        }
    });
}

function editListName(listId, newName) {
    let url = urlStart + 'api/lists?listId=' + listId + '&newName=' + newName;
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
            setUserLists(getUserId());
        }
    });
}

// ITEMS
function getItems(listId) {
    let url = urlStart + 'api/items?listId=' + listId;
    return $.get(url, function(data) {
        return data;
    });
}

function addItem(listId, itemName) {
    let url = urlStart + 'api/items?name=' + itemName + '&listId=' + listId;
    $.ajax({
        url: url,
        type: 'PUT',
        success: function(result) {
            loadItems(listId);
            console.log("item " + itemName + " added");
        }
    });
}

function editItemName(itemId, newName) {
    let url = urlStart + 'api/items?itemId=' + itemId + '&newName=' + newName;
    $.ajax({
        url: url,
        type: 'PATCH',
        success: function(result) {
            console.log("item name changed to " + newName);
        }
    });
}

function deleteItem(listId, itemId, itemName) {
    let url = urlStart + 'api/items?listId=' + listId + '&itemId=' + itemId + '&itemName=' + itemName;
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function(result) {
            console.log("item " + itemId + " deleted");
            listReload();
        }
    });
}

function setItemStatus(itemId, completed) {
    let url = urlStart + 'api/items/status?itemId=' + itemId + '&completed=' + completed;
    $.ajax({
        url: url,
        type: 'PATCH',
        success: function(result) {
            listReload();
            console.log("item " + itemId + " status updated to " + completed);
        }
    });
}
