// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMofaxmjldFRQInW0sD3kMKIxAsjnrltk",
  authDomain: "asap-99749.firebaseapp.com",
  projectId: "asap-99749",
  storageBucket: "asap-99749.appspot.com",
  messagingSenderId: "271862503824",
  appId: "1:271862503824:web:37ef84ea84c0fa19cc7b15",
  measurementId: "G-EK48WVRXJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider;

export {auth,provider};