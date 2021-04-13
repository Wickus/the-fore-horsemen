// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAF4V3LQHlvT2RLm34Uw4-6Svn4NeLawa8",
    authDomain: "the-forehorsemen.firebaseapp.com",
    projectId: "the-forehorsemen",
    storageBucket: "the-forehorsemen.appspot.com",
    messagingSenderId: "458901564387",
    appId: "1:458901564387:web:75feca0a9a8f4b434b0ed6",
    measurementId: "G-Y1QPRQCB7C",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.database();

database
    .ref()
    .child("connection")
    .get()
    .then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    })
    .catch((error) => {
        console.error(error);
    });
