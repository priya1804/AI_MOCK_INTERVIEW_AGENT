// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbfb9Bz-glSkYpkiZFRQsVJn0GsnXEG7U",
  authDomain: "intreview-prep-cp.firebaseapp.com",
  projectId: "intreview-prep-cp",
  storageBucket: "intreview-prep-cp.firebasestorage.app",
  messagingSenderId: "145844212976",
  appId: "1:145844212976:web:e3ac3713effcf5fdd81e35",
  measurementId: "G-FG291MW2XP"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
