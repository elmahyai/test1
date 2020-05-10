// db.js

import Firebase from 'firebase';

// The database for now is connected to firebase directly
// You can create backend instead
// I removed the credentials before sending the code 
 let config = {
    apiKey: "??",
    authDomain: "??",
    databaseURL: "??",
    projectId: "??",
    storageBucket: "??",
    messagingSenderId: "??",
    appId: "??"
  };
let app = Firebase.initializeApp(config);
export const db = app.database();