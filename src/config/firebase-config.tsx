import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
export const firebaseConfig = {
  apiKey: "AIzaSyC9cCaXGpNi7bUuY_aHAbKG7hP31dZD3JE",
  authDomain: "auth-app-2abcb.firebaseapp.com",
  projectId: "auth-app-2abcb",
  storageBucket: "auth-app-2abcb.appspot.com",
  messagingSenderId: "714276582910",
  appId: "1:714276582910:web:d518cdbbee2430ce183caf",
  measurementId: "G-T6CFDV06Z4",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
