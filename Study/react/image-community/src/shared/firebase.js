import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCsguWCpD487QwejDdH2ndQ32NlqVag-bI",
  authDomain: "image-community-b1ca6.firebaseapp.com",
  projectId: "image-community-b1ca6",
  storageBucket: "image-community-b1ca6.appspot.com",
  messagingSenderId: "740744233503",
  appId: "1:740744233503:web:f37177df9d95a8a82dcb2a",
  measurementId: "G-9P0BBK8KPW",
};
// 초기화
firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, apiKey, firestore, storage };
