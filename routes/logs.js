const { getLogs, getLogByNameOfClient, addLog, deleteLog } = require('../firebase/firebaseConsults');
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

  router.post('/deliveries', (req, res) => {
    const token = req.headers.authorization || ''
    let payload = {
      message: '',
      deliveries: [],
      newLog: '',
    }
    if(isAuthenticated(token)){
      const client = req.body.client;
      const article = req.body.article;
      const lastDelivery = new Date(req.body.lastDelivery);
      const nextDelivery = new Date(req.body.nextDelivery);
      const cellphone = req.body.cellphone;
      const address = req.body.address;
      const price = req.body.price;
      const observations = req.body.observations;
      const savedBy = req.body.user;
      if(client !== '' && nextDelivery !== '' && savedBy !== ''){
        addLog(client, article, lastDelivery, nextDelivery, price, address, cellphone, observations, savedBy).then(
          (response) => {
            payload.message = 'Registro agregado con exito';
            payload.newLog = response
            //at this point if its everything ok, we will get all deliveries to add in the response
            getLogs().then(
              (response) => {
                payload.deliveries = response;
                res.send(payload);
              },
              (err) => {
                payload.message = 'ocurrio un error pero el registro fue agregado con exito';
                res.send(payload);
              }
            )
          },
          (err) => {
            payload.message = 'ocurrio un error';
            res.status(500).send(payload);
          })
      }else{
        payload.message = 'need client and a next delivery';
        res.status(400).send(payload);
      }
    }else{
      payload.message = 'por favor autenticate nuevamente';
      res.status(401).send(payload);
    }
  })

  router.delete('/deliveries/:logId', (req, res) => {
    const token = req.headers.authorization || ''
    let payload = {
      message: '',
      deliveries: []
    }
    if(isAuthenticated(token)){
      const logId = req.params.logId;
      deleteLog(logId).then(
        (response) => {
          getLogs().then(
            (response) => {
              payload.message = 'se elimino con exito';
              payload.deliveries = response;
              res.send(payload);
            },
            (err) => {
              payload.message = 'ocurrio un error pero el registro fue eliminado con exito';
              res.send(payload);
            }
          )
        },
        (err) => {
          payload.message = 'ocurrio un error';
          res.status(500).send(payload);
        })
    }else{
      payload.message = 'por favor autenticate nuevamente';
      res.status(401).send(payload);
    }
  })


};