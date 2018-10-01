'use strict';

$('#testBtn').click(function() {
    console.log("asdfasdf");
    getListsOfUser('TEST_USER_ID');

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
//         // XHR for Chrome/Firefox/Opera/Safari.
//         xhr.open(method, url, true);
//     } else if (typeof XDomainRequest != "undefined") {
//         // XDomainRequest for IE.
//         xhr = new XDomainRequest();
//         xhr.open(method, url);
//     } else {
//         // CORS not supported.
//         xhr = null;
//     }
//     return xhr;
// }
//
// function getEvents() {
//     var startdate = document.getElementById("startingDate").value;
//     var enddate = document.getElementById("endingDate").value;
//     var url = "http://localhost:8081/api/events?start=" + startdate + "&end=" + enddate;
//     // var url = "http://anttus.ddns.net:8081/api/events?start=" + startdate + "&end=" + enddate;
//
//     if (startdate.length == 0) { // fix this and support empty field
//         return;
//     } else {
//         var xmlhttp = createCORSRequest("GET", url);
//         xmlhttp.onreadystatechange = function() {
//             if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//                 // console.log(xmlhttp.responseText);
//                 json = JSON.parse(xmlhttp.responseText);
//                 var length = json.resultEventArr.length;
//                 // console.log("Length: " + length);
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
//         // create a form group div
//         unOrdered = document.createElement("ul");
//         unOrdered.setAttribute("class", "del"); // mark all these dynamically created elements to be "deleted"
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
