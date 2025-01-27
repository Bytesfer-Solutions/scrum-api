const express = require('express');
const router = express.Router();
const issuesController = require('../controllers/issues.controller'); 
const authMiddleware = require('../middleware/auth.middleware'); 
const upload = require('../middleware/upload.middleware'); // Import multer middleware

// // Route to create an issue
// router.post('/', authMiddleware, issuesController.createIssue);

// Create an issue (with optional file upload)
router.post('/', authMiddleware, upload.single('screenshot'), issuesController.createIssue);

// Route to get all issues
router.get('/', authMiddleware, issuesController.getAllIssues);

module.exports = router;
