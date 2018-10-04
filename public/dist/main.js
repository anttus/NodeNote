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
        addToToDo(name);
        $('.add-todo').val("");
        let listId;
        listId = $('#listHeader').attr('class');
        addItem(listId, name);
    }
});

function addToToDo(message) {
    $('#not-done-items').append('<li class="ui-state-default">'
    + '<div class="checkbox">'
    + '<label id="itemLabel">'
    + '<input type="checkbox" value="todo" />'
    + message
    + '</label>'
    + '<button class="btn btn-default btn-xs pull-right  remove-item"></button>'
    + '</div>'
    + '</li>');
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
        countTodos();
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
    $('#not-done-items').append('<ul id="not-done-items" class="list-unstyled checkbox">'
    + '<li class="ui-state-default">'
    + '<div class="checkbox">'
    + '<label>'
    + '<input type="checkbox" value="todo" />'
    + 'testi1'
    + '</label>'
    + '<button class="btn btn-default btn-xs pull-right  remove-item"></button>'
    + '</div>'
    + '</li>'
    + '<li class="ui-state-default">'
    + '<div class="checkbox">'
    + '<label>'
    + '<input type="checkbox" value="todo" />'
    + 'testi2'
    + '</label>'
    + '<button class="btn btn-default btn-xs pull-right  remove-item"></button>'
    + '</div>'
    + '</li>'
    + '<li class="ui-state-default">'
    + '<div class="checkbox">'
    + '<label>'
    + '<input type="checkbox" value="todo" />'
    + 'testi3'
    + '</label>'
    + '<button class="btn btn-default btn-xs pull-right  remove-item"></button>'
    + '</div>'
    + '</li>'
    + '</ul>');
});
