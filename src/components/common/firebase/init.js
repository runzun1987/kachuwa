import firebase from 'firebase/app'
import 'firebase/storage'


var firebaseConfig = {
    apiKey: "AIzaSyB0qxIXDe1V4P3dZ7dw3SD6VytDu0iGFEo",
    authDomain: "kachuwa.firebaseapp.com",
    databaseURL: "https://kachuwa-default-rtdb.firebaseio.com",
    projectId: "kachuwa",
    storageBucket: "kachuwa.appspot.com",
    messagingSenderId: "284945577117",
    appId: "1:284945577117:web:33d7c7edc27d9c8c4a1074",
    measurementId: "G-7CF2N52YFJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const storage = firebase.storage()

  export {
      storage, firebase as default
  }