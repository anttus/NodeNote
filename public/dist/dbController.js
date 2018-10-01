'use strict';

let urlStart = 'http://localhost:8081/';

$.ajaxSetup({
  headers: {
    'Authorization': "Basic " + btoa('rest.api' + ":" + 'supersecret123')
  }
});

// let url = 'http://localhost:8081/api/items?listId=4'
// $.get(url, function(data) {
//   $(".result").html(data);
//   console.log(data);
// });

function getListsOfUser(userId) {
    let url = urlStart + 'api/lists?userId=' + userId;
    $.get(url, function(data) {
        $("#mainBody").html(data);
        console.log(data);
    });
}
