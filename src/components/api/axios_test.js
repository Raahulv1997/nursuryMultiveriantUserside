// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYryN6oPkpREwtjnNqpgFKAvqEYIP_IuE",
  authDomain: "realtimenotification-7265d.firebaseapp.com",
  projectId: "realtimenotification-7265d",
  storageBucket: "realtimenotification-7265d.appspot.com",
  messagingSenderId: "381425544116",
  appId: "1:381425544116:web:797f0076466bedc867a0e1",
  measurementId: "G-RBBP0H7WCD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log("------------------------------");

console.log(analytics);
