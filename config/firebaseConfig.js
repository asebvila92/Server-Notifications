const admin = require('firebase-admin');
let serviceAccount = null

if(process.env.NODE_ENV === 'dev'){
  serviceAccount = require("../config/keyFirebase.json"); //this file is not committed
}else{
  serviceAccount = {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER,
    client_x509_cert_url: process.env.CLIENT_CERT_URL
  }
  console.log('SERVICE_ACCOUNT', serviceAccount)
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://server-notifications-b4b07.firebaseio.com"
});

module.exports = {
  firebase: admin
}

