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
const btnFbSignUp = document.getElementById('btnFbSignUp');
const btnGSignUp = document.getElementById('btnGSignUp');

//Sign in
const txtEmail_SI = document.getElementById('txtEmail_SI');
const txtPassword_SI = document.getElementById('txtPassword_SI');

const btnSignIn = document.getElementById('btnSignIn');
const btnGoogle = document.getElementById('btnGoogle');
const btnFacebook = document.getElementById('btnFacebook');

const mainBody = document.getElementById('mainBody');

btnSignUpTab.addEventListener('click', e=> {
    loginForm.style.display = 'none';
    signUpForm.style.display = 'block';
    btnLogInTab.style.background = '#cccccc';
    btnSignUpTab.style.background = 'white';
    txtEmail_SI.value = "";
    txtPassword_SI.value = "";
    txtEmail_SU.value = "";
    txtPassword_SU.value = "";
    txtVerifyPassword.value = "";
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
    }
    else {
        displayLogin();
    }
});

function verifyUser() {
    let user = firebase.auth().currentUser;

    if(user.emailVerified) {
        return true;
    }
    else {
        user.sendEmailVerification().then( ()=> {
            console.log('Email sent to ' + txtEmail_SU.value);
        }).catch((error) => {
            console.log('Error sending email');
        });
        return false;
    }
}

btnGoogle.addEventListener('click', e => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });
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
        console.log("Error: " + errorCode +" " + errorMessage + " " + email + credential);
    });
});



//Logout
// btnLogout.addEventListener('click', e => {
//     firebase.auth().signOut().then(function() {
//         console.log('Signed Out');
//         document.getElementById('task').innerHTML = "";
//         document.getElementById('navbarTitle').innerHTML = "";
//     }, function(error) {
//         console.error('Sign Out Error', error);
//     });
//     modalLogin.style.display = 'block';
//     mainBody.style.display = 'none';
//     txtEmail_SI.value = "";
//     // txtEmail.focus();
//     txtPassword_SI.value = "";
// });