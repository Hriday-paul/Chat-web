// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9hPRzt1jNWPJ8RX3NrLT0oD43Q7RkU9I",
  authDomain: "chat-application-83477.firebaseapp.com",
  projectId: "chat-application-83477",
  storageBucket: "chat-application-83477.appspot.com",
  messagingSenderId: "942040189449",
  appId: "1:942040189449:web:1e678258c65275aea1c6d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

