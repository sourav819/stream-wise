// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe-l1q8EYz4ORXkDKvyigp7yYMsrqQ8ic",
  authDomain: "streamwise-f2996.firebaseapp.com",
  projectId: "streamwise-f2996",
  storageBucket: "streamwise-f2996.firebasestorage.app",
  messagingSenderId: "987356489142",
  appId: "1:987356489142:web:2d10e76bbf42a57e47cd17",
  measurementId: "G-FRGWKC126J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
