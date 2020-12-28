import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAj3mflGD27nfZqE8Fx9WZjxhS5-UaSslI",
    authDomain: "juli-martin.firebaseapp.com",
    databaseURL: "https://juli-martin.firebaseio.com",
    projectId: "juli-martin",
    storageBucket: "juli-martin.appspot.com",
    messagingSenderId: "830042686303",
    appId: "1:830042686303:web:970cc2ad6d0de57b836cea",
    measurementId: "G-YHFNNJLW03"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore()

export const auth = firebaseApp.auth()