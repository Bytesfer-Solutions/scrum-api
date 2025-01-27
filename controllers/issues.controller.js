// const Issue = require('../models/issue.model');
// const { validationResult } = require('express-validator');

// // Create a new issue
// exports.createIssue = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { title, description } = req.body;
//   const userId = req.user.id;
//   const screenshot = req.file ? req.file.filename : null; 

//   try {
//     await Issue.create({ user_id: userId, title, description, screenshot });
//     res.status(201).json({ message: 'Issue reported successfully.' });
//   } catch (err) {
//     console.error('Error creating issue:', err);
//     res.status(500).json({ error: 'Server error. Please try again later.' });
//   }
// };

// // Get all issues
// exports.getAllIssues = async (req, res) => {
//   try {
//     const issues = await Issue.getAll();
//     res.json(issues);
//   } catch (err) {
//     console.error('Error fetching issues:', err);
//     res.status(500).json({ error: 'Server error. Please try again later.' });
//   }
// };


const Issue = require('../models/issue.model');
const { validationResult } = require('express-validator');

exports.createIssue = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description } = req.body;
  const userId = req.user?.id || null; 
  const screenshot = req.file ? req.file.filename : null; 

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required." });
  }

  try {
    await Issue.create({ user_id: userId, title, description, screenshot });
    res.status(201).json({ message: 'Issue reported successfully.' });
  } catch (err) {
    console.error('Error creating issue:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

exports.getAllIssues = async (req, res) => {
  try {
    if (req.user.role !== 'manager' && req.user.role !== 'CEO') {
      return res.status(403).json({ error: 'Access denied. Only managers and CEOs can view issues.' });
    }

    const issues = await Issue.getAll();

    // ✅ Append full URL for screenshots
    const formattedIssues = issues.map(issue => ({
      ...issue,
      screenshot: issue.screenshot 
        ? `http://localhost:3000/uploads/${issue.screenshot}`  // Ensure correct URL path
        : 'No screenshot'
    }));

    res.json(formattedIssues);
  } catch (err) {
    console.error('Error fetching issues:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
