// const db = require('../config/db.config');

// const Issue = {
//   create: async (issue) => {
//     const query = 'INSERT INTO issues (user_id, title, description, screenshot) VALUES (?, ?, ?, ?)';
//     return db.execute(query, [issue.user_id, issue.title, issue.description, issue.screenshot]);
//   },
//   getAll: async () => {
//     const query = 'SELECT * FROM issues ORDER BY created_at DESC';
//     const [rows] = await db.execute(query);
//     return rows;
//   }
// };

// module.exports = Issue;


const db = require('../config/db.config');

const Issue = {
  create: async (issue) => {
    const query = 'INSERT INTO issues (user_id, title, description, screenshot) VALUES (?, ?, ?, ?)';
    return db.execute(query, [
      issue.user_id || null, 
      issue.title || null, 
      issue.description || null, 
      issue.screenshot || null // If no screenshot, store NULL
    ]);
  },

  getAll: async () => {
    const query = `
      SELECT issues.id, issues.title, issues.description, issues.screenshot, issues.created_at, 
             users.username AS reported_by 
      FROM issues 
      LEFT JOIN users ON issues.user_id = users.id 
      ORDER BY issues.created_at DESC
    `;

    const [rows] = await db.execute(query);
    // ✅ Append Full URL for Screenshots
    const formattedIssues = rows.map(issue => ({
      ...issue,
      screenshot: issue.screenshot 
        ? `http://localhost:3000/uploads/${issue.screenshot}`  // ✅ Ensure the correct URL format
        : 'No screenshot'
    }));

    return formattedIssues;

    // // Debugging: Print output
    // console.log("Fetched Issues:", rows);

    // return rows;
  }
};

module.exports = Issue;
