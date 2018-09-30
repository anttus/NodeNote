'use strict';

$.ajaxSetup({
  headers: {
    'Authorization': "Basic " + btoa('rest.api' + ":" + 'supersecret123')
  }
});

let url = 'http://localhost:8081/api/items?listId=4'
$.get(url, function(data) {
  $(".result").html(data);
  console.log(data);
});
