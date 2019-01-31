import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'


  var config = {
    apiKey: "AIzaSyAIoEjU91o6B9Q_qrq9z4TxwKGZBkwGQLA",
    authDomain: "shopacc-c6b3d.firebaseapp.com",
    databaseURL: "https://shopacc-c6b3d.firebaseio.com",
    projectId: "shopacc-c6b3d",
    storageBucket: "shopacc-c6b3d.appspot.com",
    messagingSenderId: "265625106322"
  };
  firebase.initializeApp(config);

  export default firebase;