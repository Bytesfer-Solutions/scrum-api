// const express = require('express');
// const router = express.Router();
// const standupController = require('../controllers/standup.controller');
// const authMiddleware = require('../middleware/auth.middleware');
// const authorizationMiddleware = require('../middleware/authorization.middleware');

// // Route to create a new standup report (Interns only)
// router.post('/', authMiddleware, authorizationMiddleware(['intern']), standupController.createStandup);

// // Route to get all standup reports by a user (Interns only, for viewing their own reports)
// router.get('/user/:userId', authMiddleware, authorizationMiddleware(['intern']), standupController.getStandupsByUser);

// // Route to get all standup reports (Managers and CEO only)
// router.get('/', authMiddleware, authorizationMiddleware(['manager', 'CEO']), standupController.getAllStandups);

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const standupController = require('../controllers/standup.controller');
// const authMiddleware = require('../middleware/auth.middleware');
// const authorizationMiddleware = require('../middleware/authorization.middleware');

// // Route for interns to submit their standup report
// router.post('/', authMiddleware, authorizationMiddleware(['intern']), standupController.createStandup);

// // Route for interns to get their standup reports by user ID
// router.get('/user/:userId', authMiddleware, authorizationMiddleware(['intern']), standupController.getStandupsByUser);

// // Route for managers to get all standup reports for a given date
// router.get('/:date', authMiddleware, authorizationMiddleware(['manager', 'CEO']), standupController.getStandupReportsByDate);

// module.exports = router;


const express = require('express');
const router = express.Router();
const standupController = require('../controllers/standup.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Allow all users to submit standup reports
router.post('/', authMiddleware, standupController.createStandup);

// Interns can view only their own standups
router.get('/my-reports', authMiddleware, standupController.getMyStandups);

// Managers/CEOs can view all standup reports
router.get('/all-reports', authMiddleware, standupController.getAllStandupReports);

// Managers/CEOs can filter reports by date
router.get('/reports/:date', authMiddleware, standupController.getStandupReportsByDate);

module.exports = router;
