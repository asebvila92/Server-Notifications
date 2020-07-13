const admin = require('firebase-admin');
const config = require('./index.js')

admin.initializeApp({
  credential: admin.credential.cert(config.keyFirebase),
  databaseURL: "https://server-notifications-b4b07.firebaseio.com"
});

module.exports = {
  firebase: admin
}

