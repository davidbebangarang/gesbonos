import firebase from 'firebase/app';
import 'firebase/storage';


var firebaseConfig = {
    apiKey: "AIzaSyC4As4dXqtmL_7cwx3AK0hSKnfICOBZRJY",
    authDomain: "gesbonos.firebaseapp.com",
    databaseURL: "https://gesbonos.firebaseio.com",
    projectId: "gesbonos",
    storageBucket: "gesbonos.appspot.com",
    messagingSenderId: "987124283958",
    appId: "1:987124283958:web:a41d64dca245296835b697",
    measurementId: "G-ZGXEQF4XW4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
  const storage = firebase.storage();
  //const storageRef = storage.ref();
  //
  export {
    storage, firebase as default
}