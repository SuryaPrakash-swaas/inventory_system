const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.SECRET_KEY || 'encrypted_secret_key';
module.exports = (req, res, next) => {

  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: err });
    }
    req.userId = decoded.userId;
    next();
  });

};
