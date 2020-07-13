const jwt = require('jsonwebtoken');
const config = require('../config/index.js')

function generateToken(data) {
  delete data.password;
  return jwt.sign(data, config.jwtConfig, {
    expiresIn: 864000 // 10 days
  });
}

function getUser(token) {
  try {
    if (token) {
      token = token.replace('Bearer ','');
      return jwt.verify(token, config.jwtConfig);
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