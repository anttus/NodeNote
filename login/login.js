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
    let promise = auth.signInWithEmailAndPassword(email, pass).then(function(user) {
        // user signed in

    }).catch(function(error) {
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

firebase.auth().onAuthStateChanged(function(user) {
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
            + '</button><button id="btnRemoveList'+ listId + '" style="width:25%" class="fa fa-trash-alt"></button></div>');

            addListClickedInMenuBehavior(listId, listName);
            addShareButtonBehavior(listId);
            addRemoveButtonBehavior(listId);
        }
        $('#listHeader').html(data[0]['Name']);
        $('#listHeader').addClass(String(data[0]['List_id']));
        loadItems(data[0]['List_id']);
    });
}

function addListClickedInMenuBehavior(listId, listName) {
    $('#menuListItem' + listId).click(function() {
        showHideMenu();
        $('#listHeader').html(listName);
        $('#listHeader').removeClass();
        $('#listHeader').addClass(String(listId));
        loadItems(listId);
    });
}

function addShareButtonBehavior(listId) {
    $('#btnShare' + listId).click(function() {
        $('#mainBody').hide();
        $(document.body).css("background-color", "#333333");
        $('#shareListMenuForm').append('<input type="text" id="txtShareToEmail" placeholder="kaveri@osoite.com"/>');
        $('#shareListMenuForm').append('<button id="btnShareList"'+ listId +' type="submit">Jaa Lista</button>');
        $('#shareListMenu').show();
        $('#btnShareList').click(function() {
            let email = $('#txtShareToEmail').val();
            $('#txtShareToEmail').val("");
            //addUserToList(email, listId);
            console.log("Todo: share listId:" + listId + " to " + email);
            closeShareListMenu();
        });
    });

    $('#txtShareToEmail').keyup(function(event) {
        if(event.keyCode === 13) {
            console.log("Todo: share listId:" + listId + " to " + email);
            closeShareListMenu();
        }
    });
}

function addRemoveButtonBehavior(listId) {
    $('#btnRemoveList' + listId).click(function() {
        deleteList(listId);
        $('#menuItems').remove('#listItem' + listId);
        // loadItems(listId);
        // instead of loadItems, call setUserLists?
        setUserLists(getUserId());
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

    firebase.auth().getRedirectResult().then(function(result) {
        let user = result.user;
        console.log(user);

    }).catch(function(error) {
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
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
    }, function(error) {
        console.error('Sign Out Error', error);
    });
    modalLogin.style.display = 'block';
    mainBody.style.display = 'none';
    txtEmail_SI.value = "";
    // txtEmail.focus();
    txtPassword_SI.value = "";
});
