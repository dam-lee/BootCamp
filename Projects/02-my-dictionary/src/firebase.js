import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3ReyGnMds8s0uHyJmCf5U0rS-4cNMz-k",
  authDomain: "sparta-react-basic-8506a.firebaseapp.com",
  projectId: "sparta-react-basic-8506a",
  storageBucket: "sparta-react-basic-8506a.appspot.com",
  messagingSenderId: "66180985970",
  appId: "1:66180985970:web:1dd595a9fc636a928fbeeb",
  measurementId: "G-10B2H6Q20N",
};

initializeApp(firebaseConfig);

export const db = getFirestore();
