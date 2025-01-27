// // const db = require('../config/db.config');

// // const User = {
// //   create: (user, callback) => {
// //     const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
// //     db.query(query, [user.username, user.password], callback);
// //   },
// //   findByUsername: (username, callback) => {
// //     const query = 'SELECT * FROM users WHERE username = ?';
// //     db.query(query, [username], callback);
// //   }
// // };

// // module.exports = User;


// // const db = require('../config/db.config');
// // const Joi = require('joi');

// // const User = {
// //   create: async (user) => {
// //     const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
// //     return db.execute(query, [user.username, user.password]);
// //   },
// //   findByUsername: async (username) => {
// //     const query = 'SELECT * FROM users WHERE username = ?';
// //     const [rows] = await db.execute(query, [username]);
// //     return rows[0];
// //   },
// //   validate: (user) => {
// //     const schema = Joi.object({
// //       username: Joi.string().min(3).required(),
// //       password: Joi.string().min(6).required()
// //     });
// //     return schema.validate(user);
// //   }
// // };

// // module.exports = User;


// const db = require('../config/db.config');
// const Joi = require('joi');

// const User = {
//   create: async (user) => {
//     const query = 'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)';
//     return db.execute(query, [user.username, user.password, user.email, user.role]);
//   },
//   findByUsername: async (username) => {
//     const query = 'SELECT * FROM users WHERE username = ?';
//     const [rows] = await db.execute(query, [username]);
//     return rows.length ? rows[0] : null;
//   },
//   findById: async (id) => {
//     const query = 'SELECT * FROM users WHERE id = ?';
//     const [rows] = await db.execute(query, [id]);
//     return rows.length ? rows[0] : null;
//   },
//   findByEmail: async (email) => {
//     const query = 'SELECT * FROM users WHERE email = ?';
//     const [rows] = await db.execute(query, [email]);
//     return rows.length ? rows[0] : null;
//   },
//   findAllByRole: async (role) => {
//     const query = 'SELECT * FROM users WHERE role = ?';
//     const [rows] = await db.execute(query, [role]);
//     return rows;
//   },
//   validate: (user) => {
//     const schema = Joi.object({
//       username: Joi.string().min(3).required(),
//       password: Joi.string().min(6).required(),
//       role: Joi.string().valid('intern', 'manager', 'CEO').required()
//     });
//     return schema.validate(user);
//   }
// };

// module.exports = User;


const db = require('../config/db.config');
const Joi = require('joi');

const User = {
  create: async (user) => {
    const query = 'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)';
    return db.execute(query, [
      user.username,
      user.password,
      user.email,
      user.role || 'intern' // Default role to 'intern' if not provided
    ]);
  },
  findByUsername: async (username) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await db.execute(query, [username]);
    return rows.length ? rows[0] : null;
  },
  findById: async (id) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await db.execute(query, [id]);
    return rows.length ? rows[0] : null;
  },
  findByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.execute(query, [email]);
    return rows.length ? rows[0] : null;
  },
  findAllByRole: async (role) => {
    const query = 'SELECT * FROM users WHERE role = ?';
    const [rows] = await db.execute(query, [role]);
    return rows;
  },
  validate: (user) => {
    const schema = Joi.object({
      username: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      role: Joi.string().valid('intern', 'manager', 'CEO').default('intern') // Default role
    });
    return schema.validate(user);
  }
};

module.exports = User;
