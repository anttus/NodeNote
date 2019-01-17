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
    });
}

function deleteUser(userId) {
    let url = urlStart + 'api/users?userId=' + userId;
    $.ajax({
        url: url,
        type: 'DELETE',
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

function addList(userId, listName) {
    let url = urlStart + 'api/lists?userId=' + userId + '&listName=' + listName;
    $.ajax({
        url: url,
        type: 'PUT',
    }).then(function() {
        let promise = Promise.resolve(setUserLists(userId));
        promise.then(data => {
        });
    });
}

function addReferenceToUserLists(email, listId) {
    let url = urlStart + 'api/lists/users?email=' + email + '&listId=' + listId;
    $.ajax({
        url: url,
        type: 'PUT',
    });
}

function editListName(listId, newName) {
    let url = urlStart + 'api/lists?listId=' + listId + '&newName=' + newName;
    $.ajax({
        url: url,
        type: 'PATCH',
    });
}

function deleteList(listId) {
    let url = urlStart + 'api/lists/' + listId;
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function(result) {
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
        }
    });
}

function editItemName(itemId, newName) {
    let url = urlStart + 'api/items?itemId=' + itemId + '&newName=' + newName;
    $.ajax({
        url: url,
        type: 'PATCH',
    });
}

function deleteItem(listId, itemId, itemName) {
    let url = urlStart + 'api/items?listId=' + listId + '&itemId=' + itemId + '&itemName=' + itemName;
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function(result) {
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
        }
    });
}
