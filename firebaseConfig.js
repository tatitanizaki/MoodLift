// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// Optionally import analytics if you plan to use it
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCXOLwblPGHi4v3MPROZQfPDP85ONDzLYk",
  authDomain: "moodlift-6ab6e.firebaseapp.com",
  projectId: "moodlift-6ab6e",
  storageBucket: "moodlift-6ab6e.appspot.com",
  messagingSenderId: "344571255472",
  appId: "1:344571255472:web:cb1709243bd4c28292f975",
  measurementId: "G-C3G5ZE0MSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Uncomment if using Firebase Analytics

const db = getFirestore(app);

export { db };