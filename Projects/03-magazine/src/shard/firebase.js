// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGoakjdau_HjfKtfjW02kc0HPLOgIh-EU",
  authDomain: "magazine-8936d.firebaseapp.com",
  projectId: "magazine-8936d",
  storageBucket: "magazine-8936d.appspot.com",
  messagingSenderId: "486918142366",
  appId: "1:486918142366:web:9ab3a2a9a16bd9e23e7e8f",
  measurementId: "G-KLGN4GPK39",
};
// 파이어베이스를 호출하는 순간에 쓸 수 있도록 초기화 할 거라는 뜻
initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore();
