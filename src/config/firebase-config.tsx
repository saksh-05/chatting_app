// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC9cCaXGpNi7bUuY_aHAbKG7hP31dZD3JE",
  authDomain: "auth-app-2abcb.firebaseapp.com",
  projectId: "auth-app-2abcb",
  storageBucket: "auth-app-2abcb.appspot.com",
  messagingSenderId: "714276582910",
  appId: "1:714276582910:web:d518cdbbee2430ce183caf",
  measurementId: "G-T6CFDV06Z4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getDatabase(app);
