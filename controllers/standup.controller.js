// const Standup = require('../models/standup.model');
// const { validationResult } = require('express-validator');

// // Create a new standup report
// exports.createStandup = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { yesterday, today, blockers } = req.body;
//   const userId = req.user.id;

//   try {
//     await Standup.create({ user_id: userId, yesterday, today, blockers });
//     res.status(201).json({ message: 'Standup report created successfully.' });
//   } catch (err) {
//     console.error('Error creating standup:', err);
//     res.status(500).json({ error: 'Server error. Please try again later.' });
//   }
// };

// // Get all standup reports by user (for interns to view their reports)
// exports.getStandupsByUser = async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     const standups = await Standup.getAllByUser(userId);
//     res.json(standups);
//   } catch (err) {
//     console.error('Error fetching standups:', err);
//     res.status(500).json({ error: 'Server error. Please try again later.' });
//   }
// };

// // Get all standup reports for a given date (for managers to view daily reports)
// exports.getStandupReportsByDate = async (req, res) => {
//   const date = req.params.date; // Expecting a date in the format 'YYYY-MM-DD'

//   try {
//     const standups = await Standup.getAllByDate(date);
//     res.json(standups);
//   } catch (err) {
//     console.error('Error fetching standup reports:', err);
//     res.status(500).json({ error: 'Server error. Please try again later.' });
//   }
// };


const Standup = require('../models/standup.model');
const User = require('../models/user.model');
const { validationResult } = require('express-validator');

// Create a new standup report
exports.createStandup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { yesterday, today, blockers } = req.body;
  const userId = req.user.id;

  try {
    await Standup.create({ user_id: userId, yesterday, today, blockers });
    res.status(201).json({ message: 'Standup report created successfully.' });
  } catch (err) {
    console.error('Error creating standup:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// Get standup reports for the logged-in user (Interns can view their own reports)
exports.getMyStandups = async (req, res) => {
  const userId = req.user.id;
  const date = req.query.date || null; // Get date from query params

  try {
    let standups;
    if (date) {
      standups = await Standup.getByUserAndDate(userId, date); // ✅ Fetch by user and date
    } else {
      standups = await Standup.getAllByUser(userId); // ✅ Fetch all reports if no date is provided
    }

    if (standups.length === 0) {
      return res.status(404).json({ message: 'No standup reports found for this date.' });
    }

    res.json(standups);
  } catch (err) {
    console.error('Error fetching standups:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};


// Get all standup reports (Managers/CEOs can view all reports)
exports.getAllStandupReports = async (req, res) => {
  try {
    if (req.user.role !== 'manager' && req.user.role !== 'CEO') {
      return res.status(403).json({ error: 'Access denied. Only managers and CEOs can view standup reports.' });
    }

    const standups = await Standup.getAllWithUserDetails();
    res.json(standups);
  } catch (err) {
    console.error('Error fetching standup reports:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// Get all standup reports for a specific date (Managers/CEOs)
// exports.getStandupReportsByDate = async (req, res) => {
//   const date = req.params.date; // Format: 'YYYY-MM-DD'

//   try {
//     if (req.user.role !== 'manager' && req.user.role !== 'CEO') {
//       return res.status(403).json({ error: 'Access denied. Only managers and CEOs can view standup reports.' });
//     }

//     const standups = await Standup.getAllByDate(date);

     
//     if (standups.length === 0) {
//       return res.status(404).json({ message: 'No standup reports found for this date.' });
//     }
//     res.json(standups);
//   } catch (err) {
//     console.error('Error fetching standup reports:', err);
//     res.status(500).json({ error: 'Server error. Please try again later.' });
//   }
// };

exports.getStandupReportsByDate = async (req, res) => {
  const date = req.params.date;

  try {
    if (req.user.role !== 'manager' && req.user.role !== 'CEO') {
      return res.status(403).json({ error: 'Access denied. Only managers and CEOs can view standup reports.' });
    }

    const standups = await Standup.getAllByDate(date);

    // ✅ Return empty list instead of error
    res.json(standups.length > 0 ? standups : []);
  } catch (err) {
    console.error('Error fetching standup reports:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

