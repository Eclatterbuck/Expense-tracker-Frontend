import firebase from 'firebase/app';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDZEnfy9gCo18CVYs6ciVoX6KjbLAMKrqw",
    authDomain: "react-firebase-projects-d9f91.firebaseapp.com",
    projectId: "react-firebase-projects-d9f91",
    storageBucket: "react-firebase-projects-d9f91.appspot.com",
    messagingSenderId: "922641939569",
    appId: "1:922641939569:web:95a24620aefd0242caefd0"
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