import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/database";
import "firebase/compat/analytics";
import "firebase/compat/storage";
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

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { apiKey, auth, firestore, storage };
export const db = getFirestore();
