'use strict';

$('#testBtn').click(function() {
    console.log("asdfasdf");
    // deleteUser('TEST_USER_ID2');
    addToToDo($('.add-todo').val());
    $('.add-todo').val("");
});

$('.add-todo').keyup(function(event) {
    if (event.keyCode === 13) { // ENTER
        let name = $('.add-todo').val();
        $('.add-todo').val("");
        let listId;
        listId = $('#listHeader').attr('class');
        addItem(listId, name);

    }
});

function addToToDo(name, id) {
    $('#not-done-items').prepend(
      '<li class="ui-state-default" id="toDoItem' + id + '">' +
      '<div class="checkbox">' +
      '<label>' +
      '<input type="checkbox" value="todo" />' +
      name +
      '</label>' +
      '<button class="fa fa-trash pull-right  remove-item"></button>' +
      '</div>' +
      '</li>');
      $('toDoItem' + id).on('change', '#not-done-items li input[type="checkbox"]', function() {
          setItemStatus(id, 1);
          loadItems($('#listHeader').attr('class'));
      });
}

function showHideMenu() {
    if ($('#menuItems').css('display') === 'block') {
        $('#menuItems').hide();
        $('.lists').css({opacity: 1});
    } else {
        $('#menuItems').show();
        $('.lists').css({opacity: 0.5});
    }
}

$('#btnMenu').click(event => {
    showHideMenu();
});

$('.todolist').on('change', '#not-done-items li input[type="checkbox"]', function() {
    if ($(this).prop('checked')) {
        var doneItem = $(this).parent().parent().find('label').text();
        $(this).parent().parent().parent().addClass('remove');
        done(doneItem);
    }
});

//delete done task from "already done"
$('.todolist').on('click', '.remove-item', function() {
    removeItem(this);
});

$('#btnNewList').click(event => {
    $('#mainBody').hide();
    $('#addListMenu').show();
});

$('#btnCloseAddList').click(event => {
    $('#addListMenu').hide();
    $('#mainBody').show();
});

$('#btnAddList').click(event => {
    let listName = $('#txtListName').val();
    let userId = getUserId();
    $('txtListName').validate();
    addList(userId, listName);
});

function done(doneItem) {
    let done = doneItem;
    let markup = '<li>' + done + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
    $('#done-items').append(markup);
    $('.remove').remove();
}
//remove done task from list
function removeItem(element) {
    $(element).parent().remove();
}

$('#menuListItem').click(event => {
    $('#not-done-items').empty();
    $('#not-done-items').append('<ul id="not-done-items" class="list-unstyled checkbox">' + '<li class="ui-state-default">' + '<div class="checkbox">' + '<label>' + '<input type="checkbox" value="todo" />' + 'testi1' + '</label>' + '<button class="btn btn-default btn-xs pull-right  remove-item"></button>' + '</div>' + '</li>' + '<li class="ui-state-default">' + '<div class="checkbox">' + '<label>' + '<input type="checkbox" value="todo" />' + 'testi2' + '</label>' + '<button class="btn btn-default btn-xs pull-right  remove-item"></button>' + '</div>' + '</li>' + '<li class="ui-state-default">' + '<div class="checkbox">' + '<label>' + '<input type="checkbox" value="todo" />' + 'testi3' + '</label>' + '<button class="btn btn-default btn-xs pull-right  remove-item"></button>' + '</div>' + '</li>' + '</ul>');
});

// var json;
// var locationInfoIsEmpty = true;
//
// function toggleEvents() {
//     if (locationInfoIsEmpty) {
//         getEvents();
//         locationInfoIsEmpty = false;
//     } else {
//         $("#locationInfo").empty();
//         getEvents();
//         locationInfoIsEmpty = true;
//     }
// }
//
// function createCORSRequest(method, url) {
//     var xhr = new XMLHttpRequest();
//     if ("withCredentials" in xhr) {
//          XHR for Chrome/Firefox/Opera/Safari.
//         xhr.open(method, url, true);
//     } else if (typeof XDomainRequest != "undefined") {
//          XDomainRequest for IE.
//         xhr = new XDomainRequest();
//         xhr.open(method, url);
//     } else {
//          CORS not supported.
//         xhr = null;
//     }
//     return xhr;
// }
//
// function getEvents() {
//     var startdate = document.getElementById("startingDate").value;
//     var enddate = document.getElementById("endingDate").value;
//     var url = "http://localhost:8081/api/events?start=" + startdate + "&end=" + enddate;
//      var url = "http://anttus.ddns.net:8081/api/events?start=" + startdate + "&end=" + enddate;
//
//     if (startdate.length == 0) {  fix this and support empty field
//         return;
//     } else {
//         var xmlhttp = createCORSRequest("GET", url);
//         xmlhttp.onreadystatechange = function() {
//             if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//                  console.log(xmlhttp.responseText);
//                 json = JSON.parse(xmlhttp.responseText);
//                 var length = json.resultEventArr.length;
//                  console.log("Length: " + length);
//                 if (length > 0) {
//                     showEvents(json);
//                 } else {
//                     document.getElementById("locationInfo").innerHTML = "<br/>Ei tapahtumatietoja ko. ajalta.<br/>";
//                 }
//             }
//         };
//         xmlhttp.onload = function() {
//             var text = xmlhttp.responseText;
//             console.log('Response from CORS request to ' + url);
//         };
//         xmlhttp.onerror = function() {
//             console.log('There was an error making the request.');
//         };
//         xmlhttp.send();
//     }
// }
//
// function showEvents(json) {
//     var divElement = document.getElementById("locationInfo");
//
//     var i;
//     var unOrdered;
//     var listElement, nestedElement, unNestedElement;
//     var string;
//
//     var events = json.resultEventArr;
//     var locations = json.resultLocationArr;
//     var dates = json.resultDateArr;
//
//     for (i in events) {
//         eventInfo = events[i][0];
//         eventLocation = locations[i][0];
//         eventDate = dates[i][0];
//
//          create a form group div
//         unOrdered = document.createElement("ul");
//         unOrdered.setAttribute("class", "del");  mark all these dynamically created elements to be "deleted"
//         divElement.appendChild(unOrdered);
//
//         listElement = document.createElement("li");
//         listElement.setAttribute("class", "del");
//         string = eventInfo['Name'];
//         listElement.innerHTML = string;
//         unOrdered.appendChild(listElement);
//         nestedElement = document.createElement("ul");
//         nestedElement.setAttribute("class", "del");
//         listElement.appendChild(nestedElement);
//         unNestedElement = document.createElement("li");
//         unNestedElement.setAttribute("class", "del");
//         string = eventInfo['Type'] + ", " + eventDate['Date'] + ", " + eventDate['Time'] + ", " + eventLocation['Location_name'];
//         unNestedElement.innerHTML = string;
//         nestedElement.appendChild(unNestedElement);
//     }
// }
