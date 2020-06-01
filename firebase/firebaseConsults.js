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
      })
      .catch(
        reject()
      );
  }
)}

function getLogs() {
  return new Promise((resolve, reject) => {
    let db = firebase.firestore();
    db.collection('deliveries')
      .orderBy('nextDelivery')
      .get()
      .then((querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => {
          const id = doc.id
          const data = doc.data()
          return { id, ...data }
        })
        const logs = docs.length === 0 ? null : docs;
        resolve(logs)
      })
      .catch(
        reject()
      );
  })
}

function getLogByNameOfClient(clientName) {
  return new Promise((resolve, reject) => {
    let db = firebase.firestore();
    db.collection('deliveries')
      .where('client', '==', clientName)
      .get()
      .then((querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => {
          const id = doc.id
          const data = doc.data()
          return { id, ...data }
        })
        const logs = docs.length === 0 ? null : docs;
        resolve(logs)
      })
      .catch(
        reject()
      );
  })
}



module.exports = {
  login,
  getLogs,
  getLogByNameOfClient,
}


  