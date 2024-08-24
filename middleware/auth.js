const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Define a fixed JWT secret key
const jwtSecret = process.env.JWT_SECRET; 

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.body.username = decoded.user.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
