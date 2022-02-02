import firebase from 'firebase'
require('firebase/auth')

const firebaseConfig = {
    apiKey: "AIzaSyCm-IG7LAc9Pw-JKmyRFYPloFvRs7ghZRs",
    authDomain: "react-firebase-project-ea97f.firebaseapp.com",
    projectId: "react-firebase-project-ea97f",
    storageBucket: "react-firebase-project-ea97f.appspot.com",
    messagingSenderId: "9327910340",
    appId: "1:9327910340:web:2899dd9a9b310f3d22d891"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

function login() {
    return auth.signInWithPopup(provider)    
}

function logout() {
    return auth.signOut();
}

export {
    auth,
    login,
    logout
}