const express = require('express');
const server = express();
const router = express.Router()
const bodyParser = require('body-parser');

server.use(bodyParser.json());

require('./config/firebaseConfig')

require('./routes/auth')(router);
require('./routes/logs')(router);

server.use(router);
const app = server.listen(process.env.PORT || '3000', function() {
  const port = app.address().port
  console.log('Listening on port ' + port);
});