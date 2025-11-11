//firebase.js
import Vue from "vue";
import firebase from "firebase/app";
import "firebase/firebase-messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBUhjzUxO8OPPylra2BQb62dRSRavk_ovA",
  authDomain: "drzn-2025-c3816.firebaseapp.com",
  projectId: "drzn-2025-c3816",
  storageBucket: "drzn-2025-c3816.firebasestorage.app",
  messagingSenderId: "920754583159",
  appId: "1:920754583159:web:5abf8f1844f846e3edf872",
  measurementId: "G-9MSQFYDB88"
};

firebase.initializeApp(firebaseConfig);

export default firebase.messaging();
