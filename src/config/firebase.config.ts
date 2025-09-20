import { getApp, getApps, initializeApp } from "firebase/app"; 
// Firebase core methods
// getApp → returns the already initialized Firebase app
// getApps → returns an array of initialized apps
// initializeApp → creates a new Firebase app instance

import { getFirestore } from "firebase/firestore"; 
// Firestore database client

// Firebase configuration object (using environment variables for security)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, 
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID, 
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, 
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, 
  appId: import.meta.env.VITE_FIREBASE_APP_ID, 
};

// Initialize Firebase app
// If an app is already initialized → reuse it
// Otherwise → create a new app with firebaseConfig
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore database instance
const db = getFirestore(app);

// Export Firestore so it can be used in other files
export { db };
