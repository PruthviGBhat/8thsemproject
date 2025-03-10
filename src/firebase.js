// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "easyestate8thsem.firebaseapp.com",
  projectId: "easyestate8thsem",
  storageBucket: "easyestate8thsem.firebasestorage.app",
  messagingSenderId: "1054138555954",
  appId: "1:1054138555954:web:318f35d13e55d71804662b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app};