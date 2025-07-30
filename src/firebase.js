// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAutT17hINeRnXuV41JsmTxyMMTCU8jDN0",
    authDomain: "nanny-finder-86a1e.firebaseapp.com",
    databaseURL: "https://nanny-finder-86a1e-default-rtdb.firebaseio.com",
    projectId: "nanny-finder-86a1e",
    storageBucket: "nanny-finder-86a1e.firebasestorage.app",
    messagingSenderId: "128380149641",
    appId: "1:128380149641:web:0fef423f06a970ac618b58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);