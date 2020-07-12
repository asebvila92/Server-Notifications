const jwt = require('jsonwebtoken');
let jwtKey = null;

if(process.env.NODE_ENV === 'dev'){
  jwtKey = require('../config/jwtConfig'); // this file is not committed
}
else{
  jwtKey = process.env.JWT_KEY
}


function generateToken(data) {
  delete data.password;
  return jwt.sign(data, jwtKey, {
    expiresIn: 864000 // 10 days
  });
}

function getUser(token) {
  try {
    if (token) {
      token = token.replace('Bearer ','');
      return jwt.verify(token, jwtKey);
    }
    return null;
  } catch (err) {
    return null;
  }
} 

function isAuthenticated(token) {
  const user = getUser(token);
  if (user !== null) return true
  return false
}


module.exports = {
  generateToken,
  getUser,
  isAuthenticated,
}