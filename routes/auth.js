const bcrypt = require('bcrypt');
const { generateToken, getUser } = require('../helpers/authHelpers');
const { login } = require('../firebase/firebaseConsults');

module.exports = (router) => {
  
  router.post('/auth/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const deviceId = req.body.deviceId
    let payload = {
      message: '',
      token: '',
      userData: {}
    }
    if(username !== '' && password !== '') {
      login(username, deviceId).then(
        (response) => {
          if(response !== null){
            bcrypt.compare(password, response.password, function (err, result) {
              if(result){
                payload.token = generateToken(response)
                payload.message = 'Autenticacion exitosa';
                payload.userData = {
                  name: response.name, 
                  username: response.username,
                  lastname: response.lastname, 
                  deviceId: response.deviceId
                }
                res.send(payload);
              }else{
                payload.message = 'Contraseña incorrecta';
                res.send(payload);
              }
            });
          }else{
            payload.message = 'El usuario no existe';
            res.send(payload);
          }
        },
        (err) => {
          payload.message = 'Ocurrio un error';
          res.status(500).send(payload);
        }
      )
    }else{
      payload.message = 'Las credenciales son requeridas';
      res.status(401).send(payload);
    }
  })

  router.get('/auth/test', (req, res) => {
    res.send('hello world')
  })

}

