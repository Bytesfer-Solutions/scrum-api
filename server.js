const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Register routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes'); // Ensure this is correctly imported
const taskRoutes = require('./routes/task.routes');
const standupsRoutes = require('./routes/standup.routes');
const issuesRoutes = require('./routes/issues.routes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // ✅ Ensure this is correctly registered
app.use('/api/tasks', taskRoutes);
app.use('/api/standups', standupsRoutes);
app.use('/api/issues', issuesRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

module.exports = app;
