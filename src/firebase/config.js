// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnM9SbnSKvmpIgwsm6rCyLH6gvfo3f4qQ",
  authDomain: "cashflow-compass-9gisk.firebaseapp.com",
  projectId: "cashflow-compass-9gisk",
  storageBucket: "cashflow-compass-9gisk.appspot.com",
  messagingSenderId: "597272139727",
  appId: "1:597272139727:web:9a7d8348c3edba274a64ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
