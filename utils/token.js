const JWT = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

function generateToken(payload) {
  return JWT.sign(payload, SECRET_KEY, { expiresIn: '7d' });
}

module.exports = { generateToken };
