'use strict';

const urlStart = 'http://localhost:8081/';

$.ajaxSetup({
    headers: {
        'Authorization': "Basic " + btoa('rest.api' + ":" + 'supersecret123')
    }
});

function getUser(userId) {
    let url = urlStart + 'api/users?userId=' + userId;
    $.get(url, function(data) {
        return data;
    });
}

function addUser(userId, email) {
    let url = urlStart + 'api/users?userId=' + userId + '&email=' + email;
    $.ajax({
        url: url,
        type: 'PUT',
        success: function(result) {
            console.log("user added");
        }
    });
}

function deleteUser(userId) {
    let url = urlStart + 'api/users?userId=' + userId;
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function(result) {
            console.log("user deleted");
        }
    });
}

function getListsOfUser(userId) {
    let url = urlStart + 'api/lists?userId=' + userId;
    $.get(url, function(data) {
        return data;
    });
}
