const express = require('express');
const server = express();
const router = express.Router()
const bodyParser = require('body-parser');

server.use(bodyParser.json());

require('./config/firebaseConfig')

require('./routes/auth')(router);

server.use(router);
server.listen('3000', function() {
  console.log('Listening on port 3000');
});