'use strict';

$('#testBtn').click(function () {
    addToToDo($('.add-todo').val());
    $('.add-todo').val("");
});

$('.add-todo').keyup(function (event) {
    if (event.keyCode === 13) { // ENTER
        let name = $('.add-todo').val();
        $('.add-todo').val("");
        let listId;
        listId = $('#listHeader').attr('class');
        addItem(listId, name);
    }
});

function generateItem(name, itemId, status) {
    let item = '<li class="ui-state-default" id="item'
        + itemId
        + '">'
        + '<div class="checkbox">'
        + '<button class="fa fa-check" id="checkBox' + itemId + '" value="todo"></button>'
        + '<label id="itemName">'
        + name
        + '</label>'
        + '<button id ="remove" class="fa fa-trash remove-item' + itemId + '"></button>'
        + '</div>'
        + '</li>';

    if (status === 0) $('#not-done-items').prepend(item);
    else $('#done-items').prepend(item);

    $('#checkBox' + itemId).click(function () {
        setItemStatus(itemId, status === 0 ? 1 : 0);
    });

    $('.remove-item' + itemId).click(function () {
        deleteItem($('#listHeader').attr('class'), itemId, name);
    });
}

function sideMenuReload() {
    $('#menuItems').empty();
    $('#sideBar').hide();
    $('.lists').css({opacity: 1});
}

function listReload() {
    loadItems($('#listHeader').attr('class'));
}

function showHideMenu() {
    if ($('#sideBar').css('display') === 'block') {
        $('#sideBar').hide();
        $('.lists').css({opacity: 1});
        $('#txtAddItem').focus();
    } else {
        $('#sideBar').show();
        $('.lists').css({opacity: 0.5});
    }
}

$('#btnMenu').click(event => {
    showHideMenu();

});

$('#btnNewList').click(event => {
    $('#mainBody').hide();
    $(document.body).css("background-color", "#333333");
    $('#addListMenu').show();
});

$('#btnCloseAddList').click(event => {
    closeAddList();
});

// $('#txtListName').keyup(function (event) {
//     if(event.keyCode === 13) {
//         addNewList();
//     }
// });

// $('#btnAddList').click(event => {
//     addNewList();
// });
//
// function addNewList() {
//     let listName = $('#txtListName').val();
//     let userId = getUserId();
//     $('txtListName').validate();
//     addList(userId, listName);
//     setUserLists(getUserId());
//     closeAddList();
// }

function closeAddList() {
    $('#addListMenu').hide();
    $('#mainBody').show();
    $(document.body).css("background-color", "#ffffff");
    $('#txtListName').val("");
    $('#txtAddItem').focus();
}

function closeShareListMenu() {
    $('#shareListMenu').hide();
    $('#mainBody').show();
    $(document.body).css("background-color", "#ffffff");
    $('#shareListMenuForm').empty();
    showHideMenu();
}


$(document).ready(function () {

});
