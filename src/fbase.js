import * as firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
// MUST use REACT_APP_"your environment variable"
// Using process.env is only for GitHub,
// Anyways when you build the app and you put it on a website, CRA will replace REACT_APP with the real values
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
