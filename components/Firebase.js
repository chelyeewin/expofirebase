import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyD3leLMQkjksPbSv0Z_VmmugWFntn0d3to",
    authDomain: "ourlessonone-bcbf6.firebaseapp.com",
    databaseURL: "https://ourlessonone-bcbf6.firebaseio.com",
    projectId: "ourlessonone-bcbf6",
    storageBucket: "ourlessonone-bcbf6.appspot.com",
    messagingSenderId: "587504481701",
    appId: "1:587504481701:web:df8e26dca3a01ab291e44c"
  };
  // Initialize Firebase
 export default firebase.initializeApp(firebaseConfig);
