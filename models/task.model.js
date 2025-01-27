const db = require('../config/db.config');
const Joi = require('joi');

const Task = {
  create: async (task) => {
    const query = 'INSERT INTO tasks (user_id, title, description, status, assigned_to) VALUES (?, ?, ?, ?, ?)';
    return db.execute(query, [task.user_id, task.title, task.description, task.status, task.assigned_to]);
  },
  getAllByUser: async (userId) => {
    const query = 'SELECT * FROM tasks WHERE user_id = ?';
    const [rows] = await db.execute(query, [userId]);
    return rows;
  },
  getById: async (taskId) => {
    const query = 'SELECT * FROM tasks WHERE id = ?';
    const [rows] = await db.execute(query, [taskId]);
    return rows.length ? rows[0] : null; // Return the first matching row or null if not found
  },
  update: async (task) => {
    const query = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
    return db.execute(query, [task.title, task.description, task.status, task.id]);
  },
  delete: async (id) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    return db.execute(query, [id]);
  },
  validate: (task) => {
    const schema = Joi.object({
      title: Joi.string().min(3).required(),
      description: Joi.string().allow('').optional(),
      status: Joi.string().valid('TODO', 'in-progress', 'completed').required(),
      assigned_to: Joi.number().optional() // Add assigned_to as an optional field for validation
    });
    return schema.validate(task);
  }
};

module.exports = Task;
