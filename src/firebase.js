import * as firebase from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO1w433kKFCxZyi6hIXGMcWijfP_tI1TE",
  authDomain: "nwitter-93c45.firebaseapp.com",
  databaseURL: "https://nwitter-93c45.firebaseio.com",
  projectId: "nwitter-93c45",
  storageBucket: "nwitter-93c45.appspot.com",
  messagingSenderId: "661533608844",
  appId: "1:661533608844:web:5669d5f6763acffa9424a9",
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
