import firebase from 'firebase';
// require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyAW2TwX79ulzE0ugG3I7ksar0AxPrCDxc0",
    authDomain: "schedule-app-12727.firebaseapp.com",
    projectId: "schedule-app-12727",
    storageBucket: "schedule-app-12727.appspot.com",
    messagingSenderId: "904908947911",
    appId: "1:904908947911:web:6c8a442ba34541340699e2",
    measurementId: "G-TL0VWJBWKG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();


