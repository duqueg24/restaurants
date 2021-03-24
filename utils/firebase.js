import firebase from 'firebase/app'
import 'firebase/firestore'

  const firebaseConfig = {
    apiKey: "AIzaSyCb42gQ6Pds0b-nbAGT1-AaDTjdMilkPmU",
    authDomain: "restaurants-dd8fe.firebaseapp.com",
    projectId: "restaurants-dd8fe",
    storageBucket: "restaurants-dd8fe.appspot.com",
    messagingSenderId: "57527020054",
    appId: "1:57527020054:web:97e59dc437259054b1a337"
  };
  // Initialize Firebase
  export const firebaseApp =firebase.initializeApp(firebaseConfig);