// const db = require('../config/db.config');
// const Joi = require('joi');

// const Standup = {
//   // Create a new standup report
//   create: async (standup) => {
//     const query = 'INSERT INTO standups (user_id, yesterday, today, blockers) VALUES (?, ?, ?, ?)';
//     return db.execute(query, [standup.user_id, standup.yesterday, standup.today, standup.blockers]);
//   },
  
//   // Get all standup reports by user (for interns to view their own reports)
//   getAllByUser: async (userId) => {
//     const query = 'SELECT * FROM standups WHERE user_id = ? ORDER BY created_at DESC';
//     const [rows] = await db.execute(query, [userId]);
//     return rows;
//   },

//   // Get all standup reports for a specific date (for managers to view daily reports)
//   getAllByDate: async (date) => {
//     const query = `
//       SELECT standups.*, users.username 
//       FROM standups
//       INNER JOIN users ON standups.user_id = users.id
//       WHERE DATE(standups.created_at) = ?
//       ORDER BY created_at DESC
//     `;
//     const [rows] = await db.execute(query, [date]);
//     return rows;
//   },

//   // Get all standup reports (general method for getting all standups)
//   getAllStandups: async () => {
//     const query = `
//       SELECT standups.*, users.username 
//       FROM standups
//       INNER JOIN users ON standups.user_id = users.id
//       ORDER BY created_at DESC
//     `;
//     const [rows] = await db.execute(query);
//     return rows;
//   },

//   // Validate the standup report fields
//   validate: (standup) => {
//     const schema = Joi.object({
//       yesterday: Joi.string().required(),
//       today: Joi.string().required(),
//       blockers: Joi.string().allow('').optional()
//     });
//     return schema.validate(standup);
//   }
// };

// module.exports = Standup;
 

const db = require('../config/db.config');
const Joi = require('joi');

const Standup = {
  // Create a new standup report
  create: async (standup) => {
    const query = 'INSERT INTO standups (user_id, yesterday, today, blockers) VALUES (?, ?, ?, ?)';
    return db.execute(query, [standup.user_id, standup.yesterday, standup.today, standup.blockers]);
  },
  

  // Get standup reports for a specific user and date
getByUserAndDate: async (userId, date) => {
  const query = `
    SELECT standups.id, standups.yesterday, standups.today, standups.blockers, standups.created_at,
           users.username AS intern_name
    FROM standups
    INNER JOIN users ON standups.user_id = users.id
    WHERE standups.user_id = ? AND DATE(standups.created_at) = ?
    ORDER BY standups.created_at DESC
  `;
  const [rows] = await db.execute(query, [userId, date]);
  return rows;
},
  // Get all standup reports for a specific user (Interns view their own reports)
  getAllByUser: async (userId) => {
    const query = `
      SELECT standups.id, standups.yesterday, standups.today, standups.blockers, standups.created_at,
      users.username AS intern_name
      FROM standups
      INNER JOIN users ON standups.user_id = users.id
      WHERE standups.user_id = ?
      ORDER BY standups.created_at DESC
    `;
    const [rows] = await db.execute(query, [userId]);
    return rows;
  },

  // Get all standup reports with user details (Managers/CEOs can view all reports)
  getAllWithUserDetails: async () => {
    const query = `
      SELECT standups.id, standups.yesterday, standups.today, standups.blockers, 
      standups.created_at, COALESCE(users.username, 'Unknown') AS intern_name
      FROM standups
      LEFT JOIN users ON standups.user_id = users.id
      ORDER BY standups.created_at DESC
    `;
    const [rows] = await db.execute(query);
    return rows;
  },

  // Get all standup reports for a specific date (Managers/CEOs)
  getAllByDate: async (date) => {
    const query = `
      SELECT standups.id, standups.yesterday, standups.today, standups.blockers, standups.created_at,
      COALESCE(users.username, 'Unknown') AS intern_name    
      FROM standups
      LEFT JOIN users ON standups.user_id = users.id
      WHERE DATE(standups.created_at) = ?
      ORDER BY standups.created_at DESC
    `;
    const [rows] = await db.execute(query, [date]);
    return rows;
  },

  // Validate standup report fields
  validate: (standup) => {
    const schema = Joi.object({
      yesterday: Joi.string().required(),
      today: Joi.string().required(),
      blockers: Joi.string().allow('').optional()
    });
    return schema.validate(standup);
  }
};

module.exports = Standup;
