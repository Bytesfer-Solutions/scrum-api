// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const User = require('../models/user.model');

// module.exports = async (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ error: 'No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found.' });
//     }

//     req.user = {
//       id: user.id,
//       role: user.role,
//     };

//     next();
//   } catch (err) {
//     console.error('Invalid token:', err);
//     res.status(401).json({ error: 'Invalid token.' });
//   }
// };


// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const User = require('../models/user.model');

// module.exports = async (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ error: 'No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // Ensure the user model has a getById function
//     const user = await User.findById(decoded.id); 

//     if (!user) {
//       return res.status(404).json({ error: 'User not found.' });
//     }

//     req.user = {
//       id: user.id,
//       role: user.role,
//     };

//     next();
//   } catch (err) {
//     if (err.name === 'TokenExpiredError') {
//       return res.status(401).json({ error: 'Token expired. Please log in again.' });
//     }
    
//     console.error('Invalid token:', err);
//     res.status(401).json({ error: 'Invalid token.' });
//   }
// };


const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user.model');

module.exports = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access Denied. No valid token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract token part

    // Verify JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from database using decoded ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: 'User no longer exists.' });
    }

    // Attach user details to request object for next middleware
    req.user = {
      id: user.id,
      role: user.role,
    };

    next(); // Proceed to the next middleware
  } catch (err) {
    console.error('Authentication Error:', err.message);

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session expired. Please log in again.' });
    }

    if (err.name === 'JsonWebTokenError' || err.name === 'NotBeforeError') {
      return res.status(401).json({ error: 'Invalid authentication token.' });
    }

    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
};









