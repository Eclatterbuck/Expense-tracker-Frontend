import firebase from 'firebase/app';
import 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvF55tdmcP2riVNGuRuaRcTp5kcj9JnqU",
    authDomain: "react-firebase-projects-2512c.firebaseapp.com",
    projectId: "react-firebase-projects-2512c",
    storageBucket: "react-firebase-projects-2512c.appspot.com",
    messagingSenderId: "750852333869",
    appId: "1:750852333869:web:e497deaaf6ccc8baf0f3a4"
  };
  
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

function login() {
    return auth.signInWithPopup(provider);
}

function logout() {
    return auth.signOut();
}

export { auth, login, logout };