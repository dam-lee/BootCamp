// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3ReyGnMds8s0uHyJmCf5U0rS-4cNMz-k",
  authDomain: "sparta-react-basic-8506a.firebaseapp.com",
  projectId: "sparta-react-basic-8506a",
  storageBucket: "sparta-react-basic-8506a.appspot.com",
  messagingSenderId: "66180985970",
  appId: "1:66180985970:web:dacda5762ad25fff8fbeeb",
  measurementId: "G-W2M2N75JQ8",
};

// Initialize Firebase

initializeApp(firebaseConfig);
const db = getFirestore();
export { db };
