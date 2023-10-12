// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyt6uHV2BgRnMV6jDpa6BDDk1D4wDm6Uc",
  authDomain: "expense-tracker-3625c.firebaseapp.com",
  projectId: "expense-tracker-3625c",
  storageBucket: "expense-tracker-3625c.appspot.com",
  messagingSenderId: "805335726308",
  appId: "1:805335726308:web:7f08799bc4017230af54f1"
};

// Initialize Firebase

//creates an instance of the Firebase app and assigns it to the app variable.
const app = initializeApp(firebaseConfig);
//It's used for authentication-related operations.
export const auth = getAuth(app);
//used for Google Sign-In authentication
export const provider = new GoogleAuthProvider();
//used to interact with the Firestore database.
export const db = getFirestore(app);