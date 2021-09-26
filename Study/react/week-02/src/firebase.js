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
  appId: "1:66180985970:web:1dd595a9fc636a928fbeeb",
  measurementId: "G-10B2H6Q20N",
};
// 파이어베이스를 호출하는 순간에 쓸 수 있도록 초기화 할 거라는 뜻
initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore();
