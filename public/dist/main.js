'use strict';

$('#testBtn').click(function() {
    console.log("asdfasdf");
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

function generateItem(name, itemId, status) {
    let item ='<li class="ui-state-default" id="item'
    + itemId
    + '">'
    + '<div class="checkbox">'
    + '<label>'
    + '<input id="checkBox' + itemId + '" type="checkbox" value="todo" />'
    + name
    + '</label>'
    + '<button class="fa fa-trash pull-right  remove-item'+ itemId +'"></button>'
    + '</div>'
    + '</li>';

    if (status === 0) $('#not-done-items').prepend(item);
    else $('#done-items').prepend(item);

    $('#checkBox' + itemId).on('change', function() {
        if ($(this).prop('checked')) {
            console.log(itemId);
            setItemStatus(itemId, status === 0 ? 1 : 0);
        }
    });

    $('.remove-item' +itemId).click(function(){
        deleteItem($('#listHeader').attr('class'), itemId, name);
    });
}

function listReload() {
    loadItems($('#listHeader').attr('class'));
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
    let markup = '<li>' + done + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="fa fa-trash-alt"></span></button></li>';
    $('#done-items').append(markup);
    $('.remove').remove();
}
