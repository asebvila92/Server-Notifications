const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config/jwtConfig'); // this file is not committed

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

function isAuthenticated(user) {
  if (user) return true
  return false
}


module.exports = {
  generateToken,
  getUser,
  isAuthenticated,
}