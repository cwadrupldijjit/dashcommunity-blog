import firebase from 'firebase';

let token;
let user;
let provider;
let credential;

let strategy = 'popup';

function gitHubRedirectLogin() {
    firebase.auth()
        .getRedirectResult()
        .then(handleSigninSuccess)
        .catch(handleSignInErr);

    provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    firebase.auth().signInWithRedirect(provider);
}

function gitHubPopupLogin() {
    provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    firebase.auth()
        .signInWithPopup(provider)
        .then(handleSigninSuccess)
        .catch(handleSignInErr);
}

// function createUser(email, password) {
//     return firebase.auth().createUserWithEmailAndPassword(
//         email,
//         password
//     )
//     .then(result => {
//         user = result;
//         return user;
//     })
//     .catch(handleSignInErr);
// }

// function emailLogin(email, password) {
//     credential = firebase.auth.EmailAuthProvider.credential(
//         email,
//         password
//     );
// }

function getUser() {
    if (user) {
        return user;
    }

    return false;
}

function getToken() {
    if (token) {
        return token;
    }

    return false;
}

function handleSigninSuccess(result) {
    if (result.credential) {
        token = result.credential.accessToken;
        credential = result.credential;
    }

    user = result.user;
    return user;
}

function handleSignInErr(err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    const email = err.email;
    credential = err.credential;

    if (errorCode == 'auth/account-exists-with-different-credentials') {
        console.warn('You already signed up with a different ' +
            'authentication provider for that email');
    }
    console.error(err);
}

function changeLoginStrategy(newStrategy) {
    strategy = newStrategy;
}

export {
    gitHubRedirectLogin,
    gitHubPopupLogin,
    // emailLogin,
    getUser,
    getToken,
};
