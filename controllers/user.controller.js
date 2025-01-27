// const User = require('../models/user.model');

// // Get all users with role 'intern'
// exports.getAllInterns = async (req, res) => {
//   try {
//     const interns = await User.findAllByRole('intern');
//     res.json(interns);
//   } catch (err) {
//     console.error('Error fetching interns:', err);
//     res.status(500).json({ error: 'Server error. Please try again later.' });
//   }
// };


const User = require('../models/user.model');

exports.getAllInterns = async (req, res) => {
  try {
    // Check if the user is a CEO or Manager
    if (req.user.role !== 'manager' && req.user.role !== 'CEO') {
      return res.status(403).json({ error: 'Access denied. Only managers and CEOs can view interns.' });
    }

    // Fetch all interns from the database
    const interns = await User.findAllByRole('intern');
    res.json(interns);
  } catch (err) {
    console.error('Error fetching interns:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
