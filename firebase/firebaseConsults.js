const { firebase }  = require('../config/firebaseConfig')

function login(username, deviceId) {
  return new Promise((resolve, reject) => {
    let db = firebase.firestore();
    db.collection('users')
      .where('username', '==', username)
      .get()
      .then((querySnapshot) => {
        const id = querySnapshot.docs[0] ? querySnapshot.docs[0].id : null
        let doc = null;
        //if user exists we update the deviceId in firebase else resolve with null
        if(id !== null){
          doc = querySnapshot.docs[0].data()
          db.collection('users')
            .doc(id)
            .update({ deviceId: deviceId })
            .then(() => {
              doc = {...doc, deviceId: deviceId }
              resolve(doc)
            })
        }else{
          resolve(doc)
        }
      });
  }
)}

function getLogs() {
  return new Promise((resolve, reject) => {
    let db = firebase.firestore();
    db.collection("deliveries")
      .orderBy("nextDelivery")
      .get()
      .then((querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => {
          const id = doc.id
          const data = doc.data()
          return { id, ...data }
        })
        const logs = docs.length === 0 ? null : docs;
        resolve(logs)
      });
  })
}



module.exports = {
  login,
  getLogs,
}


  