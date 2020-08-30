import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDw96D4s2l9u99GNbRYpP5JvbUsO1KozNo",
    authDomain: "instagram-clone-65cbe.firebaseapp.com",
    databaseURL: "https://instagram-clone-65cbe.firebaseio.com",
    projectId: "instagram-clone-65cbe",
    storageBucket: "instagram-clone-65cbe.appspot.com",
    messagingSenderId: "1053781673241",
    appId: "1:1053781673241:web:79e83ab3ff660c1851f188",
    measurementId: "G-V95X14542G"
  });
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage};