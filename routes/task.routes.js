const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');  // Ensure this path is correct
const { taskValidation } = require('../middleware/validation.middleware');  // Ensure validation middleware is imported
const authMiddleware = require('../middleware/auth.middleware');  // Ensure auth middleware is imported

// Route to create a new task
router.post('/', authMiddleware, taskValidation, taskController.createTask);

// Route to get all tasks for the logged-in user
router.get('/', authMiddleware, taskController.getAllTasks);

// Route to get a specific task by ID
router.get('/:id', authMiddleware, taskController.getTaskById);

// Route to update a task by ID
router.put('/:id', authMiddleware, taskValidation, taskController.updateTask);

// Route to delete a task by ID
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
