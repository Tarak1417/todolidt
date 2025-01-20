// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2NmbPOccjhqprWWnXy6fUlCq0xNSOShQ",
  authDomain: "taskmanager-32361.firebaseapp.com",
  projectId: "taskmanager-32361",
  storageBucket: "taskmanager-32361.firebasestorage.app",
  messagingSenderId: "1084237714013",
  appId: "1:1084237714013:web:8a1ba15c1cc050d35773b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };