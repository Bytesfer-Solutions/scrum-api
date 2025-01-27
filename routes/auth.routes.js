// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/auth.controller');
// const { signupValidation } = require('../middleware/validation.middleware');
// const rateLimit = require('../middleware/rateLimit.middleware');

// router.post('/signup', rateLimit, signupValidation, authController.signup);
// router.post('/login', rateLimit, authController.login);

// module.exports = router;


const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { signupValidation } = require('../middleware/validation.middleware');
const rateLimit = require('../middleware/rateLimit.middleware');
const { body } = require('express-validator');

// Updated route for user signup
router.post(
  '/signup',
  rateLimit,
  [
    // Validation for username
    body('username')
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long.'),
    // Validation for email
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email address.'),
    // Validation for password
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long.')
  ],
  signupValidation, // Custom validation middleware (if needed)
  authController.signup // Signup controller
);

// Route for user login
router.post('/login', rateLimit, authController.login);

module.exports = router;
