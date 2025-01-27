const Task = require('../models/task.model');
const { validationResult } = require('express-validator');

// Create a new task
exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, status, assigned_to } = req.body;
  const userId = req.user.id;

  try {
    // If 'assigned_to' is not provided, set it to the user creating the task
    const assignedToUser = assigned_to ? assigned_to : userId;

    console.log("Creating task with data:", { userId, title, description, status, assignedToUser });

    await Task.create({ user_id: userId, title, description, status, assigned_to: assignedToUser });
    res.status(201).json({ message: 'Task created successfully.' });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// Get all tasks for the logged-in user
exports.getAllTasks = async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await Task.getAllByUser(userId);
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.getById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (err) {
    console.error('Error fetching task by ID:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};


// Update a task by ID
exports.updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    await Task.update({ id, title, description, status });
    res.json({ message: 'Task updated successfully.' });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await Task.delete(id);
    res.json({ message: 'Task deleted successfully.' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
