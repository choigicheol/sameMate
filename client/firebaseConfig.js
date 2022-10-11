import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { FIREBASE_CONFIG } from "react-native-dotenv";

const firebaseConfig = FIREBASE_CONFIG;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database();
