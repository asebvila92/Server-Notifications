const admin = require('firebase-admin');
let serviceAccount = require("../config/keyFirebase.json"); //this file is not committed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://server-notifications-b4b07.firebaseio.com"
});

module.exports = {
  firebase: admin
}

