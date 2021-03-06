$("#modalLogin").validate();

const auth = firebase.auth();
const modalLogin = document.getElementById('modalLogin');
const btnLogInTab = document.getElementById('btnLogInTab');
const btnSignUpTab = document.getElementById('btnSignUpTab');
const loginForm = document.getElementById('loginForm');
const signUpForm = document.getElementById('signUpForm');

//Sign up
const txtEmail_SU = document.getElementById('txtEmail_SU');
const txtPassword_SU = document.getElementById('txtPassword_SU');
const txtVerifyPassword = document.getElementById('txtVerifyPassword');
const btnSignUp = document.getElementById('btnSignUp');

//Sign in
const txtEmail_SI = document.getElementById('txtEmail_SI');
const txtPassword_SI = document.getElementById('txtPassword_SI');
const btnSignIn = document.getElementById('btnSignIn');

const btnGoogle = document.getElementById('btnGoogle');
const btnLogout = document.getElementById('btnLogout');
const mainBody = document.getElementById('mainBody');

btnSignUpTab.addEventListener('click', e => {
    loginForm.style.display = 'none';
    signUpForm.style.display = 'block';
    btnLogInTab.style.background = '#cccccc';
    btnSignUpTab.style.background = 'white';
    txtEmail_SI.value = "";
    txtPassword_SI.value = "";
    txtEmail_SU.value = "";
    txtPassword_SU.value = "";
    txtVerifyPassword.value = "";
    btnSignUp.style.display = 'block';
    btnSignIn.style.display = 'none';
});

btnLogInTab.addEventListener('click', e => {
    signUpForm.style.display = 'none';
    loginForm.style.display = 'block';
    btnLogInTab.style.background = 'white';
    btnSignUpTab.style.background = '#cccccc';
    txtEmail_SI.value = "";
    txtPassword_SI.value = "";
    txtEmail_SU.value = "";
    txtPassword_SU.value = "";
    txtVerifyPassword.value = "";
    btnSignIn.style.display = 'block';
    btnSignUp.style.display = 'none';

});

function displayLogin() {
    modalLogin.style.display = 'block';
    mainBody.style.display = 'none';
    signUpForm.style.display = 'none';
    loginForm.style.display = 'block';
    btnLogInTab.style.background = 'white';
    btnSignUpTab.style.background = '#cccccc';
    txtEmail_SI.value = "";
    txtPassword_SI.value = "";
}

//Sign in
btnSignIn.addEventListener('click', e => {
    //Get email and pass
    const email = txtEmail_SI.value;
    const pass = txtPassword_SI.value;

    //Sign in
    let promise = auth.signInWithEmailAndPassword(email, pass).then(function (user) {
        // user signed in
    }).catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
            alert('Väärä salasana.');
        } else {
            alert('Tarkista sähköpostiosoite.');
        }
        console.log(error);
    });
});

btnSignUp.addEventListener('click', e => {
    //Get email and pass
    const email = txtEmail_SU.value;
    const pass = txtPassword_SU.value;
    //Sign up
    let promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user && verifyUser()) {
        modalLogin.style.display = 'none';
        mainBody.style.display = 'block';
        setUserLists(user.uid);
    } else {
        displayLogin();
    }
});

function getUserId() {
    return firebase.auth().currentUser.uid;
}

function loadItems(listId) {
    $('#not-done-items').empty();
    $('#done-items').empty();
    let promise = Promise.resolve(getItems(listId));
    promise.then(data => {
        for (var i = 0; i < data.length; i++) {
            generateItem(data[i]['Name'], data[i]['Item_id'], data[i]['Completed']);
        }
    });
}

function setSharedToUsersData(listId) {
    let promise = Promise.resolve(getSharedToUsers(listId));
    let resArr = [];
    promise.then(data => {
        for (var i in data) {
            resArr.push(data[i]['email'].substring(0, data[i]['email'].indexOf('@')));
        }
        var uniqueEmails = [];
        $.each(resArr, function(i, el){
            if($.inArray(el, uniqueEmails) === -1) uniqueEmails.push(el);
        });
        if (uniqueEmails.length > 1) {
            $('#shareListMenuContent').append('<p>Jaettu: </p>');
            for (var i in uniqueEmails) {
                $('#shareListMenuContent').append('<p>' + uniqueEmails[i] + '</p>');
            }
        }
    });
}

function addToDoList() {
    $('.not-done').empty();
    $('.done').empty();
    $('.not-done').append('<h2 id="listHeader"></h2>'+
    '<input type="text" id="txtAddItem" class="form-control add-todo" placeholder="Lisää asia" autofocus>'+
    '<hr><ul id="not-done-items" class="list-unstyled checkbox"></ul>');
    $('.done').append('<h2 id="doneHeader"> Tehdyt </h2>' +
    '<ul id="done-items" class="list-unstyled checkbox"></ul>');

    $('.add-todo').keyup(function (event) {
        if (event.keyCode === 13) { // ENTER
            let name = $('.add-todo').val();
            if(name.length != "") {
                $('.add-todo').val("");
                let listId;
                listId = $('#listHeader').attr('class');
                addItem(listId, name);
            }
        }
    });
}

function setUserLists(userId) {
    let promise = Promise.resolve(getListsOfUser(userId));
    promise.then(data => {
        sideMenuReload();
        for (var i = 0; i < data.length; i++) {
            let listName = data[i]['Name'];
            let listId = data[i]['List_id'];
            $('#menuItems').append('<div id="listItem' + listId + '"><button id="btnShare' + listId + '" style="width:25%" class="fa fa-share-alt"</button><button style="width:50%" id="menuListItem'
            + listId
            + '">'
            + listName
            + '</button><button id="btnRemoveList' + listId + '" style="width:25%" class="fa fa-trash-alt"></button></div>');
            addListClickedInMenuBehavior(listId, listName);
            addShareButtonBehavior(listId);
            addRemoveButtonBehavior(listId);
        }
        if (data.length !== 0) {
            $('.lists').remove('#noListsHeader');
            addToDoList();
            $('#listHeader').html(data[0]['Name']);
            $('#listHeader').addClass(String(data[0]['List_id']));
            loadItems(data[0]['List_id']);
        }
        else {
            $('.lists').append('<h4 id="noListsHeader">Lisää lista painamalla "+"</h4>')
        }
    });
}

function addListClickedInMenuBehavior(listId, listName) {
    $('#menuListItem' + listId).click(function () {
        showHideMenu();
        $('#listHeader').html(listName);
        $('#listHeader').removeClass();
        $('#listHeader').addClass(String(listId));
        loadItems(listId);
    });
}

function addShareButtonBehavior(listId) {

    $('#btnShare' + listId).click(function () {
        $('#shareListMenuContent').empty();
        setSharedToUsersData(listId);
        //Needs rethinking, creates a form to validate for every list.
        $('#shareListMenuContent').append('<h4>Jaa lista</h4><form id="shareListMenuForm' + listId + '"></form> <button id="btnCloseShareList">Sulje</button>');
        $('#mainBody').hide();
        $(document.body).css("background-color", "#333333");
        $('#shareListMenuForm' + listId).append('<input type="email" name="email" id="txtShareToEmail" placeholder="kaveri@osoite.com"/>');
        $('#shareListMenuForm' + listId).append('<button id="btnShareList' + listId + '" type="submit" name="Submit" class="submit">Jaa Lista</button>');
        $('#shareListMenu').show();
        $('#txtShareToEmail').focus();
        //Validates the shared form list.
        $('#shareListMenuForm' + listId).validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            //Separate validation required because of the submitHandler.
            submitHandler: function (form) {
                let email = $('#txtShareToEmail').val();
                $('#txtShareToEmail').val("");
                addReferenceToUserLists(email, listId);
                closeShareListMenu();
            }
        });

        $('#btnCloseShareList').click(event => {
            closeShareListMenu();
        });
    });
}

function addRemoveButtonBehavior(listId) {
    $('#btnRemoveList' + listId).click(function () {
        let c = confirm("Haluatko varmasti poistaa listan?");
        if (c) deleteList(listId);
    });
}

function verifyUser() {
    let user = firebase.auth().currentUser;

    if (user.emailVerified) {
        addUser(user.uid, user.email);
        return true;
    } else {
        user.sendEmailVerification().then(() => {
            console.log('Email sent to ' + txtEmail_SU.value);
        }).catch((error) => {
            console.log('Error sending email');
        });
        return false;
    }
}

btnGoogle.addEventListener('click', e => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({'login_hint': 'user@example.com'});
    auth.signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(function (result) {
        let user = result.user;
        // console.log(user);

    }).catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
        console.log("Error: " + errorCode + " " + errorMessage + " " + email + credential);
    });
});

// Logout
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut().then(function () {
        console.log('Signed Out');
    }, function (error) {
        console.error('Sign Out Error', error);
    });
    modalLogin.style.display = 'block';
    mainBody.style.display = 'none';
    txtEmail_SI.value = "";
    // txtEmail.focus();
    txtPassword_SI.value = "";
});

$(document).ready(function () {
    //Normal form validations.
    $('#signUpFormForm').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                // minLength: 5
            },
            confirm_password: {
                required: true,
                // minLength: 5,
                equalTo: '#password'
            }
        },
        messages: {
            email: {
                required: "Syötä sähköpostiosoite",
                email: "virheellinen sähköpostiosoite."
            },
            password: {
                required: "syötä salasana",
                // minLength: "salasanan tulee olla 5 merkkiä pitkä."
            },
            confirm_password: {
                required: "Syötä salasana uudelleen",
                // minLength: "Salasanan tulee olla 5 merkkiä pitkä.",
                equalTo: "Varmista, että salasana on sama kuin edellinen."
            }
        }
    });
    $('#loginFormForm').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
            }
        },
        messages: {
            email: {
                required: "Syötä sähköpostiosoite",
                email: "virheellinen sähköpostiosoite."
            },
            password: {
                required: "syötä salasana",
            }
        }
    });
    $('#addListMenuForm').validate({
        rules: {
            txtListName: {
                required: true
            }
        },
        messages: {
            txtListName: {
                required: "Anna listalle nimi."
            }
        },
        submitHandler: function (form) {
            let listName = $('#txtListName').val();
            let userId = getUserId();
            $('txtListName').validate();
            addList(userId, listName);
            // setUserLists(userId);
            closeAddList();
        }
    });
});
