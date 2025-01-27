const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const authorizationMiddleware = require('../middleware/authorization.middleware');

// Route to get all interns (Managers and CEO can access this)
router.get('/interns', authMiddleware, authorizationMiddleware(['manager', 'CEO']), userController.getAllInterns);

module.exports = router;
