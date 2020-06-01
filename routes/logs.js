const { getLogs, getLogByNameOfClient } = require('../firebase/firebaseConsults');
const { isAuthenticated } = require('../helpers/authHelpers');

module.exports = (router) => {
  
  router.get('/deliveries/all', (req, res) => {
    const token = req.headers.authorization || ''
    let payload = {
      message: '',
      data: [],
    }
    if(isAuthenticated(token)){
      getLogs().then(
        (response) => {
          payload.data = response;
          payload.message = 'Peticion exitosa';
          res.send(payload);
        },
        (err) => {
          payload.message = 'ocurrio un error';
          res.status(500).send(payload);
        }
      )
    }else{
      payload.message = 'por favor autenticate nuevamente';
      res.status(401).send(payload);
    }
  })

  router.get('/deliveries/:clientName', (req, res) => {
    const token = req.headers.authorization || ''
    let payload = {
      message: '',
      data: [],
    }
    if(isAuthenticated(token)){
      const clientName = req.params.clientName
      getLogByNameOfClient(clientName).then(
        (response) => {
          payload.data = response;
          payload.message = 'Peticion exitosa';
          res.send(payload);
        },
        (err) => {
          payload.message = 'ocurrio un error';
          res.status(500).send(payload);
        }
      )
    }else{
      payload.message = 'por favor autenticate nuevamente';
      res.status(401).send(payload);
    }
  })
};