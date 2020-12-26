import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import firebaseConfig from "./firebase-config";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { firebaseApp, timestamp };
