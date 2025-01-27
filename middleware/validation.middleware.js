const { body } = require('express-validator');

exports.signupValidation = [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

exports.taskValidation = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('status').isIn(['TODO', 'in-progress', 'completed']).withMessage('Invalid status')
];
